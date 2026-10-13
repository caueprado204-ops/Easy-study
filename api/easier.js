// Easier — a IA do Easy Study.
// Função serverless da Vercel: recebe um prompt do site e devolve a resposta em
// texto, em streaming. As chaves ficam só no servidor (variáveis de ambiente).
//
// Provedores (configure quantos quiser; a Easier usa o primeiro disponível e,
// se ele estiver sem cota ou fora do ar, passa automaticamente para o próximo):
//   - Google Gemini (gratuito): GEMINI_API_KEY
//   - Groq (gratuito):          GROQ_API_KEY
//   - Anthropic (pago):         ANTHROPIC_API_KEY
// AI_PROVIDER define a ordem, por exemplo "gemini,groq,anthropic" (esse é o padrão).

import { CRITERIOS_REDACAO } from "../lib/criterios.js";

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

const KEYS = { gemini: "GEMINI_API_KEY", groq: "GROQ_API_KEY", anthropic: "ANTHROPIC_API_KEY" };
function providerOrder() {
  const wanted = (process.env.AI_PROVIDER || "gemini,groq,anthropic")
    .toLowerCase()
    .split(",")
    .map((s) => s.trim());
  const order = [...new Set([...wanted, "gemini", "groq", "anthropic"])];
  return order.filter((p) => KEYS[p] && process.env[KEYS[p]]);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ code: "method_not_allowed" });
    return;
  }
  const providers = providerOrder();
  if (!providers.length) {
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
  // Base de conhecimento: em temas de redação, a Easier recebe os critérios oficiais de correção
  const system = body?.kb === "redacao" ? `${SYSTEM}\n\n${CRITERIOS_REDACAO}` : SYSTEM;
  if (!prompt.trim() || prompt.length > MAX_PROMPT_CHARS) {
    res.status(400).json({ code: "bad_prompt" });
    return;
  }

  let ok = null;
  let last = { status: 502, detail: "" };
  const tried = [];
  for (const provider of providers) {
    try {
      const r = await PROVIDERS[provider](prompt, tried, system);
      if (r.ok) {
        ok = r;
        break;
      }
      last = r;
    } catch (e) {
      tried.push(`${provider}:erro de rede`);
      last = { status: 502, detail: String(e).slice(0, 200) };
    }
  }

  if (!ok) {
    const status = last.status === 429 ? 429 : 502;
    const detail = shortError(last.detail);
    console.error(`[easier] todos os provedores falharam (${tried.join(", ")}): ${detail}`);
    res.status(status).json({
      code: status === 429 ? "rate_limited" : "upstream_error",
      status: last.status,
      detail,
    });
    return;
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Accel-Buffering", "no");
  res.setHeader("X-Easier-Provider", ok.provider);

  const reader = ok.response.body.getReader();
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
          const raw = line.slice(5).trim();
          if (raw === "[DONE]") continue;
          const text = ok.extract(safeJSON(raw));
          if (text) res.write(text);
        }
      }
    }
  } catch (e) {
    // a conexão caiu no meio: entrega o que já foi escrito
  }
  res.end();
}

// Cada provedor devolve { ok: true, provider, response, extract } ou { ok: false, status, detail }.
const PROVIDERS = {
  /* ---------- Google Gemini ---------- */
  async gemini(prompt, tried, system) {
    const models = [...new Set([process.env.GEMINI_MODEL, "gemini-3.8-flash", "gemini-flash-latest", "gemini-3.6-flash", "gemini-3.5-flash-lite"].filter(Boolean))];
    let last = { ok: false, status: 502, detail: "" };
    // Chaves novas do AI Studio ("AQ.") funcionam na API Interactions;
    // chaves antigas ("AIza") funcionam na generateContent. Tenta as duas.
    for (const model of models) {
      for (const api of ["interactions", "generate"]) {
        const r = await callGemini(prompt, model, api, system);
        tried.push(`gemini ${model}/${api}:${r.status}`);
        if (r.ok && r.body) return { ok: true, provider: "gemini", response: r, extract: geminiText };
        last = { ok: false, status: r.status, detail: await r.text().catch(() => "") };
        // sem cota: não adianta tentar outros modelos do mesmo projeto
        if (r.status === 429) return last;
      }
    }
    return last;
  },

  /* ---------- Groq (API compatível com OpenAI) ---------- */
  async groq(prompt, tried, system) {
    const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model,
        stream: true,
        max_tokens: MAX_TOKENS,
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
      }),
    });
    tried.push(`groq ${model}:${r.status}`);
    if (r.ok && r.body) return { ok: true, provider: "groq", response: r, extract: openaiText };
    return { ok: false, status: r.status, detail: await r.text().catch(() => "") };
  },

  /* ---------- Anthropic ---------- */
  async anthropic(prompt, tried, system) {
    const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model, max_tokens: MAX_TOKENS, stream: true, system, messages: [{ role: "user", content: prompt }] }),
    });
    tried.push(`anthropic ${model}:${r.status}`);
    if (r.ok && r.body) return { ok: true, provider: "anthropic", response: r, extract: anthropicText };
    return { ok: false, status: r.status, detail: await r.text().catch(() => "") };
  },
};

function callGemini(prompt, model, api, system) {
  const headers = { "content-type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY };
  if (api === "interactions") {
    return fetch("https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse", {
      method: "POST",
      headers,
      body: JSON.stringify({ model, input: `${system}\n\n${prompt}`, stream: true }),
    });
  }
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: MAX_TOKENS * 2 },
      }),
    }
  );
}

function geminiText(data) {
  if (!data) return "";
  // API Interactions: eventos "step.delta" com delta de texto
  if (data.event_type === "step.delta" || data.delta) {
    return data.delta?.type === "text" && typeof data.delta.text === "string" ? data.delta.text : "";
  }
  // API generateContent
  const parts = data.candidates?.[0]?.content?.parts || [];
  return parts.filter((p) => !p.thought && typeof p.text === "string").map((p) => p.text).join("");
}
function openaiText(data) {
  const c = data?.choices?.[0]?.delta?.content;
  return typeof c === "string" ? c : "";
}
function anthropicText(data) {
  return data?.type === "content_block_delta" && data.delta?.type === "text_delta" ? data.delta.text : "";
}

// Extrai só a mensagem de erro do provedor (nunca inclui a chave).
function shortError(text) {
  const j = safeJSON(text);
  const msg = j?.error?.message || j?.error?.type || text || "";
  return String(msg)
    .replace(/(AIza|AQ\.|gsk_|sk-ant-)[0-9A-Za-z_.-]{10,}/g, "[chave]")
    .slice(0, 240);
}

function safeJSON(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
