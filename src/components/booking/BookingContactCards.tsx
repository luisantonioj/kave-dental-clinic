import { CLINIC_DETAILS } from "../../content/clinic";

const CONTACT_LINK_CLASSES =
  "inline-flex min-h-control items-center rounded-control underline decoration-transparent underline-offset-4 transition-colors hover:text-action hover:decoration-current focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus focus-visible:ring-offset-[length:var(--focus-ring-offset)]";

export function BookingContactCards() {
  return (
    <aside
      aria-label="Verified clinic information"
      className="grid gap-cluster"
    >
      <section
        aria-labelledby="booking-hours-heading"
        className="rounded-image border border-action/40 bg-surface-raised p-card-x text-text"
      >
        <h2
          className="font-display text-card font-bold uppercase"
          id="booking-hours-heading"
        >
          Plan your visit
        </h2>
        <p className="mt-stack text-body text-text-muted">
          {CLINIC_DETAILS.hours}
        </p>
      </section>

      <section
        aria-labelledby="booking-contact-heading"
        className="rounded-image border border-border bg-surface-raised p-card-x text-text"
      >
        <h2
          className="font-display text-card font-bold uppercase"
          id="booking-contact-heading"
        >
          Contact the clinic
        </h2>
        <dl className="mt-stack space-y-cluster">
          <div>
            <dt className="text-label uppercase tracking-label text-text-muted">
              Phone
            </dt>
            <dd>
              <a
                className={CONTACT_LINK_CLASSES}
                href={CLINIC_DETAILS.phoneHref}
              >
                {CLINIC_DETAILS.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-label uppercase tracking-label text-text-muted">
              Address
            </dt>
            <dd className="mt-inline text-body">{CLINIC_DETAILS.address}</dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="booking-social-heading"
        className="rounded-image border border-border bg-surface-raised p-card-x text-text"
      >
        <h2
          className="text-label font-bold uppercase tracking-label text-action"
          id="booking-social-heading"
        >
          Official social profiles
        </h2>
        <div className="mt-cluster flex flex-wrap gap-stack">
          <a
            className={CONTACT_LINK_CLASSES}
            href={CLINIC_DETAILS.instagramUrl}
            rel="noreferrer"
            target="_blank"
          >
            Instagram
          </a>
          <a
            className={CONTACT_LINK_CLASSES}
            href={CLINIC_DETAILS.facebookUrl}
            rel="noreferrer"
            target="_blank"
          >
            Facebook
          </a>
        </div>
      </section>
    </aside>
  );
}
