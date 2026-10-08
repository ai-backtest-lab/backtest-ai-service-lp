---
status: current
last_verified: 2026-10-08
code: next.config.ts, wrangler.jsonc, package.json, pnpm-workspace.yaml, src/lib/landingContent.ts, src/lib/seo.ts
---

# Cloudflare Workers Static Assets — triển khai thủ công

Site là Next.js16 static export. Build tạo `out/`; Wrangler chỉ upload assets từ đó. Không Worker application script, API, database, Docker, Node server hoặc Claude key. Node22+ dùng để build/CLI; static hosting không cần runtime Node. Cấu hình hiện tại phù hợp mô hình assets-only trên Workers Free; không sử dụng paid bindings.

## Giá trị trong Cloudflare Dashboard

| Setting | Giá trị |
|---|---|
| Repository | `ai-backtest-lab/backtest-ai-service-lp` |
| Project/Worker name | `backtest-ai-service-lp` |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `pnpm run build` |
| Deploy command | `pnpm exec wrangler deploy` |
| Preview command | `pnpm exec wrangler preview` |
| Preview builds | Disabled |
| Cloudflare Access | Disabled |
| Environment variables | None |
| API token | Token tự tạo/quản lý bởi Cloudflare, không đưa vào repo |

**Preview command có hỗ trợ:** đã kiểm `pnpm exec wrangler preview --help` trên Wrangler **4.148.0**. Đây là command open beta tạo Preview deployment; không phải lệnh local preview. Preview builds đang Disabled nên không chạy. Không cần sửa giá trị bạn đã nhập. Chúng tôi chỉ kiểm help, không gọi Preview deployment hoặc thay settings.

Package manager theo `packageManager: pnpm@12.6.0`, dependencies khóa trong lockfile; native initialization cho esbuild/workerd được allowlist trong pnpm-workspace.yaml. Không cần biến LANDING_* hoặc `.env`. Public brand/domain/founder/support nằm trực tiếp trong `src/lib/landingContent.ts`.

## Trước và sau khi bạn click Deploy

1. Giữ các values trên, kiểm quyền token/connection GitHub do Cloudflare quản lý, rồi click Deploy.
2. Nếu chưa gắn domain: Worker → Settings → Domains & Routes → thêm Custom Domain `aibacktestlab.com`. Xác minh DNS/HTTPS trong tài khoản của bạn. Nếu muốn `www`, cấu hình redirect về apex; canonical source là `https://aibacktestlab.com/`.
3. Kiểm homepage, `/privacy/`, `/disclaimer/`, `/robots.txt`, `/sitemap.xml`, ảnh `/media/og.png` và favicon. Unknown URLs trả404, không SPA fallback.
4. Operator đã xác nhận hai mailbox gửi/nhận và trả lời ngày 2026-10-08. Sau deploy kiểm mailto vẫn đúng; landing không triển khai mail provider.
5. Google Search Console: xác minh domain bằng DNS, submit `https://aibacktestlab.com/sitemap.xml`, dùng URL Inspection sau khi domain phục vụ đúng build. Không đảm bảo thời điểm index/ranking.

## Headers, redirects và indexing

- `public/_headers` được copy vào `out/` và Workers Static Assets áp dụng: `/_next/static/*` (tên file có hash) cache `immutable` 1 năm; mọi response có `X-Content-Type-Options: nosniff` và `Referrer-Policy: strict-origin-when-cross-origin`. HTML, robots, sitemap và `/media/*` giữ cache mặc định `max-age=0, must-revalidate` vì tên file không đổi khi nội dung đổi.
- `public/_redirects` redirect 301 `/privacy` → `/privacy/` và `/disclaimer` → `/disclaimer/`. Không có file này, `auto-trailing-slash` trả 307 (tạm thời). URL canonical luôn có dấu `/` cuối theo `trailingSlash: true`.
- Indexing do `siteConfig.release` trong `src/lib/landingContent.ts` quyết định, hiện là `true`. Mọi build từ repo đều indexable. Preview builds phải giữ Disabled; nếu bật lại, cần đưa `release` về cờ phân biệt preview/production trước, nếu không preview URL sẽ indexable.

## Việc cần làm trên Cloudflare Dashboard (repo không quản lý được)

Kiểm production ngày 2026-10-08:

1. **Bắt buộc:** `http://aibacktestlab.com/` trả 200 thay vì redirect. Bật SSL/TLS → Edge Certificates → **Always Use HTTPS**. Sau khi HTTPS ổn định, cân nhắc bật **HSTS** (bắt đầu với max-age ngắn).
2. **Tùy chọn:** `www.aibacktestlab.com` chưa có DNS. Nếu muốn dùng, thêm DNS record proxied và Redirect Rule 301 `www` → `https://aibacktestlab.com` (giữ path).
3. Không cần sửa Build/Deploy command hay Preview settings.

## Kiểm tra local không deploy

```bash
pnpm install --frozen-lockfile
make check
pnpm run build
pnpm run seo:check
pnpm run deploy:dry-run
```

Dry-run đã qua, đọc123files từ out/, không bindings. Nó không xác minh quyền token/account/domain thực của Cloudflare; các phần đó do bạn kiểm trong Dashboard. `pnpm exec wrangler deploy` hoặc `wrangler preview` chỉ do operator chạy khi muốn triển khai; agent không chạy các lệnh đó.
