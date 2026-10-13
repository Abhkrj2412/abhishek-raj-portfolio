"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { EXPERIENCE, ID_BACK, PROFILE, QUICK_FACTS } from "@/lib/data";
import { prefersReducedMotion, useFinePointer } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";
import { Download, GitHub, LinkedIn } from "../ui/Icons";


/** deterministic barcode from the name */
function barcode(seed: string) {
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  const stops: string[] = [];
  let x = 0;
  for (let i = 0; x < 100; i++) {
    s = (s * 1103515245 + 12345) >>> 0;
    const w = 0.6 + ((s >> 8) % 5) * 0.55;
    const ink = i % 2 === 0;
    stops.push(`${ink ? "#0d0d0d" : "transparent"} ${x.toFixed(2)}% ${(x + w).toFixed(2)}%`);
    x += w;
  }
  return `linear-gradient(90deg,${stops.join(",")})`;
}

export default function About() {
  const hang = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const fine = useFinePointer();
  const current = EXPERIENCE[EXPERIENCE.length - 1];

  // damped pendulum: pointer velocity → angular impulse, spring back, idle sway
  useEffect(() => {
    const el = hang.current;
    if (!el || prefersReducedMotion()) return;
    let theta = 0; // deg
    let omega = 0; // deg/s
    let lastX = 0;
    let lastT = 0;
    let lastInput = 0;
    let raf = 0;
    let prev = 0;
    let running = false;

    const step = (t: number) => {
      const dt = Math.min(0.033, (t - (prev || t)) / 1000) || 0.016;
      prev = t;
      const idle = t - lastInput > 1400;
      const target = idle ? Math.sin(t / 1300) * 1.6 : 0;
      const k = 38; // stiffness
      const c = 3.2; // damping
      const alpha = -k * (theta - target) - c * omega;
      omega += alpha * dt;
      theta += omega * dt;
      theta = Math.max(-24, Math.min(24, theta));
      el.style.transform = `rotate(${theta.toFixed(3)}deg)`;
      raf = requestAnimationFrame(step);
    };
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastT && now - lastT < 80) {
        const vx = (e.clientX - lastX) / Math.max(1, now - lastT); // px/ms
        omega += Math.max(-60, Math.min(60, -vx * 9));
      }
      lastX = e.clientX;
      lastT = now;
      lastInput = now;
    };
    const start = () => {
      if (running) return;
      running = true;
      prev = 0;
      raf = requestAnimationFrame(step);
      window.addEventListener("pointermove", onMove, { passive: true });
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(el.closest("section") ?? el);
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };

  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <div className="wrap ab-grid">
        {/* left */}
        <div className="ab-col ab-left">
          <SectionHead index="01" label="About" lines={["Hi, I’m"]} accent={`${PROFILE.firstName}.`} id="about-title" />
          <p className="lede rv" style={{ ["--i" as string]: 2 }}>
            {PROFILE.resumeSummary}
          </p>
          <p className="ab-line rv" style={{ ["--i" as string]: 3 }}>
            {PROFILE.aboutLine}
          </p>
          <div className="ab-btns rv" style={{ ["--i" as string]: 4 }}>
            <a href={PROFILE.resume} download={PROFILE.resumeFileName} className="btn btn-primary btn-sm">
              Résumé <Download />
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
              <GitHub /> GitHub
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
              <LinkedIn /> LinkedIn
            </a>
          </div>
        </div>

        {/* centre: lanyard ID card */}
        <div className="ab-col ab-mid">
          <div ref={hang} className="ab-hang">
            <div className="ab-strap" aria-hidden="true">
              <div className="ab-strap-text">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i}>
                    {PROFILE.name} · {PROFILE.role} ·
                  </span>
                ))}
              </div>
            </div>
            <div className="ab-clip" aria-hidden="true">
              <i className="c1" />
              <i className="c2" />
              <i className="c3" />
            </div>
            <div
              ref={card}
              className={`ab-card${flipped ? " is-flipped" : ""}`}
              role="button"
              tabIndex={0}
              aria-pressed={flipped}
              aria-label={`ID card for ${PROFILE.name}. Press to flip to the ${flipped ? "front" : "back"}.`}
              onKeyDown={onKey}
              onClick={() => !fine && setFlipped((f) => !f)}
              onMouseEnter={() => fine && setFlipped(true)}
              onMouseLeave={() => fine && setFlipped(false)}
            >
              <div className="ab-flip">
                <div className="ab-face ab-front" aria-hidden={flipped}>
                  <div className="ab-band">
                    <b>DEVELOPER ID</b>
                    <span>{PROFILE.initials}</span>
                  </div>
                  <div className="ab-front-body">
                    <div className="ab-photo">
                      <div className="ab-photo-in">
                        <img src="/portrait-bust.webp" alt={`Portrait of ${PROFILE.name}`} width={128} height={156} loading="lazy" decoding="async" />
                      </div>
                    </div>
                    <p className="ab-name">{PROFILE.name}</p>
                    <p className="ab-role">{PROFILE.role}</p>
                    <dl className="ab-rows">
                      <div>
                        <dt>ID No.</dt>
                        <dd>{PROFILE.githubHandle}</dd>
                      </div>
                      <div>
                        <dt>Dept.</dt>
                        <dd>AI Augmented Analytics</dd>
                      </div>
                      <div>
                        <dt>Valid till</dt>
                        <dd>{PROFILE.graduation}</dd>
                      </div>
                    </dl>
                    <div className="ab-foot">
                      <div className="ab-bar" style={{ ["--bars" as string]: barcode(PROFILE.name) }} aria-hidden="true" />
                      <div className="ab-holo" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="ab-face ab-back" aria-hidden={!flipped}>
                  <div className="ab-back-body">
                    <h3>
                      What <span className="it">I am</span>
                    </h3>
                    <ul>
                      {ID_BACK.map((l, i) => (
                        <li key={i} data-n={String(i + 1).padStart(2, "0")}>
                          {l}
                        </li>
                      ))}
                    </ul>
                    <div className="ab-sign">
                      <p aria-hidden="true">{PROFILE.name}</p>
                      <small>If found, say hello · {PROFILE.email}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="ab-hint" aria-hidden="true">
            {fine ? "Hover to flip · move to swing" : "Tap to flip"}
          </p>
        </div>

        {/* right */}
        <div className="ab-col ab-right">
          <h3 className="ab-facts-h rv">Quick facts</h3>
          <dl className="ab-facts">
            {QUICK_FACTS.map((f, i) => (
              <div key={f.label} className="rv" style={{ ["--i" as string]: i + 1 }}>
                <dt>{f.label}</dt>
                <dd>{f.href ? <a href={f.href}>{f.value}</a> : f.value}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="ab-quote rv" style={{ ["--i" as string]: 6 }}>
            <p>{PROFILE.quote}</p>
            <footer>
              — {PROFILE.name}, {current.title} at {current.place}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
