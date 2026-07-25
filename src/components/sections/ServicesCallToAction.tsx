import { ButtonLink } from "../ui/Button";

export function ServicesCallToAction() {
  return (
    <section
      aria-labelledby="services-cta-heading"
      className="bg-surface px-gutter py-section"
    >
      <div className="mx-auto flex w-full max-w-wide flex-col items-start justify-between gap-card-y border-y-2 border-border-strong py-card-y lg:flex-row lg:items-end">
        <div>
          <p className="text-label font-bold uppercase tracking-label text-text-muted">
            Next step
          </p>
          <h2
            className="mt-cluster font-display text-heading font-extrabold uppercase"
            id="services-cta-heading"
          >
            Discuss your options
          </h2>
          <p className="mt-stack max-w-reading text-lead text-text-muted">
            Treatment recommendations depend on an individual clinical
            assessment.
          </p>
        </div>
        <ButtonLink href="/booking">Explore booking</ButtonLink>
      </div>
    </section>
  );
}
