"use client";

import { useEffect, useMemo, useState } from "react";
import { ALL_SKILLS, PROJECTS, SKILL_GROUPS, type Family, type Skill } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";
import TechLogo, { brandTint, isBrand } from "../ui/TechLogo";


const FAMILIES: Family[] = SKILL_GROUPS.map((g) => g.family);

function useCols() {
  const [cols, setCols] = useState(8);
  useEffect(() => {
    const q = [
      [640, 4],
      [1100, 6],
    ] as const;
    const read = () => {
      const w = window.innerWidth;
      setCols(w <= q[0][0] ? q[0][1] : w <= q[1][0] ? q[1][1] : 8);
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);
  return cols;
}

export default function Skills() {
  const [filter, setFilter] = useState<Family | "All">("All");
  const [active, setActive] = useState<Skill>(ALL_SKILLS[0]);
  const [gridRef, inView] = useInView<HTMLUListElement>({ rootMargin: "0px 0px -15% 0px" });
  const cols = useCols();

  const usedIn = useMemo(() => PROJECTS.filter((p) => p.skills.includes(active.name)).map((p) => p.title), [active]);
  const group = SKILL_GROUPS.find((g) => g.family === active.family)!;
  const counts = useMemo(() => Object.fromEntries(SKILL_GROUPS.map((g) => [g.family, g.skills.length])), []);

  return (
    <section id="skills" className="sec" aria-labelledby="skills-title">
      <div className="wrap">
        <div className="sk-top">
          <SectionHead index="02" label="Skills" lines={["The periodic table", "of my"]} accent="stack." id="skills-title" />
          <p className="lede rv" style={{ ["--i" as string]: 2 }}>
            {ALL_SKILLS.length} elements from the résumé, grouped into {SKILL_GROUPS.length} families. Hover, focus or tap
            any tile to inspect it.
          </p>
        </div>

        <div className="sk-chips rv" role="group" aria-label="Filter skills by family">
          <button type="button" className="sk-chip" aria-pressed={filter === "All"} onClick={() => setFilter("All")}>
            All <small>{ALL_SKILLS.length}</small>
          </button>
          {FAMILIES.map((f) => (
            <button key={f} type="button" className="sk-chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f} <small>{counts[f]}</small>
            </button>
          ))}
        </div>

        <div className="sk-body">
          <ul ref={gridRef} className={`sk-grid${inView ? " sk-in" : ""}`} aria-label="Skills">
            {ALL_SKILLS.map((s, i) => {
              const row = Math.floor(i / cols);
              const col = i % cols;
              const dim = filter !== "All" && s.family !== filter;
              return (
                <li key={`${s.family}-${s.name}`}>
                  <button
                    type="button"
                    className={`sk-tile${dim ? " is-dim" : ""}${active === s ? " is-active" : ""}`}
                    style={{ ["--d" as string]: `${(row + col) * 40}ms` }}
                    onMouseEnter={() => setActive(s)}
                    onFocus={() => setActive(s)}
                    onClick={() => setActive(s)}
                    aria-label={`${s.name} — ${s.family}${s.recent ? ", recently used" : ""}`}
                    aria-controls="sk-inspector"
                  >
                    <span className="sk-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                      {s.recent && <i className="sk-new" />}
                    </span>
                    <span className="sk-sym" aria-hidden="true">
                      {s.symbol}
                    </span>
                    <span className="sk-name" aria-hidden="true">
                      {s.name}
                    </span>
                    <span className="sk-fam" aria-hidden="true">
                      {s.family}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <aside id="sk-inspector" className="sk-insp" aria-live="polite" aria-label="Skill inspector">
            <div className="sk-insp-top">
              <span>No. {String(ALL_SKILLS.indexOf(active) + 1).padStart(2, "0")}</span>
              <span>{active.symbol}</span>
            </div>
            <div className="sk-logo" style={{ ["--tint" as string]: brandTint(active.logo, 0.3) }}>
              <div className="sk-logo-in" key={active.name}>
                <TechLogo name={active.logo} size={isBrand(active.logo) ? 150 : 120} stroke={1} />
              </div>
            </div>
            <h3>{active.name}</h3>
            <p className="sk-insp-fam">
              {group.label}
              {active.recent ? " · recently used" : ""}
            </p>
            {active.note && <p className="sk-insp-note">{active.note}</p>}
            <div className="sk-used">
              <p>Used in</p>
              {usedIn.length ? (
                <ul>
                  {usedIn.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : (
                <span className="none">Not tied to a featured project</span>
              )}
            </div>
          </aside>
        </div>
        <p className="sk-legend">
          <span>
            <i aria-hidden="true" /> Recently used
          </span>
          <span>Logos: devicon (MIT) · simple-icons (CC0) · line icons for concepts</span>
        </p>
      </div>
    </section>
  );
}
