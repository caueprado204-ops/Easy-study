// Ilustrações originais do Easy Study para os módulos de Química.
(function () {
  const T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.s || 13}" font-weight="${o.w || 600}" fill="${o.c || "var(--ink)"}" text-anchor="${o.a || "middle"}" font-family="DM Sans,system-ui,sans-serif">${t}</text>`;
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
  const arrow = (id, c = "var(--ink)") =>
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker></defs>`;
  const eixos = (id, x0, y0, x1, y1, lx, ly) => arrow(id) +
    `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="var(--ink)" stroke-width="1.8" marker-end="url(#${id})"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" stroke="var(--ink)" stroke-width="1.8" marker-end="url(#${id})"/>` +
    T(x1 - 4, y0 + 22, lx, { a: "end", s: 12, c: "var(--muted)" }) + T(x0 + 8, y1 + 4, ly, { a: "start", s: 12, c: "var(--muted)" });
  const F = (window.FIGS = window.FIGS || {});

  F.estados = () => {
    const x0 = 70, y0 = 250;
    const pts = [[70, 225], [170, 175], [250, 175], [360, 95], [500, 95], [580, 50]];
    const d = pts.map((p, i) => (i ? "L" : "M") + p.join(" ")).join("");
    return svg(640, 305, eixos("aest", x0, y0, 620, 25, "tempo (aquecimento)", "temperatura (°C)") +
      `<path d="${d}" fill="none" stroke="var(--violet)" stroke-width="4" stroke-linejoin="round"/>
      <line x1="${x0}" y1="175" x2="170" y2="175" stroke="var(--muted)" stroke-dasharray="4 4"/><line x1="${x0}" y1="95" x2="360" y2="95" stroke="var(--muted)" stroke-dasharray="4 4"/>
      ${T(x0 - 8, 179, "0", { a: "end", w: 800 })}${T(x0 - 8, 99, "100", { a: "end", w: 800 })}
      <rect x="160" y="138" width="100" height="26" rx="8" fill="var(--sky)" stroke="var(--ink)"/>${T(210, 156, "fusão", { w: 800 })}
      <rect x="378" y="58" width="104" height="26" rx="8" fill="var(--pink)" stroke="var(--ink)"/>${T(430, 76, "ebulição", { w: 800 })}
      ${T(118, 222, "sólido", { s: 12, c: "var(--muted)" })}${T(320, 160, "líquido", { s: 12, c: "var(--muted)" })}${T(548, 88, "gás", { s: 12, c: "var(--muted)" })}
      ${T(330, 300, "Nos patamares, a energia muda o estado e a temperatura fica constante", { s: 12, c: "var(--muted)" })}`);
  };

  F.separacao = () =>
    svg(640, 280, arrow("asep", "var(--violet)") + `
    <path d="M70 230 Q70 150 120 140 Q170 150 170 230 Z" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.6"/>
    <rect x="112" y="80" width="16" height="64" fill="var(--white)" stroke="var(--ink)" stroke-width="1.6"/>
    <path d="M60 248 L180 248" stroke="var(--ink)" stroke-width="2"/><path d="M95 262 L120 240 L145 262" fill="none" stroke="var(--orange)" stroke-width="3"/>
    ${T(120, 276, "aquecimento", { s: 11 })}
    <path d="M128 92 L470 170" stroke="var(--ink)" stroke-width="16" stroke-linecap="round"/><path d="M128 92 L470 170" stroke="var(--white)" stroke-width="10" stroke-linecap="round"/>
    <path d="M160 92 L470 162" stroke="var(--mint)" stroke-width="30" stroke-opacity=".5" stroke-linecap="round"/>
    <path d="M140 99 L465 172" stroke="var(--violet)" stroke-width="3" stroke-dasharray="7 6" marker-end="url(#asep)"/>
    ${T(300, 108, "condensador (água fria circulando)", { s: 12, w: 800 })}
    <path d="M440 190 L440 240 Q440 252 452 252 L508 252 Q520 252 520 240 L520 190" fill="none" stroke="var(--ink)" stroke-width="1.6"/>
    <rect x="442" y="215" width="76" height="35" fill="var(--sky)" opacity=".7"/>
    ${T(480, 272, "destilado (água pura)", { s: 11 })}
    ${T(120, 60, "água + sal", { w: 800 })}${T(120, 192, "o sal fica", { s: 11, c: "var(--muted)" })}
    ${T(560, 120, "vapor →", { s: 12, c: "var(--violet)", w: 800 })}${T(560, 138, "líquido", { s: 12, c: "var(--violet)", w: 800 })}`);

  F.modelos_atomicos = () => {
    const box = (x, nome, ano, body) => `<rect x="${x}" y="20" width="142" height="220" rx="14" fill="var(--white)" stroke="var(--ink)" stroke-width="1.5"/>${T(x + 71, 46, nome, { w: 800, s: 15 })}${T(x + 71, 64, ano, { s: 11, c: "var(--muted)" })}${body}`;
    const dalton = `<circle cx="91" cy="140" r="44" fill="var(--sand)" stroke="var(--ink)" stroke-width="1.5"/>${T(91, 220, "esfera maciça", { s: 11 })}`;
    let th = `<circle cx="249" cy="140" r="46" fill="var(--rose)" stroke="var(--ink)" stroke-width="1.5"/>`;
    [[230, 120], [262, 112], [244, 150], [270, 158], [225, 162], [258, 136]].forEach(([x, y]) => (th += `<circle cx="${x}" cy="${y}" r="6" fill="var(--violet)"/>${T(x, y + 4, "−", { s: 11, c: "var(--white)", w: 800 })}`));
    th += T(249, 220, "'pudim de passas'", { s: 11 });
    const ru = `<ellipse cx="407" cy="140" rx="54" ry="22" fill="none" stroke="var(--ink)" stroke-width="1.3"/><ellipse cx="407" cy="140" rx="54" ry="22" fill="none" stroke="var(--ink)" stroke-width="1.3" transform="rotate(60 407 140)"/><ellipse cx="407" cy="140" rx="54" ry="22" fill="none" stroke="var(--ink)" stroke-width="1.3" transform="rotate(-60 407 140)"/><circle cx="407" cy="140" r="8" fill="var(--orange)" stroke="var(--ink)"/><circle cx="461" cy="140" r="5" fill="var(--violet)"/><circle cx="380" cy="94" r="5" fill="var(--violet)"/><circle cx="380" cy="186" r="5" fill="var(--violet)"/>${T(407, 220, "núcleo + eletrosfera", { s: 11 })}`;
    let bo = `<circle cx="565" cy="140" r="8" fill="var(--orange)" stroke="var(--ink)"/>`;
    [22, 38, 54].forEach((r, i) => (bo += `<circle cx="565" cy="140" r="${r}" fill="none" stroke="var(--ink)" stroke-width="1.3"/>${T(565, 140 - r - 3, "KLM"[i], { s: 9, c: "var(--muted)" })}`));
    bo += `<circle cx="543" cy="140" r="5" fill="var(--violet)"/><circle cx="565" cy="102" r="5" fill="var(--violet)"/><circle cx="611" cy="168" r="5" fill="var(--violet)"/>${T(565, 220, "camadas de energia", { s: 11 })}`;
    return svg(660, 255, box(20, "Dalton", "1808", dalton) + box(178, "Thomson", "1897", th) + box(336, "Rutherford", "1911", ru) + box(494, "Bohr", "1913", bo));
  };

  F.pauling = () => {
    const rows = [["1s"], ["2s", "2p"], ["3s", "3p", "3d"], ["4s", "4p", "4d", "4f"], ["5s", "5p", "5d", "5f"], ["6s", "6p", "6d"], ["7s", "7p"]];
    let b = arrow("apau", "var(--pink)");
    const X = (j) => 60 + j * 80, Y = (i) => 40 + i * 36;
    for (let k = 0; k < 8; k++) {
      // diagonal: começa em (linha k, coluna 0) e sobe para a direita
      const pts = [];
      for (let j = 0; j <= 3; j++) { const i = k - j; if (i >= 0 && i < rows.length && j < rows[i].length) pts.push([X(j), Y(i)]); }
      if (pts.length < 2) continue;
      const a = pts[pts.length - 1], z = pts[0];
      b += `<line x1="${a[0] + 30}" y1="${a[1] - 15}" x2="${z[0] - 30}" y2="${z[1] + 15}" stroke="var(--pink)" stroke-width="2.5" marker-end="url(#apau)"/>`;
    }
    rows.forEach((r, i) => r.forEach((s, j) => (b += `<rect x="${X(j) - 26}" y="${Y(i) - 16}" width="52" height="26" rx="7" fill="${["var(--butter)", "var(--sky)", "var(--mint)", "var(--lilac)"][j]}" fill-opacity=".72" stroke="var(--ink)" stroke-width="1.2"/>` + T(X(j), Y(i) + 2, s, { w: 800 }))));
    b += T(500, 60, "Ordem de energia:", { a: "start", w: 800 });
    ["1s 2s 2p 3s 3p", "4s 3d 4p 5s 4d", "5p 6s 4f 5d 6p", "7s 5f 6d 7p"].forEach((l, i) => (b += T(500, 86 + i * 22, l, { a: "start", s: 12.5 })));
    b += T(500, 200, "Máximo por subnível:", { a: "start", w: 800 }) + T(500, 222, "s = 2 · p = 6", { a: "start", s: 12.5 }) + T(500, 242, "d = 10 · f = 14", { a: "start", s: 12.5 });
    return svg(680, 300, b);
  };

  F.prop_periodicas = () => {
    let b = arrow("aper", "var(--violet)") + arrow("aper2", "var(--orange)");
    for (let i = 0; i < 7; i++) for (let j = 0; j < 18; j++) {
      if (i === 0 && j > 0 && j < 17) continue;
      if ((i === 1 || i === 2) && j > 1 && j < 12) continue;
      b += `<rect x="${40 + j * 22}" y="${40 + i * 22}" width="20" height="20" rx="3" fill="${j < 2 ? "var(--butter)" : j > 11 ? "var(--mint)" : "var(--sky)"}" stroke="var(--ink)" stroke-width=".8"/>`;
    }
    b += `<path d="M410 200 L60 200" stroke="var(--orange)" stroke-width="4" marker-end="url(#aper2)"/><path d="M445 50 L445 190" stroke="var(--orange)" stroke-width="4" marker-end="url(#aper2)"/>`;
    b += T(235, 222, "raio atômico cresce", { w: 800, c: "var(--orange)" }) + T(460, 120, "raio", { a: "start", w: 800, c: "var(--orange)" }) + T(460, 136, "cresce", { a: "start", w: 800, c: "var(--orange)" });
    b += `<path d="M60 262 L410 262" stroke="var(--violet)" stroke-width="4" marker-end="url(#aper)"/><path d="M530 190 L530 50" stroke="var(--violet)" stroke-width="4" marker-end="url(#aper)"/>`;
    b += T(235, 284, "ionização e eletronegatividade crescem", { w: 800, c: "var(--violet)" }) + T(545, 110, "ionização e", { a: "start", s: 12, w: 800, c: "var(--violet)" }) + T(545, 126, "eletronegatividade", { a: "start", s: 12, w: 800, c: "var(--violet)" }) + T(545, 142, "crescem", { a: "start", s: 12, w: 800, c: "var(--violet)" });
    b += T(40, 28, "F é o mais eletronegativo (canto superior direito, sem os gases nobres)", { a: "start", s: 11.5, c: "var(--muted)" });
    return svg(680, 300, b);
  };

  F.gases = () => {
    const x0 = 70, y0 = 240;
    let d = "";
    for (let v = 1; v <= 8.01; v += 0.1) { const p = 8 / v; d += (d ? "L" : "M") + (x0 + v * 60).toFixed(1) + " " + (y0 - p * 26).toFixed(1); }
    return svg(640, 290, eixos("agas", x0, y0, 600, 20, "volume", "pressão") +
      `<path d="${d}" fill="none" stroke="var(--violet)" stroke-width="4"/>
      <circle cx="${x0 + 2 * 60}" cy="${y0 - 4 * 26}" r="7" fill="var(--lime)" stroke="var(--ink)" stroke-width="1.5"/><circle cx="${x0 + 4 * 60}" cy="${y0 - 2 * 26}" r="7" fill="var(--lime)" stroke="var(--ink)" stroke-width="1.5"/>
      <line x1="${x0}" y1="${y0 - 4 * 26}" x2="${x0 + 120}" y2="${y0 - 4 * 26}" stroke="var(--muted)" stroke-dasharray="4 4"/><line x1="${x0 + 120}" y1="${y0}" x2="${x0 + 120}" y2="${y0 - 104}" stroke="var(--muted)" stroke-dasharray="4 4"/>
      <line x1="${x0}" y1="${y0 - 2 * 26}" x2="${x0 + 240}" y2="${y0 - 2 * 26}" stroke="var(--muted)" stroke-dasharray="4 4"/><line x1="${x0 + 240}" y1="${y0}" x2="${x0 + 240}" y2="${y0 - 52}" stroke="var(--muted)" stroke-dasharray="4 4"/>
      ${T(x0 - 8, y0 - 100, "2P", { a: "end", w: 800 })}${T(x0 - 8, y0 - 48, "P", { a: "end", w: 800 })}${T(x0 + 120, y0 + 18, "V", { w: 800 })}${T(x0 + 240, y0 + 18, "2V", { w: 800 })}
      <rect x="380" y="50" width="220" height="62" rx="12" fill="var(--butter)" stroke="var(--ink)"/>${T(490, 76, "T constante (isotérmica)", { w: 800 })}${T(490, 98, "P · V = constante", { s: 14, w: 800, c: "var(--violet)" })}
      ${T(330, 284, "Dobrou o volume, a pressão caiu pela metade", { s: 12, c: "var(--muted)" })}`);
  };

  F.catalisador = () => {
    const x0 = 70, y0 = 250;
    const c = (h) => `M90 170 C 200 170, 230 ${h}, 300 ${h} S 400 210, 540 210`;
    return svg(640, 305, eixos("acat", x0, y0, 610, 20, "caminho da reação", "energia") +
      `<path d="${c(45)}" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
      <path d="${c(115)}" fill="none" stroke="var(--violet)" stroke-width="3.5" stroke-dasharray="9 6"/>
      ${T(300, 36, "sem catalisador", { w: 800 })}${T(430, 150, "com catalisador", { w: 800, c: "var(--violet)", a: "start" })}
      <line x1="560" y1="170" x2="560" y2="210" stroke="var(--orange)" stroke-width="3"/>${T(568, 194, "ΔH igual", { a: "start", s: 12, w: 800, c: "var(--orange)" })}
      <line x1="90" y1="170" x2="560" y2="170" stroke="var(--muted)" stroke-dasharray="4 4"/>
      ${T(100, 190, "reagentes", { a: "start", s: 12 })}${T(500, 230, "produtos", { s: 12 })}
      <line x1="300" y1="170" x2="300" y2="50" stroke="var(--ink)" stroke-width="1.5"/>${T(292, 80, "Ea", { a: "end", w: 800 })}
      <line x1="312" y1="170" x2="312" y2="120" stroke="var(--violet)" stroke-width="1.5"/>${T(318, 188, "Ea menor", { a: "start", s: 12, w: 800, c: "var(--violet)" })}
      ${T(340, 300, "O catalisador baixa a energia de ativação; reagentes e produtos não mudam", { s: 12, c: "var(--muted)" })}`);
  };

  F.meia_vida = () => {
    const x0 = 70, y0 = 240, u = 110, h = 190;
    let d = "";
    for (let t = 0; t <= 4.6; t += 0.05) d += (d ? "L" : "M") + (x0 + t * u).toFixed(1) + " " + (y0 - h * Math.pow(0.5, t)).toFixed(1);
    let b = eixos("amv", x0, y0, 620, 25, "", "quantidade restante") + T(616, y0 - 10, "tempo", { a: "end", s: 12, c: "var(--muted)" }) + `<path d="${d}" fill="none" stroke="var(--pink)" stroke-width="4"/>`;
    [[0, "100%"], [1, "50%"], [2, "25%"], [3, "12,5%"], [4, "6,25%"]].forEach(([t, l]) => {
      const x = x0 + t * u, y = y0 - h * Math.pow(0.5, t);
      b += `<circle cx="${x}" cy="${y}" r="6" fill="var(--lime)" stroke="var(--ink)" stroke-width="1.5"/>` + T(x + 10, y - 8, l, { a: "start", w: 800 });
      if (t) b += `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y}" stroke="var(--muted)" stroke-dasharray="4 4"/>` + T(x, y0 + 18, t + "T", { w: 800 });
    });
    return svg(640, 290, b + T(340, 284, "A cada meia-vida (T), a amostra radioativa cai pela metade", { s: 12, c: "var(--muted)" }));
  };

  F.cadeias = () => {
    const card = (x, y, w, tit, a, b, ca, cb) => `<rect x="${x}" y="${y}" width="${w}" height="104" rx="12" fill="var(--white)" stroke="var(--ink)" stroke-width="1.4"/>${T(x + w / 2, y + 22, tit, { w: 800 })}
      <rect x="${x + 10}" y="${y + 34}" width="${w / 2 - 15}" height="60" rx="9" fill="${ca}" stroke="var(--ink)"/><rect x="${x + w / 2 + 5}" y="${y + 34}" width="${w / 2 - 15}" height="60" rx="9" fill="${cb}" stroke="var(--ink)"/>
      ${T(x + w / 4 + 2, y + 56, a[0], { w: 800, s: 12 })}${T(x + w / 4 + 2, y + 76, a[1], { s: 11 })}${T(x + (3 * w) / 4 - 2, y + 56, b[0], { w: 800, s: 12 })}${T(x + (3 * w) / 4 - 2, y + 76, b[1], { s: 11 })}`;
    return svg(660, 250,
      card(10, 10, 310, "Fechamento", ["aberta", "C–C–C–C"], ["fechada", "anel"], "var(--sky)", "var(--lilac)") +
      card(340, 10, 310, "Disposição", ["normal", "sem ramos"], ["ramificada", "C terciário"], "var(--mint)", "var(--butter)") +
      card(10, 130, 310, "Ligações entre C", ["saturada", "só simples"], ["insaturada", "C=C ou C≡C"], "var(--rose)", "var(--peach)") +
      card(340, 130, 310, "Átomos na cadeia", ["homogênea", "só carbonos"], ["heterogênea", "C–O–C, C–N–C"], "var(--sand)", "var(--ice)"));
  };
})();
