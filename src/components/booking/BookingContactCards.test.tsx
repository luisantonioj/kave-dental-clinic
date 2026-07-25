import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CLINIC_DETAILS } from "../../content/clinic";
import { BookingContactCards } from "./BookingContactCards";

describe("BookingContactCards", () => {
  it("renders only verified shared clinic details", () => {
    render(<BookingContactCards />);

    expect(screen.getByText(CLINIC_DETAILS.hours)).toBeInTheDocument();
    expect(screen.getByText(CLINIC_DETAILS.address)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: CLINIC_DETAILS.phoneDisplay }),
    ).toHaveAttribute("href", CLINIC_DETAILS.phoneHref);
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      CLINIC_DETAILS.instagramUrl,
    );
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      CLINIC_DETAILS.facebookUrl,
    );
  });
});
