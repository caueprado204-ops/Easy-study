// Base de critérios de correção da redação do ENEM usada pela Easier.
// Resumo, com redação própria, das grades e orientações de correção das 5 competências.

export const CRITERIOS_REDACAO = `
BASE DE CRITÉRIOS — REDAÇÃO DO ENEM (use para corrigir, explicar e ensinar)

REGRA GERAL DE TODAS AS COMPETÊNCIAS
- Para ficar num nível, o texto precisa cumprir o descritor inteiro. Se tiver características de dois níveis, vale o MAIS BAIXO.
- Nota zero geral (não se corrige nenhuma competência): fuga total ao tema, não ser dissertativo-argumentativo, até 7 linhas, parte desconectada do tema, cópia integral dos textos motivadores, folha em branco.
- Tangência ao tema (só o assunto geral) não zera, mas limita: C2 em 40, C3 em 0 ou 40, C5 em 0 ou 40.

COMPETÊNCIA 1 — domínio da escrita formal
Grade: 0 estrutura sintática inexistente | 40 estrutura deficitária COM muitos desvios | 80 estrutura deficitária OU muitos desvios | 120 estrutura regular E alguns desvios | 160 estrutura boa E poucos desvios | 200 estrutura excelente (no máximo 1 falha) E no máximo 2 desvios.
- Não existe número fixo para "muitos/alguns/poucos": compare com o tamanho do texto (conjunto textual). Só o nível 200 tem limite numérico.
- Estrutura deficitária: a leitura trava na maior parte do texto por truncamentos e justaposições. Regular: predominam parágrafos de um único período longo. Boa: períodos bem formados, porém simples. Excelente: períodos com alguma complexidade (intercaladas, subordinadas, inversões) e no máximo uma falha; texto só com períodos simples é "boa", não "excelente".
- Falhas de estrutura (contam separado dos desvios): truncamento (oração subordinada, adjunto ou parte da oração isolados por ponto, como frase começando por "Pois", "Deixando...", "Visto que..."), justaposição (orações que deviam ser períodos diferentes coladas com vírgula ou sem pontuação), excesso, falta ou duplicação de palavras ("pelas as redes").
- Desvios de convenção: acentuação, ortografia, hífen, maiúsculas/minúsculas, separação silábica. Repetir o mesmo erro na mesma palavra (ou mesmo radical) conta uma vez só.
- Desvios gramaticais: regência ("assistir [a] filmes", "acarretar a complicações"); concordância (sujeito posposto ou longo; locução verbal flexionada duas vezes); "é necessário/é preciso" concorda quando o termo seguinte tem determinante: "é necessária uma campanha" (certo), "é necessário uma campanha" (desvio), "é necessário campanhas" (certo), "é necessário que haja..." e "é necessário fazer..." ficam no masculino.
- Pontuação: é desvio vírgula entre sujeito e verbo, entre verbo e objeto, entre conjunção/locução subordinativa e sua oração; também é desvio NÃO isolar aposto, oração intercalada, adjunto adverbial deslocado com 3 ou mais palavras e itens de enumeração. Não é desvio: falta de vírgula antes de "e" com troca de sujeito, aspas de ênfase/ironia. Aspas ou parênteses abertos e não fechados são desvio. Pergunta sem ponto de interrogação é desvio.
- Paralelismo: itens de uma mesma enumeração com classes diferentes ("conversar, pagamento de contas e inscrição") ou preposição/artigo faltando no segundo termo.
- Pronomes: oblíquo átono no início da frase ("Nos perguntamos") é desvio; palavras negativas e relativos atraem o pronome ("não se deixando"); pronome reto como objeto ("ajuda nós"). Não cobrar a diferença entre este/esse.
- Crase: antes de verbo é desvio; faltar crase obrigatória ("junto as mídias") é desvio.
- Registro: "pra", "pro", "tá", "né", "um monte", "vc", "blz", abreviações (p/, c/), diminutivos e aumentativos informais.
- Escolha vocabular: palavra trocada por outra parecida ("logaritmo" por "algoritmo", "conjuntura" por "conjectura") e palavras inventadas ("registramento").

COMPETÊNCIA 2 — tema, tipo textual e repertório
Grade: 40 tangência OU aglomerado de palavras OU traços constantes de outros tipos textuais | 80 tema completo E (duas partes embrionárias OU conclusão terminada em frase incompleta); muitos trechos copiados dos textos motivadores também limitam a 80 | 120 tema completo, 3 partes (1 pode ser embrionária) e repertório baseado só nos textos motivadores, não legitimado ou legitimado mas não pertinente | 160 3 partes desenvolvidas e repertório legitimado e pertinente, mas improdutivo | 200 3 partes desenvolvidas e repertório legitimado, pertinente e com uso produtivo.
- Tema completo = todos os núcleos da frase temática. Tratar só do assunto geral ou de só um dos núcleos é tangência.
- Partes embrionárias: introdução, desenvolvimento ou conclusão muito curtos por pouca produção.
- Repertório legitimado: conceitos e definições, fatos históricos, autores, filósofos, obras, filmes, músicas, áreas do conhecimento e seus profissionais, estudos e pesquisas, personalidades conhecidas, meios de comunicação conhecidos. Informação que já está nos textos motivadores não conta como legitimada de fora.
- Não legitimado: experiência pessoal ou informação sem respaldo em área do conhecimento.
- Pertinente: ligado a pelo menos um elemento do tema (por sinônimo, hiperônimo ou hipônimo).
- Produtivo: vinculado à discussão do texto, explicando como sustenta o argumento, ainda que de forma pontual. Citar e não relacionar = improdutivo.
- Tipos úteis de repertório: provas concretas (dados e fatos), exemplos, autoridade (especialistas), lógica (causa e consequência).

COMPETÊNCIA 3 — projeto de texto e desenvolvimento
Grade: 0 tangente e sem direção | 40 tangente com direção OU tema completo sem direção | 80 projeto com muitas falhas E sem desenvolvimento ou desenvolvendo só uma informação; contradição grave limita a 80 | 120 projeto com algumas falhas E desenvolvimento de algumas informações | 160 projeto com poucas falhas E desenvolvimento da maior parte | 200 projeto estratégico E desenvolvimento em todo o texto (admite deslizes pontuais).
- Direção: dá para identificar o ponto de vista defendido; sem direção = ideias soltas e desconexas.
- Projeto de texto: o planejamento percebido na organização (tese que antecipa o caminho, parágrafos que cumprem o que foi anunciado, conclusão coerente).
- Desenvolvimento: explicar a relação entre cada informação e a tese, usando definições, comparações, dados, exemplos, analogias, argumentos de autoridade. Bem desenvolvido é quando o leitor não precisa fazer sozinho as relações.
- Autoria = projeto estratégico executado de forma organizada e consistente; não depende de trazer repertório de fora (isso é C2). O texto deve se sustentar sozinho.
- 160 x 200: no 160 há falhas de projeto (algo anunciado e não cumprido, argumento que sai do recorte, ideia que fica solta); no 200 só deslizes pontuais.

COMPETÊNCIA 4 — coesão
Grade: 0 justaposição sem articulação | 40 presença rara de coesivos OU repetições/inadequações excessivas | 80 presença pontual OU muitas repetições/inadequações; monobloco limita a 80 | 120 presença regular OU algumas repetições/inadequações | 160 presença constante intra e interparágrafos E poucas repetições/inadequações, com pelo menos 1 operador argumentativo ENTRE parágrafos | 200 presença expressiva E repetições raras/ausentes E nenhuma inadequação, com pelo menos 2 operadores argumentativos entre parágrafos e ao menos 1 coesivo dentro de TODOS os parágrafos.
- Coesão referencial: pronomes, advérbios de lugar, elipse, numerais, sinônimos, hiperônimos/hipônimos, nomes genéricos ("esse fenômeno"), nominalizações ("manifestaram... a manifestação").
- Coesão sequencial: operadores argumentativos — adição (além disso, também, não só... mas também), contraposição (mas, porém, contudo, no entanto, embora, ainda que), conclusão (portanto, logo, por isso, por conseguinte), explicação/justificativa (porque, visto que, já que), finalidade (a fim de, para que), comparação, alternativa (ou... ou, seja... seja).
- Interparágrafos: o conectivo no início do parágrafo precisa ligar o conteúdo ao parágrafo ANTERIOR. Um "De acordo com X" que só abre uma citação é intraparágrafo.
- Repetição: palavras do tema são toleradas quando há alguma substituição; pese a repetição do mesmo operador ("porém... porém... porém") e de termos sem retomada.
- Inadequação: conectivo com relação de sentido errada ("mas" onde há consequência, "portanto" onde há oposição) e "onde" sem ideia de lugar. "Mais" escrito no lugar de "mas" é desvio de C1, não inadequação.

COMPETÊNCIA 5 — proposta de intervenção
Grade: 0 sem proposta, proposta copiada, desrespeito aos direitos humanos ou sem relação nem com o assunto | 40 tangência OU só elementos nulos OU 1 elemento válido | 80 2 válidos | 120 3 | 160 4 | 200 5. Condicional ("se X fizer..., então...") com 2 ou mais elementos fica no máximo em 80.
- Elementos: AÇÃO (o que fazer), AGENTE (quem executa), MODO/MEIO (como, por meio do quê), EFEITO (para quê: finalidade, consequência), DETALHAMENTO (informação a mais sobre ação, agente, meio ou efeito: exemplo, explicação, justificativa, contextualização). Cada tipo conta uma vez só. Avalie a proposta mais completa do texto.
- A proposta pode estar em qualquer parte do texto, não só na conclusão. Marcas: "deve", "é necessário", "é preciso", "é importante", "cabe a".
- Não é proposta: constatação ("o Legislativo propõe..."), citação de lei ou autor com "deve" ("conforme o Marco Civil, a liberdade deve ser preservada"), constatação de falta ("falta liberdade").
- Ação nula: muito vaga ("medidas são necessárias", "esses obstáculos devem ser superados"). Agente nulo: "alguém", "ninguém", "alguns", "você", imperativo sem vocativo. Agentes válidos: "nós", "todos", "as pessoas" (valem como sociedade). Só conte agente escrito no texto, não o presumido. Modo/meio, efeito e detalhamento nunca são nulos; o detalhamento pode se ligar a ação ou agente nulos e ainda contar.
- Direitos humanos: tortura, violência, linchamento, justiça com as próprias mãos, supressão de direitos de grupos levam a C5 a 0, mesmo com outra proposta boa. Pena de morte ou prisão perpétua atribuídas ao Estado NÃO são desrespeito.

COMO ESCREVER O FEEDBACK
- Para cada competência: diga o nível, cite trechos curtos do texto que justificam e diga exatamente o que falta para o nível seguinte.
- Seja específico (aponte a frase), justo e encorajador, sem inflar a nota.
`;
