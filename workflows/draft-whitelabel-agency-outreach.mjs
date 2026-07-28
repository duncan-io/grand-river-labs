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
const PROMPT_VERSION = 'wl-outreach-v2';
const MODEL = 'accounts/fireworks/models/minimax-m3';
const RATER_MODEL = 'accounts/fireworks/models/minimax-m3';
const FIREWORKS_BASE_URL = 'https://api.fireworks.ai/inference/v1';
const MODEL_RL = { __rl: true, mode: 'id', value: MODEL };

const SCHEMA_SQL = `CREATE TABLE IF NOT EXISTS agency_outreach_drafts (
  agency_id      INTEGER PRIMARY KEY REFERENCES agencies(id) ON DELETE CASCADE,
  contact_email  TEXT,
  contact_name   TEXT,
  subject        TEXT,
  body_text      TEXT,
  body_html      TEXT,
  gmail_draft_id TEXT,
  status         TEXT NOT NULL DEFAULT 'drafted',
  model          TEXT,
  prompt_version TEXT,
  error          TEXT,
  drafted_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_agency_outreach_drafts_status ON agency_outreach_drafts(status);
CREATE INDEX IF NOT EXISTS idx_agency_outreach_drafts_drafted_at ON agency_outreach_drafts(drafted_at DESC);

ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS accuracy_score INTEGER;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS quality_score INTEGER;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS overall_score INTEGER;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS accuracy_pass BOOLEAN;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS critiques JSONB;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS quality_issues JSONB;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS rewrite_attempts INTEGER;
ALTER TABLE agency_outreach_drafts ADD COLUMN IF NOT EXISTS rater_model TEXT;

SELECT
  true AS schema_ready,
  to_regclass('public.agency_outreach_drafts') IS NOT NULL AS has_agency_outreach_drafts;`;

const PARSE_DRAFT_JS = `function extractJson(text) {
  let t = String(text || '').trim();
  t = t.replace(/^\`\`\`(?:json)?\\s*/i, '').replace(/\\s*\`\`\`$/i, '').trim();
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  return JSON.parse(start >= 0 ? t.slice(start, end + 1) : t);
}
const agency = $('Agency Batch Loop').itemMatching(0).json;
const config = $('Outreach Config').first().json;
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
    const content = item?.choices?.[0]?.message?.content
      || item?.message?.content
      || null;
    if (typeof content === 'string') {
      output = extractJson(content);
    } else if (content && typeof content === 'object') {
      output = content;
    }
  }
} catch (e) {
  return {
    json: {
      ...agency,
      rewriteAttempt: 0,
      status: 'failed',
      error: 'Failed to parse AI draft JSON: ' + (e.message || e),
      subject: null,
      body: null,
      personalizationHook: null,
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
      ...agency,
      rewriteAttempt: 0,
      status: 'failed',
      error: 'AI draft missing subject or body',
      subject: subject || null,
      body: body || null,
      personalizationHook: output.personalizationHook || null,
      model: config.model,
      promptVersion: config.promptVersion,
    },
  };
}

return {
  json: {
    ...agency,
    rewriteAttempt: 0,
    status: 'pending_rating',
    subject,
    body,
    personalizationHook: output.personalizationHook || null,
    model: config.model,
    promptVersion: config.promptVersion,
    error: null,
  },
};`;

const PARSE_REWRITE_JS = `function parseJsonText(str) {
  const trimmed = String(str).trim();
  const fence = trimmed.match(/\`\`\`(?:json)?\\s*([\\s\\S]*?)\`\`\`/);
  const jsonStr = fence ? fence[1].trim() : trimmed;
  const start = jsonStr.indexOf('{');
  const end = jsonStr.lastIndexOf('}');
  return JSON.parse(start >= 0 ? jsonStr.slice(start, end + 1) : jsonStr);
}

function normalizeRating(raw) {
  const output = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
  const overallScore = Number.isFinite(Number(output.score))
    ? Number(output.score)
    : (Number.isFinite(Number(output.overallScore)) ? Number(output.overallScore) : null);
  const accuracyScore = Number.isFinite(Number(output.accuracyScore)) ? Number(output.accuracyScore) : null;
  const qualityScore = Number.isFinite(Number(output.qualityScore)) ? Number(output.qualityScore) : null;
  let critiques = Array.isArray(output.critiques) ? output.critiques.filter(Boolean) : [];
  let qualityIssues = Array.isArray(output.qualityIssues) ? output.qualityIssues.filter(Boolean) : [];
  const inventedClaims = Array.isArray(output.inventedClaims) ? output.inventedClaims.filter(Boolean) : [];
  const reasoning = typeof output.reasoning === 'string' ? output.reasoning.trim() : '';
  if (!critiques.length && reasoning) critiques = [reasoning];
  const ratingSummary = output.summary || reasoning || null;
  return {
    accuracyScore,
    qualityScore,
    overallScore,
    critiques,
    qualityIssues,
    inventedClaims,
    ratingSummary,
  };
}

const agency = $('Agency Batch Loop').itemMatching(0).json;
const config = $('Outreach Config').first().json;
let prior = $('Parse Draft Email').itemMatching(0).json;
try {
  const ratingItem = $('AI Rate Draft').item.json;
  const ratingRaw = (ratingItem && typeof ratingItem.output === 'object' && ratingItem.output)
    ? ratingItem.output
    : ratingItem;
  const rating = normalizeRating(ratingRaw);
  prior = {
    ...prior,
    accuracyScore: rating.accuracyScore,
    qualityScore: rating.qualityScore,
    overallScore: rating.overallScore,
    critiques: rating.critiques,
    qualityIssues: rating.qualityIssues,
    inventedClaims: rating.inventedClaims,
    ratingSummary: rating.ratingSummary,
    raterModel: config.raterModel,
  };
} catch (e) {
  // rating unavailable — keep draft prior
}
const item = $input.item.json;
const rewriteAttempt = Number(prior.rewriteAttempt || 0) + 1;

let output = {};
try {
  if (item?.output && typeof item.output === 'object' && !Array.isArray(item.output)) {
    output = item.output;
  } else if (typeof item?.output === 'string') {
    output = parseJsonText(item.output);
  } else if (item && typeof item === 'object' && ('subject' in item || 'body' in item)) {
    output = item;
  } else {
    const content = item?.choices?.[0]?.message?.content
      || item?.message?.content
      || null;
    if (typeof content === 'string') {
      output = parseJsonText(content);
    } else if (content && typeof content === 'object') {
      output = content;
    }
  }
} catch (e) {
  return {
    json: {
      ...agency,
      ...prior,
      rewriteAttempt,
      status: 'failed',
      error: 'Failed to parse AI rewrite JSON: ' + (e.message || e),
      subject: prior.subject || null,
      body: prior.body || null,
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
      ...agency,
      ...prior,
      rewriteAttempt,
      status: 'failed',
      error: 'AI rewrite missing subject or body',
      subject: subject || null,
      body: body || null,
      personalizationHook: output.personalizationHook || null,
      model: config.model,
      promptVersion: config.promptVersion,
    },
  };
}

return {
  json: {
    ...agency,
    ...prior,
    rewriteAttempt,
    status: 'pending_rating',
    subject,
    body,
    personalizationHook: output.personalizationHook || null,
    model: config.model,
    promptVersion: config.promptVersion,
    error: null,
  },
};`;

const PARSE_RATING_JS = `function extractJson(text) {
  let t = String(text || '').trim();
  t = t.replace(/^\`\`\`(?:json)?\\s*/i, '').replace(/\\s*\`\`\`$/i, '').trim();
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  return JSON.parse(start >= 0 ? t.slice(start, end + 1) : t);
}
let draft = $('Parse Draft Email').itemMatching(0).json;
try {
  const rewritten = $('Parse Rewrite').itemMatching(0).json;
  if (rewritten && rewritten.status === 'pending_rating' && Number(rewritten.rewriteAttempt || 0) > Number(draft.rewriteAttempt || 0)) {
    draft = rewritten;
  }
} catch (e) {
  // first pass — Parse Rewrite has not run yet
}
const config = $('Outreach Config').first().json;
const item = $input.item.json;
const rewriteAttempt = Number(draft.rewriteAttempt || 0);
const maxRewrite = Number(config.maxRewriteAttempts || 2);
const minAccuracy = Number(config.minAccuracyScore || 80);
const minQuality = Number(config.minQualityScore || 70);
const minOverall = Number(config.minOverallScore || 75);

let output = {};
try {
  if (item?.output && typeof item.output === 'object' && !Array.isArray(item.output)) {
    output = item.output;
  } else if (typeof item?.output === 'string') {
    output = extractJson(item.output);
  } else if (item && typeof item === 'object' && ('accuracyScore' in item || 'pass' in item)) {
    output = item;
  } else {
    const content = item?.choices?.[0]?.message?.content
      || item?.message?.content
      || item?.output_text
      || null;
    if (typeof content === 'string') {
      output = extractJson(content);
    } else if (content && typeof content === 'object') {
      output = content;
    }
  }
} catch (e) {
  return {
    json: {
      ...draft,
      rewriteAttempt,
      status: rewriteAttempt < maxRewrite ? 'needs_rewrite' : 'failed',
      error: 'Failed to parse rating JSON: ' + (e.message || e),
      accuracyScore: 0,
      qualityScore: 0,
      overallScore: 0,
      accuracyPass: false,
      critiques: ['Rating parse failure'],
      qualityIssues: [],
      inventedClaims: ['Rating unavailable'],
      raterModel: config.raterModel,
    },
  };
}

const accuracyScore = Math.max(0, Math.min(100, Number(output.accuracyScore) || 0));
const qualityScore = Math.max(0, Math.min(100, Number(output.qualityScore) || 0));
const overallScore = Math.round(
  Number.isFinite(Number(output.score))
    ? Number(output.score)
    : 0.55 * accuracyScore + 0.45 * qualityScore,
);
const inventedClaims = Array.isArray(output.inventedClaims) ? output.inventedClaims.filter(Boolean) : [];
const critiques = Array.isArray(output.critiques) ? output.critiques.filter(Boolean) : [];
const qualityIssues = Array.isArray(output.qualityIssues) ? output.qualityIssues.filter(Boolean) : [];
const accuracyPass = inventedClaims.length === 0
  && accuracyScore >= minAccuracy
  && qualityScore >= minQuality
  && overallScore >= minOverall
  && output.pass !== false;

let status = 'ready';
if (!accuracyPass) {
  status = rewriteAttempt < maxRewrite ? 'needs_rewrite' : 'failed';
}

const error = status === 'failed'
  ? ('Accuracy/quality gate failed after ' + rewriteAttempt + ' rewrite(s): ' + (critiques.join('; ') || output.summary || 'below threshold'))
  : null;

return {
  json: {
    ...draft,
    rewriteAttempt,
    status,
    accuracyScore,
    qualityScore,
    overallScore,
    accuracyPass,
    critiques,
    qualityIssues,
    inventedClaims,
    ratingSummary: output.summary || null,
    raterModel: config.raterModel,
    error,
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
            expression: '0 10 * * 1-5',
          },
        ],
      },
    },
  },
  output: [{}],
});

const outreachConfig = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Outreach Config',
    position: [260, 340],
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'maxDraftsPerRun', name: 'maxDraftsPerRun', value: 3, type: 'number' },
          {
            id: 'minWhiteLabelScore',
            name: 'minWhiteLabelScore',
            value: 70,
            type: 'number',
          },
          { id: 'cooldownDays', name: 'cooldownDays', value: 30, type: 'number' },
          { id: 'fromName', name: 'fromName', value: 'Duncan', type: 'string' },
          {
            id: 'ctaUrl',
            name: 'ctaUrl',
            value: 'https://grandriverlabs.io/whitelabel',
            type: 'string',
          },
          {
            id: 'replyTo',
            name: 'replyTo',
            value: 'hello@grandriverlabs.com',
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
          { id: 'maxRewriteAttempts', name: 'maxRewriteAttempts', value: 2, type: 'number' },
          { id: 'minAccuracyScore', name: 'minAccuracyScore', value: 80, type: 'number' },
          { id: 'minQualityScore', name: 'minQualityScore', value: 70, type: 'number' },
          { id: 'minOverallScore', name: 'minOverallScore', value: 75, type: 'number' },
        ],
      },
    },
  },
  output: [
    {
      maxDraftsPerRun: 3,
      minWhiteLabelScore: 70,
      cooldownDays: 30,
      fromName: 'Duncan',
      ctaUrl: 'https://grandriverlabs.io/whitelabel',
      replyTo: 'hello@grandriverlabs.com',
      productPitch:
        'Grand River Labs helps agencies and consultants white-label AI automation delivery under their brand—discovery through support—while they keep the client relationship.',
      promptVersion: PROMPT_VERSION,
      model: MODEL,
      raterModel: RATER_MODEL,
      maxRewriteAttempts: 2,
      minAccuracyScore: 80,
      minQualityScore: 70,
      minOverallScore: 75,
    },
  ],
});

const ensureSchema = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Ensure Drafts Schema',
    position: [500, 340],
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
    name: 'Pull Eligible Agencies',
    position: [740, 340],
    alwaysOutputData: true,
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: `WITH cfg AS (
  SELECT $1::json AS p
)
SELECT
  a.id AS "agencyId",
  a.agency_name AS "agencyName",
  a.domain,
  a.website,
  a.city,
  a.category,
  a.contact_name AS "contactName",
  a.contact_email AS "contactEmail",
  a.contact_title AS "contactTitle",
  a.contact_verification_status AS "contactVerificationStatus",
  s.white_label_score AS "whiteLabelScore",
  s.fit_score AS "fitScore",
  s.tier,
  s.agency_type AS "agencyType",
  s.estimated_size AS "estimatedSize",
  s.synopsis,
  s.reasons,
  s.red_flags AS "redFlags"
FROM agencies a
JOIN agency_fit_scores s ON s.agency_id = a.id
LEFT JOIN agency_outreach_drafts d ON d.agency_id = a.id
CROSS JOIN cfg
WHERE s.white_label_fit = true
  AND s.is_real_agency = true
  AND s.white_label_score >= COALESCE(NULLIF(cfg.p->>'minWhiteLabelScore', '')::int, 70)
  AND a.contact_email IS NOT NULL
  AND btrim(a.contact_email) <> ''
  AND (
    d.agency_id IS NULL
    OR d.status IN ('failed', 'rejected')
    OR (
      d.status IN ('drafted', 'sent')
      AND d.drafted_at < NOW() - make_interval(
        days => COALESCE(NULLIF(cfg.p->>'cooldownDays', '')::int, 30)
      )
    )
  )
ORDER BY
  CASE
    WHEN lower(COALESCE(a.contact_verification_status, '')) IN ('verified', 'valid', 'contact_verified') THEN 0
    ELSE 1
  END,
  s.white_label_score DESC,
  a.agency_name ASC
LIMIT 50`,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(`{{ JSON.stringify({
  minWhiteLabelScore: $("Outreach Config").first().json.minWhiteLabelScore || 70,
  cooldownDays: $("Outreach Config").first().json.cooldownDays || 30
}) }}`),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [
    {
      agencyId: 1,
      agencyName: 'Bright Local SEO',
      domain: 'brightlocalseo.example.com',
      website: 'https://brightlocalseo.example.com',
      city: 'Grand Rapids',
      category: 'SEO Agency',
      contactName: 'Alex Rivera',
      contactEmail: 'alex@brightlocalseo.example.com',
      contactTitle: 'Founder',
      contactVerificationStatus: 'verified',
      whiteLabelScore: 82,
      fitScore: 77,
      tier: 'review',
      agencyType: 'local_seo',
      estimatedSize: 'small agency',
      synopsis: 'Strong local SEO partner serving SMB clients.',
      reasons: ['Serves SMB clients', 'Advises on ops/tech'],
      redFlags: [],
    },
  ],
});

const normalizeQueue = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize Draft Queue',
    position: [980, 340],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const config = $('Outreach Config').first().json;
const maxDrafts = Math.max(1, Number(config.maxDraftsPerRun) || 3);
const rows = $input.all()
  .map((item) => item.json)
  .filter((row) => row && row.agencyId && row.contactEmail)
  .slice(0, maxDrafts);

if (!rows.length) {
  return [{
    json: {
      queueCount: 0,
      emptyQueue: true,
      reason: 'empty_queue',
      message: 'No eligible white-label agencies with contact email for drafting.',
    },
  }];
}

return rows.map((row) => {
  const reasons = Array.isArray(row.reasons)
    ? row.reasons
    : (typeof row.reasons === 'string'
      ? (() => { try { return JSON.parse(row.reasons); } catch (e) { return []; } })()
      : []);
  const redFlags = Array.isArray(row.redFlags)
    ? row.redFlags
    : (typeof row.redFlags === 'string'
      ? (() => { try { return JSON.parse(row.redFlags); } catch (e) { return []; } })()
      : []);
  const contactName = String(row.contactName || '').trim();
  const firstName = contactName ? contactName.split(/\\s+/)[0] : '';
  return {
    json: {
      ...row,
      reasons,
      redFlags,
      contactFirstName: firstName,
      unverifiedContact: !['verified', 'valid', 'contact_verified'].includes(
        String(row.contactVerificationStatus || '').toLowerCase(),
      ),
      rewriteAttempt: 0,
      queueCount: rows.length,
      emptyQueue: false,
    },
  };
});`,
    },
  },
  output: [
    {
      agencyId: 1,
      agencyName: 'Bright Local SEO',
      contactEmail: 'alex@brightlocalseo.example.com',
      contactFirstName: 'Alex',
      rewriteAttempt: 0,
      queueCount: 1,
      emptyQueue: false,
    },
  ],
});

const hasCandidates = ifElse({
  version: 2.2,
  config: {
    name: 'Has Candidates?',
    position: [1220, 340],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'has-agency-id',
            leftValue: expr('{{ $json.agencyId }}'),
            operator: { type: 'number', operation: 'gt' },
            rightValue: 0,
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [
    [{ agencyId: 1, queueCount: 1 }],
    [{ emptyQueue: true, queueCount: 0 }],
  ],
});

const noDraftWork = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'No Draft Work',
    position: [1460, 520],
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

const agencyBatch = splitInBatches({
  version: 3,
  config: {
    name: 'Agency Batch Loop',
    position: [1460, 280],
    parameters: { batchSize: 1 },
  },
});

const draftOutreachModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'Draft Outreach Model',
    position: [1700, 360],
    parameters: {
      model: MODEL_RL,
      responsesApiEnabled: false,
      options: {
        baseURL: FIREWORKS_BASE_URL,
        temperature: 0.4,
        maxTokens: 2048,
      },
    },
    credentials: { openAiApi: newCredential('OpenAI account') },
  },
});

const draftAgencyEmail = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Draft Outreach',
    position: [1700, 200],
    ...AI_RETRY,
    parameters: {
      promptType: 'define',
      text: expr(`={{ [
  "Product pitch: " + $("Outreach Config").first().json.productPitch,
  "From name: " + $("Outreach Config").first().json.fromName,
  "CTA URL: " + $("Outreach Config").first().json.ctaUrl,
  "Reply-to: " + $("Outreach Config").first().json.replyTo,
  "Agency: " + $json.agencyName,
  "Domain: " + ($json.domain || ""),
  "Website: " + ($json.website || ""),
  "City: " + ($json.city || ""),
  "Category: " + ($json.category || ""),
  "Agency type: " + ($json.agencyType || ""),
  "Estimated size: " + ($json.estimatedSize || ""),
  "Contact first name: " + ($json.contactFirstName || "(unknown)"),
  "Contact title: " + ($json.contactTitle || ""),
  "White-label score: " + $json.whiteLabelScore,
  "Synopsis: " + String($json.synopsis || "(none)").slice(0, 500),
  "Reasons: " + JSON.stringify($json.reasons || []).slice(0, 500),
  "Write one partnership outreach email."
].join("\\n") }}`),
      options: {
        systemMessage:
          'You draft short cold partnership emails for Grand River Labs white-label outreach to agencies. Return raw JSON only, no markdown fences. Keys: subject, body, personalizationHook. Rules: - 120-180 words, plain text, no markdown, no hype, no pricing - One clear ask: reply or a short partner chat - Personalize from the synopsis/reasons; never invent clients, results, or prior relationships - Position: GRL designs/builds/supports AI automation under THEIR brand; they keep the client and margin - Soft-link the CTA URL once; sign as the from name at Grand River Labs - Use the contact first name when available; otherwise greet by agency name - If contact is unverified, still write normally (do not mention verification)',
        maxIterations: 3,
        enableStreaming: false,
      },
    },
    subnodes: {
      model: draftOutreachModel,
    },
  },
  output: [
    {
      output: {
        subject: 'White-label automation for Bright Local SEO clients',
        body: 'Hi Alex,\n\nQuick note from Grand River Labs...',
        personalizationHook: 'SMB local SEO focus',
      },
    },
  ],
});

const parseDraft = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Parse Draft Email',
    position: [1940, 200],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: PARSE_DRAFT_JS,
    },
  },
  output: [
    {
      agencyId: 1,
      contactEmail: 'alex@brightlocalseo.example.com',
      status: 'pending_rating',
      rewriteAttempt: 0,
      subject: 'White-label automation for Bright Local SEO clients',
      body: 'Hi Alex,\n\nQuick note from Grand River Labs...',
      personalizationHook: 'SMB local SEO focus',
    },
  ],
});

const draftParseOk = ifElse({
  version: 2.2,
  config: {
    name: 'Draft Parse OK?',
    position: [2100, 200],
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
  output: [
    [{ status: 'pending_rating', subject: 'Test', body: 'Body' }],
    [{ status: 'failed', error: 'parse failed' }],
  ],
});

const rateDraftModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'Rate Draft Model',
    position: [2300, 280],
    parameters: {
      model: { __rl: true, mode: 'id', value: RATER_MODEL },
      responsesApiEnabled: false,
      options: {
        baseURL: FIREWORKS_BASE_URL,
        temperature: 0.1,
        maxTokens: 4096,
      },
    },
    credentials: { openAiApi: newCredential('OpenAI account') },
  },
});

const rateDraft = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Rate Draft',
    position: [2300, 120],
    ...AI_RETRY,
    parameters: {
      promptType: 'define',
      text: expr(`={{ [
  "Thresholds: minAccuracy=" + $("Outreach Config").first().json.minAccuracyScore,
  "minQuality=" + $("Outreach Config").first().json.minQualityScore,
  "minOverall=" + $("Outreach Config").first().json.minOverallScore,
  "Product pitch: " + $("Outreach Config").first().json.productPitch,
  "Agency: " + $json.agencyName,
  "Domain: " + ($json.domain || ""),
  "City: " + ($json.city || ""),
  "Category: " + ($json.category || ""),
  "Agency type: " + ($json.agencyType || ""),
  "Contact first name: " + ($json.contactFirstName || "(unknown)"),
  "Contact title: " + ($json.contactTitle || ""),
  "Synopsis: " + String($json.synopsis || "(none)").slice(0, 500),
  "Reasons: " + JSON.stringify($json.reasons || []).slice(0, 500),
  "Draft subject: " + $json.subject,
  "Draft body:\\n" + $json.body,
  "Rate this draft for accuracy and quality."
].join("\\n") }}`),
      options: {
        systemMessage:
          'You are an independent critic rating cold white-label partnership outreach emails for Grand River Labs. Judge BOTH accuracy and quality. Be strict. Return raw JSON only, no markdown fences. Keys: pass, accuracyScore, qualityScore, score, critiques, inventedClaims, qualityIssues, summary. score should be round(0.55*accuracyScore + 0.45*qualityScore). Accuracy fail hard if: invented clients/metrics/relationships/services not in context; wrong agency/contact name; misstated offer (GRL must stay behind their brand, partner keeps client/margin); pricing; hype/unverifiable claims; personalization contradicts synopsis/reasons; any non-empty inventedClaims. Quality: specific personalization, concise 120-180 word structure, natural tone, non-spammy subject, soft clear CTA, easy to skim, no AI filler/buzzword stacking. Set pass true only if accuracyScore, qualityScore, and score meet the thresholds in the user message and inventedClaims is empty. critiques must be specific and fixable.',
        maxIterations: 3,
        enableStreaming: false,
      },
    },
    subnodes: {
      model: rateDraftModel,
    },
  },
  output: [
    {
      output: {
        pass: true,
        accuracyScore: 90,
        qualityScore: 85,
        score: 88,
        critiques: [],
        inventedClaims: [],
        qualityIssues: [],
        summary: 'Accurate and strong.',
      },
    },
  ],
});

const parseRating = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Parse Rating',
    position: [2540, 120],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: PARSE_RATING_JS,
    },
  },
  output: [
    {
      agencyId: 1,
      status: 'ready',
      accuracyScore: 90,
      qualityScore: 85,
      overallScore: 88,
      accuracyPass: true,
      rewriteAttempt: 0,
    },
  ],
});

const ratingPass = ifElse({
  version: 2.2,
  config: {
    name: 'Rating Pass?',
    position: [2780, 120],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'status-ready',
            leftValue: expr('{{ $json.status }}'),
            operator: { type: 'string', operation: 'equals' },
            rightValue: 'ready',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [
    [{ status: 'ready', subject: 'Test', body: 'Body', contactEmail: 'a@b.com' }],
    [{ status: 'needs_rewrite', critiques: ['fix personalization'] }],
  ],
});

const canRewrite = ifElse({
  version: 2.2,
  config: {
    name: 'Can Rewrite?',
    position: [2780, 320],
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
  output: [
    [{ status: 'needs_rewrite', rewriteAttempt: 0 }],
    [{ status: 'failed', rewriteAttempt: 2 }],
  ],
});

const rewriteOutreachModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'Rewrite Outreach Model',
    position: [3020, 480],
    parameters: {
      model: MODEL_RL,
      responsesApiEnabled: false,
      options: {
        baseURL: FIREWORKS_BASE_URL,
        temperature: 0.35,
        maxTokens: 4096,
      },
    },
    credentials: { openAiApi: newCredential('OpenAI account') },
  },
});

const rewriteOutreach = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Rewrite Outreach',
    position: [3020, 320],
    ...AI_RETRY,
    parameters: {
      promptType: 'define',
      text: expr(`={{ [
  "Product pitch: " + $("Outreach Config").first().json.productPitch,
  "From name: " + $("Outreach Config").first().json.fromName,
  "CTA URL: " + $("Outreach Config").first().json.ctaUrl,
  "Agency: " + $json.agencyName,
  "Domain: " + ($json.domain || ""),
  "City: " + ($json.city || ""),
  "Category: " + ($json.category || ""),
  "Contact first name: " + ($json.contactFirstName || "(unknown)"),
  "Synopsis: " + String($json.synopsis || "(none)").slice(0, 500),
  "Reasons: " + JSON.stringify($json.reasons || []).slice(0, 500),
  "Prior subject: " + $json.subject,
  "Prior body:\\n" + $json.body,
  "Accuracy score: " + $json.accuracyScore,
  "Quality score: " + $json.qualityScore,
  "Critiques: " + JSON.stringify($json.critiques || []),
  "Invented claims to remove: " + JSON.stringify($json.inventedClaims || []),
  "Quality issues: " + JSON.stringify($json.qualityIssues || []),
  "Rewrite the email to pass accuracy and quality gates."
].join("\\n") }}`),
      options: {
        systemMessage:
          'You rewrite cold partnership emails for Grand River Labs white-label outreach. Return raw JSON only, no markdown fences. Keys: subject, body, personalizationHook. Fix EVERY critique and quality issue. Remove invented claims. Rules: - 120-180 words, plain text, no markdown, no hype, no pricing - One clear ask: reply or a short partner chat - Personalize only from synopsis/reasons; never invent facts - Position: GRL designs/builds/supports under THEIR brand; they keep client and margin - Soft-link CTA URL once; sign as the from name at Grand River Labs',
        maxIterations: 3,
        enableStreaming: false,
      },
    },
    subnodes: {
      model: rewriteOutreachModel,
    },
  },
  output: [
    {
      output: {
        subject: 'Partnership idea for Bright Local SEO',
        body: 'Hi Alex,\n\nRewritten note...',
        personalizationHook: 'SMB local SEO focus',
      },
    },
  ],
});

const parseRewrite = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Parse Rewrite',
    position: [3260, 320],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: PARSE_REWRITE_JS,
    },
  },
  output: [
    {
      agencyId: 1,
      status: 'pending_rating',
      rewriteAttempt: 1,
      subject: 'Partnership idea for Bright Local SEO',
      body: 'Hi Alex,\n\nRewritten note...',
    },
  ],
});

const rewriteParseOk = ifElse({
  version: 2.2,
  config: {
    name: 'Rewrite Parse OK?',
    position: [3500, 320],
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
  output: [
    [{ status: 'pending_rating', rewriteAttempt: 1 }],
    [{ status: 'failed', error: 'rewrite parse failed' }],
  ],
});

const createGmailDraft = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Create Gmail Draft',
    position: [3020, 40],
    disabled: true,
    retryOnFail: true,
    maxTries: 2,
    waitBetweenTries: 3000,
    parameters: {
      resource: 'draft',
      operation: 'create',
      subject: expr('{{ $json.subject }}'),
      emailType: 'text',
      message: expr('{{ $json.body }}'),
      options: {
        sendTo: expr('{{ $json.contactEmail }}'),
        replyTo: expr("{{ $('Outreach Config').first().json.replyTo }}"),
      },
    },
    credentials: { gmailOAuth2: newCredential('Gmail account') },
  },
  output: [{ id: 'r123', message: { id: 'm456', threadId: 't789' } }],
});

const prepareDraftSuccess = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Draft Success',
    position: [3260, 40],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `function normalizeRating(raw) {
  const output = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
  const overallScore = Number.isFinite(Number(output.score))
    ? Number(output.score)
    : (Number.isFinite(Number(output.overallScore)) ? Number(output.overallScore) : null);
  const accuracyScore = Number.isFinite(Number(output.accuracyScore)) ? Number(output.accuracyScore) : null;
  const qualityScore = Number.isFinite(Number(output.qualityScore)) ? Number(output.qualityScore) : null;
  let critiques = Array.isArray(output.critiques) ? output.critiques.filter(Boolean) : [];
  let qualityIssues = Array.isArray(output.qualityIssues) ? output.qualityIssues.filter(Boolean) : [];
  const inventedClaims = Array.isArray(output.inventedClaims) ? output.inventedClaims.filter(Boolean) : [];
  const reasoning = typeof output.reasoning === 'string' ? output.reasoning.trim() : '';
  if (!critiques.length && reasoning) critiques = [reasoning];
  const ratingSummary = output.summary || reasoning || null;
  const accuracyPass = output.pass === true
    || (overallScore != null && overallScore > 75 && inventedClaims.length === 0);
  return {
    accuracyScore,
    qualityScore,
    overallScore,
    accuracyPass,
    critiques,
    qualityIssues,
    inventedClaims,
    ratingSummary,
  };
}

let draft = $('Parse Draft Email').itemMatching(0).json;
try {
  const rewritten = $('Parse Rewrite').itemMatching(0).json;
  if (
    rewritten
    && rewritten.status === 'pending_rating'
    && Number(rewritten.rewriteAttempt || 0) > Number(draft.rewriteAttempt || 0)
  ) {
    draft = rewritten;
  }
} catch (e) {
  // first pass — Parse Rewrite has not run yet
}

const ratingItem = $('AI Rate Draft').item.json;
const ratingRaw = (ratingItem && typeof ratingItem.output === 'object' && ratingItem.output)
  ? ratingItem.output
  : ratingItem;
const rating = normalizeRating(ratingRaw);
const config = $('Outreach Config').first().json;

return {
  json: {
    agencyId: draft.agencyId,
    contactEmail: draft.contactEmail,
    contactName: draft.contactName || null,
    subject: draft.subject,
    body: draft.body,
    personalizationHook: draft.personalizationHook,
    model: draft.model,
    promptVersion: draft.promptVersion,
    gmailDraftId: null,
    status: 'pending_review',
    error: null,
    accuracyScore: rating.accuracyScore,
    qualityScore: rating.qualityScore,
    overallScore: rating.overallScore,
    accuracyPass: rating.accuracyPass === true,
    critiques: rating.critiques,
    qualityIssues: rating.qualityIssues,
    rewriteAttempt: draft.rewriteAttempt || 0,
    raterModel: draft.raterModel || config.raterModel || null,
  },
};`,
    },
  },
  output: [
    {
      agencyId: 1,
      contactEmail: 'alex@brightlocalseo.example.com',
      subject: 'White-label automation for Bright Local SEO clients',
      body: 'Hi Alex...',
      gmailDraftId: null,
      status: 'pending_review',
      accuracyScore: 90,
      qualityScore: 85,
      overallScore: 88,
    },
  ],
});

const prepareAiError = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare AI Error',
    position: [1940, 480],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const agency = $('Agency Batch Loop').itemMatching(0).json;
const config = $('Outreach Config').first().json;
const item = $input.item.json;
const err = item.error || item;
const failureReason = typeof err === 'string'
  ? err
  : (err.message || err.description || err.error || 'AI outreach draft failed');
return {
  json: {
    agencyId: agency.agencyId,
    contactEmail: agency.contactEmail,
    contactName: agency.contactName || null,
    subject: null,
    body: null,
    personalizationHook: null,
    model: config.model,
    promptVersion: config.promptVersion,
    gmailDraftId: null,
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
  output: [{ agencyId: 1, status: 'failed', error: 'AI outreach draft failed' }],
});

const prepareParseFailure = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Parse Failure',
    position: [2300, 420],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const item = $input.item.json;
return {
  json: {
    agencyId: item.agencyId,
    contactEmail: item.contactEmail,
    contactName: item.contactName || null,
    subject: item.subject || null,
    body: item.body || null,
    personalizationHook: item.personalizationHook || null,
    model: item.model,
    promptVersion: item.promptVersion,
    gmailDraftId: null,
    status: 'failed',
    error: item.error || 'Draft not ready',
    accuracyScore: item.accuracyScore ?? null,
    qualityScore: item.qualityScore ?? null,
    overallScore: item.overallScore ?? null,
    accuracyPass: false,
    critiques: item.critiques || [],
    qualityIssues: item.qualityIssues || [],
    rewriteAttempt: item.rewriteAttempt || 0,
    raterModel: item.raterModel || null,
  },
};`,
    },
  },
  output: [{ agencyId: 1, status: 'failed', error: 'Draft not ready' }],
});

const prepareRatingFail = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Rating Fail',
    position: [3020, 480],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const item = $input.item.json;
return {
  json: {
    agencyId: item.agencyId,
    contactEmail: item.contactEmail,
    contactName: item.contactName || null,
    subject: item.subject || null,
    body: item.body || null,
    personalizationHook: item.personalizationHook || null,
    model: item.model,
    promptVersion: item.promptVersion,
    gmailDraftId: null,
    status: 'failed',
    error: item.error || 'Accuracy/quality gate failed',
    accuracyScore: item.accuracyScore ?? null,
    qualityScore: item.qualityScore ?? null,
    overallScore: item.overallScore ?? null,
    accuracyPass: false,
    critiques: item.critiques || [],
    qualityIssues: item.qualityIssues || [],
    rewriteAttempt: item.rewriteAttempt || 0,
    raterModel: item.raterModel || null,
  },
};`,
    },
  },
  output: [{ agencyId: 1, status: 'failed', error: 'Accuracy/quality gate failed' }],
});

const upsertDraftLog = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Upsert Draft Log',
    position: [3500, 200],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: `INSERT INTO agency_outreach_drafts (
  agency_id,
  contact_email,
  contact_name,
  subject,
  body_text,
  gmail_draft_id,
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
  NULLIF($1::json->>'contact_email', ''),
  NULLIF($1::json->>'contact_name', ''),
  NULLIF($1::json->>'subject', ''),
  NULLIF($1::json->>'body_text', ''),
  NULLIF($1::json->>'gmail_draft_id', ''),
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
ON CONFLICT (agency_id) DO UPDATE SET
  contact_email = EXCLUDED.contact_email,
  contact_name = EXCLUDED.contact_name,
  subject = COALESCE(EXCLUDED.subject, agency_outreach_drafts.subject),
  body_text = COALESCE(EXCLUDED.body_text, agency_outreach_drafts.body_text),
  gmail_draft_id = COALESCE(EXCLUDED.gmail_draft_id, agency_outreach_drafts.gmail_draft_id),
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
RETURNING agency_id, status, gmail_draft_id, overall_score, rewrite_attempts;`,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(`{{ JSON.stringify({
  agency_id: $json.agencyId,
  contact_email: $json.contactEmail || null,
  contact_name: $json.contactName || null,
  subject: $json.subject || null,
  body_text: $json.body || null,
  gmail_draft_id: $json.gmailDraftId || null,
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
  output: [{ agency_id: 1, status: 'pending_review', gmail_draft_id: null, overall_score: 88, rewrite_attempts: 0 }],
});

const credentialsSticky = sticky(
  '## Credentials\n\n- **Grand River Postgres** — eligible agencies + draft log\n- **OpenAI account** — AI Agent + OpenAI Chat Model (Fireworks base URL) for draft, rewrite, and accuracy/quality rating\n- **Gmail account** — unused for now (send flow later); Create Gmail Draft is disabled',
  [ensureSchema, draftAgencyEmail, rateDraft, createGmailDraft],
  { color: 5, position: [500, 40] },
);

const setupSticky = sticky(
  '## Draft White-Label Agency Outreach\n\nPulls scored white-label-fit agencies, drafts via AI Agent + OpenAI Chat Model (Fireworks base URL), rates accuracy+quality via a separate critic agent, rewrites up to 2 times on fail, then stores drafts as pending_review for human approve/reject in the Agency Outreach dashboard. No auto-send.',
  [outreachConfig, normalizeQueue],
  { color: 4, position: [260, 40] },
);

const successPath = prepareDraftSuccess.to(upsertDraftLog).to(nextBatch(agencyBatch));
const parseFailPath = prepareParseFailure.to(upsertDraftLog).to(nextBatch(agencyBatch));
const aiErrorPath = prepareAiError.to(upsertDraftLog).to(nextBatch(agencyBatch));
const ratingFailPath = prepareRatingFail.to(upsertDraftLog).to(nextBatch(agencyBatch));

// Cycle: rewrite → parse → rate again
const rewriteCycle = rewriteOutreach
  .to(parseRewrite)
  .to(
    rewriteParseOk
      .onTrue(rateDraft)
      .onFalse(parseFailPath),
  );

const afterRating = ratingPass
  .onTrue(successPath)
  .onFalse(
    canRewrite
      .onTrue(rewriteCycle)
      .onFalse(ratingFailPath),
  );

const draftPipeline = draftAgencyEmail
  .to(parseDraft)
  .to(
    draftParseOk
      .onTrue(rateDraft.to(parseRating).to(afterRating))
      .onFalse(parseFailPath),
  );

export default workflow(
  'draft-whitelabel-agency-outreach',
  'Draft White-Label Agency Outreach',
)
  .add(manualTrigger)
  .to(outreachConfig)
  .add(scheduleTrigger)
  .to(outreachConfig)
  .add(outreachConfig)
  .to(ensureSchema)
  .to(pullEligible)
  .to(normalizeQueue)
  .to(
    hasCandidates
      .onTrue(agencyBatch.onEachBatch(draftPipeline))
      .onFalse(noDraftWork),
  )
  .add(draftAgencyEmail.onError(aiErrorPath))
  .add(rateDraft.onError(aiErrorPath))
  .add(rewriteOutreach.onError(aiErrorPath))
  .add(credentialsSticky)
  .add(setupSticky);
