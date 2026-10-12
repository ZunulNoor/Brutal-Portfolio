"use client";

import { useEffect, useRef } from "react";

/** Braille spinner frames — render as text in the tab title. */
const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

/**
 * Tab-attention hook: while the tab is open but hidden, the title becomes
 * an animated "I'm waiting" loader to pull the visitor back. On return a
 * brief "Welcome back!" plays, then the saved page title is restored.
 * Lives in the root layout so it never unmounts across route changes.
 * Client-only, no paint cost, timers cleaned up on unmount.
 */
export default function TabAttention() {
  const saved = useRef("");
  const spin = useRef<ReturnType<typeof setInterval> | null>(null);
  const beat = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clear = () => {
      if (spin.current) clearInterval(spin.current);
      if (beat.current) clearTimeout(beat.current);
      spin.current = null;
      beat.current = null;
    };

    const onChange = () => {
      clear();
      if (document.hidden) {
        // Tab can't navigate while hidden, so this is the true page title.
        saved.current = document.title;
        let frame = 0;
        spin.current = setInterval(() => {
          document.title = `${FRAMES[frame % FRAMES.length]} I'm waiting — come back!`;
          frame += 1;
        }, 120);
      } else {
        document.title = "Welcome back!";
        beat.current = setTimeout(() => {
          document.title = saved.current || document.title;
        }, 1200);
      }
    };

    document.addEventListener("visibilitychange", onChange);
    return () => {
      document.removeEventListener("visibilitychange", onChange);
      clear();
    };
  }, []);

  return null;
}
