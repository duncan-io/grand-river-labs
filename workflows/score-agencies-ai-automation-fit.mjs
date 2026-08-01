import {
  workflow,
  node,
  trigger,
  sticky,
  newCredential,
  ifElse,
  splitInBatches,
  nextBatch,
  languageModel,
  outputParser,
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
  domain                          TEXT,
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
  evidence_confidence    TEXT,
  scored_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_agencies_domain ON agencies(domain);
CREATE INDEX IF NOT EXISTS idx_agencies_source_agency_id ON agencies(source_agency_id);
CREATE INDEX IF NOT EXISTS idx_agency_fit_scores_fit_score ON agency_fit_scores(fit_score DESC);
CREATE INDEX IF NOT EXISTS idx_agency_fit_scores_tier ON agency_fit_scores(tier);
CREATE INDEX IF NOT EXISTS idx_agency_fit_scores_scored_at ON agency_fit_scores(scored_at);

ALTER TABLE agencies ALTER COLUMN domain DROP NOT NULL;
ALTER TABLE agencies DROP CONSTRAINT IF EXISTS agencies_domain_key;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_source_id INTEGER;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_title TEXT;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_linkedin_url TEXT;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_source TEXT;
ALTER TABLE agencies ADD COLUMN IF NOT EXISTS contact_verification_status TEXT;
ALTER TABLE agency_fit_scores ADD COLUMN IF NOT EXISTS evidence_confidence TEXT;
CREATE INDEX IF NOT EXISTS idx_agencies_contact_email ON agencies(contact_email);
CREATE INDEX IF NOT EXISTS idx_agencies_contact_source_id ON agencies(contact_source_id);

SELECT
  true AS schema_ready,
  to_regclass('public.agencies') IS NOT NULL AS has_agencies,
  to_regclass('public.agency_fit_scores') IS NOT NULL AS has_agency_fit_scores;`;

const PULL_SQL = `SELECT
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
    CASE
      WHEN NULLIF(btrim(cont.email), '') IS NOT NULL
        AND EXISTS (
          SELECT 1
          FROM outreach_events oe
          WHERE oe.contact_id = cont.id
            AND oe.status = 'contact_verified'
        )
      THEN 0
      WHEN NULLIF(btrim(cont.email), '') IS NOT NULL THEN 1
      ELSE 2
    END,
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
ORDER BY a.created_at ASC, a.id ASC`;

const SYNC_AGENCY_SQL = `INSERT INTO agencies (
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
  NULLIF(p->>'domain', ''),
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
FROM (SELECT $1::json AS p) s
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
RETURNING id, source_agency_id, contact_email;`;

const UPSERT_SCORE_SQL = `WITH payload AS (
  SELECT $1::json AS p
),
agency_row AS (
  SELECT id
  FROM agencies
  WHERE source_agency_id = ((SELECT p FROM payload)->>'source_agency_id')::int
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
  evidence_confidence,
  scored_at,
  updated_at
)
SELECT
  a.id,
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
  NULLIF(p->>'evidence_confidence', ''),
  NOW(),
  NOW()
FROM agency_row a
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
  evidence_confidence = EXCLUDED.evidence_confidence,
  scored_at = NOW(),
  updated_at = NOW()
RETURNING agency_id, fit_score, tier, evidence_confidence;`;

const FILTER_JS = `const config = $('Scoring Config').first().json;
const maxAgencies = Number(config.maxAgenciesPerRun) || 100;
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

const allRows = $('Pull Source Agencies').all()
  .map((item) => item.json)
  .filter((row) => row && row.source_agency_id);

const totalSource = allRows.length;
const alreadyScored = allRows.filter((row) => scoredSet.has(Number(row.source_agency_id))).length;
const unscored = allRows.filter((row) => !scoredSet.has(Number(row.source_agency_id)));
const remainingAfterBatch = Math.max(0, unscored.length - maxAgencies);
const agencies = unscored.slice(0, maxAgencies).map((row) => {
  const hasWebsite = Boolean(row.website && String(row.website).trim());
  const hasDomain = Boolean(row.domain && String(row.domain).trim());
  const hasResearch = Boolean(
    (row.researchSummary && String(row.researchSummary).trim()) ||
    (row.homepageText && String(row.homepageText).trim()) ||
    (Array.isArray(row.services) ? row.services.length : row.services)
  );
  const evidenceConfidence = (hasWebsite || hasDomain) && hasResearch ? 'high' : 'low';
  return {
    ...row,
    evidenceConfidence,
    queueCount: Math.min(unscored.length, maxAgencies),
    emptyQueue: false,
    totalSource,
    alreadyScored,
    remainingUnscored: remainingAfterBatch,
  };
});

if (!agencies.length) {
  return [{
    json: {
      queueCount: 0,
      emptyQueue: true,
      reason: 'empty_queue',
      message: 'No unscored agencies remain in the complete LocalScout source set (or all recently scored).',
      totalSource,
      alreadyScored,
      remainingUnscored: 0,
    },
  }];
}

return agencies.map((row) => ({ json: row }));`;

const FLATTEN_JS = `const agency = $('Agency Batch Loop').itemMatching(0).json;
const config = $('Scoring Config').first().json;
const item = $input.item.json;

let output = {};
try {
  let content = item?.output ?? item?.choices?.[0]?.message?.content ?? item?.message?.content ?? null;
  if (typeof content === 'string') {
    const trimmed = content.trim();
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    output = JSON.parse(start >= 0 ? trimmed.slice(start, end + 1) : trimmed);
  } else if (content && typeof content === 'object') {
    output = content;
  } else if (item && typeof item === 'object') {
    output = item;
  }
} catch (e) {
  throw new Error('Failed to parse AI score JSON: ' + (e.message || e));
}

const scoreRaw = output.score ?? output.fitScore ?? output.whiteLabelScore;
const fitScore = Math.max(0, Math.min(100, Number(scoreRaw) || 0));
const whiteLabelScore = Math.max(
  0,
  Math.min(100, Number(output.whiteLabelScore ?? fitScore) || 0),
);
const opsAutomationScore = Math.max(
  0,
  Math.min(100, Number(output.opsAutomationScore ?? 0) || 0),
);

const isRealAgency =
  output.isRealAgency === undefined
    ? fitScore > 0
    : output.isRealAgency === true || output.isRealAgency === 'true';
const isCompetitor =
  output.isAiAutomationCompetitor === true ||
  output.isAiAutomationCompetitor === 'true';
const whiteLabelFit =
  output.whiteLabelFit === undefined
    ? fitScore >= (Number(config.reviewMinScore) || 50)
    : output.whiteLabelFit === true ||
      output.whiteLabelFit === 'true' ||
      String(output.whiteLabelFit || '').toLowerCase() === 'good';
const opsFit =
  output.opsFit === true ||
  output.opsFit === 'true' ||
  String(output.opsFit || '').toLowerCase() === 'good';

let finalFit = fitScore;
if (output.isRealAgency !== undefined && (!isRealAgency || isCompetitor)) {
  finalFit = Math.min(finalFit, 35);
}

const priorityMin = Number(config.priorityMinScore) || 80;
const reviewMin = Number(config.reviewMinScore) || 50;
let tier = 'low';
if (finalFit >= priorityMin) tier = 'priority';
else if (finalFit >= reviewMin) tier = 'review';

const reasons = Array.isArray(output.reasons)
  ? output.reasons
  : output.reasoning
    ? [String(output.reasoning)]
    : [];
const redFlags = Array.isArray(output.redFlags) ? output.redFlags : [];
const synopsis =
  (output.reasoning && String(output.reasoning).trim()) ||
  output.synopsis ||
  reasons.filter(Boolean).join('; ') ||
  null;

const evidenceConfidence =
  output.evidenceConfidence === 'high' || output.evidenceConfidence === 'low'
    ? output.evidenceConfidence
    : (agency.evidenceConfidence || 'low');

return {
  json: {
    ...agency,
    isRealAgency,
    isAiAutomationCompetitor: isCompetitor,
    whiteLabelFit,
    opsFit,
    whiteLabelScore,
    opsAutomationScore,
    fitScore: finalFit,
    score: finalFit,
    tier,
    reasons,
    redFlags,
    synopsis,
    agencyType: output.agencyType || null,
    estimatedSize: output.estimatedSize || null,
    evidenceConfidence,
    rawScore: output,
    status: 'scored',
  },
};`;

const chatModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'OpenAI Chat Model',
    position: [1904, 400],
    parameters: {
      model: {
        __rl: true,
        mode: 'id',
        value: 'accounts/fireworks/models/minimax-m3',
      },
      responsesApiEnabled: false,
      options: {
        temperature: 0.1,
      },
    },
    credentials: { openAiApi: newCredential('OpenAI account') },
  },
});

const structuredParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured',
  version: 1.3,
  config: {
    name: 'Structured Output Parser',
    position: [2064, 384],
    parameters: {
      schemaType: 'fromJson',
      jsonSchemaExample: `{
  "score": 75,
  "reasoning": "Two sentence explanation of white-label fit.",
  "evidenceConfidence": "high"
}`,
    },
  },
});

const scoreAgency = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Agent',
    position: [1888, 192],
    ...AI_RETRY,
    parameters: {
      promptType: 'define',
      text: expr(
        '=Evaluate if this agency is a good fit for Grand River Labs to partner with for white label services. Provide a score from 1 to 100 for white-label partnership fit.\\n\\nCriteria:\\n1. Does not currently offer automation services\\n2. Currently offers digital marketing services (not just website development)\\n\\nA agency is a better fit if\\n1. They have a lot of clients and/or social proof\\n2. They speak about AI or LLM optimization (forward thinking)\\n\\nIf website/domain/homepage evidence is missing, still score from available fields and set evidenceConfidence to \\"low\\". Otherwise use \\"high\\".\\n\\nAgency information\\nName: {{ $json.agencyName }}\\nDomain: {{ $json.domain || \\"(none)\\" }}\\nWebsite: {{ $json.website || \\"(none)\\" }}\\nCity: {{ $json.city || \\"\\" }}\\nCategory: {{ $json.category || \\"\\" }}\\nHomepage text: {{ $json.homepageText || \\"(not available)\\" }}\\nResearch summary: {{ $json.researchSummary || \\"(none)\\" }}\\nServices: {{ $json.services }}\\nSuggested evidenceConfidence: {{ $json.evidenceConfidence }}',
      ),
      hasOutputParser: true,
      options: {
        systemMessage:
          'You are an evaluator for Grand River Labs, a custom automation and AI agency. You look for opportunity, but are realistic. Return structured output only.',
      },
    },
    subnodes: {
      model: chatModel,
      outputParser: structuredParser,
    },
  },
  output: [
    {
      output: {
        score: 75,
        reasoning: 'Digital marketing agency with SMB clients and no automation offer.',
        evidenceConfidence: 'high',
      },
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
          { id: 'maxAgenciesPerRun', name: 'maxAgenciesPerRun', value: 100, type: 'number' },
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
        ],
      },
    },
  },
  output: [
    {
      maxAgenciesPerRun: 100,
      productPitch:
        'Grand River Labs helps agencies and consultants white-label AI automation delivery under their brand—discovery through support—while they keep the client relationship. Secondary offer: AI automation for the agency’s own ops (intake, triage, reporting, CRM hygiene).',
      scoreCooldownDays: 30,
      priorityMinScore: 80,
      reviewMinScore: 50,
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
      query: PULL_SQL,
      options: {
        connectionTimeout: 60,
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

const syncBatch = splitInBatches({
  version: 3,
  config: {
    name: 'Sync Agency Loop',
    position: [1220, 340],
    parameters: { batchSize: 1 },
  },
});

const syncAgencyContact = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Sync Agency And Contact',
    position: [1460, 200],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: SYNC_AGENCY_SQL,
      options: {
        connectionTimeout: 30,
        queryBatching: 'independently',
        queryReplacement: expr('={{ JSON.stringify({\n  source_agency_id: $json.source_agency_id,\n  domain: $json.domain || null,\n  agency_name: $json.agencyName,\n  website: $json.website || null,\n  city: $json.city || null,\n  phone: $json.phone || null,\n  rating: $json.rating ?? null,\n  review_count: $json.reviewCount ?? null,\n  category: $json.category || null,\n  source_url: $json.sourceUrl || null,\n  localscout_qualification_score: $json.localscoutQualificationScore ?? null,\n  contact_source_id: $json.contactSourceId ?? null,\n  contact_name: $json.contactName || null,\n  contact_email: $json.contactEmail || null,\n  contact_title: $json.contactTitle || null,\n  contact_linkedin_url: $json.contactLinkedinUrl || null,\n  contact_source: $json.contactSource || null,\n  contact_verification_status: $json.contactVerificationStatus || null\n}) }}'),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [{ id: 1, source_agency_id: 1, contact_email: 'alex@brightlocalseo.example.com' }],
});

const prepareQueueFilter = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Prepare Queue Filter',
    position: [1460, 400],
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'syncComplete', name: 'syncComplete', value: true, type: 'boolean' },
        ],
      },
    },
  },
  output: [{ syncComplete: true }],
});

const filterUnscoredQueue = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Filter Unscored Queue',
    position: [1700, 400],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: FILTER_JS,
    },
  },
  output: [
    {
      source_agency_id: 1,
      agencyName: 'Bright Local SEO',
      evidenceConfidence: 'high',
      queueCount: 1,
      emptyQueue: false,
      totalSource: 500,
      alreadyScored: 200,
      remainingUnscored: 200,
    },
  ],
});

const hasAgenciesToScore = ifElse({
  version: 2.2,
  config: {
    name: 'Has Agencies To Score?',
    position: [1940, 400],
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
    position: [2180, 560],
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
  output: [{ emptyQueue: true, queueCount: 0, remainingUnscored: 0, status: 'no_work' }],
});

const agencyBatch = splitInBatches({
  version: 3,
  config: {
    name: 'Agency Batch Loop',
    position: [2180, 320],
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
      jsCode: FLATTEN_JS,
    },
  },
  output: [
    {
      source_agency_id: 1,
      fitScore: 75,
      whiteLabelScore: 75,
      opsAutomationScore: 0,
      tier: 'review',
      evidenceConfidence: 'high',
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
      query: UPSERT_SCORE_SQL,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr(`={{ (() => {
  const scored = $('Flatten And Composite Score').item.json;
  const llm = $('AI Agent').item.json;
  const llmOut = (llm && (llm.output || llm)) || {};
  const llmScore = Number(llmOut.score ?? llmOut.fitScore ?? scored.fitScore);
  const fitScore = Number.isFinite(llmScore) ? Math.max(0, Math.min(100, llmScore)) : Number(scored.fitScore || 0);
  return JSON.stringify({
    source_agency_id: scored.source_agency_id,
    fit_score: fitScore,
    white_label_score: scored.whiteLabelScore ?? fitScore,
    ops_automation_score: scored.opsAutomationScore ?? 0,
    tier: scored.tier,
    is_real_agency: scored.isRealAgency,
    white_label_fit: scored.whiteLabelFit,
    ops_fit: scored.opsFit,
    agency_type: scored.agencyType || null,
    estimated_size: scored.estimatedSize || null,
    reasons: scored.reasons || (llmOut.reasoning ? [llmOut.reasoning] : []),
    red_flags: scored.redFlags || [],
    synopsis: scored.synopsis || llmOut.reasoning || null,
    evidence_confidence: scored.evidenceConfidence || llmOut.evidenceConfidence || 'low',
    raw_score: scored.rawScore || llmOut || {}
  });
})() }}`),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [{ agency_id: 1, fit_score: 75, tier: 'review', evidence_confidence: 'high' }],
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
  '## Credentials\n\n- **LocalScout Postgres** — read ALL agencies, research, preferred contacts\n- **Grand River Postgres** — schema + synced agencies/contacts + scores\n- **OpenAI account** — Fireworks-compatible chat model for scoring',
  [ensureSchema, pullSourceBatch, scoreAgency],
  { color: 5, position: [500, 40] },
);

const setupSticky = sticky(
  '## Score Agencies for AI Automation Fit\n\nPulls every LocalScout agency, syncs preferred contact into Grand River first, then scores up to `maxAgenciesPerRun` (100) unscored agencies per run. Domain/website optional; incomplete evidence is flagged `evidence_confidence=low`.',
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
  .to(
    syncBatch
      .onEachBatch(syncAgencyContact.to(nextBatch(syncBatch)))
      .onDone(
        prepareQueueFilter.to(
          filterUnscoredQueue.to(
            hasAgenciesToScore
              .onTrue(agencyBatch.onEachBatch(scorePipeline))
              .onFalse(noScoreWork),
          ),
        ),
      ),
  )
  .add(scoreAgency.onError(scoreErrorPath))
  .add(credentialsSticky)
  .add(setupSticky);
