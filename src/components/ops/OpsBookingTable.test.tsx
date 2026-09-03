import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { OpsBookingTable } from "./OpsBookingTable";
import type { Booking } from "../../types/ops";

const TEST_BOOKINGS: Booking[] = [
  {
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
    createdAt: "2026-09-01T00:00:00Z",
    updatedAt: "2026-09-01T00:00:00Z",
  },
  {
    id: "KV-002",
    fullName: "Ana Santos",
    email: "ana@example.com",
    phone: "0918 987 6543",
    serviceId: "teeth-whitening",
    serviceName: "Teeth whitening",
    preferredDate: "2026-09-11",
    preferredTime: "14:00",
    notes: "",
    status: "confirmed",
    createdAt: "2026-09-01T00:00:00Z",
    updatedAt: "2026-09-01T00:00:00Z",
  },
];

describe("OpsBookingTable", () => {
  it("renders booking rows with patient names and services", () => {
    render(
      <OpsBookingTable bookings={TEST_BOOKINGS} onSelectBooking={vi.fn()} />,
    );

    expect(screen.getAllByText("Juan Dela Cruz").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ana Santos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Zirconia veneers").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Teeth whitening").length).toBeGreaterThan(0);
  });

  it("calls onSelectBooking when clicking a booking", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <OpsBookingTable
        bookings={TEST_BOOKINGS}
        onSelectBooking={handleSelect}
      />,
    );

    const viewButtons = screen.getAllByRole("button", { name: "View" });
    await user.click(viewButtons[0]);

    expect(handleSelect).toHaveBeenCalledWith(TEST_BOOKINGS[0]);
  });

  it("renders an empty state when no bookings exist", () => {
    render(<OpsBookingTable bookings={[]} onSelectBooking={vi.fn()} />);
    expect(screen.getByText("No bookings found")).toBeInTheDocument();
  });
});
