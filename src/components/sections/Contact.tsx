import ContactClient from "./Contact.client";
import { mosaicCss } from "../ui/MosaicPortrait.styles";

/* Component CSS lives here (server) so it ships as HTML, not as client JS. */
const css = `
.cn{padding-bottom:0}
.cn-big{margin:clamp(28px,4vw,48px) 0 0;font-weight:700;letter-spacing:-.055em;line-height:.92;font-size:clamp(40px,8.4vw,136px)}
.cn-line{display:block}
.cn-w{display:inline-block;white-space:nowrap}
.cn-l{display:inline-block;transition:color .3s var(--ease)}
.cn-l.hop{animation:cn-hop .6s var(--ease)}
@keyframes cn-hop{0%{transform:translateY(0)}35%{transform:translateY(-.16em)}65%{transform:translateY(.03em)}100%{transform:translateY(0)}}
.cn-big .it{letter-spacing:-.03em}
.cn-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,380px);gap:clamp(32px,6vw,96px);align-items:end;margin-top:clamp(40px,6vw,80px)}
.cn-mail{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px}
.cn-mail a{font-weight:650;font-size:clamp(24px,3.8vw,56px);letter-spacing:-.045em;line-height:1.1;background:linear-gradient(var(--ink),var(--ink)) 0 100%/100% 2px no-repeat;padding-bottom:4px;transition:background-size .6s var(--ease);overflow-wrap:anywhere}
.cn-mail a:hover{background-size:0 2px;background-position:100% 100%}
.cn-copy{height:36px;padding:0 14px;border-radius:999px;display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:550;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);transition:background-color .4s var(--ease),color .4s var(--ease)}
.cn-copy:hover,.cn-copy.is-done{background:var(--ink);color:#fff}
.cn-links{list-style:none;margin:28px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:10px}
.cn-note{margin:26px 0 0;color:var(--mute);max-width:520px}
.cn-photo{position:relative}
.cn-badge{position:absolute;left:-46px;top:-46px;z-index:3;width:120px;height:120px;border-radius:50%;background:var(--paper);box-shadow:var(--hair);display:grid;place-items:center}
.cn-badge svg{position:absolute;inset:0;width:100%;height:100%;animation:cn-spin 18s linear infinite}
.cn-badge text{font-family:var(--nf-mono),monospace;font-size:10.4px;letter-spacing:.12em;text-transform:uppercase;fill:var(--ink)}
.cn-badge b{width:40px;height:40px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:18px;font-weight:400}
@keyframes cn-spin{to{transform:rotate(360deg)}}
.cn-foot{margin-top:clamp(80px,12vw,160px);padding:26px 0 30px;box-shadow:inset 0 1px 0 var(--line);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 24px;font-size:13.5px;color:var(--mute)}
.cn-foot a{display:inline-flex;align-items:center;gap:8px;color:var(--ink);font-weight:550}
.cn-foot a span{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;box-shadow:var(--hair);transition:transform .5s var(--ease),background-color .4s var(--ease),color .4s var(--ease)}
.cn-foot a:hover span{transform:translateY(-3px);background:var(--ink);color:#fff}
@media (max-width:860px){
  .cn-grid{grid-template-columns:minmax(0,1fr)}
  .cn-photo{max-width:340px;margin:30px auto 0;width:calc(100% - 40px)}
  .cn-badge{left:-28px;top:-34px;width:100px;height:100px}
}
`;

export default function Contact() {
  return (
    <>
      <style>{css + mosaicCss}</style>
      <ContactClient />
    </>
  );
}
