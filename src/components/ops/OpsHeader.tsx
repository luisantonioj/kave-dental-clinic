"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "../layout/ThemeToggle";
import { logout } from "../../lib/ops/auth";
import { bookingRepository } from "../../lib/ops/booking-repository";

const NAV_LINKS = [
  { href: "/ops", label: "Overview" },
  { href: "/ops/bookings", label: "Bookings" },
  { href: "/ops/calendar", label: "Calendar" },
];

export function OpsHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [resetting, setResetting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleResetData() {
    if (confirm("Reset all booking data to the initial demonstration seed?")) {
      setResetting(true);
      await bookingRepository.resetDemoData();
      setResetting(false);
    }
  }

  function handleLogout() {
    logout();
    router.push("/ops/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-raised/95 text-text backdrop-blur-sm">
      <div className="mx-auto flex min-h-header max-w-wide items-center justify-between gap-cluster px-gutter">
        {/* Brand */}
        <div className="flex items-center gap-stack">
          <Link
            className="flex items-center gap-inline focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus"
            href="/ops"
          >
            <span className="font-display text-card font-bold tracking-tight text-text">
              KAVE
            </span>
            <span className="rounded-control bg-action px-inline py-0.5 text-label font-bold uppercase tracking-label text-action-contrast">
              OPS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Operations Navigation"
            className="hidden md:flex md:items-center md:gap-inline"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/ops"
                  ? pathname === "/ops"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  className={`rounded-control px-cluster py-inline text-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus ${
                    isActive
                      ? "bg-action/20 font-bold text-text border-b-2 border-action"
                      : "text-text-muted hover:bg-surface hover:text-text"
                  }`}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-cluster">
          <button
            className="hidden text-label font-medium uppercase tracking-label text-text-muted hover:text-text focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus lg:inline-block"
            disabled={resetting}
            onClick={handleResetData}
            title="Reset to default demonstration appointments"
            type="button"
          >
            {resetting ? "Resetting..." : "Reset Demo Data"}
          </button>

          <ThemeToggle />

          <div className="hidden items-center gap-inline border-l border-border pl-cluster sm:flex">
            <span className="text-label text-text-muted">
              Staff: Front Desk
            </span>
            <button
              className="rounded-control border border-border px-inline py-1 text-label font-medium text-text hover:bg-surface hover:text-error focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus"
              onClick={handleLogout}
              type="button"
            >
              Sign out
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle ops menu"
            className="inline-flex min-h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-control border border-border p-inline md:hidden focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
          >
            <span className="text-body">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen ? (
        <div className="border-b border-border bg-surface px-gutter py-cluster md:hidden">
          <nav className="flex flex-col gap-inline">
            {NAV_LINKS.map((link) => (
              <Link
                className={`rounded-control px-cluster py-control-y text-body font-medium ${
                  pathname === link.href
                    ? "bg-action/20 font-bold text-text"
                    : "text-text-muted hover:bg-surface-raised"
                }`}
                href={link.href}
                key={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-inline flex flex-col gap-inline border-t border-border pt-inline">
              <button
                className="py-inline text-left text-label font-medium uppercase tracking-label text-text-muted hover:text-text"
                onClick={handleResetData}
                type="button"
              >
                Reset Demo Data
              </button>
              <button
                className="py-inline text-left text-label font-medium text-error"
                onClick={handleLogout}
                type="button"
              >
                Sign out
              </button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
