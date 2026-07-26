import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-static";

/**
 * The bundled hero photo (public/images/hero-candy-field.png, 2000×1429) is a
 * promo card with text baked in — "Canigan Health Options" top-left and Candy's
 * phone/email across the bottom — which collided with the on-page headline and
 * read as amateur.
 *
 * The wordmark sits right beside Candy's face, so it can't simply be cropped
 * out. Instead we blur-patch the two text regions in place: each rectangle is
 * blurred into the surrounding sky/field and composited back with a feathered
 * (soft-edged) alpha mask so there are no visible seams. The result is a clean
 * full-bleed portrait of Candy.
 */
// Regions are padded well beyond the text so the opaque core of each feathered
// mask fully covers it, while the soft edges fall on clean sky / field.
const REGIONS = [
  // "Canigan Health Options" wordmark (top-left, beside her hair)
  { left: 0, top: 95, width: 1265, height: 345 },
  // phone / email contact band (lower third, full width across the field)
  { left: 0, top: 890, width: 2000, height: 500 },
] as const;

const FEATHER = 80;

/** A soft-edged alpha mask (white centre fading to transparent at the edges). */
function featherMask(width: number, height: number): Buffer {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect x="${FEATHER}" y="${FEATHER}" width="${width - FEATHER * 2}" height="${
      height - FEATHER * 2
    }" fill="#fff"/>
  </svg>`;
  return Buffer.from(svg);
}

export async function GET() {
  const file = path.join(process.cwd(), "public", "images", "hero-candy-field.png");
  const input = await readFile(file);

  const patches = await Promise.all(
    REGIONS.map(async (r) => {
      const mask = await sharp(featherMask(r.width, r.height)).blur(FEATHER / 2).toBuffer();
      const patch = await sharp(input)
        .extract(r)
        .blur(140)
        .composite([{ input: mask, blend: "dest-in" }])
        .png()
        .toBuffer();
      return { input: patch, left: r.left, top: r.top };
    }),
  );

  const out = await sharp(input)
    .composite(patches)
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(out), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
