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
        className="rounded-image border border-action/20 bg-border-strong p-card-x text-text-inverse"
      >
        <p className="text-label font-bold uppercase tracking-label text-action">
          Clinic hours
        </p>
        <h2
          className="mt-cluster font-display text-card font-bold uppercase"
          id="booking-hours-heading"
        >
          Plan your visit
        </h2>
        <p className="mt-stack text-body text-text-inverse-muted">
          {CLINIC_DETAILS.hours}
        </p>
      </section>

      <section
        aria-labelledby="booking-contact-heading"
        className="rounded-image border border-border-strong bg-surface-inverse-raised p-card-x text-text-inverse"
      >
        <p className="text-label font-bold uppercase tracking-label text-action">
          Direct contact
        </p>
        <h2
          className="mt-cluster font-display text-card font-bold uppercase"
          id="booking-contact-heading"
        >
          Contact the clinic
        </h2>
        <dl className="mt-stack space-y-cluster">
          <div>
            <dt className="text-label uppercase tracking-label text-text-inverse-muted">
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
            <dt className="text-label uppercase tracking-label text-text-inverse-muted">
              Address
            </dt>
            <dd className="mt-inline text-body">{CLINIC_DETAILS.address}</dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="booking-social-heading"
        className="rounded-image border border-border-strong bg-surface-inverse p-card-x text-text-inverse"
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
