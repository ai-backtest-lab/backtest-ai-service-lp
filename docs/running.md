---
status: current
last_verified: 2026-10-11
code: Makefile, scripts/site.py, scripts/assets.mjs, scripts/capture-assets.mjs, scripts/check-seo.mjs, scripts/media/, scripts/release-check.mjs, scripts/release-problems.mjs, scripts/cloudflare-audit.mjs, wrangler.jsonc, src/lib/landingContent.ts, src/content/
---

# Build, preview và deploy

Node22+/pnpm12. `make setup` install frozen lockfile; `make check` test/tsc/lint; `pnpm run build` export static out/, ảnh và gzip sidecars; `pnpm run seo:check` kiểm actual HTML/SEO/mailto/icons; `pnpm run deploy:dry-run` kiểm đóng gói Wrangler mà không upload. Public values và production indexing cố định trong source, không đọc LANDING_* hoặc `.env`.

Cloudflare Dashboard commands/settings theo [deployment guide](deployment.md). Chỉ operator deploy, không có Node/backend service trong hosting. Không cần secrets hoặc Claude key. Cấu hình assets-only, auto-trailing-slash và404-page, không SPA fallback.

Local helpers dùng Python3/Linux: `make dev` loopback3220; `make preview` serve artifact đã build loopback3221; `make stop` chỉ dừng repo-owned PID groups, giữ source/build; `make status` kiểm root/uid/PID-start-time. Port bận thì fail, không takeover. Log/state trong .runtime/ không commit. Helpers này không thuộc deployment artifact.

`make browser-check` mở Chrome/profile riêng với actual DevTools Console/Network, kiểm desktop/tablet/mobile, mailto, static workflow, reduced motion/no-JS/WebGL fallback và boundary404. Cần Google Chrome/DISPLAY. `make capture-assets` chụp chính hero/logo của public static site (không data trading riêng), giữ master PNG; build tiếp theo tạo ảnh OG/favicon từ masters. Snapshot ởbrowser80% zoom chỉ đổi capture scale, không đổi copy/design website. Build trên Cloudflare không chụp ảnh hoặc cần browser.

## Media sản phẩm (synthetic)

Ảnh và video công khai chụp từ Research Lab thật của backtest-service (UI `127.0.0.1:3210`), nhưng mọi gọi `/api/research/*` được Playwright chuyển sang một Research API riêng (`8021`, database `research__media`) đọc server thị trường synthetic (`scripts/media/synthetic_market.py`, `8031`, seed cố định). Mọi `/api/*` khác bị chặn trong lúc chụp. Không cần sửa UI của backtest-service; chỉ có `research__media` được thêm vào `ALLOWED_DATABASES` (commit `36268082`).

- `make media-stack-up` / `make media-stack-down`: bật/tắt stack; `down` in số run của `research` và `research__media` trước/sau để kiểm cách ly. `scripts/media/stack.sh reset` xóa riêng `research__media`.
- `make media-capture`: reset → chụp 5 ảnh (`scripts/media/capture.mjs`) → encode WebP 1280/2400 có dải nhãn (`encode.mjs`) → reset → quay video (`record.mjs`) → MP4/WebM, poster, VTT (`encode-video.mjs`). Ảnh gốc 2x nằm ở `tmp/media/raw/`, không commit. Manifest `src/content/media.json` ghi nhãn, ngày chụp, commit backtest-service, transcript.
- Cần backtest-service Research UI đang chạy ở 3210, Docker và runner image (`make research-setup` bên backtest-service).

## Cổng phát hành và audit Cloudflare

`pnpm release:check` (hoặc `make release-check`, chạy sau `pnpm build`) fail khi còn quyết định founder trống trong `src/content/founder.json`, `legalTextApproved` hay `rightsConfirmed` chưa `true`, thiếu `docs/cloudflare-audit.json` hoặc audit mâu thuẫn Privacy, media không phải synthetic, HTML có claim cấm hoặc placeholder, hoặc `seo:check` fail. `pnpm run build:release` = build + gate; `pnpm run deploy` chạy gate trước `wrangler deploy`. Cloudflare Workers Builds vẫn dùng `pnpm exec wrangler deploy` nên **không** tự chạy gate: operator chạy `make release-check` trước khi merge vào `main`. `make check`, `pnpm build`, `make dev` không phụ thuộc gate. Quyết định founder trống: bản dev hiện ghi chú nháp, bản production bỏ hẳn câu đó.

`CLOUDFLARE_API_TOKEN=... make cloudflare-audit` đọc (read-only) Web Analytics, Bot Fight Mode, Logpush, Email Routing của zone và ghi `docs/cloudflare-audit.json`; token chỉ dùng trong lệnh, không lưu.

Mặc định artifact production indexable theo yêu cầu operator mới, không còn release-env gate. Không deploy bản chưa duyệt; robots/noindex không phải authentication. Site không expose dashboard/API, không có waitlist form, không gọi Claude/trading backend. Founder/support email được operator cung cấp; operator đã xác nhận gửi/nhận và trả lời ngày 2026-10-08. Khi hosting thật hoạt động, operator xác minh Google Search Console/DNS và submit sitemap.
