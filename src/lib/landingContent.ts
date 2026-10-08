export interface LandingIdentity {
  brand: string;
  domain: string;
  founder: string | null;
  email: string;
  supportEmail: string;
  release: boolean;
}
// Public website information; no runtime configuration or credentials are needed.
export const siteConfig: LandingIdentity = {
  brand: "AI Backtest Lab",
  domain: "https://aibacktestlab.com",
  founder: null,
  email: "founder@aibacktestlab.com",
  supportEmail: "support@aibacktestlab.com",
  release: true,
};
// The public interactive demo runs synthetic data on its own subdomain.
export const demoUrl = "https://demo.aibacktestlab.com/";
export function landingIdentity(): LandingIdentity {
  return siteConfig;
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
    status: "Private workspace · not publicly available",
  },
  {
    number: "02",
    title: "Run backtest",
    body: "Execute a historical simulation with explicit data and cost assumptions.",
    status: "Private workspace · not publicly available",
  },
  {
    number: "03",
    title: "Measure results",
    body: "Inspect recorded outcomes, drawdowns, costs and individual trades.",
    status: "Private workspace · not publicly available",
  },
  {
    number: "04",
    title: "Analyze with Claude",
    body: "Planned: send structured metrics, costs and assumptions to Claude for risk interpretation and explanations.",
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
    body: "Use the quantitative engine to test follow-up hypotheses. Broader out-of-sample validation is planned.",
    status: "Planned research workflow",
  },
] as const;
export const roadmap = [
  {
    date: "Q4 2026 — Q1 2027",
    title: "Backtesting core & Claude POC",
    body: "Continue hardening auditable research evidence and define the first grounded Claude proof of concept.",
    status: "Private backtest core exists · Claude POC planned",
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
    "Historical crypto backtesting exists in the private workspace. Vietnam equity research is an internal preview. Source-backed backtesting and execution are not available. Other market views provide informational context.",
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
