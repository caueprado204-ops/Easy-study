// Easy Stories: roteiros originais do Easy Study (texto das telas = narração).
// Cada story: telas curtas (t = título na tela, f = fala/legenda, e = emoji grande), pergunta final valendo XP
// e uma missão de estudo (módulo cujo título começa com "mt") que libera a story.
window.STORIES = [
  /* ===================== 📚 RESENHAS ===================== */
  { id: "gh", serie: "resenha", titulo: "A Paixão Segundo G.H.", sub: "Clarice Lispector · Fuvest", e: "🪳", cor: "#8B5CF6", missao: { s: "Linguagens", mt: "Literatura: Modernismo" },
    telas: [
      { e: "🪳", t: "Uma barata. Uma revelação.", f: "E se uma barata no armário mudasse a forma como você enxerga a sua própria vida? É isso que acontece em A Paixão Segundo G.H., de Clarice Lispector, publicado em 1964." },
      { e: "🏙️", t: "Quem é G.H.?", f: "G.H. é uma escultora de classe média alta que mora numa cobertura no Rio de Janeiro. Um dia depois de a empregada, Janair, ir embora, ela resolve arrumar o quarto de serviço." },
      { e: "🚪", t: "O quarto de Janair", f: "Ela espera encontrar bagunça, mas o quarto está limpo e vazio. Na parede, um desenho a carvão: um homem, uma mulher e um cachorro. G.H. percebe que nunca tinha realmente olhado para Janair." },
      { e: "🌀", t: "A crise", f: "Ao abrir o armário, ela vê uma barata e a esmaga na porta. Diante do inseto morrendo, G.H. vive uma crise profunda: perde as certezas sobre quem é e se depara com a vida crua, sem enfeites." },
      { e: "✍️", t: "Como o livro é escrito", f: "Quase tudo acontece dentro da cabeça da narradora. É um longo monólogo, em fluxo de consciência, falando com um você imaginário. Cada capítulo começa repetindo a frase final do anterior." },
      { e: "💡", t: "Você sabia?", f: "O livro começa e termina com seis travessões, como se a história já estivesse acontecendo antes da primeira palavra e continuasse depois da última." },
      { e: "🎯", t: "Na prova", f: "Valendo XP: qual é o principal recurso narrativo de A Paixão Segundo G.H.?" },
    ],
    q: { o: ["Narrador onisciente e neutro", "Monólogo interior em fluxo de consciência", "Diálogos rápidos entre muitos personagens", "Cartas trocadas entre duas personagens"], k: 1, exp: "O romance é um monólogo da própria G.H., em fluxo de consciência, voltado para um interlocutor imaginário." } },

  { id: "bras", serie: "resenha", titulo: "Memórias Póstumas de Brás Cubas", sub: "Machado de Assis · Unicamp", e: "💀", cor: "#64748B", missao: { s: "Linguagens", mt: "Literatura: do Quinhentismo" },
    telas: [
      { e: "💀", t: "Um narrador morto", f: "Imagine um livro contado por alguém que já morreu. Em Memórias Póstumas de Brás Cubas, de 1881, Machado de Assis cria um defunto autor, que escreve suas memórias depois da morte." },
      { e: "🐛", t: "A dedicatória", f: "Já na dedicatória ele mostra a ironia: o livro é oferecido ao verme que primeiro roeu as frias carnes do seu cadáver." },
      { e: "🎩", t: "Quem foi Brás Cubas?", f: "Brás é um homem rico da elite carioca do século dezenove. Nunca trabalhou de verdade, viveu de herança e colecionou fracassos: na política, na ciência e no amor." },
      { e: "💔", t: "Os amores", f: "Marcela, que o amou, nas palavras dele, durante quinze meses e onze contos de réis. Virgília, com quem teve um caso por anos. E Eugênia, que ele abandonou por preconceito." },
      { e: "😏", t: "Por que é genial?", f: "O narrador conversa com o leitor, faz capítulos curtíssimos e zomba de tudo. Por trás do humor, Machado critica uma elite vaidosa, egoísta e acostumada à escravidão." },
      { e: "💡", t: "Você sabia?", f: "Este livro é considerado o marco inicial do Realismo no Brasil. E termina com uma frase famosa: não tive filhos, não transmiti a nenhuma criatura o legado da nossa miséria." },
      { e: "🎯", t: "Na prova", f: "Valendo XP: por que Brás Cubas é chamado de defunto autor?" },
    ],
    q: { o: ["Porque escreve as memórias depois de morto", "Porque morreu antes de terminar o livro", "Porque é um autor esquecido", "Porque o livro foi publicado após a morte de Machado"], k: 0, exp: "Brás Cubas narra as próprias memórias depois de morrer: é um defunto que se tornou autor, e não um autor que morreu." } },

  { id: "olhos", serie: "resenha", titulo: "Olhos d'água", sub: "Conceição Evaristo · Unicamp", e: "💧", cor: "#0EA5E9", missao: { s: "Linguagens", mt: "Interpretação" },
    telas: [
      { e: "💧", t: "De que cor eram os olhos da sua mãe?", f: "Essa pergunta abre Olhos d'água, livro de contos de Conceição Evaristo, publicado em 2014. A narradora percebe, com angústia, que não consegue se lembrar da cor dos olhos da própria mãe." },
      { e: "🏠", t: "A volta para casa", f: "Ela volta à casa da mãe para descobrir a resposta. E encontra olhos que são como água: olhos marcados pelas lágrimas, pela luta e também pela ternura." },
      { e: "✊🏾", t: "Escrevivência", f: "Conceição Evaristo criou a palavra escrevivência: uma escrita que nasce da vivência, especialmente da experiência de mulheres negras no Brasil." },
      { e: "🌆", t: "As histórias", f: "Os contos falam de mães, filhas, trabalhadoras e crianças das periferias. Mostram violência, pobreza e racismo, mas também afeto, memória e resistência." },
      { e: "📝", t: "O estilo", f: "A linguagem é poética mesmo quando o assunto é duro. É essa mistura de beleza e denúncia que torna os contos tão marcantes." },
      { e: "💡", t: "Você sabia?", f: "Conceição Evaristo trabalhou como empregada doméstica antes de se tornar professora e doutora em literatura. Hoje é uma das escritoras mais lidas e premiadas do país." },
      { e: "🎯", t: "Na prova", f: "Valendo XP: o que significa escrevivência?" },
    ],
    q: { o: ["Escrever apenas sobre fatos históricos", "Escrita que nasce da vivência, sobretudo de mulheres negras", "Um tipo de poema com rimas fixas", "Escrever sem pontuação"], k: 1, exp: "Escrevivência é o conceito de Conceição Evaristo para a escrita que parte da experiência vivida, em especial a de mulheres negras." } },

  { id: "balada", serie: "resenha", titulo: "Balada de Amor ao Vento", sub: "Paulina Chiziane · Fuvest", e: "🌬️", cor: "#F59E0B", missao: { s: "Linguagens", mt: "Interpretação" },
    telas: [
      { e: "🌬️", t: "Um amor contra o vento", f: "Balada de Amor ao Vento, de 1990, foi o primeiro romance publicado por uma mulher em Moçambique. A autora é Paulina Chiziane." },
      { e: "👩🏿", t: "Quem conta a história", f: "Quem narra é Sarnau, uma mulher que relembra sua juventude e o grande amor da sua vida, Mwando. Mas esse amor esbarra em tradições, famílias e escolhas difíceis." },
      { e: "👑", t: "Tradição e casamento", f: "Sarnau acaba casando com o futuro chefe da região, numa união poligâmica marcada pelo lobolo, o dote que a família do noivo paga à família da noiva." },
      { e: "⚖️", t: "Os grandes temas", f: "O livro discute a condição da mulher, a poligamia, o choque entre tradições africanas, a religião trazida pelos colonizadores e o desejo de ser livre." },
      { e: "🗣️", t: "O estilo", f: "A narrativa lembra a tradição oral: parece uma história contada em voz alta, com provérbios, canções e imagens poéticas." },
      { e: "💡", t: "Você sabia?", f: "Em 2021, Paulina Chiziane se tornou a primeira mulher africana a receber o Prêmio Camões, o maior prêmio da literatura em língua portuguesa." },
      { e: "🎯", t: "Na prova", f: "Valendo XP: o que é o lobolo, presente na obra?" },
    ],
    q: { o: ["Uma dança tradicional", "O dote pago pela família do noivo à família da noiva", "Um tipo de colheita", "O nome do vento na língua local"], k: 1, exp: "O lobolo é o dote pago pela família do noivo à família da noiva, prática que a obra discute ao tratar da condição da mulher." } },

  { id: "krenak", serie: "resenha", titulo: "A vida não é útil", sub: "Ailton Krenak · Unicamp", e: "🌱", cor: "#16A34A", missao: { s: "Filosofia e Sociologia", mt: "Cultura, cidadania" },
    telas: [
      { e: "🌱", t: "E se a vida não tiver que ser útil?", f: "Num mundo obcecado por produtividade, Ailton Krenak provoca: a vida não é útil. O livro reúne reflexões escritas durante a pandemia e foi publicado em 2020." },
      { e: "🪶", t: "Quem é Ailton Krenak", f: "Krenak é um pensador e líder indígena. Em 2023, tornou-se o primeiro indígena eleito para a Academia Brasileira de Letras." },
      { e: "🌍", t: "A ideia central", f: "Para ele, a sociedade ocidental se separou da natureza e passou a tratar rios, florestas e montanhas como recursos para gastar. A Terra, porém, é viva, e nós fazemos parte dela." },
      { e: "⏸️", t: "A economia não pode parar?", f: "Durante a pandemia, Krenak criticou a ideia de que a economia não pode parar. Ele pergunta: que tipo de vida estamos defendendo quando tudo gira em torno de produzir e consumir?" },
      { e: "✨", t: "Viver não é produzir", f: "O título resume o livro: a vida é para ser vivida, sentida e compartilhada, e não apenas aproveitada como algo útil." },
      { e: "💡", t: "Você sabia?", f: "Outro livro de Krenak muito lido nas escolas é Ideias para adiar o fim do mundo, de 2019, com reflexões parecidas." },
      { e: "🎯", t: "Na prova", f: "Valendo XP: qual é a crítica central de A vida não é útil?" },
    ],
    q: { o: ["A falta de tecnologia nas aldeias", "A separação entre humanidade e natureza e a obsessão por produtividade", "O excesso de feriados no Brasil", "A falta de escolas no campo"], k: 1, exp: "Krenak critica a ideia de uma humanidade separada da natureza, que trata a Terra como recurso, e a vida reduzida à produtividade." } },

  { id: "pescoco", serie: "resenha", titulo: "No seu pescoço", sub: "Chimamanda Ngozi Adichie · Unicamp", e: "🧣", cor: "#DB2777", missao: { s: "Linguagens", mt: "Interpretação" },
    telas: [
      { e: "🧣", t: "Algo apertando o pescoço", f: "No seu pescoço é um livro de contos da nigeriana Chimamanda Ngozi Adichie, publicado em 2009. As histórias se passam entre a Nigéria e os Estados Unidos." },
      { e: "✈️", t: "Imigrar", f: "Muitos personagens são nigerianos que vão viver nos Estados Unidos. Lá, enfrentam solidão, saudade e o choque de descobrir como são vistos pelos outros." },
      { e: "🪞", t: "Raça e identidade", f: "Uma ideia forte do livro: alguns personagens só passam a se perceber como negros quando chegam aos Estados Unidos, onde a cor da pele muda o modo como são tratados." },
      { e: "👤", t: "O conto-título", f: "O conto que dá nome ao livro é narrado em segunda pessoa, usando você. A solidão da protagonista é descrita como algo que aperta o pescoço e quase sufoca." },
      { e: "📖", t: "A história única", f: "Chimamanda é famosa pela palestra O perigo de uma história única, sobre como estereótipos reduzem pessoas e países inteiros a uma só versão." },
      { e: "💡", t: "Você sabia?", f: "Um trecho de outra palestra de Chimamanda, Sejamos todos feministas, foi usado numa música da cantora Beyoncé." },
      { e: "🎯", t: "Na prova", f: "Valendo XP: qual tema atravessa os contos de No seu pescoço?" },
    ],
    q: { o: ["A colonização portuguesa no Brasil", "Imigração, identidade e racismo entre a Nigéria e os EUA", "A vida no campo na Europa medieval", "Viagens espaciais"], k: 1, exp: "Os contos tratam de imigração, identidade, racismo e choque cultural na experiência de nigerianos, sobretudo nos Estados Unidos." } },

  /* ===================== 🕰️ 1 MINUTO DE HISTÓRIA ===================== */
  { id: "misseis", serie: "historia", titulo: "Crise dos Mísseis", sub: "1962 · Guerra Fria", e: "🚀", cor: "#EF4444", missao: { s: "História", mt: "Guerra Fria" },
    telas: [
      { e: "🚀", t: "13 dias à beira da guerra nuclear", f: "Em outubro de 1962, o mundo passou treze dias com medo de uma guerra nuclear. O motivo: mísseis soviéticos instalados em Cuba, a menos de duzentos quilômetros dos Estados Unidos." },
      { e: "📸", t: "As fotos", f: "Um avião espião americano fotografou as bases de mísseis em construção na ilha. Para os Estados Unidos, era uma ameaça direta. Para a União Soviética, uma resposta aos mísseis americanos na Turquia." },
      { e: "🚢", t: "O bloqueio", f: "O presidente Kennedy ordenou um bloqueio naval em volta de Cuba. Navios soviéticos se aproximavam. Qualquer erro poderia começar a guerra." },
      { e: "🤝", t: "O acordo", f: "Kennedy e o líder soviético Kruschev negociaram. A União Soviética retirou os mísseis de Cuba. Os Estados Unidos prometeram não invadir a ilha e, em segredo, retiraram seus mísseis da Turquia." },
      { e: "☎️", t: "Depois da crise", f: "Para evitar novos sustos, as duas potências criaram uma linha direta de comunicação entre Washington e Moscou, o famoso telefone vermelho." },
      { e: "💡", t: "Você sabia?", f: "No ano anterior, os Estados Unidos tinham apoiado uma invasão fracassada contra o governo de Fidel Castro, na Baía dos Porcos. Isso aproximou Cuba ainda mais da União Soviética." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: o que a União Soviética conseguiu no acordo que encerrou a crise?" },
    ],
    q: { o: ["A anexação de Cuba", "A promessa de que os EUA não invadiriam Cuba e a retirada dos mísseis da Turquia", "O fim da OTAN", "A unificação da Alemanha"], k: 1, exp: "Em troca de retirar os mísseis de Cuba, a URSS obteve a promessa de não invasão da ilha e, em segredo, a retirada dos mísseis americanos da Turquia." } },

  { id: "vacina", serie: "historia", titulo: "Revolta da Vacina", sub: "1904 · Primeira República", e: "💉", cor: "#14B8A6", missao: { s: "História", mt: "Primeira República" },
    telas: [
      { e: "💉", t: "Uma cidade em revolta", f: "Novembro de 1904, Rio de Janeiro. A capital do Brasil vira um campo de batalha, com bondes virados, barricadas e tiros. O estopim? Uma vacina." },
      { e: "🏚️", t: "A cidade que expulsava os pobres", f: "O governo queria modernizar o Rio. Na reforma do prefeito Pereira Passos, o chamado bota-abaixo, cortiços foram demolidos e milhares de pobres foram empurrados para os morros e subúrbios." },
      { e: "🧪", t: "A vacina obrigatória", f: "Ao mesmo tempo, o médico Oswaldo Cruz combatia doenças como a varíola. Uma lei tornou a vacinação obrigatória, e agentes sanitários podiam entrar nas casas, muitas vezes à força." },
      { e: "🔥", t: "A explosão", f: "Sem explicação adequada e já revoltada com as demolições, a população foi às ruas. Durante cerca de uma semana houve confrontos. O governo reprimiu duramente e suspendeu a obrigatoriedade." },
      { e: "🧠", t: "O que a prova cobra", f: "A revolta não foi só contra a vacina: foi contra o autoritarismo, a falta de diálogo e uma modernização que excluía os pobres." },
      { e: "💡", t: "Você sabia?", f: "Graças à vacinação em massa no mundo todo, a varíola foi declarada erradicada pela Organização Mundial da Saúde em 1980. Foi a primeira doença humana eliminada assim." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: além da vacina obrigatória, o que alimentou a revolta?" },
    ],
    q: { o: ["A abolição da escravidão", "As demolições de cortiços e a exclusão dos pobres na reforma urbana", "A independência do Brasil", "A chegada da família real"], k: 1, exp: "A revolta somou a vacinação imposta à força com a insatisfação contra a reforma urbana que expulsou os pobres do centro do Rio." } },

  { id: "canudos", serie: "historia", titulo: "Guerra de Canudos", sub: "1896–1897 · Sertão da Bahia", e: "🏜️", cor: "#B45309", missao: { s: "História", mt: "Primeira República" },
    telas: [
      { e: "🏜️", t: "Uma cidade no meio do sertão", f: "No sertão da Bahia, no fim do século dezenove, milhares de pessoas pobres seguiram o líder religioso Antônio Conselheiro e formaram uma comunidade chamada Belo Monte, o arraial de Canudos." },
      { e: "🙏", t: "Quem eram eles", f: "Eram sertanejos sem terra, ex-escravizados e famílias que fugiam da seca e da miséria. Em Canudos, dividiam o trabalho e a terra e viviam longe do controle dos coronéis." },
      { e: "⚔️", t: "A República ataca", f: "A recém-criada República acusou Canudos de ser um foco monarquista. Entre 1896 e 1897, o governo enviou quatro expedições militares. As três primeiras foram derrotadas." },
      { e: "🔥", t: "O fim", f: "A quarta expedição, com milhares de soldados e canhões, cercou e destruiu Canudos em outubro de 1897. A maioria dos moradores foi morta." },
      { e: "📚", t: "Os Sertões", f: "O jornalista Euclides da Cunha acompanhou a guerra e escreveu Os Sertões, de 1902. Dele vem a frase famosa: o sertanejo é, antes de tudo, um forte." },
      { e: "💡", t: "Você sabia?", f: "O lugar onde ficava Canudos foi coberto pelas águas de um açude construído décadas depois. Em secas fortes, ruínas da antiga cidade voltam a aparecer." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: como a República justificou o ataque a Canudos?" },
    ],
    q: { o: ["Acusando a comunidade de ser monarquista", "Dizendo que lá havia petróleo", "Alegando uma invasão estrangeira", "Para construir uma ferrovia"], k: 0, exp: "O governo republicano tratou Canudos como ameaça monarquista, embora a comunidade fosse sobretudo um refúgio de sertanejos pobres." } },

  { id: "haiti", serie: "historia", titulo: "Revolução Haitiana", sub: "1791–1804 · Caribe", e: "⛓️", cor: "#2563EB", missao: { s: "História", mt: "Independências" },
    telas: [
      { e: "⛓️", t: "A revolução que assustou as Américas", f: "Em 1791, pessoas escravizadas se rebelaram em São Domingos, a colônia mais rica da França, grande produtora de açúcar e café. Começava a Revolução Haitiana." },
      { e: "🗡️", t: "Toussaint Louverture", f: "O principal líder foi Toussaint Louverture, um ex-escravizado que se tornou general. Ele organizou exércitos e derrotou tropas de várias potências europeias." },
      { e: "🇭🇹", t: "Independência", f: "Em primeiro de janeiro de 1804, o Haiti declarou independência. Foi a primeira república governada por pessoas negras e o primeiro país das Américas a abolir a escravidão." },
      { e: "😨", t: "O medo das elites", f: "No Brasil e em outras colônias, os senhores de escravos temiam que o exemplo se espalhasse. Esse medo, chamado de haitianismo, influenciou a política de vários países." },
      { e: "💸", t: "Uma independência cobrada", f: "Anos depois, a França exigiu do Haiti uma enorme indenização em troca de reconhecer sua independência. A dívida pesou sobre o país por mais de um século." },
      { e: "💡", t: "Você sabia?", f: "O Brasil liderou a missão de paz da ONU no Haiti entre 2004 e 2017." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: o que tornou a Revolução Haitiana única?" },
    ],
    q: { o: ["Foi liderada pela nobreza francesa", "Criou a primeira república negra e aboliu a escravidão", "Uniu o Haiti à Espanha", "Foi a primeira revolução da Europa"], k: 1, exp: "O Haiti foi a primeira república governada por pessoas negras e o primeiro país das Américas a abolir a escravidão." } },

  { id: "diretas", serie: "historia", titulo: "Diretas Já", sub: "1983–1984 · Redemocratização", e: "🗳️", cor: "#FACC15", missao: { s: "História", mt: "Redemocratização" },
    telas: [
      { e: "🗳️", t: "Milhões nas ruas para votar", f: "Imagine não poder votar para presidente. Era assim no Brasil da ditadura. Entre 1983 e 1984, milhões de pessoas foram às ruas com um pedido simples: Diretas Já." },
      { e: "📜", t: "A emenda", f: "O movimento apoiava a emenda Dante de Oliveira, que devolvia ao povo o direito de eleger o presidente pelo voto direto." },
      { e: "🎤", t: "Os comícios", f: "Os comícios reuniram políticos de vários partidos, artistas e jogadores de futebol. No Rio de Janeiro e em São Paulo, as manifestações reuniram mais de um milhão de pessoas." },
      { e: "❌", t: "A derrota", f: "Em abril de 1984, a emenda foi votada no Congresso, mas não alcançou os votos necessários. O presidente seguinte ainda seria escolhido de forma indireta." },
      { e: "➡️", t: "O que veio depois", f: "Em 1985, Tancredo Neves foi eleito pelo Colégio Eleitoral, mas morreu antes de tomar posse, e José Sarney assumiu. A primeira eleição direta para presidente só aconteceu em 1989." },
      { e: "💡", t: "Você sabia?", f: "Mesmo derrotada no Congresso, a campanha das Diretas mostrou a força da sociedade civil e acelerou o fim da ditadura." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: o que as Diretas Já defendiam?" },
    ],
    q: { o: ["O fim do voto obrigatório", "A eleição direta para presidente", "A volta da monarquia", "O voto apenas para quem sabe ler"], k: 1, exp: "O movimento defendia a emenda que restabelecia a eleição direta para presidente da República." } },

  { id: "muro", serie: "historia", titulo: "A Queda do Muro de Berlim", sub: "1989 · Fim da Guerra Fria", e: "🧱", cor: "#475569", missao: { s: "História", mt: "Século XX em revisão" },
    telas: [
      { e: "🧱", t: "Uma cidade cortada ao meio", f: "Na madrugada de 13 de agosto de 1961, Berlim acordou dividida. A Alemanha Oriental, socialista, ergueu um muro em volta de Berlim Ocidental para impedir a fuga de seus moradores." },
      { e: "🌍", t: "O símbolo da Guerra Fria", f: "O Muro de Berlim virou o maior símbolo da divisão do mundo entre o bloco capitalista, liderado pelos Estados Unidos, e o socialista, liderado pela União Soviética." },
      { e: "🏃", t: "Fugas e mortes", f: "Por quase trinta anos, muitas pessoas tentaram atravessar o muro: por túneis, escondidas em carros ou pulando. Mais de cem morreram tentando." },
      { e: "🎉", t: "9 de novembro de 1989", f: "Com protestos crescendo e o bloco socialista em crise, o governo anunciou de forma confusa que as fronteiras estavam abertas. Naquela noite, multidões derrubaram o muro com martelos e festa." },
      { e: "🇩🇪", t: "O que veio depois", f: "Em 1990, a Alemanha foi reunificada. Em 1991, a União Soviética deixou de existir, marcando o fim da Guerra Fria." },
      { e: "💡", t: "Você sabia?", f: "Pedaços do muro foram espalhados pelo mundo como lembrança. Em Berlim, um trecho grafitado de mais de um quilômetro virou galeria a céu aberto." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: o que o Muro de Berlim simbolizava?" },
    ],
    q: { o: ["A divisão do mundo na Guerra Fria", "A separação entre católicos e protestantes", "A fronteira entre França e Alemanha", "O fim da Primeira Guerra"], k: 0, exp: "O muro simbolizava a divisão entre o bloco capitalista e o socialista durante a Guerra Fria." } },

  /* ===================== 🧪 CIÊNCIA CURIOSA ===================== */
  { id: "ceu", serie: "ciencia", titulo: "Por que o céu é azul?", sub: "Física · Ondas e luz", e: "🌤️", cor: "#38BDF8", missao: { s: "Física", mt: "Ondas" },
    telas: [
      { e: "🌤️", t: "Por que azul?", f: "Você já se perguntou por que o céu é azul, e não branco, verde ou roxo? A resposta está numa dança entre a luz do Sol e o ar." },
      { e: "🌈", t: "A luz branca", f: "A luz do Sol parece branca, mas é a mistura de todas as cores, do vermelho ao violeta. Cada cor é uma onda com um comprimento diferente." },
      { e: "💨", t: "O espalhamento", f: "Quando a luz atravessa a atmosfera, as moléculas do ar espalham as cores. As ondas curtas, como o azul, são espalhadas muito mais do que as longas, como o vermelho. Isso se chama espalhamento de Rayleigh." },
      { e: "👀", t: "E o violeta?", f: "O violeta é ainda mais espalhado, mas o Sol emite menos violeta e nossos olhos são mais sensíveis ao azul. Por isso enxergamos o céu azul." },
      { e: "🌅", t: "E o pôr do sol?", f: "No fim da tarde, a luz atravessa muito mais ar até chegar aos nossos olhos. O azul vai se espalhando pelo caminho e sobram os tons laranja e vermelho." },
      { e: "💡", t: "Você sabia?", f: "Em Marte, o céu é cor de caramelo durante o dia e o pôr do sol é azulado, por causa da poeira fina da atmosfera marciana." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: por que o azul se espalha mais no céu?" },
    ],
    q: { o: ["Porque tem comprimento de onda curto", "Porque o ar é azul", "Porque reflete o oceano", "Porque é a cor mais quente"], k: 0, exp: "Ondas de comprimento curto, como o azul, são muito mais espalhadas pelas moléculas do ar (espalhamento de Rayleigh)." } },

  { id: "rna", serie: "ciencia", titulo: "Como funciona a vacina de RNA?", sub: "Biologia · DNA e RNA", e: "🧬", cor: "#EC4899", missao: { s: "Biologia", mt: "DNA, RNA" },
    telas: [
      { e: "🧬", t: "Uma vacina com instruções", f: "Durante a pandemia de covid, surgiram vacinas de um tipo novo: as de RNA mensageiro. Em vez de levar o vírus, elas levam instruções." },
      { e: "📨", t: "O RNA mensageiro", f: "O RNA mensageiro é como uma receita. Ele ensina a célula a fabricar uma proteína. Na vacina, a receita é de uma proteína do vírus, a espícula, que fica na superfície dele." },
      { e: "🏭", t: "A célula fabrica", f: "A vacina entra nas células, que leem a receita e produzem a proteína. Sozinha, ela não causa doença, mas o sistema imune aprende a reconhecê-la." },
      { e: "🛡️", t: "A defesa", f: "O corpo produz anticorpos e células de memória. Se o vírus de verdade aparecer, a defesa já está treinada e reage rapidamente." },
      { e: "🧠", t: "E o DNA?", f: "O RNA da vacina não entra no núcleo da célula e não altera o nosso DNA. Depois de alguns dias, ele é degradado pelo próprio organismo." },
      { e: "💡", t: "Você sabia?", f: "A cientista Katalin Karikó e o médico Drew Weissman receberam o Prêmio Nobel de Medicina em 2023 pelas descobertas que tornaram essas vacinas possíveis." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: o que a vacina de RNA mensageiro entrega às células?" },
    ],
    q: { o: ["O vírus vivo enfraquecido", "Instruções para fabricar uma proteína do vírus", "Anticorpos prontos", "Um pedaço do nosso DNA modificado"], k: 1, exp: "Ela leva o RNA mensageiro com a receita de uma proteína do vírus; as células a produzem e o sistema imune aprende a reconhecê-la." } },

  { id: "gelo", serie: "ciencia", titulo: "Por que o gelo boia?", sub: "Química · Forças intermoleculares", e: "🧊", cor: "#60A5FA", missao: { s: "Química", mt: "Geometria, polaridade" },
    telas: [
      { e: "🧊", t: "Um sólido que boia no próprio líquido", f: "Na maioria das substâncias, o sólido afunda no próprio líquido. Mas o gelo boia na água. Por quê?" },
      { e: "💧", t: "A molécula de água", f: "A molécula de água é polar: o oxigênio puxa os elétrons e fica com carga parcial negativa, enquanto os hidrogênios ficam com carga parcial positiva." },
      { e: "🔗", t: "Pontes de hidrogênio", f: "Por isso, as moléculas de água se atraem fortemente, formando pontes de hidrogênio. No gelo, essas ligações organizam as moléculas numa estrutura cheia de espaços vazios." },
      { e: "⚖️", t: "Menos denso", f: "Com esses espaços, o gelo ocupa mais volume que a mesma massa de água líquida. Ele fica menos denso e, por isso, boia." },
      { e: "🐟", t: "Importância para a vida", f: "Nos lagos congelados, o gelo forma uma camada na superfície que isola a água de baixo. Assim, peixes e outros seres vivos sobrevivem ao inverno." },
      { e: "💡", t: "Você sabia?", f: "É por isso que uma garrafa de vidro cheia de água pode estourar no congelador: ao virar gelo, a água aumenta de volume." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: por que o gelo é menos denso que a água líquida?" },
    ],
    q: { o: ["Porque tem ar dissolvido", "Porque as pontes de hidrogênio formam uma estrutura com espaços vazios", "Porque é mais frio", "Porque perde moléculas ao congelar"], k: 1, exp: "No gelo, as pontes de hidrogênio organizam as moléculas numa rede aberta, com mais volume e menor densidade." } },

  { id: "piscina", serie: "ciencia", titulo: "Por que dá frio ao sair da piscina?", sub: "Física e Química · Calor", e: "🏊", cor: "#06B6D4", missao: { s: "Física", mt: "Termologia" },
    telas: [
      { e: "🏊", t: "Calor ou frio?", f: "Dia quente, você sai da piscina e, mesmo assim, sente frio. Parece estranho, mas a explicação é física pura." },
      { e: "💨", t: "A água evapora", f: "Ao sair da água, seu corpo fica coberto por uma camada fina de água, que começa a evaporar." },
      { e: "🔥", t: "Evaporar gasta energia", f: "Para passar do estado líquido para o gasoso, a água precisa de energia. Ela retira esse calor da sua pele. A evaporação é um processo endotérmico." },
      { e: "🌬️", t: "O vento piora", f: "Com vento, a evaporação fica mais rápida, e o corpo perde calor ainda mais depressa. Por isso, a sensação de frio aumenta." },
      { e: "😓", t: "O suor faz o mesmo", f: "É o mesmo princípio do suor: ao evaporar, ele resfria o corpo. Em dias muito úmidos, o suor evapora pouco e a sensação de calor aumenta." },
      { e: "💡", t: "Você sabia?", f: "Os antigos filtros de barro deixam a água fresca pelo mesmo motivo: um pouco de água atravessa o barro e evapora, retirando calor da água de dentro." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: por que sentimos frio ao sair da piscina?" },
    ],
    q: { o: ["Porque a água da piscina é gelada", "Porque a evaporação retira calor da pele", "Porque o sol esfria a pele molhada", "Porque a água conduz frio"], k: 1, exp: "A evaporação é endotérmica: a água absorve calor da pele para virar vapor, e o corpo esfria." } },

  /* ===================== 🌎 MUNDO EM MAPAS ===================== */
  { id: "rios", serie: "mapas", titulo: "Rios voadores", sub: "Geografia · Amazônia e clima", e: "☁️", cor: "#22C55E", missao: { s: "Geografia", mt: "Domínios morfoclimáticos" },
    telas: [
      { e: "☁️", t: "Rios que correm pelo céu", f: "Existem rios que não correm no chão, e sim no céu. São os rios voadores, enormes correntes de umidade que saem da Amazônia." },
      { e: "🌳", t: "As árvores bombeiam água", f: "As árvores da floresta puxam água do solo e a liberam no ar pelas folhas. Uma única árvore grande pode transpirar centenas de litros de água por dia." },
      { e: "🏔️", t: "O caminho", f: "Os ventos levam essa umidade para o oeste. Ao encontrar a Cordilheira dos Andes, ela é desviada para o sul e chega ao Centro-Oeste, ao Sudeste e ao Sul do Brasil." },
      { e: "🌧️", t: "Chuva longe da floresta", f: "Essa umidade ajuda a formar chuvas que abastecem rios, reservatórios, plantações e cidades a milhares de quilômetros da Amazônia." },
      { e: "🪓", t: "O risco", f: "Com o desmatamento, menos árvores bombeiam água para o ar. Os cientistas alertam que isso pode reduzir as chuvas e agravar secas em outras regiões." },
      { e: "💡", t: "Você sabia?", f: "Segundo estimativas do pesquisador Antonio Nobre, a floresta amazônica lança na atmosfera cerca de vinte bilhões de toneladas de água por dia." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: o que desvia os rios voadores para o Centro-Sul do Brasil?" },
    ],
    q: { o: ["A Cordilheira dos Andes", "O oceano Atlântico", "O rio São Francisco", "A Serra do Mar"], k: 0, exp: "Os ventos levam a umidade amazônica para o oeste; barrada pelos Andes, ela é desviada para o sul." } },

  { id: "vulcoes", serie: "mapas", titulo: "Por que o Brasil não tem vulcões?", sub: "Geografia · Placas tectônicas", e: "🌋", cor: "#F97316", missao: { s: "Geografia", mt: "Estrutura da Terra" },
    telas: [
      { e: "🌋", t: "Nenhum vulcão ativo", f: "O Chile tem dezenas de vulcões ativos. O Brasil, nenhum. Mas os dois estão na América do Sul. O que explica a diferença?" },
      { e: "🧩", t: "As placas", f: "A crosta da Terra é dividida em placas tectônicas que se movem lentamente. Vulcões e terremotos fortes aparecem principalmente nas bordas dessas placas." },
      { e: "📍", t: "O Brasil no meio", f: "O Brasil fica no centro da Placa Sul-Americana, longe das bordas. Já o Chile fica onde a Placa de Nazca mergulha sob a Sul-Americana, formando os Andes e muitos vulcões." },
      { e: "🏝️", t: "Mas já teve", f: "O Brasil já teve atividade vulcânica no passado. Ilhas como Fernando de Noronha têm origem vulcânica, e há milhões de anos enormes derrames de lava cobriram parte do Sul e do Sudeste." },
      { e: "🌱", t: "A herança", f: "Essa lava antiga virou basalto, que deu origem à terra roxa, um dos solos mais férteis do país, base histórica do café no Paraná e em São Paulo." },
      { e: "💡", t: "Você sabia?", f: "O Brasil tem tremores de terra fracos. Em 2007, um tremor em Itacarambi, Minas Gerais, causou a primeira morte registrada por terremoto no país." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: por que o Brasil não tem vulcões ativos?" },
    ],
    q: { o: ["Porque é muito quente", "Porque fica no centro da placa tectônica, longe das bordas", "Porque tem muitos rios", "Porque é um país novo"], k: 1, exp: "Vulcões ativos se concentram nas bordas das placas; o Brasil está no centro da Placa Sul-Americana." } },

  { id: "mercator", serie: "mapas", titulo: "A Groenlândia é gigante?", sub: "Geografia · Cartografia", e: "🗺️", cor: "#3B82F6", missao: { s: "Geografia", mt: "Cartografia:" },
    telas: [
      { e: "🗺️", t: "O mapa engana", f: "No mapa-múndi mais comum, a Groenlândia parece do tamanho da África. Na realidade, a África é cerca de catorze vezes maior." },
      { e: "🌐", t: "O problema", f: "A Terra é quase uma esfera. Toda vez que a transformamos num mapa plano, alguma coisa se distorce: formas, áreas, distâncias ou direções." },
      { e: "🧭", t: "A projeção de Mercator", f: "O mapa mais famoso foi criado por Gerardus Mercator em 1569 para a navegação. Ele mantém os ângulos e as formas, mas exagera muito as áreas perto dos polos." },
      { e: "⚖️", t: "A alternativa", f: "Nos anos 1970, a projeção de Peters ganhou fama por fazer o contrário: mantém a proporção das áreas, mas distorce as formas, valorizando o tamanho real dos países do Sul." },
      { e: "🧠", t: "Mapa também é ponto de vista", f: "Muitos estudiosos apontam que a projeção de Mercator, com a Europa no centro e aumentada, reforçou uma visão eurocêntrica do mundo." },
      { e: "💡", t: "Você sabia?", f: "Nenhuma projeção é perfeita. Por isso, o melhor jeito de ver o tamanho real dos países é num globo." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: o que a projeção de Mercator preserva?" },
    ],
    q: { o: ["As áreas reais", "As formas e os ângulos", "As distâncias entre todos os pontos", "Nada"], k: 1, exp: "Mercator é uma projeção conforme: preserva formas e ângulos, mas distorce as áreas, sobretudo perto dos polos." } },

  { id: "atacama", serie: "mapas", titulo: "O deserto mais seco", sub: "Geografia · Clima", e: "🏜️", cor: "#EAB308", missao: { s: "Geografia", mt: "Clima: elementos" },
    telas: [
      { e: "🏜️", t: "Um deserto à beira-mar", f: "No norte do Chile, colado ao oceano Pacífico, fica o deserto do Atacama, um dos lugares mais secos do planeta. Em alguns pontos, quase nunca chove." },
      { e: "🌊", t: "A corrente fria", f: "A corrente marítima de Humboldt traz águas frias. Elas resfriam o ar junto ao litoral, deixando a atmosfera estável. O ar frio não sobe e não forma nuvens de chuva." },
      { e: "🏔️", t: "A barreira dos Andes", f: "Do outro lado, a Cordilheira dos Andes bloqueia a umidade que viria do leste, da Amazônia. O Atacama fica numa sombra de chuva." },
      { e: "☀️", t: "Alta pressão", f: "A região também fica numa faixa de alta pressão, onde o ar desce e esquenta, o que dificulta ainda mais a formação de nuvens." },
      { e: "🔭", t: "Céu perfeito", f: "Por ter céu limpo quase o ano todo, o Atacama abriga alguns dos maiores observatórios astronômicos do mundo." },
      { e: "💡", t: "Você sabia?", f: "A NASA já testou robôs no Atacama porque o solo seco lembra o de Marte. E, em anos de chuva rara, o deserto fica coberto de flores." },
      { e: "🎯", t: "Valendo XP", f: "Valendo XP: qual fator ajuda a deixar o litoral do Atacama tão seco?" },
    ],
    q: { o: ["Uma corrente marítima fria", "Um vulcão ativo", "A floresta amazônica", "O excesso de rios"], k: 0, exp: "A corrente fria de Humboldt deixa o ar estável junto ao litoral, impedindo a formação de nuvens de chuva." } },
];
window.STORIES_SERIES = {
  resenha: { n: "Resenhas de obras", e: "📚", cor: "#8B5CF6" },
  historia: { n: "1 Minuto de História", e: "🕰️", cor: "#EF4444" },
  ciencia: { n: "Ciência curiosa", e: "🧪", cor: "#06B6D4" },
  mapas: { n: "Mundo em mapas", e: "🌎", cor: "#22C55E" },
};
