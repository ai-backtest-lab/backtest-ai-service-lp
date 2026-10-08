---
status: current
last_verified: 2026-10-08
code: src/components/landing/LandingPage.tsx, src/components/landing/ResearchPreview.tsx, src/lib/landingContent.ts
---

# Claim ledger

| Claim | Căn cứ / trạng thái | Giới hạn public copy |
|---|---|---|
| AI Backtest Lab, aibacktestlab.com | Operator chỉ định trong brand document | Domain/emails do operator cung cấp; operator xác nhận gửi/nhận và trả lời hai mailbox ngày 2026-10-08 |
| Historical crypto backtesting | Private product của backtest-service đã có strategy/run APIs; read-only selected run1045 của cycle_long đã kiểm trong đợt inventory | Không đưa private results vào artifact, không tuyên bố public SaaS ready |
| Parameters/version/trade inspection | Private workspace đã có UI/code, source snapshots và per-run results | Label Private workspace, không mở operator dashboard qua website |
| VN equities | Registry/chart workspace đã có; source-backed production execution chưa admitted | Internal preview; source-backed backtesting/execution unavailable, không quảng cáo equity backtesting ready |
| Demo/Market context | Private infrastructure/source-specific context đã tồn tại | Public roadmap là mở rộng validation/access; không gọi là public capability |
| Claude analysis | Chưa có API integration/POC trong source landing | Planned trên hero, workflow, report, roadmap và FAQ |
| Hero/product charts | UI illustration do source landing tạo; không lấy private account data | Illustrated preview, không measured PnL hoặc dữ liệu backtest thật |
| AI report | Concept copy để giải thích input→interpretation→test | Không live API response, không số liệu bịa |
| Roadmap 2026–2028 | Mục tiêu operator, chưa phải delivered releases | Private backtest core exists / Claude POC planned; các phase sau Planned, Real không được mở lại |
| Contact | Operator cung cấp founder@aibacktestlab.com và support@aibacktestlab.com | Operator xác nhận gửi/nhận và trả lời ngày 2026-10-08; agent kiểm mailto/UI/JSON-LD, không tự gửi mail |

Automatic review đã từ chối đưa screenshot run thật trực tiếp vào public assets trước content/redaction review. Site mới dùng illustration có nhãn, không upload hoặc publish capture private. Nếu muốn ảnh product thật sau này, phải curate/redact/approve payload trước khi thay visual. Việc website không expose tài khoản không suy ra mọi lời giải thích AI tương lai đã được kiểm.

## Đối chiếu source cho vòng content cuối — 2026-10-08

Inspect read-only trong Backtest Service, không chạy evaluation hoặc sửa service:

- `backend/app/services/job_runner.py:580`: benchmark, equity và metrics dùng fee/slippage/funding từ quantitative engine.
- `backend/app/routers/runs.py`: run detail, orders, rejections, compare và persisted equity curve. Đây là API private, không có trên landing.
- `backend/app/services/evaluation_preflight.py`: data/feed/warm-up/cost admission trước evaluation; không suy ra mọi dataset đạt chuẩn.
- `docs/architecture.md:233`: VN preview adjusted, execution khóa, chỉ có fixture proof; chưa có source-backed study.
- `docs/README.md`: Demo continuity có bằng chứng; Open → Closed chưa được chứng minh. Sandbox infrastructure không chứng minh forward-validation hoàn tất.

Không suy ra public availability, lợi nhuận, khách hàng hoặc Claude integration từ các code path này. Kiểm tra source không thay thế runtime verification mới của service; lần này chỉ kiểm artifact landing.
