# Architecture

## System overview

The initial system is a statically oriented Next.js frontend. It renders typed
clinic content, responsive page sections, and a non-submitting booking
interface. There is no backend, database, authentication layer, or Firebase
runtime in the current milestone.

```text
Approved local content
        │
        ▼
Next.js Server Components ──► Responsive pages and metadata
        │
        └──► Narrow Client Components
              └── In-memory UI state only
```

Server Components are the default. Client Components are limited to behavior
that needs browser state, such as mobile navigation, gallery controls, and the
static booking form's presentation and validation states.

## Route boundaries

| Route              | Main responsibility                                                        | Rendering boundary                                |
| ------------------ | -------------------------------------------------------------------------- | ------------------------------------------------- |
| `/`                | Hero, featured services, transformation preview, promotion, contact footer | Server-first                                      |
| `/services`        | Zirconia-focused editorial content and approved related services           | Server-first                                      |
| `/transformations` | Approved galleries, stories, and consultation call to action               | Server-first; client only for gallery interaction |
| `/booking`         | Form presentation, clinic details, and contact alternatives                | Server page with a narrow form Client Component   |

Shared navigation and footer belong to the root layout. Route-specific sections
remain within their route until their reuse is demonstrated.

The home route is assembled from Server Components. Its featured-service,
transformation-preview, and promotion sections read only through the approved
content selectors. Test fixtures may pass approved records directly to verify
populated layouts, but production uses the repository records and currently
renders the documented safe states because no service image, transformation, or
promotion is approved for publication.

The services route is also assembled entirely from Server Components. Qualified
editorial copy and repeatable consultation points live in the typed
`src/content/services-page.ts` module. Its laboratory story accepts only an
explicitly approved typed record; production currently passes `null` and renders
a neutral verification state instead of implying that a facility, professional,
process, or turnaround promise exists. Decorative route artwork is CSS-only
while publication permission for the Figma photography remains unresolved.

The transformations route remains server-first. Gallery records, patient
stories, and curated social records use discriminated approval states and
require a non-empty internal `consent:` reference before public content can
render. The reference itself is never exposed. Production currently has no
approved records, so the route renders explanatory empty states without
fabricated media. The editorial gallery is static. `SocialFeedClient` is a
narrow client boundary for revealing additional curated records and embedding
playable Meta iframes directly in responsive cards. There is no Meta API,
scraping, runtime synchronization, or account credential.

The booking page keeps its static shell, verified contact cards, and location
content as Server Components. `BookingForm` is the only Client Component on the
route. Its controlled values, presentation-only errors, and result status exist
only in React memory. The form has no `action`; its submit event is intercepted,
and a valid presentation state says that online booking is coming soon, no
appointment was created, and no details were sent. Refreshing or remounting
returns every field to its empty initial state.

## Planned frontend structure

```text
src/
├── app/
│   ├── booking/
│   ├── services/
│   ├── transformations/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── booking/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── content/
│   ├── clinic.ts
│   ├── navigation.ts
│   ├── promotions.ts
│   ├── services.ts
│   └── transformations.ts
├── lib/
└── styles/
    └── globals.css
```

Create only the directories a task immediately uses. `components/ui` is for
small reusable primitives; `components/sections` is for composed editorial
sections. Page files assemble sections and must not become content databases.

## Content interfaces

The exact fields may grow when approved content arrives, but the initial typed
boundary should follow these minimum shapes:

```ts
type AppRoute = "/" | "/services" | "/transformations" | "/booking";

interface NavItem {
  label: string;
  href: AppRoute;
}

interface ContactDetails {
  phoneDisplay: string;
  phoneHref: `tel:${string}`;
  address: string;
  hours: string;
  facebookUrl: `https://${string}`;
  instagramUrl: `https://${string}`;
}

interface Service {
  id: string;
  name: string;
  category: "aesthetic" | "restorative" | "orthodontic" | "whitening";
  summary: string;
  image: ApprovedImage;
  detailRoute?: AppRoute;
}

interface Transformation {
  id: string;
  title: string;
  treatment: string;
  image: ApprovedImage;
  story?: string;
  consentReference: string;
}

interface Promotion {
  id: string;
  title: string;
  details: readonly string[];
  status: "pending-approval" | "approved" | "expired";
}

interface ApprovedSocialPost {
  id: string;
  status: "approved";
  platform: "facebook" | "instagram";
  kind: "post" | "reel" | "video";
  url: `https://${string}`;
  publishedAt: string;
  summary: string;
  consentReference: `consent:${string}`;
  crossPostGroup?: string;
}

interface ApprovedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
```

Only approved promotions may render in a production build. Transformation
content requires a non-empty consent reference kept in the approved content
workflow; the public site must not expose that internal reference.

Curated social records follow the same boundary. Their selectors validate
supported HTTPS Meta URLs, remove tracking parameters, reject malformed or
unsupported records, sort by publication time, remove exact duplicates, and
prefer Instagram when an editor assigns matching `crossPostGroup` values. Social
summaries and dates are approved local content; they are not scraped from Meta.

The implemented content modules use discriminated approval states and export
approved-content selectors. Pending services may remain in the planning catalog
without an approved image, while an approved service requires an
`ApprovedImage`. Approved transformations require an image and a non-empty
`consent:` reference; selectors reject pending records and empty references.
Pending and expired promotions are likewise excluded by the production selector.
No transformation or promotion is currently approved for rendering.

The static booking UI may use:

```ts
interface BookingFormValues {
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}
```

`BookingFormValues` is a view-model only. It may exist in component memory to
render validation states, but it must never cross a network, server, analytics,
URL, cookie, or browser-storage boundary.

## Booking safety boundary

- Render the booking page and fields without a form action, API call, or server
  action.
- Prevent native submission and do not serialize field values.
- Keep the primary action disabled or show an explicit non-submitting “online
  booking is coming soon” result.
- Clear values when the page is refreshed; do not use local or session storage.
- Direct contact actions use only the verified clinic destination. They do not
  prefill a message with form data.
- Automated tests must fail if a booking interaction causes a request or
  navigation containing entered values.

## Assets

- Store only approved brand and clinic media under `public/`.
- Use `next/image` with intrinsic dimensions and accurate responsive `sizes`.
- Choose a modern source format when quality permits and preserve originals
  outside the deployed application if required by the clinic's asset workflow.
- Use descriptive, contextual alt text for meaningful images and empty alt text
  for decoration.
- Never download patient media from social networks for reuse without explicit
  permission and a traceable approval record.
- Curated social records retain only an approved summary and canonical public
  URL. Official Meta embeds remain remotely hosted and are loaded on demand.
- Keep Figma export filenames human-readable and stable; do not couple
  application code to temporary Figma asset URLs.

## Styling and design tokens

Semantic CSS variables in `src/styles/globals.css` are the source of truth for
color, typography, spacing, borders, radii, container widths, and motion.
Tailwind consumes those variables. Components should use semantic names rather
than raw design values so responsive adjustments and future themes do not
require page-level rewrites.

No formal Figma variables or local styles currently define a token contract.
Measure the approved frames, consolidate repeated values, and document any
intentional departures in [`design.md`](design.md).

## Metadata and rendering

- Define shared metadata defaults and social-preview fields through
  `src/lib/metadata.ts`, with unique titles and descriptions supplied by each
  route.
- Use canonical URLs only after the production domain is approved.
- Generate static output where possible; avoid client-side fetching for local
  content.
- Keep structured data in `src/content/structured-data.ts` and render it from
  the root layout. Use only verified business facts; do not publish unverified
  staff, ratings, prices, or medical claims as schema.

## Testing strategy

| Layer            | Tooling                       | Responsibility                                                                      |
| ---------------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| Static analysis  | TypeScript, ESLint, Prettier  | Types, code quality, and formatting                                                 |
| Unit/component   | Vitest, React Testing Library | Rendering, state, validation, focus, and disabled behavior                          |
| Browser          | Playwright                    | Routes, navigation, responsive layouts, keyboard flow, and booking network boundary |
| Production build | Next.js build                 | Route and server/client boundary correctness                                        |

Playwright should cover representative mobile, tablet, and desktop viewports.
Accessibility checks supplement, but do not replace, keyboard and screen-reader
semantics review.

## Environments and deployment

The frontend has local, preview, and production environments but no
environment-specific application data in the first milestone. Preview builds may
contain conspicuously marked placeholder content; production builds must use
approved content only.

When Firebase work begins, create separate development and production projects,
document public client configuration in `.env.example`, keep privileged
credentials server-only, and validate all values. Deployment must not proceed
until Firebase Security Rules and privacy behavior are tested.

## Future Firebase boundary

Firebase may later provide:

- Appointment-request persistence
- Provider and service availability
- Staff authentication and role-based administration
- Transactional notification triggers
- Auditing appropriate to the approved operational process

Before implementation, define appointment states, conflict handling, timezone
rules, consent, minimum data collection, retention, deletion, staff access,
security rules, abuse controls, notification retries, and operational ownership.
Do not infer these policies from the current Figma form.

Patient information is sensitive. It must not be collected until the backend,
privacy notice, consent language, retention policy, access controls, security
rules, and incident process are approved together.

## Ops frontend interface (Kave Ops)

An MVP operational frontend for clinic staff is hosted under the discreet route
segment `/ops` (configured for deployment at `kave-ops.vercel.app` or
`ops.kavedental.com`). It allows clinic receptionists to review, confirm,
reschedule, complete, and cancel booking inquiries.

### Layout and route separation

Public routes (`/`, `/services`, `/transformations`, `/booking`) are grouped
under `src/app/(public)/layout.tsx` with `SiteHeader` and `SiteFooter`.
Operations routes live under `src/app/ops/layout.tsx` and render `OpsHeader`
without public marketing navigation or footers.

### Data repository pattern

Data access is decoupled behind the `BookingRepository` interface:

```ts
export interface BookingRepository {
  getBookings(filters?: BookingFilters): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | null>;
  updateStatus(id: string, status: BookingStatus): Promise<Booking>;
  reschedule(id: string, date: string, time: string): Promise<Booking>;
  updateStaffNotes(id: string, staffNotes: string): Promise<Booking>;
  getMetrics(): Promise<OpsSummaryMetrics>;
  resetDemoData(): Promise<void>;
}
```

The MVP implementation uses `LocalStorageBookingRepository` seeded with realistic
appointments in `src/lib/ops/booking-seed.ts`. When a persistent backend (such as
Neon Serverless Postgres or Supabase) is authorized, a concrete SQL repository
can be swapped in without modifying any UI components or views.

