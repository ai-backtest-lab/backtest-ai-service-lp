import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Braces,
  FlaskConical,
  ShieldCheck,
  Layers3,
  ChartNoAxesCombined,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  faq,
  heroLines,
  roadmap,
  type LandingIdentity,
} from "@/lib/landingContent";
import { SiteHeader } from "./SiteHeader";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { ResearchPreview } from "./ResearchPreview";
import { WorkflowStory } from "./WorkflowStory";
import { ClaudeStory } from "./ClaudeStory";
import { LandingMotion } from "./LandingMotion";
import ScrollReveal from "./effects/ScrollReveal";
import TextType from "./effects/TextType";
import MaskedHeading from "./effects/MaskedHeading";
const capabilities = [
  [
    "Historical backtesting",
    "Trace a strategy through historical data and explicit execution assumptions.",
    "Private workspace",
    ChartNoAxesCombined,
  ],
  [
    "Strategy parameters & versions",
    "Keep strategy settings and source snapshots alongside research evidence.",
    "Private workspace",
    Braces,
  ],
  [
    "Trade-level inspection",
    "Inspect the chart, recorded costs and individual simulated trades.",
    "Private workspace",
    Layers3,
  ],
  [
    "Comparative research",
    "Explore version and cohort evidence within the supported research workflow.",
    "Scope-dependent",
    FlaskConical,
  ],
] as const;
export function LandingPage({ identity }: { identity: LandingIdentity }) {
  return (
    <LandingMotion>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section id="top" className="hero section-shell">
          <HeroAtmosphere />
          <div className="hero-grid">
            <div className="hero-copy">
              <div data-hero-copy className="hero-eyebrow">
                <span className="status-dot" /> AI-ASSISTED QUANTITATIVE
                RESEARCH
              </div>
              <h1>
                Backtest with Data.
                <br />
                <span>
                  Understand Your
                  <br />
                  Strategy with AI.
                </span>
              </h1>
              <p data-hero-copy className="hero-description">
                Research trading strategies with historical market data and
                quantitative performance metrics. We’re building Claude-powered
                analysis to turn results into clear risk insights and next-step
                research ideas.
              </p>
              <div data-hero-copy className="hero-actions">
                <a href="#product" className={buttonVariants({ size: "lg" })}>
                  Explore the platform <ArrowUpRight data-icon="inline-end" />
                </a>
                <a href="#roadmap" className="text-link">
                  See our AI roadmap <ArrowRight />
                </a>
              </div>
              <p data-hero-copy className="hero-status">
                <Check /> Private research workspace <span>·</span> Claude API
                integration planned
              </p>
              <div className="hero-type mono">
                <TextType
                  text={heroLines}
                  typingSpeed={45}
                  initialDelay={600}
                  pauseDuration={1800}
                  startOnVisible
                />
              </div>
            </div>
            <div className="hero-visual" data-hero-copy>
              <div className="hero-visual-label mono">
                <span>AI BACKTEST LAB / RESEARCH LOOP</span>
                <span>01 — 06</span>
              </div>
              <ResearchPreview />
              <div className="hero-insight">
                <div>
                  <span className="insight-symbol">✳</span>
                  <span className="mono">CLAUDE INSIGHTS</span>
                  <Badge variant="outline">Concept · Planned</Badge>
                </div>
                <p>
                  Not just “how did it perform?”
                  <br />
                  <strong>What should you test next?</strong>
                </p>
              </div>
              <p className="visual-caption">
                Illustrative research view · No measured performance shown
              </p>
            </div>
          </div>
          <div className="hero-bottom mono">
            <span>BUILD → BACKTEST → QUANTIFY → EXPLAIN → VALIDATE</span>
            <a href="#problem">
              SCROLL TO EXPLORE <span>↓</span>
            </a>
          </div>
        </section>
        <section id="problem" className="section-shell problem-section">
          <div className="section-meta">
            <span className="eyebrow">01 / THE RESEARCH PROBLEM</span>
            <span className="mono">BEYOND THE HEADLINE RETURN</span>
          </div>
          <ScrollReveal baseOpacity={0.65} blurStrength={1.5}>
            A backtest can show the numbers. Understanding them is harder.
          </ScrollReveal>
          <div className="problem-rows">
            {[
              [
                "Too many metrics",
                "A return alone leaves drawdown behavior, trading costs and sample limitations unanswered.",
              ],
              [
                "Hidden risks",
                "Historical results can conceal overfitting, market sensitivity and assumptions that deserve scrutiny.",
              ],
              [
                "Slow research iterations",
                "Turning a result into the next testable question still takes deliberate, manual work.",
              ],
            ].map(([title, body], i) => (
              <article key={title} data-reveal>
                <span className="mono">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <ArrowUpRight />
              </article>
            ))}
          </div>
        </section>
        <section id="product" className="section-shell product-section">
          <div className="section-meta">
            <span className="eyebrow">02 / HOW IT WORKS</span>
            <Badge variant="outline">Research before you trade</Badge>
          </div>
          <div className="section-intro" data-reveal>
            <h2>
              One research loop.
              <br />
              <span>Six deliberate steps.</span>
            </h2>
            <p>
              Every decision begins with quantitative evidence. Claude is
              planned to help translate that evidence into a better research
              question.
            </p>
          </div>
          <WorkflowStory />
        </section>
        <section
          id="capabilities"
          className="section-shell capabilities-section"
        >
          <div className="section-meta">
            <span className="eyebrow">03 / THE QUANTITATIVE FOUNDATION</span>
            <span className="mono">
              PRIVATE PRODUCT · MARKET-SPECIFIC COVERAGE
            </span>
          </div>
          <div className="section-intro" data-reveal>
            <h2>
              Built on evidence.
              <br />
              <span>Not AI guesswork.</span>
            </h2>
            <p>
              Calculations stay in the engine. Strategy assumptions and recorded
              outcomes remain inspectable in the research workspace.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map(([title, body, status, Icon]) => (
              <article key={title} data-reveal>
                <Icon />
                <h3>{title}</h3>
                <p>{body}</p>
                <Badge variant="outline">{status}</Badge>
              </article>
            ))}
          </div>
          <div className="coverage-note" data-reveal>
            <span className="mono">MARKET SCOPE</span>
            <p>
              Historical backtesting focuses on crypto. Vietnam equity research
              has chart previews and strategy workspaces; source-backed
              execution is still in development. Other market views provide
              informational context.
            </p>
          </div>
        </section>
        <section id="claude-ai" className="section-shell claude-section">
          <div className="section-meta">
            <span className="eyebrow">04 / PLANNED CLAUDE API INTEGRATION</span>
            <Badge variant="secondary">AI analysis · Planned</Badge>
          </div>
          <div className="section-intro" data-reveal>
            <h2>
              Claude helps explain
              <br />
              <span>what the evidence says.</span>
            </h2>
            <p>
              We’re designing an analysis layer with Anthropic’s Claude API:
              readable performance reviews, risk explanations and testable
              hypotheses grounded in a supplied backtest report.
            </p>
          </div>
          <p className="ai-status">
            Claude API integration is planned and is not yet available in the
            current product.
          </p>
          <ClaudeStory />
          <div className="ai-capabilities">
            {[
              "Performance explanation",
              "Risk & weakness review",
              "Run-specific research Q&A",
              "Next experiment suggestions",
            ].map((label) => (
              <span key={label}>
                <Check />
                {label}
                <small>Planned</small>
              </span>
            ))}
          </div>
        </section>
        <section id="validation" className="section-shell validation-section">
          <div className="section-meta">
            <span className="eyebrow">05 / VALIDATION & TRUST</span>
            <ShieldCheck />
          </div>
          <div className="masked-wrap" data-reveal>
            <MaskedHeading
              text="Research you can verify."
              src="/media/heading-fill.svg"
              reveal="wipe"
              align="left"
              textScale={0.083}
              drift={4}
              parallax={8}
            />
          </div>
          <div className="validation-grid" data-reveal>
            <p>
              Our engine is responsible for computation. The planned Claude
              layer is responsible for interpretation. A compelling explanation
              remains a hypothesis until it survives another test.
            </p>
            <div>
              {[
                "Versioned research evidence",
                "Explicit data and cost assumptions",
                "Out-of-sample research goals",
                "Transparent AI limitations",
              ].map((label) => (
                <div key={label}>
                  <Check />
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="lineage mono" aria-label="Research evidence lineage">
            <span>DATASET</span>
            <ArrowRight />
            <span>STRATEGY</span>
            <ArrowRight />
            <span>ENGINE RESULT</span>
            <ArrowRight />
            <span>
              AI REPORT <small>PLANNED</small>
            </span>
            <ArrowRight />
            <span>NEXT TEST</span>
          </div>
          <p className="risk-disclosure">
            Backtesting is hypothetical. Past performance does not guarantee
            future results. AI-generated explanations may be incomplete and must
            be independently validated.
          </p>
        </section>
        <section
          id="architecture"
          className="section-shell architecture-section"
        >
          <div className="section-meta">
            <span className="eyebrow">06 / INDEPENDENT SERVICES</span>
            <span className="mono">
              SEPARATE BOUNDARIES. ONE RESEARCH VISION.
            </span>
          </div>
          <div className="section-intro" data-reveal>
            <h2>
              A platform with
              <br />
              <span>clear responsibilities.</span>
            </h2>
            <p>
              Research, interpretation and execution environments remain
              separate. The planned AI analysis service has no authority to
              place orders.
            </p>
          </div>
          <div className="service-list">
            {[
              [
                "01",
                "Backtest service",
                "Historical simulations, inspectable research results and transparent assumptions.",
                "Private foundation",
              ],
              [
                "02",
                "Claude AI research",
                "Grounded report explanations, run-specific questions and follow-up hypotheses.",
                "Planned",
              ],
              [
                "03",
                "Demo forward-testing",
                "Existing private sandbox infrastructure; broader product validation is a roadmap goal.",
                "Private infrastructure",
              ],
              [
                "04",
                "Market indicator insights",
                "Existing source-specific context views; broader public research access is a roadmap goal.",
                "Private context views",
              ],
            ].map(([num, title, body, status]) => (
              <article key={title} data-reveal>
                <span className="mono">{num}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <Badge variant="outline">{status}</Badge>
              </article>
            ))}
          </div>
          <p className="architecture-footnote">
            Live trading is outside this public product. Any future execution
            pilot remains conditional on separate risk review and explicit
            authorization.
          </p>
        </section>
        <section id="roadmap" className="section-shell roadmap-section">
          <div className="section-meta">
            <span className="eyebrow">07 / THE 24-MONTH ROADMAP</span>
            <span className="mono">Q4 2026 — Q3 2028</span>
          </div>
          <div className="section-intro" data-reveal>
            <h2>
              Reliable research first.
              <br />
              <span>Then smarter iteration.</span>
            </h2>
            <p>
              A narrow, measurable path from quantitative backtesting to
              grounded AI research. Roadmap goals may change with evidence.
            </p>
          </div>
          <div className="roadmap-list">
            {roadmap.map((item, i) => (
              <article key={item.date} data-reveal>
                <div className="roadmap-marker mono">0{i + 1}</div>
                <div>
                  <span className="mono roadmap-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <Badge variant="outline">{item.status}</Badge>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="section-shell about-section">
          <div className="section-meta">
            <span className="eyebrow">08 / BUILT WITH INTENT</span>
            <span className="mono">INDEPENDENT PROJECT</span>
          </div>
          <div className="about-grid" data-reveal>
            <h2>
              For people who prefer
              <br />
              <span>evidence to hype.</span>
            </h2>
            <div>
              <p>
                AI Backtest Lab is an independently developed quantitative
                research project. We focus on repeatable strategy evaluation and
                practical AI-assisted explanations, not automated profit
                promises.
              </p>
              <p>
                The ambition is simple: build a hypothesis, test it, understand
                its limits, and decide what to validate next.
              </p>
              {identity.founder && (
                <p className="founder-name mono">Built by {identity.founder}</p>
              )}
            </div>
          </div>
        </section>
        <section id="contact" className="section-shell contact-section">
          <div className="contact-heading" data-reveal>
            <span className="eyebrow">09 / WHAT COMES NEXT</span>
            <h2>
              Research better.
              <br />
              <span>Understand more.</span>
              <br />
              Test again.
            </h2>
            <a href="#product" className={buttonVariants({ size: "lg" })}>
              Explore the platform <ArrowUpRight data-icon="inline-end" />
            </a>
            {identity.email ? (
              <a
                className="contact-email"
                href={`mailto:${identity.email}?subject=AI%20Backtest%20Lab%20early%20access`}
              >
                {identity.email}
                <ArrowUpRight />
              </a>
            ) : (
              <p className="contact-note">
                Public early access and founder contact details are being
                prepared.
              </p>
            )}
          </div>
          <div className="faq">
            <span className="eyebrow">A FEW CLEAR ANSWERS</span>
            <Accordion>
              {faq.map(([question, answer]) => (
                <AccordionItem key={question} value={question}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <a className="brand" href="#top">
          <span className="brand-symbol">
            ai<span>↗</span>
          </span>
          <span>AI BACKTEST LAB</span>
        </a>
        <p>Backtest with Data. Understand with AI.</p>
        <nav aria-label="Legal navigation">
          <a href="/privacy/">Privacy</a>
          <a href="/disclaimer/">Research disclaimer</a>
          <a href="/media/react-bits-license.txt">Component notices</a>
          <span>© 2026 AI Backtest Lab</span>
        </nav>
      </footer>
    </LandingMotion>
  );
}
