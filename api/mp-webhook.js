// Notificações do Mercado Pago (Webhooks). Configure no painel do Mercado Pago:
//   URL: https://SEU-SITE/api/mp-webhook   eventos: "Planos e assinaturas"
// Os dados da notificação nunca são usados direto: a assinatura é sempre relida pela API.
import { configurado, mp, aplicarAssinatura, assinaturaValida, registrarEvento } from "./_pagamento.js";

export default async function handler(req, res) {
  if (req.method === "GET") return res.status(200).send("ok");
  if (req.method !== "POST") return res.status(405).end();
  if (!configurado()) return res.status(200).json({ ignorado: "pagamento_desligado" });

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const tipo = body.type || body.topic || req.query?.type || req.query?.topic || "";
  const id = body.data?.id || req.query?.["data.id"] || req.query?.id || "";
  if (!id) return res.status(200).json({ ignorado: "sem_id" });
  if (!assinaturaValida(req, id)) {
    await registrarEvento(null, "webhook_assinatura_invalida", String(id), { tipo });
    return res.status(401).json({ code: "assinatura_invalida" });
  }

  try {
    let preId = null;
    if (tipo === "subscription_preapproval" || tipo === "preapproval") preId = id;
    else if (tipo === "subscription_authorized_payment" || tipo === "authorized_payment") {
      const pg = await mp(`/authorized_payments/${id}`);
      preId = pg.preapproval_id;
      await registrarEvento(null, "cobranca_" + (pg.status || "?"), preId, { pagamento: id, valor: pg.transaction_amount, status_pagamento: pg.payment?.status });
    } else {
      return res.status(200).json({ ignorado: tipo || "tipo_desconhecido" });
    }
    if (preId) {
      const pre = await mp(`/preapproval/${preId}`);
      await aplicarAssinatura(pre, "webhook:" + tipo);
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("[mp-webhook]", tipo, id, e.status, e.message);
    // 500 faz o Mercado Pago tentar de novo mais tarde
    return res.status(500).json({ code: "erro" });
  }
}
