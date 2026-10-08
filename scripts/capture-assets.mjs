import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
await mkdir("assets", { recursive: true });
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });
  await page.goto("http://127.0.0.1:3221");
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".plasma-container canvas").waitFor();
  await page.evaluate(() => {
    document.documentElement.style.zoom = ".8";
  });
  await page.waitForTimeout(300);
  await page.waitForFunction(
    () =>
      document.querySelector(".hero-type .text-type__content")?.textContent ===
      "Build the hypothesis.",
  );
  await page.screenshot({ path: "assets/hero-source.png" });
  await page.evaluate(() => {
    document.documentElement.style.zoom = "8";
  });
  await page
    .locator(".site-header .brand-symbol")
    .first()
    .screenshot({ path: "assets/brand-source.png" });
  console.log(
    "Captured only the public landing hero and brand mark; no trading data.",
  );
} finally {
  await browser.close();
}
