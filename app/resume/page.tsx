import type { Metadata } from "next";
import Link from "next/link";
import { canonical, site } from "@/lib/site";
import styles from "./resume.module.css";

const resumeCanonical = canonical("/resume");

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Zun Ul Noor — Frontend Engineer, Karachi. Experience, SaaS projects, skills, education.",
  keywords: [
    "Zun Ul Noor resume",
    "frontend engineer CV Pakistan",
    "React Next.js skills",
    "Zip24 Shipox developer",
  ],
  ...(resumeCanonical
    ? {
        alternates: { canonical: resumeCanonical },
        openGraph: { url: resumeCanonical },
      }
    : {}),
};

const SKILLS: Array<{ group: string; items: string }> = [
  { group: "Frontend", items: "MERN Stack, Next.js, JavaScript, HTML5, CSS, Tailwind CSS, Bootstrap, MUI" },
  { group: "Backend / AI", items: "Python, Streamlit, AI integration, Node.js, REST APIs" },
  { group: "Platforms & tools", items: "WordPress, Webflow, Git, GitHub, Vercel, Postman" },
];

export default function ResumePage() {
  return (
    <div className="section" aria-labelledby="resume-heading">
      <div className="container">
        <p className="label">Curriculum vitae</p>

        <header className={styles.header}>
          <h1 id="resume-heading">{site.name}</h1>
          <p className={styles.role}>Full Stack Developer</p>
          <address className={styles.contact}>
            {site.location} ·{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a> ·{" "}
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>{" "}
            ·{" "}
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </address>
          <p className={styles.download}>
            <a className="btn btn--ink" href="/zun-ul-noor-resume.pdf" download>
              Download PDF
            </a>
          </p>
        </header>

        <section aria-labelledby="resume-summary" className={styles.block}>
          <h2 id="resume-summary">Summary</h2>
          <p>
            Front End Developer with production experience building
            React/Next.js interfaces for a logistics SaaS platform, plus a
            MERN-stack background delivering full-stack SaaS features.
            Extending into applied AI and Python: shipped a Python automation
            pipeline integrating the Claude API for content generation, and an
            XGBoost-based ML web app for health risk prediction. Comfortable
            across the stack — from React UI to Python backends and model
            integration — with a track record of freelance delivery for
            external clients.
          </p>
        </section>

        <section aria-labelledby="resume-exp" className={styles.block}>
          <h2 id="resume-exp">Work experience</h2>

          <article className={styles.job}>
            <h3>Front End Developer — Zip24</h3>
            <p className={styles.jobFocus}>Shipox — logistics SaaS delivery management platform</p>
            <ul>
              <li>Build and maintain React-based front-end features for Shipox, a logistics delivery management SaaS product.</li>
              <li>Designed and built Zipped Docs, an internal WordPress documentation plugin, to migrate Zip24&apos;s internal documentation off Notion; later refined and published publicly on the WordPress Plugin Directory.</li>
            </ul>
          </article>

          <article className={styles.job}>
            <h3>Full-Stack Developer — E-Tech Solutions</h3>
            <ul>
              <li>Developed full-stack SaaS features using the MERN stack (MongoDB, Express, React, Node.js).</li>
              <li>Built React/Next.js interfaces for SaaS product functionality.</li>
            </ul>
          </article>

          <article className={styles.job}>
            <h3>Freelance Developer — Independent / Multiple Clients</h3>
            <ul>
              <li>Wingmate Studio (Dubai, remote): Webflow site development — content management and page building implemented to match Figma design specifications.</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="resume-projects" className={styles.block}>
          <h2 id="resume-projects">Selected projects</h2>

          <article className={styles.job}>
            <h3>
              Zipped Docs — WordPress plugin · PHP, JavaScript, REST API ·{" "}
              <Link href="/projects/zipped-docs">
                Zipped Docs case study
              </Link>
            </h3>
            <ul>
              <li>Built a WordPress documentation plugin featuring a hierarchical table of contents, scroll-spy navigation, client-side search, and a REST API endpoint.</li>
              <li>Published publicly on the WordPress Plugin Directory.</li>
            </ul>
          </article>

          <article className={styles.job}>
            <h3>
              Personalized Healthcare Risk Prediction · Python, XGBoost, Streamlit ·{" "}
              <Link href="/projects/healthcare-risk-prediction">
                Healthcare Risk Prediction case study
              </Link>
            </h3>
            <ul>
              <li>Built a machine-learning web app predicting diabetes risk from lifestyle, health history, and demographic inputs (21 features), using a trained XGBoost classifier (approximately 86% accuracy, ROC AUC 0.82+).</li>
              <li>Implemented a personalized recommendation engine and an interactive Streamlit interface for real-time inference; deployed on Streamlit Cloud.</li>
            </ul>
          </article>

          <p>
            <Link href="/projects">All 8 project case studies →</Link>
          </p>
        </section>

        <section aria-labelledby="resume-skills" className={styles.block}>
          <h2 id="resume-skills">Technical skills</h2>
          <dl className={styles.skills}>
            {SKILLS.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="resume-edu" className={styles.block}>
          <h2 id="resume-edu">Education</h2>
          <ul className={styles.edu}>
            <li>
              <strong>BS, Computer Science</strong> — Federal Urdu University of
              Arts, Science and Technology · Expected 2027
            </li>
            <li>
              <strong>Intermediate, Pre-Engineering</strong> — BIEK · 2020–2022
            </li>
          </ul>
        </section>

        <footer className={styles.footer}>
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
        </footer>
      </div>
    </div>
  );
}
