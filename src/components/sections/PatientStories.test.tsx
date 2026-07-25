import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { PatientStory } from "../../content/transformations";
import { PatientStories } from "./PatientStories";

const TEST_STORIES = [
  {
    id: "approved-story-one",
    title: "Approved test story one",
    summary: "First test-only approved story.",
    treatment: "Test treatment one",
    status: "approved",
    consentReference: "consent:test-story-one",
  },
  {
    id: "approved-story-two",
    title: "Approved test story two",
    summary: "Second test-only approved story.",
    treatment: "Test treatment two",
    status: "approved",
    consentReference: "consent:test-story-two",
  },
  {
    id: "pending-story",
    title: "Pending test story",
    summary: "Pending test summary.",
    treatment: "Pending test treatment",
    status: "pending-approval",
  },
] as const satisfies readonly PatientStory[];

describe("PatientStories", () => {
  it("handles multiple approved text-only stories without exposing consent references", () => {
    render(<PatientStories records={TEST_STORIES} />);

    expect(
      screen.getByRole("list", { name: "2 approved patient stories" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Approved test story one" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Approved test story two" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Pending test story")).not.toBeInTheDocument();
    expect(screen.queryByText(/consent:test-story/)).not.toBeInTheDocument();
  });

  it("renders no fabricated cards when no story is approved", () => {
    render(<PatientStories records={[]} />);

    expect(screen.getByTestId("patient-stories-empty-state")).toHaveTextContent(
      "No patient stories are approved for publication yet.",
    );
    expect(
      screen.queryByRole("list", { name: /approved patient/ }),
    ).not.toBeInTheDocument();
  });
});
