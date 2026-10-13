// Busca videoaulas no YouTube para tocar dentro do Easy Study.
// Prioridade: canal Khan Academy Brasil. Se o canal não tiver vídeo do tema, busca no YouTube em geral.
// Com YOUTUBE_API_KEY usa a API oficial (YouTube Data API v3); sem chave, lê a página pública de resultados.
// As respostas ficam em cache na CDN da Vercel por 7 dias, então cada tema só é buscado uma vez.

const KHAN_HANDLE = "KhanAcademyBrasil";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
let khanChannelId = null;

const limpa = (s) => String(s || "").replace(/[<>"{}]/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
const decode = (s) => String(s || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

/* ---------- API oficial ---------- */
async function apiGet(path, params) {
  const u = new URL("https://www.googleapis.com/youtube/v3/" + path);
  for (const [k, v] of Object.entries({ ...params, key: process.env.YOUTUBE_API_KEY })) u.searchParams.set(k, v);
  const r = await fetch(u);
  if (!r.ok) throw new Error("youtube api " + r.status);
  return r.json();
}
async function buscaAPI(q, soKhan) {
  const p = { part: "snippet", type: "video", maxResults: "6", q, relevanceLanguage: "pt", regionCode: "BR", videoEmbeddable: "true", safeSearch: "strict" };
  if (soKhan) {
    if (!khanChannelId) {
      const c = await apiGet("channels", { part: "id", forHandle: KHAN_HANDLE });
      khanChannelId = c.items?.[0]?.id || "";
    }
    if (!khanChannelId) return [];
    p.channelId = khanChannelId;
  }
  const j = await apiGet("search", p);
  return (j.items || []).map((it) => ({ id: it.id?.videoId, titulo: decode(it.snippet?.title), canal: decode(it.snippet?.channelTitle) })).filter((v) => v.id);
}

/* ---------- página pública ---------- */
function extraiVideos(html) {
  const i = html.indexOf("ytInitialData");
  if (i < 0) return [];
  const ini = html.indexOf("{", i);
  const fim = html.indexOf(";</script>", ini);
  let data;
  try { data = JSON.parse(html.slice(ini, fim)); } catch (e) { return []; }
  const out = [], vistos = new Set();
  (function anda(o) {
    if (!o || typeof o !== "object" || out.length >= 8) return;
    if (Array.isArray(o)) { o.forEach(anda); return; }
    const v = o.videoRenderer || o.gridVideoRenderer;
    if (v && v.videoId && !vistos.has(v.videoId)) {
      vistos.add(v.videoId);
      const titulo = v.title?.runs?.map((x) => x.text).join("") || v.title?.simpleText || "";
      const canal = v.ownerText?.runs?.[0]?.text || v.longBylineText?.runs?.[0]?.text || v.shortBylineText?.runs?.[0]?.text || "";
      const dur = v.lengthText?.simpleText || "";
      if (dur) out.push({ id: v.videoId, titulo, canal, dur });
      return;
    }
    for (const k in o) anda(o[k]);
  })(data);
  return out;
}
async function buscaPagina(q, soKhan) {
  const url = soKhan
    ? `https://www.youtube.com/@${KHAN_HANDLE}/search?query=${encodeURIComponent(q)}&hl=pt-BR&gl=BR`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}&sp=EgIQAQ%253D%253D&hl=pt-BR&gl=BR`;
  const r = await fetch(url, { headers: { "user-agent": UA, "accept-language": "pt-BR,pt;q=0.9", cookie: "CONSENT=YES+1; SOCS=CAI" } });
  if (!r.ok) throw new Error("youtube " + r.status);
  const vs = extraiVideos(await r.text());
  return soKhan ? vs.map((v) => ({ ...v, canal: v.canal || "Khan Academy Brasil" })) : vs;
}

async function busca(q, soKhan) {
  if (process.env.YOUTUBE_API_KEY) {
    try { return await buscaAPI(q, soKhan); } catch (e) { console.warn("[videos] api:", e.message); }
  }
  return buscaPagina(q, soKhan);
}

export { extraiVideos };

export default async function handler(req, res) {
  const url = new URL(req.url, "http://x");
  const q = limpa(url.searchParams.get("q"));
  const alt = limpa(url.searchParams.get("alt")); // busca mais curta para o canal do Khan
  const geral = limpa(url.searchParams.get("geral")) || q; // busca no YouTube em geral
  const khan = url.searchParams.get("khan") !== "0";
  if (!q) { res.statusCode = 400; res.setHeader("content-type", "application/json"); return res.end('{"erro":"q vazio"}'); }
  let videos = [], fonte = "";
  try {
    if (khan) {
      for (const termo of [q, alt].filter(Boolean)) {
        videos = await busca(termo, true);
        if (videos.length) { fonte = "khan"; break; }
      }
    }
    if (!videos.length) { videos = await busca(geral, false); fonte = "youtube"; }
  } catch (e) {
    console.warn("[videos]", e.message);
    res.statusCode = 502; res.setHeader("content-type", "application/json"); res.setHeader("cache-control", "no-store");
    return res.end('{"erro":"busca indisponível"}');
  }
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", videos.length ? "public, s-maxage=604800, stale-while-revalidate=86400" : "public, s-maxage=3600");
  res.end(JSON.stringify({ fonte, videos: videos.slice(0, 6) }));
}
