"use client";

import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import { useFinePointer } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";
import TechLogo from "../ui/TechLogo";
import { ArrowUpRight, Plus } from "../ui/Icons";
import MiniUI from "../ui/MiniUI";


function Panel({ p, open, onOpen, fine }: { p: Project; open: boolean; onOpen: () => void; fine: boolean }) {
  const bodyId = `wk-${p.id}`;
  return (
    <article
      className={`wk-panel${open ? " is-open" : ""}`}
      onMouseEnter={fine ? onOpen : undefined}
      aria-labelledby={`${bodyId}-t`}
    >
      {/* desktop spine */}
      <button type="button" className="wk-spine" onClick={onOpen} onFocus={onOpen} aria-expanded={open} aria-controls={bodyId} tabIndex={open ? -1 : 0}>
        <span className="wk-spine-n">{p.index}</span>
        <span className="wk-spine-t">{p.title}</span>
        <span className="wk-plus" aria-hidden="true">
          <Plus />
        </span>
        <span className="sr-only">Open project {p.title}</span>
      </button>
      {/* mobile accordion header */}
      <button type="button" className="wk-head" onClick={onOpen} aria-expanded={open} aria-controls={bodyId}>
        <span className="wk-spine-n">{p.index}</span>
        <span className="wk-head-t">{p.title}</span>
        <span className="wk-plus" aria-hidden="true">
          <Plus />
        </span>
      </button>

      <div id={bodyId} className="wk-body" inert={!open} aria-hidden={!open}>
        <div className="wk-text">
          <p className="wk-kick">
            <b>{p.index}</b> {p.kicker}
          </p>
          <h3 id={`${bodyId}-t`}>{p.title}</h3>
          <p className="wk-desc">{p.description}</p>
          <ul className="wk-feat">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <ul className="wk-tech" aria-label="Tech stack">
            {p.tech.map((t) => (
              <li key={t.name} className="chip">
                <TechLogo name={t.logo} size={14} />
                {t.name}
              </li>
            ))}
          </ul>
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm wk-gh">
              View on GitHub <ArrowUpRight />
            </a>
          )}
        </div>
        <div className="wk-ui" aria-hidden="true">
          <MiniUI kind={p.ui} />
          <span className="wk-ui-label">Illustrative UI</span>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [open, setOpen] = useState(0);
  const fine = useFinePointer();
  return (
    <section id="work" className="sec" aria-labelledby="work-title">
      <div className="wrap">
        <div className="wk-top">
          <SectionHead index="03" label="Selected work" lines={["Things I’ve"]} accent="built." id="work-title" />
          <p className="lede rv" style={{ ["--i" as string]: 2 }}>
            AI &amp; agentic projects from the résumé — client builds and internal R&amp;D. The panels on the right are
            illustrative, not screenshots.
          </p>
        </div>
        <div className="wk-rail rv" style={{ ["--i" as string]: 3 }}>
          {PROJECTS.map((p, i) => (
            <Panel key={p.id} p={p} open={open === i} onOpen={() => setOpen(i)} fine={fine} />
          ))}
        </div>
      </div>
    </section>
  );
}
