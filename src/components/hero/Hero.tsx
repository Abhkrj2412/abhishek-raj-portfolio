import HeroClient from "./Hero.client";

/* Component CSS lives here (server) so it ships as HTML, not as client JS. */
const css = `
.hr{position:relative;min-height:100svh;display:grid;align-items:end;overflow:clip;padding-top:88px}
.hr-ghost{position:absolute;left:50%;top:clamp(110px,22vh,220px);transform:translateX(-50%);margin:0;font-weight:800;letter-spacing:-.06em;line-height:.8;font-size:clamp(84px,21vw,380px);color:transparent;-webkit-text-stroke:1.2px rgba(13,13,13,.16);white-space:nowrap;user-select:none;pointer-events:none;animation:hr-ghost 1.6s var(--ease) both}
@keyframes hr-ghost{from{opacity:0;letter-spacing:.02em}to{opacity:1;letter-spacing:-.06em}}
.hr-stage{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:end;gap:clamp(16px,2vw,32px)}
.hr-media{position:relative;mix-blend-mode:multiply;height:min(96svh,1040px);aspect-ratio:768/960;max-width:min(80vw,832px);margin-bottom:0;animation:hr-rise 1.4s var(--ease) .1s both}
@keyframes hr-rise{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
.hr-media video,.hr-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hr-left{align-self:end;padding-bottom:clamp(32px,9vh,96px);position:relative;z-index:2;margin-right:clamp(-220px,-10vw,0px)}
.hr-right{align-self:end;justify-self:end;padding-bottom:clamp(32px,9vh,96px);position:relative;z-index:2;max-width:340px;display:grid;gap:22px}
.hr-kicker{display:flex;align-items:center;gap:10px;font-family:var(--nf-mono),monospace;font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--mute);margin:0 0 18px}
.hr-dot{width:8px;height:8px;border-radius:50%;background:var(--ink);box-shadow:0 0 0 0 rgba(13,13,13,.35);animation:hr-live 2.4s ease-out infinite}
@keyframes hr-live{0%{box-shadow:0 0 0 0 rgba(13,13,13,.35)}70%,100%{box-shadow:0 0 0 10px rgba(13,13,13,0)}}
.hr h1{margin:0;font-weight:700;letter-spacing:-.05em;line-height:.95;font-size:clamp(44px,5.6vw,96px)}
.hr h1 .it{font-size:1.04em}
.hr-intro{margin:0;color:var(--ink-2);font-size:16px;line-height:1.6}
.hr-cta{display:flex;flex-wrap:wrap;gap:10px}
.hr-sound{position:absolute;right:clamp(4px,6%,40px);bottom:clamp(90px,22%,220px);z-index:3;width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;transition:transform .5s var(--ease),background-color .4s var(--ease);box-shadow:0 12px 26px -12px rgba(13,13,13,.7)}
.hr-sound:hover{transform:scale(1.08)}
.hr-sound svg{width:16px;height:16px}
.hr-sound.is-blocked::before,.hr-sound.is-blocked::after{content:"";position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 1.5px rgba(13,13,13,.45);animation:hr-ping 2s var(--ease) infinite}
.hr-sound.is-blocked::after{animation-delay:1s}
@keyframes hr-ping{from{transform:scale(1);opacity:1}to{transform:scale(1.9);opacity:0}}
.hr-scroll{display:inline-flex;align-items:center;gap:10px;font-family:var(--nf-mono),monospace;font-size:12px;color:var(--mute);text-transform:uppercase;letter-spacing:.04em}
.hr-scroll span{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;box-shadow:var(--hair);animation:hr-bob 2.4s var(--ease) infinite}
@keyframes hr-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
.hr-fade{animation:hr-rise 1.2s var(--ease) both;animation-delay:calc(.35s + var(--i,0)*.09s)}
@media (max-width:1100px){
  .hr-left{margin-right:clamp(-160px,-12vw,0px)}
}
@media (max-width:860px){
  .hr{align-items:start;padding-top:84px}
  .hr-ghost{top:96px;font-size:clamp(64px,23vw,200px)}
  .hr-stage{grid-template-columns:minmax(0,1fr);justify-items:center;gap:0}
  .hr-media{order:-1;height:62svh;max-width:100%}
  .hr-left,.hr-right{justify-self:stretch;padding-bottom:0;margin:0;max-width:none}
  .hr-left{margin-top:-8px}
  .hr-right{padding:22px 0 48px}
  .hr-sound{bottom:18%;right:2%}
}
`;

export default function Hero() {
  return (
    <>
      <style>{css}</style>
      <HeroClient />
    </>
  );
}
