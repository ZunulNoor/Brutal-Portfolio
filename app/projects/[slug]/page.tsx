import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/content/projects";
import ShareRow from "@/components/seo/ShareRow";
import { canonical, site } from "@/lib/site";
import styles from "./case-study.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  const url = canonical(`/projects/${slug}`);
  const description =
    project.tagline.length > 150
      ? `${project.tagline.slice(0, 147)}…`
      : project.tagline;
  return {
    title: `${project.title} — case study`,
    description,
    keywords: [
      `${project.title} case study`,
      "Zun Ul Noor",
      ...project.stack.slice(0, 4),
      project.type,
    ],
    ...(url
      ? {
          alternates: { canonical: url },
          openGraph: { title: `${project.title} — case study`, description, url },
        }
      : {}),
  };
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className={styles.fact}>
      <dt>{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);
  const shareUrl = canonical(`/projects/${slug}`) ?? "";
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Projects",
        ...(base ? { item: `${base}/projects` } : {}),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${project.no} — ${project.title}`,
        ...(base ? { item: `${base}/projects/${slug}` } : {}),
      },
    ],
  };

  return (
    <article className="section" aria-labelledby="case-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="container">
        <nav aria-label="Breadcrumb" className={styles.crumb}>
          <Link href="/projects">Projects</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">
            {project.no} — {project.title}
          </span>
        </nav>

        <p className="label">
          Case study — {project.kindLabel}
          {project.org ? ` · ${project.org}` : ""}
        </p>
        <h1 id="case-heading" className={styles.title}>
          {project.title}
        </h1>
        <p className={styles.tagline}>{project.tagline}</p>

        <dl className={styles.facts}>
          <Fact term="Type">{project.type}</Fact>
          <Fact term="Role">{project.role}</Fact>
          <Fact term="Stack">{project.stack.join(" · ")}</Fact>
          <Fact term="Live">
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.urlLabel} ↗
            </a>
          </Fact>
        </dl>

        <section aria-labelledby="cs-context">
          <h2 id="cs-context" className={styles.h2}>
            Context &amp; problem
          </h2>
          {project.context.map((p, i) => (
            <p key={i} className={styles.prose}>
              {p}
            </p>
          ))}
        </section>

        <section aria-labelledby="cs-resp">
          <h2 id="cs-resp" className={styles.h2}>
            My responsibilities
          </h2>
          <ul className={styles.points}>
            {project.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="cs-impl">
          <h2 id="cs-impl" className={styles.h2}>
            Implementation &amp; technical decisions
          </h2>
          <ul className={styles.points}>
            {project.implementation.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        {project.challenges && (
          <section aria-labelledby="cs-chal">
            <h2 id="cs-chal" className={styles.h2}>
              Challenges &amp; trade-offs
            </h2>
            <ul className={styles.points}>
              {project.challenges.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="cs-out">
          <h2 id="cs-out" className={styles.h2}>
            Outcomes &amp; lessons
          </h2>
          <ul className={styles.points}>
            {project.outcomes.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="cs-links" className={`theme-dark ${styles.linksBox}`}>
          <h2 id="cs-links" className={styles.h2}>
            Links
          </h2>
          <p className={styles.linkRow}>
            <a
              className="btn btn--ink"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit {project.urlLabel} ↗
            </a>
            <a
              className="btn btn--signal"
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Discuss a project
            </a>
          </p>
          <ShareRow
            url={shareUrl}
            text={`${project.title} — case study by ${site.name}`}
            label="Share this case study"
          />
        </section>

        <nav aria-label="Next project" className={styles.next}>
          <Link href={`/projects/${next.slug}`}>
            <span className={styles.nextLabel}>
              Next — {next.no} / {next.title}
            </span>
            <span className={styles.nextTag}>{next.tagline}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
