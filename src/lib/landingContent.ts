export interface LandingIdentity {
  brand: string;
  domain: string;
  founder: string | null;
  email: string | null;
  release: boolean;
}
export function landingIdentity(
  env: Record<string, string | undefined> = {},
): LandingIdentity {
  const release = env.LANDING_RELEASE === "1";
  const brand = "AI Backtest Lab";
  const domain = env.LANDING_DOMAIN?.trim() || "https://aibacktestlab.com";
  const founder = env.LANDING_FOUNDER?.trim() || null;
  const email = env.LANDING_CONTACT_EMAIL?.trim() || null;
  const parsed = new URL(domain);
  if (
    parsed.protocol !== "https:" ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash
  )
    throw new Error("Landing domain must be an HTTPS origin");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Invalid contact email");
  if (
    release &&
    (!founder || !email || email.split("@")[1] !== parsed.hostname)
  )
    throw new Error(
      "Release requires a verified founder and domain-matching contact email",
    );
  return { brand, domain: parsed.origin, founder, email, release };
}
export const heroLines = [
  "Build the hypothesis.",
  "Backtest with data.",
  "Understand the risk.",
  "Validate again.",
];
export const workflow = [
  {
    number: "01",
    title: "Define strategy",
    body: "Pick a strategy, parameters, symbol and historical window.",
    status: "Private workspace",
  },
  {
    number: "02",
    title: "Run backtest",
    body: "Execute a historical simulation with explicit data and cost assumptions.",
    status: "Private workspace",
  },
  {
    number: "03",
    title: "Measure results",
    body: "Inspect recorded outcomes, drawdowns, costs and individual trades.",
    status: "Private workspace",
  },
  {
    number: "04",
    title: "Analyze with Claude",
    body: "Translate a validated report into explanations of risk and limitations.",
    status: "Planned Claude integration",
  },
  {
    number: "05",
    title: "Form new hypotheses",
    body: "Turn an observation into a question you can test quantitatively.",
    status: "Planned research workflow",
  },
  {
    number: "06",
    title: "Validate again",
    body: "Run the next experiment and compare the evidence, including out-of-sample checks.",
    status: "Planned research workflow",
  },
] as const;
export const roadmap = [
  {
    date: "Q4 2026 — Q1 2027",
    title: "Backtesting core & Claude POC",
    body: "Auditable strategy results, transparent assumptions and our first grounded Claude research reports.",
    status: "In progress / AI planned",
  },
  {
    date: "Q2 — Q3 2027",
    title: "Validation & demo forward-testing",
    body: "Extend out-of-sample research and validate differences against isolated sandbox execution.",
    status: "Planned",
  },
  {
    date: "Q4 2027 — Q1 2028",
    title: "AI research workspace",
    body: "Run-specific questions, experiment comparisons and testable research hypotheses.",
    status: "Planned",
  },
  {
    date: "Q2 — Q3 2028",
    title: "Research platform beta",
    body: "Carefully evaluated early access, shareable research reports and feedback from real users.",
    status: "Planned",
  },
] as const;
export const faq = [
  [
    "Is Claude integrated today?",
    "Claude API integration is planned. Tested integrations will be labeled separately when available.",
  ],
  [
    "Does AI execute trades?",
    "No. The planned Claude layer interprets supplied research evidence. It has no authority to submit trades or change trading controls.",
  ],
  [
    "Which markets can I backtest?",
    "Historical backtesting currently focuses on crypto. Vietnam equity research has preview and strategy workspaces; source-backed execution remains in development. Other market views provide informational context.",
  ],
  [
    "Is the platform publicly available?",
    "The research workspace is currently private. Public early access is a roadmap milestone, not an available service.",
  ],
  [
    "Is this financial advice?",
    "No. Backtesting is hypothetical. Historical results do not guarantee future returns, and AI explanations require independent validation.",
  ],
] as const;
