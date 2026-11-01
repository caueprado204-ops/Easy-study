// Cartões das matérias no Painel: cor forte em degradê, ícone pequeno no canto, nome e uma frase.
// Estáticos (sem animação). Usados em "Minhas matérias".
(function () {
  const M = {
    "Biologia": { g: ["#4ADE80", "#15803D"], sh: "rgba(22,163,74,.38)", d: "Células, genética, corpo humano e ecologia" },
    "Química": { g: ["#C084FC", "#7E22CE"], sh: "rgba(126,34,206,.36)", d: "Átomos, reações, soluções e química orgânica" },
    "Física": { g: ["#818CF8", "#4338CA"], sh: "rgba(67,56,202,.36)", d: "Movimento, energia, eletricidade e ondas" },
    "Matemática": { g: ["#3B82F6", "#1D4ED8"], sh: "rgba(29,78,216,.36)", d: "Funções, geometria, combinatória e estatística" },
    "Matemática Básica": { g: ["#22D3EE", "#0E7490"], sh: "rgba(14,116,144,.36)", d: "Frações, porcentagem e as contas do dia a dia" },
    "Linguagens": { g: ["#FB7185", "#E11D48"], sh: "rgba(225,29,72,.34)", d: "Interpretação, gramática e literatura" },
    "Redação": { g: ["#FBBF24", "#EA580C"], sh: "rgba(234,88,12,.34)", d: "As 5 competências do ENEM e a 2ª fase" },
    "História": { g: ["#45403C", "#1C1B1A"], sh: "rgba(28,27,26,.38)", d: "Do mundo antigo ao Brasil de hoje" },
    "Geografia": { g: ["#2DD4BF", "#0F766E"], sh: "rgba(15,118,110,.36)", d: "Mapas, clima, biomas e globalização" },
    "Filosofia e Sociologia": { g: ["#F472B6", "#BE185D"], sh: "rgba(190,24,93,.34)", d: "Grandes pensadores e a vida em sociedade" },
  };

  // ícones 48x48: peça clara com detalhe colorido, sombra dada pelo CSS
  const W = "#FFFFFF", L = "#E9E7F2";
  const I = {
    "Biologia": (c) => `<path d="M10 38 C8 20 22 8 40 8 C41 26 30 40 12 40 Z" fill="${W}"/><path d="M10 38 C8 20 22 8 40 8 C38 14 34 18 28 22 C22 26 15 31 10 38 Z" fill="${L}"/><path d="M12 38 C18 28 26 20 36 12" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M20 28 l-1 -7 M26 22 l-1 -6 M24 27 l6 1 M29 21 l5 1" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`,
    "Química": (c) => `<rect x="17" y="5" width="14" height="5" rx="2" fill="${W}"/><path d="M19 10 h10 v10 l10 18 a3 3 0 0 1 -2.6 4.5 h-24.8 a3 3 0 0 1 -2.6 -4.5 l10 -18 Z" fill="${W}"/><path d="M14.5 30 h19 l5.5 8.3 a3 3 0 0 1 -2.6 4.5 h-24.8 a3 3 0 0 1 -2.6 -4.5 Z" fill="#FDE047"/><circle cx="21" cy="36" r="2.4" fill="${W}"/><circle cx="28" cy="33" r="1.6" fill="${W}"/>`,
    "Física": (c) => `<g fill="none" stroke="${W}" stroke-width="3"><ellipse cx="24" cy="24" rx="19" ry="7.5"/><ellipse cx="24" cy="24" rx="19" ry="7.5" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="19" ry="7.5" transform="rotate(-60 24 24)"/></g><circle cx="24" cy="24" r="5.5" fill="#FDE047"/><circle cx="43" cy="24" r="2.6" fill="${W}"/>`,
    "Matemática": (c) => `<rect x="6" y="6" width="36" height="36" rx="10" fill="${W}"/><path d="M6 30 h36 v2 a10 10 0 0 1 -10 10 h-16 a10 10 0 0 1 -10 -10 Z" fill="${L}"/><path d="M14 17 h20 M20 17 v15 M28 17 v12 a3 3 0 0 0 5 2" stroke="${c}" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    "Matemática Básica": (c) => `<rect x="5" y="5" width="17" height="17" rx="5" fill="${W}"/><rect x="26" y="5" width="17" height="17" rx="5" fill="${W}"/><rect x="5" y="26" width="17" height="17" rx="5" fill="${W}"/><rect x="26" y="26" width="17" height="17" rx="5" fill="#FDE047"/><g stroke="${c}" stroke-width="2.6" stroke-linecap="round"><path d="M13.5 9.5 v8 M9.5 13.5 h8 M30.5 13.5 h8 M10.5 31 l6 6 M16.5 31 l-6 6 M30.5 34.5 h8"/></g><circle cx="34.5" cy="30.8" r="1.5" fill="${c}"/><circle cx="34.5" cy="38.2" r="1.5" fill="${c}"/>`,
    "Linguagens": (c) => `<path d="M8 6 h32 a4 4 0 0 1 4 4 v20 a4 4 0 0 1 -4 4 h-18 l-9 8 v-8 h-5 a4 4 0 0 1 -4 -4 v-20 a4 4 0 0 1 4 -4 Z" fill="${W}"/><text x="24" y="21" text-anchor="middle" dominant-baseline="central" font-family="Arial,sans-serif" font-weight="800" font-size="15" fill="${c}">Aa</text>`,
    "Redação": (c) => `<rect x="6" y="5" width="28" height="38" rx="4" fill="${W}"/><path d="M12 14 h16 M12 21 h16 M12 28 h10" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/><g transform="rotate(35 36 26)"><rect x="32" y="8" width="8" height="28" rx="1.5" fill="#FDE047"/><rect x="32" y="5" width="8" height="5" rx="1.5" fill="#FB7185"/><path d="M32 36 h8 l-4 8 Z" fill="${L}"/><path d="M34.6 41.2 h2.8 l-1.4 2.8 Z" fill="#1C1B1A"/></g>`,
    "História": (c) => `<rect x="8" y="6" width="32" height="6" rx="2" fill="#FF5B37"/><path d="M10 12 h28 l-2 4 h-24 Z" fill="${L}"/><rect x="13" y="16" width="22" height="20" fill="${W}"/><path d="M19 17 v18 M24 17 v18 M29 17 v18" stroke="${L}" stroke-width="2.4"/><rect x="10" y="36" width="28" height="4" rx="1" fill="${W}"/><rect x="7" y="40" width="34" height="4" rx="1.5" fill="${L}"/>`,
    "Geografia": (c) => `<circle cx="24" cy="24" r="19" fill="${W}"/><path d="M12 15 q6 -6 13 -3 q4 3 0 8 q-3 4 1 8 q2 5 -4 6 q-7 0 -8 -6 q-1 -5 -5 -7 Z" fill="${c}"/><path d="M30 28 q4 -3 8 0 q2 4 -1 8 q-4 3 -7 0 q-2 -4 0 -8 Z" fill="${c}" opacity=".75"/><path d="M5 24 h38" stroke="${L}" stroke-width="1.6"/><ellipse cx="24" cy="24" rx="8" ry="19" fill="none" stroke="${L}" stroke-width="1.6"/>`,
    "Filosofia e Sociologia": (c) => `<circle cx="24" cy="20" r="15" fill="#FDE047" opacity=".45"/><path d="M24 6 a12 12 0 0 1 7 21.7 v4.3 h-14 v-4.3 a12 12 0 0 1 7 -21.7 Z" fill="${W}"/><path d="M20 22 l4 4 l4 -4 M24 26 v6" stroke="${c}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="17" y="34" width="14" height="4" rx="2" fill="${L}"/><rect x="19" y="39" width="10" height="4" rx="2" fill="${L}"/>`,
  };

  const css = `
.subjects{gap:18px}
.scard{position:relative;border-radius:26px;padding:20px 20px 18px;color:#fff;display:flex;flex-direction:column;gap:6px;min-height:236px;overflow:hidden;
  background:linear-gradient(150deg,var(--g1),var(--g2));box-shadow:0 18px 34px -14px var(--sh),inset 0 1px 0 rgba(255,255,255,.28)}
.scard::before{content:"";position:absolute;inset:0;background:radial-gradient(120% 80% at 0% 0%,rgba(255,255,255,.22),transparent 55%);pointer-events:none}
.scard>*{position:relative}
.scard .sc-top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px}
.scard .sc-ic{width:52px;height:52px;filter:drop-shadow(0 6px 7px rgba(0,0,0,.28));flex:none}
.scard .sc-acc{font-size:12px;font-weight:600;background:rgba(255,255,255,.2);border-radius:999px;padding:3px 10px;white-space:nowrap}
.scard h3{font-size:19px;font-weight:800;line-height:1.2;color:#fff;margin:0}
.scard p{font-size:14px;line-height:1.4;color:rgba(255,255,255,.86);margin:0}
.scard .sc-bar{height:6px;border-radius:99px;background:rgba(255,255,255,.28);overflow:hidden;margin-top:auto}
.scard .sc-bar i{display:block;height:100%;background:#fff;border-radius:99px}
.scard .sc-foot{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-top:8px;font-size:12.5px;color:rgba(255,255,255,.9)}
.scard .sc-go{background:#fff;color:var(--g2);border:0;border-radius:12px;padding:7px 14px;font-weight:700;font-size:13px;box-shadow:0 4px 10px -4px rgba(0,0,0,.3)}
.scard .sc-go:hover{transform:translateY(-1px)}
.scard.sc-link{text-align:left;border:0;font:inherit;cursor:pointer;transition:transform .15s,box-shadow .15s}
.scard.sc-link:hover{transform:translateY(-3px);box-shadow:0 22px 38px -14px var(--sh),inset 0 1px 0 rgba(255,255,255,.28)}
.scard.sc-link:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.scard .sc-arrow{font-weight:700;font-size:13px;color:#fff}
.subj-grid{gap:18px}
@media (max-width:640px){.grid.subjects,.grid.subj-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  .scard{min-height:0;padding:14px 13px 13px;border-radius:20px;gap:4px}.scard .sc-top{margin-bottom:4px}
  .scard .sc-ic{width:38px;height:38px}.scard .sc-acc{display:none}.scard h3{font-size:15.5px}.scard p{font-size:12px;margin-bottom:8px}
  .scard .sc-foot{flex-direction:column;align-items:stretch;gap:8px;font-size:11.5px}.scard .sc-go{width:100%}}
`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  // cartão da aba Módulos: o cartão inteiro abre a matéria
  window.cartaoMateriaModulos = function (s, p) {
    const m = M[s] || { g: ["#6B6660", "#2B2927"], sh: "rgba(0,0,0,.3)", d: "" };
    const ic = I[s] ? `<svg class="sc-ic" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${I[s](m.g[1])}</svg>` : "";
    const pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
    return `<button class="scard sc-link" style="--g1:${m.g[0]};--g2:${m.g[1]};--sh:${m.sh}" data-subjopen="${esc(s)}">
      <div class="sc-top">${ic}<span class="sc-acc num">${p.total} módulos</span></div>
      <h3>${esc(s)}</h3><p>${m.d}</p>
      <div class="sc-bar" aria-hidden="true"><i style="width:${pct}%"></i></div>
      <div class="sc-foot"><span class="num">${p.done}/${p.total} concluídos</span><span class="sc-arrow" aria-hidden="true">Abrir →</span></div>
    </button>`;
  };

  // p = subjProgress(s); next = id do próximo módulo
  window.cartaoMateria = function (s, p, next) {
    const m = M[s] || { g: ["#6B6660", "#2B2927"], sh: "rgba(0,0,0,.3)", d: "" };
    const ic = I[s] ? `<svg class="sc-ic" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${I[s](m.g[1])}</svg>` : "";
    const pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
    return `<div class="scard" style="--g1:${m.g[0]};--g2:${m.g[1]};--sh:${m.sh}">
      <div class="sc-top">${ic}<span class="sc-acc num">${p.acc === null ? "sem questões" : p.acc + "% de acerto"}</span></div>
      <h3>${esc(s)}</h3><p>${m.d}</p>
      <div class="sc-bar" role="progressbar" aria-label="Progresso em ${esc(s)}" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>
      <div class="sc-foot"><span class="num">${p.done}/${p.total} módulos · ${p.qn} questões</span><button class="sc-go" data-mod="${next}">Continuar</button></div>
    </div>`;
  };
})();
