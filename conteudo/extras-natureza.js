// Conteúdo extra (texto original do Easy Study): Biologia, Química e Física.
window.EXTRA = window.EXTRA || {};
(function () {
  const E = window.EXTRA;
  const W = (t) => ["Wikipédia: " + t, "https://pt.wikipedia.org/wiki/" + encodeURIComponent(t.replace(/ /g, "_"))];
  const KHAN_BIO = ["Khan Academy (em português): Biologia", "https://pt.khanacademy.org/science/biology"];
  const KHAN_QUI = ["Khan Academy (em português): Química", "https://pt.khanacademy.org/science/chemistry"];
  const KHAN_FIS = ["Khan Academy (em português): Física", "https://pt.khanacademy.org/science/physics"];
  const PHET = ["PhET Colorado: simulações gratuitas em português", "https://phet.colorado.edu/pt_BR/"];
  const FIOCRUZ = ["Fiocruz: Portal de divulgação científica", "https://portal.fiocruz.br/"];
  const INEP = ["INEP: provas e gabaritos oficiais do ENEM", "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos"];

  /* ===================== BIOLOGIA ===================== */
  E["Biologia#0"] = {
    s: [
      ["Vitaminas e alimentação", "Vitaminas são compostos orgânicos que o corpo precisa em pequenas quantidades e, em geral, não produz sozinho. Elas se dividem em **lipossolúveis** (A, D, E e K, armazenadas na gordura) e **hidrossolúveis** (complexo B e C, eliminadas pela urina, por isso precisam de reposição frequente).\n\nAs carências mais cobradas: falta de vitamina A causa cegueira noturna; de C, escorbuto (sangramento na gengiva); de D, raquitismo (ossos frágeis, porque a vitamina D ajuda a absorver cálcio); de K, problemas de coagulação; de B12 e ácido fólico, anemias. A vitamina D é a única produzida em quantidade relevante pela pele, com exposição ao sol."],
      ["Ligando tudo: do alimento à energia", "Quando você come um pão, o amido é quebrado em glicose no intestino. A glicose vai pelo sangue até as células, onde a respiração celular a transforma em ATP, a moeda de energia da célula. Proteínas da carne viram aminoácidos, que serão usados para montar as proteínas do seu corpo seguindo as instruções do DNA.\n\nPerceba a lógica: **carboidratos dão energia rápida, lipídios guardam energia, proteínas constroem e trabalham, ácidos nucleicos guardam a informação**. Quase toda questão de bioquímica pede que você reconheça qual molécula está fazendo qual papel numa situação do cotidiano (dieta, doença, rótulo de alimento)."]
    ],
    fig: [{ id: "dna", at: 3, cap: "Pareamento das bases nitrogenadas no DNA (ilustração Easy Study)." }],
    tab: [{ at: 4, title: "Vitaminas mais cobradas", head: ["Vitamina", "Fontes", "Carência causa"], rows: [["A", "cenoura, fígado, leite", "cegueira noturna"], ["C", "frutas cítricas, acerola", "escorbuto"], ["D", "sol, peixes, ovos", "raquitismo"], ["K", "folhas verdes", "hemorragias"], ["B12", "carnes, ovos", "anemia perniciosa"]] }],
    sabia: "A acerola, fruta muito comum no Brasil, tem dezenas de vezes mais vitamina C que a laranja.",
    prova: "O ENEM costuma dar um rótulo de alimento, uma dieta ou um sintoma e pedir a molécula ou vitamina envolvida. Também aparece enzima em contexto: por que a febre alta é perigosa (desnaturação) ou por que o abacaxi amacia a carne (enzimas que quebram proteínas).",
    ler: [W("Biomolécula"), W("Vitamina"), KHAN_BIO]
  };

  E["Biologia#1"] = {
    s: [
      ["Respiração celular e fotossíntese", "As duas reações mais importantes da vida são opostas e complementares. A **fotossíntese**, nos cloroplastos, usa luz, gás carbônico e água para produzir glicose e liberar oxigênio. A **respiração celular**, nas mitocôndrias, usa glicose e oxigênio para produzir ATP, liberando gás carbônico e água.\n\nA respiração aeróbica tem três etapas: glicólise (no citoplasma), ciclo de Krebs e cadeia respiratória (na mitocôndria). O rendimento é bem maior que o da **fermentação**, que ocorre sem oxigênio: leveduras fazem fermentação alcoólica (pão e cerveja) e nossos músculos, em esforço intenso, fazem fermentação lática."],
      ["Mitose x meiose, sem confusão", "**Mitose** gera duas células iguais à mãe, com o mesmo número de cromossomos. Serve para crescimento, regeneração e reprodução assexuada. **Meiose** gera quatro células com metade dos cromossomos e serve para formar gametas.\n\nA meiose tem o *crossing-over*, troca de pedaços entre cromossomos homólogos, que aumenta a variabilidade genética. É por isso que irmãos dos mesmos pais são diferentes. Câncer, por sua vez, é mitose descontrolada: células que perdem os freios do ciclo celular e se dividem sem parar."]
    ],
    fig: [{ id: "celula", at: 1, cap: "Célula animal e suas principais organelas (ilustração Easy Study)." }],
    tab: [{ at: 5, title: "Mitose x meiose", head: ["", "Mitose", "Meiose"], rows: [["Células-filhas", "2", "4"], ["Cromossomos", "iguais (2n → 2n)", "metade (2n → n)"], ["Variabilidade", "não", "sim (crossing-over)"], ["Função", "crescimento e reparo", "formar gametas"]] }],
    sabia: "As mitocôndrias têm DNA próprio, herdado apenas da mãe. Isso apoia a teoria de que elas eram bactérias que passaram a viver dentro de outras células (endossimbiose).",
    prova: "Questões mostram uma célula ou um processo (produção de proteína, secreção de enzima, fermentação na indústria) e pedem a organela ou etapa responsável. Fique atento a osmose em situações cotidianas, como salgar carne ou murchar alface com tempero.",
    ler: [W("Célula"), W("Mitose"), W("Meiose"), KHAN_BIO]
  };

  E["Biologia#2"] = {
    s: [
      ["Heredogramas passo a passo", "Heredograma é a árvore genealógica da genética: quadrados são homens, círculos são mulheres, símbolos pintados indicam quem tem a característica.\n\nO truque principal: **pais iguais com filho diferente** indicam que os pais são heterozigotos e que a característica do filho é recessiva. Se dois pais sem a doença têm um filho afetado, a doença é recessiva. Se dois pais afetados têm um filho normal, a doença é dominante. Depois disso, monte o quadro de Punnett e calcule a probabilidade pedida, lembrando de multiplicar quando há mais de uma condição (por exemplo, ser menina **e** afetada)."],
      ["Biotecnologia", "A engenharia genética permite cortar e colar DNA. Com isso produzimos **transgênicos** (organismos com gene de outra espécie, como bactérias que fabricam insulina humana), clones e testes de DNA.\n\nA técnica **CRISPR** funciona como uma tesoura molecular que edita genes com precisão. Testes de paternidade comparam trechos de DNA: metade vem da mãe e metade do pai. Nas provas, aparecem também as discussões éticas: segurança alimentar dos transgênicos, patentes e edição de embriões."]
    ],
    fig: [{ id: "punnett", at: 1, cap: "Quadro de Punnett de um cruzamento entre heterozigotos (ilustração Easy Study)." }],
    tab: [{ at: 2, title: "Sistema ABO", head: ["Tipo", "Genótipos", "Antígeno na hemácia", "Anticorpo no plasma"], rows: [["A", "IᴬIᴬ ou Iᴬi", "A", "anti-B"], ["B", "IᴮIᴮ ou Iᴮi", "B", "anti-A"], ["AB", "IᴬIᴮ", "A e B", "nenhum (receptor universal)"], ["O", "ii", "nenhum", "anti-A e anti-B (doador universal)"]] }],
    sabia: "Mendel fez seus experimentos com ervilhas num jardim de mosteiro, e seu trabalho ficou quase esquecido por cerca de 35 anos até ser redescoberto em 1900.",
    prova: "Quase sempre há um heredograma ou um caso de família e uma pergunta de probabilidade. Escreva os genótipos de cada pessoa antes de calcular. Daltonismo e hemofilia (ligados ao X) aparecem muito, assim como transfusão sanguínea.",
    ler: [W("Leis de Mendel"), W("Sistema ABO"), W("CRISPR"), KHAN_BIO]
  };

  E["Biologia#3"] = {
    s: [
      ["Sucessão ecológica", "Sucessão é a mudança gradual de uma comunidade ao longo do tempo. Começa com **espécies pioneiras** (liquens e gramíneas, resistentes e de crescimento rápido), que preparam o solo para outras. Com o tempo, aparecem arbustos e árvores, até a **comunidade clímax**, mais estável e com maior biodiversidade.\n\nA sucessão primária ocorre onde nunca houve vida (rocha nua, lava). A secundária ocorre onde a comunidade foi destruída, mas o solo ficou (área queimada, pasto abandonado). Recuperar áreas degradadas com plantio de espécies pioneiras é uma aplicação prática."],
      ["Problemas ambientais em cadeia", "As questões ambientais quase sempre envolvem um efeito dominó. **Eutrofização**: esgoto e fertilizantes levam excesso de nutrientes à água, as algas proliferam, depois morrem, e as bactérias decompositoras consomem o oxigênio, matando peixes.\n\n**Magnificação trófica**: substâncias que não são eliminadas, como mercúrio e alguns agrotóxicos, se acumulam ao longo da cadeia alimentar, ficando mais concentradas nos predadores do topo. **Efeito estufa** é natural e necessário; o problema é sua intensificação pela queima de combustíveis fósseis e pelo desmatamento."]
    ],
    fig: [{ id: "piramide", at: 0, cap: "Pirâmide de energia: cerca de 10% passa a cada nível trófico (ilustração Easy Study)." }, { id: "nitrogenio", at: 1, cap: "Ciclo do nitrogênio (ilustração Easy Study)." }],
    tab: [{ at: 2, title: "Relações ecológicas", head: ["Relação", "Tipo", "Exemplo"], rows: [["Mutualismo", "+/+ obrigatória", "liquens (alga + fungo)"], ["Protocooperação", "+/+ facultativa", "anu e gado"], ["Comensalismo", "+/0", "rêmora e tubarão"], ["Parasitismo", "+/−", "carrapato e cão"], ["Predação", "+/−", "onça e capivara"], ["Competição", "−/−", "plantas disputando luz"]] }],
    sabia: "Bactérias do gênero Rhizobium vivem nas raízes de feijão e soja e transformam o nitrogênio do ar em adubo natural, o que reduz o uso de fertilizantes.",
    prova: "O ENEM adora eutrofização, magnificação trófica e rotação de culturas com leguminosas. Leia o texto procurando a causa e a consequência, e identifique em qual ponto da cadeia ou do ciclo a ação humana interfere.",
    ler: [W("Cadeia alimentar"), W("Ciclo do nitrogênio"), W("Eutrofização"), KHAN_BIO]
  };

  E["Biologia#4"] = {
    s: [
      ["Sistema nervoso", "O sistema nervoso central (encéfalo e medula) processa informações; o periférico (nervos) leva e traz mensagens. O neurônio recebe estímulos pelos dendritos e transmite o impulso pelo axônio até a sinapse, onde **neurotransmissores** passam a mensagem adiante.\n\nO **ato reflexo** (tirar a mão do fogo) é coordenado pela medula, antes mesmo de o cérebro perceber a dor. Muitas drogas e remédios agem nas sinapses, imitando ou bloqueando neurotransmissores como dopamina e serotonina."],
      ["Homeostase: o corpo em equilíbrio", "Homeostase é a capacidade de manter o ambiente interno estável. Exemplos: o **pâncreas** libera insulina quando a glicose sobe (após a refeição) e glucagon quando ela cai. No diabetes tipo 1, o corpo não produz insulina; no tipo 2, as células respondem mal a ela.\n\nNa temperatura, suamos no calor (a evaporação resfria a pele) e trememos no frio (a contração muscular gera calor). Os rins controlam água e sais: o hormônio ADH faz o corpo reter água quando estamos desidratados, por isso a urina fica mais concentrada."]
    ],
    fig: [{ id: "circulacao", at: 1, cap: "Pequena e grande circulação (ilustração Easy Study)." }],
    tab: [{ at: 2, title: "Hormônios em destaque", head: ["Glândula", "Hormônio", "Função"], rows: [["Pâncreas", "insulina / glucagon", "baixa / eleva a glicose"], ["Tireoide", "T3 e T4", "metabolismo"], ["Suprarrenal", "adrenalina", "luta ou fuga"], ["Hipófise", "GH, ADH", "crescimento, retenção de água"], ["Ovários / testículos", "estrogênio / testosterona", "características sexuais"]] }],
    sabia: "O intestino delgado tem vilosidades e microvilosidades que, juntas, aumentam muitíssimo a área de absorção. Se fosse esticado, ocuparia uma área parecida com a de um apartamento pequeno.",
    prova: "Aparecem situações de saúde: exame de glicemia, efeito de um remédio, por que o atleta usa altitude para treinar (mais hemácias). Relacione o órgão à função e pense no mecanismo de retroalimentação.",
    ler: [W("Homeostase"), W("Sistema circulatório"), W("Sistema endócrino"), KHAN_BIO]
  };

  E["Biologia#5"] = {
    s: [
      ["Seleção natural em ação", "Seleção natural não cria características: ela **seleciona** variações que já existem. Exemplo clássico: bactérias expostas a antibiótico. Por mutação, algumas já eram resistentes; o remédio mata as sensíveis e as resistentes se multiplicam. Por isso não se deve interromper o tratamento antes da hora nem usar antibiótico sem receita.\n\nO mesmo vale para insetos resistentes a inseticidas e para as mariposas da Revolução Industrial: com troncos escurecidos pela fuligem, as mariposas escuras ficavam menos visíveis aos predadores e passaram a predominar."],
      ["Origem da vida e evolução humana", "A hipótese mais aceita para a origem da vida é a **evolução química**: moléculas simples da Terra primitiva, com energia de raios e radiação, formaram moléculas orgânicas. O experimento de Miller e Urey (1953) mostrou que aminoácidos podem surgir dessa forma.\n\nNa evolução humana, o ser humano não descende do chimpanzé: ambos têm um **ancestral comum**. O gênero Homo surgiu na África, e o Homo sapiens se espalhou pelo mundo a partir de lá. Cuidado com frases como \"o homem veio do macaco\": as provas cobram exatamente essa correção."]
    ],
    fig: [{ id: "evolucao", at: 2, cap: "Árvore evolutiva: espécies atuais compartilham ancestrais comuns (ilustração Easy Study)." }],
    tab: [{ at: 0, title: "Lamarck x Darwin", head: ["", "Lamarck", "Darwin"], rows: [["Ideia central", "uso e desuso; herança dos caracteres adquiridos", "seleção natural de variações"], ["Girafa", "esticou o pescoço e passou para os filhos", "as de pescoço longo sobreviveram mais"], ["Aceita hoje?", "não", "sim, completada pela genética"]] }],
    sabia: "Darwin e Alfred Russel Wallace chegaram à ideia de seleção natural de forma independente, e os trabalhos dos dois foram apresentados juntos em 1858.",
    prova: "O ENEM pede para identificar a explicação darwinista ou lamarckista num texto e cobra resistência a antibióticos e inseticidas. Desconfie de alternativas que dizem que o organismo 'se adapta porque precisa': isso é lamarckismo.",
    ler: [W("Seleção natural"), W("Evolução"), W("Experimento de Miller-Urey"), KHAN_BIO]
  };

  E["Biologia#6"] = {
    s: [
      ["Doenças no Brasil", "Muitas doenças cobradas são ligadas a saneamento e a vetores. **Dengue, zika e chikungunya** são viroses transmitidas pelo mosquito Aedes aegypti, que se reproduz em água parada. **Malária** é causada por protozoário e transmitida pelo Anopheles. **Doença de Chagas** é causada pelo Trypanosoma cruzi, transmitido pelas fezes do barbeiro.\n\nEsquistossomose, ascaridíase e amebíase estão ligadas à falta de esgoto tratado e água potável. Por isso, a melhor prevenção é coletiva: saneamento básico, combate ao vetor e educação em saúde."],
      ["O SUS e a saúde coletiva", "O Brasil tem um dos maiores programas públicos de vacinação do mundo, o **Programa Nacional de Imunizações**, que já ajudou a eliminar a varíola e a poliomielite no país. A **imunidade de rebanho** acontece quando uma grande parte da população está vacinada, o que protege inclusive quem não pode tomar a vacina.\n\nQuando a cobertura vacinal cai, doenças controladas podem voltar, como aconteceu com o sarampo no Brasil a partir de 2018. Questões de prova costumam unir biologia e cidadania nesse tema."]
    ],
    fig: [{ id: "vacina", at: 3, cap: "Vacina gera memória imunológica; soro dá proteção imediata e passageira (ilustração Easy Study)." }],
    tab: [{ at: 4, title: "Doenças e prevenção", head: ["Doença", "Agente", "Transmissão", "Prevenção"], rows: [["Dengue", "vírus", "Aedes aegypti", "eliminar água parada"], ["Malária", "protozoário", "Anopheles", "telas, repelente"], ["Chagas", "protozoário", "barbeiro", "casas de alvenaria"], ["Tuberculose", "bactéria", "ar", "vacina BCG"], ["Esquistossomose", "verme", "água com larvas", "saneamento"]] }],
    sabia: "A vacina contra a varíola foi a primeira da história, criada por Edward Jenner em 1796, e a palavra 'vacina' vem de 'vaca', porque ele usou o vírus da varíola bovina.",
    prova: "Pedem a forma de prevenção mais eficaz para uma doença descrita (quase sempre a ação sobre o vetor ou o saneamento) e a diferença entre vacina e soro. Lembre: antibiótico não funciona contra vírus.",
    ler: [W("Vacina"), W("Programa Nacional de Imunizações"), FIOCRUZ, KHAN_BIO]
  };

  /* ===================== QUÍMICA ===================== */
  E["Química#0"] = {
    s: [
      ["Distribuição eletrônica", "Os elétrons ocupam subníveis em ordem crescente de energia, seguindo o diagrama de Linus Pauling: 1s 2s 2p 3s 3p 4s 3d 4p 5s... Os subníveis comportam no máximo: s = 2, p = 6, d = 10, f = 14 elétrons.\n\nExemplo: o sódio (Z = 11) fica 1s² 2s² 2p⁶ 3s¹. A **camada de valência** (a mais externa) tem 1 elétron, por isso o sódio está na família 1 e tende a perder esse elétron, formando Na⁺. A distribuição explica a posição na tabela e o tipo de ligação que o átomo faz."],
      ["Radioatividade no cotidiano", "A radioatividade tem aplicações importantes: **datação por carbono-14** (estima a idade de fósseis de até cerca de 50 mil anos), radioterapia contra o câncer, exames de imagem (medicina nuclear) e geração de energia nas usinas de Angra.\n\nO conceito-chave é **meia-vida**: tempo para metade da amostra se desintegrar. Depois de 1 meia-vida resta 1/2; depois de 2, resta 1/4; depois de 3, 1/8. O acidente com césio-137 em Goiânia (1987), o maior acidente radiológico do Brasil, mostra os riscos do descarte incorreto de material radioativo."]
    ],
    fig: [{ id: "atomo", at: 0, cap: "Modelo de Bohr: elétrons em níveis de energia (ilustração Easy Study)." }, { id: "periodica", at: 3, cap: "Tendências das propriedades periódicas (ilustração Easy Study)." }],
    tab: [{ at: 2, title: "Emissões radioativas", head: ["Emissão", "O que é", "Poder de penetração"], rows: [["Alfa (α)", "2 prótons + 2 nêutrons", "baixo (barrada por papel)"], ["Beta (β)", "elétron", "médio (barrada por alumínio)"], ["Gama (γ)", "onda eletromagnética", "alto (precisa de chumbo ou concreto)"]] }],
    sabia: "Os fogos de artifício são coloridos pelo mesmo motivo que o modelo de Bohr explica: cada elemento emite luz de cor própria quando seus elétrons voltam a níveis menos energéticos (sódio, amarelo; estrôncio, vermelho; cobre, verde-azulado).",
    prova: "Meia-vida em datação ou medicina é presença garantida. Também aparecem cores de fogos e testes de chama (salto de elétrons) e comparações de raio e eletronegatividade a partir da posição na tabela.",
    ler: [W("Modelo atômico de Bohr"), W("Tabela periódica"), W("Acidente radiológico de Goiânia"), KHAN_QUI]
  };

  E["Química#1"] = {
    s: [
      ["Geometria molecular", "A forma da molécula depende dos pares de elétrons ao redor do átomo central, que se repelem e se afastam ao máximo (teoria VSEPR).\n\nPrincipais formas: **linear** (CO₂), **angular** (H₂O, com pares livres no oxigênio), **trigonal plana** (BF₃), **piramidal** (NH₃) e **tetraédrica** (CH₄). A geometria importa porque define a polaridade: o CO₂ tem ligações polares, mas é apolar porque a forma linear faz os efeitos se anularem; a água é polar por ser angular."],
      ["Semelhante dissolve semelhante", "Substâncias polares dissolvem substâncias polares, e apolares dissolvem apolares. Por isso água e óleo não se misturam, e o sal (iônico) se dissolve bem na água.\n\nO **sabão** é a ponte: tem uma ponta polar (que interage com a água) e uma cauda apolar (que interage com a gordura). As moléculas formam micelas que envolvem a sujeira e permitem que ela seja levada pela água. A gasolina brasileira tem etanol misturado, e o teste da proveta com água salgada separa as duas partes, porque o etanol prefere a água."]
    ],
    fig: [{ id: "ligacoes", at: 0, cap: "Ligação iônica (transferência) e covalente (compartilhamento) (ilustração Easy Study)." }],
    tab: [{ at: 2, title: "Forças intermoleculares (da mais forte à mais fraca)", head: ["Força", "Onde ocorre", "Exemplo"], rows: [["Ligação de hidrogênio", "H ligado a F, O ou N", "água, álcool"], ["Dipolo-dipolo", "moléculas polares", "HCl"], ["Dipolo induzido (London)", "moléculas apolares", "CO₂, gasolina"]] }],
    sabia: "As ligações de hidrogênio fazem o gelo ser menos denso que a água líquida. Por isso lagos congelam de cima para baixo e a vida aquática sobrevive embaixo.",
    prova: "Questões pedem por que uma substância dissolve outra, por que a água tem ponto de ebulição alto ou como o sabão age. Ache a polaridade das moléculas e o tipo de força entre elas.",
    ler: [W("Ligação química"), W("Ligação de hidrogênio"), W("Geometria molecular"), KHAN_QUI]
  };

  E["Química#2"] = {
    s: [
      ["Roteiro para qualquer cálculo", "1) **Escreva e balanceie** a equação. 2) Converta o que foi dado para **mol** (massa ÷ massa molar; volume de gás nas CNTP ÷ 22,4 L). 3) Use a **proporção dos coeficientes**. 4) Converta o resultado para a unidade pedida.\n\nExemplo: quantos gramas de água se formam com 4 g de H₂? Equação: 2 H₂ + O₂ → 2 H₂O. 4 g de H₂ = 2 mol. A proporção H₂ : H₂O é 1 : 1, então se formam 2 mol de água = 36 g. Com prática, a regra de três direta em gramas também funciona, desde que você use a proporção correta."],
      ["Lei de Lavoisier e de Proust", "**Lavoisier**: num sistema fechado, a massa total dos reagentes é igual à massa total dos produtos (\"nada se cria, nada se perde, tudo se transforma\"). Se uma palha de aço queima e fica mais pesada, é porque incorporou oxigênio do ar.\n\n**Proust**: uma substância sempre tem a mesma proporção em massa entre seus elementos. A água sempre tem 1 g de hidrogênio para 8 g de oxigênio. Essas duas leis justificam o balanceamento e permitem prever quantidades sem conhecer a fórmula toda."]
    ],
    tab: [{ at: 0, title: "Números que você precisa ter na cabeça", head: ["Grandeza", "Valor"], rows: [["Constante de Avogadro", "6,0 × 10²³ partículas/mol"], ["Volume molar (CNTP)", "22,4 L/mol"], ["Massa molar da água", "18 g/mol"], ["Massa molar do CO₂", "44 g/mol"], ["Massa molar da glicose", "180 g/mol"]] }],
    sabia: "Um mol de grãos de arroz cobriria toda a superfície da Terra com uma camada de quilômetros de altura. O número de Avogadro só faz sentido para coisas minúsculas como átomos.",
    prova: "O ENEM contextualiza: quanto CO₂ um carro emite, quanto calcário corrige um solo, quanto medicamento há num comprimido. Use pureza e rendimento quando o enunciado falar em porcentagem de aproveitamento.",
    ler: [W("Estequiometria"), W("Lei de conservação das massas"), W("Constante de Avogadro"), KHAN_QUI]
  };

  E["Química#3"] = {
    s: [
      ["Unidades que caem em prova", "**Concentração comum (g/L)**: massa de soluto por litro de solução. **Concentração molar (mol/L)**: quantidade de matéria por litro. **ppm**: partes por milhão, usada para quantidades pequenas, como flúor na água ou poluentes no ar. 1 ppm = 1 mg por kg ou, para água, cerca de 1 mg por litro.\n\n**Porcentagem em volume**: álcool 70% tem 70 mL de etanol em 100 mL de solução. Rótulos de alimentos, remédios e bulas são as fontes preferidas das questões."],
      ["Solubilidade e curvas", "Solubilidade é a quantidade máxima de soluto que se dissolve em certa quantidade de solvente a uma temperatura. A solução pode ser **insaturada** (abaixo do limite), **saturada** (no limite) ou **supersaturada** (acima, instável; qualquer perturbação faz o excesso precipitar).\n\nPara a maioria dos sólidos, a solubilidade aumenta com a temperatura. Para os gases é o contrário: refrigerante quente perde gás mais rápido, e peixes sofrem em águas aquecidas porque há menos oxigênio dissolvido."]
    ],
    tab: [{ at: 0, title: "Fórmulas essenciais", head: ["Grandeza", "Fórmula"], rows: [["Concentração comum", "C = m(soluto) / V(solução)"], ["Concentração molar", "M = n / V"], ["Relação entre elas", "C = M × massa molar"], ["Diluição", "C₁ · V₁ = C₂ · V₂"]] }],
    sabia: "O soro caseiro e o soro fisiológico (0,9% de NaCl) têm concentração parecida com a do sangue. Por isso podem ir para a veia sem estourar ou murchar as hemácias.",
    prova: "Interpretação de rótulos e bulas, diluição de produtos de limpeza e curvas de solubilidade aparecem muito. Desenhe os dados e use C₁V₁ = C₂V₂ antes de procurar a alternativa.",
    ler: [W("Solução (química)"), W("Solubilidade"), W("Propriedades coligativas"), KHAN_QUI]
  };

  E["Química#4"] = {
    s: [
      ["Lei de Hess", "A variação de entalpia de uma reação depende só do estado inicial e do final, não do caminho. Por isso dá para somar equações conhecidas para descobrir o ΔH de uma reação difícil de medir.\n\nRegras: se **inverter** a equação, troque o sinal do ΔH; se **multiplicar** a equação, multiplique o ΔH pelo mesmo número. Some as equações, cancele o que aparece dos dois lados e confira se o resultado bate com a reação pedida."],
      ["Equilíbrio no dia a dia", "O **princípio de Le Chatelier** diz que um sistema em equilíbrio reage para diminuir uma perturbação. Adicionar reagente desloca para os produtos; aumentar a pressão desloca para o lado com menos mols de gás; aquecer favorece o sentido endotérmico.\n\nExemplos cobrados: o sangue mantém pH perto de 7,4 graças ao equilíbrio do bicarbonato (solução-tampão); na **produção de amônia** (Haber-Bosch), usa-se alta pressão para aumentar o rendimento. Catalisador não desloca o equilíbrio: só faz chegar a ele mais rápido."]
    ],
    fig: [{ id: "energia_reacao", at: 0, cap: "Diagrama de energia: exotérmica, endotérmica e efeito do catalisador (ilustração Easy Study)." }, { id: "ph", at: 3, cap: "Escala de pH com exemplos do cotidiano (ilustração Easy Study)." }],
    tab: [{ at: 1, title: "O que acelera uma reação", head: ["Fator", "Por quê"], rows: [["Temperatura maior", "mais colisões com energia suficiente"], ["Superfície de contato maior", "mais partículas expostas (comprimido triturado)"], ["Concentração maior", "mais colisões por segundo"], ["Catalisador", "diminui a energia de ativação"]] }],
    sabia: "A geladeira conserva alimentos porque a temperatura baixa desacelera as reações químicas e a ação de micro-organismos. É cinética química na cozinha.",
    prova: "Cai muito: calor de combustão comparando combustíveis, fatores de velocidade com exemplos do cotidiano, deslocamento de equilíbrio e pH de soluções. Pense sempre em 'para que lado o sistema vai compensar'.",
    ler: [W("Lei de Hess"), W("Princípio de Le Chatelier"), W("PH"), KHAN_QUI]
  };

  E["Química#5"] = {
    s: [
      ["Petróleo e combustíveis", "O petróleo é uma mistura de hidrocarbonetos, separada por **destilação fracionada** conforme o ponto de ebulição: gás de cozinha (GLP), gasolina, querosene, diesel, óleos lubrificantes e asfalto. Quanto maior a cadeia, maior o ponto de ebulição.\n\nO Brasil se destaca no **etanol** de cana-de-açúcar, um combustível renovável: o CO₂ liberado na queima foi absorvido pela cana na fotossíntese. O **biodiesel** é feito a partir de óleos vegetais ou gordura animal por transesterificação."],
      ["Polímeros e plásticos", "Polímeros são moléculas gigantes formadas pela repetição de unidades menores (monômeros). **Polímeros de adição** (polietileno das sacolas, PVC dos canos, isopor) e **de condensação** (náilon, PET das garrafas, que liberam uma molécula pequena como água na formação).\n\nO problema ambiental é a durabilidade: plásticos comuns levam centenas de anos para se degradar e formam microplásticos. Soluções cobradas: reciclagem, polímeros biodegradáveis e redução do uso."]
    ],
    fig: [{ id: "isomeria", at: 2, cap: "Isomeria geométrica (cis/trans) e carbono quiral (ilustração Easy Study)." }],
    tab: [{ at: 1, title: "Funções orgânicas mais cobradas", head: ["Função", "Grupo", "Exemplo"], rows: [["Álcool", "—OH em carbono saturado", "etanol"], ["Ácido carboxílico", "—COOH", "ácido acético (vinagre)"], ["Éster", "—COO—", "aromas de frutas"], ["Amina", "—NH₂", "proteínas, cheiro de peixe"], ["Cetona", "C=O no meio da cadeia", "acetona"], ["Aldeído", "C=O na ponta", "formol"]] }],
    sabia: "Muitos aromas artificiais de frutas são ésteres simples: o acetato de isoamila, por exemplo, tem cheiro de banana.",
    prova: "O ENEM mostra uma fórmula estrutural (um medicamento, um hormônio, um agrotóxico) e pede as funções orgânicas presentes ou o tipo de isomeria. Combustíveis e plásticos aparecem com viés ambiental.",
    ler: [W("Química orgânica"), W("Polímero"), W("Biodiesel"), KHAN_QUI]
  };

  E["Química#6"] = {
    s: [
      ["Calculando a ddp de uma pilha", "Cada metal tem um **potencial de redução** (E°). Quem tem maior potencial de redução sofre redução (é o cátodo); quem tem menor sofre oxidação (é o ânodo). A diferença de potencial da pilha é:\n\n**ΔE = E°(maior) − E°(menor)**\n\nNa pilha de Daniell, cobre (+0,34 V) e zinco (−0,76 V): ΔE = 0,34 − (−0,76) = 1,10 V. O zinco é corroído (perde massa) e o cobre se deposita na placa de cobre (ganha massa). Se a ddp der positiva, a pilha funciona espontaneamente."],
      ["Baterias e meio ambiente", "Baterias de celular são de **íons de lítio**, recarregáveis: na recarga, a corrente externa força a reação inversa. Pilhas e baterias contêm metais como mercúrio, chumbo e cádmio, que contaminam solo e água se descartados no lixo comum.\n\nNo Brasil, a resolução do Conama e a Política Nacional de Resíduos Sólidos preveem a **logística reversa**: lojas devem receber pilhas e baterias usadas para que os fabricantes deem destino adequado."]
    ],
    fig: [{ id: "pilha", at: 1, cap: "Pilha de Daniell: elétrons saem do zinco e vão para o cobre (ilustração Easy Study)." }],
    tab: [{ at: 0, title: "Para não esquecer", head: ["Termo", "Significado"], rows: [["Oxidação", "perde elétrons, nox aumenta"], ["Redução", "ganha elétrons, nox diminui"], ["Agente redutor", "quem se oxida"], ["Agente oxidante", "quem se reduz"], ["Ânodo", "onde ocorre oxidação (polo − na pilha)"], ["Cátodo", "onde ocorre redução (polo + na pilha)"]] }],
    sabia: "Navios e tubulações usam 'metal de sacrifício': um bloco de zinco ou magnésio ligado ao casco de aço se oxida no lugar do ferro, evitando a corrosão do navio.",
    prova: "Cai cálculo de ddp, identificação de ânodo e cátodo, proteção contra corrosão (metal de sacrifício, galvanização) e descarte de baterias. Monte uma tabela com os potenciais antes de responder.",
    ler: [W("Eletroquímica"), W("Pilha de Daniell"), W("Eletrólise"), KHAN_QUI]
  };

  /* ===================== FÍSICA ===================== */
  E["Física#0"] = {
    s: [
      ["Lendo gráficos de movimento", "No gráfico **posição × tempo**, a inclinação é a velocidade: reta inclinada é MU, curva é MUV, reta horizontal é repouso. No gráfico **velocidade × tempo**, a inclinação é a aceleração e a **área sob a curva é o deslocamento**.\n\nUm truque: se a área ficar abaixo do eixo do tempo, o deslocamento é negativo (o corpo voltou). No ENEM, muitas questões de cinemática são, na verdade, questões de leitura de gráfico, então treine identificar o que cada eixo e cada inclinação representam."],
      ["Velocidade relativa e encontros", "Quando dois carros andam no **mesmo sentido**, a velocidade de um em relação ao outro é a diferença; em **sentidos opostos**, é a soma. Para saber quando dois móveis se encontram, escreva a função horária de cada um (s = s₀ + v·t) e iguale as posições.\n\nExemplo: carro A sai do km 0 a 80 km/h; carro B sai do km 120 em sentido contrário a 40 km/h. Velocidade relativa = 120 km/h, distância = 120 km, então se encontram em 1 h, no km 80."]
    ],
    fig: [{ id: "grafico_vt", at: 2, cap: "Gráfico v × t no MUV: inclinação é a aceleração e área é o deslocamento (ilustração Easy Study)." }],
    tab: [{ at: 1, title: "Conversões que salvam tempo", head: ["De", "Para", "Faça"], rows: [["km/h", "m/s", "divida por 3,6"], ["m/s", "km/h", "multiplique por 3,6"], ["minutos", "horas", "divida por 60"], ["g (gravidade)", "valor usual", "10 m/s²"]] }],
    sabia: "Um carro a 72 km/h percorre 20 metros a cada segundo. Olhar o celular por 3 segundos dirigindo equivale a andar 60 metros sem enxergar a rua.",
    prova: "O ENEM usa radares de velocidade, distância de frenagem, ultrapassagens e gráficos de corrida. Converta unidades primeiro e veja se a pergunta é sobre velocidade média (distância total ÷ tempo total).",
    ler: [W("Cinemática"), W("Movimento retilíneo uniformemente variado"), PHET, KHAN_FIS]
  };

  E["Física#1"] = {
    s: [
      ["Diagrama de forças: o método", "Quase todo problema de dinâmica se resolve em quatro passos: 1) desenhe o corpo isolado; 2) desenhe **todas** as forças (peso para baixo, normal perpendicular à superfície, tração ao longo do fio, atrito contra o movimento); 3) escolha os eixos; 4) aplique **F resultante = m · a** em cada eixo.\n\nSe o corpo está parado ou em velocidade constante, a resultante é zero. Erro comum: colocar uma 'força do movimento' que não existe. Um corpo em movimento não precisa de força para continuar se movendo (inércia)."],
      ["Impulso e quantidade de movimento", "Quantidade de movimento é **Q = m · v**. Num sistema isolado (como numa colisão ou numa explosão), a quantidade de movimento total se conserva.\n\nImpulso é **I = F · Δt** e é igual à variação de Q. Isso explica o airbag e o capacete: ao aumentar o tempo da colisão, a mesma variação de quantidade de movimento acontece com uma força menor sobre o corpo. Também explica o recuo da arma e o funcionamento de foguetes."]
    ],
    fig: [{ id: "plano", at: 2, cap: "Forças no plano inclinado (ilustração Easy Study)." }],
    tab: [{ at: 0, title: "As três leis de Newton", head: ["Lei", "Ideia", "Exemplo"], rows: [["1ª (inércia)", "sem força resultante, o corpo mantém o estado", "passageiro vai para a frente na freada"], ["2ª", "F = m · a", "carro mais pesado precisa de mais força"], ["3ª (ação e reação)", "forças em pares, em corpos diferentes", "o pé empurra o chão e o chão empurra o pé"]] }],
    sabia: "O cinto de segurança existe por causa da primeira lei de Newton: na freada, o carro para, mas o seu corpo tende a continuar em movimento.",
    prova: "Caem situações de trânsito (cinto, airbag, freada), elevadores, cordas e polias. Faça o diagrama de forças antes de escolher a fórmula.",
    ler: [W("Leis de Newton"), W("Momento linear"), PHET, KHAN_FIS]
  };

  E["Física#2"] = {
    s: [
      ["Conservação de energia", "Num sistema sem atrito, a **energia mecânica** (cinética + potencial) se conserva. Uma bola solta de uma altura h chega ao chão com velocidade v = √(2gh), independentemente da massa.\n\nCom atrito, parte da energia mecânica vira **energia térmica** (calor) e som. A energia total sempre se conserva; o que muda é a forma. Essa ideia resolve montanhas-russas, pêndulos, molas e quedas sem precisar das fórmulas de movimento."],
      ["Fontes de energia e o Brasil", "A matriz elétrica brasileira é majoritariamente **renovável**, com destaque para hidrelétricas, e com crescimento acelerado de energia eólica (Nordeste) e solar. Isso é diferente da média mundial, que depende muito de carvão e gás.\n\nCada fonte tem vantagens e problemas: hidrelétricas alagam áreas e afetam comunidades; eólicas dependem do vento; solares, da luz do dia; termelétricas emitem CO₂; nucleares geram rejeitos radioativos. A prova costuma pedir a comparação entre elas."]
    ],
    fig: [{ id: "energia_mec", at: 4, cap: "Transformação entre energia potencial e cinética (ilustração Easy Study)." }],
    tab: [{ at: 1, title: "Fórmulas de energia", head: ["Energia", "Fórmula"], rows: [["Cinética", "Ec = m · v² / 2"], ["Potencial gravitacional", "Ep = m · g · h"], ["Potencial elástica", "Ee = k · x² / 2"], ["Trabalho", "τ = F · d · cos θ"], ["Potência", "P = energia / tempo"]] }],
    sabia: "Ao dobrar a velocidade de um carro, a energia cinética fica quatro vezes maior. Por isso a distância de frenagem cresce tanto em alta velocidade.",
    prova: "Aparecem transformações de energia em usinas, carros e esportes, além de rendimento (energia útil ÷ energia total). Diga sempre de qual forma de energia para qual forma está a transformação.",
    ler: [W("Conservação da energia"), W("Matriz energética do Brasil"), PHET, KHAN_FIS]
  };

  E["Física#3"] = {
    s: [
      ["Calculando a conta de luz", "A energia consumida é **E = P · t**. Se a potência estiver em kW e o tempo em horas, o resultado sai em kWh, a unidade da conta de luz.\n\nExemplo: um chuveiro de 5.000 W (5 kW) ligado 30 minutos por dia durante 30 dias: 5 kW × 0,5 h × 30 = 75 kWh. Com a tarifa a R$ 0,80 por kWh, são R$ 60 só de chuveiro. O chuveiro na posição 'inverno' tem resistência menor, por isso puxa mais corrente e dissipa mais potência (P = U²/R)."],
      ["Magnetismo e indução", "Corrente elétrica cria campo magnético (experimento de Oersted), e campo magnético variável cria corrente elétrica (**indução de Faraday**). É assim que funcionam os geradores de usinas: turbinas giram ímãs perto de bobinas e geram corrente.\n\nTransformadores usam indução para aumentar ou reduzir tensão, e só funcionam com corrente alternada. Motores elétricos fazem o caminho inverso: corrente + campo magnético geram movimento."]
    ],
    fig: [{ id: "circuito", at: 2, cap: "Associação de resistores em série e em paralelo (ilustração Easy Study)." }],
    tab: [{ at: 0, title: "Grandezas elétricas", head: ["Grandeza", "Unidade", "Fórmula"], rows: [["Corrente (i)", "ampère (A)", "i = Q / t"], ["Tensão (U)", "volt (V)", "U = R · i"], ["Resistência (R)", "ohm (Ω)", "R = U / i"], ["Potência (P)", "watt (W)", "P = U · i"], ["Energia (E)", "kWh ou J", "E = P · t"]] }],
    sabia: "Passarinhos pousam em fios de alta tensão sem tomar choque porque as duas patas estão no mesmo fio, quase no mesmo potencial: não há diferença de potencial para a corrente atravessar o corpo.",
    prova: "A conta de luz e a escolha entre aparelhos são clássicas. Também aparecem fusível e disjuntor, ligações em série e paralelo na casa e geradores. Organize os dados numa tabela antes de calcular.",
    ler: [W("Lei de Ohm"), W("Indução eletromagnética"), PHET, KHAN_FIS]
  };

  E["Física#4"] = {
    s: [
      ["Espectro eletromagnético", "Luz visível, rádio, micro-ondas, raios X e raios gama são todos **ondas eletromagnéticas**: viajam no vácuo à velocidade da luz (300.000 km/s). O que muda entre elas é a frequência.\n\nOrdem crescente de frequência (e de energia): ondas de rádio, micro-ondas, infravermelho, luz visível (do vermelho ao violeta), ultravioleta, raios X, raios gama. Quanto maior a frequência, mais energia e maior o potencial de dano às células: por isso usamos protetor solar contra o UV e avental de chumbo nos raios X."],
      ["Fenômenos ondulatórios", "**Reflexão**: a onda bate e volta (eco). **Refração**: muda de meio e de velocidade (canudo 'quebrado' no copo). **Difração**: contorna obstáculos (ouvimos alguém atrás de um muro). **Interferência**: ondas se somam ou se anulam (fones com cancelamento de ruído). **Ressonância**: um corpo vibra forte quando recebe energia na sua frequência natural (taça que quebra com a voz).\n\nO **efeito Doppler** explica por que a sirene da ambulância fica mais aguda quando ela se aproxima e mais grave quando se afasta."]
    ],
    fig: [{ id: "onda", at: 0, cap: "Elementos de uma onda (ilustração Easy Study)." }, { id: "lentes", at: 3, cap: "Lente convergente concentrando raios no foco (ilustração Easy Study)." }],
    tab: [{ at: 1, title: "Qualidades do som", head: ["Qualidade", "Depende de", "Exemplo"], rows: [["Altura", "frequência", "agudo x grave"], ["Intensidade", "amplitude", "forte x fraco (volume)"], ["Timbre", "forma da onda", "diferencia violão e piano na mesma nota"]] }],
    sabia: "O som não se propaga no vácuo. As explosões barulhentas no espaço dos filmes são licença poética.",
    prova: "O ENEM explora Doppler, ressonância, cancelamento de ruído, correção de visão e radiações (UV, micro-ondas, raios X). Saiba nomear o fenômeno descrito na situação.",
    ler: [W("Espectro eletromagnético"), W("Efeito Doppler"), PHET, KHAN_FIS]
  };

  E["Física#5"] = {
    s: [
      ["Calor sensível e latente na prática", "**Calor sensível** muda a temperatura: Q = m · c · ΔT. **Calor latente** muda o estado físico sem mudar a temperatura: Q = m · L.\n\nPor isso a água fervendo fica em 100 °C (ao nível do mar) mesmo com o fogo ligado: a energia está sendo usada para transformar líquido em vapor. Na panela de pressão, a pressão maior aumenta a temperatura de ebulição, e a comida cozinha mais rápido. Em altitudes elevadas acontece o contrário: a água ferve abaixo de 100 °C."],
      ["Máquinas térmicas", "Máquinas térmicas (motores, termelétricas) transformam calor em trabalho operando entre uma fonte quente e uma fria. Nenhuma máquina converte 100% do calor em trabalho (**2ª lei da termodinâmica**): parte sempre vai para a fonte fria.\n\nO rendimento é η = trabalho ÷ calor recebido. O máximo teórico é o do **ciclo de Carnot**: η = 1 − T(fria) ÷ T(quente), com temperaturas em kelvin. Geladeiras e ar-condicionado fazem o caminho inverso, gastando trabalho para tirar calor de um lugar frio."]
    ],
    fig: [{ id: "calor", at: 2, cap: "As três formas de transmissão de calor (ilustração Easy Study)." }],
    tab: [{ at: 0, title: "Escalas termométricas", head: ["Escala", "Fusão do gelo", "Ebulição da água"], rows: [["Celsius", "0 °C", "100 °C"], ["Fahrenheit", "32 °F", "212 °F"], ["Kelvin", "273 K", "373 K"]] }],
    sabia: "A água tem um calor específico altíssimo, por isso cidades litorâneas variam menos de temperatura entre dia e noite do que cidades do interior.",
    prova: "Aparecem garrafa térmica, estufa, brisa marítima, panela de pressão e rendimento de motores. Identifique se a energia muda a temperatura ou o estado.",
    ler: [W("Calorimetria"), W("Termodinâmica"), W("Ciclo de Carnot"), PHET]
  };

  E["Física#6"] = {
    s: [
      ["Pressão no corpo humano", "A pressão arterial é medida em mmHg: '12 por 8' significa 120 mmHg na sístole e 80 mmHg na diástole. Pela lei de Stevin, a pressão nos pés de uma pessoa em pé é maior que na cabeça, porque há uma coluna de sangue acima.\n\nMergulhadores sentem a pressão aumentar cerca de 1 atm a cada 10 m de profundidade. O canudinho funciona porque você reduz a pressão dentro da boca, e a pressão atmosférica empurra o líquido para cima."],
      ["Hidrodinâmica básica", "Num cano, a **vazão** (volume por tempo) é constante: Q = A · v. Se o cano estreita, a velocidade aumenta. É o que acontece quando apertamos a ponta da mangueira.\n\nO **princípio de Bernoulli** diz que, onde o fluido se move mais rápido, a pressão é menor. Isso ajuda a explicar a sustentação das asas de avião, o telhado arrancado em vendavais e a cortina do chuveiro que gruda na perna."]
    ],
    fig: [{ id: "empuxo", at: 3, cap: "Empuxo e peso num corpo submerso (ilustração Easy Study)." }],
    tab: [{ at: 0, title: "Fórmulas da hidrostática", head: ["Conceito", "Fórmula"], rows: [["Densidade", "d = m / V"], ["Pressão", "p = F / A"], ["Stevin", "p = p₀ + d · g · h"], ["Pascal", "F₁ / A₁ = F₂ / A₂"], ["Empuxo", "E = d(líquido) · V(submerso) · g"]] }],
    sabia: "Um navio de aço flutua porque seu formato oco desloca um volume enorme de água: a densidade média do navio (aço + ar) é menor que a da água.",
    prova: "Caem macaco hidráulico e freio (Pascal), mergulho e barragens (Stevin), navios, balões e icebergs (empuxo). Desenhe as forças e compare densidades.",
    ler: [W("Hidrostática"), W("Princípio de Arquimedes"), W("Princípio de Bernoulli"), PHET]
  };
})();
