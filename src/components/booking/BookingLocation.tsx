import { CLINIC_DETAILS } from "../../content/clinic";
import type { ApprovedImage } from "../../content/images";
import { ResponsiveImage } from "../ui/ResponsiveImage";

const LOCATION_IMAGE: ApprovedImage = {
  src: "/images/booking/clinic-location.jpg",
  alt: "Kave Dental Clinic facade in Tomas Morato, Quezon City",
  width: 1280,
  height: 720,
};

export function BookingLocation() {
  return (
    <section
      aria-labelledby="booking-location-heading"
      className="border-t border-border bg-surface px-gutter py-section text-text"
    >
      <div className="mx-auto grid w-full max-w-wide gap-card-y lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)] lg:items-center">
        <div>
          <h2
            className="font-display text-heading font-extrabold uppercase"
            id="booking-location-heading"
          >
            Visit the clinic
          </h2>
          <p className="mt-stack max-w-reading text-lead text-text-muted">
            {CLINIC_DETAILS.address}
          </p>
          <p className="mt-cluster text-body text-text-muted">
            {CLINIC_DETAILS.hours}
          </p>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden rounded-image border border-border bg-surface-raised shadow-md">
          <ResponsiveImage
            className="h-full w-full object-cover"
            image={LOCATION_IMAGE}
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent"
          />
          <div className="absolute bottom-4 left-4 rounded-pill border border-border bg-surface/90 px-4 py-1.5 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-label text-action">
              Quezon City, Metro Manila
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
