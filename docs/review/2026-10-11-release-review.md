---
status: review
last_verified: 2026-10-11
code: src/app/privacy/page.tsx, src/app/terms/page.tsx, src/app/disclaimer/page.tsx, src/content/media.json, public/media/product/
---

# Gói duyệt trước phát hành — văn bản pháp lý và media (2026-10-11)

Văn bản dưới đây lấy nguyên từ bản build production (`out/`) của branch `feat/product-evidence-legal`. Các quyết định chưa công bố (luật áp dụng, nơi giải quyết tranh chấp, thời gian lưu email) không xuất hiện trong văn bản. Cờ `legalTextApproved` và `rightsConfirmed` đang là `false`; chỉ founder đổi.

## 1. Privacy notice (/privacy/)

### Privacy notice

This notice covers aibacktestlab.com and the public interactive demo at demo.aibacktestlab.com. Both are operated by Nguyen Thanh Dat, an individual based in Vietnam. AI Backtest Lab is an independent project, not an incorporated company. Contact: founder@aibacktestlab.com.

#### What the sites do not collect

The sites have no accounts, forms, payments or newsletter. They set no cookies, store nothing in your browser and include no analytics, advertising or tracking scripts. Fonts, images and the product video are served from our own domain, and the video loads only when it scrolls into view.

#### Hosting by Cloudflare

Both sites are static files served by Cloudflare. To deliver and protect them, Cloudflare processes request data such as your IP address, browser user agent, the requested address and the time of the request, and your browser may send Cloudflare network error reports. Cloudflare also gives the operator aggregated traffic statistics. Cloudflare handles this data under its own privacy policy. We do not combine it with other data or use it to identify visitors.

#### Email

Addresses at aibacktestlab.com are forwarded by Cloudflare Email Routing to the founder’s mailbox. When you write to us, we receive your email address, your message and its metadata, and use them only to reply and follow up.

Questions about your data: founder@aibacktestlab.com.

#### Claude and Anthropic

Claude API integration is planned and not available today. The sites do not send visitor data to Anthropic.

#### Age

These sites are not directed at people under 18.

#### Changes

We will update this page when the sites change how they handle data. Updated October 11, 2026.

## 2. Terms of use (/terms/)

### Terms of use

These terms apply to aibacktestlab.com and the public interactive demo at demo.aibacktestlab.com. The sites are operated by Nguyen Thanh Dat, an individual based in Vietnam, who runs AI Backtest Lab as an independent project, not an incorporated company. By using the sites you accept these terms.

#### What the sites are

The sites describe a quantitative research product that is under development. The research workspace is private; there is no account, subscription or paid service. The interactive demo is a static site on synthetic data and may change or stop at any time.

#### Acceptable use

Do not disrupt or overload the sites, scrape them in bulk, try to reach anything that is not publicly linked, work around technical limits, or suggest that you are affiliated with AI Backtest Lab when you are not.

#### Content and ownership

The text, design, brand, screenshots and video on the sites belong to the operator. You may link to the sites and quote short parts with attribution. Third-party software keeps its own license, including the React Bits components used here and TradingView Lightweight Charts, which is credited in the demo. The demo source code is public for review; publishing it does not grant a license to reuse it.

#### No financial advice

Nothing on the sites is investment advice or a recommendation to trade. Read the research disclaimer.

#### No warranty and limits of liability

The sites are provided “as is” and “as available”, without warranties of any kind. To the extent the law allows, the operator is not liable for losses that come from using or relying on the sites. Nothing in these terms limits liability that the law does not allow to be limited.

#### Other sites

Links to other sites, such as GitHub or Cloudflare, are provided for convenience. Their own terms apply there.

#### Changes and contact

We may update these terms; the date below shows the latest version. Questions: founder@aibacktestlab.com. Updated October 11, 2026.

## 3. Research disclaimer (/disclaimer/)

### Research disclaimer

AI Backtest Lab is a quantitative research project. Nothing on these sites is investment advice, a trade instruction or a prediction of future results.

#### Backtests are hypothetical

Historical backtesting depends on its data, costs, assumptions and execution model. Past results do not guarantee future performance.

#### Product screenshots and video

The screenshots and the product video show the real, privately run Research Lab and its backtesting engine, working on a seeded synthetic market. The prices, trades and results in them are outputs on synthetic data. They are not trading performance, not a recommendation and not results on any real market. They were captured on October 11, 2026, and the product may have changed since.

#### The interactive demo

The public demo at demo.aibacktestlab.com is a static site on synthetic demonstration data. It does not run backtests on a server and does not connect to an exchange.

#### Planned AI features

Claude API integration is planned and is not available in the product today. Future AI explanations must be grounded in supplied results and independently validated. They do not replace quantitative tests or human judgment.

Using the Claude API in a future product does not mean the project is endorsed by Anthropic, accepted into a startup program or guaranteed to receive benefits.

Updated October 11, 2026.

## 4. Media

Nhãn trên mọi ảnh và video: **Real Backtesting Engine · Synthetic Market Data**. Chụp 2026-10-11 từ backtest-service `36268082` (có thay đổi chưa commit ở frontend), dữ liệu thị trường synthetic.

- **dashboard-overview** — A finished quick-check run. The quality check reads return after costs, drawdown, profit factor and sample size in plain words.
- **strategy-research** — Configure a strategy: file, pair, interval, range and parameters. Fees, slippage, capital and risk are fixed by one explicit policy.
- **backtest-results** — Results after fees, slippage and funding, with buy and hold as a reference, and the candles and trades exactly as the run saw them. Chart by TradingView Lightweight Charts™.
- **risk-analysis** — Compare variants on the same data: return, drawdown, profit factor, trades and equity curves side by side.
- **product-demo** — 76 s, không tiếng, phụ đề tiếng Anh; transcript trên /product.

| File | Dung lượng |
|---|---|
| `public/media/product/backtest-results-1280.webp` | 49 KB |
| `public/media/product/backtest-results-2400.webp` | 102 KB |
| `public/media/product/dashboard-overview-1280.webp` | 34 KB |
| `public/media/product/dashboard-overview-2400.webp` | 81 KB |
| `public/media/product/product-demo-poster.webp` | 37 KB |
| `public/media/product/product-demo.en.vtt` | 1 KB |
| `public/media/product/product-demo.mp4` | 1353 KB |
| `public/media/product/product-demo.webm` | 1369 KB |
| `public/media/product/risk-analysis-1280.webp` | 31 KB |
| `public/media/product/risk-analysis-2400.webp` | 66 KB |
| `public/media/product/strategy-research-1280.webp` | 25 KB |
| `public/media/product/strategy-research-2400.webp` | 58 KB |

## 5. Checklist quyền bên thứ ba

| # | Hạng mục | Hiện trạng | Kết luận / việc của founder |
|---|---|---|---|
| 1 | Dữ liệu thị trường trong ảnh/video | Sinh từ `scripts/media/synthetic_market.py` (seed cố định); không dùng Binance, Coin Metrics, VCI | Không cần giấy phép dữ liệu |
| 2 | Giao diện Research Lab | Phần mềm của founder (backtest-service, private) | Founder sở hữu |
| 3 | Chart trong ảnh `backtest-results` và video | TradingView Lightweight Charts™ (Apache-2.0, NOTICE yêu cầu ghi nguồn + link). Research Lab tắt logo trên chart | Đã thêm ghi nguồn + link ở caption và /product. Founder xác nhận cách ghi nguồn này đủ |
| 4 | Icon trong UI (lucide) | Giấy phép ISC | Không cần thêm |
| 5 | Font hiển thị trong ảnh | Font giao diện được render thành ảnh | Không phân phối file font; không cần thêm |
| 6 | Chiến lược `donchian_breakout` | Chỉ hiện tên và tham số, không hiện mã | Founder xác nhận là chiến lược mẫu được phép hiện tên |
| 7 | Tên thương hiệu bên thứ ba trong văn bản | Claude, Anthropic, Cloudflare, GitHub, TradingView: dùng để mô tả; Disclaimer nói rõ không được Anthropic bảo trợ | Founder xác nhận |
| 8 | Dữ liệu cá nhân trong media | Không có tên, email, tài khoản; chỉ run ID và thời điểm chạy | Founder xem lại từng file |
| 9 | Âm thanh | Video không có tiếng | Không cần giấy phép nhạc |
| 10 | React Bits trên landing | Có `docs/REACT_BITS_LICENSE.md` và `/media/react-bits-license.txt` | Giữ nguyên |
| 11 | Code demo public | Repo `backtest-dashboard-demo` chưa có LICENSE; Terms ghi “không cấp quyền dùng lại” | Founder chọn: giữ không license hay thêm license |
| 12 | Nhãn chart “VND · UTC+7” cho crypto | Lỗi hiển thị của UI, giữ nguyên theo quyết định founder; /product ghi là lỗi đã biết | Founder chấp nhận khi công bố |
| 13 | Cookie từ Cloudflare | Response production 2026-10-11 không có `Set-Cookie`; chưa audit dashboard (Bot Fight Mode có thể đặt cookie) | Chạy `make cloudflare-audit` |

## 6. Còn mở trước khi phát hành

1. Rà soát pháp lý: `governingLaw` (đề xuất Vietnam), `disputeVenue`.
2. Quy trình lưu/xóa email; sau đó công bố `contactEmailRetention` (đề xuất “12 months after the last relevant communication”).
3. `make cloudflare-audit`.
4. Founder đọc mục 1–3, xem mục 4, xử lý mục 5 → đặt `legalTextApproved` và `rightsConfirmed` thành `true` → `make build && make release-check`.
