"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import styles from "./AsciiPortrait.module.css";

const GLYPHS = "@%#*+=-:. ";

const LETTERS: Record<string, string[]> = {
  Z: ["#######", "     #", "    #", "   #", "  #", " #", "#######"],
  U: ["##   ##", "##   ##", "##   ##", "##   ##", "##   ##", "##   ##", "#######"],
  N: ["##   ##", "###  ##", "###  ##", "## # ##", "##  ###", "##  ###", "##   ##"],
  L: ["##", "##", "##", "##", "##", "##", "#######"],
  O: [" ##### ", "##   ##", "##   ##", "##   ##", "##   ##", "##   ##", " ##### "],
  R: ["###### ", "##   ##", "##   ##", "#####  ", "##  ## ", "##   ## ", "##   ## "],
  " ": ["", "", "", "", "", "", ""],
};

const NAME = ["Z", "U", "N", " ", "U", "L", " ", "N", "O", "O", "R"];

function nameBanner(width: number, height: number): string[] {
  const rows: string[] = [];
  for (let r = 0; r < 7; r++) {
    rows.push(NAME.map((ch) => (LETTERS[ch][r] ?? "").padEnd(7, " ")).join("  "));
  }
  const centered = rows.map((row) => {
    const pad = Math.max(0, Math.floor((width - row.length) / 2));
    return ((" ".repeat(pad) + row).padEnd(width, " "));
  });
  const top = Math.floor((height - centered.length) / 2);
  const out: string[] = [];
  for (let i = 0; i < height; i++) {
    out.push(i >= top && i < top + centered.length ? centered[i - top] : " ".repeat(width));
  }
  return out;
}

export default function AsciiPortrait({
  lines,
  compact = false,
}: {
  lines: string[];

  compact?: boolean;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const total = lines.length;
  const width = lines[0]?.length ?? 0;

  const [frame, setFrame] = useState<string[]>(lines);
  const banner = useMemo(() => nameBanner(width, total), [width, total]);

  useEffect(() => {
    const panel = panelRef.current;
    const tilt = tiltRef.current;
    if (!panel || !tilt) return;
    const reduced = prefersReducedMotion();
    const canHover = window.matchMedia("(hover: hover)").matches;

    let cancelMorph: (() => void) | null = null;
    const morph = (to: string[], duration = 650) => {
      if (cancelMorph) cancelMorph();
      if (reduced) {
        setFrame(to);
        return;
      }
      let raf = 0;
      let dead = false;
      const t0 = performance.now();
      const tick = (now: number) => {
        if (dead) return;
        const p = Math.min(1, (now - t0) / duration);
        const next = to.map((target) => {
          const reveal = Math.floor(p * target.length);
          let s = "";
          for (let j = 0; j < target.length; j++) {
            s += j < reveal ? target[j] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
          return s;
        });
        setFrame(next);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      cancelMorph = () => {
        dead = true;
        cancelAnimationFrame(raf);
        cancelMorph = null;
      };
    };

    const onEnter = () => morph(banner);
    const onLeave = () => morph(lines);
    if (canHover) {
      panel.addEventListener("pointerenter", onEnter);
      panel.addEventListener("pointerleave", onLeave);
    }

    let tiltApi: {
      to(target: object, vars: Record<string, unknown>): void;
      killTweensOf(target: object): void;
    } | null = null;
    void import("gsap").then(({ gsap }) => {
      tiltApi = gsap;
    });
    const onMove = (e: PointerEvent) => {
      if (!tiltApi) return;
      const rect = panel.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tiltApi.to(tilt, {
        rotationY: px * 10,
        rotationX: -py * 8,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const onTiltLeave = () => {
      tiltApi?.to(tilt, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
        overwrite: "auto",
      });
    };
    if (canHover && !reduced) {
      panel.addEventListener("pointermove", onMove);
      panel.addEventListener("pointerleave", onTiltLeave);
    }

    return () => {
      if (cancelMorph) cancelMorph();
      panel.removeEventListener("pointerenter", onEnter);
      panel.removeEventListener("pointerleave", onLeave);
      panel.removeEventListener("pointermove", onMove);
      panel.removeEventListener("pointerleave", onTiltLeave);
      tiltApi?.killTweensOf(tilt);
    };
  }, [lines, banner]);

  const renderLayer = (extra: string) => (
    <pre className={`${styles.art} ${extra}`} aria-hidden="true">
      {frame.map((line, i) => (
        <span key={i} className={styles.line} data-idx={i}>
          {line.length > 0 ? line : "\u00A0"}
        </span>
      ))}
    </pre>
  );

  return (
    <figure
      ref={panelRef}
      className={`${styles.panel}${compact ? ` ${styles.compact}` : ""}`}
    >
      <div className={styles.strip}>
        <span>
          <span className={styles.dot} aria-hidden="true" />
          FIG.01 — Self portrait
        </span>
        <span>
          {total} lines / {width} glyphs wide
        </span>
      </div>
      <div className={styles.stage}>
        <div ref={tiltRef} className={styles.tilt}>
          {renderLayer(`${styles.echo} ${styles.echoConcrete}`)}
          {renderLayer(`${styles.echo} ${styles.echoOrange}`)}
          {renderLayer(styles.base)}
        </div>
      </div>
      <span className="visually-hidden">
        ASCII-art portrait of Zun Ul Noor
      </span>
      <div className={styles.strip}>
        <span>
          {total} lines — hover to decode
        </span>
        <span>ZUN UL NOOR</span>
      </div>
    </figure>
  );
}
