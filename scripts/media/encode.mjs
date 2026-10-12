// Turns the raw 2x captures (tmp/media/raw) into the published WebP files:
// two widths per shot, each with the "Real Backtesting Engine · Synthetic Market Data" band.
// Writes public/media/product/*.webp and refreshes sizes in src/content/media.json.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const RAW = "tmp/media/raw";
const OUT = "public/media/product";
const MANIFEST = "src/content/media.json";
const WIDTHS = [1280, 2400];
const PAGE_BG = { r: 17, g: 17, b: 17, alpha: 1 };
export const LABEL = "Real Backtesting Engine · Synthetic Market Data";

async function stacked(files, gap) {
  const parts = await Promise.all(files.map((f) => sharp(`${RAW}/${f}.png`).toBuffer({ resolveWithObject: true })));
  const width = Math.max(...parts.map((p) => p.info.width));
  const height = parts.reduce((sum, p) => sum + p.info.height, 0) + gap * (parts.length - 1);
  let top = 0;
  const layers = parts.map((p) => {
    const layer = { input: p.data, top, left: 0 };
    top += p.info.height + gap;
    return layer;
  });
  return sharp({ create: { width, height, channels: 4, background: PAGE_BG } }).composite(layers).png().toBuffer();
}

function band(width) {
  const height = Math.round(width * 0.032);
  const size = Math.round(height * 0.4);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="#0b0f0d"/>
  <rect width="100%" height="1" fill="#1f3a2c"/>
  <circle cx="${Math.round(height * 0.55)}" cy="${height / 2}" r="${Math.round(size * 0.28)}" fill="#3ddc84"/>
  <text x="${Math.round(height * 0.9)}" y="${Math.round(height / 2 + size * 0.36)}" font-family="DejaVu Sans" font-size="${size}" fill="#d7e7dd" letter-spacing="0.4">${LABEL}</text>
</svg>`;
  return { svg: Buffer.from(svg), height };
}

async function encode(name, source) {
  const outputs = [];
  for (const width of WIDTHS) {
    const shot = await sharp(source).resize({ width }).png().toBuffer({ resolveWithObject: true });
    const strip = band(width);
    const file = `${OUT}/${name}-${width}.webp`;
    const { size, height } = await sharp({
      create: { width, height: shot.info.height + strip.height, channels: 4, background: PAGE_BG },
    })
      .composite([
        { input: shot.data, top: 0, left: 0 },
        { input: strip.svg, top: shot.info.height, left: 0 },
      ])
      .webp({ quality: 80 })
      .toFile(file);
    outputs.push({ width, height, bytes: size });
  }
  return outputs;
}

await mkdir(OUT, { recursive: true });
const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
const sources = {
  "dashboard-overview": `${RAW}/dashboard-overview.png`,
  "strategy-research": `${RAW}/strategy-research.png`,
  "backtest-execution": await stacked(["backtest-execution-a", "backtest-execution-b"], 48),
  "backtest-results": await stacked(["backtest-results-a", "backtest-results-b"], 48),
  "risk-analysis": `${RAW}/risk-analysis.png`,
};
for (const shot of manifest.screenshots) {
  shot.files = await encode(shot.id, sources[shot.id]);
  console.log(shot.id, shot.files.map((f) => `${f.width}x${f.height} ${Math.round(f.bytes / 1024)}KB`).join(", "));
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
