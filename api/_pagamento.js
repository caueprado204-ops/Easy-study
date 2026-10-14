// Funções compartilhadas do pagamento automático (Mercado Pago Assinaturas + Supabase).
// Arquivos em /api que começam com "_" não viram rotas na Vercel.
import crypto from "node:crypto";

export const PLANOS = {
  plus: { nome: "Easy Plus", preco: 24.9 },
  pro: { nome: "Easy Pro", preco: 44.9 },
};
export const CARENCIA_DIAS = 3; // dias de acesso extra se a cobrança do mês atrasar

const SB_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SB_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const MP_TOKEN = process.env.MP_ACCESS_TOKEN || "";
export const configurado = () => !!(SB_URL && SB_KEY && MP_TOKEN);

function sbHeaders(extra = {}) {
  const h = { apikey: SB_KEY, "content-type": "application/json", ...extra };
  if (SB_KEY.startsWith("eyJ")) h.authorization = `Bearer ${SB_KEY}`;
  return h;
}

export async function usuarioDoToken(token) {
  if (!token) return null;
  const r = await fetch(`${SB_URL}/auth/v1/user`, { headers: { apikey: SB_KEY, authorization: `Bearer ${token}` } });
  if (!r.ok) return null;
  const u = await r.json().catch(() => null);
  return u?.id ? u : null;
}

export async function lerAssinatura(userId) {
  const r = await fetch(`${SB_URL}/rest/v1/assinaturas?user_id=eq.${userId}&select=*`, { headers: sbHeaders() });
  const [a] = r.ok ? await r.json() : [];
  return a || null;
}

export async function salvarAssinatura(userId, campos) {
  const body = { user_id: userId, ...campos, atualizado_em: new Date().toISOString() };
  const r = await fetch(`${SB_URL}/rest/v1/assinaturas?on_conflict=user_id`, {
    method: "POST",
    headers: sbHeaders({ prefer: "resolution=merge-duplicates,return=representation" }),
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error("supabase " + r.status + " " + (await r.text()).slice(0, 200));
  return (await r.json())[0];
}

export async function registrarEvento(userId, tipo, gatewayId, dados) {
  await fetch(`${SB_URL}/rest/v1/eventos_pagamento`, {
    method: "POST",
    headers: sbHeaders({ prefer: "return=minimal" }),
    body: JSON.stringify({ user_id: userId || null, tipo, gateway_id: gatewayId || null, dados: dados || {} }),
  }).catch(() => {});
}

export async function mp(path, opts = {}) {
  const r = await fetch(`https://api.mercadopago.com${path}`, {
    ...opts,
    headers: {
      authorization: `Bearer ${MP_TOKEN}`,
      "content-type": "application/json",
      ...(opts.idem ? { "x-idempotency-key": opts.idem } : {}),
    },
    signal: AbortSignal.timeout(15000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const e = new Error(j.message || `mercado pago ${r.status}`);
    e.status = r.status;
    e.detail = j;
    throw e;
  }
  return j;
}

const soData = (s) => (s ? String(s).slice(0, 10) : null);
const maisDias = (iso, n) => {
  const d = iso ? new Date(iso) : new Date();
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

// external_reference = "<user_id>|<plano>"
export function lerReferencia(ref) {
  const [userId, plano] = String(ref || "").split("|");
  return /^[0-9a-f-]{36}$/i.test(userId || "") ? { userId, plano: PLANOS[plano] ? plano : null } : null;
}

/**
 * Atualiza o plano do aluno a partir do estado real da assinatura no Mercado Pago.
 * Nunca confia no conteúdo da notificação: sempre lê a assinatura pela API.
 */
export async function aplicarAssinatura(pre, origem) {
  const ref = lerReferencia(pre.external_reference);
  if (!ref) return null;
  const atual = await lerAssinatura(ref.userId);
  // uma assinatura antiga (substituída) não mexe no plano atual
  if (atual?.gateway_id && atual.gateway_id !== pre.id && atual.status_pagamento === "authorized" && pre.status !== "authorized") {
    await registrarEvento(ref.userId, "ignorado_assinatura_antiga", pre.id, { status: pre.status, origem });
    return atual;
  }
  const campos = {
    gateway: "mercadopago",
    gateway_id: pre.id,
    status_pagamento: pre.status,
    proximo_pagamento: soData(pre.next_payment_date),
    email_pagador: pre.payer_email || atual?.email_pagador || null,
  };
  const plano = ref.plano || atual?.plano;
  if (pre.status === "authorized") {
    // acesso até a próxima cobrança, com alguns dias de folga
    const ate = pre.next_payment_date ? maisDias(pre.next_payment_date, CARENCIA_DIAS) : maisDias(null, 31 + CARENCIA_DIAS);
    campos.plano = plano;
    if (!atual?.valido_ate || atual.valido_ate < ate || atual.plano !== plano) campos.valido_ate = ate;
  } else if (pre.status === "cancelled" || pre.status === "paused") {
    // continua com acesso até o fim do período já pago (valido_ate não muda)
    if (!atual || atual.plano === "nenhum") campos.plano = "nenhum";
  }
  const salvo = await salvarAssinatura(ref.userId, campos);
  await registrarEvento(ref.userId, "assinatura_" + pre.status, pre.id, { origem, valor: pre.auto_recurring?.transaction_amount, proximo: pre.next_payment_date });
  return salvo;
}

/** Confere a assinatura x-signature das notificações do Mercado Pago (se MP_WEBHOOK_SECRET estiver definido). */
export function assinaturaValida(req, dataId) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true;
  const sig = String(req.headers["x-signature"] || "");
  const reqId = String(req.headers["x-request-id"] || "");
  const parts = Object.fromEntries(sig.split(",").map((p) => p.trim().split("=")));
  if (!parts.ts || !parts.v1) return false;
  const manifest = `id:${String(dataId || "").toLowerCase()};request-id:${reqId};ts:${parts.ts};`;
  const h = crypto.createHmac("sha256", secret).update(manifest).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(h), Buffer.from(parts.v1));
  } catch {
    return false;
  }
}
