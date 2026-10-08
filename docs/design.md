---
status: current
last_verified: 2026-10-08
code: src/app/, src/components/landing/, src/lib/landingContent.ts, next.config.ts, Makefile
---

# AI Backtest Lab — thiết kế source landing riêng

Operator ngày 2026-10-08 yêu cầu clone `git@github.com.per:DyanNguyen22/backtest-ai-service-lp.git` vào folder cạnh backtest-service, init Next.js và triển khai ở đây. Quyết định này thay phần root/dashboard migration của proposal cũ. Không copy API proxy, service, database hoặc trading controls từ app nghiên cứu sang landing. Source app cũ giữ nguyên; WIP trước khi đổi source được giữ ở stash `914f748b` của app cũ.

Brand và copy theo [tài liệu operator](brand-roadmap.md): AI Backtest Lab, aibacktestlab.com, workflow Build → Backtest → Quantify → Explain with Claude → Hypothesis → Validate again. Domain là định danh dự kiến, không phải bằng chứng DNS/email đã hoạt động. POC Claude và public launch chưa diễn ra.

## Bố cục và motion

Mười sections: Hero, Problem, Six-step workflow, Capabilities, Claude AI, Validation, Architecture, Roadmap, About, Contact/FAQ. Hero dùng Plasma trên dark/green semantic tokens; headline ổn định đọc được từ HTML, TextType dùng ở dòng phụ. Theo chỉ đạo operator, Product và Claude hiển thị static/linear trên mọi viewport: toàn bộ sáu bước và ba phần report cùng có trong luồng trang, không pin hoặc tiến độ theo cuộn. ScrollReveal dùng cho statement, MaskedHeading cho Validation, GSAP reveal nhẹ cho các section khác.

Không còn chapter navigation, inactive panels hoặc report-phase dimming. Nội dung Report là concept minh họa, không giả response API Claude. Chart là illustration không có performance metrics. Nhãn Planned/Illustrative hiện ở ngay visual và hero, không có testimonials, client counts hay giả lợi nhuận.

Các text/reveal tweens còn lại được scoped và cleanup đúng owner; hai section Product/Claude không tạo ScrollTrigger. Hero WebGL dừng khi offscreen/hidden tab; lỗi context dùng CSS fallback, không tiếp tục render bằng GPU resources đã invalidated. TextType và MaskedHeading có cleanup timer/tween/RAF; masked text có DOM fallback đọc được khi media/JS lỗi.

## Public boundary và trạng thái sản phẩm

Next.js App Router/TypeScript/Tailwind/shadcn, static export `out/`. Routes chỉ `/`, `/privacy/`, `/disclaimer/`, robots/sitemap/icon. Không dashboard hoặc `/api` trong artifact, không gọi trading app/Claude API, không auth/registration/waitlist backend. Không có secret trong source hay client bundle.

Historical crypto research và market views là capability của private product hiện có, không phải feature runtime của site landing này. VN execution còn blocked và được nói rõ trong copy. Demo có private infrastructure; roadmap mô tả mở rộng validation/access, không phủ nhận service cũ đã tồn tại. Real vẫn frozen ở app cũ; roadmap không authorizes tiếp tục hoặc pilot.

Theo yêu cầu deployment mới, production metadata/indexing được bật và public values cố định trong source, không có environment gate. Founder/support emails do operator cung cấp; operator xác nhận mailbox delivery/reply ngày 2026-10-08; không suy ra domain/Cloudflare account đã được kiểm. Không auto-deploy hoặc gửi application.

## React Bits và bằng chứng

Bốn bản TS-CSS lấy qua shadcn registry chính thức, sau đó adapt lifecycle/type/accessibility. [Provenance hashes](react-bits-provenance.json), [license](REACT_BITS_LICENSE.md) giữ nguồn/điều kiện; không bán lại component library. Không cần runtime package React Bits hoặc thêm smooth-scroll library.

Make targets setup/build/dev/preview/stop/status/check. Native dev loopback3220, static preview loopback3221; lifecycle guard exact repo/PID start-time, không chiếm process trên port đã bận. Build tạo gzip sidecars; local preview phục vụ content encoding/cache headers tương tự static hosting để đo performance lab có ý nghĩa. H1 không fade sau hydration để tránh reset mốc LCP.

## Typography — cập nhật 2026-10-08

Operator yêu cầu bỏ nhãn viết hoa toàn bộ. Eyebrow, step captions, chart labels, lineage và navigation branding dùng sentence case/proper brand case; giữ acronym AI/API/BTC/USD và quarter dates. Không đổi layout, animation hoặc claim/status. CSS không ép text-transform uppercase.
