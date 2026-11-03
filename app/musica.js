// Música no Foco: player do Spotify dentro da página (API oficial de incorporação) e sons de foco
// gerados no próprio navegador (Web Audio). O player fica num "mini player" fixo, fora do conteúdo
// que é redesenhado, para a música não parar quando o aluno troca de aba do app.
// Usa globais do app: S, save, render, esc, toast, VIEW.
(function () {
  const SUGESTOES = [
    { n: "Lo-fi beats", d: "batidas tranquilas para estudar", uri: "spotify:playlist:37i9dQZF1DWWQRwui0ExPn", c: "var(--lilac)" },
    { n: "Deep Focus", d: "instrumental para concentração", uri: "spotify:playlist:37i9dQZF1DWZeKCadgRdKQ", c: "var(--sky)" },
    { n: "Peaceful Piano", d: "piano calmo", uri: "spotify:playlist:37i9dQZF1DX4sWSpwq3LiO", c: "var(--butter)" },
  ];
  const SONS = [
    { k: "chuva", n: "Chuva", ic: "🌧️" },
    { k: "ondas", n: "Ondas do mar", ic: "🌊" },
    { k: "lareira", n: "Lareira", ic: "🔥" },
    { k: "branco", n: "Ruído branco", ic: "⚪" },
    { k: "marrom", n: "Ruído marrom", ic: "🟤" },
  ];

  const cfg = () => {
    const m = (S.musica = S.musica || {});
    if (m.sync === undefined) m.sync = true;
    m.vol = m.vol || {};
    if (!m.uri && S.spotify) m.uri = paraUri(S.spotify) || "";
    return m;
  };

  // link do Spotify -> URI (spotify:playlist:ID)
  function paraUri(u) {
    u = String(u || "").trim();
    if (/^spotify:(playlist|album|track|artist|episode|show):[A-Za-z0-9]+$/.test(u)) return u;
    const m = u.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?(playlist|album|track|artist|episode|show)\/([A-Za-z0-9]+)/);
    return m ? `spotify:${m[1]}:${m[2]}` : null;
  }
  window.musicaParaUri = paraUri;

  /* ---------------- Spotify (iFrame API) ---------------- */
  let api = null, ctrl = null, carregandoApi = false, pendente = null, tocando = false, iniciou = false, minimizado = false;
  function dock() {
    let d = document.getElementById("mpDock");
    if (d) return d;
    d = document.createElement("div");
    d.id = "mpDock";
    d.className = "mp-dock";
    d.hidden = true;
    d.innerHTML = `<div class="mp-head"><span class="mp-dot"></span><b>Música</b><span class="mp-st" id="mpSt">carregando…</span>
      <button class="mp-b" data-mpmin aria-label="Minimizar o player" title="Minimizar">–</button><button class="mp-b" data-mpclose aria-label="Fechar o player" title="Fechar">×</button></div>
      <div class="mp-frame"><div id="mpEmbed"></div></div>`;
    document.body.appendChild(d);
    return d;
  }
  function status(t) { const el = document.getElementById("mpSt"); if (el) el.textContent = t; }
  function carregarApi(cb) {
    if (api) return cb(api);
    pendente = cb;
    if (carregandoApi) return;
    carregandoApi = true;
    window.onSpotifyIframeApiReady = (IFrameAPI) => { api = IFrameAPI; const f = pendente; pendente = null; f && f(api); };
    const s = document.createElement("script");
    s.src = "https://open.spotify.com/embed/iframe-api/v1";
    s.async = true;
    s.onerror = () => { carregandoApi = false; status("não carregou"); toast("Não foi possível carregar o Spotify. Confira sua internet."); };
    document.body.appendChild(s);
  }
  function abrir(uri, tocar) {
    const d = dock();
    d.hidden = false; d.classList.remove("min"); minimizado = false;
    cfg().uri = uri; save();
    if (ctrl) { ctrl.loadUri(uri); iniciou = false; if (tocar) setTimeout(() => play(), 600); pintar(); return; }
    status("carregando…");
    carregarApi((A) => {
      A.createController(document.getElementById("mpEmbed"), { uri, width: "100%", height: innerWidth <= 760 ? 80 : 152 }, (c) => {
        ctrl = c;
        c.addListener("ready", () => { status("pronto"); if (tocar) play(); });
        c.addListener("playback_update", (e) => {
          const p = e && e.data; if (!p) return;
          tocando = !p.isPaused;
          if (tocando) iniciou = true;
          status(p.isPaused ? "pausado" : "tocando");
          d.classList.toggle("on", tocando);
          pintar();
        });
      });
    });
    pintar();
  }
  function play() { if (!ctrl) return; iniciou ? ctrl.resume() : ctrl.play(); }
  function pause() { if (ctrl && tocando) ctrl.pause(); }
  window.musicaFechar = () => {
    if (ctrl) { try { ctrl.destroy(); } catch (e) {} ctrl = null; }
    tocando = false; iniciou = false;
    const d = document.getElementById("mpDock");
    if (d) { d.hidden = true; d.innerHTML = ""; d.remove(); }
    pintar();
  };

  /* ---------------- Sons de foco (Web Audio) ---------------- */
  let ac = null, master = null;
  const fontes = {}; // k -> {gain, stop}
  function ctx() {
    if (!ac) {
      const A = window.AudioContext || window.webkitAudioContext;
      if (!A) return null;
      ac = new A();
      master = ac.createGain(); master.gain.value = 1; master.connect(ac.destination);
    }
    if (ac.state === "suspended") ac.resume();
    return ac;
  }
  function ruido(tipo, seg = 4) {
    const n = ac.sampleRate * seg, b = ac.createBuffer(1, n, ac.sampleRate), x = b.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      if (tipo === "branco") x[i] = w * 0.5;
      else if (tipo === "rosa") {
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
        x[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      } else { last = (last + 0.02 * w) / 1.02; x[i] = last * 3.5; }
    }
    const s = ac.createBufferSource(); s.buffer = b; s.loop = true; return s;
  }
  function criarSom(k) {
    const g = ac.createGain(); g.gain.value = 0; g.connect(master);
    const nos = [], timers = [];
    const liga = (src, ...chain) => { let a = src; chain.forEach((n) => { a.connect(n); a = n; }); a.connect(g); nos.push(src, ...chain); };
    if (k === "branco") { const s = ruido("branco"); liga(s); s.start(); }
    if (k === "marrom") { const s = ruido("marrom"); liga(s); s.start(); }
    if (k === "chuva") {
      const s = ruido("rosa"), hp = ac.createBiquadFilter(), lp = ac.createBiquadFilter();
      hp.type = "highpass"; hp.frequency.value = 500; lp.type = "lowpass"; lp.frequency.value = 7000;
      liga(s, hp, lp); s.start();
      // gotas: pequenos estalos agudos aleatórios
      const gotas = () => { if (!fontes[k]) return; const t = ac.currentTime, b = ruido("branco", 0.03), f = ac.createBiquadFilter(), e = ac.createGain();
        f.type = "bandpass"; f.frequency.value = 2500 + Math.random() * 3000; e.gain.setValueAtTime(0.25 * Math.random(), t); e.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        b.loop = false; b.connect(f); f.connect(e); e.connect(g); b.start(t); b.stop(t + 0.04); timers.push(setTimeout(gotas, 20 + Math.random() * 90)); };
      timers.push(setTimeout(gotas, 50));
    }
    if (k === "ondas") {
      const s = ruido("marrom"), lp = ac.createBiquadFilter(), am = ac.createGain(), lfo = ac.createOscillator(), lg = ac.createGain();
      lp.type = "lowpass"; lp.frequency.value = 1200; am.gain.value = 0.55; lfo.frequency.value = 0.09; lg.gain.value = 0.45;
      lfo.connect(lg); lg.connect(am.gain); lfo.start(); liga(s, lp, am); s.start(); nos.push(lfo);
    }
    if (k === "lareira") {
      const s = ruido("marrom"), lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 600; liga(s, lp); s.start();
      const estalo = () => { if (!fontes[k]) return; const t = ac.currentTime, b = ruido("branco", 0.02), f = ac.createBiquadFilter(), e = ac.createGain();
        f.type = "highpass"; f.frequency.value = 1500; e.gain.setValueAtTime(0.15 + Math.random() * 0.5, t); e.gain.exponentialRampToValueAtTime(0.001, t + 0.015 + Math.random() * 0.03);
        b.loop = false; b.connect(f); f.connect(e); e.connect(g); b.start(t); b.stop(t + 0.06); timers.push(setTimeout(estalo, 60 + Math.random() * (Math.random() < 0.2 ? 900 : 260))); };
      timers.push(setTimeout(estalo, 100));
    }
    return { g, stop: () => { timers.forEach(clearTimeout); nos.forEach((n) => { try { n.stop && n.stop(); } catch (e) {} try { n.disconnect(); } catch (e) {} }); try { g.disconnect(); } catch (e) {} } };
  }
  function volumeDe(k) { const v = cfg().vol[k]; return v === undefined ? 0.5 : v; }
  function ligarSom(k) {
    if (!ctx()) { toast("Seu navegador não toca os sons de foco."); return; }
    if (fontes[k]) return;
    fontes[k] = { k };
    const s = criarSom(k);
    fontes[k] = s;
    s.g.gain.setTargetAtTime(volumeDe(k) * (k === "branco" ? 0.35 : 0.8), ac.currentTime, 0.4);
  }
  function desligarSom(k) {
    const s = fontes[k]; if (!s) return;
    delete fontes[k];
    if (s.g) { s.g.gain.setTargetAtTime(0, ac.currentTime, 0.25); setTimeout(() => s.stop(), 900); }
  }
  const algumSom = () => Object.keys(fontes).length > 0;

  /* ---------------- ligação com o timer ---------------- */
  let pausadoPeloTimer = { spotify: false, sons: false };
  window.musicaTimer = function (evento) {
    if (!cfg().sync) return;
    if (evento === "foco") {
      if (pausadoPeloTimer.spotify || (ctrl && !iniciou)) play();
      if (pausadoPeloTimer.sons && master) master.gain.setTargetAtTime(1, ac.currentTime, 0.4);
      pausadoPeloTimer = { spotify: false, sons: false };
    } else {
      if (tocando) { pause(); pausadoPeloTimer.spotify = true; }
      if (algumSom() && master) { master.gain.setTargetAtTime(0, ac.currentTime, 0.3); pausadoPeloTimer.sons = true; }
    }
  };

  /* ---------------- tela ---------------- */
  function pintar() {
    if (typeof VIEW !== "undefined" && VIEW === "foco") {
      const el = document.getElementById("musicaBox");
      if (el) el.outerHTML = window.musicaHTML();
    }
  }
  window.musicaHTML = function () {
    const m = cfg(), atual = m.uri;
    const sug = SUGESTOES.map((p) => `<div class="pl${atual === p.uri && ctrl ? " cur" : ""}"><span class="cv" style="background:${p.c}"></span><div><b>${p.n}</b><span class="small muted">${p.d}</span></div><button class="btn sm" data-mpplay="${p.uri}">${atual === p.uri && ctrl ? (tocando ? "Tocando" : "Tocar") : "Tocar aqui"}</button></div>`).join("");
    const minha = atual && !SUGESTOES.some((p) => p.uri === atual)
      ? `<div class="pl${ctrl ? " cur" : ""}"><span class="cv" style="background:var(--pink)"></span><div><b>Minha playlist</b><span class="small muted">${{ playlist: "sua playlist", album: "álbum", track: "música", artist: "artista", episode: "episódio", show: "podcast" }[atual.split(":")[1]] || "link"} do Spotify</span></div><button class="btn sm" data-mpplay="${esc(atual)}">${ctrl ? (tocando ? "Tocando" : "Tocar") : "Tocar aqui"}</button></div>` : "";
    return `<div id="musicaBox" class="spot">
      <div class="card" style="display:flex;align-items:center;gap:12px;background:var(--ink);color:var(--white)"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#1ED760"/><path d="M6.5 9.3c3.6-1.1 7.8-.8 11 1M7.2 12.4c3-.9 6.4-.6 9 .9M7.8 15.3c2.4-.6 4.9-.4 7 .7" stroke="#1C1B1A" stroke-width="1.8" stroke-linecap="round"/></svg>
        <div style="flex:1;min-width:0"><b>Spotify dentro do Easy Study</b><div class="small" style="opacity:.75">A música toca no player do canto da tela e continua enquanto você navega pelo app.</div></div></div>
      <label class="mp-sync"><input type="checkbox" id="mpSync" ${m.sync ? "checked" : ""}> <span><b>Tocar junto com o timer</b><br><span class="small muted">A música e os sons começam quando o foco começa e pausam no intervalo.</span></span></label>
      ${minha}${sug}
      <form class="card form" id="mpForm"><label>Tocar uma playlist sua<input id="mpURL" class="inp" placeholder="Cole o link: https://open.spotify.com/playlist/..." value=""></label><button class="btn sm ink" style="align-self:flex-start">Tocar aqui</button></form>
      <div class="card"><h3 style="font-size:16px;margin:0 0 4px">Sons de foco</h3><p class="small muted" style="margin:0 0 10px">Gerados pelo próprio site: tocam inteiros, sem login. Dá para misturar com a música.</p>
        <div class="sons">${SONS.map((s) => `<div class="som${fontes[s.k] ? " on" : ""}"><button class="som-b" data-som="${s.k}" aria-pressed="${!!fontes[s.k]}"><span aria-hidden="true">${s.ic}</span>${s.n}</button><input type="range" min="0" max="1" step="0.05" value="${volumeDe(s.k)}" data-somvol="${s.k}" aria-label="Volume de ${s.n}"></div>`).join("")}</div>
        ${algumSom() ? `<button class="btn sm ghost" data-somoff style="margin-top:10px">Desligar todos os sons</button>` : ""}</div>
      <p class="note" style="margin:0">Sem estar logado no Spotify neste navegador, ele toca só prévias de 30 segundos; entre pelo próprio player para ouvir as músicas inteiras. Em alguns celulares, é preciso tocar uma vez no play do player.</p>
    </div>`;
  };

  /* ---------------- eventos ---------------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-mpplay],[data-mpmin],[data-mpclose],[data-som],[data-somoff],.mp-dock.min .mp-head");
    if (!t) return;
    if (t.dataset.mpplay) { const u = t.dataset.mpplay; if (ctrl && cfg().uri === u) { tocando ? pause() : play(); } else abrir(u, true); return; }
    if (t.dataset.mpmin !== undefined) { e.stopPropagation(); const d = dock(); minimizado = !minimizado; d.classList.toggle("min", minimizado); return; }
    if (t.dataset.mpclose !== undefined) { e.stopPropagation(); window.musicaFechar(); return; }
    if (t.classList.contains("mp-head")) { const d = dock(); minimizado = false; d.classList.remove("min"); return; }
    if (t.dataset.som) { const k = t.dataset.som; fontes[k] ? desligarSom(k) : ligarSom(k); if (master && ac) master.gain.setTargetAtTime(1, ac.currentTime, 0.2); pausadoPeloTimer.sons = false; pintar(); return; }
    if (t.dataset.somoff !== undefined) { Object.keys(fontes).forEach(desligarSom); pintar(); return; }
  });
  document.addEventListener("input", (e) => {
    const k = e.target.dataset && e.target.dataset.somvol; if (!k) return;
    const v = +e.target.value; cfg().vol[k] = v; save();
    const s = fontes[k]; if (s && s.g) s.g.gain.setTargetAtTime(v * (k === "branco" ? 0.35 : 0.8), ac.currentTime, 0.1);
  });
  document.addEventListener("change", (e) => { if (e.target.id === "mpSync") { cfg().sync = e.target.checked; save(); } });
  document.addEventListener("submit", (e) => {
    if (e.target.id !== "mpForm") return;
    e.preventDefault(); e.stopPropagation();
    const u = paraUri(document.getElementById("mpURL").value);
    if (!u) { toast("Cole um link do Spotify (playlist, álbum ou música)."); return; }
    abrir(u, true); toast("Tocando no player do canto da tela");
  }, true);

  const css = `
.mp-dock{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));width:min(340px,calc(100vw - 32px));z-index:45;background:var(--ink);border-radius:18px;padding:8px;box-shadow:0 18px 40px -12px rgba(0,0,0,.45);transition:transform .25s}
.mp-head{display:flex;align-items:center;gap:8px;color:var(--white);padding:2px 4px 8px;font-size:13px}
.mp-head b{font-size:13px}.mp-st{opacity:.7;margin-right:auto}
.mp-dot{width:9px;height:9px;border-radius:50%;background:#1ED760;opacity:.5}
.mp-dock.on .mp-dot{opacity:1;animation:mp-pulse 1.4s ease-in-out infinite}
.mp-b{width:28px;height:28px;border-radius:8px;border:1.5px solid rgba(255,255,255,.3);background:transparent;color:var(--white);font-size:16px;line-height:1;cursor:pointer;padding:0}
.mp-b:hover{border-color:var(--white)}
.mp-frame{border-radius:12px;overflow:hidden;min-height:80px}
.mp-frame iframe{display:block;border:0}
.mp-dock.min{width:auto;cursor:pointer}.mp-dock.min .mp-frame{position:absolute;left:-9999px;top:0;width:300px}.mp-dock.min .mp-head{padding:2px 4px}
.mp-sync{display:flex;gap:10px;align-items:flex-start;border:1.5px solid var(--line);border-radius:16px;padding:10px 12px;background:var(--white);cursor:pointer}
.mp-sync input{margin-top:4px;width:18px;height:18px;flex:none}
.pl.cur{border-color:#1ED760;box-shadow:0 0 0 2px rgba(30,215,96,.25)}
.sons{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.som{border:1.5px solid var(--line);border-radius:14px;padding:8px;display:flex;flex-direction:column;gap:6px;background:var(--white)}
.som.on{background:var(--lime)}
.som-b{display:flex;gap:6px;align-items:center;background:transparent;border:0;font:inherit;font-weight:700;font-size:14px;padding:2px;text-align:left;cursor:pointer;color:var(--ink)}
.som input[type=range]{width:100%;accent-color:var(--violet)}
@keyframes mp-pulse{50%{transform:scale(1.4)}}
@media (max-width:760px){.mp-dock{bottom:calc(76px + env(safe-area-inset-bottom,0px));right:12px;width:min(340px,calc(100vw - 24px))}}
`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
})();
