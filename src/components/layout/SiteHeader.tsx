import Link from "next/link";

import { MOBILE_NAV_ITEMS, PRIMARY_NAV_ITEMS } from "../../content/navigation";
import { ButtonLink } from "../ui/Button";
import { MobileNavigation } from "./MobileNavigation";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 text-text backdrop-blur-sm">
      <a
        className="fixed left-cluster top-cluster z-[60] inline-flex min-h-control -translate-y-[200%] items-center rounded-control bg-action px-card-x py-control-y text-label font-bold uppercase tracking-label text-action-contrast transition-transform focus:translate-y-0 focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-focus focus:ring-offset-[length:var(--focus-ring-offset)]"
        href="#main-content"
      >
        Skip to main content
      </a>
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
            {PRIMARY_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-control items-center text-label font-bold uppercase tracking-label text-text-muted transition-colors [transition-duration:var(--motion-duration-fast)] hover:text-action focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus active:text-action-active"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-cluster md:flex">
          <ThemeToggle />
          <ButtonLink className="" href="/booking">
            Book appointment
          </ButtonLink>
        </div>

        <div className="flex items-center gap-cluster md:hidden">
          <ThemeToggle />
          <MobileNavigation items={MOBILE_NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}
