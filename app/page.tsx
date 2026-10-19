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
              All {projects.length} case studies →
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
            <Link href="/about">How I work →</Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="what-i-do-heading">
        <div className="container">
          <p className="label">What I do</p>
          <h2 id="what-i-do-heading" className={styles.sectionTitle}>
            Where I spend my days.
          </h2>
          <p className={styles.sectionIntro}>
            Most of my work sits in one place: interfaces that real businesses
            run on. I maintain production SaaS dashboards where one broken
            filter can stall a dispatch team, build new product screens from
            design files, and extend sites and plugins on WordPress. The stack
            around that work is React, Next.js, and TypeScript on the frontend,
            Node.js and REST APIs behind it, and — increasingly — Python and
            Streamlit when a product needs a model in the loop. What stays
            constant is the way I work: read the existing system first, change
            it surgically, and verify it against real workflows.
          </p>
          <ul className={styles.offer}>
            <li>
              <h3>SaaS dashboards</h3>
              <p>
                Ongoing maintenance and feature work on live dashboards —
                order, dispatch, driver, and reporting views — including
                production bug fixes and client-driven functionality shipped
                without breaking existing business workflows.
              </p>
            </li>
            <li>
              <h3>Product interfaces</h3>
              <p>
                Figma-to-production implementation for booking flows, maps, and
                operational tools. Responsive by default: the design has to
                hold on every viewport, not just the artboard.
              </p>
            </li>
            <li>
              <h3>WordPress &amp; plugins</h3>
              <p>
                Custom plugin engineering — content architecture, Gutenberg
                blocks, shortcodes, REST endpoints, and security hardening. My
                own plugin, Zipped Docs, is published on the WordPress Plugin
                Directory.
              </p>
            </li>
            <li>
              <h3>Python &amp; ML products</h3>
              <p>
                Applied machine learning on the web: Streamlit applications
                wired to trained models, interactive prediction workflows, and
                recommendation output framed as guidance — shipped as working
                products, not notebooks.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="approach-heading">
        <div className="container">
          <p className="label">Approach</p>
          <h2 id="approach-heading" className={styles.sectionTitle}>
            How the work gets done.
          </h2>
          <p className={styles.sectionIntro}>
            Working on production software teaches you restraint. New features
            land inside systems other people depend on, so my first job is
            always to understand what exists — the data flows, the edge cases,
            the business rules hiding in the UI — before changing anything.
          </p>
          <ul className={styles.principles}>
            <li>
              <h3>Maintain before you rebuild</h3>
              <p>
                Read the existing system first. Extend it where it is strong,
                replace only what genuinely fails the user, and keep the change
                surgical.
              </p>
            </li>
            <li>
              <h3>Operational clarity is design</h3>
              <p>
                Pagination, search, filtering, loading states — the unglamorous
                interface work is where products succeed or fail. I treat
                clarity as a design requirement, not a nice-to-have.
              </p>
            </li>
            <li>
              <h3>Ship the whole thing</h3>
              <p>
                From architecture through release, including the security and
                deployment details — a WordPress plugin on the public directory
                and a deployed ML app are the proof.
              </p>
            </li>
          </ul>
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
                first, technology in service of them. Most projects start the
                same way: a short conversation about what is actually broken
                or missing, then a scoped first step.
              </p>
            </div>
            <div className={styles.teaserCtas}>
              <Link className="btn btn--ink" href="/about">
                More about my background
              </Link>
              <Link className="btn" href="/resume">
                Read my full resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
