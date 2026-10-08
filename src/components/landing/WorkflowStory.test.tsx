import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { WorkflowStory } from "./WorkflowStory";
import { workflow } from "@/lib/landingContent";
afterEach(cleanup);
it("shows every workflow step together without scroll-progress controls", () => {
  render(<WorkflowStory />);
  for (const step of workflow)
    expect(
      screen.getByRole("heading", { name: step.title, level: 3 }),
    ).toBeVisible();
  expect(screen.queryAllByRole("button")).toHaveLength(0);
});
