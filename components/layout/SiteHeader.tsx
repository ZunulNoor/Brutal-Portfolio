"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link
          href="/"
          id="site-wordmark"
          className={styles.wordmark}
          aria-label="Zun Ul Noor — home"
        >          <span className={styles.wordmarkName}>ZUN UL NOOR</span>
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className={styles.toggleIcon}>
            {open ? "✕" : "☰"}
          </span>
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="site-nav"
          aria-label="Primary"
          className={styles.nav}
          data-open={open}
          onClick={() => setOpen(false)}
        >
          <ul className={styles.links}>
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={styles.link}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            className={`btn btn--signal ${styles.cta}`}
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a meeting
          </a>
        </nav>
      </div>
    </header>
  );
}
