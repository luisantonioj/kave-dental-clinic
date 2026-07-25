import type { ApprovedImage } from "./images";

interface TransformationBase {
  id: string;
  title: string;
  treatment: string;
  story?: string;
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
