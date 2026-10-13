import AchievementsClient from "./Achievements.client";

/* Component CSS lives here (server) so it ships as HTML, not as client JS. */
const css = `
.ac{position:relative}
.ac-pin{position:sticky;top:0;height:100svh;display:flex;flex-direction:column;justify-content:center;overflow:hidden;padding-block:clamp(72px,10vh,110px) clamp(24px,5vh,56px)}
.ac-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:18px 40px}
.ac-head .h2{font-size:clamp(40px,6vw,92px)}
.ac-prog{width:min(260px,40vw);display:grid;gap:8px;font-family:var(--nf-mono),monospace;font-size:11px;color:var(--mute);text-transform:uppercase;letter-spacing:.05em}
.ac-prog span{display:flex;justify-content:space-between}
.ac-prog i{display:block;height:2px;background:var(--soft);border-radius:2px;overflow:hidden;position:relative}
.ac-prog i::after{content:"";position:absolute;inset:0;background:var(--ink);transform-origin:0 50%;transform:scaleX(var(--p,0))}
.ac-viewport{margin-top:clamp(28px,5vh,56px)}
.ac-track{display:flex;gap:clamp(14px,1.6vw,24px);padding:18px var(--gutter) 30px;width:max-content;will-change:transform}
.ac-card{position:relative;flex:none;width:clamp(340px,40vw,540px);height:clamp(260px,36vh,310px);border-radius:28px;background:var(--card);box-shadow:var(--hair),0 1px 2px rgba(13,13,13,.03);padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;transition:transform .8s var(--ease),box-shadow .8s var(--ease)}
.ac-card.is-near{transform:translateY(-12px);box-shadow:var(--hair),var(--shadow-deep)}
.ac-card-top{display:flex;justify-content:space-between;align-items:flex-start}
.ac-logo{position:relative;display:grid;place-items:center;width:72px;height:72px;border-radius:20px;background:#fff;box-shadow:var(--hair);color:var(--ink)}
.ac-logo::before{content:"";position:absolute;inset:-22px;border-radius:50%;background:radial-gradient(closest-side,var(--tint),transparent 75%);opacity:.55;z-index:-1;transition:opacity .8s var(--ease),transform .8s var(--ease)}
.ac-card.is-near .ac-logo::before{opacity:1;transform:scale(1.15)}
.ac-idx{font-family:var(--nf-mono),monospace;font-size:12px;color:var(--mute)}
.ac-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:16px}
.ac-text{min-width:0;max-width:56%}
.ac-label{margin:0;font-weight:700;font-size:clamp(18px,1.6vw,22px);letter-spacing:-.03em;line-height:1.15}
.ac-cap{margin:6px 0 0;font-size:13.5px;color:var(--ink-2);line-height:1.4}
.ac-det{margin:6px 0 0;font-size:12px;color:var(--mute);line-height:1.45}
.ac-num{font-weight:700;font-size:clamp(68px,8vw,124px);letter-spacing:-.06em;line-height:.8;font-variant-numeric:tabular-nums;white-space:nowrap}
.ac-num small{font-size:.45em;letter-spacing:-.03em;vertical-align:top;margin-left:2px;color:var(--mute)}
.ac-glyph{font-family:var(--nf-serif),serif;font-weight:400;color:var(--ink)}
.ac-end{flex:none;align-self:center;display:flex;align-items:center;gap:14px;padding:0 clamp(24px,6vw,96px) 0 clamp(8px,2vw,24px);font-family:var(--nf-serif),serif;font-style:italic;font-size:clamp(34px,4vw,60px);color:var(--mute);white-space:nowrap}
.ac-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
@media (max-width:640px){
  .ac-card{width:min(340px,calc(100vw - var(--gutter) * 2 - 20px));height:290px;padding:18px}
  .ac-text{max-width:60%}
  .ac-logo{width:60px;height:60px;border-radius:16px}
}
`;

export default function Achievements() {
  return (
    <>
      <style>{css}</style>
      <AchievementsClient />
    </>
  );
}
