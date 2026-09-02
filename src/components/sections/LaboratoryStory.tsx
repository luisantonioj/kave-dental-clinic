import type { ApprovedLaboratoryStory } from "../../content/services-page";

export interface LaboratoryStoryProps {
  story?: ApprovedLaboratoryStory | null;
}

export function LaboratoryStory({ story = null }: LaboratoryStoryProps) {
  return (
    <section
      aria-labelledby="laboratory-heading"
      className="bg-action px-gutter py-section text-action-contrast"
    >
      <div className="mx-auto grid w-full max-w-wide gap-card-y lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]">
        <div>
          <h2
            className="max-w-[12ch] font-display text-heading font-extrabold uppercase"
            id="laboratory-heading"
          >
            {story?.heading ?? "Information awaiting clinic approval"}
          </h2>
        </div>

        {story ? (
          <div className="border-l-2 border-action-contrast pl-card-x">
            <p className="max-w-reading text-lead">{story.description}</p>
            <ul className="mt-stack list-disc space-y-cluster pl-stack">
              {story.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            className="border-l-2 border-action-contrast pl-card-x"
            data-testid="laboratory-empty-state"
          >
            <p className="max-w-reading text-lead">
              Details about facilities, production, turnaround, and responsible
              professionals are not presented as current services until the
              clinic verifies them.
            </p>
            <p className="mt-stack text-body font-bold uppercase tracking-label">
              Ask the clinic directly for current information.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
