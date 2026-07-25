import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ApprovedTransformation } from "../../content/transformations";
import { TransformationPreview } from "./TransformationPreview";

const APPROVED_TRANSFORMATION = {
  id: "approved-test",
  title: "Approved test transformation",
  treatment: "Test treatment",
  status: "approved",
  consentReference: "consent:test-reference",
  image: {
    src: "/approved/transformation.webp",
    alt: "Test-only consented transformation image",
    width: 900,
    height: 1200,
  },
} as const satisfies ApprovedTransformation;

describe("TransformationPreview", () => {
  it("renders consented records without exposing the consent reference", () => {
    render(
      <TransformationPreview transformations={[APPROVED_TRANSFORMATION]} />,
    );

    expect(
      screen.getByRole("img", {
        name: APPROVED_TRANSFORMATION.image.alt,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "View all approved transformations",
      }),
    ).toHaveAttribute("href", "/transformations");
    expect(
      screen.queryByText(APPROVED_TRANSFORMATION.consentReference),
    ).not.toBeInTheDocument();
  });

  it("renders a safe empty state without fabricated imagery", () => {
    render(<TransformationPreview transformations={[]} />);

    expect(
      screen.getByText(
        "No transformation media is approved for publication yet.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Gallery information",
      }),
    ).toHaveAttribute("href", "/transformations");
  });
});
