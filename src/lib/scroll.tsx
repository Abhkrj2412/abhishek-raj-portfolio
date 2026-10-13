"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/** Smoothly scroll to "#id", an element, or a y offset. Falls back to native when Lenis is off. */
export function scrollToTarget(target: string | HTMLElement | number, opts: { offset?: number; immediate?: boolean } = {}) {
  const el = typeof target === "string" ? (document.querySelector(target) as HTMLElement | null) : target;
  if (el === null) return;
  const offset = opts.offset ?? 0;
  if (lenis) {
    lenis.scrollTo(el, { offset, immediate: opts.immediate, duration: 1.2 });
    return;
  }
  const y = typeof el === "number" ? el : el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/** Mounts Lenis once (skipped under prefers-reduced-motion) and routes in-page anchor clicks through it. */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const start = () => {
      if (lenis || mq.matches) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
    start();
    const onChange = () => (mq.matches ? stop() : start());
    mq.addEventListener("change", onChange);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href")!;
      const el = hash === "#" || hash === "#top" ? document.body : document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      scrollToTarget(el as HTMLElement);
      history.replaceState(null, "", hash === "#top" ? location.pathname : hash);
      // move focus for keyboard / screen-reader users without a jump
      if (el instanceof HTMLElement && el !== document.body) {
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);
  return null;
}
