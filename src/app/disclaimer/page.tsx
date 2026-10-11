import Link from "next/link";
import { landingIdentity } from "@/lib/landingContent";
import { disclaimerSeo, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import { SiteFooter } from "@/components/landing/SiteFooter";
const identity = landingIdentity();
export const metadata = pageMetadata(identity, disclaimerSeo);
export default function Disclaimer() {
  return (
    <>
      <main className="legal-page">
        <StructuredData identity={identity} page={disclaimerSeo} />
        <Link href="/">← AI Backtest Lab</Link>
        <h1>Research disclaimer</h1>
        <p>
          AI Backtest Lab is a quantitative research project. Nothing on these
          sites is investment advice, a trade instruction or a prediction of
          future results.
        </p>
        <h2>Backtests are hypothetical</h2>
        <p>
          Historical backtesting depends on its data, costs, assumptions and
          execution model. Past results do not guarantee future performance.
        </p>
        <h2>Product screenshots and video</h2>
        <p>
          The screenshots and the product video show the real, privately run
          Research Lab and its backtesting engine, working on a seeded
          synthetic market. The prices, trades and results in them are outputs
          on synthetic data. They are not trading performance, not a
          recommendation and not results on any real market. They were
          captured on October 11, 2026, and the product may have changed since.
        </p>
        <h2>The interactive demo</h2>
        <p>
          The public demo at demo.aibacktestlab.com is a static site on
          synthetic demonstration data. It does not run backtests on a server
          and does not connect to an exchange.
        </p>
        <h2>Planned AI features</h2>
        <p>
          Claude API integration is planned and is not available in the
          product today. Future AI explanations must be grounded in supplied
          results and independently validated. They do not replace
          quantitative tests or human judgment.
        </p>
        <p>
          Using the Claude API in a future product does not mean the project is
          endorsed by Anthropic, accepted into a startup program or guaranteed
          to receive benefits.
        </p>
        <p>Updated October 11, 2026.</p>
      </main>
      <SiteFooter identity={identity} />
    </>
  );
}
