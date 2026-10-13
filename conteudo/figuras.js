// Ilustrações originais do Easy Study (SVG desenhado em código, no estilo da plataforma).
(function () {
  const T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.s || 13}" font-weight="${o.w || 600}" fill="${o.c || "var(--ink)"}" text-anchor="${o.a || "middle"}" font-family="DM Sans,system-ui,sans-serif">${t}</text>`;
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
  const arrow = (id, c = "var(--ink)") =>
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker></defs>`;
  const box = (x, y, w, h, fill, label, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 12}" fill="${fill}" stroke="var(--ink)" stroke-width="1.5"/>${T(x + w / 2, y + h / 2 + 5, label, o)}`;
  const line = (x1, y1, x2, y2, m, c = "var(--ink)", dash = "") =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2" ${dash ? `stroke-dasharray="${dash}"` : ""} ${m ? `marker-end="url(#${m})"` : ""}/>`;

  const F = {};

  /* ---------- Biologia ---------- */
  F.celula = () =>
    svg(620, 330, `
    <ellipse cx="230" cy="165" rx="200" ry="140" fill="var(--rose)" stroke="var(--ink)" stroke-width="2"/>
    <circle cx="215" cy="160" r="52" fill="var(--lilac)" stroke="var(--ink)" stroke-width="1.5"/><circle cx="225" cy="150" r="14" fill="var(--violet)"/>
    <ellipse cx="335" cy="105" rx="40" ry="20" fill="var(--orange)" stroke="var(--ink)" stroke-width="1.5"/><path d="M302 105q12-12 22 0t22 0t22 0" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M110 230q20-18 40 0t40 0" fill="none" stroke="var(--violet)" stroke-width="5" stroke-linecap="round"/><path d="M112 248q20-18 40 0t40 0" fill="none" stroke="var(--violet)" stroke-width="5" stroke-linecap="round"/>
    <circle cx="330" cy="220" r="17" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>
    ${[[120,120],[140,95],[300,170],[290,250],[160,270],[355,175]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="var(--ink)"/>`).join("")}
    ${T(470,60,"Membrana plasmática",{a:"start"})}${line(465,56,400,90)}
    ${T(470,110,"Mitocôndria (ATP)",{a:"start"})}${line(465,106,378,106)}
    ${T(470,160,"Núcleo (DNA)",{a:"start"})}${line(465,156,268,158)}
    ${T(470,210,"Lisossomo (digestão)",{a:"start"})}${line(465,206,348,218)}
    ${T(470,260,"Ribossomos (proteínas)",{a:"start"})}${line(465,256,300,250)}
    ${T(470,300,"Golgi (secreção)",{a:"start"})}${line(465,296,195,250)}`);

  F.dna = () => {
    let b = "";
    const pares = [["A", "T"], ["C", "G"], ["T", "A"], ["G", "C"], ["A", "T"], ["G", "C"], ["T", "A"]];
    pares.forEach(([a, t], i) => {
      const x = 70 + i * 70;
      b += `<line x1="${x}" y1="80" x2="${x}" y2="200" stroke="var(--ink)" stroke-width="1.5"/>
      <rect x="${x - 18}" y="92" width="36" height="34" rx="8" fill="${a === "A" || a === "T" ? "var(--butter)" : "var(--sky)"}" stroke="var(--ink)" stroke-width="1.5"/>${T(x, 115, a, { s: 15, w: 800 })}
      <rect x="${x - 18}" y="154" width="36" height="34" rx="8" fill="${t === "A" || t === "T" ? "var(--butter)" : "var(--sky)"}" stroke="var(--ink)" stroke-width="1.5"/>${T(x, 177, t, { s: 15, w: 800 })}`;
    });
    return svg(600, 260, `<path d="M40 80H560M40 200H560" stroke="var(--violet)" stroke-width="8" stroke-linecap="round"/>${b}
    ${T(300,40,"Fita molde e fita complementar: A pareia com T e C pareia com G",{s:14})}${T(300,240,"No RNA, a uracila (U) ocupa o lugar da timina (T)",{c:"var(--muted)"})}`);
  };

  F.punnett = () =>
    svg(520, 300, `
    ${T(260,30,"Cruzamento Aa × Aa",{s:15,w:800})}
    ${box(170,50,110,50,"var(--butter)","A",{s:18,w:800})}${box(290,50,110,50,"var(--sky)","a",{s:18,w:800})}
    ${box(50,110,110,70,"var(--butter)","A",{s:18,w:800})}${box(50,190,110,70,"var(--sky)","a",{s:18,w:800})}
    ${box(170,110,110,70,"var(--lime)","AA",{s:18,w:800})}${box(290,110,110,70,"var(--lime)","Aa",{s:18,w:800})}
    ${box(170,190,110,70,"var(--lime)","Aa",{s:18,w:800})}${box(290,190,110,70,"var(--rose)","aa",{s:18,w:800})}
    ${T(460,140,"3 dominantes",{a:"middle"})}${T(460,160,"1 recessivo",{a:"middle"})}${T(460,195,"P(aa) = 1/4",{w:800,c:"var(--violet)"})}`);

  F.piramide = () =>
    svg(600, 300, `
    <path d="M300 30L380 100H220z" fill="var(--pink)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M220 100H380L440 170H160z" fill="var(--orange)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M160 170H440L500 240H100z" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M100 240H500L540 285H60z" fill="var(--mint)" stroke="var(--ink)" stroke-width="1.5"/>
    ${T(300,80,"Consumidor 3ª",{s:12})}${T(300,142,"Consumidor 2ª",{})}${T(300,212,"Consumidor 1ª (herbívoros)",{})}${T(300,270,"Produtores (fotossíntese)",{})}
    ${T(560,60,"≈ 10% da energia",{a:"end",c:"var(--violet)",w:800})}${T(560,80,"passa a cada nível",{a:"end",c:"var(--violet)"})}`);

  F.nitrogenio = () =>
    svg(620, 320, arrow("an") + `
    ${box(230,20,160,46,"var(--sky)","N₂ na atmosfera")}
    ${box(40,140,170,46,"var(--butter)","Amônia (NH₃)")}
    ${box(410,140,170,46,"var(--lime)","Nitrato (NO₃⁻)")}
    ${box(230,250,160,46,"var(--mint)","Plantas e animais")}
    ${line(250,66,140,138,"an")}${T(150,95,"Fixação (Rhizobium)",{a:"end",s:12})}
    ${line(210,163,408,163,"an")}${T(310,155,"Nitrificação",{s:12})}
    ${line(495,186,390,250,"an")}${T(500,232,"Absorção",{a:"start",s:12})}
    ${line(500,138,380,66,"an")}${T(470,95,"Desnitrificação",{a:"start",s:12})}
    ${line(230,275,125,188,"an")}${T(120,240,"Decomposição",{a:"end",s:12})}`);

  F.circulacao = () =>
    svg(660, 320, arrow("ac", "var(--violet)") + `
    ${box(240,120,120,80,"var(--rose)","Coração",{s:15,w:800})}
    ${box(230,20,140,50,"var(--sky)","Pulmões")}
    ${box(230,250,140,50,"var(--butter)","Corpo (tecidos)")}
    <path d="M260 120V72" stroke="var(--violet)" stroke-width="3" marker-end="url(#ac)"/><path d="M340 72V118" stroke="var(--orange)" stroke-width="3" marker-end="url(#ac)"/>
    <path d="M340 200V248" stroke="var(--orange)" stroke-width="3" marker-end="url(#ac)"/><path d="M260 248V202" stroke="var(--violet)" stroke-width="3" marker-end="url(#ac)"/>
    ${T(120,95,"Pequena circulação",{w:800})}${T(120,113,"sangue vai oxigenar",{c:"var(--muted)",s:12})}
    ${T(120,235,"Grande circulação",{w:800})}${T(120,253,"leva O₂ ao corpo",{c:"var(--muted)",s:12})}
    <rect x="430" y="110" width="16" height="16" fill="var(--orange)"/>${T(452,123,"Sangue arterial (rico em O₂)",{a:"start",s:12})}
    <rect x="430" y="140" width="16" height="16" fill="var(--violet)"/>${T(452,153,"Sangue venoso (rico em CO₂)",{a:"start",s:12})}`);

  F.evolucao = () =>
    svg(680, 300, `
    <path d="M300 280V200M300 200L170 120M300 200L430 120M170 120L110 50M170 120L230 50M430 120L380 50M430 120L490 50" stroke="var(--ink)" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${[[110,50,"var(--butter)"],[230,50,"var(--lilac)"],[380,50,"var(--sky)"],[490,50,"var(--mint)"]].map(([x,y,c],i)=>`<circle cx="${x}" cy="${y-18}" r="18" fill="${c}" stroke="var(--ink)" stroke-width="1.5"/>${T(x,y-13,"Esp. "+(i+1),{s:10})}`).join("")}
    <circle cx="300" cy="200" r="7" fill="var(--pink)"/>${T(320,205,"Ancestral comum",{a:"start"})}
    <circle cx="170" cy="120" r="6" fill="var(--orange)"/><circle cx="430" cy="120" r="6" fill="var(--orange)"/>
    ${T(470,185,"Cada bifurcação: especiação",{a:"start",s:12,c:"var(--muted)"})}${T(470,203,"(isolamento reprodutivo)",{a:"start",s:12,c:"var(--muted)"})}`);

  F.vacina = () =>
    svg(600, 300, arrow("av") + `
    ${line(60,250,570,250,"av")}${line(60,250,60,30,"av")}${T(565,275,"tempo",{a:"end",c:"var(--muted)"})}${T(70,30,"anticorpos",{a:"start",c:"var(--muted)"})}
    <path d="M60 248C110 248 120 200 150 200S200 240 230 240 260 120 300 90 380 120 430 140 520 150 560 150" fill="none" stroke="var(--violet)" stroke-width="4"/>
    <path d="M60 80C90 80 110 120 160 180S260 240 330 246" fill="none" stroke="var(--orange)" stroke-width="4" stroke-dasharray="8 6"/>
    ${T(160,190,"1ª dose",{s:12})}${T(300,80,"reforço: resposta maior e mais rápida",{s:12})}
    <rect x="380" y="200" width="16" height="6" fill="var(--violet)"/>${T(402,206,"Vacina (imunidade ativa)",{a:"start",s:12})}
    <rect x="380" y="222" width="16" height="6" fill="var(--orange)"/>${T(402,228,"Soro (passiva, cai rápido)",{a:"start",s:12})}`);

  /* ---------- Química ---------- */
  F.atomo = () =>
    svg(560, 300, `
    ${[60,95,130].map((r,i)=>`<circle cx="180" cy="150" r="${r}" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="${i?"":"0"}"/>`).join("")}
    <circle cx="180" cy="150" r="24" fill="var(--orange)" stroke="var(--ink)" stroke-width="1.5"/>${T(180,155,"núcleo",{s:11,c:"var(--white)"})}
    ${[[240,150],[180,55],[85,150],[305,150],[180,280],[180,20]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="var(--violet)"/>`).join("")}
    ${T(350,80,"Modelo de Bohr",{a:"start",w:800,s:15})}
    ${T(350,108,"Elétrons em níveis de energia.",{a:"start"})}
    ${T(350,132,"Absorve energia: sobe de nível.",{a:"start"})}
    ${T(350,156,"Volta ao nível: emite luz.",{a:"start"})}
    ${T(350,196,"Z = prótons",{a:"start",c:"var(--violet)",w:800})}
    ${T(350,220,"A = prótons + nêutrons",{a:"start",c:"var(--violet)",w:800})}`);

  F.periodica = () =>
    svg(600, 300, arrow("ap", "var(--violet)") + arrow("ap2", "var(--orange)") + `
    ${Array.from({length:7}).map((_,r)=>Array.from({length:18}).map((__,c)=>{const show=(r===0&&(c===0||c===17))||(r<3&&(c<2||c>11))||r>=3;return show?`<rect x="${40+c*28}" y="${40+r*28}" width="25" height="25" rx="4" fill="${c<2?"var(--butter)":c>11?"var(--sky)":"var(--lilac)"}" stroke="var(--ink)" stroke-width=".8"/>`:""}).join("")).join("")}
    ${line(60,250,540,250,"ap","var(--violet)")}${T(300,272,"Eletronegatividade e energia de ionização aumentam →",{s:12,c:"var(--violet)"})}
    ${line(570,230,570,50,"ap","var(--violet)")}
    ${line(20,50,20,230,"ap2","var(--orange)")}${T(25,20,"Raio atômico aumenta para baixo e para a esquerda",{a:"start",s:12,c:"var(--orange)"})}`);

  F.ligacoes = () =>
    svg(620, 260, arrow("al") + `
    ${T(155,30,"Ligação iônica",{w:800,s:15})}
    <circle cx="90" cy="120" r="34" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>${T(90,125,"Na",{w:800,s:16})}
    <circle cx="220" cy="120" r="44" fill="var(--mint)" stroke="var(--ink)" stroke-width="1.5"/>${T(220,125,"Cl",{w:800,s:16})}
    <path d="M118 96Q155 70 190 92" fill="none" stroke="var(--violet)" stroke-width="2.5" marker-end="url(#al)"/>${T(155,70,"1 elétron",{s:12,c:"var(--violet)"})}
    ${T(155,195,"Na⁺ Cl⁻: transferência de elétrons",{s:12})}${T(155,215,"(metal + ametal)",{s:12,c:"var(--muted)"})}
    <line x1="310" y1="30" x2="310" y2="230" stroke="var(--hair)" stroke-width="2"/>
    ${T(465,30,"Ligação covalente",{w:800,s:15})}
    <circle cx="420" cy="120" r="40" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5" fill-opacity=".85"/><circle cx="500" cy="120" r="40" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5" fill-opacity=".85"/>
    ${T(400,125,"H",{w:800,s:16})}${T(520,125,"H",{w:800,s:16})}<circle cx="460" cy="112" r="6" fill="var(--violet)"/><circle cx="460" cy="130" r="6" fill="var(--violet)"/>
    ${T(465,195,"H₂: par de elétrons compartilhado",{s:12})}${T(465,215,"(ametal + ametal)",{s:12,c:"var(--muted)"})}`);

  F.ph = () => {
    const cores = ["#E2412B","#F0592E","#F77A2F","#FB9B32","#FBBE3A","#F2DB46","#C9E04A","#8FD45A","#5BC27A","#3FA9A0","#3D8BC4","#4B6CD8","#5A52E0","#5E3FD8","#4E2FBF"];
    return svg(620, 200, `${cores.map((c,i)=>`<rect x="${20+i*39}" y="60" width="39" height="56" fill="${c}"/>${T(39+i*39,92,String(i),{c:"var(--white)",w:800,s:14})}`).join("")}
    <rect x="20" y="60" width="585" height="56" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
    ${T(80,40,"Ácido",{w:800})}${T(312,40,"Neutro (7, a 25 °C)",{w:800})}${T(550,40,"Básico",{w:800})}
    ${T(39+2*39,145,"suco gástrico",{s:11})}${T(39+3*39,163,"refrigerante",{s:11})}${T(39+7*39,145,"água pura",{s:11})}${T(39+7.4*39,163,"sangue ≈ 7,4",{s:11})}${T(39+12*39,145,"água sanitária",{s:11})}
    ${T(312,190,"Cada unidade de pH = concentração de H⁺ 10 vezes diferente",{c:"var(--violet)",w:800})}`);
  };

  F.energia_reacao = () =>
    svg(620, 280, arrow("ae") + `
    ${line(50,240,300,240,"ae")}${line(50,240,50,30,"ae")}${T(55,24,"energia",{a:"start",c:"var(--muted)"})}${T(295,262,"caminho da reação",{a:"end",c:"var(--muted)"})}
    <path d="M60 180H100C150 180 150 60 190 60S230 210 290 210" fill="none" stroke="var(--violet)" stroke-width="4"/>
    <path d="M60 180H100C150 180 150 110 190 110S230 210 290 210" fill="none" stroke="var(--pink)" stroke-width="3" stroke-dasharray="7 6"/>
    ${T(62,198,"reagentes",{s:11,a:"start"})}${T(290,232,"produtos",{s:11,a:"end"})}
    ${T(190,50,"energia de ativação",{s:11})}${T(140,128,"com catalisador",{s:11,c:"var(--pink)",a:"end"})}
    ${T(330,70,"Exotérmica: produtos abaixo",{a:"start",w:800})}${T(330,92,"dos reagentes, ΔH < 0.",{a:"start"})}
    ${T(330,130,"Endotérmica: produtos acima,",{a:"start",w:800})}${T(330,152,"ΔH > 0.",{a:"start"})}
    ${T(330,192,"O catalisador baixa a energia",{a:"start",c:"var(--pink)"})}${T(330,212,"de ativação e não muda o ΔH.",{a:"start",c:"var(--pink)"})}`);

  F.pilha = () =>
    svg(620, 300, arrow("api", "var(--violet)") + `
    <path d="M150 60H470" stroke="var(--ink)" stroke-width="2"/><path d="M150 60V130M470 60V130" stroke="var(--ink)" stroke-width="2"/>
    <circle cx="310" cy="60" r="18" fill="var(--lime)" stroke="var(--ink)" stroke-width="1.5"/>${T(310,65,"V",{w:800})}
    <path d="M200 50H260" stroke="var(--violet)" stroke-width="3" marker-end="url(#api)"/>${T(230,40,"elétrons",{s:12,c:"var(--violet)"})}
    <rect x="90" y="150" width="120" height="120" rx="10" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5"/><rect x="410" y="150" width="120" height="120" rx="10" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5"/>
    <rect x="140" y="120" width="20" height="120" fill="#9AA0A6" stroke="var(--ink)"/><rect x="460" y="120" width="20" height="120" fill="#C77B3A" stroke="var(--ink)"/>
    <path d="M190 160Q310 100 430 160" fill="none" stroke="var(--ink)" stroke-width="10" stroke-linecap="round"/>${T(310,182,"ponte salina",{s:12})}
    ${T(150,292,"Ânodo (Zn): oxida (−)",{w:800})}${T(470,292,"Cátodo (Cu): reduz (+)",{w:800})}`);

  F.isomeria = () =>
    svg(600, 240, `
    ${T(150,30,"Isômeros cis e trans",{w:800,s:15})}
    <line x1="110" y1="120" x2="190" y2="120" stroke="var(--ink)" stroke-width="3"/><line x1="110" y1="130" x2="190" y2="130" stroke="var(--ink)" stroke-width="3"/>
    ${T(110,110,"C",{w:800})}${T(190,110,"C",{w:800})}
    ${T(80,80,"Cl",{c:"var(--violet)",w:800})}${T(220,80,"Cl",{c:"var(--violet)",w:800})}${T(80,175,"H")}${T(220,175,"H")}
    ${T(150,210,"cis: iguais do mesmo lado",{s:12})}
    <line x1="300" y1="30" x2="300" y2="220" stroke="var(--hair)" stroke-width="2"/>
    ${T(450,30,"Carbono quiral (isomeria óptica)",{w:800,s:14})}
    <circle cx="450" cy="125" r="16" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>${T(450,130,"C*",{w:800})}
    ${[[450,75,"H",450,68],[500,125,"OH",510,130,"start"],[450,175,"CH₃",450,192],[400,125,"COOH",390,130,"end"]].map(([x,y,t,lx,ly,a])=>`<line x1="450" y1="125" x2="${x}" y2="${y}" stroke="var(--ink)" stroke-width="2"/>${T(lx,ly,t,{s:12,a:a||"middle"})}`).join("")}
    <circle cx="450" cy="125" r="16" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>${T(450,130,"C*",{w:800})}
    ${T(450,225,"4 ligantes diferentes",{s:12})}`);

  /* ---------- Física ---------- */
  F.grafico_vt = () =>
    svg(600, 280, arrow("ag") + `
    ${line(60,240,560,240,"ag")}${line(60,240,60,30,"ag")}${T(555,262,"t (s)",{a:"end",c:"var(--muted)"})}${T(68,30,"v (m/s)",{a:"start",c:"var(--muted)"})}
    <path d="M60 200L360 80V240H60z" fill="var(--lime)" fill-opacity=".7" stroke="none"/>
    <path d="M60 200L360 80" stroke="var(--violet)" stroke-width="4"/>
    ${T(200,200,"Área = deslocamento (Δs)",{w:800})}
    ${T(330,70,"inclinação = aceleração",{a:"end",c:"var(--violet)",w:800})}
    ${T(380,140,"MUV: v = v₀ + a·t",{a:"start"})}${T(380,165,"s = s₀ + v₀t + at²/2",{a:"start"})}${T(380,190,"v² = v₀² + 2aΔs",{a:"start"})}`);

  F.plano = () =>
    svg(600, 280, arrow("apl") + arrow("apl2", "var(--violet)") + arrow("apl3", "var(--orange)") + `
    <path d="M60 250H520L60 70z" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>
    <g transform="rotate(21.4 250 150)"><rect x="210" y="118" width="80" height="50" rx="6" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5"/></g>
    ${line(260,145,260,235,"apl")}${T(272,232,"P",{a:"start",w:800})}
    ${line(260,145,300,100,"apl2","var(--violet)")}${T(306,98,"N",{a:"start",w:800,c:"var(--violet)"})}
    ${line(260,145,190,118,"apl3","var(--orange)")}${T(150,112,"P·sen θ",{a:"start",w:800,c:"var(--orange)"})}
    ${T(470,240,"θ",{s:16,w:800})}<path d="M440 250A40 40 0 0 0 482 235" fill="none" stroke="var(--ink)"/>
    ${T(560,80,"Sem atrito:",{a:"end",w:800})}${T(560,102,"a = g·sen θ",{a:"end"})}`);

  F.energia_mec = () =>
    svg(600, 260, `
    <path d="M40 60Q160 260 300 200T560 120" fill="none" stroke="var(--ink)" stroke-width="3"/>
    <circle cx="48" cy="58" r="14" fill="var(--pink)" stroke="var(--ink)" stroke-width="1.5"/>
    <circle cx="190" cy="214" r="14" fill="var(--pink)" stroke="var(--ink)" stroke-width="1.5"/>
    ${T(60,30,"topo: Ep máxima, Ec mínima",{a:"start",s:12})}${T(190,250,"fundo: Ec máxima",{s:12})}
    ${T(560,40,"Sem atrito: Ec + Ep = constante",{a:"end",w:800,c:"var(--violet)"})}${T(560,62,"m·g·h = m·v²/2",{a:"end"})}`);

  F.circuito = () =>
    svg(620, 260, `
    ${T(150,25,"Em série",{w:800,s:15})}
    <rect x="40" y="50" width="220" height="150" fill="none" stroke="var(--ink)" stroke-width="2"/>
    <rect x="40" y="110" width="12" height="30" fill="var(--ink)"/>
    ${[90,150,210].map(x=>`<rect x="${x-18}" y="40" width="36" height="20" rx="4" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>`).join("")}
    ${T(150,228,"mesma corrente; Req = R₁ + R₂ + R₃",{s:12})}
    ${T(460,25,"Em paralelo",{w:800,s:15})}
    <path d="M350 50H570V200H350z" fill="none" stroke="var(--ink)" stroke-width="2"/>
    <rect x="350" y="110" width="12" height="30" fill="var(--ink)"/>
    ${[420,480,540].map(x=>`<line x1="${x}" y1="50" x2="${x}" y2="200" stroke="var(--ink)" stroke-width="2"/><rect x="${x-10}" y="105" width="20" height="40" rx="4" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5"/>`).join("")}
    ${T(460,228,"mesma tensão; 1/Req = 1/R₁ + 1/R₂ + ...",{s:12})}${T(460,248,"(é assim nas tomadas de casa)",{s:12,c:"var(--muted)"})}`);

  F.onda = () =>
    svg(620, 240, arrow("aw") + `
    <line x1="30" y1="120" x2="590" y2="120" stroke="var(--hair)" stroke-width="2"/>
    <path d="M30 120Q85 30 140 120T250 120T360 120T470 120T580 120" fill="none" stroke="var(--violet)" stroke-width="4"/>
    <path d="M85 60V30M305 60V30" stroke="var(--ink)" stroke-dasharray="4 4"/>${line(90,36,300,36,"aw")}${T(195,28,"comprimento de onda (λ)",{w:800})}
    <path d="M415 120V75" stroke="var(--orange)" stroke-width="2"/>${T(415,62,"amplitude",{c:"var(--orange)",w:800})}
    ${T(310,215,"v = λ · f   (velocidade = comprimento de onda × frequência)",{w:800})}`);

  F.lentes = () =>
    svg(620, 280, arrow("ale", "var(--orange)") + `
    <line x1="20" y1="140" x2="600" y2="140" stroke="var(--hair)" stroke-width="2"/>
    <path d="M300 30Q340 140 300 250Q260 140 300 30z" fill="var(--sky)" fill-opacity=".8" stroke="var(--ink)" stroke-width="1.5"/>
    ${[80,110,170,200].map(y=>`<line x1="40" y1="${y}" x2="300" y2="${y}" stroke="var(--orange)" stroke-width="2"/><line x1="300" y1="${y}" x2="460" y2="140" stroke="var(--orange)" stroke-width="2" marker-end="url(#ale)"/>`).join("")}
    <circle cx="460" cy="140" r="6" fill="var(--violet)"/>${T(460,165,"foco",{w:800,c:"var(--violet)"})}
    ${T(300,272,"Lente convergente: raios paralelos se encontram no foco",{w:800})}
    ${T(560,40,"Hipermetropia: convergente",{a:"end",s:12})}${T(560,60,"Miopia: divergente",{a:"end",s:12})}`);

  F.calor = () =>
    svg(620, 240, `
    ${box(20,40,180,150,"var(--butter)","",{})}${T(110,70,"Condução",{w:800,s:15})}
    <rect x="50" y="110" width="120" height="16" rx="6" fill="#9AA0A6" stroke="var(--ink)"/><circle cx="50" cy="150" r="14" fill="var(--orange)"/>${T(110,175,"de partícula a partícula",{s:11})}
    ${box(220,40,180,150,"var(--sky)","",{})}${T(310,70,"Convecção",{w:800,s:15})}
    <path d="M280 160Q260 110 290 95M340 95Q370 110 340 160" fill="none" stroke="var(--violet)" stroke-width="3"/>${T(310,175,"correntes em fluidos",{s:11})}
    ${box(420,40,180,150,"var(--rose)","",{})}${T(510,70,"Irradiação",{w:800,s:15})}
    <circle cx="470" cy="125" r="18" fill="var(--orange)"/>${[0,1,2].map(i=>`<path d="M${500+i*14} 105q8 20 0 40" fill="none" stroke="var(--orange)" stroke-width="2.5"/>`).join("")}${T(510,175,"funciona no vácuo",{s:11})}
    ${T(310,225,"As três formas de transmissão de calor",{c:"var(--muted)"})}`);

  F.empuxo = () =>
    svg(600, 280, arrow("aem", "var(--violet)") + arrow("aem2") + `
    <rect x="60" y="80" width="300" height="180" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5"/>
    <rect x="160" y="130" width="100" height="70" rx="8" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>
    ${line(210,165,210,95,"aem","var(--violet)")}${T(222,105,"Empuxo (E)",{a:"start",w:800,c:"var(--violet)"})}
    ${line(210,165,210,245,"aem2")}${T(222,240,"Peso (P)",{a:"start",w:800})}
    ${T(390,110,"E = d(líquido) · V(submerso) · g",{a:"start",w:800})}
    ${T(390,150,"Flutua se a densidade média",{a:"start"})}${T(390,170,"do corpo for menor que a",{a:"start"})}${T(390,190,"do líquido.",{a:"start"})}`);

  /* ---------- Matemática ---------- */
  F.porcentagem = () =>
    svg(620, 220, `
    <rect x="40" y="50" width="400" height="40" rx="8" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5"/>${T(240,76,"R$ 200 (100%)",{w:800})}
    <rect x="40" y="110" width="480" height="40" rx="8" fill="var(--lime)" stroke="var(--ink)" stroke-width="1.5"/>${T(280,136,"+20%: R$ 200 × 1,2 = R$ 240",{w:800})}
    <rect x="40" y="170" width="384" height="40" rx="8" fill="var(--rose)" stroke="var(--ink)" stroke-width="1.5"/>${T(232,196,"−20%: R$ 240 × 0,8 = R$ 192",{w:800})}
    ${T(560,196,"perda de 4%",{a:"middle",c:"var(--bad)",w:800})}${T(320,30,"Aumento e desconto de 20% não se anulam",{c:"var(--muted)"})}`);

  F.escala = () =>
    svg(620, 220, `
    <rect x="40" y="40" width="200" height="140" rx="10" fill="var(--mint)" stroke="var(--ink)" stroke-width="1.5"/>
    <circle cx="80" cy="140" r="8" fill="var(--violet)"/><circle cx="200" cy="80" r="8" fill="var(--pink)"/><line x1="80" y1="140" x2="200" y2="80" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 5"/>
    ${T(140,100,"7 cm",{w:800})}${T(140,205,"mapa 1 : 200.000",{s:12})}
    ${T(270,90,"7 × 200.000 = 1.400.000 cm",{a:"start",w:800})}${T(270,115,"= 14 km na realidade",{a:"start",c:"var(--violet)",w:800})}
    ${T(270,160,"Escala k:  comprimento × k,  área × k²,  volume × k³",{a:"start",s:12})}`);

  F.estatistica = () => {
    const vals = [4, 6, 7, 7, 8, 10];
    return svg(620, 240, `${vals.map((v,i)=>`<rect x="${60+i*70}" y="${200-v*15}" width="46" height="${v*15}" rx="6" fill="${v===7?"var(--lime)":"var(--sky)"}" stroke="var(--ink)" stroke-width="1.5"/>${T(83+i*70,192-v*15,String(v),{w:800})}`).join("")}
    <line x1="50" y1="200" x2="490" y2="200" stroke="var(--ink)" stroke-width="2"/>
    <line x1="50" y1="${200-7*15}" x2="490" y2="${200-7*15}" stroke="var(--pink)" stroke-width="2" stroke-dasharray="6 5"/>${T(495,200-7*15+4,"média = 7",{a:"start",c:"var(--pink)",w:800})}
    ${T(270,228,"Em ordem: 4, 6, 7, 7, 8, 10 → mediana = (7+7)/2 = 7 · moda = 7",{s:12})}`);
  };

  F.arvore = () =>
    svg(620, 280, `
    <circle cx="60" cy="140" r="8" fill="var(--ink)"/>
    ${[[200,70,"Cara"],[200,210,"Coroa"]].map(([x,y,t])=>`<line x1="60" y1="140" x2="${x-30}" y2="${y}" stroke="var(--ink)" stroke-width="2"/>${box(x-30,y-18,90,36,t==="Cara"?"var(--lime)":"var(--sky)",t,{s:12})}`).join("")}
    ${[[400,35,"Cara"],[400,105,"Coroa"],[400,175,"Cara"],[400,245,"Coroa"]].map(([x,y,t],i)=>`<line x1="260" y1="${i<2?70:210}" x2="${x-30}" y2="${y}" stroke="var(--ink)" stroke-width="2"/>${box(x-30,y-16,90,32,t==="Cara"?"var(--lime)":"var(--sky)",t,{s:12})}`).join("")}
    ${T(560,40,"1/4",{w:800})}${T(560,110,"1/4",{w:800})}${T(560,180,"1/4",{w:800})}${T(560,250,"1/4",{w:800})}
    ${T(330,275,"Eventos independentes: multiplique (1/2 × 1/2 = 1/4)",{s:12,c:"var(--violet)"})}`);

  F.parabola = () => {
    let pts = "";
    for (let x = -1; x <= 41; x += 1) { const y = -x * x + 40 * x - 300; pts += `${60 + x * 12},${220 - y * 0.9} `; }
    return svg(620, 260, arrow("apa") + `${line(40,220,600,220,"apa")}${line(60,250,60,20,"apa")}
    <polyline points="${pts}" fill="none" stroke="var(--violet)" stroke-width="4"/>
    <circle cx="${60+20*12}" cy="${220-100*0.9}" r="7" fill="var(--pink)"/>${T(60+20*12,220-100*0.9-14,"vértice: x = −b/2a = 20, L = 100",{w:800})}
    ${T(560,245,"x",{c:"var(--muted)"})}${T(75,30,"L(x) = −x² + 40x − 300",{a:"start",w:800})}`);
  };

  F.pitagoras = () =>
    svg(560, 280, `
    <path d="M80 230H380V60z" fill="var(--butter)" stroke="var(--ink)" stroke-width="2"/>
    <rect x="360" y="210" width="20" height="20" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
    ${T(230,255,"c = 4",{w:800})}${T(400,150,"b = 3",{a:"start",w:800})}${T(205,130,"a = 5 (hipotenusa)",{w:800,c:"var(--violet)"})}
    ${T(480,70,"a² = b² + c²",{w:800,s:16})}${T(480,96,"25 = 9 + 16",{})}`);

  F.solidos = () =>
    svg(620, 240, `
    <rect x="40" y="70" width="110" height="110" fill="var(--sky)" stroke="var(--ink)" stroke-width="1.5"/><path d="M40 70L70 40H180L150 70M180 40V150L150 180" fill="var(--lilac)" stroke="var(--ink)" stroke-width="1.5"/>
    ${T(110,210,"Prisma: Ab·h",{w:800})}
    <ellipse cx="300" cy="60" rx="55" ry="16" fill="var(--lime)" stroke="var(--ink)" stroke-width="1.5"/><path d="M245 60V170M355 60V170" stroke="var(--ink)" stroke-width="1.5"/><path d="M245 170A55 16 0 0 0 355 170" fill="var(--lime)" stroke="var(--ink)" stroke-width="1.5"/>
    ${T(300,210,"Cilindro: πr²h",{w:800})}
    <path d="M480 40L430 170A50 14 0 0 0 530 170z" fill="var(--rose)" stroke="var(--ink)" stroke-width="1.5"/>
    ${T(480,210,"Cone: πr²h / 3",{w:800})}${T(310,236,"Esfera: 4πr³/3",{c:"var(--muted)"})}`);

  /* ---------- Linguagens ---------- */
  F.jakobson = () =>
    svg(620, 300, arrow("aj") + `
    ${box(20,125,130,50,"var(--butter)","Emissor")}${T(85,195,"emotiva",{s:12,c:"var(--violet)",w:800})}
    ${box(245,125,130,50,"var(--lime)","Mensagem")}${T(310,195,"poética",{s:12,c:"var(--violet)",w:800})}
    ${box(470,125,130,50,"var(--sky)","Receptor")}${T(535,195,"conativa",{s:12,c:"var(--violet)",w:800})}
    ${box(245,30,130,44,"var(--rose)","Referente")}${T(310,94,"referencial",{s:12,c:"var(--violet)",w:800})}
    ${box(150,232,130,44,"var(--lilac)","Canal")}${T(215,294,"fática",{s:12,c:"var(--violet)",w:800})}
    ${box(340,232,130,44,"var(--mint)","Código")}${T(405,294,"metalinguística",{s:12,c:"var(--violet)",w:800})}
    ${line(150,150,243,150,"aj")}${line(375,150,468,150,"aj")}`);

  F.linha_literatura = () => {
    const ev = [["1500","Quinhentismo"],["1601","Barroco"],["1768","Arcadismo"],["1836","Romantismo"],["1881","Realismo"],["1893","Simbolismo"],["1922","Modernismo"],["1945","Geração de 45"]];
    return svg(640, 200, `<line x1="20" y1="100" x2="620" y2="100" stroke="var(--ink)" stroke-width="3"/>${ev.map(([a,n],i)=>{const x=55+i*76;const up=i%2===0;return `<circle cx="${x}" cy="100" r="9" fill="${["var(--butter)","var(--lilac)","var(--mint)","var(--pink)","var(--sky)","var(--lime)","var(--orange)","var(--rose)"][i]}" stroke="var(--ink)" stroke-width="1.5"/>${T(x,up?70:140,a,{w:800})}${T(x,up?52:158,n,{s:11})}`;}).join("")}`);
  };

  /* ---------- Redação ---------- */
  F.estrutura_redacao = () =>
    svg(620, 300, `
    ${box(40,20,540,56,"var(--butter)","Introdução: contexto + repertório + tese + anúncio dos 2 argumentos",{s:13})}
    ${box(40,90,265,110,"var(--sky)","",{})}${T(172,130,"Desenvolvimento 1",{w:800})}${T(172,152,"tópico · repertório",{s:12})}${T(172,172,"análise · fechamento",{s:12})}
    ${box(315,90,265,110,"var(--lilac)","",{})}${T(447,130,"Desenvolvimento 2",{w:800})}${T(447,152,"tópico · repertório",{s:12})}${T(447,172,"análise · fechamento",{s:12})}
    ${box(40,214,540,56,"var(--lime)","Conclusão: retomada da tese + proposta de intervenção completa",{s:13})}
    ${T(310,292,"Até 30 linhas · com até 7 linhas a redação vale zero",{s:12,c:"var(--muted)"})}`);

  F.proposta = () => {
    const el = [["Agente","quem?","var(--butter)"],["Ação","o quê?","var(--lime)"],["Meio","como?","var(--sky)"],["Efeito","para quê?","var(--lilac)"],["Detalhamento","algo a mais","var(--rose)"]];
    return svg(620, 260, `${el.map(([n,q,c],i)=>{const a=-Math.PI/2+i*2*Math.PI/5;const x=310+Math.cos(a)*100,y=130+Math.sin(a)*100;return `<line x1="310" y1="130" x2="${x}" y2="${y}" stroke="var(--ink)" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="38" fill="${c}" stroke="var(--ink)" stroke-width="1.5"/>${T(x,y-2,n,{s:n.length>8?10:12,w:800})}${T(x,y+14,q,{s:10})}`;}).join("")}
    <circle cx="310" cy="130" r="34" fill="var(--ink)"/>${T(310,135,"C5",{c:"var(--lime)",w:800,s:16})}
    ${T(560,120,"cada elemento",{a:"end",s:12})}${T(560,138,"válido = +40",{a:"end",s:12,w:800,c:"var(--violet)"})}`);
  };

  F.grade = () =>
    svg(620, 240, `${["0","40","80","120","160","200"].map((n,i)=>`<rect x="${40+i*95}" y="${200-i*30}" width="80" height="${30+i*30}" rx="8" fill="${["var(--hair)","var(--rose)","var(--peach)","var(--butter)","var(--sky)","var(--lime)"][i]}" stroke="var(--ink)" stroke-width="1.5"/>${T(80+i*95,222,n,{w:800})}${T(80+i*95,192-i*30,"nível "+i,{s:11})}`).join("")}
    ${T(310,20,"Cada competência: 6 níveis, de 0 a 200 pontos",{w:800})}`);

  /* ---------- História e Geografia ---------- */
  const timeline = (ev, cores) =>
    svg(640, 220, `<line x1="20" y1="110" x2="620" y2="110" stroke="var(--ink)" stroke-width="3"/>${ev.map(([a,n],i)=>{const x=80+i*(480/(ev.length-1||1));const up=i%2===0;return `<circle cx="${x}" cy="110" r="9" fill="${cores[i%cores.length]}" stroke="var(--ink)" stroke-width="1.5"/>${T(x,up?80:148,a,{w:800})}${T(x,up?60:168,n,{s:11})}`;}).join("")}`);
  const C = ["var(--butter)","var(--lilac)","var(--mint)","var(--pink)","var(--sky)","var(--lime)","var(--orange)"];
  F.tl_antiga = () => timeline([["séc. V a.C.","Democracia em Atenas"],["509 a.C.","República romana"],["27 a.C.","Império romano"],["476","Queda de Roma"],["séc. XI","Cruzadas"],["1348","Peste Negra"]], C);
  F.tl_moderna = () => timeline([["1453","Fim da Idade Média"],["1500","Navegações"],["1517","Reforma"],["séc. XVIII","Iluminismo"],["1789","Revolução Francesa"],["1848","Manifesto Comunista"]], C);
  F.tl_colonia = () => timeline([["1500","Chegada portuguesa"],["1534","Capitanias"],["1548","Governo-geral"],["1695","Fim de Palmares"],["1789","Inconfidência"],["1798","Conj. Baiana"]], C);
  F.tl_imperio = () => timeline([["1822","Independência"],["1824","Constituição"],["1831","Regências"],["1850","Fim do tráfico"],["1871","Ventre Livre"],["1888","Lei Áurea"],["1889","República"]], C);
  F.tl_republica = () => timeline([["1889","República"],["1930","Era Vargas"],["1943","CLT"],["1964","Golpe"],["1968","AI-5"],["1985","Redemocratização"],["1988","Constituição"]], C);
  F.tl_seculo20 = () => timeline([["1914","1ª Guerra"],["1917","Rev. Russa"],["1929","Crise"],["1939","2ª Guerra"],["1945","ONU"],["1961","Muro de Berlim"],["1991","Fim da URSS"]], C);

  F.fusos = () =>
    svg(620, 260, `
    <circle cx="160" cy="130" r="110" fill="var(--sky)" stroke="var(--ink)" stroke-width="2"/>
    ${[-60,-30,0,30,60].map(d=>`<ellipse cx="160" cy="130" rx="${Math.abs(Math.cos(d*Math.PI/180))*110||1}" ry="110" fill="none" stroke="var(--ink)" stroke-width="1" opacity=".6"/>`).join("")}
    <line x1="50" y1="130" x2="270" y2="130" stroke="var(--pink)" stroke-width="2.5"/>${T(160,124,"Equador (0°)",{s:11,c:"var(--pink)"})}
    ${T(310,70,"360° ÷ 24 h = 15° por hora",{a:"start",w:800,s:15})}
    ${T(310,105,"Leste: horas adiantadas",{a:"start"})}${T(310,130,"Oeste: horas atrasadas",{a:"start"})}
    ${T(310,170,"Latitude: distância ao Equador",{a:"start",c:"var(--violet)"})}${T(310,195,"Longitude: distância a Greenwich",{a:"start",c:"var(--violet)"})}`);

  F.terra = () =>
    svg(600, 260, `
    <circle cx="160" cy="130" r="115" fill="var(--butter)" stroke="var(--ink)" stroke-width="1.5"/>
    <circle cx="160" cy="130" r="95" fill="var(--orange)" stroke="var(--ink)" stroke-width="1"/>
    <circle cx="160" cy="130" r="55" fill="var(--pink)" stroke="var(--ink)" stroke-width="1"/>
    <circle cx="160" cy="130" r="28" fill="#B83316" stroke="var(--ink)" stroke-width="1"/>
    ${T(330,50,"Crosta (litosfera em placas)",{a:"start"})}${line(325,46,268,70)}
    ${T(330,100,"Manto",{a:"start"})}${line(325,96,240,105)}
    ${T(330,150,"Núcleo externo (líquido)",{a:"start"})}${line(325,146,205,140)}
    ${T(330,200,"Núcleo interno (sólido)",{a:"start"})}${line(325,196,180,140)}`);

  F.transicao = () =>
    svg(620, 260, arrow("atd") + `
    ${line(50,220,590,220,"atd")}${line(50,220,50,20,"atd")}${T(585,242,"tempo",{a:"end",c:"var(--muted)"})}
    <path d="M60 50C160 50 200 60 260 150S420 190 580 190" fill="none" stroke="var(--violet)" stroke-width="4"/>
    <path d="M60 60C220 60 300 70 360 150S460 175 580 180" fill="none" stroke="var(--pink)" stroke-width="4"/>
    ${T(240,110,"mortalidade cai primeiro",{a:"end",c:"var(--violet)",w:800,s:12})}${T(380,120,"natalidade cai depois",{a:"start",c:"var(--pink)",w:800,s:12})}
    ${T(300,215,"crescimento populacional = espaço entre as curvas",{s:12,c:"var(--muted)"})}`);

  F.climas = () =>
    svg(620, 240, `${[["Equatorial","quente e úmido","var(--mint)"],["Tropical","verão chuvoso","var(--butter)"],["Semiárido","chuva escassa","var(--peach)"],["Trop. de altitude","mais ameno","var(--sky)"],["Subtropical","geada no inverno","var(--lilac)"]].map(([n,d,c],i)=>`${box(20+i*120,60,110,110,c,"",{})}${T(75+i*120,105,n,{w:800,s:12})}${T(75+i*120,128,d,{s:11})}`).join("")}
    ${T(310,30,"Principais climas do Brasil",{w:800,s:15})}${T(310,210,"El Niño: seca no Norte e Nordeste, chuva no Sul",{c:"var(--violet)",s:12})}`);

  /* ---------- Filosofia e Sociologia ---------- */
  F.filosofos = () => timeline([["séc. V a.C.","Sócrates"],["séc. IV a.C.","Platão e Aristóteles"],["1513","Maquiavel"],["1637","Descartes"],["1651","Hobbes"],["1762","Rousseau"],["1781","Kant"]], C);
  F.dominacao = () =>
    svg(620, 220, `${[["Tradicional","costume e tradição (reis)","var(--butter)"],["Carismática","qualidades do líder","var(--pink)"],["Racional-legal","leis e burocracia","var(--sky)"]].map(([n,d,c],i)=>`${box(20+i*200,60,180,110,c,"",{})}${T(110+i*200,105,n,{w:800,s:15})}${T(110+i*200,130,d,{s:12})}`).join("")}
    ${T(310,30,"Os três tipos de dominação legítima (Weber)",{w:800,s:15})}`);
  F.sociologos = () =>
    svg(620, 220, `${[["Durkheim","fato social · anomia","coesão","var(--lilac)"],["Weber","ação social","sentido","var(--butter)"],["Marx","luta de classes · mais-valia","conflito","var(--rose)"]].map(([n,d,k,c],i)=>`${box(20+i*200,40,180,140,c,"",{})}${T(110+i*200,85,n,{w:800,s:17})}${T(110+i*200,112,d,{s:12})}<rect x="${60+i*200}" y="135" width="100" height="26" rx="13" fill="var(--ink)"/>${T(110+i*200,153,k,{s:12,c:"var(--lime)"})}`).join("")}`);

  window.FIGS = F;
})();
