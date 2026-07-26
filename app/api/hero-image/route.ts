import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-static";

/**
 * public/images/hero-candy-field.png is a promo card rather than a photograph:
 * the 2000×1429 canvas has white margins, "Canigan Health Options" set in script
 * across the sky beside Candy's face, and her phone/email in white over the field
 * below. All three read as amateur behind the hero headline.
 *
 * Measured against the source pixels:
 *   photograph  x 92–1899,  y 143–1285
 *   wordmark    x 150–1160, y 265–375   (dark script over the sky)
 *   contact     y 1020–1185             (white type over the field)
 *
 * The margins and the contact band are cropped away. The wordmark can't be
 * cropped — it sits beside her hair — so it is covered with real sky lifted from
 * the right of her head at the *same* vertical range. Because the donor shares
 * the y range, the sky's gradient and the horizon line already match, and only
 * the right and bottom edges of the patch need to fade out.
 */

/** Sky to the right of Candy's head; verified free of hair within these bounds. */
const DONOR = { left: 1550, top: 143, width: 349, height: 302 } as const;

/** Where that sky lands — wide and tall enough to clear the wordmark and fade. */
const PATCH = { left: 92, top: 143, width: 1138, height: 302 } as const;

/** The patch is fully opaque within this box, which contains the whole wordmark. */
const SOLID = { width: 1078, height: 242 } as const;

/** Length of the fade on the two edges that meet untouched sky. */
const FADE = 60;

/** The finished frame: the photograph, less its margins and the contact band. */
const CROP = { left: 92, top: 143, width: 1808, height: 867 } as const;

/** A one-directional black gradient, used to erase alpha via `dest-out`. */
function fadeStrip(width: number, height: number, direction: "right" | "down"): Buffer {
  const [x2, y2] = direction === "right" ? [width, 0] : [0, height];
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${x2}" y2="${y2}">
          <stop offset="0" stop-color="#000" stop-opacity="0" />
          <stop offset="1" stop-color="#000" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#g)" />
    </svg>`,
  );
}

/** Opaque over the wordmark, fading to nothing on the right and bottom edges. */
function patchMask(): Promise<Buffer> {
  return sharp({
    create: { width: PATCH.width, height: PATCH.height, channels: 4, background: "#ffffff" },
  })
    .composite([
      {
        input: fadeStrip(FADE, PATCH.height, "right"),
        left: SOLID.width,
        top: 0,
        blend: "dest-out",
      },
      {
        input: fadeStrip(PATCH.width, FADE, "down"),
        left: 0,
        top: SOLID.height,
        blend: "dest-out",
      },
    ])
    .png()
    .toBuffer();
}

export async function GET() {
  const file = path.join(process.cwd(), "public", "images", "hero-candy-field.png");
  const input = await readFile(file);

  const [sky, mask] = await Promise.all([
    // Stretching 349px of sky across 1138px needs a touch of blur to hide the
    // interpolation; the sky is near-uniform horizontally, so nothing is lost.
    sharp(input).extract(DONOR).resize(PATCH.width, PATCH.height).blur(8).png().toBuffer(),
    patchMask(),
  ]);

  const patch = await sharp(sky)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const patched = await sharp(input)
    .composite([{ input: patch, left: PATCH.left, top: PATCH.top }])
    .png()
    .toBuffer();

  const out = await sharp(patched).extract(CROP).jpeg({ quality: 88, mozjpeg: true }).toBuffer();

  return new Response(new Uint8Array(out), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
