import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ApprovedLaboratoryStory } from "../../content/services-page";
import { LaboratoryStory } from "./LaboratoryStory";

describe("LaboratoryStory", () => {
  it("renders a safe state when no story is approved", () => {
    render(<LaboratoryStory />);

    expect(
      screen.getByRole("heading", {
        name: "Information awaiting clinic approval",
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("laboratory-empty-state")).toHaveTextContent(
      "are not presented as current services until the clinic verifies them",
    );
  });

  it("renders a supplied approved story without the empty state", () => {
    const story = {
      status: "approved",
      heading: "Approved test story",
      description: "Test-only approved process information.",
      details: ["Test-only approved detail"],
    } as const satisfies ApprovedLaboratoryStory;

    render(<LaboratoryStory story={story} />);

    expect(
      screen.getByRole("heading", { name: "Approved test story" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Test-only approved process information."),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("laboratory-empty-state"),
    ).not.toBeInTheDocument();
  });
});
