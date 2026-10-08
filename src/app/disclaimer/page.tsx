import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Research disclaimer",
  alternates: { canonical: "/disclaimer/" },
};
export default function Disclaimer() {
  return (
    <main className="legal-page">
      <Link href="/">← AI Backtest Lab</Link>
      <h1>Research disclaimer</h1>
      <p>
        AI Backtest Lab is a quantitative research project. The public site
        provides product information and illustrative views, not investment
        advice, trade instructions or a prediction of future results.
      </p>
      <p>
        Historical backtesting is hypothetical and depends on its data, costs,
        assumptions and execution model. Past results do not guarantee future
        performance. Illustrative charts and report concepts on this site are
        not measured trading performance.
      </p>
      <p>
        Claude API integration is planned and is not currently available in this
        product. Future AI explanations must be grounded in supplied results and
        independently validated. They do not replace quantitative tests or human
        judgment.
      </p>
      <p>
        Using the Claude API in a future product does not mean the project is
        endorsed by Anthropic, accepted into a startup program or guaranteed to
        receive benefits.
      </p>
      <p>Updated October 8, 2026.</p>
    </main>
  );
}
