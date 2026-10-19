"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import styles from "./KineticLines.module.css";

export type KineticLine = {
  key: string;
  content: ReactNode;

  outline?: boolean;
};

type Props = {
  lines: KineticLine[];
  className?: string;
  id?: string;
};

export default function KineticLines({ lines, className, id }: Props) {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    let cancelled = false;

    void import("gsap").then(({ gsap }) => {
      if (cancelled || !root.isConnected) return;
      const ctx = gsap.context(() => {
        gsap.from(root.querySelectorAll(`.${styles.inner}`), {
          yPercent: 112,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.1,
          delay: 0.05,
        });
      }, root);
      (root as HTMLElement & { __kl?: { revert(): void } }).__kl = ctx;
    });
    return () => {
      cancelled = true;
      (root as HTMLElement & { __kl?: { revert(): void } }).__kl?.revert();
    };
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
