// Routes the Research Lab's same-origin API calls to the isolated media Research API.
// The UI is unchanged; only /api/research/* is answered by the media stack (research__media).
export const MEDIA_API = process.env.MEDIA_RESEARCH_API ?? "http://127.0.0.1:8021";

export async function routeResearchToMedia(page) {
  await page.route("**/api/research/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const path = url.pathname.replace(/^\/api\/research\//, "");
    const response = await fetch(`${MEDIA_API}/api/v1/${path}${url.search}`, {
      method: request.method(),
      headers: { "Content-Type": "application/json", "X-Research-Actor": "media" },
      body: request.method() === "POST" ? request.postData() ?? "{}" : undefined,
    });
    await route.fulfill({
      status: response.status,
      contentType: "application/json",
      body: await response.text(),
    });
  });
  // Nothing else may reach a backend that serves real market data.
  await page.route("**/api/**", (route) =>
    route.request().url().includes("/api/research/") ? route.fallback() : route.abort(),
  );
}
