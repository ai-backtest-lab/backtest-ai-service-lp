---
status: accepted
last_verified: 2026-10-11
code: src/lib/landingContent.ts, src/components/landing/LandingPage.tsx, src/components/landing/WorkflowStory.tsx, src/app/globals.css, src/lib/seo.ts, scripts/check-seo.mjs
---

# Positioning: Quantitative Research for Individuals & Teams (Phase 1)

Operator duyệt ngày 2026-10-11. Phase 1 của lộ trình: positioning → media thật → `/product`, pháp lý, GitHub → founder review và deploy. Phase này chỉ sửa landing; không đụng backend, demo hay repo khác.

## Quy tắc đã chốt

- Headline "Quantitative Research for Individuals & Teams"; backtesting và nghiên cứu dựa trên bằng chứng luôn đứng trước; Claude luôn gắn nhãn Planned.
- Section `#audience` ngay sau hero, hai card cân nhau. Teams là nhu cầu và kênh liên hệ (`mailto:founder@`), không phải tính năng: cấm claim collaboration, enterprise deployment, SLA, dịch vụ trả phí, pricing, gói hay AI credits.
- Workflow sáu bước: Trading idea → Strategy configuration → Backtest execution → Performance & risk analysis → Research validation → AI-assisted interpretation (Planned). Mỗi nhãn trạng thái phải khớp chức năng có thật trong backtest-service.
- Không nhắc thị trường VN; "Vietnam" chỉ là nơi founder làm việc.
- Founder: Nguyen Thanh Dat, Founder & Software Engineer, khoảng bốn năm kinh nghiệm; GitHub cá nhân và GitHub org ở About; org ở footer. Không đăng ngày bắt đầu nghiên cứu; không nói là công ty đã đăng ký.
- Khối Availability nằm trong `#contact`: "Built for Research. Preparing for Early Access.", nói rõ engine private, demo synthetic, Claude planned, early access chưa có.
- Hero giữ hình minh họa có nhãn cho tới khi media thật được duyệt (Phase 2).

## SEO

Title/description trang chủ đổi theo positioning. `Organization.sameAs` = GitHub org (org trỏ ngược về site, kiểm 2026-10-11); `founder` là Person với `sameAs` GitHub cá nhân. About và footer có link GitHub cá nhân, org và repo demo public. Giữ canonical, OG image, sitemap, robots, indexability. `check-seo.mjs` kiểm danh sách section id bắt buộc thay vì đếm số section.
