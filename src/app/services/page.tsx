import type { Metadata } from "next";

import { CrownAnatomy } from "../../components/sections/CrownAnatomy";
import { LaboratoryStory } from "../../components/sections/LaboratoryStory";
import { ServicesCallToAction } from "../../components/sections/ServicesCallToAction";
import { ServicesHero } from "../../components/sections/ServicesHero";
import { VeneerOverview } from "../../components/sections/VeneerOverview";
import { LABORATORY_STORY } from "../../content/services-page";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Dental Services | Kave Dental Clinic",
  "Explore featured dental service information from Kave Dental Clinic and topics to discuss during an individual consultation.",
);

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <ServicesHero />
      <VeneerOverview />
      <CrownAnatomy />
      <LaboratoryStory story={LABORATORY_STORY} />
      <ServicesCallToAction />
    </main>
  );
}
