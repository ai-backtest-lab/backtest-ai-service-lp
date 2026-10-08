---
status: DRAFT
last_verified: 2026-10-08
code: src/lib/landingContent.ts, src/components/landing/LandingPage.tsx, docs/claims.md
---

# AI BACKTEST LAB — BRAND, SEO, LANDING PAGE & 24-MONTH PRODUCT ROADMAP

**Domain:** `aibacktestlab.com`\
**Version:** 2.0 · 08/10/2026\
**Horizon:** Q4/2026 – Q3/2028\
**Audience:** Founder, designer, frontend/backend engineers, startup application reviewer\
**Status:** Product/marketing plan; **không phải xác nhận rằng các tính năng đã triển khai**.

> **North star:** Build → Backtest → Quantify → Explain with Claude → Form hypothesis → Validate again. AI Backtest Lab không bán lời hứa “AI tìm kèo thắng”; sản phẩm giúp trader có quy trình nghiên cứu khoa học, tái lập được và kiểm soát rủi ro.

## 1. Vì sao cập nhật kế hoạch?

### 1.1 Vấn đề phiên bản cũ
- AI chỉ xuất hiện trong một section “Coming Soon”, chưa nằm trong product workflow; tên **AI Backtest Lab** vì thế thiếu giải thích cụ thể.
- Nội dung SEO/hero nhấn mạnh backtest hơn AI; chưa làm rõ Claude nhận dữ liệu gì, đánh giá như thế nào và trả ra giá trị gì.
- Roadmap mới dừng ở vài tính năng, chưa nối **Backtest Service → AI Analyzer → Demo Trading → Real Trading (có điều kiện)**, hoặc phân biệt sản phẩm dành cho nghiên cứu với bot auto-trading.

### 1.2 Mục tiêu bản mới
1. Landing page thể hiện rõ **AI-assisted quantitative research** ngay từ hero và workflow.
2. Giải thích trung thực **Anthropic Claude API là AI analysis layer dự kiến tích hợp trong backend**, không phải thay thế engine/backtest hoặc tự động ra lệnh.
3. Viết nội dung marketing/SEO bằng tiếng Anh sẵn cho frontend, đi kèm hướng dẫn UI và claim trạng thái.
4. Xây roadmap 24 tháng có milestone, dependency, KPI và các cổng quyết định dừng/tiếp tục.
5. Giúp hoàn thiện hồ sơ **Claude for Startups**, không ngụ ý Claude đã bảo trợ hoặc dự án đã được duyệt.

## 2. Bối cảnh kiến trúc sản phẩm và các giả định

### 2.1 Điều đã biết về hướng dự án
- **Backtest Service:** API + backtesting engine sử dụng chiến lược Python, dữ liệu nến lịch sử, biểu đồ và thống kê; nền tảng cho việc nghiên cứu crypto/forex.
- **Chiến lược:** tập trung khoảng **3 chiến lược có thể giải thích và kiểm chứng**, thay vì quá nhiều chiến lược hoặc dự đoán regime phức tạp; nghiên cứu trên nhiều điều kiện thị trường, đặc biệt kiểm soát tổn thất khi thị trường sideway.
- **Demo Trading Service:** vận hành tách biệt backtest, máy chủ/DB riêng, thực thi thử nghiệm trên môi trường demo của sàn; dữ liệu candle REST/WS phải nhất quán.
- **Real Trading Service:** hướng tương lai, chỉ tiến hành sau các điều kiện đánh giá hiệu quả và rủi ro.
- **Market Indicator Signal Service:** hướng nghiên cứu riêng, dùng các chỉ số định giá/sentiment thị trường như tín hiệu tham khảo trên dashboard, **không tự giao dịch**; ưu tiên dữ liệu miễn phí hợp pháp.
- **Claude AI:** tích hợp qua backend để giải thích báo cáo, nhận dạng rủi ro từ dữ liệu đã tính toán, đặt câu hỏi nghiên cứu và gợi ý thí nghiệm mới. Claude không phải công cụ tính toán các chỉ số tài chính chuẩn.

**Cần xác minh trước public:** danh sách feature nào đã live, chất lượng dữ liệu, số lượng strategy, dashboard, kết quả thử nghiệm. Đừng biến bản kiến trúc mục tiêu thành tuyên bố tính năng hiện có.

### 2.2 Nguyên tắc thiết kế hệ thống
- **Deterministic core:** Python engine tính lệnh, chi phí, equity curve, PnL, drawdown, exposure, metrics; tái lập được theo dataset/strategy version.
- **AI interpretation layer:** Claude nhận **structured backtest report + metadata**, chỉ đưa ra phần giải thích, phát hiện vấn đề có dẫn chiếu và câu hỏi cần kiểm chứng.
- **Research loop:** mọi insight AI có thể dẫn tới một hypothesis và một backtest mới; AI không tự khẳng định chiến lược có lợi nhuận.
- **Service isolation:** Backtest / Demo / Real / Market Indicators tách boundary; AI service là lớp độc lập hoặc module có contract rõ; không cấp quyền đặt lệnh cho AI.
- **Evidence first:** mọi số liệu performance từ engine và dữ liệu nguồn; không xuất bản win rate hay lợi nhuận giả.

## 3. Brand positioning và bộ nội dung SEO đề xuất

### 3.1 Brand identity
| Field | Final proposal |
|---|---|
| Brand | **AI Backtest Lab** |
| Website | `https://aibacktestlab.com` |
| Tagline | **Backtest with Data. Understand with AI.** |
| Category | AI-Assisted Trading Strategy Backtesting & Quantitative Research |
| Value proposition | Test strategies on historical data, quantify performance and risk, and use Claude-powered analysis to guide the next research iteration. |
| Target users | Systematic crypto traders, quant hobbyists, strategy developers, independent researchers |
| Brand tone | Technical, evidence-based, precise, calm, not hype-driven |
| Visual | Dark fintech, high contrast, restrained accent, real chart/table, clear feature-state labels |

**Tại sao đổi tagline:** “Test Smarter. Trade with Confidence.” có thể gợi ý mức tự tin quá cao với kết quả trading; câu mới mô tả chính xác hai lớp engine và Claude.

### 3.2 Metadata / SEO
**Title (homepage):** `AI Backtest Lab | AI Trading Backtesting & Strategy Analysis`\
**Description:** `Backtest crypto trading strategies, measure performance and risk, and explore research insights with Claude-powered AI analysis. Built for data-driven traders.`\
**H1:** `Backtest with Data. Understand Your Strategy with AI.`\
**Hero subheading — before Claude feature is live:** `Research trading strategies with historical market data and quantitative performance metrics. We're building Claude-powered analysis to turn backtest results into clear risk insights and next-step research ideas.`\
**Hero subheading — only after Claude feature is demonstrably live:** `Build and test trading strategies with historical market data, then use Claude-powered analysis to understand performance, uncover risks, and guide your next experiment.`

**SEO keyword clusters:**
- Primary: `AI backtesting`, `crypto trading backtesting`, `trading strategy backtesting`.
- Secondary: `quantitative trading research`, `strategy performance analysis`, `backtest risk analysis`.
- Supporting content (when available): `how to interpret drawdown`, `Sharpe ratio backtesting`, `walk-forward validation`, `overfitting in trading strategies`.

**Technical SEO:** canonical, metadata, Open Graph 1200×630, `robots.txt`, `sitemap.xml`, accessible headings, fast LCP, responsive content, `Organization`/`SoftwareApplication` JSON-LD chỉ khi thuộc tính đó thực tế có căn cứ; tránh nhồi keywords và tránh giả mạo review/rating.

## 4. Landing page specification — 10 sections, thứ tự hiển thị

> **Quy tắc trạng thái:** [LIVE] chức năng có thể demo ngay; [BETA] đã chạy với phạm vi giới hạn; [PLANNED] chưa có, đang trên roadmap. Label áp dụng cho cả visual, title, screenshot và CTA.

### S01. HERO — product promise + AI workflow
**Goal:** Trong 5–8 giây khách truy cập hiểu đây là backtesting platform có lớp AI research analysis.

**Eyebrow:** `QUANTITATIVE BACKTESTING × CLAUDE-POWERED RESEARCH` *(nếu chưa chạy Claude hãy thêm `PLANNED INTEGRATION`)*\
**H1:** `Backtest with Data. Understand Your Strategy with AI.`\
**Body (pre-integration):** `Run repeatable backtests, measure what matters, and explore an upcoming Claude-powered analysis workflow that will help explain risk, weaknesses, and opportunities for further testing.`\
**Primary CTA:** `Explore the Platform` (đến screenshot/demo thật)\
**Secondary CTA:** `See Our AI Roadmap` (anchor roadmap)\
**Visual:** dashboard thật bên trái/phải với chart + trade metrics; card AI Insights có nhãn *Concept Preview / Planned* nếu chỉ là mock.\
**Avoid:** “AI chooses winning trades”, “Guaranteed returns”, logo Claude như chứng nhận quan hệ đối tác.

### S02. THE PROBLEM — why evidence and interpretation matter
**Headline:** `A Backtest Can Show the Numbers. Understanding Them Is Harder.`\
**Copy:** `Raw returns alone don't reveal overfitting, drawdown behavior, market-condition sensitivity, or the assumptions behind a strategy. Manual interpretation slows research and leaves critical questions unanswered.`\
**Content:** 3 pain cards: `Too Many Metrics`, `Hidden Risks`, `Slow Research Iterations`; ví dụ là *gợi ý vấn đề phổ biến*, không thống kê giả.

### S03. HOW IT WORKS — AI inside the actual research process
**Headline:** `From Strategy Idea to AI-Assisted Research — in Six Steps`\
**Subheading:** `Every decision begins with reproducible backtesting; Claude helps translate evidence into the next research question.`

| Step | On-page label | Content | Responsible service | Status |
|---|---|---|---|---|
| 01 | Define Strategy | Pick strategy, parameters, symbol, timeframe, date range | Backtest API / Strategy runner | Verify |
| 02 | Run Backtest | Execute on historical candles, fees/slippage assumptions | Backtest engine | Verify |
| 03 | Measure Results | Calculate returns, drawdown, trade distribution, Sharpe, robustness indicators | Quant analytics | Verify |
| 04 | Analyze with Claude | Send validated summary to Claude API; explain trade-offs, risk and blind spots | AI Analysis Service | Planned until implemented |
| 05 | Form New Hypotheses | Output testable suggestions (change window, fees, parameters, market slices) | AI + user review | Planned |
| 06 | Validate Again | Re-run backtests and compare with previous run; use out-of-sample checks | Backtest engine | Planned workflow |

**Visual:** horizontal 6-step flow desktop / vertical mobile; arrow connectors; Step 04–05 accented with `Claude AI (planned)` badge; do not pretend the entire sequence is live.

### S04. PLATFORM CAPABILITIES — quantitative foundation
**Headline:** `Built on Quantitative Evidence, Not AI Guesswork.`

**Feature cards** (mark by actual state): `Historical Backtesting Engine`, `Strategy Parameters & Versioning`, `Risk and Performance Metrics`, `Equity Curve & Trade Explorer`, `Run Comparison`, `Transparent Assumptions`.\
**Each card:** one sentence value, one grounded screenshot/UI state, a link to view workflow if available.\
**Important:** avoid claiming advanced metrics, forex, multi-exchange or comparing runs already exists unless code confirms.

### S05. CLAUDE AI ANALYSIS — core differentiation
**Headline:** `Claude Helps Explain What Your Backtest Is Telling You.`\
**Body — if PLANNED:** `We're integrating Anthropic's Claude API into our analysis service to turn verified backtest results into plain-language performance reviews, risk explanations, and testable research hypotheses.`\
**Body — if LIVE:** `Our analysis service uses Anthropic's Claude API to interpret verified backtest metrics, surface potential weaknesses, and suggest follow-up experiments. All findings remain research assistance, not trade recommendations.`

**Four cards:**
1. **Performance Explanation:** “What drove the result? How concentrated were returns?”
2. **Risk & Weakness Review:** “Where did drawdowns occur? What assumptions deserve scrutiny?”
3. **AI Research Q&A:** “Ask questions grounded in a specific backtest run.”
4. **Next Experiment Suggestions:** “Generate hypotheses for out-of-sample or sensitivity tests.”

**Proof panel:** Example input metrics → analysis with grounded field references → source run ID; clearly `illustrative example` if synthetic.\
**Architectural note:** `Claude interprets backtest reports. Our engine remains responsible for computation and execution.`\
**CTA:** `View AI Research Roadmap` / `Try AI Analysis` (chỉ khi feature live).

### S06. VALIDATION & TRUST — no black-box profit promises
**Headline:** `Research You Can Verify.`\
**Content:** `Reproducible runs`, `Explicit trading costs`, `Out-of-sample testing`, `Transparent AI limitations`.\
**Microcopy:** `Backtesting is hypothetical. Past performance does not guarantee future results. AI-generated explanations may be incomplete and must be independently validated.`\
**UI:** data lineage miniature: Dataset version → Strategy version → Engine result → AI report → Experiment record.

### S07. SYSTEM ARCHITECTURE / PRODUCTS — show a credible product vision
**Headline:** `One Research Platform. Independent Services.`

**Four modules:**
- **Backtest Service — foundation:** repeatable simulations, historical data, performance report.
- **Claude AI Research Service — planned:** evaluate reports, compare risk, answer run-specific questions, suggest validation.
- **Demo Trading Service — future:** forward-test strategy behavior with live/sandbox market flows and isolated infrastructure.
- **Market Indicator Insights — future:** display free-source market context indicators; informational dashboard alerts only.

**Optional future box:** Real Trading is a *conditional*, risk-gated research-to-deployment phase, not a current capability.

### S08. PRODUCT ROADMAP — 24 months
**Headline:** `Our Roadmap: From Reliable Backtesting to AI-Assisted Research.`\
**Visible version:** 4 timeline cards (Q4/2026–Q1/2027, Q2–Q3/2027, Q4/2027–Q1/2028, Q2–Q3/2028) with 2–4 items each and status `Planned / In progress / Released`.\
**Full plan:** See section 6 below.\
**Note:** roadmap reflects goals and may change with evidence.

### S09. ABOUT / BUILDING IN PUBLIC
**Headline:** `Built for Traders Who Prefer Evidence to Hype.`\
**Copy:** `AI Backtest Lab is an independently developed quantitative research project. We focus on repeatable strategy evaluation and practical AI-assisted explanations, not automated profit promises.`\
**Content:** founder/project description, GitHub/demo only if safe/public, contact `founder@aibacktestlab.com` once configured; no fabricated team, investment or customer counts.

### S10. CTA + FAQ + FOOTER
**Headline:** `Research Better. Understand More. Test Again.`\
**CTA:** `Explore Platform` or `Join the Waitlist` depending on access.\
**FAQ:** `Does AI execute trades?` → No; `Is Claude already integrated?` → answer current truth; `Which markets?` → only supported ones; `Is this financial advice?` → No.\
**Footer:** domain email; Terms/Privacy when collecting user data; risk disclosure; versioned product status.

## 5. Claude AI integration — technical product plan

### 5.1 Proposed service flow

```text
User / Dashboard
  └─> Backtest API -> Python Engine -> Metrics / Trades / Equity / Run Metadata
                                       |
                                       v
                               Report Validator
                                       |
                                       v
                            AI Analysis API (server)
                                       |
                                       v
                             Anthropic Claude API
                                       |
                                       v
                          Schema/Claim Verification
                                       |
                                       v
                   Stored AI Report + Run ID + Model/Prompt Version
                                       |
                                       v
                      Dashboard: Explain / Risks / Next Tests
                                       |
                                       v
                      User chooses experiment → New Backtest
```

**Do not:** expose `ANTHROPIC_API_KEY` in Next.js client, send credentials/exchange keys, execute trades based on LLM text, or present LLM-generated numbers as engine measurements.

### 5.2 Minimum viable Claude feature (P0 AI POC)
- **Input:** backtest run ID, market/timeframe, sample dates, strategy/config version, metrics computed by engine, fee/slippage assumptions, aggregate trade distributions, known limitations.
- **Output (structured JSON):** `summary`, `strengths[]`, `risks[]`, `metric_evidence[]`, `hypotheses[]`, `recommended_tests[]`, `limitations[]`, `model_version`, `generated_at`.
- **Validation:** JSON schema, references only provided metrics, no invented PnL, no guaranteed return claims; flag ambiguity and insufficient sample size.
- **Prompt contract:** the AI must separate observation / inference / test hypothesis; it cannot claim causal identification without analysis.
- **Persistence:** report ties to immutable dataset, strategy config, engine version, analysis prompt/version; cache repeated requests.
- **Budget:** per-run model cost, limits/rate limiting, timeout/retry and manual regenerate controls.

### 5.3 AI quality gates
| Gate | Acceptance criterion |
|---|---|
| Grounding | Every numeric claim traceable to provided structured metrics |
| Safety | No actionable guaranteed-return claims or autonomous order placement |
| Utility | At least 3 useful, testable hypotheses in representative reports when data supports them |
| Reproducibility | Save run ID, input hash, model ID and prompt version |
| Consistency | Evaluation set spanning uptrend/downtrend/sideways and good/bad runs |
| Human review | User approves suggested experiments; AI cannot directly alter live trading |

### 5.4 Why Claude (for website/application)
Claude is intended to be a **reasoning and natural-language interpretation layer** for quantitative outputs: structured report explanations, research questions, and readable risk summaries. The backtest engine provides auditable numbers; Claude provides explanations to support human judgment. **Claude API usage must be described as planned until it is actually implemented and tested.**

## 6. Product roadmap — 24 months, Oct 2026 to Sep 2028

> **Roadmap philosophy:** Ship a narrow, reliable quant research workflow before expanding asset coverage or automating execution. Deliver 3 thoroughly tested strategies rather than many unverified ones. Explicit go/no-go gates prevent endless scope creep.

### Phase 1 — Q4/2026 to Q1/2027 (Months 1–6): Research foundation + Claude AI POC
**Goal:** một end-to-end run đáng tin cậy, có báo cáo định lượng và phân tích Claude POC.

**Deliverables**
- Audit/backtest service: reproducibility, dataset boundaries, look-ahead bias, survivorship/data leakage where applicable, fee/slippage model, logging and result versioning.
- Normalize result contract (metrics, trades, equity, config, market/timeframe, provenance).
- Select **3 initial strategies** for deep research (candidate examples, not promises: MA trend-following, breakout/momentum, mean-reversion); document expected failure regimes and basic controls.
- Dashboard report with equity chart, risk metrics, trades, filters, side-by-side comparison where feasible.
- AI Backtest Report Analyzer POC with Claude API server-side, structured output, traceable metric references.
- Public landing page on `aibacktestlab.com`, domain email, startup application submission.

**Exit gates**
- Same inputs/version produce the same metrics; known dataset/cost assumptions documented.
- Every numerical AI statement verifiable; reference evaluation set reviewed.
- One user can complete Strategy → Backtest → Report → Claude explanation → New hypothesis without manual database work.

### Phase 2 — Q2 to Q3/2027 (Months 7–12): Robust research + demo forward-testing
**Goal:** kiểm tra chiến lược ngoài backtest tĩnh; phát hiện khoảng cách between backtest and forward behavior.

**Deliverables**
- Parameter sensitivity, walk-forward/out-of-sample evaluation, train/test isolation (not ML training), Monte Carlo/bootstrap where methodologically justified.
- Strategy experiment registry: strategy/dataset/config versions; scenario/baseline comparisons; result notebooks/notes.
- **Demo Trading Service** isolated server/DB, exchange sandbox integration, WS candles + REST reconciliation, signal-to-order audit trail, paper PnL and incident monitoring.
- Claude AI v1: question answering limited to run and experiment evidence, compare backtest vs demo results, produce structured research notes.
- Market Indicator Insights v0: begin with a few genuinely free, reliable sources; display informational dashboard signals only.

**Exit gates**
- Multiple weeks of demo execution without unexplained data drift; differences documented.
- Out-of-sample comparisons exist for each selected strategy.
- Decision record to retain/drop/refine each of 3 strategies using predefined metrics.

### Phase 3 — Q4/2027 to Q1/2028 (Months 13–18): AI Research Workspace + trustworthy signal context
**Goal:** giảm thời gian nghiên cứu mà không tăng mức độ black-box.

**Deliverables**
- Claude Research Assistant: asks about a run, compares experiments, summarizes evidence, proposes next tests **requiring user approval**.
- Batch experiment job orchestration with concurrency quotas and cost dashboards.
- Strategy behavior cards: where strategy succeeds/fails, per-market/timeframe behavior, distribution and stability.
- Indicator Insight Service v1: provenance, source freshness, failure handling; contextual signals separate from strategy rules.
- Accounts, saved workspaces, shareable read-only research reports if preparing for early external beta.
- Production observability, privacy/data retention, permissions and security review.

**Exit gates**
- Measured decrease in manual report-review time (target established from real baseline, not invented marketing number).
- Claude report evaluation remains stable across releases; auditability preserved.
- Early users can self-serve core workflow with documented limitations.

### Phase 4 — Q2 to Q3/2028 (Months 19–24): Validated beta, controlled deployment, product-market learning
**Goal:** kiểm chứng sản phẩm với người dùng thật; chỉ mở rộng live trading nếu đáp ứng risk gates.

**Deliverables**
- Invite-only beta of research/backtest/AI features; feedback, onboarding, pricing discovery, support and usage analytics.
- Robust permissions, billing experimentation **only if demand exists**, backtest/AI API limits, observability and incident response.
- Portfolio-level analytics and cross-strategy correlation **if product evidence supports need**.
- **Conditional Real Trading Pilot (not automatic milestone):** only with demonstrated demo stability, loss limits, emergency stop, API-key isolation, small exposure, audit logs, exchange/API/legal checks and manual authorization.
- Claude-powered reporting for periodic strategy review; never AI autonomous trade execution.

**Exit gates**
- Evidence of repeat users and valued workflows, sustainable AI compute costs.
- Production security/recovery checks pass; no active real trading without written go/no-go review.
- Decide next 12-month focus: SaaS research product, private quant research infrastructure, or advanced trading operations.

### 6.5 Dependency map and priorities
| Priority | Capability | Depends on | Why |
|---|---|---|---|
| P0 | Reliable backtest metrics/data provenance | Candle/strategy engine | Source of truth |
| P0 | Claude Report Analyzer | Normalized metrics + secure API | Fastest credible AI value |
| P0 | Public landing, brand, startup application | Accurate capability list + domain/email | Public proof / application |
| P1 | Out-of-sample/sensitivity evaluation | Reproducible runs | Limit overfitting |
| P1 | Demo trading | Stable strategies + exchange integration | Forward testing |
| P1 | AI Research Assistant | Report analyzer + experiment registry | Context-aware reasoning |
| P2 | Free market indicator dashboard | Source reliability | Informational context |
| P2 | External beta / billing | Stable self-serve UX + feedback | Product discovery |
| Conditional | Real trading | Forward test + operational risk controls | Highest financial/operational risk |

### 6.6 What NOT to build yet
- Do not build “AI predicts tomorrow's BTC price” or auto-generate a winning strategy claim.
- Do not train ML models or build a regime classifier just for marketing.
- Do not combine backtest/demo/real services in one failure domain.
- Do not expand to many exchanges and dozens of strategies before assessing the first three.
- Do not show unsupported PnL, fabricated user testimonials, ROI or comparison stats.

## 7. Suggested UI content for 24-month roadmap on landing

| Date label | Public milestone | Short English copy |
|---|---|---|
| Late 2026 – Early 2027 | **Backtesting Core & Claude Analysis POC** | `Reliable strategy backtests, auditable metrics, and our first Claude-powered research reports.` |
| Mid 2027 | **Validation & Demo Trading** | `Out-of-sample testing, experiment comparisons, and isolated demo execution.` |
| Late 2027 – Early 2028 | **AI Research Workspace** | `Ask Claude about strategy behavior, compare results, and turn findings into research experiments.` |
| Mid 2028 | **Research Platform Beta** | `Shareable reports, research workflows, and carefully evaluated access for early users.` |

**Product status labels** must be maintained from actual releases. A roadmap milestone should not be shown as `Released` until completed.

## 8. Claude for Startups application — recommended English copy

**What are you building?**

> AI Backtest Lab is an AI-assisted quantitative research platform for crypto trading strategies. Our backtesting service helps users simulate strategies on historical market data and evaluate performance, risk, and execution assumptions. We are building a research workflow that connects repeatable quantitative results with clear, evidence-based explanations.

**How will you use Claude?**

> We plan to integrate Anthropic's Claude API into our backend analysis service. Claude will interpret structured backtest reports, explain performance and drawdown behavior, identify potential weaknesses, and suggest testable follow-up experiments. Our quantitative engine remains the source of truth for calculations; Claude is the reasoning and reporting layer. Over time, we aim to support experiment comparisons and a research assistant grounded in a user's backtesting history.

**Why this program?**

> Access to Claude API credits and startup resources would help us prototype, evaluate, and improve grounded AI research reports across different strategies and market conditions. Our focus is on making quantitative strategy analysis more understandable and rigorous, without promising returns or automating trading decisions through the model.

**Important:** Edit from `plan` to `currently use` only when integration has been implemented. Anthropic's [Claude for Startups](https://claude.com/programs/startups) application asks for a company email, website, Claude Console account and short description. **Application and extras/credits eligibility can differ**; refer to FAQ as displayed at submission time. The public site has shown differing program FAQ versions; do not assume a particular benefit or funding threshold without confirmation.

## 9. Deploy / SEO / application checklist

### Brand and infrastructure
- [ ] Domain `aibacktestlab.com` registered and active; configure DNS/HTTPS.
- [ ] Website online (Cloudflare Pages or permitted hosting plan); link to accessible product demo/screenshots.
- [ ] `founder@aibacktestlab.com` receives mail; test reply path if using forwarding.
- [ ] Claude Console account created; API key in server-only secrets manager.

### Content and SEO
- [ ] H1/title/description consistent with brand; OG preview and favicon.
- [ ] Sections S01–S10 written and responsive; one clear CTA.
- [ ] Every screenshot labeled demo/live/concept as appropriate.
- [ ] All Claude claims show **planned/beta/live** honestly.
- [ ] Real risks disclosed; no guaranteed profit or fake testimonial.
- [ ] Sitemap/robots/canonical/structured data verified.

### AI integration and product proof
- [ ] Confirm normalized backtest report available to AI service.
- [ ] Build POC, evaluate numeric claim grounding, capture reproducibility metadata.
- [ ] Provide one real demonstration walkthrough; show limitations.
- [ ] Do not expose API keys, private order/exchange credentials or user-sensitive data.

### Claude application
- [ ] Company name, email and domain match.
- [ ] Startup stage, dates, funding and current technology stated truthfully.
- [ ] Description emphasizes product proof + Claude use case + technical boundaries.
- [ ] Benefits/credits not treated as guaranteed before approval.

## 10. Definition of Done and ownership

| Workstream | Suggested owner | Definition of Done |
|---|---|---|
| Product inventory | Founder / backend | Feature-status table verified against code/demo |
| Brand + copy | Founder + designer | English copy reviewed for clarity and non-misleading claims |
| Landing page | Frontend | 10 sections, accessible mobile, performance and SEO baseline |
| Claude POC | Backend / AI integration | Structured reports, evaluation tests and safe service boundary |
| Backtest quality | Quant / backend | Reproducible metrics, costs, datasets and version metadata |
| Startup application | Founder | Working domain/email/Console + coherent application |
| Roadmap governance | Founder | Quarterly milestone review and updated public status |

## 11. Official references
- Anthropic Claude for Startups: https://claude.com/programs/startups
- Claude Developer Platform: https://platform.claude.com/
- Anthropic API docs: https://docs.anthropic.com/
- Claude API Messages: https://docs.anthropic.com/en/api/messages
- Cloudflare Registrar: https://www.cloudflare.com/products/registrar/
- Cloudflare Pages: https://pages.cloudflare.com/
- Cloudflare Email Routing: https://developers.cloudflare.com/email-routing/
- Google Search Central SEO starter guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

---

**Final positioning sentence:** **“AI Backtest Lab combines reproducible quantitative backtesting with Claude-powered research explanations to help traders understand strategy performance, evaluate risk, and decide what to test next.”**\
*Use “combines” only after Claude actually works; until then use “is building a platform that will combine”.*

## Bổ sung hiện hành — vòng content cuối trước release (2026-10-08)

Bổ sung này cập nhật copy/status được dùng trên landing; giữ nguyên mục tiêu và bốn mốc Q4 2026–Q3 2028 của roadmap 24 tháng. Các ví dụ CTA/status trước đó là định hướng ban đầu, không phải chứng nhận capability public.

- Hero: private quantitative research platform cho historical crypto backtesting; vấn đề là hiểu performance/risk và chọn câu hỏi nghiên cứu tiếp theo. Primary CTA hiện hành: `Explore the research workflow`, đến `#product`, không mở product. Public early access Planned.
- Product: engine, parameters/source snapshots và trade inspection tồn tại private; nhãn `Private workspace · not publicly available`. Vietnam là internal preview; source-backed backtesting/execution unavailable.
- Claude: Planned, POC chưa được trình bày như đã có. Input dự kiến gồm metrics, trade summaries, parameters, coverage và cost assumptions; output là giải thích drawdown/risk, limitations và hypotheses. Engine sở hữu calculations và quantitative validation; Claude không đặt lệnh hoặc hứa dự đoán returns.
- Roadmap phase 1: `Private backtest core exists · Claude POC planned`; phase 2 thêm out-of-sample và sandbox forward-validation Planned; phase 3 research Q&A/experiment comparisons Planned; phase 4 beta/early access Planned. Mốc là mục tiêu, có thể đổi theo bằng chứng.
- About: independent research startup phục vụ independent researchers, crypto strategy developers và systematic traders; differentiation là inspectable evidence cùng planned interpretation, không phải lợi nhuận tự động.
- Metadata: `AI Backtest Lab | Quantitative Backtesting & AI Research Roadmap`; description `Private quantitative research for historical crypto backtesting. Claude-powered analysis is planned.` áp dụng HTML, Open Graph và Twitter.
- Contact: founder@aibacktestlab.com và support@aibacktestlab.com. Operator xác nhận gửi/nhận và trả lời ngày 2026-10-08; UI, mailto và JSON-LD dùng cùng địa chỉ.
- Giữ layout/dark theme/animations; typography uppercase là thay đổi thiết kế riêng, không trộn vào vòng claim review này.

Căn cứ code/status nằm trong [claim ledger](claims.md). Chỉ push branch review; chưa merge main, deploy hoặc submit hồ sơ. Website rõ ràng và trung thực hỗ trợ việc đánh giá, không đảm bảo hồ sơ được chấp nhận.
