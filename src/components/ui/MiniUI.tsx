import type { Project } from "@/lib/data";

/**
 * Pure CSS/JSX grayscale sketches that hint at what each project does.
 * Labelled "Illustrative UI" by the caller — these are not screenshots.
 * Every word used here is taken from the project's résumé description.
 */

const STEPS = ["Visio / Excel / text input", "Structured extraction", "Test generation", "Excel report", "Full ODM project", "JUnit harness", "LLM test simulation", "Self-verification"];
const PHASES = ["Govern", "Discover", "Design", "Build", "Test", "Deploy", "Operate", "Oversight"];
const WAVE = [30, 55, 80, 45, 90, 60, 35, 70, 95, 50, 40, 75, 85, 45, 30, 65, 90, 55, 40, 70, 50, 85, 35, 60];

export default function MiniUI({ kind }: { kind: Project["ui"] }) {
  return (
    <div className="mu">
      {kind === "odm" && (
        <>
          <div className="mu-win">
            <i />
            <i />
            <i />
            <span>odm-assist · 7-step agentic pipeline</span>
          </div>
          <div className="mu-odm">
            <ol className="mu-steps">
              {STEPS.map((s, i) => (
                <li key={s} style={{ ["--i" as string]: i }}>
                  <b>{i === 0 ? "in" : i}</b>
                  {s}
                </li>
              ))}
            </ol>
            <div className="mu-dia">
              <svg viewBox="0 0 160 230" preserveAspectRatio="xMidYMid meet">
                <rect className="bx" x="45" y="14" width="70" height="26" rx="5" />
                <text x="80" y="30" textAnchor="middle">
                  .vsdx
                </text>
                <path className="ln" d="M80 40v22" />
                <path className="dm" d="M80 62l26 20-26 20-26-20z" />
                <text x="80" y="85" textAnchor="middle">
                  rule?
                </text>
                <path className="ln" d="M54 82H22v52M106 82h32v52" />
                <rect className="bx" x="2" y="134" width="44" height="24" rx="5" />
                <text x="24" y="149" textAnchor="middle">
                  BRL
                </text>
                <rect className="bx" x="114" y="134" width="44" height="24" rx="5" />
                <text x="136" y="149" textAnchor="middle">
                  DTA
                </text>
                <path className="ln" d="M24 158v24h112v-24M80 182v14" />
                <rect className="bx" x="40" y="196" width="80" height="24" rx="5" />
                <text x="80" y="211" textAnchor="middle">
                  ruleflow
                </text>
              </svg>
            </div>
          </div>
        </>
      )}

      {kind === "voice" && (
        <>
          <div className="mu-win">
            <i />
            <i />
            <i />
            <span>voice-to-rule · hemodialysis operations</span>
          </div>
          <div className="mu-card">
            <div className="mu-k">Speech-to-text</div>
            <div className="mu-wave">
              {WAVE.map((h, i) => (
                <i key={i} style={{ ["--h" as string]: h, ["--i" as string]: i }} />
              ))}
            </div>
            <div className="mu-row">
              <div className="mu-bar d" style={{ width: "62%" }} />
              <div className="mu-bar" style={{ width: "24%" }} />
            </div>
          </div>
          <div className="mu-card mu-code">
            <span>{"// executable BAL rule"}</span>
            {"\n"}
            {"if  ▇▇▇▇▇▇▇ ▇▇▇▇\n"}
            {"then ▇▇▇▇ ▇▇▇▇▇▇▇▇▇\n"}
            {"else ▇▇▇▇▇▇"}
          </div>
          <div className="mu-tests">
            <div>
              <b>✓</b>triggered
            </div>
            <div>
              <b>✕</b>not-triggered
            </div>
            <div>
              <b>◇</b>edge-case
            </div>
          </div>
        </>
      )}

      {kind === "cli" && (
        <>
          <div className="mu-term">
            {[
              <>
                <span className="m">$</span> mrbean
              </>,
              <span className="m" key="a">
                provider: anthropic | openai | gemini | groq | openrouter | ollama
              </span>,
              <>
                <span className="m">›</span> CLI · REST + SSE + WebSocket · SDK
              </>,
              <>
                <span className="m">›</span> tools ............ 39
              </>,
              <>
                <span className="m">›</span> agent templates .. 48
              </>,
              <>
                <span className="m">›</span> sub-agent depth .. 3
              </>,
              <>
                <span className="m">›</span> memory TTL ....... 30d
              </>,
              <>
                <span className="m">›</span> tests (vitest) ... 396 <span className="cur" />
              </>,
            ].map((line, i) => (
              <p key={i} style={{ ["--i" as string]: i }}>
                {line}
              </p>
            ))}
          </div>
          <div className="mu-tiers">
            <div>
              <b>T1</b>autonomous
            </div>
            <div>
              <b>T2</b>supervised
            </div>
            <div>
              <b>T3</b>human-gated
            </div>
          </div>
        </>
      )}

      {kind === "fleet" && (
        <>
          <div className="mu-win">
            <i />
            <i />
            <i />
            <span>agentic-sdlc · 48 agents · 8 phases</span>
          </div>
          <div className="mu-card mu-fleet">
            {PHASES.map((ph, r) => (
              <FleetRow key={ph} phase={ph} r={r} />
            ))}
          </div>
          <div className="mu-card">
            <div className="mu-row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
              <span className="mu-k">Circuit breaker</span>
              <span className="mu-k">trips at 25% of daily budget / hr</span>
            </div>
            <div className="mu-meter">
              <i />
            </div>
          </div>
          <div className="mu-row" style={{ gap: 6, flexWrap: "wrap" }}>
            {["G1–G4", "OV-1…OV-12", "PII scan", "schema", "audit trail"].map((t) => (
              <span key={t} className="mu-card" style={{ padding: "4px 9px", fontSize: 10 }}>
                {t}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function FleetRow({ phase, r }: { phase: string; r: number }) {
  return (
    <>
      <span>{phase}</span>
      {Array.from({ length: 6 }, (_, c) => (
        <i key={c} style={{ ["--i" as string]: r * 6 + c }} />
      ))}
    </>
  );
}
