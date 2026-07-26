import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users, Media, Zooms, ZoomRsvps, ContactSubmissions } from "./cms/collections";
import { Home } from "./cms/home-global";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./canigan.db" },
  }),
  sharp,
});
