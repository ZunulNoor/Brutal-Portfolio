"use client";

import { useEffect, useMemo, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import styles from "./HeroField.module.css";

const W = 640;
const H = 560;
const GAP = 46;
const REPEL_RADIUS = 130;
const MAX_SHIFT = 26;
const HOT_RADIUS = 62;

type Dot = { x: number; y: number };

/** Grid of rest positions. Rendered in SSR HTML as the static fallback. */
function buildDots(): Dot[] {
  const dots: Dot[] = [];
  for (let y = GAP; y < H - GAP / 2; y += GAP) {
    for (let x = GAP; x < W - GAP / 2; x += GAP) {
      dots.push({ x, y });
    }
  }
  return dots;
}

const PLUSES: Array<[number, number]> = [
  [64, 96],
  [576, 84],
  [600, 420],
  [52, 470],
];

/**
 * "Signal field" — a brutalist dot-matrix that repels from the cursor,
 * with hot-zone dots flipping to signal orange. Decorative (aria-hidden);
 * the animation loop runs only while the pointer is engaged and the
 * figure is on screen, and is disabled under prefers-reduced-motion.
 */
export default function HeroField() {
  const svgRef = useRef<SVGSVGElement>(null);
  const dots = useMemo(() => buildDots(), []);
  const pointer = useRef({ x: 0, y: 0, inside: false });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || prefersReducedMotion()) return;

    const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>("circle[data-dot]"));
    const offset = new Float32Array(nodes.length * 2);
    const hot = new Uint8Array(nodes.length);
    const p = pointer.current;
    let raf = 0;
    let running = false;
    let visible = true;

    const toLocal = (clientX: number, clientY: number) => {
      const r = svg.getBoundingClientRect();
      return {
        x: ((clientX - r.left) / r.width) * W,
        y: ((clientY - r.top) / r.height) * H,
      };
    };

    const frame = () => {
      let settled = true;
      for (let i = 0; i < nodes.length; i++) {
        const bx = dots[i].x;
        const by = dots[i].y;
        let tx = 0;
        let ty = 0;
        let isHot = 0;
        if (p.inside) {
          const dx = bx - p.x;
          const dy = by - p.y;
          const d = Math.hypot(dx, dy);
          if (d < REPEL_RADIUS && d > 0.01) {
            const f = (1 - d / REPEL_RADIUS) * MAX_SHIFT;
            tx = (dx / d) * f;
            ty = (dy / d) * f;
            if (d < HOT_RADIUS) isHot = 1;
          }
        }
        const ox = offset[i * 2] + (tx - offset[i * 2]) * 0.18;
        const oy = offset[i * 2 + 1] + (ty - offset[i * 2 + 1]) * 0.18;
        offset[i * 2] = ox;
        offset[i * 2 + 1] = oy;
        if (Math.abs(ox - tx) > 0.05 || Math.abs(oy - ty) > 0.05) settled = false;
        nodes[i].setAttribute("transform", `translate(${ox.toFixed(1)} ${oy.toFixed(1)})`);
        if (hot[i] !== isHot) {
          hot[i] = isHot;
          nodes[i].setAttribute("fill", isHot ? "var(--signal)" : "var(--ink)");
        }
      }
      if (settled || !visible) {
        running = false;
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    const kick = () => {
      if (!running && visible) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e: PointerEvent) => {
      const local = toLocal(e.clientX, e.clientY);
      p.x = local.x;
      p.y = local.y;
      p.inside = true;
      kick();
    };
    const onLeave = () => {
      p.inside = false;
      kick();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        kick();
      } else if (running) {
        cancelAnimationFrame(raf);
        running = false;
      }
    });
    observer.observe(svg);
    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
    };
  }, [dots]);

  return (
    <figure className={styles.figure}>
      <svg
        ref={svgRef}
        className={styles.art}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern id="herofield-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
          <pattern
            id="herofield-hatch"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="12" height="12" fill="var(--paper-deep)" />
            <line x1="0" y1="0" x2="0" y2="12" stroke="var(--ink)" strokeWidth="3" />
          </pattern>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="var(--paper)" />
        <rect x="0" y="0" width={W} height={H} fill="url(#herofield-grid)" />

        {dots.map((d, i) => (
          <circle key={i} data-dot cx={d.x} cy={d.y} r="3.5" fill="var(--ink)" />
        ))}

        {/* Collage shapes punch out over the matrix. */}
        <circle cx="478" cy="168" r="92" fill="none" stroke="var(--ink)" strokeWidth="10" />
        <rect x="88" y="336" width="118" height="118" fill="var(--signal)" stroke="var(--ink)" strokeWidth="4" />
        <rect x="0" y="492" width={W} height="68" fill="url(#herofield-hatch)" stroke="var(--ink)" strokeWidth="2" />
        <rect x="12" y="504" width="348" height="44" fill="var(--ink)" />
        <text x="28" y="535" className={styles.stamp} fill="var(--paper)">
          SIGNAL / NOISE — 001
        </text>

        {PLUSES.map(([x, y], i) => (
          <path
            key={`plus-${i}`}
            d={`M ${x - 12} ${y} H ${x + 12} M ${x} ${y - 12} V ${y + 12}`}
            stroke="var(--ink)"
            strokeWidth="4"
          />
        ))}

        {/* Crop-mark corners. */}
        {[
          [8, 8],
          [W - 8, 8],
          [8, H - 8],
          [W - 8, H - 8],
        ].map(([x, y], i) => (
          <rect key={`tick-${i}`} x={x - 7} y={y - 7} width="14" height="14" fill="var(--ink)" />
        ))}
      </svg>
      <figcaption className={styles.caption}>
        <span>FIG. 01 — SIGNAL FIELD</span>
        <span>CURSOR-RESPONSIVE / SVG</span>
      </figcaption>
    </figure>
  );
}
