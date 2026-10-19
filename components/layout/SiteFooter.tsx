import Link from "next/link";
import { Suspense } from "react";
import { nav, site } from "@/lib/site";
import CopyrightYear from "./CopyrightYear";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={`theme-dark ${styles.footer}`}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className="label label--on-dark">Contact</p>
            <p className={styles.big}>
              Have a project?
              <br />
              Let&apos;s talk.
            </p>
          </div>
          <div className={styles.actions}>
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
        </div>

        <nav aria-label="Footer" className={styles.bottom}>
          <ul className={styles.links}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </li>
          </ul>
          <p className={styles.meta}>
            © <Suspense fallback={null}>
              <CopyrightYear />
            </Suspense>{" "}
            {site.name} — {site.location}
          </p>
          <address className={styles.meta} style={{ fontStyle: "normal" }}>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            {" · "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {" · "}
            {site.location}
          </address>
        </nav>
      </div>
    </footer>
  );
}
