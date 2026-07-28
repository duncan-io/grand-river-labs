import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.PORT) || 3000;
const ACCESS_TOKEN = String(process.env.ACCESS_TOKEN || '').trim();
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}
if (!ACCESS_TOKEN) {
  console.error('ACCESS_TOKEN is required');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

const app = express();
app.use(express.json({ limit: '1mb' }));

function extractToken(req) {
  const q = req.query?.token;
  if (typeof q === 'string' && q.trim()) return q.trim();
  const auth = String(req.headers.authorization || '');
  if (auth.toLowerCase().startsWith('bearer ')) return auth.slice(7).trim();
  return '';
}

function requireToken(req, res, next) {
  const provided = extractToken(req);
  if (!provided || provided !== ACCESS_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

const AGENCY_LIST_SELECT = `
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
  a.contact_source_id,
  a.contact_name,
  a.contact_email,
  a.contact_title,
  a.contact_linkedin_url,
  a.contact_source,
  a.contact_verification_status,
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
  s.updated_at`;

const AGENCY_DETAIL_SELECT = `
  ${AGENCY_LIST_SELECT},
  a.created_at,
  a.updated_at AS agency_updated_at,
  s.raw_score`;

app.get('/api/agencies', requireToken, async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT ${AGENCY_LIST_SELECT}
      FROM agencies a
      JOIN agency_fit_scores s ON s.agency_id = a.id
      ORDER BY s.fit_score DESC, a.agency_name ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error('list agencies failed', err);
    res.status(500).json({ error: 'Failed to load agencies' });
  }
});

app.get('/api/agencies/:id', requireToken, async (req, res) => {
  try {
    const agencyId = Number(req.params.id);
    if (!Number.isFinite(agencyId) || agencyId <= 0) {
      return res.status(400).json({ error: 'Invalid agency id' });
    }
    const { rows } = await pool.query(
      `
      SELECT ${AGENCY_DETAIL_SELECT}
      FROM agencies a
      JOIN agency_fit_scores s ON s.agency_id = a.id
      WHERE a.id = $1
      LIMIT 1
    `,
      [agencyId],
    );
    if (!rows.length) {
      return res.status(404).json({ error: 'Agency not found' });
    }
    return res.json(rows[0]);
  } catch (err) {
    console.error('get agency failed', err);
    return res.status(500).json({ error: 'Failed to load agency' });
  }
});

app.post('/api/agencies/update', requireToken, async (req, res) => {
  try {
    const body = req.body || {};
    const agencyId = Number(body.agency_id);
    if (!Number.isFinite(agencyId) || agencyId <= 0) {
      return res.status(400).json({ error: 'agency_id is required' });
    }
    const tier = String(body.tier || 'low');
    if (!['priority', 'review', 'low'].includes(tier)) {
      return res.status(400).json({ error: 'tier must be priority, review, or low' });
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

    const { rows } = await pool.query(
      `UPDATE agency_fit_scores SET
        fit_score = $2,
        white_label_score = $3,
        ops_automation_score = $4,
        tier = $5,
        synopsis = NULLIF($6, ''),
        is_real_agency = $7,
        white_label_fit = $8,
        ops_fit = $9,
        updated_at = NOW()
      WHERE agency_id = $1
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
        updated_at`,
      [
        payload.agency_id,
        payload.fit_score,
        payload.white_label_score,
        payload.ops_automation_score,
        payload.tier,
        payload.synopsis,
        payload.is_real_agency,
        payload.white_label_fit,
        payload.ops_fit,
      ],
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'Agency score not found' });
    }
    return res.json(rows[0]);
  } catch (err) {
    console.error('update agency failed', err);
    return res.status(500).json({ error: 'Failed to update agency' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Agency fit dashboard listening on ${PORT}`);
});
