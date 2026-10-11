---
status: draft
last_verified: 2026-10-11
code: src/app/privacy/page.tsx, src/content/founder.json, scripts/cloudflare-audit.mjs
---

# Vận hành dữ liệu cá nhân (thủ công) — bản nháp, chưa áp dụng

Founder chưa thông qua quy trình này (2026-10-11). Khi thông qua: điền `contactEmailRetention`, rồi thêm lại câu về quyền xem/xóa thư trên Privacy.

Phạm vi: aibacktestlab.com và demo.aibacktestlab.com, static trên Cloudflare; không form, tài khoản, cookie, storage hay analytics trong code (kiểm bundle 2026-10-11). Dữ liệu cá nhân chỉ đến từ hai nguồn:

1. **Cloudflare khi phục vụ request**: IP, user agent, URL, thời điểm, báo lỗi mạng NEL (header `report-to`/`nel` có trên cả hai site). Operator không xuất log (kiểm lại bằng `make cloudflare-audit`).
2. **Email** tới founder@ / support@: Cloudflare Email Routing chuyển tiếp tới hộp thư của founder.

Quy trình email:

- Chỉ dùng thư để trả lời và theo dõi; không thêm vào danh sách gửi thư.
- Rà soát hộp thư theo chu kỳ bằng thời hạn `contactEmailRetention` founder chốt; xóa thư quá hạn.
- Yêu cầu xem/xóa: trả lời trong 30 ngày, xóa ở hộp thư đích (và mọi bản sao), xác nhận lại bằng email. Không hứa xóa tự động.
- Nếu bật thêm dịch vụ Cloudflare (Web Analytics, Bot Fight Mode, Logpush) hoặc tích hợp Claude: cập nhật Privacy **trước**, chạy lại `make cloudflare-audit` và `make release-check`.
