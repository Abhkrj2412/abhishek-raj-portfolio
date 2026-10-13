import { CERTIFICATIONS, CERT_COUNT_LINE } from "@/lib/data";
import SectionHead from "../ui/SectionHead";
import { ArrowUpRight } from "../ui/Icons";

const css = `
.ct{background:var(--card);box-shadow:inset 0 1px 0 var(--line),inset 0 -1px 0 var(--line)}
.ct-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,6vw,96px);align-items:start}
.ct-side{position:sticky;top:110px}
.ct-count{margin:22px 0 0;font-family:var(--nf-mono),monospace;font-size:13px;color:var(--mute);max-width:320px}
.ct-list{list-style:none;margin:0;padding:0;box-shadow:inset 0 1px 0 var(--line)}
.ct-row{position:relative;display:grid;grid-template-columns:52px minmax(0,1fr) 28px;align-items:center;gap:16px;padding:22px 18px;box-shadow:inset 0 -1px 0 var(--line);outline:none;isolation:isolate;cursor:default;border-radius:0}
.ct-row::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease);z-index:-1;border-radius:14px}
.ct-row:hover::before,.ct-row:focus-visible::before{transform:scaleX(1)}
.ct-row:focus-visible{outline:2px solid var(--ink);outline-offset:2px;border-radius:14px}
.ct-n{font-family:var(--nf-mono),monospace;font-size:12px;color:var(--faint);transition:color .5s var(--ease)}
.ct-t{margin:0;font-weight:650;font-size:clamp(18px,1.7vw,24px);letter-spacing:-.03em;line-height:1.2;transition:color .5s var(--ease)}
.ct-i{margin:4px 0 0;font-size:13.5px;color:var(--mute);transition:color .5s var(--ease)}
.ct-d{margin:8px 0 0;font-size:12.5px;line-height:1.55;color:var(--mute);transition:color .5s var(--ease)}
.ct-a{opacity:0;transform:translate(-10px,6px);transition:opacity .5s var(--ease),transform .6s var(--ease);color:#fff}
.ct-row:hover .ct-t,.ct-row:focus-visible .ct-t{color:#fff}
.ct-row:hover .ct-n,.ct-row:hover .ct-i,.ct-row:hover .ct-d,.ct-row:focus-visible .ct-n,.ct-row:focus-visible .ct-i,.ct-row:focus-visible .ct-d{color:rgba(255,255,255,.62)}
.ct-row:hover .ct-a,.ct-row:focus-visible .ct-a{opacity:1;transform:none}
@media (max-width:860px){.ct-grid{grid-template-columns:minmax(0,1fr)}.ct-side{position:relative;top:0}.ct-row{grid-template-columns:36px minmax(0,1fr) 20px;padding:18px 10px}}
`;

export default function Certifications() {
  return (
    <section id="certifications" className="sec ct" aria-labelledby="cert-title">
      <style>{css}</style>
      <div className="wrap ct-grid">
        <div className="ct-side">
          <SectionHead index="04" label="Certifications" lines={["Always"]} accent="learning." id="cert-title" />
          <p className="ct-count rv" style={{ ["--i" as string]: 2 }}>
            {CERT_COUNT_LINE}
          </p>
        </div>
        <ol className="ct-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="ct-row rv" tabIndex={0} style={{ ["--i" as string]: i % 4 }}>
              <span className="ct-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="ct-t">{c.title}</h3>
                {c.issuer && <p className="ct-i">{c.issuer}</p>}
                {c.detail && <p className="ct-d">{c.detail}</p>}
              </div>
              <ArrowUpRight size={20} className="ct-a" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
