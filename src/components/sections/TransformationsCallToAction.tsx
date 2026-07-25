import { ButtonLink } from "../ui/Button";

export function TransformationsCallToAction() {
  return (
    <section
      aria-labelledby="transformations-cta-heading"
      className="bg-action px-gutter py-section text-action-contrast"
    >
      <div className="mx-auto grid w-full max-w-wide gap-card-y lg:grid-cols-[minmax(0,3fr)_auto] lg:items-end">
        <div>
          <p className="text-label font-bold uppercase tracking-label">
            Consultation information
          </p>
          <h2
            className="mt-cluster max-w-[14ch] font-display text-heading font-extrabold uppercase"
            id="transformations-cta-heading"
          >
            Discuss your dental goals
          </h2>
          <p className="mt-stack max-w-reading text-lead">
            Explore the clinic&apos;s static booking experience or use the
            verified contact details there. This page does not collect personal
            information.
          </p>
        </div>
        <ButtonLink href="/booking" variant="secondary">
          Explore booking
        </ButtonLink>
      </div>
    </section>
  );
}
