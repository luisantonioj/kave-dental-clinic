import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Promotion } from "../../content/promotions";
import { PromotionSection } from "./PromotionSection";

const APPROVED_PROMOTION = {
  id: "approved-test",
  title: "Approved test promotion",
  details: ["Approved test detail"],
  status: "approved",
} as const satisfies Promotion;

const UNAVAILABLE_PROMOTION_CASES = [
  {
    label: "absent",
    promotions: [],
  },
  {
    label: "pending",
    promotions: [
      {
        ...APPROVED_PROMOTION,
        status: "pending-approval",
      },
    ],
  },
  {
    label: "expired",
    promotions: [
      {
        ...APPROVED_PROMOTION,
        status: "expired",
      },
    ],
  },
] as const satisfies readonly {
  label: string;
  promotions: readonly Promotion[];
}[];

describe("PromotionSection", () => {
  it("renders approved promotion content accessibly", () => {
    render(<PromotionSection promotions={[APPROVED_PROMOTION]} />);

    expect(
      screen.getByRole("heading", {
        name: APPROVED_PROMOTION.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(APPROVED_PROMOTION.details[0])).toBeInTheDocument();
  });

  it.each(UNAVAILABLE_PROMOTION_CASES)(
    "renders the non-promotional contact state for $label content",
    ({ promotions }) => {
      render(<PromotionSection promotions={promotions} />);

      expect(
        screen.getByRole("heading", {
          name: "Start with verified clinic contact",
        }),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(APPROVED_PROMOTION.title),
      ).not.toBeInTheDocument();
    },
  );
});
