import {
  getAllServiceCategories,
  type ServiceCategoryRecord,
  type ProcedureItem,
} from "../../content/services";
import { ResponsiveImage } from "../ui/ResponsiveImage";
import { TextLink } from "../ui/Button";

interface ProcedureCardProps {
  procedure: ProcedureItem;
}

function ProcedureCard({ procedure }: ProcedureCardProps) {
  return (
    <article className="flex flex-col justify-between border border-border bg-surface-raised p-card-y transition-colors hover:border-border-strong">
      <div>
        {procedure.tags && procedure.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {procedure.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded border border-border px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-action"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h4 className="font-display text-card font-bold text-text">
          {procedure.name}
        </h4>
        <p className="mt-1 text-sm text-text-muted">{procedure.description}</p>
        {procedure.consultationNote && (
          <p className="mt-2 border-l-2 border-action/60 pl-2.5 text-xs text-text-muted/80">
            {procedure.consultationNote}
          </p>
        )}
      </div>

      <div className="mt-4 border-t border-border pt-2.5">
        <TextLink className="text-action text-xs font-bold" href="/booking">
          Consult on this procedure →
        </TextLink>
      </div>
    </article>
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
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface-raised">
            <ResponsiveImage
              className="h-full w-full object-cover"
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
              <span className="inline-block rounded-full border border-border bg-surface-raised/90 px-3 py-1 text-xs font-semibold text-action backdrop-blur-sm">
                {category.isSpecialty
                  ? "Specialty Discipline"
                  : "Clinical Care"}{" "}
                • {category.procedures.length} procedures
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
          <p className="text-label font-bold uppercase tracking-label text-action">
            Complete Directory
          </p>
          <h2
            id="services-catalog-heading"
            className="mt-cluster font-display text-heading font-extrabold uppercase text-text"
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
