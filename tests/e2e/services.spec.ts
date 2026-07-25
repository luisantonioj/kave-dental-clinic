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
  for (let tabIndex = 0; tabIndex < 16; tabIndex += 1) {
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
