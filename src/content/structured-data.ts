import { CLINIC_DETAILS } from "./clinic";

export const CLINIC_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: CLINIC_DETAILS.name,
  telephone: CLINIC_DETAILS.phoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "128 Mindanao Avenue, Tandang Sora",
    addressLocality: "Quezon City",
    addressCountry: "PH",
  },
  openingHours: "Mo-Su 10:00-19:00",
  sameAs: [CLINIC_DETAILS.instagramUrl, CLINIC_DETAILS.facebookUrl],
} as const;
