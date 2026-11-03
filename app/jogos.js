// Jogos de recompensa do Easy Study: o aluno ganha fichas estudando e gasta jogando.
// Termo do Vestibular (palavra do dia com termos de prova) e Desafio relâmpago (60 s, conteúdo dos módulos).
// Usa globais do app: S, save, render, esc, toast, VIEW, todayKey, hashStr, ALL_MODS, MOD, fcAuto, subjColor, shuffle.
(function () {
  /* ===================== palavras do Termo ===================== */
  // w: palavra (com acento), s: matéria, d: dica, e: explicação curta mostrada no fim
  const P = [
    ["MITOSE", "Biologia", "Divisão celular que gera duas células iguais à original.", "Na mitose, uma célula se divide em duas células-filhas geneticamente idênticas. É como o corpo cresce e repara tecidos."],
    ["MEIOSE", "Biologia", "Divisão celular que forma os gametas.", "A meiose reduz o número de cromossomos pela metade (2n → n) e gera variabilidade genética por crossing-over."],
    ["ALELO", "Biologia", "Cada uma das versões de um mesmo gene.", "Alelos ocupam o mesmo lugar (lócus) em cromossomos homólogos. Ex.: A (dominante) e a (recessivo)."],
    ["ENZIMA", "Biologia", "Proteína que acelera reações no organismo.", "Enzimas são catalisadores biológicos: diminuem a energia de ativação e são específicas para seu substrato."],
    ["XILEMA", "Biologia", "Tecido que leva água e sais da raiz às folhas.", "O xilema conduz a seiva bruta; o floema conduz a seiva elaborada (com açúcares da fotossíntese)."],
    ["FLOEMA", "Biologia", "Tecido que distribui a seiva elaborada.", "O floema leva os açúcares produzidos nas folhas para o resto da planta."],
    ["GAMETA", "Biologia", "Célula reprodutiva haploide.", "Espermatozoide e óvulo são gametas: têm metade dos cromossomos (n) e se unem na fecundação."],
    ["ZIGOTO", "Biologia", "Célula formada logo após a fecundação.", "O zigoto (2n) resulta da união de dois gametas e se divide por mitose para formar o embrião."],
    ["OSMOSE", "Biologia", "Passagem de água pela membrana semipermeável.", "Na osmose, a água vai do meio menos concentrado (hipotônico) para o mais concentrado (hipertônico)."],
    ["BIOMA", "Biologia", "Grande conjunto de ecossistemas com clima e vegetação parecidos.", "Exemplos brasileiros: Amazônia, Cerrado, Caatinga, Mata Atlântica, Pampa e Pantanal."],
    ["NICHO", "Biologia", "O 'papel' de uma espécie no ecossistema.", "Nicho ecológico é o modo de vida da espécie (o que come, quando age); habitat é onde ela vive."],
    ["MUTAÇÃO", "Biologia", "Alteração no material genético.", "Mutações são fonte de variabilidade genética, matéria-prima da seleção natural."],
    ["VACINA", "Biologia", "Imunização ativa, com memória imunológica.", "A vacina expõe o corpo a antígenos para que ele produza anticorpos e células de memória."],
    ["SINAPSE", "Biologia", "Ponto de comunicação entre neurônios.", "Na sinapse química, neurotransmissores passam o impulso nervoso de um neurônio para outro."],
    ["NÉFRON", "Biologia", "Unidade que filtra o sangue no rim.", "Cada rim tem cerca de um milhão de néfrons, onde se formam a urina e se regula a água do corpo."],
    ["INSULINA", "Biologia", "Hormônio do pâncreas que baixa a glicemia.", "A insulina facilita a entrada de glicose nas células. Sua falta ou resistência causa o diabetes."],
    ["FENÓTIPO", "Biologia", "Características que se manifestam no organismo.", "Fenótipo = genótipo + influência do ambiente. Ex.: cor dos olhos, altura."],
    ["GENÓTIPO", "Biologia", "A constituição genética do indivíduo.", "O genótipo é o conjunto de alelos (ex.: Aa). Junto com o ambiente, determina o fenótipo."],
    ["CLONE", "Biologia", "Organismo geneticamente idêntico a outro.", "Clones surgem por reprodução assexuada ou por técnicas de clonagem, como na ovelha Dolly."],
    ["VÍRUS", "Biologia", "Parasita intracelular obrigatório, sem célula.", "Vírus só se reproduzem dentro de células. Antibióticos não funcionam contra eles."],
    ["PLASMA", "Biologia", "Parte líquida do sangue.", "O plasma é formado principalmente por água, com proteínas, sais, nutrientes e hormônios."],
    ["ÁTOMO", "Química", "Menor unidade de um elemento químico.", "O átomo tem núcleo (prótons e nêutrons) e eletrosfera (elétrons)."],
    ["ISÓTOPO", "Química", "Átomos com mesmo número de prótons e massas diferentes.", "Isótopos têm o mesmo Z e diferente número de nêutrons. Ex.: carbono-12 e carbono-14."],
    ["CÁTION", "Química", "Íon de carga positiva.", "Um cátion se forma quando o átomo perde elétrons. Ex.: Na⁺, Ca²⁺."],
    ["ÂNION", "Química", "Íon de carga negativa.", "Um ânion se forma quando o átomo ganha elétrons. Ex.: Cl⁻, O²⁻."],
    ["ENTALPIA", "Química", "Conteúdo de energia medido no ΔH.", "ΔH < 0: reação exotérmica (libera calor). ΔH > 0: endotérmica (absorve calor)."],
    ["ÉSTER", "Química", "Função orgânica com cheiro de frutas.", "Ésteres (R–COO–R') vêm de ácido carboxílico + álcool (esterificação) e dão aroma a frutas e perfumes."],
    ["ÁLCOOL", "Química", "Função orgânica com –OH em carbono saturado.", "O etanol é o álcool do combustível e das bebidas; o grupo –OH faz pontes de hidrogênio."],
    ["CETONA", "Química", "Carbonila entre dois carbonos.", "A propanona (acetona), usada como removedor de esmalte, é a cetona mais simples."],
    ["AMINA", "Química", "Função orgânica derivada da amônia.", "Aminas têm nitrogênio ligado a carbonos e caráter básico. Estão em aminoácidos e no cheiro de peixe."],
    ["PRÓTON", "Química", "Partícula positiva do núcleo.", "O número de prótons é o número atômico (Z), que identifica o elemento."],
    ["NÊUTRON", "Química", "Partícula sem carga do núcleo.", "Nêutrons somados aos prótons dão o número de massa (A = Z + N)."],
    ["POLÍMERO", "Química", "Macromolécula formada pela repetição de monômeros.", "Plásticos (polietileno, PET), borracha, amido e proteínas são polímeros."],
    ["CATÁLISE", "Química", "Aceleração de uma reação por um catalisador.", "O catalisador diminui a energia de ativação e não é consumido; não altera o ΔH."],
    ["ISÔMERO", "Química", "Mesma fórmula molecular, estruturas diferentes.", "Isômeros têm a mesma fórmula (ex.: C₂H₆O) e propriedades diferentes: etanol e éter dimetílico."],
    ["PILHA", "Química", "Transforma energia química em elétrica.", "Na pilha, a oxidação ocorre no ânodo (polo −) e a redução no cátodo (polo +)."],
    ["ÂNODO", "Química", "Eletrodo onde ocorre a oxidação.", "Na pilha, o ânodo é o polo negativo e perde massa; os elétrons saem dele."],
    ["CÁTODO", "Química", "Eletrodo onde ocorre a redução.", "Na pilha, o cátodo é o polo positivo e costuma ganhar massa."],
    ["OZÔNIO", "Química", "Gás O₃ que filtra o ultravioleta.", "A camada de ozônio, na estratosfera, foi danificada pelos CFCs (Protocolo de Montreal, 1987)."],
    ["SOLUTO", "Química", "O que está dissolvido numa solução.", "Solução = soluto + solvente. No soro fisiológico, o NaCl é o soluto e a água, o solvente."],
    ["TAMPÃO", "Química", "Solução que resiste à variação de pH.", "O sangue usa o tampão bicarbonato/ácido carbônico para manter o pH perto de 7,4."],
    ["ÓXIDO", "Química", "Composto binário com oxigênio.", "CO₂, SO₂ e NO₂ são óxidos ácidos: na chuva, formam ácidos (chuva ácida)."],
    ["INÉRCIA", "Física", "Tendência de manter o estado de movimento.", "1ª lei de Newton: sem força resultante, o corpo fica parado ou em movimento retilíneo uniforme."],
    ["ATRITO", "Física", "Força que se opõe ao deslizamento.", "Fat = μ · N. O atrito estático impede o início do movimento; o cinético atua durante ele."],
    ["ENERGIA", "Física", "Capacidade de realizar trabalho.", "Sem atrito, a energia mecânica (cinética + potencial) se conserva."],
    ["TORQUE", "Física", "Tendência de uma força girar um corpo.", "Torque (momento) = força × distância ao eixo. Por isso é mais fácil abrir a porta longe da dobradiça."],
    ["PRESSÃO", "Física", "Força dividida pela área.", "p = F/A. Uma faca afiada corta melhor porque a área de contato é pequena."],
    ["EMPUXO", "Física", "Força para cima que um fluido exerce.", "Arquimedes: o empuxo é igual ao peso do líquido deslocado (E = d · V · g)."],
    ["TENSÃO", "Física", "Diferença de potencial elétrico (ddp).", "Medida em volts. Na tomada, 127 V ou 220 V. Lei de Ohm: U = R · i."],
    ["POTÊNCIA", "Física", "Energia por unidade de tempo.", "P = E/t, em watts. Na eletricidade, P = U · i. O consumo em kWh = potência × tempo."],
    ["REFRAÇÃO", "Física", "Mudança de velocidade da onda ao trocar de meio.", "É por refração que o lápis parece 'quebrado' no copo d'água."],
    ["LENTE", "Física", "Peça transparente que desvia a luz.", "Lentes convergentes corrigem a hipermetropia; divergentes, a miopia."],
    ["CALOR", "Física", "Energia térmica em trânsito.", "O calor flui do corpo mais quente para o mais frio. Q = m · c · ΔT."],
    ["KELVIN", "Física", "Escala absoluta de temperatura.", "0 K é o zero absoluto. T(K) = T(°C) + 273."],
    ["IMPULSO", "Física", "Força multiplicada pelo tempo de atuação.", "Impulso = variação da quantidade de movimento. O airbag aumenta o tempo e reduz a força."],
    ["VETOR", "Física", "Grandeza com módulo, direção e sentido.", "Velocidade, força e aceleração são vetoriais; massa e tempo são escalares."],
    ["MATRIZ", "Matemática", "Tabela de números em linhas e colunas.", "Uma matriz m × n tem m linhas e n colunas. Só existe determinante de matriz quadrada."],
    ["COSSENO", "Matemática", "Cateto adjacente sobre a hipotenusa.", "No triângulo retângulo: seno = oposto/hipotenusa; cosseno = adjacente/hipotenusa."],
    ["TANGENTE", "Matemática", "Cateto oposto sobre o adjacente.", "tg = sen/cos. A tangente de 45° vale 1."],
    ["MEDIANA", "Matemática", "Valor central dos dados ordenados.", "A mediana resiste a valores extremos; a média é afetada por eles."],
    ["PRIMO", "Matemática", "Número com exatamente dois divisores.", "2, 3, 5, 7, 11... O 2 é o único primo par; o 1 não é primo."],
    ["FATORIAL", "Matemática", "Produto de 1 até n.", "n! = n · (n−1) · ... · 1. Usado em permutações: 4! = 24."],
    ["FUNÇÃO", "Matemática", "Relação que liga cada x a um único y.", "Na função, cada elemento do domínio tem uma única imagem."],
    ["DOMÍNIO", "Matemática", "Conjunto dos valores que x pode assumir.", "Em f(x) = 1/x, o domínio é ℝ menos o zero."],
    ["PARÁBOLA", "Matemática", "Gráfico da função do 2º grau.", "Se a > 0, a concavidade é para cima; o vértice é o ponto de máximo ou mínimo."],
    ["ELIPSE", "Matemática", "Cônica oval com dois focos.", "As órbitas dos planetas são elipses, com o Sol em um dos focos (Kepler)."],
    ["VÉRTICE", "Matemática", "Ponto de máximo ou mínimo da parábola.", "x do vértice = −b/2a. Muito usado em questões de lucro máximo."],
    ["PRISMA", "Matemática", "Sólido com duas bases iguais e paralelas.", "Volume do prisma = área da base × altura."],
    ["ESFERA", "Matemática", "Sólido de todos os pontos a uma distância do centro.", "Volume = 4πr³/3; área = 4πr²."],
    ["ARRANJO", "Matemática", "Agrupamento em que a ordem importa.", "Arranjo: ordem importa (pódio). Combinação: ordem não importa (comissão)."],
    ["FEUDO", "História", "Terra concedida pelo suserano ao vassalo.", "No feudalismo, o feudo era a base econômica, com servos presos à terra."],
    ["VASSALO", "História", "Nobre que jurava fidelidade a um suserano.", "A suserania e vassalagem ligava os nobres medievais por obrigações mútuas."],
    ["SESMARIA", "História", "Grande lote de terra doado na colônia.", "As sesmarias deram origem ao latifúndio, base da concentração de terras no Brasil."],
    ["QUILOMBO", "História", "Comunidade de pessoas escravizadas que fugiram.", "Palmares, liderado por Zumbi, foi o maior quilombo do Brasil colonial."],
    ["CANUDOS", "História", "Arraial de Antônio Conselheiro destruído em 1897.", "A Guerra de Canudos, no sertão baiano, foi narrada por Euclides da Cunha em Os Sertões."],
    ["CORONEL", "História", "Chefe político local da Primeira República.", "O coronelismo controlava votos pelo 'voto de cabresto' e pela troca de favores."],
    ["NAZISMO", "História", "Regime totalitário de Hitler na Alemanha.", "O nazismo combinava nacionalismo extremo, antissemitismo e partido único; levou ao Holocausto."],
    ["FASCISMO", "História", "Regime totalitário de Mussolini na Itália.", "Culto ao líder, partido único, anticomunismo e corporativismo marcaram o fascismo."],
    ["BALAIADA", "História", "Revolta popular no Maranhão (1838-1841).", "Uma das revoltas regenciais, com vaqueiros, escravizados e camadas pobres."],
    ["SABINADA", "História", "Revolta na Bahia (1837-1838).", "Revolta regencial liderada por Francisco Sabino, que proclamou uma república temporária."],
    ["PÓLIS", "História", "Cidade-Estado da Grécia Antiga.", "Atenas e Esparta eram pólis independentes, com governo e leis próprios."],
    ["FARAÓ", "História", "Governante do Egito Antigo, visto como deus.", "O faraó concentrava poder político e religioso numa monarquia teocrática."],
    ["DITADURA", "História", "Regime sem democracia, como o de 1964 a 1985 no Brasil.", "A ditadura civil-militar teve AI-5, censura, tortura e o 'milagre econômico'."],
    ["ANISTIA", "História", "Perdão a crimes políticos, aprovado no Brasil em 1979.", "A Lei da Anistia permitiu a volta dos exilados e também beneficiou agentes da repressão."],
    ["RELEVO", "Geografia", "Formas da superfície terrestre.", "No Brasil, o relevo é antigo e desgastado: planaltos, planícies e depressões (Ross)."],
    ["CERRADO", "Geografia", "Savana brasileira, o 'berço das águas'.", "Árvores tortuosas, raízes profundas e expansão da soja no MATOPIBA."],
    ["CAATINGA", "Geografia", "Bioma exclusivamente brasileiro do semiárido.", "Vegetação que perde as folhas na seca (caducifólia) e está sujeita à desertificação."],
    ["PAMPA", "Geografia", "Campos do sul do Rio Grande do Sul.", "Bioma de gramíneas, ligado à pecuária e ameaçado pela arenização."],
    ["PANTANAL", "Geografia", "Uma das maiores planícies alagáveis do mundo.", "Tem cheias e vazantes anuais e sofreu grandes incêndios em 2020 e 2024."],
    ["MANGUE", "Geografia", "Ecossistema de água salobra no litoral.", "Os manguezais são berçários de peixes e crustáceos e são protegidos por lei."],
    ["ESCALA", "Geografia", "Relação entre o mapa e a realidade.", "Escala grande (1:10.000) mostra mais detalhes; escala pequena mostra uma área maior."],
    ["AQUÍFERO", "Geografia", "Rocha que armazena água no subsolo.", "O Aquífero Guarani fica sob Brasil, Argentina, Paraguai e Uruguai."],
    ["EROSÃO", "Geografia", "Desgaste e transporte do solo.", "Desmatamento acelera a erosão, que causa voçorocas e assoreamento dos rios."],
    ["TUNDRA", "Geografia", "Vegetação rasteira do Ártico.", "Musgos e liquens sobre o permafrost, cujo derretimento libera metano."],
    ["TAIGA", "Geografia", "Floresta de coníferas do norte do planeta.", "Floresta boreal de pinheiros do Canadá e da Rússia, fonte de madeira e celulose."],
    ["SAVANA", "Geografia", "Vegetação tropical com estação seca.", "Gramíneas com árvores esparsas; o Cerrado é uma savana."],
    ["DELTA", "Geografia", "Foz de rio dividida em vários canais.", "O Nilo e o Parnaíba têm delta; o Amazonas tem foz mista."],
    ["MONÇÃO", "Geografia", "Vento que inverte a direção conforme a estação.", "Na Ásia, as monções de verão trazem chuvas essenciais para o arroz."],
    ["ÊXODO", "Geografia", "Saída em massa, como do campo para a cidade.", "O êxodo rural acelerou a urbanização brasileira entre 1950 e 1980."],
    ["BRICS", "Geografia", "Grupo de grandes economias emergentes.", "Brasil, Rússia, Índia, China e África do Sul, ampliado a partir de 2024."],
    ["MERCOSUL", "Geografia", "Bloco econômico criado em 1991.", "União aduaneira imperfeita de Brasil, Argentina, Paraguai e Uruguai."],
    ["LATITUDE", "Geografia", "Distância em graus até o Equador.", "Varia de 0° a 90° norte ou sul. Longitude é a distância até Greenwich."],
    ["ÉTICA", "Filosofia e Sociologia", "Reflexão sobre o certo e o errado.", "A ética pergunta como devemos agir; a moral é o conjunto de regras de um grupo."],
    ["LOGOS", "Filosofia e Sociologia", "Razão, discurso racional para os gregos.", "A filosofia nasce da passagem do mito ao logos: explicar o mundo pela razão."],
    ["RAZÃO", "Filosofia e Sociologia", "Faculdade de pensar logicamente.", "Para Descartes e os racionalistas, a razão é a principal fonte do conhecimento."],
    ["ANOMIA", "Filosofia e Sociologia", "Ausência ou fraqueza das normas sociais (Durkheim).", "Para Durkheim, a anomia surge quando as regras perdem força, como em crises rápidas."],
    ["CLASSE", "Filosofia e Sociologia", "Grupo definido pela posição na produção (Marx).", "Para Marx, a luta de classes é o motor da história: burguesia x proletariado."],
    ["CULTURA", "Filosofia e Sociologia", "Tudo o que é aprendido e partilhado socialmente.", "Na antropologia, cultura inclui crenças, costumes, técnicas e símbolos de um grupo."],
    ["SOFISTA", "Filosofia e Sociologia", "Professor de retórica na Grécia Antiga.", "Sócrates criticou os sofistas, que ensinavam a persuadir cobrando por isso."],
    ["CONTRATO", "Filosofia e Sociologia", "Acordo que funda o Estado para Hobbes, Locke e Rousseau.", "Os contratualistas explicam a origem do Estado por um pacto entre os indivíduos."],
    ["METÁFORA", "Linguagens", "Comparação sem o 'como'.", "'Meu coração é um balde despejado' (Drummond): sentido figurado sem conectivo."],
    ["IRONIA", "Linguagens", "Dizer o contrário do que se pensa.", "A ironia tem intenção crítica ou humorística. Ex.: 'Que dia lindo!', no meio da tempestade."],
    ["ANTÍTESE", "Linguagens", "Aproximação de ideias opostas.", "'Amor é fogo que arde sem se ver' mistura antítese e paradoxo (Camões)."],
    ["SONETO", "Linguagens", "Poema de 14 versos: 2 quartetos e 2 tercetos.", "Forma fixa usada por Camões, Bocage, Olavo Bilac e Vinicius de Moraes."],
    ["ESTROFE", "Linguagens", "Conjunto de versos de um poema.", "Estrofes de 4 versos são quartetos; de 3, tercetos."],
    ["PROSA", "Linguagens", "Texto em linhas corridas, não em versos.", "Romance, conto e crônica são escritos em prosa."],
    ["CRÔNICA", "Linguagens", "Texto curto sobre o cotidiano.", "Gênero típico de jornais e revistas; Rubem Braga e Fernando Sabino são cronistas famosos."],
    ["FÁBULA", "Linguagens", "Narrativa com animais e uma moral.", "Esopo e La Fontaine são autores clássicos de fábulas."],
    ["PRONOME", "Linguagens", "Palavra que substitui ou acompanha o nome.", "Pronomes ajudam na coesão: retomam termos sem repeti-los."],
    ["CRASE", "Linguagens", "Fusão da preposição a com o artigo a.", "Vou à escola (a + a). Não há crase antes de palavra masculina: 'a pé'."],
    ["COESÃO", "Linguagens", "Ligação entre as partes do texto.", "Conectivos e pronomes garantem a coesão, avaliada na competência 4 do ENEM."],
  ].map(([w, s, d, e]) => ({ w, s, d, e }));
  const norm = (t) => String(t).normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();

  /* ===================== fichas ===================== */
  const J = () => {
    const j = (S.jogos = S.jogos || {});
    j.gastas = j.gastas || 0;
    j.termo = j.termo || {};
    j.rel = j.rel || { best: {}, n: 0 };
    return j;
  };
  function ganhos() {
    const q = Object.keys(S.ans || {}).length;
    const min = Object.values(S.act || {}).reduce((a, d) => a + (d.min || 0), 0);
    const mods = Object.keys(S.modDone || {}).length;
    const disc = Object.values(S.disc || {}).filter((r) => r && r.nota !== undefined).length;
    const red = (S.essays || []).length;
    const itens = [
      ["Bônus de boas-vindas", 3, 3],
      ["10 questões respondidas", Math.floor(q / 10), q % 10 + "/10 para a próxima"],
      ["Sessão de 25 min de foco", Math.floor(min / 25), (min % 25) + "/25 min para a próxima"],
      ["Módulo concluído", mods, ""],
      ["Dissertativa corrigida", disc, ""],
      ["Redação corrigida pela Easier", red, ""],
    ];
    return { total: itens.reduce((a, i) => a + i[1], 0), itens };
  }
  const saldo = () => Math.max(0, ganhos().total - J().gastas);
  function gastar() {
    if (saldo() < 1) { toast("Sem fichas. Estude um pouco para ganhar mais!"); return false; }
    J().gastas++; save(); return true;
  }

  /* ===================== Termo ===================== */
  let termo = null; // {idx, palpites:[], atual:"", fim:false, ok:false, dica:false, dia:bool}
  const MAXT = 6;
  function palavraDoDia() { return hashStr("termo|" + todayKey()) % P.length; }
  function novoTermo(dia) {
    const j = J();
    if (dia) {
      const salvo = j.termo[todayKey()];
      if (salvo) { termo = { ...salvo, atual: "", dia: true }; return true; }
      if (!gastar()) return false;
      termo = { idx: palavraDoDia(), palpites: [], atual: "", fim: false, ok: false, dica: false, dia: true };
    } else {
      if (!gastar()) return false;
      let i; do { i = Math.floor(Math.random() * P.length); } while (P.length > 1 && i === palavraDoDia());
      termo = { idx: i, palpites: [], atual: "", fim: false, ok: false, dica: false, dia: false };
    }
    salvarTermo(); return true;
  }
  function salvarTermo() {
    if (!termo || !termo.dia) return;
    const { atual, ...resto } = termo;
    const j = J(); j.termo = { [todayKey()]: resto }; save();
  }
  function cores(palpite, alvo) {
    const a = norm(alvo).split(""), g = norm(palpite).split(""), out = Array(g.length).fill("x"), resto = {};
    g.forEach((c, i) => { if (c === a[i]) out[i] = "v"; else resto[a[i]] = (resto[a[i]] || 0) + 1; });
    g.forEach((c, i) => { if (out[i] !== "v" && resto[c]) { out[i] = "a"; resto[c]--; } });
    return out;
  }
  /* ===================== efeitos ===================== */
  let fx = {}; // efeitos só da próxima renderização
  const semMov = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function desenhar(efeitos) { fx = efeitos || {}; render(); fx = {}; }
  function confete() {
    if (semMov()) return;
    const c = document.createElement("canvas"); c.className = "jg-confete"; document.body.appendChild(c);
    const W = (c.width = innerWidth), H = (c.height = innerHeight), x = c.getContext("2d");
    const cores = ["#4E3DF2", "#FF44C9", "#DFF24B", "#FF5B37", "#22C55E", "#FACC15", "#38BDF8"];
    const ps = Array.from({ length: 150 }, () => ({ x: W / 2 + (Math.random() - 0.5) * W * 0.4, y: H * 0.4, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 5, r: 5 + Math.random() * 5, c: cores[Math.floor(Math.random() * cores.length)], a: Math.random() * 6, va: (Math.random() - 0.5) * 0.35 }));
    const t0 = performance.now();
    (function f(t) {
      x.clearRect(0, 0, W, H);
      ps.forEach((p) => { p.vy += 0.38; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.a += p.va; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6); x.restore(); });
      if (t - t0 < 2800) requestAnimationFrame(f); else c.remove();
    })(t0);
  }
  // número que sobe de 0 até o valor (tela de resultado)
  function contar() {
    document.querySelectorAll("[data-contar]").forEach((el) => {
      const fim = +el.dataset.contar, t0 = performance.now();
      if (semMov() || !fim) { el.textContent = fim; return; }
      (function f(t) { const p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(fim * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
    });
  }

  /* ===================== Termo: jogada ===================== */
  function tecla(k) {
    if (!termo || termo.fim) return;
    const alvo = P[termo.idx].w, n = norm(alvo).length;
    if (k === "ENTER") {
      if (termo.atual.length < n) { desenhar({ shake: true }); toast(`A palavra tem ${n} letras.`); return; }
      termo.palpites.push(termo.atual); termo.atual = "";
      if (norm(termo.palpites[termo.palpites.length - 1]) === norm(alvo)) { termo.fim = true; termo.ok = true; }
      else if (termo.palpites.length >= MAXT) termo.fim = true;
      if (termo.fim) { const j = J(); j.tstats = j.tstats || { jogos: 0, vit: 0 }; j.tstats.jogos++; if (termo.ok) j.tstats.vit++; }
      salvarTermo();
      desenhar({ flip: termo.palpites.length - 1, win: termo.ok });
      if (termo.ok) setTimeout(confete, n * 140 + 350);
      return;
    }
    if (k === "⌫") { termo.atual = termo.atual.slice(0, -1); render(); return; }
    if (/^[A-ZÇ]$/.test(k) && termo.atual.length < n) { termo.atual += k; desenhar({ pop: termo.atual.length - 1 }); }
  }
  function termoHTML() {
    const p = P[termo.idx], n = norm(p.w).length, linhas = [];
    const estados = {};
    termo.palpites.forEach((g) => cores(g, p.w).forEach((c, i) => { const l = norm(g)[i]; const r = { v: 3, a: 2, x: 1 }; if (!estados[l] || r[c] > r[estados[l]]) estados[l] = c; }));
    const revela = n * 0.14 + 0.3;
    for (let r = 0; r < MAXT; r++) {
      const g = termo.palpites[r], cur = r === termo.palpites.length && !termo.fim;
      const cs = g ? cores(g, p.w) : [], flip = fx.flip === r;
      const rowCls = (cur && fx.shake ? " tm-shake" : "") + (flip && fx.win ? " tm-winrow" : "");
      linhas.push(`<div class="tm-row${rowCls}" style="grid-template-columns:repeat(${n},1fr)${flip && fx.win ? `;--wd:${revela}s` : ""}">${Array.from({ length: n }, (_, i) => {
        const l = g ? norm(g)[i] : cur ? termo.atual[i] || "" : "";
        const cls = g ? "tm-" + cs[i] + (flip ? " tm-flip" : "") : cur && l ? "tm-f" + (fx.pop === i ? " tm-pop" : "") : "";
        return `<span class="tm-c ${cls}"${flip ? ` style="--fd:${(i * 0.14).toFixed(2)}s"` : ""}>${l}</span>`; }).join("")}</div>`);
    }
    const kb = ["QWERTYUIOP", "ASDFGHJKL", "⏎ZXCVBNM⌫"].map((row) => `<div class="tm-kr">${[...row].map((k) => {
      const key = k === "⏎" ? "ENTER" : k; return `<button class="tm-k ${estados[k] ? "tm-" + estados[k] : ""} ${k === "⏎" || k === "⌫" ? "tm-wide" : ""}" data-tmk="${key}" aria-label="${key === "ENTER" ? "Enviar" : key === "⌫" ? "Apagar" : key}">${k === "⏎" ? "Enviar" : k}</button>`; }).join("")}</div>`).join("");
    const dicaOk = termo.palpites.length >= 3 || termo.fim;
    return `<div class="tm">
      <div class="tm-top"><button class="btn sm ghost" data-jvolta>← Jogos</button><b>${termo.dia ? "Palavra do dia" : "Treino"}</b><span class="chip" style="background:${subjColor(p.s)}">${esc(p.s)}</span><span class="small muted">${n} letras · ${MAXT} tentativas</span></div>
      <div class="tm-grid" style="width:min(100%,${n * 56}px)">${linhas.join("")}</div>
      ${termo.fim ? `<div class="tm-fim ${termo.ok ? "ok" : ""}${fx.flip !== undefined ? " jg-in" : ""}" style="${fx.flip !== undefined ? `animation-delay:${revela}s` : ""}"><b>${termo.ok ? ["Acertou! 🎉", "Mandou bem! 🎉", "Na mosca! 🎯"][termo.palpites.length % 3] : "Não foi dessa vez."} A palavra era ${esc(p.w)}.</b><p>${esc(p.e)}</p>
          <div class="dbtns"><button class="btn sm" data-subjopen="${esc(p.s)}">Estudar ${esc(p.s)}</button>${saldo() > 0 ? `<button class="btn sm ghost" data-jtreino>Outra palavra (1 ficha)</button>` : ""}</div></div>`
        : `<div class="tm-dica">${termo.dica ? `<span class="jg-in"><b>Dica:</b> ${esc(p.d)}</span>` : dicaOk ? `<button class="btn sm ghost jg-wiggle" data-tmdica>💡 Ver dica</button>` : `<span class="small muted">A dica libera depois da 3ª tentativa.</span>`}</div>
        <div class="tm-kb">${kb}</div>`}
    </div>`;
  }

  /* ===================== Desafio relâmpago ===================== */
  let rel = null;
  const DUR = 60;
  function linhasTab(s, min) {
    // tabelas dos módulos com pelo menos `min` linhas de respostas diferentes
    const out = [];
    ALL_MODS.filter((m) => s === "Todas" || m.s === s).forEach((m) => {
      const mm = MOD[m.s][m.i];
      (mm.tab || []).forEach((t) => {
        if (t.head.length < 2 || t.rows.length < min) return;
        const resp = (r) => r.slice(1).filter(Boolean).join(" · ");
        const rows = t.rows.map((r) => ({ p: String(r[0]), r: resp(r) })).filter((x) => x.p && x.r && x.r.length <= 140);
        const unicos = rows.filter((x, i) => rows.findIndex((y) => y.r === x.r || y.p === x.p) === i);
        if (unicos.length >= min) out.push({ s: m.s, mod: m.id, tt: t.title || mm.t, h: t.head, rows: unicos });
      });
    });
    return out;
  }
  function perguntas(s) {
    const out = [];
    linhasTab(s, 4).forEach((t) => t.rows.forEach((x) => {
      const outros = shuffle(t.rows.filter((y) => y !== x).map((y) => y.r)).slice(0, 3);
      out.push({ s: t.s, mod: t.mod, tt: t.tt, h: t.h, p: x.p, certo: x.r, ops: shuffle([x.r, ...outros]) });
    }));
    return shuffle(out);
  }
  const mult = (c) => (c >= 6 ? 3 : c >= 3 ? 2 : 1);
  function restante(st) { return Math.max(0, (st.t0 + st.dur - Date.now()) / 1000); }
  function iniciarRel(s) {
    const fila = perguntas(s);
    if (fila.length < 8) { toast("Ainda não há perguntas suficientes dessa matéria."); return; }
    if (!gastar()) return;
    rel = { s, fila, i: 0, pts: 0, ac: 0, combo: 0, maxc: 0, erros: [], fim: false, t0: Date.now(), dur: DUR * 1000, fb: null };
    desenhar({ entra: true });
  }
  function fimRel() {
    if (!rel || rel.fim) return;
    rel.fim = true;
    const j = J(); const b = j.rel.best[rel.s] || 0;
    rel.recorde = rel.pts > b && rel.pts > 0; if (rel.recorde) j.rel.best[rel.s] = rel.pts;
    j.rel.n++; save(); render(); contar(); if (rel.recorde) setTimeout(confete, 500);
  }
  function responderRel(k) {
    if (!rel || rel.fim || rel.fb) return;
    const q = rel.fila[rel.i], ok = q.ops[k] === q.certo;
    let ganho = 0;
    if (ok) { rel.combo++; rel.maxc = Math.max(rel.maxc, rel.combo); ganho = mult(rel.combo); rel.pts += ganho; rel.ac++; rel.dur = Math.min(rel.dur + 1000, Date.now() - rel.t0 + DUR * 1000); }
    else { rel.combo = 0; rel.erros.push(q); rel.dur -= 2000; }
    rel.fb = { k, ok, ganho };
    render();
    setTimeout(() => { if (!rel || rel.fim) return; rel.fb = null; rel.i = (rel.i + 1) % rel.fila.length; desenhar({ entra: true }); }, ok ? 480 : 1150);
  }
  function hudHTML(st, idT, idBar, tot) {
    const left = restante(st), m = mult(st.combo);
    return `<div class="tm-top"><button class="btn sm ghost" data-jvolta>Encerrar</button><b class="num jg-time ${left <= 10 ? "low" : ""}" id="${idT}">⏱ ${Math.ceil(left)} s</b>
      ${st.fb ? `<span class="jg-dt ${st.fb.ok ? "up" : "down"}">${st.fb.ok ? "+1 s" : "−2 s"}</span>` : ""}
      ${st.combo >= 3 ? `<span class="jg-combo${st.fb && st.fb.ok && (st.combo === 3 || st.combo === 6) ? " novo" : ""}">🔥 ×${m}</span>` : ""}
      <b class="num jg-pts" style="margin-left:auto">${st.pts} pts${st.fb && st.fb.ok ? `<span class="jg-float">+${st.fb.ganho}</span>` : ""}</b></div>
      <div class="rl-bar"><i id="${idBar}" class="${left <= 10 ? "low" : ""}" style="width:${Math.min(100, (left / tot) * 100)}%"></i></div>`;
  }
  function fimHTML(st, nome, best, extra, rotulo) {
    return `<div class="rl"><div class="tm-top"><button class="btn sm ghost" data-jvolta>← Jogos</button><b>${nome} · ${esc(rotulo || (st.s === "Todas" ? "todas as matérias" : st.s))}</b></div>
      <div class="rl-fim jg-in"><div class="h-big num jg-score" data-contar="${st.pts}">0</div><b>${st.recorde ? "Novo recorde! 🏆" : `pontos · recorde: ${best}`}</b>
        <div class="jg-stats"><span><b class="num">${st.ac}</b> acertos</span><span><b class="num">${st.erros.length}</b> erros</span><span><b class="num">${st.maxc}</b> maior sequência</span>${extra || ""}</div></div>
      ${st.erros.length ? `<div class="card jg-in" style="animation-delay:.25s"><h3 style="font-size:16px;margin:0 0 8px">Revise o que errou</h3>${st.erros.slice(0, 8).map((q) => `<div class="rl-rev"><span class="small muted">${esc(q.tt)}</span><br><b>${esc(q.p)}</b> → ${esc(q.certo)} ${q.mod ? `<button class="btn sm ghost" data-mod="${q.mod}">Abrir módulo</button>` : ""}</div>`).join("")}</div>` : `<p class="jg-in" style="text-align:center">Nenhum erro. Mandou muito bem!</p>`}`;
  }
  function relHTML() {
    if (rel.fim) return fimHTML(rel, "Desafio relâmpago", J().rel.best[rel.s] || 0) + `<div class="dbtns">${saldo() > 0 ? `<button class="btn" data-reliniciar="${esc(rel.s)}">Jogar de novo (1 ficha)</button>` : `<span class="small muted">Sem fichas: estude para ganhar mais.</span>`}</div></div>`;
    const q = rel.fila[rel.i], entra = fx.entra ? " rl-in" : "";
    return `<div class="rl">${hudHTML(rel, "rlT", "rlBar", DUR)}
      <div class="rl-q${entra}"><span class="chip" style="background:${subjColor(q.s)}">${esc(q.s)}</span><span class="small muted">${esc(q.tt)}</span>
        <h3>${esc(q.h[0] ? q.h[0] + ": " : "")}${esc(q.p)}</h3><p class="small muted" style="margin:0">Qual é a correspondência certa (${esc(q.h.slice(1).filter(Boolean).join(" · "))})?</p></div>
      <div class="rl-ops">${q.ops.map((o, k) => { let c = ""; if (rel.fb) { if (o === q.certo) c = "right jg-pop"; else if (k === rel.fb.k) c = "wrong jg-shake"; } return `<button class="alt ${c}${entra}" style="${entra ? `animation-delay:${0.05 + k * 0.05}s` : ""}" data-relop="${k}" ${rel.fb ? "disabled" : ""}><span class="L">${"ABCD"[k]}</span><span>${esc(o)}</span></button>`; }).join("")}</div></div>`;
  }

  /* ===================== Ligue os pares ===================== */
  let lig = null;
  const LDUR = 90, NPAR = 5;
  function rodadaLig() {
    const t = lig.tabs[Math.floor(Math.random() * lig.tabs.length)];
    const rows = shuffle(t.rows).slice(0, NPAR);
    lig.t = t;
    lig.pares = rows.map((x, i) => ({ id: i, a: x.p, b: x.r }));
    lig.esq = shuffle(lig.pares.map((p) => p.id));
    lig.dir = shuffle(lig.pares.map((p) => p.id));
    lig.feitos = {};
    lig.sel = null;
    lig.rodada++;
  }
  function iniciarLig(s) {
    const tabs = linhasTab(s, NPAR);
    if (!tabs.length) { toast("Ainda não há tabelas suficientes dessa matéria."); return; }
    if (!gastar()) return;
    lig = { s, tabs, rodada: 0, pts: 0, ac: 0, combo: 0, maxc: 0, erros: [], fim: false, t0: Date.now(), dur: LDUR * 1000, fb: null };
    rodadaLig();
    desenhar({ entra: true });
  }
  function fimLig() {
    if (!lig || lig.fim) return;
    lig.fim = true;
    const j = J(); j.lig = j.lig || { best: {} }; const b = j.lig.best[lig.s] || 0;
    lig.recorde = lig.pts > b && lig.pts > 0; if (lig.recorde) j.lig.best[lig.s] = lig.pts;
    save(); render(); contar(); if (lig.recorde) setTimeout(confete, 500);
  }
  function clicarLig(lado, id) {
    if (!lig || lig.fim || lig.fb || lig.feitos[id]) return;
    if (!lig.sel || lig.sel.lado === lado) { lig.sel = { lado, id }; render(); return; }
    const a = lado === "L" ? id : lig.sel.id, b = lado === "R" ? id : lig.sel.id;
    const ok = a === b;
    let ganho = 0;
    if (ok) { lig.combo++; lig.maxc = Math.max(lig.maxc, lig.combo); ganho = mult(lig.combo); lig.pts += ganho; lig.ac++; lig.dur = Math.min(lig.dur + 2000, Date.now() - lig.t0 + LDUR * 1000); }
    else { lig.combo = 0; lig.dur -= 3000; const p = lig.pares[a]; if (!lig.erros.some((e) => e.p === p.a)) lig.erros.push({ tt: lig.t.tt, p: p.a, certo: p.b, mod: lig.t.mod }); }
    lig.fb = { ok, a, b, ganho };
    render();
    setTimeout(() => {
      if (!lig || lig.fim) return;
      if (ok) lig.feitos[a] = 1;
      lig.fb = null; lig.sel = null;
      if (Object.keys(lig.feitos).length >= lig.pares.length) { lig.pts += 3; toast("Rodada completa! +3 pts"); rodadaLig(); desenhar({ entra: true }); }
      else render();
    }, ok ? 420 : 750);
  }
  function ligHTML() {
    if (lig.fim) { const j = J(); return fimHTML(lig, "Ligue os pares", (j.lig && j.lig.best[lig.s]) || 0, `<span><b class="num">${lig.rodada - 1}</b> rodadas completas</span>`) + `<div class="dbtns">${saldo() > 0 ? `<button class="btn" data-liginiciar="${esc(lig.s)}">Jogar de novo (1 ficha)</button>` : `<span class="small muted">Sem fichas: estude para ganhar mais.</span>`}</div></div>`; }
    const entra = fx.entra ? " rl-in" : "";
    const item = (lado, id, txt, k) => {
      const feito = lig.feitos[id], sel = lig.sel && lig.sel.lado === lado && lig.sel.id === id;
      let c = feito ? " lg-done" : sel ? " lg-sel" : "";
      if (lig.fb) { const meu = lado === "L" ? lig.fb.a : lig.fb.b; if (meu === id) c = lig.fb.ok ? " lg-ok" : " lg-bad jg-shake"; }
      return `<button class="lg-it${c}${entra}" style="${entra ? `animation-delay:${k * 0.05}s` : ""}" data-lg="${lado}|${id}" ${feito ? 'disabled aria-hidden="true"' : ""}>${esc(txt)}</button>`;
    };
    return `<div class="rl lg">${hudHTML(lig, "lgT", "lgBar", LDUR)}
      <div class="lg-head${entra}"><span class="chip" style="background:${subjColor(lig.t.s)}">${esc(lig.t.s)} · rodada ${lig.rodada}</span><b>${esc(lig.t.tt)}</b>
        <div class="small muted">Toque em um item de cada coluna para ligar: ${esc(lig.t.h[0] || "termo")} → ${esc(lig.t.h.slice(1).filter(Boolean).join(" · "))}</div></div>
      <div class="lg-cols"><div class="lg-col">${lig.esq.map((id, k) => item("L", id, lig.pares[id].a, k)).join("")}</div><div class="lg-col">${lig.dir.map((id, k) => item("R", id, lig.pares[id].b, k + 2)).join("")}</div></div></div>`;
  }

  /* ===================== Linha do tempo ===================== */
  // [ano (negativo = a.C.), fato, "br" | "mundo"]
  const FATOS = [
    [-3500, "Surge a escrita cuneiforme na Mesopotâmia (aprox.)", "mundo"], [-2560, "Construção da Grande Pirâmide de Gizé (aprox.)", "mundo"], [-753, "Fundação lendária de Roma", "mundo"],
    [-508, "Reformas de Clístenes criam a democracia em Atenas", "mundo"], [-431, "Começa a Guerra do Peloponeso", "mundo"], [-27, "Augusto se torna o primeiro imperador romano", "mundo"],
    [313, "Édito de Milão dá liberdade de culto aos cristãos", "mundo"], [476, "Queda do Império Romano do Ocidente", "mundo"], [622, "Hégira: Maomé vai de Meca para Medina", "mundo"],
    [800, "Carlos Magno é coroado imperador", "mundo"], [1054, "Cisma do Oriente divide a Igreja cristã", "mundo"], [1096, "Começa a Primeira Cruzada", "mundo"],
    [1215, "Assinatura da Magna Carta na Inglaterra", "mundo"], [1347, "A Peste Negra chega à Europa", "mundo"], [1453, "Queda de Constantinopla", "mundo"],
    [1492, "Colombo chega à América", "mundo"], [1498, "Vasco da Gama chega à Índia", "mundo"], [1517, "Lutero publica as 95 teses", "mundo"],
    [1543, "Copérnico publica a teoria heliocêntrica", "mundo"], [1648, "Paz de Vestfália", "mundo"], [1688, "Revolução Gloriosa na Inglaterra", "mundo"],
    [1776, "Independência dos Estados Unidos", "mundo"], [1789, "Começa a Revolução Francesa", "mundo"], [1804, "Independência do Haiti", "mundo"],
    [1815, "Congresso de Viena", "mundo"], [1848, "Publicação do Manifesto Comunista", "mundo"], [1859, "Darwin publica A Origem das Espécies", "mundo"],
    [1861, "Começa a Guerra de Secessão nos EUA", "mundo"], [1884, "Começa a Conferência de Berlim (partilha da África)", "mundo"], [1914, "Começa a Primeira Guerra Mundial", "mundo"],
    [1917, "Revolução Russa", "mundo"], [1929, "Quebra da Bolsa de Nova York", "mundo"], [1933, "Hitler chega ao poder na Alemanha", "mundo"],
    [1939, "Começa a Segunda Guerra Mundial", "mundo"], [1945, "Bombas atômicas em Hiroshima e Nagasaki", "mundo"], [1948, "Declaração Universal dos Direitos Humanos", "mundo"],
    [1949, "Revolução Chinesa", "mundo"], [1959, "Revolução Cubana", "mundo"], [1961, "Construção do Muro de Berlim", "mundo"],
    [1962, "Crise dos Mísseis em Cuba", "mundo"], [1969, "Chegada do ser humano à Lua", "mundo"], [1989, "Queda do Muro de Berlim", "mundo"],
    [1991, "Fim da União Soviética", "mundo"], [1994, "Mandela é eleito na África do Sul", "mundo"], [2001, "Atentados de 11 de setembro nos EUA", "mundo"],
    [2008, "Crise financeira global", "mundo"], [2011, "Primavera Árabe", "mundo"], [2020, "OMS declara a pandemia de covid-19", "mundo"], [2022, "A Rússia invade a Ucrânia", "mundo"],
    [1500, "Chegada da esquadra de Cabral ao Brasil", "br"], [1532, "Fundação de São Vicente, a primeira vila", "br"], [1534, "Criação das capitanias hereditárias", "br"],
    [1549, "Governo-geral de Tomé de Sousa e fundação de Salvador", "br"], [1554, "Fundação de São Paulo pelos jesuítas", "br"], [1565, "Fundação do Rio de Janeiro", "br"],
    [1630, "Holandeses ocupam Pernambuco", "br"], [1695, "Morte de Zumbi dos Palmares", "br"], [1763, "A capital da colônia passa para o Rio de Janeiro", "br"],
    [1792, "Execução de Tiradentes", "br"], [1808, "Chegada da família real portuguesa", "br"], [1822, "Independência do Brasil", "br"],
    [1824, "Primeira Constituição do Brasil", "br"], [1835, "Começa a Revolução Farroupilha", "br"], [1850, "Lei Eusébio de Queirós e Lei de Terras", "br"],
    [1864, "Começa a Guerra do Paraguai", "br"], [1871, "Lei do Ventre Livre", "br"], [1888, "Lei Áurea abole a escravidão", "br"],
    [1889, "Proclamação da República", "br"], [1897, "Destruição de Canudos", "br"], [1904, "Revolta da Vacina no Rio de Janeiro", "br"],
    [1922, "Semana de Arte Moderna", "br"], [1930, "Revolução de 1930 leva Vargas ao poder", "br"], [1932, "Código Eleitoral garante o voto feminino", "br"],
    [1937, "Começa o Estado Novo", "br"], [1943, "Criação da CLT", "br"], [1953, "Criação da Petrobras", "br"],
    [1960, "Inauguração de Brasília", "br"], [1964, "Golpe civil-militar", "br"], [1968, "Decretação do AI-5", "br"],
    [1979, "Lei da Anistia", "br"], [1984, "Campanha das Diretas Já", "br"], [1988, "Promulgação da Constituição Cidadã", "br"],
    [1992, "Rio-92, conferência da ONU sobre meio ambiente", "br"], [1994, "Lançamento do Plano Real", "br"],
  ].map(([a, f, t], i) => ({ id: i, a, f, t }));
  const ANO = (a) => (a < 0 ? `${-a} a.C.` : String(a));
  let lt = null;
  function iniciarLt(modo) {
    const deck = shuffle(FATOS.filter((e) => modo === "tudo" || e.t === modo));
    if (deck.length < 10 || !gastar()) return;
    lt = { s: modo, deck, linha: [deck.pop()], atual: deck.pop(), vidas: 3, pts: 0, ac: 0, combo: 0, maxc: 0, erros: [], fim: false, fb: null };
    desenhar({ entra: true });
  }
  function fimLt() {
    if (!lt || lt.fim) return;
    lt.fim = true;
    const j = J(); j.lt = j.lt || { best: {} }; const b = j.lt.best[lt.s] || 0;
    lt.recorde = lt.pts > b && lt.pts > 0; if (lt.recorde) j.lt.best[lt.s] = lt.pts;
    save(); render(); contar(); if (lt.recorde) setTimeout(confete, 500);
  }
  function colocarLt(k) {
    if (!lt || lt.fim || lt.fb) return;
    const L = lt.linha, e = lt.atual;
    const ok = (k === 0 || L[k - 1].a <= e.a) && (k === L.length || e.a <= L[k].a);
    let pos = k, ganho = 0;
    if (ok) { lt.combo++; lt.maxc = Math.max(lt.maxc, lt.combo); ganho = mult(lt.combo); lt.pts += ganho; lt.ac++; }
    else { lt.combo = 0; lt.vidas--; pos = L.findIndex((x) => x.a > e.a); if (pos < 0) pos = L.length; lt.erros.push({ tt: "Linha do tempo", p: e.f, certo: ANO(e.a) }); }
    L.splice(pos, 0, e);
    lt.fb = { ok, id: e.id, ganho };
    render();
    const el = document.querySelector(".lt-ok,.lt-bad"); if (el && el.scrollIntoView) el.scrollIntoView({ block: "center", behavior: semMov() ? "auto" : "smooth" });
    setTimeout(() => {
      if (!lt || lt.fim) return;
      lt.fb = null;
      if (lt.vidas <= 0) { fimLt(); return; }
      if (!lt.deck.length) { lt.pts += 10; toast("Você colocou todos os fatos! +10 pts"); fimLt(); return; }
      lt.atual = lt.deck.pop();
      desenhar({ entra: true });
      const c = document.querySelector(".lt-cur"); if (c && c.scrollIntoView) c.scrollIntoView({ block: "nearest" });
    }, ok ? 800 : 1500);
  }
  function ltHTML() {
    if (lt.fim) { const j = J(); return fimHTML(lt, "Linha do tempo", (j.lt && j.lt.best[lt.s]) || 0, `<span><b class="num">${lt.linha.length}</b> fatos na linha</span>`, { tudo: "Brasil e mundo", br: "Brasil", mundo: "Mundo" }[lt.s]) + `<div class="dbtns">${saldo() > 0 ? `<button class="btn" data-ltiniciar="${lt.s}">Jogar de novo (1 ficha)</button>` : `<span class="small muted">Sem fichas: estude para ganhar mais.</span>`}</div></div>`; }
    const entra = fx.entra ? " rl-in" : "", e = lt.atual;
    const vidas = [0, 1, 2].map((i) => `<span class="lt-vida${i < lt.vidas ? "" : " off"}${lt.fb && !lt.fb.ok && i === lt.vidas ? " jg-shake" : ""}">${i < lt.vidas ? "❤️" : "🖤"}</span>`).join("");
    const slot = (k) => `<button class="lt-slot" data-lt="${k}" ${lt.fb ? "disabled" : ""}><span>＋ colocar aqui</span></button>`;
    const itens = lt.linha.map((x, k) => {
      const st = lt.fb && lt.fb.id === x.id ? (lt.fb.ok ? " lt-ok jg-pop" : " lt-bad jg-shake") : "";
      return `${k === 0 ? slot(0) : ""}<div class="lt-ev${st}"><b class="num">${ANO(x.a)}</b><span>${esc(x.f)}</span>${st && lt.fb.ok ? `<span class="jg-float">+${lt.fb.ganho}</span>` : ""}</div>${slot(k + 1)}`;
    }).join("");
    return `<div class="rl lt"><div class="tm-top"><button class="btn sm ghost" data-jvolta>Encerrar</button><span class="lt-vidas" aria-label="${lt.vidas} vidas">${vidas}</span>
        ${lt.combo >= 3 ? `<span class="jg-combo${lt.fb && lt.fb.ok && (lt.combo === 3 || lt.combo === 6) ? " novo" : ""}">🔥 ×${mult(lt.combo)}</span>` : ""}<b class="num jg-pts" style="margin-left:auto">${lt.pts} pts</b></div>
      <div class="lt-cur${entra}"><span class="small">Onde entra este fato?</span><b>${esc(e.f)}</b><span class="chip">${e.t === "br" ? "Brasil" : "Mundo"}</span></div>
      <div class="lt-linha">${itens}</div></div>`;
  }

  /* ===================== Mapa do Brasil ===================== */
  let mp = null;
  const REG = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];
  function filaMp(modo) {
    const E = window.MAPA_BR.estados;
    if (modo === "regioes") return shuffle(Array.from({ length: 30 }, (_, i) => REG[i % 5])).map((r) => ({ texto: `Toque em um estado do ${r}`, certos: E.filter((e) => e.reg === r).map((e) => e.id), resp: r }));
    return shuffle(E).map((e) => modo === "capitais" ? { texto: `Onde fica ${e.cap}?`, sub: "capital", certos: [e.id], resp: `${e.cap} é a capital de ${e.nome}` } : { texto: `Toque em: ${e.nome}`, certos: [e.id], resp: e.nome });
  }
  function iniciarMp(modo) {
    if (!window.MAPA_BR || !gastar()) return;
    mp = { s: modo, fila: filaMp(modo), i: 0, pts: 0, ac: 0, combo: 0, maxc: 0, erros: [], fim: false, t0: Date.now(), dur: DUR * 1000, fb: null, achados: {} };
    desenhar({ entra: true });
  }
  function fimMp() {
    if (!mp || mp.fim) return;
    mp.fim = true;
    const j = J(); j.mp = j.mp || { best: {} }; const b = j.mp.best[mp.s] || 0;
    mp.recorde = mp.pts > b && mp.pts > 0; if (mp.recorde) j.mp.best[mp.s] = mp.pts;
    save(); render(); contar(); if (mp.recorde) setTimeout(confete, 500);
  }
  function clicarMp(id) {
    if (!mp || mp.fim || mp.fb) return;
    const q = mp.fila[mp.i], ok = q.certos.includes(id);
    let ganho = 0;
    if (ok) { mp.combo++; mp.maxc = Math.max(mp.maxc, mp.combo); ganho = mult(mp.combo); mp.pts += ganho; mp.ac++; mp.dur = Math.min(mp.dur + 1000, Date.now() - mp.t0 + DUR * 1000); if (mp.s !== "regioes") mp.achados[id] = 1; }
    else { mp.combo = 0; mp.dur -= 2000; mp.erros.push({ tt: "Mapa do Brasil", p: q.texto.replace("Toque em: ", "").replace("Toque em um estado do ", "Região "), certo: q.resp }); }
    mp.fb = { ok, id, ganho };
    render();
    setTimeout(() => {
      if (!mp || mp.fim) return;
      mp.fb = null; mp.i++;
      if (mp.i >= mp.fila.length) { mp.pts += 10; toast("Mapa completo! +10 pts"); mp.fila = filaMp(mp.s); mp.i = 0; mp.achados = {}; }
      desenhar({ entra: true });
    }, ok ? 450 : 1300);
  }
  function mpHTML() {
    const nomes = { estados: "Estados", capitais: "Capitais", regioes: "Regiões" };
    if (mp.fim) { const j = J(); return fimHTML(mp, "Mapa do Brasil", (j.mp && j.mp.best[mp.s]) || 0, "", nomes[mp.s]) + `<div class="dbtns">${saldo() > 0 ? `<button class="btn" data-mpiniciar="${mp.s}">Jogar de novo (1 ficha)</button>` : `<span class="small muted">Sem fichas: estude para ganhar mais.</span>`}</div></div>`; }
    const q = mp.fila[mp.i], M = window.MAPA_BR, entra = fx.entra ? " rl-in" : "";
    const cls = (e) => {
      if (mp.fb) { if (e.id === mp.fb.id) return mp.fb.ok ? " mp-ok" : " mp-bad"; if (!mp.fb.ok && q.certos.includes(e.id)) return " mp-show"; }
      return mp.achados[e.id] ? " mp-found" : "";
    };
    const df = M.estados.find((e) => e.id === "df");
    return `<div class="rl mp">${hudHTML(mp, "mpT", "mpBar", DUR)}
      <div class="mp-q${entra}"><b>${esc(q.texto)}</b>${mp.s !== "regioes" ? `<span class="small muted">${Object.keys(mp.achados).length}/27 no mapa</span>` : ""}</div>
      <svg class="mp-map" viewBox="${M.viewBox}" role="img" aria-label="Mapa do Brasil por estados">${M.estados.map((e) => `<path class="mp-st${cls(e)}" d="${e.d}" data-mp="${e.id}"><title>${mp.fb || mp.achados[e.id] ? esc(e.nome) : "estado"}</title></path>`).join("")}
        <circle class="mp-hit" cx="${df.cx}" cy="${df.cy}" r="11" data-mp="df"/></svg>
      <p class="small muted" style="margin:0;text-align:center">${esc(M.credito)}</p></div>`;
  }

  /* ===================== Química 2048 ===================== */
  const EL = [null,
    ["H", "Hidrogênio", "nm", "O elemento mais abundante do Universo e combustível das estrelas."], ["He", "Hélio", "gn", "Gás nobre dos balões: quase não reage com nada."],
    ["Li", "Lítio", "al", "Metal das baterias de celulares e carros elétricos."], ["Be", "Berílio", "at", "Metal leve usado em ligas aeroespaciais."],
    ["B", "Boro", "sm", "Semimetal presente no bórax e no vidro que resiste ao calor."], ["C", "Carbono", "nm", "Base da química orgânica: forma grafite, diamante e a vida."],
    ["N", "Nitrogênio", "nm", "Cerca de 78% do ar; está nas proteínas e no DNA."], ["O", "Oxigênio", "nm", "Cerca de 21% do ar; essencial à respiração celular."],
    ["F", "Flúor", "ha", "O elemento mais eletronegativo; protege os dentes nas pastas."], ["Ne", "Neônio", "gn", "Brilha em vermelho-alaranjado nos letreiros luminosos."],
    ["Na", "Sódio", "al", "Com o cloro, forma o sal de cozinha (NaCl)."], ["Mg", "Magnésio", "at", "Fica no centro da molécula de clorofila."],
    ["Al", "Alumínio", "mt", "O metal mais abundante da crosta, extraído da bauxita."], ["Si", "Silício", "sm", "Base dos chips eletrônicos e da areia (SiO₂)."],
    ["P", "Fósforo", "nm", "Está no DNA, no ATP e nos fertilizantes."], ["S", "Enxofre", "nm", "Seus óxidos formam a chuva ácida."],
    ["Cl", "Cloro", "ha", "Desinfeta a água tratada e das piscinas."], ["Ar", "Argônio", "gn", "Cerca de 1% do ar; usado dentro de lâmpadas."],
    ["K", "Potássio", "al", "Essencial para nervos e músculos; está na banana."], ["Ca", "Cálcio", "at", "Forma ossos, dentes e o calcário."],
  ];
  const FAM = { nm: "não metal", gn: "gás nobre", al: "metal alcalino", at: "alcalino-terroso", sm: "semimetal", ha: "halogênio", mt: "metal" };
  let q2 = null, q2seq = 0;
  const Q2 = () => { const j = J(); j.q2 = j.q2 || { best: 0, desc: {} }; return j.q2; };
  function q2vazias() { const v = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (!q2.g[r][c]) v.push([r, c]); return v; }
  function q2nova() {
    const v = q2vazias(); if (!v.length) return null;
    const [r, c] = v[Math.floor(Math.random() * v.length)];
    const t = { id: ++q2seq, z: Math.random() < 0.9 ? 1 : 2, r, c, nova: true };
    q2.g[r][c] = t; return t;
  }
  function iniciarQ2() {
    if (!gastar()) return;
    q2 = { g: [0, 1, 2, 3].map(() => [null, null, null, null]), pts: 0, fim: false, max: 1, ultimo: null, morrendo: [] };
    q2nova(); q2nova();
    render();
  }
  function q2podeMover() {
    if (q2vazias().length) return true;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const z = q2.g[r][c].z; if ((c < 3 && q2.g[r][c + 1].z === z) || (r < 3 && q2.g[r + 1][c].z === z)) return true; }
    return false;
  }
  function q2mover(dir) {
    if (!q2 || q2.fim || q2.anim) return;
    let moveu = false, ganho = 0; const formados = [];
    const linhas = [0, 1, 2, 3].map((i) => [0, 1, 2, 3].map((k) => dir === "L" ? [i, k] : dir === "R" ? [i, 3 - k] : dir === "U" ? [k, i] : [3 - k, i]));
    const g2 = [0, 1, 2, 3].map(() => [null, null, null, null]);
    linhas.forEach((cells) => {
      const ts = cells.map(([r, c]) => q2.g[r][c]).filter(Boolean), out = [];
      ts.forEach((t) => { const u = out[out.length - 1]; if (u && !u.m && u.t.z === t.z) u.m = t; else out.push({ t }); });
      out.forEach((o, k) => {
        const [r, c] = cells[k];
        if (o.t.r !== r || o.t.c !== c) moveu = true;
        o.t.r = r; o.t.c = c; o.t.nova = false; g2[r][c] = o.t;
        if (o.m) { moveu = true; o.m.r = r; o.m.c = c; q2.morrendo.push(o.m); o.t.vira = o.t.z + 1; ganho += (o.t.z + 1) * 2; formados.push(o.t.z + 1); }
      });
    });
    if (!moveu) { const b = document.getElementById("q2b"); if (b) { b.classList.remove("jg-shake"); void b.offsetWidth; b.classList.add("jg-shake"); } return; }
    q2.g = g2; q2.pts += ganho; q2.anim = true;
    q2pintar();
    setTimeout(() => {
      q2.morrendo = [];
      let novo = null;
      for (const lin of q2.g) for (const t of lin) if (t && t.vira) { t.z = t.vira; delete t.vira; t.pop = true; q2.max = Math.max(q2.max, t.z); if (!Q2().desc[t.z]) { Q2().desc[t.z] = 1; novo = t.z; } }
      q2nova();
      q2.ultimo = novo || q2.ultimo;
      if (novo) { save(); q2.anuncio = novo; }
      if (!q2podeMover()) q2fim();
      q2.anim = false;
      q2pintar();
      for (const lin of q2.g) for (const t of lin) if (t) { t.pop = false; t.nova = false; }
    }, 130);
  }
  function q2fim() {
    q2.fim = true;
    const d = Q2(); q2.recorde = q2.pts > d.best && q2.pts > 0; if (q2.recorde) d.best = q2.pts;
    save(); setTimeout(() => { render(); contar(); if (q2.recorde) confete(); }, 400);
  }
  const q2tile = (t, morre) => {
    const e = EL[Math.min(t.z, 20)] || ["?", "?", "mt"];
    return `<div class="q2-t q2-${e[2]}${t.nova ? " q2-nova" : ""}${t.pop ? " q2-pop" : ""}${morre ? " q2-morre" : ""}" data-t="${t.id}" style="--r:${t.r};--c:${t.c}"><b>${e[0]}</b><span>${t.z}</span></div>`;
  };
  function q2tiles() { const out = []; q2.g.forEach((lin) => lin.forEach((t) => t && out.push(q2tile(t)))); q2.morrendo.forEach((t) => out.push(q2tile(t, true))); return out.join(""); }
  // atualiza só o tabuleiro, para os blocos deslizarem
  function q2pintar() {
    const b = document.getElementById("q2b"); if (!b) return;
    const vivos = {}; q2.g.forEach((lin) => lin.forEach((t) => t && (vivos[t.id] = t))); q2.morrendo.forEach((t) => (vivos[t.id] = t));
    b.querySelectorAll(".q2-t").forEach((el) => { if (!vivos[el.dataset.t]) el.remove(); });
    Object.values(vivos).forEach((t) => {
      let el = b.querySelector(`[data-t="${t.id}"]`);
      const html = q2tile(t, q2.morrendo.includes(t));
      if (!el) { b.insertAdjacentHTML("beforeend", html); return; }
      const tmp = document.createElement("div"); tmp.innerHTML = html; const n = tmp.firstChild;
      el.style.setProperty("--r", t.r); el.style.setProperty("--c", t.c);
      if (el.innerHTML !== n.innerHTML || el.className !== n.className) { el.className = n.className; el.innerHTML = n.innerHTML; }
    });
    const p = document.getElementById("q2pts"); if (p) p.textContent = q2.pts + " pts";
    if (q2.anuncio) { const a = document.getElementById("q2info"); if (a) a.outerHTML = q2info(q2.anuncio, true); q2.anuncio = null; const t = document.getElementById("q2tab"); if (t) t.outerHTML = q2tabela(); }
  }
  function q2info(z, novo) {
    if (!z) return `<div id="q2info" class="q2-info"><span class="small muted">Junte dois blocos iguais para formar o próximo elemento da tabela periódica: H + H = He, He + He = Li…</span></div>`;
    const e = EL[z];
    return `<div id="q2info" class="q2-info${novo ? " jg-in" : ""}"><span class="q2-mini q2-${e[2]}"><b>${e[0]}</b></span><div><b>${novo ? "Novo elemento: " : ""}${e[1]} (Z = ${z})</b><span class="small muted"> · ${FAM[e[2]]}</span><br><span class="small">${e[3]}</span></div></div>`;
  }
  function q2tabela() {
    const d = Q2().desc;
    return `<div id="q2tab" class="q2-tab" aria-label="Elementos descobertos">${EL.slice(1).map((e, i) => d[i + 1] || i === 0 ? `<span class="q2-mini q2-${e[2]}" title="${e[1]}"><b>${e[0]}</b></span>` : `<span class="q2-mini q2-lock" title="ainda não descoberto">?</span>`).join("")}</div>`;
  }
  function q2HTML() {
    if (q2.fim) {
      const e = EL[q2.max];
      return `<div class="rl"><div class="tm-top"><button class="btn sm ghost" data-jvolta>← Jogos</button><b>Química 2048</b></div>
        <div class="rl-fim jg-in"><div class="h-big num jg-score" data-contar="${q2.pts}">0</div><b>${q2.recorde ? "Novo recorde! 🏆" : `pontos · recorde: ${Q2().best}`}</b>
          <div class="jg-stats"><span>Maior elemento: <b>${e[1]} (${e[0]})</b></span></div></div>
        ${q2info(q2.max)}<h3 style="font-size:15px;margin:4px 0 0">Seus elementos descobertos</h3>${q2tabela()}
        <div class="dbtns">${saldo() > 0 ? `<button class="btn" data-jq2>Jogar de novo (1 ficha)</button>` : `<span class="small muted">Sem fichas: estude para ganhar mais.</span>`}</div></div>`;
    }
    return `<div class="rl q2"><div class="tm-top"><button class="btn sm ghost" data-jvolta>Encerrar</button><b>Química 2048</b><b class="num" id="q2pts" style="margin-left:auto">${q2.pts} pts</b></div>
      <div class="q2-b" id="q2b" aria-label="Tabuleiro: use as setas do teclado ou deslize o dedo">${[...Array(16)].map((_, i) => `<span class="q2-cel" style="--r:${Math.floor(i / 4)};--c:${i % 4}"></span>`).join("")}${q2tiles()}</div>
      <div class="q2-setas"><button class="btn sm ghost" data-q2="L" aria-label="Esquerda">←</button><button class="btn sm ghost" data-q2="U" aria-label="Cima">↑</button><button class="btn sm ghost" data-q2="D" aria-label="Baixo">↓</button><button class="btn sm ghost" data-q2="R" aria-label="Direita">→</button></div>
      ${q2info(q2.ultimo)}${q2tabela()}</div>`;
  }
  let toque = null;
  document.addEventListener("touchstart", (e) => { if (e.target.closest && e.target.closest("#q2b")) { const t = e.touches[0]; toque = [t.clientX, t.clientY]; } }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (!toque) return; const t = e.changedTouches[0], dx = t.clientX - toque[0], dy = t.clientY - toque[1]; toque = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 28) return;
    q2mover(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "R" : "L") : dy > 0 ? "D" : "U");
  });

  /* relógio dos jogos com tempo */
  setInterval(() => {
    [[rel, "rlT", "rlBar", fimRel], [lig, "lgT", "lgBar", fimLig], [mp, "mpT", "mpBar", fimMp]].forEach(([st, idT, idB, fim]) => {
      if (!st || st.fim) return;
      const left = restante(st), t = document.getElementById(idT), b = document.getElementById(idB);
      if (t) { t.textContent = "⏱ " + Math.ceil(left) + " s"; t.classList.toggle("low", left <= 10); }
      if (b) { b.style.width = Math.min(100, (left / (st === lig ? LDUR : DUR)) * 100) + "%"; b.classList.toggle("low", left <= 10); }
      if (left <= 0) fim();
    });
  }, 200);

  /* ===================== tela principal ===================== */
  let tela = "home";
  window.vJogos = function () {
    if (tela === "termo" && termo) return termoHTML();
    if (tela === "rel" && rel) return relHTML();
    if (tela === "lig" && lig) return ligHTML();
    if (tela === "lt" && lt) return ltHTML();
    if (tela === "mp" && mp) return mpHTML();
    if (tela === "q2" && q2) return q2HTML();
    const g = ganhos(), sal = saldo(), j = J(), hoje = j.termo[todayKey()];
    const todas = ["Todas", ...new Set(ALL_MODS.map((m) => m.s))];
    const subjs = todas.filter((s) => s === "Todas" || perguntas(s).length >= 8);
    const subjsL = todas.filter((s) => linhasTab(s, NPAR).length > 0);
    const lb = (j.lig && j.lig.best) || {};
    return `<div class="row-head" style="margin-top:4px"><h1 class="h-sec">Jogos</h1><span class="small muted">Estude para ganhar fichas e use as fichas para jogar</span></div>
    <div class="jg-saldo"><div><span class="small">Suas fichas</span><div class="h-big num"><span class="jg-coin" aria-hidden="true">🪙</span> ${sal}</div></div>
      <details><summary>Como ganhar fichas</summary><ul>${g.itens.map(([n, v, falta]) => `<li><b>${n}</b>: ${v} ficha${v === 1 ? "" : "s"}${typeof falta === "string" && falta ? ` <span class="small muted">(${falta})</span>` : ""}</li>`).join("")}<li class="small muted">Você já usou ${j.gastas} ficha${j.gastas === 1 ? "" : "s"}.</li></ul></details></div>
    <div class="jg-grid">
      <div class="jg-card" style="--g1:#4ADE80;--g2:#15803D"><div class="jg-ic" aria-hidden="true">🔤</div><h3>Termo do Vestibular</h3><p>Adivinhe o termo de prova do dia em 6 tentativas. Verde: letra no lugar certo; amarelo: a letra existe em outra posição.</p>
        <div class="jg-foot">${hoje ? `<button class="btn" data-jtermo="dia">${hoje.fim ? "Ver palavra do dia" : "Continuar a palavra do dia"}</button>` : `<button class="btn" data-jtermo="dia" ${sal < 1 ? "disabled" : ""}>Palavra do dia · 1 ficha</button>`}
          <button class="btn ghost sm" data-jtreino ${sal < 1 ? "disabled" : ""}>Treino · 1 ficha</button>
          ${j.tstats ? `<span class="small">${j.tstats.vit}/${j.tstats.jogos} acertadas</span>` : ""}</div></div>
      <div class="jg-card" style="--g1:#FBBF24;--g2:#EA580C"><div class="jg-ic" aria-hidden="true" style="animation-delay:.4s">⚡</div><h3>Desafio relâmpago</h3><p>Responda o máximo que conseguir. Acertos em sequência multiplicam os pontos (×2, ×3), cada acerto dá +1 s e cada erro tira 2 s.</p>
        <div class="jg-foot"><select id="relSubj" aria-label="Matéria do desafio">${subjs.map((s) => `<option value="${esc(s)}">${s === "Todas" ? "Todas as matérias" : esc(s)}${j.rel.best[s] ? ` · recorde ${j.rel.best[s]}` : ""}</option>`).join("")}</select>
          <button class="btn" data-jrel ${sal < 1 ? "disabled" : ""}>Jogar · 1 ficha</button></div></div>
      <div class="jg-card" style="--g1:#A78BFA;--g2:#6D28D9"><div class="jg-ic" aria-hidden="true" style="animation-delay:.8s">🔗</div><h3>Ligue os pares</h3><p>Ligue cada termo à sua definição antes do tempo acabar. Pares certos somem, rodadas novas aparecem e o relógio ganha +2 s a cada acerto.</p>
        <div class="jg-foot"><select id="ligSubj" aria-label="Matéria do Ligue os pares">${subjsL.map((s) => `<option value="${esc(s)}">${s === "Todas" ? "Todas as matérias" : esc(s)}${lb[s] ? ` · recorde ${lb[s]}` : ""}</option>`).join("")}</select>
          <button class="btn" data-jlig ${sal < 1 ? "disabled" : ""}>Jogar · 1 ficha</button></div></div>
    <div class="jg-card" style="--g1:#38BDF8;--g2:#1D4ED8"><div class="jg-ic" aria-hidden="true" style="animation-delay:1.2s">🕰️</div><h3>Linha do tempo</h3><p>Coloque cada fato histórico no lugar certo da linha do tempo. Você tem 3 vidas, e acertos seguidos multiplicam os pontos.</p>
        <div class="jg-foot"><select id="ltModo" aria-label="Fatos da linha do tempo">${[["tudo", "Brasil e mundo"], ["br", "História do Brasil"], ["mundo", "História geral"]].map(([v, n]) => `<option value="${v}">${n}${(j.lt && j.lt.best[v]) ? ` · recorde ${j.lt.best[v]}` : ""}</option>`).join("")}</select>
          <button class="btn" data-jlt ${sal < 1 ? "disabled" : ""}>Jogar · 1 ficha</button></div></div>
      <div class="jg-card" style="--g1:#2DD4BF;--g2:#0F766E"><div class="jg-ic" aria-hidden="true" style="animation-delay:1.6s">🗺️</div><h3>Mapa do Brasil</h3><p>Ache estados, capitais e regiões no mapa contra o relógio. Errou? O estado certo pisca para você aprender.</p>
        <div class="jg-foot"><select id="mpModo" aria-label="Modo do mapa">${[["estados", "Estados"], ["capitais", "Capitais"], ["regioes", "Regiões"]].map(([v, n]) => `<option value="${v}">${n}${(j.mp && j.mp.best[v]) ? ` · recorde ${j.mp.best[v]}` : ""}</option>`).join("")}</select>
          <button class="btn" data-jmp ${sal < 1 ? "disabled" : ""}>Jogar · 1 ficha</button></div></div>
      <div class="jg-card" style="--g1:#F472B6;--g2:#BE185D"><div class="jg-ic" aria-hidden="true" style="animation-delay:2s">⚗️</div><h3>Química 2048</h3><p>Deslize os blocos e junte elementos iguais para formar o próximo da tabela periódica: H + H vira He, até chegar ao Cálcio. Cada elemento novo traz uma curiosidade.</p>
        <div class="jg-foot"><button class="btn" data-jq2 ${sal < 1 ? "disabled" : ""}>Jogar · 1 ficha</button>${(j.q2 && j.q2.best) ? `<span class="small">recorde ${j.q2.best} · ${Object.keys(j.q2.desc || {}).length + 1}/20 elementos</span>` : ""}</div></div>
    </div>`;
  };

  /* ===================== eventos ===================== */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-jtermo],[data-jtreino],[data-jrel],[data-jlig],[data-jvolta],[data-tmk],[data-tmdica],[data-relop],[data-reliniciar],[data-liginiciar],[data-lg],[data-jlt],[data-ltiniciar],[data-lt],[data-jmp],[data-mpiniciar],[data-mp],[data-jq2],[data-q2]");
    if (!t) return;
    const d = t.dataset;
    if (d.jtermo !== undefined) { if (novoTermo(true)) { tela = "termo"; render(); } return; }
    if (d.jtreino !== undefined) { if (novoTermo(false)) { tela = "termo"; render(); } return; }
    if (d.jrel !== undefined) { rel = null; tela = "rel"; iniciarRel(document.getElementById("relSubj").value); if (!rel) tela = "home"; return; }
    if (d.reliniciar !== undefined) { rel = null; tela = "rel"; iniciarRel(d.reliniciar); if (!rel) { tela = "home"; render(); } return; }
    if (d.jlig !== undefined) { lig = null; tela = "lig"; iniciarLig(document.getElementById("ligSubj").value); if (!lig) tela = "home"; return; }
    if (d.liginiciar !== undefined) { lig = null; tela = "lig"; iniciarLig(d.liginiciar); if (!lig) { tela = "home"; render(); } return; }
    if (d.jlt !== undefined) { lt = null; tela = "lt"; iniciarLt(document.getElementById("ltModo").value); if (!lt) tela = "home"; return; }
    if (d.ltiniciar !== undefined) { lt = null; tela = "lt"; iniciarLt(d.ltiniciar); if (!lt) { tela = "home"; render(); } return; }
    if (d.lt !== undefined) { colocarLt(+d.lt); return; }
    if (d.jmp !== undefined) { mp = null; tela = "mp"; iniciarMp(document.getElementById("mpModo").value); if (!mp) tela = "home"; return; }
    if (d.mpiniciar !== undefined) { mp = null; tela = "mp"; iniciarMp(d.mpiniciar); if (!mp) { tela = "home"; render(); } return; }
    if (d.mp) { clicarMp(d.mp); return; }
    if (d.jq2 !== undefined) { q2 = null; tela = "q2"; iniciarQ2(); if (!q2) { tela = "home"; render(); } return; }
    if (d.q2) { q2mover(d.q2); return; }
    if (d.jvolta !== undefined) {
      if (tela === "rel" && rel && !rel.fim) { fimRel(); return; }
      if (tela === "lig" && lig && !lig.fim) { fimLig(); return; }
      if (tela === "lt" && lt && !lt.fim) { fimLt(); return; }
      if (tela === "mp" && mp && !mp.fim) { fimMp(); return; }
      if (tela === "q2" && q2 && !q2.fim) { q2fim(); return; }
      tela = "home"; rel = null; lig = null; lt = null; mp = null; q2 = null; render(); return;
    }
    if (d.tmk) { tecla(d.tmk); return; }
    if (d.tmdica !== undefined) { termo.dica = true; salvarTermo(); render(); return; }
    if (d.relop !== undefined) { responderRel(+d.relop); return; }
    if (d.lg) { const [lado, id] = d.lg.split("|"); clicarLig(lado, +id); return; }
  });
  document.addEventListener("keydown", (e) => {
    if (typeof VIEW !== "undefined" && VIEW === "jogos" && tela === "q2" && q2 && !q2.fim && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) {
      const dir = { ArrowLeft: "L", ArrowRight: "R", ArrowUp: "U", ArrowDown: "D", a: "L", d: "R", w: "U", s: "D" }[e.key];
      if (dir) { e.preventDefault(); q2mover(dir); }
      return;
    }
    if (typeof VIEW === "undefined" || VIEW !== "jogos" || tela !== "termo" || !termo || termo.fim) return;
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
    let k = e.key;
    if (k === "Enter") k = "ENTER"; else if (k === "Backspace") k = "⌫"; else k = norm(k);
    if (k === "ENTER" || k === "⌫" || /^[A-ZÇ]$/.test(k)) { e.preventDefault(); tecla(k); }
  });

  const css = `
.jg-saldo{display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;border:1.5px solid var(--line);border-radius:20px;padding:16px 18px;background:var(--butter);margin-bottom:16px}
.jg-saldo .h-big{font-size:40px;line-height:1}.jg-saldo details{flex:1;min-width:220px}.jg-saldo summary{cursor:pointer;font-weight:700}.jg-saldo ul{margin:8px 0 0;padding-left:18px;font-size:14px}
.jg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:16px}
.jg-card{border-radius:24px;padding:20px;color:#fff;background:linear-gradient(150deg,var(--g1),var(--g2));box-shadow:0 18px 34px -16px var(--g2);display:flex;flex-direction:column;gap:8px}
.jg-card h3{font-size:21px;margin:0;color:#fff}.jg-card p{margin:0;color:rgba(255,255,255,.9);font-size:14.5px;line-height:1.45}
.jg-ic{font-size:34px;filter:drop-shadow(0 4px 6px rgba(0,0,0,.25))}
.jg-foot{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:auto;padding-top:8px}
.jg-card .btn{background:#fff;color:var(--g2);border-color:#fff}.jg-card .btn.ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.8)}
.jg-card .btn:disabled{opacity:.55}
.jg-card select{border-radius:12px;border:0;padding:9px 10px;font:inherit;max-width:100%;color:var(--ink)}
.jg-soon{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
.jg-s{border:1.5px dashed var(--line);border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:2px;opacity:.75}.jg-s>span:first-child{font-size:24px}
.tm,.rl{max-width:560px;margin:0 auto;display:flex;flex-direction:column;gap:12px;overflow-x:clip;padding:2px}
.tm-top{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.tm-grid{display:grid;gap:6px;margin:4px auto}
.tm-row{display:grid;gap:6px}
.tm-c{aspect-ratio:1;display:grid;place-items:center;border:2px solid var(--hair);border-radius:10px;font-family:var(--display);font-weight:800;font-size:clamp(16px,4.6vw,26px);background:var(--white);text-transform:uppercase}
.tm-f{border-color:var(--ink)}
.tm-v{background:#22C55E;border-color:#22C55E;color:#fff}.tm-a{background:#FACC15;border-color:#FACC15;color:var(--ink)}.tm-x{background:#9CA3AF;border-color:#9CA3AF;color:#fff}
.tm-kb{display:flex;flex-direction:column;gap:6px;user-select:none}
.tm-kr{display:flex;gap:4px;justify-content:center}
.tm-k{flex:1;max-width:44px;height:48px;border-radius:8px;border:1.5px solid var(--line);background:var(--white);font-weight:800;font-size:15px;padding:0;cursor:pointer;color:var(--ink)}
.tm-k.tm-wide{max-width:72px;flex:1.6;font-size:13px}
.tm-k.tm-v{background:#22C55E;border-color:#22C55E;color:#fff}.tm-k.tm-a{background:#FACC15;border-color:#FACC15}.tm-k.tm-x{background:#9CA3AF;border-color:#9CA3AF;color:#fff}
.tm-dica{text-align:center;min-height:32px}
.tm-fim{border:1.5px solid var(--line);border-radius:16px;padding:14px;background:var(--rose)}.tm-fim.ok{background:var(--mint)}.tm-fim p{margin:6px 0 0}
.rl-bar{height:8px;border-radius:99px;background:var(--hair);overflow:hidden}.rl-bar i{display:block;height:100%;background:linear-gradient(90deg,#FBBF24,#EA580C);transition:width .25s linear}
.rl-q{border:1.5px solid var(--line);border-radius:18px;padding:14px;background:var(--white);display:flex;flex-direction:column;gap:6px}
.rl-q .chip{align-self:flex-start}.rl-q h3{font-size:19px;margin:4px 0 0;overflow-wrap:anywhere}
.rl-ops{display:flex;flex-direction:column;gap:8px}
.rl-fim{text-align:center;padding:10px}.rl-rev{border-top:1px dashed var(--hair);padding:8px 0;overflow-wrap:anywhere}

.jg-card{transition:transform .2s cubic-bezier(.3,1.4,.5,1),box-shadow .2s}.jg-card:hover{transform:translateY(-4px) rotate(-.4deg);box-shadow:0 24px 40px -16px var(--g2)}
.jg-ic{animation:jg-bob 3s ease-in-out infinite;display:inline-block;align-self:flex-start}
.jg-coin{display:inline-block;animation:jg-coin 2.8s ease-in-out infinite}
.jg-confete{position:fixed;inset:0;pointer-events:none;z-index:95}
.tm-pop{animation:tm-pop .12s ease-out}
.tm-flip{animation:tm-flip .5s ease-in-out var(--fd,0s) backwards}
.tm-shake{animation:jg-shake .4s}
.tm-winrow .tm-c{animation:tm-flip .5s ease-in-out var(--fd,0s) backwards,tm-jump .5s ease-out calc(var(--wd) + var(--i,0s)) both}
.tm-winrow .tm-c:nth-child(2){--i:.08s}.tm-winrow .tm-c:nth-child(3){--i:.16s}.tm-winrow .tm-c:nth-child(4){--i:.24s}.tm-winrow .tm-c:nth-child(5){--i:.32s}.tm-winrow .tm-c:nth-child(6){--i:.4s}.tm-winrow .tm-c:nth-child(7){--i:.48s}.tm-winrow .tm-c:nth-child(8){--i:.56s}
.jg-in{animation:jg-in .45s ease-out backwards}
.jg-wiggle{animation:jg-wiggle 2.4s ease-in-out infinite}
.rl-in{animation:rl-in .35s cubic-bezier(.2,.9,.3,1.2) backwards}
.jg-pop{animation:jg-pop .35s ease-out}
.jg-shake{animation:jg-shake .4s}
.jg-time{transition:color .2s}.jg-time.low{color:var(--bad);animation:jg-beat 1s ease-in-out infinite}
.rl-bar i.low{background:linear-gradient(90deg,#F87171,#DC2626)}
.jg-pts{position:relative}
.jg-float{position:absolute;right:0;top:-4px;color:#16A34A;font-weight:800;animation:jg-float .7s ease-out forwards;pointer-events:none}
.jg-dt{font-weight:800;font-size:13px;animation:jg-float .9s ease-out forwards}.jg-dt.up{color:#16A34A}.jg-dt.down{color:var(--bad)}
.jg-combo{background:linear-gradient(90deg,#FB923C,#EF4444);color:#fff;font-weight:800;border-radius:99px;padding:2px 10px;font-size:13px}
.jg-combo.novo{animation:jg-pop .45s ease-out}
.jg-score{font-size:64px}
.jg-stats{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:10px;font-size:14px}
.lg-head{display:flex;flex-direction:column;gap:4px}.lg-head .chip{align-self:flex-start}
.lg-cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.35fr);gap:10px}
.lg-col{display:flex;flex-direction:column;gap:8px}
.lg-it{border:1.5px solid var(--line);border-radius:14px;background:var(--white);padding:10px 12px;text-align:left;font:inherit;font-size:14px;line-height:1.35;cursor:pointer;color:var(--ink);min-height:52px;overflow-wrap:anywhere;transition:transform .15s,background .15s,opacity .3s}
.lg-it:hover{transform:translateY(-2px)}
.lg-sel{background:var(--lilac);border-color:var(--violet);box-shadow:0 0 0 3px rgba(78,61,242,.25);transform:scale(1.02)}
.lg-ok{background:#22C55E;border-color:#16A34A;color:#fff;animation:jg-pop .35s ease-out}
.lg-bad{background:#FEE2E2;border-color:var(--bad)}
.lg-done{opacity:0;transform:scale(.85);pointer-events:none;min-height:0;padding-top:0;padding-bottom:0;border-width:0;height:0;margin:-4px 0}
@keyframes tm-pop{50%{transform:scale(1.14)}}
@keyframes tm-flip{0%{transform:rotateX(0);background:var(--white);border-color:var(--ink);color:var(--ink)}49%{transform:rotateX(90deg);background:var(--white);border-color:var(--ink);color:var(--ink)}50%{transform:rotateX(90deg)}100%{transform:rotateX(0)}}
@keyframes tm-jump{30%{transform:translateY(-14px)}60%{transform:translateY(2px)}}
@keyframes jg-shake{20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
@keyframes jg-in{from{opacity:0;transform:translateY(12px) scale(.98)}}
@keyframes rl-in{from{opacity:0;transform:translateX(26px)}}
@keyframes jg-pop{50%{transform:scale(1.07)}}
@keyframes jg-beat{50%{transform:scale(1.12)}}
@keyframes jg-float{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-22px)}}
@keyframes jg-bob{50%{transform:translateY(-6px) rotate(-6deg)}}
@keyframes jg-coin{0%,70%,100%{transform:rotateY(0)}85%{transform:rotateY(180deg)}}
@keyframes jg-wiggle{0%,85%,100%{transform:rotate(0)}88%{transform:rotate(-4deg)}92%{transform:rotate(4deg)}96%{transform:rotate(-2deg)}}
@media (max-width:560px){.lg-cols{grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:8px}.lg-it{font-size:13px;padding:9px 10px}.jg-score{font-size:52px}}

.lt-vidas{font-size:18px;letter-spacing:2px}.lt-vida.off{opacity:.45}
.lt-cur{border:2px solid var(--ink);border-radius:18px;padding:14px;background:var(--butter);display:flex;flex-direction:column;gap:6px;position:sticky;top:8px;z-index:2;box-shadow:0 10px 20px -12px rgba(0,0,0,.4)}
.lt-cur b{font-size:18px;line-height:1.3}.lt-cur .chip{align-self:flex-start}
.lt-linha{display:flex;flex-direction:column;gap:4px;border-left:3px solid var(--violet);margin-left:10px;padding-left:12px}
.lt-ev{position:relative;border:1.5px solid var(--line);border-radius:14px;padding:8px 12px;background:var(--white);display:flex;gap:10px;align-items:baseline}
.lt-ev::before{content:"";position:absolute;left:-20px;top:14px;width:11px;height:11px;border-radius:50%;background:var(--violet);border:2px solid var(--panel)}
.lt-ev b{min-width:68px;font-family:var(--display);font-weight:800}
.lt-ok{background:#DCFCE7;border-color:#16A34A}.lt-bad{background:#FEE2E2;border-color:var(--bad)}
.lt-slot{border:1.5px dashed var(--violet);border-radius:10px;background:transparent;color:var(--violet);font:inherit;font-weight:700;font-size:13px;padding:5px;cursor:pointer;transition:background .15s,transform .15s}
.lt-slot:hover:not(:disabled){background:var(--lav);transform:scale(1.02)}.lt-slot:disabled{opacity:.35}
.mp-q{border:1.5px solid var(--line);border-radius:16px;padding:12px 14px;background:var(--white);display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap}.mp-q b{font-size:18px}
.mp-map{width:100%;max-width:520px;margin:0 auto;display:block;touch-action:manipulation}
.mp-st{fill:#E8F5EE;stroke:var(--ink);stroke-width:1;cursor:pointer;transition:fill .2s}
.mp-st:hover{fill:#C6F0D6}
.mp-found{fill:#86EFAC}
.mp-ok{fill:#22C55E;animation:mp-flash .45s}
.mp-bad{fill:#F87171}
.mp-show{fill:#FACC15;animation:mp-pulse .5s ease-in-out 2}
.mp-hit{fill:transparent;cursor:pointer}
@keyframes mp-flash{50%{fill:#BBF7D0}}@keyframes mp-pulse{50%{fill:#FEF08A}}
.q2{max-width:460px}
.q2-b{position:relative;width:100%;aspect-ratio:1;background:#3B3547;border-radius:18px;touch-action:none;user-select:none}
.q2-cel,.q2-t{position:absolute;left:0;top:0;width:calc((100% - 50px)/4);height:calc((100% - 50px)/4);border-radius:12px;transform:translate(calc(10px + var(--c) * (100% + 10px)),calc(10px + var(--r) * (100% + 10px)))}
.q2-b{--gap:10px}.q2-cel{background:rgba(255,255,255,.1)}
.q2-t{display:flex;flex-direction:column;align-items:center;justify-content:center;transition:transform .12s ease-in-out;color:#fff;box-shadow:inset 0 -4px 0 rgba(0,0,0,.18)}
.q2-t b{font-family:var(--display);font-weight:800;font-size:clamp(20px,7vw,34px);line-height:1}.q2-t span{font-size:11px;opacity:.85;margin-top:2px}
.q2-nova{animation:q2-nova .2s ease-out}.q2-pop{animation:q2-pop .2s ease-out}.q2-morre{z-index:0;opacity:.9}
.q2-nm{background:#6366F1}.q2-gn{background:#A855F7}.q2-al{background:#EF4444}.q2-at{background:#F97316}.q2-sm{background:#14B8A6}.q2-ha{background:#22C55E}.q2-mt{background:#64748B}.q2-lock{background:var(--hair);color:var(--muted)}
.q2-setas{display:flex;gap:8px;justify-content:center}
.q2-info{display:flex;gap:10px;align-items:center;border:1.5px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--white)}
.q2-mini{width:38px;height:38px;border-radius:9px;display:grid;place-items:center;color:#fff;flex:none;font-size:14px}.q2-mini b{font-family:var(--display);font-weight:800}
.q2-tab{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:4px}.q2-tab .q2-mini{width:auto;height:auto;aspect-ratio:1;font-size:12px}
@keyframes q2-nova{from{opacity:0;scale:.3}}@keyframes q2-pop{50%{scale:1.18}}
`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  window.JOGOS_PALAVRAS = P;
  window.jogosEstado = () => ({ tela, rel, lig, termo, lt, mp, q2 });
})();
