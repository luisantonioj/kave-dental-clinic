import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TransformationsPage, { metadata } from "./page";

const UNAPPROVED_FIGMA_CONTENT =
  /smiles of the week|complete rejuvenation|10-shade|perfect structural alignment|real patients, real results|Clarissa M\.|Jonathan D\.|Sophia L\.|Marcus Rivera|award-winning|installment plans|within 24 hours/i;

describe("TransformationsPage", () => {
  it("renders one qualified heading, approved transformation records, and stories", () => {
    const { container } = render(<TransformationsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Transformation gallery",
      }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByTestId("transformation-gallery")).toBeInTheDocument();
    expect(screen.getByTestId("patient-stories")).toBeInTheDocument();
    expect(screen.getByTestId("social-feed")).toBeInTheDocument();
    expect(screen.getAllByRole("article").length).toBeGreaterThanOrEqual(8);
  });

  it("offers only a static booking link and collects no personal information", () => {
    render(<TransformationsPage />);

    expect(
      screen.getByRole("link", { name: "Explore booking" }),
    ).toHaveAttribute("href", "/booking");
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("omits the unapproved Figma stories, claims, and identities", () => {
    const { container } = render(<TransformationsPage />);

    expect(container).not.toHaveTextContent(UNAPPROVED_FIGMA_CONTENT);
  });

  it("defines accurate route-specific metadata", () => {
    expect(metadata).toMatchObject({
      title: "Transformation Gallery | Kave Dental Clinic",
      description:
        "View consented transformation content and curated official social posts from Kave Dental Clinic.",
    });
  });
});
