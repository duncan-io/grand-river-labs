import {
  workflow,
  node,
  trigger,
  sticky,
  newCredential,
  ifElse,
  expr,
} from '@n8n/workflow-sdk';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ACCESS_TOKEN = '63f6cddb8d8fe4ea045ba753cafce56a77131c88cb7e5126';
const DB_RETRY = { retryOnFail: true, maxTries: 3, waitBetweenTries: 3000 };

const htmlTemplate = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'chunks/agency-fit-dashboard.html'),
  'utf8',
);

const BUILD_PAGE_JS =
  'var boot = ' +
  JSON.stringify({
    apiBase: '',
    urls: {
      list: 'https://n8n.grandriverlabs.io/webhook/agency-fit/agencies',
      update: 'https://n8n.grandriverlabs.io/webhook/agency-fit/agencies/update',
    },
  }) +
  ';\n' +
  'var encoded = Buffer.from(JSON.stringify(boot)).toString("base64");\n' +
  'var html = ' +
  JSON.stringify(htmlTemplate) +
  '.replace("__DATA_PLACEHOLDER__", encoded);\n' +
  'return [{ json: { html: html } }];';

const LIST_SQL = `SELECT
  a.id AS agency_id,
  a.source_agency_id,
  a.domain,
  a.agency_name,
  a.website,
  a.city,
  a.phone,
  a.rating,
  a.review_count,
  a.category,
  a.source_url,
  a.localscout_qualification_score,
  s.fit_score,
  s.white_label_score,
  s.ops_automation_score,
  s.tier,
  s.is_real_agency,
  s.white_label_fit,
  s.ops_fit,
  s.agency_type,
  s.estimated_size,
  s.reasons,
  s.red_flags,
  s.synopsis,
  s.scored_at,
  s.updated_at
FROM agencies a
JOIN agency_fit_scores s ON s.agency_id = a.id
ORDER BY s.fit_score DESC, a.agency_name ASC`;

const UPDATE_SQL = `UPDATE agency_fit_scores SET
  fit_score = ($1::json->>'fit_score')::int,
  white_label_score = ($1::json->>'white_label_score')::int,
  ops_automation_score = ($1::json->>'ops_automation_score')::int,
  tier = $1::json->>'tier',
  synopsis = NULLIF($1::json->>'synopsis', ''),
  is_real_agency = ($1::json->>'is_real_agency')::boolean,
  white_label_fit = ($1::json->>'white_label_fit')::boolean,
  ops_fit = ($1::json->>'ops_fit')::boolean,
  updated_at = NOW()
WHERE agency_id = ($1::json->>'agency_id')::int
RETURNING
  agency_id,
  fit_score,
  white_label_score,
  ops_automation_score,
  tier,
  synopsis,
  is_real_agency,
  white_label_fit,
  ops_fit,
  updated_at`;

const AUTH_CODE_PAGE = `const cfg = $('Dashboard Config').first().json;
const expected = String(cfg.accessToken || '');
const item = $input.first().json;
const query = item.query || {};
const headers = item.headers || {};
const authHeader = String(headers.authorization || headers.Authorization || '');
let provided = String(query.token || '');
if (!provided && authHeader.toLowerCase().startsWith('bearer ')) {
  provided = authHeader.slice(7).trim();
}
const authorized = Boolean(expected) && provided === expected;
return [{
  json: {
    ...item,
    authorized,
    accessToken: expected,
  },
}];`;

const AUTH_CODE_LIST = `const cfg = $('Dashboard Config List').first().json;
const expected = String(cfg.accessToken || '');
const item = $input.first().json;
const query = item.query || {};
const headers = item.headers || {};
const authHeader = String(headers.authorization || headers.Authorization || '');
let provided = String(query.token || '');
if (!provided && authHeader.toLowerCase().startsWith('bearer ')) {
  provided = authHeader.slice(7).trim();
}
const authorized = Boolean(expected) && provided === expected;
return [{
  json: {
    ...item,
    authorized,
    accessToken: expected,
  },
}];`;

const AUTH_CODE_UPDATE = `const cfg = $('Dashboard Config Update').first().json;
const expected = String(cfg.accessToken || '');
const item = $input.first().json;
const query = item.query || {};
const headers = item.headers || {};
const authHeader = String(headers.authorization || headers.Authorization || '');
let provided = String(query.token || '');
if (!provided && authHeader.toLowerCase().startsWith('bearer ')) {
  provided = authHeader.slice(7).trim();
}
const authorized = Boolean(expected) && provided === expected;
return [{
  json: {
    ...item,
    authorized,
    accessToken: expected,
  },
}];`;

const pageWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.1,
  config: {
    name: 'GET Agency Fit Page',
    position: [0, 0],
    parameters: {
      httpMethod: 'GET',
      path: 'agency-fit',
      authentication: 'none',
      responseMode: 'responseNode',
      options: {},
    },
  },
  output: [{ query: { token: ACCESS_TOKEN }, headers: {}, body: {} }],
});

const listWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.1,
  config: {
    name: 'GET Agency Fit List',
    position: [0, 420],
    parameters: {
      httpMethod: 'GET',
      path: 'agency-fit/agencies',
      authentication: 'none',
      responseMode: 'responseNode',
      options: {},
    },
  },
  output: [{ query: { token: ACCESS_TOKEN }, headers: {}, body: {} }],
});

const updateWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.1,
  config: {
    name: 'POST Agency Fit Update',
    position: [0, 840],
    parameters: {
      httpMethod: 'POST',
      path: 'agency-fit/agencies/update',
      authentication: 'none',
      responseMode: 'responseNode',
      options: {},
    },
  },
  output: [
    {
      query: { token: ACCESS_TOKEN },
      headers: { authorization: 'Bearer ' + ACCESS_TOKEN },
      body: {
        agency_id: 1,
        fit_score: 77,
        white_label_score: 82,
        ops_automation_score: 65,
        tier: 'review',
        synopsis: 'Strong local SEO partner',
        is_real_agency: true,
        white_label_fit: true,
        ops_fit: true,
      },
    },
  ],
});

const dashboardConfigPage = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Dashboard Config',
    position: [240, 0],
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'accessToken', name: 'accessToken', value: ACCESS_TOKEN, type: 'string' },
        ],
      },
    },
  },
  output: [{ query: { token: ACCESS_TOKEN }, accessToken: ACCESS_TOKEN }],
});

const dashboardConfigList = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Dashboard Config List',
    position: [240, 420],
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'accessToken', name: 'accessToken', value: ACCESS_TOKEN, type: 'string' },
        ],
      },
    },
  },
  output: [{ query: { token: ACCESS_TOKEN }, accessToken: ACCESS_TOKEN }],
});

const dashboardConfigUpdate = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Dashboard Config Update',
    position: [240, 840],
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'accessToken', name: 'accessToken', value: ACCESS_TOKEN, type: 'string' },
        ],
      },
    },
  },
  output: [
    {
      query: { token: ACCESS_TOKEN },
      accessToken: ACCESS_TOKEN,
      body: {
        agency_id: 1,
        fit_score: 77,
        white_label_score: 82,
        ops_automation_score: 65,
        tier: 'review',
        synopsis: 'Strong local SEO partner',
        is_real_agency: true,
        white_label_fit: true,
        ops_fit: true,
      },
    },
  ],
});

const checkAuthPage = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Check Auth Page',
    position: [480, 0],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: AUTH_CODE_PAGE,
    },
  },
  output: [{ authorized: true, accessToken: ACCESS_TOKEN, query: { token: ACCESS_TOKEN } }],
});

const checkAuthList = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Check Auth List',
    position: [480, 420],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: AUTH_CODE_LIST,
    },
  },
  output: [{ authorized: true, accessToken: ACCESS_TOKEN, query: { token: ACCESS_TOKEN } }],
});

const checkAuthUpdate = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Check Auth Update',
    position: [480, 840],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: AUTH_CODE_UPDATE,
    },
  },
  output: [
    {
      authorized: true,
      accessToken: ACCESS_TOKEN,
      query: { token: ACCESS_TOKEN },
      body: {
        agency_id: 1,
        fit_score: 77,
        white_label_score: 82,
        ops_automation_score: 65,
        tier: 'review',
        synopsis: 'Strong local SEO partner',
        is_real_agency: true,
        white_label_fit: true,
        ops_fit: true,
      },
    },
  ],
});

const authPageOk = ifElse({
  version: 2.2,
  config: {
    name: 'Page Auth OK?',
    position: [720, 0],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'page-auth',
            leftValue: expr('{{ $json.authorized }}'),
            operator: { type: 'boolean', operation: 'true', singleValue: true },
            rightValue: '',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [[{ authorized: true }], [{ authorized: false }]],
});

const authListOk = ifElse({
  version: 2.2,
  config: {
    name: 'List Auth OK?',
    position: [720, 420],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'list-auth',
            leftValue: expr('{{ $json.authorized }}'),
            operator: { type: 'boolean', operation: 'true', singleValue: true },
            rightValue: '',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [[{ authorized: true }], [{ authorized: false }]],
});

const authUpdateOk = ifElse({
  version: 2.2,
  config: {
    name: 'Update Auth OK?',
    position: [720, 840],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
        conditions: [
          {
            id: 'update-auth',
            leftValue: expr('{{ $json.authorized }}'),
            operator: { type: 'boolean', operation: 'true', singleValue: true },
            rightValue: '',
          },
        ],
        combinator: 'and',
      },
    },
  },
  output: [[{ authorized: true }], [{ authorized: false }]],
});

const buildPage = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Build Dashboard HTML',
    position: [960, -80],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: BUILD_PAGE_JS,
    },
  },
  output: [{ html: '<html></html>' }],
});

const respondHtml = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond HTML',
    position: [1200, -80],
    parameters: {
      respondWith: 'text',
      responseBody: expr('{{ $json.html }}'),
      options: {
        responseCode: 200,
        responseHeaders: {
          entries: [{ name: 'Content-Type', value: 'text/html; charset=utf-8' }],
        },
      },
    },
  },
});

const respondPageUnauthorized = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Page 401',
    position: [960, 120],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { "error": "Unauthorized" } }}'),
      options: { responseCode: 401 },
    },
  },
});

const listAgencies = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'List Agencies',
    position: [960, 340],
    alwaysOutputData: true,
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: LIST_SQL,
      options: { connectionTimeout: 30 },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [
    {
      agency_id: 1,
      agency_name: 'Bright Local SEO',
      domain: 'brightlocalseo.example.com',
      city: 'Austin, TX',
      fit_score: 77,
      white_label_score: 82,
      ops_automation_score: 65,
      tier: 'review',
      is_real_agency: true,
      white_label_fit: true,
      ops_fit: true,
      agency_type: 'local_seo',
      estimated_size: 'small',
      synopsis: 'Strong local SEO partner',
      reasons: ['Maps-first'],
      red_flags: [],
      scored_at: '2026-07-27T12:00:00.000Z',
    },
  ],
});

const formatAgencyList = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Format Agency List',
    position: [1200, 340],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const rows = $input.all()
  .map((i) => i.json)
  .filter((r) => r && r.agency_id != null);
return [{ json: { agencies: rows } }];`,
    },
  },
  output: [
    {
      agencies: [
        {
          agency_id: 1,
          agency_name: 'Bright Local SEO',
          fit_score: 77,
          tier: 'review',
        },
      ],
    },
  ],
});

const respondList = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Agency List',
    position: [1440, 340],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ $json.agencies }}'),
      options: { responseCode: 200 },
    },
  },
});

const respondListUnauthorized = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond List 401',
    position: [960, 540],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { "error": "Unauthorized" } }}'),
      options: { responseCode: 401 },
    },
  },
});

const prepareUpdatePayload = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Update Payload',
    position: [960, 760],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const item = $input.first().json;
const body = item.body || item;
const agencyId = Number(body.agency_id);
if (!Number.isFinite(agencyId) || agencyId <= 0) {
  throw new Error('agency_id is required');
}
const tier = String(body.tier || 'low');
if (!['priority', 'review', 'low'].includes(tier)) {
  throw new Error('tier must be priority, review, or low');
}
const clamp = (n) => Math.max(0, Math.min(100, Number(n) || 0));
const payload = {
  agency_id: agencyId,
  fit_score: clamp(body.fit_score),
  white_label_score: clamp(body.white_label_score),
  ops_automation_score: clamp(body.ops_automation_score),
  tier,
  synopsis: body.synopsis == null ? '' : String(body.synopsis),
  is_real_agency: body.is_real_agency === true || body.is_real_agency === 'true',
  white_label_fit: body.white_label_fit === true || body.white_label_fit === 'true',
  ops_fit: body.ops_fit === true || body.ops_fit === 'true',
};
return [{ json: { payload, payloadJson: JSON.stringify(payload) } }];`,
    },
  },
  output: [
    {
      payload: {
        agency_id: 1,
        fit_score: 77,
        white_label_score: 82,
        ops_automation_score: 65,
        tier: 'review',
        synopsis: 'Strong local SEO partner',
        is_real_agency: true,
        white_label_fit: true,
        ops_fit: true,
      },
      payloadJson:
        '{"agency_id":1,"fit_score":77,"white_label_score":82,"ops_automation_score":65,"tier":"review","synopsis":"Strong local SEO partner","is_real_agency":true,"white_label_fit":true,"ops_fit":true}',
    },
  ],
});

const updateAgencyScore = node({
  type: 'n8n-nodes-base.postgres',
  version: 2.6,
  config: {
    name: 'Update Agency Score',
    position: [1200, 760],
    ...DB_RETRY,
    parameters: {
      operation: 'executeQuery',
      query: UPDATE_SQL,
      options: {
        connectionTimeout: 30,
        queryReplacement: expr('{{ $json.payloadJson }}'),
      },
    },
    credentials: { postgres: newCredential('Grand River Postgres') },
  },
  output: [
    {
      agency_id: 1,
      fit_score: 77,
      white_label_score: 82,
      ops_automation_score: 65,
      tier: 'review',
      synopsis: 'Strong local SEO partner',
      is_real_agency: true,
      white_label_fit: true,
      ops_fit: true,
      updated_at: '2026-07-27T16:00:00.000Z',
    },
  ],
});

const respondUpdate = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Update',
    position: [1440, 760],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ $json }}'),
      options: { responseCode: 200 },
    },
  },
});

const respondUpdateUnauthorized = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Update 401',
    position: [960, 960],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { "error": "Unauthorized" } }}'),
      options: { responseCode: 401 },
    },
  },
});

const helpSticky = sticky(
  '## Agency Fit Review Dashboard\n\nWebhook SPA on `/webhook/agency-fit?token=…`.\n\nAPIs:\n- `GET /webhook/agency-fit/agencies`\n- `POST /webhook/agency-fit/agencies/update`\n\nUses **Grand River Postgres**. Scores are independently editable.',
  [dashboardConfigPage, listAgencies],
  { color: 4, position: [240, -220] },
);

export default workflow('agency-fit-review-dashboard', 'Agency Fit Review Dashboard')
  .add(pageWebhook)
  .to(dashboardConfigPage)
  .to(checkAuthPage)
  .to(
    authPageOk
      .onTrue(buildPage.to(respondHtml))
      .onFalse(respondPageUnauthorized),
  )
  .add(listWebhook)
  .to(dashboardConfigList)
  .to(checkAuthList)
  .to(
    authListOk
      .onTrue(listAgencies.to(formatAgencyList).to(respondList))
      .onFalse(respondListUnauthorized),
  )
  .add(updateWebhook)
  .to(dashboardConfigUpdate)
  .to(checkAuthUpdate)
  .to(
    authUpdateOk
      .onTrue(prepareUpdatePayload.to(updateAgencyScore).to(respondUpdate))
      .onFalse(respondUpdateUnauthorized),
  )
  .add(helpSticky);
