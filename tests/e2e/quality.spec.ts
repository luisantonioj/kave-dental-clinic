import { expect, test, type Locator, type Page } from "@playwright/test";

declare global {
  interface Window {
    __qualityLayoutShift?: number;
  }
}

test.setTimeout(150_000);

const ROUTES = [
  {
    path: "/",
    title: "Kave Dental Clinic | Services and Contact",
    description:
      "Explore Kave Dental Clinic services, approved transformation content, and verified Quezon City contact details.",
    heading: "Your ticket to a picture-perfect smile",
  },
  {
    path: "/services",
    title: "Dental Services | Kave Dental Clinic",
    description:
      "Explore featured dental service information from Kave Dental Clinic and topics to discuss during an individual consultation.",
    heading: "Zirconia and featured dental services",
  },
  {
    path: "/transformations",
    title: "Transformation Gallery | Kave Dental Clinic",
    description:
      "View consented transformation content and curated official social posts from Kave Dental Clinic.",
    heading: "Transformation gallery",
  },
  {
    path: "/booking",
    title: "Explore Booking | Kave Dental Clinic",
    description:
      "Explore Kave Dental Clinic's non-submitting booking fields and use verified Quezon City contact information.",
    heading: "Explore booking",
  },
] as const;

const VIEWPORTS = [
  { width: 360, height: 800 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
] as const;

async function tabUntilFocused(page: Page, control: Locator) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    await page.keyboard.press("Tab");
    if (
      await control.evaluate((element) => element === document.activeElement)
    ) {
      return;
    }
  }

  await expect(control).toBeFocused();
}

async function expectVisibleFocus(control: Locator) {
  const hasVisibleIndicator = await control.evaluate((element) => {
    const style = getComputedStyle(element);
    const outlineIsVisible =
      style.outlineStyle !== "none" &&
      Number.parseFloat(style.outlineWidth) >= 2;
    const shadowIsVisible = style.boxShadow !== "none";
    return outlineIsVisible || shadowIsVisible;
  });

  expect(hasVisibleIndicator).toBe(true);
}

async function expectFocusNotObscured(page: Page, control: Locator) {
  await expect
    .poll(async () =>
      control.evaluate((element) => {
        const rectangle = element.getBoundingClientRect();
        const header = document.querySelector("header");
        const headerBottom = header?.getBoundingClientRect().bottom ?? 0;

        return {
          bottom: rectangle.bottom,
          headerBottom,
          isVisible:
            rectangle.top >= headerBottom - 1 &&
            rectangle.bottom <= window.innerHeight + 1,
          top: rectangle.top,
          viewportHeight: window.innerHeight,
        };
      }),
    )
    .toEqual(expect.objectContaining({ isVisible: true }));
}

test("all routes retain semantic, unclipped layouts at every target width", async ({
  page,
}) => {
  for (const viewport of VIEWPORTS) {
    await page.setViewportSize(viewport);

    for (const route of ROUTES) {
      const response = await page.goto(route.path);
      expect(response?.ok()).toBe(true);

      await expect(page.getByRole("banner")).toHaveCount(1);
      await expect(page.getByRole("main")).toHaveCount(1);
      await expect(page.getByRole("contentinfo")).toHaveCount(1);
      await expect(
        page.getByRole("heading", { level: 1, name: route.heading }),
      ).toHaveCount(1);
      await expect(page.locator("main h1")).toHaveCount(1);

      const semanticAudit = await page.evaluate(() => {
        const headingLevels = Array.from(
          document.querySelectorAll("main h1, main h2, main h3, main h4"),
        ).map((heading) => Number(heading.tagName.slice(1)));
        const hasSkippedHeading = headingLevels.some(
          (level, index) =>
            index > 0 && level > (headingLevels[index - 1] ?? level) + 1,
        );
        const unlabelledRegions = Array.from(
          document.querySelectorAll("main section[aria-labelledby]"),
        ).filter((section) => {
          const labelledBy = section.getAttribute("aria-labelledby");
          return !labelledBy || !document.getElementById(labelledBy);
        }).length;
        const horizontallyClippedContent = Array.from(
          document.querySelectorAll(
            "main h1, main h2, main h3, main p, main a, main button, main input, main select, main textarea",
          ),
        )
          .filter((element) => {
            const style = getComputedStyle(element);
            const rectangle = element.getBoundingClientRect();
            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              rectangle.width > 0 &&
              !element.closest('[aria-hidden="true"]')
            );
          })
          .filter((element) => {
            const rectangle = element.getBoundingClientRect();
            return rectangle.left < -1 || rectangle.right > innerWidth + 1;
          })
          .map((element) => {
            const rectangle = element.getBoundingClientRect();
            return {
              left: rectangle.left,
              right: rectangle.right,
              text: element.textContent?.trim().slice(0, 80) ?? "",
            };
          });

        return {
          hasHorizontalOverflow:
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth,
          hasSkippedHeading,
          horizontallyClippedContent,
          unlabelledRegions,
        };
      });

      expect(semanticAudit).toEqual({
        hasHorizontalOverflow: false,
        hasSkippedHeading: false,
        horizontallyClippedContent: [],
        unlabelledRegions: 0,
      });

      const visibleTargets = page.locator(
        "header a:visible, header button:visible, main a:visible, main button:visible, footer a:visible",
      );
      const targetCount = await visibleTargets.count();
      for (let index = 0; index < targetCount; index += 1) {
        const size = await visibleTargets.nth(index).boundingBox();
        expect(size).not.toBeNull();
        expect(size?.height ?? 0).toBeGreaterThanOrEqual(43);
      }
    }
  }
});

test("route metadata, social previews, and structured data are accurate", async ({
  page,
}) => {
  const observedTitles = new Set<string>();
  const observedDescriptions = new Set<string>();

  for (const route of ROUTES) {
    await page.goto(route.path);

    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      route.description,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      route.title,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", route.description);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary",
    );
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
      "content",
      route.title,
    );

    observedTitles.add(route.title);
    observedDescriptions.add(route.description);

    const structuredData = await page
      .locator("#clinic-structured-data")
      .textContent();
    expect(structuredData).not.toBeNull();
    expect(JSON.parse(structuredData ?? "{}")).toEqual({
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: "Kave Dental Clinic",
      telephone: "+639613944174",
      address: {
        "@type": "PostalAddress",
        streetAddress: "128 Mindanao Avenue, Tandang Sora",
        addressLocality: "Quezon City",
        addressCountry: "PH",
      },
      openingHours: "Mo-Su 10:00-19:00",
      sameAs: [
        "https://www.instagram.com/kavedentalclinic/",
        "https://www.facebook.com/profile.php?id=61551864636049",
      ],
    });
    expect(structuredData).not.toMatch(
      /aggregateRating|priceRange|employee|founder|award|testimonial/i,
    );
  }

  expect(observedTitles.size).toBe(ROUTES.length);
  expect(observedDescriptions.size).toBe(ROUTES.length);
});

test("every route supports skip navigation and visible unobscured keyboard focus", async ({
  page,
}, testInfo) => {
  for (const route of ROUTES) {
    await page.goto(route.path);

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await expectVisibleFocus(skipLink);
    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();

    await skipLink.focus();
    const headerControls = page.locator(
      'header a:visible:not([href="#main-content"]), header button:visible',
    );
    const headerControlCount = await headerControls.count();
    for (let index = 0; index < headerControlCount; index += 1) {
      const control = headerControls.nth(index);
      await tabUntilFocused(page, control);
      await expectVisibleFocus(control);
    }

    if (testInfo.project.name === "mobile-chromium") {
      const menuButton = page.getByRole("button", { name: "Menu" });
      await menuButton.press("Enter");
      const mobileNavigation = page.getByRole("navigation", {
        name: "Mobile navigation",
      });
      const mobileLinks = mobileNavigation.getByRole("link");
      await expect(mobileLinks.first()).toBeFocused();
      await expectVisibleFocus(mobileLinks.first());
      for (let index = 1; index < (await mobileLinks.count()); index += 1) {
        await tabUntilFocused(page, mobileLinks.nth(index));
        await expectVisibleFocus(mobileLinks.nth(index));
      }
      await page.keyboard.press("Escape");
      await expect(menuButton).toBeFocused();
    }

    const main = page.getByRole("main");
    await main.focus();
    const routeControls = main.locator(
      "a[href]:visible, button:not([disabled]):visible, input:not([disabled]):visible, select:not([disabled]):visible, textarea:not([disabled]):visible",
    );
    const routeControlCount = await routeControls.count();
    for (let index = 0; index < routeControlCount; index += 1) {
      const control = routeControls.nth(index);
      await tabUntilFocused(page, control);
      await expectVisibleFocus(control);
      await expectFocusNotObscured(page, control);
    }
  }
});

test("reduced motion preserves content and pages remain visually stable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.__qualityLayoutShift = 0;

    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!layoutShift.hadRecentInput) {
          window.__qualityLayoutShift =
            (window.__qualityLayoutShift ?? 0) + layoutShift.value;
        }
      }
    }).observe({ buffered: true, type: "layout-shift" });
  });

  for (const route of ROUTES) {
    await page.goto(route.path);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
    });

    await expect(
      page.getByRole("heading", { level: 1, name: route.heading }),
    ).toBeVisible();

    await expect
      .poll(() =>
        page.evaluate(() =>
          getComputedStyle(document.documentElement)
            .getPropertyValue("--motion-duration-fast")
            .trim(),
        ),
      )
      .toMatch(/ms$/);
    await expect
      .poll(() =>
        page.evaluate(() =>
          Number.parseFloat(
            getComputedStyle(document.documentElement)
              .getPropertyValue("--motion-duration-fast")
              .trim(),
          ),
        ),
      )
      .toBe(0.01);

    const qualityMetrics = await page.evaluate(() => {
      const rootStyle = getComputedStyle(document.documentElement);
      const images = Array.from(document.images).map((image) => ({
        fetchPriority: image.fetchPriority,
        hasDimensions: image.width > 0 && image.height > 0,
        loading: image.loading,
        sizes: image.sizes,
      }));

      return {
        imageIssues: images.filter(
          (image) =>
            !image.hasDimensions ||
            image.sizes.length === 0 ||
            image.loading === "eager" ||
            image.fetchPriority === "high",
        ).length,
        layoutShift: window.__qualityLayoutShift ?? 0,
        mainTextLength:
          document.querySelector("main")?.textContent?.trim().length ?? 0,
        scrollBehavior: rootStyle.scrollBehavior,
      };
    });

    expect(qualityMetrics.scrollBehavior).toBe("auto");
    expect(qualityMetrics.mainTextLength).toBeGreaterThan(100);
    expect(qualityMetrics.imageIssues).toBe(0);
    expect(qualityMetrics.layoutShift).toBeLessThanOrEqual(0.1);
  }
});
