import type { Metadata } from "next";

import { PatientStories } from "../../../components/sections/PatientStories";
import { SocialFeed } from "../../../components/sections/SocialFeed";
import { TransformationGallery } from "../../../components/sections/TransformationGallery";
import { TransformationsCallToAction } from "../../../components/sections/TransformationsCallToAction";
import { TransformationsHero } from "../../../components/sections/TransformationsHero";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Transformation Gallery | Kave Dental Clinic",
  "View consented transformation content and curated official social posts from Kave Dental Clinic.",
);

export default function TransformationsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <TransformationsHero />
      <TransformationGallery />
      <SocialFeed />
      <PatientStories />
      <TransformationsCallToAction />
    </main>
  );
}
