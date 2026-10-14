// Ilustrações originais do Easy Study para os módulos de História.
(function () {
  const T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.s || 13}" font-weight="${o.w || 600}" fill="${o.c || "var(--ink)"}" text-anchor="${o.a || "middle"}" font-family="DM Sans,system-ui,sans-serif">${t}</text>`;
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
  const arrow = (id, c = "var(--ink)") =>
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker></defs>`;
  const box = (x, y, w, h, fill, label, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 12}" fill="${fill}" stroke="var(--ink)" stroke-width="1.5"/>${label ? T(x + w / 2, y + h / 2 + 5, label, o) : ""}`;
  const C = ["var(--butter)", "var(--lilac)", "var(--mint)", "var(--pink)", "var(--sky)", "var(--lime)", "var(--orange)", "var(--rose)"];
  const F = (window.FIGS = window.FIGS || {});

  // Linha do tempo com rótulos alternados acima e abaixo
  const tl = (ev) => svg(660, 220, `<line x1="20" y1="110" x2="640" y2="110" stroke="var(--ink)" stroke-width="3"/>${ev.map(([a, n], i) => {
    const x = 70 + i * (520 / (ev.length - 1 || 1)), up = i % 2 === 0;
    return `<circle cx="${x}" cy="110" r="9" fill="${C[i % C.length]}" stroke="var(--ink)" stroke-width="1.5"/>${T(x, up ? 80 : 146, a, { w: 800 })}${T(x, up ? 60 : 166, n, { s: 11 })}`;
  }).join("")}`);

  F.tl_prehist = () => tl([["≈ 300 mil", "Homo sapiens na África"], ["≈ 70 mil", "saída da África"], ["≈ 12 mil", "Luzia (MG)"], ["≈ 10 mil a.C.", "agricultura"], ["≈ 4 mil a.C.", "metais"], ["≈ 3200 a.C.", "escrita"]]);
  F.tl_independencias = () => tl([["1776", "EUA"], ["1804", "Haiti"], ["1810–1825", "América espanhola"], ["1822", "Brasil"], ["1826", "Congresso do Panamá"]]);
  F.tl_operario = () => tl([["1811", "ludismo"], ["1838", "cartismo"], ["1848", "Manifesto Comunista"], ["1864", "1ª Internacional"], ["1886", "Chicago (1º de Maio)"], ["1917", "greve geral em SP"]]);
  F.tl_sul = () => tl([["1626", "missões jesuíticas"], ["1680", "Colônia do Sacramento"], ["1750", "Tratado de Madri"], ["1754–56", "Guerra Guaranítica"], ["1835–45", "Farroupilha"], ["1893–95", "Rev. Federalista"]]);
  F.tl_guerras = () => tl([["1914", "1ª Guerra"], ["1917", "Revolução Russa"], ["1929", "crise de Nova York"], ["1933", "Hitler no poder"], ["1939", "2ª Guerra"], ["1945", "bombas atômicas"]]);
  F.tl_gfria = () => tl([["1947", "Doutrina Truman"], ["1949", "OTAN e Rev. Chinesa"], ["1959", "Revolução Cubana"], ["1962", "crise dos mísseis"], ["1989", "queda do Muro"], ["1991", "fim da URSS"]]);
  F.tl_rep1 = () => tl([["1889", "Proclamação"], ["1891", "1ª Constituição"], ["1897", "Canudos"], ["1904", "Revolta da Vacina"], ["1922", "Tenentismo e Semana de Arte"], ["1930", "Revolução de 30"]]);
  F.tl_vargas = () => tl([["1930", "Governo Provisório"], ["1932", "Rev. Constitucionalista"], ["1937", "Estado Novo"], ["1943", "CLT"], ["1954", "suicídio de Vargas"], ["1964", "golpe"]]);
  F.tl_ditadura = () => tl([["1964", "golpe e AI-1"], ["1968", "AI-5"], ["1969–73", "milagre econômico"], ["1979", "Anistia"], ["1984", "Diretas Já"], ["1985", "fim da ditadura"]]);
  F.tl_nova = () => tl([["1988", "Constituição"], ["1989", "eleição direta"], ["1992", "impeachment de Collor"], ["1994", "Plano Real"], ["2003", "Bolsa Família"], ["2016", "impeachment de Dilma"]]);

  F.piramide_social = () =>
    svg(640, 260, `
    <path d="M320 20L380 80H260z" fill="var(--orange)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M260 80H380L430 135H210z" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M210 135H430L480 190H160z" fill="var(--lilac)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M160 190H480L530 245H110z" fill="var(--mint)" stroke="var(--ink)" stroke-width="1.5"/>
    ${T(320, 68, "Faraó", { s: 12, w: 800 })}${T(320, 113, "sacerdotes e nobres", { s: 12 })}${T(320, 168, "escribas e militares", { s: 12 })}${T(320, 224, "camponeses, artesãos e escravizados", { s: 12 })}
    ${T(560, 120, "Quanto mais baixo,", { a: "start", s: 12, c: "var(--violet)", w: 700 })}${T(560, 138, "mais gente e", { a: "start", s: 12, c: "var(--violet)", w: 700 })}${T(560, 156, "mais trabalho", { a: "start", s: 12, c: "var(--violet)", w: 700 })}`);

  F.triangular = () =>
    svg(660, 280, arrow("atr", "var(--violet)") + `
    ${box(270, 20, 120, 48, "var(--sky)", "Europa", { w: 800 })}
    ${box(440, 200, 120, 48, "var(--butter)", "África", { w: 800 })}
    ${box(80, 200, 140, 48, "var(--mint)", "América", { w: 800 })}
    <path d="M390 60Q480 110 495 196" fill="none" stroke="var(--violet)" stroke-width="3" marker-end="url(#atr)"/>
    <path d="M438 228H226" fill="none" stroke="var(--violet)" stroke-width="3" marker-end="url(#atr)"/>
    <path d="M150 198Q170 100 268 52" fill="none" stroke="var(--violet)" stroke-width="3" marker-end="url(#atr)"/>
    ${T(505, 110, "tecidos, armas, rum,", { a: "start", s: 12 })}${T(505, 128, "aguardente, tabaco", { a: "start", s: 12 })}
    ${T(332, 218, "africanos escravizados", { s: 12, w: 800, c: "var(--orange)" })}
    ${T(60, 110, "açúcar, ouro, prata,", { a: "start", s: 12 })}${T(60, 128, "algodão, tabaco", { a: "start", s: 12 })}
    ${T(330, 272, "Cerca de 12,5 milhões de africanos foram embarcados para as Américas; quase 5 milhões chegaram ao Brasil", { s: 11, c: "var(--muted)" })}`);

  F.blocos = () =>
    svg(660, 230, `
    ${box(20, 30, 290, 170, "var(--sky)", "", {})}${box(350, 30, 290, 170, "var(--rose)", "", {})}
    ${T(165, 62, "Bloco capitalista (EUA)", { w: 800, s: 15 })}${T(495, 62, "Bloco socialista (URSS)", { w: 800, s: 15 })}
    ${["mercado e propriedade privada", "OTAN (1949)", "Plano Marshall", "Doutrina Truman"].map((t, i) => T(165, 96 + i * 26, t, { s: 12 })).join("")}
    ${["economia planificada", "Pacto de Varsóvia (1955)", "Comecon", "partido único"].map((t, i) => T(495, 96 + i * 26, t, { s: 12 })).join("")}
    ${T(330, 222, "Disputa sem guerra direta: corrida armamentista, espacial e guerras em outros países (Coreia, Vietnã, Afeganistão)", { s: 11, c: "var(--violet)", w: 700 })}`);

  F.feudo = () =>
    svg(640, 240, `
    ${box(20, 30, 180, 170, "var(--butter)", "", {})}${T(110, 64, "Senhor feudal", { w: 800 })}${T(110, 90, "terra, castelo,", { s: 12 })}${T(110, 108, "proteção e justiça", { s: 12 })}
    ${box(230, 30, 180, 170, "var(--lilac)", "", {})}${T(320, 64, "Servos", { w: 800 })}${T(320, 90, "presos à terra", { s: 12 })}${T(320, 108, "pagam corveia, talha,", { s: 12 })}${T(320, 126, "banalidades", { s: 12 })}
    ${box(440, 30, 180, 170, "var(--mint)", "", {})}${T(530, 64, "Vassalos", { w: 800 })}${T(530, 90, "recebem um feudo", { s: 12 })}${T(530, 108, "e devem fidelidade", { s: 12 })}${T(530, 126, "e ajuda militar", { s: 12 })}
    ${T(320, 228, "Suserania e vassalagem ligavam os nobres; a servidão ligava camponeses e senhores", { s: 12, c: "var(--violet)", w: 700 })}`);
})();
