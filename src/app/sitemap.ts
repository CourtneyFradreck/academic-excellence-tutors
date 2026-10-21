import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  if (!base) return [];
  return ["/", "/about", "/subjects", "/services", "/enrol", "/contact"].map(
    (path) => ({ url: new URL(path, base).href }),
  );
}
