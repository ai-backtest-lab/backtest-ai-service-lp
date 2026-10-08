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
  demoUrl,
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
    "Private workspace · not publicly available",
    ChartNoAxesCombined,
  ],
  [
    "Strategy parameters & versions",
    "Keep strategy settings and source snapshots alongside research evidence.",
    "Private workspace · not publicly available",
    Braces,
  ],
  [
    "Trade-level inspection",
    "Inspect the chart, recorded costs and individual simulated trades.",
    "Private workspace · not publicly available",
    Layers3,
  ],
  [
    "Comparative research",
    "Explore version and cohort evidence within the supported research workflow.",
    "Private workspace · scope-dependent",
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
                <span className="status-dot" /> Quantitative research · AI
                planned
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
                AI Backtest Lab is a private quantitative research platform for
                historical crypto backtesting. Inspect strategy performance and
                risk before deciding what to test next. Claude-powered
                explanations and research assistance are planned.
              </p>
              <div data-hero-copy className="hero-actions">
                <a href={demoUrl} className={buttonVariants({ size: "lg" })}>
                  Try the interactive demo{" "}
                  <ArrowUpRight data-icon="inline-end" />
                </a>
                <a href="#roadmap" className="text-link">
                  See our AI roadmap <ArrowRight />
                </a>
              </div>
              <p data-hero-copy className="hero-status">
                <Check /> Private research workspace <span>·</span> public early
                access planned.
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
                <span>AI Backtest Lab / Research loop</span>
                <span>01 — 06</span>
              </div>
              <ResearchPreview />
              <div className="hero-insight">
                <div>
                  <span className="insight-symbol">✳</span>
                  <span className="mono">Claude insights</span>
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
            <span>Build → Backtest → Quantify → Explain → Validate</span>
            <a href="#problem">
              Scroll to explore <span>↓</span>
            </a>
          </div>
        </section>
        <section id="problem" className="section-shell problem-section">
          <div className="section-meta">
            <span className="eyebrow">01 / The research problem</span>
            <span className="mono">Beyond the headline return</span>
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
            <span className="eyebrow">02 / How it works</span>
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
            <span className="eyebrow">03 / The quantitative foundation</span>
            <span className="mono">
              Private product · Market-specific coverage
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
                <Badge
                  variant="outline"
                  className="max-w-full whitespace-normal"
                >
                  {status}
                </Badge>
              </article>
            ))}
          </div>
          <div className="coverage-note" data-reveal>
            <span className="mono">Market scope</span>
            <p>
              Historical backtesting focuses on crypto. Vietnam equity research
              is an internal preview. Source-backed backtesting and execution
              are not available. Other market views provide informational
              context.
            </p>
          </div>
        </section>
        <section id="claude-ai" className="section-shell claude-section">
          <div className="section-meta">
            <span className="eyebrow">04 / Planned Claude API integration</span>
            <Badge variant="secondary">AI analysis · Planned</Badge>
          </div>
          <div className="section-intro" data-reveal>
            <h2>
              Planned: Claude explains
              <br />
              <span>what the evidence says.</span>
            </h2>
            <p>
              The planned Anthropic Claude API integration will receive
              structured backtest metrics, trade summaries, strategy parameters,
              data coverage and cost assumptions. It will help researchers
              interpret drawdowns, identify weaknesses and propose testable
              hypotheses. The quantitative engine calculates results and
              validates each follow-up experiment; Claude does not predict
              returns or place orders.
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
            <span className="eyebrow">05 / Validation & trust</span>
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
                "Out-of-sample validation · planned",
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
            <span>Dataset</span>
            <ArrowRight />
            <span>Strategy</span>
            <ArrowRight />
            <span>Engine result</span>
            <ArrowRight />
            <span>
              AI report <small>Planned</small>
            </span>
            <ArrowRight />
            <span>Next test</span>
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
            <span className="eyebrow">06 / Independent services</span>
            <span className="mono">
              Separate boundaries. One research vision.
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
                "Demo sandbox runtime",
                "Private sandbox infrastructure exists. Broader forward-validation remains planned.",
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
                <Badge
                  variant="outline"
                  className="max-w-full whitespace-normal"
                >
                  {status}
                </Badge>
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
            <span className="eyebrow">07 / The 24-month roadmap</span>
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
                <Badge
                  variant="outline"
                  className="max-w-full whitespace-normal"
                >
                  {item.status}
                </Badge>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="section-shell about-section">
          <div className="section-meta">
            <span className="eyebrow">08 / Built with intent</span>
            <span className="mono">Independent project</span>
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
                research startup for independent researchers, crypto strategy
                developers and systematic traders. We focus on repeatable
                strategy evaluation and planned AI-assisted explanations.
              </p>
              <p>
                Our direction is an evidence-led research workflow: inspect the
                data and assumptions behind a result, use planned Claude
                analysis to understand its limits, and validate the next
                hypothesis through quantitative backtesting.
              </p>
              {identity.founder && (
                <p className="founder-name mono">Built by {identity.founder}</p>
              )}
            </div>
          </div>
        </section>
        <section id="contact" className="section-shell contact-section">
          <div className="contact-heading" data-reveal>
            <span className="eyebrow">09 / What comes next</span>
            <h2>
              Research better.
              <br />
              <span>Understand more.</span>
              <br />
              Test again.
            </h2>
            <a href={demoUrl} className={buttonVariants({ size: "lg" })}>
              Try the interactive demo{" "}
              <ArrowUpRight data-icon="inline-end" />
            </a>
            <p className="risk-disclosure">
              Private research workspace · public early access planned. Contact
              the founder for partnerships or product questions, or request
              support using the links below.
            </p>
            <div className="contact-actions">
              <a
                className="contact-email"
                href={`mailto:${identity.email}?subject=AI%20Backtest%20Lab%20inquiry`}
              >
                Contact us <ArrowUpRight />
              </a>
              <a
                className="contact-email"
                href={`mailto:${identity.supportEmail}?subject=AI%20Backtest%20Lab%20support`}
              >
                Get support <ArrowUpRight />
              </a>
            </div>
          </div>
          <div className="faq">
            <span className="eyebrow">A few clear answers</span>
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
          <span>AI Backtest Lab</span>
        </a>
        <p>Private quantitative research. Claude analysis planned.</p>
        <div className="footer-contact">
          <a href={`mailto:${identity.email}`}>
            <span>Founder</span>
            {identity.email}
          </a>
          <a href={`mailto:${identity.supportEmail}`}>
            <span>Support</span>
            {identity.supportEmail}
          </a>
        </div>
        <nav aria-label="Legal navigation">
          <a href={demoUrl}>Interactive demo</a>
          <a href="/privacy/">Privacy</a>
          <a href="/disclaimer/">Research disclaimer</a>
          <a href="/media/react-bits-license.txt">Component notices</a>
          <span>© 2026 AI Backtest Lab</span>
        </nav>
      </footer>
    </LandingMotion>
  );
}
