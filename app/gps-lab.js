/* =====================================================================
   Easy Study — GPS de Estudos + Laboratório de Erros
   ---------------------------------------------------------------------
   Este arquivo é carregado ANTES do script principal do index.html e só
   define funções. Tudo que ele lê do app (S, MOD, Q, SUBJ, save, go...)
   é acessado no momento da chamada, nunca no carregamento.

   Modelo de dados (fica dentro de S, que já é salvo no navegador e
   sincronizado no Supabase na tabela `progresso`):
     S.qlog   [{id, t, ch, ok, src}]   cada resposta com data (src: train|sim|diag)
     S.erros  {qid: {cat, obs, dif, rev, t}}   análise de cada erro
     S.touch  {modId: timestamp}       último contato com cada módulo
     S.gps    {cfg, diag, plano, hist, log, v}
       cfg   = {vest, curso, data, min:[seg..dom em minutos], prior:[matérias]}
       diag  = {ids, ans:{qid:i}, cur, done, t}
       plano = {d, min, v, tasks:[...], feito:{k:1}, ini:{k:1}}
       hist  = {AAAA-MM-DD: nível 0-100}
       log   = {AAAA-MM-DD: [matéria, ...]}   matérias trabalhadas no dia

   O motor de prioridade é a função GPS.motor(ctx, m). Ela recebe um
   retrato do aluno e devolve {score, partes, motivos}. Para trocar a
   lógica por IA no futuro, basta substituir GPS.motor (ou montar o plano
   no servidor a partir de GPS.retrato()).
   ===================================================================== */
(function () {
  const W = window;
  const GPS = (W.GPS = W.GPS || {});
  const DAY = 864e5;
  const now = () => Date.now();
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const pct = (x) => Math.round(x * 100);
  const fmtMin = (m) => (m >= 60 ? Math.floor(m / 60) + "h" + (m % 60 ? String(m % 60).padStart(2, "0") : "") : m + " min");
  const DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const wd = (d = new Date()) => (d.getDay() + 6) % 7;

  /* ---------------- categorias de erro ---------------- */
  const CATS = [
    ["nsabia", "Não sabia o conteúdo", "Conteúdo"],
    ["esqueci", "Esqueci o conteúdo", "Conteúdo"],
    ["confundi", "Confundi conceitos", "Conceitos"],
    ["interp", "Errei interpretação", "Interpretação"],
    ["calc", "Errei cálculo", "Cálculo"],
    ["atencao", "Falta de atenção", "Atenção"],
    ["aplicar", "Não sabia aplicar o conteúdo", "Aplicação"],
    ["tempo", "Falta de tempo", "Tempo"],
    ["chute", "Chute", "Chute"],
  ];
  const CAT = Object.fromEntries(CATS.map((c) => [c[0], { n: c[1], g: c[2] }]));
  const GCOR = { Conteúdo: "var(--orange)", Conceitos: "var(--pink)", Interpretação: "var(--violet)", Cálculo: "var(--butter)", Atenção: "var(--sky)", Aplicação: "var(--lime)", Tempo: "var(--lilac)", Chute: "var(--hair)" };
  // peso de cada grupo para dizer "este conteúdo precisa de estudo" (erros de atenção pesam menos)
  const GPESO = { Conteúdo: 1, Conceitos: 0.9, Aplicação: 0.8, Cálculo: 0.6, Interpretação: 0.5, Atenção: 0.3, Tempo: 0.3, Chute: 0.7 };
  const INTERV = {
    Conteúdo: ["Volte à teoria antes de fazer mais questões: releia o módulo e faça os flashcards dele.", "Revisar o conteúdo"],
    Conceitos: ["Você mistura ideias parecidas. Compare os conceitos lado a lado e use os flashcards para fixar a diferença.", "Revisar com flashcards"],
    Interpretação: ["Antes de olhar as alternativas, sublinhe o comando e escreva em uma linha o que a questão pede. Treine com o módulo de interpretação de textos.", "Treinar interpretação"],
    Cálculo: ["Faça as contas no papel e confira por estimativa. Reforçar a base em Matemática Básica vai diminuir esses erros.", "Reforçar a base"],
    Aplicação: ["Você conhece a teoria, mas não reconhece quando usá-la. Estude os exemplos resolvidos e faça questões do mesmo tema.", "Praticar questões do tema"],
    Atenção: ["Releia o enunciado antes de marcar e procure palavras como NÃO, EXCETO e INCORRETA. Confira unidades e sinais.", "Fazer questões com calma"],
    Tempo: ["Treine com cronômetro: no ENEM, a média é de 3 minutos por questão. Um mini-simulado ajuda a ganhar ritmo.", "Fazer um mini-simulado"],
    Chute: ["Chutes mostram conteúdos que ainda não foram estudados. Siga a rota do GPS para cobrir essas lacunas.", "Ver minha rota"],
  };

  /* ---------------- estado ---------------- */
  function st() {
    if (!S.qlog) S.qlog = [];
    if (!S.erros) S.erros = {};
    if (!S.touch) S.touch = {};
    if (!S.gps) S.gps = {};
    const g = S.gps;
    g.hist = g.hist || {};
    g.log = g.log || {};
    g.v = g.v || 1;
    return g;
  }
  GPS.st = st;

  // registra cada resposta com data (chamado pelo app quando o aluno responde)
  W.gpsLog = function (id, ch, src) {
    st();
    const q = QMAP[id];
    if (!q) return;
    S.qlog.push({ id, t: now(), ch, ok: ch === q.k ? 1 : 0, src: src || "train" });
    if (S.qlog.length > 2500) S.qlog = S.qlog.slice(-2500);
    const tp = topicOf(q);
    if (tp) S.touch[tp] = now();
    logHoje(q.s);
    cacheReset();
  };
  W.gpsTouch = function (modId) {
    st();
    S.touch[modId] = now();
    const m = MODMAP[modId];
    if (m) logHoje(m.s);
  };
  function logHoje(s) {
    const g = st(), k = todayKey();
    const a = (g.log[k] = g.log[k] || []);
    if (!a.includes(s)) a.push(s);
    const ks = Object.keys(g.log).sort();
    while (ks.length > 30) delete g.log[ks.shift()];
  }

  /* ---------------- questão → assunto (módulo) ---------------- */
  let TOP = null, KWRE = null, TOPCOUNT = null;
  function kwre() {
    if (KWRE) return KWRE;
    KWRE = {};
    ALL_MODS.forEach((m) => {
      if (!m.kw || m.s === "Redação") return;
      try { KWRE[m.id] = new RegExp(m.kw, "gi"); } catch (e) {}
    });
    return KWRE;
  }
  function topicOf(q) {
    if (!q) return null;
    if (!TOP) TOP = {};
    if (q.id in TOP) return TOP[q.id];
    const re = kwre(), txt = (q.c || "") + " " + (q.q || "") + " " + (q.o || []).join(" ");
    let best = null, bs = 0;
    for (const m of ALL_MODS) {
      const r = re[m.id];
      if (!r || SUBJ[m.s].ea !== q.a) continue;
      r.lastIndex = 0;
      const hits = new Set((txt.match(r) || []).map((x) => x.toLowerCase())).size;
      if (!hits) continue;
      let sc = hits + (m.s === q.s ? 1.5 : 0) - (m.s === "Matemática Básica" ? 0.4 : 0);
      if (sc > bs) { bs = sc; best = m.id; }
    }
    TOP[q.id] = bs >= 1.5 ? best : null;
    return TOP[q.id];
  }
  GPS.topicOf = topicOf;
  function topCount() {
    if (TOPCOUNT || QREADY !== true) return TOPCOUNT || {};
    TOPCOUNT = {};
    Q.forEach((q) => { const t = topicOf(q); if (t) TOPCOUNT[t] = (TOPCOUNT[t] || 0) + 1; });
    return TOPCOUNT;
  }

  /* ---------------- pré-requisitos ---------------- */
  // [matéria, início do título] → bases necessárias. Resolvido por título para
  // continuar valendo mesmo se a ordem dos módulos mudar.
  const PRE_DEF = [
    ["Matemática Básica", "Frações", [["Matemática Básica", "Números inteiros"]]],
    ["Matemática Básica", "Números decimais", [["Matemática Básica", "Frações"]]],
    ["Matemática Básica", "Potências", [["Matemática Básica", "Números inteiros"]]],
    ["Matemática Básica", "Razão, proporção e regra", [["Matemática Básica", "Frações"]]],
    ["Matemática Básica", "Porcentagem do dia", [["Matemática Básica", "Números decimais"], ["Matemática Básica", "Razão, proporção e regra"]]],
    ["Matemática Básica", "Unidades de medida", [["Matemática Básica", "Números decimais"]]],
    ["Matemática Básica", "Expressões algébricas", [["Matemática Básica", "Frações"]]],
    ["Matemática Básica", "Tabelas, gráficos", [["Matemática Básica", "Números decimais"]]],
    ["Matemática", "Conjuntos, números", [["Matemática Básica", "Potências"], ["Matemática Básica", "Múltiplos"]]],
    ["Matemática", "Razão, proporção e escalas", [["Matemática Básica", "Razão, proporção e regra"]]],
    ["Matemática", "Porcentagem e juros", [["Matemática Básica", "Porcentagem do dia"]]],
    ["Matemática", "Equações, inequações", [["Matemática Básica", "Expressões algébricas"]]],
    ["Matemática", "Funções: conceitos", [["Matemática", "Equações, inequações"]]],
    ["Matemática", "Funções: os principais", [["Matemática", "Funções: conceitos"]]],
    ["Matemática", "Exponencial e logaritmo", [["Matemática", "Funções: os principais"], ["Matemática Básica", "Potências"]]],
    ["Matemática", "Sequências", [["Matemática", "Funções: os principais"]]],
    ["Matemática", "Matrizes", [["Matemática", "Equações, inequações"]]],
    ["Matemática", "Estatística", [["Matemática Básica", "Tabelas, gráficos"]]],
    ["Matemática", "Análise combinatória", [["Matemática Básica", "Frações"]]],
    ["Matemática", "Números binomiais", [["Matemática", "Análise combinatória"]]],
    ["Matemática", "Geometria plana", [["Matemática Básica", "Unidades de medida"]]],
    ["Matemática", "Triângulos", [["Matemática", "Geometria plana"]]],
    ["Matemática", "Trigonometria", [["Matemática", "Triângulos"]]],
    ["Matemática", "Geometria espacial", [["Matemática", "Geometria plana"]]],
    ["Matemática", "Geometria analítica", [["Matemática", "Funções: os principais"]]],
    ["Matemática", "Circunferência e cônicas", [["Matemática", "Geometria analítica"]]],
    ["Matemática", "Polinômios", [["Matemática", "Equações, inequações"]]],
    ["Matemática", "Números complexos", [["Matemática", "Polinômios"]]],
    ["Física", "Cinemática", [["Matemática Básica", "Unidades de medida"], ["Matemática Básica", "Expressões algébricas"]]],
    ["Física", "Dinâmica", [["Física", "Cinemática"]]],
    ["Física", "Energia e trabalho", [["Física", "Dinâmica"]]],
    ["Física", "Hidrostática", [["Física", "Dinâmica"]]],
    ["Física", "Eletricidade", [["Matemática Básica", "Expressões algébricas"]]],
    ["Física", "Ondas", [["Física", "Cinemática"]]],
    ["Química", "Substâncias, misturas", [["Química", "Matéria"]]],
    ["Química", "Atomística e tabela periódica", [["Química", "Matéria"]]],
    ["Química", "Química orgânica", [["Química", "Ligações químicas"]]],
    ["Química", "Físico-química", [["Química", "Soluções"]]],
    ["Química", "Modelos atômicos", [["Química", "Matéria"]]],
    ["Química", "Tabela periódica e propriedades", [["Química", "Modelos atômicos"]]],
    ["Química", "Ligações químicas", [["Química", "Tabela periódica e propriedades"]]],
    ["Química", "Geometria, polaridade", [["Química", "Ligações químicas"]]],
    ["Química", "Funções inorgânicas: ácidos", [["Química", "Ligações químicas"]]],
    ["Química", "Funções inorgânicas: sais", [["Química", "Funções inorgânicas: ácidos"]]],
    ["Química", "Reações químicas", [["Química", "Funções inorgânicas: sais"]]],
    ["Química", "Leis ponderais", [["Química", "Reações químicas"], ["Matemática Básica", "Razão, proporção e regra"]]],
    ["Química", "Estequiometria", [["Química", "Leis ponderais"]]],
    ["Química", "Estudo dos gases", [["Química", "Leis ponderais"]]],
    ["Química", "Soluções", [["Química", "Leis ponderais"]]],
    ["Química", "Termoquímica", [["Química", "Estequiometria"]]],
    ["Química", "Cinética", [["Química", "Reações químicas"]]],
    ["Química", "Equilíbrio químico", [["Química", "Cinética"]]],
    ["Química", "Equilíbrio iônico", [["Química", "Equilíbrio químico"], ["Química", "Funções inorgânicas: ácidos"], ["Matemática", "Exponencial e logaritmo"]]],
    ["Química", "Eletroquímica", [["Química", "Reações químicas"]]],
    ["Química", "Radioatividade", [["Química", "Modelos atômicos"]]],
    ["Química", "Cadeias carbônicas", [["Química", "Ligações químicas"]]],
    ["Química", "Funções orgânicas", [["Química", "Cadeias carbônicas"]]],
    ["Química", "Isomeria", [["Química", "Funções orgânicas"]]],
    ["Química", "Reações orgânicas", [["Química", "Funções orgânicas"]]],
    ["Química", "Polímeros", [["Química", "Reações orgânicas"]]],
    ["Biologia", "Citologia", [["Biologia", "Bioquímica"]]],
    ["Biologia", "Metabolismo", [["Biologia", "Citologia"]]],
    ["Biologia", "DNA, RNA", [["Biologia", "Citologia"]]],
    ["Biologia", "Histologia", [["Biologia", "Citologia"]]],
    ["Biologia", "Fisiologia humana I:", [["Biologia", "Histologia"]]],
    ["Biologia", "Fisiologia humana II", [["Biologia", "Fisiologia humana I:"]]],
    ["Biologia", "Genética I:", [["Biologia", "DNA, RNA"]]],
    ["Biologia", "Genética II", [["Biologia", "Genética I:"]]],
    ["Biologia", "Biotecnologia", [["Biologia", "DNA, RNA"]]],
    ["Biologia", "Genética de populações", [["Biologia", "Genética I:"], ["Biologia", "Evolução"]]],
    ["Biologia", "Botânica: anatomia", [["Biologia", "Botânica: os grupos"]]],
    ["Biologia", "Ecologia", [["Biologia", "Metabolismo"]]],
    ["Biologia", "Biomas, populações", [["Biologia", "Ecologia"]]],
    ["História", "Brasil Império", [["História", "Brasil Colônia"]]],
    ["História", "Primeira República", [["História", "Brasil Império"]]],
    ["História", "Era Vargas", [["História", "Primeira República"]]],
    ["História", "Ditadura civil", [["História", "Era Vargas"]]],
    ["História", "Redemocratização", [["História", "Ditadura civil"]]],
    ["Redação", "Competência", [["Redação", "As 5 competências"]]],
    ["Redação", "C1 na prática", [["Redação", "Competência 1"]]],
    ["Redação", "C2 na prática", [["Redação", "Competência 2"]]],
    ["Redação", "C3 na prática", [["Redação", "Competência 3"]]],
    ["Redação", "C4 na prática", [["Redação", "Competência 4"]]],
    ["Redação", "C5 na prática", [["Redação", "Competência 5"]]],
  ];
  let PRE = null, POS = null;
  function pre() {
    if (PRE) return PRE;
    PRE = {}; POS = {};
    const find = (s, p) => (MOD[s] || []).findIndex((m) => m.t.startsWith(p));
    PRE_DEF.forEach(([s, p, bases]) => {
      (MOD[s] || []).forEach((m, i) => {
        if (!m.t.startsWith(p)) return;
        const id = s + "#" + i;
        bases.forEach(([bs, bp]) => {
          const j = find(bs, bp);
          if (j < 0) return;
          const bid = bs + "#" + j;
          if (bid === id) return;
          (PRE[id] = PRE[id] || []).push(bid);
          (POS[bid] = POS[bid] || []).push(id);
        });
      });
    });
    return PRE;
  }
  GPS.prereq = (id) => (pre()[id] || []);
  GPS.dependentes = (id) => (pre(), POS[id] || []);

  /* ---------------- retrato do aluno ---------------- */
  let CACHE = null;
  function cacheReset() { CACHE = null; }
  GPS.reset = cacheReset;

  function pesoCurso() {
    const curso = st().cfg?.curso || ACC?.perfil?.curso_foco || "";
    const p = Object.fromEntries(pesosDoCurso(curso));
    p["Matemática Básica"] = p["Matemática"] || 3;
    p["Redação"] = 4;
    return (s) => (p[s] || 1) / 5;
  }

  // Últimas respostas por questão (qlog com data; respostas antigas sem data entram com t=0)
  function respostas() {
    const last = {};
    for (const r of S.qlog || []) last[r.id] = r;
    for (const id of Object.keys(S.ans || {})) {
      const q = QMAP[id];
      if (!q) continue;
      if (!last[id]) last[id] = { id, t: 0, ch: S.ans[id], ok: S.ans[id] === q.k ? 1 : 0, src: "train" };
    }
    return last;
  }

  function retrato() {
    if (CACHE && CACHE.at > now() - 1500) return CACHE;
    const g = st();
    const last = respostas();
    const tp = {}; // por módulo
    const sub = {}; // por matéria
    const t14 = now() - 14 * DAY, t21 = now() - 21 * DAY;
    const errosAtivos = [];
    // histórico de erros por assunto (todas as vezes que errou, não só a última)
    const errHist = {};
    for (const r of S.qlog || []) {
      if (r.ok) continue;
      const q = QMAP[r.id]; if (!q) continue;
      const t = topicOf(q); if (!t) continue;
      (errHist[t] = errHist[t] || []).push(r);
    }
    for (const r of Object.values(last)) {
      const q = QMAP[r.id];
      if (!q) continue;
      const t = topicOf(q);
      const ss = (sub[q.s] = sub[q.s] || { n: 0, ok: 0 });
      ss.n++; ss.ok += r.ok;
      if (!r.ok) errosAtivos.push({ q, r, topic: t });
      if (!t) continue;
      const o = (tp[t] = tp[t] || { n: 0, ok: 0, err14: 0, errW: 0, lastT: 0 });
      o.n++; o.ok += r.ok; o.lastT = Math.max(o.lastT, r.t);
      if (!r.ok) {
        const e = S.erros[r.id];
        const peso = e && e.cat ? GPESO[CAT[e.cat].g] : 0.7;
        if (r.t >= t14) o.err14++;
        if ((r.t >= t21 || r.t === 0) && !(e && e.rev)) o.errW += peso;
      }
    }
    Object.keys(errHist).forEach((t) => {
      const o = (tp[t] = tp[t] || { n: 0, ok: 0, err14: 0, errW: 0, lastT: 0 });
      o.err14 = Math.max(o.err14, errHist[t].filter((r) => r.t >= t14).length);
    });
    const fc = fcStore().r || {};
    const fcMod = {};
    for (const [k, v] of Object.entries(fc)) {
      const id = k.split("|")[0];
      if (!MODMAP[id]) continue;
      const o = (fcMod[id] = fcMod[id] || { n: 0, b: 0 });
      o.n++; o.b += Math.min(6, v.b || 0) / 6;
    }
    // gargalo (grupos de categoria)
    const grupos = {}, porMat = {};
    let classif = 0;
    errosAtivos.forEach(({ q, r }) => {
      const e = S.erros[r.id];
      if (!e || !e.cat) return;
      classif++;
      const gname = CAT[e.cat].g;
      grupos[gname] = (grupos[gname] || 0) + 1;
      const pm = (porMat[q.s] = porMat[q.s] || {});
      pm[gname] = (pm[gname] || 0) + 1;
    });
    const gargalo = Object.entries(grupos).sort((a, b) => b[1] - a[1])[0] || null;
    const cw = pesoCurso();
    const counts = topCount();
    const maxBy = {};
    Object.entries(counts).forEach(([id, c]) => { const s = id.split("#")[0]; maxBy[s] = Math.max(maxBy[s] || 1, c); });
    const cfg = g.cfg || {};
    const dias = cfg.data ? daysUntil(cfg.data) : null;
    const urg = dias === null ? 0.3 : clamp(1 - dias / 180);
    const calcShare = classif ? (grupos["Cálculo"] || 0) / classif : 0;
    const interpShare = classif ? (grupos["Interpretação"] || 0) / classif : 0;

    // domínio de cada módulo
    const dom = {};
    for (const m of ALL_MODS) {
      const total = MOD[m.s][m.i].s.length;
      const readN = Object.keys(S.read[m.id] || {}).length;
      const readF = clamp(readN / total);
      const done = S.modDone[m.id] ? 1 : 0;
      const f = fcMod[m.id];
      const fcF = f ? f.b / Math.max(4, f.n) : 0;
      const E = clamp(0.08 + 0.5 * readF + 0.15 * done + 0.17 * fcF, 0, 0.9);
      const o = tp[m.id] || { n: 0, ok: 0, err14: 0, errW: 0, lastT: 0 };
      let mastery = E;
      if (o.n) {
        const D = (o.ok + 1) / (o.n + 2);
        const w = o.n / (o.n + 3);
        mastery = (1 - w) * E + w * D;
      }
      const lastT = Math.max(S.touch[m.id] || 0, o.lastT || 0);
      const diasSem = lastT ? (now() - lastT) / DAY : null;
      if (diasSem !== null && mastery > 0.5 && diasSem > 21) mastery -= Math.min(0.15, (diasSem - 21) / 200);
      mastery -= Math.min(0.2, 0.05 * o.err14);
      mastery = clamp(mastery, 0.02, 0.98);
      const estudado = readN > 0 || o.n > 0;
      const intervalo = 4 + 20 * mastery;
      const atraso = estudado && diasSem !== null && mastery >= 0.4 ? diasSem - intervalo : -1;
      let imp = 0.5 + 0.5 * (counts[m.id] ? Math.log(1 + counts[m.id]) / Math.log(1 + (maxBy[m.s] || 1)) : 0);
      if (m.s === "Redação") imp = 0.75;
      if (m.s === "Matemática Básica") imp = 0.35 + 0.4 * calcShare;
      if (m.id === "Linguagens#0") imp = Math.max(imp, 0.6 + 0.5 * interpShare);
      dom[m.id] = { m, mastery, readF, readN, total, done, n: o.n, ok: o.ok, err14: o.err14, errW: o.errW, diasSem, atraso, imp, qc: counts[m.id] || 0, estudado };
    }
    // nível por matéria e geral
    const nivelMat = {};
    SUBJECT_KEYS.forEach((s) => {
      const ms = ALL_MODS.filter((m) => m.s === s);
      if (!ms.length) return;
      let a = 0, w = 0;
      ms.forEach((m) => { const d = dom[m.id]; a += d.mastery * d.imp; w += d.imp; });
      let lv = a / w;
      const ss = sub[s];
      if (ss && ss.n >= 3) lv = 0.5 * lv + 0.5 * ((ss.ok + 1) / (ss.n + 2));
      if (s === "Redação" && S.essays?.length) lv = 0.4 * lv + 0.6 * clamp(Math.max(...S.essays.map((e) => e.total || 0)) / 1000);
      nivelMat[s] = lv;
    });
    let a = 0, w = 0;
    SUBJECT_KEYS.filter((s) => s !== "Matemática Básica").forEach((s) => { a += (nivelMat[s] || 0) * cw(s); w += cw(s); });
    const nivel = w ? a / w : 0;
    const nResp = Object.keys(last).length;
    CACHE = { at: now(), last, tp, sub, dom, nivel, nivelMat, errosAtivos, grupos, porMat, classif, gargalo, cw, cfg, dias, urg, calcShare, interpShare, nResp, errHist };
    return CACHE;
  }
  GPS.retrato = retrato;

  /* ---------------- motor de prioridade (substituível por IA) ---------------- */
  GPS.motor = function motorPadrao(ctx, id) {
    const d = ctx.dom[id], m = d.m, cfg = ctx.cfg;
    const need = 1 - d.mastery;
    const err = clamp(d.errW / 3);
    const rev = d.atraso > 0 ? clamp(0.5 + d.atraso / 14) : 0;
    const cw = ctx.cw(m.s);
    const prior = (cfg.prior || []).includes(m.s) ? 1 : 0;
    const cont = d.readF > 0 && d.readF < 1 ? 1 : 0;
    const u = ctx.urg;
    const recentes = Object.entries(st().log).filter(([k]) => k >= dkey(new Date(now() - 3 * DAY)) && k < todayKey()).flatMap(([, v]) => v);
    const variedade = recentes.filter((s) => s === m.s).length;
    const partes = {
      necessidade: need * 0.33,
      importancia: d.imp * (0.12 + 0.1 * u),
      erros: err * 0.27,
      curso: cw * 0.14,
      prioridade: prior * 0.1,
      revisao: rev * (0.14 + 0.1 * u),
      continuidade: cont * 0.06,
    };
    let score = Object.values(partes).reduce((a, b) => a + b, 0) * 100 - variedade * 3;
    if (d.done && d.mastery > 0.75 && !rev) score *= 0.4; // concluído e dominado: sai da frente
    return { score, partes };
  };

  function motivos(ctx, id, extra) {
    const d = ctx.dom[id], m = d.m, out = [];
    const errs = ctx.errHist[id] || [];
    const e14 = errs.filter((r) => r.t >= now() - 14 * DAY).length;
    if (extra?.base) {
      const raiz = extra.raiz && extra.raiz !== extra.base ? MODMAP[extra.raiz] : null;
      const er = raiz ? (ctx.errHist[raiz.id] || []).length : (ctx.errHist[extra.base] || []).length;
      const alvo = raiz || MODMAP[extra.base];
      out.push(er ? `Você errou ${er === 1 ? "1 questão" : er + " questões"} de ${alvo.t}, e este conteúdo é a base que falta para ela.` : `É base para ${MODMAP[extra.base].t}: sem ela, o próximo conteúdo fica bem mais difícil.`);
    }
    if (e14 >= 3) out.push(`Você errou ${e14} questões deste conteúdo nas últimas duas semanas.`);
    else if (d.errW > 0.3 && errs.length) {
      const cats = errs.map((r) => S.erros[r.id]?.cat).filter(Boolean);
      const top = cats.length ? CAT[cats.sort((a, b) => cats.filter((x) => x === b).length - cats.filter((x) => x === a).length)[0]].g.toLowerCase() : null;
      const n = errs.length, diag = errs.every((r) => r.src === "diag");
      out.push(`Você errou ${n === 1 ? "1 questão" : n + " questões"} deste conteúdo${diag ? " no diagnóstico" : ""}${top ? ", principalmente por " + top : ""}.`);
    }
    if (d.atraso > 0) out.push(`Sua última revisão foi há ${Math.round(d.diasSem)} dias. Revisar agora evita esquecer.`);
    if (d.readF > 0 && d.readF < 1) out.push(`Você parou na seção ${d.readN + 1} de ${d.total}.`);
    if (!d.estudado && !extra?.base) out.push("Você ainda não estudou este conteúdo.");
    if (d.qc >= 8) out.push(`É um dos temas que mais aparecem no ENEM (${d.qc} questões no nosso banco).`);
    if ((ctx.cfg.prior || []).includes(m.s)) out.push(`Você marcou ${m.s} como prioridade.`);
    if (ctx.cw(m.s) >= 0.8 && ctx.cfg.curso) out.push(`${m.s} pesa muito para ${ctx.cfg.curso}.`);
    if (m.s === "Matemática Básica" && ctx.calcShare >= 0.25) out.push(`${pct(ctx.calcShare)}% dos seus erros classificados são de cálculo.`);
    if (m.id === "Linguagens#0" && ctx.interpShare >= 0.25) out.push(`${pct(ctx.interpShare)}% dos seus erros classificados são de interpretação.`);
    return out.length ? out : ["Faz parte do conteúdo cobrado na sua prova."];
  }

  // Ranking com pré-requisitos: se um conteúdo tem base fraca, a base sobe na rota.
  function ranking(ctx) {
    pre();
    const r = {};
    for (const m of ALL_MODS) {
      const { score, partes } = GPS.motor(ctx, m.id);
      r[m.id] = { id: m.id, score, partes, base: null, bloqueado: [] };
    }
    const fracas = (id) => (PRE[id] || []).filter((b) => ctx.dom[b].mastery < 0.45 && !(ctx.dom[b].done && ctx.dom[b].mastery >= 0.4));
    // percorre dos conteúdos mais urgentes para os menos urgentes; a urgência desce pela cadeia de bases
    const ordem = ALL_MODS.map((m) => m.id).sort((a, b) => r[b].score - r[a].score);
    const bloq = [];
    for (const id of ordem) {
      const x = r[id], d = ctx.dom[id];
      if (d.mastery >= 0.6) continue;
      const fr = fracas(id);
      if (!fr.length) continue;
      const raiz = x.raiz || id;
      const prop = (bid, sc, alvo, prof) => {
        const b = r[bid];
        if (sc * 0.95 > b.score) { b.score = sc * 0.95; b.base = alvo; b.raiz = raiz; }
        if (prof < 5) fracas(bid).forEach((bb) => prop(bb, sc * 0.95, bid, prof + 1));
      };
      fr.forEach((bid) => prop(bid, x.score, id, 1));
      x.bloqueado = fr;
      bloq.push(x);
    }
    bloq.forEach((x) => (x.score *= 0.6));
    return Object.values(r).sort((a, b) => b.score - a.score);
  }
  GPS.ranking = (ctx) => ranking(ctx || retrato());

  const priLabel = (sc, tipo) => tipo === "revisar" ? ["Revisão", "var(--sky)"] : sc >= 72 ? ["Prioridade alta", "var(--orange)"] : sc >= 50 ? ["Prioridade média", "var(--butter)"] : ["Prioridade baixa", "var(--mint)"];

  /* ---------------- plano do dia ---------------- */
  function minHoje() {
    const g = st();
    if (g.hoje && g.hoje.d === todayKey()) return g.hoje.min;
    const mins = g.cfg?.min || [];
    return +mins[wd()] || 0;
  }
  GPS.minHoje = minHoje;

  function montarPlano(ctx, min) {
    const tasks = [];
    let left = min;
    const add = (t) => { tasks.push(t); left -= t.min; };
    const g = st();
    const rk = ranking(ctx);
    // 1. diagnóstico, se ainda não há dados
    if (!g.diag?.done && ctx.nResp < 12 && left >= 20) add({ k: "diag", tipo: "diag", t: "Diagnóstico inicial", s: "Diagnóstico", min: Math.min(30, left), pri: 99, why: ["O GPS precisa saber de onde você parte para calcular a rota."] });
    const porMat = {};
    // 2. revisões atrasadas entram sempre (antes que o conteúdo seja esquecido)
    const atrasadas = ALL_MODS.map((m) => ctx.dom[m.id]).filter((d) => d.atraso > 0 && d.estudado && d.m.s !== "Redação").sort((a, b) => b.atraso * b.imp - a.atraso * a.imp);
    atrasadas.slice(0, min <= 60 ? 1 : 2).forEach((d) => {
      if (left < 15) return;
      const sc = GPS.motor(ctx, d.m.id).score;
      porMat[d.m.s] = (porMat[d.m.s] || 0) + 1;
      add({ k: "revisar:" + d.m.id, tipo: "revisar", mod: d.m.id, s: d.m.s, t: d.m.t, min: Math.min(20, left), pri: Math.round(sc), pl: "Revisão", why: motivos(ctx, d.m.id) });
    });
    // 3. conteúdos
    const maxPorMat = min >= 180 ? 2 : 1;
    const maxMods = min <= 60 ? 2 : min <= 120 ? 3 : min <= 180 ? 4 : 5;
    let nMods = 0;
    const durTipo = { estudar: 35, revisar: 20, praticar: 25 };
    const reservas = (ctx.errosAtivos.filter((e) => !S.erros[e.r.id]?.cat).length >= 2 ? 15 : 0) + (left >= 120 ? 15 : 0);
    for (const x of rk) {
      if (left - reservas < 15 && tasks.some((t) => t.mod)) break;
      const d = ctx.dom[x.id], m = d.m;
      if (m.s === "Redação") continue;
      if (nMods >= maxMods) break;
      if (x.bloqueado.length) continue; // sem base: a base entra no lugar
      if (tasks.some((t) => t.mod === x.id)) continue;
      if ((porMat[m.s] || 0) >= maxPorMat) continue;
      if (x.score < 18) break;
      const tipo = d.atraso > 0 && d.readF >= 1 ? "revisar" : d.readF < 1 ? "estudar" : "praticar";
      let dur = durTipo[tipo];
      if (x.base) dur = 30;
      dur = Math.min(dur, Math.max(15, left - reservas));
      porMat[m.s] = (porMat[m.s] || 0) + 1;
      nMods++;
      const [pl] = priLabel(x.score, tipo);
      add({ k: tipo + ":" + m.id, tipo, mod: m.id, s: m.s, t: m.t, min: dur, pri: Math.round(x.score), pl, why: motivos(ctx, m.id, { base: x.base, raiz: x.raiz }) });
    }
    // 3. laboratório de erros
    const semAnalise = ctx.errosAtivos.filter((e) => !S.erros[e.r.id]?.cat).length;
    if (semAnalise >= 2 && left >= 10) add({ k: "lab", tipo: "lab", t: `Analisar ${semAnalise} erro${semAnalise > 1 ? "s" : ""}`, s: "Laboratório de Erros", min: Math.min(20, 6 + semAnalise * 2, left), pri: 40, why: ["Entender por que você errou é o que faz o GPS acertar a rota."] });
    // 4. flashcards vencidos
    let due = 0;
    try { due = fcAll().filter(fcDue).length; } catch (e) {}
    if (due >= 5 && left >= 10) add({ k: "flash", tipo: "flash", t: `Revisar ${due} flashcards`, s: "Flashcards", min: Math.min(20, 5 + Math.ceil(due / 3), left), pri: 35, why: ["Essas cartas venceram hoje. Revisar na hora certa fixa a memória."] });
    // 5. redação (toda prova cobra)
    const ultima = Math.max(0, ...(S.essays || []).map((e) => e.date || 0));
    const diasRed = ultima ? (now() - ultima) / DAY : 99;
    if (left >= 45 && diasRed >= 6) {
      const nextRed = ALL_MODS.find((m) => m.s === "Redação" && !S.modDone[m.id] && ctx.dom[m.id].readF < 1);
      if (nextRed && !(S.essays || []).length && ctx.dom[nextRed.id].readF < 1 && (MOD["Redação"] || []).filter((x, i) => S.modDone["Redação#" + i]).length < 2)
        add({ k: "estudar:" + nextRed.id, tipo: "estudar", mod: nextRed.id, s: "Redação", t: nextRed.t, min: 30, pri: 55, pl: "Prioridade média", why: ["Antes da primeira redação, entenda como ela é corrigida."] });
      else add({ k: "redacao", tipo: "redacao", t: "Escrever e corrigir uma redação", s: "Redação", min: Math.min(50, left), pri: 45, why: [ultima ? `Sua última redação foi há ${Math.round(diasRed)} dias. O ideal é escrever uma por semana.` : "Você ainda não escreveu nenhuma redação aqui. Ela vale muito em todas as provas."] });
    }
    // 6. tempo extra: atividades diferentes, sem repetir tarefas
    if (left >= 25) {
      const fracos = Object.entries(ctx.nivelMat).filter(([s]) => s !== "Redação" && s !== "Matemática Básica").sort((a, b) => a[1] * ctx.cw(a[0]) - b[1] * ctx.cw(b[0]));
      const alvo = fracos.find(([s]) => !tasks.some((t) => t.tipo === "questoes" && t.s === s));
      if (alvo) add({ k: "questoes:" + alvo[0], tipo: "questoes", s: alvo[0], t: `Bloco de questões de ${alvo[0]}`, min: Math.min(30, left), pri: 30, why: [`${alvo[0]} é a matéria com mais espaço para crescer, considerando o peso no seu curso.`] });
    }
    if (left >= 40 && (ctx.dias === null || ctx.dias <= 120)) add({ k: "sim", tipo: "sim", s: "Simulado", t: "Mini-simulado contra o relógio", min: Math.min(45, left), pri: 25, why: ["Com a prova chegando, treinar ritmo e resistência conta tanto quanto o conteúdo."] });
    return tasks;
  }

  function plano(forcar) {
    const g = st(), min = minHoje(), d = todayKey();
    const p = g.plano;
    if (!forcar && p && p.d === d && p.min === min && p.v === g.v) {
      autoFeito(p);
      return p;
    }
    const ctx = retrato();
    const manter = p && p.d === d ? p.tasks.filter((t) => p.feito?.[t.k]) : [];
    const novas = min ? montarPlano(ctx, Math.max(0, min - manter.reduce((a, t) => a + t.min, 0))).filter((t) => !manter.some((x) => x.k === t.k)) : [];
    g.plano = { d, min, v: g.v, tasks: [...manter, ...novas], feito: p && p.d === d ? p.feito || {} : {}, ini: p && p.d === d ? p.ini || {} : {} };
    save();
    return g.plano;
  }
  GPS.plano = plano;
  function autoFeito(p) {
    let mud = false;
    p.tasks.forEach((t) => {
      if (p.feito[t.k]) return;
      let ok = false;
      if (t.tipo === "estudar" && t.mod && (S.modDone[t.mod] || Object.keys(S.read[t.mod] || {}).length >= MOD[MODMAP[t.mod].s][MODMAP[t.mod].i].s.length) && p.ini[t.k]) ok = true;
      if (t.tipo === "diag" && st().diag?.done) ok = true;
      if (t.tipo === "lab" && p.ini[t.k] && !retrato().errosAtivos.some((e) => !S.erros[e.r.id]?.cat)) ok = true;
      if (ok) { p.feito[t.k] = 1; mud = true; }
    });
    if (mud) save();
  }

  /* ---------------- diagnóstico ---------------- */
  function iniciarDiag() {
    const g = st(), ctx = retrato();
    const cw = ctx.cw;
    const curtas = Q.filter((q) => ((q.c || "").length + (q.q || "").length) < 1100 && S.ans[q.id] === undefined && topicOf(q));
    const pega = (f, n) => shuffle(curtas.filter(f)).slice(0, n);
    const nat = Math.round(3 + 3 * Math.max(cw("Biologia"), cw("Química"), cw("Física")));
    const mat = Math.round(3 + 3 * cw("Matemática"));
    const ids = [
      ...pega((q) => q.a === "matematica", mat),
      ...pega((q) => q.a === "ciencias-natureza", nat),
      ...pega((q) => q.a === "linguagens" && q.s !== "Inglês", 4),
      ...pega((q) => q.a === "ciencias-humanas", 4),
    ].map((q) => q.id);
    g.diag = { ids: shuffle(ids), ans: {}, cur: 0, done: false, t: now() };
    save();
  }
  function fecharDiag() {
    const g = st(), dg = g.diag;
    dg.done = true;
    Object.entries(dg.ans).forEach(([id, i]) => {
      if (S.ans[id] === undefined) S.ans[id] = i;
      gpsLog(id, i, "diag");
    });
    addXP(40, "q", Object.keys(dg.ans).length);
    g.v++;
    cacheReset();
    save();
  }

  /* ---------------- helpers de interface ---------------- */
  const corS = (s) => subjColor(s) || "var(--hair)";
  const sev = (n) => (n >= 5 ? ["🔴", "var(--bad)", "Crítico"] : n >= 3 ? ["🟠", "var(--orange)", "Atenção"] : ["🟡", "var(--butter)", "Em observação"]);
  const barra = (v, cor) => `<div class="bar"><i style="width:${clamp(v) * 100}%;background:${cor || "var(--ink)"}"></i></div>`;
  const destinoTxt = (t) => (t.mod ? `${t.s} → ${t.t}` : t.t);

  let ui = { setup: false, matOpen: null, labOpen: null, labMore: false, comoFunciona: false };

  /* =================== VIEW: GPS DE ESTUDOS =================== */
  W.vGPS = function () {
    const g = st();
    if (!g.cfg || ui.setup) return setupHTML();
    if (g.diag && !g.diag.done && g.diag.ids?.length) return diagHTML();
    if (QREADY !== true) return `<h1 class="h-sec">GPS de Estudos</h1><div class="empty" style="margin-top:16px">Carregando seus dados…</div>`;
    const ctx = retrato();
    g.hist[todayKey()] = pct(ctx.nivel);
    const p = plano();
    const rk = ranking(ctx);
    const prox = p.tasks.find((t) => t.mod && !p.feito[t.k]) || p.tasks.find((t) => !p.feito[t.k]) || null;
    const destino = prox || (rk[0] ? { mod: rk[0].id, s: MODMAP[rk[0].id].s, t: MODMAP[rk[0].id].t, why: motivos(ctx, rk[0].id, { base: rk[0].base, raiz: rk[0].raiz }) } : null);
    const dias = ctx.dias;
    const ks = Object.keys(g.hist).sort();
    const semana = ks.filter((k) => k <= dkey(new Date(now() - 7 * DAY))).pop();
    const delta = semana ? g.hist[todayKey()] - g.hist[semana] : null;
    const poucos = ctx.nResp < 20;
    const totalMin = p.tasks.reduce((a, t) => a + t.min, 0);
    const feitos = p.tasks.filter((t) => p.feito[t.k]).length;

    // rota: próximos destinos depois de hoje
    const hojeMods = new Set(p.tasks.map((t) => t.mod).filter(Boolean));
    const depois = rk.filter((x) => !hojeMods.has(x.id) && MODMAP[x.id].s !== "Redação").slice(0, 5);

    return `
    <div class="gps-hero">
      ${STAR("var(--lime)", 46, "right:20px", "top:18px", 10)}
      <div class="eyebrow-l">GPS de Estudos${poucos ? ' · <span class="gtag">rota inicial, com poucos dados</span>' : ""}</div>
      <div class="gps-route">
        <div class="gstop here"><span class="gpin">●</span><div class="glab">Você está aqui</div><div class="gbig num">${pct(ctx.nivel)}%</div><div class="gsub">nível estimado${delta !== null ? ` · <b>${delta >= 0 ? "+" : ""}${delta}</b> em 7 dias` : ""}</div></div>
        <div class="gline"></div>
        <div class="gstop next"><span class="gpin">▲</span><div class="glab">Próximo destino</div><div class="gmid">${destino ? esc(destinoTxt(destino)) : "Tudo em dia"}</div>
          ${destino?.mod || destino?.tipo ? `<button class="btn lime sm" data-gx="start" data-k="${esc(destino.k || "estudar:" + destino.mod)}" ${destino.k ? "" : `data-mod2="${esc(destino.mod)}"`}>Começar</button>` : ""}</div>
        <div class="gline"></div>
        <div class="gstop goal"><span class="gpin">★</span><div class="glab">Seu objetivo</div><div class="gmid">${esc(g.cfg.curso || "Seu curso")} — ${esc(g.cfg.vest || "Vestibular")}</div><div class="gsub num">${dias === null ? "defina a data da prova" : dias < 0 ? "a prova já passou: atualize a data" : dias === 0 ? "a prova é hoje!" : dias + " dias até a prova"}</div></div>
      </div>
      ${destino ? `<div class="gwhy"><b>Por quê?</b> ${esc(destino.why[0])}${destino.why[1] ? " " + esc(destino.why[1]) : ""}</div>` : ""}
    </div>

    ${!g.diag?.done && ctx.nResp < 12 ? `<div class="card gdiag"><div><h3>Comece pelo diagnóstico</h3><p class="small muted" style="margin:4px 0 0">Cerca de 20 questões reais de ENEM, FUVEST e Unicamp, sem gabarito na hora. O GPS usa o resultado para saber de onde você parte.</p></div>
      <div class="gbtns"><button class="btn" data-gx="diag">Fazer diagnóstico</button><button class="btn ghost sm" data-gx="skipdiag">Pular por agora</button></div></div>` : ""}

    <div class="row-head"><h2 class="h-sec">O que estudar hoje?</h2>
      <div class="pills">${[0, 60, 120, 150, 180, 240].map((m) => `<button class="pill ${p.min === m ? "on" : ""}" data-gx="hoje" data-min="${m}">${m ? fmtMin(m) : "Folga"}</button>`).join("")}</div></div>
    <div class="card gtoday">
      <div class="gtoday-h"><div><span class="h-big gtime">Hoje — ${p.min ? fmtMin(p.min) : "folga"}</span><div class="small muted">${DIAS[wd()]} · ${p.tasks.length ? `${feitos}/${p.tasks.length} atividades feitas · ${fmtMin(totalMin)} planejados` : ""}</div></div>
        <button class="btn ghost sm" data-gx="recalc">Recalcular rota</button></div>
      ${!p.min ? `<div class="empty">Hoje é dia de descanso no seu plano. Descansar também faz parte da rota.<br><br><button class="btn sm" data-gx="hoje" data-min="60">Quero estudar 1h mesmo assim</button></div>`
      : !p.tasks.length ? `<div class="empty">Nada pendente para hoje. Você está em dia com a rota!</div>`
      : `<ol class="gtasks">${p.tasks.map((t, i) => {
          const fe = !!p.feito[t.k];
          const [pl, pc] = t.pl ? priLabel(t.pri, t.tipo) : t.tipo === "diag" ? ["Primeiro passo", "var(--lime)"] : ["", ""];
          return `<li class="${fe ? "feito" : ""}">
            <span class="gn">${fe ? "✓" : i + 1}</span>
            <div class="gt"><div class="gtt"><span class="gdot" style="background:${corS(t.s)}"></span><b>${esc(t.s)}</b>${t.mod ? " — " + esc(t.t) : " · " + esc(t.t)}</div>
              <div class="gmeta"><span class="num">${fmtMin(t.min)}</span>${pl ? `<span class="gpri" style="background:${pc}">${pl}</span>` : ""}<span class="small muted">${esc(t.why[0] || "")}</span></div></div>
            <div class="ga">${fe ? `<button class="btn ghost sm" data-gx="undo" data-k="${esc(t.k)}">Desfazer</button>` : `<button class="btn sm" data-gx="start" data-k="${esc(t.k)}">Começar</button><button class="btn ghost sm" data-gx="done" data-k="${esc(t.k)}" title="Marcar como feito">Concluí</button>`}</div>
          </li>`;
        }).join("")}</ol>`}
    </div>

    <div class="grid gtwo">
      <div class="card">
        <div class="row-head" style="margin:0 0 8px"><h2 class="h-sec" style="font-size:19px">Sua rota depois de hoje</h2></div>
        ${depois.length ? `<ol class="groute">${depois.map((x) => {
          const d = ctx.dom[x.id];
          return `<li><span class="gdot" style="background:${corS(d.m.s)}"></span><div><b>${esc(d.m.s)} → ${esc(d.m.t)}</b>
            <div class="small muted">${x.base ? "Base para " + esc(MODMAP[x.base].t) : x.bloqueado.length ? "Depois de reforçar " + esc(MODMAP[x.bloqueado[0]].t) : esc(motivos(ctx, x.id)[0])}</div></div></li>`;
        }).join("")}</ol>` : `<div class="empty">A rota aparece assim que o GPS tiver dados.</div>`}
      </div>
      <div class="card">
        <div class="row-head" style="margin:0 0 8px"><h2 class="h-sec" style="font-size:19px">Mapa de domínio</h2><span class="small muted">toque numa matéria</span></div>
        ${SUBJECT_KEYS.map((s) => {
          const lv = ctx.nivelMat[s] || 0;
          return `<button class="gsubj ${ui.matOpen === s ? "on" : ""}" data-gx="mat" data-s="${esc(s)}"><span class="gdot" style="background:${corS(s)}"></span><span class="gsn">${esc(s)}</span><span class="gsb">${barra(lv, lv < 0.4 ? "var(--orange)" : lv < 0.65 ? "var(--violet)" : "var(--ok)")}</span><b class="num">${pct(lv)}%</b></button>
            ${ui.matOpen === s ? modList(ctx, s) : ""}`;
        }).join("")}
      </div>
    </div>

    <div class="card" style="margin-top:14px">
      <button class="glink" data-gx="como">${ui.comoFunciona ? "▾" : "▸"} Como o GPS decide a sua rota</button>
      ${ui.comoFunciona ? `<div class="small" style="margin-top:8px;max-width:75ch">
        <p>Para cada conteúdo, o GPS calcula uma pontuação com: o quanto você ainda não domina (leitura, flashcards e acertos nas questões), os erros recentes e o motivo deles (vindos do Laboratório de Erros), a importância do tema na prova (quantas vezes aparece no ENEM), o peso da matéria no seu curso, as matérias que você marcou como prioridade, o tempo desde a última revisão e a proximidade da prova.</p>
        <p>Se um conteúdo depende de outro que você ainda não domina (por exemplo, Funções depende de Equações), a base passa na frente. O plano do dia respeita o seu tempo: com pouco tempo ele foca no essencial; com mais tempo, acrescenta atividades diferentes (questões, simulado, redação) em vez de repetir tarefas.</p>
        <p class="muted">Seu nível é uma estimativa e fica mais preciso a cada questão respondida.</p></div>` : ""}
      <div class="gfoot"><span class="small muted">Objetivo: ${esc(g.cfg.vest)} · ${esc(g.cfg.curso)} · ${g.cfg.data ? new Date(g.cfg.data + "T12:00").toLocaleDateString("pt-BR") : "sem data"} · ${g.cfg.min.filter((x) => +x > 0).length} dias por semana</span>
        <button class="btn ghost sm" data-gx="setup">Ajustar objetivo</button></div>
    </div>`;
  };

  function modList(ctx, s) {
    const ms = ALL_MODS.filter((m) => m.s === s);
    return `<div class="gmods">${ms.map((m) => {
      const d = ctx.dom[m.id];
      const fr = (PRE[m.id] || []).filter((b) => ctx.dom[b].mastery < 0.45);
      const e = ctx.errHist[m.id]?.filter((r) => r.t >= now() - 14 * DAY).length || 0;
      const estado = d.errW >= 1.5 || e >= 3 ? ["Crítico", "var(--bad)", "🔴"]
        : d.atraso > 0 ? [`Revisão atrasada (${Math.round(d.atraso)} d)`, "var(--orange)", "⏰"]
        : d.done && d.mastery >= 0.6 ? ["Concluído", "var(--ok)", "✓"]
        : fr.length && !d.estudado ? ["Falta base: " + MODMAP[fr[0]].t, "var(--muted)", "🔒"]
        : d.estudado ? ["Em andamento", "var(--violet)", "◐"] : ["Novo", "var(--muted)", "○"];
      return `<button class="gmod" data-mod="${m.id}"><span class="gic" style="color:${estado[1]}">${estado[2]}</span><span class="gmt">${esc(m.t)}<small style="color:${estado[1]}">${esc(estado[0])}</small></span><span class="num small">${pct(d.mastery)}%</span></button>`;
    }).join("")}</div>`;
  }

  /* ---- configuração do objetivo ---- */
  let draft = null;
  function setupHTML() {
    const g = st();
    if (!draft) {
      const p = ACC?.perfil || {};
      const c = g.cfg || {};
      const vest = c.vest || (p.vestibulares || [])[0] || "ENEM";
      const h = Math.round((p.meta_horas_semana || 15) * 60 / 6 / 15) * 15;
      draft = { vest, curso: c.curso || p.curso_foco || "", data: c.data || dataDaProva(vest), min: c.min ? [...c.min] : [h, h, h, h, h, Math.round(h / 2 / 15) * 15, 0], prior: c.prior ? [...c.prior] : [] };
    }
    const vs = ["ENEM", "FUVEST", "UNICAMP", "UNESP", "Provão Paulista", "Outro"];
    const mats = SUBJECT_KEYS;
    const tot = draft.min.reduce((a, b) => a + (+b || 0), 0);
    return `<div class="gps-hero" style="padding-bottom:22px">${STAR("var(--lime)", 46, "right:20px", "top:18px", 10)}
      <div class="eyebrow-l">GPS de Estudos</div>
      <h1 class="h-big" style="font-size:clamp(28px,4.5vw,44px);margin:6px 0 6px;color:var(--white)">Para onde<br><span style="color:var(--lime)">você vai?</span></h1>
      <p style="margin:0;max-width:56ch;color:var(--white);opacity:.9">Conte seu objetivo e seu tempo. O GPS cruza isso com o seu desempenho e calcula, todo dia, o melhor próximo passo.</p></div>
    <div class="card gsetup">
      <label><span>Vestibular principal</span><div class="pills">${vs.map((v) => `<button class="pill ${draft.vest === v ? "on" : ""}" data-gx="dvest" data-v="${v}">${v}</button>`).join("")}</div></label>
      <label><span>Curso desejado</span><input class="inp" data-gxin="curso" placeholder="Ex.: Medicina" value="${esc(draft.curso)}"></label>
      <label><span>Data da prova</span><input class="inp" type="date" data-gxin="data" value="${esc(draft.data || "")}">${draft.data ? "" : `<small class="muted">Não achamos essa data no seu calendário de provas. Preencha para o GPS calcular a contagem regressiva.</small>`}</label>
      <div class="glabel"><span>Tempo para estudar em cada dia <b class="num">(${fmtMin(tot)} por semana)</b></span>
        <div class="gdays">${DIAS.map((d, i) => `<label class="gday ${+draft.min[i] ? "on" : ""}"><b>${d}</b><select data-gxin="min" data-i="${i}">${[0, 30, 45, 60, 90, 120, 150, 180, 210, 240, 300].map((m) => `<option value="${m}" ${+draft.min[i] === m ? "selected" : ""}>${m ? fmtMin(m) : "folga"}</option>`).join("")}</select></label>`).join("")}</div></div>
      <div class="glabel"><span>Matérias que você quer priorizar <span class="muted">(opcional)</span></span>
        <div class="pills">${mats.map((s) => `<button class="pill ${draft.prior.includes(s) ? "on" : ""}" data-gx="dprior" data-s="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>
      <div class="gbtns" style="margin-top:6px"><button class="btn" data-gx="salvar">${g.cfg ? "Salvar e recalcular" : "Calcular minha rota"}</button>${g.cfg ? `<button class="btn ghost sm" data-gx="cancelsetup">Cancelar</button>` : ""}</div>
    </div>`;
  }
  function dataDaProva(v) {
    const ex = (S.exams || []).filter((e) => e.d && daysUntil(e.d) >= 0);
    const key = { ENEM: /enem/i, FUVEST: /fuvest/i, UNICAMP: /unicamp/i, UNESP: /unesp/i, "Provão Paulista": /prov/i }[v];
    const m = ex.filter((e) => key && key.test(e.n)).sort((a, b) => a.d.localeCompare(b.d))[0];
    return m ? m.d : "";
  }

  /* ---- diagnóstico ---- */
  function diagHTML() {
    const dg = st().diag;
    const id = dg.ids[dg.cur], q = QMAP[id];
    if (!q) return `<div class="empty">Carregando questões…</div>`;
    const resp = Object.keys(dg.ans).length;
    const ch = dg.ans[id];
    return `<div class="row-head" style="margin-top:4px"><h1 class="h-sec">Diagnóstico inicial</h1><span class="small muted num">${resp} de ${dg.ids.length} respondidas</span></div>
      ${barra(resp / dg.ids.length, "var(--violet)")}
      <p class="small muted">Responda com sinceridade. Se não souber, pule: o GPS entende como conteúdo a estudar. O gabarito aparece no Laboratório de Erros depois.</p>
      <article class="qcard">
        <div class="qmeta"><span class="chip dark">${qProva(q)} ${q.y}</span><span class="chip">Questão ${dg.cur + 1} de ${dg.ids.length}</span><span class="chip" style="background:${corS(q.s)}">${esc(q.s)}</span></div>
        ${q.c ? `<div class="qctx">${qmd(q.c, q)}</div>` : ""}${q.q ? `<div class="qintro">${qmd(q.q, q)}</div>` : ""}
        <div class="alts">${q.o.map((o, i) => `<button class="alt ${i === ch ? "sel" : ""}" data-gx="dans" data-i="${i}"><span class="L">${"ABCDE"[i]}</span><span>${qmd(o, q)}</span></button>`).join("")}</div>
      </article>
      <div class="qnav"><button class="btn ghost sm" data-gx="dgo" data-i="${dg.cur - 1}" ${dg.cur === 0 ? "disabled" : ""}>Anterior</button>
        <button class="btn ghost sm" data-gx="dgo" data-i="${dg.cur + 1}" ${dg.cur >= dg.ids.length - 1 ? "disabled" : ""}>Pular</button>
        <button class="btn ${resp >= dg.ids.length ? "" : "ghost"} sm" data-gx="dfim">Finalizar diagnóstico</button>
        <button class="btn ghost sm" data-gx="dsair" style="margin-left:auto">Sair</button></div>`;
  }

  /* =================== VIEW: LABORATÓRIO DE ERROS =================== */
  W.vErros = function () {
    if (QREADY !== true) return `<h1 class="h-sec">Laboratório de Erros</h1><div class="empty" style="margin-top:16px">Carregando seus dados…</div>`;
    const ctx = retrato();
    const n = ctx.nResp, errs = ctx.errosAtivos.length, acc = n ? (n - errs) / n : 0;
    const head = `<div class="lab-hero">${STAR("var(--pink)", 40, "right:18px", "top:16px", 15)}
      <div class="eyebrow-l" style="color:var(--ink)">Laboratório de Erros</div>
      <h1 class="h-big" style="font-size:clamp(26px,4.4vw,42px);margin:6px 0">Por que você<br><span style="color:var(--violet)">está errando?</span></h1>
      <p class="small" style="margin:0;max-width:60ch">Cada erro vira um dado. Classifique o motivo e o Laboratório mostra seu padrão, os conteúdos críticos e o que fazer. O GPS usa isso para ajustar a sua rota.</p></div>`;
    if (!n) return head + `<div class="empty" style="margin-top:16px">Você ainda não respondeu questões. Quando errar alguma, ela aparece aqui para ser analisada.<br><br>
      <button class="btn sm" data-gx="godiag">Fazer o diagnóstico</button> <button class="btn ghost sm" data-go="questoes">Ir para as questões</button></div>`;
    const ga = ctx.gargalo;
    const total = Object.values(ctx.grupos).reduce((a, b) => a + b, 0);
    const semAnalise = ctx.errosAtivos.filter((e) => !S.erros[e.r.id]?.cat).sort((a, b) => b.r.t - a.r.t);
    // reincidência
    const reinc = Object.entries(ctx.errHist).map(([t, rs]) => [t, rs.filter((r) => r.t >= now() - 14 * DAY).length]).filter(([, c]) => c >= 3).sort((a, b) => b[1] - a[1]);
    // conteúdos críticos
    const crit = {};
    ctx.errosAtivos.forEach((e) => { const k = e.topic || "sem:" + e.q.s; (crit[k] = crit[k] || []).push(e); });
    const critAll = Object.entries(crit).sort((a, b) => b[1].length - a[1].length);
    const critL = critAll.filter(([, es]) => es.length >= 2 || ui.labSingles);
    const singles = critAll.length - critAll.filter(([, es]) => es.length >= 2).length;
    const [interTxt, interBtn] = ga ? INTERV[ga[0]] : [null, null];

    return head + `
    <div class="fc-top" style="margin-top:16px">
      <div class="card"><span class="small muted">Questões analisadas</span><b class="num">${n}</b></div>
      <div class="card"><span class="small muted">Erros</span><b class="num">${errs}</b></div>
      <div class="card"><span class="small muted">Taxa de acerto</span><b class="num">${pct(acc)}%</b></div>
      <div class="card"><span class="small muted">Principal gargalo</span><b style="font-size:20px">${ga ? esc(ga[0]) : "—"}</b></div>
    </div>

    ${ga && ctx.classif >= 3 ? `<div class="dark-card lab-diag"><div class="small" style="opacity:.8">Diagnóstico do Laboratório</div>
        <h3 style="font-size:22px;margin:0">Você está errando principalmente por <span style="color:var(--lime)">${esc(ga[0].toLowerCase())}</span> (${pct(ga[1] / total)}% dos erros classificados).</h3>
        <p style="margin:0;opacity:.9">${esc(interTxt)}</p>
        <div><button class="btn lime sm" data-gx="interv" data-g="${esc(ga[0])}">${esc(interBtn)}</button></div></div>`
      : errs ? `<div class="card lab-tip"><b>Classifique pelo menos 3 erros</b> para o Laboratório descobrir o seu principal gargalo. ${ctx.classif ? `Faltam ${3 - ctx.classif}.` : ""}</div>` : `<div class="card lab-tip"><b>Nenhum erro no momento.</b> Continue resolvendo questões: o Laboratório analisa cada erro que aparecer.</div>`}

    ${reinc.map(([t, c]) => `<div class="card lab-alert"><div><b>⚠️ Atenção</b><p style="margin:2px 0 0">Você já errou ${c} questões sobre <b>${esc(MODMAP[t].t)}</b> nas últimas duas semanas. Faça uma revisão de ${esc(MODMAP[t].t)} antes de continuar.</p></div>
      <button class="btn sm ink" data-gx="revisar" data-mod="${t}">Revisar conteúdo</button></div>`).join("")}

    ${semAnalise.length ? `<div class="row-head"><h2 class="h-sec">Erros para analisar <span class="small muted num">(${semAnalise.length})</span></h2></div>
      <div class="lab-queue">${semAnalise.slice(0, ui.labMore ? 40 : 4).map((e) => erroCard(e, ctx, true)).join("")}</div>
      ${semAnalise.length > 4 ? `<button class="btn ghost sm" data-gx="more">${ui.labMore ? "Mostrar menos" : "Ver todos"}</button>` : ""}` : ""}

    <div class="grid gtwo" style="margin-top:14px">
      <div class="card"><h2 class="h-sec" style="font-size:19px;margin-bottom:10px">Você está errando por…</h2>
        ${total ? barrasGrupo(ctx.grupos) + Object.entries(ctx.porMat).filter(([, v]) => Object.values(v).reduce((a, b) => a + b, 0) >= 2).map(([s, v]) => `<div class="lab-mat"><div class="lab-mh"><span class="gdot" style="background:${corS(s)}"></span><b>${esc(s.toUpperCase())}</b></div>${barrasGrupo(v, true)}</div>`).join("")
        : `<div class="empty">Classifique seus erros para ver o padrão.</div>`}
      </div>
      <div class="card"><h2 class="h-sec" style="font-size:19px;margin-bottom:6px">Evolução</h2>${evolucao()}</div>
    </div>

    <div class="row-head"><h2 class="h-sec">Seus conteúdos críticos</h2><span class="small muted">toque para ver os erros</span></div>
    ${critL.length ? `<div class="lab-crit">${critL.map(([k, es]) => {
      const [ic, cor, lab] = sev(es.length);
      const titulo = k.startsWith("sem:") ? k.slice(4) + " (assunto não identificado)" : MODMAP[k].s + " — " + MODMAP[k].t;
      const aberto = ui.labOpen === k;
      return `<div class="lab-ci ${aberto ? "on" : ""}"><button class="lab-cb" data-gx="crit" data-k="${esc(k)}"><span>${ic}</span><b>${esc(titulo)}</b><span class="lab-n num" style="background:${cor}">${es.length} erro${es.length > 1 ? "s" : ""}</span><small class="muted">${lab}</small></button>
        ${aberto ? `<div class="lab-ce">${!k.startsWith("sem:") ? `<div class="gbtns" style="margin-bottom:10px"><button class="btn sm ink" data-gx="revisar" data-mod="${k}">Revisar conteúdo</button><button class="btn ghost sm" data-gx="fcmod" data-mod="${k}">Flashcards do tema</button></div>` : ""}${es.sort((a, b) => b.r.t - a.r.t).map((e) => erroCard(e, ctx, false)).join("")}</div>` : ""}</div>`;
    }).join("")}</div>` : `<div class="empty">${singles ? "Nenhum conteúdo com erros repetidos por enquanto." : "Nenhum conteúdo crítico. 🎉"}</div>`}
    ${singles ? `<button class="btn ghost sm" style="margin-top:10px" data-gx="singles">${ui.labSingles ? "Esconder" : "Ver"} conteúdos com 1 erro (${singles})</button>` : ""}`;
  };

  function barrasGrupo(gr, mini) {
    const tot = Object.values(gr).reduce((a, b) => a + b, 0);
    return `<div class="lab-bars ${mini ? "mini" : ""}">${Object.entries(gr).sort((a, b) => b[1] - a[1]).map(([g, c]) => `<div class="lab-bar"><span>${esc(g)}</span><div class="bar"><i style="width:${(c / tot) * 100}%;background:${GCOR[g]}"></i></div><b class="num">${pct(c / tot)}%</b></div>`).join("")}</div>`;
  }

  function erroCard(e, ctx, compacto) {
    const { q, r } = e;
    const er = S.erros[q.id] || {};
    const vezes = e.topic ? (ctx.errHist[e.topic] || []).length : 0;
    const quando = r.t ? new Date(r.t).toLocaleDateString("pt-BR") : "antes do registro";
    const txt = qPlain(q.q || q.c || "").replace(/\s+/g, " ").slice(0, 170);
    return `<div class="lab-err" id="lab-${q.id}">
      <div class="lab-eh"><span class="chip dark">${qProva(q)} ${q.y} · Q${q.n}</span><span class="chip" style="background:${corS(q.s)}">${esc(q.s)}</span>${e.topic ? `<span class="chip">${esc(MODMAP[e.topic].t)}</span>` : ""}<span class="small muted">${quando}${r.src === "diag" ? " · diagnóstico" : r.src === "sim" ? " · simulado" : ""}</span></div>
      <p class="lab-q">${esc(txt)}${txt.length >= 170 ? "…" : ""}</p>
      <div class="lab-ans small"><span>Sua resposta: <b style="color:var(--bad)">${r.ch === undefined || r.ch === null ? "—" : "ABCDE"[r.ch]}</b></span><span>Correta: <b style="color:var(--ok)">${"ABCDE"[q.k]}</b></span>${vezes > 1 ? `<span>Você errou <b>${vezes}</b> vezes este conteúdo</span>` : ""}</div>
      ${catChips(q.id, er.cat)}
      ${compacto ? "" : `<div class="lab-ex">
        <label class="small">Dificuldade <select data-gxin="dif" data-q="${q.id}">${["", "Fácil", "Média", "Difícil"].map((d) => `<option ${er.dif === d ? "selected" : ""} value="${d}">${d || "—"}</option>`).join("")}</select></label>
        <label class="small lab-rev"><input type="checkbox" data-gxin="rev" data-q="${q.id}" ${er.rev ? "checked" : ""}> Já revisei</label>
        <button class="btn ghost sm" data-gx="refazer" data-q="${q.id}">Ver a questão</button></div>
        <textarea class="inp lab-obs" data-gxin="obs" data-q="${q.id}" rows="2" placeholder="Observação: ex.: eu sabia a fórmula, mas esqueci de converter as unidades.">${esc(er.obs || "")}</textarea>`}
    </div>`;
  }
  function catChips(qid, cat) {
    return `<div class="lab-cats">${CATS.map(([k, n]) => `<button class="lab-cat ${cat === k ? "on" : ""}" data-gx="cat" data-q="${qid}" data-c="${k}">${esc(n)}</button>`).join("")}</div>`;
  }

  // caixa "Por que você errou?" dentro do card de questão do app
  W.labInline = function (q, chosen) {
    st();
    const er = S.erros[q.id] || {};
    return `<div class="lab-inline" id="labi-${q.id}"><div class="small"><b>Por que você errou?</b> <span class="muted">Isso alimenta o seu Laboratório de Erros e o GPS.</span></div>${catChips(q.id, er.cat)}
      ${er.cat ? `<input class="inp lab-obs" data-gxin="obs" data-q="${q.id}" placeholder="Observação (opcional)" value="${esc(er.obs || "")}">` : ""}</div>`;
  };

  function evolucao() {
    const log = (S.qlog || []).filter((r) => r.t > 0);
    if (log.length < 8) return `<div class="empty">O gráfico aparece depois de algumas questões respondidas em dias diferentes.</div>`;
    const seg = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - wd(d)); return d.getTime(); };
    const by = {};
    log.forEach((r) => { const k = seg(r.t); const o = (by[k] = by[k] || { n: 0, ok: 0 }); o.n++; o.ok += r.ok; });
    const ks = Object.keys(by).map(Number).sort().slice(-8);
    const pts = ks.map((k) => ({ k, v: by[k].ok / by[k].n, n: by[k].n }));
    if (pts.length < 2) return `<div class="small muted" style="margin-bottom:8px">Esta semana: <b class="num">${pct(pts[0].v)}%</b> de acerto em ${pts[0].n} questões. A linha do tempo aparece a partir da segunda semana.</div>`;
    const Wd = 520, H = 190, px = 40, py = 22;
    const x = (i) => px + (i * (Wd - px - 16)) / (pts.length - 1), y = (v) => H - py - v * (H - 2 * py);
    const path = pts.map((p, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(p.v).toFixed(1)).join("");
    return `<svg viewBox="0 0 ${Wd} ${H}" class="lab-chart" role="img" aria-label="Taxa de acerto por semana">
      ${[0, 0.5, 1].map((v) => `<line x1="${px}" x2="${Wd - 10}" y1="${y(v)}" y2="${y(v)}" stroke="var(--hair)" stroke-width="1.5"/><text x="${px - 6}" y="${y(v) + 4}" font-size="11" text-anchor="end" fill="var(--muted)">${pct(v)}%</text>`).join("")}
      <path d="${path}" fill="none" stroke="var(--violet)" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>
      ${pts.map((p, i) => `<circle cx="${x(i)}" cy="${y(p.v)}" r="5" fill="var(--lime)" stroke="var(--ink)" stroke-width="1.5"><title>${pct(p.v)}% em ${p.n} questões</title></circle><text x="${x(i)}" y="${H - 4}" font-size="10.5" text-anchor="middle" fill="var(--muted)">${new Date(p.k).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</text>`).join("")}
      <text x="${x(pts.length - 1)}" y="${y(pts[pts.length - 1].v) - 10}" font-size="12" font-weight="700" text-anchor="end" fill="var(--ink)">${pct(pts[pts.length - 1].v)}%</text>
    </svg><p class="small muted" style="margin:4px 0 0">Taxa de acerto por semana (questões, simulados e diagnóstico).</p>`;
  }

  /* =================== Painel: cards que ligam as duas ferramentas =================== */
  W.gpsDashHTML = function () {
    const g = st();
    if (QREADY !== true) return "";
    const ctx = retrato();
    let gpsCard;
    if (!g.cfg) gpsCard = `<div class="dash-g"><div class="small" style="font-weight:700">MEU GPS</div><h3>Ainda sem rota</h3><p class="small">Diga seu objetivo e seu tempo. O GPS calcula o melhor próximo passo para você.</p><button class="btn lime sm" data-go="gps">Configurar o GPS</button></div>`;
    else {
      const p = plano();
      const t = p.tasks.find((x) => !p.feito[x.k]);
      gpsCard = `<div class="dash-g"><div class="small" style="font-weight:700">MEU GPS</div><h3>🎯 ${esc(g.cfg.curso || "Seu curso")} — ${esc(g.cfg.vest)}</h3>
        <div class="small num">${ctx.dias !== null && ctx.dias >= 0 ? ctx.dias + " dias restantes · " : ""}nível ${pct(ctx.nivel)}%</div>
        ${t ? `<div class="dash-next"><span class="small">Seu próximo passo:</span><b>${esc(t.mod ? t.t : t.t)}</b><span class="small" style="opacity:.85">“${esc(t.why[0] || "")}”</span></div>
        <div class="gbtns"><button class="btn lime sm" data-gx="start" data-k="${esc(t.k)}">Começar</button><button class="btn ghost sm" data-go="gps">Ver rota</button></div>`
        : `<div class="dash-next"><b>${p.min ? "Plano de hoje concluído! 🎉" : "Hoje é dia de folga no plano."}</b></div><button class="btn ghost sm" data-go="gps">Ver rota</button>`}</div>`;
    }
    const ga = ctx.gargalo, tot = Object.values(ctx.grupos).reduce((a, b) => a + b, 0);
    const semA = ctx.errosAtivos.filter((e) => !S.erros[e.r.id]?.cat).length;
    const labCard = `<div class="dash-l"><div class="small" style="font-weight:700">LABORATÓRIO DE ERROS</div>
      <h3>🧪 ${ctx.errosAtivos.length} erro${ctx.errosAtivos.length === 1 ? "" : "s"} ${ctx.classif ? `· ${ctx.classif} analisado${ctx.classif > 1 ? "s" : ""}` : ""}</h3>
      ${ga && ctx.classif >= 3 ? `<span class="small">Seu principal gargalo:</span><b class="dash-ga">⚠️ ${esc(ga[0])}</b><span class="small">${pct(ga[1] / tot)}% dos seus erros</span>`
      : ctx.errosAtivos.length ? `<span class="small">${semA} erro${semA === 1 ? "" : "s"} esperando análise. Classifique para descobrir seu gargalo.</span>` : `<span class="small">Sem erros por enquanto. Resolva questões e o Laboratório analisa cada um.</span>`}
      <button class="btn ink sm" data-go="erros">Ver meus erros</button></div>`;
    return `<div class="grid dash-gl">${gpsCard}${labCard}</div>`;
  };

  /* =================== Leitor de módulos: aviso de base =================== */
  W.gpsPrereqCard = function (id) {
    if (QREADY !== true) return "";
    const pr = GPS.prereq(id);
    const dep = GPS.dependentes(id);
    if (!pr.length && !dep.length) return "";
    const ctx = retrato();
    const fr = pr.filter((b) => ctx.dom[b].mastery < 0.45);
    return `<div class="card gpre"><h4>Trilha do conteúdo</h4>
      ${pr.length ? `<div class="small muted">Antes deste:</div>${pr.map((b) => `<button class="gmod" data-mod="${b}"><span class="gic" style="color:${ctx.dom[b].mastery < 0.45 ? "var(--orange)" : "var(--ok)"}">${ctx.dom[b].mastery < 0.45 ? "!" : "✓"}</span><span class="gmt">${esc(MODMAP[b].t)}<small>${esc(MODMAP[b].s)} · domínio ${pct(ctx.dom[b].mastery)}%</small></span></button>`).join("")}` : ""}
      ${fr.length ? (ctx.errHist[fr[0]]?.length || ctx.dom[fr[0]].estudado ? `<p class="small" style="margin:6px 0 0;color:var(--bad)">Sua base em ${esc(MODMAP[fr[0]].t)} ainda está fraca. Se travar aqui, volte nela primeiro.</p>` : `<p class="small muted" style="margin:6px 0 0">Você ainda não estudou ${esc(MODMAP[fr[0]].t)}. Se travar aqui, comece por ele.</p>`) : ""}
      ${dep.length ? `<div class="small muted" style="margin-top:8px">Este conteúdo abre caminho para:</div><div class="small">${dep.slice(0, 4).map((d) => esc(MODMAP[d].t)).join(" · ")}</div>` : ""}</div>`;
  };

  /* =================== ações =================== */
  function iniciarTarefa(k, mod2) {
    const g = st(), p = g.plano;
    let t = p?.tasks.find((x) => x.k === k);
    if (!t && mod2) t = { k, tipo: "estudar", mod: mod2, s: MODMAP[mod2].s };
    if (!t) { const [tipo, mod] = k.split(":"); t = { k, tipo, mod: MODMAP[mod] ? mod : null, s: MODMAP[mod]?.s || mod }; }
    if (p && p.d === todayKey()) { p.ini = p.ini || {}; p.ini[k] = 1; }
    if (t.s && MODMAP[t.mod]) logHoje(t.s);
    save();
    switch (t.tipo) {
      case "estudar": openModule(t.mod); break;
      case "revisar":
      case "praticar": abrirRevisao(t.mod); break;
      case "lab": go("erros"); break;
      case "flash": fcStart("Todas"); break;
      case "redacao": go("redacao"); break;
      case "diag": iniciarDiag(); go("gps"); break;
      case "questoes": { const pv = PROVAS.find((p) => p.toUpperCase() === String(st().cfg?.vest || "").toUpperCase()); qf = { s: t.s, y: "Todos", pend: true, v: pv && Q.some((q) => qProva(q) === pv && q.s === t.s) ? pv : "Todas" }; rebuildQ(); go("questoes"); break; }
      case "sim": go("simulados"); break;
      default: if (t.mod) openModule(t.mod);
    }
  }
  function abrirRevisao(id) {
    openModule(id);
    const m = MODMAP[id];
    if (!m) return;
    modState.sec = MOD[m.s][m.i].s.length;
    gpsTouch(id);
    save();
    render();
  }
  function intervir(gname) {
    const ctx = retrato();
    const topErr = Object.entries(ctx.errHist).sort((a, b) => b[1].length - a[1].length)[0]?.[0];
    if (gname === "Interpretação") return openModule("Linguagens#0");
    if (gname === "Cálculo") {
      const fraco = ALL_MODS.filter((m) => m.s === "Matemática Básica").sort((a, b) => ctx.dom[a.id].mastery - ctx.dom[b.id].mastery)[0];
      return openModule(fraco ? fraco.id : "Matemática Básica#0");
    }
    if (gname === "Tempo") return go("simulados");
    if (gname === "Chute") return go("gps");
    if (gname === "Atenção") { qf = { s: "Todas", y: "Todos", pend: true, v: "Todas" }; rebuildQ(); return go("questoes"); }
    if (gname === "Conceitos" && topErr) return fcStart(null, topErr);
    if (topErr) return gname === "Aplicação" ? abrirRevisao(topErr) : openModule(topErr);
    go("modulos");
  }

  function repaintLab(qid) {
    cacheReset();
    const el = document.getElementById("labi-" + qid);
    if (el) { const q = QMAP[qid]; el.outerHTML = W.labInline(q); return; }
    render();
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-gx]");
    if (!t) return;
    const d = t.dataset, g = st();
    switch (d.gx) {
      case "start": iniciarTarefa(d.k, d.mod2); return;
      case "done": g.plano.feito[d.k] = 1; save(); toast("Boa! Atividade concluída."); render(); return;
      case "undo": delete g.plano.feito[d.k]; save(); render(); return;
      case "recalc": cacheReset(); plano(true); toast("Rota recalculada com seus dados mais recentes."); render(); return;
      case "hoje": g.hoje = { d: todayKey(), min: +d.min }; cacheReset(); plano(true); render(); return;
      case "mat": ui.matOpen = ui.matOpen === d.s ? null : d.s; render(); return;
      case "como": ui.comoFunciona = !ui.comoFunciona; render(); return;
      case "setup": ui.setup = true; draft = null; render(); return;
      case "cancelsetup": ui.setup = false; draft = null; render(); return;
      case "dvest": draft.vest = d.v; draft.data = dataDaProva(d.v); render(); return;
      case "dprior": draft.prior = draft.prior.includes(d.s) ? draft.prior.filter((x) => x !== d.s) : [...draft.prior, d.s]; render(); return;
      case "salvar": {
        if (!draft.min.some((x) => +x > 0)) { toast("Escolha pelo menos um dia para estudar."); return; }
        g.cfg = { vest: draft.vest, curso: draft.curso.trim() || "Seu curso", data: draft.data, min: draft.min.map((x) => +x || 0), prior: draft.prior };
        g.v++; g.hoje = null; ui.setup = false; draft = null; cacheReset(); plano(true); save(); render(); toast("Rota calculada!"); return;
      }
      case "diag": iniciarDiag(); render(); window.scrollTo({ top: 0 }); return;
      case "godiag": if (!g.cfg) { go("gps"); return; } iniciarDiag(); go("gps"); return;
      case "skipdiag": g.diag = { ids: [], ans: {}, cur: 0, done: true, t: now(), pulado: 1 }; g.v++; plano(true); save(); render(); return;
      case "dans": { const dg = g.diag, id = dg.ids[dg.cur]; dg.ans[id] = +d.i; if (dg.cur < dg.ids.length - 1) dg.cur++; save(); render(); window.scrollTo({ top: 0 }); return; }
      case "dgo": g.diag.cur = Math.max(0, Math.min(g.diag.ids.length - 1, +d.i)); save(); render(); window.scrollTo({ top: 0 }); return;
      case "dfim": {
        const n = Object.keys(g.diag.ans).length;
        if (n < 5) { toast("Responda pelo menos 5 questões para o diagnóstico valer."); return; }
        fecharDiag(); plano(true); render(); window.scrollTo({ top: 0 });
        const ok = Object.entries(g.diag.ans).filter(([id, i]) => QMAP[id]?.k === i).length;
        toast(`Diagnóstico pronto: ${ok}/${n} acertos. Sua rota foi calculada.`); return;
      }
      case "dsair": g.diag = null; save(); render(); return;
      case "cat": {
        const er = (S.erros[d.q] = S.erros[d.q] || {});
        er.cat = er.cat === d.c ? undefined : d.c; er.t = now();
        if (!er.cat) delete er.cat;
        save(); // a rota usa isso no próximo recálculo
        if (VIEW === "erros") { cacheReset(); render(); } else repaintLab(d.q);
        return;
      }
      case "crit": ui.labOpen = ui.labOpen === d.k ? null : d.k; render(); return;
      case "more": ui.labMore = !ui.labMore; render(); return;
      case "singles": ui.labSingles = !ui.labSingles; render(); return;
      case "revisar": abrirRevisao(d.mod); return;
      case "fcmod": fcStart(null, d.mod); return;
      case "refazer": qf = { s: "Todas", y: "Todos", pend: false, v: "Todas" }; rebuildQ(d.q); go("questoes"); return;
      case "interv": intervir(d.g); return;
    }
  });
  const onInput = (e) => {
    const t = e.target.closest("[data-gxin]");
    if (!t) return;
    const k = t.dataset.gxin;
    if (k === "curso" && draft) { draft.curso = t.value; return; }
    if (k === "data" && draft) { draft.data = t.value; return; }
    if (k === "min" && draft) { draft.min[+t.dataset.i] = +t.value; if (e.type === "change") render(); return; }
    const q = t.dataset.q;
    if (!q) return;
    const er = (S.erros[q] = S.erros[q] || {});
    if (k === "obs") er.obs = t.value.slice(0, 500);
    if (k === "dif") er.dif = t.value;
    if (k === "rev") { er.rev = t.checked; cacheReset(); }
    save();
  };
  document.addEventListener("input", onInput);
  document.addEventListener("change", onInput);

  /* =================== estilos (no padrão visual do Easy Study) =================== */
  const css = `
  .gdot{width:12px;height:12px;border-radius:50%;border:1.5px solid var(--line);display:inline-block;flex:none}
  .gps-hero{position:relative;background:var(--violet);color:var(--white);border:1.5px solid var(--line);border-radius:22px;padding:22px 22px 18px;overflow:hidden}
  .eyebrow-l{font-family:var(--display);font-weight:800;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--lime)}
  .gtag{background:var(--lime);color:var(--ink);border-radius:6px;padding:1px 7px;font-family:var(--body);letter-spacing:0;text-transform:none;font-weight:700}
  .gps-route{display:grid;grid-template-columns:minmax(0,1fr) 34px minmax(0,1.3fr) 34px minmax(0,1fr);align-items:stretch;margin-top:14px}
  .gstop{background:var(--white);color:var(--ink);border:1.5px solid var(--line);border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;gap:4px;position:relative;min-width:0}
  .gstop.next{background:var(--lime)}.gstop.goal{background:var(--butter)}
  .gpin{font-size:13px;color:var(--violet)}
  .glab{font-family:var(--display);font-weight:800;font-size:11px;text-transform:uppercase;letter-spacing:.05em}
  .gbig{font-family:var(--display);font-weight:900;font-size:38px;line-height:1}
  .gmid{font-weight:700;font-size:16px;line-height:1.25}
  .gsub{font-size:12.5px;color:var(--muted)}
  .gstop .btn{align-self:flex-start;margin-top:auto}
  .gline{align-self:center;height:0;border-top:3px dashed var(--lime);margin:0 4px}
  .gwhy{margin-top:14px;background:rgba(255,255,255,.12);border-radius:12px;padding:10px 14px;font-size:14px}
  .gwhy b{color:var(--lime)}
  .gdiag{display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-top:14px;background:var(--lime)}
  .gdiag h3{font-size:18px}
  .gbtns{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  .gtoday-h{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;margin-bottom:6px}
  .gtime{font-size:26px}
  .gtasks{list-style:none;margin:0;padding:0;display:grid;gap:10px}
  .gtasks li{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:12px;align-items:center;border:1.5px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--panel)}
  .gtasks li.feito{opacity:.55}.gtasks li.feito .gtt{text-decoration:line-through}
  .gn{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--line);display:grid;place-items:center;font-weight:800;background:var(--white)}
  .feito .gn{background:var(--ok);color:var(--white)}
  .gtt{line-height:1.35}.gtt .gdot{vertical-align:-1px;margin-right:6px}
  .gmeta{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:3px}
  .gpri{border:1.5px solid var(--line);border-radius:7px;padding:0 7px;font-size:12px;font-weight:700}
  .ga{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
  .gtwo{grid-template-columns:minmax(0,1fr) minmax(0,1fr);margin-top:14px}
  .groute{list-style:none;margin:0;padding:0 0 0 6px;border-left:3px dashed var(--violet);display:grid;gap:12px}
  .groute li{display:flex;gap:10px;align-items:flex-start;margin-left:-11px}.groute .gdot{margin-top:5px;width:16px;height:16px}
  .gsubj{display:grid;grid-template-columns:14px minmax(0,1.3fr) minmax(0,1fr) 42px;gap:10px;align-items:center;width:100%;background:none;border:0;border-bottom:1.5px solid var(--hair);padding:8px 2px;text-align:left}
  .gsubj.on{background:var(--panel)}.gsn{font-weight:600;font-size:14px}
  .gmods{display:grid;gap:4px;padding:6px 0 10px}
  .gmod{display:grid;grid-template-columns:22px minmax(0,1fr) auto;gap:8px;align-items:center;width:100%;text-align:left;background:var(--white);border:1.5px solid var(--hair);border-radius:10px;padding:6px 10px}
  .gmod:hover{border-color:var(--line)}.gic{font-weight:800;text-align:center}.gmt{font-size:13.5px;font-weight:600;line-height:1.25}.gmt small{display:block;font-weight:500;font-size:11.5px;color:var(--muted)}
  .glink{background:none;border:0;padding:0;font-weight:700;color:var(--violet)}
  .gfoot{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center;border-top:1.5px solid var(--hair);margin-top:12px;padding-top:10px}
  .gsetup{display:grid;gap:16px;margin-top:14px}
  .gsetup label,.glabel{display:grid;gap:6px}.gsetup label>span,.glabel>span{font-weight:700;font-size:14px}
  .gsetup .inp{border:1.5px solid var(--line);border-radius:12px;padding:9px 12px;background:var(--white);max-width:360px}
  .gdays{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px}
  .gday{border:1.5px solid var(--line);border-radius:12px;padding:6px;display:grid;gap:4px;text-align:center;background:var(--white)}
  .gday.on{background:var(--lime)}.gday select{width:100%;border:0;background:transparent;font-size:13px;text-align:center;text-align-last:center;appearance:none;-webkit-appearance:none;padding:2px 0;cursor:pointer;font-weight:600}
  .lab-hero{position:relative;background:var(--rose);border:1.5px solid var(--line);border-radius:22px;padding:22px;overflow:hidden}
  .lab-diag{margin-top:14px}
  .lab-tip{margin-top:14px;background:var(--butter)}
  .lab-alert{margin-top:12px;display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;background:var(--peach)}
  .lab-queue{display:grid;gap:10px}
  .lab-err{border:1.5px solid var(--line);border-radius:14px;padding:12px;background:var(--white);display:grid;gap:8px}
  .lab-eh{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  .lab-q{margin:0;font-size:14px}
  .lab-ans{display:flex;gap:14px;flex-wrap:wrap}
  .lab-cats{display:flex;gap:6px;flex-wrap:wrap}
  .lab-cat{border:1.5px solid var(--line);background:var(--white);border-radius:999px;padding:3px 10px;font-size:12.5px;font-weight:600}
  .lab-cat:hover{background:var(--lav)}.lab-cat.on{background:var(--ink);color:var(--white)}
  .lab-ex{display:flex;gap:12px;flex-wrap:wrap;align-items:center}.lab-ex select{border:1.5px solid var(--line);border-radius:8px;padding:2px 6px;background:var(--white)}
  .lab-rev{display:flex;gap:6px;align-items:center}
  .lab-obs{width:100%;border:1.5px solid var(--line);border-radius:10px;padding:8px 10px;background:var(--white);resize:vertical}
  .lab-inline{margin-top:12px;border:1.5px dashed var(--line);border-radius:12px;padding:10px;display:grid;gap:8px;background:var(--panel)}
  .lab-bars{display:grid;gap:8px}.lab-bar{display:grid;grid-template-columns:110px minmax(0,1fr) 44px;gap:10px;align-items:center;font-size:14px}
  .lab-bar .bar{height:12px;border:1.5px solid var(--line);background:var(--white)}.lab-bar b{text-align:right}
  .lab-bars.mini .lab-bar{font-size:13px}.lab-bars.mini .bar{height:9px}
  .lab-mat{margin-top:14px;padding-top:10px;border-top:1.5px solid var(--hair)}.lab-mh{display:flex;gap:6px;align-items:center;margin-bottom:6px;font-size:13px}
  .lab-chart{width:100%;height:auto;display:block}
  .lab-crit{display:grid;gap:8px}
  .lab-ci{border:1.5px solid var(--line);border-radius:14px;background:var(--white);overflow:hidden}
  .lab-cb{display:grid;grid-template-columns:24px minmax(0,1fr) auto auto;gap:10px;align-items:center;width:100%;background:none;border:0;padding:12px 14px;text-align:left}
  .lab-ci.on .lab-cb{background:var(--panel);border-bottom:1.5px solid var(--hair)}
  .lab-n{border:1.5px solid var(--line);border-radius:8px;padding:1px 8px;font-size:12.5px;font-weight:700;color:var(--ink)}
  .lab-ce{padding:12px;display:grid;gap:10px}
  .dash-gl{grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);margin-bottom:14px}
  .dash-g,.dash-l{border:1.5px solid var(--line);border-radius:20px;padding:18px;display:flex;flex-direction:column;gap:8px;align-items:flex-start}
  .dash-g{background:var(--violet);color:var(--white)}.dash-g h3,.dash-l h3{font-size:20px}
  .dash-l{background:var(--rose)}
  .dash-next{display:flex;flex-direction:column;gap:2px;background:rgba(255,255,255,.12);border-radius:12px;padding:10px 12px;width:100%}
  .dash-next b{font-size:17px}.dash-ga{font-size:19px}
  .dash-g .btn.ghost{background:transparent;color:var(--white);border-color:var(--white)}
  .gpre h4{margin:0 0 6px}.gpre .gmod{margin-top:4px}
  @media (max-width:820px){
    .gps-route{grid-template-columns:minmax(0,1fr);gap:0}
    .gline{height:18px;width:0;border-top:0;border-left:3px dashed var(--lime);margin:0 0 0 24px}
    .gtwo,.dash-gl{grid-template-columns:minmax(0,1fr)}
    .gtasks li{grid-template-columns:30px minmax(0,1fr)}.ga{grid-column:1/-1;justify-content:flex-start}
    .gdays{grid-template-columns:repeat(4,minmax(0,1fr))}
    .lab-bar{grid-template-columns:90px minmax(0,1fr) 40px}
    .lab-cb{grid-template-columns:22px minmax(0,1fr) auto}.lab-cb small{display:none}
  }`;
  const el = document.createElement("style");
  el.textContent = css;
  document.head.appendChild(el);
})();
