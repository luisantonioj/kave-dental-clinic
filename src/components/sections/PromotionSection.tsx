import type { Promotion } from "../../content/promotions";
import {
  getApprovedPromotions,
  PROMOTION_RECORDS,
} from "../../content/promotions";
import { ButtonLink } from "../ui/Button";

export interface PromotionSectionProps {
  promotions?: readonly Promotion[];
}

export function PromotionSection({
  promotions = PROMOTION_RECORDS,
}: PromotionSectionProps) {
  const promotion = getApprovedPromotions(promotions)[0];

  if (!promotion) {
    return (
      <section
        aria-labelledby="home-contact-heading"
        className="border-y border-border bg-surface text-text"
      >
        <div className="mx-auto grid w-full max-w-wide gap-stack px-gutter py-section md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <h2
              className="max-w-reading font-display text-heading font-extrabold uppercase"
              id="home-contact-heading"
            >
              Start with verified clinic contact
            </h2>
          </div>
          <ButtonLink href="/booking">Explore booking</ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="approved-promotion-heading"
      className="border-y border-action/40 bg-surface text-text"
    >
      <div className="mx-auto grid w-full max-w-wide gap-card-y px-gutter py-section lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
        <div>
          <h2
            className="font-display text-heading font-extrabold uppercase"
            id="approved-promotion-heading"
          >
            {promotion.title}
          </h2>
        </div>
        <div>
          <ul className="space-y-cluster text-body text-text-muted">
            {promotion.details.map((detail) => (
              <li className="border-b border-border pb-cluster" key={detail}>
                {detail}
              </li>
            ))}
          </ul>
          <ButtonLink className="mt-card-y" href="/booking">
            Explore booking
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
