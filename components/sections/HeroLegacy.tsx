import Link from "next/link";
import KineticLines from "@/components/animation/KineticLines";
import HeroField from "@/components/graphics/HeroField";
import { site } from "@/lib/site";
import styles from "@/app/page.module.css";

export default function HeroLegacy() {
  return (
    <section className="section" aria-labelledby="intro-heading">
      <div className={`container ${styles.heroGrid}`}>
        <div>
          <p className="label">
            {site.role} — {site.location}
          </p>
          <KineticLines
            id="intro-heading"
            className={`display ${styles.hero}`}
            lines={[
              { key: "l1", content: "I BUILD" },
              { key: "l2", content: "DIGITAL", outline: true },
              {
                key: "l3",
                content: (
                  <>
                    SYSTEMS
                    <span className={styles.tick} aria-hidden="true" />
                  </>
                ),
              },
            ]}
          />
          <p className={styles.lead}>
            I&apos;m {site.name}, a frontend engineer working on production
            SaaS dashboards, responsive interfaces, and API-driven web
            applications — across React, Next.js, Node.js, WordPress, and
            Python.
          </p>
          <div className={styles.ctas}>
            <Link className="btn btn--ink" href="/projects">
              View projects
            </Link>
            <a
              className="btn btn--signal"
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a meeting
            </a>
            <Link className="btn" href="/about">
              Start a project
            </Link>
          </div>
          <ul className={styles.meta} aria-label="Key facts">
            <li>
              <span>Base</span>
              <strong>Karachi, PK — 24.86°N 67.00°E</strong>
            </li>
            <li>
              <span>Stack</span>
              <strong>React · Next.js · Node</strong>
            </li>
            <li>
              <span>Focus</span>
              <strong>SaaS dashboards · APIs</strong>
            </li>
          </ul>
        </div>
        <div className={styles.artCol}>
          <HeroField />
        </div>
      </div>
    </section>
  );
}
