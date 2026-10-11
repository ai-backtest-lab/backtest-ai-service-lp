import Link from "next/link";
import { landingIdentity } from "@/lib/landingContent";
import { privacySeo, pageMetadata } from "@/lib/seo";
import { founderValue } from "@/lib/founder";
import { StructuredData } from "@/components/StructuredData";
import { FounderPending } from "@/components/FounderPending";
import { SiteFooter } from "@/components/landing/SiteFooter";
const identity = landingIdentity();
export const metadata = pageMetadata(identity, privacySeo);
export default function Privacy() {
  const operator = founderValue("operatorName");
  const retention = founderValue("contactEmailRetention");
  const minimumAge = founderValue("minimumAge");
  return (
    <>
      <main className="legal-page">
        <StructuredData identity={identity} page={privacySeo} />
        <Link href="/">← AI Backtest Lab</Link>
        <h1>Privacy notice</h1>
        <p>
          This notice covers aibacktestlab.com and the public interactive demo
          at demo.aibacktestlab.com. Both are operated by {operator},{" "}
          {founderValue("operatorDescription")}. AI Backtest Lab is an
          independent project, not an incorporated company. Contact:{" "}
          <a href={`mailto:${identity.email}`}>{identity.email}</a>.
        </p>
        <h2>What the sites do not collect</h2>
        <p>
          The sites have no accounts, forms, payments or newsletter. They set
          no cookies, store nothing in your browser and include no analytics,
          advertising or tracking scripts. Fonts, images and the product video
          are served from our own domain, and the video only loads when you
          press play.
        </p>
        <h2>Hosting by Cloudflare</h2>
        <p>
          Both sites are static files served by Cloudflare. To deliver and
          protect them, Cloudflare processes request data such as your IP
          address, browser user agent, the requested address and the time of
          the request, and your browser may send Cloudflare network error
          reports. Cloudflare also gives the operator aggregated traffic
          statistics. Cloudflare handles this data under its own{" "}
          <a href="https://www.cloudflare.com/privacypolicy/">privacy policy</a>.
          We do not combine it with other data or use it to identify visitors.
        </p>
        <h2>Email</h2>
        <p>
          Addresses at aibacktestlab.com are forwarded by Cloudflare Email
          Routing to the founder’s mailbox. When you write to us, we receive
          your email address, your message and its metadata, and use them only
          to reply and follow up.{" "}
          {retention &&
            `We keep this correspondence for ${retention}, unless you ask us to delete it sooner.`}
        </p>
        {!retention && <FounderPending decision="email retention period" />}
        <p>
          Questions about your data:{" "}
          <a href={`mailto:${identity.email}`}>{identity.email}</a>.
        </p>
        <h2>Claude and Anthropic</h2>
        <p>
          Claude API integration is planned and not available today. The sites
          do not send visitor data to Anthropic.
        </p>
        {minimumAge ? (
          <>
            <h2>Age</h2>
            <p>These sites are not directed at people under {minimumAge}.</p>
          </>
        ) : (
          <FounderPending decision="minimum age" />
        )}
        <h2>Changes</h2>
        <p>
          We will update this page when the sites change how they handle data.
          Updated October 11, 2026.
        </p>
      </main>
      <SiteFooter identity={identity} />
    </>
  );
}
