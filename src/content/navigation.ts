export type AppRoute = "/" | "/services" | "/transformations" | "/booking";

export interface NavItem {
  label: string;
  href: AppRoute;
}

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Transformations",
    href: "/transformations",
  },
  {
    label: "Booking",
    href: "/booking",
  },
] as const satisfies readonly NavItem[];
