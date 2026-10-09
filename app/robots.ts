import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/** robots.ts — index everything; reference the sitemap once configured. */
export default function robots(): MetadataRoute.Robots {
  if (!siteUrl) {
    return { rules: { userAgent: "*", allow: "/" } };
  }
  const base = siteUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
