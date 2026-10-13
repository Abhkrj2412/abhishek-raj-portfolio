"use client";

import { useEffect, useRef } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";
import TechLogo from "../ui/TechLogo";


const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export default function Achievements() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const prog = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    const reduced = prefersReducedMotion();
    const cards = Array.from(tr.querySelectorAll<HTMLElement>(".ac-card"));
    const counted = new Set<HTMLElement>();
    let travel = 0;
    let raf = 0;
    // SSR renders final values (no-JS / crawlers); start from zero once JS runs
    if (!reduced) tr.querySelectorAll<HTMLElement>("[data-to]").forEach((el) => (el.textContent = "0"));

    const countUp = (card: HTMLElement) => {
      counted.add(card);
      const el = card.querySelector<HTMLElement>("[data-to]");
      if (!el) return;
      const to = Number(el.dataset.to);
      if (reduced) {
        el.textContent = String(to);
        return;
      }
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        el.textContent = String(Math.round(easeOutQuart(k) * to));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const layout = () => {
      travel = Math.max(0, tr.scrollWidth - window.innerWidth);
      sec.style.height = `calc(100svh + ${travel}px)`;
      update();
    };

    const update = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
      tr.style.transform = `translate3d(${(-p * travel).toFixed(1)}px,0,0)`;
      prog.current?.style.setProperty("--p", p.toFixed(4));
      const pinned = r.top <= 1 && r.bottom >= window.innerHeight - 1;
      const cx = window.innerWidth / 2;
      let idx = 0;
      let bestD = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        const b = c.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - cx);
        if (d < bestD) {
          bestD = d;
          idx = i;
        }
        // in view, or already passed (fast jumps still count)
        const seen = b.left < window.innerWidth * 0.92 && r.top < window.innerHeight * 0.6;
        if (seen && !counted.has(c)) countUp(c);
      }
      const lift = pinned || r.top < window.innerHeight * 0.5;
      cards.forEach((c, i) => c.classList.toggle("is-near", lift && i === idx));
      if (count.current) count.current.textContent = String(idx + 1).padStart(2, "0");
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(tr);
    window.addEventListener("resize", layout);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const total = String(ACHIEVEMENTS.length).padStart(2, "0");

  return (
    <section ref={section} id="achievements" className="ac" aria-labelledby="ac-title">
      <div className="ac-pin">
        <div className="wrap ac-head">
          <SectionHead index="06" label="Achievements" lines={["Numbers worth"]} accent="keeping." id="ac-title" />
          <div ref={prog} className="ac-prog" aria-hidden="true">
            <span>
              <b>
                <span ref={count}>01</span>
              </b>
              <em style={{ fontStyle: "normal" }}>/ {total}</em>
            </span>
            <i />
          </div>
        </div>
        <div className="ac-viewport">
          <div ref={track} className="ac-track">
            {ACHIEVEMENTS.map((a, i) => (
              <article key={a.label} className="ac-card" aria-label={`${a.value !== undefined ? `${a.prefix ?? ""}${a.value}${a.suffix ?? ""} ` : ""}${a.label} — ${a.caption}`}>
                <div className="ac-card-top">
                  <span className="ac-logo" style={{ ["--tint" as string]: a.tint }}>
                    <TechLogo name={a.logo} size={38} stroke={1.4} />
                  </span>
                  <span className="ac-idx">
                    {String(i + 1).padStart(2, "0")} / {total}
                  </span>
                </div>
                <div className="ac-bottom">
                  <div className="ac-text">
                    <h3 className="ac-label">{a.label}</h3>
                    <p className="ac-cap">{a.caption}</p>
                    <p className="ac-det">{a.detail}</p>
                  </div>
                  <div className="ac-num" aria-hidden="true">
                    {a.value !== undefined ? (
                      <>
                        {a.prefix}
                        <span data-to={a.value}>{a.value}</span>
                        {a.suffix && <small>{a.suffix}</small>}
                      </>
                    ) : (
                      <span className="ac-glyph">{a.glyph}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
            <p className="ac-end">and counting →</p>
          </div>
        </div>
      </div>
    </section>
  );
}
