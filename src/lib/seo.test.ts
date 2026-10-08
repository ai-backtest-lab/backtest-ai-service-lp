import { describe, it, expect } from "vitest";
import { landingIdentity } from "./landingContent";
import {
  publicSeoPages,
  pageMetadata,
  homeSeo,
  privacySeo,
  pageSchema,
  serializeSchema,
  seoSitemap,
  seoRobots,
} from "./seo";
const identity = landingIdentity();
describe("production SEO contract", () => {
  it("uses distinct descriptions, production URLs and self-canonical metadata on each page", () => {
    const pages = publicSeoPages();
    expect(new Set(pages.map((p) => p.description)).size).toBe(pages.length);
    for (const page of pages) {
      const meta = pageMetadata(identity, page);
      expect(meta.alternates?.canonical).toBe(identity.domain + page.path);
      expect(meta.openGraph).toMatchObject({
        url: identity.domain + page.path,
        description: page.description,
      });
    }
    expect(pageMetadata(identity, homeSeo).title).toEqual({
      absolute:
        "AI Backtest Lab | Quantitative Backtesting & AI Research Roadmap",
    });
  });
  it("enables production indexing and lists only exported pages", () => {
    expect(pageMetadata(identity, homeSeo).robots).toMatchObject({
      index: true,
      follow: true,
    });
    expect(seoRobots(identity)).toMatchObject({
      rules: { allow: "/" },
      sitemap: "https://aibacktestlab.com/sitemap.xml",
    });
    expect(seoSitemap(identity).map((p) => p.url)).toEqual(
      publicSeoPages().map((p) => identity.domain + p.path),
    );
  });
  it("uses real brand and emails without invented software, prices or ratings", () => {
    const data = pageSchema(identity, homeSeo);
    expect(data["@graph"].map((n) => n["@type"])).toEqual([
      "Organization",
      "WebSite",
      "WebPage",
    ]);
    expect(data["@graph"][0]).toMatchObject({
      email: identity.email,
      contactPoint: [
        { email: identity.email },
        { email: identity.supportEmail },
      ],
    });
    const str = serializeSchema(data);
    expect(str).not.toMatch(
      /aggregateRating|SoftwareApplication|offers|legalName|address/,
    );
  });
  it("uses legal-page breadcrumbs and safely serializes structured data", () => {
    expect(
      pageSchema(identity, privacySeo)["@graph"].find(
        (n) => n["@type"] === "BreadcrumbList",
      ),
    ).toMatchObject({ itemListElement: [{ position: 1 }, { position: 2 }] });
    expect(
      serializeSchema({ name: "</script><script>alert(1)</script>" }),
    ).not.toContain("<");
    const original = { name: "</script>" };
    expect(JSON.parse(serializeSchema(original))).toEqual(original);
  });
});
