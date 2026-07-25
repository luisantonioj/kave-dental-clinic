import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { AppRoute } from "../../content/navigation";

export type ButtonVariant = "primary" | "secondary" | "inverse";

const BASE_CLASSES =
  "inline-flex min-h-control items-center justify-center gap-inline rounded-control border px-card-x py-control-y text-label font-bold uppercase tracking-label transition-colors [transition-duration:var(--motion-duration-fast)] [transition-timing-function:var(--motion-easing-standard)] focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus focus-visible:ring-offset-[length:var(--focus-ring-offset)] disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-px";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "border-action bg-action text-action-contrast hover:border-action-hover hover:bg-action-hover active:border-action-active active:bg-action-active disabled:hover:border-action disabled:hover:bg-action",
  secondary:
    "border-border-strong bg-transparent text-text hover:bg-surface-raised active:bg-border disabled:hover:bg-transparent",
  inverse:
    "border-text-inverse bg-transparent text-text-inverse hover:bg-surface-inverse-raised active:bg-border-strong disabled:hover:bg-transparent",
};

function joinClassNames(...classNames: ReadonlyArray<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={joinClassNames(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        className,
      )}
      type={type}
      {...props}
    />
  );
}

export interface ButtonLinkProps {
  href: AppRoute;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

export function ButtonLink({
  children,
  className,
  href,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link
      className={joinClassNames(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

export interface TextLinkProps {
  href: AppRoute;
  children: ReactNode;
  className?: string;
}

export function TextLink({ children, className, href }: TextLinkProps) {
  return (
    <Link
      className={joinClassNames(
        "inline-flex min-h-control items-center text-label font-bold uppercase tracking-label underline decoration-transparent underline-offset-4 transition-colors [transition-duration:var(--motion-duration-fast)] hover:text-text-muted hover:decoration-current focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus focus-visible:ring-offset-[length:var(--focus-ring-offset)] active:text-text",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
