import {
  workflow,
  node,
  trigger,
  sticky,
  newCredential,
  ifElse,
  splitInBatches,
  nextBatch,
  expr,
  languageModel,
} from '@n8n/workflow-sdk';

const DB_RETRY = { retryOnFail: true, maxTries: 3, waitBetweenTries: 3000 };
const AI_RETRY = {
  retryOnFail: true,
  maxTries: 2,
  waitBetweenTries: 5000,
  onError: 'continueErrorOutput',
};
const GMAIL_RETRY = {
  retryOnFail: true,
  maxTries: 2,
  waitBetweenTries: 3000,
  onError: 'continueErrorOutput',
};
const PROMPT_VERSION = 'wl-followup-v1';
const MODEL = 'accounts/fireworks/models/minimax-m3';
const RATER_MODEL = 'accounts/fireworks/models/minimax-m3';
const FIREWORKS_BASE_URL = 'https://api.fireworks.ai/inference/v1';
const MODEL_RL = { __rl: true, mode: 'id', value: MODEL };

const SCHEMA_SQL = `ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS send_claimed_at TIMESTAMPTZ;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS gmail_message_id TEXT;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS outreach_id INTEGER;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS sequence_no INTEGER NOT NULL DEFAULT 0;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS parent_outreach_id INTEGER;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS gmail_thread_id TEXT;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS replied_at TIMESTAMPTZ;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS reply_detected BOOLEAN NOT NULL DEFAULT FALSE;

CREATE SEQUENCE IF NOT EXISTS agency_outreach_drafts_outreach_id_seq;

UPDATE agency_outreach_drafts
SET outreach_id = nextval('agency_outreach_drafts_outreach_id_seq')
WHERE outreach_id IS NULL;

ALTER TABLE agency_outreach_drafts
  ALTER COLUMN outreach_id SET DEFAULT nextval('agency_outreach_drafts_outreach_id_seq');
ALTER SEQUENCE agency_outreach_drafts_outreach_id_seq OWNED BY agency_outreach_drafts.outreach_id;
ALTER TABLE agency_outreach_drafts ALTER COLUMN outreach_id SET NOT NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    WHERE t.relname = 'agency_outreach_drafts'
      AND c.contype = 'p'
      AND pg_get_constraintdef(c.oid) = 'PRIMARY KEY (agency_id)'
  ) THEN
    ALTER TABLE agency_outreach_drafts DROP CONSTRAINT agency_outreach_drafts_pkey;
  END IF;
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    WHERE t.relname = 'agency_outreach_drafts'
      AND c.contype = 'p'
  ) THEN
    ALTER TABLE agency_outreach_drafts ADD PRIMARY KEY (outreach_id);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS uq_agency_outreach_agency_sequence
  ON agency_outreach_drafts(agency_id, sequence_no);
CREATE INDEX IF NOT EXISTS idx_agency_outreach_drafts_status ON agency_outreach_drafts(status);
CREATE INDEX IF NOT EXISTS idx_agency_outreach_drafts_sent_at ON agency_outreach_drafts(sent_at DESC);

SELECT
  true AS schema_ready,
  to_regclass('public.agency_outreach_drafts') IS NOT NULL AS has_agency_outreach_drafts;`;

const PULL_SQL = `WITH cfg AS (
  SELECT $1::json AS p
),
latest_sent AS (
  SELECT DISTINCT ON (d.agency_id)
    d.outreach_id,
    d.agency_id,
    d.sequence_no,
    d.contact_email,
    d.contact_name,
    d.subject,
    d.body_text,
    d.gmail_message_id,
    d.gmail_thread_id,
    d.sent_at,
    d.reply_detected
  FROM agency_outreach_drafts d
  WHERE d.status = 'sent'
    AND d.sent_at IS NOT NULL
    AND COALESCE(d.reply_detected, false) = false
    AND d.sequence_no < 2
    AND (
      NULLIF(btrim(COALESCE(d.gmail_thread_id, '')), '') IS NOT NULL
      OR NULLIF(btrim(COALESCE(d.gmail_message_id, '')), '') IS NOT NULL
    )
  ORDER BY d.agency_id, d.sequence_no DESC, d.sent_at DESC
),
with_business_days AS (
  SELECT
    ls.*,
    (
      SELECT COUNT(*)::int
      FROM generate_series(
        (ls.sent_at AT TIME ZONE 'America/Toronto')::date + 1,
        (NOW() AT TIME ZONE 'America/Toronto')::date,
        '1 day'::interval
      ) AS day
      WHERE EXTRACT(ISODOW FROM day) BETWEEN 1 AND 5
    ) AS business_days_since_sent
  FROM latest_sent ls
)
SELECT
  ls.outreach_id AS "parentOutreachId",
  ls.agency_id AS "agencyId",
  ls.sequence_no AS "parentSequenceNo",
  (ls.sequence_no + 1) AS "sequenceNo",
  ls.contact_email AS "contactEmail",
  ls.contact_name AS "contactName",
  ls.subject AS "parentSubject",
  ls.body_text AS "parentBody",
  ls.gmail_message_id AS "gmailMessageId",
  ls.gmail_thread_id AS "gmailThreadId",
  ls.sent_at AS "parentSentAt",
  ls.business_days_since_sent AS "businessDaysSinceSent",
  a.agency_name AS "agencyName",
  a.domain,
  a.website,
  a.city,
  a.category,
  a.contact_title AS "contactTitle",
  s.white_label_score AS "whiteLabelScore",
  s.synopsis,
  s.reasons,
  s.agency_type AS "agencyType"
FROM with_business_days ls
JOIN agencies a ON a.id = ls.agency_id
JOIN agency_fit_scores s ON s.agency_id = a.id
LEFT JOIN agency_outreach_drafts nxt
  ON nxt.agency_id = ls.agency_id
 AND nxt.sequence_no = ls.sequence_no + 1
CROSS JOIN cfg
WHERE ls.business_days_since_sent >= COALESCE(NULLIF(cfg.p->>'businessDaysWait', '')::int, 3)
  AND (
    nxt.outreach_id IS NULL
    OR nxt.status IN ('failed', 'rejected', 'cancelled_replied')
  )
ORDER BY ls.sent_at ASC
LIMIT 50`;

const MARK_REPLIED_SQL = `WITH target AS (
  SELECT
    ($1::json->>'agency_id')::int AS agency_id,
    ($1::json->>'parent_outreach_id')::int AS parent_outreach_id
)
UPDATE agency_outreach_drafts d
SET
  reply_detected = true,
  replied_at = COALESCE(d.replied_at, NOW()),
  status = CASE
    WHEN d.status IN ('pending_review', 'approved') THEN 'cancelled_replied'
    ELSE d.status
  END,
  error = CASE
    WHEN d.status IN ('pending_review', 'approved')
      THEN 'Cancelled: reply detected on thread'
    ELSE d.error
  END,
  updated_at = NOW()
FROM target t
WHERE d.agency_id = t.agency_id
  AND (
    d.outreach_id = t.parent_outreach_id
    OR d.parent_outreach_id = t.parent_outreach_id
    OR (
      d.sequence_no > COALESCE(
        (SELECT sequence_no FROM agency_outreach_drafts WHERE outreach_id = t.parent_outreach_id),
        0
      )
      AND d.status IN ('pending_review', 'approved', 'failed', 'rejected')
    )
  )
RETURNING d.outreach_id, d.agency_id, d.sequence_no, d.status, d.reply_detected;`;

const UPSERT_FOLLOWUP_SQL = `INSERT INTO agency_outreach_drafts (
  agency_id,
  sequence_no,
  parent_outreach_id,
  contact_email,
  contact_name,
  subject,
  body_text,
  gmail_thread_id,
  gmail_message_id,
  status,
  model,
  prompt_version,
  error,
  accuracy_score,
  quality_score,
  overall_score,
  accuracy_pass,
  critiques,
  quality_issues,
  rewrite_attempts,
  rater_model,
  drafted_at,
  updated_at
)
VALUES (
  ($1::json->>'agency_id')::int,
  ($1::json->>'sequence_no')::int,
  NULLIF($1::json->>'parent_outreach_id', '')::int,
  NULLIF($1::json->>'contact_email', ''),
  NULLIF($1::json->>'contact_name', ''),
  NULLIF($1::json->>'subject', ''),
  NULLIF($1::json->>'body_text', ''),
  NULLIF($1::json->>'gmail_thread_id', ''),
  NULLIF($1::json->>'gmail_message_id', ''),
  COALESCE(NULLIF($1::json->>'status', ''), 'failed'),
  NULLIF($1::json->>'model', ''),
  NULLIF($1::json->>'prompt_version', ''),
  NULLIF($1::json->>'error', ''),
  NULLIF($1::json->>'accuracy_score', '')::int,
  NULLIF($1::json->>'quality_score', '')::int,
  NULLIF($1::json->>'overall_score', '')::int,
  NULLIF($1::json->>'accuracy_pass', '')::boolean,
  COALESCE(($1::json->'critiques')::jsonb, '[]'::jsonb),
  COALESCE(($1::json->'quality_issues')::jsonb, '[]'::jsonb),
  COALESCE(NULLIF($1::json->>'rewrite_attempts', '')::int, 0),
  NULLIF($1::json->>'rater_model', ''),
  NOW(),
  NOW()
)
ON CONFLICT (agency_id, sequence_no) DO UPDATE SET
  parent_outreach_id = EXCLUDED.parent_outreach_id,
  contact_email = EXCLUDED.contact_email,
  contact_name = EXCLUDED.contact_name,
  subject = COALESCE(EXCLUDED.subject, agency_outreach_drafts.subject),
  body_text = COALESCE(EXCLUDED.body_text, agency_outreach_drafts.body_text),
  gmail_thread_id = COALESCE(EXCLUDED.gmail_thread_id, agency_outreach_drafts.gmail_thread_id),
  gmail_message_id = COALESCE(EXCLUDED.gmail_message_id, agency_outreach_drafts.gmail_message_id),
  status = EXCLUDED.status,
  model = EXCLUDED.model,
  prompt_version = EXCLUDED.prompt_version,
  error = EXCLUDED.error,
  accuracy_score = EXCLUDED.accuracy_score,
  quality_score = EXCLUDED.quality_score,
  overall_score = EXCLUDED.overall_score,
  accuracy_pass = EXCLUDED.accuracy_pass,
  critiques = EXCLUDED.critiques,
  quality_issues = EXCLUDED.quality_issues,
  rewrite_attempts = EXCLUDED.rewrite_attempts,
  rater_model = EXCLUDED.rater_model,
  drafted_at = CASE
    WHEN EXCLUDED.status IN ('drafted', 'pending_review') THEN NOW()
    ELSE agency_outreach_drafts.drafted_at
  END,
  updated_at = NOW()
RETURNING outreach_id, agency_id, sequence_no, status, overall_score;`;

const STORE_THREAD_SQL = `UPDATE agency_outreach_drafts
SET
  gmail_thread_id = COALESCE(NULLIF($1::json->>'gmail_thread_id', ''), gmail_thread_id),
  updated_at = NOW()
WHERE outreach_id = ($1::json->>'outreach_id')::int
RETURNING outreach_id, gmail_thread_id;`;

const PARSE_DRAFT_JS = `function extractJson(text) {
  let t = String(text || '').trim();
  t = t.replace(/^\\\`\\\`\\\`(?:json)?\\s*/i, '').replace(/\\s*\\\`\\\`\\\`$/i, '').trim();
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  return JSON.parse(start >= 0 ? t.slice(start, end + 1) : t);
}
const row = $('Follow-Up Batch Loop').itemMatching(0).json;
const config = $('Follow-Up Config').first().json;
const item = $input.item.json;
let output = {};
try {
  if (item?.output && typeof item.output === 'object' && !Array.isArray(item.output)) {
    output = item.output;
  } else if (typeof item?.output === 'string') {
    output = extractJson(item.output);
  } else if (item && typeof item === 'object' && ('subject' in item || 'body' in item)) {
    output = item;
  } else {
    const content = item?.choices?.[0]?.message?.content || item?.message?.content || null;
    if (typeof content === 'string') output = extractJson(content);
    else if (content && typeof content === 'object') output = content;
  }
} catch (e) {
  return {
    json: {
      ...row,
      rewriteAttempt: 0,
      status: 'failed',
      error: 'Failed to parse AI follow-up JSON: ' + (e.message || e),
      subject: null,
      body: null,
      model: config.model,
      promptVersion: config.promptVersion,
    },
  };
}
const subject = String(output.subject || '').trim();
const body = String(output.body || '').trim();
if (!subject || !body) {
  return {
    json: {
      ...row,
      rewriteAttempt: 0,
      status: 'failed',
      error: 'AI follow-up missing subject or body',
      subject: subject || null,
      body: body || null,
      model: config.model,
      promptVersion: config.promptVersion,
    },
  };
}
return {
  json: {
    ...row,
    rewriteAttempt: 0,
    status: 'pending_rating',
    subject,
    body,
    model: config.model,
    promptVersion: config.promptVersion,
    error: null,
  },
};`;

const PARSE_RATING_JS = `function extractJson(text) {
  let t = String(text || '').trim();
  t = t.replace(/^\\\`\\\`\\\`(?:json)?\\s*/i, '').replace(/\\s*\\\`\\\`\\\`$/i, '').trim();
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  return JSON.parse(start >= 0 ? t.slice(start, end + 1) : t);
}
let draft = $('Parse Follow-Up Draft').itemMatching(0).json;
try {
  const rewritten = $('Parse Follow-Up Rewrite').itemMatching(0).json;
  if (rewritten && rewritten.status === 'pending_rating' && Number(rewritten.rewriteAttempt || 0) > Number(draft.rewriteAttempt || 0)) {
    draft = rewritten;
  }
} catch (e) {}
const config = $('Follow-Up Config').first().json;
const item = $input.item.json;
const rewriteAttempt = Number(draft.rewriteAttempt || 0);
const maxRewrite = Number(config.maxRewriteAttempts || 1);
const minOverall = Number(config.minOverallScore || 70);
let output = {};
try {
  if (item?.output && typeof item.output === 'object' && !Array.isArray(item.output)) {
    output = item.output;
  } else if (typeof item?.output === 'string') {
    output = extractJson(item.output);
  } else {
    const content = item?.choices?.[0]?.message?.content || item?.message?.content || null;
    if (typeof content === 'string') output = extractJson(content);
    else if (content && typeof content === 'object') output = content;
  }
} catch (e) {
  return {
    json: {
      ...draft,
      rewriteAttempt,
      status: rewriteAttempt < maxRewrite ? 'needs_rewrite' : 'failed',
      error: 'Failed to parse rating JSON: ' + (e.message || e),
      overallScore: 0,
      accuracyPass: false,
      critiques: ['Rating parse failure'],
    },
  };
}
const overallScore = Math.max(0, Math.min(100, Number(output.score || output.overallScore) || 0));
const critiques = Array.isArray(output.critiques) ? output.critiques.filter(Boolean) : [];
const accuracyPass = overallScore >= minOverall && output.pass !== false;
let status = 'ready';
if (!accuracyPass) status = rewriteAttempt < maxRewrite ? 'needs_rewrite' : 'failed';
return {
  json: {
    ...draft,
    rewriteAttempt,
    status,
    overallScore,
    accuracyScore: Number(output.accuracyScore) || overallScore,
    qualityScore: Number(output.qualityScore) || overallScore,
    accuracyPass,
    critiques,
    qualityIssues: Array.isArray(output.qualityIssues) ? output.qualityIssues : [],
    ratingSummary: output.summary || null,
    raterModel: config.raterModel,
    error: status === 'failed' ? ('Quality gate failed: ' + (critiques.join('; ') || 'below threshold')) : null,
  },
};`;

const PARSE_REWRITE_JS = `function extractJson(text) {
  let t = String(text || '').trim();
  t = t.replace(/^\\\`\\\`\\\`(?:json)?\\s*/i, '').replace(/\\s*\\\`\\\`\\\`$/i, '').trim();
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  return JSON.parse(start >= 0 ? t.slice(start, end + 1) : t);
}
const row = $('Follow-Up Batch Loop').itemMatching(0).json;
const prior = $('Parse Rating').itemMatching(0).json;
const config = $('Follow-Up Config').first().json;
const item = $input.item.json;
const rewriteAttempt = Number(prior.rewriteAttempt || 0) + 1;
let output = {};
try {
  if (item?.output && typeof item.output === 'object' && !Array.isArray(item.output)) {
    output = item.output;
  } else if (typeof item?.output === 'string') {
    output = extractJson(item.output);
  } else {
    const content = item?.choices?.[0]?.message?.content || item?.message?.content || null;
    if (typeof content === 'string') output = extractJson(content);
    else if (content && typeof content === 'object') output = content;
  }
} catch (e) {
  return {
    json: {
      ...row,
      ...prior,
      rewriteAttempt,
      status: 'failed',
      error: 'Failed to parse rewrite JSON: ' + (e.message || e),
    },
  };
}
const subject = String(output.subject || '').trim();
const body = String(output.body || '').trim();
if (!subject || !body) {
  return {
    json: {
      ...row,
      ...prior,
      rewriteAttempt,
      status: 'failed',
      error: 'AI rewrite missing subject or body',
      subject: subject || null,
      body: body || null,
    },
  };
}
return {
  json: {
    ...row,
    ...prior,
    rewriteAttempt,
    status: 'pending_rating',
    subject,
    body,
    model: config.model,
    promptVersion: config.promptVersion,
    error: null,
  },
};`;

const DETECT_REPLY_JS = `const row = $('Follow-Up Batch Loop').itemMatching(0).json;
const item = $input.item.json;
const messages = Array.isArray(item.messages)
  ? item.messages
  : (Array.isArray(item) ? item : []);
const threadId = item.id || item.threadId || row.gmailThreadId || null;

function isAutomated(fromText) {
  const f = String(fromText || '').toLowerCase();
  return (
    f.includes('mailer-daemon') ||
    f.includes('postmaster') ||
    f.includes('no-reply') ||
    f.includes('noreply') ||
    f.includes('bounce')
  );
}

function isFromUs(fromText, labels) {
  const f = String(fromText || '').toLowerCase();
  const labelIds = Array.isArray(labels)
    ? labels.map((l) => String(l.id || l || '').toUpperCase())
    : [];
  if (labelIds.includes('SENT')) return true;
  return f.includes('grandriverlabs') || f.includes('duncan@');
}

let hasReply = false;
for (const msg of messages) {
  const from = msg.From || msg.from || '';
  const labels = msg.labels || msg.labelIds || [];
  if (isAutomated(from)) continue;
  if (isFromUs(from, labels)) continue;
  hasReply = true;
  break;
}

const contactName = String(row.contactName || '').trim();
const firstName = contactName ? contactName.split(/\\s+/)[0] : '';
return {
  json: {
    ...row,
    gmailThreadId: threadId || row.gmailThreadId || null,
    hasReply,
    contactFirstName: firstName,
    rewriteAttempt: 0,
  },
};`;

const RESOLVE_THREAD_JS = `const row = $('Follow-Up Batch Loop').itemMatching(0).json;
const item = $input.item.json;
const threadId = item.threadId || item.thread_id || row.gmailThreadId || null;
return {
  json: {
    ...row,
    gmailThreadId: threadId,
    resolvedFromMessage: true,
  },
};`;

const manualTrigger = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: { name: 'Manual Trigger', position: [0, 240] },
  output: [{}],
});

const scheduleTrigger = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.3,
  config: {
    name: 'Weekday Schedule',
    position: [0, 440],
    parameters: {
      rule: {
        interval: [
          {
            field: 'cronExpression',
            expression: '0 11 * * 1-5',
          },
        ],
      },
    },
  },
  output: [{}],
});

const followUpConfig = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Follow-Up Config',
    position: [240, 340],
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'maxFollowUpsPerRun', name: 'maxFollowUpsPerRun', value: 5, type: 'number' },
          { id: 'businessDaysWait', name: 'businessDaysWait', value: 3, type: 'number' },
          { id: 'fromName', name: 'fromName', value: 'Duncan', type: 'string' },
          {
            id: 'ctaUrl',
            name: 'ctaUrl',
            value: 'https://grandriverlabs.io/whitelabel',
            type: 'string',
          },
          {
            id: 'productPitch',
            name: 'productPitch',
            value:
              'Grand River Labs helps agencies and consultants white-label AI automation delivery under their brand—discovery through support—while they keep the client relationship.',
            type: 'string',
          },
          { id: 'promptVersion', name: 'promptVersion', value: PROMPT_VERSION, type: 'string' },
          { id: 'model', name: 'model', value: MODEL, type: 'string' },
          { id: 'raterModel', name: 'raterModel', value: RATER_MODEL, type: 'string' },
          { id: 'maxRewriteAttempts', name: 'maxRewriteAttempts', value: 1, type: 'number' },
          { id: 'minOverallScore', name: 'minOverallScore', value: 70, type: 'number' },
        ],
      },
    },
  },
  output: [
    {
      maxFollowUpsPerRun: 5,
      businessDaysWait: 3,
      fromName: 'Duncan',
      ctaUrl: 'https://grandriverlabs.io/whitelabel',
      productPitch:
        'Grand River Labs helps agencies and consultants white-label AI automation delivery under their brand—discovery through support—while they keep the client relationship.',
      promptVersion: PROMPT_VERSION,
      model: MODEL,
      raterModel: RATER_MODEL,
      maxRewriteAttempts: 1,
      minOverallScore: 70,
    },
  ],
});

const ensureSchema = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Ensure Follow-Up Schema',
    position: [480, 340],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: SCHEMA_SQL,
      options: {
        connectionTimeout: 30,
        queryBatching: 'transaction',
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [{ schema_ready: true, has_agency_outreach_drafts: true }],
});

const pullEligible = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Pull Unanswered Sent',
    position: [720, 340],
    alwaysOutputData: true,
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: PULL_SQL,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(
          '{{ JSON.stringify({ businessDaysWait: $("Follow-Up Config").first().json.businessDaysWait || 3 }) }}',
        ),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [
    {
      parentOutreachId: 1,
      agencyId: 1,
      parentSequenceNo: 0,
      sequenceNo: 1,
      contactEmail: 'alex@brightlocalseo.example.com',
      contactName: 'Alex Rivera',
      parentSubject: 'White-label automation for Bright Local SEO clients',
      parentBody: 'Hi Alex,...',
      gmailMessageId: 'msg123',
      gmailThreadId: 'thr456',
      parentSentAt: '2026-07-20T15:00:00.000Z',
      businessDaysSinceSent: 5,
      agencyName: 'Bright Local SEO',
      domain: 'brightlocalseo.example.com',
      website: 'https://brightlocalseo.example.com',
      city: 'Grand Rapids',
      category: 'SEO Agency',
      contactTitle: 'Founder',
      whiteLabelScore: 82,
      synopsis: 'Strong local SEO partner',
      reasons: ['SMB clients'],
      agencyType: 'local_seo',
    },
  ],
});

const normalizeQueue = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize Follow-Up Queue',
    position: [960, 340],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const config = $('Follow-Up Config').first().json;
const maxN = Math.max(1, Number(config.maxFollowUpsPerRun) || 5);
const rows = $input.all()
  .map((item) => item.json)
  .filter((row) => row && row.agencyId && row.parentOutreachId && row.contactEmail)
  .slice(0, maxN);
if (!rows.length) {
  return [{
    json: {
      queueCount: 0,
      emptyQueue: true,
      reason: 'empty_queue',
      message: 'No unanswered sent emails eligible for follow-up.',
    },
  }];
}
return rows.map((row) => {
  const reasons = Array.isArray(row.reasons)
    ? row.reasons
    : (typeof row.reasons === 'string'
      ? (() => { try { return JSON.parse(row.reasons); } catch (e) { return []; } })()
      : []);
  const contactName = String(row.contactName || '').trim();
  return {
    json: {
      ...row,
      reasons,
      contactFirstName: contactName ? contactName.split(/\\s+/)[0] : '',
      queueCount: rows.length,
      emptyQueue: false,
      rewriteAttempt: 0,
    },
  };
});`,
    },
  },
  output: [
    {
      parentOutreachId: 1,
      agencyId: 1,
      sequenceNo: 1,
      contactEmail: 'alex@brightlocalseo.example.com',
      contactFirstName: 'Alex',
      queueCount: 1,
      emptyQueue: false,
    },
  ],
});

const hasCandidates = ifElse({
  version: 2.2,
  config: {
    name: 'Has Candidates?',
    position: [1200, 340],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'has-parent',
            leftValue: expr('{{ $json.parentOutreachId }}'),
            operator: { type: 'number', operation: 'gt' },
            rightValue: 0,
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [[{ parentOutreachId: 1, queueCount: 1 }], [{ emptyQueue: true, queueCount: 0 }]],
});

const noFollowUpWork = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'No Follow-Up Work',
    position: [1440, 520],
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'status', name: 'status', value: 'no_work', type: 'string' },
        ],
      },
    },
  },
  output: [{ emptyQueue: true, queueCount: 0, status: 'no_work' }],
});

const followUpBatch = splitInBatches({
  version: 3,
  config: {
    name: 'Follow-Up Batch Loop',
    position: [1440, 280],
    parameters: { batchSize: 1 },
  },
});

const needsThreadResolve = ifElse({
  version: 2.2,
  config: {
    name: 'Needs Thread ID?',
    position: [1680, 280],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'missing-thread',
            leftValue: expr('{{ !$json.gmailThreadId && !!$json.gmailMessageId }}'),
            operator: { type: 'boolean', operation: 'true', singleValue: true },
            rightValue: '',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [
    [{ gmailMessageId: 'msg123', gmailThreadId: null }],
    [{ gmailThreadId: 'thr456' }],
  ],
});

const getMessageForThread = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Get Message For Thread',
    position: [1920, 160],
    ...GMAIL_RETRY,
    parameters: {
      resource: 'message',
      operation: 'get',
      messageId: expr('{{ $json.gmailMessageId }}'),
      simple: true,
    },
    credentials: { gmailOAuth2: newCredential('Gmail account') },
  },
  output: [{ id: 'msg123', threadId: 'thr456', subject: 'Partnership idea' }],
});

const resolveThreadId = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Resolve Thread ID',
    position: [2160, 160],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: RESOLVE_THREAD_JS,
    },
  },
  output: [{ parentOutreachId: 1, gmailThreadId: 'thr456', resolvedFromMessage: true }],
});

const storeThreadId = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Store Thread ID On Parent',
    position: [2400, 160],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: STORE_THREAD_SQL,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(
          '{{ JSON.stringify({ outreach_id: $json.parentOutreachId, gmail_thread_id: $json.gmailThreadId }) }}',
        ),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [{ outreach_id: 1, gmail_thread_id: 'thr456' }],
});

const passThroughThread = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Pass Through Thread',
    position: [1920, 360],
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'threadReady', name: 'threadReady', value: true, type: 'boolean' },
        ],
      },
    },
  },
  output: [{ threadReady: true, gmailThreadId: 'thr456', parentOutreachId: 1 }],
});

const mergeAfterThread = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Thread Check',
    position: [2640, 280],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const row = $('Follow-Up Batch Loop').itemMatching(0).json;
let threadId = row.gmailThreadId || null;
try {
  const resolved = $('Resolve Thread ID').item.json;
  if (resolved && resolved.gmailThreadId) threadId = resolved.gmailThreadId;
} catch (e) {}
return {
  json: {
    ...row,
    gmailThreadId: threadId,
  },
};`,
    },
  },
  output: [{ parentOutreachId: 1, gmailThreadId: 'thr456', agencyId: 1, sequenceNo: 1 }],
});

const hasThreadId = ifElse({
  version: 2.2,
  config: {
    name: 'Has Thread ID?',
    position: [2880, 280],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'has-thread',
            leftValue: expr('{{ Boolean($json.gmailThreadId) }}'),
            operator: { type: 'boolean', operation: 'true', singleValue: true },
            rightValue: '',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [[{ gmailThreadId: 'thr456' }], [{ gmailThreadId: null }]],
});

const getThread = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Get Gmail Thread',
    position: [3120, 200],
    ...GMAIL_RETRY,
    parameters: {
      resource: 'thread',
      operation: 'get',
      threadId: expr('{{ $json.gmailThreadId }}'),
      simple: false,
      options: { returnOnlyMessages: true },
    },
    credentials: { gmailOAuth2: newCredential('Gmail account') },
  },
  output: [
    {
      id: 'thr456',
      messages: [
        { id: 'msg1', From: 'Duncan <duncan@grandriverlabs.com>', labels: [{ id: 'SENT' }] },
      ],
    },
  ],
});

const detectReply = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Detect Reply',
    position: [3360, 200],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: DETECT_REPLY_JS,
    },
  },
  output: [
    {
      parentOutreachId: 1,
      agencyId: 1,
      sequenceNo: 1,
      hasReply: false,
      gmailThreadId: 'thr456',
      contactFirstName: 'Alex',
    },
  ],
});

const repliedGate = ifElse({
  version: 2.2,
  config: {
    name: 'Reply Found?',
    position: [3600, 200],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'has-reply',
            leftValue: expr('{{ $json.hasReply }}'),
            operator: { type: 'boolean', operation: 'true', singleValue: true },
            rightValue: '',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [[{ hasReply: true }], [{ hasReply: false, sequenceNo: 1 }]],
});

const markReplied = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Mark Replied Cancel Pending',
    position: [3840, 80],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: MARK_REPLIED_SQL,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(
          '{{ JSON.stringify({ agency_id: $json.agencyId, parent_outreach_id: $json.parentOutreachId }) }}',
        ),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [{ outreach_id: 1, agency_id: 1, sequence_no: 0, status: 'sent', reply_detected: true }],
});

const skipNoThread = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Skip Missing Thread',
    position: [3120, 400],
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'status', name: 'status', value: 'skipped_no_thread', type: 'string' },
        ],
      },
    },
  },
  output: [{ status: 'skipped_no_thread' }],
});

const draftModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'Follow-Up Draft Model',
    position: [3840, 360],
    parameters: {
      model: MODEL_RL,
      responsesApiEnabled: false,
      options: {
        baseURL: FIREWORKS_BASE_URL,
        temperature: 0.35,
        maxTokens: 1024,
      },
    },
    credentials: { openAiApi: newCredential('OpenAI account') },
  },
});

const draftFollowUp = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Draft Follow-Up',
    position: [3840, 280],
    ...AI_RETRY,
    parameters: {
      promptType: 'define',
      text: expr(`={{ [
  "Follow-up number: " + $json.sequenceNo + " of 2",
  "Product pitch: " + $("Follow-Up Config").first().json.productPitch,
  "From name: " + $("Follow-Up Config").first().json.fromName,
  "CTA URL: " + $("Follow-Up Config").first().json.ctaUrl,
  "Agency: " + $json.agencyName,
  "Contact first name: " + ($json.contactFirstName || "(unknown)"),
  "Synopsis: " + String($json.synopsis || "(none)").slice(0, 400),
  "Prior subject: " + $json.parentSubject,
  "Prior body:\\n" + String($json.parentBody || "").slice(0, 800),
  $json.sequenceNo === 2
    ? "Write the FINAL follow-up: extremely short quick ask only (2-4 sentences)."
    : "Write follow-up 1: concise, contextual bump (about 60-100 words)."
].join("\\n") }}`),
      options: {
        systemMessage:
          'You draft short follow-up partnership emails for Grand River Labs. Return raw JSON only, no markdown fences. Keys: subject, body. Rules: - Stay in the same conversation; subject may keep Re: if natural - Never invent clients, results, or relationships - Position: GRL builds AI automation under THEIR brand - Follow-up 1: polite bump referencing prior note, one soft CTA - Follow-up 2: extremely short final ask only, no pitch dump - Plain text, no markdown, no pricing, sign as the from name at Grand River Labs',
        maxIterations: 3,
        enableStreaming: false,
      },
    },
    subnodes: { model: draftModel },
  },
  output: [
    {
      output: {
        subject: 'Re: White-label automation for Bright Local SEO clients',
        body: 'Hi Alex,\n\nJust bumping this in case it got buried...',
      },
    },
  ],
});

const parseDraft = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Parse Follow-Up Draft',
    position: [4080, 280],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: PARSE_DRAFT_JS,
    },
  },
  output: [
    {
      agencyId: 1,
      sequenceNo: 1,
      status: 'pending_rating',
      subject: 'Re: White-label automation',
      body: 'Hi Alex,...',
    },
  ],
});

const draftParseOk = ifElse({
  version: 2.2,
  config: {
    name: 'Draft Parse OK?',
    position: [4320, 280],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'pending-rating',
            leftValue: expr('{{ $json.status }}'),
            operator: { type: 'string', operation: 'equals' },
            rightValue: 'pending_rating',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [[{ status: 'pending_rating' }], [{ status: 'failed' }]],
});

const rateModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'Follow-Up Rate Model',
    position: [4560, 360],
    parameters: {
      model: { __rl: true, mode: 'id', value: RATER_MODEL },
      responsesApiEnabled: false,
      options: {
        baseURL: FIREWORKS_BASE_URL,
        temperature: 0.1,
        maxTokens: 1024,
      },
    },
    credentials: { openAiApi: newCredential('OpenAI account') },
  },
});

const rateDraft = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Rate Follow-Up',
    position: [4560, 200],
    ...AI_RETRY,
    parameters: {
      promptType: 'define',
      text: expr(`={{ [
  "Follow-up number: " + $json.sequenceNo,
  "Min overall score: " + $("Follow-Up Config").first().json.minOverallScore,
  "Agency: " + $json.agencyName,
  "Prior subject: " + $json.parentSubject,
  "Draft subject: " + $json.subject,
  "Draft body:\\n" + $json.body,
  "Rate this follow-up for accuracy and brevity."
].join("\\n") }}`),
      options: {
        systemMessage:
          'You rate follow-up partnership emails for Grand River Labs. Return raw JSON only. Keys: pass, score, accuracyScore, qualityScore, critiques, summary. Be strict on invented claims. Follow-up 2 must be extremely short. Set pass true only if score meets the threshold.',
        maxIterations: 3,
        enableStreaming: false,
      },
    },
    subnodes: { model: rateModel },
  },
  output: [
    {
      output: {
        pass: true,
        score: 85,
        accuracyScore: 90,
        qualityScore: 80,
        critiques: [],
        summary: 'Good concise bump',
      },
    },
  ],
});

const parseRating = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Parse Rating',
    position: [4800, 200],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: PARSE_RATING_JS,
    },
  },
  output: [{ agencyId: 1, status: 'ready', overallScore: 85, accuracyPass: true }],
});

const ratingPass = ifElse({
  version: 2.2,
  config: {
    name: 'Rating Pass?',
    position: [5040, 200],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'ready',
            leftValue: expr('{{ $json.status }}'),
            operator: { type: 'string', operation: 'equals' },
            rightValue: 'ready',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [[{ status: 'ready' }], [{ status: 'needs_rewrite' }]],
});

const canRewrite = ifElse({
  version: 2.2,
  config: {
    name: 'Can Rewrite?',
    position: [5040, 380],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'needs-rewrite',
            leftValue: expr('{{ $json.status }}'),
            operator: { type: 'string', operation: 'equals' },
            rightValue: 'needs_rewrite',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [[{ status: 'needs_rewrite' }], [{ status: 'failed' }]],
});

const rewriteModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'Follow-Up Rewrite Model',
    position: [5280, 480],
    parameters: {
      model: MODEL_RL,
      responsesApiEnabled: false,
      options: {
        baseURL: FIREWORKS_BASE_URL,
        temperature: 0.3,
        maxTokens: 1024,
      },
    },
    credentials: { openAiApi: newCredential('OpenAI account') },
  },
});

const rewriteFollowUp = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Rewrite Follow-Up',
    position: [5280, 380],
    ...AI_RETRY,
    parameters: {
      promptType: 'define',
      text: expr(`={{ [
  "Follow-up number: " + $json.sequenceNo,
  "From name: " + $("Follow-Up Config").first().json.fromName,
  "Critiques: " + JSON.stringify($json.critiques || []),
  "Prior subject: " + $json.subject,
  "Prior body:\\n" + $json.body,
  "Rewrite to pass quality gates."
].join("\\n") }}`),
      options: {
        systemMessage:
          'You rewrite follow-up partnership emails for Grand River Labs. Return raw JSON only. Keys: subject, body. Fix every critique. Follow-up 2 must stay extremely short.',
        maxIterations: 3,
        enableStreaming: false,
      },
    },
    subnodes: { model: rewriteModel },
  },
  output: [
    {
      output: {
        subject: 'Re: Partnership idea',
        body: 'Hi Alex,\n\nQuick bump — open to a short chat?',
      },
    },
  ],
});

const parseRewrite = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Parse Follow-Up Rewrite',
    position: [5520, 380],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: PARSE_REWRITE_JS,
    },
  },
  output: [{ agencyId: 1, status: 'pending_rating', rewriteAttempt: 1 }],
});

const rewriteParseOk = ifElse({
  version: 2.2,
  config: {
    name: 'Rewrite Parse OK?',
    position: [5760, 380],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'pending-rating-rewrite',
            leftValue: expr('{{ $json.status }}'),
            operator: { type: 'string', operation: 'equals' },
            rightValue: 'pending_rating',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [[{ status: 'pending_rating' }], [{ status: 'failed' }]],
});

const prepareSuccess = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Follow-Up Success',
    position: [5280, 120],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `let draft = $('Parse Follow-Up Draft').itemMatching(0).json;
try {
  const rewritten = $('Parse Follow-Up Rewrite').itemMatching(0).json;
  if (rewritten && rewritten.status === 'pending_rating' && Number(rewritten.rewriteAttempt || 0) > Number(draft.rewriteAttempt || 0)) {
    draft = rewritten;
  }
} catch (e) {}
const rating = $('Parse Rating').itemMatching(0).json;
const config = $('Follow-Up Config').first().json;
return {
  json: {
    agencyId: draft.agencyId,
    sequenceNo: draft.sequenceNo,
    parentOutreachId: draft.parentOutreachId,
    contactEmail: draft.contactEmail,
    contactName: draft.contactName || null,
    subject: draft.subject,
    body: draft.body,
    gmailThreadId: draft.gmailThreadId || null,
    gmailMessageId: draft.gmailMessageId || null,
    model: draft.model,
    promptVersion: draft.promptVersion,
    status: 'pending_review',
    error: null,
    accuracyScore: rating.accuracyScore ?? null,
    qualityScore: rating.qualityScore ?? null,
    overallScore: rating.overallScore ?? null,
    accuracyPass: rating.accuracyPass === true,
    critiques: rating.critiques || [],
    qualityIssues: rating.qualityIssues || [],
    rewriteAttempt: draft.rewriteAttempt || 0,
    raterModel: rating.raterModel || config.raterModel,
  },
};`,
    },
  },
  output: [
    {
      agencyId: 1,
      sequenceNo: 1,
      parentOutreachId: 1,
      status: 'pending_review',
      subject: 'Re: White-label automation',
      body: 'Hi Alex,...',
      overallScore: 85,
    },
  ],
});

const prepareFail = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Follow-Up Failure',
    position: [5280, 520],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const row = $('Follow-Up Batch Loop').itemMatching(0).json;
const config = $('Follow-Up Config').first().json;
const item = $input.item.json;
return {
  json: {
    agencyId: row.agencyId,
    sequenceNo: row.sequenceNo,
    parentOutreachId: row.parentOutreachId,
    contactEmail: row.contactEmail,
    contactName: row.contactName || null,
    subject: item.subject || null,
    body: item.body || null,
    gmailThreadId: row.gmailThreadId || null,
    gmailMessageId: row.gmailMessageId || null,
    model: config.model,
    promptVersion: config.promptVersion,
    status: 'failed',
    error: item.error || 'Follow-up draft failed',
    accuracyScore: item.accuracyScore ?? null,
    qualityScore: item.qualityScore ?? null,
    overallScore: item.overallScore ?? null,
    accuracyPass: false,
    critiques: item.critiques || [],
    qualityIssues: item.qualityIssues || [],
    rewriteAttempt: item.rewriteAttempt || 0,
    raterModel: config.raterModel,
  },
};`,
    },
  },
  output: [{ agencyId: 1, sequenceNo: 1, status: 'failed', error: 'Follow-up draft failed' }],
});

const prepareAiError = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare AI Error',
    position: [4080, 480],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const row = $('Follow-Up Batch Loop').itemMatching(0).json;
const config = $('Follow-Up Config').first().json;
const item = $input.item.json;
const err = item.error || item;
const failureReason = typeof err === 'string'
  ? err
  : (err.message || err.description || err.error || 'AI follow-up draft failed');
return {
  json: {
    agencyId: row.agencyId,
    sequenceNo: row.sequenceNo,
    parentOutreachId: row.parentOutreachId,
    contactEmail: row.contactEmail,
    contactName: row.contactName || null,
    subject: null,
    body: null,
    gmailThreadId: row.gmailThreadId || null,
    gmailMessageId: row.gmailMessageId || null,
    model: config.model,
    promptVersion: config.promptVersion,
    status: 'failed',
    error: String(failureReason),
    accuracyScore: null,
    qualityScore: null,
    overallScore: null,
    accuracyPass: false,
    critiques: [],
    qualityIssues: [],
    rewriteAttempt: 0,
    raterModel: config.raterModel,
  },
};`,
    },
  },
  output: [{ agencyId: 1, sequenceNo: 1, status: 'failed', error: 'AI follow-up draft failed' }],
});

const upsertFollowUp = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Upsert Follow-Up Draft',
    position: [5520, 200],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: UPSERT_FOLLOWUP_SQL,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(`{{ JSON.stringify({
  agency_id: $json.agencyId,
  sequence_no: $json.sequenceNo,
  parent_outreach_id: $json.parentOutreachId || null,
  contact_email: $json.contactEmail || null,
  contact_name: $json.contactName || null,
  subject: $json.subject || null,
  body_text: $json.body || null,
  gmail_thread_id: $json.gmailThreadId || null,
  gmail_message_id: $json.gmailMessageId || null,
  status: $json.status || 'failed',
  model: $json.model || null,
  prompt_version: $json.promptVersion || null,
  error: $json.error || null,
  accuracy_score: $json.accuracyScore ?? null,
  quality_score: $json.qualityScore ?? null,
  overall_score: $json.overallScore ?? null,
  accuracy_pass: $json.accuracyPass === true,
  critiques: $json.critiques || [],
  quality_issues: $json.qualityIssues || [],
  rewrite_attempts: $json.rewriteAttempt || 0,
  rater_model: $json.raterModel || null
}) }}`),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [
    {
      outreach_id: 2,
      agency_id: 1,
      sequence_no: 1,
      status: 'pending_review',
      overall_score: 85,
    },
  ],
});

const overviewSticky = sticky(
  '## Draft Unanswered Agency Follow-Ups\n\nFinds sent outreach with no reply after 3 business days (America/Toronto), checks the Gmail thread, and drafts follow-up 1 or 2 into the same approval queue (`pending_review`) with sequence tags. Never auto-sends.',
  [followUpConfig, normalizeQueue],
  { color: 4, position: [240, 40] },
);

const credentialsSticky = sticky(
  '## Credentials\n\n- **Grand River Postgres** — sent history + follow-up draft rows\n- **Gmail account** — thread/message lookup for reply detection\n- **OpenAI account** — Fireworks chat model for draft + rating',
  [ensureSchema, getThread, draftFollowUp],
  { color: 5, position: [480, 40] },
);

const successPath = prepareSuccess.to(upsertFollowUp).to(nextBatch(followUpBatch));
const failPath = prepareFail.to(upsertFollowUp).to(nextBatch(followUpBatch));
const aiErrorPath = prepareAiError.to(upsertFollowUp).to(nextBatch(followUpBatch));

const rewriteCycle = rewriteFollowUp
  .to(parseRewrite)
  .to(
    rewriteParseOk
      .onTrue(rateDraft)
      .onFalse(failPath),
  );

const afterRating = ratingPass
  .onTrue(successPath)
  .onFalse(
    canRewrite
      .onTrue(rewriteCycle)
      .onFalse(failPath),
  );

const draftPipeline = draftFollowUp
  .to(parseDraft)
  .to(
    draftParseOk
      .onTrue(rateDraft.to(parseRating).to(afterRating))
      .onFalse(failPath),
  );

const unansweredPath = draftPipeline;

const afterReplyDetect = repliedGate
  .onTrue(markReplied.to(nextBatch(followUpBatch)))
  .onFalse(unansweredPath);

const threadCheckPath = getThread.to(detectReply).to(afterReplyDetect);

const afterPrepareThread = hasThreadId
  .onTrue(threadCheckPath)
  .onFalse(skipNoThread.to(nextBatch(followUpBatch)));

const afterResolve = resolveThreadId
  .to(storeThreadId)
  .to(mergeAfterThread)
  .to(afterPrepareThread);

const batchPipeline = needsThreadResolve
  .onTrue(getMessageForThread.to(afterResolve))
  .onFalse(passThroughThread.to(mergeAfterThread).to(afterPrepareThread));

export default workflow(
  'draft-unanswered-agency-follow-ups',
  'Draft Unanswered Agency Follow-Ups',
)
  .add(manualTrigger)
  .to(followUpConfig)
  .add(scheduleTrigger)
  .to(followUpConfig)
  .add(followUpConfig)
  .to(ensureSchema)
  .to(pullEligible)
  .to(normalizeQueue)
  .to(
    hasCandidates
      .onTrue(followUpBatch.onEachBatch(batchPipeline))
      .onFalse(noFollowUpWork),
  )
  .add(draftFollowUp.onError(aiErrorPath))
  .add(rateDraft.onError(aiErrorPath))
  .add(rewriteFollowUp.onError(aiErrorPath))
  .add(getThread.onError(aiErrorPath))
  .add(getMessageForThread.onError(aiErrorPath))
  .add(overviewSticky)
  .add(credentialsSticky);
