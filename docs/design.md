# Design Specification

## Source and status

The visual source is the
[KAVE Dental Clinic Figma file](https://www.figma.com/design/PgAl2z5c1MfSDdPLbG09Hl/kave-dental-clinic?node-id=0-1).
It contains four desktop concepts on a 1280px canvas. Figma defines visual and
interaction intent, not automatically approved clinic facts.

The file currently has no local variables or published paint, text, or effect
styles. During frontend implementation, repeated measurements should be
consolidated into semantic CSS variables rather than copied as unrelated raw
values.

## Screen inventory

| Figma frame | Route | Major sections |
| --- | --- | --- |
| KAVE Dental \| Home | `/` | Navigation, hero, services, transformations, seasonal promotion, footer |
| KAVE Dental \| Zirconia Specialists | `/services` | Editorial hero, veneer benefits, crown anatomy, laboratory story, consultation call to action, footer |
| KAVE Dental \| Transformations | `/transformations` | Gallery hero, treatment gallery, patient stories, testimonial treatment, consultation call to action, footer |
| KAVE Dental \| Bookings | `/booking` | Booking hero, static form, hours and contact cards, doctors section, location, footer |

Shared navigation, booking calls to action, contact information, and footer
behavior must remain consistent across routes even where the Figma frames use
slightly different names or copy.

## Visual direction

The intended character is editorial and contemporary rather than clinical and
generic:

- Light neutral and monochrome surfaces with strong text contrast
- Oversized, tightly composed display typography
- Generous whitespace and clear horizontal structure
- Fine borders, restrained radii, and card-based service information
- Large, art-directed photography and transformation imagery
- Sparse accent color used for hierarchy rather than decoration
- Uppercase labels and small metadata paired with expressive headings
- Direct, confident calls to action without medical guarantees

Preserve this hierarchy at smaller sizes without shrinking the desktop canvas.
Readability and content order take priority over matching a line break from
Figma.

## Token categories

Define semantic variables before implementing route-specific sections:

### Color

- Page and elevated surfaces
- Primary and muted text
- Subtle and strong borders
- Primary action and action-contrast text
- Focus, success, warning, error, and disabled states
- Image overlays and gradients

Use names such as `--color-surface`, `--color-surface-raised`,
`--color-text`, `--color-text-muted`, `--color-border`,
`--color-action`, and `--color-focus`. Do not name tokens after a single page or
raw color value.

### Typography

- Display hero
- Section heading
- Card heading
- Body lead and body
- Label, eyebrow, metadata, and button text

Load fonts through `next/font` when licensing and availability are confirmed.
Provide system fallbacks and use fluid sizes with `clamp()` where appropriate.

### Spacing and layout

- Compact inline gaps
- Control and card padding
- Content-stack gaps
- Section spacing
- Page gutters
- Reading width and wide media/container width

Repeated Figma measurements become tokens. One-off art-direction adjustments
may remain local when they do not represent a system rule.

### Borders and radii

- Hairline and emphasized border widths
- Control, card, image, and pill radii
- Focus-ring width and offset

### Motion

- Fast control feedback
- Standard reveal or carousel transition
- Easing curve

Motion should clarify state, stay subtle, and have a reduced-motion equivalent.

## Implemented shared foundation

The shared implementation consolidates measurements repeated across the
1280px Figma frames into semantic tokens in `src/styles/globals.css`:

- Anybody is the display face, loaded through `next/font` with Arial Black,
  Arial, and generic sans-serif fallbacks.
- Manrope is the body face, loaded through `next/font` with Arial, Helvetica,
  and generic sans-serif fallbacks.
- Both fonts use `display: swap`, preloading, and Next.js fallback adjustment
  to reserve text metrics and avoid a font-loading layout shift.
- The 80px desktop gutter, 1120px content width, 1440px wide container,
  80px navigation height, shared card/control spacing, fine borders, and pill
  action radius are represented by semantic tokens.
- Color tokens cover page, raised, and inverse surfaces; primary and muted
  text; subtle and strong borders; action, focus, success, warning, error, and
  disabled states.
- Motion duration and easing tokens are overridden under
  `prefers-reduced-motion`, with no information depending on animation.

Shared header and footer components follow the Figma hierarchy but use the
verified navigation and clinic content. Unverified doctor links, newsletter
collection, empty policy links, conflicting operating days, and stale
copyright text are intentionally omitted.

Approved image records carry source, alt text, and intrinsic width and height.
The reusable responsive image treatment requires a `sizes` declaration and
uses `next/image`; route work must still choose purposeful alt text and limit
priority loading to critical imagery.

## Implemented home route

The home route preserves the Home frame's dark editorial hero, oversized
display hierarchy, dual calls to action, service grid, transformation preview,
and full-width closing banner. It adapts rather than publishes unverified
Figma material:

- The verified public tagline supplies the `h1`; supporting copy is neutral and
  directs visitors to services, approved work, and verified contact details.
- No Figma patient, treatment, or promotional image is deployed without a
  documented local approval.
- The service grid supports one through four approved cards, while production
  displays an explicit approval state until both wording and images are
  approved.
- The transformation preview renders only consented records and exposes no
  internal consent reference. Its production state contains no patient media.
- An approved promotion can render its title and details. Pending, expired, or
  absent promotions render a non-promotional verified-contact banner instead.
- Figma's patient imagery, outcome language, `500+` count, PHP 4,000 price,
  included benefits, and seasonal framing are not published.

At narrow widths, the hero actions and section content stack into one column;
the service grid progresses through one, two, and four columns without forced
heading line breaks. CSS-only art direction preserves the composition without
introducing unapproved imagery.

## Implemented services route

The services route preserves the Zirconia Specialists frame's dark editorial
hero, asymmetric veneer section, four-part crown anatomy sequence, contrasting
laboratory block, and final consultation call to action. Its production content
is deliberately narrower than the Figma concept:

- The hero identifies featured zirconia and dental services while requiring an
  individual consultation for suitability, limitations, and planning.
- The veneer section presents assessment and discussion topics rather than
  material-performance or outcome promises.
- The crown anatomy labels remain complete text records, so their meaning does
  not depend on the decorative crown silhouette.
- The laboratory section currently renders a prominent approval state. It does
  not publish facility, personnel, production, or turnaround details.
- Both actions lead to the static `/booking` experience and transmit no data.
- Patient photography is replaced by CSS-only abstract compositions until each
  asset has documented publication permission.

The unverified chip-proof, durability, decades-long, perfect-fit, 48-hour,
same-day, master-ceramist, in-house-laboratory, outcome-statistic, and
perfection language from Figma is omitted. Route metadata uses neutral
consultation language and makes no treatment guarantee.

## Implemented transformations route

The transformations route preserves the Transformations frame's centered dark
hero, editorial bento rhythm, contrasting patient-story area, and bright
closing call to action. It changes the content and interaction where approval
or privacy boundaries require it:

- The gallery and optional patient stories render only typed records that have
  approved status and a non-empty consent reference.
- Each approved gallery image requires intrinsic dimensions and purposeful alt
  text through the shared image contract. Internal consent references never
  render.
- Production currently shows clear image-free and story-free states because no
  patient record is approved for publication.
- The gallery is a responsive static list. No carousel or video control is
  retained, so there is no hidden or non-functional interaction.
- The closing section links to `/booking`; the Figma lead form is omitted and
  the Transformations route collects no personal information.
- CSS-only abstract art direction replaces the unapproved hero photograph.

Figma's named patients, portrait and treatment media, patient quote, outcome
descriptions, “real patients, real results” language, ten-shade and alignment
claims, award and installment-plan claims, response-time promise, and “smiles
of the week” framing are not published.

## Responsive interpretation

Use content-driven breakpoints; Tailwind's defaults are starting points rather
than a reason to force a layout transition.

### Mobile

- Use one primary column and comfortable page gutters.
- Replace desktop navigation with an accessible disclosure menu.
- Allow display text to reflow naturally without manual `<br>` elements that
  create awkward wrapping.
- Stack service and contact cards.
- Use horizontally scrollable galleries only when the controls and item
  position are accessible; otherwise use a vertical sequence.
- Keep controls full-width where helpful and at least 44px high.
- Present comparison imagery without hiding context or essential labels.

### Tablet

- Introduce two-column layouts where both columns retain readable width.
- Keep hero copy and media balanced rather than forcing the desktop ratio.
- Allow cards to wrap into two columns.
- Preserve editorial whitespace with fluid section spacing.

### Desktop and wide desktop

- Match the Figma hierarchy around its 1280px reference width.
- Constrain readable content and use wider containers for galleries and
  full-bleed media.
- Preserve the intentional asymmetric compositions.
- Avoid stretching text, cards, and images indefinitely on wide screens.

Test at minimum at 360px, 768px, 1280px, and 1440px. No supported viewport may
produce horizontal page scrolling, clipped text, unreachable controls, or
overlapping content.

## Shared component inventory

- `SiteHeader` and accessible mobile navigation
- `SiteFooter` with verified contact and social information
- Primary, secondary, and text-link button treatments
- `ServiceCard` and service editorial sections
- Transformation preview and gallery item
- Promotional banner that renders only approved, current content
- Booking form controls and non-submitting status message
- Clinic-hours, direct-contact, and location cards
- Responsive image treatment and optional image overlay

Component names are descriptive targets, not a requirement to create empty
abstractions. Extract them when their implementation is used or independently
testable.

## Interaction and state behavior

| State | Required treatment |
| --- | --- |
| Hover | Subtle feedback that does not carry meaning alone |
| Focus visible | High-contrast ring on every interactive element |
| Active | Immediate pressed/selected feedback |
| Loading | Reserve dimensions; avoid unexplained indefinite spinners |
| Empty | Explain why content is unavailable and offer a valid next action |
| Disabled | Reduce emphasis, retain readable contrast, and explain why when needed |
| Invalid | Identify the field, describe the correction, and announce the error |
| Booking result | State that online booking is coming soon; do not imply an appointment was created |

The static booking interface can demonstrate validation only after meaningful
interaction or an attempted action. It must never display success language such
as “appointment confirmed.”

## Accessibility

- Follow WCAG 2.2 AA contrast and interaction requirements.
- Use one logical `h1` per route and preserve heading order.
- Use semantic `header`, `nav`, `main`, `section`, `figure`, and `footer`
  landmarks where appropriate.
- Ensure the mobile menu, galleries, links, and fields work with keyboard only.
- Provide persistent form labels and programmatically associated descriptions
  and errors.
- Do not place essential text only inside images.
- Write alt text that describes the image's purpose without asserting an
  unverified outcome.
- Pause or provide controls for any auto-advancing content.
- Honor `prefers-reduced-motion`.
- Keep zoom and text resizing usable without loss of content.

## Content verification

The following Figma items are placeholders or unverified until an authorized
clinic representative approves them:

| Figma content | Status | Required resolution |
| --- | --- | --- |
| Dr. Karen Velasco, Dr. Marcus Sy, and Dr. Arlene Chua profiles | Placeholder | Obtain names, roles, credentials, biographies, and approved portraits, or omit the section |
| `+63 (917) 123 4567` and `concierge@kavedental.ph` | Conflicts with public source / unverified | Replace the phone with the verified value; publish email only after approval |
| Monday–Saturday operations and Sunday by appointment | Conflicts with current Facebook hours | Use “Open daily, 10 AM–7 PM” unless the clinic provides a newer schedule |
| “EST. 2024” and 2024 copyright text | Unverified or stale | Confirm establishment year; render the current copyright year independently |
| “500+ transformations” | Unverified claim | Supply evidence and approval or remove the quantity |
| “Award-Winning Aesthetic Lab” | Unverified claim | Provide award name, issuer, year, and approval or remove |
| In-house laboratory and master ceramist claims | Unverified claim | Confirm facilities and responsible professionals before publication |
| “48-hour turnaround” and same-day adjustment claims | Unverified promise | Obtain operational and clinical approval or replace with neutral consultation copy |
| PHP 4,000 braces promotion and included benefits | Time-sensitive placeholder | Confirm price, terms, dates, eligibility, and approval; otherwise omit |
| Patient names, stories, quotation, and before/after imagery | Consent required | Obtain documented publication consent and approved wording |
| “10-shade improvement,” durability, chip-proof, and decades-long language | Medical/marketing claim | Require clinical and legal review; use qualified educational copy if approved |
| “Manila's most iconic smiles” and similar superlatives | Unsubstantiated marketing | Replace with factual brand language |
| Privacy Policy, Terms of Service, and newsletter signup links | Not yet implemented | Do not link to empty pages or collect email until content and processing exist |

Source conflicts follow the precedence in [`context.md`](context.md). Keep
pending items out of production rather than silently converting mockup copy into
facts.
