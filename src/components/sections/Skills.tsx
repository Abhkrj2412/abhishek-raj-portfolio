import SkillsClient from "./Skills.client";

/* Component CSS lives here (server) so it ships as HTML, not as client JS. */
const css = `
.sk-top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:28px 40px}
.sk-top .lede{max-width:420px;margin:0}
.sk-chips{display:flex;flex-wrap:wrap;gap:8px;margin:44px 0 26px}
.sk-chip{height:36px;padding:0 14px;border-radius:999px;font-size:13.5px;font-weight:500;color:var(--ink-2);box-shadow:inset 0 0 0 1px rgba(13,13,13,.16);transition:background-color .4s var(--ease),color .4s var(--ease),box-shadow .4s var(--ease),transform .4s var(--ease);display:inline-flex;align-items:center;gap:8px}
.sk-chip:hover{transform:translateY(-1px);box-shadow:inset 0 0 0 1px var(--ink)}
.sk-chip[aria-pressed="true"]{background:var(--ink);color:#fff;box-shadow:inset 0 0 0 1px var(--ink)}
.sk-chip small{font-family:var(--nf-mono),monospace;font-size:10.5px;opacity:.6}
.sk-body{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:clamp(18px,2.4vw,36px);align-items:start}
.sk-grid{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px;list-style:none;margin:0;padding:0}
.sk-tile{position:relative;width:100%;aspect-ratio:1/1.08;border-radius:14px;background:var(--card);box-shadow:var(--hair);padding:9px 10px;text-align:left;display:flex;flex-direction:column;opacity:0;transform:translateY(14px) scale(.96);transition:opacity .7s var(--ease),transform .8s var(--ease),background-color .35s var(--ease),color .35s var(--ease),box-shadow .35s var(--ease),filter .5s var(--ease);transition-delay:var(--d),var(--d),0s,0s,0s,0s}
.sk-in .sk-tile{opacity:1;transform:none}
.sk-in .sk-tile.is-dim{opacity:.22;filter:grayscale(1)}
.sk-tile:hover,.sk-tile.is-active{background:var(--ink);color:#fff;box-shadow:0 18px 34px -18px rgba(13,13,13,.6);transform:translateY(-3px);transition-delay:0s}
.sk-num{font-family:var(--nf-mono),monospace;font-size:10px;color:var(--faint);display:flex;justify-content:space-between;align-items:center}
.sk-tile:hover .sk-num,.sk-tile.is-active .sk-num{color:rgba(255,255,255,.55)}
.sk-new{width:6px;height:6px;border-radius:50%;background:currentColor;box-shadow:0 0 0 3px rgba(13,13,13,.08)}
.sk-sym{margin-top:auto;font-weight:700;font-size:clamp(20px,2.1vw,30px);letter-spacing:-.05em;line-height:1}
.sk-name{margin-top:4px;font-size:10.5px;line-height:1.2;font-weight:500;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.4em}
.sk-fam{font-family:var(--nf-mono),monospace;font-size:8.5px;text-transform:uppercase;letter-spacing:.04em;color:var(--faint);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sk-tile:hover .sk-fam,.sk-tile.is-active .sk-fam{color:rgba(255,255,255,.5)}

.sk-insp{position:sticky;top:96px;border-radius:26px;background:var(--card);box-shadow:var(--hair),var(--shadow-soft);padding:22px;min-height:460px;display:flex;flex-direction:column}
.sk-insp-top{display:flex;justify-content:space-between;font-family:var(--nf-mono),monospace;font-size:11px;color:var(--mute);text-transform:uppercase;letter-spacing:.05em}
.sk-logo{position:relative;display:grid;place-items:center;height:200px;margin:8px 0 6px}
.sk-logo::before{content:"";position:absolute;width:190px;height:190px;border-radius:50%;background:radial-gradient(closest-side,var(--tint),transparent);filter:blur(6px);transition:background .5s var(--ease)}
.sk-logo-in{position:relative;display:grid;place-items:center;width:150px;height:150px;color:var(--ink);animation:sk-pop .7s var(--ease) both}
@keyframes sk-pop{0%{opacity:0;transform:scale(.6) rotate(-8deg)}60%{opacity:1;transform:scale(1.06) rotate(1deg)}100%{transform:none}}
.sk-insp h3{margin:0;font-size:28px;font-weight:700;letter-spacing:-.045em;line-height:1.05}
.sk-insp-fam{margin:6px 0 0;font-size:13px;color:var(--mute)}
.sk-insp-note{margin:10px 0 0;font-size:13px;color:var(--ink-2)}
.sk-used{margin-top:auto;padding-top:18px}
.sk-used p{margin:0 0 8px;font-family:var(--nf-mono),monospace;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--mute)}
.sk-used ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.sk-used li{font-size:12.5px;padding:5px 10px;border-radius:999px;box-shadow:var(--hair)}
.sk-used .none{font-size:12.5px;color:var(--mute)}
.sk-legend{margin:18px 0 0;display:flex;gap:16px;flex-wrap:wrap;font-size:12px;color:var(--mute)}
.sk-legend span{display:inline-flex;align-items:center;gap:7px}
.sk-legend i{width:6px;height:6px;border-radius:50%;background:var(--ink)}
@media (max-width:1100px){.sk-grid{grid-template-columns:repeat(6,minmax(0,1fr))}}
@media (max-width:900px){
  .sk-body{grid-template-columns:minmax(0,1fr)}
  .sk-insp{position:relative;top:0;min-height:0}
  .sk-logo{height:170px}
}
@media (max-width:640px){
  .sk-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
  .sk-tile{padding:7px 8px;border-radius:12px}
  .sk-sym{font-size:22px}
  .sk-name{font-size:10px}
  .sk-fam{display:none}
}
`;

export default function Skills() {
  return (
    <>
      <style>{css}</style>
      <SkillsClient />
    </>
  );
}
