import { readFile, writeFile, mkdir } from "node:fs/promises";
import { JSDOM } from "jsdom";
import sharp from "sharp";
import assert from "node:assert/strict";
const domain = "https://aibacktestlab.com";
const paths = ["/", "/privacy/", "/disclaimer/"];
const results = [];
for (const path of paths) {
  const file = path === "/" ? "out/index.html" : `out${path}index.html`;
  const doc = new JSDOM(await readFile(file, "utf8")).window.document;
  assert.equal(doc.querySelectorAll("h1").length, 1);
  assert.equal(doc.querySelector("link[rel=canonical]").href, domain + path);
  assert.equal(
    doc.querySelector('meta[property="og:url"]').content,
    domain + path,
  );
  assert.equal(
    doc.querySelector('meta[property="og:image"]').content,
    domain + "/media/og.png",
  );
  assert.equal(
    doc.querySelector('meta[name="twitter:card"]').content,
    "summary_large_image",
  );
  assert.ok(
    !doc.querySelector("meta[name=robots]").content.includes("noindex"),
  );
  assert.ok(doc.querySelector("meta[name=description]").content);
  const graph = JSON.parse(
    doc.querySelector('script[type="application/ld+json"]').textContent,
  )["@graph"];
  assert.ok(
    graph.some(
      (node) => node["@type"] === "WebPage" && node.url === domain + path,
    ),
  );
  if (path === "/") {
    assert.equal(
      doc.title,
      "AI Backtest Lab | Quantitative Backtesting & AI Research Roadmap",
    );
    for (const email of [
      "founder@aibacktestlab.com",
      "support@aibacktestlab.com",
    ])
      assert.ok(
        [...doc.querySelectorAll("a")].some(
          (a) => a.getAttribute("href") === "mailto:" + email,
        ),
      );
    const description =
      "Private quantitative research for historical crypto backtesting. Claude-powered analysis is planned.";
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ])
      assert.equal(doc.querySelector(selector).content, description);
    for (const selector of [
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
    ])
      assert.equal(doc.querySelector(selector).content, doc.title);
    const content = doc.querySelector("main").textContent.replace(/\s+/g, " ");
    for (const phrase of [
      "Private workspace · not publicly available",
      "Source-backed backtesting and execution are not available.",
      "Demo sandbox runtime",
      "Claude POC planned",
      "structured backtest metrics",
      "public early access planned",
    ])
      assert.ok(content.includes(phrase), phrase);
    assert.ok(!content.includes("Explore the platform"));
    assert.equal(doc.querySelectorAll("main > section").length, 10);
  }
  results.push({
    path,
    title: doc.title,
    canonical: domain + path,
    status: "PASS",
  });
}
const sitemap = await readFile("out/sitemap.xml", "utf8");
for (const path of paths) assert.ok(sitemap.includes(domain + path));
assert.ok(!(await readFile("out/robots.txt", "utf8")).includes("Disallow: /"));
for (const [size, file] of [
  [16, "public/media/icon-16.png"],
  [32, "public/media/icon-32.png"],
  [180, "src/app/apple-icon.png"],
  [512, "src/app/icon.png"],
]) {
  const meta = await sharp(file).metadata();
  assert.equal(meta.width, size);
  assert.equal(meta.height, size);
}
const og = await sharp("public/media/og.png").metadata();
assert.equal(og.width, 1200);
assert.equal(og.height, 630);
const ico = await readFile("src/app/favicon.ico");
assert.equal(ico.readUInt16LE(2), 1);
assert.equal(ico.readUInt16LE(4), 3);
await mkdir("tmp", { recursive: true });
await writeFile(
  "tmp/seo-artifact-results.json",
  JSON.stringify(
    {
      pages: results,
      indexable: true,
      sitemap: true,
      robots: true,
      socialImage: { width: og.width, height: og.height },
      icons: true,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Static SEO, public contacts, sitemap, robots and image/icon artifacts PASS",
);
