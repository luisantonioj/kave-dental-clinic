import type { ApprovedImage } from "../../content/images";
import { SERVICES_HERO } from "../../content/services-page";
import { ButtonLink } from "../ui/Button";
import { ResponsiveImage } from "../ui/ResponsiveImage";

const SERVICES_HERO_IMAGE: ApprovedImage = {
  src: "/images/hero/services-hero.jpg",
  alt: "Precision aesthetic zirconia dental crowns and porcelain veneers on natural sandstone",
  width: 960,
  height: 1280,
};

export function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-surface text-text">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_76%_30%,rgba(244,196,48,0.12),transparent_35%),linear-gradient(115deg,var(--color-surface)_15%,var(--color-surface-raised)_65%,var(--color-surface))]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-[12rem] top-1/2 -z-10 aspect-square w-[34rem] -translate-y-1/2 rounded-full border border-action/20 bg-[radial-gradient(circle_at_40%_35%,rgba(244,196,48,0.06),transparent_68%)] sm:-right-[8rem] lg:right-gutter lg:w-[38rem]"
      />

      <div className="mx-auto grid w-full max-w-wide items-center gap-stack px-gutter py-section lg:min-h-[calc(100svh-var(--spacing-header))] lg:grid-cols-[minmax(0,3fr)_minmax(17rem,2fr)] lg:gap-section lg:items-end">
        <div className="relative z-10 max-w-[58rem]">
          <h1 className="text-balance font-display text-display font-extrabold uppercase">
            Zirconia and featured{" "}
            <span className="text-action">dental services</span>
          </h1>
          <p className="mt-stack max-w-reading text-lead text-text-muted">
            {SERVICES_HERO.description}
          </p>
          <ButtonLink className="mt-card-y" href="/booking">
            Explore booking
          </ButtonLink>
        </div>

        <div className="relative aspect-[4/3] w-full max-w-xl mx-auto overflow-hidden rounded-image border border-border bg-surface-raised shadow-xl sm:aspect-[16/10] lg:aspect-[4/5] lg:max-w-none">
          <ResponsiveImage
            className="h-full w-full object-cover"
            image={SERVICES_HERO_IMAGE}
            sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-surface/30 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
