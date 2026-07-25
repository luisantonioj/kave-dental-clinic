import Link from "next/link";

import { NAV_ITEMS } from "../../content/navigation";
import { ButtonLink } from "../ui/Button";
import { MobileNavigation } from "./MobileNavigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-strong bg-surface-inverse/95 text-text-inverse backdrop-blur-sm">
      <div className="relative mx-auto flex min-h-header w-full max-w-wide items-center justify-between gap-cluster px-gutter">
        <Link
          aria-label="Kave Dental Clinic home"
          className="inline-flex min-h-control items-center font-display text-card font-extrabold uppercase tracking-[-0.05em] text-action focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus"
          href="/"
        >
          Kave Dental
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-cluster lg:gap-stack">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-control items-center text-label font-bold uppercase tracking-label text-text-inverse-muted transition-colors [transition-duration:var(--motion-duration-fast)] hover:text-action focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus active:text-action-active"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink className="hidden md:inline-flex" href="/booking">
          Book appointment
        </ButtonLink>

        <MobileNavigation items={NAV_ITEMS} />
      </div>
    </header>
  );
}
