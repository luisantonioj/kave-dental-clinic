import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CLINIC_DETAILS } from "../../content/clinic";
import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  it("renders only verified clinic and contact information", () => {
    render(<SiteFooter />);

    expect(screen.getByText(CLINIC_DETAILS.hours)).toBeInTheDocument();
    expect(screen.getByText(CLINIC_DETAILS.address)).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: CLINIC_DETAILS.phoneDisplay,
      }),
    ).toHaveAttribute("href", CLINIC_DETAILS.phoneHref);
    expect(
      screen.getByRole("link", {
        name: /Instagram @kavedentalclinic/i,
      }),
    ).toHaveAttribute("href", CLINIC_DETAILS.instagramUrl);
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      CLINIC_DETAILS.facebookUrl,
    );

    expect(
      screen.queryByText(/newsletter|privacy policy|terms of service/i),
    ).not.toBeInTheDocument();
  });
});
