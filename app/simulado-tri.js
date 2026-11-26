// Simulado TRI: aba dentro de Simulados. Questões reais do ENEM por área, nota pela TRI com os
// parâmetros oficiais do INEP (microdados ITENS_PROVA) e correção comentada "A Easier explica" (texto pronto,
// sem chamar a IA). Dados em simulados-tri.json. Liberado a partir de 27/11/2026 (ou com localStorage "tri-beta" = "1").
// Usa globais do app: S, save, render, go, esc, qmd, toast, addXP, VIEW, qMode, qf, rebuildQ.
(function () {
  const DESDE = new Date("2026-11-27T00:00:00-03:00");
  const MIN_Q = 3; // minutos por questão, como nos outros simulados
  const L = "ABCDE";
  const AR = {
    LC: { n: "Linguagens", full: "Linguagens, Códigos e suas Tecnologias", cls: "c-violet" },
    CH: { n: "Ciências Humanas", full: "Ciências Humanas e suas Tecnologias", cls: "c-pink" },
    CN: { n: "Ciências da Natureza", full: "Ciências da Natureza e suas Tecnologias", cls: "c-lime" },
    MT: { n: "Matemática", full: "Matemática e suas Tecnologias", cls: "c-ink" },
  };
  let D = null, carregando = false, erro = false, tab = null, tela = "home", tick = null, ult = 0, rasc = false;
  const cel = () => { try { return matchMedia("(max-width:760px)").matches; } catch (e) { return false; } };

  const ativo = () => { try { if (localStorage.getItem("tri-beta") === "1") return true; } catch (e) {} return Date.now() >= DESDE.getTime(); };
  const st = () => { if (!S.tri) S.tri = { run: null, hist: [] }; S.tri.hist = S.tri.hist || []; return S.tri; };
  const R = () => st().run;
  const itens = () => D[R().ar].itens;
  const escala = (ar) => D[ar].esc; // [slope, intercept] da escala oficial de cada área
  const nota = (th, ar) => Math.round(Math.max(0, Math.min(1000, escala(ar)[1] + escala(ar)[0] * th)));
  const P = (th, q) => q.pc + (1 - q.pc) / (1 + Math.exp(-q.pa * (th - q.pb))); // ML3 do INEP, D = 1
  const G = Array.from({ length: 161 }, (_, i) => -4 + i * 0.05);
  function eap(it, u) { // estimação EAP com priori N(0,1), como o INEP
    let sw = 0, sth = 0; const w = [];
    for (const th of G) { let l = Math.exp(-(th ** 2) / 2); u.forEach((x, i) => { const p = P(th, it[i]); l *= x ? p : 1 - p; }); w.push(l); sw += l; sth += l * th; }
    const m = sth / sw; let v = 0; G.forEach((th, i) => (v += w[i] * (th - m) ** 2));
    return { th: m, se: Math.sqrt(v / sw) };
  }
  const fmt = (s) => { s = Math.max(0, Math.round(s)); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
  const txt = (t) => qmd(String(t || ""), {});

  function carregar() {
    if (D || carregando) return; carregando = true;
    fetch("simulados-tri.json").then((r) => r.json()).then((d) => { D = d; carregando = false; if (VIEW === "simulados") render(); })
      .catch(() => { erro = true; carregando = false; if (VIEW === "simulados") render(); });
  }

  /* ---------- estilos (só o que a plataforma ainda não tem) ---------- */
  const css = `
.tri-banner{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px;align-items:center;background:var(--violet);color:var(--white);border-radius:22px;padding:20px 22px;margin:16px 0 4px}
.tri-banner .h-big{font-size:clamp(22px,3.2vw,32px)}.tri-banner .h-big em{font-style:normal;color:var(--lime)}
.tri-banner p{margin:6px 0 0;color:#DCD8FF;font-size:14px;max-width:58ch}
.tri-banner .btn{background:var(--lime);color:var(--ink);border-radius:99px;font-family:var(--display);text-transform:uppercase;padding:12px 22px}
.tri-new{background:var(--orange);color:var(--white);border-radius:99px;padding:1px 8px;font-size:10.5px;font-weight:800;font-family:var(--display);text-transform:uppercase;margin-left:6px}
.qmode button.on .tri-new{background:var(--lime);color:var(--ink)}
.tri-run{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:16px;align-items:start}
.tri-arow{display:flex;gap:6px}.tri-arow .alt{flex:1}
.tri-cut{width:44px;flex:none;border:1.5px solid var(--line);border-radius:14px;background:var(--white);display:grid;place-items:center;color:var(--ink)}
.tri-arow.cut .alt{opacity:.45;text-decoration:line-through}.tri-arow.cut .tri-cut{background:var(--ink);color:var(--white)}
.qgrid button.rev{position:relative}.qgrid button.rev::after{content:"";position:absolute;top:-5px;right:-5px;width:12px;height:12px;border-radius:50%;background:var(--pink);border:1.5px solid var(--ink)}
.tri-draft{width:100%;min-height:120px;border:1.5px solid var(--line);border-radius:12px;padding:10px;background:repeating-linear-gradient(#fff,#fff 23px,#E7E1F5 24px);line-height:24px;font-size:15px;resize:vertical}
.timer.low{background:var(--bad);color:var(--white)}
.tri-big{font-family:var(--display);font-weight:900;font-size:clamp(72px,11vw,124px);line-height:.9;color:var(--lime);letter-spacing:-.03em}
.tri-fig{position:relative;min-height:210px}.tri-fig>svg{position:absolute;inset:0;width:100%;height:100%}
.tri-lower{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:14px;margin-top:14px}
.tri-warn{border:1.5px solid var(--line);border-radius:14px;padding:12px 14px;background:var(--butter);font-size:14px;color:var(--ink)}
.tri-step{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:12px;align-items:center;border:1.5px solid var(--line);border-radius:16px;background:var(--white);padding:10px 12px;margin-bottom:8px}
.tri-step .n{width:44px;height:44px;border-radius:12px;border:1.5px solid var(--line);display:grid;place-items:center;font-family:var(--display);font-weight:900;font-size:17px;background:var(--lav)}
.tri-ez{margin-top:14px;border:1.5px solid var(--line);border-radius:18px;background:var(--cream);padding:14px;display:grid;grid-template-columns:44px minmax(0,1fr);gap:12px;align-items:start}
.tri-ez .av{width:44px;height:44px;border-radius:50%;background:var(--violet);border:1.5px solid var(--line);display:grid;place-items:center;font-family:var(--display);font-weight:900;color:var(--lime);font-size:20px}
.tri-ez .tp{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px}
.tri-ez .bd{background:var(--lime);border:1.5px solid var(--line);border-radius:99px;padding:2px 10px;font-family:var(--display);font-weight:800;font-size:11px;text-transform:uppercase}
.tri-ez .msg{background:var(--lav);border-radius:14px 14px 14px 4px;padding:10px 12px;font-size:14.5px;line-height:1.6}
.tri-modal{position:fixed;inset:0;z-index:80;background:rgba(20,18,30,.72);display:grid;place-items:center;padding:16px}
.tri-modal .box{background:var(--white);border-radius:22px;width:min(460px,100%);border:1.5px solid var(--line);padding:20px}
@media (max-width:1050px){.tri-run,.tri-lower{grid-template-columns:minmax(0,1fr)}}
.tri-cnt,.tri-mtag,.tri-leg{display:none}
.tri-rasc{width:100%;display:flex;justify-content:space-between;align-items:center;border:0;background:none;padding:0;font:inherit;font-weight:700;color:var(--ink)}
@media (max-width:760px){.tri-banner{grid-template-columns:1fr}.tri-step{grid-template-columns:44px minmax(0,1fr)}.tri-step .btn{grid-column:1/-1}
.simbar.tri-bar{flex-wrap:nowrap;gap:8px;margin-inline:-16px;padding:8px 16px}
.tri-bar b{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px;margin:0!important}
.tri-bar .timer{font-size:20px;padding:1px 10px;flex:none}.tri-bar .btn{flex:none}
.tri-cnt{display:inline;flex:none;font-size:12.5px}
.qgrid.tri-qg{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin-inline:-16px;padding:6px 16px 8px;-webkit-overflow-scrolling:touch}
.tri-qg::-webkit-scrollbar{display:none}.tri-qg button{flex:none;width:40px;height:40px}
.tri-run .qcard{padding:16px}.tri-run .qmeta [data-trev]{margin-left:0!important}
.tri-arow{gap:5px}.tri-cut{width:40px;border-radius:12px}
.qnav.tri-nav{position:sticky;bottom:calc(var(--navh,68px) + env(safe-area-inset-bottom,0px));z-index:3;background:var(--panel);margin:12px -16px 0;padding:10px 16px;border-top:1.5px solid var(--hair);flex-wrap:nowrap}
.tri-nav .btn,.tri-nav2 .btn{flex:1;justify-content:center;min-height:46px}.tri-nav .small{display:none}
.tri-run .side{gap:10px}.tri-run .side .card{padding:14px}
.tri-areas{grid-template-columns:1fr 1fr!important;gap:10px}
.tri-areas .prog{min-height:0;padding:14px;gap:10px;border-radius:18px}
.tri-areas .prog p,.tri-areas .tags span{display:none}.tri-areas .tags .tri-mtag{display:inline-block;font-size:11.5px}
.tri-areas .prog h3{font-size:18px;margin-top:4px}.tri-areas .prog .btn{margin-top:auto;padding:10px 8px;font-size:13px;justify-content:center}
.tri-res{grid-template-columns:1fr 1fr!important;gap:10px}
.tri-res .hero-main{min-height:0;padding:20px 18px}.tri-res .hero-main .qnav{flex-direction:column;align-items:stretch}.tri-res .hero-main .qnav .btn{justify-content:center}
.tri-res .stack{grid-column:1/-1;grid-template-columns:1fr 1fr;grid-template-rows:auto;gap:10px}
.tri-res .streak{padding:14px}.tri-res .streak .big{font-size:34px}
.tri-res .lvl{grid-column:1/-1;flex-direction:row;align-items:center;justify-content:space-between;padding:12px 16px}.tri-res .lvl .small:last-child{display:none}.tri-res .lvl .h-big{font-size:24px}
.tri-fig#triRegua{min-height:230px}
.tri-leg{display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;margin:8px 0;font-size:12.5px;font-weight:700}.tri-leg i{display:inline-block;width:14px;height:4px;border-radius:2px;margin-right:6px;vertical-align:middle}
.tri-modal{place-items:end center;padding:0}
.tri-modal .box{width:100%;border-radius:22px 22px 0 0;border-bottom:0;padding:20px 16px calc(20px + env(safe-area-inset-bottom,0px));animation:tri-up .22s ease-out}
.tri-modal .qnav{flex-direction:column-reverse}.tri-modal .qnav .btn{width:100%;justify-content:center;min-height:48px}
@keyframes tri-up{from{transform:translateY(100%)}to{transform:none}}}`;
  function estilo() { if (document.getElementById("triCss")) return; const s = document.createElement("style"); s.id = "triCss"; s.textContent = css; document.head.appendChild(s); }

  /* ---------- abas e banner dentro de Simulados ---------- */
  const triTab = () => tab || (R() && !R().done ? "tri" : "sim");
  window.triAtivo = ativo;
  window.triTab = triTab;
  window.triAbas = () => `<div class="qmode" role="tablist" aria-label="Tipo de simulado"><button class="${triTab() === "sim" ? "on" : ""}" data-ttab="sim" role="tab" aria-selected="${triTab() === "sim"}">Simulados</button><button class="${triTab() === "tri" ? "on" : ""}" data-ttab="tri" role="tab" aria-selected="${triTab() === "tri"}">Simulado TRI<span class="tri-new">Novo</span></button></div>`;
  window.triBanner = () => `<div class="tri-banner"><div><div class="h-big">Quer sua nota <em>no padrão ENEM?</em></div><p>No Simulado TRI você escolhe a área, faz questões reais do ENEM e recebe a nota calculada com os parâmetros oficiais do INEP.</p></div><button class="btn" data-ttab="tri">Simulado TRI</button></div>`;
  window.abrirSimuladoTRI = (m) => { tab = "tri"; tela = m === "como" ? "how" : R() && !R().done ? "run" : "home"; go("simulados"); };

  window.vSimTRI = function () {
    estilo(); carregar();
    const R0 = R(); if (R0 && !R0.done && tela !== "how") tela = "run";
    if (R0 && R0.done && tela === "run") tela = "result";
    if (!D) return titulo() + `<div class="empty" style="margin-top:16px">${erro ? "Não foi possível carregar o Simulado TRI. Recarregue a página." : "Carregando o Simulado TRI…"}</div>`;
    if (tela === "run" && R0 && !R0.done) return vRun();
    if (tela === "result" && R0 && R0.done) return vResult();
    if (tela === "how") return vHow();
    return vHome();
  };
  const titulo = () => `<h1 class="h-big" style="font-size:clamp(28px,5vw,46px);margin:6px 0 4px">Simulados<br><span style="color:var(--violet)">com nota TRI</span></h1>${window.triAbas()}`;

  function vHome() {
    const h = st().hist, R0 = R();
    return titulo() + `<p class="muted" style="max-width:64ch">Escolha a área. São questões reais do ENEM (2016 a 2023), e a nota é calculada pela TRI com os parâmetros oficiais que o INEP divulga para cada questão — acertar as questões certas vale mais do que acertar muitas.</p>
    ${R0 && R0.done && R0.res ? `<div class="card" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:14px"><b style="margin-right:auto">Último resultado: ${esc(AR[R0.ar].n)} · nota ${nota(R0.res.th, R0.ar)}</b><button class="btn ghost sm" data-tgo="result">Ver correção</button></div>` : ""}
    <div class="grid programs tri-areas" style="margin-top:16px">${["LC", "CH", "CN", "MT"].map((a) => { const y = D[a].itens.map((q) => q.y); return `<div class="prog ${AR[a].cls}"><div class="tags"><span>${D[a].itens.length} questões</span><span>${D[a].itens.length * MIN_Q} min</span><span>ENEM ${Math.min(...y)}–${Math.max(...y)}</span><span class="tri-mtag">${D[a].itens.length} questões · ${D[a].itens.length * MIN_Q} min</span></div><h3>${AR[a].n}</h3><p>${AR[a].full}. Nota TRI no final e resolução de cada questão.</p><button class="btn" data-tstart="${a}">Fazer simulado</button></div>`; }).join("")}</div>
    <div class="row-head"><h2 class="h-sec">Suas notas TRI</h2><button class="btn ghost sm" data-tgo="how">Como a TRI calcula a nota</button></div>
    ${h.length ? `<div class="card"><table><thead><tr><th>Área</th><th>Data</th><th>Acertos</th><th>Nota TRI</th></tr></thead><tbody>${h.slice().reverse().slice(0, 10).map((x) => `<tr><td>${esc(AR[x.a].n)}</td><td class="num">${new Date(x.d).toLocaleDateString("pt-BR")}</td><td class="num">${x.h}/${x.t}</td><td class="num"><b>${x.s}</b></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty">Faça seu primeiro Simulado TRI para acompanhar sua evolução por área.</div>`}`;
  }

  function iniciar(ar) {
    const n = D[ar].itens.length;
    st().run = { ar, i: 0, ans: Array(n).fill(null), cut: Array.from({ length: n }, () => []), rev: Array(n).fill(false), draft: Array(n).fill(""), tq: Array(n).fill(0), start: Date.now(), dur: n * MIN_Q * 60e3, done: false, rv: 0 };
    tela = "run"; save(); render(); window.scrollTo({ top: 0 });
  }

  function vRun() {
    const r = R(), it = itens(), N = it.length, i = r.i, q = it[i], a = r.ans[i], n = r.ans.filter((x) => x !== null).length;
    return `<div class="simbar tri-bar"><span class="timer num" id="triTimer">--:--</span><b style="margin-right:auto">${cel() ? AR[r.ar].n : "Simulado TRI · " + AR[r.ar].n}</b><span class="tri-cnt muted num">${n}/${N}</span><button class="btn sm" data-tfinish>Entregar</button></div>
    <div class="qgrid tri-qg" style="margin-bottom:14px">${it.map((_, j) => `<button class="${r.ans[j] !== null ? "ans" : ""} ${j === i ? "cur" : ""} ${r.rev[j] ? "rev" : ""}" data-tq="${j}" aria-label="Questão ${j + 1}">${j + 1}</button>`).join("")}</div>
    <div class="tri-run"><div><article class="qcard">
      <div class="qmeta"><span class="chip dark">ENEM ${q.y}</span><span class="chip">Questão ${q.n}</span><span class="chip" style="background:${typeof subjColor === "function" ? subjColor(q.s) : "var(--white)"}">${esc(q.s)}</span><button class="btn ghost sm" style="margin-left:auto;${r.rev[i] ? "background:var(--rose)" : ""}" data-trev>${r.rev[i] ? (cel() ? "Marcada ✓" : "Marcada para revisar") : (cel() ? "Revisar depois" : "Marcar para revisar")}</button></div>
      ${q.tx ? `<div class="qctx">${txt(q.tx)}</div>` : ""}<div class="qintro">${txt(q.q)}</div>
      <div class="alts">${q.o.map((o, j) => `<div class="tri-arow ${r.cut[i].includes(j) ? "cut" : ""}"><button class="alt ${a === j ? "sel" : ""}" data-tans="${j}"><span class="L">${L[j]}</span><span>${txt(o)}</span></button><button class="tri-cut" data-tcut="${j}" aria-label="Riscar alternativa ${L[j]}" title="Riscar alternativa"><svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button></div>`).join("")}</div>
    </article>
    <div class="qnav tri-nav"><button class="btn ghost sm" data-tq="${i - 1}" ${i === 0 ? "disabled" : ""}>Anterior</button>${i === N - 1 ? `<button class="btn sm" data-tfinish>Ir para entrega</button>` : `<button class="btn sm" data-tq="${i + 1}">Próxima</button>`}<span class="small muted num">${n}/${N} respondidas</span></div></div>
    <aside class="side">${cel() && !rasc ? `<div class="card"><button class="tri-rasc" data-trasc aria-expanded="false"><span>Rascunho${r.draft[i] ? " ·  com anotação" : ""}</span><span aria-hidden="true">＋</span></button></div>` : `<div class="card">${cel() ? `<button class="tri-rasc" data-trasc aria-expanded="true" style="margin-bottom:8px"><span>Rascunho</span><span aria-hidden="true">−</span></button>` : `<h4>Rascunho</h4>`}<textarea class="tri-draft" id="triDraft" placeholder="Contas e ideias desta questão">${esc(r.draft[i])}</textarea></div>`}
      <div class="card"><h4>Na prova</h4><p class="small muted" style="margin:0">${cel() ? "Toque no − ao lado de uma alternativa para riscá-la. Deslize os números no topo para pular de questão." : "Risque alternativas no botão ao lado delas. Teclas A–E escolhem, ← → navegam, R marca revisão."} Em branco conta como erro: chutar nunca tira ponto.</p></div></aside></div>`;
  }

  function relogio() {
    const r = R(); if (!r || r.done) return;
    const agora = Date.now(); if (VIEW === "simulados" && tela === "run") r.tq[r.i] += (agora - ult) / 1000; ult = agora;
    const left = (r.start + r.dur - agora) / 1000, el = document.getElementById("triTimer");
    if (left <= 0) { finalizar(); toast("Tempo esgotado. Simulado TRI entregue."); return; }
    if (el) { el.textContent = fmt(left); el.classList.toggle("low", left < 300); }
  }
  function ir(j) { const r = R(); if (!r || j < 0 || j >= itens().length) return; relogio(); r.i = j; save(); render(); window.scrollTo({ top: 0 }); }
  function marcar(j) { const r = R(), i = r.i; r.ans[i] = r.ans[i] === j ? null : j; const c = r.cut[i]; if (c.includes(j)) c.splice(c.indexOf(j), 1); save(); const y = window.scrollY; render(); window.scrollTo({ top: y }); }
  function perguntar() {
    const r = R(), b = r.ans.filter((x) => x === null).length, rv = r.rev.filter(Boolean).length;
    document.getElementById("triModal")?.remove();
    const m = document.createElement("div"); m.className = "tri-modal"; m.id = "triModal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
    m.innerHTML = `<div class="box"><h3 style="font-size:20px">${b ? `${b} ${b > 1 ? "questões" : "questão"} em branco` : "Entregar o simulado?"}</h3><p class="muted">${b ? "Em branco conta como erro, como no ENEM. Chutar nunca diminui sua nota. " : ""}${rv ? `Há ${rv} marcada(s) para revisar. ` : ""}Depois de entregar não dá para mudar as respostas.</p><div class="qnav"><button class="btn ghost" data-tmodal="nao">Voltar à prova</button><button class="btn" data-tmodal="sim">Entregar</button></div></div>`;
    document.body.appendChild(m); m.querySelector("[data-tmodal=nao]").focus();
  }
  function finalizar() {
    const r = R(); if (!r || r.done) return;
    const it = itens(); r.done = true; r.u = r.ans.map((a, i) => (a === it[i].k ? 1 : 0)); r.res = eap(it, r.u); r.rv = 0;
    const hits = r.u.reduce((a, b) => a + b, 0);
    st().hist.push({ a: r.ar, d: Date.now(), h: hits, t: it.length, s: nota(r.res.th, r.ar) });
    it.forEach((q, i) => { if (r.ans[i] !== null) { S.ans[q.id] = r.ans[i]; if (window.gpsLog) gpsLog(q.id, r.ans[i], "sim"); } });
    tela = "result";
    addXP(50 + hits * 5, "q", r.ans.filter((x) => x !== null).length); // addXP já salva
    render(); window.scrollTo({ top: 0 });
  }

  function vResult() {
    const r = R(), it = itens(), N = it.length, u = r.u, { th, se } = r.res, ar = r.ar, n = nota(th, ar), hits = u.reduce((a, b) => a + b, 0);
    const usado = Math.round(r.tq.reduce((a, b) => a + b, 0));
    const ord = it.map((_, i) => i).sort((x, y) => it[x].pb - it[y].pb), mk = (ids) => { const v = Array(N).fill(0); ids.forEach((i) => (v[i] = 1)); return nota(eap(it, v).th, ar); };
    const nI = mk(ord.slice(0, hits)), nW = mk(ord.slice(N - hits));
    let pr = 0, inc = 0; for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) if (it[x].pb < it[y].pb) { pr++; if (!u[x] && u[y]) inc++; }
    const coh = Math.round(100 * (1 - inc / pr));
    const chute = it.map((_, i) => i).filter((i) => u[i] && P(th, it[i]) < 0.35), erros = ord.filter((i) => !u[i]);
    const rv = Math.min(r.rv || 0, N - 1), q = it[rv], a = r.ans[rv];
    const porque = hits === 0 ? "Nenhum acerto: a nota fica perto do piso da área." : hits === N ? "Você gabaritou: a nota máxima possível com estas questões." :
      nI - n > 12 ? `Com os mesmos ${hits} acertos concentrados nas questões mais fáceis, sua nota seria <b style="color:var(--lime)">${nI}</b>. A TRI desconfia de quem acerta difícil e erra fácil — daí os ${nI - n} pontos de diferença.` :
      `Seus acertos seguiram a ordem de dificuldade, e a TRI recompensa isso. Se esses ${hits} acertos fossem só nas mais difíceis, a nota cairia para perto de <b style="color:var(--lime)">${nW}</b>.`;
    return `<div class="hero tri-res">
      <div class="hero-main"><span class="small" style="color:#C9C4FF">Sua nota TRI · ${AR[ar].n}</span><div class="tri-big num">${n}</div>
        <p>Faixa provável: <b style="color:var(--white);white-space:nowrap">${nota(th - se, ar)} a ${nota(th + se, ar)}</b>. Calculada com os parâmetros oficiais do INEP para estas ${N} questões. É uma estimativa: a nota do ENEM usa as 45 da prova.</p>
        <div class="qnav" style="margin-top:auto"><button class="btn lime sm" data-tgo="home">Voltar ao Simulado TRI</button><button class="btn ghost sm" data-tgo="how">Como foi calculada</button></div></div>
      <div class="stack"><div class="streak"><span class="small"><b>Acertos</b></span><div class="big num">${hits}/${N}</div><span class="small">Tempo usado: ${fmt(usado)}</span></div>
        <div class="card" style="padding:14px"><span class="small muted">Coerência</span><div class="h-big num" style="font-size:30px;color:${coh < 70 ? "var(--bad)" : "var(--ink)"}">${coh}%</div><div class="bar" style="margin-top:6px"><i style="width:${coh}%;background:${coh < 70 ? "var(--bad)" : "var(--ok)"}"></i></div></div></div>
      <div class="lvl"><span class="small">Simulado concluído</span><div class="h-big num">+${50 + hits * 5} XP</div><span class="small">${hits} acertos × 5 XP + 50 XP por concluir</span></div></div>
    <div class="tri-lower">
      <div class="card"><h3 style="font-size:17px">Régua de dificuldade</h3><div class="tri-fig" id="triRegua"><svg></svg></div><p class="note" style="margin:0">Cada número é uma questão, posicionada pela dificuldade oficial do INEP. Verde acertou, vermelho errou, vazio em branco. A faixa roxa é você.</p></div>
      <div class="dark-card"><h3>Por que essa nota?</h3><p style="margin:0">${porque}</p>${chute.length ? `<div class="tri-warn"><b>Possível chute</b> nas questões ${chute.map((i) => i + 1).join(", ")}: tinham menos de 35% de chance de acerto no seu nível. Veja a explicação da Easier.</div>` : ""}${coh < 70 ? `<div class="tri-warn">Coerência baixa: você errou questões consideradas fáceis. Atenção à leitura do enunciado.</div>` : ""}</div></div>
    <div class="row-head"><h2 class="h-sec">Próximos passos</h2><span class="note">do tema mais básico ao mais avançado — é onde a TRI rende mais</span></div>
    ${erros.length ? erros.slice(0, 4).map((i, k) => `<div class="tri-step"><span class="n">${k + 1}</span><div><b>${esc(it[i].t)}</b><div class="small muted">Você errou a questão ${i + 1} · ENEM ${it[i].y}</div></div><button class="btn ghost sm" data-tpratica="${esc(it[i].s)}">Praticar ${esc(it[i].s)}</button></div>`).join("") : `<div class="card">Nenhum erro. Tente outra área.</div>`}
    <div class="row-head"><h2 class="h-sec">Correção comentada</h2></div>
    <div class="qgrid tri-qg" style="margin-bottom:14px">${it.map((_, j) => `<button class="${u[j] ? "r" : "w"} ${j === rv ? "cur" : ""}" data-trv="${j}" aria-label="Questão ${j + 1}">${j + 1}</button>`).join("")}</div>
    <article class="qcard" id="triCorr"><div class="qmeta"><span class="chip dark">ENEM ${q.y}</span><span class="chip">Questão ${q.n}</span><span class="chip">${esc(q.t)}</span><span class="chip" style="${u[rv] ? "" : "background:var(--butter)"}">${a === null ? "Em branco" : u[rv] ? "Você acertou" : "Você marcou " + L[a]}</span><span class="chip num">${fmt(r.tq[rv])}</span></div>
      ${q.tx ? `<div class="qctx">${txt(q.tx)}</div>` : ""}<div class="qintro">${txt(q.q)}</div>
      <div class="alts">${q.o.map((o, j) => `<div class="alt ${j === q.k ? "right" : ""} ${j === a && a !== q.k ? "wrong" : ""}"><span class="L">${L[j]}</span><span>${txt(o)}</span></div>`).join("")}</div>
      <div class="tri-ez"><span class="av" aria-hidden="true">E</span><div><div class="tp"><b>A Easier explica</b><span class="bd">Gabarito ${L[q.k]}</span></div><div class="msg">${esc(q.r)}</div></div></div>
      ${r.draft[rv] ? `<p class="note">Seu rascunho: ${esc(r.draft[rv])}</p>` : ""}
      <div class="qnav tri-nav2"><button class="btn ghost sm" data-trv="${rv - 1}" ${rv === 0 ? "disabled" : ""}>Anterior</button><button class="btn sm" data-trv="${rv + 1}" ${rv === N - 1 ? "disabled" : ""}>Próxima</button></div></article>`;
  }

  function vHow() {
    return `<button class="btn ghost sm" data-tgo="${R() && R().done ? "result" : "home"}">← Voltar</button>
    <h1 class="h-big" style="font-size:clamp(26px,4.4vw,42px);margin:14px 0 6px">Como a TRI<br><span style="color:var(--violet)">calcula sua nota</span></h1>
    <div class="tri-lower" style="margin-top:14px"><div class="card"><h3 style="font-size:17px">Chance de acerto de 4 questões de Matemática</h3><div class="tri-fig" id="triCurvas" style="min-height:250px"><svg></svg></div><div class="tri-leg">${pick4().map((q, k) => `<span style="color:${COLS[k]}"><i style="background:${COLS[k]}"></i>ENEM ${q.y}</span>`).join("")}</div><p class="note" style="margin:0">Eixo horizontal: nota do aluno. Questões fáceis sobem antes; curvas inclinadas separam melhor quem sabe de quem chutou. Curvas feitas com os parâmetros oficiais do INEP.</p></div>
    <div class="grid"><div class="card" style="background:var(--lav)"><b>1. Cada questão tem dificuldade própria.</b><p class="small" style="margin:4px 0 0">O INEP calcula com as respostas de milhões de candidatos e publica nos microdados.</p></div>
      <div class="card" style="background:var(--mint)"><b>2. Coerência pesa.</b><p class="small" style="margin:4px 0 0">Acertar as difíceis e errar as fáceis parece chute, e a nota sobe menos.</p></div>
      <div class="card" style="background:var(--rose)"><b>3. Branco é erro.</b><p class="small" style="margin:4px 0 0">Nunca deixe em branco: o chute não tira ponto.</p></div>
      <div class="card" style="background:var(--butter)"><b>4. É uma estimativa.</b><p class="small" style="margin:4px 0 0">Mesmos parâmetros e mesma escala do ENEM, mas com ${D.MT.itens.length} questões por área, e não 45. Não é a nota oficial.</p></div></div></div>`;
  }

  const COLS = ["#4E3DF2", "#FF44C9", "#FF5B37", "#1C1B1A"];
  const pick4 = () => { const it = D.MT.itens; return [0, 4, 9, 14].map((i) => it[Math.min(i, it.length - 1)]); };
  /* ---------- gráficos e relógio, chamados pelo render() ---------- */
  const obs = {};
  function fig(id, fn) { const s = document.getElementById(id)?.querySelector("svg"); if (!s) return; const d = () => { const W = s.clientWidth, H = s.clientHeight; if (W) s.innerHTML = fn(W, H); }; obs[id]?.disconnect(); obs[id] = new ResizeObserver(d); obs[id].observe(s); d(); }
  window.triPos = function () {
    clearInterval(tick); tick = null;
    if (!D || triTab() !== "tri") return;
    const r = R();
    if (tela === "run" && r && !r.done) { ult = Date.now(); tick = setInterval(relogio, 1000); relogio(); }
    document.querySelectorAll(".tri-qg").forEach((g) => { const c = g.querySelector(".cur"); if (c && g.scrollWidth > g.clientWidth) g.scrollLeft = c.offsetLeft - g.clientWidth / 2 + c.offsetWidth / 2; });
    if (tela === "result" && r && r.done && r.res) {
      const it = itens(), { th, se } = r.res, lo = Math.min(-1.5, ...it.map((q) => q.pb), th - se) - 0.2, hi = Math.max(3, ...it.map((q) => q.pb), th + se) + 0.2;
      fig("triRegua", (W, H) => {
        const x = (b) => 24 + ((b - lo) / (hi - lo)) * (W - 48), y = H / 2 + 6, off = [-15, 15, -40, 40, -65, 65, -90, 90], fim = [];
        const lane = it.map((q, i) => i).sort((a, b) => it[a].pb - it[b].pb).reduce((o, i) => { const cx = x(it[i].pb); let k = fim.findIndex((e) => cx - e >= 25); if (k < 0) k = fim.length < off.length ? fim.length : fim.indexOf(Math.min(...fim)); fim[k] = cx; o[i] = off[k]; return o; }, {});
        const ext = Math.max(40, ...Object.values(lane).map(Math.abs)) + 16;
        let s = `<rect x="${x(th - se)}" y="${y - ext}" width="${Math.max(4, x(th + se) - x(th - se))}" height="${2 * ext}" rx="12" fill="#4E3DF2" opacity=".14"/><line x1="24" y1="${y}" x2="${W - 24}" y2="${y}" stroke="#1C1B1A" stroke-width="1.5"/><line x1="${x(th)}" y1="${y - ext - 4}" x2="${x(th)}" y2="${y + ext + 4}" stroke="#4E3DF2" stroke-width="3"/><text x="${Math.min(W - 50, Math.max(50, x(th)))}" y="${y - ext - 10}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="13" fill="#4E3DF2">VOCÊ · ${nota(th, r.ar)}</text><text x="24" y="${H - 4}" font-size="12" fill="#6B6660">mais fácil</text><text x="${W - 24}" y="${H - 4}" text-anchor="end" font-size="12" fill="#6B6660">mais difícil</text>`;
        it.forEach((q, i) => { const cy = y + lane[i], bl = r.ans[i] === null, c = bl ? "#fff" : r.u[i] ? "#1F9D57" : "#E2412B"; s += `<circle cx="${x(q.pb)}" cy="${cy}" r="12" fill="${c}" stroke="#1C1B1A" stroke-width="1.5"/><text x="${x(q.pb)}" y="${cy + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="${bl ? "#1C1B1A" : "#fff"}">${i + 1}</text>`; });
        return s;
      });
    }
    if (tela === "how") fig("triCurvas", (W, H) => {
      const it = D.MT.itens, es = D.MT.esc, l = 36, rr = 10, t = 10, bt = 28, X = (v) => l + ((v + 2) / 6) * (W - l - rr), Y = (v) => t + (1 - v) * (H - t - bt), cols = COLS, pick = pick4();
      let s = `<line x1="${l}" y1="${Y(0)}" x2="${W - rr}" y2="${Y(0)}" stroke="#E6DED1" stroke-width="1.5"/><text x="${l - 6}" y="${Y(1) + 10}" text-anchor="end" font-size="12" fill="#6B6660">100%</text><text x="${l - 6}" y="${Y(0)}" text-anchor="end" font-size="12" fill="#6B6660">0</text>`;
      [-1, 1, 3].forEach((v) => (s += `<text x="${X(v)}" y="${H - 8}" text-anchor="middle" font-size="12" fill="#6B6660">${Math.round(es[1] + es[0] * v)}</text>`));
      pick.forEach((q, k) => { let d = ""; for (let v = -2; v <= 4.001; v += 0.05) d += (d ? "L" : "M") + X(v).toFixed(1) + "," + Y(P(v, q)).toFixed(1); s += `<path d="${d}" fill="none" stroke="${cols[k]}" stroke-width="2.5"/>` + (W < 520 ? "" : `<text x="${Math.min(W - 90, X(q.pb) + 6)}" y="${Y(P(q.pb, q)) + (k % 2 ? 18 : -8)}" font-size="12" font-weight="700" fill="${cols[k]}">ENEM ${q.y}</text>`); });
      return s;
    });
  };

  /* ---------- eventos ---------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-trasc],[data-ttab],[data-tgo],[data-tstart],[data-tq],[data-tans],[data-tcut],[data-trev],[data-tfinish],[data-tmodal],[data-trv],[data-tpratica]");
    if (!b) return; const d = b.dataset; e.preventDefault();
    if (d.trasc !== undefined) { rasc = !rasc; const y = window.scrollY; render(); window.scrollTo({ top: y }); if (rasc) document.getElementById("triDraft")?.focus({ preventScroll: true }); return; }
    if (d.ttab) { tab = d.ttab; if (tab === "tri" && !(R() && !R().done)) tela = "home"; render(); window.scrollTo({ top: 0 }); return; }
    if (d.tgo) { tela = d.tgo; render(); window.scrollTo({ top: 0 }); return; }
    if (d.tstart) { if (R() && !R().done) { tela = "run"; render(); return; } iniciar(d.tstart); return; }
    if (d.tmodal) { document.getElementById("triModal")?.remove(); if (d.tmodal === "sim") finalizar(); return; }
    if (d.tpratica) { qMode = "obj"; qf = { s: d.tpratica, y: "Todos", pend: false, v: "ENEM" }; rebuildQ(); go("questoes"); return; }
    if (d.trv !== undefined) { const r = R(); r.rv = +d.trv; save(); render(); document.getElementById("triCorr")?.scrollIntoView({ block: "start" }); return; }
    const r = R(); if (!r || r.done) return;
    if (d.tq !== undefined) ir(+d.tq);
    else if (d.tans !== undefined) marcar(+d.tans);
    else if (d.tcut !== undefined) { const j = +d.tcut, c = r.cut[r.i]; c.includes(j) ? c.splice(c.indexOf(j), 1) : c.push(j); if (r.ans[r.i] === j && c.includes(j)) r.ans[r.i] = null; save(); const y = window.scrollY; render(); window.scrollTo({ top: y }); }
    else if (d.trev !== undefined) { r.rev[r.i] = !r.rev[r.i]; save(); const y = window.scrollY; render(); window.scrollTo({ top: y }); }
    else if (d.tfinish !== undefined) perguntar();
  });
  document.addEventListener("input", (e) => { if (e.target.id === "triDraft" && R()) { R().draft[R().i] = e.target.value; save(); } });
  document.addEventListener("keydown", (e) => {
    const r = R(); if (VIEW !== "simulados" || triTab() !== "tri" || tela !== "run" || !r || r.done) return;
    if (document.getElementById("triModal")) { if (e.key === "Escape") document.getElementById("triModal").remove(); return; }
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toUpperCase();
    if (k.length === 1 && L.includes(k)) marcar(L.indexOf(k));
    else if (e.key === "ArrowRight") ir(r.i + 1);
    else if (e.key === "ArrowLeft") ir(r.i - 1);
    else if (k === "R") { r.rev[r.i] = !r.rev[r.i]; save(); render(); }
  });
})();
