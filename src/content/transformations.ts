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

export const TRANSFORMATION_RECORDS =
  [] as const satisfies readonly Transformation[];

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

export const PATIENT_STORY_RECORDS =
  [] as const satisfies readonly PatientStory[];

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
