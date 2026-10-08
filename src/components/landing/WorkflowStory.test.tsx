import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { WorkflowStory } from "./WorkflowStory";
const state = vi.hoisted(() => ({ revert: () => {} }));
vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    killTweensOf: vi.fn(),
    utils: {
      toArray: (selector: string, root: Element) =>
        Array.from(root.querySelectorAll(selector)),
    },
    to: (element: HTMLElement, options: { autoAlpha: number }) => {
      element.style.opacity = String(options.autoAlpha);
      element.style.visibility = options.autoAlpha ? "visible" : "hidden";
    },
    matchMedia: () => ({
      add: (_query: string, callback: () => () => void) => {
        state.revert = callback();
      },
      revert: () => state.revert(),
    }),
  },
}));
vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { create: () => ({ start: 0, end: 1000 }) },
}));
afterEach(cleanup);
it("restores every chapter to readable linear content when desktop pinning is removed", () => {
  render(<WorkflowStory />);
  expect(screen.queryByRole("heading", { name: "Validate again" })).toBeNull();
  state.revert();
  expect(screen.getByRole("heading", { name: "Validate again" })).toBeVisible();
  expect(
    screen.getByRole("heading", { name: "Define strategy" }),
  ).toBeVisible();
});
