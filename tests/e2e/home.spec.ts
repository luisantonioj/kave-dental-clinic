import { expect, test } from "@playwright/test";

test("renders the App Router home page", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Kave Dental Clinic",
    }),
  ).toBeVisible();
});
