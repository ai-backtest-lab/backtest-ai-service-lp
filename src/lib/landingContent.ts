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
  founder: "Nguyen Thanh Dat",
  email: "founder@aibacktestlab.com",
  supportEmail: "support@aibacktestlab.com",
  release: true,
};
// The public interactive demo runs synthetic data on its own subdomain.
export const demoUrl = "https://demo.aibacktestlab.com/";
export const githubOrgUrl = "https://github.com/ai-backtest-lab";
export const founderGithubUrl = "https://github.com/DyanNguyen22";
export const demoRepoUrl =
  "https://github.com/ai-backtest-lab/backtest-dashboard-demo";
// Operator-approved founder details (2026-10-11). No research start date is published.
export const founderProfile = {
  role: "Founder & Software Engineer",
  experience:
    "About four years of experience in web development, backend systems and technical architecture.",
} as const;
export function landingIdentity(): LandingIdentity {
  return siteConfig;
}
export const heroLines = [
  "Test strategies.",
  "Understand risks.",
  "Research with evidence.",
];
export const audiences = [
  {
    id: "individuals",
    label: "Individuals",
    who: "Independent traders, strategy developers and quantitative researchers.",
    title: "From a trading idea to a measurable research result.",
    needs: [
      "Test trading strategies systematically",
      "Evaluate historical performance",
      "Understand risk, drawdown and research metrics",
      "Compare and improve trading hypotheses",
      "Skip building the research infrastructure yourself",
    ],
    note: "The research workspace is private today. The public demo shows the workflow on synthetic data.",
  },
  {
    id: "teams",
    label: "Teams & Businesses",
    who: "Small research teams, fintech startups and organizations exploring quantitative research.",
    title: "A structured foundation for systematic trading research.",
    needs: [
      "Consistent strategy evaluation",
      "Repeatable research workflows",
      "Performance and risk reporting",
      "Clarity on research infrastructure and integration needs",
    ],
    note: "Team features, enterprise deployment and paid services are not available today. Contact the founder to discuss your needs.",
  },
] as const;
export const problems = [
  {
    label: "Individuals",
    items: [
      "Strategy ideas are hard to test reliably.",
      "Manual backtesting takes time.",
      "Performance metrics are hard to interpret.",
      "Historical profits can hide substantial risk.",
    ],
  },
  {
    label: "Teams",
    items: [
      "Research workflows become fragmented.",
      "Strategy comparisons lack consistency.",
      "Internal research tooling needs engineering time.",
      "Results must be reproducible and validated.",
    ],
  },
] as const;
const privateStatus = "Private workspace · not publicly available";
export const workflow = [
  {
    number: "01",
    title: "Trading idea",
    body: "Start from a question you can test: a rule, a market and a time window.",
    status: "Defined by the researcher",
    idea: {
      flow: "Idea → Hypothesis",
      question: "What exactly are you testing?",
      body: "A clear hypothesis makes the result measurable and the next test comparable.",
    },
  },
  {
    number: "02",
    title: "Strategy configuration",
    body: "Pick a strategy, parameters, symbol, interval and historical window.",
    status: privateStatus,
    shot: "strategy-research",
  },
  {
    number: "03",
    title: "Backtest execution",
    body: "Run a historical crypto simulation with explicit fees, funding and slippage assumptions.",
    status: privateStatus,
    shot: "backtest-execution",
  },
  {
    number: "04",
    title: "Performance & risk analysis",
    body: "Inspect returns after costs, drawdown, the equity curve and individual trades.",
    status: privateStatus,
    shot: "backtest-results",
  },
  {
    number: "05",
    title: "Research validation",
    body: "Review automated quality checks, compare runs and re-test on a recent period.",
    status: "Private workspace · broader validation planned",
    shot: "risk-analysis",
  },
  {
    number: "06",
    title: "AI-assisted interpretation",
    body: "Planned: Claude reads structured results and explains risks, limits and testable hypotheses.",
    status: "Planned Claude integration",
    idea: {
      flow: "Report → Interpretation",
      question: "What does the evidence actually say?",
      body: "A suggested test remains a hypothesis until the engine validates it. AI has no authority to trade.",
    },
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
    "Historical crypto backtesting exists in the private workspace. Other market views provide informational context only.",
  ],
  [
    "Can teams use AI Backtest Lab?",
    "Not yet as a team product. Collaboration features, enterprise deployment and paid services do not exist today. Contact the founder to discuss your research needs.",
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
