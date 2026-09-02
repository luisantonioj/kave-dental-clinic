"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { NavItem } from "../../content/navigation";

export interface MobileNavigationProps {
  items: readonly NavItem[];
}

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
    }
  }, [isOpen]);

  function closeAndRestoreFocus() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="md:hidden">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        className="inline-flex min-h-control min-w-control items-center justify-center rounded-control border border-border px-cluster text-label font-bold uppercase tracking-label text-text transition-colors [transition-duration:var(--motion-duration-fast)] hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus"
        onClick={() => {
          setIsOpen((currentValue) => !currentValue);
        }}
        ref={triggerRef}
        type="button"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full border-b border-border bg-surface px-gutter py-stack shadow-lg"
          id="mobile-navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              closeAndRestoreFocus();
            }
          }}
        >
          <ul className="mx-auto flex max-w-wide flex-col">
            {items.map((item, index) => (
              <li key={item.href}>
                <Link
                  className="flex min-h-control items-center border-b border-border text-label font-bold uppercase tracking-label text-text-muted transition-colors [transition-duration:var(--motion-duration-fast)] hover:text-action focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus"
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  ref={index === 0 ? firstLinkRef : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
