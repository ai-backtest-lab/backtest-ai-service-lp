import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const result = {
  started: new Date().toISOString(),
  headed: true,
  scenarios: [],
  consoleErrors: [],
  pageErrors: [],
  externalRequests: [],
  privateRequests: [],
  devtools: [],
};
let context;
const deadline = setTimeout(() => {
  result.deadline = true;
  void context?.close();
}, 150000);
async function openDevtools(page) {
  await page.waitForTimeout(500);
  const all = await (await fetch("http://127.0.0.1:9224/json/list")).json();
  const target = all.find(
    (t) => t.url.startsWith("devtools://") && t.title.includes("3221"),
  );
  assert.ok(target, "Actual DevTools target missing");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => {
    ws.onopen = r;
    ws.onerror = j;
  });
  let id = 0;
  async function call(method, params = {}) {
    const request = ++id;
    return new Promise((r, j) => {
      function receive(e) {
        const reply = JSON.parse(e.data);
        if (reply.id === request) {
          ws.removeEventListener("message", receive);
          if (reply.error) j(new Error(JSON.stringify(reply.error)));
          else r(reply.result);
        }
      }
      ws.addEventListener("message", receive);
      ws.send(JSON.stringify({ id: request, method, params }));
    });
  }
  try {
    const proof = { title: target.title, url: target.url };
    for (const tab of ["Console", "Network"]) {
      const expression = `(()=>{function walk(root){for(const node of root.querySelectorAll('*')){if(node.getAttribute('role')==='tab'&&(node.getAttribute('aria-label')===${JSON.stringify(tab)}||node.textContent.trim()===${JSON.stringify(tab)})){node.click();return true}if(node.shadowRoot&&walk(node.shadowRoot))return true}return false}return walk(document)})()`;
      let clicked = false;
      for (let attempt = 0; attempt < 20; attempt++) {
        clicked = (
          await call("Runtime.evaluate", { expression, returnByValue: true })
        ).result.value;
        if (clicked) break;
        await page.waitForTimeout(200);
      }
      assert.equal(clicked, true, "DevTools " + tab + " not ready");
      proof[tab] = true;
    }
    await page.waitForTimeout(500);
    const shot = await call("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("tmp/devtools.png", Buffer.from(shot.data, "base64"));
    const app = await context.newCDPSession(page);
    await app.send("Runtime.enable");
    await app.send("Network.enable");
    proof.page = (
      await app.send("Runtime.evaluate", {
        expression: "location.href",
        returnByValue: true,
      })
    ).result.value;
    await app.detach();
    result.devtools.push(proof);
  } finally {
    ws.close();
  }
}
function track(p) {
  p.on("pageerror", (e) => result.pageErrors.push(e.message));
  p.on("console", (m) => {
    if (m.type() === "error") result.consoleErrors.push(m.text());
  });
  p.on("request", (r) => {
    const url = r.url();
    if (url.startsWith("http") && !url.startsWith("http://127.0.0.1:3221"))
      result.externalRequests.push(url);
    if (url.includes("/api/") || url.includes("/dashboard"))
      result.privateRequests.push(url);
  });
}
(async () => {
  try {
    context = await chromium.launchPersistentContext(
      path.resolve("tmp/chrome-review-" + Date.now()),
      {
        executablePath: "/usr/bin/google-chrome",
        headless: false,
        args: [
          "--no-sandbox",
          "--auto-open-devtools-for-tabs",
          "--remote-debugging-port=9224",
        ],
        viewport: { width: 1440, height: 1000 },
      },
    );
    for (const width of [1440, 1024, 390, 375]) {
      const p = await context.newPage();
      track(p);
      await p.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await p.goto("http://127.0.0.1:3221");
      await p.getByRole("heading", { level: 1 }).waitFor();
      await p.waitForTimeout(600);
      assert.equal(await p.locator("main > section").count(), 10);
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      await p.screenshot({ path: `tmp/hero-${width}.png` });
      await p
        .getByRole("link", { name: "Explore the platform", exact: true })
        .first()
        .click();
      await p.waitForTimeout(700);
      if (width >= 1024) {
        await p.locator('[data-chapter-button="3"]').click();
        await p.waitForTimeout(500);
        assert.equal(
          await p
            .locator(".workflow-story")
            .getAttribute("data-active-chapter"),
          "3",
        );
        assert.equal(
          await p
            .locator("[data-chapter]")
            .nth(3)
            .evaluate((el) => el.inert),
          false,
        );
        await p.locator('[data-chapter-button="5"]').click();
        await p.waitForTimeout(500);
        assert.equal(
          await p
            .locator(".workflow-story")
            .getAttribute("data-active-chapter"),
          "5",
        );
        await p.locator('[data-chapter-button="0"]').click();
        await p.waitForTimeout(500);
        assert.equal(
          await p
            .locator(".workflow-story")
            .getAttribute("data-active-chapter"),
          "0",
        );
      } else {
        assert.equal(
          await p
            .locator(".workflow-story")
            .getAttribute("data-active-chapter"),
          null,
        );
        await p.getByRole("button", { name: "Open navigation" }).click();
        await p
          .getByRole("navigation", { name: "Mobile navigation" })
          .getByRole("link", { name: "Claude AI" })
          .click();
        await p.waitForTimeout(300);
        assert.equal(await p.getByRole("dialog").count(), 0);
      }
      await p.locator("#claude-ai").scrollIntoViewIfNeeded();
      await p.waitForTimeout(700);
      await p
        .locator(".claude-stage")
        .screenshot({ path: `tmp/claude-${width}.png` });
      await p
        .getByRole("button", { name: "Is Claude integrated today?" })
        .click();
      await p
        .getByText(
          "Claude API integration is planned. Tested integrations will be labeled separately when available.",
        )
        .waitFor();
      await p
        .locator("#contact")
        .screenshot({ path: `tmp/contact-${width}.png` });
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      if (width === 1440) await openDevtools(p);
      result.scenarios.push({
        width,
        status: "PASS",
        pin: width >= 1024,
        mobileMenu: width < 768,
        faq: true,
      });
      await p.close();
    }
    const reduced = await context.newPage();
    track(reduced);
    await reduced.emulateMedia({ reducedMotion: "reduce" });
    await reduced.goto("http://127.0.0.1:3221");
    await reduced.getByRole("heading", { level: 1 }).waitFor();
    // The auto-opened inspector resets initial CDP emulation while initializing.
    await reduced.waitForTimeout(1200);
    await reduced.emulateMedia({ reducedMotion: "reduce" });
    await reduced.waitForFunction(
      () =>
        matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !document.querySelector(".plasma-container canvas"),
    );
    assert.equal(await reduced.locator(".plasma-container canvas").count(), 0);
    assert.equal(
      await reduced
        .locator(".workflow-story")
        .getAttribute("data-active-chapter"),
      null,
    );
    assert.equal(
      await reduced
        .getByRole("heading", { name: "Validate again", exact: true })
        .count(),
      1,
    );
    await reduced.locator("#validation").scrollIntoViewIfNeeded();
    await reduced
      .locator("#validation")
      .screenshot({ path: "tmp/reduced-motion.png" });
    result.scenarios.push({ reducedMotion: true, status: "PASS" });
    await reduced.close();
    const nojs = await context
      .browser()
      .newContext({
        javaScriptEnabled: false,
        viewport: { width: 1440, height: 1000 },
      });
    const staticPage = await nojs.newPage();
    track(staticPage);
    await staticPage.goto("http://127.0.0.1:3221");
    assert.equal(
      await staticPage.getByRole("heading", { level: 1 }).count(),
      1,
    );
    assert.equal(
      await staticPage
        .getByRole("heading", { name: "Validate again", exact: true })
        .count(),
      1,
    );
    assert.equal(
      await staticPage
        .locator(".workflow-story")
        .getAttribute("data-active-chapter"),
      null,
    );
    await staticPage
      .getByRole("heading", { name: "Research you can verify.", exact: true })
      .scrollIntoViewIfNeeded();
    result.scenarios.push({ javaScriptDisabled: true, status: "PASS" });
    await nojs.close();
    const gpu = await context.newPage();
    track(gpu);
    await gpu.setViewportSize({ width: 1440, height: 1000 });
    await gpu.goto("http://127.0.0.1:3221");
    await gpu.locator(".plasma-container canvas").waitFor();
    await gpu.waitForTimeout(1200);
    assert.equal(
      await gpu.evaluate(() => {
        const c = document.querySelector(".plasma-container canvas");
        const ext = c.getContext("webgl2").getExtension("WEBGL_lose_context");
        if (!ext) return false;
        ext.loseContext();
        setTimeout(() => ext.restoreContext(), 200);
        return true;
      }),
      true,
    );
    await gpu.waitForTimeout(600);
    assert.equal(
      await gpu
        .locator(".plasma-container canvas")
        .evaluate((c) => c.style.visibility),
      "hidden",
    );
    await gpu.emulateMedia({ reducedMotion: "reduce" });
    await gpu.waitForFunction(
      () => !document.querySelector(".plasma-container canvas"),
    );
    result.scenarios.push({
      webglContextLossAndRestoration: true,
      runtimeReducedMotion: true,
      status: "PASS",
    });
    await gpu.close();
    const fallback = await context.newPage();
    track(fallback);
    await fallback.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        return type === "webgl2" || type === "webgl"
          ? null
          : original.call(this, type, ...args);
      };
    });
    await fallback.goto("http://127.0.0.1:3221");
    await fallback.waitForTimeout(500);
    assert.equal(await fallback.locator(".plasma-container canvas").count(), 0);
    assert.equal(await fallback.getByRole("heading", { level: 1 }).count(), 1);
    result.scenarios.push({ webglUnavailable: true, status: "PASS" });
    await fallback.close();
    for (const route of [
      "/api/demo",
      "/api/vn-backtest",
      "/dashboard",
      "/not-a-route",
    ])
      assert.equal((await fetch("http://127.0.0.1:3221" + route)).status, 404);
    assert.deepEqual(result.consoleErrors, []);
    assert.deepEqual(result.pageErrors, []);
    assert.deepEqual(result.externalRequests, []);
    assert.deepEqual(result.privateRequests, []);
    result.boundary404 = true;
  } catch (e) {
    result.failure = e.stack;
    console.error(e.message);
    process.exitCode = 1;
  } finally {
    clearTimeout(deadline);
    result.finished = new Date().toISOString();
    fs.writeFileSync(
      "tmp/browser-results.json",
      JSON.stringify(result, null, 2),
    );
    await context?.close();
  }
})();
