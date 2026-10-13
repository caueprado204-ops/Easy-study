# Easy Study

Plataforma de estudos para vestibulares de Medicina (ENEM, FUVEST, Unicamp, Unesp e Provão Paulista), com a **Easier**, a IA da plataforma.

## O que tem aqui

```
index.html        landing page + plataforma (tudo em um arquivo)
questoes.json     876 questões reais do ENEM 2016–2023 (projeto aberto enem-api)
api/easier.js     função serverless que conversa com a IA (a chave fica no servidor)
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

### Correção automática de redação (sem IA)

O corretor de redação também tem uma **correção automática** que funciona sempre, mesmo sem nenhuma chave: confere tamanho, parágrafos, informalidade, repertório, conectivos, palavras repetidas e os 5 elementos da proposta de intervenção. A ortografia e a gramática são revisadas pelo serviço público gratuito do [LanguageTool](https://languagetool.org). Se a Easier estiver com muita demanda, essa correção aparece no lugar.

### Opção paga: Anthropic

Adicione `ANTHROPIC_API_KEY` (console.anthropic.com) e `AI_PROVIDER=anthropic`. As aulas longas e a correção de redação ficam mais precisas. Cada uso gasta créditos da sua conta: defina um limite de gastos no console antes de divulgar o site.

### Variáveis opcionais

- `GEMINI_MODEL` — padrão `gemini-3.8-flash`.
- `ANTHROPIC_MODEL` — padrão `claude-sonnet-5-5`.
- `AI_PROVIDER` — ordem das IAs (padrão `gemini,groq,anthropic`).
- `GROQ_MODEL` — padrão `openai/gpt-oss-120b`.
- `EASIER_RATE_LIMIT` — pedidos por minuto por IP (padrão: 12).

## Progresso dos alunos

O progresso (ofensiva, módulos, questões, rotina) fica salvo no navegador de cada aluno (`localStorage`). Para login e progresso na nuvem, o próximo passo é ligar um banco como o Supabase.
