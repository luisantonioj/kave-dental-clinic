import Link from "next/link";

import {
  getAllServiceCategories,
  type ServiceCategoryRecord,
  type ProcedureItem,
} from "../../content/services";
import { ResponsiveImage } from "../ui/ResponsiveImage";

interface ProcedureCardProps {
  procedure: ProcedureItem;
}

function ProcedureCard({ procedure }: ProcedureCardProps) {
  return (
    <Link
      href="/booking"
      aria-label={`Book consultation for ${procedure.name}`}
      className="group flex h-full flex-col justify-between border border-border bg-surface-raised p-card-y transition-all duration-300 hover:border-action/60 focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus focus-visible:ring-offset-[length:var(--focus-ring-offset)]"
    >
      <div>
        <h4 className="font-display text-card font-bold text-text transition-colors group-hover:text-action">
          {procedure.name}
        </h4>
      </div>

      <div className="my-auto py-3">
        <p className="text-body leading-relaxed text-text-muted">
          {procedure.description}
        </p>
      </div>

      {procedure.consultationNote && (
        <div className="mt-auto pt-2">
          <p className="rounded-r border-l-2 border-action/60 bg-surface/50 px-3 py-2 text-xs leading-relaxed text-text-muted/90">
            {procedure.consultationNote}
          </p>
        </div>
      )}
    </Link>
  );
}

interface CategorySectionProps {
  category: ServiceCategoryRecord;
}

function CategorySection({ category }: CategorySectionProps) {
  const headingId = `heading-${category.anchorId}`;

  return (
    <section
      id={category.anchorId}
      aria-labelledby={headingId}
      className="scroll-mt-[calc(var(--spacing-header)+4.5rem)] border-t border-border pt-section"
    >
      <div className="grid gap-stack lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)] lg:gap-section">
        {/* Visual Category Spotlight Column */}
        <div className="flex flex-col">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-raised">
            <ResponsiveImage
              className="h-full w-full rounded-none object-cover"
              image={category.image}
              sizes="(min-width: 1280px) 35vw, (min-width: 1024px) 40vw, 100vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-surface-raised/90 via-transparent to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute left-4 top-3 font-display text-3xl font-black text-white/90 drop-shadow-md"
            >
              {category.number}
            </span>
            <div className="absolute bottom-3 left-4 right-4">
              <span className="inline-block rounded-full bg-surface-raised/90 px-3 py-1 text-xs font-semibold text-action backdrop-blur-sm shadow-sm">
                {category.procedures.length} procedures
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3
              id={headingId}
              className="font-display text-heading font-extrabold uppercase text-text"
            >
              {category.name}
            </h3>
            <p className="mt-2 text-lead text-text-muted">
              {category.fullDescription}
            </p>
          </div>
        </div>

        {/* Procedures Grid Column */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {category.procedures.map((proc) => (
            <ProcedureCard key={proc.id} procedure={proc} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesCatalog() {
  const categories = getAllServiceCategories();

  return (
    <section
      id="services-catalog"
      aria-labelledby="services-catalog-heading"
      className="bg-surface px-gutter pb-section"
    >
      <div className="mx-auto w-full max-w-wide">
        <div className="pt-section pb-stack">
          <h2
            id="services-catalog-heading"
            className="font-display text-heading font-extrabold uppercase text-text"
          >
            All Services & Clinical Procedures
          </h2>
          <p className="mt-cluster max-w-reading text-lead text-text-muted">
            Explore our visual procedure catalog below. An individual
            consultation is the first step to assess suitability, discuss
            materials, and personalize your treatment plan.
          </p>
        </div>

        <div className="flex flex-col gap-section">
          {categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
