import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Authors } from "./collections/Authors";
import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { getSiteUrl } from "./lib/site";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const isProduction = process.env.NODE_ENV === "production";
const databaseURL = process.env.DATABASE_URL || "";
const localDatabase = isLocalDatabase(databaseURL);
const payloadSecret = process.env.PAYLOAD_SECRET || "";
const siteUrl = getSiteUrl();
const serverURL =
  process.env.PAYLOAD_SERVER_URL?.replace(/\/+$/, "") ||
  (isProduction ? siteUrl : "http://localhost:3000");
const trustedOrigins = uniqueOrigins([
  "http://localhost:3000",
  siteUrl,
  serverURL,
]);
const s3Bucket =
  process.env.S3_BUCKET ||
  process.env.BUCKET_NAME ||
  process.env.AWS_S3_BUCKET_NAME ||
  "";
const s3AccessKeyId =
  process.env.S3_ACCESS_KEY_ID ||
  process.env.BUCKET_ACCESS_KEY_ID ||
  process.env.AWS_ACCESS_KEY_ID ||
  "";
const s3SecretAccessKey =
  process.env.S3_SECRET_ACCESS_KEY ||
  process.env.BUCKET_SECRET_ACCESS_KEY ||
  process.env.AWS_SECRET_ACCESS_KEY ||
  "";
const s3Endpoint =
  process.env.S3_ENDPOINT ||
  process.env.BUCKET_ENDPOINT ||
  process.env.AWS_ENDPOINT_URL;
const s3UrlStyle =
  process.env.S3_URL_STYLE || process.env.AWS_S3_URL_STYLE || "";
const s3ForcePathStyle =
  process.env.S3_FORCE_PATH_STYLE === "true" || s3UrlStyle === "path";
const s3Enabled = Boolean(s3Bucket && s3AccessKeyId && s3SecretAccessKey);

if (!payloadSecret && isProduction) {
  throw new Error("PAYLOAD_SECRET is required");
}

function isLocalDatabase(connectionString: string) {
  if (!connectionString) return true;

  try {
    const host = new URL(connectionString).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return /localhost|127\.0\.0\.1/.test(connectionString);
  }
}

function shouldUseSsl(connectionString: string) {
  if (process.env.DATABASE_SSL === "true") return true;
  if (process.env.DATABASE_SSL === "false") return false;
  return !isLocalDatabase(connectionString);
}

function uniqueOrigins(origins: Array<string | undefined>) {
  return [...new Set(origins.filter((origin): origin is string => Boolean(origin)))];
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " | Grand River Labs",
    },
  },
  collections: [Users, Media, Categories, Authors, Posts],
  cors: trustedOrigins,
  csrf: trustedOrigins,
  editor: lexicalEditor(),
  secret: payloadSecret,
  serverURL,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    disableCreateDatabase: !localDatabase,
    migrationDir: path.resolve(dirname, "migrations"),
    prodMigrations: migrations,
    pool: {
      connectionString: databaseURL,
      ssl: shouldUseSsl(databaseURL)
        ? { rejectUnauthorized: false }
        : undefined,
    },
    // Push only against a local sandbox. Railway/production schema changes go
    // through `payload migrate`.
    push: !isProduction && localDatabase,
  }),
  plugins: [
    s3Storage({
      enabled: s3Enabled,
      collections: {
        media: true,
      },
      bucket: s3Bucket,
      config: {
        credentials: {
          accessKeyId: s3AccessKeyId,
          secretAccessKey: s3SecretAccessKey,
        },
        endpoint: s3Endpoint,
        forcePathStyle: s3ForcePathStyle,
        region:
          process.env.S3_REGION ||
          process.env.BUCKET_REGION ||
          process.env.AWS_DEFAULT_REGION ||
          "auto",
      },
    }),
  ],
  sharp,
});
