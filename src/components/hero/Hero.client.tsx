"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import { ArrowDown, ArrowRight, Download } from "../ui/Icons";


const Play = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M4 2.5v11l9.5-5.5z" />
  </svg>
);
const Bars = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
    <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
  </svg>
);

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const soundBtn = useRef<HTMLButtonElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  // refs mirror state for event handlers registered once
  const wantSound = useRef(true); // visitor hasn't explicitly muted
  const visible = useRef(true);
  const reduced = useRef(false);

  // initial play: try with sound, fall back to muted autoplay
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    reduced.current = prefersReducedMotion();
    if (reduced.current) {
      // no autoplay under reduced motion; the ▶ button starts it
      wantSound.current = false;
      return;
    }
    v.muted = false;
    v.play()
      .then(() => setSoundOn(true))
      .catch(() => {
        v.muted = true;
        setBlocked(true);
        v.play().catch(() => {});
      });
  }, []);

  // unlock sound on the visitor's first real gesture
  useEffect(() => {
    if (!blocked) return;
    const unlock = (e: Event) => {
      if (soundBtn.current && e.target instanceof Node && soundBtn.current.contains(e.target)) return;
      const v = video.current;
      if (!v || !wantSound.current) return;
      v.muted = false;
      const p = visible.current ? v.play() : Promise.resolve();
      p.then(() => {
        setSoundOn(true);
        setBlocked(false);
      }).catch(() => {
        v.muted = true;
      });
    };
    const opts = { capture: true, passive: true } as const;
    window.addEventListener("pointerdown", unlock, opts);
    window.addEventListener("keydown", unlock, opts);
    window.addEventListener("touchend", unlock, opts);
    return () => {
      window.removeEventListener("pointerdown", unlock, opts);
      window.removeEventListener("keydown", unlock, opts);
      window.removeEventListener("touchend", unlock, opts);
    };
  }, [blocked]);

  // pause (and silence) when <35% of the hero is visible; resume on return
  useEffect(() => {
    const el = section.current;
    const v = video.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.intersectionRatio >= 0.35;
        if (!visible.current) v.pause();
        else if (!reduced.current || !v.muted) v.play().catch(() => {});
      },
      { threshold: [0, 0.2, 0.35, 0.5, 1] },
    );
    io.observe(el);
    const onVis = () => {
      if (document.hidden) v.pause();
      else if (visible.current && (!reduced.current || !v.muted)) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    if (soundOn) {
      v.muted = true;
      wantSound.current = false;
      setSoundOn(false);
      if (reduced.current) v.pause();
      return;
    }
    wantSound.current = true;
    v.muted = false;
    v.play()
      .then(() => {
        setSoundOn(true);
        setBlocked(false);
      })
      .catch(() => {
        v.muted = true;
      });
  };

  return (
    <section ref={section} id="hero" className="hr" aria-labelledby="hero-title">
      <p className="hr-ghost" aria-hidden="true">
        {PROFILE.firstName.toUpperCase()}
      </p>

      <div className="wrap hr-stage">
        <div className="hr-left">
          <p className="hr-kicker hr-fade" style={{ ["--i" as string]: 0 }}>
            <span className="hr-dot" aria-hidden="true" />
            {PROFILE.name} · {PROFILE.location.split(",")[0]}
          </p>
          <h1 id="hero-title" className="hr-fade" style={{ ["--i" as string]: 1 }}>
            {PROFILE.roles[0]} &amp;
            <br />
            {PROFILE.roles[1].replace(/ Engineer$/, "")} <span className="it">Engineer.</span>
          </h1>
        </div>

        <div className="hr-media">
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero/poster.webp"
            aria-label={`Video: a short spoken self-introduction by ${PROFILE.name}`}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
          <button
            ref={soundBtn}
            type="button"
            className={`hr-sound${blocked && !soundOn ? " is-blocked" : ""}`}
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute the intro video" : "Play the intro video with sound"}
          >
            {soundOn ? <Bars /> : <Play />}
          </button>
        </div>

        <div className="hr-right">
          <p className="hr-intro hr-fade" style={{ ["--i" as string]: 2 }}>
            {PROFILE.yearsExperience} years building AI-powered automation platforms, agentic systems and enterprise data
            platforms. Currently at {PROFILE.company}.
          </p>
          <div className="hr-cta hr-fade" style={{ ["--i" as string]: 3 }}>
            <a href="#work" className="btn btn-primary">
              Explore work <ArrowRight />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Let&rsquo;s talk
            </a>
            <a href={PROFILE.resume} download={PROFILE.resumeFileName} className="btn btn-ghost">
              Résumé <Download />
            </a>
          </div>
          <a href="#about" className="hr-scroll hr-fade" style={{ ["--i" as string]: 4 }}>
            <span aria-hidden="true">
              <ArrowDown size={13} />
            </span>
            Scroll
          </a>
        </div>
      </div>
    </section>
  );
}
