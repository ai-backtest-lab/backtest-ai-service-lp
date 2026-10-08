---
status: current
last_verified: 2026-10-08
code: package.json, next.config.ts, wrangler.jsonc, Makefile, src/lib/landingContent.ts, src/lib/seo.ts
---

# AI Backtest Lab — static landing

Next.js16 / TypeScript / Tailwind / shadcn, export tĩnh vào `out/` cho **Cloudflare Workers Static Assets**. Giữ10sections, hero Plasma và React Bits text effects; Product/Claude sections static, responsive từ320px đến desktop. Claude API integration vẫn Planned.

Public values cố định: AI Backtest Lab, https://aibacktestlab.com, founder@aibacktestlab.com, support@aibacktestlab.com. Không `.env`, backend, database, Docker, Claude key hoặc runtime Node server. Production metadata/indexing nằm trong HTML static; JSON-LD chỉ mô tả brand/site/contact thật, không bịa ratings/pricing.

## Build và kiểm tra

Node22+, pnpm12 (lockfile/packageManager12.6.0):

```bash
make setup
make check
pnpm run build
pnpm run seo:check
pnpm run deploy:dry-run
```

Cloudflare **Build command:** `pnpm run build`. **Deploy command:** `pnpm exec wrangler deploy`. [Guide đầy đủ/settings chính xác](docs/deployment.md). Không deploy tự động từ script kiểm tra. Wrangler Preview command được bản4.148.0 hỗ trợ; Dashboard đang tắt preview builds.

## Preview local tùy chọn

```bash
make dev       # http://127.0.0.1:3220
make preview   # artifact build tại http://127.0.0.1:3221
make status
make stop
```

Python3/Linux chỉ dùng cho helper preview/ownership local, **không cần trên Cloudflare**. `make browser-check` kiểm Chrome headed/DevTools; `make capture-assets` chụp hero/logo của artifact hiện tại để cập nhật ảnh OG/favicon. Master snapshots ở `assets/`; build tạo ảnh1200×630 và icon16/32/48/180/192/512, faviconICO. Không cần Chrome trong build Cloudflare vì snapshots đã có trong source.

Tài liệu: [design](docs/design.md), [claim ledger](docs/claims.md), [runbook](docs/running.md), [completion](docs/completion.md), [brand operator](docs/brand-roadmap.md), [React Bits license](docs/REACT_BITS_LICENSE.md). Repo này không thay app Backtest riêng.
