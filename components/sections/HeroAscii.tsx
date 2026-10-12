import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import AsciiPortrait from "@/components/graphics/AsciiPortrait";
import { site } from "@/lib/site";
import styles from "./HeroAscii.module.css";

/**
 * Glyph portrait source of truth is ascii-art.txt at the project root.
 * Cached so the route stays statically prerenderable (cacheComponents).
 */
async function getPortraitLines(): Promise<string[]> {
  "use cache";
  const raw = await readFile(path.join(process.cwd(), "ascii-art.txt"), "utf8");
  return raw.split("\n").filter((l) => l.length > 0);
}

/**
 * Centered brutal hero: identity, ASCII self-portrait, CTAs.
 * (Revert path: swap <HeroAscii /> in app/page.tsx back to <HeroLegacy />.)
 */
export default async function HeroAscii() {
  const lines = await getPortraitLines();

  return (
    <section className="section" aria-labelledby="intro-heading">
      <div className={`container ${styles.hero}`}>
        <div className={styles.head}>
        <p className={styles.kicker}>
          {site.role} — {site.location}
        </p>
        <h1 id="intro-heading" className={styles.name}>
          ZUN UL NOOR
        </h1>
        </div>
        <div className={styles.portrait}>
          <AsciiPortrait lines={lines} compact />
        </div>
        <div className={styles.body}>
        <p className={styles.lead}>
          I&apos;m {site.name}, a frontend engineer working on production SaaS
          dashboards, responsive interfaces, and API-driven web applications —
          across React, Next.js, Node.js, WordPress, and Python.
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
        <ul className={styles.facts} aria-label="Key facts">
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
      </div>
    </section>
  );
}
