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
      name: "Your ticket to a picture-perfect smile",
    }),
  ).toBeVisible();
  await expect(page).toHaveTitle("Kave Dental Clinic | Services and Contact");

  const hero = page.locator("main section").first();
  await expect(
    hero.getByRole("link", { name: "Explore booking" }),
  ).toHaveAttribute("href", "/booking");
  await expect(
    hero.getByRole("link", {
      name: "View transformations",
    }),
  ).toHaveAttribute("href", "/transformations");
  await expect(
    hero.getByAltText(
      "Modern aesthetic dental clinic interior with warm architectural travertine finishes and natural light",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Featured Services" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Transformation gallery" }),
  ).toBeVisible();
  await expect(page.getByText(/500\+|PHP 4,000/i)).toHaveCount(0);

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

  let reachedHeroAction = false;
  for (let tabIndex = 0; tabIndex < 12; tabIndex += 1) {
    await page.keyboard.press("Tab");
    reachedHeroAction = await page.evaluate(
      () =>
        document.activeElement?.textContent
          ?.trim()
          .includes("Explore booking") ?? false,
    );
    if (reachedHeroAction) {
      break;
    }
  }
  expect(reachedHeroAction).toBe(true);

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
