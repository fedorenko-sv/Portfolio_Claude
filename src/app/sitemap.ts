import type { MetadataRoute } from "next";
import { catalogFor } from "@/content/catalog";
import { SITE_URL } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = SITE_URL;
  const content = catalogFor("production");
  return [
    "/",
    "/training",
    "/solutions",
    "/cases",
    "/materials",
    "/speaking",
    "/contact",
    "/practice/first-ai-task",
    "/privacy",
    "/terms",
    ...content.cases.map((x) => `/cases/${x.slug}`),
    ...content.materials.map((x) => `/materials/${x.slug}`),
    ...content.programs.map((x) => `/training/${x.slug}`),
  ].map((path) => ({ url: new URL(path, origin).href }));
}
