import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  const production = process.env.VERCEL_ENV === "production";
  return {
    rules: {
      userAgent: "*",
      allow: production ? "/" : undefined,
      disallow: production ? ["/app", "/api"] : "/",
    },
    ...(production
      ? {
          sitemap: `${SITE_URL}/sitemap.xml`,
        }
      : {}),
  };
}
