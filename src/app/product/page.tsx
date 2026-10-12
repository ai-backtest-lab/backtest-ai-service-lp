import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StructuredData } from "@/components/StructuredData";
import { ProductShot } from "@/components/product/ProductShot";
import { ProductVideo } from "@/components/product/ProductVideo";
import { demoRepoUrl, demoUrl, landingIdentity } from "@/lib/landingContent";
import { mediaLabel, productVideo } from "@/lib/media";
import { pageMetadata, productSeo } from "@/lib/seo";
const identity = landingIdentity();
export const metadata = pageMetadata(identity, productSeo);

const architecture = [
  ["Historical market data", "Closed candles, funding and instrument rules, read and pinned for each run."],
  ["Backtesting engine", "Simulates the strategy with explicit fees, funding and slippage, one isolated runner per run."],
  ["Quantitative metrics", "Return after costs, drawdown, profit factor, trades, equity and a buy-and-hold reference."],
  ["Research validation", "Automated quality check, run comparison and a held-out recent-period check."],
  ["Dashboard", "The Research Lab shows every run, chart and trade, and exports reports."],
] as const;

const status = {
  Working: [
    "Historical backtesting of crypto perpetual futures with fees, funding and slippage",
    "Research Lab: run, quality check, compare runs, Markdown and JSON reports",
    "Held-out recent 12-month check, counted separately from exploration",
    "Strategy files with parameters and a fixed cost and risk policy",
    "Public interactive demo (static, synthetic data)",
  ],
  Experimental: [
    "Exchange-sandbox demo runtime (private, no real funds)",
    "Market context views, for information only",
  ],
  Planned: [
    "AI analysis of structured results: risk explanations and testable hypotheses",
    "Broader out-of-sample validation",
    "Public early access",
    "Features for research teams",
  ],
} as const;

const limitations = [
  "The Research Lab runs privately and is not publicly available.",
  "One run works at a time.",
  "Backtesting covers crypto perpetual futures only.",
  "Public screenshots and video use synthetic market data; results on real markets are not published.",
  "The current chart labels crypto prices as VND and times as UTC+7; this is a known display issue.",
  "There is no live trading.",
];

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function ProductPage() {
  return (
    <div className="landing">
      <StructuredData identity={identity} page={productSeo} />
      <SiteHeader />
      <main id="main" className="product-page">
        <section className="section-shell product-hero" aria-labelledby="product-title">
          <span className="eyebrow">Product · as it runs today</span>
          <h1 id="product-title">
            The Research Lab,
            <br />
            <span>shown as it works.</span>
          </h1>
          <p>
            These screenshots and the video come from the private Research Lab
            running its real backtesting engine. To keep the public pages free
            of licensed exchange data, the market behind them is synthetic and
            labelled so: {mediaLabel}.
          </p>
          <div className="product-actions">
            <a href={demoUrl} className={buttonVariants({ size: "lg" })}>
              Explore Interactive Demo <ArrowUpRight data-icon="inline-end" />
            </a>
            <a href="#workflow" className="text-link">
              Watch Product Demo <ArrowRight />
            </a>
          </div>
          <ProductShot id="dashboard-overview" priority sizes="(max-width: 1023px) 100vw, 1100px" />
        </section>

        <section className="section-shell product-block" aria-labelledby="capabilities-title">
          <span className="eyebrow">01 / Working capabilities</span>
          <h2 id="capabilities-title">Real screens, one research loop.</h2>
          <div className="product-gallery">
            <ProductShot id="strategy-research" />
            <ProductShot id="backtest-results" />
            <ProductShot id="backtest-execution" />
            <ProductShot id="risk-analysis" />
          </div>
          <p className="product-note">
            Charts in the Research Lab and the video are built with{" "}
            <a href="https://www.tradingview.com/lightweight-charts/">
              TradingView Lightweight Charts™
            </a>
            .
          </p>
        </section>

        <section id="workflow" className="section-shell product-block" aria-labelledby="workflow-title">
          <span className="eyebrow">02 / Working Local Product Demonstration</span>
          <h2 id="workflow-title">One uncut workflow.</h2>
          <p className="product-lead">{productVideo.description}</p>
          <ProductVideo />
          <details className="transcript">
            <summary>Transcript</summary>
            <ol>
              {productVideo.transcript.map((line) => (
                <li key={line.at}>
                  <span className="mono">{mmss(line.at)}</span>
                  {line.text}
                </li>
              ))}
            </ol>
          </details>
        </section>

        <section className="section-shell product-block" aria-labelledby="architecture-title">
          <span className="eyebrow">03 / Architecture</span>
          <h2 id="architecture-title">From data to a decision you can check.</h2>
          <ol className="architecture-flow">
            {architecture.map(([title, body], i) => (
              <li key={title}>
                <span className="mono">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <p className="product-lead">
            The public interactive demo is a separate static site: it replays
            synthetic demonstration data in the browser and does not run
            backtests on a server. The engine, data and strategies stay
            private. The demo source is public on{" "}
            <a href={demoRepoUrl}>GitHub</a>.
          </p>
        </section>

        <section className="section-shell product-block" aria-labelledby="status-title">
          <span className="eyebrow">04 / Development status</span>
          <h2 id="status-title">What works, what is next.</h2>
          <div className="status-columns">
            {Object.entries(status).map(([label, items]) => (
              <div key={label} className="status-column" data-status={label.toLowerCase()}>
                <h3>{label}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell product-block" aria-labelledby="limits-title">
          <span className="eyebrow">05 / Known limitations</span>
          <h2 id="limits-title">Stated plainly.</h2>
          <ul className="limitations">
            {limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section-shell product-block availability" aria-labelledby="availability-title">
          <span className="eyebrow">06 / Availability</span>
          <h2 id="availability-title">Built for research. Preparing for early access.</h2>
          <p className="product-lead">
            AI Backtest Lab is under active development. The research workspace
            is private and commercial pricing has not been announced. Public
            early access is a roadmap goal, not an available service.
          </p>
          <div className="product-actions">
            <a href={demoUrl} className={buttonVariants({ variant: "outline" })}>
              Explore Interactive Demo <ArrowUpRight data-icon="inline-end" />
            </a>
            <a
              href={`mailto:${identity.email}?subject=Research%20needs`}
              className={buttonVariants({ variant: "outline" })}
            >
              Discuss Research Needs <ArrowUpRight data-icon="inline-end" />
            </a>
            <Link href="/disclaimer/" className="text-link">
              Research disclaimer <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter identity={identity} />
    </div>
  );
}
