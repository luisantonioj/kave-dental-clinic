export type AppRoute =
  | "/"
  | "/services"
  | "/transformations"
  | "/booking"
  | `/services#${string}`
  | `#${string}`;

export interface NavItem {
  label: string;
  href: AppRoute;
}

export const PRIMARY_NAV_ITEMS = [
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
] as const satisfies readonly NavItem[];

export const MOBILE_NAV_ITEMS = [
  ...PRIMARY_NAV_ITEMS,
  {
    label: "Booking",
    href: "/booking",
  },
] as const satisfies readonly NavItem[];

export const NAV_ITEMS = MOBILE_NAV_ITEMS;
