import type { Metadata } from "next";

import { PatientStories } from "../../components/sections/PatientStories";
import { TransformationGallery } from "../../components/sections/TransformationGallery";
import { TransformationsCallToAction } from "../../components/sections/TransformationsCallToAction";
import { TransformationsHero } from "../../components/sections/TransformationsHero";

export const metadata: Metadata = {
  title: "Transformation Gallery | Kave Dental Clinic",
  description:
    "View consented transformation content from Kave Dental Clinic when approved for publication, and explore consultation information.",
};

export default function TransformationsPage() {
  return (
    <main>
      <TransformationsHero />
      <TransformationGallery />
      <PatientStories />
      <TransformationsCallToAction />
    </main>
  );
}
