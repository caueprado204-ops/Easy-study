// Calculadora TRI: o aluno marca as respostas no cartão-resposta de uma prova real do ENEM (2020–2025),
// recebe a nota de cada área calculada como o INEP calcula (ML3, EAP com grade de 40 pontos e priori N(0,1),
// escala fixa por área) e vê a chance de aprovação num curso do SISU 2025, com pesos e nota de corte reais.
// Para o ENEM 2026 (ainda sem parâmetros publicados) estima a nota pelo número de acertos.
// Dados: calc-tri.json e sisu-cortes.json (gerados por scripts/build_calc_tri.py).
// Usa globais do app: S, save, render, go, esc, toast, VIEW, ACC.
(function () {
  const ORD = ["LC", "CH", "CN", "MT"];
  const AR = {
    LC: { n: "Linguagens", c: "var(--lav)" }, CH: { n: "Ciências Humanas", c: "var(--rose)" },
    CN: { n: "Ciências da Natureza", c: "var(--mint)" }, MT: { n: "Matemática", c: "var(--sand)" },
  };
  const L = "ABCDE";
  const COR = { azul: "#3D7BF2", amarela: "#F2C84B", branca: "#FFFFFF", rosa: "#FF8FD0", verde: "#3DBE6B", cinza: "#A9A6A0" };
  const SD_RED = 40; // incerteza de uma redação estimada pelo próprio aluno
  const ANO_NOVO = "2026"; // prova mais recente, ainda sem parâmetros dos itens

  let D = null, SI = null, carD = false, carS = false, erroD = false, erroS = false;

  /* ---------- estado salvo junto com o progresso ---------- */
  const st = () => {
    if (!S.calc) S.calc = {};
    const c = S.calc;
    c.modo = c.modo || "prova"; c.ano = c.ano || "2025"; c.cor1 = c.cor1 || "azul"; c.cor2 = c.cor2 || "azul"; c.ling = c.ling || "ing";
    c.resp = c.resp || {}; c.ac = c.ac || {}; c.notas = c.notas || {}; c.corr = c.corr || {}; c.area = c.area || "LC"; c.aba = c.aba || "nota";
    if (c.red === undefined) c.red = "";
    if (c.busca === undefined) c.busca = (window.ACC && ACC.perfil && ACC.perfil.curso_foco) || "";
    c.uf = c.uf || ""; c.mod = c.mod || 0;
    return c;
  };
  const chaveResp = (a) => { const c = st(); return c.ano + "-" + a; };
  const respDe = (a) => { const r = st().resp[chaveResp(a)] || ""; return (r + ".".repeat(45)).slice(0, 45); };

  /* ---------- carregamento ---------- */
  function carregar() {
    if (!D && !carD) { carD = true; fetch("calc-tri.json").then((r) => r.json()).then((d) => { D = d; if (VIEW === "calc") render(); }).catch(() => { erroD = true; if (VIEW === "calc") render(); }); }
  }
  function carregarSisu() {
    if (!SI && !carS) {
      carS = true;
      fetch("sisu-cortes.json").then((r) => r.json()).then((d) => {
        SI = d;
        SI.cursos.forEach((c) => { c.k = norm(c[1]); c.ki = norm(SI.ies[c[4]][0] + " " + SI.ies[c[4]][1] + " " + c[5]); });
        if (VIEW === "calc") render();
      }).catch(() => { erroS = true; if (VIEW === "calc") render(); });
    }
  }
  const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

  /* ---------- motor TRI (igual ao do INEP) ---------- */
  const G = Array.from({ length: 40 }, (_, i) => -4 + (i * 8) / 39);
  const PRI = G.map((t) => Math.exp(-(t * t) / 2));
  function theta(par, u) {
    const l = PRI.slice();
    for (let i = 0; i < par.length; i++) {
      const [a, b, c] = par[i];
      for (let k = 0; k < 40; k++) { const p = c + (1 - c) / (1 + Math.exp(-a * (G[k] - b))); l[k] *= u[i] ? p : 1 - p; }
    }
    let s = 0, m = 0; for (let k = 0; k < 40; k++) { s += l[k]; m += l[k] * G[k]; }
    return m / s;
  }
  const escala = (a, th) => D.esc[a][0] * th + D.esc[a][1];

  function caderno(a) {
    const c = st(), A = D.anos[c.ano][a], cor = a === "LC" || a === "CH" ? c.cor1 : c.cor2, k = A.cad[cor] || A.cad.azul;
    let ids = k.i, g = k.g;
    if (a === "LC") { const lg = k[c.ling] || k.ing; ids = lg.i.concat(ids); g = lg.g + g; }
    return { ids, g, pos0: k.pos0, par: ids.map((i) => A.itens[i]) };
  }
  function corrigir(a) {
    const k = caderno(a), r = respDe(a), par = [], u = [];
    let ok = 0, branco = 0, anul = 0;
    k.par.forEach((p, i) => {
      const certa = r[i] === k.g[i];
      if (r[i] === ".") branco++;
      if (!p) { anul++; return; }
      if (certa) ok++;
      par.push(p); u.push(certa ? 1 : 0);
    });
    return { k, r, ok, branco, anul, n: escala(a, theta(par, u)), validos: par.length };
  }

  /* ---------- notas do aluno, em qualquer modo ---------- */
  function notas() {
    const c = st(), out = {};
    ORD.forEach((a) => {
      if (c.modo === "prova") {
        if (!D || !c.corr[chaveResp(a)]) return;
        out[a] = { n: corrigir(a).n, sd: 0 };
      } else if (c.modo === "acertos") {
        const v = c.ac[a]; if (v === "" || v === undefined || v === null || !D) return;
        const t = D.acertos[a][Math.max(0, Math.min(45, Math.round(+v)))];
        out[a] = { n: t[1], lo: t[0], hi: t[2], sd: (t[2] - t[0]) / 2.563 };
      } else {
        const v = parseFloat(String(c.notas[a] || "").replace(",", ".")); if (!(v >= 0 && v <= 1000)) return;
        out[a] = { n: v, sd: 0 };
      }
    });
    const r = parseFloat(String(c.red).replace(",", "."));
    if (r >= 0 && r <= 1000) out.RED = { n: r, sd: c.modo === "notas" ? 0 : SD_RED };
    return out;
  }
  const f1 = (x) => (Math.round(x * 10) / 10).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const f0 = (x) => Math.round(x).toLocaleString("pt-BR");

  /* ---------- SISU: média ponderada e chance ---------- */
  const ORDEM_PESO = ["CN", "CH", "LC", "MT", "RED"];
  function media(cur, N) {
    const p = cur[8]; let s = 0, w = 0, v = 0, falta = [];
    ORDEM_PESO.forEach((a, i) => { if (!p[i]) return; if (!N[a]) { falta.push(a); return; } s += N[a].n * p[i]; w += p[i]; });
    if (falta.length) return { falta };
    ORDEM_PESO.forEach((a, i) => { if (p[i]) v += ((p[i] / w) * N[a].sd) ** 2; });
    const mins = cur[9] || [0, 0, 0, 0, 0, 0], abaixo = ORDEM_PESO.filter((a, i) => mins[i] > 1 && N[a] && N[a].n < mins[i]);
    const m = s / w;
    if (mins[5] > 1 && m < mins[5]) abaixo.push("MED");
    return { m, sdUser: Math.sqrt(v), w, abaixo, falta };
  }
  const phi = (z) => { const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2), y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(z * z) / 2); return z >= 0 ? (1 + y) / 2 : (1 - y) / 2; };
  function chance(m, corte, sdUser) {
    const sd = Math.sqrt(SI.meta.var_sd ** 2 + sdUser ** 2);
    return { p: Math.max(0.01, Math.min(0.99, phi((m - corte) / sd))), sd };
  }
  const rotulo = (p) => p >= 0.85 ? ["Muito alta", "var(--ok)"] : p >= 0.65 ? ["Alta", "#5BB974"] : p >= 0.35 ? ["Possível", "var(--butter)"] : p >= 0.15 ? ["Baixa", "var(--orange)"] : ["Muito baixa", "var(--bad)"];
  const SIG = { AC: "Ampla concorrência", LB_PPI: "Escola pública, baixa renda, PPI", LI_PPI: "Escola pública, PPI", LB_Q: "Escola pública, baixa renda, quilombola", LI_Q: "Escola pública, quilombola", LB_PCD: "Escola pública, baixa renda, PcD", LI_PCD: "Escola pública, PcD", LB_EP: "Escola pública, baixa renda", LI_EP: "Escola pública", LB_PP: "Escola pública, baixa renda, pretos e pardos", LI_PP: "Escola pública, pretos e pardos", LB_I: "Escola pública, baixa renda, indígenas", LI_I: "Escola pública, indígenas", B: "Bônus da instituição" };
  const nomeMod = (i) => { const [sg, d] = SI.meta.mods[i]; return SIG[sg] || (d.length > 70 ? d.slice(0, 68) + "…" : d); };

  /* ---------- estilos ---------- */
  const css = `
.ct-top{display:flex;flex-wrap:wrap;gap:10px;align-items:end;margin:12px 0}
.ct-top label{display:grid;gap:4px;font-size:12.5px;font-weight:700}
.ct-top select{width:auto;min-width:130px}
.ct-cor{display:inline-block;width:12px;height:12px;border-radius:50%;border:1.5px solid var(--line);vertical-align:-1px;margin-right:6px}
.ct-areas{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:14px 0}
.ct-area{border:1.5px solid var(--line);border-radius:16px;padding:12px;text-align:left;background:var(--white);display:grid;gap:2px;color:var(--ink)}
.ct-area.on{outline:3px solid var(--violet);outline-offset:1px}
.ct-area b{font-family:var(--display);font-size:13px;text-transform:uppercase}
.ct-area .nt{font-family:var(--display);font-weight:900;font-size:26px;line-height:1.1}
.ct-sheet{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 18px;border:1.5px solid var(--line);border-radius:18px;background:var(--white);padding:12px 14px}
.ct-row{display:grid;grid-template-columns:34px repeat(5,1fr);gap:4px;align-items:center;padding:4px 0;border-bottom:1px solid var(--hair)}
.ct-row .q{font-weight:800;font-size:13px;font-variant-numeric:tabular-nums;color:var(--muted)}
.ct-b{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--line);background:var(--white);font-size:12px;font-weight:800;display:grid;place-items:center;color:var(--ink);padding:0;justify-self:center}
.ct-b.on{background:var(--ink);color:var(--white)}
.ct-b.ok{background:var(--ok);border-color:var(--ok);color:#fff}
.ct-b.bad{background:var(--bad);border-color:var(--bad);color:#fff}
.ct-b.gab{box-shadow:0 0 0 3px var(--ok) inset}
.ct-row.anul .ct-b{opacity:.35}
.ct-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0}
@media (max-width:760px){.ct-bar>b{flex-basis:100%}.ct-bar .btn{flex:1}}
.ct-paste{width:100%;min-height:54px;border:1.5px solid var(--line);border-radius:12px;padding:8px 10px;font:inherit;font-family:ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase}
.ct-res{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:14px;margin-top:14px}
.ct-big{font-family:var(--display);font-weight:900;font-size:clamp(52px,8vw,84px);line-height:.95;color:var(--lime)}
.ct-hero{background:var(--violet);color:var(--white);border-radius:22px;padding:20px;border:1.5px solid var(--line)}
.ct-hero p{color:#DCD8FF;margin:6px 0 0}
.ct-tab td,.ct-tab th{padding:6px 8px;text-align:left;border-bottom:1px solid var(--hair)}.ct-tab{width:100%;border-collapse:collapse;font-size:14px}
.ct-tab td.num,.ct-tab th.num{text-align:right}
.ct-in{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:12px 0}
.ct-in label{display:grid;gap:4px;font-size:12.5px;font-weight:700;border:1.5px solid var(--line);border-radius:14px;padding:10px;background:var(--white)}
.ct-in input,.ct-search input{border:1.5px solid var(--line);border-radius:10px;padding:9px 10px;font:inherit;font-size:16px;width:100%;background:var(--white)}
.ct-in small{font-weight:500;color:var(--muted)}
.ct-search{display:grid;grid-template-columns:minmax(0,1fr) 130px;gap:10px;margin:12px 0}
.ct-list{display:grid;gap:8px}
.ct-item{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;border:1.5px solid var(--line);border-radius:16px;background:var(--white);padding:12px 14px;text-align:left;color:var(--ink);width:100%}
.ct-item:hover{background:var(--cream)}
.ct-item .s{font-size:13px;color:var(--muted)}
.ct-pill{border:1.5px solid var(--line);border-radius:99px;padding:4px 10px;font-weight:800;font-size:13px;white-space:nowrap;color:var(--ink)}
.ct-gauge{position:relative;height:56px;margin:18px 4px 8px}
.ct-gauge .tr{position:absolute;left:0;right:0;top:24px;height:8px;border-radius:99px;background:linear-gradient(90deg,var(--bad),var(--butter) 50%,var(--ok))}
.ct-gauge .mk{position:absolute;top:10px;width:3px;height:36px;background:var(--ink);border-radius:2px}
.ct-gauge .mk span{position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:12px;font-weight:800;white-space:nowrap}
.ct-gauge .mk.you{background:var(--lime)}.ct-gauge .mk.you span{color:var(--lime);top:auto;bottom:-20px}
.ct-gauge .mk span{color:var(--white)}
.ct-info{border:1.5px solid var(--line);border-radius:14px;padding:12px 14px;background:var(--butter);font-size:14px}
@media (max-width:1050px){.ct-sheet{grid-template-columns:repeat(2,minmax(0,1fr))}.ct-res{grid-template-columns:minmax(0,1fr)}}
@media (max-width:760px){.ct-areas{grid-template-columns:1fr 1fr}.ct-sheet{grid-template-columns:minmax(0,1fr);padding:8px 10px}.ct-b{width:36px;height:36px;font-size:13px}.ct-row{grid-template-columns:34px repeat(5,1fr)}
.ct-in{grid-template-columns:1fr 1fr}.ct-search{grid-template-columns:1fr}.ct-top select{min-width:0;width:100%}.ct-top label{flex:1 1 140px}}`;
  function estilo() { if (document.getElementById("ctCss")) return; const s = document.createElement("style"); s.id = "ctCss"; s.textContent = css; document.head.appendChild(s); }

  /* ---------- telas ---------- */
  window.vCalcTRI = function () {
    estilo(); carregar();
    const c = st();
    const head = `<h1 class="h-big" style="font-size:clamp(28px,5vw,46px);margin:6px 0 4px">Calculadora<br><span style="color:var(--violet)">TRI do ENEM</span></h1>
      <div class="qmode" role="tablist" aria-label="Calculadora"><button class="${c.aba === "nota" ? "on" : ""}" data-cab="nota" role="tab">1. Sua nota</button><button class="${c.aba === "chance" ? "on" : ""}" data-cab="chance" role="tab">2. Chances no SISU</button></div>`;
    if (!D) return head + `<div class="empty" style="margin-top:16px">${erroD ? "Não foi possível carregar a calculadora. Recarregue a página." : "Carregando a calculadora…"}</div>`;
    return head + (c.aba === "chance" ? vChance() : vNota());
  };

  function vNota() {
    const c = st(), anos = Object.keys(D.anos).sort().reverse();
    const sel = (id, val, ops) => `<select data-cset="${id}">${ops.map(([v, t]) => `<option value="${v}" ${String(val) === String(v) ? "selected" : ""}>${t}</option>`).join("")}</select>`;
    const cores = (dia) => Object.keys(D.anos[c.ano][dia === 1 ? "LC" : "CN"].cad);
    let topo = `<div class="ct-top"><label>Modo${sel("modo", c.modo, [["prova", "Marcar no cartão-resposta"], ["acertos", "ENEM " + ANO_NOVO + " (por acertos)"], ["notas", "Já tenho minhas notas"]])}</label>`;
    if (c.modo === "prova") {
      if (!cores(1).includes(c.cor1)) c.cor1 = "azul";
      if (!cores(2).includes(c.cor2)) c.cor2 = "azul";
      topo += `<label>Prova${sel("ano", c.ano, anos.map((a) => [a, "ENEM " + a]))}</label>
        <label><span><i class="ct-cor" style="background:${COR[c.cor1]}"></i>Caderno do 1º dia</span>${sel("cor1", c.cor1, cores(1).map((x) => [x, x[0].toUpperCase() + x.slice(1)]))}</label>
        <label><span><i class="ct-cor" style="background:${COR[c.cor2]}"></i>Caderno do 2º dia</span>${sel("cor2", c.cor2, cores(2).map((x) => [x, x[0].toUpperCase() + x.slice(1)]))}</label>
        <label>Língua estrangeira${sel("ling", c.ling, [["ing", "Inglês"], ["esp", "Espanhol"]])}</label>`;
    }
    topo += `</div>`;
    const intro = {
      prova: `Escolha a edição e a cor do seu caderno, marque o que você respondeu em cada questão e toque em <b>Corrigir</b>. A nota sai com os parâmetros oficiais do INEP para cada questão, do mesmo jeito que o INEP calcula — confira com a sua nota oficial, se você fez essa prova.`,
      acertos: `O INEP só publica os parâmetros das questões do ENEM ${ANO_NOVO} junto com os microdados, depois do resultado. Até lá, confira seus acertos no gabarito oficial e digite aqui: a calculadora mostra a nota mais provável e a faixa em que ela costuma cair, com base nas provas de 2023 a 2025.`,
      notas: `Digite as notas que você já tem (do boletim do ENEM ou de outra calculadora) para ver suas chances no SISU.`,
    }[c.modo];
    let corpo = "";
    if (c.modo === "prova") corpo = vCartao();
    else {
      corpo = `<div class="ct-in">${ORD.map((a) => {
        if (c.modo === "acertos") { const v = c.ac[a] ?? "", t = v !== "" ? D.acertos[a][Math.max(0, Math.min(45, Math.round(+v)))] : null; return `<label>${AR[a].n}<input type="number" inputmode="numeric" min="0" max="45" placeholder="0 a 45" data-cin="ac.${a}" value="${esc(String(v))}"><small id="ctp-${a}">${t ? `Nota provável <b style="color:var(--ink)">${f0(t[1])}</b> · faixa ${f0(t[0])}–${f0(t[2])}` : "acertos de 45"}</small></label>`; }
        return `<label>${AR[a].n}<input type="text" inputmode="decimal" placeholder="ex.: 650,4" data-cin="notas.${a}" value="${esc(String(c.notas[a] ?? ""))}"><small>nota de 0 a 1000</small></label>`;
      }).join("")}${campoRed()}</div>`;
    }
    if (c.modo === "prova") corpo += `<div class="ct-in" style="grid-template-columns:minmax(0,320px)">${campoRed()}</div>`;
    return `<p class="muted" style="max-width:70ch">${intro}</p>${topo}${corpo}<div id="ctResumo">${vResumo()}</div>`;
  }
  const campoRed = () => { const c = st(); return `<label>Redação<input type="text" inputmode="numeric" placeholder="ex.: 760" data-cin="red" value="${esc(String(c.red ?? ""))}"><small>${c.modo === "notas" ? "nota oficial" : "sua estimativa, de 0 a 1000"}</small></label>`; };

  function vCartao() {
    const c = st(), a = c.area;
    const cards = ORD.map((x) => {
      const r = respDe(x), feitas = 45 - (r.match(/\./g) || []).length, ok = c.corr[chaveResp(x)], res = ok ? corrigir(x) : null;
      return `<button class="ct-area ${x === a ? "on" : ""}" data-carea="${x}" style="background:${AR[x].c}"><b>${AR[x].n}</b>${res ? `<span class="nt num">${f1(res.n)}</span><span class="small">${res.ok} acertos de ${res.validos}</span>` : `<span class="nt num" style="color:var(--muted)">—</span><span class="small">${feitas}/45 marcadas</span>`}</button>`;
    }).join("");
    const k = caderno(a), r = respDe(a), corr = c.corr[chaveResp(a)];
    const linhas = k.par.map((p, i) => {
      const n = k.pos0 + i, anul = !p, g = k.g[i];
      return `<div class="ct-row ${anul ? "anul" : ""}"><span class="q">${n}</span>${[0, 1, 2, 3, 4].map((j) => {
        const L1 = L[j], marc = r[i] === L1;
        let cls = marc ? "on" : "";
        if (corr && !anul) { if (marc) cls = L1 === g ? "ok" : "bad"; else if (L1 === g) cls = "gab"; }
        return `<button class="ct-b ${cls}" data-cb="${i}.${j}" aria-label="Questão ${n}, alternativa ${L1}${marc ? ", marcada" : ""}" aria-pressed="${marc}">${L1}</button>`;
      }).join("")}</div>`;
    }).join("");
    const res = corr ? corrigir(a) : null;
    return `<div class="ct-areas">${cards}</div>
      <div class="ct-bar"><b style="font-family:var(--display);text-transform:uppercase;margin-right:auto">${AR[a].n} · questões ${k.pos0} a ${k.pos0 + 44}</b>
        <button class="btn ghost sm" data-cclear>Limpar</button><button class="btn sm" data-ccorr>${corr ? "Recalcular" : "Corrigir e calcular"}</button></div>
      ${res ? `<div class="card" style="margin-bottom:12px;display:flex;flex-wrap:wrap;gap:14px;align-items:center"><span class="h-big num" style="font-size:34px">${f1(res.n)}</span><span><b>${res.ok} acertos</b> de ${res.validos} válidas${res.branco ? ` · ${res.branco} em branco` : ""}${res.anul ? ` · ${res.anul} anulada${res.anul > 1 ? "s" : ""} (fora da conta)` : ""}</span><span class="small muted" style="flex-basis:100%">Verde: você acertou. Vermelho: errou. Contorno verde: a resposta certa.</span></div>` : ""}
      <details class="card" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:700">Digitar as respostas de uma vez</summary><p class="small muted" style="margin:8px 0">Digite as letras na ordem (ex.: ABDCE…). Use um traço para questão em branco. Espaços são ignorados.</p><textarea class="ct-paste" data-cpaste placeholder="ABDCEAB-CE...">${esc(r.replace(/\./g, "-").replace(/-+$/, ""))}</textarea></details>
      <div class="ct-sheet">${linhas}</div>`;
  }

  function vResumo() {
    const N = notas(), tem = ORD.filter((a) => N[a]);
    if (!tem.length && !N.RED) return "";
    const obj = tem.map((a) => N[a].n), med4 = tem.length === 4 ? obj.reduce((x, y) => x + y, 0) / 4 : null, med5 = tem.length === 4 && N.RED ? (obj.reduce((x, y) => x + y, 0) + N.RED.n) / 5 : null;
    const c = st();
    return `<div class="ct-res"><div class="ct-hero"><span class="small" style="color:#C9C4FF">${med5 !== null ? "Média simples com redação" : med4 !== null ? "Média das 4 provas objetivas" : "Suas notas até agora"}</span>
      <div class="ct-big num">${med5 !== null ? f1(med5) : med4 !== null ? f1(med4) : tem.length + "/4"}</div>
      <p>${med5 !== null ? `Sem redação: ${f1(med4)}. ` : ""}${c.modo === "acertos" ? "Estimativa pelo número de acertos: a nota real depende de quais questões você acertou." : c.modo === "prova" ? "Calculada com os parâmetros oficiais do INEP." : ""}${tem.length < 4 ? ` Faltam ${4 - tem.length} área${4 - tem.length > 1 ? "s" : ""}.` : ""}${!N.RED ? " Digite a redação para ver suas chances." : ""}</p>
      <div class="qnav" style="margin-top:14px"><button class="btn lime sm" data-cab="chance" ${tem.length === 4 && N.RED ? "" : "disabled"}>Ver chances no SISU</button></div></div>
      <div class="card"><table class="ct-tab"><thead><tr><th>Área</th><th class="num">Nota</th>${c.modo === "acertos" ? `<th class="num">Faixa</th>` : ""}</tr></thead><tbody>${ORD.concat("RED").map((a) => `<tr><td>${a === "RED" ? "Redação" : AR[a].n}</td><td class="num"><b>${N[a] ? f1(N[a].n) : "—"}</b></td>${c.modo === "acertos" ? `<td class="num small">${N[a] && N[a].lo ? f0(N[a].lo) + "–" + f0(N[a].hi) : ""}</td>` : ""}</tr>`).join("")}</tbody></table></div></div>`;
  }

  /* ---------- chances ---------- */
  function vChance() {
    carregarSisu();
    const c = st(), N = notas(), falta = ORD.concat("RED").filter((a) => !N[a]);
    const aviso = falta.length ? `<div class="ct-info" style="margin:12px 0">Para calcular as chances, complete ${falta.map((a) => a === "RED" ? "a redação" : AR[a].n).join(", ")} na etapa <button class="btn ghost sm" data-cab="nota">1. Sua nota</button></div>` : "";
    if (!SI) return aviso + `<div class="empty" style="margin-top:16px">${erroS ? "Não foi possível carregar as notas de corte. Recarregue a página." : "Carregando as notas de corte do SISU…"}</div>`;
    if (c.alvo) { const cur = SI.cursos.find((x) => x[0] === c.alvo); if (cur && !falta.length) return vCurso(cur, N); c.alvo = null; }
    const ufs = [...new Set(SI.cursos.map((x) => x[6]))].sort(), por = c.por || "curso";
    const alterna = `<div><div class="qmode" role="tablist" aria-label="Buscar por" style="margin:14px 0 4px"><button class="${por === "curso" ? "on" : ""}" data-cpor="curso" role="tab">Buscar por curso</button><button class="${por === "ies" ? "on" : ""}" data-cpor="ies" role="tab">Buscar por universidade</button></div></div>`;
    const rodape = `<p class="note" style="margin-top:14px">USP, Unicamp e Unesp não participam do SISU e por isso não aparecem aqui: elas têm processos seletivos próprios.</p>`;
    const selUF = `<select data-cset="uf" aria-label="Estado"><option value="">Todo o Brasil</option>${ufs.map((u) => `<option ${u === c.uf ? "selected" : ""}>${u}</option>`).join("")}</select>`;
    if (por === "ies") {
      const ies = c.ies != null ? SI.ies.findIndex((x) => x[0] === c.ies) : -1;
      if (ies < 0) return `${aviso}${alterna}<p class="muted" style="max-width:70ch">Pesquise a universidade, selecione e depois escolha o curso.</p>
        <div class="ct-search"><input type="search" placeholder="Universidade (ex.: UFMG, Federal de Santa Catarina, Recife)" data-cqi value="${esc(c.buscaIes || "")}" aria-label="Buscar universidade">${selUF}</div>
        <div id="ctLista">${vListaIes()}</div>${rodape}`;
      const I = SI.ies[ies], n = SI.cursos.filter((x) => x[4] === ies).length;
      return `${aviso}${alterna}<div class="card" style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:12px 0"><div style="flex:1 1 260px"><span class="small muted">Universidade selecionada</span><br><b style="font-size:17px">${esc(I[0])}</b> <span class="muted">${esc(I[1])}</span><br><span class="small muted">${n} curso${n > 1 ? "s" : ""} no SISU 2025</span></div><button class="btn ghost sm" data-cies="">Trocar universidade</button></div>
        <div class="ct-search" style="grid-template-columns:minmax(0,1fr)"><input type="search" placeholder="Filtrar curso (ex.: Medicina, Engenharia)" data-cqc value="${esc(c.buscaCursoIes || "")}" aria-label="Buscar curso nesta universidade"></div>
        <div id="ctLista">${vListaCursosIes()}</div>`;
    }
    return `${aviso}${alterna}<p class="muted" style="max-width:70ch">Busque o curso e veja sua chance em cada faculdade, com os pesos e a nota de corte de cada uma no ${esc(SI.meta.edicao.replace(/ \(.*/, ""))}.</p>
      <div class="ct-search"><input type="search" placeholder="Curso ou faculdade (ex.: Medicina, Direito UFMG)" data-cq value="${esc(c.busca)}" aria-label="Buscar curso ou faculdade">${selUF}</div>
      <div id="ctLista">${vLista()}</div>${rodape}`;
  }

  function vListaIes() {
    const c = st(), pal = norm(c.buscaIes).split(/\s+/).filter(Boolean).map((p) => " " + p);
    const info = SI.ies.map((I, i) => {
      const cs = SI.cursos.filter((x) => x[4] === i), cid = [...new Set(cs.map((x) => x[5] + "/" + x[6]))];
      return { I, i, n: cs.length, cid, ufs: new Set(cs.map((x) => x[6])), k: " " + norm(I[0] + " " + I[1] + " " + cid.join(" ")).replace(/[\/-]/g, " ") };
    });
    let r = info.filter((o) => o.n && (!c.uf || o.ufs.has(c.uf)) && pal.every((p) => o.k.includes(p)));
    const q = norm(c.buscaIes).replace(/\s+/g, ""), peso = (o) => (q && norm(o.I[0]).replace(/\s+/g, "") === q ? 0 : q && norm(o.I[0]).replace(/\s+/g, "").startsWith(q) ? 1 : 2) * 2 + (/^universidade/i.test(o.I[1]) ? 0 : 1);
    r.sort((a, b) => peso(a) - peso(b) || a.I[0].localeCompare(b.I[0], "pt-BR"));
    if (!r.length) return `<div class="empty">Nenhuma universidade do SISU encontrada com essa busca.</div>`;
    return `<p class="small muted" style="margin:0 0 8px">${r.length} universidade${r.length > 1 ? "s" : ""}${pal.length || c.uf ? "" : " no SISU 2025"}</p><div class="ct-list">${r.map((o) => `<button class="ct-item" data-cies="${esc(o.I[0])}"><span><b>${esc(o.I[0])}</b> <span class="s">${esc(o.I[1])}</span><br><span class="s">${esc(o.cid.slice(0, 4).join(" · "))}${o.cid.length > 4 ? ` e mais ${o.cid.length - 4}` : ""}</span></span><span class="ct-pill">${o.n} curso${o.n > 1 ? "s" : ""}</span></button>`).join("")}</div>`;
  }

  function vListaCursosIes() {
    const c = st(), ies = SI.ies.findIndex((x) => x[0] === c.ies), pal = norm(c.buscaCursoIes).split(/\s+/).filter(Boolean).map((p) => " " + p);
    const r = SI.cursos.filter((x) => x[4] === ies && pal.every((p) => (" " + x.k).includes(p) || (" " + norm(x[5] + " " + x[7])).includes(p)));
    if (!r.length) return `<div class="empty">Nenhum curso com esse nome nesta universidade.</div>`;
    r.sort((a, b) => a[1].localeCompare(b[1], "pt-BR") || a[5].localeCompare(b[5], "pt-BR") || a[3].localeCompare(b[3], "pt-BR"));
    return itensHTML(r, false, 400);
  }

  function itensHTML(lista, ordenar, lim) {
    const N = notas(), ok = ORD.concat("RED").every((a) => N[a]), tot = lista.length;
    let r = lista.map((x) => { const m = ok ? media(x, N) : null, corte = x[10][0][2]; const ch = m && !m.falta.length ? chance(m.m, corte, m.sdUser) : null; return { x, m, ch, corte }; });
    if (ordenar) r.sort((a, b) => (b.ch ? Math.round(b.ch.p * 100) : 0) - (a.ch ? Math.round(a.ch.p * 100) : 0) || (a.ch ? a.corte - b.corte : b.corte - a.corte));
    return `<p class="small muted" style="margin:0 0 8px">${tot} opç${tot > 1 ? "ões" : "ão"}${tot > lim ? ` · mostrando as ${lim} primeiras` : ""}${ok && ordenar ? " · ordenadas pela sua chance (ampla concorrência)" : ""}</p><div class="ct-list">${r.slice(0, lim).map(({ x, m, ch, corte }) => {
      const ies = SI.ies[x[4]], rt = ch ? rotulo(ch.p) : null;
      return `<button class="ct-item" data-calvo="${x[0]}"><span><b>${esc(x[1])}</b> <span class="s">${esc(x[2])} · ${esc(x[3])}</span><br><span class="s">${esc(ies[0])} · ${esc(x[7] && !/^(unidade sede|sede|campus sede)$/i.test(x[7]) ? x[7] + " · " : "")}${esc(x[5])}/${esc(x[6])} · corte ${f1(corte)}${m && !m.falta.length ? ` · sua média ${f1(m.m)}` : ""}</span></span>${ch ? `<span class="ct-pill num" style="background:${rt[1]};${ch.p >= 0.85 || ch.p < 0.15 ? "color:#fff" : ""}">${Math.round(ch.p * 100)}%</span>` : `<span class="ct-pill">ver</span>`}</button>`;
    }).join("")}</div>`;
  }

  function vLista() {
    const c = st(), q = norm(c.busca), pal = q.split(/\s+/).filter(Boolean);
    if (!pal.length) return `<div class="empty">Digite o nome de um curso para começar.</div>`;
    const pal2 = pal.map((p) => " " + p), noCurso = (x) => pal2.some((p) => (" " + x.k).includes(p));
    let r = SI.cursos.filter((x) => (!c.uf || x[6] === c.uf) && pal2.every((p) => (" " + x.k).includes(p) || (" " + x.ki).includes(p)));
    if (r.some(noCurso)) r = r.filter(noCurso); // "medicina" busca o curso, não a Faculdade de Medicina
    if (!r.length) return `<div class="empty">Nenhum curso encontrado no SISU com essa busca.</div>`;
    return itensHTML(r, true, 60);
  }

  function vCurso(cur, N) {
    const c = st(), ies = SI.ies[cur[4]], mods = cur[10];
    if (c.mod >= mods.length) c.mod = 0;
    const [mi, vagas, corte] = mods[c.mod], m = media(cur, N), { p, sd } = chance(m.m, corte, m.sdUser), rt = rotulo(p), dif = Math.round(m.m * 10) / 10 - Math.round(corte * 10) / 10;
    const pesos = cur[8], W = pesos.reduce((x, y) => x + y, 0);
    const alvo80 = corte + 0.8416 * sd, falta80 = alvo80 - m.m;
    const melhor = ORDEM_PESO.map((a, i) => ({ a, w: pesos[i], i })).filter((o) => o.w).sort((x, y) => y.w - x.w)[0];
    const lo = Math.min(m.m, corte) - 2.2 * sd, hi = Math.max(m.m, corte) + 2.2 * sd, X = (v) => Math.max(0, Math.min(100, ((v - lo) / (hi - lo)) * 100));
    const insc = c.mod === 0 && cur[11] ? cur[11] : 0;
    const nomeA = (a) => a === "RED" ? "Redação" : AR[a].n;
    return `<button class="btn ghost sm" data-calvo="" style="margin-top:8px">← ${st().por === "ies" ? "Voltar para os cursos da " + esc(SI.ies[cur[4]][0]) : "Voltar para a busca"}</button>
      <h2 class="h-sec" style="margin:14px 0 2px">${esc(cur[1])} <span class="muted" style="font-size:.7em">${esc(cur[2])} · ${esc(cur[3])}</span></h2>
      <p class="muted" style="margin:0">${esc(ies[1])} (${esc(ies[0])}) · ${esc(cur[7])} · ${esc(cur[5])}/${esc(cur[6])}</p>
      <label style="display:grid;gap:4px;font-size:12.5px;font-weight:700;margin:14px 0 4px;max-width:520px">Modalidade de concorrência<select data-cset="mod">${mods.map((x, i) => `<option value="${i}" ${i === c.mod ? "selected" : ""}>${esc(nomeMod(x[0]))} · corte ${f1(x[2])}</option>`).join("")}</select></label>
      ${SI.meta.mods[mi][0] !== "AC" ? `<p class="small muted" style="margin:0 0 6px;max-width:80ch">${esc(SI.meta.mods[mi][1])}</p>` : ""}
      <div class="ct-res"><div class="ct-hero"><span class="small" style="color:#C9C4FF">Sua chance de aprovação</span><div class="ct-big num">${Math.round(p * 100)}%</div>
        <p><b style="color:var(--white)">${rt[0]}.</b> Sua média ponderada é <b style="color:var(--white)">${f1(m.m)}</b> e a nota de corte foi <b style="color:var(--white)">${f1(corte)}</b>: ${dif >= 0 ? `${f1(dif)} pontos acima` : `${f1(-dif)} pontos abaixo`}.</p>
        <div class="ct-gauge" aria-hidden="true"><div class="tr"></div><div class="mk" style="left:${X(corte)}%"><span>corte ${f0(corte)}</span></div><div class="mk you" style="left:${X(m.m)}%"><span>você ${f0(m.m)}</span></div></div>
        ${m.abaixo.length ? `<div class="ct-info" style="margin-top:22px;color:var(--ink)">Atenção: este curso exige nota mínima e a sua ficou abaixo em ${m.abaixo.map((a) => a === "MED" ? "média" : nomeA(a)).join(", ")}. Com isso a inscrição não é aceita.</div>` : ""}</div>
      <div class="card"><h3 style="font-size:16px;margin:0 0 6px">Como sua média é calculada</h3><table class="ct-tab"><thead><tr><th>Área</th><th class="num">Peso</th><th class="num">Sua nota</th>${cur[9] ? `<th class="num">Mínima</th>` : ""}</tr></thead><tbody>${ORDEM_PESO.map((a, i) => `<tr><td>${nomeA(a)}</td><td class="num">${String(pesos[i]).replace(".", ",")}</td><td class="num">${f1(N[a].n)}</td>${cur[9] ? `<td class="num">${cur[9][i] > 1 ? f0(cur[9][i]) : "—"}</td>` : ""}</tr>`).join("")}<tr><td><b>Média ponderada</b></td><td class="num">${String(W).replace(".", ",")}</td><td class="num"><b>${f1(m.m)}</b></td>${cur[9] ? `<td class="num">${cur[9][5] > 1 ? f0(cur[9][5]) : "—"}</td>` : ""}</tr></tbody></table>
        <p class="small muted" style="margin:8px 0 0">${vagas} vaga${vagas > 1 ? "s" : ""} nesta modalidade${insc ? ` · ${insc.toLocaleString("pt-BR")} inscritos na ampla concorrência (${(insc / vagas).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} por vaga)` : ""}.</p></div></div>
      <div class="card" style="margin-top:14px"><h3 style="font-size:16px;margin:0 0 6px">${falta80 > 0 ? "O que falta para 80% de chance" : "Margem de segurança"}</h3>
        <p style="margin:0">${textoFalta(falta80, alvo80, melhor, W, pesos, N)}</p></div>
      <p class="note" style="margin-top:14px">Como a chance é calculada: comparamos sua média ponderada com a nota de corte final da chamada regular do ${esc(SI.meta.edicao.replace(/ \(.*/, ""))} nesta modalidade. A nota de corte muda de um ano para o outro (em geral, cerca de ${f0(SI.meta.var_sd)} pontos para mais ou para menos, medido em ${SI.meta.var_n.toLocaleString("pt-BR")} cursos)${N.RED.sd ? ", e a redação que você digitou é uma estimativa" : ""}${st().modo === "acertos" ? ", e a nota por acertos tem uma faixa de variação" : ""}. A chance junta essas incertezas. É uma estimativa, não uma garantia.</p>`;
  }

  function textoFalta(falta, alvo, melhor, W, pesos, N) {
    const nomeA = (a) => a === "RED" ? "a Redação" : AR[a].n;
    if (falta <= 0) return `Você está acima do ponto de 80% de chance (${f1(alvo)}). ${pesos.every((w) => w === pesos[0]) ? "Todas as áreas têm o mesmo peso: manter o nível em todas protege essa margem." : `Caprichar em ${nomeA(melhor.a)}, a área de maior peso, protege essa margem.`}`;
    let t = `Para chegar a 80% de chance, sua média ponderada precisa de <b>${f1(alvo)}</b>: mais <b>${f1(falta)} pontos</b>. `;
    if (pesos.every((w) => w === pesos[0])) return t + `Como as cinco notas têm o mesmo peso, isso equivale a ganhar cerca de <b>${f0(falta)} pontos em cada uma</b>.`;
    const tops = ORDEM_PESO.filter((x, i) => pesos[i] === melhor.w), so = (falta * W) / (melhor.w * tops.length);
    const lista = tops.map(nomeA), nomes = lista.length > 1 ? lista.slice(0, -1).join(", ") + " e " + lista[lista.length - 1] : lista[0];
    const cabe = tops.every((x) => N[x].n + so <= 1000), pw = String(melhor.w).replace(".", ","), pW = String(W).replace(".", ",");
    if (!cabe) return t + `É uma distância grande: nem ${tops.length > 1 ? "as áreas" : "a área"} de maior peso (${nomes}) ${tops.length > 1 ? "cobrem" : "cobre"} isso sozinha${tops.length > 1 ? "s" : ""}, então o ganho precisa vir de todas as áreas.`;
    return t + (tops.length > 1
      ? `${nomes} têm o maior peso (${pw} cada, de ${pW}): subindo só nelas, seriam cerca de <b>+${f0(so)} pontos em cada uma</b>.`
      : `${nomes} tem o maior peso (${pw} de ${pW}): sozinha, precisaria subir cerca de <b>${f0(so)} pontos</b>. Dividindo o ganho entre as áreas, fica mais fácil.`);
  }

  /* ---------- eventos ---------- */
  function rerender(keep) { const y = window.scrollY; render(); if (keep) window.scrollTo({ top: y }); else window.scrollTo({ top: 0 }); }
  document.addEventListener("click", (e) => {
    if (VIEW !== "calc") return;
    const b = e.target.closest("[data-cab],[data-carea],[data-cb],[data-ccorr],[data-cclear],[data-calvo],[data-cpor],[data-cies]");
    if (!b) return; const d = b.dataset, c = st(); e.preventDefault();
    if (d.cab) { c.aba = d.cab; save(); rerender(); return; }
    if (d.carea) { c.area = d.carea; save(); rerender(true); return; }
    if (d.cpor) { c.por = d.cpor; c.alvo = null; save(); rerender(true); return; }
    if (d.cies !== undefined) { c.ies = d.cies || null; c.buscaCursoIes = ""; c.alvo = null; save(); rerender(); return; }
    if (d.calvo !== undefined) { c.alvo = d.calvo || null; c.mod = 0; save(); rerender(); return; }
    if (d.cclear !== undefined) { if (!confirmarLimpar()) return; delete c.resp[chaveResp(c.area)]; delete c.corr[chaveResp(c.area)]; save(); rerender(true); return; }
    if (d.ccorr !== undefined) {
      const k = chaveResp(c.area), r = respDe(c.area), feitas = 45 - (r.match(/\./g) || []).length;
      if (!feitas) { toast("Marque suas respostas antes de corrigir."); return; }
      c.corr[k] = true; save(); rerender(true);
      const res = corrigir(c.area), prox = ORD.find((a) => !c.corr[chaveResp(a)]);
      if (prox) toast(`${AR[c.area].n}: ${f1(res.n)} pontos`, "Próxima área", () => { st().area = prox; save(); rerender(); });
      else toast(`${AR[c.area].n}: ${f1(res.n)} pontos`);
      return;
    }
    if (d.cb) {
      const [i, j] = d.cb.split(".").map(Number), k = chaveResp(c.area), arr = respDe(c.area).split("");
      arr[i] = arr[i] === L[j] ? "." : L[j]; c.resp[k] = arr.join("").replace(/\.+$/, "");
      save(); rerender(true);
    }
  });
  let limparAt = 0;
  function confirmarLimpar() { if (Date.now() - limparAt < 4000) { limparAt = 0; return true; } limparAt = Date.now(); toast("Toque em Limpar de novo para apagar as respostas desta área."); return false; }

  document.addEventListener("change", (e) => {
    if (VIEW !== "calc") return;
    const t = e.target.closest("[data-cset]"); if (!t) return;
    const c = st(), k = t.dataset.cset;
    c[k] = k === "mod" ? +t.value : t.value;
    save(); rerender(true);
  });
  document.addEventListener("input", (e) => {
    if (VIEW !== "calc") return;
    const t = e.target, c = st();
    if (t.matches("[data-cqi]")) { c.buscaIes = t.value; save(); const l = document.getElementById("ctLista"); if (l) l.innerHTML = vListaIes(); return; }
    if (t.matches("[data-cqc]")) { c.buscaCursoIes = t.value; save(); const l = document.getElementById("ctLista"); if (l) l.innerHTML = vListaCursosIes(); return; }
    if (t.matches("[data-cq]")) { c.busca = t.value; save(); const l = document.getElementById("ctLista"); if (l) l.innerHTML = vLista(); return; }
    if (t.matches("[data-cin]")) {
      const [grp, a] = t.dataset.cin.split(".");
      if (grp === "red") c.red = t.value; else c[grp][a] = t.value;
      save();
      if (grp === "ac") { const s = document.getElementById("ctp-" + a), v = t.value; if (s) { const x = v !== "" ? D.acertos[a][Math.max(0, Math.min(45, Math.round(+v)))] : null; s.innerHTML = x ? `Nota provável <b style="color:var(--ink)">${f0(x[1])}</b> · faixa ${f0(x[0])}–${f0(x[2])}` : "acertos de 45"; } }
      const rs = document.getElementById("ctResumo"); if (rs) rs.innerHTML = vResumo();
      return;
    }
    if (t.matches("[data-cpaste]")) {
      const s = t.value.toUpperCase().replace(/\s+/g, "").replace(/[^A-E\-.*_X]/g, "").replace(/[\-*_X]/g, ".").slice(0, 45);
      c.resp[chaveResp(c.area)] = s.replace(/\.+$/, ""); save();
      clearTimeout(t._t); t._t = setTimeout(() => { const pos = t.selectionStart; rerender(true); const n = document.querySelector("[data-cpaste]"); if (n) { n.closest("details").open = true; n.focus(); try { n.setSelectionRange(pos, pos); } catch (er) {} } }, 500);
    }
  });
})();
