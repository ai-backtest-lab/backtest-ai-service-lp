---
status: current
last_verified: 2026-10-08
code: package.json, next.config.ts, Makefile, scripts/site.py, src/app/, src/lib/landingContent.ts, docs/design.md
---

# AI Backtest Lab — landing page

Website Next.js riêng cho **AI Backtest Lab**, theo brand/roadmap operator. Mười sections, Plasma hero, workflow/Claude sections static theo luồng trang, ScrollReveal, TextType và MaskedHeading; desktop/mobile/reduced-motion layouts.

Source này chỉ là landing: **không có dashboard, trading API, live AI endpoint hoặc quyền đặt lệnh**. Claude API integration giữ nhãn Planned. Các chart/report là illustration có nhãn, không phải performance đã đo. Không tự publish hoặc gửi Claude for Startups application.

## Chạy local

Cần Node.js 24+ (đã kiểm với Node26), pnpm12 và Python3 trên Linux.

```bash
make setup
make dev       # http://127.0.0.1:3220
make build     # static export out/, noindex mặc định
make preview   # http://127.0.0.1:3221, dùng artifact đã build
make status
make stop      # chỉ dừng processes thuộc repo này, giữ source/build
```

`make check` chạy tests, TypeScript và ESLint. `make browser-check` kiểm static preview bằng Chrome có giao diện và DevTools (cần Google Chrome/DISPLAY). `pnpm build` cũng tạo OG artwork/gzip sidecars. Static preview không cần backtest-service đang chạy. Chi tiết environment, ownership và release gate trong [runbook](docs/running.md).

## Public release chưa mở

Copy `.env.example` thành `.env.local` khi operator cung cấp founder/email thật. Domain hiện được chốt trong thiết kế là `https://aibacktestlab.com`. `make release-build` kiểm founder/email consistency, tạo indexable artifact; operator còn phải xác minh domain/HTTPS/mail delivery, host ownership và approve public deployment. Không cấu hình credential Claude/exchange vào repository này.

Nếu có host static, deploy **chỉ thư mục `out/`** sau launch review. Không deploy trading app hoặc copy API proxy vào đây. Landing chưa có waitlist backend; contact email chỉ xuất hiện khi được cấu hình thật.

## Tài liệu

- [Brand/SEO/AI roadmap operator](docs/brand-roadmap.md)
- [Thiết kế source riêng](docs/design.md)
- [Claim ledger](docs/claims.md)
- [Vận hành](docs/running.md)
- [React Bits provenance](docs/react-bits-provenance.json) và [license](docs/REACT_BITS_LICENSE.md)

Remote: `git@github.com.per:DyanNguyen22/backtest-ai-service-lp.git`. Repo app nghiên cứu cũ đã được giữ riêng; WIP migration cũ nằm ở stash914f748b của repo đó, không tự apply vào landing.
