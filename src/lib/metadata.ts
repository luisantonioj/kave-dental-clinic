import type { Metadata } from "next";

import { CLINIC_DETAILS } from "../content/clinic";

export function createPageMetadata(
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: CLINIC_DETAILS.name,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
