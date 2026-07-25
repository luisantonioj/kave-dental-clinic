export function TransformationsHero() {
  return (
    <section className="relative isolate flex min-h-[42rem] items-center justify-center overflow-hidden bg-surface-inverse px-gutter py-section text-center text-text-inverse">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_28%,rgba(255,255,255,0.13),transparent_24%),linear-gradient(180deg,#191919,#0e0e0e)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 aspect-[5/2] w-[72rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-border-strong bg-[radial-gradient(ellipse_at_center,rgba(236,233,36,0.12),transparent_62%)]"
      />

      <div className="max-w-[58rem]">
        <p className="text-label font-bold uppercase tracking-label text-action">
          Clinic-approved work
        </p>
        <h1 className="mt-stack text-balance font-display text-display font-extrabold uppercase">
          Transformation <span className="text-action">gallery</span>
        </h1>
        <p className="mx-auto mt-stack max-w-reading text-lead text-text-inverse-muted">
          Treatment results vary. Images and stories appear only after
          publication consent and approved wording are recorded.
        </p>
      </div>
    </section>
  );
}
