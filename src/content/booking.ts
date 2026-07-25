export interface BookingServiceOption {
  value: string;
  label: string;
}

export const BOOKING_SERVICE_OPTIONS = [
  {
    value: "smile-makeover",
    label: "Smile makeover",
  },
  {
    value: "zirconia-veneers",
    label: "Zirconia veneers",
  },
  {
    value: "crowns-and-bridges",
    label: "Crowns and bridges",
  },
  {
    value: "dental-braces",
    label: "Dental braces",
  },
  {
    value: "teeth-whitening",
    label: "Teeth whitening",
  },
] as const satisfies readonly BookingServiceOption[];
