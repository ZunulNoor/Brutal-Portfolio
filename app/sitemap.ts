import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site";

/**
 * Stable URLs for all primary pages + case studies (AGENTS.md §12).
 * No guessed domain: when NEXT_PUBLIC_SITE_URL is unset we emit no
 * entries rather than a fabricated production URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const base = siteUrl.replace(/\/$/, "");
  const staticRoutes = ["/", "/projects", "/resume", "/about"].map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...projectRoutes];
}
