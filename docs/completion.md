---
status: current
last_verified: 2026-10-08
code: src/, next.config.ts, Makefile, scripts/site.py, scripts/browser-check.mjs, docs/browser-evidence.json, docs/performance-evidence.json
---

# Bàn giao landing ở repository mới

Đã clone bằng SSH alias github.com.per và khởi tạo Next.js16.4/React19.3/TypeScript/Tailwind/shadcn. Branding theo tài liệu operator: AI Backtest Lab, target domain aibacktestlab.com, mười sections và workflow sáu bước. Không còn kế hoạch chuyển frontend/dashboard của backtest-service sang source này.

## Đã có

- Hero Plasma WebGL từ React Bits, secondary TextType, ScrollReveal statement và MaskedHeading Validation; vendored source/provenance/license được giữ.
- Product workflow và Claude report hiển thị static/linear trên mọi viewport theo yêu cầu mới; không pin, chapter progress, hidden panels hoặc phase dimming.
- Site public-only static export: root/privacy/disclaimer/robots/sitemap/icon/OG, không API, dashboard, live AI, registration hoặc trading controls.
- Không đưa private performance screenshot vào assets. UI/chart/report là illustration có nhãn; private product capability và roadmap khác nhau được ghi rõ.
- Make setup/build/dev/preview/stop/status/check/browser-check; process ownership root/uid/PID-start-time, busy-port refusal, gzip static preview và startup checks.

## Review và kiểm chứng

Các lỗi thực đã sửa: smooth scroll của nút chapter gây hiển thị chapter giữa ở tablet; hidden inline styles của inactive panels còn tồn tại khi tắt pin bằng reduced motion; GPU resources không còn hợp lệ sau context restoration; H1 fade sau hydration đẩy LCP muộn. Regression hiện kiểm tất cả sáu bước luôn readable và không có progress controls. Các lỗi pin trước đây chỉ còn là lịch sử, vì cơ chế đó đã gỡ.

Package: **9 tests/4 files passed**, TypeScript và ESLint qua, không errors/warnings; optimized static build qua. Peer dependency check không còn mismatch. Make stop→preview/dev restart đã kiểm, source/build được giữ.

[Chrome evidence](browser-evidence.json): headed Chrome bằng profile riêng, actual DevTools Console/Network. Desktop1440/1024, tablet768, mobile390/375/320, menu/FAQ/static workflow và normal document scrolling, reduced motion, JavaScript disabled, WebGL unavailable và context loss/restoration đều qua. Không console/page errors, không external/private API requests. `/api/demo`, `/api/vn-backtest`, `/dashboard` và unknown URL trả404.

Harness ghi một lưu ý: auto-opened DevTools reset CDP media emulation lúc inspector khởi tạo. Diagnostic xác minh preference chuyển true→false sau khi inspector mở; scenario áp dụng lại reduced motion sau khi inspector ổn định, kiểm actual matchMedia trước assert. Product theo preference thực và runtime changes, không nhận diện Lighthouse/test để thay behavior.

Bản đo trước thay đổi static sections, giữ làm bằng chứng lịch sử [Lighthouse lab](performance-evidence.json): **Performance97 / Accessibility100**, LCP **2.4s**, CLS **0**, TBT **70ms**, static preview gzip với simulated mobile throttling. Đây là lab evidence, không phải field INP hoặc dữ liệu production traffic. Bản đo trước optimization là Performance76/Accessibility96; sửa delivery/render priorities làm nội dung đọc sớm hơn, không tắt animation riêng cho audit.

Raw screenshots/logs/Chrome profiles nằm trong `tmp/`, không commit toàn profile. `out/` được build lại bằng Make, không commit generated bundle.

## Đang chạy và phần chưa mở

Dev: http://127.0.0.1:3220. Static preview: http://127.0.0.1:3221. `make stop` chỉ dừng processes repo này. App nghiên cứu cũ ở3210 vẫn trả HTTP200 và source được khôi phục; tài liệu brand operator ở repo cũ giữ nguyên. WIP trước khi đổi source nằm ở stash914f748b của repo cũ.

Claude integration vẫn **Planned**, không có API key/actual Claude POC hoặc backend trong site. Public brand/domain/founder/support được hardcode theo operator; production SEO indexable, không còn LANDING_* hoặc .env gate. Founder/support mailto links và actual static HTML đã kiểm; operator đã xác nhận gửi/nhận và trả lời ngày 2026-10-08. Chưa deploy hoặc thay đổi Cloudflare settings, không gửi startup application.

Wrangler4.148.0 deploy dry-run qua, assets-only123files từout/, không bindings. Preview command `pnpm exec wrangler preview` có hỗ trợ(open beta), đã xác minh qua help, không chạy Preview deployment. Settings operator cung cấp không cần sửa; guide [deployment](deployment.md) ghi exact values. Build/lint/typecheck/tests/frozen install đã qua và build không cần environment variables. SEO titles/descriptions/canonical/OG/robots/sitemap/indexing, hero screenshot1200×630 vàfaviconICO/PNG dimensions qua [artifact evidence](seo-evidence.json).

Các blocker đã xử lý: Wrangler esbuild/workerd initialization theo allowlist, dữ liệu breadcrumb thừa, escaped JSON-LD, typecheck kéo scratch files và faviconICO yêu cầu PNG RGBA. Bộ kiểm cuối không còn failures; các lỗi này không bị bỏ qua để push.

Repo/code hoàn tất cho bản landing preview này; không gọi roadmap2026–2028, AI POC hoặc startup acceptance là hoàn tất từ evidence UI.

## Vòng content review cuối (2026-10-08)

Branch `review/claude-startups-copy` giữ main chưa merge. Metadata HTML/OG/Twitter thống nhất title Quantitative Backtesting & AI Research Roadmap, description nói rõ private crypto research/Claude Planned. CTA dẫn đến workflow, không giả vờ mở workspace. Product private/unavailable, VN source-backed unavailable, Demo sandbox runtime và out-of-sample Planned; roadmap giữ đủ 24 tháng với Claude POC Planned. Claude input/output và quantitative validation được giải thích trong HTML static; target researchers/strategy developers/systematic traders nằm trong About. Contact UI/schema giữ đồng bộ theo xác nhận mailbox của operator.

Build cuối và artifact SEO kiểm cả nội dung không JavaScript, canonicals, indexable robots, sitemap, metadata đồng nhất và icons. Chrome headed/actual DevTools kiểm sáu viewport320–1440, menu/FAQ/normal scroll, reduced motion, no-JS và WebGL faults; không console errors hoặc private/external requests. Ảnh OG chụp lại từ public hero sau khi sửa copy, không lấy private results. Chưa deploy/submit; cần operator duyệt branch trước khi merge main và deploy thủ công.

Typography 2026-10-08: operator đã chốt bỏ uppercase. Các labels, steps, lineage và brand display đã chuyển sentence/proper case; giữ acronyms. 9 tests, lint/type-check/build/static SEO và Chrome/DevTools sáu viewport/fallback scenarios qua; ảnh OG chụp lại với copy mới.
