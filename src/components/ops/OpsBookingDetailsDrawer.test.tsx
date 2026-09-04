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

  it("renders posted notes and calls onAddStaffNote when submitting new note", async () => {
    const user = userEvent.setup();
    const handleAddNote = vi.fn().mockResolvedValue(undefined);

    const bookingWithNotes: Booking = {
      ...MOCK_BOOKING,
      internalNotes: [
        {
          id: "note-1",
          text: "Existing first note",
          createdAt: "2026-09-01T12:00:00Z",
        },
      ],
    };

    render(
      <OpsBookingDetailsDrawer
        booking={bookingWithNotes}
        isOpen={true}
        onAddStaffNote={handleAddNote}
        onClose={vi.fn()}
        onReschedule={vi.fn()}
        onStatusChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Existing first note")).toBeInTheDocument();

    const textarea = screen.getByLabelText(/Internal Staff Notes/i);
    await user.type(textarea, "New follow up entry");

    const saveBtn = screen.getByRole("button", { name: "Save Notes" });
    await user.click(saveBtn);

    expect(handleAddNote).toHaveBeenCalledWith("KV-001", "New follow up entry");
    expect(textarea).toHaveValue("");
  });

  it("allows editing an existing posted staff note", async () => {
    const user = userEvent.setup();
    const handleUpdateNote = vi.fn().mockResolvedValue(undefined);

    const bookingWithNotes: Booking = {
      ...MOCK_BOOKING,
      internalNotes: [
        {
          id: "note-1",
          text: "Original note text",
          createdAt: "2026-09-01T12:00:00Z",
        },
      ],
    };

    render(
      <OpsBookingDetailsDrawer
        booking={bookingWithNotes}
        isOpen={true}
        onClose={vi.fn()}
        onReschedule={vi.fn()}
        onStatusChange={vi.fn()}
        onUpdateStaffNote={handleUpdateNote}
      />,
    );

    const editBtn = screen.getByRole("button", { name: "Edit note" });
    await user.click(editBtn);

    const editTextarea = screen.getByLabelText("Edit note text");
    expect(editTextarea).toHaveValue("Original note text");

    await user.clear(editTextarea);
    await user.type(editTextarea, "Updated note text");

    const saveEditBtn = screen.getByRole("button", { name: "Save" });
    await user.click(saveEditBtn);

    expect(handleUpdateNote).toHaveBeenCalledWith(
      "KV-001",
      "note-1",
      "Updated note text",
    );
  });

  it("calls onDeleteStaffNote when clicking delete", async () => {
    const user = userEvent.setup();
    const handleDeleteNote = vi.fn().mockResolvedValue(undefined);

    const bookingWithNotes: Booking = {
      ...MOCK_BOOKING,
      internalNotes: [
        {
          id: "note-1",
          text: "Note to delete",
          createdAt: "2026-09-01T12:00:00Z",
        },
      ],
    };

    render(
      <OpsBookingDetailsDrawer
        booking={bookingWithNotes}
        isOpen={true}
        onClose={vi.fn()}
        onDeleteStaffNote={handleDeleteNote}
        onReschedule={vi.fn()}
        onStatusChange={vi.fn()}
      />,
    );

    const deleteBtn = screen.getByRole("button", { name: "Delete note" });
    await user.click(deleteBtn);

    expect(handleDeleteNote).toHaveBeenCalledWith("KV-001", "note-1");
  });

  it("renders quick actions with proper buttons for confirmed status", () => {
    const confirmedBooking: Booking = {
      ...MOCK_BOOKING,
      status: "confirmed",
    };

    render(
      <OpsBookingDetailsDrawer
        booking={confirmedBooking}
        isOpen={true}
        onClose={vi.fn()}
        onReschedule={vi.fn()}
        onStatusChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Mark Completed" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reschedule" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});
