import Link from "next/link";
import Reveal from "@/components/animation/Reveal";
import HeroAscii from "@/components/sections/HeroAscii";
import ProjectCard from "@/components/projects/ProjectCard";
import { featuredProjects, projects } from "@/content/projects";
import styles from "./page.module.css";

const CAPABILITIES: Array<{ area: string; items: string }> = [
  { area: "Frontend", items: "React.js · Next.js · JavaScript · HTML5 · CSS · MUI · Tailwind CSS · Bootstrap" },
  { area: "Data & APIs", items: "REST APIs · React Query · Pagination · Search · Filtering" },
  { area: "Maps & Geo", items: "Google Maps · Mapbox · Geolocation interfaces" },
  { area: "CMS & Plugins", items: "WordPress · Gutenberg · Custom plugins · Shortcodes · REST API" },
  { area: "Backend", items: "Node.js · Express · MySQL · MongoDB · Firebase" },
  { area: "Applied AI & Python", items: "Python · Streamlit · XGBoost · AI integration" },
];

export default function Home() {
  return (
    <>
      <HeroAscii />

      <section className="section" aria-labelledby="selected-heading">
        <div className="container">
          <p className="label">Selected work</p>
          <h2 id="selected-heading" className={styles.sectionTitle}>
            Proof, not promises.
          </h2>
          <ul className={styles.selected}>
            {featuredProjects.map((project, i) => (
              <li key={project.slug}>
                <Reveal delay={Math.min(i * 0.06, 0.18)}>
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
          <p className={styles.more}>
            <Link href="/projects">
              Full index — all {projects.length} case studies →
            </Link>
          </p>
        </div>
      </section>

      <section
        className={`section theme-dark ${styles.capSection}`}
        aria-labelledby="capabilities-heading"
      >
        <div className="container">
          <p className="label label--on-dark">Capabilities</p>
          <h2 id="capabilities-heading" className={styles.sectionTitle}>
            What I work with.
          </h2>
          <ul className={styles.capGrid}>
            {CAPABILITIES.map((cap) => (
              <li key={cap.area} className={styles.cap}>
                <h3>{cap.area}</h3>
                <p>{cap.items}</p>
              </li>
            ))}
          </ul>
          <p className={styles.more}>
            <Link href="/about">How I work — engineering approach →</Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="about-teaser-heading">
        <div className="container">
          <div className={styles.teaser}>
            <div>
              <p className="label">Briefly, about me</p>
              <h2 id="about-teaser-heading" className={styles.sectionTitle}>
                Engineer first.
              </h2>
              <p className={styles.teaserText}>
                I maintain production SaaS, build interfaces from Figma to
                deployment, and ship independent products — a published
                WordPress plugin and a deployed ML app. Business workflows
                first, technology in service of them.
              </p>
            </div>
            <div className={styles.teaserCtas}>
              <Link className="btn btn--ink" href="/about">
                More about me
              </Link>
              <Link className="btn" href="/resume">
                Read the resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
