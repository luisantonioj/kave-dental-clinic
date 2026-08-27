# Product Context

## Vision

KAVE Dental Clinic's website should help people begin or improve their oral-care
journey with confidence. It presents the Quezon City clinic as modern and
approachable while giving visitors clear paths to understand services, view
approved work, verify clinic details, and contact the clinic.

The experience should balance two ideas:

1. Dental care requires accuracy, trust, comfort, and understandable
   information.
2. KAVE's visual identity treats smile design with an editorial, contemporary
   aesthetic.

The website must not let presentation outrun evidence. Treatment outcomes,
credentials, patient stories, pricing, and promotional claims require explicit
clinic approval before publication.

## Positioning

KAVE provides general, restorative, and cosmetic dental care, with public
content that prominently features smile makeovers, zirconia veneers, crowns,
bridges, braces, and whitening. The website should communicate precision,
natural-looking results, patient comfort, and accessible contact options without
promising a particular medical outcome.

## Target users

- Prospective patients comparing dental clinics in or near Quezon City
- People researching restorative or cosmetic options
- Existing patients looking for clinic hours, location, or contact information
- Social-media visitors who want more structured information than a post or reel
  provides
- Mobile users who need a fast path from discovery to direct contact

Users may be anxious, unfamiliar with dental terminology, price-conscious, or
uncertain about treatment. Content should be concise, reassuring, and honest,
with plain-language explanations and a clear invitation to discuss individual
needs with a qualified clinician.

## Current milestone

Build a polished, accessible, responsive frontend for the four routes
represented in Figma:

| Route              | User outcome                                                            |
| ------------------ | ----------------------------------------------------------------------- |
| `/`                | Understand KAVE's focus and reach services, transformations, or booking |
| `/services`        | Learn about zirconia and other featured service categories              |
| `/transformations` | Review clinic-approved visual work and patient stories                  |
| `/booking`         | Explore appointment fields and use a verified direct-contact option     |

The booking page is a static interface demonstration. A visitor may interact
with fields for presentation and client-side validation, but the website must
not submit, transmit, or persist the values.

## Core user flows

### Discover a service

1. Enter through the home page or a shared navigation link.
2. Scan featured services and plain-language summaries.
3. Open `/services` for approved detail.
4. Continue to transformations or the booking page.

### Review transformations

1. Follow a gallery call to action to `/transformations`.
2. Browse only clinic-approved, consented media and claims.
3. Understand that results vary and treatment requires consultation.
4. Continue to `/booking` or direct clinic contact.

### Verify and contact the clinic

1. Find consistent hours, phone, address, and social links in page contact
   sections or the footer.
2. Use the phone number or official social profile.
3. Never have partially entered booking details included automatically.

### Explore booking

1. Open `/booking` from a booking call to action.
2. Review and interact with the planned fields.
3. Receive accessible client-side validation feedback where appropriate.
4. See that online booking is coming soon.
5. Choose a verified direct-contact method.

## Out of scope

The current milestone excludes:

- Form submission, API routes, server actions, and email delivery
- Appointment persistence or synchronization
- Availability, provider calendars, rescheduling, and cancellations
- Authentication, patient accounts, and administrator tools
- Payments, deposits, invoices, and insurance workflows
- SMS, email, push, or social notifications
- Analytics that capture booking-field values
- Firebase installation, configuration, calls, or environment variables
- A CMS or editable staff dashboard
- Meta account authorization, social-feed API synchronization, and scraping

## Future booking vision

A future milestone may introduce real appointment requests using Firebase and an
approved operational workflow. That work must first define scheduling ownership,
availability rules, patient consent, privacy obligations, retention, staff
access, security rules, notifications, failure handling, and audit needs. The
current frontend should keep clean route and data boundaries so those
capabilities can be added without pretending they already exist.

## Verified public clinic details

The following information was visible on the clinic's
[Facebook profile](https://www.facebook.com/profile.php?id=61551864636049) when
this documentation was prepared:

| Field     | Verified public value                                              |
| --------- | ------------------------------------------------------------------ |
| Name      | Kave Dental Clinic                                                 |
| Tagline   | Your ticket to a picture-perfect smile                             |
| Phone     | `0961 394 4174`                                                    |
| Hours     | Open daily, `10:00 AM–7:00 PM`                                     |
| Address         | `128 Mindanao Avenue, Tandang Sora, Quezon City`                                        |
| Instagram       | [`@kavedentalclinic`](https://www.instagram.com/kavedentalclinic/)                      |
| Instagram Reels | [Instagram Reels](https://www.instagram.com/kavedentalclinic/reels/)                    |
| Facebook Reels  | [Facebook Reels](https://www.facebook.com/profile.php?id=61551864636049&sk=reels_tab) |

Verify these values with the clinic again before launch and whenever the public
profiles change.

## Content governance

Use this precedence when content sources conflict:

1. Written approval from an authorized clinic representative
2. Current official clinic contact profiles
3. Approved project content stored in `src/content/`
4. Figma, which defines design intent but may contain sample copy

Every factual or promotional item should have one of these statuses:

- **Verified** — supported by an approved source and safe to publish
- **Pending approval** — retained in planning or preview environments only
- **Placeholder** — replaced with neutral copy or omitted from production

Figma currently includes details that conflict with public information or read
like presentation samples. Do not publish its doctor names, phone, email,
operating days, establishment year, awards, turnaround promises, statistics,
testimonials, prices, promotions, or outcome claims without approval. Track
these items in the verification table in [`design.md`](design.md).

Never invent content to fill a visually empty area. Prefer a clearly marked
placeholder in development and omit it from a public build until approved.

Public Facebook or Instagram publication does not by itself approve an item for
the website. Every curated social record requires an authorized summary,
supported public URL, and traceable website-publication consent. Patient media
requires the same documented permission as locally hosted transformation
content. Removing or privatizing the source post requires removing or disabling
the matching curated record in the next deployment.
