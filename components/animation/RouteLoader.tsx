"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { getProject } from "@/content/projects";
import { prefersReducedMotion } from "@/lib/motion";
import styles from "./RouteLoader.module.css";

/**
 * Produx-style route loader (client-only overlay).
 *
 * Full-screen ink curtain carries the route's name — "ZUN UL NOOR" on home,
 * the section/project name elsewhere — holds ~1s, then the name and the
 * curtain exit upward together in one synced motion.
 *
 * The sequence starts only after the self-hosted Bricolage files
 * (document.fonts.ready) AND full page load, so the loader — set in the
 * same font — never pops in unstyled. A 4s safety cap guarantees visitors
 * are never trapped behind the curtain by a hung resource.
 *
 * Server HTML underneath is untouched (SEO/initial paint unaffected); the
 * overlay mounts only after hydration and renders nothing at all under
 * prefers-reduced-motion. Scroll is locked only while the curtain is up.
 */

type Label = { word: string; kicker: string };

function labelFor(pathname: string): Label {
  if (pathname === "/") return { word: "ZUN UL NOOR", kicker: "Portfolio — Home" };
  if (pathname === "/projects")
    return { word: "PROJECTS", kicker: "Index — 08 case studies" };
  if (pathname === "/resume") return { word: "RESUME", kicker: "Curriculum vitae" };
  if (pathname === "/about") return { word: "ABOUT", kicker: "Profile — Contact" };
  const match = pathname.match(/^\/projects\/([^/]+)/);
  if (match) {
    const project = getProject(match[1]);
    if (project)
      return {
        word: project.title.toUpperCase(),
        kicker: `Case study — ${project.no}`,
      };
  }
  return { word: "ZUN UL NOOR", kicker: "Portfolio" };
}

export default function RouteLoader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  // Client-only: avoids SSR mismatch; overlay never exists in server HTML.
  useEffect(() => {
    setMounted(true);
    setReduced(prefersReducedMotion());
  }, []);

  // Derived during render so the effect always measures the current label.
  const label = labelFor(pathname ?? "/");

  // Restart the sequence on every route change.
  useEffect(() => {
    if (!mounted || reduced) return;
    const overlay = overlayRef.current;
    const word = wordRef.current;
    if (!overlay || !word) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    let cancelled = false;
    let ctx: gsap.Context | null = null;

    // Park the curtain up immediately so no half-rendered page flashes.
    gsap.set(overlay, { autoAlpha: 1, yPercent: 0 });
    gsap.set(word.querySelectorAll(`.${styles.char}`), { yPercent: 112 });

    const start = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const chars = word.querySelectorAll(`.${styles.char}`);
        const chrome = overlay.querySelectorAll(
          `.${styles.kicker}, .${styles.foot}`,
        );

        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          onComplete: () => {
            document.documentElement.style.overflow = prevOverflow;
            gsap.set(overlay, { autoAlpha: 0 });
          },
        });

        // Reset from any previous run, then reveal.
        tl.set(overlay, { autoAlpha: 1, yPercent: 0 })
          .set(word, { x: 0, y: 0, scale: 1, opacity: 1, yPercent: 0 })
          .set(chars, { yPercent: 112 })
          .set(chrome, { opacity: 1 })
          // 1. Chars rise in with stagger.
          .to(chars, { yPercent: 0, duration: 0.7, stagger: 0.035 })
          // 2. Hold so the name reads (~1s after reveal).
          .to({}, { duration: 0.9 })
          // 3. Name and curtain exit upward as one synced motion.
          .add(() => {
            gsap.to(chrome, { opacity: 0, duration: 0.35 });
            gsap.to(word, {
              y: -160,
              scale: 0.9,
              opacity: 0,
              transformOrigin: "center center",
              duration: 0.9,
              ease: "expo.inOut",
            });
          })
          // 4. Curtain lifts in lockstep with the name.
          .to(overlay, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<");
      }, overlay);
    };

    // Wait for the Bricolage files + full page load before revealing.
    // Safety cap: never hold the curtain longer than ~4s.
    const waitForLoad = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else {
        window.addEventListener("load", () => resolve(), { once: true });
        setTimeout(resolve, 4000);
      }
    });
    const waitForFonts = (async () => {
      try {
        if (typeof document.fonts !== "undefined") await document.fonts.ready;
      } catch {
        /* proceed unstyled rather than hang */
      }
    })();
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 4000));
    void Promise.race([Promise.all([waitForFonts, waitForLoad]), timeout]).then(
      start,
    );

    return () => {
      cancelled = true;
      ctx?.revert();
      ctx = null;
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [pathname, mounted, reduced]);

  if (!mounted || reduced) return null;

  const long = label.word.length > 12;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      aria-hidden="true"
      style={{ visibility: "hidden" }}
    >
      <p className={styles.kicker}>{label.kicker}</p>
      <div className={styles.wordMask}>
        <span
          ref={wordRef}
          className={styles.word}
          data-long={long ? "true" : "false"}
        >
          {label.word.split("").map((ch, i) => (
            <span key={i} className={styles.char}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </span>
      </div>
      <div className={styles.foot}>
        <span>
          <span className={styles.signal} />
          {pathname === "/" ? "FE / FS — KHI" : pathname}
        </span>
        <span>LOADING</span>
      </div>
    </div>
  );
}
