import type { Metadata } from "next";

import { FeaturedServices } from "../components/sections/FeaturedServices";
import { HomeHero } from "../components/sections/HomeHero";
import { PromotionSection } from "../components/sections/PromotionSection";
import { TransformationPreview } from "../components/sections/TransformationPreview";
import { createPageMetadata } from "../lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Kave Dental Clinic | Services and Contact",
  "Explore Kave Dental Clinic services, approved transformation content, and verified Quezon City contact details.",
);

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HomeHero />
      <FeaturedServices />
      <TransformationPreview />
      <PromotionSection />
    </main>
  );
}
