import { PROJECTS } from "@/lib/data";
import WorkClient from "./Work.client";
import { miniUiCss } from "../ui/MiniUI.styles";

/* Component CSS lives here (server) so it ships as HTML, not as client JS. */
const css = `
.wk-top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px 40px;margin-bottom:clamp(36px,5vw,64px)}
.wk-top .lede{max-width:400px;margin:0}
.wk-rail{--rw:min(var(--max),100vw - var(--gutter) * 2);--g:10px;display:flex;gap:var(--g);height:min(78svh,600px);min-height:520px}
.wk-panel{position:relative;flex:1 1 0;min-width:0;border-radius:28px;background:var(--card);box-shadow:var(--hair);overflow:hidden;transition:flex-grow .9s var(--ease),box-shadow .6s var(--ease)}
.wk-panel.is-open{flex-grow:8;box-shadow:var(--hair),var(--shadow-deep)}
.wk-spine{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0;text-align:center;transition:opacity .5s var(--ease);width:100%}
.wk-panel.is-open .wk-spine{opacity:0;pointer-events:none}
.wk-spine-n{font-family:var(--nf-mono),monospace;font-size:12px;color:var(--mute)}
.wk-spine-t{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:650;font-size:clamp(18px,1.6vw,24px);letter-spacing:-.03em;white-space:nowrap}
.wk-plus{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);transition:transform .6s var(--ease),background-color .4s var(--ease),color .4s var(--ease)}
.wk-spine:hover .wk-plus,.wk-spine:focus-visible .wk-plus{transform:rotate(90deg);background:var(--ink);color:#fff}
.wk-body{position:absolute;inset:0 auto 0 0;width:calc((var(--rw) - var(--g) * ${PROJECTS.length - 1}) * 8 / ${8 + PROJECTS.length - 1});display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,1fr);gap:clamp(18px,2.4vw,36px);padding:clamp(22px,2.6vw,36px);opacity:0;transition:opacity .4s var(--ease);visibility:hidden}
.wk-panel.is-open .wk-body{opacity:1;visibility:visible;transition:opacity .7s var(--ease) .25s,visibility 0s}
.wk-text{display:flex;flex-direction:column;min-width:0;overflow:hidden}
.wk-kick{display:flex;gap:12px;align-items:baseline;font-family:var(--nf-mono),monospace;font-size:12px;color:var(--mute);text-transform:uppercase;letter-spacing:.04em}
.wk-kick b{color:var(--ink);font-weight:500}
.wk-text h3{margin:14px 0 0;font-size:clamp(30px,3.4vw,52px);font-weight:700;letter-spacing:-.05em;line-height:1}
.wk-desc{margin:14px 0 0;font-size:14.5px;line-height:1.6;color:var(--ink-2)}
.wk-feat{list-style:none;margin:16px 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:8px 18px}
.wk-feat li{font-size:12.5px;line-height:1.4;color:var(--ink-2);padding-left:14px;position:relative}
.wk-feat li::before{content:"";position:absolute;left:0;top:.55em;width:6px;height:1.5px;background:var(--ink)}
.wk-tech{list-style:none;margin:auto 0 0;padding:18px 0 0;display:flex;flex-wrap:wrap;gap:6px}
.wk-tech .chip{height:30px;font-size:12px}
.wk-gh{margin-top:14px;align-self:flex-start}
.wk-ui{position:relative;min-width:0;border-radius:20px;background:var(--paper);box-shadow:var(--hair);overflow:hidden;clip-path:inset(0 100% 0 0 round 20px);transition:clip-path 1.1s var(--ease) .2s}
.wk-panel.is-open .wk-ui{clip-path:inset(0 0 0 0 round 20px)}
.wk-ui-label{position:absolute;right:12px;bottom:12px;z-index:2;font-family:var(--nf-mono),monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);background:rgba(255,255,255,.8);padding:4px 8px;border-radius:999px;box-shadow:var(--hair)}
.wk-head{display:none}
@media (max-width:1100px){
  .wk-body{grid-template-columns:minmax(0,1fr)}
  .wk-ui{display:none}
}
@media (max-width:900px){
  .wk-rail{flex-direction:column;height:auto;min-height:0}
  .wk-panel{flex:none}
  .wk-spine{display:none}
  .wk-head{display:flex;width:100%;align-items:center;gap:14px;padding:18px 20px;text-align:left}
  .wk-head .wk-spine-n{width:24px}
  .wk-head-t{flex:1;font-weight:650;font-size:20px;letter-spacing:-.03em}
  .wk-panel.is-open .wk-head .wk-plus{transform:rotate(45deg);background:var(--ink);color:#fff}
  .wk-body{position:relative;inset:auto;width:auto;display:none;padding:0 20px 22px;grid-template-columns:minmax(0,1fr)}
  .wk-panel.is-open .wk-body{display:grid}
  .wk-ui{display:block;height:300px}
  .wk-feat{grid-template-columns:1fr}
  .wk-text h3{display:none}
  .wk-text{overflow:visible}
}
`;

export default function Work() {
  return (
    <>
      <style>{css + miniUiCss}</style>
      <WorkClient />
    </>
  );
}
