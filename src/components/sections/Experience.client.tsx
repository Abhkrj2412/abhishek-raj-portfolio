"use client";

import { useRef } from "react";
import { TIMELINE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";


export default function Experience() {
  const stops = useRef<HTMLLIElement[]>([]);
  const ref = useScrollProgress<HTMLDivElement>(
    (p, el) => {
      el.style.setProperty("--p", p.toFixed(4));
      const top = el.getBoundingClientRect().top;
      const reach = top + p * el.offsetHeight;
      stops.current.forEach((s) => {
        if (!s) return;
        const y = s.getBoundingClientRect().top + 12;
        s.classList.toggle("is-lit", y <= reach + 2);
      });
    },
    { start: 0.62, end: 0.62 },
  );

  return (
    <section id="experience" className="sec" aria-labelledby="xp-title">
      <div className="wrap">
        <div className="xp-top">
          <SectionHead index="05" label="Experience & education" lines={["One continuous"]} accent="path." id="xp-title" />
          <p className="lede rv" style={{ ["--i" as string]: 2 }}>
            Education and work in chronological order — from Computer Science in Bangalore to AI and data platforms in
            Pune.
          </p>
        </div>

        <div ref={ref} className="xp-path">
          <span className="xp-spine" aria-hidden="true">
            <i />
          </span>
          <ol className="xp-list">
          {TIMELINE.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => {
                if (el) stops.current[i] = el;
              }}
              className="xp-stop"
            >
              <span className="xp-dot" aria-hidden="true" />
              <div className="xp-when">
                <span className="xp-year">{s.year}</span>
                <span className="xp-period">{s.period}</span>
              </div>
              <div className="xp-main">
                <span className="xp-kind">{s.kind === "education" ? "Education" : "Experience"}</span>
                <h3>{s.title}</h3>
                <p className="xp-place">
                  {s.place} <span>· {s.location}</span>
                </p>
                {s.detail.length > 0 && (
                  <ul className="xp-detail">
                    {s.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
          <li className="xp-stop" ref={(el) => {
            if (el) stops.current[TIMELINE.length] = el;
          }}>
            <span className="xp-dot" aria-hidden="true" />
            <div className="xp-when">
              <span className="xp-year">Next</span>
            </div>
            <div className="xp-main">
              <a href="#contact" className="xp-next">
                <div>
                  <small>Next —</small>
                  <div className="xp-next-t">
                    Your team<span className="it">?</span>
                  </div>
                </div>
                <span className="btn btn-primary btn-sm" aria-hidden="true">
                  Let&rsquo;s talk
                </span>
              </a>
            </div>
          </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
