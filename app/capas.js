// Capas animadas das matérias (cartões da aba Módulos).
// Ilustrações em SVG no estilo do app: traço preto, cores chapadas da paleta, animações leves em CSS.
// As animações param sozinhas para quem ativou "reduzir movimento" no sistema.
(function () {
  const css = `
.subj-grid .sg .capa{display:block;width:100%;height:124px;margin:2px 0 -2px;overflow:visible;pointer-events:none;transition:transform .35s cubic-bezier(.3,1.4,.5,1)}
.subj-grid .sg:hover .capa,.subj-grid .sg:focus-visible .capa{transform:scale(1.05) rotate(-1.5deg)}
.capa .k{stroke:var(--ink);stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round}
.capa .kt{stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;fill:none}
.capa .n{fill:none}.capa .fw{fill:var(--white)}.capa .fi{fill:var(--ink)}.capa .fp{fill:var(--pink)}.capa .fv{fill:var(--violet)}
.capa .fo{fill:var(--orange)}.capa .fl{fill:var(--lime)}.capa .fb{fill:var(--butter)}.capa .fs{fill:var(--sky)}.capa .fm{fill:var(--mint)}.capa .fr{fill:var(--rose)}.capa .fla{fill:var(--lilac)}
.capa text{font-family:var(--display);font-weight:800;fill:var(--ink);text-anchor:middle;dominant-baseline:central}
.capa .a{transform-box:fill-box;transform-origin:center}
.capa .pulse{animation:cv-pulse 2.4s ease-in-out infinite}
.capa .breathe{animation:cv-pulse 5s ease-in-out infinite;--s:1.025}
.capa .twist{animation:cv-twist 3s ease-in-out infinite}
.capa .spin{animation:cv-spin 14s linear infinite}
.capa .spinf{animation:cv-spin 5s linear infinite}
.capa .spinr{animation:cv-spin 3.4s linear infinite reverse}
.capa .bob{animation:cv-bob 3s ease-in-out infinite}
.capa .rise{animation:cv-rise 2.6s ease-in infinite}
.capa .wave{animation:cv-wave 2.2s linear infinite}
.capa .wave2{animation:cv-wave 1.4s linear infinite}
.capa .swing{animation:cv-swing 2.2s ease-in-out infinite}
.capa .draw{stroke-dasharray:100;animation:cv-draw 4.5s ease-in-out infinite}
.capa .slide{animation:cv-slide 4s ease-in-out infinite}
.capa .flip{animation:cv-flip 3.6s ease-in-out infinite}
.capa .pop{animation:cv-pop 2.8s ease-in-out infinite}
.capa .stop{transform-origin:center bottom;animation:cv-scaley 5s linear infinite}
.capa .sbot{transform-origin:center bottom;animation:cv-scaley 5s linear infinite reverse}
.capa .stream{stroke-dasharray:3 4;animation:cv-stream .5s linear infinite}
.capa .glow{animation:cv-glow 1.8s ease-in-out infinite}
.capa .bounce{animation:cv-bounce 2.2s ease-in-out infinite}
.capa .shadow{animation:cv-shadow 2.2s ease-in-out infinite}
.capa .write{animation:cv-write 5s ease-in-out infinite}
.capa .tilt{animation:cv-tilt 4s ease-in-out infinite}
@keyframes cv-pulse{50%{transform:scale(var(--s,1.12))}}
@keyframes cv-twist{0%,100%{transform:scaleX(1)}50%{transform:scaleX(-1)}}
@keyframes cv-spin{to{transform:rotate(360deg)}}
@keyframes cv-bob{50%{transform:translateY(-6px)}}
@keyframes cv-rise{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:1}100%{transform:translateY(-64px) scale(1.1);opacity:0}}
@keyframes cv-wave{to{transform:translateX(-60px)}}
@keyframes cv-swing{0%,100%{transform:rotate(28deg)}50%{transform:rotate(-28deg)}}
@keyframes cv-draw{0%{stroke-dashoffset:100}45%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:-100}}
@keyframes cv-slide{0%,15%,100%{transform:translateX(0)}45%,70%{transform:translateX(var(--dx,20px))}}
@keyframes cv-flip{0%,15%{transform:scaleX(1);opacity:1}55%,85%{transform:scaleX(-1);opacity:1}100%{transform:scaleX(-1);opacity:0}}
@keyframes cv-pop{0%,100%{transform:scale(.92)}50%{transform:scale(1.08)}}
@keyframes cv-scaley{0%{transform:scaleY(1)}92%,100%{transform:scaleY(.02)}}
@keyframes cv-stream{to{stroke-dashoffset:-14}}
@keyframes cv-glow{0%,100%{opacity:.25}50%{opacity:1}}
@keyframes cv-bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-16px)}60%{transform:translateY(0)}70%{transform:translateY(-4px)}80%{transform:translateY(0)}}
@keyframes cv-shadow{0%,60%,80%,100%{transform:scaleX(1)}40%{transform:scaleX(.55)}70%{transform:scaleX(.85)}}
@keyframes cv-write{0%,100%{transform:translate(0,0)}25%{transform:translate(-26px,8px)}50%{transform:translate(-6px,20px)}75%{transform:translate(-34px,30px)}}
@keyframes cv-tilt{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}
`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  // atraso da animação
  const d = (s) => `style="animation-delay:${s}s"`;

  // engrenagem: caminho com n dentes
  function gear(cx, cy, r, n) {
    const pts = [], R = r + 4;
    for (let i = 0; i < n * 2; i++) {
      const a0 = (Math.PI * i) / n, a1 = (Math.PI * (i + 1)) / n, rr = i % 2 ? r : R;
      const m = (a1 - a0) * 0.18;
      pts.push([cx + rr * Math.cos(a0 + m), cy + rr * Math.sin(a0 + m)], [cx + rr * Math.cos(a1 - m), cy + rr * Math.sin(a1 - m)]);
    }
    return "M" + pts.map((p) => p.map((v) => v.toFixed(1)).join(" ")).join("L") + "Z";
  }

  const C = {};

  C["Biologia"] = `
  <g class="a breathe"><circle class="fw k" cx="62" cy="62" r="44"/>
    <ellipse class="fo k" cx="38" cy="82" rx="12" ry="6.5" transform="rotate(-25 38 82)"/><path class="kt" d="M30 84 l3 -5 l3 5 l3 -5 l3 5 l3 -5"/>
    <ellipse class="fl k" cx="88" cy="86" rx="9" ry="5" transform="rotate(20 88 86)"/>
    <g class="a pulse"><circle class="fv k" cx="66" cy="54" r="16"/><circle class="fp k" cx="71" cy="50" r="5"/></g>
    <circle class="fi a bob" cx="36" cy="50" r="2.4"/><circle class="fi a bob" ${d(.8)} cx="48" cy="92" r="2.4"/><circle class="fi a bob" ${d(1.5)} cx="92" cy="66" r="2.4"/></g>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const y = 14 + i * 13; return `<g class="a twist" style="animation-delay:${(-i * 0.28).toFixed(2)}s"><line class="k" x1="136" y1="${y}" x2="178" y2="${y}"/><circle class="${i % 2 ? "fv" : "fp"} k" cx="136" cy="${y}" r="5"/><circle class="${i % 2 ? "fl" : "fo"} k" cx="178" cy="${y}" r="5"/></g>`; }).join("")}`;

  C["Química"] = `
  <defs><clipPath id="cv-frasco"><path d="M70 16 L70 46 L42 102 Q40 108 46 108 L110 108 Q116 108 114 102 L86 46 L86 16 Z"/></clipPath></defs>
  <path class="fw" d="M70 16 L70 46 L42 102 Q40 108 46 108 L110 108 Q116 108 114 102 L86 46 L86 16 Z"/>
  <g clip-path="url(#cv-frasco)"><path class="fl wave" d="M0 74 Q15 66 30 74 T60 74 T90 74 T120 74 T150 74 T180 74 T210 74 T240 74 V120 H0 Z"/>
    <path class="kt wave" d="M0 74 Q15 66 30 74 T60 74 T90 74 T120 74 T150 74 T180 74 T210 74 T240 74"/></g>
  <circle class="fw k rise" cx="66" cy="100" r="4"/><circle class="fw k rise" ${d(.9)} cx="82" cy="98" r="3"/><circle class="fw k rise" ${d(1.7)} cx="92" cy="102" r="5"/>
  <path class="n k" d="M70 16 L70 46 L42 102 Q40 108 46 108 L110 108 Q116 108 114 102 L86 46 L86 16"/>
  <rect class="fw k" x="64" y="9" width="28" height="8" rx="3"/>
  <g class="a spin"><ellipse class="n k" cx="156" cy="56" rx="38" ry="13"/><ellipse class="n k" cx="156" cy="56" rx="38" ry="13" transform="rotate(60 156 56)"/><ellipse class="n k" cx="156" cy="56" rx="38" ry="13" transform="rotate(-60 156 56)"/>
    <circle class="fv k" cx="194" cy="56" r="4.5"/><circle class="fo k" cx="137" cy="23" r="4.5"/><circle class="fl k" cx="137" cy="89" r="4.5"/></g>
  <circle class="fp k a pulse" cx="156" cy="56" r="9"/>`;

  C["Física"] = `
  <rect class="fi" x="22" y="8" width="78" height="6" rx="3"/>
  <g class="swing" style="transform-box:view-box;transform-origin:61px 12px"><line class="k" x1="61" y1="12" x2="61" y2="80"/><circle class="fo k" cx="61" cy="88" r="12"/><circle class="fw" cx="57" cy="84" r="3"/></g>
  <circle class="n k" cx="154" cy="50" r="40" stroke-dasharray="3 6"/>
  <circle class="fv k" cx="154" cy="50" r="19"/><path class="kt" style="stroke:var(--white)" d="M140 44 q14 -6 28 0 M138 54 q16 6 32 0"/>
  <ellipse class="n k" cx="154" cy="50" rx="33" ry="7.5" transform="rotate(-14 154 50)"/>
  <g class="spinf" style="transform-box:view-box;transform-origin:154px 50px"><circle class="fl k" cx="154" cy="10" r="6"/></g>
  <g clip-path="url(#cv-onda)"><path class="n wave2" style="stroke:var(--violet);stroke-width:3.4" d="M100 106 q7.5 -12 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0"/></g>
  <defs><clipPath id="cv-onda"><rect x="104" y="92" width="94" height="26"/></clipPath></defs>`;

  C["Matemática"] = `
  <path class="n k" d="M22 104 H122 M116 99 l7 5 l-7 5 M30 112 V12 M25 18 l5 -7 l5 7"/>
  <path class="n draw" pathLength="100" style="stroke:var(--violet);stroke-width:4;stroke-linecap:round" d="M38 22 Q72 150 106 22"/>
  <circle class="fp k a pulse" cx="72" cy="86" r="5"/>
  ${[["π", 150, 24, "fw", 0], ["√", 184, 50, "fv", .6], ["∑", 146, 74, "fo", 1.2], ["%", 182, 98, "fw", 1.8]].map(([t, x, y, c, dl]) => `<g class="a bob" ${d(dl)}><rect class="${c} k" x="${x - 15}" y="${y - 15}" width="30" height="30" rx="8"/><text x="${x}" y="${y + 1}" font-size="19" ${c === "fv" ? 'style="fill:var(--white)"' : ""}>${t}</text></g>`).join("")}`;

  C["Matemática Básica"] = `
  <rect class="fb k" x="14" y="12" width="118" height="96" rx="8"/><rect class="fw k" x="22" y="20" width="102" height="80" rx="4"/>
  ${[34, 52, 70, 88].map((y, r) => { const cols = ["fp", "fo", "fv", "fl"][r]; const dx = [24, 18, 30, 22][r]; return `<line class="kt" x1="22" y1="${y}" x2="124" y2="${y}"/>
    <g class="slide" style="--dx:${dx}px;animation-delay:${r * 0.5}s">${[0, 1, 2].map((b) => `<circle class="${cols} k" cx="${34 + b * 13}" cy="${y}" r="6.5"/>`).join("")}</g>
    ${[0, 1].map((b) => `<circle class="${cols} k" cx="${104 + b * 13}" cy="${y}" r="6.5"/>`).join("")}`; }).join("")}
  ${[["+", 160, 24, 0], ["−", 186, 54, .5], ["×", 156, 78, 1], ["÷", 184, 102, 1.5]].map(([t, x, y, dl]) => `<g class="a bob" ${d(dl)}><circle class="fw k" cx="${x}" cy="${y}" r="13"/><text x="${x}" y="${y + 1}" font-size="18">${t}</text></g>`).join("")}`;

  C["Linguagens"] = `
  <path class="fw k" d="M70 66 Q46 56 18 62 L18 108 Q46 102 70 112 Z"/><path class="fw k" d="M70 66 Q94 56 122 62 L122 108 Q94 102 70 112 Z"/>
  <path class="kt" d="M28 74 q18 -4 34 2 M28 84 q18 -4 34 2 M28 94 q18 -4 34 2 M80 76 q16 -6 34 -2 M80 86 q16 -6 34 -2 M80 96 q16 -6 34 -2"/>
  <g class="flip" style="transform-box:view-box;transform-origin:70px 86px"><path class="fla k" d="M70 66 Q94 56 122 62 L122 108 Q94 102 70 112 Z"/></g>
  <g class="a pop"><path class="fv k" d="M88 8 h48 a8 8 0 0 1 8 8 v18 a8 8 0 0 1 -8 8 h-30 l-10 9 v-9 h-8 a8 8 0 0 1 -8 -8 v-18 a8 8 0 0 1 8 -8 Z"/><text x="112" y="25" font-size="17" style="fill:var(--white)">Aa</text></g>
  <g class="a bob" ${d(.7)}><path class="fw k" d="M150 46 h38 a7 7 0 0 1 7 7 v16 a7 7 0 0 1 -7 7 h-8 v9 l-10 -9 h-20 a7 7 0 0 1 -7 -7 v-16 a7 7 0 0 1 7 -7 Z"/><text x="169" y="61" font-size="14">Hi!</text></g>
  <g class="a bob" ${d(1.4)}><rect class="fl k" x="138" y="88" width="56" height="24" rx="8"/><text x="166" y="100" font-size="12">¡Hola!</text></g>`;

  C["Redação"] = `
  <g transform="rotate(-5 72 62)"><rect class="fw k" x="24" y="8" width="96" height="108" rx="5"/><line class="kt" style="stroke:var(--pink)" x1="36" y1="10" x2="36" y2="114"/>
    ${[26, 40, 54, 68, 82, 96].map((y, i) => `<line class="n draw" pathLength="100" style="stroke:var(--ink);stroke-width:2.4;animation-delay:${i * 0.25}s" x1="42" y1="${y}" x2="${i === 5 ? 86 : 110}" y2="${y}"/>`).join("")}</g>
  <g class="write"><g transform="rotate(38 128 70)"><rect class="fo k" x="122" y="16" width="14" height="62" rx="2"/><rect class="fp k" x="122" y="8" width="14" height="10" rx="3"/><path class="fb k" d="M122 78 L136 78 L129 94 Z"/><path class="fi" d="M126.5 88 L131.5 88 L129 94 Z"/></g></g>
  <g class="a pop"><circle class="fl k" cx="170" cy="30" r="22"/><circle class="n kt" cx="170" cy="30" r="16" stroke-dasharray="2 3"/><text x="170" y="27" font-size="11">1000</text><text x="170" y="40" font-size="7">NOTA</text></g>`;

  C["História"] = `
  <rect class="fw k" x="12" y="14" width="52" height="10" rx="2"/><path class="fw k" d="M16 24 Q38 32 60 24 L60 30 L16 30 Z"/>
  <rect class="fw k" x="20" y="30" width="36" height="72"/><path class="kt" d="M29 34 V98 M38 34 V98 M47 34 V98"/>
  <rect class="fw k" x="14" y="102" width="48" height="8" rx="2"/><rect class="fw k" x="10" y="110" width="56" height="7" rx="2"/>
  <rect class="fi" x="80" y="10" width="44" height="8" rx="3"/><rect class="fi" x="80" y="104" width="44" height="8" rx="3"/>
  <path class="fw" d="M86 18 L118 18 L104 60 L118 104 L86 104 L100 60 Z"/>
  <path class="fo stop a" d="M89 24 L115 24 L102 57 Z"/>
  <line class="stream" style="stroke:var(--orange);stroke-width:3" x1="102" y1="58" x2="102" y2="102"/>
  <path class="fo sbot a" d="M88 103 L116 103 L102 78 Z"/>
  <path class="n k" d="M86 18 L118 18 L104 60 L118 104 L86 104 L100 60 Z"/>
  <g class="a tilt"><rect class="fb k" x="142" y="34" width="44" height="58" rx="3"/><rect class="fo k" x="136" y="28" width="56" height="10" rx="5"/><rect class="fo k" x="136" y="88" width="56" height="10" rx="5"/>
    <path class="kt" d="M150 50 h28 M150 60 h28 M150 70 h20 M150 80 h24"/></g>`;

  C["Geografia"] = `
  <defs><clipPath id="cv-globo"><circle cx="66" cy="60" r="44"/></clipPath></defs>
  <circle class="fs" cx="66" cy="60" r="44"/>
  <g clip-path="url(#cv-globo)"><g class="wave" style="animation-duration:9s">${[0, 60, 120].map((o) => `<g transform="translate(${o} 0)"><path class="fl k" d="M24 34 q10 -12 24 -6 q10 6 4 16 q-6 8 2 16 q6 10 -6 14 q-14 2 -16 -10 q-2 -10 -10 -14 q-6 -6 2 -16 Z"/><path class="fb k" d="M62 72 q8 -6 16 0 q6 6 0 16 q-6 10 -14 4 q-8 -8 -2 -20 Z"/></g>`).join("")}</g>
    <ellipse class="n kt" cx="66" cy="60" rx="20" ry="44"/><line class="kt" x1="22" y1="60" x2="110" y2="60"/></g>
  <circle class="n k" cx="66" cy="60" r="44"/>
  <path class="n" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:4 5" d="M118 100 q24 -30 52 -6"/>
  <ellipse class="fi a shadow" cx="170" cy="104" rx="10" ry="3" opacity=".35"/>
  <g class="bounce"><path class="fp k" d="M170 100 C160 86 154 78 154 68 a16 16 0 0 1 32 0 C186 78 180 86 170 100 Z"/><circle class="fw k" cx="170" cy="68" r="6"/></g>
  <g class="a spin" style="animation-duration:10s"><path class="fv k" d="M160 22 L165 14 L170 22 L178 27 L170 32 L165 40 L160 32 L152 27 Z" transform="translate(-14 -10)"/></g>`;

  C["Filosofia e Sociologia"] = `
  <path class="fw k" d="M34 116 C20 92 16 52 30 34 C44 14 80 12 92 30 C98 40 98 48 96 54 L104 70 L96 74 C98 80 96 84 92 86 C92 92 86 96 78 96 L78 116 Z"/>
  <path class="fv k a spin" style="animation-duration:6s" d="${gear(50, 58, 13, 8)}"/><circle class="fw k" cx="50" cy="58" r="4.5"/>
  <path class="fp k a spinr" d="${gear(72, 38, 8, 6)}"/><circle class="fw k" cx="72" cy="38" r="3"/>
  <circle class="fw k a pop" cx="108" cy="40" r="4"/><circle class="fw k a pop" ${d(.3)} cx="118" cy="28" r="6"/>
  <g class="a bob"><path class="fw k" d="M128 4 h52 a12 12 0 0 1 12 12 v26 a12 12 0 0 1 -12 12 h-52 a12 12 0 0 1 -12 -12 v-26 a12 12 0 0 1 12 -12 Z"/>
    <circle class="fl glow" cx="154" cy="25" r="15"/><path class="fb k" d="M154 14 a9 9 0 0 1 5 16 v4 h-10 v-4 a9 9 0 0 1 5 -16 Z"/><rect class="fi" x="150" y="36" width="8" height="4" rx="1"/></g>
  ${[0, 1, 2].map((i) => { const x = 136 + i * 24, c = ["fo", "fp", "fv"][i]; return `<g class="a bob" style="animation-delay:${i * 0.4}s;animation-duration:2s"><circle class="${c} k" cx="${x}" cy="84" r="7"/><path class="${c} k" d="M${x - 11} 112 v-6 a11 11 0 0 1 22 0 v6 Z"/></g>`; }).join("")}`;

  window.capaSVG = (s) => (C[s] ? `<svg class="capa" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">${C[s]}</svg>` : "");
})();
