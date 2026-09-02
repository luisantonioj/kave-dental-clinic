"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

import {
  getAllServiceCategories,
  type ServiceCategoryRecord,
  type ProcedureItem,
} from "../../content/services";
import { ResponsiveImage } from "../ui/ResponsiveImage";

interface HighlightMatchProps {
  text: string;
  query: string;
}

function HighlightMatch({ text, query }: HighlightMatchProps) {
  const trimmed = query.trim();
  if (!trimmed) {
    return <>{text}</>;
  }

  const escapedQuery = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            className="rounded-xs bg-action/30 px-0.5 font-bold text-inherit"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

interface ProcedureCardProps {
  procedure: ProcedureItem;
  searchQuery: string;
}

function ProcedureCard({ procedure, searchQuery }: ProcedureCardProps) {
  return (
    <Link
      href="/booking"
      aria-label={`Book consultation for ${procedure.name}`}
      className="group flex h-full flex-col justify-between border border-border bg-surface-raised p-card-y transition-all duration-300 hover:border-action/60 focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-focus focus-visible:ring-offset-[length:var(--focus-ring-offset)]"
    >
      <div>
        <h4 className="font-display text-card font-bold text-text transition-colors group-hover:text-action">
          <HighlightMatch text={procedure.name} query={searchQuery} />
        </h4>
        {procedure.tags && procedure.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {procedure.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-xs border border-border bg-surface px-2 py-0.5 text-label font-medium text-text-muted"
              >
                <HighlightMatch text={tag} query={searchQuery} />
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="my-auto py-3">
        <p className="text-body leading-relaxed text-text-muted">
          <HighlightMatch text={procedure.description} query={searchQuery} />
        </p>
      </div>

      {procedure.consultationNote && (
        <div className="mt-auto pt-2">
          <p className="rounded-r border-l-2 border-action/60 bg-surface/50 px-3 py-2 text-xs leading-relaxed text-text-muted/90">
            <HighlightMatch
              text={procedure.consultationNote}
              query={searchQuery}
            />
          </p>
        </div>
      )}
    </Link>
  );
}

interface CategorySectionProps {
  category: ServiceCategoryRecord;
  matchingProcedures: readonly ProcedureItem[];
  searchQuery: string;
}

function CategorySection({
  category,
  matchingProcedures,
  searchQuery,
}: CategorySectionProps) {
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
              <span className="inline-block rounded-full bg-surface-raised/90 px-3 py-1 text-xs font-semibold text-action shadow-sm backdrop-blur-sm">
                {matchingProcedures.length}{" "}
                {matchingProcedures.length === 1 ? "procedure" : "procedures"}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3
              id={headingId}
              className="font-display text-heading font-extrabold uppercase text-text"
            >
              <HighlightMatch text={category.name} query={searchQuery} />
            </h3>
            <p className="mt-2 text-lead text-text-muted">
              <HighlightMatch
                text={category.fullDescription}
                query={searchQuery}
              />
            </p>
          </div>
        </div>

        {/* Procedures Grid Column */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {matchingProcedures.map((proc) => (
            <ProcedureCard
              key={proc.id}
              procedure={proc}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function matchesProcedure(proc: ProcedureItem, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;

  if (proc.name.toLowerCase().includes(q)) return true;
  if (proc.description.toLowerCase().includes(q)) return true;
  if (proc.consultationNote?.toLowerCase().includes(q)) return true;
  if (proc.tags?.some((t) => t.toLowerCase().includes(q))) return true;

  return false;
}

export function ServicesCatalog() {
  const categories = getAllServiceCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const searchInputId = useId();

  // Calculate matching procedures per category based on active search query
  const categoryResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return categories.map((category) => {
      const categoryMatches =
        category.name.toLowerCase().includes(query) ||
        category.fullDescription.toLowerCase().includes(query) ||
        category.shortSummary.toLowerCase().includes(query);

      const matchingProcedures = category.procedures.filter((proc) => {
        if (!query) return true;
        return categoryMatches || matchesProcedure(proc, query);
      });

      return {
        category,
        matchingProcedures,
        hasMatches: matchingProcedures.length > 0,
      };
    });
  }, [categories, searchQuery]);

  // Filter based on selected category tab
  const displayedCategories = useMemo(() => {
    return categoryResults.filter(({ category, hasMatches }) => {
      if (selectedCategory !== "all" && category.id !== selectedCategory) {
        return false;
      }
      return hasMatches;
    });
  }, [categoryResults, selectedCategory]);

  const totalMatchingProcedures = useMemo(() => {
    return displayedCategories.reduce(
      (sum, { matchingProcedures }) => sum + matchingProcedures.length,
      0,
    );
  }, [displayedCategories]);

  const allCategoriesTotalMatches = useMemo(() => {
    return categoryResults.reduce(
      (sum, { matchingProcedures }) => sum + matchingProcedures.length,
      0,
    );
  }, [categoryResults]);

  const isFiltering = searchQuery.trim().length > 0 || selectedCategory !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <>
      {/* Sticky Categories & Filter Navigation Bar */}
      <nav
        aria-label="Services categories"
        className="sticky top-[var(--spacing-header)] z-30 border-y border-border bg-surface/95 py-3 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-wide items-center justify-between gap-cluster overflow-x-auto px-gutter scrollbar-none">
          <span className="hidden text-label font-bold uppercase tracking-label text-text-muted lg:inline-block">
            Categories:
          </span>
          <div
            role="tablist"
            aria-label="Filter procedures by category"
            className="flex flex-nowrap items-center gap-2"
          >
            {/* All Services Pill */}
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
              className={`group inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-label font-bold uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                selectedCategory === "all"
                  ? "border-action bg-action font-extrabold text-action-contrast shadow-sm"
                  : "border-border bg-surface-raised text-text hover:border-action hover:text-action"
              }`}
            >
              <span>All Services</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[0.65rem] font-black ${
                  selectedCategory === "all"
                    ? "bg-action-contrast/15 text-action-contrast"
                    : "bg-surface text-text-muted group-hover:text-action"
                }`}
              >
                {allCategoriesTotalMatches}
              </span>
            </button>

            {/* Individual Category Pills */}
            {categoryResults.map(({ category, matchingProcedures }) => {
              const isSelected = selectedCategory === category.id;
              const count = matchingProcedures.length;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() =>
                    setSelectedCategory(isSelected ? "all" : category.id)
                  }
                  className={`group inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-label font-bold uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                    isSelected
                      ? "border-action bg-action font-extrabold text-action-contrast shadow-sm"
                      : "border-border bg-surface-raised text-text hover:border-action hover:text-action"
                  }`}
                >
                  <span
                    className={
                      isSelected
                        ? "text-action-contrast"
                        : "text-action group-hover:text-action"
                    }
                  >
                    {category.number}
                  </span>
                  <span>{category.name}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[0.65rem] font-black ${
                      isSelected
                        ? "bg-action-contrast/15 text-action-contrast"
                        : "bg-surface text-text-muted group-hover:text-action"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Catalog Section */}
      <section
        id="services-catalog"
        aria-labelledby="services-catalog-heading"
        className="bg-surface px-gutter pb-section"
      >
        <div className="mx-auto w-full max-w-wide">
          <div className="pt-section pb-stack">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2
                  id="services-catalog-heading"
                  className="font-display text-heading font-extrabold uppercase text-text"
                >
                  All Services & Clinical Procedures
                </h2>
                <p className="mt-cluster max-w-reading text-lead text-text-muted">
                  Explore our procedure catalog below. Use the search bar or
                  category pills to find treatments and topics to discuss
                  during your individual consultation.
                </p>
              </div>

              {/* Interactive Search Bar */}
              <div className="w-full lg:max-w-md">
                <label
                  htmlFor={searchInputId}
                  className="mb-2 block text-label font-bold uppercase tracking-wider text-text-muted"
                >
                  Search Procedures & Treatments
                </label>
                <div className="relative flex items-center">
                  <span
                    className="pointer-events-none absolute left-3.5 text-text-muted"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    id={searchInputId}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSearchQuery("");
                      }
                    }}
                    placeholder="Search e.g. zirconia, whitening, braces, implants..."
                    className="w-full rounded-full border border-border bg-surface-raised py-2.5 pl-10 pr-10 text-body text-text placeholder:text-text-muted/60 transition-all focus:border-action focus:outline-none focus:ring-2 focus:ring-action/30"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search query"
                      className="absolute right-2.5 rounded-full p-1 text-text-muted hover:bg-surface hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Accessible Live Region & Filter Status Indicator */}
            <div
              role="status"
              aria-live="polite"
              className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-text-muted"
            >
              {isFiltering ? (
                <div className="flex items-center gap-3">
                  <span>
                    Showing{" "}
                    <strong className="text-text">
                      {totalMatchingProcedures}
                    </strong>{" "}
                    {totalMatchingProcedures === 1 ? "procedure" : "procedures"}
                    {searchQuery.trim() && (
                      <>
                        {" "}
                        matching &ldquo;
                        <span className="text-text font-semibold">
                          {searchQuery}
                        </span>
                        &rdquo;
                      </>
                    )}
                    {selectedCategory !== "all" && (
                      <>
                        {" "}
                        in{" "}
                        <span className="text-text font-semibold">
                          {
                            categories.find((c) => c.id === selectedCategory)
                              ?.name
                          }
                        </span>
                      </>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-bold uppercase tracking-wider text-action underline decoration-action/50 underline-offset-2 hover:decoration-action focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <span>
                  Showing all{" "}
                  <strong className="text-text">
                    {totalMatchingProcedures}
                  </strong>{" "}
                  procedures across 6 clinical categories
                </span>
              )}
            </div>
          </div>

          {/* Filtered Categories List or Empty State */}
          {displayedCategories.length > 0 ? (
            <div className="flex flex-col gap-section">
              {displayedCategories.map(({ category, matchingProcedures }) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  matchingProcedures={matchingProcedures}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          ) : (
            <div className="my-12 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface-raised p-12 text-center">
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface text-text-muted"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-card font-bold text-text">
                No matching procedures found
              </h3>
              <p className="mt-2 max-w-md text-body text-text-muted">
                We couldn&apos;t find any procedures matching &ldquo;
                {searchQuery}&rdquo;
                {selectedCategory !== "all"
                  ? ` in the selected category.`
                  : `.`}{" "}
                Try checking for typos or searching a different term.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-action bg-action px-6 py-2.5 text-label font-extrabold uppercase tracking-wider text-action-contrast transition-colors hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                Reset Search & Show All
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
