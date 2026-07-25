# Implementation Tasks

This backlog is ordered by dependency. Complete one focused checkbox per
implementation change where practical. Mark an item complete only when its
acceptance condition and relevant checks pass.

The current milestone is frontend-only. Items under **Future booking system**
are not authorized implementation work.

## 1. Frontend foundation

- [ ] Scaffold Next.js App Router with TypeScript strict mode and npm.
  **Accept when:** `/` renders from `src/app`, `npm run dev` works, and no
  Firebase package or environment variable exists.
- [ ] Add Tailwind CSS and semantic global-token wiring.
  **Accept when:** a documented CSS variable is consumed through Tailwind and
  no route-specific UI is introduced.
- [ ] Configure ESLint and Prettier with non-mutating check scripts.
  **Accept when:** `npm run lint` and `npm run format:check` pass.
- [ ] Add `npm run typecheck` and production build scripts.
  **Accept when:** both commands pass on the scaffold.
- [ ] Configure Vitest, React Testing Library, and shared test setup.
  **Accept when:** one meaningful smoke test passes through `npm run test`.
- [ ] Configure Playwright with mobile and desktop projects.
  **Accept when:** one route smoke test passes through `npm run test:e2e`.

## 2. Design system and shared content

- [ ] Establish approved font loading and the semantic type scale.
  **Accept when:** display and body styles render without layout shift and have
  documented fallbacks.
- [ ] Define color, spacing, layout, border, radius, and motion tokens from
  repeated Figma values.
  **Accept when:** tokens cover the shared primitives in `docs/design.md`,
  reduced motion is supported, and repeated raw values are avoided.
- [ ] Add typed navigation and verified clinic contact content.
  **Accept when:** TypeScript enforces route and contact shapes and all rendered
  facts match `docs/context.md`.
- [ ] Add typed services, transformations, and promotions content modules.
  **Accept when:** unapproved entries cannot render as approved production
  content and transformation records require a consent reference.
- [ ] Implement accessible shared button and text-link treatments.
  **Accept when:** variants support hover, focus-visible, active, and disabled
  states with keyboard and component tests.
- [ ] Implement responsive `SiteHeader` and mobile navigation.
  **Accept when:** all four routes are reachable, the disclosure is
  keyboard-accessible, focus behavior is tested, and no horizontal overflow
  occurs.
- [ ] Implement `SiteFooter` using verified contact and social details.
  **Accept when:** every route renders identical verified information and no
  empty policy or newsletter action is exposed.
- [ ] Add approved image handling conventions and a reusable responsive image
  treatment.
  **Accept when:** images use `next/image`, reserve dimensions, declare sizes,
  and follow the alt-text rules.

## 3. Home route

- [ ] Implement the responsive home hero and primary calls to action.
  **Accept when:** hierarchy matches Figma, CTAs lead to `/booking` and
  `/transformations`, and mobile text reflows without forced desktop breaks.
- [ ] Implement the featured-services section from typed content.
  **Accept when:** cards adapt from one to four columns without clipping and
  service links use valid routes.
- [ ] Implement the approved transformation preview.
  **Accept when:** only consented assets render and the gallery CTA leads to
  `/transformations`.
- [ ] Implement conditional promotional content.
  **Accept when:** an approved active promotion renders accessibly and a
  pending, expired, or absent promotion leaves a coherent layout.
- [ ] Complete home-route metadata and tests.
  **Accept when:** metadata is unique, keyboard navigation works, responsive
  Playwright coverage passes, and the route has no unverified claims.

## 4. Services route

- [ ] Implement the responsive services editorial hero.
  **Accept when:** the visual hierarchy reflects the Zirconia Specialists frame
  and approved, qualified copy replaces unsupported promises.
- [ ] Implement zirconia veneer benefits from approved content.
  **Accept when:** the section is responsive, accessible, and contains no
  “chip-proof,” lifetime, or guaranteed-result claim without approval.
- [ ] Implement the crown anatomy section.
  **Accept when:** structure and labels remain understandable without imagery
  and all clinical copy has been approved.
- [ ] Implement the laboratory/story section with a safe empty-state variant.
  **Accept when:** unverified in-house laboratory claims can be omitted without
  breaking the page.
- [ ] Complete services calls to action, metadata, and tests.
  **Accept when:** CTAs lead to the static booking route, metadata is unique,
  and responsive and keyboard checks pass.

## 5. Transformations route

- [ ] Implement the transformation gallery from typed, consented records.
  **Accept when:** the layout is responsive, all images have purposeful alt
  text, and unapproved records cannot render.
- [ ] Implement optional patient-story cards.
  **Accept when:** the section handles zero or multiple approved stories without
  fabricated filler content.
- [ ] Implement accessible gallery interaction if interaction is retained.
  **Accept when:** controls are labelled, keyboard-operable, announce position,
  honor reduced motion, and have component tests.
- [ ] Implement the consultation call to action without an active lead form.
  **Accept when:** it links to `/booking` or verified direct contact and collects
  no personal information.
- [ ] Complete transformation metadata and tests.
  **Accept when:** Playwright covers empty and populated approved-content states
  at mobile and desktop widths.

## 6. Static booking route

- [ ] Implement the booking page shell, clinic details, and direct-contact
  cards.
  **Accept when:** all facts match `docs/context.md`, layout is responsive, and
  direct contacts include no entered form values.
- [ ] Implement labelled booking fields with in-memory state only.
  **Accept when:** labels, autocomplete, descriptions, and keyboard order are
  correct and refresh clears all values.
- [ ] Implement accessible presentation-only validation.
  **Accept when:** errors are associated with fields, announced appropriately,
  and tested without transmitting values.
- [ ] Implement the non-submitting final action and status.
  **Accept when:** the UI says online booking is coming soon, never claims an
  appointment exists, and no form action, server action, or API route exists.
- [ ] Add a Playwright privacy-boundary test.
  **Accept when:** entering distinctive values and activating every booking
  control causes no request, URL, storage, cookie, console log, or analytics
  payload containing those values.
- [ ] Complete booking metadata and responsive tests.
  **Accept when:** mobile, tablet, and desktop layouts pass and all controls
  remain reachable at 200% zoom.

## 7. Site-wide quality

- [ ] Audit semantic structure and heading hierarchy across all routes.
  **Accept when:** each page has one meaningful `h1` and logical landmarks and
  headings.
- [ ] Audit keyboard and visible-focus behavior.
  **Accept when:** every action is reachable and operable without a pointer and
  focus is never obscured.
- [ ] Audit WCAG 2.2 AA contrast and reduced-motion behavior.
  **Accept when:** text and controls meet contrast requirements and disabling
  motion loses no information.
- [ ] Audit responsive behavior at 360px, 768px, 1280px, and 1440px.
  **Accept when:** no route has horizontal page scrolling, overlap, clipping,
  or unreachable content.
- [ ] Audit metadata, social previews, and verified structured data.
  **Accept when:** each route has accurate unique metadata and structured data
  contains only approved facts.
- [ ] Audit image performance and page stability.
  **Accept when:** priority is limited to critical imagery, responsive sizes
  are accurate, and images cause no material layout shift.
- [ ] Run the full release check.
  **Accept when:** formatting, lint, type-check, unit/component tests,
  Playwright tests, and the production build all pass.

## 8. Content and launch approval

- [ ] Obtain written approval for final clinic contact details and hours.
  **Accept when:** the approval source and review date are recorded in the
  project's approved content workflow.
- [ ] Resolve every row in the `docs/design.md` content-verification table.
  **Accept when:** each item is approved with evidence, replaced by neutral
  approved copy, or omitted.
- [ ] Obtain publication permission for every patient and staff image.
  **Accept when:** each deployed asset maps to a documented approval and
  appropriate alt text.
- [ ] Complete a production-content review with the clinic.
  **Accept when:** no preview marker, fictional profile, unsupported claim,
  expired promotion, or placeholder link remains.

## Future booking system

Do not begin these tasks until the clinic approves a separate booking-system
specification, privacy requirements, and operational owner.

- [ ] Define appointment states, transitions, cancellation, rescheduling, and
  conflict behavior.
- [ ] Define provider, service, duration, availability, holiday, and
  Asia/Manila timezone rules.
- [ ] Define the minimum patient data, consent language, privacy notice,
  retention, deletion, and data-subject request process.
- [ ] Design Firebase projects, collections, indexes, emulators, and environment
  separation.
- [ ] Design and test deny-by-default Firebase Security Rules.
- [ ] Define staff authentication, roles, session behavior, and account
  recovery.
- [ ] Implement appointment creation with idempotency and concurrency
  protection.
- [ ] Implement notification templates, consent, delivery retries, and failure
  visibility.
- [ ] Implement a least-privilege staff administration workflow and audit
  history.
- [ ] Complete privacy, security, accessibility, load, recovery, and operational
  acceptance testing before enabling public submission.
