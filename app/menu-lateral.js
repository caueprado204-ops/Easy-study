// Menu lateral no celular: o painel de navegação (#nav) vira uma gaveta que abre pela esquerda.
// Abre pelo botão ☰ do topo, pela aba presa na borda esquerda ou deslizando o dedo a partir da borda.
// Fecha no X, tocando fora, com Esc, deslizando para a esquerda ou ao escolher uma seção.
// No computador nada muda: a barra lateral continua fixa.
(function () {
  const mq = matchMedia("(max-width:760px)");
  const nav = () => document.getElementById("nav");
  const aberto = () => document.body.classList.contains("nav-open");
  let volta = null;

  function marcar(v) { document.querySelectorAll("[data-menu]").forEach((b) => b.setAttribute("aria-expanded", v)); }
  function abrir(origem) {
    if (!mq.matches || aberto()) return;
    volta = origem || document.querySelector(".menu-btn");
    document.body.classList.add("nav-open"); marcar("true");
    const alvo = nav().querySelector("button.on") || nav().querySelector("[data-go]");
    setTimeout(() => alvo && alvo.focus({ preventScroll: true }), 60);
  }
  function fechar(focar) {
    if (!aberto()) return;
    document.body.classList.remove("nav-open"); marcar("false");
    if (focar && volta && volta.offsetParent) volta.focus({ preventScroll: true });
  }
  window.abrirMenu = abrir; window.fecharMenu = fechar;

  document.addEventListener("click", (e) => {
    const m = e.target.closest("[data-menu]");
    if (m) { e.preventDefault(); aberto() ? fechar(true) : abrir(m); return; }
    if (e.target.closest("[data-navclose]")) { e.preventDefault(); fechar(true); return; }
  });
  // fase de captura: o go() reconstrói o #nav antes que um ouvinte comum veja o clique
  document.addEventListener("click", (e) => { if (aberto() && e.target.closest("#nav [data-go], #nav [data-logout]")) fechar(false); }, true);

  document.addEventListener("keydown", (e) => {
    if (!aberto()) return;
    if (e.key === "Escape") { fechar(true); return; }
    if (e.key === "Tab") { // mantém o foco dentro da gaveta
      const f = [...nav().querySelectorAll("button")]; if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  // gesto: puxar da borda esquerda abre; arrastar a gaveta para a esquerda fecha
  let x0 = null, y0 = 0, modo = null;
  document.addEventListener("touchstart", (e) => {
    if (!mq.matches || e.touches.length !== 1) return;
    const t = e.touches[0];
    if (!aberto() && t.clientX <= 22 && !document.getElementById("app")?.hidden) modo = "abrir";
    else if (aberto()) modo = "fechar"; else return;
    x0 = t.clientX; y0 = t.clientY;
  }, { passive: true });
  document.addEventListener("touchmove", (e) => {
    if (x0 === null) return;
    const t = e.touches[0], dx = t.clientX - x0, dy = Math.abs(t.clientY - y0);
    if (dy > 40 && dy > Math.abs(dx)) { x0 = null; return; }
    if (modo === "abrir" && dx > 50) { x0 = null; abrir(); }
    else if (modo === "fechar" && dx < -50) { x0 = null; fechar(false); }
  }, { passive: true });
  document.addEventListener("touchend", () => { x0 = null; }, { passive: true });

  mq.addEventListener ? mq.addEventListener("change", () => fechar(false)) : mq.addListener(() => fechar(false));
})();
