# Easy Study

Plataforma de estudos para o curso dos sonhos (Medicina, Psicologia, Engenharia, Direito e outros), com foco em USP/FUVEST, Unicamp, Unesp, ENEM e Provão Paulista, com a **Easier**, a IA da plataforma.

## O que tem aqui

```
index.html        landing page + plataforma (tudo em um arquivo)
questoes.json     876 questões reais do ENEM 2016–2023 (projeto aberto enem-api)
questoes-vest.json 1.257 questões da FUVEST e da Unicamp 2018–2024 (conjunto aberto BLUEX)
questoes-provao.json 366 questões do Provão Paulista 2024–2025 (provas seriadas da Seduc-SP)
img/              figuras das questões da FUVEST, da Unicamp e do Provão Paulista (webp)
api/easier.js     função serverless que conversa com a IA (a chave fica no servidor)
app/gps-lab.js    GPS de Estudos + Laboratório de Erros
conteudo/         textos dos módulos, figuras e conteúdos extras
vercel.json       configuração da Vercel (tempo máximo da função: 60 s)
.env.example      variáveis de ambiente necessárias
```

Não há etapa de build: a Vercel publica o `index.html` como site estático e o `api/easier.js` como função.

## Publicar na Vercel

### Opção 1 — pelo GitHub (recomendado)

1. Crie um repositório no GitHub (ex.: `easy-study`) e envie todos os arquivos desta pasta.
2. Em vercel.com, clique em **Add New → Project** e importe o repositório.
3. Framework Preset: **Other**. Não precisa de Build Command nem Output Directory.
4. Em **Environment Variables**, adicione `GEMINI_API_KEY` com sua chave gratuita do Google AI Studio (veja abaixo). Chaves novas começam com `AQ.` e funcionam normalmente.
5. Clique em **Deploy**. Cada novo commit publica uma nova versão automaticamente.

### Opção 2 — pela linha de comando

```bash
npm i -g vercel
cd easy-study
vercel                 # primeiro deploy (cria o projeto)
vercel env add GEMINI_API_KEY
vercel --prod          # publica em produção
```

## A Easier (IA)

A Easier gera aulas completas por módulo, responde dúvidas, explica questões e corrige redações. No site publicado, o navegador chama `/api/easier`, que fala com o provedor de IA usando a chave guardada na Vercel. Sem nenhuma chave, o site funciona normalmente e só os recursos de IA mostram um aviso.

### Opção gratuita: Google Gemini

1. Entre em **aistudio.google.com** com sua conta Google.
2. Clique em **Get API key → Create API key**.
3. Na Vercel, abra o projeto → **Settings → Environment Variables** e adicione `GEMINI_API_KEY` com essa chave.
4. Faça um novo deploy (**Deployments → ⋯ → Redeploy**) para a chave valer.

Cuidados do plano gratuito:
- O limite de pedidos é do projeto inteiro, não de cada aluno. Veja o seu no Google AI Studio.
- O Google pode usar o conteúdo enviado no plano gratuito para melhorar os produtos dele. Evite enviar dados pessoais.
- Não ative cobrança no projeto do Google se quiser continuar no gratuito.

### Segunda IA gratuita: Groq

Quando o Gemini fica sem cota, a Easier passa sozinha para o Groq.

1. Entre em **console.groq.com**, vá em **API Keys → Create API Key**.
2. Na Vercel, adicione `GROQ_API_KEY` em **Production** e reimplante.

### Grok, da xAI (pago)

Não confunda com o Groq acima. O Grok é a IA da xAI e é cobrado por uso. Para ativar, crie uma chave em **console.x.ai**, adicione `XAI_API_KEY` na Vercel (Production) e reimplante. Por padrão ele entra depois do Gemini e do Groq; para usá-lo primeiro, defina `AI_PROVIDER=grok,gemini,groq`.

### Videoaulas dentro do site

A aba Videoaulas e o card "Videoaula" de cada módulo tocam o vídeo do YouTube aqui mesmo (player incorporado). A função `api/videos.js` procura primeiro no canal **Khan Academy Brasil** (Biologia, Química, Física e Matemática) e, se não achar, busca no YouTube em geral. Cada tema fica 7 dias em cache na Vercel.

Funciona sem configuração, mas para ficar mais estável crie uma chave gratuita da **YouTube Data API v3** no Google Cloud Console e adicione `YOUTUBE_API_KEY` na Vercel (Production). A cota gratuita (10 mil unidades por dia, cerca de 100 buscas) sobra, por causa do cache.

### Correção automática de redação (sem IA)

O corretor de redação também tem uma **correção automática** que funciona sempre, mesmo sem nenhuma chave: confere tamanho, parágrafos, informalidade, repertório, conectivos, palavras repetidas e os 5 elementos da proposta de intervenção. A ortografia e a gramática são revisadas pelo serviço público gratuito do [LanguageTool](https://languagetool.org). Se a Easier estiver com muita demanda, essa correção aparece no lugar.

### Opção paga: Anthropic

Adicione `ANTHROPIC_API_KEY` (console.anthropic.com) e `AI_PROVIDER=anthropic`. As aulas longas e a correção de redação ficam mais precisas. Cada uso gasta créditos da sua conta: defina um limite de gastos no console antes de divulgar o site.

### Variáveis opcionais

- `GEMINI_MODEL` — padrão `gemini-3.8-flash`.
- `ANTHROPIC_MODEL` — padrão `claude-sonnet-5-5`.
- `AI_PROVIDER` — ordem das IAs (padrão `gemini,groq,grok,anthropic`).
- `XAI_MODEL` — padrão `grok-4.7`.
- `GROQ_MODEL` — padrão `openai/gpt-oss-120b`.
- `EASIER_RATE_LIMIT` — pedidos por minuto por IP (padrão: 12).

## Contas, planos e limites (Supabase)

O login, os perfis (curso foco, faculdade, vestibulares e metas), o progresso na nuvem e o consumo da Easier ficam no Supabase (projeto `gqncndoiuitharlgrznr`).

Tabelas: `perfis`, `assinaturas` (plano de cada aluno), `progresso` e `uso_ia` (consumo do mês). Todas com RLS: o aluno só lê os próprios dados e não consegue mudar o próprio plano nem o consumo.

Não há plano grátis: a conta nova começa sem plano e só a aba Planos e Minha conta ficam liberadas até o plano ser ativado. Limites por mês (iguais no site e em `api/easier.js`):

| Plano | Preço | Usos da Easier | Correções de redação com IA |
|---|---|---|---|
| Easy Plus | R$ 24,90 | 200 | 10 |
| Easy Pro | R$ 44,90 | 350 | 20 |

Variáveis na Vercel (Production): `SUPABASE_URL` e `SUPABASE_SECRET_KEY` (Supabase → Project Settings → API Keys → Secret key). Sem elas, a Easier funciona sem exigir login.

**Liberar um plano pago** (depois do Pix): no Supabase, abra SQL Editor e rode

```sql
update public.assinaturas set plano = 'plus', valido_ate = current_date + 31, atualizado_em = now()
where user_id = (select id from auth.users where email = 'email-do-aluno@exemplo.com');
```

Use `plus` para o Easy Plus e `pro` para o Easy Pro. Quando `valido_ate` passa, a plataforma volta a ficar bloqueada até a renovação (o progresso continua salvo).

Contato para assinar: preencha `CONTATO` no `index.html` com seu WhatsApp (só números, com 55 e DDD) e/ou e-mail.

## Progresso dos alunos

O progresso (ofensiva, módulos, questões, rotina) fica salvo no navegador e sincronizado na nuvem pela conta do aluno.

## GPS de Estudos e Laboratório de Erros

Ficam em `app/gps-lab.js`. Os dados vão junto com o progresso do aluno (mesma sincronização com a nuvem):

- `S.qlog`: cada resposta com data e origem (questões, simulado, diagnóstico);
- `S.erros`: análise de cada erro (categoria, observação, dificuldade, revisado);
- `S.touch`: último contato com cada módulo;
- `S.gps`: objetivo, diagnóstico, plano do dia e histórico do nível.

Cada questão do ENEM é ligada ao módulo pelo campo `kw` (palavras-chave) dos módulos. Os pré-requisitos ficam na lista `PRE_DEF`, escritos pelo título dos módulos.

A prioridade de cada conteúdo é calculada por `GPS.motor(ctx, idDoModulo)`, uma função de pontuação. Para trocar essa lógica por IA no futuro, substitua `GPS.motor`, ou monte o plano no servidor a partir de `GPS.retrato()`.

## Banco de questões de vestibulares

- ENEM: `questoes.json` (projeto aberto enem-api).
- FUVEST e Unicamp: `questoes-vest.json`, convertido do conjunto aberto BLUEX (github.com/Portuguese-Benchmark-Datasets/BLUEX). As figuras ficam em `img/`. O campo `v` indica a prova e o campo `im` lista as figuras, referenciadas no texto como `[IMAGE n]`.
- Provão Paulista: `questoes-provao.json`, extraído das provas e gabaritos oficiais (1ª, 2ª e 3ª série, 2024 e 2025). Fórmulas, gráficos e figuras viram recortes de imagem; o campo `sr` indica a série.
- Para incluir a Unesp, gere um arquivo no mesmo formato (`id, v, y, n, a, s, c, q, o, k, im`), carregue-o junto em `index.html` e acrescente o nome da prova à lista `PROVAS`.

## Dissertativas (2ª fase)

Na aba Questões, o botão "Dissertativas · 2ª fase" abre questões discursivas autorais no estilo FUVEST e Unicamp (`conteudo/dissertativas.js`, lógica em `app/disc.js`).
- Cada questão tem itens com resposta esperada e critérios de correção. O campo `mt` liga a questão ao módulo pelo início do título.
- "Corrigir com a Easier" manda a resposta, a resposta esperada e os critérios; a Easier devolve nota por item, acertos, o que faltou e uma dica (conta 1 uso).
- Sem a Easier, o aluno vê a resposta esperada, marca os critérios cumpridos e a nota é calculada.
- As tentativas ficam em `S.disc` (sincroniza com o progresso) e alimentam o GPS de Estudos.

## Pagamento automático (Mercado Pago)

O aluno assina na aba Planos digitando o cartão no próprio site (formulário seguro do Mercado Pago, sem precisar de conta no Mercado Pago). A cobrança se repete todo mês sem ninguém precisar liberar nada. Como alternativa, ele pode pagar pelo site do Mercado Pago.

- `api/assinatura.js`: cria a assinatura (link do checkout), troca de plano e cancela.
- `api/mp-webhook.js`: recebe os avisos do Mercado Pago, relê a assinatura pela API e atualiza `assinaturas` no Supabase.
- Com o cartão no site, o plano é liberado na hora, mas só até a primeira cobrança + 3 dias; quando ela é aprovada, o acesso passa a ir até a próxima cobrança + 3 dias.
- O plano vale até a próxima cobrança + 3 dias. Ao cancelar, o acesso continua até o fim do período pago.
- Tudo o que o Mercado Pago avisa fica registrado na tabela `eventos_pagamento` (só o servidor acessa).

Para ligar:
1. Na Vercel, crie `MP_ACCESS_TOKEN` com o Access Token **de produção** e `MP_PUBLIC_KEY` com a Public Key **de produção** do Mercado Pago (Suas integrações → sua aplicação → Credenciais de produção).
2. No Mercado Pago, em Webhooks, cadastre a URL `https://SEU-SITE/api/mp-webhook`, marque o evento **Planos e assinaturas** e copie a "Assinatura secreta" para `MP_WEBHOOK_SECRET` na Vercel.
3. Faça um redeploy.

A liberação manual por Pix (SQL acima) continua funcionando para quem preferir.
