import type { Metadata } from "next";
import Link from "next/link";
import BookingCTA from "@/components/contact/BookingCTA";
import LeadForm from "@/components/contact/LeadForm";
import { canonical, site } from "@/lib/site";
import styles from "./about.module.css";

const aboutCanonical = canonical("/about");

export const metadata: Metadata = {
  title: "About",
  description:
    "About Zun Ul Noor — Frontend Engineer in Karachi. SaaS, React/Next.js, WordPress, ML. Book a meeting.",
  keywords: [
    "about Zun Ul Noor",
    "frontend engineer Karachi",
    "hire React developer Pakistan",
    "book a meeting Cal.com",
  ],
  ...(aboutCanonical
    ? {
        alternates: { canonical: aboutCanonical },
        openGraph: { url: aboutCanonical },
      }
    : {}),
};

const PRINCIPLES = [
  {
    title: "Maintain before you rebuild",
    text: "Production SaaS taught me to read the existing system first. New features land inside real business workflows — dispatch boards, booking flows, reporting views — without breaking what already works.",
  },
  {
    title: "Business workflows first",
    text: "Pagination, search, filtering, tracking states: the unglamorous interface work is where products succeed or fail. I treat operational clarity as a design requirement.",
  },
  {
    title: "Design is a contract",
    text: "Figma to production, pixel-faithful and responsive. Then the behavior has to hold on every viewport, not just the artboard.",
  },
  {
    title: "Ship the whole thing",
    text: "From a WordPress plugin on the public directory to a deployed ML app — I take work from architecture through release, including the security and deployment details.",
  },
];

const INTERESTS = [
  "Maps & geolocation interfaces",
  "WordPress platform engineering",
  "API-driven dashboards",
  "Applied machine learning",
  "Python automation & AI integration",
];

export default function AboutPage() {
  return (
    <>
      <section className="section" aria-labelledby="about-heading">
        <div className="container">
          <p className="label">Profile</p>
          <h1 id="about-heading" className={styles.heading}>
            About
          </h1>
          <p className={styles.lead}>
            I&apos;m {site.name}, a {site.role} based in {site.location}. I
            build React/Next.js interfaces for a logistics SaaS platform, deliver
            full-stack features across the MERN stack, take on freelance builds
            for external clients, and ship independent products — including a
            published WordPress plugin and a deployed machine-learning app.
          </p>

          <h2 className={styles.h2}>How I work</h2>
          <ul className={styles.principles}>
            {PRINCIPLES.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>

          <h2 className={styles.h2}>Technical interests</h2>
          <ul className={styles.interests}>
            {INTERESTS.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>

          <h2 className={styles.h2}>Elsewhere</h2>
          <ul className={styles.links}>
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
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <Link href="/resume">Resume</Link>
            </li>
          </ul>

          <h2 className={styles.h2}>Questions, answered</h2>
          <dl className={styles.faq}>
            <div>
              <dt>Who is Zun Ul Noor?</dt>
              <dd>
                A {site.role} based in {site.location}, working on production
                SaaS dashboards, responsive interfaces, and API-driven web
                applications across React, Next.js, Node.js, WordPress, and
                Python.
              </dd>
            </div>
            <div>
              <dt>What do you specialize in?</dt>
              <dd>
                React/Next.js interfaces, SaaS dashboard maintenance and feature
                development, API integration with pagination, search and
                filtering, Google Maps and Mapbox geolocation, WordPress custom
                plugins, Node.js backends, and Python/Streamlit applied ML.
              </dd>
            </div>
            <div>
              <dt>How do I start a project or book a meeting?</dt>
              <dd>
                Send a short brief through the form below — I reply within 2
                days. Prefer talking?{" "}
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a slot
                </a>
                , no form needed.
              </dd>
            </div>
            <div>
              <dt>What work is in the portfolio?</dt>
              <dd>
                Eight case studies — professional work like the Shipox logistics
                SaaS dashboard at Zip24 and client platforms, plus independent
                builds: the Zipped Docs WordPress plugin and a deployed
                healthcare risk prediction app. See{" "}
                <Link href="/projects">all case studies</Link>.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-heading">
        <div className="container">
          <div className={`theme-dark ${styles.contact}`}>
            <div>
              <p className="label label--on-dark">Start a project</p>
              <h2 id="contact-heading">Tell me about it.</h2>
              <p>
                Send a short brief — I reply within 2 days. Prefer talking?
                Book a slot, no form needed.
              </p>
              <p className={styles.contactCtas}>
                <BookingCTA label="Schedule a call" />
              </p>
              <p className={styles.mailto}>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div className={styles.formWrap}>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
