"use client";

import { useEffect, useRef } from "react";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

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
