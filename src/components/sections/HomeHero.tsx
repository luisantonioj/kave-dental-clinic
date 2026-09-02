import { ButtonLink } from "../ui/Button";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-var(--spacing-header))] overflow-hidden bg-surface text-text">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_32%,rgba(244,196,48,0.14),transparent_35%),linear-gradient(120deg,var(--color-surface)_20%,var(--color-surface-raised)_64%,var(--color-surface))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] border-l border-border bg-[linear-gradient(135deg,transparent_0_28%,rgba(244,196,48,0.06)_28%_29%,transparent_29%_58%,rgba(244,196,48,0.03)_58%_59%,transparent_59%)] lg:block"
      />

      <div className="mx-auto grid min-h-[calc(100svh-var(--spacing-header))] w-full max-w-wide items-center gap-section px-gutter py-section lg:grid-cols-[minmax(0,3fr)_minmax(16rem,2fr)]">
        <div className="max-w-[52rem]">
          <h4 className="text-balance font-display text-heading font-extrabold uppercase">
            Your ticket to a{" "}
            <span className="text-action">picture-perfect smile</span>
          </h4>
          <p className="mt-stack max-w-reading text-lead text-text-muted">
            Explore Kave Dental Clinic&apos;s featured services, clinic-approved
            work, and verified contact details.
          </p>
          <div className="mt-card-y flex flex-col gap-cluster sm:flex-row">
            <ButtonLink href="/booking">Explore booking</ButtonLink>
            <ButtonLink href="/transformations" variant="secondary">
              View transformations
            </ButtonLink>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hidden aspect-[4/5] grid-cols-2 gap-cluster border border-border bg-surface-raised/50 p-cluster lg:grid"
        >
          <div className="border border-border bg-surface-raised" />
          <div className="translate-y-stack border border-action/40 bg-action/10" />
          <div className="-translate-y-stack border border-action/20 bg-action/5" />
          <div className="border border-border bg-surface-raised" />
        </div>
      </div>
    </section>
  );
}
