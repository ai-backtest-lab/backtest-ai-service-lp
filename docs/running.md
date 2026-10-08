---
status: current
last_verified: 2026-10-08
code: Makefile, scripts/site.py, scripts/assets.mjs, scripts/capture-assets.mjs, scripts/check-seo.mjs, wrangler.jsonc, src/lib/landingContent.ts
---

# Build, preview và deploy

Node22+/pnpm12. `make setup` install frozen lockfile; `make check` test/tsc/lint; `pnpm run build` export static out/, ảnh và gzip sidecars; `pnpm run seo:check` kiểm actual HTML/SEO/mailto/icons; `pnpm run deploy:dry-run` kiểm đóng gói Wrangler mà không upload. Public values và production indexing cố định trong source, không đọc LANDING_* hoặc `.env`.

Cloudflare Dashboard commands/settings theo [deployment guide](deployment.md). Chỉ operator deploy, không có Node/backend service trong hosting. Không cần secrets hoặc Claude key. Cấu hình assets-only, auto-trailing-slash và404-page, không SPA fallback.

Local helpers dùng Python3/Linux: `make dev` loopback3220; `make preview` serve artifact đã build loopback3221; `make stop` chỉ dừng repo-owned PID groups, giữ source/build; `make status` kiểm root/uid/PID-start-time. Port bận thì fail, không takeover. Log/state trong .runtime/ không commit. Helpers này không thuộc deployment artifact.

`make browser-check` mở Chrome/profile riêng với actual DevTools Console/Network, kiểm desktop/tablet/mobile, mailto, static workflow, reduced motion/no-JS/WebGL fallback và boundary404. Cần Google Chrome/DISPLAY. `make capture-assets` chụp chính hero/logo của public static site (không data trading riêng), giữ master PNG; build tiếp theo tạo ảnh OG/favicon từ masters. Snapshot ởbrowser80% zoom chỉ đổi capture scale, không đổi copy/design website. Build trên Cloudflare không chụp ảnh hoặc cần browser.

Mặc định artifact production indexable theo yêu cầu operator mới, không còn release-env gate. Không deploy bản chưa duyệt; robots/noindex không phải authentication. Site không expose dashboard/API, không có waitlist form, không gọi Claude/trading backend. Founder/support email được operator cung cấp; operator đã xác nhận gửi/nhận và trả lời ngày 2026-10-08. Khi hosting thật hoạt động, operator xác minh Google Search Console/DNS và submit sitemap.
