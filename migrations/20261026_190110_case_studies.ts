import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'
import {
  convertMarkdownToLexical,
  editorConfigFactory,
} from '@payloadcms/richtext-lexical'
import type { Payload, PayloadRequest } from 'payload'

const CASE_STUDY_SLUG = '38-hvac-brand-sites'
const CASE_STUDY_TITLE = 'Organic leads up 78% across 38 HVAC brand sites'
const CASE_STUDY_EXCERPT =
  'I took over digital for 38 brand websites owned by a Midwest HVAC consolidator group. Across one fiscal year — FY2024 to FY2025 — organic leads grew 78% year over year. The work was not clever. It was ownership, an audit, one content strategy executed 38 times, a repaired technical floor, deliberate internal linking, and conversion work on the pages that already had traffic.'

export async function seedHvacCaseStudy({
  payload,
  req,
}: {
  payload: Payload
  req?: PayloadRequest
}): Promise<void> {
  const existing = await payload.find({
    collection: 'case-studies',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    req,
    where: {
      slug: {
        equals: CASE_STUDY_SLUG,
      },
    },
  })

  if (existing.docs.length > 0) return

  const markdown = readFileSync(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      '../content/case-studies/38-hvac-brand-sites.md',
    ),
    'utf8',
  )
  const editorConfig = await editorConfigFactory.default({
    config: payload.config,
  })

  await payload.create({
    collection: 'case-studies',
    draft: false,
    overrideAccess: true,
    req,
    data: {
      title: CASE_STUDY_TITLE,
      slug: CASE_STUDY_SLUG,
      excerpt: CASE_STUDY_EXCERPT,
      clientLabel: 'Midwest HVAC consolidator · 38 brands',
      resultStat: '+78%',
      resultLabel: 'Organic leads, year over year',
      resultDetail: 'FY2024 to FY2025.',
      content: convertMarkdownToLexical({ editorConfig, markdown }),
      metaTitle: CASE_STUDY_TITLE,
      metaDescription:
        'Organic leads grew 78% year over year across 38 HVAC brand websites, from FY2024 to FY2025.',
      _status: 'published',
    },
  })
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"slug" varchar,
  	"excerpt" varchar,
  	"client_label" varchar,
  	"result_stat" varchar,
  	"result_label" varchar,
  	"result_detail" varchar,
  	"published_at" timestamp(3) with time zone,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_case_studies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_case_studies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_client_label" varchar,
  	"version_result_stat" varchar,
  	"version_result_label" varchar,
  	"version_result_detail" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__case_studies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "case_studies_id" integer;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "case_studies_featured_image_idx" ON "case_studies" USING btree ("featured_image_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "case_studies__status_idx" ON "case_studies" USING btree ("_status");
  CREATE INDEX "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_version_version_featured_image_idx" ON "_case_studies_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_case_studies_v_version_version_slug_idx" ON "_case_studies_v" USING btree ("version_slug");
  CREATE INDEX "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
  CREATE INDEX "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
  CREATE INDEX "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
  CREATE INDEX "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
  CREATE INDEX "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
  CREATE INDEX "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");`)

  await seedHvacCaseStudy({ payload, req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "case_studies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "_case_studies_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_case_studies_fk";
  
  DROP INDEX "payload_locked_documents_rels_case_studies_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "case_studies_id";
  DROP TYPE "public"."enum_case_studies_status";
  DROP TYPE "public"."enum__case_studies_v_version_status";`)
}
