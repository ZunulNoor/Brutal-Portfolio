import Link from "next/link";
import type { Project } from "@/content/projects";
import styles from "./ProjectCard.module.css";

/** Index/selected-work row: number, title, summary, meta, case link. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={styles.card}
      data-tone={project.accent.tone}
      data-motif={project.accent.motif}
    >
      <span className={styles.no} aria-hidden="true">
        {project.no}
      </span>
      <span className={styles.body}>
        <span className={styles.top}>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </span>
        <span className={styles.tagline}>{project.tagline}</span>
        <span className={styles.meta}>
          <span>{project.kindLabel}</span>
          <span aria-hidden="true">/</span>
          <span>{project.type}</span>
          <span aria-hidden="true">/</span>
          <span>{project.stack.slice(0, 4).join(" · ")}</span>
        </span>
      </span>
    </Link>
  );
}
