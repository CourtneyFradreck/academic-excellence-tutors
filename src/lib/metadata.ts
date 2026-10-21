import type { Metadata } from "next";
import { organisation } from "@/data/site";

export function getSiteUrl(
  value = process.env.NEXT_PUBLIC_SITE_URL,
): URL | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return undefined;
    return new URL(url.origin);
  } catch {
    return undefined;
  }
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const base = getSiteUrl();
  const url = base ? new URL(path, base).href : undefined;
  return {
    title: { absolute: `${title} | ${organisation.name}` },
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title: `${title} | ${organisation.name}`,
      description,
      siteName: organisation.name,
      locale: "en_ZA",
      type: "website",
      ...(url ? { url } : {}),
      ...(base
        ? {
            images: [
              {
                url: new URL("/brand/aet-logo.jpg", base).href,
                width: 313,
                height: 313,
                alt: organisation.name,
              },
            ],
          }
        : {}),
    },
  };
}
