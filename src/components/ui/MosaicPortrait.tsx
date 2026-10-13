"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/hooks";

const COLS = 8;
const ROWS = 10; // 4:5, matches public/portrait.webp (720×900)


type Props = { src: string; alt: string; caption?: string };

/**
 * The headshot assembled from an 8×10 grid of tiles: tiles fly in on a diagonal wave
 * (with a little jitter) the first time it scrolls into view; tiles near the pointer lift.
 */
export default function MosaicPortrait({ src, alt, caption }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-in", "is-live");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.classList.add("is-in");
        io.disconnect();
        // after the entrance, switch to fast transitions for the pointer ripple
        window.setTimeout(() => el.classList.add("is-live"), 1900);
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    const tiles = Array.from(el.querySelectorAll<HTMLElement>(".mo-t"));
    let raf = 0;
    let px = -1e4;
    let py = -1e4;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const tw = r.width / COLS;
      const th = r.height / ROWS;
      const radius = Math.max(tw, th) * 2.2;
      tiles.forEach((t, i) => {
        const cx = r.left + ((i % COLS) + 0.5) * tw;
        const cy = r.top + (Math.floor(i / COLS) + 0.5) * th;
        const d = Math.hypot(cx - px, cy - py);
        const lift = Math.max(0, 1 - d / radius);
        t.style.setProperty("--lift", lift.toFixed(3));
      });
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      px = py = -1e4;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      // deterministic jitter (no Math.random → no hydration mismatch)
      const j = ((i * 37) % 11) / 10;
      tiles.push(
        <span
          key={i}
          className="mo-t"
          style={{
            ["--bx" as string]: `${(c / (COLS - 1)) * 100}%`,
            ["--by" as string]: `${(r / (ROWS - 1)) * 100}%`,
            ["--d" as string]: `${Math.round((r + (COLS - 1 - c)) * 55 + j * 160)}ms`,
            ["--rot" as string]: `${(((i * 53) % 9) - 4) * 4}deg`,
          }}
        />,
      );
    }
  }

  return (
    <div ref={root} className="mo" role="img" aria-label={alt} style={{ ["--src" as string]: `url(${src})` }}>
      <div className="mo-grid" aria-hidden="true">
        {tiles}
      </div>
      {caption && (
        <span className="mo-cap" aria-hidden="true">
          {caption}
        </span>
      )}
    </div>
  );
}
