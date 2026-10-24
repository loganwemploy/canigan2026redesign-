/**
 * One-off asset build: turns Emberleaf's autumn leaf wreath into a green one.
 *
 *   node scripts/recolor-wreath.cjs <emberleaf-img-dir> <out-dir> [preview-dir]
 *
 * A plain hue-rotate tints the cream background minty-cyan, so this recolours per pixel:
 *   - saturated pixels (the leaves)  -> hue-mapped onto greens, muted to the Canigan palette
 *   - low-chroma pixels (cream + faint ghost leaves) -> re-based onto the new page colour
 * and blends the two by chroma so anti-aliased edges stay clean.
 */
const sharp = require("sharp");
const path = require("path");

const [SRC, OUT, PREVIEW] = process.argv.slice(2);
if (!SRC || !OUT) { console.error("usage: recolor-wreath.cjs <src-dir> <out-dir> [preview-dir]"); process.exit(1); }

const B0 = [255, 249, 231]; // the source image's flat cream  (#fff9e7)
const T = [246, 248, 236];  // the new page colour           (#f6f8ec)
const LUM = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;
const LUM_B0 = LUM(...B0);

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function rgb2hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0, s = 0;
  if (d > 1e-6) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return [h, s, l];
}
function hsl2rgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0]; else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c]; else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

function recolor(r, g, b) {
  // ── leaf transform ──────────────────────────────────────────────
  const [h, s, l] = rgb2hsl(r, g, b);
  const hn = h > 200 ? h - 360 : h;                // crimson (~350deg) -> small negative
  const newH = Math.min(172, Math.max(78, 150 - hn)); // red->emerald, orange->green, amber->lime, olive->lime
  const newS = 0.12 + 0.34 * s;
  const newL = l * 0.74 + 0.015;
  const leaf = hsl2rgb(newH, Math.min(newS, 0.62), newL);

  // ── background transform: re-base brightness onto the new page colour ──
  const ratio = Math.min(1.0, LUM(r, g, b) / LUM_B0);
  const dark = 1 - ratio;                              // ghost leaves are slightly darker than the cream
  const bg = [T[0] * ratio - dark * 22, T[1] * ratio + dark * 6, T[2] * ratio - dark * 14];

  const chroma = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
  const w = smooth(0.17, 0.40, chroma);
  return [0, 1, 2].map((i) => Math.max(0, Math.min(255, Math.round(bg[i] * (1 - w) + leaf[i] * w))));
}

async function run(file, quality) {
  const { data, info } = await sharp(path.join(SRC, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 3) {
    const [r, g, b] = recolor(data[i], data[i + 1], data[i + 2]);
    out[i] = r; out[i + 1] = g; out[i + 2] = b;
  }
  const img = () => sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } });
  await img().webp({ quality, effort: 5 }).toFile(path.join(OUT, file));
  if (PREVIEW) await img().resize({ width: 760 }).png().toFile(path.join(PREVIEW, file.replace(".webp", "-green.png")));
  const st = await sharp(path.join(OUT, file)).metadata();
  console.log(file, info.width + "x" + info.height, "->", (require("fs").statSync(path.join(OUT, file)).size / 1024).toFixed(0) + " KB", st.format);
}

(async () => {
  await run("leaves.webp", 84);
  await run("leaves-portrait.webp", 84);
  require("fs").copyFileSync(path.join(SRC, "grain.webp"), path.join(OUT, "grain.webp"));
  console.log("grain.webp copied (already neutral grey)");
})().catch((e) => { console.error(e); process.exit(1); });
