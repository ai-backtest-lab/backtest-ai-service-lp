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
      "Backtest with Data.",
    );
    expect(
      screen.getByText(
        "Claude API integration is planned and is not yet available in the current product.",
      ),
    ).toBeVisible();
    expect(
      screen
        .getAllByRole("link")
        .some((a) => a.getAttribute("href")?.startsWith("/api")),
    ).toBe(false);
    expect(screen.queryByRole("link", { name: "Open dashboard" })).toBeNull();
    expect(screen.getByRole("link", { name: /founder@/ })).toHaveAttribute(
      "href",
      "mailto:founder@aibacktestlab.com",
    );
  });
  it("provides founder and support actions without a contact form or extra section", () => {
    const { container } = render(<LandingPage identity={landingIdentity()} />);
    expect(screen.getByRole("link", { name: "Contact us" })).toHaveAttribute(
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
    expect(container.querySelectorAll("main > section")).toHaveLength(10);
    expect(container.querySelector("form")).toBeNull();
  });
});
