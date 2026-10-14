// Ilustrações originais do Easy Study para os módulos de Matemática.
(function () {
  const T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.s || 13}" font-weight="${o.w || 600}" fill="${o.c || "var(--ink)"}" text-anchor="${o.a || "middle"}" font-family="DM Sans,system-ui,sans-serif">${t}</text>`;
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
  const arrow = (id, c = "var(--ink)") =>
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker></defs>`;
  const C = ["var(--butter)", "var(--lilac)", "var(--mint)", "var(--pink)", "var(--sky)", "var(--lime)"];
  const F = (window.FIGS = window.FIGS || {});
  // Eixos cartesianos: origem (ox, oy), escala u px por unidade
  const eixos = (id, w, h, ox, oy, lx = "x", ly = "y") => arrow(id) +
    `<line x1="10" y1="${oy}" x2="${w - 10}" y2="${oy}" stroke="var(--ink)" stroke-width="1.6" marker-end="url(#${id})"/><line x1="${ox}" y1="${h - 10}" x2="${ox}" y2="10" stroke="var(--ink)" stroke-width="1.6" marker-end="url(#${id})"/>` +
    T(w - 16, oy + 18, lx, { c: "var(--muted)" }) + T(ox + 14, 22, ly, { c: "var(--muted)" });
  const curva = (fn, x0, x1, ox, oy, u, cor, extra = "") => {
    let d = "";
    for (let x = x0; x <= x1 + 1e-9; x += (x1 - x0) / 120) {
      const y = fn(x);
      if (!isFinite(y) || Math.abs(y) > 50) continue;
      d += (d ? "L" : "M") + (ox + x * u).toFixed(1) + " " + (oy - y * u).toFixed(1);
    }
    return `<path d="${d}" fill="none" stroke="${cor}" stroke-width="3.5" ${extra}/>`;
  };

  F.conjuntos = () =>
    svg(620, 290, `
    <ellipse cx="300" cy="135" rx="290" ry="122" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5"/>
    <ellipse cx="250" cy="140" rx="215" ry="100" fill="var(--lilac)" stroke="var(--ink)" stroke-width="1.5"/>
    <ellipse cx="205" cy="145" rx="150" ry="78" fill="var(--mint)" stroke="var(--ink)" stroke-width="1.5"/>
    <ellipse cx="165" cy="150" rx="88" ry="52" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>
    ${T(165, 140, "ℕ", { s: 20, w: 800 })}${T(165, 165, "0, 1, 2, 3…", { s: 11 })}
    ${T(300, 128, "ℤ", { s: 20, w: 800 })}${T(300, 150, "−3, −1", { s: 11 })}
    ${T(405, 118, "ℚ", { s: 20, w: 800 })}${T(410, 140, "½, 0,25, −0,3̅", { s: 11 })}
    ${T(510, 112, "ℝ", { s: 20, w: 800 })}${T(522, 135, "√2, π, e", { s: 11 })}
    ${T(522, 152, "(irracionais)", { s: 10 })}
    ${T(300, 282, "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ", { w: 800, s: 14, c: "var(--violet)" })}`);

  F.explog = () => {
    const w = 460, h = 300, ox = 200, oy = 200, u = 40;
    return svg(w, h, eixos("aex", w, h, ox, oy) +
      `<line x1="${ox - 4.5 * u}" y1="${oy + 4.5 * u}" x2="${ox + 5 * u}" y2="${oy - 5 * u}" stroke="var(--muted)" stroke-dasharray="5 5"/>` +
      curva((x) => Math.pow(2, x), -4.5, 2.4, ox, oy, u, "var(--violet)") +
      curva((x) => Math.log2(x), 0.06, 6, ox, oy, u, "var(--orange)") +
      `<circle cx="${ox}" cy="${oy - u}" r="5" fill="var(--violet)"/><circle cx="${ox + u}" cy="${oy}" r="5" fill="var(--orange)"/>` +
      T(ox + 2.4 * u + 6, oy - 4.6 * u, "y = 2ˣ", { a: "start", w: 800, c: "var(--violet)" }) +
      T(ox + 4.2 * u, oy - 2.9 * u, "y = log₂ x", { a: "start", w: 800, c: "var(--orange)" }) +
      T(ox + 4.6 * u, oy - 5.2 * u + 8, "y = x", { a: "start", s: 11, c: "var(--muted)" }) +
      T(ox - 6, oy - u - 8, "(0, 1)", { a: "end", s: 11 }) + T(ox + u + 4, oy + 18, "(1, 0)", { a: "start", s: 11 }));
  };

  F.modular = () => {
    const w = 380, h = 240, ox = 190, oy = 200, u = 36;
    return svg(w, h, eixos("amo", w, h, ox, oy) + curva((x) => Math.abs(x), -4.6, 4.6, ox, oy, u, "var(--violet)") +
      T(ox + 0.5 * u, oy - 4.6 * u, "y = |x|", { a: "start", w: 800, c: "var(--violet)" }) + T(ox, oy + 18, "0", { s: 11 }));
  };

  F.sinais = () =>
    svg(620, 200, `
    ${T(20, 34, "f(x) = x − 1", { a: "start", w: 800 })}${T(20, 84, "g(x) = x − 4", { a: "start", w: 800 })}${T(20, 134, "f · g", { a: "start", w: 800, c: "var(--violet)" })}
    ${[34, 84, 134].map((y) => `<line x1="150" y1="${y - 5}" x2="600" y2="${y - 5}" stroke="var(--hair)" stroke-width="2"/>`).join("")}
    <line x1="300" y1="14" x2="300" y2="160" stroke="var(--ink)" stroke-dasharray="4 4"/><line x1="460" y1="14" x2="460" y2="160" stroke="var(--ink)" stroke-dasharray="4 4"/>
    ${T(300, 180, "1", { w: 800 })}${T(460, 180, "4", { w: 800 })}
    ${T(225, 30, "−", { s: 20, c: "var(--bad)" })}${T(380, 30, "+", { s: 20, c: "var(--ok)" })}${T(530, 30, "+", { s: 20, c: "var(--ok)" })}
    ${T(225, 80, "−", { s: 20, c: "var(--bad)" })}${T(380, 80, "−", { s: 20, c: "var(--bad)" })}${T(530, 80, "+", { s: 20, c: "var(--ok)" })}
    ${T(225, 130, "+", { s: 20, c: "var(--ok)" })}${T(380, 130, "−", { s: 20, c: "var(--bad)" })}${T(530, 130, "+", { s: 20, c: "var(--ok)" })}
    ${T(380, 198, "(x − 1)(x − 4) < 0  ⇔  1 < x < 4", { w: 800, c: "var(--violet)" })}`);

  F.pa_pg = () => {
    const pa = [2, 4, 6, 8, 10, 12], pg = [1, 2, 4, 8, 16, 32];
    const bar = (vals, x0, cor, max) => vals.map((v, i) => `<rect x="${x0 + i * 40}" y="${220 - (v / max) * 170}" width="30" height="${(v / max) * 170}" rx="5" fill="${cor}" stroke="var(--ink)" stroke-width="1.2"/>${T(x0 + i * 40 + 15, 214 - (v / max) * 170, String(v), { s: 11, w: 800 })}`).join("");
    return svg(640, 270, bar(pa, 40, "var(--sky)", 32) + bar(pg, 360, "var(--pink)", 32) +
      `<line x1="30" y1="220" x2="290" y2="220" stroke="var(--ink)" stroke-width="2"/><line x1="350" y1="220" x2="610" y2="220" stroke="var(--ink)" stroke-width="2"/>` +
      T(160, 248, "PA de razão 2: soma sempre 2", { w: 800 }) + T(480, 248, "PG de razão 2: multiplica por 2", { w: 800 }) +
      T(160, 266, "cresce em linha reta", { s: 11, c: "var(--muted)" }) + T(480, 266, "cresce exponencialmente", { s: 11, c: "var(--muted)" }));
  };

  F.matriz_mult = () =>
    svg(640, 210, `
    ${T(320, 24, "Linha da 1ª × coluna da 2ª: multiplica termo a termo e soma", { w: 800 })}
    <rect x="30" y="60" width="150" height="100" rx="10" fill="var(--white)" stroke="var(--ink)" stroke-width="1.5"/><rect x="38" y="70" width="134" height="34" rx="8" fill="var(--butter)"/>
    ${T(70, 92, "1", { s: 16, w: 800 })}${T(140, 92, "2", { s: 16, w: 800 })}${T(70, 142, "3", { s: 16 })}${T(140, 142, "4", { s: 16 })}
    ${T(205, 116, "·", { s: 28, w: 800 })}
    <rect x="230" y="60" width="150" height="100" rx="10" fill="var(--white)" stroke="var(--ink)" stroke-width="1.5"/><rect x="240" y="66" width="56" height="88" rx="8" fill="var(--lime)"/>
    ${T(268, 92, "5", { s: 16, w: 800 })}${T(340, 92, "6", { s: 16 })}${T(268, 142, "7", { s: 16, w: 800 })}${T(340, 142, "8", { s: 16 })}
    ${T(405, 116, "=", { s: 22, w: 800 })}
    <rect x="430" y="60" width="180" height="100" rx="10" fill="var(--white)" stroke="var(--ink)" stroke-width="1.5"/><rect x="438" y="70" width="76" height="34" rx="8" fill="var(--pink)"/>
    ${T(476, 92, "19", { s: 16, w: 800 })}${T(570, 92, "22", { s: 16 })}${T(476, 142, "43", { s: 16 })}${T(570, 142, "50", { s: 16 })}
    ${T(320, 196, "1·5 + 2·7 = 19", { w: 800, c: "var(--violet)", s: 15 })}`);

  F.pascal = () => {
    let b = "";
    for (let n = 0; n <= 6; n++) {
      let c = 1;
      for (let k = 0; k <= n; k++) {
        const x = 320 + (k - n / 2) * 52, y = 30 + n * 34;
        b += `<circle cx="${x}" cy="${y}" r="15" fill="${k === 0 || k === n ? "var(--butter)" : "var(--sky)"}" stroke="var(--ink)" stroke-width="1"/>${T(x, y + 5, String(c), { s: 12, w: 800 })}`;
        c = (c * (n - k)) / (k + 1);
      }
      b += T(60, 35 + n * 34, "n = " + n, { s: 11, c: "var(--muted)" });
    }
    return svg(640, 280, b + T(320, 272, "Cada número é a soma dos dois de cima; a linha n soma 2ⁿ", { w: 800, c: "var(--violet)", s: 12 }));
  };

  F.triangulo_notaveis = () =>
    svg(640, 260, `
    <path d="M60 230L360 230L250 40z" fill="var(--butter)" fill-opacity=".5" stroke="var(--ink)" stroke-width="2"/>
    <line x1="250" y1="40" x2="210" y2="230" stroke="var(--violet)" stroke-width="2" stroke-dasharray="6 4"/>
    <line x1="60" y1="230" x2="305" y2="135" stroke="var(--violet)" stroke-width="2" stroke-dasharray="6 4"/>
    <line x1="360" y1="230" x2="155" y2="135" stroke="var(--violet)" stroke-width="2" stroke-dasharray="6 4"/>
    <circle cx="223" cy="167" r="6" fill="var(--violet)"/>${T(232, 162, "G", { a: "start", w: 800, c: "var(--violet)" })}
    ${T(420, 50, "Mediana → baricentro (G)", { a: "start", w: 800 })}${T(420, 70, "G divide cada mediana na razão 2 : 1", { a: "start", s: 11 })}
    ${T(420, 102, "Bissetriz → incentro (centro do", { a: "start", w: 800 })}${T(420, 120, "círculo inscrito)", { a: "start", w: 800 })}
    ${T(420, 152, "Mediatriz → circuncentro (centro", { a: "start", w: 800 })}${T(420, 170, "do círculo circunscrito)", { a: "start", w: 800 })}
    ${T(420, 202, "Altura → ortocentro", { a: "start", w: 800 })}`);

  F.ciclo_trig = () =>
    svg(640, 300, arrow("act") + `
    <line x1="30" y1="150" x2="330" y2="150" stroke="var(--ink)" stroke-width="1.5" marker-end="url(#act)"/><line x1="180" y1="290" x2="180" y2="10" stroke="var(--ink)" stroke-width="1.5" marker-end="url(#act)"/>
    <circle cx="180" cy="150" r="120" fill="none" stroke="var(--ink)" stroke-width="2"/>
    <line x1="180" y1="150" x2="${180 + 120 * Math.cos(Math.PI / 6)}" y2="${150 - 120 * Math.sin(Math.PI / 6)}" stroke="var(--violet)" stroke-width="3"/>
    <line x1="${180 + 120 * Math.cos(Math.PI / 6)}" y1="${150 - 120 * Math.sin(Math.PI / 6)}" x2="${180 + 120 * Math.cos(Math.PI / 6)}" y2="150" stroke="var(--orange)" stroke-width="3" stroke-dasharray="5 4"/>
    <line x1="180" y1="150" x2="${180 + 120 * Math.cos(Math.PI / 6)}" y2="150" stroke="var(--pink)" stroke-width="4"/>
    <circle cx="${180 + 120 * Math.cos(Math.PI / 6)}" cy="${150 - 120 * Math.sin(Math.PI / 6)}" r="6" fill="var(--violet)"/>
    <path d="M215 150A35 35 0 0 0 210 133" fill="none" stroke="var(--ink)"/>${T(226, 145, "30°", { s: 11, a: "start" })}
    ${T(232, 170, "cos", { s: 12, c: "var(--pink)", w: 800 })}${T(296, 106, "sen", { s: 12, c: "var(--orange)", w: 800, a: "start" })}
    ${T(320, 145, "1", { s: 11 })}${T(192, 26, "1", { s: 11 })}
    ${T(380, 50, "Ponto P = (cos θ, sen θ)", { a: "start", w: 800 })}
    ${T(380, 80, "sen²θ + cos²θ = 1", { a: "start", w: 800, c: "var(--violet)" })}
    ${T(380, 116, "1º quadrante: sen +, cos +", { a: "start", s: 12 })}${T(380, 138, "2º quadrante: sen +, cos −", { a: "start", s: 12 })}
    ${T(380, 160, "3º quadrante: sen −, cos −", { a: "start", s: 12 })}${T(380, 182, "4º quadrante: sen −, cos +", { a: "start", s: 12 })}
    ${T(380, 218, "180° = π rad", { a: "start", w: 800 })}`);

  F.senoide = () => {
    const w = 640, h = 230, ox = 40, oy = 115, u = 70;
    return svg(w, h, eixos("asn", w, h, ox, oy, "x") +
      curva(Math.sin, 0, 2 * Math.PI, ox, oy, u, "var(--violet)") + curva(Math.cos, 0, 2 * Math.PI, ox, oy, u, "var(--orange)", 'stroke-dasharray="7 5"') +
      [["π/2", Math.PI / 2], ["π", Math.PI], ["3π/2", 1.5 * Math.PI], ["2π", 2 * Math.PI]].map(([t, v]) => `<line x1="${ox + v * u}" y1="${oy - 4}" x2="${ox + v * u}" y2="${oy + 4}" stroke="var(--ink)"/>${T(ox + v * u, oy + 20, t, { s: 11 })}`).join("") +
      T(ox + 8, oy - u + 4, "1", { a: "start", s: 11 }) + T(ox + 8, oy + u + 4, "−1", { a: "start", s: 11 }) +
      T(560, 30, "y = sen x", { w: 800, c: "var(--violet)" }) + T(560, 50, "y = cos x", { w: 800, c: "var(--orange)" }) + T(470, 212, "período 2π, imagem [−1, 1]", { s: 12, w: 700 }));
  };

  F.reta = () => {
    const w = 460, h = 300, ox = 120, oy = 230, u = 40;
    return svg(w, h, eixos("are", w, h, ox, oy) + curva((x) => 0.5 * x + 1, -2.5, 7, ox, oy, u, "var(--violet)") +
      `<line x1="${ox + 2 * u}" y1="${oy - 2 * u}" x2="${ox + 6 * u}" y2="${oy - 2 * u}" stroke="var(--orange)" stroke-width="2.5" stroke-dasharray="5 4"/><line x1="${ox + 6 * u}" y1="${oy - 2 * u}" x2="${ox + 6 * u}" y2="${oy - 4 * u}" stroke="var(--orange)" stroke-width="2.5" stroke-dasharray="5 4"/>` +
      `<circle cx="${ox + 2 * u}" cy="${oy - 2 * u}" r="5" fill="var(--violet)"/><circle cx="${ox + 6 * u}" cy="${oy - 4 * u}" r="5" fill="var(--violet)"/><circle cx="${ox}" cy="${oy - u}" r="5" fill="var(--pink)"/>` +
      T(ox + 4 * u, oy - 2 * u + 18, "Δx = 4", { s: 12, c: "var(--orange)", w: 800 }) + T(ox + 6 * u + 8, oy - 3 * u, "Δy = 2", { a: "start", s: 12, c: "var(--orange)", w: 800 }) +
      T(ox - 8, oy - u - 6, "n = 1", { a: "end", s: 11, c: "var(--pink)", w: 800 }) + T(20, 30, "y = mx + n", { a: "start", w: 800, s: 15 }) + T(20, 52, "m = Δy/Δx = 2/4 = 0,5", { a: "start", w: 800, c: "var(--violet)" }));
  };

  F.circ_eq = () =>
    svg(460, 300, eixos("ace", 460, 300, 80, 250) + `
    <circle cx="240" cy="130" r="90" fill="var(--sky)" fill-opacity=".5" stroke="var(--violet)" stroke-width="3"/>
    <circle cx="240" cy="130" r="5" fill="var(--ink)"/><line x1="240" y1="130" x2="304" y2="66" stroke="var(--orange)" stroke-width="2.5"/>
    ${T(250, 150, "C(a, b)", { a: "start", w: 800 })}${T(282, 92, "r", { w: 800, c: "var(--orange)" })}
    ${T(240, 290, "(x − a)² + (y − b)² = r²", { w: 800, c: "var(--violet)", s: 14 })}`);

  F.conicas = () =>
    svg(660, 230, `
    <ellipse cx="110" cy="105" rx="90" ry="55" fill="var(--mint)" fill-opacity=".6" stroke="var(--ink)" stroke-width="2"/>
    <circle cx="40" cy="105" r="4" fill="var(--violet)"/><circle cx="180" cy="105" r="4" fill="var(--violet)"/>
    ${T(110, 190, "Elipse", { w: 800 })}${T(110, 208, "soma das distâncias", { s: 11 })}${T(110, 222, "aos focos é constante", { s: 11 })}
    <path d="M260 30Q330 105 260 180M440 30Q370 105 440 180" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
    <circle cx="300" cy="105" r="4" fill="var(--violet)"/><circle cx="400" cy="105" r="4" fill="var(--violet)"/>
    ${T(350, 190, "Hipérbole", { w: 800 })}${T(350, 208, "diferença das distâncias", { s: 11 })}${T(350, 222, "aos focos é constante", { s: 11 })}
    <path d="M500 30Q570 230 640 30" fill="none" stroke="var(--ink)" stroke-width="2.5"/><circle cx="570" cy="95" r="4" fill="var(--violet)"/><line x1="490" y1="165" x2="650" y2="165" stroke="var(--orange)" stroke-dasharray="5 4" stroke-width="2"/>
    ${T(570, 190, "Parábola", { w: 800 })}${T(570, 208, "mesma distância do foco", { s: 11 })}${T(570, 222, "e da reta diretriz", { s: 11 })}`);

  F.argand = () =>
    svg(460, 300, eixos("aar", 460, 300, 90, 240, "Re", "Im") + `
    <line x1="90" y1="240" x2="330" y2="80" stroke="var(--violet)" stroke-width="3"/>
    <line x1="330" y1="80" x2="330" y2="240" stroke="var(--orange)" stroke-dasharray="5 4" stroke-width="2"/><line x1="90" y1="80" x2="330" y2="80" stroke="var(--orange)" stroke-dasharray="5 4" stroke-width="2"/>
    <circle cx="330" cy="80" r="6" fill="var(--violet)"/>${T(340, 72, "z = 3 + 2i", { a: "start", w: 800, c: "var(--violet)" })}
    ${T(330, 260, "3", { w: 800 })}${T(76, 85, "2", { w: 800 })}${T(200, 148, "|z| = √13", { w: 800, c: "var(--violet)" })}
    <path d="M140 240A50 50 0 0 0 132 212" fill="none" stroke="var(--ink)"/>${T(150, 228, "θ", { a: "start", w: 800 })}`);
})();
