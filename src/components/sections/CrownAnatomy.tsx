import { CROWN_ANATOMY_POINTS } from "../../content/services-page";

export function CrownAnatomy() {
  return (
    <section
      aria-labelledby="crown-heading"
      className="overflow-hidden bg-surface-inverse px-gutter py-section text-text-inverse"
    >
      <div className="mx-auto w-full max-w-wide">
        <div className="max-w-reading">
          <p className="text-label font-bold uppercase tracking-label text-action">
            Crown anatomy
          </p>
          <h2
            className="mt-cluster font-display text-heading font-extrabold uppercase"
            id="crown-heading"
          >
            Four points to discuss
          </h2>
          <p className="mt-stack text-lead text-text-inverse-muted">
            These labels are conversation prompts, not claims about a treatment
            result.
          </p>
        </div>

        <div className="mt-card-y grid items-center gap-card-y lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)]">
          <ol className="grid gap-px bg-border-strong sm:grid-cols-2">
            {CROWN_ANATOMY_POINTS.map((point, index) => (
              <li className="bg-surface-inverse p-card-x" key={point.id}>
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
                <p className="mt-cluster text-body text-text-inverse-muted">
                  {point.description}
                </p>
              </li>
            ))}
          </ol>

          <div
            aria-hidden="true"
            className="relative mx-auto aspect-[4/5] w-full max-w-[23rem]"
          >
            <div className="absolute inset-x-[10%] top-[4%] h-[58%] rounded-[48%_48%_38%_38%] border-2 border-action/60 bg-[radial-gradient(circle_at_38%_20%,rgba(255,255,255,0.28),transparent_30%),linear-gradient(150deg,rgba(236,233,36,0.22),rgba(255,255,255,0.03))]" />
            <div className="absolute inset-x-[24%] bottom-[8%] h-[45%] rounded-b-[48%] border-x-2 border-b-2 border-border-strong" />
            <div className="absolute left-0 right-0 top-[61%] h-px bg-action/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
