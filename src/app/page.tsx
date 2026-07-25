import type { Metadata } from "next";

import { FeaturedServices } from "../components/sections/FeaturedServices";
import { HomeHero } from "../components/sections/HomeHero";
import { PromotionSection } from "../components/sections/PromotionSection";
import { TransformationPreview } from "../components/sections/TransformationPreview";

export const metadata: Metadata = {
  title: "Kave Dental Clinic | Services and Contact",
  description:
    "Explore Kave Dental Clinic services, approved transformation content, and verified Quezon City contact details.",
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <FeaturedServices />
      <TransformationPreview />
      <PromotionSection />
    </main>
  );
}
