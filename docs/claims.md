---
status: current
last_verified: 2026-10-12
code: src/components/landing/LandingPage.tsx, src/components/landing/WorkflowStory.tsx, src/lib/landingContent.ts
---

# Claim ledger

| Claim | Căn cứ / trạng thái | Giới hạn public copy |
|---|---|---|
| AI Backtest Lab, aibacktestlab.com | Operator chỉ định trong brand document | Domain/emails do operator cung cấp; operator xác nhận gửi/nhận và trả lời hai mailbox ngày 2026-10-08 |
| Historical crypto backtesting | Private product của backtest-service đã có strategy/run APIs; read-only selected run1045 của cycle_long đã kiểm trong đợt inventory | Không đưa private results vào artifact, không tuyên bố public SaaS ready |
| Parameters/version/trade inspection | Private workspace đã có UI/code, source snapshots và per-run results | Label Private workspace, không mở operator dashboard qua website |
| VN equities | Registry/chart workspace đã có; source-backed production execution chưa admitted | Operator 2026-10-11: không nhắc thị trường VN trên landing. "Vietnam" chỉ là nơi founder làm việc |
| Demo/Market context | Private infrastructure/source-specific context đã tồn tại | Public roadmap là mở rộng validation/access; không gọi là public capability |
| Claude analysis | Chưa có API integration/POC trong source landing | Planned trên hero, workflow, report, roadmap và FAQ |
| Product media (hero, workflow steps, `/product`, video) | Chụp 2026-10-11 (ảnh `backtest-execution`: 2026-10-12) từ Research Lab thật (backtest-service `36268082`, có thay đổi chưa commit ở frontend) trên thị trường synthetic, database `research__media`; ledger `research` giữ 48 run trước/sau | Nhãn "Real Backtesting Engine · Synthetic Market Data" trên mọi ảnh/video; số liệu là output trên dữ liệu synthetic, không phải hiệu suất giao dịch; step 02–05 dùng ảnh thật, step 01 và 06 là card chữ (06 là Planned, không có ảnh giả) |
| Pháp lý | Privacy/Terms/Disclaimer viết theo hành vi đã kiểm (bundle không cookie/storage/tracker; Cloudflare NEL; Email Routing qua MX) | Quyết định founder trống thì bản production bỏ câu; `release:check` fail tới khi founder điền và duyệt |
| AI report | Concept copy để giải thích input→interpretation→test | Không live API response, không số liệu bịa |
| Roadmap 2026–2028 | Mục tiêu operator, chưa phải delivered releases | Private backtest core exists / Claude POC planned; các phase sau Planned, Real không được mở lại |
| Founder | Operator 2026-10-11: Nguyen Thanh Dat, Founder & Software Engineer, khoảng bốn năm kinh nghiệm web, backend, kiến trúc kỹ thuật; GitHub cá nhân `DyanNguyen22` (tồn tại từ 2022-08-26) | Ghi "independently developed and bootstrapped in Vietnam", "not an incorporated company". Không đăng ngày bắt đầu nghiên cứu, không thành tích, nhà đầu tư, khách hàng hay pháp nhân |
| GitHub | Org `ai-backtest-lab` tạo 2026-10-08; kiểm 2026-10-11: org có website `https://aibacktestlab.com`, repo `backtest-dashboard-demo` public | Link GitHub cá nhân, org, demo source ở About và footer. JSON-LD: `Organization.sameAs` = org, `founder.sameAs` = GitHub cá nhân |
| Individuals & Teams | Positioning của operator 2026-10-11; engine hiện là một private workspace, chưa có tính năng team | Teams là nhu cầu và hướng đi, không phải tính năng: không claim collaboration, enterprise deployment, SLA, dịch vụ trả phí hay pricing |
| Research validation | Research Lab có quality check, compare runs, recent-period check (`QualityCheckPanel`, `ResearchCompare`, `RecentCheckButton` trong backtest-service) | Out-of-sample validation rộng hơn vẫn Planned |
| Contact | Operator cung cấp founder@aibacktestlab.com và support@aibacktestlab.com | Operator xác nhận gửi/nhận và trả lời ngày 2026-10-08; agent kiểm mailto/UI/JSON-LD, không tự gửi mail |

Operator quyết định ngày 2026-10-11 dùng ảnh và video thật của sản phẩm (thay quyết định cũ chỉ dùng illustration), với điều kiện chỉ dùng dữ liệu thị trường synthetic vì giấy phép dữ liệu Binance/Coin Metrics/VCI không cho dùng thương mại hoặc chưa rõ. Founder vẫn phải xác nhận (`rightsConfirmed`) trước khi phát hành. Việc website không expose tài khoản không suy ra mọi lời giải thích AI tương lai đã được kiểm.

## Đối chiếu source cho vòng content cuối — 2026-10-08

Inspect read-only trong Backtest Service, không chạy evaluation hoặc sửa service:

- `backend/app/services/job_runner.py:580`: benchmark, equity và metrics dùng fee/slippage/funding từ quantitative engine.
- `backend/app/routers/runs.py`: run detail, orders, rejections, compare và persisted equity curve. Đây là API private, không có trên landing.
- `backend/app/services/evaluation_preflight.py`: data/feed/warm-up/cost admission trước evaluation; không suy ra mọi dataset đạt chuẩn.
- `docs/architecture.md:233`: VN preview adjusted, execution khóa, chỉ có fixture proof; chưa có source-backed study.
- `docs/README.md`: Demo continuity có bằng chứng; Open → Closed chưa được chứng minh. Sandbox infrastructure không chứng minh forward-validation hoàn tất.

Không suy ra public availability, lợi nhuận, khách hàng hoặc Claude integration từ các code path này. Kiểm tra source không thay thế runtime verification mới của service; lần này chỉ kiểm artifact landing.
