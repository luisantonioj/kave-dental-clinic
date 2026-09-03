import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { OpsMetricCards } from "./OpsMetricCards";
import type { OpsSummaryMetrics } from "../../types/ops";

const MOCK_METRICS: OpsSummaryMetrics = {
  total: 10,
  pending: 4,
  confirmed: 3,
  completed: 2,
  cancelled: 1,
  todayCount: 2,
};

describe("OpsMetricCards", () => {
  it("renders metric numbers accurately", () => {
    render(<OpsMetricCards metrics={MOCK_METRICS} />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("triggers onSelectStatus callback on click", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <OpsMetricCards
        metrics={MOCK_METRICS}
        onSelectStatus={handleSelect}
        selectedStatus="all"
      />,
    );

    const pendingBtn = screen.getByRole("button", { name: /Pending Review/i });
    await user.click(pendingBtn);

    expect(handleSelect).toHaveBeenCalledWith("pending");
  });
});
