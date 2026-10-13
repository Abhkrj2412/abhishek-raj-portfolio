import NavigationClient from "./Navigation.client";

/* Component CSS lives here (server) so it ships as HTML, not as client JS. */
const css = `
.nv{position:fixed;inset:0 0 auto 0;z-index:50;pointer-events:none}
.nv::before{content:"";position:absolute;inset:0 0 auto 0;height:96px;background:linear-gradient(var(--paper) 35%,rgba(244,242,238,0));opacity:0;transition:opacity .5s var(--ease)}
.nv.is-scrolled::before{opacity:1}
.nv-in{position:relative}
.nv-bar{position:absolute;left:0;top:0;height:2px;width:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(0);will-change:transform}
.nv-in{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px var(--gutter) 0}
.nv-in>*{pointer-events:auto}
.nv-brand{display:flex;align-items:center;gap:12px;border-radius:999px}
.nv-mark{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;box-shadow:inset 0 0 0 1.5px var(--ink);font-weight:700;font-size:14px;letter-spacing:-.03em;transition:background-color .5s var(--ease),color .5s var(--ease),transform .9s var(--ease);background:rgba(244,242,238,.6)}
.nv-brand:hover .nv-mark{transform:rotate(360deg)}
.nv.is-scrolled .nv-mark{background:var(--ink);color:#fff}
.nv-name{font-weight:600;letter-spacing:-.02em;font-size:15px;transition:opacity .5s var(--ease),transform .6s var(--ease);white-space:nowrap}
.nv.is-scrolled .nv-name{opacity:0;transform:translateX(-8px);pointer-events:none}
.nv-pill{position:relative;display:flex;align-items:center;gap:2px;padding:5px;border-radius:999px;transition:background-color .5s var(--ease),box-shadow .5s var(--ease),backdrop-filter .5s var(--ease)}
.nv.is-scrolled .nv-pill,.nv-pill:hover{background:rgba(255,255,255,.72);box-shadow:var(--hair),0 10px 30px -18px rgba(13,13,13,.35);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.nv-ind{position:absolute;top:5px;left:0;height:calc(100% - 10px);border-radius:999px;background:var(--ink);transition:transform .6s var(--ease),width .6s var(--ease),opacity .4s var(--ease);opacity:0;z-index:0}
.nv-link{position:relative;z-index:1;padding:9px 15px;border-radius:999px;font-size:14px;font-weight:500;color:var(--ink-2);transition:color .4s var(--ease)}
.nv-link:hover{color:var(--ink)}
.nv-link[aria-current="true"]{color:#fff}
.nv-menu{display:none;height:44px;padding:0 18px;border-radius:999px;font-size:14px;font-weight:600;background:rgba(255,255,255,.75);box-shadow:var(--hair);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);align-items:center;gap:10px;position:relative;z-index:3}
.nv-menu i{display:grid;gap:4px}
.nv-menu i::before,.nv-menu i::after{content:"";display:block;width:16px;height:1.5px;background:currentColor;transition:transform .5s var(--ease)}
.nv-menu[aria-expanded="true"]{background:var(--ink);color:#fff}
.nv-menu[aria-expanded="true"] i::before{transform:translateY(2.75px) rotate(45deg)}
.nv-menu[aria-expanded="true"] i::after{transform:translateY(-2.75px) rotate(-45deg)}
.nv-ov{position:fixed;inset:0;z-index:2;background:var(--paper);clip-path:circle(0% at calc(100% - 60px) 40px);transition:clip-path .9s var(--ease),visibility 0s linear .9s;visibility:hidden;pointer-events:auto;display:flex;flex-direction:column;justify-content:space-between;padding:110px var(--gutter) 32px;overflow:auto}
.nv-ov.is-open{clip-path:circle(150% at calc(100% - 60px) 40px);visibility:visible;transition:clip-path .9s var(--ease),visibility 0s}
.nv-ov ol{list-style:none;margin:0;padding:0;display:grid;gap:4px}
.nv-ov li{overflow:hidden}
.nv-ov ol a{display:flex;align-items:baseline;gap:14px;font-size:clamp(40px,12vw,72px);font-weight:700;letter-spacing:-.05em;line-height:1.05;transform:translateY(110%);transition:transform .8s var(--ease);transition-delay:calc(.12s + var(--i)*60ms)}
.nv-ov ol a small{font-family:var(--nf-mono),monospace;font-size:12px;font-weight:400;letter-spacing:0;color:var(--mute)}
.nv-ov.is-open ol a{transform:none}
.nv-ov-foot{display:flex;flex-wrap:wrap;gap:10px 18px;font-size:14px;color:var(--mute);opacity:0;transition:opacity .6s var(--ease) .4s}
.nv-ov.is-open .nv-ov-foot{opacity:1}
@media (max-width:860px){.nv-pill{display:none}.nv-menu{display:inline-flex}}
@media (max-width:420px){.nv-name{display:none}}
`;

export default function Navigation() {
  return (
    <>
      <style>{css}</style>
      <NavigationClient />
    </>
  );
}
