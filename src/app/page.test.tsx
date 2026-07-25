import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage, { metadata } from "./page";

describe("HomePage", () => {
  it("renders the verified tagline as the page heading", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Your ticket to a picture-perfect smile",
      }),
    ).toBeInTheDocument();
  });

  it("defines accurate route-specific metadata", () => {
    expect(metadata).toMatchObject({
      title: "Kave Dental Clinic | Services and Contact",
      description:
        "Explore Kave Dental Clinic services, approved transformation content, and verified Quezon City contact details.",
    });
  });
});
