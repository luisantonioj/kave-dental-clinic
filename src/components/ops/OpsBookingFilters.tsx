import type { BookingFilters, BookingStatus } from "../../types/ops";
import { BOOKING_SERVICE_OPTIONS } from "../../content/booking";

interface OpsBookingFiltersProps {
  filters: BookingFilters;
  onChange: (filters: BookingFilters) => void;
  onReset: () => void;
}

const STATUS_OPTIONS: Array<{ value: BookingStatus | "all"; label: string }> = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export function OpsBookingFilters({
  filters,
  onChange,
  onReset,
}: OpsBookingFiltersProps) {
  const hasActiveFilters =
    Boolean(filters.searchQuery) ||
    Boolean(filters.status && filters.status !== "all") ||
    Boolean(filters.serviceId && filters.serviceId !== "all") ||
    Boolean(filters.date);

  return (
    <div className="rounded-card border border-border bg-surface-raised p-cluster">
      <div className="grid gap-cluster sm:grid-cols-2 lg:grid-cols-4">
        {/* Search Query */}
        <div>
          <label
            className="block text-label font-bold uppercase tracking-label text-text-muted"
            htmlFor="searchQuery"
          >
            Search patient / ID
          </label>
          <input
            className="mt-inline min-h-[2.5rem] w-full rounded-control border border-border bg-surface px-cluster text-body text-text placeholder:text-text-muted focus:border-action focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus"
            id="searchQuery"
            onChange={(e) =>
              onChange({ ...filters, searchQuery: e.target.value })
            }
            placeholder="Search by name, phone, email, or ID..."
            type="text"
            value={filters.searchQuery || ""}
          />
        </div>

        {/* Status Filter */}
        <div>
          <label
            className="block text-label font-bold uppercase tracking-label text-text-muted"
            htmlFor="statusFilter"
          >
            Status
          </label>
          <select
            className="mt-inline min-h-[2.5rem] w-full rounded-control border border-border bg-surface px-cluster text-body text-text focus:border-action focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus"
            id="statusFilter"
            onChange={(e) =>
              onChange({
                ...filters,
                status: e.target.value as BookingStatus | "all",
              })
            }
            value={filters.status || "all"}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Service Filter */}
        <div>
          <label
            className="block text-label font-bold uppercase tracking-label text-text-muted"
            htmlFor="serviceFilter"
          >
            Service
          </label>
          <select
            className="mt-inline min-h-[2.5rem] w-full rounded-control border border-border bg-surface px-cluster text-body text-text focus:border-action focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus"
            id="serviceFilter"
            onChange={(e) =>
              onChange({ ...filters, serviceId: e.target.value })
            }
            value={filters.serviceId || "all"}
          >
            <option value="all">All Services</option>
            {BOOKING_SERVICE_OPTIONS.map((svc) => (
              <option key={svc.value} value={svc.value}>
                {svc.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label
            className="block text-label font-bold uppercase tracking-label text-text-muted"
            htmlFor="dateFilter"
          >
            Appointment Date
          </label>
          <div className="flex items-center gap-inline">
            <input
              className="mt-inline min-h-[2.5rem] w-full rounded-control border border-border bg-surface px-cluster text-body text-text focus:border-action focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus"
              id="dateFilter"
              onChange={(e) => onChange({ ...filters, date: e.target.value })}
              type="date"
              value={filters.date || ""}
            />
            {filters.date ? (
              <button
                aria-label="Clear date filter"
                className="mt-inline rounded-control border border-border px-inline py-1 text-label text-text-muted hover:text-text"
                onClick={() => onChange({ ...filters, date: undefined })}
                type="button"
              >
                ✕
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {hasActiveFilters ? (
        <div className="mt-cluster flex items-center justify-between border-t border-border pt-inline text-label">
          <span className="text-text-muted">Active filters applied</span>
          <button
            className="font-bold text-action-contrast underline dark:text-action"
            onClick={onReset}
            type="button"
          >
            Clear all filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
