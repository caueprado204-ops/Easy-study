// Easier — a IA do Easy Study.
// Função serverless da Vercel que recebe um prompt do site e devolve a resposta
// em texto, em streaming. A chave da API fica só no servidor (variável de ambiente).

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
const MAX_PROMPT_CHARS = 30000;
const MAX_TOKENS = 4000;

// Limite simples por IP (melhor esforço: vale por instância da função).
const hits = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = Number(process.env.EASIER_RATE_LIMIT || 12);

function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_PER_WINDOW;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ code: "method_not_allowed" });
    return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(500).json({ code: "no_key" });
    return;
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "local";
  if (limited(ip)) {
    res.status(429).json({ code: "rate_limited" });
    return;
  }

  const body = typeof req.body === "string" ? safeJSON(req.body) : req.body || {};
  const prompt = typeof body.prompt === "string" ? body.prompt : "";
  if (!prompt.trim() || prompt.length > MAX_PROMPT_CHARS) {
    res.status(400).json({ code: "bad_prompt" });
    return;
  }

  let upstream;
  try {
    upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        stream: true,
        system:
          "Você é a Easier, a tutora de IA da plataforma de estudos Easy Study, focada em vestibulares de Medicina no Brasil (ENEM, FUVEST, Unicamp, Unesp, Provão Paulista). Responda sempre em português do Brasil, com correção científica. Se perguntarem seu nome, diga que é a Easier.",
        messages: [{ role: "user", content: prompt }],
      }),
    });
  } catch (e) {
    res.status(502).json({ code: "upstream_unreachable" });
    return;
  }

  if (!upstream.ok || !upstream.body) {
    const status = upstream.status === 429 ? 429 : 502;
    res.status(status).json({ code: status === 429 ? "rate_limited" : "upstream_error" });
    return;
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Accel-Buffering", "no");

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let idx;
      while ((idx = buffer.indexOf("\n\n")) !== -1) {
        const event = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);
        for (const line of event.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const data = safeJSON(line.slice(5).trim());
          if (data?.type === "content_block_delta" && data.delta?.type === "text_delta") {
            res.write(data.delta.text);
          }
        }
      }
    }
  } catch (e) {
    // a conexão caiu no meio: entrega o que já foi escrito
  }
  res.end();
}

function safeJSON(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
