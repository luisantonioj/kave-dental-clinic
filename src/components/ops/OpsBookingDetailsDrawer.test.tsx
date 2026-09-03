import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { OpsBookingDetailsDrawer } from "./OpsBookingDetailsDrawer";
import type { Booking } from "../../types/ops";

const MOCK_BOOKING: Booking = {
  id: "KV-001",
  fullName: "Juan Dela Cruz",
  email: "juan@example.com",
  phone: "0917 123 4567",
  serviceId: "zirconia-veneers",
  serviceName: "Zirconia veneers",
  preferredDate: "2026-09-10",
  preferredTime: "10:00",
  notes: "Upper teeth alignment inquiry",
  status: "pending",
  staffNotes: "Previous notes here",
  createdAt: "2026-09-01T00:00:00Z",
  updatedAt: "2026-09-01T00:00:00Z",
};

describe("OpsBookingDetailsDrawer", () => {
  it("renders booking details when open", () => {
    render(
      <OpsBookingDetailsDrawer
        booking={MOCK_BOOKING}
        isOpen={true}
        onClose={vi.fn()}
        onReschedule={vi.fn()}
        onSaveStaffNotes={vi.fn()}
        onStatusChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Juan Dela Cruz")).toBeInTheDocument();
    expect(screen.getByText("0917 123 4567")).toBeInTheDocument();
    expect(screen.getByText("juan@example.com")).toBeInTheDocument();
    expect(screen.getByText("Zirconia veneers")).toBeInTheDocument();
    expect(
      screen.getByText(/Upper teeth alignment inquiry/),
    ).toBeInTheDocument();
  });

  it("calls onStatusChange with confirmed when clicking Confirm Booking", async () => {
    const user = userEvent.setup();
    const handleStatusChange = vi.fn().mockResolvedValue(undefined);

    render(
      <OpsBookingDetailsDrawer
        booking={MOCK_BOOKING}
        isOpen={true}
        onClose={vi.fn()}
        onReschedule={vi.fn()}
        onSaveStaffNotes={vi.fn()}
        onStatusChange={handleStatusChange}
      />,
    );

    const confirmBtn = screen.getByRole("button", { name: "Confirm Booking" });
    await user.click(confirmBtn);

    expect(handleStatusChange).toHaveBeenCalledWith("KV-001", "confirmed");
  });

  it("calls onSaveStaffNotes when saving staff notes", async () => {
    const user = userEvent.setup();
    const handleSaveNotes = vi.fn().mockResolvedValue(undefined);

    render(
      <OpsBookingDetailsDrawer
        booking={MOCK_BOOKING}
        isOpen={true}
        onClose={vi.fn()}
        onReschedule={vi.fn()}
        onSaveStaffNotes={handleSaveNotes}
        onStatusChange={vi.fn()}
      />,
    );

    const textarea = screen.getByLabelText(/Internal Staff Notes/i);
    await user.clear(textarea);
    await user.type(textarea, "Patient called back.");

    const saveBtn = screen.getByRole("button", { name: "Save Notes" });
    await user.click(saveBtn);

    expect(handleSaveNotes).toHaveBeenCalledWith(
      "KV-001",
      "Patient called back.",
    );
  });
});
