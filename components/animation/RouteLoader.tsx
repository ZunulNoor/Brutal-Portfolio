"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getProject } from "@/content/projects";
import { prefersReducedMotion } from "@/lib/motion";
import styles from "./RouteLoader.module.css";

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
  const [runId, setRunId] = useState(0);
  const [gone, setGone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.getElementById("boot-curtain")?.remove();
      setGone(true);
      return;
    }
    setGone(false);
    setRunId((n) => n + 1);
  }, [pathname]);

  const label = labelFor(pathname ?? "/");

  useEffect(() => {
    if (runId === 0 || gone) return;
    const overlay = overlayRef.current;
    const word = wordRef.current;
    if (!overlay || !word) return;

    document.getElementById("boot-curtain")?.remove();

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const prevOverscroll = root.style.overscrollBehavior;
    const lock = () => {
      root.style.overflow = "hidden";
    };
    const unlock = () => {
      root.style.overflow = prevOverflow;
      root.style.overscrollBehavior = prevOverscroll;
    };
    lock();

    let cancelled = false;

    let ctx: { revert(): void } | null = null;
    let gsapApi: typeof import("gsap").gsap | null = null;

    overlay.style.visibility = "visible";
    const start = () => {
      if (cancelled || !gsapApi) return;
      const gsap = gsapApi;
      ctx = gsap.context(() => {
        const chars = word.querySelectorAll(`.${styles.char}`);
        const chrome = overlay.querySelectorAll(
          `.${styles.kicker}, .${styles.foot}`,
        );

        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          onComplete: () => {
            unlock();
            setGone(true);
          },
          onInterrupt: unlock,
        });

        tl.set(overlay, { autoAlpha: 1, yPercent: 0 })
          .set(word, { x: 0, y: 0, scale: 1, opacity: 1, yPercent: 0 })
          .set(chars, { yPercent: 112 })
          .set(chrome, { opacity: 1 })

          .to(chars, { yPercent: 0, duration: 0.7, stagger: 0.035 })

          .to({}, { duration: 0.9 })

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

          .to(overlay, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<");
      }, overlay);
    };

    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      gsapApi = gsap;
      gsap.set(overlay, { autoAlpha: 1, yPercent: 0 });
      gsap.set(word.querySelectorAll(`.${styles.char}`), { yPercent: 112 });
      requestAnimationFrame(() => {
        requestAnimationFrame(start);
      });
    });
    const fallback = setTimeout(() => {
      if (ctx) return;
      overlay.style.transition = "opacity 400ms ease";
      overlay.style.opacity = "0";
      setTimeout(() => {
        unlock();
        setGone(true);
      }, 420);
    }, 3500);
    const failsafe = setTimeout(() => {
      if (cancelled) return;
      cancelled = true;
      ctx?.revert();
      unlock();
      setGone(true);
    }, 4000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      clearTimeout(failsafe);
      ctx?.revert();
      ctx = null;
      unlock();
    };
  }, [runId, gone]);

  if (gone) return null;

  const long = label.word.length > 12;

  return (
    <div
      key={runId}
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
