// Release gate: run after `pnpm build`, before any deploy. Exits 1 with the reasons.
// `make check`, `pnpm build` and `make dev` never depend on it.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { releaseProblems } from "./release-problems.mjs";

const json = async (file) => JSON.parse(await readFile(file, "utf8"));
const paths = ["/", "/product/", "/privacy/", "/terms/", "/disclaimer/"];
const pages = await Promise.all(
  paths.map(async (path) => {
    const html = await readFile(path === "/" ? "out/index.html" : `out${path}index.html`, "utf8");
    const doc = new JSDOM(html).window.document;
    return { path, text: doc.querySelector("main").textContent.replace(/\s+/g, " ") };
  }),
);
const problems = releaseProblems({
  founder: await json("src/content/founder.json"),
  media: await json("src/content/media.json"),
  cloudflareAudit: existsSync("docs/cloudflare-audit.json") ? await json("docs/cloudflare-audit.json") : null,
  pages,
});
try {
  execFileSync("node", ["scripts/check-seo.mjs"], { stdio: "pipe" });
} catch (error) {
  problems.push(`seo:check failed: ${String(error.stderr || error.message).split("\n")[0]}`);
}
if (problems.length) {
  console.error(`release:check FAILED (${problems.length})`);
  for (const p of problems) console.error(`- ${p}`);
  process.exit(1);
}
console.log("release:check PASS");
