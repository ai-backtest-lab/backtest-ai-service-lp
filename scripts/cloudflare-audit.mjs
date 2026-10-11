// Read-only Cloudflare audit for the privacy notice. The founder passes a token at run time:
//   CLOUDFLARE_API_TOKEN=... make cloudflare-audit
// The token needs read access to Zone, Analytics, Bot Management, Logs and Email Routing.
// It is never written anywhere. Output: docs/cloudflare-audit.json.
import { writeFile } from "node:fs/promises";

const DOMAIN = "aibacktestlab.com";
const token = process.env.CLOUDFLARE_API_TOKEN;
if (!token) {
  console.error("Set CLOUDFLARE_API_TOKEN for this command only; it is not stored.");
  process.exit(2);
}
const errors = [];
async function get(path) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.success === false) {
    errors.push(`${path}: HTTP ${response.status} ${body.errors?.[0]?.message ?? ""}`.trim());
    return null;
  }
  return body.result;
}

const zones = await get(`/zones?name=${DOMAIN}`);
const zone = zones?.[0];
if (!zone) {
  console.error(`zone ${DOMAIN} not visible to this token`, errors);
  process.exit(1);
}
const sites = await get(`/accounts/${zone.account.id}/rum/site_info/list`);
const bots = await get(`/zones/${zone.id}/bot_management`);
const logpush = await get(`/zones/${zone.id}/logpush/jobs`);
const email = await get(`/zones/${zone.id}/email/routing`);

const audit = {
  checkedAt: new Date().toISOString(),
  zone: zone.name,
  webAnalytics: sites ? sites.some((s) => (s.host ?? "").endsWith(DOMAIN)) : null,
  botFightMode: bots ? Boolean(bots.fight_mode) : null,
  logpushJobs: logpush ? logpush.length : null,
  emailRouting: email ? Boolean(email.enabled) : null,
  errors,
};
await writeFile("docs/cloudflare-audit.json", JSON.stringify(audit, null, 2) + "\n");
console.log(audit);
