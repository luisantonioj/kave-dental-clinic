import { describe, expect, it } from "vitest";

import { CLINIC_DETAILS } from "../content/clinic";
import { createPageMetadata } from "./metadata";

describe("createPageMetadata", () => {
  it("keeps page and social-preview copy aligned", () => {
    const metadata = createPageMetadata(
      "Test route | Kave Dental Clinic",
      "Test-only route description.",
    );

    expect(metadata).toMatchObject({
      title: "Test route | Kave Dental Clinic",
      description: "Test-only route description.",
      openGraph: {
        type: "website",
        siteName: CLINIC_DETAILS.name,
        title: "Test route | Kave Dental Clinic",
        description: "Test-only route description.",
      },
      twitter: {
        card: "summary",
        title: "Test route | Kave Dental Clinic",
        description: "Test-only route description.",
      },
    });
  });
});
