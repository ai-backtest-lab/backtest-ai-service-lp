import { describe, expect, it } from "vitest";
import { releaseProblems } from "./release-problems.mjs";

const ready = () => ({
  founder: {
    governingLaw: "Vietnam",
    disputeVenue: "the courts of Ho Chi Minh City",
    contactEmailRetention: "12 months",
    minimumAge: "18",
    legalTextApproved: true,
  },
  media: {
    dataset: "synthetic",
    rightsConfirmed: true,
    screenshots: [{ id: "a", files: [{ width: 1280 }] }],
    video: { files: { mp4: 1 } },
  },
  cloudflareAudit: { webAnalytics: false, botFightMode: false, logpushJobs: 0, emailRouting: true },
  pages: [{ path: "/", text: "Commercial pricing has not been announced. Claude integration is planned." }],
});

describe("releaseProblems", () => {
  it("passes a site with every decision, audit and approval in place", () => {
    expect(releaseProblems(ready())).toEqual([]);
  });
  it("names each open founder decision and missing approval", () => {
    const input = ready();
    input.founder.governingLaw = null;
    input.founder.legalTextApproved = false;
    input.media.rightsConfirmed = false;
    expect(releaseProblems(input)).toEqual([
      "founder decision missing: governingLaw (src/content/founder.json)",
      "legal pages not approved by the founder (legalTextApproved)",
      "media not confirmed by the founder (rightsConfirmed)",
    ]);
  });
  it("requires a Cloudflare audit that matches the privacy notice", () => {
    const missing = ready();
    missing.cloudflareAudit = null;
    expect(releaseProblems(missing)).toContain("Cloudflare audit missing: run `make cloudflare-audit`");
    const analytics = ready();
    analytics.cloudflareAudit.webAnalytics = true;
    expect(releaseProblems(analytics)[0]).toMatch(/Web Analytics/);
    const partial = ready();
    partial.cloudflareAudit.logpushJobs = null;
    expect(releaseProblems(partial)).toEqual(["Cloudflare audit could not read logpushJobs"]);
  });
  it("refuses non-synthetic media and misleading claims in page text", () => {
    const input = ready();
    input.media.dataset = "binance";
    input.pages = [
      { path: "/", text: "Pro plan $29/month. Trusted by 1,200 customers. Guaranteed returns." },
      { path: "/terms/", text: "AI Backtest Lab LLC. To be confirmed before launch." },
    ];
    const problems = releaseProblems(input);
    expect(problems[0]).toBe("public media must be captured on synthetic data");
    expect(problems.join("\n")).toMatch(/a price/);
    expect(problems.join("\n")).toMatch(/a customer count/);
    expect(problems.join("\n")).toMatch(/guaranteed returns/);
    expect(problems.join("\n")).toMatch(/company legal form/);
    expect(problems.join("\n")).toMatch(/placeholder/);
  });
});
