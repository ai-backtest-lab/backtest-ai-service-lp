---
status: current
last_verified: 2026-10-08
code: Makefile, scripts/site.py, scripts/compress.mjs, scripts/assets.mjs, next.config.ts, .env.example, src/lib/landingContent.ts
---

# Vận hành landing

Node24+/pnpm12/Python3/Linux. `make setup` chỉ install lockfile; `make dev` start Next trên loopback3220; `make build` export static, tạo artwork và gzip; `make preview` chỉ serve build sẵn loopback3221; `make stop` dừng đúng groups repo sở hữu, bảo toàn source và build. `make status` đọc ownership PID/start-time. Port đang bận thì fail, không kill/takeover. Log/state tại `.runtime/`, không commit.

Preview phục vụ gzip khi client chấp nhận và dùng immutable caching cho hashed Next static assets. HTML config dùng no-cache. Directory listing bị tắt, không fallback unknown path về operator app. `/api/*` và `/dashboard` trả404. Build root/legal đủ text khi JS bị tắt; fonts/assets locally bundled, không call backend trading hoặc external AI.

## Configuration

`.env.local` được Next load cho dev/build. Source example không có secrets. LANDING_DOMAIN phải HTTPS origin; LANDING_FOUNDER và LANDING_CONTACT_EMAIL chỉ điền thông tin thật. Email release phải khớp domain, nhưng guard không kiểm ownership hay mailbox delivery. LANDING_RELEASE mặc định0/noindex; `make release-build` set1 và fail nếu identity chưa đủ. Noindex không phải auth; public artifact chỉ chứa landing assets/content.

## Kiểm tra

`make check`: focused product tests, tsc, eslint. `make build`: Next static build/typecheck. `make preview` rồi `node scripts/browser-check.mjs`: headed Chrome/profile mới trong tmp, actual DevTools Console/Network, responsive/pin/mobile/FAQ/reduced-motion và public boundary. Yêu cầu Google Chrome và DISPLAY có GUI; scenario có deadline, tự đóng browser, không dừng stack cũ.

Lighthouse lab nếu cần: dùng static preview, ghi device/throttle/encoding, không dùng dev server hoặc gọi TBT là field INP. Bằng chứng cuối nằm trong docs/completion.md; raw profiles/logs/screenshots diagnostic tmp không phải public research evidence.

Public launch/email/domain/Claude Console và application submission cần operator action/approval riêng sau code/review. Không gửi email hoặc submit form tự động. POC Claude cần backend plan riêng, auth/data contract/credential/budget và grounding eval; source landing không giữ API key.
