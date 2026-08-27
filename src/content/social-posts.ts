export type SocialPlatform = "facebook" | "instagram";
export type SocialContentKind = "post" | "reel" | "video";

interface SocialPostBase {
  id: string;
  platform: SocialPlatform;
  kind: SocialContentKind;
  url: `https://${string}`;
  publishedAt: string;
  summary: string;
  crossPostGroup?: string;
}

export interface ApprovedSocialPost extends SocialPostBase {
  status: "approved";
  consentReference: `consent:${string}`;
}

export interface PendingSocialPost extends SocialPostBase {
  status: "pending-approval";
  consentReference?: never;
}

export type SocialPost = ApprovedSocialPost | PendingSocialPost;

/*
 * Add clinic-approved public post and reel URLs here. A public social post is
 * not automatically approved for the website: every production record still
 * requires a traceable consent reference and final approved summary.
 */
export const SOCIAL_POST_RECORDS = [
  {
    id: "fb-reel-1763918868137925",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/1763918868137925/",
    publishedAt: "2026-08-20T10:00:00+08:00",
    summary: "Join Prince Aldabe's dentist day at Kave Dental Clinic",
    consentReference: "consent:public-facebook-reel-1763918868137925",
  },
  {
    id: "fb-reel-2175055323397232",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/2175055323397232/",
    publishedAt: "2026-08-18T10:00:00+08:00",
    summary: "Dental Braces checkup and adjustment for Jay Mervin",
    consentReference: "consent:public-facebook-reel-2175055323397232",
  },
  {
    id: "fb-reel-1054040894001657",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/1054040894001657/",
    publishedAt: "2026-08-16T10:00:00+08:00",
    summary: "Watch Sam Cruz's smile transformation at Kave Dental Clinic",
    consentReference: "consent:public-facebook-reel-1054040894001657",
  },
  {
    id: "fb-reel-1044727508461808",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/1044727508461808/",
    publishedAt: "2026-08-14T10:00:00+08:00",
    summary:
      "Regular oral prophylaxis and routine professional dental cleaning",
    consentReference: "consent:public-facebook-reel-1044727508461808",
  },
  {
    id: "fb-reel-4365544287033516",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/4365544287033516/",
    publishedAt: "2026-08-12T10:00:00+08:00",
    summary: "Molly Grande visits Kave Dental Clinic for consultation",
    consentReference: "consent:public-facebook-reel-4365544287033516",
  },
  {
    id: "fb-reel-3494739964035370",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/3494739964035370/",
    publishedAt: "2026-08-10T10:00:00+08:00",
    summary:
      "Patient dental assessment and comprehensive consultation walkthrough",
    consentReference: "consent:public-facebook-reel-3494739964035370",
  },
  {
    id: "fb-reel-27790501063937120",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/27790501063937120/",
    publishedAt: "2026-08-08T10:00:00+08:00",
    summary: "Joshua Ronett answers your questions about Zirconia Crowns",
    consentReference: "consent:public-facebook-reel-27790501063937120",
  },
  {
    id: "fb-reel-1350869453284871",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/1350869453284871/",
    publishedAt: "2026-08-06T10:00:00+08:00",
    summary: "Watch why Justin Nonato chose Zirconia Veneers",
    consentReference: "consent:public-facebook-reel-1350869453284871",
  },
  {
    id: "fb-reel-2523887458050544",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/2523887458050544/",
    publishedAt: "2026-08-04T10:00:00+08:00",
    summary: "Personalized smile design and aesthetic restorative consultation",
    consentReference: "consent:public-facebook-reel-2523887458050544",
  },
  {
    id: "fb-reel-1011767028265703",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/1011767028265703/",
    publishedAt: "2026-08-02T10:00:00+08:00",
    summary: "Healthier gums and gingivectomy gum contouring procedure care",
    consentReference: "consent:public-facebook-reel-1011767028265703",
  },
] as const satisfies readonly SocialPost[];
