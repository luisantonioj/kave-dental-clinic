import {
  getApprovedTransformations,
  type Transformation,
} from "../../content/transformations";
import { ResponsiveImage } from "../ui/ResponsiveImage";

export interface TransformationGalleryProps {
  records?: readonly Transformation[];
}

export function TransformationGallery({ records }: TransformationGalleryProps) {
  const transformations = getApprovedTransformations(records);

  return (
    <section
      aria-labelledby="transformation-gallery-heading"
      className="bg-surface-inverse px-gutter py-section text-text-inverse"
      data-testid="transformation-gallery"
    >
      <div className="mx-auto w-full max-w-wide">
        <div className="max-w-reading">
          <p className="text-label font-bold uppercase tracking-label text-action">
            Published with consent
          </p>
          <h2
            className="mt-cluster font-display text-heading font-extrabold uppercase"
            id="transformation-gallery-heading"
          >
            Approved transformations
          </h2>
          <p className="mt-stack text-body text-text-inverse-muted">
            Every published record requires purposeful image text, approved
            treatment wording, and a documented consent reference.
          </p>
        </div>

        {transformations.length > 0 ? (
          <ul
            aria-label={`${transformations.length} approved transformation${transformations.length === 1 ? "" : "s"}`}
            className="mt-card-y grid gap-cluster md:grid-cols-2 lg:grid-cols-3"
          >
            {transformations.map((transformation, index) => (
              <li
                className={
                  index === 0 ? "md:col-span-2 lg:row-span-2" : "min-w-0"
                }
                key={transformation.id}
              >
                <figure className="group relative h-full min-h-[24rem] overflow-hidden rounded-image border border-border-strong bg-surface-inverse-raised">
                  <ResponsiveImage
                    className="h-full min-h-[24rem] object-cover"
                    image={transformation.image}
                    priority={index === 0}
                    sizes={
                      index === 0
                        ? "(min-width: 1024px) 66vw, (min-width: 768px) 100vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    }
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent p-card-x pt-section">
                    <p className="text-label font-bold uppercase tracking-label text-action">
                      {transformation.treatment}
                    </p>
                    <h3 className="mt-cluster font-display text-card font-bold uppercase">
                      {transformation.title}
                    </h3>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="mt-card-y grid min-h-[28rem] place-items-center rounded-image border border-border-strong bg-[linear-gradient(135deg,#191919,#0e0e0e)] p-card-x text-center"
            data-testid="transformation-gallery-empty-state"
          >
            <div className="max-w-reading">
              <p className="font-display text-card font-bold uppercase">
                No transformation media is approved for publication yet
              </p>
              <p className="mt-stack text-body text-text-inverse-muted">
                The gallery will remain image-free until consent and approved
                wording are documented.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
