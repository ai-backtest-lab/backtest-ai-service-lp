import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { gzipSync } from "node:zlib";
async function visit(folder) {
  for (const item of await readdir(folder, { withFileTypes: true })) {
    const path = join(folder, item.name);
    if (item.isDirectory()) await visit(path);
    else if (
      item.isFile() &&
      [".html", ".css", ".js", ".txt", ".svg", ".xml"].includes(extname(path))
    )
      await writeFile(
        path + ".gz",
        gzipSync(await readFile(path), { level: 9 }),
      );
  }
}
await visit("out");
