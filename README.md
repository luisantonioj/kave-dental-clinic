# KAVE Dental Clinic

KAVE Dental Clinic is a frontend-first website for a dental care provider in
Quezon City. The experience introduces the clinic, explains its aesthetic and
restorative services, presents smile transformations, and guides visitors toward
an appointment.

The current milestone is an informational, responsive frontend based on the
[KAVE Dental Clinic Figma file](https://www.figma.com/design/PgAl2z5c1MfSDdPLbG09Hl/kave-dental-clinic?node-id=0-1).
The booking route is a static user-interface demonstration: it must not submit,
transmit, or persist patient information. Firebase is reserved for a later
booking-system milestone.

## Technology

- [Next.js](https://nextjs.org/) App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with semantic CSS variables
- React Testing Library and Vitest for unit and component tests
- Playwright for browser and responsive-flow tests
- Firebase as a planned backend, not an initial runtime dependency

## Planned routes

| Route              | Purpose                                            | Current behavior          |
| ------------------ | -------------------------------------------------- | ------------------------- |
| `/`                | Home and primary clinic introduction               | Informational             |
| `/services`        | Zirconia and related dental services               | Informational             |
| `/transformations` | Approved before-and-after work and patient stories | Informational             |
| `/booking`         | Appointment form presentation                      | Static and non-submitting |

All booking calls to action lead to `/booking`. The final booking action must
clearly state that online booking is not active and direct visitors to the
clinic's verified phone or social channels.

## Prerequisites

Before the application is scaffolded, only Git and a Markdown viewer are
required. For frontend development, install:

- Node.js 20 LTS or newer
- npm 10 or newer

## Setup

The repository currently contains its project documentation. After the frontend
scaffold task in [`docs/tasks.md`](docs/tasks.md) is completed, use:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Expected quality commands:

```bash
npm run lint
npm run format:check
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

These scripts must be added with the frontend scaffold and kept valid throughout
development.

## Environment variables

No environment variables are required for the frontend-only milestone. Do not
add Firebase credentials, initialize a Firebase SDK, or create placeholder
secrets. When backend work is approved, document public client configuration in
`.env.example`, keep real values in ignored local or deployment environment
files, and validate required values at startup.

Never commit secrets, service-account credentials, or patient data.

## Curating social posts

The Transformations route includes a manually curated “Latest from Kave”
section. It does not scrape Meta, use a Meta API, or require account
authorization. Production starts with a safe empty state.

To add an item:

1. Confirm the Facebook or Instagram post is public and can be embedded.
2. Obtain written website-publication approval and the required patient-media
   consent where applicable.
3. Add an approved record to `src/content/social-posts.ts` with its canonical
   URL, content kind, publication time, approved summary, and internal
   `consent:` reference.
4. Give Facebook and Instagram versions of the same content an identical
   `crossPostGroup`; the selector will retain the Instagram version.
5. Run the quality commands and deploy the updated site.

Only supported HTTPS post, reel, and video URLs render. Tracking parameters are
removed, internal consent references remain private, and playable Meta video
embeds render directly on-screen with lazy loading. Adding a new social post
requires a new deployment; the site does not discover posts automatically.

## Project structure

The planned application structure is:

```text
.
├── AGENTS.md
├── README.md
├── docs/
│   ├── architecture.md
│   ├── context.md
│   ├── design.md
│   └── tasks.md
├── public/                 # Approved, optimized clinic assets
├── src/
│   ├── app/                # App Router pages, layouts, and metadata
│   ├── components/         # Shared UI and composed page sections
│   ├── content/            # Typed, approved clinic content
│   ├── lib/                # Framework-independent helpers
│   └── styles/             # Global styles and semantic tokens
└── tests/                  # Browser tests and shared test utilities
```

Do not create folders speculatively. Add them only when the corresponding task
requires them.

## Project documentation

- [`AGENTS.md`](AGENTS.md) — coding standards and repository rules
- [`docs/context.md`](docs/context.md) — product vision, users, scope, and
  verified clinic information
- [`docs/architecture.md`](docs/architecture.md) — frontend boundaries, planned
  interfaces, tests, and future Firebase integration
- [`docs/design.md`](docs/design.md) — Figma interpretation, responsive rules,
  components, states, and content verification
- [`docs/tasks.md`](docs/tasks.md) — ordered implementation backlog and
  acceptance conditions

Clinic facts and claims must follow the content-governance rules in
[`docs/context.md`](docs/context.md). A design mockup is not evidence that a
marketing claim is true.
