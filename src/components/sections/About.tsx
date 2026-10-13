import AboutClient from "./About.client";

/* Component CSS lives here (server) so it ships as HTML, not as client JS. */
const css = `
.ab-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(24px,4vw,64px);align-items:stretch}
.ab-col{display:flex;flex-direction:column;min-width:0}
.ab-left .lede{margin:28px 0 0}
.ab-left .ab-line{margin:16px 0 0;color:var(--mute);font-size:15px;line-height:1.6;padding-left:14px;box-shadow:inset 1.5px 0 0 var(--ink)}
.ab-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto;padding-top:32px}

/* lanyard + card */
.ab-mid{position:relative;align-items:center}
.ab-hang{position:relative;display:flex;flex-direction:column;align-items:center;margin-top:calc(-1 * var(--sec-pad));transform-origin:50% 0;will-change:transform}
.ab-strap{position:relative;width:30px;height:calc(var(--sec-pad) + 36px);background:linear-gradient(90deg,#1a1a1a,#0d0d0d 40%,#262626 60%,#0d0d0d);overflow:hidden;border-radius:0 0 3px 3px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06)}
.ab-strap::before,.ab-strap::after{content:"";position:absolute;top:0;bottom:0;width:1px;background:repeating-linear-gradient(180deg,rgba(255,255,255,.28) 0 4px,transparent 4px 8px)}
.ab-strap::before{left:3px}.ab-strap::after{right:3px}
.ab-strap-text{position:absolute;left:0;top:0;width:100%;display:flex;flex-direction:column;align-items:center;animation:ab-strap 14s linear infinite}
.ab-strap-text span{writing-mode:vertical-rl;font-family:var(--nf-mono),monospace;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.82);white-space:nowrap;padding:8px 0}
@keyframes ab-strap{to{transform:translateY(-50%)}}
.ab-clip{position:relative;width:30px;height:56px;display:flex;flex-direction:column;align-items:center}
.ab-clip i{display:block}
.ab-clip .c1{width:30px;height:14px;border-radius:3px;background:linear-gradient(180deg,#e9e9e9,#a9a9a9 45%,#d8d8d8 55%,#8a8a8a);box-shadow:0 2px 3px rgba(0,0,0,.25)}
.ab-clip .c2{width:12px;height:22px;margin-top:-2px;border:3px solid #9d9d9d;border-top:0;border-radius:0 0 8px 8px;background:transparent;box-shadow:inset 0 -1px 0 #e0e0e0}
.ab-clip .c3{width:18px;height:20px;margin-top:-4px;border-radius:9px 9px 4px 4px;background:linear-gradient(90deg,#8d8d8d,#e6e6e6 45%,#b5b5b5)}

.ab-card{position:relative;width:300px;height:404px;margin-top:-6px;perspective:1400px;cursor:pointer;border-radius:22px;outline-offset:6px}
.ab-flip{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 1s var(--ease)}
.ab-card.is-flipped .ab-flip{transform:rotateY(180deg)}
.ab-face{position:absolute;inset:0;border-radius:22px;background:#fff;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;box-shadow:var(--hair),0 2px 4px rgba(13,13,13,.05),0 40px 70px -30px rgba(13,13,13,.35);display:flex;flex-direction:column}
.ab-front{transform:translateZ(1px)}
.ab-back{transform:rotateY(180deg) translateZ(1px)}
/* iOS Safari ignores backface-visibility on promoted children (photo, holo) — hide each face as it passes edge-on */
.ab-front,.ab-back{transition:visibility 0s linear .14s}
.ab-back,.ab-card.is-flipped .ab-front{visibility:hidden}
.ab-card.is-flipped .ab-back{visibility:visible}
.ab-face::before{content:"";position:absolute;left:50%;top:12px;width:44px;height:8px;margin-left:-22px;border-radius:99px;background:var(--paper);box-shadow:inset 0 1px 2px rgba(0,0,0,.18);z-index:3}
.ab-band{background:var(--ink);color:#fff;height:66px;display:flex;align-items:flex-start;justify-content:space-between;padding:26px 18px 0;font-family:var(--nf-mono),monospace;font-size:10.5px;letter-spacing:.2em}
.ab-band b{font-weight:600}
.ab-front-body{flex:1;display:flex;flex-direction:column;align-items:center;padding:16px 20px 14px;text-align:center}
.ab-photo{position:relative;width:128px;height:156px;border-radius:16px;padding:3px;background:linear-gradient(160deg,#d9d9d9,#8f8f8f 40%,#f2f2f2 60%,#6f6f6f);margin-top:-30px;z-index:2}
.ab-photo::before{content:"";position:absolute;inset:-18px;border-radius:30px;background:radial-gradient(closest-side,rgba(13,13,13,.14),transparent);z-index:-1}
.ab-photo-in{width:100%;height:100%;border-radius:13px;overflow:hidden;background:var(--soft)}
.ab-photo img{width:100%;height:100%;object-fit:cover;object-position:50% 18%;filter:grayscale(1) contrast(1.04);transition:transform 1s var(--ease)}
.ab-card:hover .ab-photo img{transform:scale(1.07)}
.ab-name{margin:12px 0 0;font-weight:700;font-size:21px;letter-spacing:-.035em;line-height:1.1}
.ab-role{margin:4px 0 0;font-size:12.5px;color:var(--mute)}
.ab-rows{width:100%;margin:12px 0 0;display:grid;gap:5px;font-size:11.5px;text-align:left}
.ab-rows div{display:flex;justify-content:space-between;gap:12px;padding-bottom:5px;box-shadow:inset 0 -1px 0 var(--line)}
.ab-rows dt{font-family:var(--nf-mono),monospace;color:var(--mute);text-transform:uppercase;letter-spacing:.06em;font-size:10px}
.ab-rows dd{margin:0;font-weight:550;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ab-foot{margin-top:auto;width:100%;display:flex;align-items:flex-end;justify-content:space-between;gap:12px}
.ab-bar{height:30px;flex:1;background:var(--bars);opacity:.9}
.ab-holo{width:38px;height:38px;border-radius:50%;background:conic-gradient(from var(--a,0deg),#e8e8e8,#9c9c9c,#f7f7f7,#bdbdbd,#efefef,#8a8a8a,#e8e8e8);box-shadow:inset 0 0 0 1px rgba(255,255,255,.7),0 1px 2px rgba(0,0,0,.2);animation:ab-holo 6s linear infinite}
@property --a{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes ab-holo{to{--a:360deg}}
.ab-back-body{flex:1;padding:44px 22px 18px;display:flex;flex-direction:column}
.ab-back h3{margin:0;font-size:24px;letter-spacing:-.04em;font-weight:700}
.ab-back h3 .it{font-size:1.05em}
.ab-back ul{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:8px;font-size:12.5px;line-height:1.45;color:var(--ink-2)}
.ab-back li{display:grid;grid-template-columns:18px 1fr}
.ab-back li::before{content:attr(data-n);font-family:var(--nf-mono),monospace;font-size:10px;color:var(--faint);padding-top:2px}
.ab-sign{margin-top:auto;padding-top:10px}
.ab-sign p{margin:0;font-family:var(--nf-serif),serif;font-style:italic;font-size:30px;line-height:1;letter-spacing:-.01em}
.ab-sign small{display:block;margin-top:6px;padding-top:6px;box-shadow:inset 0 1px 0 var(--ink);font-size:11px;color:var(--mute)}
.ab-hint{margin:18px 0 0;font-family:var(--nf-mono),monospace;font-size:11px;color:var(--mute);text-transform:uppercase;letter-spacing:.06em;text-align:center}

/* right column */
.ab-facts{margin:0;display:grid}
.ab-facts div{display:grid;grid-template-columns:110px minmax(0,1fr);gap:16px;padding:16px 0;box-shadow:inset 0 -1px 0 var(--line)}
.ab-facts div:first-child{box-shadow:inset 0 1px 0 var(--line),inset 0 -1px 0 var(--line)}
.ab-facts dt{font-family:var(--nf-mono),monospace;font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--mute);padding-top:2px}
.ab-facts dd{margin:0;font-weight:550;letter-spacing:-.01em;overflow-wrap:anywhere}
.ab-facts a{background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .5s var(--ease)}
.ab-facts a:hover{background-size:100% 1px}
.ab-quote{margin:auto 0 0;padding-top:36px}
.ab-quote p{margin:0;font-family:var(--nf-serif),serif;font-style:italic;font-size:clamp(24px,2.1vw,32px);line-height:1.15;letter-spacing:-.01em}
.ab-quote p::before{content:"“";display:block;font-size:2.4em;line-height:.6;color:var(--faint);font-style:normal}
.ab-quote footer{margin-top:12px;font-size:13px;color:var(--mute)}
.ab-facts-h{margin:0 0 18px;font-family:var(--nf-mono),monospace;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--mute)}
@media (max-width:1100px){
  .ab-grid{grid-template-columns:minmax(0,1fr) 320px}
  .ab-right{grid-column:1 / -1}
  .ab-right .ab-quote{padding-top:28px}
}
@media (max-width:760px){
  .ab-grid{grid-template-columns:minmax(0,1fr)}
  .ab-mid{order:-1;margin-bottom:8px}
  .ab-hang{margin-top:calc(-1 * var(--sec-pad))}
}
@media (max-width:360px){.ab-card{transform:scale(.92);transform-origin:50% 0}}
`;

export default function About() {
  return (
    <>
      <style>{css}</style>
      <AboutClient />
    </>
  );
}
