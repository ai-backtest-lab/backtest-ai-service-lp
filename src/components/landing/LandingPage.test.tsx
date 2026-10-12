import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { LandingPage } from "./LandingPage";
import { landingIdentity } from "@/lib/landingContent";
vi.mock("./LandingMotion", () => ({
  LandingMotion: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock("./WorkflowStory", () => ({
  WorkflowStory: () => <div>Workflow chapters</div>,
}));
vi.mock("./ClaudeStory", () => ({
  ClaudeStory: () => <div>Planned Claude report concept</div>,
}));
vi.mock("./HeroAtmosphere", () => ({ HeroAtmosphere: () => null }));
vi.mock("./effects/MaskedHeading", () => ({
  default: ({ text }: { text: string }) => <h2>{text}</h2>,
}));
afterEach(cleanup);
describe("truthful standalone landing", () => {
  it("renders the brand, planned AI and meaningful CTA without a trading endpoint", () => {
    render(<LandingPage identity={landingIdentity()} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Quantitative Research for Individuals & Teams.",
    );
    expect(
      screen.getByText(
        "Planned model: Claude by Anthropic, used through the Claude API. Not integrated yet.",
      ),
    ).toBeVisible();
    expect(
      screen
        .getAllByRole("link")
        .some((a) => a.getAttribute("href")?.startsWith("/api")),
    ).toBe(false);
    expect(screen.queryByRole("link", { name: "Open dashboard" })).toBeNull();
    expect(
      screen.getAllByRole("link", { name: /interactive demo/i }),
    ).not.toHaveLength(0);
    for (const link of screen.getAllByRole("link", {
      name: /interactive demo/i,
    })) {
      expect(link).toHaveAttribute("href", "https://demo.aibacktestlab.com/");
    }
    for (const link of screen.getAllByRole("link", { name: /founder@/ }))
      expect(link).toHaveAttribute("href", "mailto:founder@aibacktestlab.com");
  });
  it("provides founder and support actions without a contact form or extra section", () => {
    const { container } = render(<LandingPage identity={landingIdentity()} />);
    expect(
      screen.getByRole("link", { name: "Discuss Research Needs" }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:founder@aibacktestlab.com"),
    );
    expect(screen.getByRole("link", { name: "Get support" })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:support@aibacktestlab.com"),
    );
    expect(
      screen.getByRole("link", { name: /support@aibacktestlab.com/ }),
    ).toHaveAttribute("href", "mailto:support@aibacktestlab.com");
    expect(
      [...container.querySelectorAll("main > section")].map((s) => s.id),
    ).toEqual([
      "top",
      "audience",
      "problem",
      "product",
      "capabilities",
      "ai",
      "validation",
      "architecture",
      "roadmap",
      "about",
      "contact",
    ]);
    expect(container.querySelector("form")).toBeNull();
  });
});
