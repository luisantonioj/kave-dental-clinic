import type { Metadata } from "next";

import { PatientStories } from "../../components/sections/PatientStories";
import { TransformationGallery } from "../../components/sections/TransformationGallery";
import { TransformationsCallToAction } from "../../components/sections/TransformationsCallToAction";
import { TransformationsHero } from "../../components/sections/TransformationsHero";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Transformation Gallery | Kave Dental Clinic",
  "View consented transformation content from Kave Dental Clinic when approved for publication, and explore consultation information.",
);

export default function TransformationsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <TransformationsHero />
      <TransformationGallery />
      <PatientStories />
      <TransformationsCallToAction />
    </main>
  );
}
