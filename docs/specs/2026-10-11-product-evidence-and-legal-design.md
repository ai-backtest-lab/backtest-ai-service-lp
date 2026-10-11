---
status: proposed
last_verified: 2026-10-11
code: src/components/landing/, src/app/, src/lib/landingContent.ts, src/lib/seo.ts, public/media/, scripts/, docs/claims.md
---

# Bằng chứng sản phẩm thật, trang `/product` và trang pháp lý

Operator yêu cầu ngày 2026-10-11, phiên làm việc trong `backtest-service`, được phép
sửa repository này. Mục tiêu: người xét duyệt (kể cả Claude for Startups) nhận ra
sản phẩm đang chạy thật trong một-hai màn hình đầu, rồi có bằng chứng chi tiết hơn
khi đọc tiếp; đồng thời site có đủ trang pháp lý và trạng thái thương mại trung thực.

Nguyên tắc: **screenshot chứng minh tính năng, video chứng minh workflow chạy được**.
Không dồn media vào một section; gắn vào section sẵn có, không tạo section trùng.
Backend vẫn private: không đăng mã nguồn, không mở API, không quay terminal.

## Quyết định của operator (2026-10-11)

| # | Quyết định |
|---|---|
| D1 | Dùng screenshot và video thật của app chạy local (backtest-service), thay hình minh họa. Ghi lại thành quyết định operator trong `docs/claims.md`, thay câu "review tự động đã từ chối screenshot run thật". |
| D2 | Ảnh có dữ liệu bên thứ ba (Coin Metrics, VCI, Binance) giữ nguyên, ghi nguồn và "historical, not a forecast". Market boards chỉ ở `/product`, không ở landing. |
| D3 | Video không tiếng, chú thích tiếng Anh trên hình, kèm transcript WebVTT; operator có thể lồng tiếng sau. |
| D4 | Không pricing page, không giá, gói, số khách, ngày phát hành, thanh toán, đăng nhập hay waitlist backend. Chỉ một khối Availability / Early access. |
| D5 | Thêm Terms of Service ngắn; audit lại Privacy và Disclaimer theo hành vi thực của site và demo. |

## 1. Media

Nguồn: Playwright điều khiển Chrome trên `http://127.0.0.1:3210` của backtest-service
(dev, dữ liệu thị trường công khai, run nghiên cứu đã lưu). Script chụp/quay nằm ở
`scripts/` của repo này, chạy lại được khi UI đổi. Ảnh gốc 2x không commit; chỉ
commit bản tối ưu trong `public/media/product/`.

| File | Nội dung (ảnh thật) | Vị trí |
|---|---|---|
| `dashboard-overview` | Strategy workspace `cycle_long` BTCUSDT.P 12h run 1026: chart nến, marker vào/ra, MACD, PnL, trade log | Hero |
| `strategy-research` | Coverage matrix 6 coin × 5 interval, "Refused" hiện rõ; cắt bỏ khối Archives (ghi chú tiếng Việt) và nút Delete | Capabilities 1 |
| `backtest-results` | Research Lab: một run hoàn tất, Quality check bốn dòng, performance, equity, trades | Capabilities 2 |
| `risk-analysis` | Strategy vs Buy & hold (Sharpe, max drawdown, time in market) và random-entry percentile | Capabilities 3 |
| `market-crypto`, `market-vn30` | Board tín hiệu tham khảo, có ghi nguồn | Chỉ `/product` |
| `product-demo` mp4 + webm, poster webp, `product-demo.en.vtt` | Workflow 60–90 s | Landing "See it in action" (bản rút gọn chính là bản đầy đủ) và `/product` |

Kịch bản video (một lần quay, không cắt ghép giả):
1. Research Lab: chọn strategy mẫu, pair, interval, Quick check, thấy range thực tế.
2. Bấm Run; tiến trình preparing → running; kết quả sau vài giây.
3. Quality check, performance sau phí, equity, trade log.
4. Strategy workspace run 1026: chart, marker, trade log, cuộn nhẹ.
5. Experiments: coverage matrix nhiều coin × interval.
6. Baselines: strategy vs buy & hold, random entries.
Chú thích trên hình là mô tả hành động ("Run a historical backtest", "Costs, funding
and slippage are included"), không có claim lợi nhuận.

Kỹ thuật: WebP chất lượng giữ chữ đọc được, hai bề rộng (1280, 2400) qua `srcset`,
`width`/`height` cố định chống CLS. Hero ảnh `fetchpriority="high"`, phần còn lại
`loading="lazy"`. Video: `preload="none"`, poster, chỉ tải khi bấm Play, không
autoplay, `<track kind="captions">`; transcript cũng hiển thị dạng text trên `/product`.
Ngân sách: tổng ảnh landing ≤ 900 KB ở bản 1280; video ≤ 12 MB (720p hoặc 1080p tùy
kết quả nén). Ghi số đo thật vào `docs/performance-evidence.json`.

Không thêm dependency mới (không lightbox library). Phóng to ảnh trên `/product` bằng
liên kết tới ảnh bản lớn hoặc `<dialog>` native.

## 2. Landing: gắn vào section có sẵn

| Section hiện có | Thay đổi |
|---|---|
| `#top` Hero | Thay `ResearchPreview` (minh họa CSS) bằng `dashboard-overview` trong khung trình duyệt; nhãn "Real screenshot · local product · historical data". CTA: "Explore interactive demo" (demo synthetic) và "Watch product demo" (tới `#see-it-in-action`). Giữ headline, Plasma. |
| `#product` How it works | Giữ `WorkflowStory`; thêm khối video "See it in action" ngay dưới, id `see-it-in-action`, nhãn "Working local product demonstration". |
| `#capabilities` | Ba hình có chú thích (Strategy research, Backtest results, Risk analytics); bốn thẻ icon gộp thành dòng phụ dưới mỗi hình, không lặp nội dung. Giữ `coverage-note`. |
| `#claude-ai` | Giữ `ClaudeStory` concept; kiểm nhãn "Planned integration · conceptual", không có số liệu AI giả. |
| `#architecture` | Giữ sơ đồ dịch vụ; bổ sung luồng xác định Data → Engine (fees, funding, slippage) → Metrics → Report → Next test, không nêu chi tiết nội bộ. |
| `#roadmap` / `#contact` | Thêm khối nhỏ **Availability** (mục 4). |

Phân biệt rõ trên trang: **interactive demo** = dữ liệu synthetic, công khai;
**product demo** = app thật chạy local, private, có dữ liệu lịch sử.

`ResearchPreview.tsx` bị gỡ nếu không còn nơi dùng; test cập nhật theo.

## 3. Trang `/product`

Route tĩnh mới, cùng design system, metadata/canonical/sitemap/structured data.
1. Product overview: `dashboard-overview` lớn.
2. Working capabilities: gallery 6 ảnh có chú thích (bốn ảnh landing + `market-crypto`,
   `market-vn30` có dòng nguồn dữ liệu), mỗi ảnh mở bản lớn.
3. Workflow demonstration: video đầy đủ + transcript text.
4. Architecture và giới hạn hiện tại.
5. Development status: ba cột **Working** (backtest engine crypto có fees/funding/
   slippage, strategy workspace, Research Lab run/compare/report, market boards tham
   khảo, demo trading trên sandbox sàn), **Experimental** (VN equity preview, recent
   12-month check), **Planned** (Claude analysis, public early access, broader
   validation). Mỗi mục chỉ ghi khi có căn cứ trong backtest-service; Real không nhắc
   như tính năng.
6. Liên kết interactive demo `demo.aibacktestlab.com`.

## 4. Availability / Early access (thay pricing page)

Khối nhỏ trên landing và một mục trên `/product`:
- "AI Backtest Lab is under active development. The research workspace is private."
- "Commercial pricing has not been announced."
- "Public early access is a roadmap goal, not an available service. To ask about it,
  email founder@…" (mailto; không form, không lưu dữ liệu trên site).
Không ngày, không gói, không giá, không số người dùng.

## 5. Trang pháp lý

Audit (hành vi thực đã kiểm 2026-10-11):
- Landing và demo là static export trên Cloudflare (Workers static assets). Response
  có header NEL/Report-To của Cloudflare (`success_fraction: 0`, báo lỗi mạng).
- Không cookie, không localStorage/sessionStorage, không analytics hay tracker trong
  bundle demo; chỉ một `fetch` của framework. Demo có liên kết attribution TradingView
  (lightweight-charts), không tải script TradingView.
- Không form, không tài khoản, không thanh toán; liên hệ qua `mailto:`.
- Video/ảnh mới host cùng origin.

| Trang | Thay đổi |
|---|---|
| `/privacy/` | Viết lại theo hiện trạng: dữ liệu Cloudflare xử lý khi phục vụ request (IP, user agent, URL, báo lỗi mạng NEL), không cookie/analytics/tracker, không lưu trên trình duyệt, email liên hệ do nhà cung cấp email xử lý, áp dụng cho cả landing và interactive demo; video/ảnh không thu dữ liệu; liên hệ và cập nhật. Bỏ câu "deployment-specific details will be added" vì nay đã xác định. |
| `/disclaimer/` | Bổ sung: screenshot/video là sản phẩm thật chạy local với dữ liệu lịch sử, không phải hiệu suất giao dịch thật hay khuyến nghị; số trong ảnh có thể đã cũ; dữ liệu bên thứ ba có nguồn và không được bảo đảm; interactive demo là dữ liệu synthetic. Giữ phần Claude planned và không bảo trợ. |
| `/terms/` mới | Ngắn: phạm vi (website + interactive demo); quyền truy cập và sử dụng hợp lý (không cào dữ liệu hàng loạt, không làm gián đoạn, không reverse engineer để vượt giới hạn); demo synthetic, có thể thay đổi/ngừng; sở hữu trí tuệ (nội dung, thương hiệu, ảnh; thông báo bên thứ ba như React Bits, TradingView); không phải lời khuyên tài chính (dẫn Disclaimer); cung cấp "as is", giới hạn trách nhiệm trong phạm vi luật cho phép; liên kết ngoài; thay đổi điều khoản; liên hệ. **Luật áp dụng và nơi giải quyết tranh chấp để trống có đánh dấu chờ founder**, không tự chọn. |

Footer: Interactive demo · Product · Privacy · Terms · Research disclaimer · Component
notices. `seo.ts`: thêm `productSeo`, `termsSeo`, mô tả mới cho privacy/disclaimer,
`modified` 2026-10-11; sitemap và structured data (breadcrumb) tự sinh theo
`publicSeoPages()`. OG image giữ nguyên trừ khi operator muốn thay bằng ảnh thật.

## 6. Cần founder xác nhận trước khi publish

1. **Pháp nhân và tên chủ thể** trên Terms/Privacy: cá nhân hay công ty, tên hiển thị.
2. **Luật áp dụng, nơi giải quyết tranh chấp**, quốc gia cư trú của chủ thể xử lý dữ liệu.
3. **Thời gian lưu email** liên hệ và quyền của người gửi (xem, xóa).
4. **Cloudflare**: có bật Web Analytics hay Bot Management sau này không; hiện không thấy trong response. Nếu bật phải cập nhật Privacy.
5. **Quyền dùng dữ liệu bên thứ ba trong ảnh** (Coin Metrics, VCI/Vietcap, Binance):
   điều khoản của từng nguồn cho phép hiển thị trên site công khai hay không.
6. Đối tượng người dùng có bao gồm EU/UK (GDPR) hay California không; nếu có cần mục
   quyền dữ liệu chi tiết hơn.
7. Mức độ tuổi tối thiểu (đề xuất: site không nhắm tới người dưới 18).
8. Các trang pháp lý nên được luật sư rà soát; spec này không thay tư vấn pháp lý.

Các điểm này được giữ trong một hằng số `pendingFounderConfirmation` (danh sách) của
`landingContent.ts`, hiển thị trên trang dưới dạng câu trung tính "To be confirmed
before launch". `make check` vẫn xanh; riêng `pnpm seo:check` (cổng trước deploy) fail
khi danh sách chưa rỗng, nên không deploy nhầm bản chưa xác nhận.

## 7. Kiểm

- Unit/component: landing có bốn ảnh thật đúng alt/caption, video không autoplay và
  có track, Availability không chứa giá/ngày, footer đủ liên kết, `/product`,
  `/terms` render, sitemap có năm URL, canonical đúng; `seo:check` báo đúng các mục founder còn mở.
- `pnpm test`, `type-check`, `lint`, `build`; `seo:check`.
- Chrome thật: 1440/1024/390, Console/Network sạch, LCP/CLS đo lại, video phát được
  và caption hiện, ảnh đọc được chữ ở 390 px.
- Không deploy: operator tự deploy sau khi xác nhận mục 6.

## Ngoài phạm vi

Pricing page, thanh toán, đăng nhập, subscription, waitlist backend, form liên hệ,
Claude API thật, mở mã backend, thay brand/OG, trang Real.
