import { CLINIC_DETAILS } from "../../content/clinic";

export function BookingLocation() {
  return (
    <section
      aria-labelledby="booking-location-heading"
      className="border-t border-border-strong bg-surface-inverse px-gutter py-section text-text-inverse"
    >
      <div className="mx-auto grid w-full max-w-wide gap-card-y lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)] lg:items-center">
        <div>
          <p className="text-label font-bold uppercase tracking-label text-action">
            Quezon City
          </p>
          <h2
            className="mt-cluster font-display text-heading font-extrabold uppercase"
            id="booking-location-heading"
          >
            Visit the clinic
          </h2>
          <p className="mt-stack max-w-reading text-lead text-text-inverse-muted">
            {CLINIC_DETAILS.address}
          </p>
          <p className="mt-cluster text-body text-text-inverse-muted">
            {CLINIC_DETAILS.hours}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="relative min-h-[22rem] overflow-hidden rounded-image border border-border-strong bg-[linear-gradient(135deg,#191919,#0e0e0e)]"
        >
          <div className="absolute inset-[12%] grid grid-cols-4 grid-rows-3 gap-cluster opacity-60">
            {Array.from({ length: 12 }, (_, index) => (
              <span
                className="border border-border-strong"
                key={`location-grid-${index}`}
              />
            ))}
          </div>
          <div className="absolute left-1/2 top-1/2 size-control -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-action bg-action/20 shadow-[0_0_0_1rem_rgba(236,233,36,0.08)]" />
        </div>
      </div>
    </section>
  );
}
