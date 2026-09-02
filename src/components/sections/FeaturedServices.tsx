import Link from "next/link";

import type {
  ApprovedService,
  ServiceCategoryRecord,
} from "../../content/services";
import { getAllServiceCategories } from "../../content/services";
import { ResponsiveImage } from "../ui/ResponsiveImage";
import { TextLink } from "../ui/Button";

export interface FeaturedServicesProps {
  services?: readonly ApprovedService[];
  categories?: readonly ServiceCategoryRecord[];
}

interface ServiceCardProps {
  index: number;
  service: ApprovedService;
}

export function ServiceCard({ index, service }: ServiceCardProps) {
  return (
    <li className="relative flex min-h-[28rem] flex-col overflow-hidden border border-border bg-surface-raised p-card-y text-text">
      <span
        aria-hidden="true"
        className="absolute -right-cluster -top-cluster font-display text-[6rem] leading-none text-border/60"
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
        <p className="mt-cluster text-body text-text-muted">
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

interface CategoryCardProps {
  category: ServiceCategoryRecord;
}

export function CategoryPillarCard({ category }: CategoryCardProps) {
  return (
    <li className="h-full">
      <Link
        href={`/services#${category.anchorId}`}
        aria-label={`Explore ${category.name}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden border border-border bg-surface-raised text-text transition-all duration-300 hover:border-action/60 focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus focus-visible:ring-offset-[length:var(--focus-ring-offset)]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <ResponsiveImage
            className="h-full w-full rounded-none object-cover transition-transform duration-500 group-hover:scale-105"
            image={category.image}
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/20 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute right-3 top-2 font-display text-4xl font-black text-white/80 drop-shadow-md select-none"
          >
            {category.number}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between p-card-y">
          <div>
            <h3 className="font-display text-card font-bold text-text transition-colors group-hover:text-action">
              {category.name}
            </h3>
            <p className="mt-cluster text-body text-text-muted">
              {category.shortSummary}
            </p>

            <div className="mt-card-y flex flex-wrap gap-1.5">
              {category.featuredProcedures.map((procName) => (
                <span
                  key={procName}
                  className="inline-block rounded border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text-muted"
                >
                  {procName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export function FeaturedServices({
  services,
  categories,
}: FeaturedServicesProps) {
  // If specific individual services prop is passed, render legacy/approved service cards
  if (services !== undefined) {
    return (
      <section
        aria-labelledby="featured-services-heading"
        className="border-t border-border bg-surface text-text"
      >
        <div className="mx-auto w-full max-w-wide px-gutter py-section">
          <div className="grid items-end gap-stack md:grid-cols-[minmax(0,1fr)_minmax(16rem,28rem)]">
            <div>
              <h2
                className="font-display text-heading font-extrabold uppercase"
                id="featured-services-heading"
              >
                Featured services
              </h2>
            </div>
            <p className="text-body text-text-muted">
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
              className="mt-card-y border border-border bg-surface-raised p-card-y"
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

  // Default home route presentation: render all 6 core clinical disciplines
  const activeCategories = categories ?? getAllServiceCategories();

  return (
    <section
      aria-labelledby="featured-services-heading"
      className="border-t border-border bg-surface text-text"
    >
      <div className="mx-auto w-full max-w-wide px-gutter py-section">
        <div className="grid items-end gap-stack md:grid-cols-[minmax(0,1fr)_minmax(16rem,28rem)]">
          <div>
            <h2
              className="font-display text-heading font-extrabold uppercase text-text"
              id="featured-services-heading"
            >
              Featured Services
            </h2>
          </div>
        </div>

        <ul className="mt-card-y grid grid-cols-1 gap-stack md:grid-cols-2 lg:grid-cols-3">
          {activeCategories.map((category) => (
            <CategoryPillarCard key={category.id} category={category} />
          ))}
        </ul>
      </div>
    </section>
  );
}
