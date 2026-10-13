// Easier — a IA do Easy Study.
// Função serverless da Vercel: recebe um prompt do site e devolve a resposta em
// texto, em streaming. As chaves ficam só no servidor (variáveis de ambiente).
//
// Provedores:
//   - Google Gemini (plano gratuito): defina GEMINI_API_KEY
//   - Anthropic (pago):               defina ANTHROPIC_API_KEY
// Se as duas existirem, AI_PROVIDER escolhe ("gemini" ou "anthropic"); o padrão é Gemini.

const SYSTEM =
  "Você é a Easier, a tutora de IA da plataforma de estudos Easy Study, focada em vestibulares de Medicina no Brasil (ENEM, FUVEST, Unicamp, Unesp, Provão Paulista). Responda sempre em português do Brasil, com correção científica. Se perguntarem seu nome, diga que é a Easier.";
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

function pickProvider() {
  const want = (process.env.AI_PROVIDER || "").toLowerCase();
  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;
  if (want === "anthropic" && hasAnthropic) return "anthropic";
  if (want === "gemini" && hasGemini) return "gemini";
  if (hasGemini) return "gemini";
  if (hasAnthropic) return "anthropic";
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ code: "method_not_allowed" });
    return;
  }
  const provider = pickProvider();
  if (!provider) {
    res.status(500).json({ code: "no_key" });
    return;
  }
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "local";
  if (limited(ip)) {
    res.status(429).json({ code: "rate_limited" });
    return;
  }
  const body = typeof req.body === "string" ? safeJSON(req.body) : req.body || {};
  const prompt = typeof body?.prompt === "string" ? body.prompt : "";
  if (!prompt.trim() || prompt.length > MAX_PROMPT_CHARS) {
    res.status(400).json({ code: "bad_prompt" });
    return;
  }

  let upstream;
  try {
    upstream = provider === "gemini" ? await callGemini(prompt) : await callAnthropic(prompt);
  } catch (e) {
    res.status(502).json({ code: "upstream_unreachable" });
    return;
  }
  if (!upstream.ok || !upstream.body) {
    const status = upstream.status === 429 ? 429 : 502;
    let detail = "";
    try { detail = (await upstream.text()).slice(0, 300); } catch {}
    console.error(`[easier] ${provider} respondeu ${upstream.status}: ${detail}`);
    res.status(status).json({ code: status === 429 ? "rate_limited" : "upstream_error" });
    return;
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Accel-Buffering", "no");

  const extract = provider === "gemini" ? geminiText : anthropicText;
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
      let idx;
      while ((idx = buffer.indexOf("\n\n")) !== -1) {
        const event = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);
        for (const line of event.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const text = extract(safeJSON(line.slice(5).trim()));
          if (text) res.write(text);
        }
      }
    }
  } catch (e) {
    // a conexão caiu no meio: entrega o que já foi escrito
  }
  res.end();
}

/* ---------- Google Gemini ---------- */
function callGemini(prompt) {
  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: MAX_TOKENS * 2 },
      }),
    }
  );
}
function geminiText(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts.filter((p) => !p.thought && typeof p.text === "string").map((p) => p.text).join("");
}

/* ---------- Anthropic ---------- */
function callAnthropic(prompt) {
  return fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
      max_tokens: MAX_TOKENS,
      stream: true,
      system: SYSTEM,
      messages: [{ role: "user", content: prompt }],
    }),
  });
}
function anthropicText(data) {
  return data?.type === "content_block_delta" && data.delta?.type === "text_delta" ? data.delta.text : "";
}

function safeJSON(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
