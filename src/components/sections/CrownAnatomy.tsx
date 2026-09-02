import type { ApprovedImage } from "../../content/images";
import { CROWN_ANATOMY_POINTS } from "../../content/services-page";
import { ResponsiveImage } from "../ui/ResponsiveImage";

const CROWN_IMAGE: ApprovedImage = {
  src: "/images/services/crown-anatomy.jpg",
  alt: "Monolithic zirconia crown restoration model resting on sandstone pedestal in dental laboratory",
  width: 960,
  height: 1280,
};

export function CrownAnatomy() {
  return (
    <section
      aria-labelledby="crown-heading"
      className="overflow-hidden bg-surface px-gutter py-section text-text"
    >
      <div className="mx-auto w-full max-w-wide">
        <div className="max-w-reading">
          <h2
            className="font-display text-heading font-extrabold uppercase"
            id="crown-heading"
          >
            Four points to discuss
          </h2>
          <p className="mt-stack text-lead text-text-muted">
            These labels are conversation prompts, not claims about a treatment
            result.
          </p>
        </div>

        <div className="mt-card-y grid items-center gap-card-y lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)]">
          <ol className="grid gap-px bg-border sm:grid-cols-2">
            {CROWN_ANATOMY_POINTS.map((point, index) => (
              <li className="bg-surface-raised p-card-x" key={point.id}>
                <div className="flex items-baseline justify-between gap-cluster">
                  <h3 className="font-display text-card font-bold uppercase">
                    {point.label}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="text-label font-bold tracking-label text-action"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-cluster text-body text-text-muted">
                  {point.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[23rem] overflow-hidden rounded-image border border-border bg-surface-raised shadow-md">
            <ResponsiveImage
              className="h-full w-full object-cover"
              image={CROWN_IMAGE}
              sizes="(min-width: 1024px) 30vw, 80vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-surface/30 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
