---
status: current
last_verified: 2026-10-11
code: src/content/founder.json, src/content/media.json, src/lib/founder.ts, scripts/release-problems.mjs
---

# Quyết định founder trước khi phát hành

`pnpm release:check` liệt kê đúng các mục còn mở. Điền vào `src/content/founder.json` hoặc `src/content/media.json`, build lại, chạy lại gate.

| Khóa | Dùng ở | Ví dụ giá trị | Ghi chú |
|---|---|---|---|
| `governingLaw` | Terms | `"Vietnam"` | Cùng với `disputeVenue`; thiếu một trong hai thì Terms bỏ cả mục |
| `disputeVenue` | Terms | `"the competent courts of Ho Chi Minh City"` | Nên hỏi luật sư |
| `contactEmailRetention` | Privacy | `"12 months"` | Quy trình thủ công ở `docs/privacy-operations.md`; không hứa xóa tự động |
| `minimumAge` | Privacy | `"18"` | Đề xuất 18 |
| `legalTextApproved` | Gate | `true` | Founder đã đọc Privacy, Terms, Disclaimer bản production |
| `rightsConfirmed` (media.json) | Gate | `true` | Founder đã xem 4 ảnh và video, đồng ý công bố |
| `docs/cloudflare-audit.json` | Gate, Privacy | — | `CLOUDFLARE_API_TOKEN=... make cloudflare-audit`; nếu audit thấy Web Analytics, Bot Fight Mode (cookie), Logpush hay Email Routing khác Privacy thì sửa Privacy trước |

Đã chốt (2026-10-11): chủ thể là Nguyen Thanh Dat, cá nhân tại Việt Nam, không phải công ty đã đăng ký; không đăng ngày bắt đầu nghiên cứu. Các trang pháp lý nên được luật sư rà soát; tài liệu này không phải tư vấn pháp lý.

Việc ngoài repo do founder tự làm: tên hiển thị/bio/website trên GitHub cá nhân, README profile org và cá nhân (nháp ở `docs/drafts/`), LICENSE cho repo demo nếu muốn cho phép dùng lại.
