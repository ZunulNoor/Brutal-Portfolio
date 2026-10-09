import type { Metadata } from "next";
import ProjectCard from "@/components/projects/ProjectCard";
import Reveal from "@/components/animation/Reveal";
import { projects, type Project } from "@/content/projects";
import { canonical, site } from "@/lib/site";
import styles from "./projects.module.css";

const projectsCanonical = canonical("/projects");

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Zun Ul Noor: production logistics SaaS, car-sharing platforms, corporate sites, machine-learning apps, and an independently published WordPress plugin.",
  ...(projectsCanonical
    ? {
        alternates: { canonical: projectsCanonical },
        openGraph: { url: projectsCanonical },
      }
    : {}),
};

function CardItem({ project, index }: { project: Project; index: number }) {
  return (
    <li>
      <Reveal delay={Math.min(index * 0.05, 0.2)}>
        <ProjectCard project={project} />
      </Reveal>
    </li>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <section className="section" aria-labelledby="projects-heading">
        <div className="container">
          <p className="label">Index — 08 case studies</p>
          <h1 id="projects-heading" className={styles.heading}>
            Work
          </h1>
          <p className={styles.intro}>
            Production SaaS dashboards, client platforms, and independent
            builds — from logistics systems and car-sharing interfaces to a
            machine-learning application and a published WordPress plugin.
            Professional work and independent projects are labeled as such on
            every case study.
          </p>
          <ul className={styles.list}>
            {projects.map((project, i) => (
              <CardItem key={project.slug} project={project} index={i} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="projects-cta-heading">
        <div className="container">
          <div className={styles.cta}>
            <h2 id="projects-cta-heading">Something to build?</h2>
            <p>
              Ongoing frontend maintenance, new features, or a project from
              zero — start with a conversation.
            </p>
            <p className={styles.ctaRow}>
              <a
                className="btn btn--signal"
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a meeting
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
