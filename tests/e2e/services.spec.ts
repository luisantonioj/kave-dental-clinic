import { expect, test } from "@playwright/test";

test("services route is responsive, qualified, and keyboard reachable", async ({
  page,
}) => {
  const response = await page.goto("/services");

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle("Dental Services | Kave Dental Clinic");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Zirconia and featured dental services",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Topics for a veneer consultation",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Four points to discuss",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Information awaiting clinic approval",
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      /chip-proof|decades-long|perfect fit|48-hour|same-day|master ceramist|in-house lab|10\+|ready for perfection/i,
    ),
  ).toHaveCount(0);

  const finalCallToAction = page
    .getByRole("region", { name: "Discuss your options" })
    .getByRole("link", { name: "Explore booking" });
  await expect(finalCallToAction).toHaveAttribute("href", "/booking");

  let reachedFinalCallToAction = false;
  for (let tabIndex = 0; tabIndex < 60; tabIndex += 1) {
    await page.keyboard.press("Tab");
    reachedFinalCallToAction = await finalCallToAction.evaluate(
      (link) => link === document.activeElement,
    );
    if (reachedFinalCallToAction) {
      break;
    }
  }
  expect(reachedFinalCallToAction).toBe(true);

  for (const viewport of [
    { width: 360, height: 800 },
    { width: 768, height: 1024 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);

    const hasHorizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  }
});

test("services search and category filtering work interactively", async ({
  page,
}) => {
  await page.goto("/services");

  const searchInput = page.getByRole("searchbox", {
    name: "Search Procedures & Treatments",
  });
  await expect(searchInput).toBeVisible();

  // Search for "zirconia"
  await searchInput.fill("zirconia");
  await expect(
    page.getByRole("heading", { name: "Zirconia Veneers" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Zirconia Crowns" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Dental Check-up" }),
  ).not.toBeVisible();

  // Clear search
  const clearBtn = page.getByRole("button", { name: "Clear search query" });
  await clearBtn.click();
  await expect(searchInput).toHaveValue("");
  await expect(
    page.getByRole("heading", { name: "Dental Check-up" }),
  ).toBeVisible();

  // Filter by category tab
  const cosmeticTab = page.getByRole("tab", { name: /Cosmetic Dentistry/i });
  await cosmeticTab.click();
  await expect(
    page.getByRole("heading", { name: "Cosmetic Dentistry" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "General Dentistry" }),
  ).not.toBeVisible();
});
