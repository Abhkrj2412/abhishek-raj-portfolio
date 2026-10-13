"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { lockScroll, scrollToTarget } from "@/lib/scroll";


export default function Navigation() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // scrolled state + progress bar (rAF throttled, no re-render)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      root.current?.classList.toggle("is-scrolled", y > 40);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  // active section
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const watch = [...ids, "hero", "certifications"];
    watch.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // slide the ink indicator under the active link
  const place = useCallback(() => {
    const i = ind.current;
    const p = pill.current;
    if (!i || !p) return;
    const link = p.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`);
    if (!link) {
      i.style.opacity = "0";
      return;
    }
    i.style.opacity = "1";
    i.style.width = `${link.offsetWidth}px`;
    i.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [active]);
  useLayoutEffect(place, [place]);
  useEffect(() => {
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  // mobile menu: scroll lock, Esc, focus
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const first = overlay.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === "Tab" && overlay.current) {
        const f = [menuBtn.current, ...overlay.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const idx = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && idx <= 0) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && idx === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    // let the lock release before scrolling
    requestAnimationFrame(() => scrollToTarget(`#${id}`));
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <nav ref={root} className="nv" aria-label="Primary">
        <div ref={bar} className="nv-bar" aria-hidden="true" />
        <div className="nv-in">
          <a href="#top" className="nv-brand" aria-label={`${PROFILE.name} — back to top`}>
            <span className="nv-mark" aria-hidden="true">
              {PROFILE.initials}
            </span>
            <span className="nv-name">{PROFILE.name}</span>
          </a>

          <div ref={pill} className="nv-pill">
            <span ref={ind} className="nv-ind" aria-hidden="true" />
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                data-id={n.id}
                className="nv-link"
                aria-current={active === n.id ? "true" : undefined}
              >
                {n.label}
              </a>
            ))}
          </div>

          <button
            ref={menuBtn}
            type="button"
            className="nv-menu"
            aria-expanded={open}
            aria-controls="nv-overlay"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
            <i aria-hidden="true" />
          </button>
        </div>

        <div
          ref={overlay}
          id="nv-overlay"
          className={`nv-ov${open ? " is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          aria-hidden={!open}
          inert={!open}
        >
          <ol>
            {NAV.map((n, i) => (
              <li key={n.id}>
                <a href={`#${n.id}`} style={{ ["--i" as string]: i }} onClick={(e) => go(e, n.id)}>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
          <div className="nv-ov-foot">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
