import { getApprovedPromotions, type Promotion } from "./promotions";
import { getApprovedServices, type Service } from "./services";
import {
  getApprovedPatientStories,
  getApprovedTransformations,
  type PatientStory,
  type Transformation,
} from "./transformations";
import { describe, expect, it } from "vitest";

const TEST_IMAGE = {
  src: "/approved/test.webp",
  alt: "Test-only approved asset",
  width: 800,
  height: 600,
} as const;

describe("production content approval filters", () => {
  it("excludes pending services", () => {
    const records = [
      {
        id: "approved",
        name: "Approved test service",
        category: "aesthetic",
        summary: "Test-only approved summary.",
        status: "approved",
        image: TEST_IMAGE,
      },
      {
        id: "pending",
        name: "Pending test service",
        category: "restorative",
        summary: "Test-only pending summary.",
        status: "pending-approval",
      },
    ] as const satisfies readonly Service[];

    expect(getApprovedServices(records).map(({ id }) => id)).toEqual([
      "approved",
    ]);
  });

  it("requires an approved transformation with a non-empty consent reference", () => {
    const records = [
      {
        id: "consented",
        title: "Consented test record",
        treatment: "Test treatment",
        status: "approved",
        image: TEST_IMAGE,
        consentReference: "consent:test-reference",
      },
      {
        id: "missing-reference",
        title: "Invalid test record",
        treatment: "Test treatment",
        status: "approved",
        image: TEST_IMAGE,
        consentReference: "consent:",
      },
      {
        id: "pending",
        title: "Pending test record",
        treatment: "Test treatment",
        status: "pending-approval",
      },
    ] as const satisfies readonly Transformation[];

    expect(getApprovedTransformations(records).map(({ id }) => id)).toEqual([
      "consented",
    ]);
  });

  it("requires approved patient-story wording with a consent reference", () => {
    const records = [
      {
        id: "consented-story",
        title: "Consented test story",
        summary: "Test-only approved summary.",
        treatment: "Test treatment",
        status: "approved",
        consentReference: "consent:test-story",
      },
      {
        id: "missing-reference",
        title: "Invalid test story",
        summary: "Test-only invalid summary.",
        treatment: "Test treatment",
        status: "approved",
        consentReference: "consent:",
      },
      {
        id: "pending-story",
        title: "Pending test story",
        summary: "Test-only pending summary.",
        treatment: "Test treatment",
        status: "pending-approval",
      },
    ] as const satisfies readonly PatientStory[];

    expect(getApprovedPatientStories(records).map(({ id }) => id)).toEqual([
      "consented-story",
    ]);
  });

  it("excludes pending and expired promotions", () => {
    const records = [
      {
        id: "approved",
        title: "Approved test promotion",
        details: ["Test-only detail"],
        status: "approved",
      },
      {
        id: "pending",
        title: "Pending test promotion",
        details: ["Test-only detail"],
        status: "pending-approval",
      },
      {
        id: "expired",
        title: "Expired test promotion",
        details: ["Test-only detail"],
        status: "expired",
      },
    ] as const satisfies readonly Promotion[];

    expect(getApprovedPromotions(records).map(({ id }) => id)).toEqual([
      "approved",
    ]);
  });
});
