"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";
import styles from "./KineticLines.module.css";

export type KineticLine = {
  key: string;
  content: ReactNode;
  /** Rendered as outline (stroke) type for editorial contrast. */
  outline?: boolean;
};

type Props = {
  lines: KineticLine[];
  className?: string;
  id?: string;
};

/**
 * Kinetic display heading. Server HTML carries the full readable text;
 * the rise-in animation is applied inside an effect only, so content is
 * never hidden from no-JS clients, screen readers, or reduced-motion users.
 */
export default function KineticLines({ lines, className, id }: Props) {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(`.${styles.inner}`), {
        yPercent: 112,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.05,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={rootRef} id={id} className={className}>
      {lines.map((line) => (
        <span key={line.key} className={styles.mask}>
          <span className={`${styles.inner}${line.outline ? ` ${styles.outline}` : ""}`}>
            {line.content}
          </span>
        </span>
      ))}
    </h1>
  );
}
