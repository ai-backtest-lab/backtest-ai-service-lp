import { describe, it, expect } from "vitest";
import { landingIdentity, workflow, roadmap } from "./landingContent";
describe("public website configuration", () => {
  it("contains exactly the operator-provided public identity and contact addresses", () => {
    expect(landingIdentity()).toMatchObject({
      brand: "AI Backtest Lab",
      domain: "https://aibacktestlab.com",
      email: "founder@aibacktestlab.com",
      supportEmail: "support@aibacktestlab.com",
      release: true,
      founder: "Nguyen Thanh Dat",
    });
  });
  it("keeps unimplemented AI and roadmap goals distinct from available features", () => {
    expect(workflow[5].status).toContain("Planned");
    expect(roadmap).toHaveLength(4);
  });
});
