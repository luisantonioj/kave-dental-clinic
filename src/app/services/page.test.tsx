import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ServicesPage, { metadata } from "./page";

const UNSUPPORTED_SERVICE_CLAIMS =
  /chip-proof|decades-long|perfect fit|48-hour|same-day|master ceramist|in-house lab|10\+|ready for perfection/i;

describe("ServicesPage", () => {
  it("renders a single qualified page heading and the complete route sections", () => {
    const { container } = render(<ServicesPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Zirconia and featured dental services",
      }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "All Services",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Topics for a veneer consultation",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Four points to discuss",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Information awaiting clinic approval",
      }),
    ).toBeInTheDocument();
  });

  it("links both calls to action to the static booking route", () => {
    render(<ServicesPage />);

    const bookingLinks = screen.getAllByRole("link", {
      name: "Explore booking",
    });

    expect(bookingLinks).toHaveLength(2);
    for (const link of bookingLinks) {
      expect(link).toHaveAttribute("href", "/booking");
    }
  });

  it("does not render unsupported service or laboratory claims", () => {
    const { container } = render(<ServicesPage />);

    expect(container).not.toHaveTextContent(UNSUPPORTED_SERVICE_CLAIMS);
  });

  it("defines accurate route-specific metadata", () => {
    expect(metadata).toMatchObject({
      title: "Dental Services | Kave Dental Clinic",
      description:
        "Explore featured dental service information from Kave Dental Clinic and topics to discuss during an individual consultation.",
    });
  });
});
