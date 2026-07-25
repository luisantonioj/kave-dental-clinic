export type PromotionStatus = "pending-approval" | "approved" | "expired";

interface PromotionBase {
  id: string;
  title: string;
  details: readonly string[];
}

export interface ApprovedPromotion extends PromotionBase {
  status: "approved";
}

export interface UnavailablePromotion extends PromotionBase {
  status: "pending-approval" | "expired";
}

export type Promotion = ApprovedPromotion | UnavailablePromotion;

export const PROMOTION_RECORDS = [] as const satisfies readonly Promotion[];

export function isApprovedPromotion(
  promotion: Promotion,
): promotion is ApprovedPromotion {
  return promotion.status === "approved";
}

export function getApprovedPromotions(
  promotions: readonly Promotion[] = PROMOTION_RECORDS,
): readonly ApprovedPromotion[] {
  return promotions.filter(isApprovedPromotion);
}
