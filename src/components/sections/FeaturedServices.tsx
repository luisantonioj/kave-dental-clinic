import type { ApprovedService } from "../../content/services";
import { getApprovedServices } from "../../content/services";
import { ResponsiveImage } from "../ui/ResponsiveImage";
import { TextLink } from "../ui/Button";

export interface FeaturedServicesProps {
  services?: readonly ApprovedService[];
}

interface ServiceCardProps {
  index: number;
  service: ApprovedService;
}

export function ServiceCard({ index, service }: ServiceCardProps) {
  return (
    <li className="relative flex min-h-[28rem] flex-col overflow-hidden border border-border-strong bg-surface-inverse-raised p-card-y text-text-inverse">
      <span
        aria-hidden="true"
        className="absolute -right-cluster -top-cluster font-display text-[6rem] leading-none text-border-strong/20"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative z-10">
        <p className="text-label uppercase tracking-[0.25em] text-action">
          {service.category}
        </p>
        <h3 className="mt-cluster font-display text-card font-bold">
          {service.name}
        </h3>
        <p className="mt-cluster text-body text-text-inverse-muted">
          {service.summary}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-card-y">
        <ResponsiveImage
          image={service.image}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <TextLink
          className="mt-cluster text-action"
          href={service.detailRoute ?? "/services"}
        >
          Learn more
        </TextLink>
      </div>
    </li>
  );
}

export function FeaturedServices({
  services = getApprovedServices(),
}: FeaturedServicesProps) {
  return (
    <section
      aria-labelledby="featured-services-heading"
      className="border-t border-border-strong bg-surface-inverse text-text-inverse"
    >
      <div className="mx-auto w-full max-w-wide px-gutter py-section">
        <div className="grid items-end gap-stack md:grid-cols-[minmax(0,1fr)_minmax(16rem,28rem)]">
          <div>
            <p className="text-label font-bold uppercase tracking-label text-action">
              Explore care
            </p>
            <h2
              className="mt-cluster font-display text-heading font-extrabold uppercase"
              id="featured-services-heading"
            >
              Featured services
            </h2>
          </div>
          <p className="text-body text-text-inverse-muted">
            Service details are published only after the clinic approves the
            wording and supporting media.
          </p>
        </div>

        {services.length > 0 ? (
          <ul className="mt-card-y grid grid-cols-1 gap-stack sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard index={index} key={service.id} service={service} />
            ))}
          </ul>
        ) : (
          <div
            className="mt-card-y border border-border-strong bg-surface-inverse-raised p-card-y"
            role="status"
          >
            <p className="max-w-reading text-lead">
              Detailed service cards are awaiting clinic-approved images and
              wording.
            </p>
            <TextLink className="mt-cluster text-action" href="/services">
              Visit services
            </TextLink>
          </div>
        )}
      </div>
    </section>
  );
}
