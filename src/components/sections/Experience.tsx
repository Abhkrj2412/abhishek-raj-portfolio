import ExperienceClient from "./Experience.client";

/* Component CSS lives here (server) so it ships as HTML, not as client JS. */
const css = `
.xp-top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px 40px;margin-bottom:clamp(48px,7vw,96px)}
.xp-top .lede{max-width:380px;margin:0}
.xp-path{position:relative;padding:0 0 0 clamp(48px,8vw,140px)}
.xp-list{list-style:none;margin:0;padding:0}
.xp-spine{position:absolute;left:clamp(14px,3vw,52px);top:6px;bottom:0;width:2px;background:var(--soft);border-radius:2px}
.xp-spine i{position:absolute;inset:0;background:var(--ink);transform-origin:50% 0;transform:scaleY(var(--p,0));border-radius:2px}
.xp-stop{position:relative;display:grid;grid-template-columns:minmax(120px,2fr) minmax(0,7fr);gap:clamp(16px,3vw,48px);padding-bottom:clamp(48px,7vw,88px)}
.xp-dot{position:absolute;left:calc(-1 * clamp(48px,8vw,140px) + clamp(14px,3vw,52px) - 8px);top:4px;width:18px;height:18px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--soft);transition:box-shadow .6s var(--ease),background-color .6s var(--ease),transform .6s var(--ease)}
.xp-stop.is-lit .xp-dot{background:var(--ink);box-shadow:inset 0 0 0 2px var(--ink),0 0 0 6px rgba(13,13,13,.08);transform:scale(1.1)}
.xp-when{font-family:var(--nf-mono),monospace;color:var(--mute);transition:color .6s var(--ease)}
.xp-year{display:block;font-family:var(--nf-sans),sans-serif;font-weight:700;font-size:clamp(40px,5vw,72px);letter-spacing:-.05em;line-height:.9;color:#8a8781;transition:color .8s var(--ease)}
.xp-period{display:block;margin-top:10px;font-size:12px;text-transform:uppercase;letter-spacing:.04em}
.xp-stop.is-lit .xp-year{color:var(--ink)}
.xp-stop.is-lit .xp-when{color:var(--mute)}
.xp-main{transform:translateX(12px);transition:transform .9s var(--ease)}
.xp-main h3,.xp-main .xp-detail,.xp-next-t{opacity:.78;transition:opacity .8s var(--ease)}
.xp-stop.is-lit .xp-main{transform:none}
.xp-stop.is-lit .xp-main h3,.xp-stop.is-lit .xp-main .xp-detail,.xp-stop.is-lit .xp-next-t{opacity:1}
.xp-kind{display:inline-flex;height:24px;align-items:center;padding:0 10px;border-radius:999px;box-shadow:var(--hair);font-family:var(--nf-mono),monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--mute)}
.xp-main h3{margin:12px 0 0;font-size:clamp(24px,2.6vw,38px);font-weight:700;letter-spacing:-.045em;line-height:1.05}
.xp-place{margin:8px 0 0;font-size:16px;font-weight:550}
.xp-place span{color:var(--mute);font-weight:400}
.xp-detail{list-style:none;margin:18px 0 0;padding:0;display:grid;gap:10px;max-width:760px}
.xp-detail li{position:relative;padding-left:18px;font-size:14.5px;line-height:1.6;color:var(--ink-2)}
.xp-detail li::before{content:"";position:absolute;left:0;top:.7em;width:8px;height:1.5px;background:var(--faint)}
.xp-next{position:relative;margin-left:0;border-radius:24px;border:1.5px dashed rgba(13,13,13,.28);padding:clamp(22px,3vw,36px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px}
.xp-next-t{margin:0;font-weight:700;font-size:clamp(26px,3vw,44px);letter-spacing:-.045em;line-height:1}
.xp-next small{display:block;font-family:var(--nf-mono),monospace;font-size:12px;font-weight:400;letter-spacing:.04em;text-transform:uppercase;color:var(--mute);margin-bottom:10px}
@media (max-width:760px){
  .xp-stop{grid-template-columns:minmax(0,1fr);gap:10px}
  .xp-year{font-size:40px}
}
`;

export default function Experience() {
  return (
    <>
      <style>{css}</style>
      <ExperienceClient />
    </>
  );
}
