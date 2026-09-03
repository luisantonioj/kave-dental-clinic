import type { OpsSummaryMetrics } from "../../types/ops";

interface OpsMetricCardsProps {
  metrics: OpsSummaryMetrics;
  selectedStatus?: string;
  onSelectStatus?: (
    status: "all" | "pending" | "confirmed" | "completed" | "cancelled",
  ) => void;
}

export function OpsMetricCards({
  metrics,
  selectedStatus = "all",
  onSelectStatus,
}: OpsMetricCardsProps) {
  const cards = [
    {
      id: "all" as const,
      label: "Total Bookings",
      count: metrics.total,
      badgeColor: "bg-surface-raised border-border text-text",
      hint: "All recorded inquiries",
    },
    {
      id: "pending" as const,
      label: "Pending Review",
      count: metrics.pending,
      badgeColor: "bg-warning/15 border-warning/30 text-warning",
      hint: "Requires staff follow-up",
    },
    {
      id: "confirmed" as const,
      label: "Confirmed",
      count: metrics.confirmed,
      badgeColor: "bg-action/20 border-action/40 text-text font-bold",
      hint: "Scheduled with patient",
    },
    {
      id: "completed" as const,
      label: "Completed",
      count: metrics.completed,
      badgeColor: "bg-success/15 border-success/30 text-success",
      hint: "Patient seen & cared for",
    },
    {
      id: "cancelled" as const,
      label: "Cancelled",
      count: metrics.cancelled,
      badgeColor: "bg-disabled/15 border-border text-text-muted",
      hint: "Cancelled appointments",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-cluster sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card) => {
        const isSelected = selectedStatus === card.id;

        return (
          <button
            className={`flex flex-col items-start justify-between rounded-card border p-cluster text-left transition-all focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus ${
              card.badgeColor
            } ${
              isSelected
                ? "ring-2 ring-action shadow-sm"
                : "hover:border-border-strong hover:bg-surface-raised"
            }`}
            key={card.id}
            onClick={() => onSelectStatus?.(card.id)}
            type="button"
          >
            <span className="text-label font-bold uppercase tracking-label text-text-muted">
              {card.label}
            </span>
            <span className="my-inline font-display text-heading font-bold text-text">
              {card.count}
            </span>
            <span className="text-[0.75rem] text-text-muted">{card.hint}</span>
          </button>
        );
      })}
    </div>
  );
}
