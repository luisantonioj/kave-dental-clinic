import type { ApprovedImage } from "./images";
import type { AppRoute } from "./navigation";

export type ServiceCategoryKey =
  | "general-dentistry"
  | "cosmetic-dentistry"
  | "crowns-and-bridges"
  | "orthodontics"
  | "dental-implants-surgery"
  | "dentures-restorative";

export interface ProcedureItem {
  id: string;
  name: string;
  description: string;
  consultationNote?: string;
  tags?: readonly string[];
}

export interface ServiceCategoryRecord {
  id: ServiceCategoryKey;
  number: string;
  name: string;
  shortSummary: string;
  fullDescription: string;
  anchorId: string;
  detailRoute: AppRoute;
  isSpecialty?: boolean;
  featuredProcedures: readonly string[];
  procedures: readonly ProcedureItem[];
}

export const SERVICE_CATEGORIES: readonly ServiceCategoryRecord[] = [
  {
    id: "general-dentistry",
    number: "01",
    name: "General Dentistry",
    shortSummary:
      "Comprehensive oral examinations, preventive cleanings, and essential extractions for ongoing dental health.",
    fullDescription:
      "Routine preventive and foundational oral care to maintain long-term gum and tooth health, detect issues early, and keep your smile healthy.",
    anchorId: "general-dentistry",
    detailRoute: "/services",
    featuredProcedures: [
      "Dental Check-up",
      "Oral Prophylaxis",
      "Tooth Extraction",
    ],
    procedures: [
      {
        id: "dental-check-up",
        name: "Dental Check-up",
        description:
          "Comprehensive clinical examination of teeth, gums, and oral tissues to evaluate overall oral health and identify concerns early.",
        consultationNote:
          "Includes assessment of existing restorations, periodontal health, and personalized oral care guidance.",
        tags: ["Preventive", "Routine Care"],
      },
      {
        id: "oral-prophylaxis",
        name: "Oral Prophylaxis",
        description:
          "Professional teeth cleaning to remove plaque, calculus (tartar), and surface stains for optimal oral hygiene.",
        consultationNote:
          "Recommended at regular intervals to help prevent periodontal disease and tooth decay.",
        tags: ["Deep Clean", "Preventive"],
      },
      {
        id: "tooth-extraction",
        name: "Tooth Extraction",
        description:
          "Careful removal of non-restorable, severely decayed, or problematic teeth with patient comfort in focus.",
        consultationNote:
          "A clinician will evaluate whether a tooth can be restored before recommending an extraction.",
        tags: ["Oral Surgery", "Restorative"],
      },
    ],
  },
  {
    id: "cosmetic-dentistry",
    number: "02",
    name: "Cosmetic Dentistry",
    shortSummary:
      "Precision porcelain, ceramage, and composite veneers alongside professional whitening for individualized smile design.",
    fullDescription:
      "Smile design solutions tailored to your individual aesthetic goals, focusing on natural appearance, facial harmony, and conservative tooth preparation.",
    anchorId: "cosmetic-dentistry",
    detailRoute: "/services",
    isSpecialty: true,
    featuredProcedures: [
      "Zirconia Veneers",
      "Ceramage Veneers",
      "Composite Veneers",
      "Teeth Whitening",
    ],
    procedures: [
      {
        id: "zirconia-veneers",
        name: "Zirconia Veneers",
        description:
          "High-strength, custom-milled ceramic shells designed for natural aesthetics, durability, and individualized shade matching.",
        consultationNote:
          "Requires consultation to evaluate bite alignment, tooth preparation needs, and cosmetic expectations.",
        tags: ["Zirconia", "Smile Design"],
      },
      {
        id: "ceramage-veneers",
        name: "Ceramage Veneers",
        description:
          "Micro-hybrid composite-ceramic veneers offering high polishability, elasticity, and aesthetic enhancement.",
        consultationNote:
          "Discuss material characteristics and shade matching during an individual assessment.",
        tags: ["Composite-Ceramic", "Aesthetic"],
      },
      {
        id: "composite-veneers",
        name: "Composite Veneers",
        description:
          "Direct or indirect composite resin layering to reshape, contour, or brighten teeth with minimal tooth preparation.",
        consultationNote:
          "Ideal for subtle cosmetic adjustments and conservative smile enhancements.",
        tags: ["Conservative", "Direct Bonding"],
      },
      {
        id: "teeth-whitening",
        name: "Teeth Whitening",
        description:
          "Professional in-clinic whitening treatments designed to safely brighten discolored or stained teeth.",
        consultationNote:
          "Initial shade evaluation and gum barrier protection are reviewed before treatment.",
        tags: ["In-Clinic", "Brightening"],
      },
    ],
  },
  {
    id: "crowns-and-bridges",
    number: "03",
    name: "Crowns & Bridges",
    shortSummary:
      "Fixed prosthodontic restorations including monolithic zirconia, bridges, and precision PMMA temporaries.",
    fullDescription:
      "Durable fixed restorations engineered to protect compromised teeth, restore chewing function, and seamlessly replace missing teeth.",
    anchorId: "crowns-and-bridges",
    detailRoute: "/services",
    isSpecialty: true,
    featuredProcedures: [
      "Zirconia Crowns",
      "Zirconia Bridges",
      "PMMA Temporaries",
    ],
    procedures: [
      {
        id: "zirconia-crowns",
        name: "Zirconia Crowns",
        description:
          "Full-coverage monolithic or layered zirconia restorations providing exceptional strength and lifelike translucency.",
        consultationNote:
          "Custom-designed to protect weakened teeth following root canal therapy or significant tooth structure loss.",
        tags: ["Monolithic Zirconia", "Fixed Restoration"],
      },
      {
        id: "zirconia-bridges",
        name: "Zirconia Bridges",
        description:
          "Fixed bridges anchored to adjacent teeth or implants to replace one or more missing teeth with lasting stability.",
        consultationNote:
          "Span length and abutment tooth stability are assessed during diagnostic planning.",
        tags: ["Tooth Replacement", "Fixed Prosthetics"],
      },
      {
        id: "zirconia-crowns-and-bridges",
        name: "Zirconia Crowns & Bridges",
        description:
          "Combined fixed prosthetic solutions for comprehensive restorative and functional smile rehabilitation.",
        consultationNote:
          "Planned in coordination with occlusion and aesthetic goals.",
        tags: ["Full Rehabilitation", "Zirconia"],
      },
      {
        id: "pmma-crowns",
        name: "PMMA Crowns",
        description:
          "Precision-milled polymethyl methacrylate crowns used for intermediate restorations and aesthetic evaluation.",
        consultationNote:
          "Serves as a reliable provisional phase before final ceramic placement.",
        tags: ["Provisional", "CAD/CAM"],
      },
      {
        id: "pmma-temporaries",
        name: "PMMA Temporaries",
        description:
          "High-quality temporary restorations to protect prepared teeth and maintain function while permanent prosthetics are crafted.",
        consultationNote:
          "Protects tooth sensitivity and maintains gingival margins during fabrication.",
        tags: ["Temporary Care", "Protection"],
      },
    ],
  },
  {
    id: "orthodontics",
    number: "04",
    name: "Orthodontics",
    shortSummary:
      "Traditional metal braces, tooth-colored ceramic brackets, and discreet clear aligners for alignment correction.",
    fullDescription:
      "Targeted orthodontic therapies designed to align crooked or crowded teeth, close gaps, improve bite mechanics, and promote long-term dental health.",
    anchorId: "orthodontics",
    detailRoute: "/services",
    featuredProcedures: ["Dental Braces", "Ceramic Braces", "Clear Aligners"],
    procedures: [
      {
        id: "dental-braces",
        name: "Dental Braces",
        description:
          "Reliable traditional fixed brackets and archwires to correct moderate to severe misalignment and bite discrepancies.",
        consultationNote:
          "Treatment duration depends on the complexity of crowding, spacing, and jaw alignment.",
        tags: ["Traditional", "Alignment"],
      },
      {
        id: "ceramic-braces",
        name: "Ceramic Braces",
        description:
          "Tooth-colored aesthetic ceramic brackets that blend naturally with teeth while providing dependable tooth movement.",
        consultationNote:
          "A discreet alternative to traditional metal brackets with comparable mechanical efficacy.",
        tags: ["Aesthetic", "Tooth-Colored"],
      },
      {
        id: "clear-aligners",
        name: "Clear Aligners",
        description:
          "Discreet, removable custom clear trays designed for comfortable, gradual alignment adjustments.",
        consultationNote:
          "Suitability depends on case complexity, compliance, and clinical diagnostic scans.",
        tags: ["Removable", "Discreet"],
      },
    ],
  },
  {
    id: "dental-implants-surgery",
    number: "05",
    name: "Dental Implants & Surgery",
    shortSummary:
      "Permanent tooth replacement implants, bone grafting, wisdom tooth removal, and minor surgical procedures.",
    fullDescription:
      "Advanced surgical solutions to replace missing tooth roots, preserve bone structure, and manage complex dental conditions safely.",
    anchorId: "dental-implants-surgery",
    detailRoute: "/services",
    featuredProcedures: [
      "Dental Implants",
      "Dental Bone Graft",
      "Wisdom Tooth Extraction",
      "Gingivectomy",
    ],
    procedures: [
      {
        id: "dental-implants",
        name: "Dental Implants",
        description:
          "Biocompatible titanium fixtures surgically placed into the jawbone to serve as stable anchors for crowns, bridges, or dentures.",
        consultationNote:
          "Requires bone density evaluation and radiographic imaging before surgical planning.",
        tags: ["Tooth Replacement", "Surgical"],
      },
      {
        id: "dental-bone-graft",
        name: "Dental Bone Graft",
        description:
          "Bone augmentation procedures to build sufficient bone volume and density for successful implant placement.",
        consultationNote:
          "Discussed when jawbone ridge resorption has occurred following tooth loss.",
        tags: ["Bone Augmentation", "Surgical"],
      },
      {
        id: "wisdom-tooth-extraction",
        name: "Wisdom Tooth Extraction",
        description:
          "Surgical removal of impacted, painful, or misaligned third molars to prevent crowding, cysts, and infection.",
        consultationNote:
          "Panoramic radiograph assessment is required to plan surgical access and nerve proximity.",
        tags: ["Third Molar", "Surgical"],
      },
      {
        id: "gingivectomy",
        name: "Gingivectomy",
        description:
          "Precision gum reshaping procedure to remove excess tissue, treat periodontal pockets, or improve gumline symmetry.",
        consultationNote:
          "Performed under local anesthesia for comfortable tissue contouring.",
        tags: ["Periodontal", "Gum Contouring"],
      },
      {
        id: "dental-surgery",
        name: "Dental Surgery",
        description:
          "Minor surgical interventions for soft and hard oral tissue management tailored to individual clinical requirements.",
        consultationNote:
          "Pre-operative health assessment and post-operative recovery guidelines are reviewed in detail.",
        tags: ["Oral Surgery", "Clinical Care"],
      },
    ],
  },
  {
    id: "dentures-restorative",
    number: "06",
    name: "Dentures & Restorative Dentistry",
    shortSummary:
      "Tooth-saving root canal therapy alongside precision Ivocap complete and full removable prosthetics.",
    fullDescription:
      "Restorative and prosthetic care focused on saving damaged natural teeth and replacing multiple missing teeth with well-fitted, comfortable dentures.",
    anchorId: "dentures-restorative",
    detailRoute: "/services",
    featuredProcedures: [
      "Root Canal Treatment",
      "Ivocap Dentures",
      "Complete Dentures",
      "Full Dentures",
    ],
    procedures: [
      {
        id: "root-canal-treatment",
        name: "Root Canal Treatment",
        description:
          "Endodontic therapy to clean, disinfect, and seal infected or inflamed tooth pulp, relieving pain and preserving the natural tooth.",
        consultationNote:
          "Often paired with a protective crown restoration to restore structural integrity.",
        tags: ["Endodontics", "Tooth Preservation"],
      },
      {
        id: "ivocap-dentures",
        name: "Ivocap Dentures",
        description:
          "High-precision injection-molded acrylic dentures offering superior fit, minimal shrinkage, and enhanced durability.",
        consultationNote:
          "The Ivocap injection system provides improved suction and reduced porousness compared to conventional acrylics.",
        tags: ["Precision Acrylic", "Removable Prosthetics"],
      },
      {
        id: "complete-dentures",
        name: "Complete Dentures",
        description:
          "Custom-fabricated upper or lower removable appliances to restore full dental arch function and facial support.",
        consultationNote:
          "Detailed impressions and bite registrations ensure balanced chewing contact.",
        tags: ["Full Arch", "Removable"],
      },
      {
        id: "full-dentures",
        name: "Full Dentures",
        description:
          "Comprehensive dual-arch prosthetic solution designed to restore chewing ability, speech, and smile confidence.",
        consultationNote:
          "Includes try-in appointments for personalized aesthetic and phonetics verification.",
        tags: ["Dual Arch", "Smile Rehabilitation"],
      },
    ],
  },
] as const satisfies readonly ServiceCategoryRecord[];

export function getAllServiceCategories(): readonly ServiceCategoryRecord[] {
  return SERVICE_CATEGORIES;
}

export function getServiceCategoryById(
  id: ServiceCategoryKey,
): ServiceCategoryRecord | undefined {
  return SERVICE_CATEGORIES.find((cat) => cat.id === id);
}

// Legacy types and records for backwards compatibility with existing content approval tests
export type ServiceCategory =
  | "aesthetic"
  | "restorative"
  | "orthodontic"
  | "whitening"
  | "general"
  | "surgical";

interface ServiceBase {
  id: string;
  name: string;
  category: ServiceCategory;
  summary: string;
  detailRoute?: AppRoute;
}

export interface ApprovedService extends ServiceBase {
  status: "approved";
  image: ApprovedImage;
}

export interface PendingService extends ServiceBase {
  status: "pending-approval";
  image?: never;
}

export type Service = ApprovedService | PendingService;

export const SERVICE_RECORDS = [
  {
    id: "zirconia-veneers",
    name: "Zirconia Veneers",
    category: "aesthetic",
    summary:
      "Ask the clinic about zirconia veneer options and individual suitability.",
    detailRoute: "/services",
    status: "pending-approval",
  },
  {
    id: "crowns-and-bridges",
    name: "Crowns and Bridges",
    category: "restorative",
    summary:
      "Discuss available restorative options with the clinic based on individual needs.",
    detailRoute: "/services",
    status: "pending-approval",
  },
  {
    id: "dental-braces",
    name: "Dental Braces",
    category: "orthodontic",
    summary:
      "Ask the clinic about available orthodontic options and individual suitability.",
    detailRoute: "/services",
    status: "pending-approval",
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    category: "whitening",
    summary:
      "Consult the clinic about professional whitening options and individual suitability.",
    detailRoute: "/services",
    status: "pending-approval",
  },
] as const satisfies readonly Service[];

export function isApprovedService(
  service: Service,
): service is ApprovedService {
  return service.status === "approved";
}

export function getApprovedServices(
  services: readonly Service[] = SERVICE_RECORDS,
): readonly ApprovedService[] {
  return services.filter(isApprovedService);
}
