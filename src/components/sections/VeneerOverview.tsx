import { VENEER_DISCUSSION_POINTS } from "../../content/services-page";

export function VeneerOverview() {
  return (
    <section
      aria-labelledby="veneer-heading"
      className="bg-surface px-gutter py-section"
    >
      <div className="mx-auto grid w-full max-w-wide gap-section lg:grid-cols-[minmax(17rem,4fr)_minmax(0,6fr)]">
        <div
          aria-hidden="true"
          className="relative min-h-[24rem] overflow-hidden rounded-image bg-surface-raised lg:min-h-[44rem]"
        >
          <div className="absolute inset-[12%] rounded-[50%_50%_42%_42%] border-2 border-border-strong bg-[radial-gradient(circle_at_42%_25%,white,transparent_28%),linear-gradient(155deg,#f7f6f2,#d8d6cc)]" />
          <div className="absolute inset-x-[18%] bottom-[16%] h-[18%] rounded-[50%] border border-action/60 bg-action/20" />
        </div>

        <div className="self-center">
          <h2
            className="max-w-[12ch] font-display text-heading font-extrabold uppercase"
            id="veneer-heading"
          >
            Topics for a veneer consultation
          </h2>
          <p className="mt-stack max-w-reading text-lead text-text-muted">
            Veneers are not suitable for every person. A clinician should
            explain the assessment, options, and care relevant to you.
          </p>

          <ol className="mt-card-y grid gap-cluster sm:grid-cols-2">
            {VENEER_DISCUSSION_POINTS.map((point) => (
              <li
                className="border-t-2 border-border-strong pt-stack"
                key={point.id}
              >
                <span className="text-label font-bold tracking-label text-text-muted">
                  {point.label}
                </span>
                <h3 className="mt-cluster font-display text-card font-bold uppercase">
                  {point.heading}
                </h3>
                <p className="mt-cluster text-body text-text-muted">
                  {point.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
