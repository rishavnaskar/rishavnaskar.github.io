import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Required by `output: "export"` — emits sitemap.xml at build time. */
export const dynamic = "force-static";

/**
 * One page. `lastModified` is the build time, which is honest for a static
 * export — the page is regenerated on every deploy and nothing else changes
 * it in between.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
