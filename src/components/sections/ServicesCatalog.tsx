import {
  getAllServiceCategories,
  type ServiceCategoryRecord,
  type ProcedureItem,
} from "../../content/services";
import { TextLink } from "../ui/Button";

interface ProcedureCardProps {
  procedure: ProcedureItem;
}

function ProcedureCard({ procedure }: ProcedureCardProps) {
  return (
    <article className="flex flex-col justify-between border border-border bg-surface-raised p-card-y transition-colors hover:border-border-strong">
      <div>
        {procedure.tags && procedure.tags.length > 0 && (
          <div className="mb-cluster flex flex-wrap gap-1.5">
            {procedure.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded border border-border px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-action"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h4 className="font-display text-card font-bold text-text">
          {procedure.name}
        </h4>
        <p className="mt-cluster text-body text-text-muted">
          {procedure.description}
        </p>
        {procedure.consultationNote && (
          <p className="mt-cluster border-l-2 border-action/60 pl-3 text-xs italic text-text-muted">
            {procedure.consultationNote}
          </p>
        )}
      </div>

      <div className="mt-card-y border-t border-border pt-cluster">
        <TextLink className="text-action text-xs" href="/booking">
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
      className="scroll-mt-[calc(var(--spacing-header)+4rem)] border-t border-border pt-section"
    >
      <div className="grid gap-stack lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-section">
        <div>
          <div className="flex items-center gap-2 text-label font-bold uppercase tracking-label text-action">
            <span>{category.number}</span>
            <span>•</span>
            <span>
              {category.isSpecialty ? "Specialty Discipline" : "Clinical Care"}
            </span>
          </div>
          <h3
            id={headingId}
            className="mt-cluster font-display text-heading font-extrabold uppercase text-text"
          >
            {category.name}
          </h3>
          <p className="mt-stack max-w-reading text-lead text-text-muted">
            {category.fullDescription}
          </p>
          <div className="mt-stack">
            <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-muted">
              {category.procedures.length} procedures available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-stack sm:grid-cols-2">
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
            Every smile is unique. Review our structured clinical disciplines
            below and book a comprehensive consultation to determine the ideal
            treatment approach for your oral health.
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
