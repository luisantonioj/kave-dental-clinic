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
  image: ApprovedImage;
  featuredProcedures: readonly string[];
  procedures: readonly ProcedureItem[];
}

export const SERVICE_CATEGORIES: readonly ServiceCategoryRecord[] = [
  {
    id: "general-dentistry",
    number: "01",
    name: "General Dentistry",
    shortSummary:
      "Routine check-ups, deep cleaning, and essential preventive oral care.",
    fullDescription:
      "Fundamental preventive care to maintain oral health and detect dental concerns early.",
    anchorId: "general-dentistry",
    detailRoute: "/services",
    image: {
      src: "/images/services/general-dentistry.jpg",
      alt: "Clean clinical dental examination tools on warm stone surface",
      width: 1024,
      height: 768,
    },
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
          "Comprehensive evaluation of teeth, gums, and oral health.",
        consultationNote:
          "Includes assessment of existing restorations and personalized oral care advice.",
        tags: ["Preventive", "Routine Care"],
      },
      {
        id: "oral-prophylaxis",
        name: "Oral Prophylaxis",
        description:
          "Professional cleaning to remove plaque, tartar, and surface stains.",
        consultationNote:
          "Recommended regularly to prevent periodontal issues and tooth decay.",
        tags: ["Deep Clean", "Preventive"],
      },
      {
        id: "tooth-extraction",
        name: "Tooth Extraction",
        description:
          "Safe and comfortable removal of non-restorable or damaged teeth.",
        consultationNote:
          "A clinician will evaluate restorative alternatives before extraction.",
        tags: ["Oral Surgery", "Restorative"],
      },
    ],
  },
  {
    id: "cosmetic-dentistry",
    number: "02",
    name: "Cosmetic Dentistry",
    shortSummary:
      "Custom porcelain and composite veneers with professional whitening for smile design.",
    fullDescription:
      "Aesthetic smile design focused on natural tooth shape, shade, and facial harmony.",
    anchorId: "cosmetic-dentistry",
    detailRoute: "/services",
    isSpecialty: true,
    image: {
      src: "/images/services/cosmetic-dentistry.jpg",
      alt: "Porcelain veneer shade guide and aesthetic smile consultation",
      width: 1024,
      height: 768,
    },
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
          "High-strength ceramic shells for natural smile enhancement and shade design.",
        consultationNote:
          "Evaluates bite alignment, preparation needs, and cosmetic expectations.",
        tags: ["Zirconia", "Smile Design"],
      },
      {
        id: "ceramage-veneers",
        name: "Ceramage Veneers",
        description:
          "Micro-hybrid composite-ceramic veneers offering durability and aesthetics.",
        consultationNote:
          "Discuss material properties and shade matching during your consultation.",
        tags: ["Composite-Ceramic", "Aesthetic"],
      },
      {
        id: "composite-veneers",
        name: "Composite Veneers",
        description:
          "Direct composite resin layering for subtle smile adjustments.",
        consultationNote:
          "Ideal for conservative cosmetic bonding with minimal preparation.",
        tags: ["Conservative", "Direct Bonding"],
      },
      {
        id: "teeth-whitening",
        name: "Teeth Whitening",
        description:
          "Professional in-clinic whitening for a brighter, refreshed smile.",
        consultationNote:
          "Initial shade assessment and gum barrier protection are completed before whitening.",
        tags: ["In-Clinic", "Brightening"],
      },
    ],
  },
  {
    id: "crowns-and-bridges",
    number: "03",
    name: "Crowns & Bridges",
    shortSummary:
      "Durable zirconia crowns, fixed bridges, and precision temporary restorations.",
    fullDescription:
      "Long-lasting fixed prosthetics to protect damaged teeth and seamlessly replace missing teeth.",
    anchorId: "crowns-and-bridges",
    detailRoute: "/services",
    isSpecialty: true,
    image: {
      src: "/images/services/crowns-and-bridges.jpg",
      alt: "Monolithic zirconia dental bridge restoration on stone podium",
      width: 1024,
      height: 768,
    },
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
          "Full-coverage monolithic ceramic crowns with lifelike strength.",
        consultationNote:
          "Protects weakened teeth following root canal treatment or severe wear.",
        tags: ["Monolithic Zirconia", "Fixed Restoration"],
      },
      {
        id: "zirconia-bridges",
        name: "Zirconia Bridges",
        description:
          "Fixed ceramic bridges to replace one or more missing teeth.",
        consultationNote:
          "Span length and abutment tooth health are reviewed during planning.",
        tags: ["Tooth Replacement", "Fixed Prosthetics"],
      },
      {
        id: "zirconia-crowns-and-bridges",
        name: "Zirconia Crowns & Bridges",
        description:
          "Comprehensive fixed prosthetics for full functional and aesthetic smile rehabilitation.",
        consultationNote:
          "Custom-planned to restore natural chewing balance and bite height.",
        tags: ["Full Rehabilitation", "Zirconia"],
      },
      {
        id: "pmma-crowns",
        name: "PMMA Crowns",
        description:
          "Precision-milled provisional crowns for treatment planning.",
        consultationNote:
          "Reliable intermediate phase before permanent crown placement.",
        tags: ["Provisional", "CAD/CAM"],
      },
      {
        id: "pmma-temporaries",
        name: "PMMA Temporaries",
        description:
          "Protective temporary restorations while permanent prosthetics are made.",
        consultationNote:
          "Protects prepared teeth and preserves gum margins during fabrication.",
        tags: ["Temporary Care", "Protection"],
      },
    ],
  },
  {
    id: "orthodontics",
    number: "04",
    name: "Orthodontics",
    shortSummary:
      "Metal brackets, tooth-colored ceramic braces, and discreet clear aligners.",
    fullDescription:
      "Modern alignment therapies to straighten teeth, close gaps, and improve bite function.",
    anchorId: "orthodontics",
    detailRoute: "/services",
    image: {
      src: "/images/services/orthodontics.jpg",
      alt: "Modern clear aligner trays for aesthetic orthodontics",
      width: 1024,
      height: 768,
    },
    featuredProcedures: ["Dental Braces", "Ceramic Braces", "Clear Aligners"],
    procedures: [
      {
        id: "dental-braces",
        name: "Dental Braces",
        description:
          "Traditional fixed braces for effective alignment and bite correction.",
        consultationNote:
          "Treatment duration depends on the complexity of tooth spacing and alignment.",
        tags: ["Traditional", "Alignment"],
      },
      {
        id: "ceramic-braces",
        name: "Ceramic Braces",
        description:
          "Tooth-colored aesthetic brackets for a discreet appearance.",
        consultationNote:
          "Blends naturally with teeth while providing dependable orthodontic movement.",
        tags: ["Aesthetic", "Tooth-Colored"],
      },
      {
        id: "clear-aligners",
        name: "Clear Aligners",
        description:
          "Removable, transparent custom trays for gradual tooth alignment.",
        consultationNote:
          "Suitability depends on case complexity and clinical scan analysis.",
        tags: ["Removable", "Discreet"],
      },
    ],
  },
  {
    id: "dental-implants-surgery",
    number: "05",
    name: "Dental Implants & Surgery",
    shortSummary:
      "Titanium implants, bone grafting, wisdom tooth removal, and minor oral surgery.",
    fullDescription:
      "Permanent tooth replacements and surgical care delivered with comfort and precision.",
    anchorId: "dental-implants-surgery",
    detailRoute: "/services",
    image: {
      src: "/images/services/dental-implants.jpg",
      alt: "Titanium dental implant fixture and ceramic crown component",
      width: 1024,
      height: 768,
    },
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
          "Biocompatible titanium anchors permanently replacing missing tooth roots.",
        consultationNote:
          "Requires bone density evaluation and imaging before surgical planning.",
        tags: ["Tooth Replacement", "Surgical"],
      },
      {
        id: "dental-bone-graft",
        name: "Dental Bone Graft",
        description:
          "Bone augmentation to create stable foundations for implants.",
        consultationNote:
          "Discussed when bone volume needs enhancement after tooth loss.",
        tags: ["Bone Augmentation", "Surgical"],
      },
      {
        id: "wisdom-tooth-extraction",
        name: "Wisdom Tooth Extraction",
        description:
          "Safe surgical removal of impacted or painful third molars.",
        consultationNote:
          "Radiographs are reviewed to assess molar positioning and nerve safety.",
        tags: ["Third Molar", "Surgical"],
      },
      {
        id: "gingivectomy",
        name: "Gingivectomy",
        description:
          "Precision gum contouring to enhance symmetry and periodontal health.",
        consultationNote:
          "Comfortable tissue reshaping under local anesthesia.",
        tags: ["Periodontal", "Gum Contouring"],
      },
      {
        id: "dental-surgery",
        name: "Dental Surgery",
        description:
          "Targeted minor oral surgical procedures for hard and soft tissues.",
        consultationNote:
          "Pre-op evaluation and personalized post-op recovery care are reviewed.",
        tags: ["Oral Surgery", "Minor Surgery"],
      },
    ],
  },
  {
    id: "dentures-restorative",
    number: "06",
    name: "Dentures & Restorative Dentistry",
    shortSummary:
      "Endodontic root canal therapy alongside precision Ivocap removable dentures.",
    fullDescription:
      "Restorative treatments to preserve natural teeth and restore full arch chewing function.",
    anchorId: "dentures-restorative",
    detailRoute: "/services",
    image: {
      src: "/images/services/dentures-restorative.jpg",
      alt: "Precision prosthetic dentistry model and restorative materials",
      width: 1024,
      height: 768,
    },
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
          "Therapy to clean infected pulp, relieve pain, and save the natural tooth.",
        consultationNote:
          "Often paired with a crown restoration to protect tooth strength.",
        tags: ["Endodontics", "Tooth Preservation"],
      },
      {
        id: "ivocap-dentures",
        name: "Ivocap Dentures",
        description:
          "High-precision injection-molded acrylic dentures with exceptional fit.",
        consultationNote:
          "Provides superior suction, low porosity, and enhanced durability.",
        tags: ["Precision Acrylic", "Removable Prosthetics"],
      },
      {
        id: "complete-dentures",
        name: "Complete Dentures",
        description:
          "Custom upper or lower removable appliances for full arch restoration.",
        consultationNote:
          "Accurate impressions ensure balanced chewing and facial support.",
        tags: ["Full Arch", "Removable"],
      },
      {
        id: "full-dentures",
        name: "Full Dentures",
        description:
          "Complete dual-arch dentures restoring chewing function and smile aesthetics.",
        consultationNote:
          "Includes try-in fittings to verify comfort, aesthetics, and phonetics.",
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
