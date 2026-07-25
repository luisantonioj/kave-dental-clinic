import { SERVICES_HERO } from "../../content/services-page";
import { ButtonLink } from "../ui/Button";

export function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-surface-inverse text-text-inverse">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_76%_30%,rgba(236,233,36,0.14),transparent_25%),linear-gradient(115deg,#0e0e0e_15%,#191919_65%,#0e0e0e)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-[12rem] top-1/2 -z-10 aspect-square w-[34rem] -translate-y-1/2 rounded-full border border-action/30 bg-[radial-gradient(circle_at_40%_35%,rgba(255,255,255,0.16),rgba(236,233,36,0.08)_30%,transparent_68%)] sm:-right-[8rem] lg:right-gutter lg:w-[38rem]"
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
          <p className="mt-stack max-w-reading text-lead text-text-inverse-muted">
            {SERVICES_HERO.description}
          </p>
          <ButtonLink className="mt-card-y" href="/booking">
            Explore booking
          </ButtonLink>
        </div>

        <div
          aria-hidden="true"
          className="relative hidden aspect-[4/5] self-center border border-border-strong lg:block"
        >
          <div className="absolute inset-[12%] rounded-[48%_48%_38%_38%] border border-action/40 bg-[linear-gradient(145deg,rgba(236,233,36,0.08),rgba(255,255,255,0.03))]" />
          <div className="absolute inset-x-[22%] bottom-[14%] h-px bg-action/60" />
          <div className="absolute inset-y-[18%] left-1/2 w-px bg-border-strong" />
        </div>
      </div>
    </section>
  );
}
