// Pure release rules for the public site. `release-check.mjs` feeds it the real files.
export const REQUIRED_DECISIONS = ["governingLaw", "disputeVenue", "contactEmailRetention", "minimumAge"];

// Claims the public pages must never make, and leftovers that must never ship.
export const FORBIDDEN = [
  [/\$\s?\d[\d,.]*\s*(\/|per)\s*(mo|month|year|yr)\b/i, "a price"],
  [/\b(pricing|subscription) (plans?|tiers?)\b(?! (has|have) not)/i, "pricing plans"],
  [/\b\d[\d,]*\+?\s+(customers|clients|paying users)\b/i, "a customer count"],
  [/\bguaranteed? (returns?|profits?|results?)\b/i, "guaranteed returns"],
  [/\bClaude (is|now) (integrated|available|live)\b/i, "Claude integrated today"],
  [/\b(currently|now) (uses?|using|runs? on) Claude\b|\bpowered by Claude\b|\bClaude-powered\b/i, "Claude in use today"],
  [/\b(Inc\.|LLC|Co\., Ltd\.|JSC)\b/, "a company legal form"],
  [/To be confirmed|\bTODO\b|lorem ipsum|founder decision pending/i, "a placeholder"],
];

export function releaseProblems({ founder, media, cloudflareAudit, pages }) {
  const problems = [];
  for (const key of REQUIRED_DECISIONS)
    if (founder[key] === null || founder[key] === undefined || founder[key] === "")
      problems.push(`founder decision missing: ${key} (src/content/founder.json)`);
  if (founder.legalTextApproved !== true) problems.push("legal pages not approved by the founder (legalTextApproved)");

  if (!cloudflareAudit) problems.push("Cloudflare audit missing: run `make cloudflare-audit`");
  else {
    for (const key of ["webAnalytics", "botFightMode", "logpushJobs", "emailRouting"])
      if (cloudflareAudit[key] === null || cloudflareAudit[key] === undefined)
        problems.push(`Cloudflare audit could not read ${key}`);
    if (cloudflareAudit.webAnalytics) problems.push("Cloudflare Web Analytics is on, but Privacy says there is no analytics");
    if (cloudflareAudit.botFightMode) problems.push("Bot Fight Mode can set cookies, but Privacy says there are none");
    if (cloudflareAudit.logpushJobs > 0) problems.push("Logpush jobs exist; Privacy must describe log export");
    if (cloudflareAudit.emailRouting === false) problems.push("Email Routing is off, but Privacy describes it");
  }

  if (media.dataset !== "synthetic") problems.push("public media must be captured on synthetic data");
  if (media.rightsConfirmed !== true) problems.push("media not confirmed by the founder (rightsConfirmed)");
  for (const s of media.screenshots)
    if (!s.files?.length) problems.push(`screenshot not encoded: ${s.id}`);
  if (!media.video?.files) problems.push("product video not encoded");

  for (const { path, text } of pages)
    for (const [pattern, what] of FORBIDDEN)
      if (pattern.test(text)) problems.push(`${path}: ${what} ("${text.match(pattern)[0]}")`);
  return problems;
}
