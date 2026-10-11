// Captures the four public product screenshots from the real Research Lab UI
// (backtest-service, :3210) while its API calls go to the isolated media stack
// (synthetic market data, database research__media). Run `scripts/media/stack.sh up` first.
// Output: tmp/media/raw/*.png (2x, not committed); encode with scripts/media/encode.mjs.
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";
import { routeResearchToMedia } from "./media-route.mjs";

const UI = process.env.RESEARCH_UI ?? "http://127.0.0.1:3210";
const OUT = "tmp/media/raw";
await mkdir(OUT, { recursive: true });

export async function openLab(browser, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  await routeResearchToMedia(page);
  await page.goto(`${UI}/research`, { waitUntil: "networkidle" });
  // The Next.js dev-mode badge is a developer overlay, not product UI.
  await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
  return page;
}

export async function runBacktest(page, { pair, interval, params }) {
  const c = page.getByRole("combobox");
  // Selecting the other pair first makes the form load this pair's range.
  await c.nth(1).selectOption(pair === "SYNTH-TREND-PERP" ? "SYNTH-RANGE-PERP" : "SYNTH-TREND-PERP");
  await c.nth(1).selectOption(pair);
  await c.nth(2).selectOption(interval);
  await page.getByTestId("range-preview").filter({ hasText: "Scored range" }).waitFor();
  if (params !== undefined) {
    if (await page.getByText("Show advanced settings").isVisible())
      await page.getByText("Show advanced settings").click();
    await page.getByRole("textbox").fill(params);
  }
  await page.getByRole("button", { name: "Run" }).click();
  await page.waitForFunction(
    () => document.querySelector("[data-testid=run-result]") && !document.querySelector("button[type=submit]")?.disabled,
    null,
    { timeout: 60000 },
  );
  await page.waitForTimeout(1500);
}

// Research Lab panels are <section> elements labelled by their heading.
const card = (page, title) => page.getByRole("region", { name: title, exact: true });

async function shotSpan(page, first, last, file) {
  await first.evaluate((el) => el.scrollIntoView({ block: "start" }));
  // Park the pointer in the page header so no chart crosshair is drawn.
  await page.mouse.move(700, 5);
  await page.waitForTimeout(800);
  const a = await first.boundingBox();
  const b = await last.boundingBox();
  await page.screenshot({
    path: `${OUT}/${file}.png`,
    clip: { x: a.x, y: a.y, width: a.width, height: b.y + b.height - a.y },
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox", "--use-gl=swiftshader"],
  });
  try {
    const page = await openLab(browser, { width: 1440, height: 1100 });
    await runBacktest(page, { pair: "SYNTH-TREND-PERP", interval: "4h", params: "entry_period=40" });
    await runBacktest(page, { pair: "SYNTH-TREND-PERP", interval: "4h", params: "entry_period=20" });
    // Strategy research: the run form with parameters and the cost policy.
    await card(page, "New run").screenshot({ path: `${OUT}/strategy-research.png` });
    await page.getByText("Hide advanced settings").click();
    // Overview: the run form and the quality check of the finished run.
    await shotSpan(page, card(page, "New run"), card(page, "Quality check"), "dashboard-overview");
    // Backtest results: performance after costs, then candles with the run's trades.
    // Two shots, stacked by encode.mjs: a single clip taller than the viewport is cut off.
    await shotSpan(page, card(page, "Performance"), card(page, "Performance"), "backtest-results-a");
    await shotSpan(page, card(page, "Chart"), card(page, "Chart"), "backtest-results-b");
    // Risk analysis: two parameter variants side by side.
    const boxes = page.getByRole("checkbox");
    await boxes.nth(0).check();
    await boxes.nth(1).check();
    await page.getByRole("button", { name: /^Compare/ }).click();
    await page.getByTestId("comparison").waitFor({ timeout: 20000 });
    await page.getByTestId("comparison").evaluate((el) => el.scrollIntoView({ block: "start" }));
    await page.waitForTimeout(1200);
    await page.getByTestId("comparison").screenshot({ path: `${OUT}/risk-analysis.png` });
  } finally {
    await browser.close();
  }
  console.log(`screenshots written to ${OUT}`);
}
