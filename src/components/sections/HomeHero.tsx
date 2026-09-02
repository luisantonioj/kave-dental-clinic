import type { ApprovedImage } from "../../content/images";
import { ButtonLink } from "../ui/Button";
import { ResponsiveImage } from "../ui/ResponsiveImage";

const HERO_IMAGE: ApprovedImage = {
  src: "/images/hero/home-hero.jpg",
  alt: "Modern aesthetic dental clinic interior with warm architectural travertine finishes and natural light",
  width: 960,
  height: 1280,
};

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-var(--spacing-header))] overflow-hidden bg-surface text-text">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_32%,rgba(244,196,48,0.14),transparent_35%),linear-gradient(120deg,var(--color-surface)_20%,var(--color-surface-raised)_64%,var(--color-surface))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] border-l border-border bg-[linear-gradient(135deg,transparent_0_28%,rgba(244,196,48,0.06)_28%_29%,transparent_29%_58%,rgba(244,196,48,0.03)_58%_59%,transparent_59%)] lg:block"
      />

      <div className="mx-auto grid w-full max-w-wide items-center gap-stack px-gutter py-section lg:min-h-[calc(100svh-var(--spacing-header))] lg:grid-cols-[minmax(0,3fr)_minmax(16rem,2fr)] lg:gap-section">
        <div className="max-w-[52rem]">
          <h1 className="text-balance font-display text-display font-extrabold uppercase">
            Your ticket to a{" "}
            <span className="text-action">picture-perfect smile</span>
          </h1>
          <p className="mt-stack max-w-reading text-lead text-text-muted">
            Explore Kave Dental Clinic&apos;s featured services, clinic-approved
            work, and verified contact details.
          </p>
          <div className="mt-card-y flex flex-col gap-cluster sm:flex-row">
            <ButtonLink href="/booking">Explore booking</ButtonLink>
            <ButtonLink href="/transformations" variant="secondary">
              View transformations
            </ButtonLink>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full max-w-xl mx-auto overflow-hidden rounded-image border border-border bg-surface-raised shadow-xl sm:aspect-[16/10] lg:aspect-[4/5] lg:max-w-none">
          <ResponsiveImage
            className="h-full w-full object-cover"
            image={HERO_IMAGE}
            sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-surface/30 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
