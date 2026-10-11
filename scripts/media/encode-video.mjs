// Encodes tmp/media/raw/product-demo.webm into the published files:
// product-demo.mp4 (H.264) and .webm (VP9) with the synthetic-data band, a WebP poster
// and English WebVTT captions timed from the recording. Only the blank page load is cut,
// and the top strip of the page with the Research page subtitle is cropped.
import { execFileSync } from "node:child_process";
import { readFile, stat, writeFile } from "node:fs/promises";
import sharp from "sharp";

const RAW = "tmp/media/raw";
const OUT = "public/media/product";
const MANIFEST = "src/content/media.json";
const LABEL = "Real Backtesting Engine · Synthetic Market Data";
const { firstFrame, end, cues } = JSON.parse(await readFile(`${RAW}/product-demo.cues.json`, "utf8"));
const duration = end - firstFrame;

const bandHeight = 40;
const band = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="${bandHeight}">
  <rect width="100%" height="100%" fill="#0b0f0d" fill-opacity="0.92"/>
  <circle cx="22" cy="20" r="5" fill="#3ddc84"/>
  <text x="36" y="26" font-family="DejaVu Sans" font-size="16" fill="#d7e7dd">${LABEL}</text>
</svg>`);
await sharp(band).png().toFile(`${RAW}/band.png`);

const ffmpeg = (args) => execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
const input = ["-ss", firstFrame.toFixed(2), "-t", duration.toFixed(2), "-i", `${RAW}/product-demo.webm`, "-i", `${RAW}/band.png`];
// The page subtitle ("…on real history") is cropped away: this data is synthetic.
const CROP_TOP = 84;
const HEIGHT = 720 - CROP_TOP;
const overlay = [
  "-filter_complex",
  `[0:v]crop=1280:${HEIGHT}:0:${CROP_TOP}[v];[v][1:v]overlay=0:H-${bandHeight},fps=30,format=yuv420p`,
  "-an",
];
ffmpeg([...input, ...overlay, "-c:v", "libx264", "-preset", "slow", "-crf", "30", "-movflags", "+faststart", `${OUT}/product-demo.mp4`]);
ffmpeg([...input, ...overlay, "-c:v", "libvpx-vp9", "-crf", "40", "-b:v", "0", "-row-mt", "1", `${OUT}/product-demo.webm`]);

// Poster: the comparison step, which shows the most of the product at once.
const posterAt = cues.find((c) => c.text.startsWith("Compare")).at - firstFrame + 6;
ffmpeg(["-ss", posterAt.toFixed(2), "-i", `${OUT}/product-demo.mp4`, "-frames:v", "1", `${RAW}/poster.png`]);
await sharp(`${RAW}/poster.png`).webp({ quality: 78 }).toFile(`${OUT}/product-demo-poster.webp`);

const stamp = (s) => {
  const ms = Math.max(0, Math.round(s * 1000));
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  return `${h}:${m}:${sec}.${String(ms % 1000).padStart(3, "0")}`;
};
const timed = cues.map((c, i) => ({
  start: c.at - firstFrame,
  end: (cues[i + 1]?.at ?? end) - firstFrame,
  text: c.text,
}));
await writeFile(
  `${OUT}/product-demo.en.vtt`,
  "WEBVTT\n\n" + timed.map((c, i) => `${i + 1}\n${stamp(c.start)} --> ${stamp(c.end)}\n${c.text}\n`).join("\n"),
);

const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
manifest.video = {
  ...(manifest.video ?? {}),
  durationSeconds: Math.round(duration),
  width: 1280,
  height: HEIGHT,
  files: {
    mp4: (await stat(`${OUT}/product-demo.mp4`)).size,
    webm: (await stat(`${OUT}/product-demo.webm`)).size,
    poster: (await stat(`${OUT}/product-demo-poster.webp`)).size,
  },
  transcript: timed.map((c) => ({ at: Math.round(c.start), text: c.text })),
};
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`video ${Math.round(duration)}s`, manifest.video.files);
