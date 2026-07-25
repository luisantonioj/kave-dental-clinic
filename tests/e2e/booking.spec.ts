import { expect, test, type Page } from "@playwright/test";

test.setTimeout(90_000);

const DISTINCTIVE_VALUES = {
  fullName: "PRIVACY_CANARY_NAME_84Q",
  email: "privacy-canary-84q@example.com",
  phone: "+63 999 840 0084",
  serviceId: "zirconia-veneers",
  preferredDate: "2030-05-20",
  preferredTime: "10:30",
  notes: "PRIVACY_CANARY_NOTES_84Q",
} as const;

const SENSITIVE_FRAGMENTS = [
  DISTINCTIVE_VALUES.fullName,
  DISTINCTIVE_VALUES.email,
  DISTINCTIVE_VALUES.phone,
  DISTINCTIVE_VALUES.notes,
] as const;

const VIEWPORTS = [
  { width: 360, height: 800 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
}

async function tabUntilFocused(
  page: Page,
  control: ReturnType<Page["locator"]>,
) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    await page.keyboard.press("Tab");
    const isFocused = await control.evaluate(
      (element) => element === document.activeElement,
    );
    if (isFocused) {
      return;
    }
  }

  await expect(control).toBeFocused();
}

test("booking fields validate locally without transmitting or persisting values", async ({
  context,
  page,
}) => {
  const observedRequests: string[] = [];
  const consoleMessages: string[] = [];

  page.on("request", (request) => {
    observedRequests.push(`${request.url()} ${request.postData() ?? ""}`);
  });
  page.on("console", (message) => {
    consoleMessages.push(message.text());
  });

  const response = await page.goto("/booking");
  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle("Explore Booking | Kave Dental Clinic");
  await expect(
    page.getByRole("heading", { level: 1, name: "Explore booking" }),
  ).toBeVisible();

  const form = page.getByTestId("booking-form");
  await expect(form).not.toHaveAttribute("action");
  await expect(
    page.getByText(/Dr\. Karen Velasco|hello@|Lot 15 Block 2/i),
  ).toHaveCount(0);

  await form.getByRole("button", { name: "Check booking details" }).click();
  await expect(form.getByRole("alert")).toContainText(
    "No information was sent.",
  );
  await expect(form.getByLabel("Full name")).toBeFocused();
  await expect(form.getByLabel("Full name")).toHaveAttribute(
    "aria-describedby",
    /fullName-error/,
  );

  await form.getByLabel("Full name").fill(DISTINCTIVE_VALUES.fullName);
  await form.getByLabel("Email address").fill(DISTINCTIVE_VALUES.email);
  await form.getByLabel("Phone number").fill(DISTINCTIVE_VALUES.phone);
  await form
    .getByLabel("Service to discuss")
    .selectOption(DISTINCTIVE_VALUES.serviceId);
  await form
    .getByLabel("Preferred date")
    .fill(DISTINCTIVE_VALUES.preferredDate);
  await form
    .getByLabel("Preferred time")
    .fill(DISTINCTIVE_VALUES.preferredTime);
  await form.getByLabel("Notes (optional)").fill(DISTINCTIVE_VALUES.notes);

  const keyboardOrder = [
    "Email address",
    "Phone number",
    "Service to discuss",
    "Preferred date",
    "Preferred time",
    "Notes (optional)",
  ] as const;
  await form.getByLabel("Full name").focus();
  for (const label of keyboardOrder) {
    await tabUntilFocused(page, form.getByLabel(label));
  }
  await tabUntilFocused(
    page,
    form.getByRole("button", { name: "Check booking details" }),
  );

  observedRequests.length = 0;
  consoleMessages.length = 0;
  await form.getByRole("button", { name: "Check booking details" }).click();

  await expect(form.getByRole("status")).toContainText(
    "Online booking is coming soon.",
  );
  await expect(form.getByRole("status")).toContainText(
    "No appointment was created",
  );
  await expect(page).toHaveURL(/\/booking$/);

  const browserState = await page.evaluate(() => ({
    localStorage: Object.values(localStorage),
    sessionStorage: Object.values(sessionStorage),
    cookie: document.cookie,
    url: window.location.href,
  }));
  const cookies = await context.cookies();
  const directContactDestinations = await page
    .getByRole("complementary", { name: "Verified clinic information" })
    .locator("a")
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? ""),
    );

  const privacySurfaces = [
    ...observedRequests,
    ...consoleMessages,
    ...browserState.localStorage,
    ...browserState.sessionStorage,
    browserState.cookie,
    browserState.url,
    JSON.stringify(cookies),
    ...directContactDestinations,
  ];
  for (const surface of privacySurfaces) {
    for (const fragment of SENSITIVE_FRAGMENTS) {
      expect(surface).not.toContain(fragment);
    }
  }

  for (const viewport of VIEWPORTS) {
    await page.setViewportSize(viewport);
    await expectNoHorizontalOverflow(page);
  }

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  for (const control of [
    form.getByLabel("Full name"),
    form.getByLabel("Email address"),
    form.getByLabel("Phone number"),
    form.getByLabel("Service to discuss"),
    form.getByLabel("Preferred date"),
    form.getByLabel("Preferred time"),
    form.getByLabel("Notes (optional)"),
    form.getByRole("button", { name: "Check booking details" }),
  ]) {
    await control.scrollIntoViewIfNeeded();
    await expect(control).toBeVisible();
  }

  await page.reload();
  await expect(page.getByLabel("Full name")).toHaveValue("");
  await expect(page.getByLabel("Email address")).toHaveValue("");
  await expect(page.getByLabel("Phone number")).toHaveValue("");
  await expect(page.getByLabel("Notes (optional)")).toHaveValue("");
});
