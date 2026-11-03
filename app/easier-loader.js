// Animação de carregamento da Easier: mostra o que ela está fazendo, há quanto tempo
// e uma barra com o tempo estimado. A estimativa aprende com as últimas gerações do próprio aluno.
(function () {
  const TIPOS = {
    redacao: { est: 40, titulo: "A Easier está corrigindo sua redação", passos: ["Lendo sua redação", "Conferindo a norma-padrão (C1)", "Analisando tema e repertório (C2)", "Avaliando a argumentação (C3)", "Checando a coesão (C4)", "Avaliando a proposta de intervenção (C5)", "Calculando a nota final"] },
    disc: { est: 20, titulo: "A Easier está corrigindo suas respostas", passos: ["Lendo suas respostas", "Comparando com a resposta esperada", "Conferindo os critérios de cada item", "Calculando a nota", "Escrevendo os comentários"] },
    aula: { est: 35, titulo: "A Easier está preparando sua aula", passos: ["Organizando o conteúdo", "Escrevendo a explicação passo a passo", "Separando fórmulas e termos", "Preparando exemplos resolvidos", "Montando os exercícios"] },
    duvida: { est: 9, titulo: "A Easier está pensando na sua dúvida", passos: ["Lendo sua pergunta", "Consultando o conteúdo do módulo", "Escrevendo a resposta"] },
    explicar: { est: 9, titulo: "A Easier está explicando a questão", passos: ["Lendo a questão", "Conferindo o gabarito", "Escrevendo a explicação"] },
    cartas: { est: 15, titulo: "A Easier está criando suas cartas", passos: ["Escolhendo os conceitos principais", "Escrevendo as perguntas", "Escrevendo as respostas", "Revisando as cartas"] },
  };
  const ativos = {}; // chave -> { tipo, t0 }
  const HKEY = "ez_tempos_v1";
  let hist = {};
  try { hist = JSON.parse(localStorage.getItem(HKEY) || "{}") || {}; } catch (e) { hist = {}; }

  // tempo estimado: média das últimas gerações do aluno (quando houver), senão o padrão
  function estimativa(tipo) {
    const h = hist[tipo];
    if (Array.isArray(h) && h.length >= 2) {
      const m = h.reduce((a, b) => a + b, 0) / h.length;
      return Math.max(4, Math.min(120, m));
    }
    return (TIPOS[tipo] || TIPOS.duvida).est;
  }

  const css = `
.ezl{display:flex;gap:14px;align-items:center;border:1.5px solid var(--line);border-radius:18px;padding:14px 16px;background:var(--white);margin:10px 0;white-space:normal;max-width:100%;box-sizing:border-box}
.ezl-orb{position:relative;width:46px;height:46px;flex:none}
.ezl-orb i{position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg,var(--violet),var(--pink));box-shadow:0 6px 16px -6px var(--violet)}
.ezl-orb i::after{content:"";position:absolute;inset:9px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff,rgba(255,255,255,.15) 60%);opacity:.85}
.ezl-orb b,.ezl-orb em{position:absolute;inset:0;border-radius:50%;border:2px solid var(--violet);animation:ezl-ring 2s ease-out infinite;opacity:0}
.ezl-orb em{animation-delay:1s;border-color:var(--pink)}
.ezl-orb s{position:absolute;inset:-5px;border-radius:50%;animation:ezl-spin 1.6s linear infinite}
.ezl-orb s::before{content:"";position:absolute;top:0;left:50%;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:var(--lime);border:1.5px solid var(--ink)}
.ezl-txt{flex:1;min-width:0}
.ezl-tt{font-weight:700;font-size:15px;line-height:1.3}
.ezl-passo{font-size:13.5px;color:var(--muted);margin:2px 0 8px;min-height:1.3em}
.ezl-passo::after{content:"";display:inline-block;width:1.2em;text-align:left;animation:ezl-dots 1.2s steps(4) infinite}
.ezl-bar{height:8px;border-radius:99px;background:var(--hair);overflow:hidden;position:relative}
.ezl-bar i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,var(--violet),var(--pink));transition:width .4s linear;position:relative;overflow:hidden}
.ezl-bar i::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);transform:translateX(-100%);animation:ezl-shine 1.4s ease-in-out infinite}
.ezl-meta{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:12px;color:var(--muted);margin-top:6px}
.ezl-meta b{color:var(--ink);font-variant-numeric:tabular-nums}
.ez-writing{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);margin-top:8px}
.ez-writing i{width:8px;height:8px;border-radius:50%;background:var(--violet);animation:ezl-blink 1s ease-in-out infinite}
@keyframes ezl-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.7);opacity:0}}
@keyframes ezl-spin{to{transform:rotate(360deg)}}
@keyframes ezl-shine{to{transform:translateX(100%)}}
@keyframes ezl-blink{50%{opacity:.25}}
@keyframes ezl-dots{0%{content:""}25%{content:"."}50%{content:".."}75%{content:"..."}}
@media (prefers-reduced-motion:reduce){.ezl-orb b,.ezl-orb em{display:none}}
`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  const fmt = (s) => (s < 60 ? Math.round(s) + " s" : Math.floor(s / 60) + " min " + String(Math.round(s % 60)).padStart(2, "0") + " s");

  // começa a contar (chamar quando a Easier é acionada)
  window.ezStart = function (chave, tipo) {
    ativos[chave] = { tipo, t0: Date.now() };
  };
  // termina; ok=true guarda o tempo para melhorar a estimativa
  window.ezDone = function (chave, ok) {
    const a = ativos[chave];
    delete ativos[chave];
    if (!a || !ok) return;
    const s = (Date.now() - a.t0) / 1000;
    if (s < 1 || s > 300) return;
    const h = (hist[a.tipo] = (hist[a.tipo] || []).concat(s).slice(-6));
    try { localStorage.setItem(HKEY, JSON.stringify(hist)); } catch (e) {}
    return h;
  };
  window.ezAtivo = (chave) => !!ativos[chave];

  // HTML da animação (pode ser colocado em qualquer render; o relógio continua de onde parou)
  window.ezLoader = function (chave, tipo, titulo) {
    if (!ativos[chave]) ativos[chave] = { tipo, t0: Date.now() };
    const T = TIPOS[tipo] || TIPOS.duvida;
    return `<div class="ezl" data-ezl="${chave}" role="status" aria-live="polite">
      <div class="ezl-orb" aria-hidden="true"><b></b><em></em><s></s><i></i></div>
      <div class="ezl-txt"><div class="ezl-tt">${titulo || T.titulo}</div><div class="ezl-passo">${T.passos[0]}</div>
        <div class="ezl-bar" aria-hidden="true"><i></i></div>
        <div class="ezl-meta"><span>Tempo: <b class="ezl-t">0 s</b></span><span class="ezl-est">normalmente leva cerca de ${fmt(estimativa(tipo))}</span></div></div>
    </div>`;
  };

  // indicador discreto enquanto o texto vai aparecendo (aula, dúvida)
  window.ezWriting = (palavras) => `<div class="ez-writing"><i></i>A Easier está escrevendo${palavras ? ` · ${palavras} palavras` : ""}</div>`;

  function tick() {
    document.querySelectorAll("[data-ezl]").forEach((el) => {
      const a = ativos[el.dataset.ezl];
      if (!a) return;
      const T = TIPOS[a.tipo] || TIPOS.duvida;
      const est = estimativa(a.tipo);
      const s = (Date.now() - a.t0) / 1000;
      // avança rápido no começo e desacelera; nunca chega a 100% antes de terminar
      const p = Math.min(0.96, 1 - Math.exp(-1.7 * (s / est)));
      const bar = el.querySelector(".ezl-bar i");
      if (bar) bar.style.width = (p * 100).toFixed(1) + "%";
      const t = el.querySelector(".ezl-t");
      if (t) t.textContent = fmt(s);
      const passo = el.querySelector(".ezl-passo");
      const i = Math.min(T.passos.length - 1, Math.floor((s / est) * T.passos.length));
      if (passo && passo.textContent !== T.passos[i]) passo.textContent = T.passos[i];
      const e = el.querySelector(".ezl-est");
      if (e) e.textContent = s > est * 1.35 ? "está levando um pouco mais que o normal, já já fica pronto" : "normalmente leva cerca de " + fmt(est);
    });
  }
  setInterval(tick, 250);
})();
