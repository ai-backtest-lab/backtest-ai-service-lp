// Records one uncut product walkthrough of the real Research Lab on the media stack
// (synthetic market data). Captions are written as WebVTT from the moments each
// step actually happens; nothing is edited afterwards except trimming the blank start.
// Output: tmp/media/raw/product-demo.webm and tmp/media/raw/product-demo.cues.json.
import { mkdir, readdir, rename, rm, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";
import { routeResearchToMedia } from "./media-route.mjs";

const UI = process.env.RESEARCH_UI ?? "http://127.0.0.1:3210";
const RAW = "tmp/media/raw";
const SIZE = { width: 1280, height: 720 };
await mkdir(`${RAW}/video`, { recursive: true });

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--use-gl=swiftshader"],
});
const context = await browser.newContext({ viewport: SIZE, recordVideo: { dir: `${RAW}/video`, size: SIZE } });
const started = Date.now();
const page = await context.newPage();
const cues = [];
const cue = (text) => cues.push({ at: (Date.now() - started) / 1000, text });
const pause = (ms) => page.waitForTimeout(ms);
const section = (title) => page.getByRole("region", { name: title, exact: true });
const scrollTo = async (locator) => {
  await locator.evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "start" }));
  await pause(900);
};

try {
  await routeResearchToMedia(page);
  await page.goto(`${UI}/research`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
  await page.mouse.move(1270, 700);
  await section("New run").evaluate((el) => el.scrollIntoView({ block: "start" }));
  const c = page.getByRole("combobox");
  // The form starts on a pair this stack does not serve; load the synthetic pair's range first.
  await c.nth(1).selectOption("SYNTH-RANGE-PERP");
  await c.nth(1).selectOption("SYNTH-TREND-PERP");
  await page.getByTestId("range-preview").filter({ hasText: "Scored range" }).waitFor();
  await pause(500);
  // The published video starts here; the blank page load before it is trimmed.
  const firstFrame = (Date.now() - started) / 1000;

  cue("The Research Lab runs the real backtesting engine, here on synthetic market data.");
  await pause(3500);
  cue("Choose a strategy, a pair, an interval and a range.");
  await pause(1200);
  await c.nth(2).selectOption("12h");
  await pause(1200);
  await c.nth(2).selectOption("4h");
  await page.getByTestId("range-preview").filter({ hasText: "Scored range" }).waitFor();
  await pause(2500);

  cue("Set parameters. Fees, slippage, capital and risk follow one explicit policy.");
  await page.getByText("Show advanced settings").click();
  await pause(800);
  await page.getByRole("textbox").pressSequentially("entry_period=20", { delay: 90 });
  await pause(3000);

  cue("Run a historical backtest. Each run is isolated in its own container.");
  await page.getByRole("button", { name: "Run" }).click();
  await page.waitForFunction(
    () => document.querySelector("[data-testid=run-result]") && !document.querySelector("button[type=submit]")?.disabled,
    null,
    { timeout: 60000 },
  );
  await pause(1500);

  cue("The quality check reads return after costs, drawdown, profit factor and sample size.");
  await scrollTo(section("Quality check"));
  await pause(5000);
  cue("Performance after fees, slippage and funding, with buy and hold as a reference.");
  await scrollTo(section("Performance"));
  await pause(5000);
  cue("Candles and trades exactly as the run saw them.");
  await scrollTo(section("Chart"));
  await pause(1500);
  await page.getByRole("button", { name: "Zoom out" }).click();
  await pause(1500);
  await page.getByRole("button", { name: "Zoom out" }).click();
  await page.mouse.move(1270, 700);
  await pause(3000);
  cue("The equity curve and every closed trade.");
  await scrollTo(section("Equity"));
  await pause(3500);
  await scrollTo(section("Trades"));
  await pause(2500);

  cue("Test a second parameter variant on the same data.");
  await scrollTo(section("New run"));
  await page.getByRole("textbox").fill("");
  await page.getByRole("textbox").pressSequentially("entry_period=40", { delay: 90 });
  await pause(1000);
  await page.getByRole("button", { name: "Run" }).click();
  await page.waitForFunction(
    () => document.querySelector("[data-testid=run-result]") && !document.querySelector("button[type=submit]")?.disabled,
    null,
    { timeout: 60000 },
  );
  await pause(2000);

  cue("Compare variants: return, drawdown, profit factor and equity, side by side.");
  await scrollTo(section("Runs"));
  await pause(1200);
  const boxes = page.getByRole("checkbox");
  await boxes.nth(0).check();
  await pause(500);
  await boxes.nth(1).check();
  await pause(800);
  await page.getByRole("button", { name: /^Compare/ }).click();
  await page.getByTestId("comparison").waitFor({ timeout: 20000 });
  await page.getByTestId("comparison").evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "center" }));
  await page.mouse.move(1270, 700);
  await pause(7000);

  cue("The newest 12 months stay held out for a separate recent-period check.");
  const details = section("Details");
  await scrollTo(details);
  await pause(1200);
  await page.getByRole("button", { name: "Check recent 12 months" }).click();
  await pause(5000);
  await page.getByRole("button", { name: "Cancel" }).last().click();
  await pause(1500);
  cue("AI Backtest Lab · aibacktestlab.com");
  await pause(3000);
  const end = (Date.now() - started) / 1000;
  await writeFile(`${RAW}/product-demo.cues.json`, JSON.stringify({ firstFrame, end, cues }, null, 2));
} finally {
  await context.close();
  await browser.close();
}
const [video] = (await readdir(`${RAW}/video`)).filter((f) => f.endsWith(".webm"));
await rename(`${RAW}/video/${video}`, `${RAW}/product-demo.webm`);
await rm(`${RAW}/video`, { recursive: true, force: true });
console.log(`recorded ${RAW}/product-demo.webm`);
