// Assinatura com pagamento automático (cartão, cobrança mensal) pelo Mercado Pago.
// POST /api/assinatura  { acao: "assinar" | "cancelar" | "atualizar", plano?, email? }
// Exige o login do aluno (Authorization: Bearer <token do Supabase>).
import { PLANOS, configurado, usuarioDoToken, lerAssinatura, salvarAssinatura, registrarEvento, mp, aplicarAssinatura } from "./_pagamento.js";

const json = (res, s, b) => res.status(s).json(b);

export default async function handler(req, res) {
  res.setHeader("cache-control", "no-store");
  if (req.method !== "POST") return json(res, 405, { code: "method_not_allowed" });
  if (!configurado()) return json(res, 503, { code: "pagamento_desligado", message: "O pagamento automático ainda não foi configurado." });

  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const user = await usuarioDoToken(token);
  if (!user) return json(res, 401, { code: "login_required" });

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const acao = body.acao;
  const atual = await lerAssinatura(user.id);

  try {
    if (acao === "atualizar") {
      // confere no Mercado Pago (útil na volta do checkout, antes de a notificação chegar)
      if (!atual?.gateway_id) return json(res, 200, { assinatura: atual });
      const pre = await mp(`/preapproval/${atual.gateway_id}`);
      const salvo = await aplicarAssinatura(pre, "retorno");
      return json(res, 200, { assinatura: salvo });
    }

    if (acao === "cancelar") {
      if (!atual?.gateway_id || atual.status_pagamento === "cancelled") return json(res, 400, { code: "sem_assinatura" });
      const pre = await mp(`/preapproval/${atual.gateway_id}`, { method: "PUT", body: JSON.stringify({ status: "cancelled" }) });
      const salvo = await aplicarAssinatura(pre, "cancelamento");
      return json(res, 200, { assinatura: salvo });
    }

    if (acao === "assinar") {
      const plano = body.plano;
      if (!PLANOS[plano]) return json(res, 400, { code: "plano_invalido" });
      const p = PLANOS[plano];
      const email = String(body.email || user.email || "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(res, 400, { code: "email_invalido" });

      // já tem assinatura ativa: troca de plano muda o valor das próximas cobranças
      if (atual?.gateway_id && atual.status_pagamento === "authorized") {
        if (atual.plano === plano) return json(res, 200, { code: "ja_assinante", assinatura: atual });
        const pre = await mp(`/preapproval/${atual.gateway_id}`, {
          method: "PUT",
          body: JSON.stringify({ reason: `Easy Study – ${p.nome}`, external_reference: `${user.id}|${plano}`, auto_recurring: { transaction_amount: p.preco, currency_id: "BRL" } }),
        });
        const salvo = await salvarAssinatura(user.id, { plano });
        await registrarEvento(user.id, "troca_de_plano", pre.id, { de: atual.plano, para: plano });
        return json(res, 200, { code: "plano_trocado", assinatura: salvo });
      }

      const origem = (req.headers["x-forwarded-proto"] || "https") + "://" + (req.headers["x-forwarded-host"] || req.headers.host);
      const pre = await mp("/preapproval", {
        method: "POST",
        idem: `${user.id}-${plano}-${new Date().toISOString().slice(0, 16)}`,
        body: JSON.stringify({
          reason: `Easy Study – ${p.nome}`,
          external_reference: `${user.id}|${plano}`,
          payer_email: email,
          auto_recurring: { frequency: 1, frequency_type: "months", transaction_amount: p.preco, currency_id: "BRL" },
          back_url: `${origem}/?assinatura=retorno#planos`,
          status: "pending",
        }),
      });
      await salvarAssinatura(user.id, { gateway: "mercadopago", gateway_id: pre.id, status_pagamento: pre.status, email_pagador: email, plano: atual?.plano || "nenhum" });
      await registrarEvento(user.id, "checkout_criado", pre.id, { plano, valor: p.preco });
      return json(res, 200, { url: pre.init_point || pre.sandbox_init_point });
    }

    return json(res, 400, { code: "acao_invalida" });
  } catch (e) {
    console.error("[assinatura]", acao, e.status, e.message, JSON.stringify(e.detail || {}).slice(0, 400));
    await registrarEvento(user.id, "erro_" + (acao || "?"), atual?.gateway_id, { status: e.status, message: e.message });
    return json(res, 502, { code: "erro_pagamento", message: "Não foi possível falar com o Mercado Pago agora. Tente de novo em instantes." });
  }
}
