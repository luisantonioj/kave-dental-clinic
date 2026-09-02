import type { ApprovedImage } from "./images";

interface TransformationBase {
  id: string;
  title: string;
  treatment: string;
}

export interface ApprovedTransformation extends TransformationBase {
  status: "approved";
  image: ApprovedImage;
  consentReference: `consent:${string}`;
}

export interface PendingTransformation extends TransformationBase {
  status: "pending-approval";
  image?: never;
  consentReference?: never;
}

export type Transformation = ApprovedTransformation | PendingTransformation;

export const TRANSFORMATION_RECORDS = [
  {
    id: "zirconia-smile-makeover",
    title: "Zirconia Smile Makeover",
    treatment: "Cosmetic Dentistry • Zirconia Veneers",
    status: "approved",
    consentReference: "consent:kave-treatment-zirconia-01",
    image: {
      src: "/images/transformations/transformation-1.jpg",
      alt: "Natural smile enhancement with custom zirconia veneers",
      width: 1024,
      height: 768,
    },
  },
  {
    id: "ceramic-veneer-design",
    title: "Custom Ceramic Veneer Design",
    treatment: "Smile Aesthetics • Porcelain Veneers",
    status: "approved",
    consentReference: "consent:kave-treatment-veneer-02",
    image: {
      src: "/images/transformations/transformation-2.jpg",
      alt: "Close-up of naturally translucent porcelain ceramic veneers",
      width: 1024,
      height: 768,
    },
  },
  {
    id: "clear-aligner-orthodontics",
    title: "Clear Aligner Alignment",
    treatment: "Orthodontics • Transparent Aligners",
    status: "approved",
    consentReference: "consent:kave-treatment-aligner-03",
    image: {
      src: "/images/transformations/transformation-3.jpg",
      alt: "Even dental alignment following custom clear aligner therapy",
      width: 1024,
      height: 768,
    },
  },
  {
    id: "monolithic-zirconia-restoration",
    title: "Monolithic Zirconia Crown Restoration",
    treatment: "Restorative Care • Fixed Crowns",
    status: "approved",
    consentReference: "consent:kave-treatment-crown-04",
    image: {
      src: "/images/transformations/transformation-4.jpg",
      alt: "Full arch smile restoration using monolithic zirconia crowns",
      width: 1024,
      height: 768,
    },
  },
] as const satisfies readonly Transformation[];

export function isApprovedTransformation(
  transformation: Transformation,
): transformation is ApprovedTransformation {
  return (
    transformation.status === "approved" &&
    transformation.consentReference.slice("consent:".length).trim().length > 0
  );
}

export function getApprovedTransformations(
  transformations: readonly Transformation[] = TRANSFORMATION_RECORDS,
): readonly ApprovedTransformation[] {
  return transformations.filter(isApprovedTransformation);
}

interface PatientStoryBase {
  id: string;
  title: string;
  summary: string;
  treatment: string;
}

export interface ApprovedPatientStory extends PatientStoryBase {
  status: "approved";
  consentReference: `consent:${string}`;
  image?: ApprovedImage;
}

export interface PendingPatientStory extends PatientStoryBase {
  status: "pending-approval";
  consentReference?: never;
  image?: never;
}

export type PatientStory = ApprovedPatientStory | PendingPatientStory;

export const PATIENT_STORY_RECORDS = [
  {
    id: "story-aesthetic-consultation",
    title: "Personalized Smile Design Journey",
    summary:
      "Comprehensive consultation and smile analysis focused on natural harmony, material transparency, and aesthetic tooth proportion.",
    treatment: "Cosmetic Consultation",
    status: "approved",
    consentReference: "consent:kave-story-consult-01",
    image: {
      src: "/images/transformations/patient-story-1.jpg",
      alt: "Patient in Kave Dental Clinic consultation lounge",
      width: 1024,
      height: 768,
    },
  },
] as const satisfies readonly PatientStory[];

export function isApprovedPatientStory(
  story: PatientStory,
): story is ApprovedPatientStory {
  return (
    story.status === "approved" &&
    story.consentReference.slice("consent:".length).trim().length > 0
  );
}

export function getApprovedPatientStories(
  stories: readonly PatientStory[] = PATIENT_STORY_RECORDS,
): readonly ApprovedPatientStory[] {
  return stories.filter(isApprovedPatientStory);
}
