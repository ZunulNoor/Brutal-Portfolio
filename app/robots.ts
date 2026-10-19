import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!siteUrl) {
    return {
      rules: [
        { userAgent: "*", allow: "/" },
        { userAgent: "GPTBot", allow: "/" },
        { userAgent: "ChatGPT-User", allow: "/" },
        { userAgent: "ClaudeBot", allow: "/" },
        { userAgent: "PerplexityBot", allow: "/" },
        { userAgent: "Google-Extended", allow: "/" },
      ],
    };
  }
  const base = siteUrl.replace(/\/$/, "");
  const aiAgents = [
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "PerplexityBot",
    "Google-Extended",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiAgents.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
