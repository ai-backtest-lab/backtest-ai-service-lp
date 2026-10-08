import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("public/media", { recursive: true });
await sharp("assets/hero-source.png")
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 9 })
  .toFile("public/media/og.png");
await sharp("assets/hero-source.png")
  .resize(1200, 630, { fit: "fill" })
  .webp({ quality: 85 })
  .toFile("public/media/hero-social.webp");
const icon = (size) =>
  sharp("assets/brand-source.png")
    .resize(size, size, { fit: "contain", background: "#090d0b" })
    .ensureAlpha()
    .png({ compressionLevel: 9 })
    .toBuffer();
for (const size of [16, 32, 48, 180, 192, 512])
  await writeFile(`public/media/icon-${size}.png`, await icon(size));
await writeFile("src/app/icon.png", await icon(512));
await writeFile("src/app/apple-icon.png", await icon(180));
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(icon));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((size, i) => {
  const entry = Buffer.alloc(16);
  entry[0] = size;
  entry[1] = size;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(images[i].length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return entry;
});
await writeFile(
  "src/app/favicon.ico",
  Buffer.concat([header, ...entries, ...images]),
);
