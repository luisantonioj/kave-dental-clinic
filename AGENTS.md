# Repository Instructions

These instructions apply to the entire repository. Read `README.md` and the
relevant files in `docs/` before implementing a task.

## Product boundary

- The current milestone is a responsive informational frontend for `/`,
  `/services`, `/transformations`, and `/booking`.
- `/booking` is a visual, non-submitting experience. Do not send, store, log,
  or persist form values.
- Firebase is future architecture only. Do not install, configure, or call
  Firebase unless a later task explicitly changes the milestone.
- Use the verified clinic details in `docs/context.md`. Never invent doctors,
  credentials, outcomes, testimonials, awards, statistics, prices, promotions,
  dates, warranties, or treatment claims.

## TypeScript and React

- Enable TypeScript strict mode and resolve type errors without `any`,
  `@ts-ignore`, or unsafe casts unless a documented external limitation makes
  one unavoidable.
- Prefer small, explicit types and discriminated unions over loosely shaped
  objects.
- Use Next.js App Router and React Server Components by default.
- Add `"use client"` only at the narrowest interactive boundary. Keep static
  page sections and content rendering on the server.
- Keep components focused on one responsibility. Extract a component when it
  is repeated, independently testable, or isolates meaningful interaction—not
  merely to shorten a file.
- Keep approved copy and repeatable records in typed modules under
  `src/content/`; do not duplicate or bury clinic facts in page components.
- Avoid premature abstractions, global state, and runtime dependencies.

## Naming and organization

- React components and their files use `PascalCase`.
- Hooks use `useCamelCase`; other functions and variables use `camelCase`.
- Types and interfaces use `PascalCase`; constants use `SCREAMING_SNAKE_CASE`
  only for true application-wide constants.
- Route segments, asset filenames, and non-component utility files use
  lowercase kebab-case.
- Prefer named exports for reusable modules. Use the default exports required
  by Next.js for pages and layouts.
- Tests live beside the unit they cover as `*.test.ts(x)`. Cross-route
  Playwright specs live under `tests/e2e/`.

## Styling and responsive design

- Represent design decisions with semantic CSS variables such as
  `--color-surface`, `--color-text`, and `--space-section`; expose them through
  Tailwind rather than repeating raw values.
- Use Tailwind utilities for component styling. Use custom CSS for global
  tokens, typography setup, and behavior that utilities cannot express
  clearly.
- Do not scatter arbitrary values. If a measured Figma value repeats or
  communicates a system rule, promote it to a token.
- Implement the intent of the Figma designs responsively; do not reproduce the
  1280px canvas with fixed coordinates or absolute positioning.
- Build mobile-first. Test narrow mobile, tablet, desktop, and wide desktop
  layouts. Content must reflow without horizontal scrolling or clipped text.
- Preserve editorial scale and whitespace while allowing typography, grids,
  and media to adapt to the viewport.
- Keep motion restrained, non-essential, and disabled when
  `prefers-reduced-motion` is active.

## Accessibility and content

- Use semantic landmarks and native elements before ARIA.
- Maintain a logical heading hierarchy with one meaningful page-level `h1`.
- Every interactive control must be keyboard accessible with a visible focus
  indicator and an adequate pointer target.
- Inputs require persistent labels, instructions, error association, and useful
  autocomplete attributes. Placeholder text is not a label.
- Provide descriptive alternative text for meaningful images and empty alt
  text for decoration. Never describe an unverified treatment result as fact.
- Meet WCAG 2.2 AA color contrast. Do not rely on color alone for status.
- Use `next/image` for raster content, provide responsive sizes, and prevent
  layout shift.
- Give every route unique, accurate metadata. Avoid unapproved superlatives or
  medical guarantees in titles and descriptions.

## Static booking behavior

- Form state may exist in memory only to demonstrate focus, validation, and
  disabled states.
- Do not use a form `action`, API route, server action, analytics payload,
  storage API, email link containing form values, or network request.
- The primary action must be disabled or intercepted with an explicit
  “online booking is coming soon” message.
- Provide verified phone and social contact options without automatically
  transmitting any entered data.

## Quality requirements

- Format with Prettier and lint with ESLint.
- Run `npm run typecheck`, `npm run test`, and relevant Playwright specs for
  behavior changes.
- Add React Testing Library coverage for interactive component behavior and
  edge states.
- Add Playwright coverage for navigation, responsive layouts, keyboard access,
  and the non-submitting booking boundary.
- Run `npm run build` before completing route, configuration, or dependency
  work.
- Do not update snapshots or weaken assertions merely to make a failure pass.

## Repository workflow

- Preserve unrelated user changes and keep each task focused.
- Do not add dependencies, configuration, environment variables, or folders
  without an immediate requirement.
- Keep `docs/tasks.md` current: mark an item complete only after its acceptance
  condition and relevant checks pass.
- Update the matching documentation when behavior, routes, content sources, or
  architecture changes.
- Use approved local assets. Do not download, publish, or repurpose patient
  photos without documented permission.
- Review `docs/design.md` before implementing from Figma. Placeholder copy in
  Figma remains unapproved until the content-verification table is resolved.
