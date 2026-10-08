import { describe, it, expect } from "vitest";
import { landingIdentity, workflow, roadmap } from "./landingContent";
describe("truthful landing identity", () => {
  it("keeps a brand preview without pretending an email is configured", () => {
    expect(landingIdentity().brand).toBe("AI Backtest Lab");
    expect(landingIdentity().email).toBeNull();
    expect(workflow[3].status).toContain("Planned");
    expect(roadmap).toHaveLength(4);
  });
  it("refuses a release without a verified identity or domain email", () => {
    expect(() => landingIdentity({ LANDING_RELEASE: "1" })).toThrow();
    expect(() =>
      landingIdentity({
        LANDING_RELEASE: "1",
        LANDING_FOUNDER: "Owner",
        LANDING_CONTACT_EMAIL: "owner@example.com",
      }),
    ).toThrow();
  });
  it("accepts only an HTTPS origin and valid contact address", () => {
    expect(() =>
      landingIdentity({ LANDING_DOMAIN: "http://localhost" }),
    ).toThrow();
    expect(() =>
      landingIdentity({ LANDING_CONTACT_EMAIL: "x\n@example.com" }),
    ).toThrow();
  });
});
