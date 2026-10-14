// Ilustrações originais do Easy Study para o reforço de Matemática Básica.
(function () {
  const T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.s || 13}" font-weight="${o.w || 600}" fill="${o.c || "var(--ink)"}" text-anchor="${o.a || "middle"}" font-family="DM Sans,system-ui,sans-serif">${t}</text>`;
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
  const arrow = (id, c = "var(--ink)") =>
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker></defs>`;
  const F = (window.FIGS = window.FIGS || {});

  F.reta_inteiros = () => {
    const x0 = 50, u = 54, y = 110;
    let b = arrow("brt") + `<line x1="20" y1="${y}" x2="640" y2="${y}" stroke="var(--ink)" stroke-width="2" marker-start="url(#brt)" marker-end="url(#brt)"/>`;
    for (let n = -5; n <= 5; n++) {
      const x = x0 + (n + 5) * u;
      b += `<line x1="${x}" y1="${y - 8}" x2="${x}" y2="${y + 8}" stroke="var(--ink)" stroke-width="2"/>` + T(x, y + 30, n > 0 ? "+" + n : n === 0 ? "0" : "−" + -n, { s: 14, w: n === 0 ? 800 : 600, c: n < 0 ? "var(--bad)" : n > 0 ? "var(--ok)" : "var(--ink)" });
    }
    const p = (n) => x0 + (n + 5) * u;
    b += `<path d="M${p(0)} ${y - 14} Q ${(p(0) + p(3)) / 2} ${y - 70} ${p(3)} ${y - 14}" fill="none" stroke="var(--violet)" stroke-width="2.5" marker-end="url(#brt)"/>` + T((p(0) + p(3)) / 2, y - 58, "|+3| = 3", { c: "var(--violet)", w: 800 });
    b += `<path d="M${p(0)} ${y - 14} Q ${(p(0) + p(-3)) / 2} ${y - 70} ${p(-3)} ${y - 14}" fill="none" stroke="var(--pink)" stroke-width="2.5" marker-end="url(#brt)"/>` + T((p(0) + p(-3)) / 2, y - 58, "|−3| = 3", { c: "var(--pink)", w: 800 });
    b += T(p(-3), 178, "negativos: quanto mais à esquerda, menor", { s: 12, c: "var(--muted)" }) + T(p(3) + 10, 178, "positivos: crescem para a direita", { s: 12, c: "var(--muted)" });
    return svg(660, 195, b);
  };

  F.fracoes_pizza = () => {
    const pizza = (cx, cy, r, n, k, cor) => {
      let s = "";
      for (let i = 0; i < n; i++) {
        const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n, a1 = a0 + (2 * Math.PI) / n;
        const big = 2 * Math.PI / n > Math.PI ? 1 : 0;
        s += `<path d="M${cx} ${cy} L${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A${r} ${r} 0 ${big} 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} Z" fill="${i < k ? cor : "var(--white)"}" stroke="var(--ink)" stroke-width="1.5"/>`;
      }
      return s;
    };
    return svg(640, 230,
      pizza(90, 100, 60, 2, 1, "var(--butter)") + T(90, 192, "1/2", { s: 18, w: 800 }) +
      pizza(255, 100, 60, 4, 2, "var(--lilac)") + T(255, 192, "2/4", { s: 18, w: 800 }) +
      pizza(420, 100, 60, 8, 4, "var(--mint)") + T(420, 192, "4/8", { s: 18, w: 800 }) +
      T(172, 110, "=", { s: 26, w: 800 }) + T(337, 110, "=", { s: 26, w: 800 }) +
      T(580, 90, "Frações", { w: 800, c: "var(--violet)" }) + T(580, 110, "equivalentes:", { w: 800, c: "var(--violet)" }) + T(580, 132, "mesma quantidade,", { s: 12 }) + T(580, 150, "pedaços diferentes", { s: 12 }) +
      T(320, 222, "Multiplicar (ou dividir) em cima e embaixo pelo mesmo número não muda o valor", { s: 12, c: "var(--muted)" }));
  };

  F.casas_decimais = () => {
    const cols = [["centena", "1"], ["dezena", "2"], ["unidade", "3"], [",", ","], ["décimo", "4"], ["centésimo", "5"], ["milésimo", "6"]];
    let b = T(320, 26, "123,456", { s: 24, w: 800, c: "var(--violet)" }), x = 40;
    cols.forEach(([n, d]) => {
      const w = n === "," ? 30 : 84;
      if (n !== ",") b += `<rect x="${x}" y="50" width="${w - 6}" height="62" rx="10" fill="${x < 300 ? "var(--sky)" : "var(--butter)"}" stroke="var(--ink)" stroke-width="1.3"/>` + T(x + (w - 6) / 2, 92, d, { s: 24, w: 800 }) + T(x + (w - 6) / 2, 132, n, { s: 11 });
      else b += T(x + 12, 96, ",", { s: 34, w: 800 });
      x += w;
    });
    b += T(165, 162, "parte inteira", { w: 800 }) + T(470, 162, "parte decimal", { w: 800 });
    b += T(320, 192, "Cada casa para a direita vale 10 vezes menos: 0,1 = 1/10 · 0,01 = 1/100 · 0,001 = 1/1000", { s: 12, c: "var(--muted)" });
    return svg(640, 205, b);
  };

  F.escada_medidas = () => {
    const u = ["km", "hm", "dam", "m", "dm", "cm", "mm"];
    let b = arrow("besc");
    u.forEach((n, i) => {
      const x = 30 + i * 84, y = 40 + i * 24;
      b += `<rect x="${x}" y="${y}" width="76" height="40" rx="8" fill="${n === "m" ? "var(--lime)" : "var(--white)"}" stroke="var(--ink)" stroke-width="1.4"/>` + T(x + 38, y + 26, n, { s: 16, w: 800 });
    });
    b += `<path d="M60 250 L560 250" stroke="var(--ok)" stroke-width="3" marker-end="url(#besc)"/>` + T(310, 240, "descendo um degrau: × 10", { w: 800, c: "var(--ok)" });
    b += `<path d="M560 280 L60 280" stroke="var(--bad)" stroke-width="3" marker-end="url(#besc)"/>` + T(310, 302, "subindo um degrau: ÷ 10", { w: 800, c: "var(--bad)" });
    b += T(610, 70, "Área (m²):", { a: "end", s: 12, w: 800 }) + T(610, 88, "× 100 por degrau", { a: "end", s: 12 }) + T(610, 112, "Volume (m³):", { a: "end", s: 12, w: 800 }) + T(610, 130, "× 1000 por degrau", { a: "end", s: 12 });
    return svg(640, 315, b);
  };

  F.regra_tres = () =>
    svg(640, 240, arrow("br3") + arrow("br3v", "var(--violet)") + `
    ${T(160, 28, "Diretamente proporcional", { w: 800, c: "var(--ok)" })}${T(480, 28, "Inversamente proporcional", { w: 800, c: "var(--bad)" })}
    ${T(110, 64, "Pães", { s: 12, c: "var(--muted)" })}${T(210, 64, "Preço (R$)", { s: 12, c: "var(--muted)" })}
    ${T(110, 100, "4", { s: 20, w: 800 })}${T(210, 100, "6", { s: 20, w: 800 })}
    ${T(110, 150, "10", { s: 20, w: 800 })}${T(210, 150, "x", { s: 20, w: 800, c: "var(--violet)" })}
    <line x1="70" y1="80" x2="70" y2="150" stroke="var(--ink)" stroke-width="2" marker-end="url(#br3)"/><line x1="250" y1="80" x2="250" y2="150" stroke="var(--ink)" stroke-width="2" marker-end="url(#br3)"/>
    ${T(160, 192, "mesmo sentido: multiplica cruzado", { s: 12 })}${T(160, 214, "4x = 60 → x = 15", { w: 800, c: "var(--violet)" })}
    ${T(430, 64, "Pedreiros", { s: 12, c: "var(--muted)" })}${T(530, 64, "Dias", { s: 12, c: "var(--muted)" })}
    ${T(430, 100, "3", { s: 20, w: 800 })}${T(530, 100, "12", { s: 20, w: 800 })}
    ${T(430, 150, "6", { s: 20, w: 800 })}${T(530, 150, "x", { s: 20, w: 800, c: "var(--violet)" })}
    <line x1="390" y1="80" x2="390" y2="150" stroke="var(--ink)" stroke-width="2" marker-end="url(#br3)"/><line x1="570" y1="150" x2="570" y2="80" stroke="var(--ink)" stroke-width="2" marker-end="url(#br3)"/>
    ${T(480, 192, "sentidos opostos: inverte uma coluna", { s: 12 })}${T(480, 214, "6x = 3 · 12 → x = 6", { w: 800, c: "var(--violet)" })}
    <line x1="320" y1="50" x2="320" y2="225" stroke="var(--hair)" stroke-width="2"/>`);
})();
