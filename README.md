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
4. Em **Environment Variables**, adicione `ANTHROPIC_API_KEY` com sua chave (crie em console.anthropic.com).
5. Clique em **Deploy**. Cada novo commit publica uma nova versão automaticamente.

### Opção 2 — pela linha de comando

```bash
npm i -g vercel
cd easy-study
vercel                 # primeiro deploy (cria o projeto)
vercel env add ANTHROPIC_API_KEY
vercel --prod          # publica em produção
```

## A Easier (IA)

A Easier gera aulas completas por módulo, responde dúvidas, explica questões e corrige redações. No site publicado, o navegador chama `/api/easier`, que usa a API da Anthropic com a chave guardada na Vercel. Sem a variável `ANTHROPIC_API_KEY`, o site funciona normalmente e só os recursos de IA mostram um aviso.

Variáveis opcionais:

- `ANTHROPIC_MODEL` — modelo usado (padrão: `claude-sonnet-5-5`).
- `EASIER_RATE_LIMIT` — pedidos por minuto por IP (padrão: 12).

**Custos:** cada uso da Easier gasta créditos da sua conta da Anthropic. A função tem um limite simples por IP, mas o site é público. Defina um limite de gastos no console da Anthropic antes de divulgar.

## Progresso dos alunos

O progresso (ofensiva, módulos, questões, rotina) fica salvo no navegador de cada aluno (`localStorage`). Para login e progresso na nuvem, o próximo passo é ligar um banco como o Supabase.
