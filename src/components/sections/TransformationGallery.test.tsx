import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Transformation } from "../../content/transformations";
import { TransformationGallery } from "./TransformationGallery";

const TEST_RECORDS = [
  {
    id: "approved-test",
    title: "Approved test transformation",
    treatment: "Test treatment",
    status: "approved",
    consentReference: "consent:test-gallery",
    image: {
      src: "/approved/test-transformation.webp",
      alt: "Test-only consented transformation record",
      width: 900,
      height: 1200,
    },
  },
  {
    id: "pending-test",
    title: "Pending test transformation",
    treatment: "Pending test treatment",
    status: "pending-approval",
  },
] as const satisfies readonly Transformation[];

describe("TransformationGallery", () => {
  it("renders only consented records with purposeful image text", () => {
    render(<TransformationGallery records={TEST_RECORDS} />);

    expect(
      screen.getByRole("img", {
        name: "Test-only consented transformation record",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Approved test transformation",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Pending test transformation"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("consent:test-gallery")).not.toBeInTheDocument();
  });

  it("renders a safe state when no transformation is approved", () => {
    render(<TransformationGallery records={[]} />);

    expect(
      screen.getByTestId("transformation-gallery-empty-state"),
    ).toHaveTextContent(
      "No transformation media is approved for publication yet",
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
