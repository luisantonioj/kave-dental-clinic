import type { ApprovedTransformation } from "../../content/transformations";
import { getApprovedTransformations } from "../../content/transformations";
import { ButtonLink, TextLink } from "../ui/Button";
import { ResponsiveImage } from "../ui/ResponsiveImage";

export interface TransformationPreviewProps {
  transformations?: readonly ApprovedTransformation[];
}

export function TransformationPreview({
  transformations = getApprovedTransformations(),
}: TransformationPreviewProps) {
  return (
    <section
      aria-labelledby="transformation-preview-heading"
      className="bg-surface-raised"
    >
      <div className="mx-auto w-full max-w-wide px-gutter py-section">
        <div className="mx-auto max-w-reading text-center">
          <h2
            className="font-display text-heading font-extrabold uppercase"
            id="transformation-preview-heading"
          >
            Transformation gallery
          </h2>
          <p className="mt-stack text-body text-text-muted">
            Treatment results vary. Images appear only after publication consent
            and wording are recorded.
          </p>
        </div>

        {transformations.length > 0 ? (
          <ul className="mt-card-y grid gap-cluster md:grid-cols-3">
            {transformations.slice(0, 3).map((transformation) => (
              <li key={transformation.id}>
                <figure>
                  <ResponsiveImage
                    image={transformation.image}
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <figcaption className="mt-cluster">
                    <p className="font-display text-card font-bold">
                      {transformation.title}
                    </p>
                    <p className="mt-inline text-body text-text-muted">
                      {transformation.treatment}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-card-y grid gap-stack border border-border p-card-y md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <p className="max-w-reading text-lead">
              No transformation media is approved for publication yet.
            </p>
            <ButtonLink href="/transformations" variant="secondary">
              Gallery information
            </ButtonLink>
          </div>
        )}

        {transformations.length > 0 ? (
          <div className="mt-card-y text-center">
            <TextLink href="/transformations">
              View all approved transformations
            </TextLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}
