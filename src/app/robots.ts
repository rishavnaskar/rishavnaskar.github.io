import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Required by `output: "export"` — emits robots.txt at build time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Build assets are not pages; a crawler's budget is better spent on
        // the one page that is. The OG image stays crawlable for scrapers.
        disallow: ["/_next/static/chunks/", "/404"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
