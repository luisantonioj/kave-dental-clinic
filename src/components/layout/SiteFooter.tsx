import { CLINIC_DETAILS } from "../../content/clinic";

const EXTERNAL_LINK_CLASSES =
  "inline-flex min-h-control items-center text-body text-text-muted underline decoration-transparent underline-offset-4 transition-colors [transition-duration:var(--motion-duration-fast)] hover:text-action hover:decoration-current focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus active:text-action-active";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-raised text-text">
      <div className="mx-auto grid w-full max-w-wide gap-card-y px-gutter py-section sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-stack">
          <p className="font-display text-card font-extrabold uppercase tracking-[-0.05em] text-action">
            Kave Dental
          </p>
          <p className="max-w-reading text-body text-text-muted">
            {CLINIC_DETAILS.tagline}
          </p>
        </div>

        <div className="space-y-stack">
          <h2 className="text-label font-bold uppercase tracking-label">
            Clinic information
          </h2>
          <address className="space-y-cluster text-body not-italic text-text-muted">
            <p>{CLINIC_DETAILS.hours}</p>
            <p>{CLINIC_DETAILS.address}</p>
          </address>
        </div>

        <div className="space-y-stack">
          <h2 className="text-label font-bold uppercase tracking-label">
            Direct contact
          </h2>
          <a className={EXTERNAL_LINK_CLASSES} href={CLINIC_DETAILS.phoneHref}>
            {CLINIC_DETAILS.phoneDisplay}
          </a>
        </div>

        <div className="space-y-stack">
          <h2 className="text-label font-bold uppercase tracking-label">
            Connect
          </h2>
          <ul>
            <li>
              <a
                className={EXTERNAL_LINK_CLASSES}
                href={CLINIC_DETAILS.instagramUrl}
              >
                Instagram @kavedentalclinic
              </a>
            </li>
            <li>
              <a
                className={EXTERNAL_LINK_CLASSES}
                href={CLINIC_DETAILS.facebookUrl}
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-wide px-gutter py-stack text-label text-text-muted">
          © {currentYear} {CLINIC_DETAILS.name}. Quezon City, Philippines.
        </p>
      </div>
    </footer>
  );
}
