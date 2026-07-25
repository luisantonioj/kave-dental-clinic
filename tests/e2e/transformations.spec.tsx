import { expect, test } from "@playwright/test";

test.setTimeout(90_000);

const TEST_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

const POPULATED_GALLERY_MARKUP = `
  <section
    aria-labelledby="browser-gallery-heading"
    class="bg-surface-inverse px-gutter py-section text-text-inverse"
    data-testid="transformation-gallery"
  >
    <h2 id="browser-gallery-heading">Approved transformations</h2>
    <ul
      aria-label="1 approved transformation"
      class="mt-card-y grid gap-cluster md:grid-cols-2 lg:grid-cols-3"
    >
      <li class="md:col-span-2 lg:row-span-2">
        <figure class="relative min-h-[24rem] overflow-hidden rounded-image border border-border-strong">
          <img
            alt="Test-only consented browser transformation"
            class="h-full min-h-[24rem] w-full object-cover"
            height="1200"
            src="${TEST_IMAGE}"
            width="900"
          />
          <figcaption>
            <p>Browser test treatment</p>
            <h3>Approved browser transformation</h3>
          </figcaption>
        </figure>
      </li>
    </ul>
  </section>
`;

const POPULATED_STORIES_MARKUP = `
  <section
    aria-labelledby="browser-stories-heading"
    class="bg-surface-inverse-raised px-gutter py-section text-text-inverse"
    data-testid="patient-stories"
  >
    <h2 id="browser-stories-heading">Patient stories</h2>
    <ul
      aria-label="2 approved patient stories"
      class="mt-card-y grid gap-cluster md:grid-cols-2 lg:grid-cols-3"
    >
      <li><article><h3>Approved browser story one</h3></article></li>
      <li><article><h3>Approved browser story two</h3></article></li>
    </ul>
  </section>
`;

const VIEWPORTS = [
  { width: 360, height: 800 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
] as const;

async function expectNoHorizontalOverflow(
  page: import("@playwright/test").Page,
) {
  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
}

test("transformations route covers empty and approved states accessibly", async ({
  page,
}) => {
  const response = await page.goto("/transformations");

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle("Transformation Gallery | Kave Dental Clinic");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Transformation gallery",
    }),
  ).toBeVisible();
  await expect(
    page.getByTestId("transformation-gallery-empty-state"),
  ).toBeVisible();
  await expect(page.getByTestId("patient-stories-empty-state")).toBeVisible();
  await expect(
    page.getByTestId("transformation-gallery").getByRole("button"),
  ).toHaveCount(0);
  await expect(page.getByRole("form")).toHaveCount(0);
  await expect(page.getByRole("textbox")).toHaveCount(0);
  await expect(
    page.getByText(
      /smiles of the week|complete rejuvenation|10-shade|real patients, real results|Clarissa M\.|Marcus Rivera|award-winning|within 24 hours/i,
    ),
  ).toHaveCount(0);

  const bookingLink = page
    .getByRole("region", { name: "Discuss your dental goals" })
    .getByRole("link", { name: "Explore booking" });
  await expect(bookingLink).toHaveAttribute("href", "/booking");

  let reachedBookingLink = false;
  for (let tabIndex = 0; tabIndex < 16; tabIndex += 1) {
    await page.keyboard.press("Tab");
    reachedBookingLink = await bookingLink.evaluate(
      (link) => link === document.activeElement,
    );
    if (reachedBookingLink) {
      break;
    }
  }
  expect(reachedBookingLink).toBe(true);

  for (const viewport of VIEWPORTS) {
    await page.setViewportSize(viewport);
    await expectNoHorizontalOverflow(page);
  }

  await page
    .getByTestId("transformation-gallery")
    .evaluate((section, markup) => {
      section.outerHTML = markup;
    }, POPULATED_GALLERY_MARKUP);
  await page.getByTestId("patient-stories").evaluate((section, markup) => {
    section.outerHTML = markup;
  }, POPULATED_STORIES_MARKUP);

  await expect(
    page.getByRole("img", {
      name: "Test-only consented browser transformation",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("list", { name: "1 approved transformation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("list", { name: "2 approved patient stories" }),
  ).toBeVisible();
  await expect(page.getByText(/consent:browser/)).toHaveCount(0);

  for (const viewport of VIEWPORTS) {
    await page.setViewportSize(viewport);
    await expectNoHorizontalOverflow(page);
  }
});
