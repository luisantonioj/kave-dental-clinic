import { SERVICES_HERO } from "../../content/services-page";
import { ButtonLink } from "../ui/Button";

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

      <div className="mx-auto grid min-h-[46rem] w-full max-w-wide items-end gap-section px-gutter py-section lg:min-h-[calc(100svh-var(--spacing-header))] lg:grid-cols-[minmax(0,3fr)_minmax(17rem,2fr)]">
        <div className="relative z-10 max-w-[58rem]">
          <p className="mb-stack text-label font-bold uppercase tracking-label text-action">
            {SERVICES_HERO.eyebrow}
          </p>
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

        <div
          aria-hidden="true"
          className="relative hidden aspect-[4/5] self-center border border-border bg-surface-raised/40 lg:block"
        >
          <div className="absolute inset-[12%] rounded-[48%_48%_38%_38%] border border-action/40 bg-[linear-gradient(145deg,rgba(244,196,48,0.08),rgba(244,196,48,0.02))]" />
          <div className="absolute inset-x-[22%] bottom-[14%] h-px bg-action/60" />
          <div className="absolute inset-y-[18%] left-1/2 w-px bg-border" />
        </div>
      </div>
    </section>
  );
}
