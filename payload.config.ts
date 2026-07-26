import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users, Media, Zooms, ZoomRsvps, ContactSubmissions } from "./cms/collections";
import { Home } from "./cms/home-global";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Postgres in any environment that provides a connection string (Vercel/Neon),
 * SQLite for local development. Serverless has an ephemeral filesystem, so a
 * SQLite file there would silently discard every write.
 */
const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

const db = postgresUrl
  ? postgresAdapter({ pool: { connectionString: postgresUrl } })
  : sqliteAdapter({ client: { url: process.env.DATABASE_URI || "file:./canigan.db" } });

/**
 * Uploaded media has the same problem — /public is read-only at runtime on
 * Vercel — so route uploads to Blob storage whenever a token is present.
 */
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: "— Canigan Health Options",
    },
  },
  collections: [Users, Media, Zooms, ZoomRsvps, ContactSubmissions],
  globals: [Home],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "canigan-dev-secret",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db,
  plugins: blobToken
    ? [vercelBlobStorage({ collections: { media: true }, token: blobToken })]
    : [],
  sharp,
});
