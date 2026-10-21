import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function fillEnrolment(page: Page) {
  await page.locator("#learnerName").fill("Zoë Dlamini & Co");
  await page.locator("#grade").selectOption("10");
  await page.locator("#curriculum").selectOption("IEB");
  await page
    .getByRole("checkbox", { name: "Mathematics", exact: true })
    .check();
  await page
    .getByRole("checkbox", { name: "Physical Sciences", exact: true })
    .check();
  await page.locator("#guardianName").fill("Parent Dlamini");
  await page.locator("#guardianEmail").fill("parent+school@example.test");
  await page.locator("#guardianPhone").fill("+27 (69) 278-5124");
  await page
    .locator("#message")
    .fill(
      "Please help with revision & exam preparation.\nDankie! 50% + effort.",
    );
  await page.locator("#consent").check();
}

test("enrolment errors are helpful, accessible and focus the first invalid field", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/enrol");
  await page.getByRole("button", { name: "Prepare email draft" }).click();
  await expect(page.getByRole("alert", { name: "Form errors" })).toContainText(
    "Select at least one",
  );
  await expect(page.locator("#learnerName")).toBeFocused();
  await expect(page.locator("#guardianEmail")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByRole("link", { name: "Open email app" })).toHaveCount(
    0,
  );
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});

test("enrolment requires subjects and consent, preserves values and prepares an honest draft", async ({
  page,
}) => {
  await page.goto("/enrol");
  const externalRequests: string[] = [];
  const storageBefore = await page.evaluate(() => ({
    local: { ...localStorage },
    session: { ...sessionStorage },
  }));
  page.on("request", (request) => {
    if (
      !request.url().startsWith("http://127.0.0.1:3000/") ||
      request.method() !== "GET"
    )
      externalRequests.push(request.url());
  });
  await fillEnrolment(page);
  await page.locator("#consent").uncheck();
  await page.getByRole("button", { name: "Prepare email draft" }).click();
  await expect(page.locator("#consent-error")).toBeVisible();
  await page.locator("#consent").check();
  await page
    .getByRole("checkbox", { name: "Mathematics", exact: true })
    .uncheck();
  await page
    .getByRole("checkbox", { name: "Physical Sciences", exact: true })
    .uncheck();
  await page.getByRole("button", { name: "Prepare email draft" }).click();
  await expect(page.locator("#subjects-error")).toBeVisible();
  await page
    .getByRole("checkbox", { name: "Mathematics", exact: true })
    .check();
  await page
    .getByRole("checkbox", { name: "Physical Sciences", exact: true })
    .check();
  await page.getByRole("button", { name: "Prepare email draft" }).click();
  await expect(
    page.getByText("No enquiry has been sent.", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("#draft-title")).toBeFocused();
  const href = await page
    .getByRole("link", { name: "Open email app" })
    .getAttribute("href");
  const mail = new URL(href!);
  expect(mail.protocol).toBe("mailto:");
  expect(mail.pathname).toBe("academicexcellencetuts@gmail.com");
  expect(mail.searchParams.get("subject")).toBe("AET enrolment enquiry");
  expect(mail.searchParams.get("body")).toContain("Zoë Dlamini & Co");
  expect(mail.searchParams.get("body")).toContain(
    "Mathematics, Physical Sciences",
  );
  expect(mail.searchParams.get("body")).toContain("parent+school@example.test");
  expect(mail.searchParams.get("body")).toContain("50% + effort.");
  await expect(page.locator("#learnerName")).toHaveValue("Zoë Dlamini & Co");
  expect(new URL(page.url()).search).toBe("");
  expect(externalRequests).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: { ...localStorage },
      session: { ...sessionStorage },
    })),
  ).toEqual(storageBefore);
  await page.locator("#grade").selectOption("12");
  await expect(page.getByRole("link", { name: "Open email app" })).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "Prepare email draft" }).click();
  await expect(page.locator("#email-draft-text")).toHaveValue(/Grade: 12/);
});

test("contact validates email and message, and copies a complete enquiry", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact");
  await page.locator("#name").fill("  ");
  await page.locator("#email").fill("not-an-email");
  await page.getByRole("button", { name: "Prepare email draft" }).click();
  await expect(page.locator("#name")).toBeFocused();
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#message-error")).toBeVisible();
  await page.locator("#name").fill("André Parent");
  await page.locator("#email").fill("andre+school@example.test");
  await page
    .locator("#message")
    .fill("Do you offer Afrikaans & History?\nThank you!");
  await page.getByRole("button", { name: "Prepare email draft" }).click();
  await page.getByRole("button", { name: "Copy email text" }).click();
  await expect(page.getByRole("status")).toContainText("Email text copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Do you offer Afrikaans & History?\nThank you!",
  );
  await expect(
    page.getByText("No enquiry has been sent.", { exact: true }),
  ).toBeVisible();
});

test("a long enquiry remains available when clipboard access fails", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new Error("Unavailable");
        },
      },
    }),
  );
  await page.goto("/contact");
  await page.locator("#name").fill("Parent");
  await page.locator("#email").fill("parent@example.test");
  const message = "Academic support & questions. ".repeat(200);
  await page.locator("#message").fill(message);
  await page.getByRole("button", { name: "Prepare email draft" }).click();
  await page.getByRole("button", { name: "Copy email text" }).click();
  await expect(page.getByRole("status")).toContainText("Select and copy");
  await expect(page.locator("#email-draft-text")).toHaveValue(
    new RegExp(message.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
  );
  const href = await page
    .getByRole("link", { name: "Open email app" })
    .getAttribute("href");
  expect(new URL(href!).searchParams.get("body")).toContain(message.trim());
});
