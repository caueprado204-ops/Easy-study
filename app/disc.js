// Modo dissertativo (2ª fase): o aluno escreve, a Easier corrige comparando com a resposta esperada.
// Sem a Easier, o aluno vê a resposta esperada e se autoavalia pelos critérios.
// Usa globais do app (S, save, render, esc, toast, getSample, errMsg, addXP, ALL_MODS, subjColor, cursoAluno).
(function () {
  const L = "abcdefgh";
  const df = { s: "Todas", est: "Todas", pend: false };
  let list = [], idx = 0, built = false, busy = null, self = {};

  const st = () => (S.disc = S.disc || {});
  const reg = (id) => (st()[id] = st()[id] || { resp: [] });
  const total = (d) => d.itens.reduce((a, it) => a + it.pts, 0);
  const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const fmt = (n) => (Math.round(n * 10) / 10).toLocaleString("pt-BR");

  function modDe(d) {
    if (d._mod !== undefined) return d._mod;
    const m = (typeof ALL_MODS !== "undefined" ? ALL_MODS : []).find((m) => m.s === d.s && norm(m.t).startsWith(norm(d.mt)));
    return (d._mod = m || null);
  }

  function rebuild(keepId) {
    const D = window.DISC || [];
    list = D.filter((d) => (df.s === "Todas" || d.s === df.s) && (df.est === "Todas" || d.est === df.est) && (!df.pend || st()[d.id]?.nota === undefined));
    idx = keepId ? Math.max(0, list.findIndex((d) => d.id === keepId)) : 0;
    built = true;
  }

  function stats() {
    const by = {}; let n = 0, pts = 0, max = 0;
    (window.DISC || []).forEach((d) => {
      const r = st()[d.id]; if (!r || r.nota === undefined) return;
      n++; pts += r.nota; max += r.max;
      const b = (by[d.s] = by[d.s] || { n: 0, pts: 0, max: 0 }); b.n++; b.pts += r.nota; b.max += r.max;
    });
    return { n, pts, max, by };
  }

  function resultadoHTML(d, r) {
    if (r.nota === undefined) return "";
    const pct = r.max ? Math.round((r.nota / r.max) * 100) : 0;
    const cor = pct >= 70 ? "var(--ok)" : pct >= 40 ? "var(--ink)" : "var(--bad)";
    return `<div class="dres">
      <div class="dres-top"><span class="h-big num" style="font-size:34px;color:${cor}">${fmt(r.nota)}<span style="font-size:18px">/${r.max}</span></span>
        <span class="small">${r.via === "ia" ? "Correção da Easier" : "Sua autoavaliação"} · ${new Date(r.t).toLocaleDateString("pt-BR")}${r.tent > 1 ? ` · ${r.tent}ª tentativa` : ""}</span></div>
      ${r.fb?.resumo ? `<p style="margin:8px 0 0">${esc(r.fb.resumo)}</p>` : ""}
      ${d.itens.map((it, i) => { const f = r.fb?.itens?.[i] || {}; return `<div class="dres-it">
        <b>${L[i]}) ${f.nota !== undefined ? `<span class="num">${fmt(f.nota)}/${it.pts}</span>` : ""}</b>
        ${f.comentario ? `<p>${esc(f.comentario)}</p>` : ""}
        ${f.acertos?.length ? `<p class="small"><b style="color:var(--ok)">Acertou:</b> ${f.acertos.map((x) => esc(String(x).replace(/\.$/, ""))).join("; ")}</p>` : ""}
        ${f.faltou?.length ? `<p class="small"><b style="color:var(--bad)">Faltou:</b> ${f.faltou.map((x) => esc(String(x).replace(/\.$/, ""))).join("; ")}</p>` : ""}</div>`; }).join("")}
      ${r.fb?.dica ? `<p class="small" style="margin:8px 0 0"><b>Dica para a 2ª fase:</b> ${esc(r.fb.dica)}</p>` : ""}
    </div>`;
  }

  function esperadaHTML(d, r, modoSelf) {
    return `<div class="desp"><h3 style="font-size:15px;margin:0 0 6px">Resposta esperada${modoSelf ? " e critérios" : ""}</h3>
      ${d.itens.map((it, i) => `<div class="desp-it"><b>${L[i]})</b> ${esc(it.esp)}
        ${modoSelf ? `<div class="dcrit">${it.crit.map((c, j) => `<label><input type="checkbox" data-disccrit="${d.id}|${i}|${j}" ${self[d.id]?.[i]?.[j] ? "checked" : ""}> ${esc(c)}</label>`).join("")}</div>`
          : `<ul class="small dcrit-l">${it.crit.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>`}</div>`).join("")}
      ${modoSelf ? `<button class="btn sm" data-discselfsave="${d.id}">Salvar minha nota</button> <button class="btn sm ghost" data-discselfclose="${d.id}">Fechar</button>` : ""}</div>`;
  }

  function cardHTML(d) {
    const r = reg(d.id), m = modDe(d), modoSelf = !!self[d.id];
    const corrigido = r.nota !== undefined;
    return `<article class="qcard dcard">
      <div class="qmeta"><span class="chip dark">Estilo ${esc(d.est)} · 2ª fase</span><span class="chip" style="background:${subjColor(d.s)}">${esc(d.s)}</span><span class="chip">${total(d)} pontos</span><span class="chip">Questão autoral</span></div>
      <div class="qctx">${esc(d.c)}</div>
      ${d.itens.map((it, i) => `<div class="ditem"><div class="qintro" style="margin:14px 0 8px">${L[i]}) ${esc(it.q)} <span class="small muted num" style="font-weight:500">(${it.pts} pts)</span></div>
        <textarea class="sheet dta" rows="4" data-discresp="${d.id}|${i}" placeholder="Escreva sua resposta do item ${L[i]}. Mostre o raciocínio e as contas, como na prova.">${esc(r.resp[i] || "")}</textarea></div>`).join("")}
      <div class="dbtns">
        <button class="btn ink" data-disccorr="${d.id}" ${busy ? "disabled" : ""}>${busy === d.id ? "A Easier está corrigindo…" : corrigido ? "Corrigir de novo com a Easier" : "Corrigir com a Easier"}</button>
        <button class="btn ghost" data-discself="${d.id}" ${busy ? "disabled" : ""}>Ver resposta esperada e me autoavaliar</button>
        ${m ? `<button class="btn ghost sm" data-mod="${m.id}">Estudar: ${esc(m.t)}</button>` : ""}
      </div>
      ${r.erro ? `<div class="explain" style="border-color:var(--bad)">${esc(r.erro)}</div>` : ""}
      ${resultadoHTML(d, r)}
      ${modoSelf ? esperadaHTML(d, r, true) : corrigido ? `<details class="ddet"><summary>Ver a resposta esperada</summary>${esperadaHTML(d, r, false)}</details>` : ""}
    </article>`;
  }

  window.vDisc = function () {
    if (!built) rebuild();
    const D = window.DISC || [], d = list[idx], s = stats();
    const subjs = ["Todas", ...new Set(D.map((d) => d.s))];
    return `<div class="row-head" style="margin-top:4px"><h1 class="h-sec">Dissertativas · 2ª fase</h1><span class="small muted num">${D.length} questões no estilo FUVEST e Unicamp</span></div>
    <p class="note" style="margin:0 0 10px;max-width:80ch">Questões autorais do Easy Study, no formato das provas discursivas. Escreva sua resposta e a Easier corrige comparando com a resposta esperada e os critérios de correção. Sem a Easier, você pode ver a resposta esperada e se autoavaliar.</p>
    <div class="pills" style="margin:0 0 10px">${["Todas", "FUVEST", "Unicamp"].map((p) => `<button class="pill ${df.est === p ? "on" : ""}" data-discest="${p}">${p === "Todas" ? "Todos os estilos" : "Estilo " + p}</button>`).join("")}</div>
    <div class="filters"><select id="dfS" aria-label="Matéria">${subjs.map((x) => `<option ${x === df.s ? "selected" : ""}>${x}</option>`).join("")}</select>
      <label class="small" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="dfP" ${df.pend ? "checked" : ""}> Só não corrigidas</label>
      <span class="small muted num" style="margin-left:auto">${list.length ? idx + 1 + " de " + list.length : "0 questões"}</span></div>
    <div class="qwrap"><div>${d ? cardHTML(d) : `<div class="empty">Nenhuma questão com esses filtros.</div>`}
      ${d ? `<div class="qnav"><button class="btn ghost sm" data-discmove="-1" ${idx === 0 ? "disabled" : ""}>Anterior</button><button class="btn sm" data-discmove="1" ${idx >= list.length - 1 ? "disabled" : ""}>Próxima</button><button class="btn ghost sm" data-discrand>Sortear</button></div>` : ""}</div>
      <aside class="card"><h3 style="font-size:16px;margin-bottom:8px">Suas dissertativas</h3>
        <div class="stat"><span>Corrigidas</span><b class="num">${s.n} de ${D.length}</b></div>
        <div class="stat"><span>Aproveitamento</span><b class="num">${s.max ? Math.round((s.pts / s.max) * 100) : 0}%</b></div>
        ${Object.entries(s.by).sort((a, b) => b[1].n - a[1].n).map(([k, v]) => `<div class="stat"><span><span class="dot" style="width:10px;height:10px;background:${subjColor(k)}"></span>${esc(k)}</span><span class="num">${Math.round((v.pts / v.max) * 100)}%</span></div>`).join("")}
        <p class="note" style="margin:10px 0 0">Na 2ª fase vale cada palavra: responda o que foi pedido, use os termos técnicos e mostre as contas. Cada correção pela Easier conta como 1 uso.</p></aside></div>`;
  };

  function itensJSON(d, n) {
    return "[" + d.itens.map(() => `{"nota":0,"comentario":"","acertos":[],"faltou":[]}`).slice(0, n).join(",") + "]";
  }

  async function corrigir(id) {
    const d = (window.DISC || []).find((x) => x.id === id); if (!d || busy) return;
    const r = reg(id);
    if (!d.itens.some((_, i) => (r.resp[i] || "").trim().length >= 3)) { toast("Escreva sua resposta antes de pedir a correção."); return; }
    busy = id; r.erro = null; render();
    const sample = await getSample();
    const prompt = `Seu nome é Easier, a corretora de IA da plataforma Easy Study. Corrija a resposta de um aluno a uma QUESTÃO DISSERTATIVA de 2ª fase de vestibular (estilo ${d.est}), como um corretor da banca: compare com a resposta esperada e os critérios, aceite respostas equivalentes com outras palavras ou caminhos corretos, e desconte erros conceituais, contas erradas e respostas incompletas. Seja justo e objetivo. ${typeof cursoAluno === "function" ? cursoAluno() : ""}

Matéria: ${d.s}
Contexto da questão: ${d.c}

${d.itens.map((it, i) => `ITEM ${L[i]}) (vale ${it.pts} pontos) ${it.q}
Resposta esperada: ${it.esp}
Critérios (cada um vale uma parte igual da nota do item): ${it.crit.map((c, j) => `(${j + 1}) ${c}`).join(" ")}
Resposta do aluno: """${(r.resp[i] || "").trim() || "(em branco)"}"""`).join("\n\n")}

Responda SOMENTE com JSON neste formato, com um objeto por item, na ordem:
{"itens":${itensJSON(d, d.itens.length)},"resumo":"uma frase de avaliação geral","dica":"uma dica curta e concreta para responder melhor esse tipo de questão"}
"nota" de cada item vai de 0 até o valor do item, em múltiplos de 0,5. "comentario" explica a nota em até 3 frases, falando com o aluno. "acertos" e "faltou" são listas curtas dos critérios cumpridos e não cumpridos. Item em branco ou fora do assunto vale 0.`;
    try {
      if (!sample) throw { code: "server" };
      const j = await sample.json(prompt, { modelTier: "default" });
      const its = d.itens.map((it, i) => {
        const f = (j.itens || [])[i] || {};
        const nota = Math.max(0, Math.min(it.pts, Math.round((+f.nota || 0) * 2) / 2));
        const lista = (x) => (Array.isArray(x) ? x : []).map((s) => String(s).slice(0, 300)).filter(Boolean).slice(0, 6);
        return { nota, comentario: String(f.comentario || "").slice(0, 900), acertos: lista(f.acertos), faltou: lista(f.faltou) };
      });
      const nota = its.reduce((a, x) => a + x.nota, 0);
      Object.assign(r, { nota, max: total(d), t: Date.now(), via: "ia", tent: (r.tent || 0) + 1, fb: { itens: its, resumo: String(j.resumo || "").slice(0, 400), dica: String(j.dica || "").slice(0, 400) } });
      delete self[id];
      const m = modDe(d); if (m && window.gpsTouch) gpsTouch(m.id);
      addXP(20, "q"); save();
    } catch (e) { r.erro = (typeof errMsg === "function" ? errMsg(e) : "A Easier não conseguiu corrigir agora.") + " Enquanto isso, use “Ver resposta esperada e me autoavaliar”."; }
    busy = null;
    if (VIEW === "questoes") render();
  }

  function salvarSelf(id) {
    const d = (window.DISC || []).find((x) => x.id === id); if (!d) return;
    const r = reg(id), sel = self[id] || {};
    const its = d.itens.map((it, i) => {
      const ok = it.crit.filter((_, j) => sel[i]?.[j]);
      const nota = Math.round((it.pts * ok.length / it.crit.length) * 2) / 2;
      return { nota, acertos: ok, faltou: it.crit.filter((_, j) => !sel[i]?.[j]) };
    });
    Object.assign(r, { nota: its.reduce((a, x) => a + x.nota, 0), max: total(d), t: Date.now(), via: "auto", tent: (r.tent || 0) + 1, fb: { itens: its } });
    delete r.erro; delete self[id];
    const m = modDe(d); if (m && window.gpsTouch) gpsTouch(m.id);
    addXP(10, "q"); save(); render(); toast("Autoavaliação salva");
  }

  // eventos (retorna true quando tratou o evento)
  window.discClick = function (d) {
    if (d.discest) { df.est = d.discest; rebuild(); render(); return true; }
    if (d.discmove) { idx = Math.max(0, Math.min(list.length - 1, idx + +d.discmove)); render(); scrollTo({ top: 0 }); return true; }
    if (d.discrand !== undefined) { idx = Math.floor(Math.random() * list.length); render(); return true; }
    if (d.disccorr) { corrigir(d.disccorr); return true; }
    if (d.discself) { self[d.discself] = self[d.discself] || {}; render(); document.querySelector(".desp")?.scrollIntoView({ block: "start", behavior: "smooth" }); return true; }
    if (d.discselfsave) { salvarSelf(d.discselfsave); return true; }
    if (d.discselfclose) { delete self[d.discselfclose]; render(); return true; }
    return false;
  };
  window.discChange = function (t) {
    if (t.id === "dfS") { df.s = t.value; rebuild(); render(); return true; }
    if (t.id === "dfP") { df.pend = t.checked; rebuild(); render(); return true; }
    if (t.dataset.disccrit) { const [id, i, j] = t.dataset.disccrit.split("|"); const o = (self[id] = self[id] || {}); (o[i] = o[i] || {})[j] = t.checked; return true; }
    return false;
  };
  window.discInput = function (t) {
    if (!t.dataset.discresp) return false;
    const [id, i] = t.dataset.discresp.split("|"); reg(id).resp[+i] = t.value.slice(0, 4000); save(); return true;
  };
})();
