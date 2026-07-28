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
const AI_RETRY = {
  retryOnFail: true,
  maxTries: 2,
  waitBetweenTries: 5000,
  onError: 'continueErrorOutput',
};

const SCHEMA_SQL = `CREATE TABLE IF NOT EXISTS agencies (
  id                              SERIAL PRIMARY KEY,
  source_agency_id                INTEGER NOT NULL UNIQUE,
  domain                          TEXT NOT NULL UNIQUE,
  agency_name                     TEXT NOT NULL,
  website                         TEXT,
  city                            TEXT,
  phone                           TEXT,
  rating                          NUMERIC,
  review_count                    INTEGER,
  category                        TEXT,
  source_url                      TEXT,
  localscout_qualification_score  INTEGER,
  created_at                      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS agency_fit_scores (
  agency_id              INTEGER PRIMARY KEY REFERENCES agencies(id) ON DELETE CASCADE,
  fit_score              INTEGER NOT NULL,
  white_label_score      INTEGER NOT NULL,
  ops_automation_score   INTEGER NOT NULL,
  tier                   TEXT NOT NULL,
  is_real_agency         BOOLEAN,
  white_label_fit        BOOLEAN,
  ops_fit                BOOLEAN,
  agency_type            TEXT,
  estimated_size         TEXT,
  reasons                JSONB,
  red_flags              JSONB,
  synopsis               TEXT,
  raw_score              JSONB,
  scored_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_agencies_domain ON agencies(domain);
CREATE INDEX IF NOT EXISTS idx_agencies_source_agency_id ON agencies(source_agency_id);
CREATE INDEX IF NOT EXISTS idx_agency_fit_scores_fit_score ON agency_fit_scores(fit_score DESC);
CREATE INDEX IF NOT EXISTS idx_agency_fit_scores_tier ON agency_fit_scores(tier);
CREATE INDEX IF NOT EXISTS idx_agency_fit_scores_scored_at ON agency_fit_scores(scored_at);

ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_source_id INTEGER;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_title TEXT;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_linkedin_url TEXT;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_source TEXT;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_verification_status TEXT;
CREATE INDEX IF NOT EXISTS idx_agencies_contact_email ON agencies(contact_email);
CREATE INDEX IF NOT EXISTS idx_agencies_contact_source_id ON agencies(contact_source_id);

SELECT
  true AS schema_ready,
  to_regclass('public.agencies') IS NOT NULL AS has_agencies,
  to_regclass('public.agency_fit_scores') IS NOT NULL AS has_agency_fit_scores;`;

const scoreAgency = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'AI Score Agency Fit',
    position: [1960, 200],
    ...AI_RETRY,
    parameters: {
      method: 'POST',
      url: 'https://api.fireworks.ai/inference/v1/chat/completions',
      authentication: 'genericCredentialType',
      genericAuthType: 'httpBearerAuth',
      sendBody: true,
      contentType: 'json',
      specifyBody: 'json',
      jsonBody: expr(`={{ JSON.stringify({
  model: "accounts/fireworks/models/minimax-m3",
  temperature: 0.1,
  max_tokens: 900,
  response_format: { type: "json_object" },
  messages: [
    {
      role: "system",
      content: "You score local SEO / digital agencies for Grand River Labs AI automation outreach. Emphasize white-label partner fit (primary) over ops automation fit (secondary). Apply gates strictly. Return JSON only with keys: isRealAgency, isAiAutomationCompetitor, whiteLabelFit, opsFit, whiteLabelScore, opsAutomationScore, reasons, redFlags, synopsis, agencyType, estimatedSize."
    },
    {
      role: "user",
      content: [
        "Product pitch: " + $("Scoring Config").first().json.productPitch,
        "Agency: " + $json.agencyName,
        "Website: " + $json.website,
        "Domain: " + $json.domain,
        "City: " + ($json.city || ""),
        "Category: " + ($json.category || "(unknown)"),
        "Rating: " + $json.rating,
        "Reviews: " + $json.reviewCount,
        "LocalScout qualification score (context only): " + ($json.localscoutQualificationScore ?? "(none)"),
        "Target clients: " + ($json.targetClients || "(unknown)"),
        "Services: " + (typeof $json.services === "string" ? $json.services : JSON.stringify($json.services || [])),
        "Differentiators: " + (typeof $json.differentiators === "string" ? $json.differentiators : JSON.stringify($json.differentiators || [])),
        "Research summary: " + ($json.researchSummary || "(none)"),
        "Homepage excerpt:",
        String($json.homepageText || "(not available)").slice(0, 3500),
        "",
        "Rubric:",
        "- isRealAgency: real agency/consultancy (not directory, lead-gen listicle, or pure software vendor)",
        "- isAiAutomationCompetitor: true if AI automation / AI agency delivery is their core offer",
        "- whiteLabelFit: good white-label partner (advises clients; serves SMB/local; small-mid capacity)",
        "- opsFit: agency itself would benefit from AI automation for internal ops",
        "- whiteLabelScore / opsAutomationScore: integers 0-100",
        "- reasons / redFlags: string arrays",
        "- synopsis: 1-2 sentences",
        "- agencyType / estimatedSize: short labels"
      ].join("\\n")
    }
  ]
}) }}`),
      options: {
        timeout: 60000,
      },
    },
    credentials: { httpBearerAuth: newCredential('Fireworks Bearer Auth') },
  },
  output: [
    {
      choices: [
        {
          message: {
            content:
              '{"isRealAgency":true,"isAiAutomationCompetitor":false,"whiteLabelFit":true,"opsFit":true,"whiteLabelScore":82,"opsAutomationScore":65,"reasons":["Serves SMB clients"],"redFlags":[],"synopsis":"Strong white-label partner.","agencyType":"local SEO agency","estimatedSize":"small agency"}',
          },
        },
      ],
    },
  ],
});

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
    name: 'Daily Schedule',
    position: [0, 440],
    parameters: {
      rule: {
        interval: [{ field: 'days', daysInterval: 1, triggerAtHour: 9 }],
      },
    },
  },
  output: [{}],
});

const scoringConfig = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Scoring Config',
    position: [260, 340],
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'maxAgenciesPerRun', name: 'maxAgenciesPerRun', value: 5, type: 'number' },
          {
            id: 'productPitch',
            name: 'productPitch',
            value:
              'Grand River Labs helps agencies and consultants white-label AI automation delivery under their brand—discovery through support—while they keep the client relationship. Secondary offer: AI automation for the agency’s own ops (intake, triage, reporting, CRM hygiene).',
            type: 'string',
          },
          { id: 'scoreCooldownDays', name: 'scoreCooldownDays', value: 30, type: 'number' },
          { id: 'priorityMinScore', name: 'priorityMinScore', value: 80, type: 'number' },
          { id: 'reviewMinScore', name: 'reviewMinScore', value: 50, type: 'number' },
          { id: 'sourcePullLimit', name: 'sourcePullLimit', value: 200, type: 'number' },
        ],
      },
    },
  },
  output: [
    {
      maxAgenciesPerRun: 5,
      productPitch:
        'Grand River Labs helps agencies and consultants white-label AI automation delivery under their brand—discovery through support—while they keep the client relationship. Secondary offer: AI automation for the agency’s own ops (intake, triage, reporting, CRM hygiene).',
      scoreCooldownDays: 30,
      priorityMinScore: 80,
      reviewMinScore: 50,
      sourcePullLimit: 200,
    },
  ],
});

const ensureSchema = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Ensure Schema',
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
  output: [{ schema_ready: true, has_agencies: true, has_agency_fit_scores: true }],
});

const getAlreadyScoredIds = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Get Already Scored IDs',
    position: [740, 340],
    executeOnce: true,
    alwaysOutputData: true,
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: `SELECT COALESCE(
  array_agg(a.source_agency_id)::text,
  '{}'
) AS "scoredSourceIds"
FROM agencies a
JOIN agency_fit_scores s ON s.agency_id = a.id
WHERE s.scored_at > NOW() - make_interval(days => COALESCE(NULLIF(($1)::text::int, 0), 30))`,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(
          '{{ $("Scoring Config").first().json.scoreCooldownDays || 30 }}',
        ),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [{ scoredSourceIds: '{}' }],
});

const pullSourceBatch = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Pull Source Agencies',
    position: [980, 340],
    executeOnce: true,
    alwaysOutputData: true,
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: `SELECT
  a.id AS source_agency_id,
  a.agency_name AS "agencyName",
  a.website,
  a.domain,
  a.city,
  a.phone,
  a.rating,
  a.review_count AS "reviewCount",
  a.source_url AS "sourceUrl",
  a.category,
  ar.summary AS "researchSummary",
  LEFT(COALESCE(ar.homepage_text, ''), 6000) AS "homepageText",
  ar.services,
  ar.target_clients AS "targetClients",
  ar.differentiators,
  (
    SELECT oe.qualification_score
    FROM outreach_events oe
    WHERE oe.agency_id = a.id
      AND oe.qualification_score IS NOT NULL
    ORDER BY oe.created_at DESC
    LIMIT 1
  ) AS "localscoutQualificationScore",
  c.id AS "contactSourceId",
  c.full_name AS "contactName",
  c.email AS "contactEmail",
  c.title AS "contactTitle",
  c.linkedin_url AS "contactLinkedinUrl",
  c.source AS "contactSource",
  c.email_verification_status AS "contactVerificationStatus"
FROM agencies a
LEFT JOIN agency_research ar ON ar.agency_id = a.id
LEFT JOIN LATERAL (
  SELECT
    cont.id,
    cont.full_name,
    cont.email,
    cont.title,
    cont.linkedin_url,
    cont.source,
    (
      SELECT oe.email_verification_status
      FROM outreach_events oe
      WHERE oe.contact_id = cont.id
        AND oe.email_verification_status IS NOT NULL
      ORDER BY
        CASE WHEN oe.status = 'contact_verified' THEN 0 ELSE 1 END,
        oe.created_at DESC
      LIMIT 1
    ) AS email_verification_status
  FROM contacts cont
  WHERE cont.agency_id = a.id
  ORDER BY
    (
      SELECT MAX(oe.created_at)
      FROM outreach_events oe
      WHERE oe.contact_id = cont.id
        AND oe.status = 'contact_verified'
    ) DESC NULLS LAST,
    cont.updated_at DESC NULLS LAST,
    cont.created_at DESC,
    cont.id DESC
  LIMIT 1
) c ON true
WHERE a.website IS NOT NULL
  AND btrim(a.website) <> ''
ORDER BY (ar.agency_id IS NOT NULL) DESC, a.created_at ASC, a.id ASC
LIMIT COALESCE(NULLIF(($1)::text::int, 0), 200)`,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(
          '{{ $("Scoring Config").first().json.sourcePullLimit || 200 }}',
        ),
      },
    },
    credentials: { postgres: newCredential('LocalScout Postgres') },
  },
  output: [
    {
      source_agency_id: 1,
      agencyName: 'Bright Local SEO',
      website: 'https://brightlocalseo.example.com',
      domain: 'brightlocalseo.example.com',
      city: 'Austin, TX',
      phone: '+1-512-555-0100',
      rating: 4.8,
      reviewCount: 42,
      sourceUrl: 'https://maps.google.com/?cid=123',
      category: 'Marketing agency',
      researchSummary: 'Local SEO agency serving home services.',
      homepageText: 'We help local businesses rank in Google Maps.',
      services: ['Local SEO', 'GBP'],
      targetClients: 'Local service businesses',
      differentiators: ['Maps-first'],
      localscoutQualificationScore: 88,
      contactSourceId: 101,
      contactName: 'Alex Rivera',
      contactEmail: 'alex@brightlocalseo.example.com',
      contactTitle: 'Founder',
      contactLinkedinUrl: 'https://linkedin.com/in/alexrivera',
      contactSource: 'hunter',
      contactVerificationStatus: 'valid',
    },
  ],
});

const filterUnscoredQueue = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Filter Unscored Queue',
    position: [1220, 340],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const config = $('Scoring Config').first().json;
const maxAgencies = Number(config.maxAgenciesPerRun) || 5;
const scoredRaw = String($('Get Already Scored IDs').first().json.scoredSourceIds || '{}');
let scoredSet = new Set();
try {
  const cleaned = scoredRaw.replace(/^\\{/, '').replace(/\\}$/, '').trim();
  if (cleaned) {
    for (const part of cleaned.split(',')) {
      const n = Number(part.trim());
      if (Number.isFinite(n)) scoredSet.add(n);
    }
  }
} catch (e) {
  scoredSet = new Set();
}

const agencies = $input.all()
  .map((item) => item.json)
  .filter((row) => row && row.source_agency_id)
  .filter((row) => !scoredSet.has(Number(row.source_agency_id)))
  .slice(0, maxAgencies);

if (!agencies.length) {
  return [{
    json: {
      queueCount: 0,
      emptyQueue: true,
      reason: 'empty_queue',
      message: 'No unscored agencies in pull window (or all recently scored).',
    },
  }];
}

return agencies.map((row) => ({
  json: {
    ...row,
    queueCount: agencies.length,
    emptyQueue: false,
  },
}));`,
    },
  },
  output: [
    {
      source_agency_id: 1,
      agencyName: 'Bright Local SEO',
      queueCount: 1,
      emptyQueue: false,
    },
  ],
});

const hasAgenciesToScore = ifElse({
  version: 2.2,
  config: {
    name: 'Has Agencies To Score?',
    position: [1460, 340],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'has-source-id',
            leftValue: expr('{{ $json.source_agency_id }}'),
            operator: { type: 'number', operation: 'gt' },
            rightValue: 0,
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [
    [{ source_agency_id: 1, queueCount: 1 }],
    [{ emptyQueue: true, queueCount: 0 }],
  ],
});

const noScoreWork = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'No Score Work',
    position: [1700, 520],
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
    position: [1700, 280],
    parameters: { batchSize: 1 },
  },
});

const flattenAndCompositeScore = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Flatten And Composite Score',
    position: [2220, 200],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const agency = $('Agency Batch Loop').itemMatching(0).json;
const config = $('Scoring Config').first().json;
const item = $input.item.json;

let output = {};
try {
  const content = item?.choices?.[0]?.message?.content
    || item?.output
    || item?.message?.content
    || null;
  if (typeof content === 'string') {
    const trimmed = content.trim();
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    output = JSON.parse(start >= 0 ? trimmed.slice(start, end + 1) : trimmed);
  } else if (content && typeof content === 'object') {
    output = content;
  } else if (item && typeof item === 'object' && ('whiteLabelScore' in item || 'isRealAgency' in item)) {
    output = item;
  }
} catch (e) {
  throw new Error('Failed to parse AI score JSON: ' + (e.message || e));
}

const whiteLabelScore = Math.max(0, Math.min(100, Number(output.whiteLabelScore) || 0));
const opsAutomationScore = Math.max(0, Math.min(100, Number(output.opsAutomationScore) || 0));
let fitScore = Math.round(0.7 * whiteLabelScore + 0.3 * opsAutomationScore);

const isRealAgency = output.isRealAgency === true || output.isRealAgency === 'true';
const isCompetitor = output.isAiAutomationCompetitor === true || output.isAiAutomationCompetitor === 'true';
const whiteLabelFit = output.whiteLabelFit === true || output.whiteLabelFit === 'true' || String(output.whiteLabelFit || '').toLowerCase() === 'good';
const opsFit = output.opsFit === true || output.opsFit === 'true' || String(output.opsFit || '').toLowerCase() === 'good';

if (!isRealAgency || isCompetitor) {
  fitScore = Math.min(fitScore, 35);
}

const priorityMin = Number(config.priorityMinScore) || 80;
const reviewMin = Number(config.reviewMinScore) || 50;
let tier = 'low';
if (isRealAgency && !isCompetitor && fitScore >= priorityMin) tier = 'priority';
else if (isRealAgency && !isCompetitor && fitScore >= reviewMin) tier = 'review';

const reasons = Array.isArray(output.reasons) ? output.reasons : [];
const redFlags = Array.isArray(output.redFlags) ? output.redFlags : [];

return {
  json: {
    ...agency,
    isRealAgency,
    isAiAutomationCompetitor: isCompetitor,
    whiteLabelFit,
    opsFit,
    whiteLabelScore,
    opsAutomationScore,
    fitScore,
    tier,
    reasons,
    redFlags,
    synopsis: output.synopsis || reasons.filter(Boolean).join('; ') || null,
    agencyType: output.agencyType || null,
    estimatedSize: output.estimatedSize || null,
    rawScore: output,
    status: 'scored',
  },
};`,
    },
  },
  output: [
    {
      source_agency_id: 1,
      fitScore: 77,
      whiteLabelScore: 82,
      opsAutomationScore: 65,
      tier: 'review',
      status: 'scored',
    },
  ],
});

const upsertScoredAgency = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Upsert Agency And Score',
    position: [2460, 200],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: `WITH payload AS (
  SELECT $1::json AS p
),
upserted AS (
  INSERT INTO agencies (
    source_agency_id,
    domain,
    agency_name,
    website,
    city,
    phone,
    rating,
    review_count,
    category,
    source_url,
    localscout_qualification_score,
    contact_source_id,
    contact_name,
    contact_email,
    contact_title,
    contact_linkedin_url,
    contact_source,
    contact_verification_status,
    updated_at
  )
  SELECT
    (p->>'source_agency_id')::int,
    p->>'domain',
    p->>'agency_name',
    NULLIF(p->>'website', ''),
    NULLIF(p->>'city', ''),
    NULLIF(p->>'phone', ''),
    NULLIF(p->>'rating', '')::numeric,
    NULLIF(p->>'review_count', '')::int,
    NULLIF(p->>'category', ''),
    NULLIF(p->>'source_url', ''),
    NULLIF(p->>'localscout_qualification_score', '')::int,
    NULLIF(p->>'contact_source_id', '')::int,
    NULLIF(p->>'contact_name', ''),
    NULLIF(p->>'contact_email', ''),
    NULLIF(p->>'contact_title', ''),
    NULLIF(p->>'contact_linkedin_url', ''),
    NULLIF(p->>'contact_source', ''),
    NULLIF(p->>'contact_verification_status', ''),
    NOW()
  FROM payload
  ON CONFLICT (source_agency_id) DO UPDATE SET
    domain = EXCLUDED.domain,
    agency_name = EXCLUDED.agency_name,
    website = EXCLUDED.website,
    city = EXCLUDED.city,
    phone = EXCLUDED.phone,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    category = EXCLUDED.category,
    source_url = EXCLUDED.source_url,
    localscout_qualification_score = EXCLUDED.localscout_qualification_score,
    contact_source_id = EXCLUDED.contact_source_id,
    contact_name = EXCLUDED.contact_name,
    contact_email = EXCLUDED.contact_email,
    contact_title = EXCLUDED.contact_title,
    contact_linkedin_url = EXCLUDED.contact_linkedin_url,
    contact_source = EXCLUDED.contact_source,
    contact_verification_status = EXCLUDED.contact_verification_status,
    updated_at = NOW()
  RETURNING id
)
INSERT INTO agency_fit_scores (
  agency_id,
  fit_score,
  white_label_score,
  ops_automation_score,
  tier,
  is_real_agency,
  white_label_fit,
  ops_fit,
  agency_type,
  estimated_size,
  reasons,
  red_flags,
  synopsis,
  raw_score,
  scored_at,
  updated_at
)
SELECT
  u.id,
  (p->>'fit_score')::int,
  (p->>'white_label_score')::int,
  (p->>'ops_automation_score')::int,
  p->>'tier',
  NULLIF(p->>'is_real_agency', '')::boolean,
  NULLIF(p->>'white_label_fit', '')::boolean,
  NULLIF(p->>'ops_fit', '')::boolean,
  NULLIF(p->>'agency_type', ''),
  NULLIF(p->>'estimated_size', ''),
  COALESCE((p->'reasons')::jsonb, '[]'::jsonb),
  COALESCE((p->'red_flags')::jsonb, '[]'::jsonb),
  NULLIF(p->>'synopsis', ''),
  COALESCE((p->'raw_score')::jsonb, '{}'::jsonb),
  NOW(),
  NOW()
FROM upserted u
CROSS JOIN payload
ON CONFLICT (agency_id) DO UPDATE SET
  fit_score = EXCLUDED.fit_score,
  white_label_score = EXCLUDED.white_label_score,
  ops_automation_score = EXCLUDED.ops_automation_score,
  tier = EXCLUDED.tier,
  is_real_agency = EXCLUDED.is_real_agency,
  white_label_fit = EXCLUDED.white_label_fit,
  ops_fit = EXCLUDED.ops_fit,
  agency_type = EXCLUDED.agency_type,
  estimated_size = EXCLUDED.estimated_size,
  reasons = EXCLUDED.reasons,
  red_flags = EXCLUDED.red_flags,
  synopsis = EXCLUDED.synopsis,
  raw_score = EXCLUDED.raw_score,
  scored_at = NOW(),
  updated_at = NOW()
RETURNING agency_id, fit_score, tier;`,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(`{{ JSON.stringify({
  source_agency_id: $json.source_agency_id,
  domain: $json.domain,
  agency_name: $json.agencyName,
  website: $json.website || null,
  city: $json.city || null,
  phone: $json.phone || null,
  rating: $json.rating ?? null,
  review_count: $json.reviewCount ?? null,
  category: $json.category || null,
  source_url: $json.sourceUrl || null,
  localscout_qualification_score: $json.localscoutQualificationScore ?? null,
  contact_source_id: $json.contactSourceId ?? null,
  contact_name: $json.contactName || null,
  contact_email: $json.contactEmail || null,
  contact_title: $json.contactTitle || null,
  contact_linkedin_url: $json.contactLinkedinUrl || null,
  contact_source: $json.contactSource || null,
  contact_verification_status: $json.contactVerificationStatus || null,
  fit_score: $json.fitScore,
  white_label_score: $json.whiteLabelScore,
  ops_automation_score: $json.opsAutomationScore,
  tier: $json.tier,
  is_real_agency: $json.isRealAgency,
  white_label_fit: $json.whiteLabelFit,
  ops_fit: $json.opsFit,
  agency_type: $json.agencyType || null,
  estimated_size: $json.estimatedSize || null,
  reasons: $json.reasons || [],
  red_flags: $json.redFlags || [],
  synopsis: $json.synopsis || null,
  raw_score: $json.rawScore || {}
}) }}`),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [{ agency_id: 1, fit_score: 77, tier: 'review' }],
});

const prepareScoreError = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Score Error',
    position: [2220, 420],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const agency = $('Agency Batch Loop').itemMatching(0).json;
const item = $input.item.json;
const err = item.error || item;
const failureReason = typeof err === 'string'
  ? err
  : (err.message || err.description || err.error || 'AI fit scoring failed');
return {
  json: {
    source_agency_id: agency.source_agency_id,
    domain: agency.domain,
    agencyName: agency.agencyName,
    status: 'score_failed',
    failureReason: String(failureReason),
  },
};`,
    },
  },
  output: [{ source_agency_id: 1, status: 'score_failed' }],
});

const credentialsSticky = sticky(
  '## Credentials\n\n- **LocalScout Postgres** — read agencies + research\n- **Grand River Postgres** — schema + scored agencies\n- **Fireworks Bearer Auth** — Fireworks chat completions for scoring',
  [ensureSchema, pullSourceBatch, scoreAgency],
  { color: 5, position: [500, 40] },
);

const setupSticky = sticky(
  '## Score Agencies for AI Automation Fit\n\nPulls LocalScout agencies, scores white-label (70%) + ops (30%) fit for Grand River Labs outreach, upserts into Grand River Postgres. Default batch is 5 for safe testing — raise `maxAgenciesPerRun` after review.',
  [scoringConfig, filterUnscoredQueue],
  { color: 4, position: [260, 40] },
);

const scoreErrorPath = prepareScoreError.to(nextBatch(agencyBatch));

const scorePipeline = scoreAgency
  .to(flattenAndCompositeScore)
  .to(upsertScoredAgency)
  .to(nextBatch(agencyBatch));

export default workflow('score-agencies-ai-automation-fit', 'Score Agencies for AI Automation Fit')
  .add(manualTrigger)
  .to(scoringConfig)
  .add(scheduleTrigger)
  .to(scoringConfig)
  .add(scoringConfig)
  .to(ensureSchema)
  .to(getAlreadyScoredIds)
  .to(pullSourceBatch)
  .to(filterUnscoredQueue)
  .to(
    hasAgenciesToScore
      .onTrue(agencyBatch.onEachBatch(scorePipeline))
      .onFalse(noScoreWork),
  )
  .add(scoreAgency.onError(scoreErrorPath))
  .add(credentialsSticky)
  .add(setupSticky);
