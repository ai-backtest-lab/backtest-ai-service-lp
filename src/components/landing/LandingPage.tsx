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
  audiences,
  demoRepoUrl,
  demoUrl,
  faq,
  founderGithubUrl,
  founderProfile,
  githubOrgUrl,
  heroLines,
  problems,
  roadmap,
  type LandingIdentity,
} from "@/lib/landingContent";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { ProductShot } from "@/components/product/ProductShot";
import { ProductVideo } from "@/components/product/ProductVideo";
import { mediaLabel } from "@/lib/media";
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
                <span className="status-dot" /> Backtesting · Quantitative
                research · AI planned
              </div>
              <h1>
                Quantitative Research{" "}
                <br />
                <span>for Individuals &amp;&nbsp;Teams.</span>
              </h1>
              <p data-hero-copy className="hero-description">
                Test trading strategies, understand performance and risk, and
                turn research ideas into evidence-based decisions — with
                AI-assisted insights on the roadmap. The backtesting engine runs
                historical crypto research today in a private workspace.
              </p>
              <div data-hero-copy className="hero-actions">
                <a href={demoUrl} className={buttonVariants({ size: "lg" })}>
                  Explore Interactive Demo{" "}
                  <ArrowUpRight data-icon="inline-end" />
                </a>
                <a href="#see-it-in-action" className="text-link">
                  Watch Product Demo <ArrowRight />
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
                <span>AI Backtest Lab / Research Lab</span>
                <span>Real screenshot</span>
              </div>
              <div className="hero-shot">
                <ProductShot
                  id="dashboard-overview"
                  priority
                  sizes="(max-width: 1023px) 100vw, 55vw"
                  showCaption={false}
                />
              </div>
              <p className="visual-caption">
                {mediaLabel} · private Research Lab ·{" "}
                <a href="/product/">See the product</a>
              </p>
            </div>
          </div>
          <div className="hero-bottom mono">
            <span>Idea → Backtest → Analyze → Validate → Interpret</span>
            <a href="#audience">
              Scroll to explore <span>↓</span>
            </a>
          </div>
        </section>
        <section id="audience" className="section-shell audience-section">
          <div className="section-meta">
            <span className="eyebrow">01 / Who it is for</span>
            <span className="mono">One research platform</span>
          </div>
          <div className="section-intro" data-reveal>
            <h2>
              Built for individuals
              <br />
              <span>and research teams.</span>
            </h2>
            <p>
              Both start from the same core: historical backtesting with
              explicit costs, performance and risk metrics, and validation
              checks. Team-specific features are not built yet.
            </p>
          </div>
          <div className="audience-grid">
            {audiences.map((audience) => (
              <article
                key={audience.id}
                className="audience-card"
                aria-labelledby={`audience-${audience.id}`}
                data-reveal
              >
                <span className="eyebrow">{audience.label}</span>
                <h3 id={`audience-${audience.id}`}>{audience.title}</h3>
                <p className="audience-who">{audience.who}</p>
                <ul>
                  {audience.needs.map((need) => (
                    <li key={need}>
                      <Check />
                      {need}
                    </li>
                  ))}
                </ul>
                <p className="audience-note">{audience.note}</p>
                {audience.id === "individuals" ? (
                  <a
                    href={demoUrl}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Explore Interactive Demo{" "}
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                ) : (
                  <a
                    href={`mailto:${identity.email}?subject=Research%20needs`}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Discuss Your Research Needs{" "}
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
        <section id="problem" className="section-shell problem-section">
          <div className="section-meta">
            <span className="eyebrow">02 / The research problem</span>
            <span className="mono">Beyond the headline return</span>
          </div>
          <ScrollReveal baseOpacity={0.65} blurStrength={1.5}>
            A backtest can show the numbers. Understanding them is harder.
          </ScrollReveal>
          <div className="problem-groups">
            {problems.map((group) => (
              <article key={group.label} data-reveal>
                <span className="eyebrow">{group.label}</span>
                <ol>
                  {group.items.map((item, i) => (
                    <li key={item}>
                      <span className="mono">0{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>
        <section id="product" className="section-shell product-section">
          <div className="section-meta">
            <span className="eyebrow">03 / How it works</span>
            <Badge variant="outline">Research before you trade</Badge>
          </div>
          <div className="section-intro" data-reveal>
            <h2>
              One research loop.
              <br />
              <span>Six deliberate steps.</span>
            </h2>
            <p>
              The same loop serves an individual researcher and a team: every
              decision begins with quantitative evidence. AI analysis is planned
              to help interpret that evidence, not to replace it.
            </p>
          </div>
          <WorkflowStory />
          <div
            id="see-it-in-action"
            className="see-it-in-action"
            aria-labelledby="see-it-in-action-title"
            data-reveal
          >
            <div className="see-it-copy">
              <span className="eyebrow">Working Local Product Demonstration</span>
              <h3 id="see-it-in-action-title">See it in action.</h3>
              <p>
                One uncut recording of the private Research Lab: configure a
                strategy, run two real backtests, read the quality check,
                performance, chart and trades, then compare the variants. The
                engine is real; the market data is synthetic.
              </p>
              <a href="/product/#workflow" className="text-link">
                Read the transcript <ArrowRight />
              </a>
            </div>
            <ProductVideo />
          </div>
        </section>
        <section
          id="capabilities"
          className="section-shell capabilities-section"
        >
          <div className="section-meta">
            <span className="eyebrow">04 / The quantitative foundation</span>
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
              Historical backtesting focuses on crypto and runs in a private
              development environment. The public interactive demo is static:
              it uses synthetic demonstration data and does not run backtests
              on a backend.
            </p>
          </div>
        </section>
        <section id="ai" className="section-shell claude-section">
          <div className="section-meta">
            <span className="eyebrow">05 / Planned AI analysis</span>
            <Badge variant="secondary">AI analysis · Planned</Badge>
          </div>
          <div className="section-intro" data-reveal>
            <h2>
              Planned: AI explains
              <br />
              <span>what the evidence says.</span>
            </h2>
            <p>
              The planned AI analysis will receive structured backtest metrics,
              trade summaries, strategy parameters, data coverage and cost
              assumptions. It will read the engine&apos;s structured results and
              explain risks, limits and testable hypotheses. The quantitative
              engine calculates results and validates each follow-up
              experiment; the AI does not predict returns or place orders.
            </p>
          </div>
          <p className="ai-status">
            Planned model: Claude by Anthropic, used through the Claude API.
            Not integrated yet.
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
            <span className="eyebrow">06 / Validation & trust</span>
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
              Our engine is responsible for computation. The planned AI
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
            <span className="eyebrow">07 / Independent services</span>
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
                "AI research",
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
            <span className="eyebrow">08 / The 24-month roadmap</span>
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
            <span className="eyebrow">09 / Built with intent</span>
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
                research startup for independent researchers, strategy
                developers and small research teams. We focus on repeatable
                strategy evaluation and planned AI-assisted explanations.
              </p>
              <p>
                Our direction is an evidence-led research workflow: inspect the
                data and assumptions behind a result, use planned AI
                analysis to understand its limits, and validate the next
                hypothesis through quantitative backtesting.
              </p>
              {identity.founder && (
                <div className="founder-card">
                  <p className="founder-name mono">{founderProfile.role}</p>
                  <h3>{identity.founder}</h3>
                  <p>{founderProfile.experience}</p>
                  <p>
                    AI Backtest Lab is independently developed and bootstrapped
                    in Vietnam. It is not an incorporated company.
                  </p>
                  <div className="founder-links">
                    <a href={founderGithubUrl}>
                      Founder GitHub · DyanNguyen22 <ArrowUpRight />
                    </a>
                    <a href={githubOrgUrl}>
                      Organization GitHub · ai-backtest-lab <ArrowUpRight />
                    </a>
                    <a href={demoRepoUrl}>
                      Demo source · backtest-dashboard-demo <ArrowUpRight />
                    </a>
                    <a href={`mailto:${identity.email}`}>
                      {identity.email} <ArrowUpRight />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section id="contact" className="section-shell contact-section">
          <div className="contact-heading" data-reveal>
            <span className="eyebrow">10 / Product availability</span>
            <h2>
              Built for Research.
              <br />
              <span>Preparing for Early Access.</span>
            </h2>
            <p className="availability-copy">
              AI Backtest Lab is under active development. Explore the public
              interactive demo, view the research workflow, or contact us to
              discuss your individual or team research needs.
            </p>
            <a href={demoUrl} className={buttonVariants({ size: "lg" })}>
              Explore Interactive Demo{" "}
              <ArrowUpRight data-icon="inline-end" />
            </a>
            <p className="risk-disclosure">
              The full research engine runs in a private development
              environment · the public demo uses synthetic demonstration data ·
              AI research assistance is planned · public early
              access planned, not available today.
            </p>
            <div className="contact-actions">
              <a
                className="contact-email"
                href={`mailto:${identity.email}?subject=Research%20needs`}
              >
                Discuss Research Needs <ArrowUpRight />
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
      <SiteFooter identity={identity} />
    </LandingMotion>
  );
}
