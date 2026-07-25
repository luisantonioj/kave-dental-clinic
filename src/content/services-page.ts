export interface ServicesHeroContent {
  eyebrow: string;
  heading: string;
  description: string;
}

export interface ServiceDiscussionPoint {
  id: string;
  label: string;
  heading: string;
  description: string;
}

export interface CrownAnatomyPoint {
  id: string;
  label: string;
  description: string;
}

export interface ApprovedLaboratoryStory {
  status: "approved";
  heading: string;
  description: string;
  details: readonly string[];
}

export const SERVICES_HERO = {
  eyebrow: "Featured services",
  heading: "Zirconia and featured dental services",
  description:
    "Explore service categories Kave Dental Clinic publicly features. A consultation is needed to discuss individual suitability, limitations, and treatment planning.",
} as const satisfies ServicesHeroContent;

export const VENEER_DISCUSSION_POINTS = [
  {
    id: "individual-planning",
    label: "01",
    heading: "Individual treatment planning",
    description:
      "A clinician can assess whether a veneer option may suit your oral health, needs, and goals.",
  },
  {
    id: "material-discussion",
    label: "02",
    heading: "Material and appearance discussion",
    description:
      "Ask about available zirconia options, shade planning, preparation, limitations, alternatives, and care before deciding.",
  },
] as const satisfies readonly ServiceDiscussionPoint[];

export const CROWN_ANATOMY_POINTS = [
  {
    id: "fit",
    label: "Fit",
    description:
      "Discuss how a crown would be planned for an individual tooth.",
  },
  {
    id: "core",
    label: "Core",
    description:
      "Ask which restoration options may suit the clinician's recommendation.",
  },
  {
    id: "surface",
    label: "Surface",
    description: "Review finishing and care considerations with the clinic.",
  },
  {
    id: "shade",
    label: "Shade",
    description:
      "Discuss available shade options during an individual consultation.",
  },
] as const satisfies readonly CrownAnatomyPoint[];

export const LABORATORY_STORY: ApprovedLaboratoryStory | null = null;
