import { describe, expect, it } from "vitest";

import { CLINIC_DETAILS } from "./clinic";
import { CLINIC_STRUCTURED_DATA } from "./structured-data";

describe("CLINIC_STRUCTURED_DATA", () => {
  it("contains only verified public clinic facts", () => {
    expect(CLINIC_STRUCTURED_DATA).toEqual({
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: CLINIC_DETAILS.name,
      telephone: "+639613944174",
      address: {
        "@type": "PostalAddress",
        streetAddress: "128 Mindanao Avenue, Tandang Sora",
        addressLocality: "Quezon City",
        addressCountry: "PH",
      },
      openingHours: "Mo-Su 10:00-19:00",
      sameAs: [CLINIC_DETAILS.instagramUrl, CLINIC_DETAILS.facebookUrl],
    });
  });

  it("does not publish unverified ratings, prices, staff, or a domain", () => {
    const serializedData = JSON.stringify(CLINIC_STRUCTURED_DATA);

    expect(serializedData).not.toMatch(
      /aggregateRating|priceRange|employee|founder|award|url/i,
    );
  });
});
