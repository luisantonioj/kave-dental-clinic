import { expect, test } from "@playwright/test";

const PLANNED_ROUTES = [
  "/",
  "/services",
  "/transformations",
  "/booking",
] as const;

test("renders the shared layout without horizontal overflow", async ({
  page,
}, testInfo) => {
  for (const route of PLANNED_ROUTES) {
    const response = await page.goto(route);

    expect(response?.ok()).toBe(true);
    await expect(
      page.getByRole("contentinfo").getByText("0961 394 4174"),
    ).toBeVisible();
    await expect(
      page
        .getByRole("contentinfo")
        .getByText("128 Mindanao Avenue, Tandang Sora, Quezon City"),
    ).toBeVisible();
  }

  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Kave Dental Clinic",
    }),
  ).toBeVisible();

  const headerRoutes = await page
    .getByRole("banner")
    .locator("a")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));

  for (const route of PLANNED_ROUTES) {
    expect(headerRoutes).toContain(route);
  }

  if (testInfo.project.name === "mobile-chromium") {
    const menuButton = page.getByRole("button", {
      name: "Menu",
    });
    await menuButton.click();
    await expect(
      page.getByRole("navigation", {
        name: "Mobile navigation",
      }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menuButton).toBeFocused();
  }

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
