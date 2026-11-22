// Pop-up de novidade: Unesp no banco de questões (1ª e 2ª fase). Aparece uma vez por aluno, ao entrar na plataforma.
// Usa globais do app (go, qMode, qf, rebuildQ, render, discClick).
(function () {
  const KEY = "es_novidade_unesp_v1";
  const visto = () => { try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; } };
  const marcar = () => { try { localStorage.setItem(KEY, "1"); } catch (e) {} };
  const STAR = (c, s, pos, delay) => `<svg class="nv-st" style="width:${s}px;height:${s}px;${pos};animation-delay:${delay}s" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 0C22 14 26 18 40 20 26 22 22 26 20 40 18 26 14 22 0 20 14 18 18 14 20 0z" fill="${c}"/></svg>`;

  const css = `
.nv-ov{position:fixed;inset:0;z-index:80;background:rgba(28,27,26,.55);display:flex;align-items:center;justify-content:center;padding:20px 14px;overflow-y:auto}
.nv-pp{position:relative;width:100%;max-width:360px;margin:auto;background:var(--cream);border:1.5px solid var(--line);border-radius:22px;overflow:hidden;font-family:var(--body);color:var(--ink);animation:nv-pop .6s cubic-bezier(.2,1.4,.4,1) both,nv-halo 2.4s ease-in-out .6s infinite}
@keyframes nv-pop{from{transform:scale(.85);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes nv-halo{0%,100%{box-shadow:0 0 0 3px rgba(223,242,75,.35),0 0 18px 2px rgba(223,242,75,.25)}50%{box-shadow:0 0 0 5px rgba(223,242,75,.7),0 0 34px 8px rgba(223,242,75,.45)}}
.nv-hd{background:var(--violet);padding:22px 20px 20px;position:relative;border-bottom:1.5px solid var(--line);overflow:hidden}
.nv-hd::after,.nv-b1::after{content:"";position:absolute;top:-50%;left:-60%;width:40%;height:200%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:rotate(12deg);animation:nv-sweep 2.6s ease-in-out infinite;pointer-events:none}
.nv-b1::after{animation-delay:1.3s}
@keyframes nv-sweep{0%{left:-60%}55%,100%{left:130%}}
.nv-tg{display:inline-block;background:var(--lime);border:1.5px solid var(--line);border-radius:999px;padding:2px 10px;font-size:12px;font-weight:700;letter-spacing:.04em}
.nv-tt{font-family:var(--display);font-weight:900;text-transform:uppercase;color:#fff;font-size:30px;line-height:1.02;margin:12px 0 0}
.nv-tt em{font-style:normal;color:var(--lime);text-shadow:0 0 12px rgba(223,242,75,.9);animation:nv-txt 1.8s ease-in-out infinite}
@keyframes nv-txt{50%{text-shadow:0 0 22px rgba(223,242,75,1),0 0 4px #fff}}
.nv-st{position:absolute;animation:nv-tw 1.6s ease-in-out infinite}
@keyframes nv-tw{0%,100%{transform:scale(.6) rotate(0);opacity:.5}50%{transform:scale(1.15) rotate(25deg);opacity:1}}
.nv-gr{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:16px 20px 4px}
.nv-tl{border:1.5px solid var(--line);border-radius:14px;padding:10px 12px}
.nv-n{font-family:var(--display);font-weight:900;font-size:26px;line-height:1}
.nv-l{font-size:12.5px;margin-top:4px;line-height:1.3}
.nv-bd{padding:10px 20px 0;font-size:14px;line-height:1.5;color:#3d3a36;margin:0}
.nv-ac{display:flex;flex-direction:column;gap:8px;padding:16px 20px 20px}
.nv-b1,.nv-b3{position:relative;overflow:hidden;border:1.5px solid var(--line);border-radius:999px;padding:12px;font-family:var(--display);font-weight:800;text-transform:uppercase;font-size:14px;letter-spacing:.02em;cursor:pointer}
.nv-b1{background:var(--orange);color:#fff}
.nv-b3{background:var(--white);color:var(--ink)}
.nv-b2{background:transparent;border:0;color:var(--muted);font-size:13.5px;font-weight:500;padding:4px;cursor:pointer}
.nv-x{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;background:#fff;border:1.5px solid var(--line);display:grid;place-items:center;font-size:18px;line-height:1;color:var(--ink);z-index:2;cursor:pointer}
@media (prefers-reduced-motion:reduce){.nv-pp,.nv-hd::after,.nv-b1::after,.nv-tt em,.nv-st{animation:none!important}.nv-hd::after,.nv-b1::after{display:none}}`;

  function contar() {
    const n1 = typeof Q !== "undefined" ? Q.filter((q) => q.v === "Unesp").length : 0;
    const n2 = (window.DISC || []).filter((d) => d.real).length;
    return { n1: n1 || 360, n2: n2 || 226 };
  }

  function fechar() {
    marcar();
    document.getElementById("nvOv")?.remove();
    document.removeEventListener("keydown", esc);
  }
  function esc(e) { if (e.key === "Escape") fechar(); }

  function abrir() {
    if (visto() || document.getElementById("nvOv")) return;
    if (!document.getElementById("nvCss")) {
      const st = document.createElement("style"); st.id = "nvCss"; st.textContent = css; document.head.appendChild(st);
    }
    const { n1, n2 } = contar();
    const ov = document.createElement("div");
    ov.id = "nvOv"; ov.className = "nv-ov";
    ov.innerHTML = `<div class="nv-pp" role="dialog" aria-modal="true" aria-labelledby="nvT">
      <div class="nv-hd">
        ${STAR("#DFF24B", 30, "right:58px;top:16px", 0)}${STAR("#FF44C9", 18, "right:26px;top:70px", 0.5)}${STAR("#FFFFFF", 14, "right:110px;top:84px", 1)}${STAR("#FFD966", 12, "right:150px;top:22px", 0.25)}
        <button class="nv-x" data-nv="fechar" aria-label="Fechar">×</button>
        <span class="nv-tg">NOVIDADE NO BANCO</span>
        <p class="nv-tt" id="nvT">A Unesp<br><em>chegou</em></p>
      </div>
      <div class="nv-gr">
        <div class="nv-tl" style="background:var(--lime)"><div class="nv-n">${n1}</div><div class="nv-l">questões da 1ª fase, 2023 a 2026</div></div>
        <div class="nv-tl" style="background:var(--rose)"><div class="nv-n">${n2}</div><div class="nv-l">dissertativas reais da 2ª fase</div></div>
        <div class="nv-tl" style="background:var(--ice);grid-column:1/-1;display:flex;align-items:center;gap:12px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg><div><div style="font-weight:700;font-size:14px">Simulado Estilo Unesp</div><div class="nv-l" style="margin:0">30 questões em 90 minutos</div></div></div>
      </div>
      <p class="nv-bd">1ª fase com gabarito oficial da Vunesp e figuras como no caderno. Na 2ª fase, você escreve e a Easier corrige como a banca.</p>
      <div class="nv-ac">
        <button class="nv-b1" data-nv="f1">Treinar a 1ª fase</button>
        <button class="nv-b3" data-nv="f2">Treinar a 2ª fase</button>
        <button class="nv-b2" data-nv="fechar">Ver depois</button>
      </div></div>`;
    ov.addEventListener("click", (e) => {
      const b = e.target.closest("[data-nv]");
      if (!b) { if (e.target === ov) fechar(); return; }
      e.stopPropagation();
      const a = b.dataset.nv;
      fechar();
      if (a === "f1") { qMode = "obj"; qf.v = "Unesp"; qf.s = "Todas"; qf.y = "Todos"; rebuildQ(); go("questoes"); }
      if (a === "f2") { qMode = "disc"; if (window.discClick) discClick({ discest: "Unesp" }); go("questoes"); }
    });
    document.body.appendChild(ov);
    document.addEventListener("keydown", esc);
    ov.querySelector(".nv-b1")?.focus({ preventScroll: true });
  }

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
