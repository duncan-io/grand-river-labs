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

async function hasOutreachTable() {
  const { rows } = await pool.query(`
    SELECT to_regclass('public.agency_outreach_drafts') IS NOT NULL AS exists
  `);
  return !!rows[0]?.exists;
}

const emptyOutreachOverview = {
  never_contacted: 0,
  drafted: 0,
  sent: 0,
  needs_rewrite: 0,
  failed: 0,
  ready: 0,
  pending_rating: 0,
  pending_review: 0,
  approved: 0,
  rejected: 0,
  drafted_last_7_days: 0,
  eligible_awaiting: 0,
  avg_overall_score: null,
};

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

const OUTREACH_LIST_SELECT = `
  d.outreach_id,
  d.sequence_no,
  d.parent_outreach_id,
  d.status AS outreach_status,
  d.gmail_draft_id,
  d.gmail_thread_id,
  d.gmail_message_id,
  d.drafted_at,
  d.sent_at,
  d.overall_score,
  d.accuracy_pass,
  d.rewrite_attempts,
  d.error AS outreach_error,
  d.subject AS outreach_subject,
  LEFT(d.body_text, 140) AS outreach_snippet,
  d.reply_detected`;

const OUTREACH_DETAIL_SELECT = `
  ${OUTREACH_LIST_SELECT},
  d.body_text AS outreach_body,
  d.accuracy_score,
  d.quality_score,
  d.updated_at AS outreach_updated_at`;

const AGENCY_DETAIL_SELECT = `
  ${AGENCY_LIST_SELECT},
  a.created_at,
  a.updated_at AS agency_updated_at,
  s.raw_score`;

const nullOutreachList = `
  NULL::integer AS outreach_id,
  NULL::integer AS sequence_no,
  NULL::integer AS parent_outreach_id,
  NULL::text AS outreach_status,
  NULL::text AS gmail_draft_id,
  NULL::text AS gmail_thread_id,
  NULL::text AS gmail_message_id,
  NULL::timestamptz AS drafted_at,
  NULL::timestamptz AS sent_at,
  NULL::integer AS overall_score,
  NULL::boolean AS accuracy_pass,
  NULL::integer AS rewrite_attempts,
  NULL::text AS outreach_error,
  NULL::text AS outreach_subject,
  NULL::text AS outreach_snippet,
  NULL::boolean AS reply_detected`;

const nullOutreachDetail = `
  ${nullOutreachList},
  NULL::text AS outreach_body,
  NULL::integer AS accuracy_score,
  NULL::integer AS quality_score,
  NULL::timestamptz AS outreach_updated_at`;

app.get('/api/overview', requireToken, async (_req, res) => {
  try {
    const { rows: fitRows } = await pool.query(`
      SELECT
        COUNT(*)::int AS total_scored,
        COUNT(*) FILTER (WHERE s.tier = 'priority')::int AS tier_priority,
        COUNT(*) FILTER (WHERE s.tier = 'review')::int AS tier_review,
        COUNT(*) FILTER (WHERE s.tier = 'low')::int AS tier_low,
        ROUND(AVG(s.fit_score)::numeric, 1) AS avg_fit_score,
        ROUND(AVG(s.white_label_score)::numeric, 1) AS avg_white_label_score
      FROM agencies a
      JOIN agency_fit_scores s ON s.agency_id = a.id
    `);
    const fit = fitRows[0] || {};

    let outreach = { ...emptyOutreachOverview };
    const hasOutreach = await hasOutreachTable();

    if (hasOutreach) {
      const { rows: outreachRows } = await pool.query(`
        SELECT
          COUNT(*) FILTER (WHERE d.agency_id IS NULL)::int AS never_contacted,
          COUNT(*) FILTER (WHERE d.status = 'drafted')::int AS drafted,
          COUNT(*) FILTER (WHERE d.status = 'sent')::int AS sent,
          COUNT(*) FILTER (WHERE d.status = 'needs_rewrite')::int AS needs_rewrite,
          COUNT(*) FILTER (WHERE d.status IN ('failed', 'send_failed'))::int AS failed,
          COUNT(*) FILTER (WHERE d.status = 'ready')::int AS ready,
          COUNT(*) FILTER (WHERE d.status = 'pending_rating')::int AS pending_rating,
          COUNT(*) FILTER (WHERE d.status = 'pending_review')::int AS pending_review,
          COUNT(*) FILTER (WHERE d.status = 'approved')::int AS approved,
          COUNT(*) FILTER (WHERE d.status = 'rejected')::int AS rejected,
          COUNT(*) FILTER (
            WHERE d.status IN ('drafted', 'pending_review')
              AND d.drafted_at >= NOW() - INTERVAL '7 days'
          )::int AS drafted_last_7_days,
          COUNT(DISTINCT a.id) FILTER (
            WHERE s.white_label_fit = true
              AND s.is_real_agency = true
              AND s.white_label_score >= 70
              AND NULLIF(TRIM(a.contact_email), '') IS NOT NULL
              AND NOT EXISTS (
                SELECT 1
                FROM agency_outreach_drafts x
                WHERE x.agency_id = a.id
                  AND x.sequence_no = 0
                  AND x.status NOT IN ('failed', 'rejected')
              )
          )::int AS eligible_awaiting,
          ROUND(AVG(d.overall_score) FILTER (WHERE d.overall_score IS NOT NULL)::numeric, 1)
            AS avg_overall_score
        FROM agencies a
        JOIN agency_fit_scores s ON s.agency_id = a.id
        LEFT JOIN agency_outreach_drafts d ON d.agency_id = a.id
      `);
      outreach = { ...emptyOutreachOverview, ...(outreachRows[0] || {}) };
    } else {
      const { rows: eligibleRows } = await pool.query(`
        SELECT COUNT(*)::int AS eligible_awaiting
        FROM agencies a
        JOIN agency_fit_scores s ON s.agency_id = a.id
        WHERE s.white_label_fit = true
          AND s.is_real_agency = true
          AND s.white_label_score >= 70
          AND NULLIF(TRIM(a.contact_email), '') IS NOT NULL
      `);
      outreach.never_contacted = Number(fit.total_scored) || 0;
      outreach.eligible_awaiting = eligibleRows[0]?.eligible_awaiting || 0;
    }

    return res.json({
      total_scored: Number(fit.total_scored) || 0,
      tier_priority: Number(fit.tier_priority) || 0,
      tier_review: Number(fit.tier_review) || 0,
      tier_low: Number(fit.tier_low) || 0,
      avg_fit_score: fit.avg_fit_score != null ? Number(fit.avg_fit_score) : null,
      avg_white_label_score: fit.avg_white_label_score != null ? Number(fit.avg_white_label_score) : null,
      never_contacted: Number(outreach.never_contacted) || 0,
      drafted: Number(outreach.drafted) || 0,
      sent: Number(outreach.sent) || 0,
      needs_rewrite: Number(outreach.needs_rewrite) || 0,
      failed: Number(outreach.failed) || 0,
      ready: Number(outreach.ready) || 0,
      pending_rating: Number(outreach.pending_rating) || 0,
      pending_review: Number(outreach.pending_review) || 0,
      approved: Number(outreach.approved) || 0,
      rejected: Number(outreach.rejected) || 0,
      drafted_last_7_days: Number(outreach.drafted_last_7_days) || 0,
      eligible_awaiting: Number(outreach.eligible_awaiting) || 0,
      avg_overall_score: outreach.avg_overall_score != null ? Number(outreach.avg_overall_score) : null,
      outreach_table_present: hasOutreach,
    });
  } catch (err) {
    console.error('overview failed', err);
    return res.status(500).json({ error: 'Failed to load overview' });
  }
});

app.get('/api/agencies', requireToken, async (_req, res) => {
  try {
    const hasOutreach = await hasOutreachTable();
    if (!hasOutreach) {
      const { rows } = await pool.query(`
        SELECT ${AGENCY_LIST_SELECT}, ${nullOutreachList}
        FROM agencies a
        JOIN agency_fit_scores s ON s.agency_id = a.id
        ORDER BY s.fit_score DESC, a.agency_name ASC
      `);
      return res.json(rows);
    }

    // One row per outreach message (plus agencies with no outreach) so the inbox
    // can show initial + follow-up drafts in the same queue.
    const { rows } = await pool.query(`
      SELECT ${AGENCY_LIST_SELECT}, ${OUTREACH_LIST_SELECT}
      FROM agencies a
      JOIN agency_fit_scores s ON s.agency_id = a.id
      JOIN agency_outreach_drafts d ON d.agency_id = a.id
      UNION ALL
      SELECT ${AGENCY_LIST_SELECT}, ${nullOutreachList}
      FROM agencies a
      JOIN agency_fit_scores s ON s.agency_id = a.id
      WHERE NOT EXISTS (
        SELECT 1 FROM agency_outreach_drafts d2 WHERE d2.agency_id = a.id
      )
    `);

    rows.sort((a, b) => {
      const fitDiff = Number(b.fit_score || 0) - Number(a.fit_score || 0);
      if (fitDiff !== 0) return fitDiff;
      return String(a.agency_name || '').localeCompare(String(b.agency_name || ''));
    });
    return res.json(rows);
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
    const hasOutreach = await hasOutreachTable();
    if (!hasOutreach) {
      const { rows } = await pool.query(
        `
        SELECT ${AGENCY_DETAIL_SELECT}, ${nullOutreachDetail}
        FROM agencies a
        JOIN agency_fit_scores s ON s.agency_id = a.id
        WHERE a.id = $1
        LIMIT 1
      `,
        [agencyId],
      );
      if (!rows.length) return res.status(404).json({ error: 'Agency not found' });
      return res.json(rows[0]);
    }

    const outreachId = req.query.outreach_id != null ? Number(req.query.outreach_id) : null;
    const { rows } = await pool.query(
      `
      SELECT ${AGENCY_DETAIL_SELECT}, ${OUTREACH_DETAIL_SELECT}
      FROM agencies a
      JOIN agency_fit_scores s ON s.agency_id = a.id
      LEFT JOIN LATERAL (
        SELECT d.*
        FROM agency_outreach_drafts d
        WHERE d.agency_id = a.id
          AND ($2::int IS NULL OR d.outreach_id = $2::int)
        ORDER BY
          CASE WHEN d.status = 'pending_review' THEN 0 ELSE 1 END,
          d.sequence_no DESC,
          d.drafted_at DESC NULLS LAST
        LIMIT 1
      ) d ON true
      WHERE a.id = $1
      LIMIT 1
    `,
      [agencyId, Number.isFinite(outreachId) && outreachId > 0 ? outreachId : null],
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

app.post('/api/outreach/review', requireToken, async (req, res) => {
  try {
    if (!(await hasOutreachTable())) {
      return res.status(400).json({ error: 'Outreach drafts table not found' });
    }
    const body = req.body || {};
    const outreachId = body.outreach_id != null ? Number(body.outreach_id) : null;
    const agencyId = Number(body.agency_id);
    const action = String(body.action || '').trim().toLowerCase();
    const note = body.note == null ? '' : String(body.note).trim();

    if (!Number.isFinite(agencyId) || agencyId <= 0) {
      return res.status(400).json({ error: 'agency_id is required' });
    }
    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'action must be approve or reject' });
    }

    let nextSubject = null;
    let nextBody = null;
    if (action === 'approve') {
      if (body.subject != null) {
        nextSubject = String(body.subject).trim();
        if (!nextSubject) {
          return res.status(400).json({ error: 'subject cannot be empty' });
        }
      }
      if (body.body != null) {
        nextBody = String(body.body).trim();
        if (!nextBody) {
          return res.status(400).json({ error: 'body cannot be empty' });
        }
      }
    }

    let currentRows;
    if (Number.isFinite(outreachId) && outreachId > 0) {
      const result = await pool.query(
        `SELECT outreach_id, agency_id, sequence_no, status
         FROM agency_outreach_drafts
         WHERE outreach_id = $1
         LIMIT 1`,
        [outreachId],
      );
      currentRows = result.rows;
      if (currentRows.length && Number(currentRows[0].agency_id) !== agencyId) {
        return res.status(400).json({ error: 'outreach_id does not match agency_id' });
      }
    } else {
      const result = await pool.query(
        `SELECT outreach_id, agency_id, sequence_no, status
         FROM agency_outreach_drafts
         WHERE agency_id = $1
           AND status = 'pending_review'
         ORDER BY sequence_no DESC, drafted_at DESC
         LIMIT 1`,
        [agencyId],
      );
      currentRows = result.rows;
    }

    if (!currentRows.length) {
      return res.status(404).json({ error: 'Outreach draft not found' });
    }
    if (currentRows[0].status !== 'pending_review') {
      return res.status(400).json({
        error: `Draft status must be pending_review (got ${currentRows[0].status})`,
      });
    }

    const targetOutreachId = currentRows[0].outreach_id;
    const nextStatus = action === 'approve' ? 'approved' : 'rejected';
    const nextError = action === 'reject'
      ? (note || 'Rejected by human reviewer')
      : null;

    const { rows } = await pool.query(
      `UPDATE agency_outreach_drafts SET
        status = $2,
        error = $3,
        subject = COALESCE($4, subject),
        body_text = COALESCE($5, body_text),
        updated_at = NOW()
      WHERE outreach_id = $1
        AND status = 'pending_review'
      RETURNING
        outreach_id,
        agency_id,
        sequence_no,
        status,
        subject,
        body_text,
        error,
        overall_score,
        accuracy_score,
        quality_score,
        gmail_draft_id,
        gmail_thread_id,
        drafted_at,
        updated_at`,
      [targetOutreachId, nextStatus, nextError, nextSubject, nextBody],
    );

    if (!rows.length) {
      return res.status(409).json({ error: 'Draft was no longer pending_review' });
    }

    const row = rows[0];
    return res.json({
      outreach_id: row.outreach_id,
      agency_id: row.agency_id,
      sequence_no: row.sequence_no,
      outreach_status: row.status,
      outreach_subject: row.subject,
      outreach_body: row.body_text,
      outreach_snippet: row.body_text ? String(row.body_text).slice(0, 140) : null,
      outreach_error: row.error,
      overall_score: row.overall_score,
      accuracy_score: row.accuracy_score,
      quality_score: row.quality_score,
      gmail_draft_id: row.gmail_draft_id,
      gmail_thread_id: row.gmail_thread_id,
      drafted_at: row.drafted_at,
      outreach_updated_at: row.updated_at,
    });
  } catch (err) {
    console.error('outreach review failed', err);
    return res.status(500).json({ error: 'Failed to review outreach draft' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Agency fit dashboard listening on ${PORT}`);
});
