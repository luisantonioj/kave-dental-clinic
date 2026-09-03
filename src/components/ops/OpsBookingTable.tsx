import type { Booking, BookingStatus } from "../../types/ops";

interface OpsBookingTableProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
  selectedBookingId?: string | null;
}

export function getStatusBadgeClasses(status: BookingStatus): string {
  switch (status) {
    case "pending":
      return "bg-warning/15 text-warning border-warning/30";
    case "confirmed":
      return "bg-action/20 text-text font-bold border-action/40";
    case "completed":
      return "bg-success/15 text-success border-success/30";
    case "cancelled":
      return "bg-disabled/15 text-text-muted border-border";
    default:
      return "bg-surface border-border text-text";
  }
}

export function OpsBookingTable({
  bookings,
  onSelectBooking,
  selectedBookingId,
}: OpsBookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border bg-surface-raised p-card-y text-center">
        <p className="text-lead font-bold text-text">No bookings found</p>
        <p className="mt-inline text-body text-text-muted">
          Try adjusting your search query, status, service, or date filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface-raised">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-body">
          <thead className="border-b border-border bg-surface text-label font-bold uppercase tracking-label text-text-muted">
            <tr>
              <th className="px-cluster py-control-y">Patient & ID</th>
              <th className="px-cluster py-control-y">Contact</th>
              <th className="px-cluster py-control-y">Service</th>
              <th className="px-cluster py-control-y">Schedule</th>
              <th className="px-cluster py-control-y">Status</th>
              <th className="px-cluster py-control-y text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings.map((booking) => {
              const isSelected = selectedBookingId === booking.id;

              return (
                <tr
                  className={`cursor-pointer transition-colors hover:bg-surface/60 ${
                    isSelected ? "bg-action/10" : ""
                  }`}
                  key={booking.id}
                  onClick={() => onSelectBooking(booking)}
                >
                  <td className="px-cluster py-cluster">
                    <div className="font-bold text-text">
                      {booking.fullName}
                    </div>
                    <div className="font-mono text-[0.75rem] text-text-muted">
                      {booking.id}
                    </div>
                  </td>
                  <td className="px-cluster py-cluster">
                    <div className="text-text">{booking.phone}</div>
                    <div className="text-text-muted text-[0.875rem]">
                      {booking.email}
                    </div>
                  </td>
                  <td className="px-cluster py-cluster">
                    <span className="inline-block rounded-control bg-surface px-inline py-0.5 text-label font-medium text-text border border-border">
                      {booking.serviceName}
                    </span>
                  </td>
                  <td className="px-cluster py-cluster">
                    <div className="font-medium text-text">
                      {booking.preferredDate}
                    </div>
                    <div className="text-[0.875rem] text-text-muted">
                      {booking.preferredTime}
                    </div>
                  </td>
                  <td className="px-cluster py-cluster">
                    <span
                      className={`inline-block rounded-pill border px-inline py-0.5 text-label uppercase tracking-label ${getStatusBadgeClasses(
                        booking.status,
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-cluster py-cluster text-right">
                    <button
                      className="rounded-control border border-border bg-surface px-cluster py-inline text-label font-bold uppercase tracking-label text-text hover:bg-action hover:text-action-contrast focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectBooking(booking);
                      }}
                      type="button"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (< 768px) */}
      <div className="divide-y divide-border md:hidden">
        {bookings.map((booking) => (
          <div
            className="p-cluster transition-colors hover:bg-surface/50"
            key={booking.id}
            onClick={() => onSelectBooking(booking)}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-start justify-between gap-inline">
              <div>
                <span className="font-mono text-[0.75rem] text-text-muted">
                  {booking.id}
                </span>
                <h3 className="text-lead font-bold text-text">
                  {booking.fullName}
                </h3>
              </div>
              <span
                className={`rounded-pill border px-inline py-0.5 text-label uppercase tracking-label ${getStatusBadgeClasses(
                  booking.status,
                )}`}
              >
                {booking.status}
              </span>
            </div>

            <div className="mt-inline flex flex-wrap items-center gap-inline text-[0.875rem] text-text-muted">
              <span>{booking.serviceName}</span>
              <span>•</span>
              <span className="font-medium text-text">
                {booking.preferredDate} at {booking.preferredTime}
              </span>
            </div>

            <div className="mt-inline flex items-center justify-between pt-inline text-label">
              <span className="text-text-muted">{booking.phone}</span>
              <span className="font-bold text-action-contrast underline dark:text-action">
                Manage Details →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
