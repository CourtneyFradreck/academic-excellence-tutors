import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { subjects, welcomeStatement } from "../src/data/site";

const routes = ["/", "/about", "/subjects", "/services", "/enrol", "/contact"];

for (const width of [320, 375, 768, 1440]) {
  for (const route of routes) {
    test(`${route} renders without overflow or broken images at ${width}px`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 950 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page).toHaveTitle(/Academic Excellence Tutors/);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await expect
        .poll(() =>
          page
            .locator("img")
            .evaluateAll((images) =>
              images.flatMap((image) =>
                image instanceof HTMLImageElement &&
                (!image.complete || image.naturalWidth === 0)
                  ? [image.src]
                  : [],
              ),
            ),
        )
        .toEqual([]);
      await expect(
        page
          .getByRole("contentinfo")
          .getByRole("link", { name: "069 278 5124" }),
      ).toHaveAttribute("href", "tel:+27692785124");
      expect(errors).toEqual([]);
      if (
        width === 1440 ||
        (width === 375 && ["/", "/enrol", "/contact"].includes(route))
      ) {
        await page.screenshot({
          path: testInfo.outputPath(`page-${width}.png`),
          fullPage: true,
        });
      }
    });
  }
}

for (const route of routes) {
  test(`${route} meets automated WCAG AA checks`, async ({ page }) => {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}

test("the approved welcome statement and all ten subjects are present", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Welcome to Academic Excellence",
  );
  await expect(page.getByText(welcomeStatement, { exact: true })).toBeVisible();
  await page.goto("/subjects");
  for (const subject of subjects)
    await expect(
      page.getByRole("heading", { name: subject.name, exact: true }),
    ).toBeVisible();
});

test("desktop navigation and the enrolment call to action work", async ({
  page,
}) => {
  await page.goto("/");
  for (const [name, route] of [
    ["About us", "/about"],
    ["Subjects", "/subjects"],
    ["Services", "/services"],
    ["Contact", "/contact"],
  ]) {
    await page
      .getByRole("navigation", { name: "Main navigation", exact: true })
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
  }
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Enrol Now", exact: true })
    .click();
  await expect(page).toHaveURL(/\/enrol$/);
});

test("mobile navigation supports keyboard access, Escape and route changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    nav.getByRole("link", { name: "Home", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await nav.getByRole("link", { name: "Subjects", exact: true }).click();
  await expect(page).toHaveURL(/\/subjects$/);
  await expect(nav).toBeHidden();
});

test("legacy content routes redirect and unsupported old pages are retired", async ({
  page,
}) => {
  for (const [oldPath, newPath] of [
    ["/index.html", "/"],
    ["/pages/about-us.html", "/about"],
    ["/pages/academy.html", "/subjects"],
    ["/pages/contact.html", "/contact"],
    ["/forms/registration.html", "/enrol"],
  ]) {
    await page.goto(oldPath);
    expect(new URL(page.url()).pathname).toBe(newPath);
  }
  for (const route of ["/pages/paymentplans.html", "/pages/Ts&Cs.html"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Let’s get you back on track.",
    );
  }
});

test("metadata is descriptive and does not invent a production URL", async ({
  page,
  request,
}) => {
  const titles = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    titles.add(await page.title());
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      "content",
      "Academic Excellence Tutors",
    );
    if (!process.env.NEXT_PUBLIC_SITE_URL)
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  }
  expect(titles.size).toBe(6);
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    expect(await sitemap.text()).not.toContain("<loc>");
    expect(await robots.text()).not.toContain("Sitemap:");
  }
});

test("forms are disabled without JavaScript and direct email remains usable", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of ["/enrol", "/contact"]) {
    await page.goto(`http://127.0.0.1:3000${route}`);
    await expect(
      page.getByRole("button", { name: "Prepare email draft" }),
    ).toBeDisabled();
    await expect(page.locator("noscript p")).toBeVisible();
    await expect(
      page.locator('a[href="mailto:academicexcellencetuts@gmail.com"]').first(),
    ).toBeVisible();
  }
  await context.close();
});
