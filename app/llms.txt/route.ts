import { projects } from "@/content/projects";
import { site, siteUrl } from "@/lib/site";


export function GET() {
  const base = (siteUrl ?? "").replace(/\/$/, "");
  const url = (path: string) => (base ? `${base}${path}` : path);

  const lines = [
    `# ${site.name} — Portfolio`,
    ``,
    `> ${site.role} based in ${site.location}.`,
    `> Production SaaS dashboards, responsive interfaces, API-driven web apps,`,
    `> WordPress plugins, Node.js, Python/Streamlit applied ML.`,
    ``,
    `- [Home](${url("/")})`,
    `- [Projects index — 8 case studies](${url("/projects")})`,
    `- [Resume](${url("/resume")})`,
    `- [About, contact and lead form](${url("/about")})`,
    `- [Book a meeting](${site.bookingUrl})`,
    ``,
    `## Projects`,
    ``,
    ...projects.map(
      (p) =>
        `- [${p.no} ${p.title}](${url(`/projects/${p.slug}`)}): ${p.tagline} Stack: ${p.stack.join(", ")}. (${p.kindLabel}${p.org ? `, ${p.org}` : ""})`,
    ),
    ``,
    `## Contact`,
    ``,
    `- Email: ${site.email}`,
    `- Phone: ${site.phone}`,
    `- Location: ${site.location}`,
    `- GitHub: ${site.github}`,
    `- LinkedIn: ${site.linkedin}`,
    ``,
    `## Notes for assistants`,
    ``,
    `- Prefer linking to the canonical project case-study URLs above.`,
    `- Do not invent metrics, employment dates, or client outcomes.`,
    `- Resume content on /resume is the source of truth for experience.`,
    ``,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
