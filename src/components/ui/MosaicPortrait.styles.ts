const COLS = 8;
const ROWS = 10;
export const mosaicCss = `
.mo{position:relative;width:100%;aspect-ratio:4/5;border-radius:26px;background:var(--soft);box-shadow:var(--hair);overflow:hidden;isolation:isolate}
.mo-grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(${COLS},1fr);grid-template-rows:repeat(${ROWS},1fr);gap:2px;padding:2px}
.mo-t{position:relative;border-radius:5px;background-image:var(--src);background-size:${COLS * 100}% ${ROWS * 100}%;background-position:var(--bx) var(--by);opacity:0;transform:scale(.35) rotate(var(--rot));transition:opacity .7s var(--ease),transform .9s var(--ease),filter .6s var(--ease);transition-delay:var(--d);will-change:transform;filter:grayscale(1) contrast(1.03)}
.mo.is-in .mo-t{opacity:1;transform:translate3d(0,calc(var(--lift,0) * -6px),0) scale(calc(1 + var(--lift,0) * .08))}
.mo.is-in.is-live .mo-t{transition-delay:0s;transition-duration:.45s,.45s,.45s}
.mo-t::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 1px rgba(255,255,255,calc(var(--lift,0) * .7))}
.mo-cap{position:absolute;left:12px;bottom:12px;z-index:2;font-family:var(--nf-mono),monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink);background:rgba(255,255,255,.82);padding:5px 10px;border-radius:999px;box-shadow:var(--hair)}
`;
