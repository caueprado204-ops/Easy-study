// Conteúdo extra (texto original do Easy Study): História, Geografia, Filosofia e Sociologia e Redação.
window.EXTRA = window.EXTRA || {};
(function () {
  const E = window.EXTRA;
  const W = (t) => ["Wikipédia: " + t, "https://pt.wikipedia.org/wiki/" + encodeURIComponent(t.replace(/ /g, "_"))];
  const KHAN_HIS = ["Khan Academy (em português): Humanidades", "https://pt.khanacademy.org/humanities"];
  const BBM = ["Biblioteca Brasiliana Guita e José Mindlin (USP)", "https://digital.bbm.usp.br/"];
  const ARQ = ["Arquivo Nacional: acervo histórico do Brasil", "https://www.gov.br/arquivonacional/pt-br"];
  const IBGE = ["IBGE Educa: mapas, dados e população", "https://educa.ibge.gov.br/"];
  const ATLAS = ["IBGE: Atlas Escolar", "https://atlasescolar.ibge.gov.br/"];
  const INPE = ["INPE: clima, queimadas e desmatamento", "https://www.gov.br/inpe/pt-br"];
  const ANA = ["ANA: Agência Nacional de Águas", "https://www.gov.br/ana/pt-br"];
  const DOMINIO = ["Domínio Público (MEC): textos clássicos gratuitos", "http://www.dominiopublico.gov.br/"];
  const INEP = ["INEP: provas, gabaritos e Cartilha do Participante", "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem"];
  const CONST = ["Constituição Federal de 1988 (Planalto)", "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"];

  /* ===================== HISTÓRIA ===================== */
  E["História#2"] = {
    s: [["Democracia antiga x democracia atual", "A democracia ateniense era **direta**: os cidadãos votavam pessoalmente na Assembleia (Eclésia). Mas só eram cidadãos homens adultos, livres e filhos de atenienses; mulheres, estrangeiros (metecos) e escravizados ficavam de fora, a maior parte da população.\n\nA democracia atual é **representativa**: elegemos quem decide por nós, e o voto é universal. Roma deixou outra herança: o **direito romano**, base do sistema jurídico brasileiro, e a ideia de república (res publica, 'coisa pública'). O ENEM gosta de comparar esses modelos e discutir quem era excluído."]],
    fig: [{ id: "tl_antiga", at: 0, cap: "Da Antiguidade à crise do século XIV (ilustração Easy Study)." }],
    tab: [{ at: 2, title: "Fases de Roma", head: ["Fase", "Período", "Destaque"], rows: [["Monarquia", "753–509 a.C.", "reis etruscos"], ["República", "509–27 a.C.", "Senado, cônsules, conflitos entre patrícios e plebeus"], ["Império", "27 a.C.–476 d.C.", "expansão, pão e circo, cristianismo oficial"]] }],
    sabia: "A palavra 'ostracismo' vem de Atenas: os cidadãos escreviam em cacos de cerâmica (óstracos) o nome de quem queriam exilar por dez anos.",
    prova: "Cidadania e exclusão em Atenas, a política do pão e circo e a herança cultural greco-romana (teatro, filosofia, direito, arquitetura) são os temas mais cobrados.",
    ler: [W("Democracia ateniense"), W("Roma Antiga"), KHAN_HIS]
  };

  E["História#4"] = {
    s: [["O Islã e o Oriente medieval", "Enquanto a Europa Ocidental se ruralizava, o mundo islâmico florescia. Fundado por Maomé no século VII, o Islã se expandiu da Península Arábica à Península Ibérica. Os árabes preservaram e traduziram obras gregas, desenvolveram a álgebra (palavra de origem árabe), a medicina e a astronomia, e difundiram os algarismos que usamos hoje, criados na Índia.\n\nO **Império Bizantino**, com capital em Constantinopla, manteve a tradição romana no Oriente até 1453. A presença árabe na Península Ibérica por cerca de sete séculos deixou marcas no português: azeite, alface, almofada, açúcar."]],
    fig: [{ id: "tl_antiga", at: 3, cap: "Linha do tempo da Antiguidade à Baixa Idade Média (ilustração Easy Study)." }],
    tab: [{ at: 0, title: "Sociedade feudal", head: ["Grupo", "Função"], rows: [["Clero", "rezar (oratores)"], ["Nobreza", "guerrear e proteger (bellatores)"], ["Servos", "trabalhar a terra (laboratores)"]] }],
    sabia: "A Peste Negra matou cerca de um terço da população europeia em poucos anos, o que encareceu a mão de obra e ajudou a enfraquecer a servidão.",
    prova: "Questões abordam a relação entre Igreja e poder, a estrutura feudal, o renascimento comercial e urbano e o legado árabe. Fuja da visão de 'Idade das Trevas': as provas valorizam a produção cultural medieval.",
    ler: [W("Feudalismo"), W("Idade de Ouro islâmica"), KHAN_HIS]
  };

  E["História#6"] = {
    s: [["A conquista da América", "A chegada dos europeus à América foi um encontro violento. Astecas e incas, civilizações com cidades grandes e sistemas agrícolas sofisticados, foram conquistados por pequenos grupos espanhóis graças a alianças com povos rivais, armas de ferro, cavalos e, principalmente, **epidemias** (varíola e sarampo), que mataram a maior parte da população nativa.\n\nA exploração se baseou no trabalho forçado indígena (encomienda e mita) e, depois, na escravidão africana. O ENEM pede que você entenda a conquista do ponto de vista dos povos indígenas, não só dos europeus."]],
    fig: [{ id: "tl_moderna", at: 0, cap: "Das Grandes Navegações às revoluções (ilustração Easy Study)." }],
    tab: [{ at: 3, title: "Pensadores iluministas", head: ["Pensador", "Ideia central"], rows: [["Locke", "direitos naturais: vida, liberdade e propriedade"], ["Montesquieu", "separação dos três poderes"], ["Voltaire", "liberdade de expressão e tolerância religiosa"], ["Rousseau", "soberania popular e vontade geral"], ["Adam Smith", "liberalismo econômico, livre mercado"]] }],
    sabia: "A imprensa de Gutenberg (por volta de 1450) barateou os livros e ajudou a espalhar as ideias da Reforma Protestante: as teses de Lutero circularam pela Alemanha em poucas semanas.",
    prova: "Mercantilismo, absolutismo, Reforma e Iluminismo são cobrados quase sempre por meio de textos da época. Associe o pensador à ideia e à revolução que ela inspirou.",
    ler: [W("Iluminismo"), W("Reforma Protestante"), W("Conquista do Império Asteca")]
  };

  E["História#10"] = {
    s: [["Imperialismo e neocolonialismo", "No século XIX, as potências industriais (Inglaterra, França, Alemanha, Bélgica e, depois, EUA e Japão) disputaram territórios na África e na Ásia em busca de matérias-primas, mercados consumidores e áreas de investimento.\n\nA **Conferência de Berlim** (1884–1885) dividiu a África entre os europeus, com fronteiras traçadas sem respeitar povos e culturas locais, o que gera conflitos até hoje. A justificativa ideológica incluía o **darwinismo social** e a ideia de 'missão civilizadora', hoje entendidas como racistas."]],
    fig: [{ id: "tl_moderna", at: 1, cap: "Do Renascimento ao Manifesto Comunista (ilustração Easy Study)." }],
    tab: [{ at: 3, title: "Ideologias do século XIX", head: ["Ideologia", "Proposta"], rows: [["Liberalismo", "liberdades individuais, Estado mínimo"], ["Socialismo utópico", "sociedade igualitária por reformas e cooperação"], ["Socialismo científico (Marx)", "luta de classes e fim da propriedade privada dos meios de produção"], ["Anarquismo", "fim do Estado e de toda autoridade"], ["Nacionalismo", "unidade de um povo em torno de um Estado"]] }],
    sabia: "Na Revolução Industrial, crianças de 6 a 8 anos trabalhavam até 14 horas por dia nas fábricas inglesas. As primeiras leis trabalhistas surgiram justamente para limitar o trabalho infantil.",
    prova: "Condições de trabalho na Revolução Industrial, a Declaração dos Direitos do Homem e do Cidadão, as ideologias e o imperialismo na África aparecem com frequência, muitas vezes com charges e documentos da época.",
    ler: [W("Revolução Industrial"), W("Conferência de Berlim"), W("Revolução Francesa")]
  };

  E["História#8"] = {
    s: [["Povos indígenas e a colonização", "Quando os portugueses chegaram, havia milhões de indígenas no território, com centenas de povos e línguas. A colonização trouxe guerras, escravização, doenças e a ação dos **jesuítas**, que catequizavam em aldeamentos e, ao mesmo tempo, se opunham à escravização indígena por colonos.\n\nOs **bandeirantes** paulistas capturavam indígenas e buscavam metais. A historiografia atual, cobrada nas provas, destaca a **resistência** e o protagonismo indígena, e não apenas sua posição de vítima. A Constituição de 1988 reconhece aos povos indígenas o direito às terras que tradicionalmente ocupam."]],
    fig: [{ id: "tl_colonia", at: 0, cap: "Marcos do Brasil Colônia (ilustração Easy Study)." }],
    tab: [{ at: 3, title: "Revoltas coloniais", head: ["Revolta", "Ano", "Caráter"], rows: [["Revolta de Beckman", "1684", "nativista, contra o monopólio comercial"], ["Guerra dos Emboabas", "1707–1709", "nativista, disputa pelas minas"], ["Revolta de Vila Rica", "1720", "nativista, contra as casas de fundição"], ["Inconfidência Mineira", "1789", "separatista, elite, contra a derrama"], ["Conjuração Baiana", "1798", "separatista, popular, contra a escravidão"]] }],
    sabia: "O Quilombo dos Palmares, na Serra da Barriga (atual Alagoas), resistiu por quase um século e chegou a reunir milhares de pessoas. Zumbi morreu em 20 de novembro de 1695, data hoje do Dia da Consciência Negra.",
    prova: "O ENEM cobra a economia açucareira, a escravidão e as formas de resistência (quilombos, fugas, revoltas), além das diferenças entre as revoltas nativistas e separatistas.",
    ler: [W("Brasil Colônia"), W("Quilombo dos Palmares"), BBM, ARQ]
  };

  E["História#12"] = {
    s: [["Escravidão e abolição no Império", "O Brasil foi o país que mais recebeu africanos escravizados nas Américas e o último a abolir a escravidão. A abolição foi gradual e cheia de pressões: a Inglaterra pressionava pelo fim do tráfico; o movimento abolicionista crescia nas cidades com nomes como **Joaquim Nabuco, André Rebouças, Luiz Gama e José do Patrocínio**; e os próprios escravizados resistiam com fugas em massa.\n\nA Lei Áurea (1888) libertou cerca de 700 mil pessoas, mas **não previu indenização, terra nem educação** para os libertos, o que ajuda a explicar desigualdades raciais que existem até hoje."]],
    fig: [{ id: "tl_imperio", at: 0, cap: "Da Independência à Proclamação da República (ilustração Easy Study)." }],
    tab: [{ at: 3, title: "Leis abolicionistas", head: ["Lei", "Ano", "O que fez"], rows: [["Eusébio de Queirós", "1850", "proibiu o tráfico de africanos"], ["Ventre Livre", "1871", "filhos de escravizadas nasciam livres"], ["Sexagenários", "1885", "libertou maiores de 60 anos"], ["Áurea", "1888", "aboliu a escravidão"]] }],
    sabia: "A Lei de Terras de 1850, aprovada no mesmo ano do fim do tráfico, determinou que terras só poderiam ser obtidas por compra. Isso dificultou que libertos e imigrantes pobres tivessem acesso à terra.",
    prova: "Questões envolvem a crise do Império (questões religiosa, militar e abolicionista), as rebeliões regenciais e a abolição com suas consequências. A Lei de Terras aparece como origem da concentração fundiária.",
    ler: [W("Abolição da escravatura no Brasil"), W("Lei de Terras"), W("Luiz Gama"), ARQ]
  };

  E["História#18"] = {
    s: [["Constituição de 1988 e direitos", "A **Constituição Cidadã** de 1988 marcou o fim da ditadura. Ela garantiu voto direto, inclusive para analfabetos e jovens de 16 e 17 anos (facultativo), criou o **SUS**, reconheceu direitos indígenas e quilombolas, tornou o racismo crime inafiançável e ampliou direitos trabalhistas e sociais.\n\nDepois dela, o país viveu o impeachment de Collor (1992), o Plano Real (1994), que controlou a hiperinflação, e a ampliação de políticas sociais. As provas pedem para relacionar os artigos da Constituição a situações concretas de cidadania."]],
    fig: [{ id: "tl_republica", at: 0, cap: "Marcos da República brasileira (ilustração Easy Study)." }],
    tab: [{ at: 0, title: "Revoltas da República Velha", head: ["Revolta", "Ano", "Motivo"], rows: [["Canudos", "1896–1897", "comunidade de sertanejos liderada por Antônio Conselheiro"], ["Vacina", "1904", "vacinação obrigatória e reformas urbanas no Rio"], ["Chibata", "1910", "castigos físicos na Marinha"], ["Contestado", "1912–1916", "disputa de terras em SC e PR"], ["Tenentismo", "anos 1920", "jovens oficiais contra as oligarquias"]] }],
    sabia: "As mulheres brasileiras conquistaram o direito ao voto em 1932, durante o governo Vargas, graças à luta de nomes como Bertha Lutz.",
    prova: "Coronelismo e voto de cabresto, trabalhismo e populismo de Vargas, censura e AI-5 na ditadura e redemocratização com a Constituição de 1988 são os mais cobrados.",
    ler: [W("Era Vargas"), W("Ditadura militar brasileira"), CONST, ARQ]
  };

  E["História#16"] = {
    s: [["O mundo depois de 1991", "Com o fim da União Soviética (1991), a ordem bipolar da Guerra Fria deu lugar a um mundo de **hegemonia dos EUA** e, depois, à multipolaridade, com a ascensão da China, da União Europeia e de blocos como os BRICS.\n\nMarcos do período: globalização acelerada pela internet, atentados de 11 de setembro de 2001 e a 'guerra ao terror', crise financeira de 2008, Primavera Árabe (2010–2012) e a pandemia de covid-19. O ENEM liga esses fatos à geopolítica e aos direitos humanos."]],
    fig: [{ id: "tl_seculo20", at: 0, cap: "O século XX em sete marcos (ilustração Easy Study)." }],
    tab: [{ at: 3, title: "Guerra Fria em resumo", head: ["", "Bloco capitalista (EUA)", "Bloco socialista (URSS)"], rows: [["Economia", "mercado e propriedade privada", "planificada e estatal"], ["Aliança militar", "OTAN (1949)", "Pacto de Varsóvia (1955)"], ["Plano econômico", "Plano Marshall", "Comecon"], ["Conflitos indiretos", "Coreia, Vietnã, Cuba, Afeganistão", "(os mesmos, do outro lado)"]] }],
    sabia: "A Declaração Universal dos Direitos Humanos, de 1948, foi escrita como resposta aos horrores da Segunda Guerra Mundial e do Holocausto.",
    prova: "Totalitarismos (nazismo, fascismo, stalinismo), Holocausto, Guerra Fria e descolonização afro-asiática. As provas usam propaganda de época e documentos oficiais para pedir análise crítica.",
    ler: [W("Guerra Fria"), W("Segunda Guerra Mundial"), W("Declaração Universal dos Direitos Humanos")]
  };

  /* ===================== GEOGRAFIA ===================== */
  E["Geografia#0"] = {
    s: [["Tecnologias da cartografia", "Hoje os mapas são feitos com **sensoriamento remoto** (imagens de satélite), **GPS** (que localiza um ponto por sinais de vários satélites) e **SIG**, os Sistemas de Informação Geográfica, que cruzam camadas de dados num mapa digital.\n\nO Brasil usa satélites para monitorar o desmatamento em tempo quase real (sistemas DETER e PRODES do INPE), prever safras e planejar cidades. Aplicativos de trânsito e entrega também são cartografia aplicada."]],
    fig: [{ id: "fusos", at: 1, cap: "Coordenadas geográficas e fusos horários (ilustração Easy Study)." }],
    tab: [{ at: 3, title: "Projeções cartográficas", head: ["Projeção", "Mantém", "Distorce", "Uso"], rows: [["Mercator (cilíndrica)", "formas e ângulos", "áreas perto dos polos", "navegação"], ["Peters (cilíndrica)", "proporção das áreas", "formas", "crítica ao eurocentrismo"], ["Azimutal (plana)", "distâncias a partir do centro", "bordas", "rotas aéreas, regiões polares"], ["Cônica", "boa precisão em latitudes médias", "regiões distantes do paralelo de contato", "mapas de países"]] }],
    sabia: "Na projeção de Mercator, a Groenlândia parece do tamanho da África, mas a África é cerca de 14 vezes maior.",
    prova: "Cálculo de fusos e de escalas, leitura de coordenadas e a ideologia das projeções (Mercator x Peters) são clássicos. Lembre: 15° = 1 hora; leste adianta, oeste atrasa.",
    ler: [W("Projeção cartográfica"), W("Fuso horário"), ATLAS, INPE]
  };

  E["Geografia#1"] = {
    s: [["O relevo brasileiro", "O Brasil está no centro da Placa Sul-Americana, por isso tem poucos terremotos fortes e não tem vulcões ativos. O relevo é antigo e muito desgastado pela erosão: predominam **planaltos, planícies e depressões**, com altitudes modestas. O ponto mais alto é o Pico da Neblina (cerca de 2.995 m), no Amazonas.\n\nA classificação mais usada é a de **Jurandyr Ross**, que divide o relevo em planaltos, planícies e depressões com base em imagens de radar do projeto RadamBrasil."]],
    fig: [{ id: "terra", at: 0, cap: "Camadas internas da Terra (ilustração Easy Study)." }],
    tab: [{ at: 1, title: "Tipos de rocha", head: ["Tipo", "Como se forma", "Exemplos"], rows: [["Ígnea (magmática)", "resfriamento do magma", "granito, basalto"], ["Sedimentar", "acúmulo e compactação de sedimentos", "arenito, calcário"], ["Metamórfica", "transformação por calor e pressão", "mármore, ardósia"]] }],
    sabia: "A famosa 'terra roxa' do Paraná e de São Paulo vem da decomposição do basalto, uma rocha vulcânica de derrames muito antigos, e é um dos solos mais férteis do país.",
    prova: "Placas tectônicas, tipos de rocha, intemperismo, erosão e problemas de solo (lixiviação, laterização, voçorocas, desertificação). O ENEM pede práticas de conservação, como curvas de nível e plantio direto.",
    ler: [W("Placas tectônicas"), W("Relevo do Brasil"), IBGE]
  };

  E["Geografia#2"] = {
    s: [["Acordos climáticos", "O **Protocolo de Kyoto** (1997) estabeleceu metas de redução de emissões para países desenvolvidos. O **Acordo de Paris** (2015) envolveu quase todos os países, com o objetivo de limitar o aquecimento global a bem menos de 2 °C, buscando 1,5 °C, cada país definindo suas metas (NDCs).\n\nO Brasil tem papel central por causa da Amazônia e da matriz energética limpa. A maior fonte de emissões brasileiras, historicamente, vem da **mudança no uso da terra**, principalmente o desmatamento, e não da indústria. Em 2025, Belém sediou a COP30."]],
    fig: [{ id: "climas", at: 1, cap: "Principais climas do Brasil (ilustração Easy Study)." }],
    tab: [{ at: 2, title: "Fenômenos urbanos e atmosféricos", head: ["Fenômeno", "O que é"], rows: [["Ilha de calor", "centro urbano mais quente pela concentração de asfalto e concreto"], ["Inversão térmica", "ar frio preso embaixo do quente, concentrando poluentes (inverno)"], ["Chuva ácida", "óxidos de enxofre e nitrogênio formando ácidos na chuva"], ["Rios voadores", "umidade da Amazônia levada pelo vento ao Centro-Sul"]] }],
    sabia: "Uma grande árvore amazônica pode transpirar centenas de litros de água por dia. Somada, essa umidade forma os 'rios voadores' que levam chuva ao Sudeste.",
    prova: "Ilhas de calor, inversão térmica, El Niño, aquecimento global e acordos internacionais aparecem todo ano. Leia climogramas: barras são chuva, linha é temperatura.",
    ler: [W("Acordo de Paris"), W("Rios voadores"), INPE]
  };

  E["Geografia#3"] = {
    s: [["Unidades de conservação e povos tradicionais", "O **SNUC** (Sistema Nacional de Unidades de Conservação) divide as áreas protegidas em dois grupos: de **proteção integral** (parques nacionais, reservas biológicas, sem moradia nem exploração direta) e de **uso sustentável** (reservas extrativistas, florestas nacionais, onde comunidades vivem e usam os recursos de forma controlada).\n\nTerras indígenas e territórios quilombolas estão entre as áreas mais preservadas da Amazônia, segundo dados de satélite. Isso mostra que conservação e presença de povos tradicionais caminham juntas."]],
    tab: [{ at: 0, title: "Biomas brasileiros", head: ["Bioma", "Clima", "Ameaça principal"], rows: [["Amazônia", "equatorial", "desmatamento, garimpo"], ["Cerrado", "tropical com estação seca", "expansão agropecuária"], ["Caatinga", "semiárido", "desertificação"], ["Mata Atlântica", "tropical úmido", "urbanização (restam poucos remanescentes)"], ["Pantanal", "tropical", "queimadas, assoreamento"], ["Pampa", "subtropical", "monoculturas, arenização"]] }],
    sabia: "O Cerrado é chamado de 'berço das águas': nele nascem rios de oito das doze grandes regiões hidrográficas do Brasil.",
    prova: "Caracterização dos biomas, desmatamento, aquíferos (Guarani), transposição do São Francisco e crise hídrica. O ENEM costuma pedir a ação humana que causa o impacto descrito.",
    ler: [W("Biomas do Brasil"), W("Aquífero Guarani"), ANA, INPE]
  };

  E["Geografia#4"] = {
    s: [["Migrações no Brasil", "O Brasil foi marcado por grandes migrações internas: nordestinos para o Sudeste (especialmente São Paulo) entre as décadas de 1950 e 1980, gaúchos e paranaenses para o Centro-Oeste e a Amazônia com a expansão agrícola, e o **êxodo rural** que esvaziou o campo.\n\nHoje há **migração de retorno** ao Nordeste e o crescimento de cidades médias. O país também recebe imigrantes e refugiados, como haitianos e venezuelanos. As provas cobram as causas (fatores de expulsão e de atração) e os efeitos sobre as cidades."]],
    fig: [{ id: "transicao", at: 3, cap: "Transição demográfica: a mortalidade cai antes da natalidade (ilustração Easy Study)." }],
    tab: [{ at: 1, title: "Problemas urbanos e causas", head: ["Problema", "Causa principal"], rows: [["Favelização", "falta de moradia acessível e especulação imobiliária"], ["Enchentes", "impermeabilização do solo e ocupação de várzeas"], ["Mobilidade ruim", "prioridade ao carro, transporte público insuficiente"], ["Segregação socioespacial", "pobres empurrados para periferias distantes"]] }],
    sabia: "Mais de 85% da população brasileira vive em áreas urbanas, segundo o IBGE.",
    prova: "Pirâmides etárias, envelhecimento da população, êxodo rural, metropolização e problemas urbanos. Saiba ler uma pirâmide: base larga = muitos jovens; topo largo = população envelhecida.",
    ler: [W("Transição demográfica"), W("Urbanização do Brasil"), IBGE]
  };

  E["Geografia#5"] = {
    s: [["Agronegócio e agricultura familiar", "O **agronegócio** brasileiro é um dos maiores exportadores do mundo de soja, carne, café, açúcar e suco de laranja. É muito mecanizado, ocupa grandes áreas e é voltado ao mercado externo.\n\nA **agricultura familiar** ocupa uma área bem menor, mas produz boa parte dos alimentos que chegam à mesa dos brasileiros e emprega mais gente no campo. O ENEM cobra os conflitos fundiários, a concentração de terras, o uso de agrotóxicos e a expansão da fronteira agrícola sobre o Cerrado e a Amazônia."]],
    tab: [{ at: 3, title: "Principais blocos econômicos", head: ["Bloco", "Membros de destaque", "Tipo"], rows: [["Mercosul", "Brasil, Argentina, Uruguai, Paraguai", "união aduaneira (imperfeita)"], ["União Europeia", "27 países europeus", "união econômica e monetária"], ["USMCA (antigo Nafta)", "EUA, México, Canadá", "zona de livre comércio"], ["BRICS", "Brasil, Rússia, Índia, China, África do Sul e novos membros", "grupo político-econômico"]] }],
    sabia: "A soja chegou a ser cultivada com sucesso no Cerrado graças a pesquisas da Embrapa, que adaptaram a planta e corrigiram a acidez do solo com calcário.",
    prova: "Globalização e suas desigualdades, industrialização brasileira (concentrada no Sudeste e depois desconcentrada), matriz energética e blocos econômicos. Relacione economia, território e meio ambiente.",
    ler: [W("Globalização"), W("Agricultura familiar"), W("Mercosul"), IBGE]
  };

  /* ===================== FILOSOFIA E SOCIOLOGIA ===================== */
  E["Filosofia e Sociologia#0"] = {
    s: [["O mito da caverna em 4 passos", "1) Prisioneiros acorrentados desde a infância veem apenas sombras projetadas na parede e acham que elas são a realidade. 2) Um deles se liberta, sai da caverna e, depois de se acostumar com a luz, vê o mundo real e o Sol. 3) Ele volta para libertar os outros, mas é ridicularizado e ameaçado. 4) A caverna representa o **mundo sensível** (aparências); o exterior, o **mundo inteligível** (das ideias); o Sol, a ideia de Bem.\n\nA alegoria trata de educação, conhecimento e política: o filósofo, que conhece a verdade, deveria guiar a cidade. O ENEM costuma relacioná-la a fake news e redes sociais."]],
    fig: [{ id: "filosofos", at: 0, cap: "Da filosofia antiga à moderna (ilustração Easy Study)." }],
    tab: [{ at: 3, title: "Platão x Aristóteles", head: ["", "Platão", "Aristóteles"], rows: [["Realidade verdadeira", "mundo das ideias", "as próprias coisas (substância)"], ["Conhecimento", "razão, lembrança das ideias", "parte dos sentidos e da experiência"], ["Ética", "virtude é conhecer o Bem", "virtude é o meio-termo; fim é a felicidade"], ["Política", "governo dos filósofos", "o ser humano é um animal político"]] }],
    sabia: "Sócrates nunca escreveu nada. Quase tudo o que sabemos dele vem dos diálogos escritos por Platão, seu discípulo.",
    prova: "Questões trazem trechos dos filósofos e pedem o conceito: arché (pré-socráticos), maiêutica e 'só sei que nada sei' (Sócrates), mundo das ideias (Platão), meio-termo e animal político (Aristóteles).",
    ler: [W("Alegoria da caverna"), W("Aristóteles"), DOMINIO]
  };

  E["Filosofia e Sociologia#1"] = {
    s: [["Ética de Kant na prática", "Para Kant, uma ação é moral quando é feita **por dever**, seguindo a razão, e não por interesse ou medo. O **imperativo categórico** pode ser resumido em duas fórmulas: 'aja de modo que sua regra possa valer para todos' e 'trate a humanidade sempre como fim, nunca apenas como meio'.\n\nTeste: mentir para escapar de um problema pode ser universalizado? Se todos mentissem, ninguém acreditaria em promessas, então mentir não passa no teste. O ENEM costuma contrastar a ética kantiana com a utilitarista (que julga pelas consequências)."]],
    tab: [{ at: 2, title: "Contratualistas", head: ["Pensador", "Estado de natureza", "Contrato"], rows: [["Hobbes", "guerra de todos contra todos", "poder absoluto ao soberano (Leviatã)"], ["Locke", "relativa paz, com direitos naturais", "governo protege vida, liberdade e propriedade; direito de resistência"], ["Rousseau", "bom selvagem, corrompido pela propriedade", "vontade geral, soberania do povo"]] }],
    sabia: "A frase 'os fins justificam os meios' nunca aparece em O Príncipe, de Maquiavel. Ela é um resumo popular, e simplificado, das ideias dele.",
    prova: "Racionalismo (Descartes) x empirismo (Locke, Hume), imperativo categórico, Maquiavel e os contratualistas são muito cobrados. Associe cada autor à sua visão da natureza humana.",
    ler: [W("Imperativo categórico"), W("Contratualismo"), DOMINIO]
  };

  E["Filosofia e Sociologia#2"] = {
    s: [["Aplicando os clássicos hoje", "**Durkheim**: o aumento de casos de ansiedade numa sociedade em transformação rápida pode ser lido como **anomia**, a perda de referências e normas. **Weber**: a burocracia de um aplicativo de banco é um exemplo de **racionalização**, o mundo organizado por regras e eficiência. **Marx**: um entregador de aplicativo que trabalha muitas horas sem direitos ilustra a **exploração** e a precarização do trabalho.\n\nUsar esses conceitos para explicar fatos atuais é exatamente o que as provas pedem, e também é um ótimo repertório para a redação."]],
    fig: [{ id: "sociologos", at: 3, cap: "Os três clássicos da Sociologia e seus conceitos centrais (ilustração Easy Study)." }, { id: "dominacao", at: 1, cap: "Tipos de dominação legítima segundo Weber (ilustração Easy Study)." }],
    sabia: "Durkheim fez um dos primeiros estudos estatísticos da Sociologia, O Suicídio (1897), para mostrar que até um ato que parece individual tem causas sociais.",
    prova: "O ENEM cobra fato social e solidariedade (Durkheim), ação social e tipos de dominação (Weber), mais-valia, alienação e luta de classes (Marx). Leia o trecho e identifique o vocabulário de cada autor.",
    ler: [W("Émile Durkheim"), W("Max Weber"), W("Karl Marx")]
  };

  E["Filosofia e Sociologia#3"] = {
    s: [["Tecnologia, redes e sociedade", "Pensadores contemporâneos ajudam a entender a vida digital. A **indústria cultural** (Adorno e Horkheimer) mostra como a cultura vira mercadoria padronizada, e os algoritmos de recomendação podem ser lidos assim. **Foucault** fala em vigilância e controle: câmeras, dados pessoais e redes sociais ampliam o 'panóptico'.\n\n**Bauman** descreve a 'modernidade líquida', com relações frágeis e passageiras. **Byung-Chul Han** fala da 'sociedade do cansaço', em que as pessoas se exploram a si mesmas em busca de desempenho. Esses autores são repertório produtivo em redações sobre tecnologia e saúde mental."]],
    tab: [{ at: 0, title: "Autores contemporâneos e conceitos", head: ["Autor", "Conceito"], rows: [["Adorno e Horkheimer", "indústria cultural"], ["Hannah Arendt", "banalidade do mal"], ["Michel Foucault", "poder disciplinar, panóptico"], ["Simone de Beauvoir", "'não se nasce mulher, torna-se'"], ["Zygmunt Bauman", "modernidade líquida"], ["Pierre Bourdieu", "capital cultural, violência simbólica"]] }],
    sabia: "Hannah Arendt criou a expressão 'banalidade do mal' ao acompanhar o julgamento de Adolf Eichmann, um burocrata nazista que dizia apenas 'cumprir ordens'.",
    prova: "O ENEM traz trechos curtos de autores contemporâneos e pede a interpretação ou a relação com um problema atual. Esses nomes também valem muito como repertório na redação.",
    ler: [W("Escola de Frankfurt"), W("Hannah Arendt"), W("Michel Foucault")]
  };

  E["Filosofia e Sociologia#4"] = {
    s: [["Cidadania no Brasil", "O historiador José Murilo de Carvalho mostrou que, no Brasil, a ordem dos direitos foi diferente da inglesa: os **direitos sociais** (trabalhistas, com Vargas) vieram antes da consolidação dos **direitos políticos** e **civis**, muitas vezes concedidos 'de cima para baixo'.\n\nA Constituição de 1988 ampliou direitos, mas há distância entre o que está escrito e a realidade. Movimentos sociais (negro, feminista, indígena, LGBTQIA+, sem-terra, por moradia) atuam para reduzir essa distância. As provas pedem para relacionar os direitos às lutas que os conquistaram."]],
    tab: [{ at: 1, title: "Gerações de direitos (T. H. Marshall)", head: ["Direitos", "Exemplos", "Na Inglaterra"], rows: [["Civis", "liberdade, propriedade, igualdade perante a lei", "século XVIII"], ["Políticos", "votar e ser votado", "século XIX"], ["Sociais", "educação, saúde, trabalho, previdência", "século XX"]] }],
    sabia: "A Lei 10.639/2003 tornou obrigatório o ensino de história e cultura afro-brasileira nas escolas; em 2008, a Lei 11.645 incluiu também a cultura indígena.",
    prova: "Etnocentrismo x relativismo cultural, racismo estrutural, desigualdade de gênero e movimentos sociais. O ENEM pede posições críticas e respeitosas aos direitos humanos.",
    ler: [W("Etnocentrismo"), W("Racismo estrutural"), CONST]
  };

  /* ===================== REDAÇÃO ===================== */
  E["Redação#0"] = {
    fig: [{ id: "grade", at: 0, cap: "Cada competência vale de 0 a 200 pontos, em seis níveis (ilustração Easy Study)." }],
    tab: [{ at: 0, title: "As 5 competências", head: ["Competência", "Avalia"], rows: [["C1", "domínio da norma-padrão"], ["C2", "compreensão do tema, tipo textual e repertório"], ["C3", "seleção e organização dos argumentos (projeto de texto)"], ["C4", "mecanismos de coesão"], ["C5", "proposta de intervenção que respeite os direitos humanos"]] }],
    sabia: "Cada redação do ENEM é corrigida por dois avaliadores. Se as notas diferirem muito, um terceiro corretor entra, e, se ainda houver divergência, uma banca decide.",
    prova: "O ENEM cobra um texto dissertativo-argumentativo sobre um problema social brasileiro, em até 30 linhas, a partir de textos motivadores. A nota final é a soma das cinco competências (máximo 1.000).",
    ler: [INEP]
  };
  E["Redação#1"] = {
    fig: [{ id: "estrutura_redacao", at: 0, cap: "Estrutura em quatro parágrafos (ilustração Easy Study)." }],
    sabia: "Escrever o rascunho com um esquema de tese e dois argumentos antes de começar o texto definitivo economiza tempo e evita fugir do tema.",
    prova: "A estrutura de quatro parágrafos não é obrigatória, mas é a forma mais segura de atender a C3 e a C4 no tempo da prova.",
    ler: [INEP]
  };
  E["Redação#2"] = {
    fig: [{ id: "proposta", at: 0, cap: "Os cinco elementos da proposta de intervenção (ilustração Easy Study)." }],
    sabia: "Uma proposta pode ter todos os elementos numa única frase bem construída, sem precisar ocupar o parágrafo inteiro.",
    prova: "Na C5, cada elemento válido (agente, ação, meio, efeito e detalhamento) vale 40 pontos. Propostas que desrespeitam os direitos humanos zeram a competência.",
    ler: [INEP, CONST]
  };
  E["Redação#3"] = {
    s: [["Banco de repertório por tema", "Monte um caderno com repertórios que servem para vários temas: **Constituição de 1988** (art. 5º, igualdade; art. 6º, direitos sociais; art. 205, educação; art. 225, meio ambiente); **Bauman** (relações líquidas, consumo); **Durkheim** (anomia); **Paulo Freire** (educação libertadora); **Djamila Ribeiro** e **Silvio Almeida** (racismo estrutural); **Sérgio Buarque de Holanda** (o 'homem cordial'); dados do **IBGE** e da **OMS**.\n\nRepertório só vale nota alta quando é **pertinente** ao tema e **usado** no argumento, ou seja, explicado e ligado à sua tese."]],
    tab: [{ at: 4, title: "Repertórios versáteis", head: ["Eixo temático", "Repertório"], rows: [["Educação", "Paulo Freire; art. 205 da Constituição"], ["Tecnologia", "Bauman; Byung-Chul Han; Foucault (vigilância)"], ["Desigualdade e racismo", "Silvio Almeida; Lei Áurea sem reparação"], ["Meio ambiente", "Acordo de Paris; art. 225 da Constituição"], ["Saúde", "SUS (art. 196); OMS"]] }],
    sabia: "Filmes, séries, músicas e livros também contam como repertório, desde que você explique a relação com o tema.",
    prova: "Repertório legitimado, pertinente e produtivo leva a C2 aos níveis mais altos. Citação solta, sem análise, não garante nota.",
    ler: [CONST, DOMINIO]
  };
  E["Redação#4"] = {
    tab: [{ at: 0, title: "Comparação entre os vestibulares", head: ["Vestibular", "Tipo de texto", "Destaque"], rows: [["ENEM", "dissertativo-argumentativo", "proposta de intervenção obrigatória"], ["Fuvest", "dissertativo-argumentativo", "temas mais filosóficos e abstratos; sem proposta obrigatória"], ["Unicamp", "gêneros variados (carta, artigo, discurso...)", "duas propostas; atenção ao gênero e ao interlocutor"], ["Unesp", "dissertativo-argumentativo", "coletânea com textos de diferentes áreas"]] }],
    sabia: "Na Unicamp, errar o gênero pedido (por exemplo, escrever dissertação quando a proposta pede carta) derruba muito a nota.",
    prova: "Leia o edital e as redações nota máxima publicadas por cada universidade. Elas mostram o que a banca valoriza.",
    ler: [["Fuvest", "https://www.fuvest.br/"], ["Comvest (Unicamp)", "https://www.comvest.unicamp.br/"], ["Vunesp (Unesp)", "https://www.vunesp.com.br/"]]
  };
  const C = [
    ["Redação#5", "grade", "A C1 avalia a escrita formal do texto inteiro: estrutura das frases, ortografia, acentuação, concordância, regência e pontuação."],
    ["Redação#6", "estrutura_redacao", "A C2 pede o tema completo, o tipo dissertativo-argumentativo e repertório legitimado, pertinente e usado de forma produtiva."],
    ["Redação#7", "estrutura_redacao", "A C3 avalia se há um projeto de texto claro: os argumentos foram escolhidos, organizados e desenvolvidos para defender o ponto de vista."],
    ["Redação#8", "estrutura_redacao", "A C4 avalia como as partes do texto se ligam: operadores entre e dentro dos parágrafos, retomadas e ausência de repetições."],
    ["Redação#9", "proposta", "A C5 pede uma proposta de intervenção detalhada e articulada à discussão, respeitando os direitos humanos."]
  ];
  C.forEach(([k, fig, prova]) => { E[k] = { fig: [{ id: fig, at: 1, cap: { grade: "Os seis níveis de cada competência (ilustração Easy Study).", estrutura_redacao: "Estrutura em quatro parágrafos (ilustração Easy Study).", proposta: "Os cinco elementos da proposta (ilustração Easy Study)." }[fig] }], prova, ler: [INEP] }; });
  ["Redação#10", "Redação#11", "Redação#12", "Redação#13"].forEach((k) => { E[k] = { prova: "Treine reescrevendo parágrafos seus: corrija um tipo de problema por vez e compare com a versão anterior. Depois, envie a redação ao corretor da Easier.", ler: [INEP] }; });
  E["Redação#14"] = { fig: [{ id: "proposta", at: 0, cap: "Os cinco elementos da proposta (ilustração Easy Study)." }], prova: "Antes de entregar, confira: agente, ação, meio, efeito e detalhamento estão presentes e ligados ao problema discutido no texto?", ler: [INEP, CONST] };
})();
