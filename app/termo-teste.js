// Termo de Participação no Teste (Easy Pro teste).
// Aparece antes de ativar o convite; o aceite (versão + data/hora) fica gravado no banco.
// Ao mudar o texto, suba a versão: quem aceitar depois fica registrado com a versão nova.
(function () {
  const VERSAO = "1.0";
  const DATA = "05/11/2026";

  const IC = {
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M4 16V5a1 1 0 0 1 1-1h11"/><path d="m3 3 18 18"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    ok: '<path d="M20 6 9 17l-5-5"/>',
  };
  const svg = (p, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

  const RESUMO = [
    ["lock", "Sigilo", "Nada de prints, gravações ou postagens sobre a plataforma sem autorização da equipe."],
    ["copy", "Sem cópias", "O conteúdo é protegido por direitos autorais. É para você estudar, não para copiar ou repassar."],
    ["shield", "Seus dados", "Usamos seus dados só para a plataforma funcionar e melhorar, conforme a LGPD."],
  ];

  const SECOES = [
    ["O que é o teste", [
      "Você foi convidado(a) para usar o <b>Easy Pro</b> de graça, em caráter de teste, para conhecer a plataforma e nos ajudar a melhorá-la com a sua opinião.",
      "O acesso é <b>gratuito, pessoal e intransferível</b>. O período de teste é definido pela equipe e pode ser prorrogado ou encerrado a qualquer momento, com aviso na plataforma. Não existe cobrança automática: quando o teste terminar, o acesso pago é encerrado e o seu progresso continua salvo na sua conta.",
      "Como a plataforma está em fase de testes, algumas funções podem mudar, ficar instáveis ou sair do ar sem aviso prévio.",
    ]],
    ["Confidencialidade", [
      "As telas, os conteúdos e as funções da plataforma que ainda não foram lançados ao público são <b>informações confidenciais</b>. Sem autorização prévia e por escrito da equipe (pelo e-mail <a href='mailto:easystudy.spacebr@gmail.com'>easystudy.spacebr@gmail.com</a>), você se compromete a <b>não</b>:",
      "<ul><li>tirar prints, gravar a tela ou fotografar a plataforma para compartilhar;</li><li>publicar imagens, vídeos ou textos da plataforma em redes sociais, grupos, sites ou aplicativos de mensagem;</li><li>descrever em detalhes funções que ainda não foram lançadas;</li><li>repassar o seu acesso ou o convite a outras pessoas.</li></ul>",
      "Você pode contar que está participando do teste. Quando a divulgação for liberada, a equipe avisa você. Este compromisso continua valendo depois do fim do teste, até o lançamento público ou até a equipe liberar a divulgação.",
    ]],
    ["Direitos autorais e uso do conteúdo", [
      "Os textos, módulos, resumos, explicações, figuras, questões comentadas, o design, a marca Easy Study, a Easier e o código da plataforma são protegidos pela <b>Lei de Direitos Autorais (Lei nº 9.610/1998)</b>, pela <b>Lei do Software (Lei nº 9.609/1998)</b> e pela <b>Lei de Propriedade Industrial (Lei nº 9.279/1996)</b>. As questões de vestibulares e do ENEM pertencem às suas respectivas bancas.",
      "Você pode usar tudo para <b>estudar</b> e fazer suas próprias anotações. Não é permitido copiar, reproduzir, plagiar, vender, distribuir, adaptar ou publicar o conteúdo, extrair dados em massa, fazer engenharia reversa ou usar a plataforma para criar um produto parecido.",
      "Violar direitos autorais é ilícito civil e pode ser crime (art. 184 do Código Penal).",
    ]],
    ["Sua conta", [
      "A conta é só sua: não compartilhe a sua senha. Use a plataforma de forma honesta e não tente burlar os limites de uso da Easier nem acessar áreas ou dados de outras pessoas.",
    ]],
    ["A Easier (inteligência artificial)", [
      "As respostas da Easier são geradas por inteligência artificial e <b>podem conter erros</b>. Confira as informações importantes com o material dos módulos e com seus professores. A Easier não substitui um professor, e as notas de redação e de questões dissertativas são estimativas para treino, não notas oficiais.",
      "Não envie à Easier dados pessoais sensíveis seus ou de outras pessoas.",
    ]],
    ["Seus dados pessoais (LGPD)", [
      "Tratamos seus dados conforme a <b>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</b> e o <b>Marco Civil da Internet (Lei nº 12.965/2014)</b>.",
      "<ul><li><b>O que guardamos:</b> nome, e-mail, perfil de estudos (curso, faculdade e vestibulares), progresso, respostas, redações e o uso da Easier.</li><li><b>Para quê:</b> fazer a plataforma funcionar, salvar seu progresso, personalizar seus estudos e melhorar o produto durante o teste.</li><li><b>Com quem:</b> só com os serviços necessários para a plataforma funcionar (hospedagem, banco de dados e o provedor de inteligência artificial que gera as respostas da Easier). <b>Não vendemos seus dados.</b></li></ul>",
      "Você pode pedir a qualquer momento para ver, corrigir ou apagar seus dados (art. 18 da LGPD), pelo e-mail <a href='mailto:easystudy.spacebr@gmail.com'>easystudy.spacebr@gmail.com</a>.",
    ]],
    ["Suas sugestões", [
      "As opiniões e sugestões que você enviar poderão ser usadas para melhorar a plataforma, sem que isso gere pagamento ou direitos sobre o produto. A equipe pode entrar em contato pelo seu e-mail para pedir a sua opinião sobre o teste.",
    ]],
    ["Menores de 18 anos", [
      "Se você tem menos de 18 anos, declara que seu pai, sua mãe ou seu responsável legal sabe da sua participação no teste e concorda com este termo.",
    ]],
    ["Se o termo não for cumprido", [
      "Se este termo for descumprido, a equipe pode suspender ou encerrar o seu acesso, sem prejuízo das medidas legais cabíveis, incluindo a reparação de danos prevista nos arts. 186 e 927 do Código Civil.",
    ]],
    ["Disposições gerais", [
      "Ao marcar a caixa de aceite e ativar o acesso, você concorda com este termo de forma eletrônica, com o mesmo valor de uma assinatura (Lei nº 14.063/2020 e MP nº 2.200-2/2001). Registramos a data, a hora e a versão do termo aceito.",
      "Este termo segue as leis brasileiras. Se houver alguma disputa, vale o foro do seu domicílio.",
      "Dúvidas, pedidos de autorização ou sobre os seus dados: <a href='mailto:easystudy.spacebr@gmail.com'>easystudy.spacebr@gmail.com</a>.",
    ]],
  ];

  const css = `
.tt-back{position:fixed;inset:0;z-index:90;background:rgba(20,16,48,.62);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:18px;animation:tt-in .2s ease}
.tt{width:min(640px,100%);max-height:min(88vh,860px);background:var(--panel,#FCF8F1);border-radius:28px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 30px 80px -20px rgba(20,10,80,.6);animation:tt-up .3s cubic-bezier(.2,.9,.3,1.15)}
.tt-hd{position:relative;padding:22px 24px 20px;color:#fff;background:linear-gradient(135deg,#2B1FD1 0%,var(--violet) 40%,#B13BEA 78%,var(--pink) 100%)}
.tt-hd small{display:inline-block;background:var(--lime);color:var(--ink);font-weight:700;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;border-radius:99px;padding:4px 11px}
.tt-hd h2{font-family:var(--display);font-weight:800;font-size:clamp(22px,4.6vw,28px);line-height:1.1;margin:10px 0 4px;letter-spacing:-.01em}
.tt-hd p{margin:0;font-size:13px;opacity:.85}
.tt-x{position:absolute;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;display:grid;place-items:center;cursor:pointer}
.tt-x:hover{background:rgba(255,255,255,.3)}
.tt-bd{overflow-y:auto;padding:18px 24px 8px;overscroll-behavior:contain}
.tt-res{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px}
.tt-res div{background:var(--white,#fff);border:1.5px solid var(--hair,#E6DED1);border-radius:18px;padding:12px}
.tt-res i{width:36px;height:36px;border-radius:12px;display:grid;place-items:center;margin-bottom:8px;background:var(--lime);color:var(--ink)}
.tt-res div:nth-child(2) i{background:var(--pink);color:#fff}
.tt-res div:nth-child(3) i{background:var(--violet);color:#fff}
.tt-res b{display:block;font-size:14px}
.tt-res span{font-size:12.5px;color:var(--muted);line-height:1.35}
.tt-sec{counter-increment:tts;border-top:1.5px solid var(--hair,#E6DED1);padding:14px 0}
.tt-sec h3{font-size:15.5px;margin:0 0 6px;display:flex;gap:10px;align-items:center}
.tt-sec h3::before{content:counter(tts);flex:none;width:24px;height:24px;border-radius:50%;background:var(--ink);color:var(--lime);font-size:12px;display:grid;place-items:center;font-family:var(--display);font-weight:800}
.tt-sec p,.tt-sec li{font-size:13.5px;line-height:1.55;color:#3b3833}
.tt-sec p{margin:6px 0}
.tt-sec a{color:var(--violet);font-weight:700;word-break:break-all}
.tt-sec ul{margin:6px 0;padding-left:20px}
.tt-sec li{margin:3px 0}
.tt-list{counter-reset:tts}
.tt-ver{font-size:12px;color:var(--muted);margin:4px 0 12px}
.tt-ft{padding:14px 24px 20px;border-top:1.5px solid var(--hair,#E6DED1);background:var(--white,#fff)}
.tt-ck{display:flex;gap:12px;align-items:flex-start;cursor:pointer;font-size:14px;line-height:1.4;user-select:none}
.tt-ck input{position:absolute;opacity:0;pointer-events:none}
.tt-ck .bx{flex:none;width:26px;height:26px;border-radius:8px;border:2px solid var(--ink);display:grid;place-items:center;background:#fff;transition:.15s;margin-top:-1px}
.tt-ck .bx svg{opacity:0;transform:scale(.5);transition:.15s}
.tt-ck input:checked+.bx{background:var(--violet);border-color:var(--violet);color:#fff}
.tt-ck input:checked+.bx svg{opacity:1;transform:none}
.tt-ck input:focus-visible+.bx{outline:3px solid var(--lilac,#C8B2FF);outline-offset:2px}
.tt-go{margin-top:14px;width:100%;border:0;border-radius:99px;padding:15px 20px;font:inherit;font-weight:700;font-size:16px;cursor:pointer;background:linear-gradient(90deg,var(--violet),#B13BEA 60%,var(--pink));color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 10px 24px -12px var(--violet);transition:transform .15s,opacity .15s}
.tt-go:hover:not(:disabled){transform:translateY(-1px)}
.tt-go:disabled{background:var(--hair,#E6DED1);color:var(--muted);box-shadow:none;cursor:not-allowed}
.tt-msg{font-size:13px;margin-top:8px;text-align:center}
.tt-ro{font-size:12.5px;color:var(--muted);text-align:center}
@keyframes tt-in{from{opacity:0}}
@keyframes tt-up{from{opacity:0;transform:translateY(30px) scale(.97)}}
@media (max-width:560px){.tt-back{padding:0;align-items:flex-end}.tt{max-height:92vh;border-radius:26px 26px 0 0}.tt-res{grid-template-columns:1fr}.tt-res div{display:grid;grid-template-columns:36px 1fr;gap:2px 12px;align-items:center}.tt-res i{grid-row:span 2;margin:0}.tt-bd{padding:16px 18px 6px}.tt-ft{padding:14px 18px 18px}.tt-hd{padding:20px 18px 18px}}
@media (prefers-reduced-motion:reduce){.tt-back,.tt{animation:none}}
`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  function html(somenteLeitura, aceitoEm) {
    return `<div class="tt-back" data-tt-fundo><div class="tt" role="dialog" aria-modal="true" aria-labelledby="ttTitulo">
      <div class="tt-hd"><small>Easy Pro teste</small><h2 id="ttTitulo">Termo de participação no teste</h2><p>Leia com atenção antes de ativar. Leva uns 3 minutos.</p>
        <button class="tt-x" data-tt-fechar aria-label="Fechar">${svg(IC.x, 18)}</button></div>
      <div class="tt-bd">
        <div class="tt-res">${RESUMO.map(([i, t, d]) => `<div><i>${svg(IC[i], 20)}</i><b>${t}</b><span>${d}</span></div>`).join("")}</div>
        <div class="tt-list">${SECOES.map(([t, ps]) => `<section class="tt-sec"><h3>${t}</h3>${ps.map((p) => (p.startsWith("<ul") ? p : `<p>${p}</p>`)).join("")}</section>`).join("")}</div>
        <p class="tt-ver">Versão ${VERSAO} · ${DATA}</p>
      </div>
      <div class="tt-ft">${somenteLeitura
        ? `<p class="tt-ro">${aceitoEm ? "Você aceitou este termo em " + aceitoEm + "." : "Você aceitou este termo ao ativar o seu acesso."}</p>`
        : `<label class="tt-ck"><input type="checkbox" id="ttAceite"><span class="bx">${svg(IC.ok, 16)}</span><span>Li e concordo com o <b>Termo de participação no teste</b>, incluindo o sigilo, a proteção do conteúdo e o uso dos meus dados descritos acima.</span></label>
        <button class="tt-go" data-tt-ativar disabled>Concordar e ativar meu acesso</button><div class="tt-msg" id="ttMsg" role="status"></div>`}</div>
    </div></div>`;
  }

  let aberto = null, onAtivar = null, focoAntes = null;
  function fechar() {
    if (!aberto) return;
    aberto.remove(); aberto = null; document.body.style.overflow = "";
    try { focoAntes?.focus(); } catch (e) {}
  }
  window.termoTeste = {
    versao: VERSAO,
    abrir(opcoes = {}) {
      fechar();
      focoAntes = document.activeElement;
      onAtivar = opcoes.onAtivar || null;
      const w = document.createElement("div");
      w.innerHTML = html(!!opcoes.somenteLeitura, opcoes.aceitoEm);
      aberto = w.firstElementChild;
      document.body.appendChild(aberto);
      document.body.style.overflow = "hidden";
      (aberto.querySelector("#ttAceite") || aberto.querySelector(".tt-x")).focus({ preventScroll: true });
    },
    fechar,
    mensagem(txt, erro) { const m = aberto?.querySelector("#ttMsg"); if (m) m.innerHTML = txt ? `<span style="color:${erro ? "var(--bad)" : "var(--muted)"}">${txt}</span>` : ""; },
    ocupado(sim) { const b = aberto?.querySelector("[data-tt-ativar]"); const c = aberto?.querySelector("#ttAceite"); if (!b) return; b.disabled = sim || !c?.checked; b.textContent = sim ? "Ativando…" : "Concordar e ativar meu acesso"; },
  };

  document.addEventListener("click", (e) => {
    if (!aberto) return;
    if (e.target.closest("[data-tt-fechar]") || e.target === aberto) { fechar(); return; }
    const go = e.target.closest("[data-tt-ativar]");
    if (go && !go.disabled && aberto.querySelector("#ttAceite")?.checked) onAtivar?.(VERSAO);
  });
  document.addEventListener("change", (e) => {
    if (e.target.id === "ttAceite" && aberto) aberto.querySelector("[data-tt-ativar]").disabled = !e.target.checked;
  });
  document.addEventListener("keydown", (e) => { if (aberto && e.key === "Escape") fechar(); });
})();
