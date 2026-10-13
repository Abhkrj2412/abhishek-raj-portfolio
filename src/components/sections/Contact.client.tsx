"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import MosaicPortrait from "../ui/MosaicPortrait";
import { ArrowUp, ArrowUpRight, Check, Copy, GitHub, LinkedIn, Phone } from "../ui/Icons";


const LINES = ["Let’s build", "something together."];

function HopLine({ text, accent }: { text: string; accent?: string }) {
  const words = text.split(" ");
  const hop = (e: React.PointerEvent<HTMLSpanElement>) => {
    const t = e.currentTarget;
    if (t.classList.contains("hop")) return;
    t.classList.add("hop");
    t.addEventListener("animationend", () => t.classList.remove("hop"), { once: true });
  };
  return (
    <span className="cn-line" aria-hidden="true">
      {words.map((w, wi) => {
        const isAccent = accent && wi === words.length - 1;
        return (
          <span key={wi}>
            <span className={`cn-w${isAccent ? " it" : ""}`}>
              {[...w].map((ch, ci) => (
                <span key={ci} className="cn-l" onPointerEnter={hop}>
                  {ch}
                </span>
              ))}
            </span>
            {wi < words.length - 1 && " "}
          </span>
        );
      })}
    </span>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="sec cn" aria-labelledby="cn-title">
      <div className="wrap">
        <p className="tag rv">
          <b>07</b> — Contact
        </p>
        <h2 id="cn-title" className="cn-big rv" aria-label="Let’s build something together." style={{ ["--i" as string]: 1 }}>
          <HopLine text={LINES[0]} />
          <HopLine text={LINES[1]} accent="together." />
        </h2>

        <div className="cn-grid">
          <div>
            <div className="cn-mail rv" style={{ ["--i" as string]: 2 }}>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <button type="button" className={`cn-copy${copied ? " is-done" : ""}`} onClick={copy}>
                {copied ? <Check /> : <Copy />}
                <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
              </button>
            </div>
            <ul className="cn-links rv" style={{ ["--i" as string]: 3 }}>
              <li>
                <a href={PROFILE.phoneHref} className="btn btn-ghost btn-sm">
                  <Phone /> {PROFILE.phone}
                </a>
              </li>
              <li>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                  <GitHub /> GitHub <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                  <LinkedIn /> LinkedIn <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
            <p className="cn-note rv" style={{ ["--i" as string]: 4 }}>
              {PROFILE.role} · {PROFILE.location}
            </p>
          </div>

          <div className="cn-photo rv" style={{ ["--i" as string]: 2 }}>
            <div className="cn-badge" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="cn-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
                </defs>
                <text textLength="286" lengthAdjust="spacing">
                  <textPath href="#cn-circle" textLength="286" lengthAdjust="spacing">say hello · say hello · say hello · </textPath>
                </text>
              </svg>
              <b>↗</b>
            </div>
            <MosaicPortrait src="/portrait.webp" alt={`Black-and-white portrait of ${PROFILE.name}`} caption={PROFILE.name} />
          </div>
        </div>

        <footer className="cn-foot">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <span>Built with Next.js</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget(0);
              document.getElementById("main")?.focus({ preventScroll: true });
            }}
          >
            Back to top
            <span aria-hidden="true">
              <ArrowUp size={14} />
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}
