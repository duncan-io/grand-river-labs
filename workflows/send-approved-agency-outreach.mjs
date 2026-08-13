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
} from '@n8n/workflow-sdk';

const DB_RETRY = { retryOnFail: true, maxTries: 3, waitBetweenTries: 3000 };
const GMAIL_RETRY = {
  retryOnFail: true,
  maxTries: 2,
  waitBetweenTries: 3000,
  onError: 'continueErrorOutput',
};

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
CREATE INDEX IF NOT EXISTS idx_agency_outreach_drafts_sent_at
  ON agency_outreach_drafts(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_agency_outreach_drafts_status_updated
  ON agency_outreach_drafts(status, updated_at);

SELECT
  true AS schema_ready,
  to_regclass('public.agency_outreach_drafts') IS NOT NULL AS has_agency_outreach_drafts;`;

const CLAIM_SQL = `WITH cfg AS (
  SELECT $1::json AS p
),
sent_today AS (
  SELECT COUNT(*)::int AS cnt
  FROM agency_outreach_drafts
  WHERE status = 'sent'
    AND sent_at IS NOT NULL
    AND (sent_at AT TIME ZONE 'America/Toronto')::date
      = (NOW() AT TIME ZONE 'America/Toronto')::date
),
capacity AS (
  SELECT LEAST(
    COALESCE(NULLIF(cfg.p->>'maxPerRun', '')::int, 3),
    GREATEST(
      0,
      COALESCE(NULLIF(cfg.p->>'maxPerDay', '')::int, 10) - s.cnt
    )
  ) AS remaining
  FROM cfg
  CROSS JOIN sent_today s
),
to_claim AS (
  SELECT d.outreach_id
  FROM agency_outreach_drafts d
  CROSS JOIN capacity c
  WHERE d.status = 'approved'
    AND COALESCE(d.reply_detected, false) = false
    AND NULLIF(btrim(d.contact_email), '') IS NOT NULL
    AND NULLIF(btrim(d.subject), '') IS NOT NULL
    AND (
      NULLIF(btrim(COALESCE(d.body_text, '')), '') IS NOT NULL
      OR NULLIF(btrim(COALESCE(d.body_html, '')), '') IS NOT NULL
    )
    AND (
      COALESCE(d.sequence_no, 0) = 0
      OR NULLIF(btrim(COALESCE(d.gmail_thread_id, '')), '') IS NOT NULL
    )
    AND c.remaining > 0
  ORDER BY d.updated_at ASC
  FOR UPDATE OF d SKIP LOCKED
  LIMIT (SELECT remaining FROM capacity)
)
UPDATE agency_outreach_drafts d
SET
  status = 'sending',
  send_claimed_at = NOW(),
  error = NULL,
  updated_at = NOW()
FROM to_claim c
WHERE d.outreach_id = c.outreach_id
RETURNING
  d.outreach_id AS "outreachId",
  d.agency_id AS "agencyId",
  d.sequence_no AS "sequenceNo",
  d.parent_outreach_id AS "parentOutreachId",
  d.contact_email AS "contactEmail",
  d.contact_name AS "contactName",
  d.subject,
  d.body_text AS "bodyText",
  d.body_html AS "bodyHtml",
  d.gmail_thread_id AS "gmailThreadId",
  d.gmail_message_id AS "gmailMessageId",
  d.status,
  d.send_claimed_at AS "sendClaimedAt";`;

const MARK_SENT_SQL = `UPDATE agency_outreach_drafts
SET
  status = 'sent',
  gmail_message_id = NULLIF($1::json->>'gmail_message_id', ''),
  gmail_thread_id = COALESCE(
    NULLIF($1::json->>'gmail_thread_id', ''),
    gmail_thread_id
  ),
  sent_at = NOW(),
  error = NULL,
  updated_at = NOW()
WHERE outreach_id = ($1::json->>'outreach_id')::int
  AND status = 'sending'
RETURNING
  outreach_id AS "outreachId",
  agency_id AS "agencyId",
  sequence_no AS "sequenceNo",
  status,
  gmail_message_id AS "gmailMessageId",
  gmail_thread_id AS "gmailThreadId",
  sent_at AS "sentAt";`;

const MARK_FAILED_SQL = `UPDATE agency_outreach_drafts
SET
  status = 'send_failed',
  error = NULLIF($1::json->>'error', ''),
  updated_at = NOW()
WHERE outreach_id = ($1::json->>'outreach_id')::int
  AND status = 'sending'
RETURNING
  outreach_id AS "outreachId",
  agency_id AS "agencyId",
  status,
  error;`;

const MARK_REPLIED_SQL = `UPDATE agency_outreach_drafts
SET
  reply_detected = true,
  replied_at = COALESCE(replied_at, NOW()),
  status = CASE
    WHEN status IN ('pending_review', 'approved', 'sending') THEN 'cancelled_replied'
    ELSE status
  END,
  error = CASE
    WHEN status IN ('pending_review', 'approved', 'sending')
      THEN 'Cancelled: reply detected before send'
    ELSE error
  END,
  updated_at = NOW()
WHERE outreach_id = ($1::json->>'outreach_id')::int
RETURNING
  outreach_id AS "outreachId",
  agency_id AS "agencyId",
  status,
  reply_detected AS "replyDetected";`;

const PREPARE_EMAIL_JS = `const row = $input.item.json;
const config = $('Send Config').first().json;
const html = String(row.bodyHtml || '').trim();
const text = String(row.bodyText || '').trim();
let message = text;
if (!message && html) {
  message = html
    .replace(/<br\\s*\\/?>/gi, '\\n')
    .replace(/<\\/p>/gi, '\\n\\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}
const sequenceNo = Number(row.sequenceNo || 0);
return {
  json: {
    outreachId: row.outreachId,
    agencyId: row.agencyId,
    sequenceNo,
    isFollowUp: sequenceNo > 0,
    parentOutreachId: row.parentOutreachId || null,
    contactEmail: String(row.contactEmail || '').trim(),
    contactName: row.contactName || null,
    subject: String(row.subject || '').trim(),
    message,
    replyTo: config.replyTo,
    senderName: config.fromName,
    gmailThreadId: row.gmailThreadId || null,
    gmailMessageId: row.gmailMessageId || null,
    status: row.status,
  },
};`;

const DETECT_REPLY_JS = `const payload = $('Prepare Email Payload').item.json;
const item = $input.item.json;
const messages = Array.isArray(item.messages)
  ? item.messages
  : (Array.isArray(item) ? item : []);

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
  const labelIds = Array.isArray(labels) ? labels.map((l) => String(l.id || l || '').toUpperCase()) : [];
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

return {
  json: {
    ...payload,
    hasReply,
    replyCheckStatus: hasReply ? 'replied' : 'unanswered',
  },
};`;

const PREPARE_SEND_ERROR_JS = `const claimed = $('Send Loop').itemMatching(0).json;
const item = $input.item.json;
const err = item.error || item;
const failureReason = typeof err === 'string'
  ? err
  : (err.message || err.description || err.error || 'Gmail send failed');
return {
  json: {
    outreachId: claimed.outreachId,
    agencyId: claimed.agencyId,
    contactEmail: claimed.contactEmail,
    subject: claimed.subject,
    status: 'send_failed',
    error: String(failureReason).slice(0, 1000),
  },
};`;

const NORMALIZE_QUEUE_JS = `const rows = $input.all()
  .map((item) => item.json)
  .filter((row) => row && row.outreachId && row.contactEmail && row.subject);

if (!rows.length) {
  return [];
}

return rows.map((row) => ({
  json: {
    ...row,
    queueCount: rows.length,
  },
}));`;

const manualTrigger = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: {
    name: 'Manual Trigger',
    position: [0, 300],
  },
  output: [{}],
});

const scheduleTrigger = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.3,
  config: {
    name: 'Every 5 Minutes',
    position: [0, 500],
    parameters: {
      rule: {
        interval: [
          {
            field: 'minutes',
            minutesInterval: 5,
          },
        ],
      },
    },
  },
  output: [{}],
});

const sendConfig = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Send Config',
    position: [220, 400],
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'maxPerDay', name: 'maxPerDay', value: 10, type: 'number' },
          { id: 'maxPerRun', name: 'maxPerRun', value: 3, type: 'number' },
          { id: 'windowStartHour', name: 'windowStartHour', value: 9, type: 'number' },
          { id: 'windowEndHour', name: 'windowEndHour', value: 16, type: 'number' },
          { id: 'timezone', name: 'timezone', value: 'America/Toronto', type: 'string' },
          { id: 'fromName', name: 'fromName', value: 'Duncan', type: 'string' },
          {
            id: 'replyTo',
            name: 'replyTo',
            value: 'duncan@grandriverlabs.io',
            type: 'string',
          },
        ],
      },
    },
  },
  output: [
    {
      maxPerDay: 10,
      maxPerRun: 3,
      windowStartHour: 9,
      windowEndHour: 16,
      timezone: 'America/Toronto',
      fromName: 'Duncan',
      replyTo: 'duncan@grandriverlabs.io',
    },
  ],
});

const ensureSendSchema = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Ensure Send Schema',
    position: [440, 400],
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

const withinSendWindow = ifElse({
  version: 2.2,
  config: {
    name: 'Within Send Window?',
    position: [660, 400],
    parameters: {
      conditions: {
        options: {
          caseSensitive: true,
          leftValue: '',
          typeValidation: 'loose',
          version: 1,
        },
        conditions: [
          {
            id: 'weekday-and-hour',
            leftValue: expr(
              '{{ (() => { const z = $now.setZone("America/Toronto"); const start = Number($("Send Config").first().json.windowStartHour); const end = Number($("Send Config").first().json.windowEndHour); return z.weekday >= 1 && z.weekday <= 5 && z.hour >= start && z.hour < end; })() }}',
            ),
            operator: { type: 'boolean', operation: 'true', singleValue: true },
            rightValue: '',
          },
        ],
        combinator: 'and',
      },
      options: {},
    },
  },
  output: [[{ withinWindow: true }], [{ withinWindow: false }]],
});

const outsideSendWindow = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Outside Send Window',
    position: [880, 560],
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          {
            id: 'status',
            name: 'status',
            value: 'outside_window',
            type: 'string',
          },
          {
            id: 'message',
            name: 'message',
            value: 'Skipped: outside weekday 09:00-16:00 America/Toronto send window.',
            type: 'string',
          },
        ],
      },
    },
  },
  output: [
    {
      status: 'outside_window',
      message: 'Skipped: outside weekday 09:00-16:00 America/Toronto send window.',
    },
  ],
});

const claimApprovedRows = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Claim Approved Rows',
    position: [880, 300],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: CLAIM_SQL,
      options: {
        connectionTimeout: 30,
        queryBatching: 'transaction',
        queryReplacement: expr(
          '{{ JSON.stringify({ maxPerDay: $("Send Config").first().json.maxPerDay || 10, maxPerRun: $("Send Config").first().json.maxPerRun || 3 }) }}',
        ),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [
    {
      outreachId: 1,
      agencyId: 1,
      sequenceNo: 0,
      parentOutreachId: null,
      contactEmail: 'partner@example.com',
      contactName: 'Alex',
      subject: 'Partnership idea',
      bodyText: 'Hello...',
      bodyHtml: null,
      gmailThreadId: null,
      gmailMessageId: null,
      status: 'sending',
      sendClaimedAt: '2026-07-28T13:00:00.000Z',
    },
  ],
});

const normalizeSendQueue = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize Send Queue',
    position: [1100, 300],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: NORMALIZE_QUEUE_JS,
    },
  },
  output: [
    {
      outreachId: 1,
      agencyId: 1,
      sequenceNo: 0,
      contactEmail: 'partner@example.com',
      contactName: 'Alex',
      subject: 'Partnership idea',
      bodyText: 'Hello...',
      bodyHtml: null,
      status: 'sending',
      queueCount: 1,
    },
  ],
});

const sendLoop = splitInBatches({
  version: 3,
  config: {
    name: 'Send Loop',
    position: [1320, 300],
    parameters: {
      batchSize: 1,
      options: {},
    },
  },
});

const prepareEmailPayload = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Email Payload',
    position: [1540, 300],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: PREPARE_EMAIL_JS,
    },
  },
  output: [
    {
      outreachId: 1,
      agencyId: 1,
      sequenceNo: 0,
      isFollowUp: false,
      contactEmail: 'partner@example.com',
      contactName: 'Alex',
      subject: 'Partnership idea',
      message: 'Hello...',
      replyTo: 'duncan@grandriverlabs.io',
      senderName: 'Duncan',
      gmailThreadId: null,
      status: 'sending',
    },
  ],
});

const isFollowUp = ifElse({
  version: 2.2,
  config: {
    name: 'Is Follow Up?',
    position: [1760, 300],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'is-follow-up',
            leftValue: expr('{{ $json.isFollowUp }}'),
            operator: { type: 'boolean', operation: 'true', singleValue: true },
            rightValue: '',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [
    [{ isFollowUp: true, gmailThreadId: 'thr456', outreachId: 2 }],
    [{ isFollowUp: false, outreachId: 1 }],
  ],
});

const getThreadForReplyCheck = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Get Thread For Reply Check',
    position: [1980, 120],
    ...GMAIL_RETRY,
    parameters: {
      resource: 'thread',
      operation: 'get',
      threadId: expr('{{ $json.gmailThreadId }}'),
      simple: false,
      options: {
        returnOnlyMessages: true,
      },
    },
    credentials: { gmailOAuth2: newCredential('Gmail account') },
  },
  output: [
    {
      id: 'thr456',
      messages: [
        { id: 'msg1', From: 'Duncan <duncan@grandriverlabs.io>', labels: [{ id: 'SENT' }] },
      ],
    },
  ],
});

const detectReplyBeforeSend = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Detect Reply Before Send',
    position: [2200, 120],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: DETECT_REPLY_JS,
    },
  },
  output: [
    {
      outreachId: 2,
      isFollowUp: true,
      hasReply: false,
      replyCheckStatus: 'unanswered',
      gmailThreadId: 'thr456',
      message: 'Quick follow-up...',
      senderName: 'Duncan',
    },
  ],
});

const stillUnanswered = ifElse({
  version: 2.2,
  config: {
    name: 'Still Unanswered?',
    position: [2420, 120],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'no-reply',
            leftValue: expr('{{ $json.hasReply }}'),
            operator: { type: 'boolean', operation: 'false', singleValue: true },
            rightValue: '',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [
    [{ hasReply: false, outreachId: 2 }],
    [{ hasReply: true, outreachId: 2 }],
  ],
});

const markRepliedCancel = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Mark Replied Cancel Send',
    position: [2640, 280],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: MARK_REPLIED_SQL,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(
          '{{ JSON.stringify({ outreach_id: $json.outreachId }) }}',
        ),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [
    {
      outreachId: 2,
      agencyId: 1,
      status: 'cancelled_replied',
      replyDetected: true,
    },
  ],
});

const sendGmailMessage = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Send Gmail Message',
    position: [1980, 400],
    ...GMAIL_RETRY,
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr('{{ $json.contactEmail }}'),
      subject: expr('{{ $json.subject }}'),
      emailType: 'text',
      message: expr('{{ $json.message }}'),
      options: {
        appendAttribution: false,
        senderName: expr('{{ $json.senderName }}'),
        replyTo: expr('{{ $json.replyTo }}'),
      },
    },
    credentials: { gmailOAuth2: newCredential('Gmail account') },
  },
  output: [{ id: 'msg123', threadId: 'thr456', labelIds: ['SENT'] }],
});

const replyInThread = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Reply In Thread',
    position: [2640, 40],
    ...GMAIL_RETRY,
    parameters: {
      resource: 'thread',
      operation: 'reply',
      threadId: expr('{{ $json.gmailThreadId }}'),
      messageId: expr('{{ $json.gmailMessageId || "" }}'),
      emailType: 'text',
      message: expr('{{ $json.message }}'),
      options: {
        senderName: expr('{{ $json.senderName }}'),
        replyToRecipientsOnly: true,
      },
    },
    credentials: { gmailOAuth2: newCredential('Gmail account') },
  },
  output: [{ id: 'msg789', threadId: 'thr456', labelIds: ['SENT'] }],
});

const markSent = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Mark Sent',
    position: [2860, 200],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: MARK_SENT_SQL,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(
          '{{ JSON.stringify({ gmail_message_id: $json.id || null, gmail_thread_id: $json.threadId || null, outreach_id: $("Prepare Email Payload").item.json.outreachId }) }}',
        ),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [
    {
      outreachId: 1,
      agencyId: 1,
      sequenceNo: 0,
      status: 'sent',
      gmailMessageId: 'msg123',
      gmailThreadId: 'thr456',
      sentAt: '2026-07-28T13:01:00.000Z',
    },
  ],
});

const prepareSendError = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Send Error',
    position: [2860, 440],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: PREPARE_SEND_ERROR_JS,
    },
  },
  output: [
    {
      outreachId: 1,
      agencyId: 1,
      contactEmail: 'partner@example.com',
      subject: 'Partnership idea',
      status: 'send_failed',
      error: 'Gmail send failed',
    },
  ],
});

const markSendFailed = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Mark Send Failed',
    position: [3080, 440],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: MARK_FAILED_SQL,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(
          '{{ JSON.stringify({ error: $json.error || "Gmail send failed", outreach_id: $json.outreachId }) }}',
        ),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [
    {
      outreachId: 1,
      agencyId: 1,
      status: 'send_failed',
      error: 'Gmail send failed',
    },
  ],
});

const sendComplete = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Send Complete',
    position: [1540, 120],
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          {
            id: 'status',
            name: 'status',
            value: 'complete',
            type: 'string',
          },
        ],
      },
    },
  },
  output: [{ status: 'complete' }],
});

const overviewSticky = sticky(
  '## Send Approved Agency Outreach\n\nPolls Grand River Postgres every 5 minutes, claims human-approved drafts (initial + follow-ups), and sends via Gmail.\n\nFollow-ups reply in the original thread after a final no-response check.\nGuardrails: weekdays 09:00–16:00 America/Toronto, max 3/run and 10 sent/day.\nStatus path: `approved` → `sending` → `sent` | `send_failed` | `cancelled_replied`.',
  [sendConfig, ensureSendSchema, withinSendWindow],
  { color: 4, position: [220, 40] },
);

const credentialsSticky = sticky(
  '## Credentials\n\n- **Grand River Postgres** — claim approved drafts + write delivery status\n- **Gmail account** — send initial outreach and thread-reply follow-ups',
  [claimApprovedRows, sendGmailMessage, replyInThread, markSent],
  { color: 5, position: [880, 40] },
);

const successPath = markSent.to(nextBatch(sendLoop));
const failurePath = prepareSendError.to(markSendFailed).to(nextBatch(sendLoop));
const cancelledPath = markRepliedCancel.to(nextBatch(sendLoop));

const followUpPath = getThreadForReplyCheck
  .to(detectReplyBeforeSend)
  .to(
    stillUnanswered
      .onTrue(replyInThread.to(successPath))
      .onFalse(cancelledPath),
  );

const sendPipeline = prepareEmailPayload
  .to(
    isFollowUp
      .onTrue(followUpPath)
      .onFalse(sendGmailMessage.to(successPath)),
  );

export default workflow(
  'send-approved-agency-outreach',
  'Send Approved Agency Outreach',
)
  .add(manualTrigger)
  .to(sendConfig)
  .add(scheduleTrigger)
  .to(sendConfig)
  .add(sendConfig)
  .to(ensureSendSchema)
  .to(
    withinSendWindow
      .onTrue(
        claimApprovedRows
          .to(normalizeSendQueue)
          .to(
            sendLoop
              .onDone(sendComplete)
              .onEachBatch(sendPipeline),
          ),
      )
      .onFalse(outsideSendWindow),
  )
  .add(sendGmailMessage.onError(failurePath))
  .add(replyInThread.onError(failurePath))
  .add(getThreadForReplyCheck.onError(failurePath))
  .add(overviewSticky)
  .add(credentialsSticky);
