import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BookingPage, { metadata } from "./page";

const UNAPPROVED_BOOKING_CONTENT =
  /confirm appointment|Dr\. Karen Velasco|Dr\. Marcus Sy|Dr\. Arlene Chua|hello@|est\. 2024|flagship clinic|boutique lounge|Lot 15 Block 2/i;

describe("BookingPage", () => {
  it("renders one accurate heading and the verified clinic information", () => {
    const { container } = render(<BookingPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Explore booking" }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(
      screen.getAllByText("128 Mindanao Avenue, Tandang Sora, Quezon City"),
    ).toHaveLength(2);
    expect(screen.getAllByText("Open daily, 10:00 AM–7:00 PM")).toHaveLength(2);
  });

  it("uses a non-submitting form with no action attribute", () => {
    render(<BookingPage />);

    const form = screen.getByTestId("booking-form");
    expect(form).not.toHaveAttribute("action");
    expect(
      screen.getByRole("button", { name: "Check booking details" }),
    ).toHaveAttribute("type", "submit");
    expect(
      screen.getByText(
        "This demonstration does not submit, send, save, or reserve anything.",
      ),
    ).toBeInTheDocument();
  });

  it("omits conflicting and unverified Figma content", () => {
    const { container } = render(<BookingPage />);

    expect(container).not.toHaveTextContent(UNAPPROVED_BOOKING_CONTENT);
  });

  it("defines accurate route-specific metadata", () => {
    expect(metadata).toMatchObject({
      title: "Explore Booking | Kave Dental Clinic",
      description:
        "Explore Kave Dental Clinic's non-submitting booking fields and use verified Quezon City contact information.",
    });
  });
});
