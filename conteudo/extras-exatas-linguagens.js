// Conteúdo extra (texto original do Easy Study): Matemática e Linguagens.
window.EXTRA = window.EXTRA || {};
(function () {
  const E = window.EXTRA;
  const W = (t) => ["Wikipédia: " + t, "https://pt.wikipedia.org/wiki/" + encodeURIComponent(t.replace(/ /g, "_"))];
  const KHAN_MAT = ["Khan Academy (em português): Matemática", "https://pt.khanacademy.org/math"];
  const OBMEP = ["Portal da OBMEP (IMPA): videoaulas e apostilas gratuitas", "https://portaldaobmep.impa.br/"];
  const IBGE = ["IBGE Educa: dados e gráficos para estudantes", "https://educa.ibge.gov.br/"];
  const DOMINIO = ["Domínio Público (MEC): obras literárias gratuitas", "http://www.dominiopublico.gov.br/"];
  const BBM = ["Biblioteca Brasiliana Guita e José Mindlin (USP)", "https://digital.bbm.usp.br/"];
  const FUVEST = ["Fuvest: lista de obras de leitura obrigatória", "https://www.fuvest.br/"];

  /* ===================== MATEMÁTICA ===================== */
  E["Matemática#0"] = {
    s: [
      ["Aumentos e descontos sucessivos", "Porcentagens sucessivas **multiplicam**, não somam. Um aumento de 10% seguido de outro de 10% dá 1,1 × 1,1 = 1,21, ou seja, 21% no total, e não 20%.\n\nDo mesmo jeito, um aumento de 20% seguido de um desconto de 20% não volta ao valor original: 1,2 × 0,8 = 0,96, uma perda de 4%. Lojas usam isso em promoções do tipo 'sobe e depois dá desconto'. Para descobrir o preço antes de um aumento, **divida** pelo fator: se custa R$ 132 depois de um aumento de 10%, antes custava 132 ÷ 1,1 = R$ 120."],
      ["Inflação e poder de compra", "Inflação é o aumento geral de preços. Se o salário sobe 5% e a inflação do ano foi 8%, o poder de compra caiu: 1,05 ÷ 1,08 ≈ 0,972, uma perda real de cerca de 2,8%.\n\nO mesmo raciocínio vale para rendimentos: uma aplicação que rende 10% ao ano com inflação de 4% tem ganho real de 1,10 ÷ 1,04 ≈ 1,058, ou cerca de 5,8%. Questões do ENEM e da Fuvest usam financiamentos, parcelamentos e a escolha entre pagar à vista ou a prazo."]
    ],
    fig: [{ id: "porcentagem", at: 1, cap: "Aumento e desconto sucessivos não se anulam (ilustração Easy Study)." }],
    tab: [{ at: 3, title: "Juros simples x compostos (R$ 1.000 a 10% ao mês)", head: ["Mês", "Simples", "Compostos"], rows: [["1", "R$ 1.100", "R$ 1.100"], ["2", "R$ 1.200", "R$ 1.210"], ["3", "R$ 1.300", "R$ 1.331"], ["6", "R$ 1.600", "R$ 1.771,56"], ["12", "R$ 2.200", "R$ 3.138,43"]] }],
    sabia: "O rotativo do cartão de crédito no Brasil já chegou a ter juros acima de 400% ao ano. Juros compostos são o motivo de dívidas pequenas virarem dívidas enormes.",
    prova: "É o assunto mais frequente de matemática financeira no ENEM: descontos, IPTU, contas de luz, financiamentos e comparações de planos. Transforme toda porcentagem em fator multiplicativo.",
    ler: [W("Juros compostos"), W("Inflação"), OBMEP, KHAN_MAT]
  };

  E["Matemática#1"] = {
    s: [
      ["Regra de três composta", "Quando há mais de duas grandezas, monte uma tabela e compare cada grandeza com a que você quer descobrir, sempre perguntando: **se esta aumenta, a incógnita aumenta ou diminui?** Diretamente proporcional mantém a fração; inversamente proporcional inverte.\n\nExemplo: 6 pedreiros constroem um muro em 10 dias trabalhando 8 h por dia. Em quantos dias 4 pedreiros, trabalhando 6 h por dia, fazem o mesmo muro? Menos pedreiros → mais dias (inversa); menos horas → mais dias (inversa). x = 10 × (6/4) × (8/6) = 20 dias."],
      ["Grandezas na vida real", "Velocidade, densidade demográfica, consumo de combustível (km/L), escala de mapa e concentração de remédio são todas **razões**. O ENEM gosta de unir duas delas numa mesma questão.\n\nExemplo: um carro faz 12 km/L e a gasolina custa R$ 6,00. Uma viagem de 300 km gasta 300 ÷ 12 = 25 L, ou R$ 150. Para comparar dois produtos, calcule o **preço por unidade** (por grama, por litro, por metro): o pacote maior nem sempre é o mais barato."]
    ],
    fig: [{ id: "escala", at: 1, cap: "Da distância no mapa à distância real (ilustração Easy Study)." }],
    tab: [{ at: 2, title: "Conversões de unidades", head: ["Grandeza", "Relação"], rows: [["Comprimento", "1 km = 1.000 m; 1 m = 100 cm"], ["Área", "1 m² = 10.000 cm²; 1 ha = 10.000 m²"], ["Volume", "1 m³ = 1.000 L; 1 dm³ = 1 L"], ["Massa", "1 t = 1.000 kg; 1 kg = 1.000 g"], ["Tempo", "1 h = 60 min = 3.600 s"]] }],
    sabia: "Na escala de área, tudo se eleva ao quadrado: num mapa 1:1.000, 1 cm² representa 1.000.000 cm², ou 100 m².",
    prova: "Escalas de mapa e de maquete, receitas, plantas de casa e consumo são clássicos. Muitas questões erram o aluno na conversão de unidades: converta tudo antes de calcular.",
    ler: [W("Regra de três"), W("Escala cartográfica"), OBMEP, KHAN_MAT]
  };

  E["Matemática#2"] = {
    s: [
      ["Desvio padrão sem medo", "O desvio padrão mede **o quanto os dados se espalham em torno da média**. Desvio pequeno indica dados parecidos (regularidade); desvio grande indica dados muito diferentes entre si.\n\nPasso a passo: 1) calcule a média; 2) subtraia a média de cada valor; 3) eleve cada diferença ao quadrado; 4) tire a média desses quadrados (variância); 5) tire a raiz quadrada. No ENEM, raramente é preciso fazer a conta inteira: basta comparar visualmente quais dados estão mais espalhados, por exemplo para escolher o atleta mais regular."],
      ["Gráficos que enganam", "Cuidado com gráficos manipulados: eixo vertical que não começa no zero exagera diferenças pequenas; pictogramas com figuras em tamanhos diferentes distorcem a comparação; gráficos de pizza com porcentagens que não somam 100% indicam erro.\n\nAo ler um gráfico, confira sempre: título, unidade, escala dos eixos, fonte e período. Muitas questões perguntam qual período teve **maior variação**, que é diferente de maior valor."]
    ],
    fig: [{ id: "estatistica", at: 0, cap: "Média, mediana e moda de um conjunto de dados (ilustração Easy Study)." }],
    tab: [{ at: 1, title: "Qual medida usar", head: ["Medida", "Use quando", "Cuidado"], rows: [["Média", "dados equilibrados", "é afetada por valores extremos"], ["Mediana", "há valores muito altos ou baixos (salários)", "precisa ordenar os dados"], ["Moda", "quer o valor mais frequente (tamanho de roupa)", "pode haver mais de uma ou nenhuma"]] }],
    sabia: "A nota do ENEM usa a Teoria de Resposta ao Item (TRI): acertar questões fáceis e errar difíceis vale mais do que o contrário, porque o padrão é mais coerente.",
    prova: "Tabelas e gráficos do IBGE, notas de candidatos, salários e temperaturas. Mediana com quantidade par de dados (média dos dois centrais) e média ponderada caem muito.",
    ler: [W("Desvio padrão"), W("Mediana"), IBGE, KHAN_MAT]
  };

  E["Matemática#3"] = {
    s: [
      ["Como saber se a ordem importa", "A pergunta-chave da combinatória: **trocar a ordem gera uma possibilidade diferente?** Se sim (senhas, pódio, filas, cargos diferentes), é arranjo ou permutação. Se não (comissões, grupos, saladas de frutas, apertos de mão), é combinação.\n\nTeste prático: monte um agrupamento, troque dois elementos de lugar e pergunte se é 'outra coisa'. Presidente Ana e vice Bruno é diferente de presidente Bruno e vice Ana: arranjo. Uma comissão com Ana e Bruno é a mesma que Bruno e Ana: combinação."],
      ["Probabilidade condicional", "Às vezes o enunciado dá uma informação que **reduz o espaço amostral**. Exemplo: numa turma, 30 alunos estudam inglês e 20 estudam espanhol, e 10 estudam os dois. Sorteando alguém que estuda inglês, qual a chance de também estudar espanhol? O universo agora são os 30 de inglês, dos quais 10 estudam espanhol: 10/30 = 1/3.\n\nRegras úteis: eventos que podem acontecer juntos com 'ou' → some e subtraia a interseção; eventos independentes com 'e' → multiplique."]
    ],
    fig: [{ id: "arvore", at: 3, cap: "Árvore de possibilidades de dois lançamentos de moeda (ilustração Easy Study)." }],
    tab: [{ at: 1, title: "Fórmulas da contagem", head: ["Tipo", "Fórmula", "Exemplo"], rows: [["Permutação", "Pₙ = n!", "anagramas de AMOR: 4! = 24"], ["Arranjo", "A(n,p) = n! / (n−p)!", "pódio com 8 atletas: 8·7·6 = 336"], ["Combinação", "C(n,p) = n! / [p!(n−p)!]", "trio de 5 pessoas: 10"], ["Probabilidade", "P = favoráveis / possíveis", "par num dado: 3/6"]] }],
    sabia: "A chance de acertar as seis dezenas da Mega-Sena com uma aposta simples é de 1 em mais de 50 milhões: é a combinação C(60,6).",
    prova: "Senhas, placas de carro, loterias, sorteios e exames médicos (falso positivo). Pense primeiro no tipo de agrupamento, depois na fórmula. O princípio multiplicativo resolve a maioria.",
    ler: [W("Análise combinatória"), W("Probabilidade condicional"), OBMEP, KHAN_MAT]
  };

  E["Matemática#4"] = {
    s: [
      ["Do texto para a função", "Muitas questões descrevem uma situação e pedem a função. Procure duas coisas: um **valor fixo** (taxa de entrada, valor inicial) e um **valor que se repete** por unidade (preço por km, por hora, por produto). Isso dá uma função afim: f(x) = valor fixo + (valor por unidade) · x.\n\nSe a situação fala em 'dobrar', 'reduzir pela metade' ou 'crescer x% ao período', é **exponencial**. Se fala em área, lucro máximo, trajetória ou lançamento, provavelmente é **quadrática**."],
      ["Máximos e mínimos", "Na função quadrática f(x) = ax² + bx + c, o vértice dá o valor máximo (se a < 0, parábola com 'boca' para baixo) ou mínimo (se a > 0).\n\nCoordenadas do vértice: **xᵥ = −b / 2a** e **yᵥ = −Δ / 4a**. Exemplo clássico: um cercado retangular com 40 m de tela tem área máxima quando é um quadrado de 10 m de lado, com 100 m². Lucro máximo, altura máxima de um projétil e custo mínimo seguem a mesma ideia."]
    ],
    fig: [{ id: "parabola", at: 5, cap: "Parábola de lucro e seu vértice (ilustração Easy Study)." }],
    tab: [{ at: 4, title: "Reconhecendo cada função", head: ["Função", "Forma", "Gráfico", "Situação típica"], rows: [["Afim", "f(x) = ax + b", "reta", "táxi, plano de celular"], ["Quadrática", "f(x) = ax² + bx + c", "parábola", "lucro, área, lançamento"], ["Exponencial", "f(x) = a · bˣ", "curva que dispara ou cai", "bactérias, juros, meia-vida"], ["Logarítmica", "f(x) = log_b x", "cresce cada vez mais devagar", "pH, escala Richter, decibéis"]] }],
    sabia: "A escala Richter é logarítmica: um terremoto de magnitude 7 libera cerca de 32 vezes mais energia que um de magnitude 6.",
    prova: "O ENEM cobra montagem de função a partir de tabelas e textos, leitura de gráficos e vértice da parábola. Teste as alternativas com valores do próprio enunciado: é rápido e seguro.",
    ler: [W("Função quadrática"), W("Função exponencial"), OBMEP, KHAN_MAT]
  };

  E["Matemática#5"] = {
    s: [
      ["Polígonos e circunferência", "A soma dos ângulos internos de um polígono de n lados é **(n − 2) · 180°**. Um hexágono regular tem 720° no total, logo cada ângulo mede 120°. É por isso que hexágonos se encaixam perfeitamente (3 × 120° = 360°), como nos favos de mel.\n\nNa circunferência: comprimento **C = 2πr** e área **A = πr²**. Use π ≈ 3,14 ou π ≈ 3 quando o enunciado permitir. Setor circular é uma 'fatia': a área é proporcional ao ângulo central."],
      ["Lei dos senos e dos cossenos", "Para triângulos que não são retângulos:\n\n**Lei dos cossenos**: a² = b² + c² − 2bc · cos A. Use quando conhecer dois lados e o ângulo entre eles.\n\n**Lei dos senos**: a / sen A = b / sen B = c / sen C. Use quando conhecer um lado e o ângulo oposto a ele.\n\nNa prova, os ângulos costumam ser 30°, 45°, 60° ou 120°. Decore: sen 30° = 1/2, sen 45° = √2/2, sen 60° = √3/2, e cos 120° = −1/2."]
    ],
    fig: [{ id: "pitagoras", at: 1, cap: "O triângulo 3, 4, 5 e o teorema de Pitágoras (ilustração Easy Study)." }],
    tab: [{ at: 0, title: "Áreas das figuras planas", head: ["Figura", "Área"], rows: [["Retângulo", "base × altura"], ["Triângulo", "base × altura / 2"], ["Trapézio", "(B + b) × h / 2"], ["Losango", "D × d / 2"], ["Círculo", "π · r²"], ["Hexágono regular", "6 triângulos equiláteros: 3√3 · l² / 2"]] }],
    sabia: "Os egípcios usavam uma corda com 12 nós igualmente espaçados para formar ângulos retos: formando um triângulo de lados 3, 4 e 5.",
    prova: "Áreas de terrenos e pisos, escadas e rampas (Pitágoras e trigonometria), sombras (semelhança) e quantidade de material. Desenhe a figura e marque as medidas antes de calcular.",
    ler: [W("Teorema de Pitágoras"), W("Lei dos cossenos"), OBMEP, KHAN_MAT]
  };

  E["Matemática#6"] = {
    s: [
      ["Volume na prática", "Volume é quanto cabe dentro do sólido. Para **prismas e cilindros**, é área da base × altura. Para **pirâmides e cones**, é um terço disso. Para a **esfera**, 4πr³/3.\n\nNa prática: uma caixa-d'água cilíndrica com raio de 1 m e altura de 1,5 m tem volume π × 1² × 1,5 ≈ 4,7 m³, ou cerca de 4.700 litros. Lembre: 1 m³ = 1.000 L. Ao dobrar o raio de um cilindro, o volume fica quatro vezes maior; ao dobrar a altura, só duas vezes."],
      ["Semelhança entre sólidos", "Se dois sólidos são semelhantes com razão k entre os comprimentos, a razão entre as áreas é **k²** e entre os volumes é **k³**.\n\nExemplo: uma maquete 1:100 de um prédio. As medidas reais são 100 vezes maiores, as áreas 10.000 vezes e os volumes 1.000.000 de vezes. Isso explica por que um copo com o dobro da altura (e mesmo formato) cabe 8 vezes mais líquido, e por que animais grandes têm patas proporcionalmente mais grossas."]
    ],
    fig: [{ id: "solidos", at: 0, cap: "Prisma, cilindro e cone com suas fórmulas de volume (ilustração Easy Study)." }],
    tab: [{ at: 4, title: "Relação de Euler (poliedros convexos)", head: ["Poliedro", "Vértices (V)", "Arestas (A)", "Faces (F)", "V − A + F"], rows: [["Cubo", "8", "12", "6", "2"], ["Tetraedro", "4", "6", "4", "2"], ["Pirâmide de base quadrada", "5", "8", "5", "2"], ["Prisma triangular", "6", "9", "5", "2"]] }],
    sabia: "A latinha de refrigerante tem formato cilíndrico porque, para um mesmo volume, o cilindro aguenta melhor a pressão interna do gás e usa pouco material.",
    prova: "Caixas-d'água, embalagens, piscinas, planificações e vistas (de frente, de cima e de lado). O ENEM também cobra semelhança e escala em maquetes.",
    ler: [W("Geometria espacial"), W("Fórmula de Euler"), OBMEP, KHAN_MAT]
  };

  /* ===================== LINGUAGENS ===================== */
  E["Linguagens#0"] = {
    s: [
      ["Método de leitura em 4 passos", "1) **Leia o comando primeiro**: saiba o que procurar antes de ler o texto. 2) **Identifique o gênero e a fonte**: uma charge, um artigo científico e um poema pedem leituras diferentes. 3) **Ache a ideia central** de cada parágrafo, em poucas palavras. 4) **Volte ao texto** para confirmar cada alternativa: a resposta certa sempre tem apoio em alguma parte dele.\n\nNo ENEM, você tem em média 3 minutos por questão. Textos longos com comandos simples podem ser resolvidos lendo primeiro a pergunta e indo direto ao trecho relevante."],
      ["Tipos de alternativa errada", "As alternativas erradas costumam seguir padrões: **extrapolação** (vai além do que o texto diz), **redução** (pega só uma parte e trata como o todo), **contradição** (diz o oposto do texto) e **verdade fora do texto** (a afirmação é verdadeira no mundo, mas não responde à pergunta).\n\nDesconfie de palavras absolutas como 'sempre', 'nunca', 'apenas', 'todos'. Elas raramente estão na resposta certa, a menos que o texto use exatamente essa ideia."]
    ],
    tab: [{ at: 4, title: "Comandos e o que eles pedem", head: ["O enunciado diz", "O que fazer"], rows: [["'Infere-se'", "conclusão lógica a partir do texto"], ["'O texto tem como objetivo'", "finalidade do gênero"], ["'O recurso X contribui para'", "efeito de sentido"], ["'A tese defendida é'", "opinião central do autor"], ["'Em relação ao texto 1, o texto 2'", "comparar pontos de vista"]] }],
    sabia: "Linguagens é a primeira prova do primeiro dia do ENEM. Começar por ela costuma ajudar a 'aquecer' a leitura antes da redação.",
    prova: "O ENEM usa textos de todos os tipos: tirinhas, anúncios, poemas, notícias e artigos de opinião. A maior parte das questões de Linguagens é, no fundo, de interpretação.",
    ler: [W("Interpretação de texto"), ["INEP: provas anteriores do ENEM", "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos"]]
  };

  E["Linguagens#1"] = {
    s: [
      ["Gêneros digitais", "A internet criou e transformou gêneros: **post, meme, thread, comentário, podcast, vlog, e-mail, mensagem instantânea**. Cada um tem linguagem e finalidade próprias.\n\nO meme, por exemplo, combina imagem e texto curto com humor e intertextualidade, e só funciona se o leitor reconhecer a referência. O ENEM pergunta muito sobre a função social desses gêneros e sobre como eles mudam a forma de nos comunicarmos (mais rápida, multimodal, informal)."],
      ["Como identificar um gênero", "Faça três perguntas: **Onde circula?** (jornal, rede social, livro didático, embalagem). **Para quê?** (informar, convencer, instruir, divertir, emocionar). **Como está escrito?** (verbos no imperativo indicam instrução; primeira pessoa e opinião indicam artigo ou crônica; dados e fontes indicam notícia ou reportagem).\n\nReceita, bula, manual e regulamento são **injuntivos**: dizem o que fazer. Editorial, artigo de opinião e resenha são **argumentativos**: defendem uma ideia."]
    ],
    tab: [{ at: 1, title: "Notícia, reportagem e artigo de opinião", head: ["", "Notícia", "Reportagem", "Artigo de opinião"], rows: [["Objetivo", "informar o fato", "aprofundar o tema", "defender uma tese"], ["Linguagem", "objetiva, 3ª pessoa", "objetiva, com entrevistas e dados", "subjetiva, argumentativa"], ["Assinatura", "nem sempre", "sim", "sim (autor responde pela opinião)"]] }],
    sabia: "A crônica é um gênero muito brasileiro: nasceu nos jornais do século XIX e teve mestres como Machado de Assis, Rubem Braga e Clarice Lispector.",
    prova: "Questões pedem a finalidade do texto, o gênero ou o elemento que o caracteriza. Charges e anúncios publicitários aparecem quase em toda prova.",
    ler: [W("Gênero textual"), W("Crônica"), DOMINIO]
  };

  E["Linguagens#2"] = {
    s: [
      ["Mais de uma função no mesmo texto", "Um texto quase sempre tem várias funções, mas uma é **predominante**. Um anúncio publicitário pode ter função poética (rima, jogo de palavras) e referencial (informações do produto), mas o objetivo principal é convencer: função conativa.\n\nPara decidir, pergunte: qual é o **objetivo principal** do texto? Se é informar, referencial. Se é expressar sentimentos do autor, emotiva. Se é convencer o leitor a agir, conativa. Se é testar o canal de comunicação, fática. Se fala da própria linguagem, metalinguística. Se o foco é a forma da mensagem, poética."],
      ["Exemplos rápidos", "**Referencial**: \"A temperatura média do planeta subiu cerca de 1,1 °C desde a era pré-industrial.\"\n\n**Emotiva**: \"Que saudade imensa eu sinto da minha cidade!\"\n\n**Conativa**: \"Vacine-se. Proteja quem você ama.\"\n\n**Fática**: \"Alô? Está me ouvindo? Alô?\"\n\n**Metalinguística**: um poema sobre o ato de escrever poemas, ou um verbete de dicionário.\n\n**Poética**: \"Vi, vivi, venci a vida\", em que o som e a repetição chamam atenção para a própria mensagem."]
    ],
    fig: [{ id: "jakobson", at: 0, cap: "Elementos da comunicação e as funções da linguagem ligadas a cada um (ilustração Easy Study)." }],
    sabia: "As seis funções da linguagem foram sistematizadas pelo linguista russo Roman Jakobson, em 1960.",
    prova: "Aparece em quase toda prova: um texto e a pergunta 'predomina a função...'. Ache o elemento da comunicação que está em destaque.",
    ler: [W("Funções da linguagem"), W("Roman Jakobson")]
  };

  E["Linguagens#3"] = {
    s: [
      ["Norma-padrão e adequação", "A norma-padrão é a variedade usada em textos formais, documentos e na redação do vestibular. Ela não é 'a língua certa', mas a **adequada** a certas situações. Falar de forma muito formal numa conversa entre amigos também é inadequado.\n\nA ideia central é a **adequação linguística**: escolher a variedade que combina com a situação, o interlocutor e o gênero. Na redação do ENEM, a norma-padrão é obrigatória (Competência 1); num diálogo de um romance, a fala popular de um personagem é um recurso expressivo."],
      ["A língua muda", "O português vem do latim falado e mudou ao longo dos séculos: 'vossa mercê' virou 'vosmecê', depois 'você' e hoje 'cê' na fala. Palavras entram (estrangeirismos como 'deletar', 'mouse') e outras caem em desuso.\n\nO português brasileiro recebeu influências de línguas indígenas (jabuticaba, capivara, Ipiranga) e africanas (samba, cafuné, moleque, quitanda). Reconhecer essas contribuições faz parte do combate ao preconceito linguístico, assunto que o ENEM cobra com frequência."]
    ],
    tab: [{ at: 1, title: "Tipos de variação", head: ["Tipo", "Varia conforme", "Exemplo"], rows: [["Diatópica (regional)", "lugar", "mandioca, aipim, macaxeira"], ["Diastrática (social)", "grupo social, idade, profissão", "gírias, jargão médico"], ["Diafásica (situacional)", "situação de uso", "formal x informal"], ["Diacrônica (histórica)", "tempo", "vossa mercê → você"]] }],
    sabia: "Existem mais de 270 línguas indígenas faladas no Brasil hoje, segundo o Censo do IBGE.",
    prova: "O ENEM costuma trazer um texto com marcas regionais ou populares e pedir que você reconheça a variação e evite o julgamento preconceituoso. A resposta certa quase nunca diz que uma variedade é 'errada'.",
    ler: [W("Variação linguística"), W("Preconceito linguístico"), W("Línguas indígenas do Brasil")]
  };

  E["Linguagens#4"] = {
    s: [
      ["Metáfora x comparação x metonímia", "**Comparação** usa conectivo: \"Seus olhos são como estrelas\". **Metáfora** é a comparação sem conectivo: \"Seus olhos são estrelas\". **Metonímia** troca uma palavra por outra com relação de proximidade, sem comparar: \"Li Machado de Assis\" (o autor pela obra), \"Bebeu um copo\" (o recipiente pelo conteúdo), \"O Planalto decidiu\" (o lugar pela instituição).\n\nDica: se dá para colocar 'como', é metáfora ou comparação; se é uma substituição por algo relacionado, é metonímia."],
      ["Ironia, eufemismo e hipérbole", "**Ironia** diz o contrário do que se pensa, para criticar ou fazer humor: \"Que belo trabalho!\", diante de algo malfeito. É muito usada em charges e tirinhas.\n\n**Eufemismo** suaviza uma ideia desagradável: \"ele partiu\" em vez de \"ele morreu\". **Hipérbole** exagera para dar ênfase: \"já falei isso um milhão de vezes\". **Antítese** junta ideias opostas (\"o riso e o choro\"); **paradoxo** junta opostos na mesma ideia, de forma aparentemente impossível (\"é ferida que dói e não se sente\")."]
    ],
    tab: [{ at: 3, title: "Figuras de som", head: ["Figura", "O que é", "Exemplo"], rows: [["Aliteração", "repetição de consoantes", "o rato roeu a roupa do rei de Roma"], ["Assonância", "repetição de vogais", "sou Ana, da cama, da cana"], ["Onomatopeia", "imita sons", "tique-taque, cocoricó"], ["Paronomásia", "palavras de som parecido", "quem casa quer casa"]] }],
    sabia: "Muitas expressões do dia a dia são metáforas que nem percebemos mais, como 'pé da mesa', 'braço do rio' e 'céu da boca' (as chamadas catacreses).",
    prova: "O ENEM pede o efeito de sentido da figura, não só o nome. Pergunte: o que o autor ganha usando essa figura (ênfase, humor, crítica, suavização)?",
    ler: [W("Figura de linguagem"), W("Metonímia"), W("Ironia")]
  };

  E["Linguagens#5"] = {
    s: [
      ["Linha do tempo e contexto", "Cada escola literária responde ao seu tempo. O **Barroco** (século XVII) reflete a tensão religiosa da Contrarreforma: conflito entre fé e prazer, corpo e alma. O **Arcadismo** (século XVIII) acompanha o Iluminismo: razão, simplicidade e vida no campo. O **Romantismo** (século XIX) nasce com a Independência: nacionalismo, indianismo e sentimentalismo.\n\nO **Realismo** reage ao Romantismo com crítica social e análise psicológica, num Brasil que discute a abolição. Entender o contexto ajuda a reconhecer o estilo mesmo em textos que você nunca leu."],
      ["Autores que mais caem", "**Gregório de Matos** (Barroco): poesia satírica, o 'Boca do Inferno'. **Tomás Antônio Gonzaga** (Arcadismo): Marília de Dirceu. **José de Alencar** (Romantismo): Iracema, O Guarani, Senhora. **Gonçalves Dias**: Canção do Exílio. **Castro Alves**: poesia abolicionista, Navio Negreiro. **Machado de Assis** (Realismo): Memórias Póstumas de Brás Cubas, Dom Casmurro. **Aluísio Azevedo** (Naturalismo): O Cortiço. **Cruz e Sousa** (Simbolismo): Broquéis.\n\nTodas essas obras estão em domínio público e podem ser lidas de graça no portal Domínio Público e na Brasiliana da USP."]
    ],
    fig: [{ id: "linha_literatura", at: 0, cap: "Linha do tempo das escolas literárias no Brasil (ilustração Easy Study)." }],
    tab: [{ at: 1, title: "As três gerações românticas na poesia", head: ["Geração", "Tema", "Autor"], rows: [["1ª (nacionalista)", "pátria, natureza, indígena", "Gonçalves Dias"], ["2ª (ultrarromântica)", "morte, tédio, amor idealizado", "Álvares de Azevedo"], ["3ª (condoreira)", "crítica social, abolição", "Castro Alves"]] }],
    sabia: "Dom Casmurro termina sem resolver se Capitu traiu Bentinho. A dúvida é proposital: o narrador é a única fonte da história e pode estar enganado.",
    prova: "O ENEM traz trechos e pede características da escola ou a relação com o contexto histórico. A Fuvest e a Unicamp cobram as obras da lista de leitura obrigatória: confira a lista do seu ano.",
    ler: [DOMINIO, BBM, FUVEST, W("Literatura do Brasil")]
  };

  E["Linguagens#6"] = {
    s: [
      ["A Semana de 22 e suas ideias", "A Semana de Arte Moderna (1922, no Theatro Municipal de São Paulo) propunha **romper com o academicismo** e criar uma arte brasileira moderna. Os modernistas defendiam verso livre, linguagem coloquial, humor, crítica social e valorização da cultura popular.\n\nO **Manifesto Antropófago** (1928), de Oswald de Andrade, propõe 'devorar' a cultura estrangeira e transformá-la em algo brasileiro. 'Tupi or not tupi, that is the question' resume a ideia com ironia."],
      ["Leituras essenciais", "**Mário de Andrade**: Macunaíma, 'o herói sem nenhum caráter'. **Manuel Bandeira**: Vou-me embora pra Pasárgada. **Carlos Drummond de Andrade**: No meio do caminho, José. **Graciliano Ramos**: Vidas Secas, sobre a seca e a desumanização. **Rachel de Queiroz**: O Quinze. **Jorge Amado**: Capitães da Areia. **Cecília Meireles** e **Vinicius de Moraes** na poesia.\n\nNa terceira geração: **Clarice Lispector** (A Hora da Estrela), **Guimarães Rosa** (Grande Sertão: Veredas) e **João Cabral de Melo Neto** (Morte e Vida Severina). Entre os contemporâneos, aparecem Conceição Evaristo e Carolina Maria de Jesus."]
    ],
    tab: [{ at: 2, title: "As três gerações modernistas", head: ["Geração", "Período", "Marca"], rows: [["1ª (heroica)", "1922–1930", "ruptura, humor, nacionalismo crítico"], ["2ª (de 30)", "1930–1945", "romance regionalista e poesia reflexiva"], ["3ª (de 45)", "a partir de 1945", "experimentação com a linguagem, introspecção"]] }],
    sabia: "Carolina Maria de Jesus escreveu Quarto de Despejo em cadernos que recolhia no lixo, enquanto vivia na favela do Canindé, em São Paulo. O livro foi traduzido para mais de 10 idiomas.",
    prova: "O ENEM adora Drummond, Bandeira, Graciliano, Clarice e João Cabral, e cada vez mais autoras negras contemporâneas. Relacione o trecho com o contexto social do período.",
    ler: [W("Semana de Arte Moderna"), W("Modernismo no Brasil"), FUVEST]
  };

  E["Linguagens#7"] = {
    s: [
      ["Conectivos e o sentido", "Trocar o conectivo muda o sentido do texto. \"Estudou, **mas** não passou\" (oposição) é diferente de \"Estudou, **por isso** passou\" (conclusão). Questões pedem com frequência qual conectivo pode substituir outro **sem alterar o sentido**.\n\nGrupos principais: **adição** (e, além disso, também); **oposição** (mas, porém, contudo, entretanto, no entanto); **causa** (porque, já que, visto que); **conclusão** (portanto, logo, por isso); **concessão** (embora, ainda que, mesmo que); **condição** (se, caso); **finalidade** (para que, a fim de que)."],
      ["Vírgula: as regras que mais caem", "**Use** vírgula para: separar itens de uma enumeração; isolar o vocativo (\"Maria, venha cá\"); isolar o aposto (\"São Paulo, a maior cidade do país, ...\"); separar adjunto adverbial deslocado e longo; isolar conjunções intercaladas (\"Ele, porém, não veio\").\n\n**Não use** vírgula entre o sujeito e o verbo (\"Os alunos, estudaram\" está errado) nem entre o verbo e seus complementos. Esse é o erro mais comum nas redações."]
    ],
    tab: [{ at: 4, title: "Conectivos que se equivalem", head: ["Relação", "Conectivos"], rows: [["Oposição", "mas, porém, contudo, todavia, entretanto, no entanto"], ["Concessão", "embora, ainda que, mesmo que, apesar de"], ["Causa", "porque, pois, já que, visto que, uma vez que"], ["Conclusão", "logo, portanto, por isso, assim, dessa forma"], ["Condição", "se, caso, desde que, contanto que"]] }],
    sabia: "Um caso famoso: uma vírgula pode mudar uma sentença. 'Não, espere' e 'Não espere' pedem atitudes opostas.",
    prova: "No ENEM, a gramática aparece dentro do texto: valor semântico de conectivos, retomadas de pronomes e efeito da pontuação. Na redação, isso conta na C1 e na C4.",
    ler: [W("Coesão textual"), W("Conjunção"), W("Vírgula")]
  };
})();
