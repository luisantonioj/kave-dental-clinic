import type { ApprovedImage } from "./images";
import type { AppRoute } from "./navigation";

export type ServiceCategory =
  "aesthetic" | "restorative" | "orthodontic" | "whitening";

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
