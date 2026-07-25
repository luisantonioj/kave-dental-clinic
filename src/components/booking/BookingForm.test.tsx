import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  BookingForm,
  type BookingFormValues,
  validateBookingValues,
} from "./BookingForm";

const VALID_VALUES: BookingFormValues = {
  fullName: "Test Visitor",
  email: "visitor@example.com",
  phone: "+63 912 345 6789",
  serviceId: "zirconia-veneers",
  preferredDate: "2030-05-20",
  preferredTime: "10:30",
  notes: "Test-only note.",
};

describe("validateBookingValues", () => {
  it("returns associated errors for incomplete values", () => {
    expect(
      validateBookingValues({
        fullName: "",
        email: "invalid",
        phone: "123",
        serviceId: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
      }),
    ).toEqual({
      fullName: "Enter your full name.",
      email: "Enter a valid email address.",
      phone: "Enter a phone number with at least 10 digits.",
      serviceId: "Choose a service to discuss.",
      preferredDate: "Choose a preferred date.",
      preferredTime: "Choose a preferred time.",
    });
  });

  it("accepts complete presentation-only values", () => {
    expect(validateBookingValues(VALID_VALUES)).toEqual({});
  });
});

describe("BookingForm", () => {
  it("provides persistent labels, descriptions, and useful autocomplete values", () => {
    render(<BookingForm />);

    expect(screen.getByLabelText("Full name")).toHaveAttribute(
      "autocomplete",
      "name",
    );
    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "autocomplete",
      "email",
    );
    expect(screen.getByLabelText("Phone number")).toHaveAttribute(
      "autocomplete",
      "tel",
    );
    expect(
      screen.getByLabelText("Service to discuss"),
    ).toHaveAccessibleDescription(
      "This is a discussion preference, not a treatment selection.",
    );
    expect(screen.getByLabelText("Preferred date")).toHaveAccessibleDescription(
      "A preference only; availability is not shown or reserved.",
    );
    expect(screen.getByLabelText("Notes (optional)")).toHaveAttribute(
      "maxlength",
      "500",
    );
  });

  it("announces validation errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    await user.click(
      screen.getByRole("button", { name: "Check booking details" }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "No information was sent.",
    );
    expect(screen.getByLabelText("Full name")).toHaveAccessibleErrorMessage(
      "Enter your full name.",
    );
    await waitFor(() => {
      expect(screen.getByLabelText("Full name")).toHaveFocus();
    });
  });

  it("shows the coming-soon result without claiming an appointment exists", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    await user.type(screen.getByLabelText("Full name"), VALID_VALUES.fullName);
    await user.type(screen.getByLabelText("Email address"), VALID_VALUES.email);
    await user.type(screen.getByLabelText("Phone number"), VALID_VALUES.phone);
    await user.selectOptions(
      screen.getByLabelText("Service to discuss"),
      VALID_VALUES.serviceId,
    );
    fireEvent.change(screen.getByLabelText("Preferred date"), {
      target: { value: VALID_VALUES.preferredDate },
    });
    fireEvent.change(screen.getByLabelText("Preferred time"), {
      target: { value: VALID_VALUES.preferredTime },
    });
    await user.type(
      screen.getByLabelText("Notes (optional)"),
      VALID_VALUES.notes,
    );
    await user.click(
      screen.getByRole("button", { name: "Check booking details" }),
    );

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Online booking is coming soon.");
    expect(status).toHaveTextContent("No appointment was created");
    expect(status).toHaveTextContent("your details were not sent");
    await waitFor(() => {
      expect(status).toHaveFocus();
    });
  });

  it("starts with empty memory state when remounted", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<BookingForm />);

    await user.type(screen.getByLabelText("Full name"), "Temporary value");
    unmount();
    render(<BookingForm />);

    expect(screen.getByLabelText("Full name")).toHaveValue("");
  });
});
