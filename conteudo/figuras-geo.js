// Ilustrações originais do Easy Study para os módulos de Geografia.
(function () {
  const T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.s || 13}" font-weight="${o.w || 600}" fill="${o.c || "var(--ink)"}" text-anchor="${o.a || "middle"}" font-family="DM Sans,system-ui,sans-serif">${t}</text>`;
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
  const arrow = (id, c = "var(--ink)") =>
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker></defs>`;
  const K = 'stroke="var(--ink)" stroke-width="1.6"';
  const F = (window.FIGS = window.FIGS || {});

  // Estações do ano: Terra em 4 posições ao redor do Sol, eixo sempre inclinado para o mesmo lado
  F.estacoes = () => {
    const terra = (x, y, sombraEsq, rot) => {
      // sombra: metade da Terra oposta ao Sol
      const s = sombraEsq ? `M${x} ${y - 26} A26 26 0 0 0 ${x} ${y + 26} Z` : `M${x} ${y - 26} A26 26 0 0 1 ${x} ${y + 26} Z`;
      return `<circle cx="${x}" cy="${y}" r="26" fill="var(--sky)" ${K}/><path d="${s}" fill="var(--ink)" opacity=".28"/>
        <line x1="${x - 34 * Math.sin(rot)}" y1="${y - 34 * Math.cos(rot)}" x2="${x + 34 * Math.sin(rot)}" y2="${y + 34 * Math.cos(rot)}" stroke="var(--orange)" stroke-width="2.4"/>
        <line x1="${x - 26}" y1="${y}" x2="${x + 26}" y2="${y}" stroke="var(--ink)" stroke-dasharray="3 3"/>`;
    };
    const r = 23.5 * Math.PI / 180;
    return svg(640, 330, arrow("aest2") + `
      <ellipse cx="320" cy="160" rx="245" ry="95" fill="none" stroke="var(--muted)" stroke-dasharray="5 6"/>
      <circle cx="320" cy="160" r="34" fill="var(--butter)" ${K}/>${T(320, 165, "Sol", { w: 800 })}
      ${terra(75, 160, false, r)}${terra(565, 160, true, r)}${terra(320, 65, false, r)}${terra(320, 255, false, r)}
      ${T(75, 210, "21 de dezembro", { s: 12, w: 800 })}${T(75, 226, "verão no Sul", { s: 12, c: "var(--muted)" })}
      ${T(565, 210, "21 de junho", { s: 12, w: 800 })}${T(565, 226, "inverno no Sul", { s: 12, c: "var(--muted)" })}
      ${T(420, 50, "22 de setembro · primavera no Sul", { s: 12, a: "start" })}
      ${T(420, 270, "20 de março · outono no Sul", { s: 12, a: "start" })}
      ${T(320, 318, "O eixo (laranja) fica sempre inclinado ~23,5° para o mesmo lado: é isso que cria as estações", { s: 12, c: "var(--muted)" })}`);
  };

  // Curvas de nível e perfil topográfico
  F.curvas_nivel = () => {
    const cs = [[110, 70, "var(--mint)"], [88, 54, "var(--lime)"], [64, 40, "var(--butter)"], [40, 26, "var(--peach)"], [18, 12, "var(--orange)"]];
    const ell = cs.map(([rx, ry, c], i) => `<ellipse cx="${170 + i * 8}" cy="140" rx="${rx}" ry="${ry}" fill="${c}" ${K}/>`).join("");
    return svg(640, 300, arrow("acn") + `
      ${ell}
      ${[0, 1, 2, 3, 4].map((i) => T(170 + i * 8, 140 - cs[i][1] + 11, (i + 1) * 100, { s: 10, w: 800 })).join("")}
      <line x1="40" y1="150" x2="300" y2="150" stroke="var(--violet)" stroke-width="2" stroke-dasharray="6 4"/>
      ${T(32, 155, "A", { w: 800, c: "var(--violet)" })}${T(310, 155, "B", { w: 800, c: "var(--violet)" })}
      ${T(170, 240, "lado oeste: curvas afastadas", { s: 11, c: "var(--muted)" })}${T(170, 256, "lado leste: curvas juntas (íngreme)", { s: 11, c: "var(--muted)" })}
      <line x1="345" y1="250" x2="620" y2="250" ${K}/><line x1="345" y1="250" x2="345" y2="60" ${K}/>
      ${[1, 2, 3, 4, 5].map((i) => `<line x1="345" y1="${250 - i * 34}" x2="620" y2="${250 - i * 34}" stroke="var(--hair)"/>${T(338, 254 - i * 34, i * 100, { s: 10, a: "end", c: "var(--muted)" })}`).join("")}
      <path d="M352 250 C420 236 450 200 480 170 C505 140 520 100 536 82 C548 92 556 140 566 190 C576 230 590 246 612 250 Z" fill="var(--peach)" ${K}/>
      ${T(352, 270, "A", { w: 800, c: "var(--violet)" })}${T(612, 270, "B", { w: 800, c: "var(--violet)" })}
      ${T(482, 290, "perfil topográfico de A até B", { s: 12, c: "var(--muted)" })}${T(170, 26, "mapa com curvas de nível (m)", { s: 12, c: "var(--muted)" })}`);
  };

  // Limites entre placas
  F.placas_limites = () => {
    const bloco = (x, label, body) => `<g transform="translate(${x} 0)">${body}${T(95, 280, label, { w: 800 })}</g>`;
    return svg(640, 300, arrow("apl", "var(--orange)") + arrow("apl2", "var(--violet)") +
      bloco(10, "Divergente", `
        <rect x="10" y="120" width="80" height="40" fill="var(--sky)" ${K}/><rect x="100" y="120" width="80" height="40" fill="var(--sky)" ${K}/>
        <path d="M90 200 L90 160 L100 160 L100 200 Z M95 160 L95 112" fill="var(--orange)" stroke="var(--orange)" stroke-width="3"/>
        <rect x="10" y="160" width="170" height="60" fill="var(--peach)" opacity=".6"/>
        <line x1="70" y1="100" x2="30" y2="100" stroke="var(--orange)" stroke-width="3" marker-end="url(#apl)"/><line x1="120" y1="100" x2="160" y2="100" stroke="var(--orange)" stroke-width="3" marker-end="url(#apl)"/>
        ${T(95, 248, "magma sobe, nova crosta", { s: 11, c: "var(--muted)" })}${T(95, 262, "dorsal mesoatlântica", { s: 11, c: "var(--muted)" })}`) +
      bloco(220, "Convergente", `
        <path d="M10 120 L110 120 L110 160 L10 160 Z" fill="var(--sky)" ${K}/>
        <path d="M110 120 L120 104 L130 92 L140 104 L180 110 L180 160 L110 160 Z" fill="var(--butter)" ${K}/>
        <path d="M110 160 L170 215 L160 222 L100 168 Z" fill="var(--sky)" ${K}/>
        <path d="M128 92 L131 70" stroke="var(--orange)" stroke-width="4"/><circle cx="131" cy="66" r="4" fill="var(--orange)"/>
        <line x1="30" y1="100" x2="80" y2="100" stroke="var(--orange)" stroke-width="3" marker-end="url(#apl)"/>
        ${T(95, 248, "subducção: fossa, vulcões", { s: 11, c: "var(--muted)" })}${T(95, 262, "e cordilheiras (Andes)", { s: 11, c: "var(--muted)" })}`) +
      bloco(430, "Transformante", `
        <rect x="20" y="70" width="150" height="70" fill="var(--butter)" ${K}/><rect x="20" y="140" width="150" height="70" fill="var(--mint)" ${K}/>
        <line x1="20" y1="140" x2="170" y2="140" stroke="var(--violet)" stroke-width="3"/>
        <line x1="130" y1="105" x2="60" y2="105" stroke="var(--orange)" stroke-width="3" marker-end="url(#apl)"/><line x1="60" y1="175" x2="130" y2="175" stroke="var(--orange)" stroke-width="3" marker-end="url(#apl)"/>
        ${T(95, 248, "placas deslizam lado a lado", { s: 11, c: "var(--muted)" })}${T(95, 262, "terremotos (San Andreas)", { s: 11, c: "var(--muted)" })}`) +
      T(320, 26, "O que acontece nos limites entre as placas", { s: 13, c: "var(--muted)" }));
  };

  // Perfil do solo
  F.perfil_solo = () => {
    const h = [["O", "folhas e restos orgânicos", 34, "#6B4F2A"], ["A", "rico em húmus, raízes", 54, "#8A6236"], ["B", "acúmulo de argila e minerais", 64, "#B9824B"], ["C", "rocha em decomposição", 56, "#D8B88A"], ["R", "rocha-mãe", 46, "#9C9A96"]];
    let y = 30;
    const camadas = h.map(([n, d, hh, c]) => {
      const out = `<rect x="150" y="${y}" width="180" height="${hh}" fill="${c}" ${K}/>${T(130, y + hh / 2 + 5, n, { w: 800, s: 16, a: "end" })}
        <line x1="340" y1="${y + hh / 2}" x2="370" y2="${y + hh / 2}" stroke="var(--muted)"/>${T(378, y + hh / 2 + 4, d, { s: 13, a: "start" })}`;
      y += hh; return out;
    }).join("");
    return svg(640, 300, camadas +
      `<path d="M190 30 l0 -16 M190 22 l-8 -8 M190 22 l8 -8 M260 30 l0 -12 M260 20 l7 -6" stroke="var(--ok)" stroke-width="3" stroke-linecap="round"/>
       <path d="M190 64 q-6 30 4 60 M190 90 q14 10 18 30 M260 64 q8 26 0 50" stroke="#3B2A16" stroke-width="1.6" fill="none"/>
       <circle cx="230" cy="250" r="9" fill="#7D7B78"/><circle cx="290" cy="240" r="6" fill="#7D7B78"/><circle cx="185" cy="232" r="7" fill="#B0A389"/>
       ${T(240, 296, "superfície no alto, rocha embaixo", { s: 11, c: "var(--muted)" })}`);
  };

  // Ciclo da água
  F.ciclo_agua = () =>
    svg(640, 300, arrow("aca", "var(--violet)") + `
      <rect x="0" y="230" width="640" height="70" fill="var(--sky)"/>
      <path d="M0 230 L250 230 L330 150 L380 110 L430 140 L520 200 L640 210 L640 300 L0 300 Z" fill="var(--mint)" ${K}/>
      <path d="M0 232 L250 232" stroke="var(--ink)" stroke-width="1.6"/>
      ${T(110, 270, "oceano", { w: 800 })}
      <circle cx="70" cy="50" r="24" fill="var(--butter)" ${K}/>
      <g fill="var(--white)" ${K}><path d="M190 70 a18 18 0 0 1 34 -8 a16 16 0 0 1 30 6 a14 14 0 0 1 2 28 h-62 a14 14 0 0 1 -4 -26 Z"/><path d="M400 54 a18 18 0 0 1 34 -8 a16 16 0 0 1 30 6 a14 14 0 0 1 2 28 h-62 a14 14 0 0 1 -4 -26 Z"/></g>
      <path d="M120 220 C120 170 150 120 190 100" fill="none" stroke="var(--violet)" stroke-width="2.4" stroke-dasharray="5 4" marker-end="url(#aca)"/>${T(80, 160, "evaporação", { s: 12 })}
      <path d="M262 80 L392 70" fill="none" stroke="var(--violet)" stroke-width="2.4" marker-end="url(#aca)"/>${T(330, 62, "condensação e vento", { s: 12 })}
      ${[410, 425, 440, 455, 470].map((x) => `<line x1="${x}" y1="96" x2="${x - 6}" y2="118" stroke="var(--violet)" stroke-width="2"/>`).join("")}${T(500, 112, "precipitação", { s: 12, a: "start" })}
      <path d="M470 175 C500 200 520 215 560 222" fill="none" stroke="var(--violet)" stroke-width="2.4" marker-end="url(#aca)"/>${T(560, 190, "escoamento", { s: 12 })}
      <path d="M430 170 L430 220" stroke="var(--violet)" stroke-width="2.4" stroke-dasharray="3 4" marker-end="url(#aca)"/>${T(420, 240, "infiltração", { s: 12, a: "end" })}
      <path d="M345 140 l0 -20 M345 128 l-6 -6 M345 128 l6 -6" stroke="var(--ok)" stroke-width="3"/>
      <path d="M345 116 C345 100 330 90 320 84" fill="none" stroke="var(--violet)" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#aca)"/>${T(300, 132, "evapotranspiração", { s: 11, a: "end" })}`);

  // Tipos de chuva
  F.chuvas = () => {
    const nuvem = (x, y) => `<path d="M${x} ${y} a14 14 0 0 1 26 -6 a12 12 0 0 1 23 4 a11 11 0 0 1 1 22 h-48 a11 11 0 0 1 -2 -20 Z" fill="var(--white)" ${K}/>` +
      [8, 20, 32, 44].map((d) => `<line x1="${x + d}" y1="${y + 24}" x2="${x + d - 5}" y2="${y + 40}" stroke="var(--violet)" stroke-width="2"/>`).join("");
    return svg(640, 300, arrow("ach", "var(--orange)") + arrow("ach2", "var(--sky)") + `
      <line x1="213" y1="20" x2="213" y2="280" stroke="var(--hair)"/><line x1="426" y1="20" x2="426" y2="280" stroke="var(--hair)"/>
      <rect x="10" y="220" width="190" height="20" fill="var(--mint)" ${K}/>
      <path d="M100 215 L100 120" stroke="var(--orange)" stroke-width="3" marker-end="url(#ach)"/>${nuvem(72, 80)}
      <circle cx="40" cy="60" r="16" fill="var(--butter)" ${K}/>
      ${T(105, 262, "Convectiva", { w: 800 })}${T(105, 278, "o calor faz o ar subir", { s: 11, c: "var(--muted)" })}
      <path d="M230 240 L310 240 L360 110 L410 240 Z" fill="var(--mint)" ${K}/>
      <path d="M232 200 C270 196 300 170 330 130" fill="none" stroke="var(--orange)" stroke-width="3" marker-end="url(#ach)"/>${nuvem(290, 92)}
      ${T(262, 186, "barlavento", { s: 11, c: "var(--muted)" })}${T(395, 200, "sotavento", { s: 11, c: "var(--muted)", a: "end" })}
      ${T(318, 262, "Orográfica", { w: 800 })}${T(318, 278, "a serra força o ar a subir", { s: 11, c: "var(--muted)" })}
      <path d="M440 240 L600 240 L600 170 Z" fill="var(--sky)" ${K}/>${T(570, 228, "ar frio", { s: 11, w: 800 })}
      <path d="M450 230 C500 210 540 170 560 130" fill="none" stroke="var(--orange)" stroke-width="3" marker-end="url(#ach)"/>${T(470, 206, "ar quente", { s: 11, w: 800, a: "start" })}${nuvem(530, 92)}
      ${T(530, 262, "Frontal", { w: 800 })}${T(530, 278, "o ar quente sobe sobre o frio", { s: 11, c: "var(--muted)" })}`);
  };

  // Biomas por latitude
  F.biomas_latitude = () => {
    const faixas = [["Tundra", "var(--lav)", "polar"], ["Taiga", "#7FB89A", "frio"], ["Floresta temperada e pradaria", "var(--lime)", "temperado"], ["Deserto", "var(--sand)", "árido (cerca de 30°)"], ["Savana", "var(--butter)", "tropical com seca"], ["Floresta tropical", "#4FBF7A", "equatorial (0°)"]];
    return svg(640, 300, faixas.map(([n, c, cl], i) => `<rect x="60" y="${20 + i * 42}" width="300" height="42" fill="${c}" ${K}/>${T(210, 46 + i * 42, n, { w: 800 })}${T(380, 46 + i * 42, cl, { s: 12, a: "start", c: "var(--muted)" })}`).join("") +
      `<line x1="40" y1="272" x2="40" y2="24" stroke="var(--ink)" stroke-width="1.8" marker-end="url(#abl)"/>${arrow("abl")}
       ${T(30, 150, "latitude aumenta", { s: 11, c: "var(--muted)" }).replace("<text", '<text transform="rotate(-90 30 150)"')}
       <path d="M520 275 L580 120 L640 275 Z" fill="#4FBF7A" ${K}/><path d="M546 207 L580 120 L614 207 Z" fill="#7FB89A"/><path d="M566 157 L580 120 L594 157 Z" fill="var(--white)"/><path d="M520 275 L580 120 L640 275 Z" fill="none" ${K}/>
       ${T(636, 292, "na montanha, o mesmo efeito com a altitude", { s: 11, c: "var(--muted)", a: "end" })}`);
  };

  // Efeito estufa
  F.efeito_estufa = () =>
    svg(640, 300, arrow("aee", "var(--orange)") + arrow("aee2", "var(--pink)") + `
      <rect x="0" y="240" width="640" height="60" fill="var(--mint)" ${K}/>${T(320, 275, "superfície da Terra", { w: 800 })}
      <path d="M0 110 Q320 70 640 110" fill="none" stroke="var(--violet)" stroke-width="10" opacity=".35"/>${T(145, 112, "gases de efeito estufa", { s: 12, w: 800, a: "start" })}
      <circle cx="60" cy="40" r="26" fill="var(--butter)" ${K}/>
      <line x1="85" y1="55" x2="200" y2="236" stroke="var(--orange)" stroke-width="3" marker-end="url(#aee)"/>${T(125, 150, "luz do Sol", { s: 12, a: "end" })}
      <path d="M240 236 L280 160 L320 115" fill="none" stroke="var(--pink)" stroke-width="3" stroke-dasharray="6 4" marker-end="url(#aee2)"/>
      <path d="M322 120 L360 180 L380 230" fill="none" stroke="var(--pink)" stroke-width="3" stroke-dasharray="6 4" marker-end="url(#aee2)"/>
      ${T(392, 178, "parte volta à superfície", { s: 12, a: "start" })}
      <path d="M570 236 L600 70 L606 22" fill="none" stroke="var(--pink)" stroke-width="3" stroke-dasharray="6 4" marker-end="url(#aee2)"/>${T(594, 40, "parte escapa", { s: 12, a: "end" })}
      ${T(320, 22, "Mais CO₂ e metano = camada mais 'grossa' = mais calor retido", { s: 12, c: "var(--muted)" })}`);

  // Matriz: renováveis Brasil x mundo (valores aproximados)
  F.matriz = () => {
    const bar = (x, v, c, lab) => `<rect x="${x}" y="${250 - v * 2}" width="70" height="${v * 2}" fill="${c}" ${K}/>${T(x + 35, 242 - v * 2, "≈" + v + "%", { w: 800 })}${T(x + 35, 270, lab, { s: 12 })}`;
    return svg(640, 300, `<line x1="40" y1="250" x2="620" y2="250" ${K}/>
      ${T(170, 26, "Matriz energética (toda a energia)", { w: 800 })}${T(470, 26, "Matriz elétrica (só eletricidade)", { w: 800 })}
      ${bar(90, 49, "var(--lime)", "Brasil")}${bar(180, 15, "var(--hair)", "Mundo")}
      ${bar(390, 88, "var(--lime)", "Brasil")}${bar(480, 30, "var(--hair)", "Mundo")}
      ${T(320, 292, "Participação aproximada das fontes renováveis (EPE e IEA, dados da década de 2020)", { s: 11, c: "var(--muted)" })}`);
  };

  // Revoluções industriais
  F.revolucoes = () => {
    const e = [["1ª", "c. 1760", "carvão e vapor", "têxtil, ferrovias", "var(--sand)"], ["2ª", "c. 1870", "eletricidade e petróleo", "aço, química, carros", "var(--butter)"], ["3ª", "c. 1950-70", "eletrônica e informática", "robôs, telecom", "var(--sky)"], ["4.0", "séc. XXI", "dados e IA", "internet das coisas", "var(--lilac)"]];
    return svg(640, 260, arrow("arv") + `<line x1="20" y1="60" x2="620" y2="60" stroke="var(--ink)" stroke-width="2" marker-end="url(#arv)"/>` +
      e.map(([n, a, en, ex, c], i) => { const x = 30 + i * 150; return `<circle cx="${x + 60}" cy="60" r="8" fill="${c}" ${K}/>${T(x + 60, 40, a, { s: 12, c: "var(--muted)" })}
        <rect x="${x}" y="84" width="130" height="140" rx="14" fill="${c}" ${K}/>${T(x + 65, 118, n, { s: 26, w: 800 })}
        ${T(x + 65, 152, en.split(" e ")[0] + (en.includes(" e ") ? " e" : ""), { s: 12, w: 800 })}${en.includes(" e ") ? T(x + 65, 168, en.split(" e ")[1], { s: 12, w: 800 }) : ""}
        ${T(x + 65, 200, ex, { s: 11, c: "var(--muted)" })}`; }).join(""));
  };

  // Pirâmides etárias
  F.piramides = () => {
    const pir = (x0, larg, titulo, sub) => {
      const n = larg.length, hh = 22;
      const bars = larg.map((w, i) => { const y = 230 - (i + 1) * hh; return `<rect x="${x0 - w}" y="${y}" width="${w}" height="${hh - 3}" fill="var(--sky)" ${K}/><rect x="${x0}" y="${y}" width="${w}" height="${hh - 3}" fill="var(--rose)" ${K}/>`; }).join("");
      return bars + T(x0, 256, titulo, { w: 800 }) + T(x0, 274, sub, { s: 11, c: "var(--muted)" });
    };
    return svg(640, 290, pir(110, [80, 68, 56, 44, 32, 22, 12, 6], "Jovem", "base larga") + pir(320, [50, 54, 56, 54, 48, 38, 26, 12], "Adulta", "Brasil hoje") + pir(530, [34, 38, 44, 50, 52, 50, 44, 32], "Envelhecida", "topo largo") +
      T(30, 24, "homens", { s: 11, c: "var(--muted)", a: "start" }) + T(610, 24, "mulheres", { s: 11, c: "var(--muted)", a: "end" }) + T(320, 24, "idosos no alto, crianças embaixo", { s: 11, c: "var(--muted)" }));
  };

  // Hierarquia urbana: clássica x atual
  F.hierarquia_urbana = () => {
    const no = (x, y, r, c, t) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${K}/>${t ? T(x, y + 4, t, { s: 10, w: 800 }) : ""}`;
    const L = (a, b, d) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${d ? "var(--pink)" : "var(--ink)"}" stroke-width="${d ? 2 : 1.4}" ${d ? 'stroke-dasharray="5 4"' : ""}/>`;
    const esq = () => {
      const m = [160, 60], r1 = [90, 140], r2 = [230, 140], l = [[50, 220], [120, 220], [200, 220], [270, 220]];
      return L(m, r1) + L(m, r2) + L(r1, l[0]) + L(r1, l[1]) + L(r2, l[2]) + L(r2, l[3]) + no(...m, 26, "var(--violet)", "") + no(...r1, 17, "var(--lilac)", "") + no(...r2, 17, "var(--lilac)", "") + l.map((p) => no(...p, 10, "var(--butter)", "")).join("");
    };
    const dir = () => {
      const o = 320, m = [160 + o, 60], r1 = [90 + o, 140], r2 = [230 + o, 140], l = [[50 + o, 220], [120 + o, 220], [200 + o, 220], [270 + o, 220]];
      return L(m, r1) + L(m, r2) + L(r1, l[0]) + L(r1, l[1]) + L(r2, l[2]) + L(r2, l[3]) + L(m, l[0], 1) + L(m, l[3], 1) + L(r1, r2, 1) + L(l[1], [620, 30], 1) + no(...m, 26, "var(--violet)", "") + no(...r1, 17, "var(--lilac)", "") + no(...r2, 17, "var(--lilac)", "") + l.map((p) => no(...p, 10, "var(--butter)", "")).join("") + T(612, 24, "exterior", { s: 10, a: "end", c: "var(--muted)" });
    };
    return svg(640, 280, esq() + dir() + `<line x1="320" y1="20" x2="320" y2="250" stroke="var(--hair)"/>` +
      T(160, 256, "Hierarquia clássica", { w: 800 }) + T(160, 272, "metrópole → cidade média → cidade pequena", { s: 11, c: "var(--muted)" }) +
      T(480, 256, "Rede atual", { w: 800 }) + T(480, 272, "ligações diretas (rosa) pulam níveis", { s: 11, c: "var(--muted)" }));
  };

  // Degraus da integração econômica
  F.integracao = () => {
    const d = [["Zona de livre comércio", "tarifas internas caem", "USMCA", "var(--mint)"], ["União aduaneira", "+ Tarifa Externa Comum", "Mercosul", "var(--sky)"], ["Mercado comum", "+ pessoas, serviços e capitais circulam", "", "var(--lilac)"], ["União econômica e monetária", "+ moeda única", "União Europeia", "var(--butter)"]];
    return svg(640, 290, d.map(([n, s, ex, c], i) => { const x = 20 + i * 150, h = 70 + i * 45, y = 250 - h; return `<rect x="${x}" y="${y}" width="145" height="${h}" rx="10" fill="${c}" ${K}/>
      ${T(x + 72, y + 22, n.length > 18 ? n.split(" ").slice(0, 2).join(" ") : n, { s: 12, w: 800 })}${n.length > 18 ? T(x + 72, y + 38, n.split(" ").slice(2).join(" "), { s: 12, w: 800 }) : ""}
      ${ex ? T(x + 72, 240, "ex.: " + ex, { s: 11, c: "var(--muted)" }) : ""}`; }).join("") +
      d.map(([n, s], i) => T(20 + i * 150 + 72, 270 + (i % 2) * 14, s, { s: 10, c: "var(--muted)" })).join(""));
  };
})();
