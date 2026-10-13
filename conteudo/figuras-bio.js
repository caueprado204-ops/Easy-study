// Ilustrações originais do Easy Study para os módulos de Biologia.
(function () {
  const T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.s || 13}" font-weight="${o.w || 600}" fill="${o.c || "var(--ink)"}" text-anchor="${o.a || "middle"}" font-family="DM Sans,system-ui,sans-serif">${t}</text>`;
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
  const arrow = (id, c = "var(--ink)") =>
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker></defs>`;
  const box = (x, y, w, h, fill, label, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 12}" fill="${fill}" stroke="var(--ink)" stroke-width="1.5"/>${label ? T(x + w / 2, y + h / 2 + 5, label, o) : ""}`;
  const line = (x1, y1, x2, y2, m, c = "var(--ink)", dash = "") =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2" ${dash ? `stroke-dasharray="${dash}"` : ""} ${m ? `marker-end="url(#${m})"` : ""}/>`;
  const C = ["var(--butter)", "var(--lilac)", "var(--mint)", "var(--pink)", "var(--sky)", "var(--lime)", "var(--orange)", "var(--rose)", "var(--peach)"];
  const F = (window.FIGS = window.FIGS || {});

  // Escada de etapas ligadas por setas (usada em várias figuras)
  const fluxo = (id, itens, w = 640, h = 150, sub) => {
    const n = itens.length, bw = Math.min(150, (w - 40 - (n - 1) * 22) / n), gap = (w - 40 - n * bw) / Math.max(1, n - 1);
    let b = arrow(id);
    itens.forEach(([t, d], i) => {
      const x = 20 + i * (bw + gap);
      b += box(x, 34, bw, 62, C[i % C.length], "", {});
      const fs = (txt, max) => Math.min(max, (bw - 8) / (txt.length * 0.56));
      b += T(x + bw / 2, 60, t, { w: 800, s: fs(t, 13) });
      if (d) b += T(x + bw / 2, 80, d, { s: fs(d, 10.5) });
      if (i < n - 1) b += line(x + bw + 2, 65, x + bw + gap - 3, 65, id);
    });
    if (sub) b += T(w / 2, h - 18, sub, { s: 12, c: "var(--violet)", w: 700 });
    return svg(w, h, b);
  };

  F.niveis = () => fluxo("anv", [["Átomo"], ["Molécula"], ["Organela"], ["Célula"], ["Tecido"], ["Órgão"], ["Sistema"], ["Organismo"]], 660, 150, "… e depois: população → comunidade → ecossistema → biosfera");

  F.respiracao = () =>
    svg(640, 260, arrow("ar") + `
    ${box(20, 40, 170, 84, "var(--butter)", "", {})}${T(105, 70, "Glicólise", { w: 800, s: 15 })}${T(105, 92, "citosol · sem O₂", { s: 12 })}${T(105, 112, "glicose → 2 piruvatos", { s: 11 })}
    ${box(235, 40, 170, 84, "var(--lilac)", "", {})}${T(320, 70, "Ciclo de Krebs", { w: 800, s: 15 })}${T(320, 92, "matriz da mitocôndria", { s: 12 })}${T(320, 112, "libera CO₂ · NADH, FADH₂", { s: 11 })}
    ${box(450, 40, 170, 84, "var(--lime)", "", {})}${T(535, 70, "Cadeia respiratória", { w: 800, s: 14 })}${T(535, 92, "cristas mitocondriais", { s: 12 })}${T(535, 112, "O₂ recebe elétrons → H₂O", { s: 11 })}
    ${line(192, 82, 232, 82, "ar")}${line(407, 82, 447, 82, "ar")}
    ${T(105, 150, "2 ATP", { w: 800, c: "var(--violet)", s: 15 })}${T(320, 150, "2 ATP", { w: 800, c: "var(--violet)", s: 15 })}${T(535, 150, "a maior parte do ATP", { w: 800, c: "var(--violet)", s: 15 })}
    ${T(320, 200, "C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energia (ATP)", { w: 800, s: 15 })}
    ${T(320, 235, "Sem oxigênio: só a glicólise + fermentação = 2 ATP por glicose", { s: 12, c: "var(--muted)" })}`);

  F.fotossintese = () =>
    svg(640, 270, arrow("af") + arrow("af2", "var(--orange)") + `
    <ellipse cx="320" cy="140" rx="250" ry="95" fill="var(--mint)" stroke="var(--ink)" stroke-width="2"/>
    ${[0, 1, 2].map((i) => [0, 1, 2, 3].map((j) => `<ellipse cx="${200 + i * 32}" cy="${100 + j * 16}" rx="22" ry="7" fill="#5BBF6A" stroke="var(--ink)" stroke-width="1"/>`).join("")).join("")}
    ${T(232, 190, "Tilacoides: fase clara", { w: 800, s: 12 })}${T(232, 206, "luz quebra a água → O₂ + ATP", { s: 11 })}
    ${T(450, 120, "Estroma: fase química", { w: 800, s: 12 })}${T(450, 136, "Ciclo de Calvin", { s: 11 })}${T(450, 152, "CO₂ vira glicose", { s: 11 })}
    ${line(290, 125, 380, 130, "af")}${T(335, 116, "ATP, NADPH", { s: 10, c: "var(--violet)" })}
    ${line(40, 30, 140, 80, "af2", "var(--orange)")}${T(40, 22, "luz", { a: "start", c: "var(--orange)", w: 800 })}
    ${T(320, 262, "6 CO₂ + 12 H₂O + luz → C₆H₁₂O₆ + 6 O₂ + 6 H₂O", { w: 800, s: 14 })}`);

  F.dogma = () => fluxo("adg", [["DNA", "no núcleo"], ["RNA mensageiro", "transcrição"], ["Ribossomo", "tradução"], ["Proteína", "aminoácidos em fila"]], 640, 160, "Replicação copia o DNA · transcrição faz o RNA · tradução faz a proteína");

  F.mitose = () => {
    const fase = (x, nome, desc, corpo) => `${box(x, 30, 140, 140, "var(--cream)", "", {})}<circle cx="${x + 70}" cy="96" r="52" fill="var(--rose)" stroke="var(--ink)" stroke-width="1.5"/>${corpo}${T(x + 70, 192, nome, { w: 800 })}${T(x + 70, 210, desc, { s: 10.5 })}`;
    const X = (cx, cy, c = "var(--violet)") => `<path d="M${cx - 6} ${cy - 9}L${cx + 6} ${cy + 9}M${cx + 6} ${cy - 9}L${cx - 6} ${cy + 9}" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`;
    return svg(640, 230,
      fase(10, "Prófase", "cromossomos condensam", X(70, 85) + X(95, 105) + X(60, 112, "var(--orange)")) +
      fase(165, "Metáfase", "alinham no equador", X(235, 72) + X(235, 96, "var(--orange)") + X(235, 120) + `<path d="M185 96H215M255 96H285" stroke="var(--ink)" stroke-dasharray="3 3"/>`) +
      fase(320, "Anáfase", "cromátides se separam", `<path d="M365 80l8 8M365 112l8-8M425 80l-8 8M425 112l-8-8" stroke="var(--violet)" stroke-width="4" stroke-linecap="round"/>`) +
      fase(475, "Telófase", "duas células iguais", `<line x1="545" y1="44" x2="545" y2="148" stroke="var(--ink)" stroke-width="2"/><circle cx="520" cy="96" r="14" fill="var(--lilac)"/><circle cx="570" cy="96" r="14" fill="var(--lilac)"/>`));
  };

  F.embriao = () => fluxo("aem2", [["Zigoto", "1 célula"], ["Mórula", "bola maciça"], ["Blástula", "bola oca"], ["Gástrula", "folhetos"], ["Nêurula", "tubo neural"]], 640, 150, "Ectoderme: pele e sistema nervoso · Mesoderme: músculos, ossos, sangue · Endoderme: tubo digestório");

  F.ciclo_menstrual = () =>
    svg(640, 240, arrow("acm") + `
    ${line(40, 200, 610, 200, "acm")}${T(612, 238, "dias", { a: "end", c: "var(--muted)" })}
    ${[1, 7, 14, 21, 28].map((d) => `${T(40 + (d - 1) * 20.4, 218, String(d), { s: 11 })}`).join("")}
    <path d="M40 170C120 165 200 120 300 60C320 120 340 160 420 150S560 175 600 175" fill="none" stroke="var(--pink)" stroke-width="4"/>
    <path d="M40 185C150 185 260 182 310 178C380 90 470 85 520 120S590 185 600 185" fill="none" stroke="var(--violet)" stroke-width="4"/>
    <line x1="305" y1="40" x2="305" y2="200" stroke="var(--orange)" stroke-width="2" stroke-dasharray="5 4"/>${T(305, 32, "ovulação (≈ dia 14)", { w: 800, c: "var(--orange)" })}
    <rect x="40" y="186" width="100" height="10" fill="var(--rose)"/>${T(90, 180, "menstruação", { s: 11 })}
    <rect x="420" y="40" width="14" height="6" fill="var(--pink)"/>${T(440, 46, "estrógeno", { a: "start", s: 12 })}
    <rect x="420" y="58" width="14" height="6" fill="var(--violet)"/>${T(440, 64, "progesterona (corpo-lúteo)", { a: "start", s: 12 })}`);

  F.neuronio = () =>
    svg(640, 200, arrow("an2", "var(--orange)") + `
    ${[[-40, -30], [-50, 0], [-40, 30], [-20, -45], [-20, 45]].map(([dx, dy]) => `<line x1="110" y1="100" x2="${110 + dx}" y2="${100 + dy}" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>`).join("")}
    <circle cx="110" cy="100" r="30" fill="var(--lilac)" stroke="var(--ink)" stroke-width="2"/><circle cx="110" cy="100" r="10" fill="var(--violet)"/>
    <line x1="140" y1="100" x2="520" y2="100" stroke="var(--ink)" stroke-width="4"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${170 + i * 70}" y="90" width="52" height="20" rx="10" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>`).join("")}
    ${[-20, 0, 20].map((d) => `<line x1="520" y1="100" x2="555" y2="${100 + d}" stroke="var(--ink)" stroke-width="3"/><circle cx="558" cy="${100 + d}" r="6" fill="var(--pink)"/>`).join("")}
    ${line(200, 140, 480, 140, "an2", "var(--orange)")}${T(340, 160, "sentido do impulso nervoso", { s: 12, c: "var(--orange)", w: 800 })}
    ${T(70, 30, "dendritos", { s: 12 })}${T(110, 160, "corpo celular", { s: 12 })}${T(270, 78, "axônio com bainha de mielina", { s: 12 })}${T(580, 60, "terminal (sinapse)", { s: 12 })}`);

  F.tecidos = () =>
    svg(640, 200, [["Epitelial", "reveste e secreta", "var(--butter)"], ["Conjuntivo", "liga, sustenta, transporta", "var(--sky)"], ["Muscular", "contrai e movimenta", "var(--rose)"], ["Nervoso", "recebe e conduz sinais", "var(--lilac)"]].map(([n, d, c], i) => `${box(15 + i * 157, 40, 145, 120, c, "", {})}${T(87 + i * 157, 90, n, { w: 800, s: 15 })}${T(87 + i * 157, 114, d, { s: 11 })}`).join("") + T(320, 22, "Os quatro tecidos básicos do corpo humano", { w: 800, s: 14 }) + T(320, 188, "sangue, osso, cartilagem e gordura são tecidos conjuntivos", { s: 12, c: "var(--muted)" }));

  F.cladograma = () =>
    svg(640, 270, `
    <path d="M50 250L590 70" stroke="var(--ink)" stroke-width="3" fill="none"/>
    ${[["Peixes", 110, 230], ["Anfíbios", 220, 193], ["Répteis", 330, 157], ["Aves", 440, 120], ["Mamíferos", 560, 80]].map(([n, x, y], i) => `<line x1="${x}" y1="${y}" x2="${x}" y2="44" stroke="var(--ink)" stroke-width="3"/>${box(x - 48, 16, 96, 28, C[i], n, { s: 12, w: 800 })}`).join("")}
    ${[["vértebras", 80, 240], ["4 membros", 175, 208], ["ovo amniótico", 285, 172], ["penas", 395, 135], ["pelos e mamas", 505, 98]].map(([t, x, y]) => `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" fill="var(--orange)"/>${T(x + 4, y + 24, t, { s: 11, c: "var(--violet)", w: 700 })}`).join("")}
    ${T(30, 266, "ancestral comum", { a: "start", s: 12 })}`);

  F.bacteria = () =>
    svg(640, 230, `
    <rect x="60" y="60" width="330" height="120" rx="60" fill="var(--mint)" stroke="var(--ink)" stroke-width="3"/>
    <rect x="70" y="70" width="310" height="100" rx="50" fill="var(--lime)" fill-opacity=".5" stroke="var(--ink)" stroke-width="1"/>
    <path d="M150 120c20-30 40 30 60 0s40 30 60 0 40 30 50 0" fill="none" stroke="var(--violet)" stroke-width="4"/>
    <circle cx="300" cy="95" r="12" fill="none" stroke="var(--pink)" stroke-width="3"/>
    ${[110, 130, 250, 340, 320].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 150 : 95}" r="4" fill="var(--ink)"/>`).join("")}
    <path d="M390 120c30 0 40-30 70-20s40 30 70 10" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
    ${T(470, 40, "Parede celular + cápsula", { a: "start", s: 12 })}${line(465, 36, 370, 68)}
    ${T(470, 70, "Plasmídio", { a: "start", s: 12 })}${line(465, 66, 312, 92)}
    ${T(470, 160, "Nucleoide (DNA circular)", { a: "start", s: 12 })}${line(465, 156, 260, 125)}
    ${T(470, 190, "Ribossomos", { a: "start", s: 12 })}${line(465, 186, 345, 152)}
    ${T(560, 120, "Flagelo", { s: 12 })}
    ${T(225, 215, "Sem núcleo e sem organelas membranosas", { s: 12, c: "var(--muted)" })}`);

  F.virus_ciclo = () => fluxo("avc", [["Adsorção", "vírus se prende"], ["Penetração", "entra o material genético"], ["Replicação", "a célula faz cópias"], ["Montagem", "novos vírus"], ["Liberação", "célula rompe (lítico)"]], 660, 150, "No ciclo lisogênico, o DNA viral se integra ao da célula e fica 'adormecido'");

  F.fungo = () =>
    svg(640, 240, `
    <line x1="20" y1="170" x2="620" y2="170" stroke="var(--sand)" stroke-width="40"/>
    <path d="M240 170C220 90 200 80 180 70H340C320 80 300 90 280 170z" fill="var(--rose)" stroke="var(--ink)" stroke-width="2"/>
    <path d="M150 72Q260 -10 370 72z" fill="var(--orange)" stroke="var(--ink)" stroke-width="2"/>
    ${[190, 240, 290, 330].map((x) => `<circle cx="${x}" cy="45" r="5" fill="var(--white)"/>`).join("")}
    ${[...Array(9)].map((_, i) => `<path d="M${120 + i * 40} 172q${i % 2 ? 15 : -15} 25 ${i % 2 ? -10 : 10} 50" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`).join("")}
    ${T(450, 60, "Corpo de frutificação", { a: "start", w: 800 })}${T(450, 78, "(micélio reprodutivo: faz esporos)", { a: "start", s: 11 })}
    ${T(450, 205, "Hifas formam o micélio", { a: "start", w: 800 })}${T(450, 223, "digestão fora do corpo e absorção", { a: "start", s: 11 })}`);

  F.plantas = () =>
    svg(660, 270, `
    <path d="M40 210H620" stroke="var(--ink)" stroke-width="3"/>
    ${[["Briófitas", "musgos", "var(--mint)", "sem vasos"], ["Pteridófitas", "samambaias", "var(--lime)", "vasos condutores"], ["Gimnospermas", "pinheiros", "var(--sky)", "sementes"], ["Angiospermas", "ipê, feijão", "var(--butter)", "flores e frutos"]].map(([n, e, c, nov], i) => {
      const x = 110 + i * 150;
      return `<line x1="${x}" y1="210" x2="${x}" y2="110" stroke="var(--ink)" stroke-width="3"/>${box(x - 65, 60, 130, 50, c, "", {})}${T(x, 82, n, { w: 800 })}${T(x, 100, e, { s: 11 })}<rect x="${x + 2}" y="${200 - 0}" width="0" height="0"/>${i ? `<rect x="${x - 82}" y="196" width="12" height="12" fill="var(--orange)"/>${T(x - 76, 232, nov, { s: 11, c: "var(--violet)", w: 700 })}` : T(x, 256, nov, { s: 11, c: "var(--muted)" })}`;
    }).join("")}
    ${T(330, 30, "Novidades evolutivas na conquista do ambiente terrestre", { w: 800, s: 14 })}`);

  F.flor = () =>
    svg(640, 260, `
    <line x1="210" y1="250" x2="210" y2="170" stroke="#3E9B4F" stroke-width="6"/>
    <path d="M210 170C120 160 110 60 160 50C170 110 200 150 210 170z" fill="var(--pink)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M210 170C300 160 310 60 260 50C250 110 220 150 210 170z" fill="var(--pink)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M190 170Q210 120 230 170z" fill="var(--lime)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M205 170V70M215 170V70" stroke="var(--ink)" stroke-width="2"/><ellipse cx="210" cy="64" rx="12" ry="8" fill="var(--violet)"/>
    <path d="M175 165L160 95M245 165L260 95" stroke="var(--ink)" stroke-width="1.5"/><ellipse cx="160" cy="90" rx="9" ry="6" fill="var(--butter)" stroke="var(--ink)"/><ellipse cx="260" cy="90" rx="9" ry="6" fill="var(--butter)" stroke="var(--ink)"/>
    ${T(380, 50, "Estigma, estilete e ovário = gineceu (♀)", { a: "start", s: 12 })}${line(375, 46, 222, 64)}
    ${T(380, 95, "Antera + filete = estame (♂, faz pólen)", { a: "start", s: 12 })}${line(375, 91, 270, 90)}
    ${T(380, 140, "Pétalas = corola (atrai polinizadores)", { a: "start", s: 12 })}${line(375, 136, 285, 120)}
    ${T(380, 185, "Ovário vira fruto; óvulo vira semente", { a: "start", s: 12, w: 800, c: "var(--violet)" })}${line(375, 181, 225, 165)}`);

  F.transporte_seiva = () =>
    svg(640, 260, arrow("as1", "var(--sky)") + arrow("as2", "var(--orange)") + `
    <rect x="290" y="40" width="60" height="190" rx="8" fill="var(--sand)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M300 220V60" stroke="#4A90D9" stroke-width="8" marker-end="url(#as1)"/>
    <path d="M340 60V220" stroke="var(--orange)" stroke-width="8" marker-end="url(#as2)"/>
    ${T(270, 120, "Xilema: seiva bruta", { a: "end", w: 800, c: "#2F6FB5" })}${T(270, 140, "água e sais, sobe da raiz", { a: "end", s: 12 })}${T(270, 160, "puxada pela transpiração", { a: "end", s: 12 })}
    ${T(370, 120, "Floema: seiva elaborada", { a: "start", w: 800, c: "var(--orange)" })}${T(370, 140, "açúcares, desce das folhas", { a: "start", s: 12 })}${T(370, 160, "fica na casca (anel de Malpighi)", { a: "start", s: 12 })}
    ${T(320, 30, "folhas", { s: 12 })}${T(320, 252, "raízes", { s: 12 })}`);

  F.filos = () => {
    const nomes = ["Poríferos", "Cnidários", "Platelmintos", "Nematoides", "Moluscos", "Anelídeos", "Artrópodes", "Equinodermos", "Cordados"];
    let b = `<path d="M30 270L630 90" stroke="var(--ink)" stroke-width="3" fill="none"/>`;
    nomes.forEach((n, i) => {
      const x = 60 + i * 66, y = 270 - (x - 30) * 0.3 - 4;
      b += `<line x1="${x}" y1="${y}" x2="${x}" y2="${i % 2 ? 66 : 46}" stroke="var(--ink)" stroke-width="2.5"/><circle cx="${x}" cy="${i % 2 ? 66 : 46}" r="7" fill="${C[i % C.length]}" stroke="var(--ink)"/>${T(x, i % 2 ? 54 : 34, n, { s: 11, w: 800 })}`;
    });
    [["tecidos", 93], ["simetria bilateral, 3 folhetos", 159], ["celoma", 291], ["deuterostômios", 555]].forEach(([t, x]) => {
      const y = 270 - (x - 30) * 0.3;
      b += `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" fill="var(--orange)"/>${T(x + 10, y + 22, t, { a: "start", s: 11, c: "var(--violet)", w: 700 })}`;
    });
    b += T(330, 16, "Principais filos animais (esquema simplificado)", { w: 800, s: 13 });
    return svg(660, 290, b);
  };

  F.coracoes = () =>
    svg(660, 230, [["Peixe", "1 átrio, 1 ventrículo", 2, "circulação simples"], ["Anfíbio", "2 átrios, 1 ventrículo", 3, "dupla e incompleta"], ["Réptil", "ventrículo parcialmente dividido", 3, "dupla, mistura menor"], ["Ave / mamífero", "2 átrios, 2 ventrículos", 4, "dupla e completa"]].map(([n, d, k, c], i) => {
      const x = 85 + i * 162;
      let cav = "";
      if (k === 2) cav = `<rect x="${x - 30}" y="50" width="60" height="40" rx="8" fill="var(--sky)" stroke="var(--ink)"/><rect x="${x - 30}" y="94" width="60" height="50" rx="8" fill="var(--violet)" stroke="var(--ink)"/>`;
      else if (k === 3) cav = `<rect x="${x - 40}" y="50" width="38" height="40" rx="8" fill="var(--sky)" stroke="var(--ink)"/><rect x="${x + 2}" y="50" width="38" height="40" rx="8" fill="var(--rose)" stroke="var(--ink)"/><rect x="${x - 40}" y="94" width="80" height="50" rx="8" fill="var(--lilac)" stroke="var(--ink)"/>${i === 2 ? `<line x1="${x}" y1="96" x2="${x}" y2="124" stroke="var(--ink)" stroke-width="3"/>` : ""}`;
      else cav = `<rect x="${x - 40}" y="50" width="38" height="40" rx="8" fill="var(--sky)" stroke="var(--ink)"/><rect x="${x + 2}" y="50" width="38" height="40" rx="8" fill="var(--rose)" stroke="var(--ink)"/><rect x="${x - 40}" y="94" width="38" height="50" rx="8" fill="var(--violet)" stroke="var(--ink)"/><rect x="${x + 2}" y="94" width="38" height="50" rx="8" fill="var(--orange)" stroke="var(--ink)"/>`;
      return cav + T(x, 30, n, { w: 800 }) + T(x, 170, d, { s: 10 }) + T(x, 190, c, { s: 11, c: "var(--violet)", w: 700 });
    }).join("") + T(330, 222, "azul/roxo = sangue pobre em O₂ · rosa/laranja = rico em O₂", { s: 11, c: "var(--muted)" }));

  F.nefron = () =>
    svg(640, 260, arrow("anf") + `
    <circle cx="90" cy="90" r="38" fill="var(--rose)" stroke="var(--ink)" stroke-width="2"/><path d="M75 80q15-20 30 0t-15 25" fill="none" stroke="var(--orange)" stroke-width="4"/>
    <path d="M128 90C200 90 180 60 240 60S260 120 300 120V220C300 240 340 240 340 220V120C380 120 360 60 430 60S500 90 520 90V240" fill="none" stroke="var(--ink)" stroke-width="10" stroke-linecap="round" opacity=".85"/>
    <path d="M128 90C200 90 180 60 240 60S260 120 300 120V220C300 240 340 240 340 220V120C380 120 360 60 430 60S500 90 520 90V240" fill="none" stroke="var(--butter)" stroke-width="6" stroke-linecap="round"/>
    ${T(90, 150, "1. Filtração", { w: 800 })}${T(90, 166, "no glomérulo", { s: 11 })}
    ${T(220, 40, "2. Reabsorção", { w: 800 })}${T(220, 22, "glicose, sais, água voltam", { s: 11 })}
    ${T(250, 200, "alça néfrica", { s: 11, a: "end" })}
    ${T(440, 40, "3. Secreção", { w: 800 })}${T(440, 22, "H⁺, K⁺, ureia saem do sangue", { s: 11 })}
    ${T(505, 200, "ducto coletor", { s: 11, a: "end" })}${T(505, 216, "ADH: retém água", { s: 11, a: "end", c: "var(--violet)", w: 700 })}`);

  F.crossing = () =>
    svg(640, 210, `
    ${[0, 1].map((k) => { const x = 60 + k * 330; return `
      <rect x="${x}" y="40" width="22" height="130" rx="11" fill="var(--sky)" stroke="var(--ink)"/><rect x="${x + 30}" y="40" width="22" height="130" rx="11" fill="${k ? "var(--sky)" : "var(--sky)"}" stroke="var(--ink)"/>
      <rect x="${x + 80}" y="40" width="22" height="130" rx="11" fill="var(--pink)" stroke="var(--ink)"/><rect x="${x + 110}" y="40" width="22" height="130" rx="11" fill="var(--pink)" stroke="var(--ink)"/>
      ${k ? `<rect x="${x + 30}" y="40" width="22" height="55" rx="11" fill="var(--pink)" stroke="var(--ink)"/><rect x="${x + 80}" y="40" width="22" height="55" rx="11" fill="var(--sky)" stroke="var(--ink)"/>` : ""}
      ${T(x + 11, 66, "A")}${T(x + 41, 66, k ? "a" : "A")}${T(x + 91, 66, k ? "A" : "a")}${T(x + 121, 66, "a")}
      ${T(x + 11, 150, "B")}${T(x + 41, 150, "B")}${T(x + 91, 150, "b")}${T(x + 121, 150, "b")}`; }).join("")}
    <path d="M250 105H350" stroke="var(--ink)" stroke-width="2" marker-end="url(#acx)"/>${arrow("acx")}
    ${T(300, 92, "crossing-over", { s: 12, w: 800, c: "var(--violet)" })}
    ${T(130, 195, "antes: só AB e ab", { s: 12 })}${T(460, 195, "depois: surgem Ab e aB (recombinantes)", { s: 12 })}`);

  F.eletroforese = () =>
    svg(640, 260, `
    <rect x="80" y="30" width="400" height="200" rx="10" fill="var(--lilac)" fill-opacity=".45" stroke="var(--ink)" stroke-width="2"/>
    ${["Mãe", "Filho", "Pai 1", "Pai 2"].map((n, i) => `${T(140 + i * 100, 24, n, { w: 800, s: 12 })}<rect x="${120 + i * 100}" y="36" width="40" height="8" fill="var(--ink)"/>`).join("")}
    ${[[0, 70], [0, 120], [0, 175], [1, 70], [1, 150], [1, 200], [2, 95], [2, 150], [2, 200], [3, 85], [3, 130], [3, 185]].map(([c, y]) => `<rect x="${120 + c * 100}" y="${y}" width="40" height="8" rx="2" fill="${c === 1 ? "var(--orange)" : "var(--violet)"}"/>`).join("")}
    ${T(500, 60, "polo −", { a: "start", s: 12 })}${T(500, 225, "polo +", { a: "start", s: 12 })}
    ${T(500, 120, "fragmentos menores", { a: "start", s: 12 })}${T(500, 138, "andam mais", { a: "start", s: 12 })}
    ${T(280, 252, "Cada banda do filho veio da mãe ou do pai biológico (aqui, o pai 1)", { s: 12, w: 700 })}`);

  F.geologico = () =>
    svg(660, 200, `
    <rect x="20" y="70" width="470" height="50" fill="var(--sand)" stroke="var(--ink)"/><rect x="490" y="70" width="80" height="50" fill="var(--sky)" stroke="var(--ink)"/><rect x="570" y="70" width="50" height="50" fill="var(--lime)" stroke="var(--ink)"/><rect x="620" y="70" width="22" height="50" fill="var(--pink)" stroke="var(--ink)"/>
    ${T(255, 100, "Pré-Cambriano (≈ 88% da história da Terra)", { w: 800 })}${T(530, 100, "Paleozoica", { s: 11, w: 800 })}${T(595, 100, "Mesoz.", { s: 10, w: 800 })}${T(631, 62, "Cen.", { s: 10, w: 800 })}
    ${T(20, 145, "4,6 bi: Terra", { a: "start", s: 11 })}${T(90, 165, "≈ 3,8 bi: primeiras células", { a: "start", s: 11 })}${T(330, 145, "oxigênio se acumula na atmosfera", { a: "start", s: 11 })}
    ${T(490, 40, "peixes, plantas terrestres", { s: 11 })}${T(595, 160, "dinossauros", { s: 11 })}${T(600, 182, "66 mi: extinção", { s: 11 })}${T(630, 40, "humanos", { s: 11, a: "end" })}`);

  F.crescimento = () =>
    svg(640, 260, arrow("acr") + `
    ${line(60, 220, 600, 220, "acr")}${line(60, 220, 60, 20, "acr")}${T(595, 244, "tempo", { a: "end", c: "var(--muted)" })}${T(66, 18, "indivíduos", { a: "start", c: "var(--muted)" })}
    <path d="M60 215C200 212 260 190 300 120S340 30 360 25" fill="none" stroke="var(--orange)" stroke-width="4" stroke-dasharray="8 6"/>
    <path d="M60 215C200 212 260 190 320 140S430 75 590 70" fill="none" stroke="var(--violet)" stroke-width="4"/>
    <line x1="60" y1="68" x2="600" y2="68" stroke="var(--pink)" stroke-width="2" stroke-dasharray="5 5"/>${T(595, 60, "capacidade de suporte", { a: "end", s: 12, c: "var(--pink)", w: 800 })}
    ${T(370, 40, "curva J: potencial biótico", { a: "start", s: 12, c: "var(--orange)", w: 800 })}${T(420, 120, "curva S: crescimento real", { a: "start", s: 12, c: "var(--violet)", w: 800 })}
    ${T(400, 140, "(limitado pela resistência do meio)", { a: "start", s: 11 })}`);

  F.sucessao = () => fluxo("asu", [["Rocha nua", "ou área devastada"], ["Pioneiras", "liquens, musgos"], ["Gramíneas", "e arbustos"], ["Árvores", "de crescimento rápido"], ["Clímax", "mais espécies e biomassa"]], 660, 150, "Biodiversidade, biomassa e estabilidade aumentam ao longo da sucessão");

  F.hardy = () =>
    svg(640, 220, `
    ${box(40, 40, 160, 70, "var(--butter)", "", {})}${T(120, 70, "p = f(A)", { w: 800, s: 16 })}${T(120, 92, "q = f(a)", { w: 800, s: 16 })}
    ${T(330, 70, "p + q = 1", { w: 800, s: 22 })}${T(330, 110, "p² + 2pq + q² = 1", { w: 800, s: 22, c: "var(--violet)" })}
    ${box(450, 40, 160, 70, "var(--lime)", "", {})}${T(530, 64, "AA = p²", { w: 800 })}${T(530, 84, "Aa = 2pq", { w: 800 })}${T(530, 104, "aa = q²", { w: 800 })}
    ${T(320, 160, "Vale só sem seleção, mutação, migração ou deriva,", { s: 12 })}${T(320, 180, "com população grande e cruzamentos ao acaso", { s: 12 })}`);

  F.olho = () =>
    svg(720, 230, arrow("aol", "var(--orange)") + `
    <ellipse cx="380" cy="115" rx="120" ry="90" fill="var(--white)" stroke="var(--ink)" stroke-width="2"/>
    <path d="M500 60A120 90 0 0 1 500 170" fill="none" stroke="var(--pink)" stroke-width="8"/>
    <ellipse cx="275" cy="115" rx="14" ry="38" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M262 70Q245 115 262 160" fill="none" stroke="var(--ink)" stroke-width="2"/>
    ${[90, 140].map((y) => `<line x1="60" y1="${y}" x2="262" y2="${y}" stroke="var(--orange)" stroke-width="2"/><line x1="282" y1="${y}" x2="498" y2="115" stroke="var(--orange)" stroke-width="2" marker-end="url(#aol)"/>`).join("")}
    ${T(240, 50, "córnea", { s: 12, a: "end" })}${T(275, 180, "lente (cristalino)", { s: 12 })}${T(560, 70, "retina", { s: 12, a: "start" })}${T(560, 88, "cones: cores", { s: 11, a: "start" })}${T(560, 104, "bastonetes: pouca luz", { s: 11, a: "start" })}
    ${T(320, 222, "Miopia: foco antes da retina (lente divergente) · Hipermetropia: depois (convergente)", { s: 11, c: "var(--violet)", w: 700 })}`);

  F.digestao = () => fluxo("adi", [["Boca", "amilase salivar"], ["Estômago", "pepsina, ácido"], ["Duodeno", "bile, suco pancreático"], ["Intestino delgado", "absorção"], ["Intestino grosso", "água, fezes"]], 660, 150, "Carboidratos começam na boca · proteínas no estômago · gorduras no duodeno (com a bile)");
})();
