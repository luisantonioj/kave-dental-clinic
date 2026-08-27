export interface ContactDetails {
  phoneDisplay: string;
  phoneHref: `tel:${string}`;
  address: string;
  hours: string;
  facebookUrl: `https://${string}`;
  facebookReelsUrl?: `https://${string}`;
  instagramUrl: `https://${string}`;
  instagramReelsUrl?: `https://${string}`;
}

export interface ClinicDetails extends ContactDetails {
  name: string;
  tagline: string;
}

export const CLINIC_DETAILS = {
  name: "Kave Dental Clinic",
  tagline: "Your ticket to a picture-perfect smile",
  phoneDisplay: "0961 394 4174",
  phoneHref: "tel:+639613944174",
  address: "128 Mindanao Avenue, Tandang Sora, Quezon City",
  hours: "Open daily, 10:00 AM–7:00 PM",
  facebookUrl: "https://www.facebook.com/profile.php?id=61551864636049",
  facebookReelsUrl:
    "https://www.facebook.com/profile.php?id=61551864636049&sk=reels_tab",
  instagramUrl: "https://www.instagram.com/kavedentalclinic/",
  instagramReelsUrl: "https://www.instagram.com/kavedentalclinic/reels/",
} as const satisfies ClinicDetails;
