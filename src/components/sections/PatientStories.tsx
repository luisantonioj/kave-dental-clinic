import {
  getApprovedPatientStories,
  type PatientStory,
} from "../../content/transformations";
import { ResponsiveImage } from "../ui/ResponsiveImage";

export interface PatientStoriesProps {
  records?: readonly PatientStory[];
}

export function PatientStories({ records }: PatientStoriesProps) {
  const stories = getApprovedPatientStories(records);

  return (
    <section
      aria-labelledby="patient-stories-heading"
      className="bg-surface-inverse-raised px-gutter py-section text-text-inverse"
      data-testid="patient-stories"
    >
      <div className="mx-auto w-full max-w-wide">
        <div className="grid gap-stack lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:items-end">
          <h2
            className="font-display text-heading font-extrabold uppercase"
            id="patient-stories-heading"
          >
            Patient <span className="text-action">stories</span>
          </h2>
          <p className="max-w-reading text-body text-text-inverse-muted">
            Stories appear only when the individual&apos;s publication consent
            and final wording are documented.
          </p>
        </div>

        {stories.length > 0 ? (
          <ul
            aria-label={`${stories.length} approved patient ${stories.length === 1 ? "story" : "stories"}`}
            className="mt-card-y grid gap-cluster md:grid-cols-2 lg:grid-cols-3"
          >
            {stories.map((story) => (
              <li
                className="overflow-hidden rounded-image border border-border-strong bg-surface-inverse"
                key={story.id}
              >
                {story.image ? (
                  <ResponsiveImage
                    className="aspect-[4/3] object-cover"
                    image={story.image}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                ) : null}
                <article className="p-card-x">
                  <p className="text-label font-bold uppercase tracking-label text-action">
                    {story.treatment}
                  </p>
                  <h3 className="mt-cluster font-display text-card font-bold uppercase">
                    {story.title}
                  </h3>
                  <p className="mt-cluster text-body text-text-inverse-muted">
                    {story.summary}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="mt-card-y border-y border-border-strong py-card-y"
            data-testid="patient-stories-empty-state"
          >
            <p className="max-w-reading text-lead">
              No patient stories are approved for publication yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
