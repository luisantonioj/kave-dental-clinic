import type { ApprovedImage } from "../../content/images";
import { VENEER_DISCUSSION_POINTS } from "../../content/services-page";
import { ResponsiveImage } from "../ui/ResponsiveImage";

const VENEER_IMAGE: ApprovedImage = {
  src: "/images/services/veneer-overview.jpg",
  alt: "Cosmetic dentist conducting a porcelain veneer smile design and shade consultation with a patient",
  width: 960,
  height: 1280,
};

export function VeneerOverview() {
  return (
    <section
      aria-labelledby="veneer-heading"
      className="bg-surface px-gutter py-section"
    >
      <div className="mx-auto grid w-full max-w-wide gap-section lg:grid-cols-[minmax(17rem,4fr)_minmax(0,6fr)]">
        <div className="relative min-h-[24rem] overflow-hidden rounded-image border border-border bg-surface-raised shadow-md lg:min-h-[44rem]">
          <ResponsiveImage
            className="h-full w-full object-cover"
            image={VENEER_IMAGE}
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-surface/30 via-transparent to-transparent"
          />
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
