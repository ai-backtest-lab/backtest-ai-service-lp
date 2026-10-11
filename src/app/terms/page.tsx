import Link from "next/link";
import { landingIdentity } from "@/lib/landingContent";
import { termsSeo, pageMetadata } from "@/lib/seo";
import { founderValue } from "@/lib/founder";
import { StructuredData } from "@/components/StructuredData";
import { FounderPending } from "@/components/FounderPending";
import { SiteFooter } from "@/components/landing/SiteFooter";
const identity = landingIdentity();
export const metadata = pageMetadata(identity, termsSeo);
export default function Terms() {
  const law = founderValue("governingLaw");
  const venue = founderValue("disputeVenue");
  return (
    <>
      <main className="legal-page">
        <StructuredData identity={identity} page={termsSeo} />
        <Link href="/">← AI Backtest Lab</Link>
        <h1>Terms of use</h1>
        <p>
          These terms apply to aibacktestlab.com and the public interactive demo
          at demo.aibacktestlab.com. The sites are operated by{" "}
          {founderValue("operatorName")}, {founderValue("operatorDescription")}
          , who runs AI Backtest Lab as an independent project, not an
          incorporated company. By using the sites you accept these terms.
        </p>
        <h2>What the sites are</h2>
        <p>
          The sites describe a quantitative research product that is under
          development. The research workspace is private; there is no account,
          subscription or paid service. The interactive demo is a static site
          on synthetic data and may change or stop at any time.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Do not disrupt or overload the sites, scrape them in bulk, try to
          reach anything that is not publicly linked, work around technical
          limits, or suggest that you are affiliated with AI Backtest Lab when
          you are not.
        </p>
        <h2>Content and ownership</h2>
        <p>
          The text, design, brand, screenshots and video on the sites belong to
          the operator. You may link to the sites and quote short parts with
          attribution. Third-party software keeps its own license, including
          the <a href="/media/react-bits-license.txt">React Bits components</a>{" "}
          used here and TradingView Lightweight Charts, which is credited in the
          demo. The{" "}
          <a href="https://github.com/ai-backtest-lab/backtest-dashboard-demo">
            demo source code
          </a>{" "}
          is public for review; publishing it does not grant a license to
          reuse it.
        </p>
        <h2>No financial advice</h2>
        <p>
          Nothing on the sites is investment advice or a recommendation to
          trade. Read the <Link href="/disclaimer/">research disclaimer</Link>.
        </p>
        <h2>No warranty and limits of liability</h2>
        <p>
          The sites are provided “as is” and “as available”, without
          warranties of any kind. To the extent the law allows, the operator is
          not liable for losses that come from using or relying on the sites.
          Nothing in these terms limits liability that the law does not allow
          to be limited.
        </p>
        <h2>Other sites</h2>
        <p>
          Links to other sites, such as GitHub or Cloudflare, are provided for
          convenience. Their own terms apply there.
        </p>
        {law && venue ? (
          <>
            <h2>Governing law and disputes</h2>
            <p>
              These terms are governed by the laws of {law}. Disputes are
              handled by {venue}.
            </p>
          </>
        ) : (
          <FounderPending decision="governing law and dispute venue" />
        )}
        <h2>Changes and contact</h2>
        <p>
          We may update these terms; the date below shows the latest version.
          Questions: <a href={`mailto:${identity.email}`}>{identity.email}</a>.
          Updated October 11, 2026.
        </p>
      </main>
      <SiteFooter identity={identity} />
    </>
  );
}
