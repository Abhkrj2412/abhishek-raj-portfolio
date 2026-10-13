export const miniUiCss = `
.mu{position:absolute;inset:0;padding:18px;display:flex;flex-direction:column;gap:12px;font-size:11px;color:var(--ink-2)}
.mu-win{display:flex;align-items:center;gap:6px;padding-bottom:10px;box-shadow:inset 0 -1px 0 var(--line)}
.mu-win i{width:8px;height:8px;border-radius:50%;background:#cfcbc4}
.mu-win span{margin-left:8px;font-family:var(--nf-mono),monospace;font-size:10px;color:var(--mute)}
.mu-card{background:#fff;border-radius:12px;box-shadow:var(--hair);padding:10px 12px}
.mu-k{font-family:var(--nf-mono),monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute)}
.mu-bar{height:6px;border-radius:9px;background:#e4e1db}
.mu-bar.d{background:#c9c5bd}
.mu-row{display:flex;align-items:center;gap:8px}

/* ODM: steps + diagram */
.mu-odm{display:grid;grid-template-columns:1fr 1fr;gap:12px;flex:1;min-height:0}
.mu-steps{list-style:none;margin:0;padding:0;display:grid;gap:6px;align-content:start}
.mu-steps li{display:flex;align-items:center;gap:8px;background:#fff;border-radius:9px;box-shadow:var(--hair);padding:6px 8px;font-size:10.5px;opacity:0;transform:translateX(-8px);animation:mu-in .6s var(--ease) forwards;animation-delay:calc(.6s + var(--i)*.12s)}
.mu-steps b{display:grid;place-items:center;width:16px;height:16px;border-radius:50%;background:var(--ink);color:#fff;font-size:8px;font-weight:600;flex:none}
@keyframes mu-in{to{opacity:1;transform:none}}
.mu-dia{position:relative;background:#fff;border-radius:12px;box-shadow:var(--hair);overflow:hidden}
.mu-dia svg{position:absolute;inset:0;width:100%;height:100%}
.mu-dia .ln{stroke:#9d9a93;stroke-width:1.2;fill:none;stroke-dasharray:4 3;animation:mu-dash 2s linear infinite}
@keyframes mu-dash{to{stroke-dashoffset:-14}}
.mu-dia .bx{fill:#f4f2ee;stroke:#0d0d0d;stroke-width:1.2}
.mu-dia .dm{fill:#fff;stroke:#0d0d0d;stroke-width:1.2}
.mu-dia text{font-family:var(--nf-mono),monospace;font-size:7px;fill:#3a3a3a}

/* voice */
.mu-wave{display:flex;align-items:center;justify-content:center;gap:3px;height:70px}
.mu-wave i{width:4px;border-radius:4px;background:var(--ink);height:calc(var(--h)*1%);animation:mu-wave 1.2s ease-in-out infinite;animation-delay:calc(var(--i)*-.09s);transform-origin:50% 50%}
@keyframes mu-wave{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
.mu-code{font-family:var(--nf-mono),monospace;font-size:10px;line-height:1.7;white-space:pre;color:var(--ink);overflow:hidden}
.mu-code span{color:var(--faint)}
.mu-tests{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.mu-tests div{background:#fff;border-radius:9px;box-shadow:var(--hair);padding:8px;text-align:center;font-size:10px}
.mu-tests b{display:block;font-size:16px;letter-spacing:-.04em}

/* cli */
.mu-term{flex:1;background:#141414;color:#e8e6e1;border-radius:12px;padding:14px;font-family:var(--nf-mono),monospace;font-size:10.5px;line-height:1.75;overflow:hidden}
.mu-term p{margin:0;white-space:nowrap;opacity:0;animation:mu-type .01s linear forwards;animation-delay:calc(.5s + var(--i)*.28s)}
@keyframes mu-type{to{opacity:1}}
.mu-term .m{color:#8d8a84}
.mu-term .cur{display:inline-block;width:7px;height:12px;background:#e8e6e1;vertical-align:-2px;animation:mu-blink 1s steps(1) infinite}
@keyframes mu-blink{50%{opacity:0}}
.mu-tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.mu-tiers div{background:#fff;border-radius:9px;box-shadow:var(--hair);padding:7px 8px;font-size:10px}
.mu-tiers b{display:block;font-size:13px}

/* fleet */
.mu-fleet{display:grid;grid-template-columns:auto repeat(6,1fr);gap:5px 6px;align-items:center}
.mu-fleet span{font-family:var(--nf-mono),monospace;font-size:9px;color:var(--mute);padding-right:4px}
.mu-fleet i{aspect-ratio:1;border-radius:4px;background:#fff;box-shadow:var(--hair);animation:mu-pulse 3.2s var(--ease) infinite;animation-delay:calc(var(--i)*-.17s)}
@keyframes mu-pulse{0%,70%,100%{background:#fff}80%{background:#0d0d0d}}
.mu-meter{height:8px;border-radius:9px;background:#e4e1db;overflow:hidden;position:relative}
.mu-meter i{position:absolute;inset:0 auto 0 0;width:25%;background:var(--ink);border-radius:9px;animation:mu-fill 2.4s var(--ease) both .6s}
@keyframes mu-fill{from{width:0}}
`;
