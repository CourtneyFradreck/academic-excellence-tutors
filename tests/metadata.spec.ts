import { test, expect } from "@playwright/test";
import { getSiteUrl, pageMetadata } from "../src/lib/metadata";

test("public URL configuration accepts web origins and rejects malformed or credentialed URLs", () => {
  expect(getSiteUrl("")).toBeUndefined();
  expect(getSiteUrl("not a domain")).toBeUndefined();
  expect(getSiteUrl("javascript:alert(1)")).toBeUndefined();
  expect(getSiteUrl("https://user:password@example.test")).toBeUndefined();
  expect(getSiteUrl("https://aet.example.test/path?query=1")?.href).toBe(
    "https://aet.example.test/",
  );
});

test("configured metadata uses the supplied origin without making one up", () => {
  const previous = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    process.env.NEXT_PUBLIC_SITE_URL = "https://aet.example.test";
    expect(
      pageMetadata("Subjects", "AET subjects", "/subjects").alternates
        ?.canonical,
    ).toBe("https://aet.example.test/subjects");
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(
      pageMetadata("Subjects", "AET subjects", "/subjects").alternates,
    ).toBeUndefined();
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previous;
  }
});
