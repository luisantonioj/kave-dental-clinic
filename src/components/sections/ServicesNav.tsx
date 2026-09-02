import { getAllServiceCategories } from "../../content/services";

export function ServicesNav() {
  const categories = getAllServiceCategories();

  return (
    <nav
      aria-label="Services categories"
      className="sticky top-[var(--spacing-header)] z-30 border-y border-border bg-surface/95 py-cluster backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-wide items-center justify-between gap-cluster overflow-x-auto px-gutter scrollbar-none">
        <span className="hidden text-label font-bold uppercase tracking-label text-text-muted md:inline-block">
          Categories:
        </span>
        <ul className="flex flex-nowrap items-center gap-cluster">
          {categories.map((category) => (
            <li key={category.id} className="shrink-0">
              <a
                className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-raised px-4 py-2 text-label font-bold uppercase tracking-wider text-text transition-colors hover:border-action hover:text-action focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                href={`#${category.anchorId}`}
              >
                <span className="text-action group-hover:text-action">
                  {category.number}
                </span>
                <span>{category.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
