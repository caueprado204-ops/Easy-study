// Ilustrações originais do Easy Study para os módulos de Física.
(function () {
  const T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.s || 13}" font-weight="${o.w || 600}" fill="${o.c || "var(--ink)"}" text-anchor="${o.a || "middle"}" font-family="DM Sans,system-ui,sans-serif">${t}</text>`;
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
  const mk = (id, c = "var(--ink)") =>
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker></defs>`;
  const L = (x1, y1, x2, y2, m, c = "var(--ink)", o = {}) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${o.w || 2.4}" ${o.d ? `stroke-dasharray="${o.d}"` : ""} ${m ? `marker-end="url(#${m})"` : ""}/>`;
  const K = 'stroke="var(--ink)" stroke-width="1.6"';
  const F = (window.FIGS = window.FIGS || {});
  const eixos = (x0, y0, w, h, id, lx, ly) =>
    `${L(x0, y0, x0 + w, y0, id)}${L(x0, y0, x0, y0 - h, id)}${T(x0 + w, y0 + 18, lx, { a: "end", s: 12, c: "var(--muted)" })}${T(x0 + 6, y0 - h + 2, ly, { a: "start", s: 12, c: "var(--muted)" })}`;

  /* ---------- Mecânica ---------- */
  F.vetores_soma = () =>
    svg(620, 250, mk("vs1", "var(--violet)") + mk("vs2", "var(--orange)") + mk("vs3", "var(--ink)") + `
      ${T(100, 28, "Mesmo sentido", { w: 800 })}${L(30, 70, 110, 70, "vs1", "var(--violet)")}${L(110, 70, 170, 70, "vs2", "var(--orange)")}${L(30, 100, 170, 100, "vs3", "var(--ink)", { w: 3.4 })}
      ${T(100, 130, "R = a + b", { s: 12 })}
      ${T(310, 28, "Sentidos opostos", { w: 800 })}${L(240, 70, 380, 70, "vs1", "var(--violet)")}${L(380, 80, 300, 80, "vs2", "var(--orange)")}${L(240, 108, 300, 108, "vs3", "var(--ink)", { w: 3.4 })}
      ${T(310, 130, "R = a − b", { s: 12 })}
      ${T(515, 28, "Perpendiculares", { w: 800 })}${L(440, 200, 560, 200, "vs1", "var(--violet)")}${L(560, 200, 560, 110, "vs2", "var(--orange)")}${L(440, 200, 556, 113, "vs3", "var(--ink)", { w: 3.4 })}
      ${T(500, 220, "a", { c: "var(--violet)", w: 800 })}${T(575, 160, "b", { c: "var(--orange)", w: 800 })}${T(480, 145, "R", { w: 800 })}
      ${T(515, 244, "R² = a² + b²", { s: 12 })}
      ${T(150, 200, "3 + 4 = 7", { s: 12, c: "var(--muted)" })}${T(150, 220, "7 − 3 = 4", { s: 12, c: "var(--muted)" })}${T(150, 240, "3 e 4 a 90° → 5", { s: 12, c: "var(--muted)" })}`);

  F.graficos_mu = () =>
    svg(620, 250, mk("gm") + `
      ${eixos(50, 200, 230, 170, "gm", "t", "s")}${L(50, 170, 250, 50, "", "var(--violet)", { w: 4 })}${L(50, 120, 250, 175, "", "var(--orange)", { w: 4 })}
      ${T(255, 46, "v > 0", { a: "start", s: 12, c: "var(--violet)", w: 800 })}${T(255, 180, "v < 0", { a: "start", s: 12, c: "var(--orange)", w: 800 })}
      ${T(165, 236, "s × t: a inclinação é a velocidade", { s: 12, w: 800 })}
      ${eixos(350, 200, 230, 170, "gm", "t", "v")}<rect x="390" y="90" width="140" height="110" fill="var(--lime)" fill-opacity=".7"/>${L(350, 90, 560, 90, "", "var(--violet)", { w: 4 })}
      ${L(390, 90, 390, 200, "", "var(--ink)", { d: "4 4", w: 1.5 })}${L(530, 90, 530, 200, "", "var(--ink)", { d: "4 4", w: 1.5 })}${T(460, 150, "área = Δs", { w: 800 })}
      ${T(465, 236, "v × t: a área é o deslocamento", { s: 12, w: 800 })}`);

  F.lancamento = () => {
    const pts = [];
    for (let i = 0; i <= 20; i++) { const x = 50 + i * 25; const t = i / 20; pts.push(`${x},${215 - 640 * t * (1 - t) * 0.72}`); }
    return svg(620, 260, mk("la", "var(--violet)") + mk("lb", "var(--orange)") + mk("lc") + `
      <line x1="30" y1="215" x2="590" y2="215" stroke="var(--ink)" stroke-width="2"/>
      <polyline points="${pts.join(" ")}" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 5"/>
      ${L(50, 215, 110, 215, "la", "var(--violet)")}${L(50, 215, 50, 150, "lb", "var(--orange)")}${L(50, 215, 108, 155, "lc", "var(--ink)", { w: 3 })}
      ${T(118, 232, "v₀x", { a: "start", c: "var(--violet)", w: 800, s: 12 })}${T(38, 145, "v₀y", { c: "var(--orange)", w: 800, s: 12 })}
      ${L(300, 100, 360, 100, "la", "var(--violet)")}${T(300, 86, "no topo: só v₀x (vy = 0)", { s: 12, w: 800 })}
      ${L(300, 104, 300, 215, "", "var(--muted)", { d: "3 4", w: 1.4 })}${T(312, 170, "H", { a: "start", w: 800 })}
      ${L(500, 174, 556, 174, "la", "var(--violet)")}${L(500, 174, 500, 212, "lb", "var(--orange)")}
      ${T(300, 246, "alcance A = v₀² · sen 2θ / g  (máximo em 45°)", { w: 800 })}`);
  };

  F.transmissao = () =>
    svg(620, 240, mk("tr", "var(--violet)") + `
      <circle cx="170" cy="120" r="80" fill="var(--sky)" ${K}/><circle cx="450" cy="120" r="36" fill="var(--butter)" ${K}/>
      <line x1="170" y1="40" x2="450" y2="84" stroke="var(--ink)" stroke-width="3"/><line x1="170" y1="200" x2="450" y2="156" stroke="var(--ink)" stroke-width="3"/>
      <circle cx="170" cy="120" r="5" fill="var(--ink)"/><circle cx="450" cy="120" r="5" fill="var(--ink)"/>
      ${T(170, 150, "R₁ (grande)", { s: 12, w: 800 })}${T(450, 146, "R₂", { s: 12, w: 800 })}
      ${L(250, 46, 310, 56, "tr", "var(--violet)")}${T(300, 36, "mesma v linear", { s: 12, c: "var(--violet)", w: 800 })}
      ${T(170, 222, "gira mais devagar", { s: 12 })}${T(450, 180, "gira mais rápido", { s: 12 })}
      ${T(560, 110, "f₁·R₁ =", { a: "end", w: 800 })}${T(560, 132, "f₂·R₂", { a: "end", w: 800 })}`);

  F.forcas_bloco = () =>
    svg(620, 250, mk("fb1") + mk("fb2", "var(--violet)") + mk("fb3", "var(--orange)") + mk("fb4", "var(--pink)") + `
      <rect x="40" y="170" width="540" height="14" fill="var(--hair)" stroke="var(--ink)"/>
      <rect x="230" y="110" width="120" height="60" rx="6" fill="var(--butter)" ${K}/>
      ${L(290, 140, 290, 225, "fb1")}${T(300, 222, "P (peso)", { a: "start", w: 800, s: 12 })}
      ${L(290, 140, 290, 62, "fb2", "var(--violet)")}${T(300, 64, "N (normal)", { a: "start", w: 800, s: 12, c: "var(--violet)" })}
      <line x1="350" y1="140" x2="470" y2="140" stroke="var(--muted)" stroke-width="1.5"/>${L(350, 140, 440, 140, "fb3", "var(--orange)")}${T(440, 128, "T (tração do fio)", { w: 800, s: 12, c: "var(--orange)" })}
      ${L(230, 160, 160, 160, "fb4", "var(--pink)")}${T(150, 150, "atrito", { w: 800, s: 12, c: "var(--pink)" })}
      ${T(310, 22, "F_R = T − Fat = m · a   (horizontal)     N = P   (vertical)", { w: 800, s: 12 })}`);

  F.mola = () => {
    const zig = (x0, x1, y) => { let d = `M${x0} ${y}`; const n = 12, w = (x1 - x0) / n; for (let i = 1; i <= n; i++) d += ` L${x0 + i * w - w / 2} ${y + (i % 2 ? -12 : 12)} L${x0 + i * w} ${y}`; return `<path d="${d}" fill="none" stroke="var(--ink)" stroke-width="2"/>`; };
    return svg(620, 230, mk("mo", "var(--orange)") + `
      <rect x="30" y="30" width="16" height="170" fill="var(--hair)" stroke="var(--ink)"/>
      ${zig(46, 250, 70)}<rect x="250" y="50" width="50" height="40" rx="5" fill="var(--sky)" ${K}/>${T(380, 76, "posição natural", { a: "start", s: 12, c: "var(--muted)" })}
      ${zig(46, 350, 160)}<rect x="350" y="140" width="50" height="40" rx="5" fill="var(--sky)" ${K}/>
      ${L(275, 105, 275, 200, "", "var(--muted)", { d: "4 4", w: 1.4 })}${L(280, 196, 372, 196, "mo", "var(--orange)")}${T(326, 214, "x (deformação)", { s: 12, c: "var(--orange)", w: 800 })}
      ${L(350, 128, 300, 128, "mo", "var(--orange)")}${T(470, 160, "F = k · x", { a: "start", w: 800, s: 16 })}${T(470, 182, "a mola puxa de volta", { a: "start", s: 12 })}`);
  };

  F.lombada = () =>
    svg(620, 240, mk("lo1") + mk("lo2", "var(--violet)") + `
      <path d="M20 150 Q150 40 280 150" fill="none" stroke="var(--ink)" stroke-width="3"/>
      <circle cx="150" cy="80" r="14" fill="var(--butter)" ${K}/>${L(150, 94, 150, 150, "lo1")}${L(150, 66, 150, 40, "lo2", "var(--violet)")}
      ${T(162, 146, "P", { a: "start", w: 800 })}${T(162, 44, "N", { a: "start", w: 800, c: "var(--violet)" })}${T(150, 190, "Lombada: N < P", { w: 800 })}${T(150, 210, "P − N = m·v²/R", { s: 12 })}
      <path d="M340 70 Q470 200 600 70" fill="none" stroke="var(--ink)" stroke-width="3"/>
      <circle cx="470" cy="122" r="14" fill="var(--butter)" ${K}/>${L(470, 136, 470, 170, "lo1")}${L(470, 108, 470, 40, "lo2", "var(--violet)")}
      ${T(482, 168, "P", { a: "start", w: 800 })}${T(482, 48, "N", { a: "start", w: 800, c: "var(--violet)" })}${T(470, 200, "Valeta: N > P", { w: 800 })}${T(470, 220, "N − P = m·v²/R", { s: 12 })}`);

  F.colisao = () =>
    svg(620, 210, mk("co", "var(--violet)") + `
      ${T(150, 28, "Antes", { w: 800 })}<rect x="40" y="70" width="80" height="44" rx="8" fill="var(--sky)" ${K}/><rect x="190" y="70" width="80" height="44" rx="8" fill="var(--butter)" ${K}/>
      ${T(80, 97, "m", { w: 800 })}${T(230, 97, "m", { w: 800 })}${L(80, 130, 140, 130, "co", "var(--violet)")}${T(110, 150, "v", { c: "var(--violet)", w: 800 })}${T(230, 150, "parado", { s: 12 })}
      ${T(460, 28, "Depois (grudados)", { w: 800 })}<rect x="380" y="70" width="80" height="44" rx="8" fill="var(--sky)" ${K}/><rect x="460" y="70" width="80" height="44" rx="8" fill="var(--butter)" ${K}/>
      ${L(430, 130, 470, 130, "co", "var(--violet)")}${T(450, 150, "v/2", { c: "var(--violet)", w: 800 })}
      ${T(310, 192, "Q antes = Q depois:  m·v = 2m·(v/2)   •   metade da energia cinética se perde", { s: 12, w: 800 })}`);

  F.alavancas = () => {
    const al = (x, apoio, forca, carga, nome, ex) => {
      const pos = { 0: x + 10, 1: x + 90, 2: x + 170 };
      return `<line x1="${x}" y1="110" x2="${x + 180}" y2="110" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
        <path d="M${pos[apoio] - 14} 136 L${pos[apoio]} 112 L${pos[apoio] + 14} 136 Z" fill="var(--butter)" ${K}/>
        <rect x="${pos[carga] - 14}" y="80" width="28" height="28" rx="4" fill="var(--sky)" ${K}/>
        ${L(pos[forca], 50, pos[forca], 104, "alv", "var(--orange)")}
        ${T(x + 90, 168, nome, { w: 800 })}${T(x + 90, 188, ex, { s: 11.5, c: "var(--muted)" })}`;
    };
    return svg(620, 220, mk("alv", "var(--orange)") + `
      ${al(15, 1, 0, 2, "Interfixa", "gangorra, tesoura")}${al(220, 0, 2, 1, "Inter-resistente", "carrinho de mão")}${al(425, 0, 1, 2, "Interpotente", "pinça, antebraço")}
      ${T(310, 24, "▲ apoio    ■ resistência    ↓ força", { s: 12, w: 800 })}`);
  };

  F.kepler = () =>
    svg(620, 300, `
      <ellipse cx="310" cy="140" rx="200" ry="120" fill="none" stroke="var(--ink)" stroke-width="2"/>
      <path d="M150 140 L170.7 53.9 A200 120 0 0 0 116.2 169.7 Z" fill="var(--violet)" fill-opacity=".55" stroke="var(--violet)"/>
      <path d="M150 140 L509.4 149.3 A200 120 0 0 0 509.4 130.7 Z" fill="var(--pink)" fill-opacity=".6" stroke="var(--pink)"/>
      <circle cx="150" cy="140" r="18" fill="var(--butter)" ${K}/>${T(150, 145, "Sol", { s: 11, w: 800 })}
      <circle cx="110" cy="140" r="8" fill="var(--sky)" ${K}/><circle cx="510" cy="140" r="8" fill="var(--sky)" ${K}/>
      ${T(100, 210, "periélio: mais rápido", { s: 12, w: 800, c: "var(--violet)" })}${T(520, 180, "afélio: mais lento", { s: 12, w: 800, c: "var(--pink)", a: "end" })}
      ${T(310, 288, "As duas áreas coloridas são iguais e varridas no mesmo tempo (2ª lei de Kepler)", { s: 12, w: 800 })}`);

  /* ---------- Termologia ---------- */
  F.escalas = () => {
    const termo = (x, nome, a, b, z) => `<rect x="${x - 14}" y="40" width="28" height="170" rx="14" fill="#fff" ${K}/><circle cx="${x}" cy="215" r="18" fill="var(--orange)" ${K}/>
      <rect x="${x - 6}" y="90" width="12" height="125" fill="var(--orange)"/>${T(x, 30, nome, { w: 800 })}
      ${T(x + 24, 55, b, { a: "start", s: 12, w: 800 })}${T(x + 24, 155, a, { a: "start", s: 12, w: 800 })}${z ? T(x + 24, 200, z, { a: "start", s: 12, c: "var(--violet)" }) : ""}`;
    return svg(620, 250, `
      <line x1="40" y1="60" x2="560" y2="60" stroke="var(--muted)" stroke-dasharray="4 4"/><line x1="40" y1="160" x2="560" y2="160" stroke="var(--muted)" stroke-dasharray="4 4"/>
      ${T(42, 54, "água ferve", { a: "start", s: 11, c: "var(--muted)" })}${T(42, 154, "gelo funde", { a: "start", s: 11, c: "var(--muted)" })}
      ${termo(170, "Celsius", "0 °C", "100 °C")}${termo(320, "Fahrenheit", "32 °F", "212 °F")}${termo(470, "Kelvin", "273 K", "373 K", "0 K = zero absoluto")}
      ${T(310, 246, "C/5 = (F − 32)/9      K = C + 273", { w: 800 })}`);
  };

  F.curva_aquec = () =>
    svg(620, 260, mk("cq") + `
      ${eixos(60, 220, 520, 190, "cq", "calor fornecido", "T (°C)")}
      <polyline points="60,200 120,160 230,160 290,90 470,90 540,40" fill="none" stroke="var(--violet)" stroke-width="4"/>
      ${T(52, 164, "0", { a: "end", s: 12 })}${T(52, 94, "100", { a: "end", s: 12 })}
      ${T(175, 150, "fusão (Q = m·L)", { s: 12, w: 800, c: "var(--orange)" })}${T(380, 80, "ebulição (Q = m·L)", { s: 12, w: 800, c: "var(--orange)" })}
      ${T(118, 196, "gelo", { a: "start", s: 11 })}${T(262, 140, "água", { a: "start", s: 11 })}${T(500, 74, "vapor", { a: "start", s: 11 })}
      ${T(320, 252, "Trechos inclinados: calor sensível (Q = m·c·ΔT)   •   patamares: temperatura constante", { s: 12 })}`);

  F.maquina_termica = () =>
    svg(620, 250, mk("mt", "var(--orange)") + mk("mt2", "var(--violet)") + `
      <rect x="40" y="20" width="200" height="56" rx="14" fill="var(--orange)" ${K}/>${T(140, 54, "Fonte quente (T₁)", { w: 800, c: "#fff" })}
      <circle cx="140" cy="140" r="38" fill="var(--butter)" ${K}/>${T(140, 145, "máquina", { w: 800, s: 12 })}
      <rect x="40" y="194" width="200" height="50" rx="14" fill="var(--sky)" ${K}/>${T(140, 224, "Fonte fria (T₂)", { w: 800 })}
      ${L(140, 78, 140, 98, "mt", "var(--orange)", { w: 6 })}${T(152, 92, "Q₁", { a: "start", w: 800, c: "var(--orange)" })}
      ${L(140, 180, 140, 190, "mt", "var(--orange)", { w: 4 })}${T(152, 190, "Q₂", { a: "start", w: 800 })}
      ${L(180, 140, 270, 140, "mt2", "var(--violet)", { w: 5 })}${T(290, 145, "trabalho τ = Q₁ − Q₂", { a: "start", w: 800, c: "var(--violet)" })}
      ${T(290, 190, "rendimento η = τ / Q₁", { a: "start", w: 800 })}${T(290, 212, "Carnot: η = 1 − T₂/T₁ (em kelvin)", { a: "start", s: 12 })}${T(290, 232, "nunca chega a 100% (2ª lei)", { a: "start", s: 12, c: "var(--muted)" })}`);

  /* ---------- Óptica e ondas ---------- */
  F.eclipse = () =>
    svg(620, 240, `
      <circle cx="70" cy="120" r="56" fill="var(--butter)" ${K}/>${T(70, 125, "Sol", { w: 800 })}
      <path d="M70 64 L560 108 L560 132 L70 176 Z" fill="var(--hair)" opacity=".55"/>
      <path d="M300 104 L560 90 L560 150 L300 136 Z" fill="var(--muted)" opacity=".35"/>
      <path d="M300 104 L540 117 L540 123 L300 136 Z" fill="var(--ink)" opacity=".75"/>
      <circle cx="300" cy="120" r="16" fill="#cfcfcf" ${K}/>${T(300, 92, "Lua", { s: 12, w: 800 })}
      <circle cx="560" cy="120" r="44" fill="var(--sky)" ${K}/>${T(560, 186, "Terra", { s: 12, w: 800 })}
      ${T(470, 70, "penumbra: eclipse parcial", { s: 12 })}${T(430, 210, "sombra: eclipse total (lua nova)", { s: 12, w: 800 })}`);

  F.reflexao = () =>
    svg(620, 230, mk("rf", "var(--orange)") + `
      <rect x="80" y="180" width="460" height="14" fill="var(--sky)" ${K}/>${T(310, 216, "espelho", { s: 12, c: "var(--muted)" })}
      ${L(310, 180, 310, 30, "", "var(--muted)", { d: "5 5", w: 1.5 })}${T(310, 22, "normal", { s: 12, c: "var(--muted)" })}
      ${L(170, 50, 306, 176, "rf", "var(--orange)", { w: 3 })}${L(310, 180, 448, 52, "rf", "var(--orange)", { w: 3 })}
      <path d="M296 150 A32 32 0 0 1 310 147" fill="none" stroke="var(--ink)" stroke-width="2"/><path d="M310 147 A32 32 0 0 1 324 150" fill="none" stroke="var(--ink)" stroke-width="2"/>
      ${T(285, 140, "i", { w: 800 })}${T(335, 140, "r", { w: 800 })}${T(170, 40, "raio incidente", { s: 12 })}${T(450, 40, "raio refletido", { s: 12 })}
      ${T(500, 120, "i = r", { w: 800, s: 16 })}`);

  F.espelho_concavo = () =>
    svg(620, 260, mk("ec", "var(--orange)") + mk("ec2", "var(--violet)") + mk("ec3", "var(--pink)") + `
      <line x1="20" y1="140" x2="600" y2="140" stroke="var(--hair)" stroke-width="2"/>
      <path d="M548 30 Q590 140 548 250" fill="none" stroke="var(--ink)" stroke-width="4"/>
      <circle cx="320" cy="140" r="4" fill="var(--ink)"/>${T(320, 128, "C", { w: 800 })}<circle cx="440" cy="140" r="4" fill="var(--ink)"/>${T(452, 130, "F", { w: 800 })}${T(578, 132, "V", { w: 800 })}
      ${L(150, 140, 150, 82, "ec2", "var(--violet)", { w: 4 })}${T(150, 160, "objeto", { s: 12 })}
      ${L(150, 80, 552, 80, "", "var(--orange)")}${L(552, 80, 400, 161.5, "ec", "var(--orange)")}
      ${L(150, 80, 550, 163, "", "var(--orange)")}${L(550, 163, 401, 163, "ec", "var(--orange)")}
      ${L(397, 140, 397, 160, "ec3", "var(--pink)", { w: 4 })}${T(397, 196, "imagem real, invertida e menor", { s: 12, w: 800, c: "var(--pink)" })}
      ${T(310, 240, "objeto além de C • 1/f = 1/p + 1/p'", { s: 12 })}`);

  F.refracao = () =>
    svg(620, 250, mk("rr", "var(--orange)") + `
      <rect x="40" y="20" width="540" height="105" fill="#fff"/><rect x="40" y="125" width="540" height="105" fill="var(--sky)" opacity=".7"/>
      <line x1="40" y1="125" x2="580" y2="125" stroke="var(--ink)" stroke-width="2"/>
      ${T(60, 44, "ar (n ≈ 1)", { a: "start", s: 12, w: 800 })}${T(60, 220, "água (n ≈ 1,33)", { a: "start", s: 12, w: 800 })}
      ${L(310, 20, 310, 230, "", "var(--muted)", { d: "5 5", w: 1.5 })}
      ${L(170, 30, 306, 122, "rr", "var(--orange)", { w: 3 })}${L(310, 125, 380, 226, "rr", "var(--orange)", { w: 3 })}
      ${T(260, 80, "θ₁", { w: 800 })}${T(335, 180, "θ₂", { w: 800 })}
      ${T(440, 70, "n₁ · sen θ₁ = n₂ · sen θ₂", { w: 800 })}${T(440, 180, "aproxima-se da normal", { s: 12 })}`);

  F.visao = () => {
    const olho = (x, foco, nome, corr, cor) => `<ellipse cx="${x + 110}" cy="110" rx="90" ry="62" fill="#fff" ${K}/><circle cx="${x + 200}" cy="110" r="0"/>
      <path d="M${x + 22} 80 Q${x + 34} 110 ${x + 22} 140 Q${x + 10} 110 ${x + 22} 80 Z" fill="var(--sky)" ${K}/>
      <line x1="${x + 199}" y1="70" x2="${x + 199}" y2="150" stroke="var(--pink)" stroke-width="4"/>
      ${L(x - 30, 90, x + 22, 90, "", "var(--orange)")}${L(x - 30, 130, x + 22, 130, "", "var(--orange)")}${L(x + 22, 90, x + foco, 110, "", "var(--orange)")}${L(x + 22, 130, x + foco, 110, "", "var(--orange)")}
      <circle cx="${x + foco}" cy="110" r="5" fill="var(--violet)"/>${T(x + 110, 30, nome, { w: 800 })}${T(x + 110, 200, corr, { s: 12, w: 800, c: cor })}`;
    return svg(620, 230, `${olho(30, 150, "Miopia: foco antes da retina", "corrige com lente divergente", "var(--violet)")}${olho(340, 240, "Hipermetropia: foco depois", "corrige com lente convergente", "var(--violet)")}
      ${T(310, 224, "retina em rosa", { s: 11, c: "var(--muted)" })}`);
  };

  F.espectro = () => {
    const faixas = [["rádio", "var(--hair)"], ["micro-ondas", "var(--sky)"], ["infravermelho", "#f3a07a"], ["visível", ""], ["ultravioleta", "var(--lilac)"], ["raios X", "#9aa6d6"], ["gama", "var(--violet)"]];
    const w = 560 / faixas.length;
    return svg(620, 220, mk("es") + `
      ${faixas.map(([n, c], i) => (c ? `<rect x="${30 + i * w}" y="60" width="${w}" height="60" fill="${c}" ${K}/>` : `<defs><linearGradient id="vis"><stop offset="0" stop-color="#e53935"/><stop offset=".25" stop-color="#fb8c00"/><stop offset=".45" stop-color="#fdd835"/><stop offset=".65" stop-color="#43a047"/><stop offset=".85" stop-color="#1e88e5"/><stop offset="1" stop-color="#8e24aa"/></linearGradient></defs><rect x="${30 + i * w}" y="60" width="${w}" height="60" fill="url(#vis)" ${K}/>`) + T(30 + i * w + w / 2, 142, n, { s: 11, w: 800 })).join("")}
      ${L(40, 170, 580, 170, "es")}${T(310, 192, "frequência e energia aumentam →   (comprimento de onda diminui)", { s: 12, w: 800 })}
      ${T(30 + 4.5 * w + w, 46, "ionizantes", { s: 12, w: 800, c: "var(--pink)" })}<line x1="${30 + 4 * w}" y1="52" x2="${590}" y2="52" stroke="var(--pink)" stroke-width="3"/>`);
  };

  F.interferencia = () => {
    const onda = (y, a, fase, cor) => { let d = ""; for (let x = 0; x <= 240; x += 4) d += `${d ? "L" : "M"}${x} ${y - a * Math.sin(x / 240 * 4 * Math.PI + fase)}`; return `<path d="${d}" fill="none" stroke="${cor}" stroke-width="3"/>`; };
    return svg(620, 260, `
      <g transform="translate(30,0)">${T(120, 22, "Construtiva (em fase)", { w: 800 })}${onda(60, 16, 0, "var(--violet)")}${onda(110, 16, 0, "var(--orange)")}${onda(190, 32, 0, "var(--ink)")}${T(120, 245, "amplitudes se somam", { s: 12 })}</g>
      <g transform="translate(350,0)">${T(120, 22, "Destrutiva (oposição de fase)", { w: 800 })}${onda(60, 16, 0, "var(--violet)")}${onda(110, 16, Math.PI, "var(--orange)")}<line x1="0" y1="190" x2="240" y2="190" stroke="var(--ink)" stroke-width="3"/>${T(120, 245, "ondas se anulam", { s: 12 })}</g>
      ${T(310, 150, "+", { s: 20, w: 800 })}`);
  };

  F.estacionaria = () => {
    const harm = (y, n) => { let a = "", b = ""; for (let x = 0; x <= 400; x += 4) { const v = 18 * Math.sin(n * Math.PI * x / 400); a += `${a ? "L" : "M"}${x + 110} ${y - v}`; b += `${b ? "L" : "M"}${x + 110} ${y + v}`; } return `<path d="${a}" fill="none" stroke="var(--violet)" stroke-width="2.6"/><path d="${b}" fill="none" stroke="var(--violet)" stroke-width="2.6" opacity=".45"/><circle cx="110" cy="${y}" r="4" fill="var(--ink)"/><circle cx="510" cy="${y}" r="4" fill="var(--ink)"/>${T(98, y + 5, n + "º", { a: "end", w: 800 })}${T(522, y + 5, n === 1 ? "λ = 2L" : n === 2 ? "λ = L" : "λ = 2L/3", { a: "start", s: 12 })}`; };
    return svg(620, 230, `${harm(45, 1)}${harm(115, 2)}${harm(185, 3)}${T(310, 224, "nós nas pontas presas • f_n = n · v / 2L", { s: 12, w: 800 })}`);
  };

  /* ---------- Eletricidade e magnetismo ---------- */
  F.campo_eletrico = () => {
    const linhas = [];
    for (let i = -2; i <= 2; i++) linhas.push(`<path d="M190 120 C 260 ${120 + i * 55}, 360 ${120 + i * 55}, 430 120" fill="none" stroke="var(--violet)" stroke-width="2" marker-end="url(#ce)"/>`);
    return svg(620, 240, mk("ce", "var(--violet)") + `${linhas.join("")}
      <circle cx="170" cy="120" r="26" fill="var(--orange)" ${K}/>${T(170, 127, "+", { s: 24, w: 800, c: "#fff" })}
      <circle cx="450" cy="120" r="26" fill="var(--sky)" ${K}/>${T(450, 128, "−", { s: 26, w: 800 })}
      ${T(310, 232, "As linhas saem da carga positiva e chegam à negativa", { s: 12, w: 800 })}`);
  };

  F.ohm = () =>
    svg(620, 240, mk("oh") + `
      ${eixos(50, 200, 230, 170, "oh", "i (A)", "U (V)")}${L(50, 200, 250, 50, "", "var(--violet)", { w: 4 })}${T(165, 228, "ôhmico: reta, U = R·i", { s: 12, w: 800 })}
      ${eixos(350, 200, 230, 170, "oh", "i (A)", "U (V)")}<path d="M350 200 Q420 70 560 50" fill="none" stroke="var(--orange)" stroke-width="4"/>${T(465, 228, "não ôhmico: curva", { s: 12, w: 800 })}`);

  F.conta_luz = () =>
    svg(620, 200, mk("cl", "var(--violet)") + `
      <rect x="30" y="50" width="150" height="90" rx="14" fill="var(--butter)" ${K}/>${T(105, 88, "Potência", { w: 800 })}${T(105, 110, "5,5 kW", { s: 12 })}
      ${T(205, 100, "×", { s: 22, w: 800 })}
      <rect x="230" y="50" width="150" height="90" rx="14" fill="var(--sky)" ${K}/>${T(305, 88, "Tempo", { w: 800 })}${T(305, 110, "15 h no mês", { s: 12 })}
      ${L(390, 95, 425, 95, "cl", "var(--violet)", { w: 3 })}
      <rect x="430" y="50" width="160" height="90" rx="14" fill="var(--lime)" ${K}/>${T(510, 88, "Energia", { w: 800 })}${T(510, 110, "82,5 kWh", { s: 12 })}
      ${T(310, 180, "× tarifa (R$/kWh) = valor da conta", { w: 800 })}`);

  F.campo_fio = () =>
    svg(620, 240, mk("cf", "var(--violet)") + mk("cf2", "var(--orange)") + `
      <ellipse cx="200" cy="120" rx="110" ry="34" fill="none" stroke="var(--violet)" stroke-width="2.4"/><ellipse cx="200" cy="120" rx="65" ry="20" fill="none" stroke="var(--violet)" stroke-width="2.4"/>
      <path d="M90 118 L90 124" stroke="var(--violet)" stroke-width="2.4" marker-end="url(#cf)"/>
      ${L(200, 220, 200, 22, "cf2", "var(--orange)", { w: 5 })}${T(212, 32, "corrente i", { a: "start", w: 800, c: "var(--orange)" })}
      ${T(212, 200, "linhas de campo: circunferências", { a: "start", s: 12, w: 800, c: "var(--violet)" })}
      ${T(380, 90, "Regra da mão direita:", { a: "start", w: 800 })}${T(380, 112, "polegar no sentido da corrente,", { a: "start", s: 12 })}${T(380, 132, "os dedos mostram o campo.", { a: "start", s: 12 })}
      ${T(380, 170, "B = µ₀ · i / (2π · d)", { a: "start", w: 800 })}`);

  F.motor = () =>
    svg(620, 240, mk("mm", "var(--orange)") + `
      <rect x="40" y="60" width="90" height="120" rx="10" fill="var(--pink)" ${K}/>${T(85, 125, "N", { s: 22, w: 800, c: "#fff" })}
      <rect x="490" y="60" width="90" height="120" rx="10" fill="var(--sky)" ${K}/>${T(535, 125, "S", { s: 22, w: 800 })}
      <path d="M220 80 H400 V160 H220 Z" fill="none" stroke="var(--ink)" stroke-width="4"/>
      ${L(220, 80, 220, 30, "mm", "var(--orange)", { w: 4 })}${L(400, 160, 400, 210, "mm", "var(--orange)", { w: 4 })}
      ${T(210, 36, "F para cima", { a: "end", s: 12, w: 800, c: "var(--orange)" })}${T(388, 214, "F para baixo", { a: "end", s: 12, w: 800, c: "var(--orange)" })}
      <path d="M290 40 A70 30 0 0 1 340 40" fill="none" stroke="var(--violet)" stroke-width="3" marker-end="url(#mm)"/>${T(315, 26, "gira", { w: 800, c: "var(--violet)" })}
      ${T(310, 236, "Corrente na espira + campo do ímã = torque (energia elétrica → mecânica)", { s: 12, w: 800 })}`);

  F.transformador = () => {
    const bob = (x, n) => Array.from({ length: n }, (_, i) => `<ellipse cx="${x}" cy="${70 + i * (120 / n)}" rx="26" ry="6" fill="none" stroke="var(--orange)" stroke-width="3"/>`).join("");
    return svg(620, 240, `
      <path d="M170 40 H450 V200 H170 Z M210 80 V160 H410 V80 Z" fill="#b9bec7" fill-rule="evenodd" ${K}/>
      ${bob(190, 10)}${bob(430, 4)}
      ${T(120, 110, "primário", { w: 800 })}${T(120, 130, "N₁ = 10", { s: 12 })}${T(510, 110, "secundário", { w: 800 })}${T(510, 130, "N₂ = 4", { s: 12 })}
      ${T(310, 124, "núcleo de ferro", { s: 12, c: "var(--muted)" })}
      ${T(310, 230, "U₁/U₂ = N₁/N₂   •   U₁·i₁ = U₂·i₂   (só com corrente alternada)", { s: 12, w: 800 })}`);
  };

  F.fotoeletrico = () =>
    svg(620, 240, mk("fe", "var(--violet)") + mk("fe2", "var(--orange)") + `
      <rect x="60" y="170" width="500" height="34" fill="#c9ced6" ${K}/>${T(310, 193, "metal", { w: 800 })}
      <path d="M90 40 q10 -10 20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="#e53935" stroke-width="3"/>${L(190, 60, 220, 160, "fe2", "#e53935")}${T(140, 30, "luz vermelha (f baixa)", { s: 12, w: 800, c: "#e53935" })}
      ${T(230, 140, "nenhum elétron sai", { a: "start", s: 12 })}
      <path d="M360 40 q5 -10 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" fill="none" stroke="var(--violet)" stroke-width="3"/>${L(440, 60, 450, 160, "fe", "var(--violet)")}${T(410, 30, "ultravioleta (f alta)", { s: 12, w: 800, c: "var(--violet)" })}
      <circle cx="500" cy="120" r="9" fill="var(--sky)" ${K}/>${T(500, 124, "e⁻", { s: 9, w: 800 })}${L(470, 160, 494, 128, "", "var(--ink)", { w: 1.6, d: "3 3" })}${T(596, 100, "elétron arrancado", { a: "end", s: 12 })}
      ${T(310, 232, "E do fóton = h · f   •   depende da frequência, não da intensidade", { s: 12, w: 800 })}`);
})();
