// Pop-up de novidade: Simulado TRI (nota no padrão ENEM com parâmetros oficiais do INEP).
// Aparece uma vez por abertura da plataforma, de 27/11 até 10/12/2026, e some de vez depois que o aluno faz o primeiro Simulado TRI.
// Usa globais do app: S, go e abrirSimuladoTRI (de app/simulado-tri.js).
(function () {
  const DESDE = new Date("2026-11-27T00:00:00-03:00"); // junto com o lançamento do Simulado TRI
  const ATE = new Date("2026-12-11T00:00:00-03:00"); // último dia: 10/12, horário de Brasília
  const JA_FEZ = () => typeof S !== "undefined" && S && S.tri && (S.tri.hist || []).length > 0;
  const LIBERADO = () => (window.triAtivo ? window.triAtivo() : Date.now() >= DESDE.getTime());
  let mostrado = false;
  const visto = () => mostrado || !LIBERADO() || Date.now() >= ATE.getTime() || JA_FEZ();
  const STAR = (c, s, pos, delay) => `<svg class="nv-st" style="width:${s}px;height:${s}px;${pos};animation-delay:${delay}s" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 0C22 14 26 18 40 20 26 22 22 26 20 40 18 26 14 22 0 20 14 18 18 14 20 0z" fill="${c}"/></svg>`;

  const css = `
.nv-ov{position:fixed;inset:0;z-index:80;background:rgba(28,27,26,.55);display:flex;align-items:center;justify-content:center;padding:20px 14px;overflow-y:auto}
.nv-pp{position:relative;width:100%;max-width:380px;margin:auto;background:var(--cream);border:1.5px solid var(--line);border-radius:22px;overflow:hidden;font-family:var(--body);color:var(--ink);animation:nv-pop .6s cubic-bezier(.2,1.4,.4,1) both,nv-halo 2.4s ease-in-out .6s infinite}
@keyframes nv-pop{from{transform:scale(.85);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes nv-halo{0%,100%{box-shadow:0 0 0 3px rgba(223,242,75,.35),0 0 18px 2px rgba(223,242,75,.25)}50%{box-shadow:0 0 0 5px rgba(223,242,75,.7),0 0 34px 8px rgba(223,242,75,.45)}}
.nv-hd{background:var(--violet);padding:22px 20px 18px;position:relative;border-bottom:1.5px solid var(--line);overflow:hidden}
.nv-hd::after,.nv-b1::after{content:"";position:absolute;top:-50%;left:-60%;width:40%;height:200%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:rotate(12deg);animation:nv-sweep 2.6s ease-in-out infinite;pointer-events:none}
.nv-b1::after{animation-delay:1.3s}
@keyframes nv-sweep{0%{left:-60%}55%,100%{left:130%}}
.nv-tg{display:inline-block;background:var(--lime);border:1.5px solid var(--line);border-radius:999px;padding:2px 10px;font-size:12px;font-weight:700;letter-spacing:.04em}
.nv-tt{font-family:var(--display);font-weight:900;text-transform:uppercase;color:#fff;font-size:30px;line-height:1.02;margin:12px 0 0}
.nv-tt em{font-style:normal;color:var(--lime);text-shadow:0 0 12px rgba(223,242,75,.9);animation:nv-txt 1.8s ease-in-out infinite}
@keyframes nv-txt{50%{text-shadow:0 0 22px rgba(223,242,75,1),0 0 4px #fff}}
.nv-sb{color:#DCD8FF;font-size:13.5px;margin:8px 0 0;max-width:30ch;line-height:1.4}
.nv-st{position:absolute;animation:nv-tw 1.6s ease-in-out infinite}
@keyframes nv-tw{0%,100%{transform:scale(.6) rotate(0);opacity:.5}50%{transform:scale(1.15) rotate(25deg);opacity:1}}
.nv-rg{margin:14px 0 0;background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.35);border-radius:14px;padding:10px 12px 8px}
.nv-rg svg{display:block;width:100%;height:46px}
.nv-rg small{display:flex;justify-content:space-between;color:#C9C4FF;font-size:11.5px;margin-top:2px}
.nv-gr{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:16px 20px 4px}
.nv-tl{border:1.5px solid var(--line);border-radius:14px;padding:10px 12px}
.nv-n{font-family:var(--display);font-weight:900;font-size:26px;line-height:1}
.nv-l{font-size:12.5px;margin-top:4px;line-height:1.3}
.nv-ez{grid-column:1/-1;display:flex;align-items:center;gap:10px;background:var(--lav)}
.nv-av{flex:none;width:34px;height:34px;border-radius:50%;background:var(--violet);border:1.5px solid var(--line);display:grid;place-items:center;font-family:var(--display);font-weight:900;color:var(--lime);font-size:16px}
.nv-bd{padding:10px 20px 0;font-size:14px;line-height:1.5;color:#3d3a36;margin:0}
.nv-ac{display:flex;flex-direction:column;gap:8px;padding:16px 20px 20px}
.nv-b1,.nv-b3{position:relative;overflow:hidden;border:1.5px solid var(--line);border-radius:999px;padding:12px;font-family:var(--display);font-weight:800;text-transform:uppercase;font-size:14px;letter-spacing:.02em;cursor:pointer}
.nv-b1{background:var(--orange);color:#fff}
.nv-b3{background:#fff;color:var(--ink)}
.nv-b2{background:transparent;border:0;color:var(--muted);font-size:13.5px;font-weight:500;padding:4px;cursor:pointer}
.nv-x{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;background:#fff;border:1.5px solid var(--line);display:grid;place-items:center;font-size:18px;line-height:1;color:var(--ink);z-index:2;cursor:pointer}
@media (prefers-reduced-motion:reduce){.nv-pp,.nv-hd::after,.nv-b1::after,.nv-tt em,.nv-st{animation:none!important}.nv-hd::after,.nv-b1::after{display:none}}`;

  // régua decorativa: bolinhas = questões em ordem de dificuldade, faixa = o aluno
  function regua() {
    const xs = [14, 40, 62, 88, 108, 132, 150, 176, 198, 222, 246, 266, 290, 312];
    const cor = (i) => (i < 8 ? "#1F9D57" : i === 9 || i === 11 ? "#1F9D57" : "#E2412B");
    return `<svg viewBox="0 0 326 46" preserveAspectRatio="none" aria-hidden="true">
      <rect x="168" y="2" width="58" height="42" rx="10" fill="#DFF24B" opacity=".22"/>
      <line x1="4" y1="23" x2="322" y2="23" stroke="#fff" stroke-width="1.5" opacity=".6"/>
      <line x1="197" y1="0" x2="197" y2="46" stroke="#DFF24B" stroke-width="3"/>
      ${xs.map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 31 : 15}" r="6.5" fill="${cor(i)}" stroke="#1C1B1A" stroke-width="1.2"/>`).join("")}
    </svg><small><span>mais fácil</span><span>você</span><span>mais difícil</span></small>`;
  }

  function fechar() {
    mostrado = true;
    document.getElementById("nvTriOv")?.remove();
    document.removeEventListener("keydown", esc);
  }
  function esc(e) { if (e.key === "Escape") fechar(); }

  function abrir(forcar) {
    if ((!forcar && visto()) || document.getElementById("nvTriOv")) return;
    mostrado = true;
    if (!document.getElementById("nvTriCss")) {
      const st = document.createElement("style"); st.id = "nvTriCss"; st.textContent = css; document.head.appendChild(st);
    }
    const ov = document.createElement("div");
    ov.id = "nvTriOv"; ov.className = "nv-ov";
    ov.innerHTML = `<div class="nv-pp" role="dialog" aria-modal="true" aria-labelledby="nvTriT">
      <div class="nv-hd">
        ${STAR("#DFF24B", 30, "right:58px;top:16px", 0)}${STAR("#FF44C9", 18, "right:24px;top:64px", 0.5)}${STAR("#FFFFFF", 14, "right:112px;top:70px", 1)}${STAR("#FFD966", 12, "right:150px;top:22px", 0.25)}
        <button class="nv-x" data-nv="fechar" aria-label="Fechar">×</button>
        <span class="nv-tg">NOVIDADE NOS SIMULADOS</span>
        <p class="nv-tt" id="nvTriT">Simulado<br><em>TRI</em></p>
        <p class="nv-sb">Sua nota calculada do jeito do ENEM — não só quantas você acertou.</p>
        <div class="nv-rg">${regua()}</div>
      </div>
      <div class="nv-gr">
        <div class="nv-tl" style="background:var(--lime)"><div class="nv-n">4</div><div class="nv-l">áreas para escolher, 15 questões cada</div></div>
        <div class="nv-tl" style="background:var(--rose)"><div class="nv-n">100%</div><div class="nv-l">questões reais do ENEM, 2016 a 2023</div></div>
        <div class="nv-tl nv-ez"><span class="nv-av" aria-hidden="true">E</span><div><div style="font-weight:700;font-size:14px">A Easier explica cada questão</div><div class="nv-l" style="margin:0">Correção comentada no final, sem gastar seus usos</div></div></div>
      </div>
      <p class="nv-bd">A nota usa os parâmetros oficiais que o INEP divulga para cada questão. Acertar as fáceis e errar as difíceis vale mais do que o contrário — e você vê o porquê.</p>
      <div class="nv-ac">
        <button class="nv-b1" data-nv="fazer">Fazer meu Simulado TRI</button>
        <button class="nv-b3" data-nv="como">Como a TRI calcula</button>
        <button class="nv-b2" data-nv="fechar">Ver depois</button>
      </div></div>`;
    ov.addEventListener("click", (e) => {
      const b = e.target.closest("[data-nv]");
      if (!b) { if (e.target === ov) fechar(); return; }
      e.stopPropagation();
      const a = b.dataset.nv;
      fechar();
      if (a === "fazer" || a === "como") {
        if (window.abrirSimuladoTRI) window.abrirSimuladoTRI(a === "como" ? "como" : null);
        else if (typeof go === "function") go("simulados");
      }
    });
    document.body.appendChild(ov);
    document.addEventListener("keydown", esc);
    ov.querySelector(".nv-b1")?.focus({ preventScroll: true });
  }
  window.abrirNovidadeTRI = () => abrir(true);

  // abre quando a plataforma (não a landing) estiver visível
  function talvez() {
    const app = document.getElementById("app");
    if (app && !app.hidden && !visto()) setTimeout(() => { if (!app.hidden) abrir(); }, 900);
  }
  function iniciar() {
    const app = document.getElementById("app"); if (!app) return;
    new MutationObserver(talvez).observe(app, { attributes: true, attributeFilter: ["hidden"] });
    talvez();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
