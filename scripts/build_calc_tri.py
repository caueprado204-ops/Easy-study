"""Gera os dados da Calculadora TRI (calc-tri.json) e das chances no SISU (sisu-cortes.json).

Uso:
  python3 scripts/build_calc_tri.py ITENS_DIR SISU_DIR

ITENS_DIR: pasta com <ano>/ITENS_PROVA_<ano>.csv (microdados do INEP, arquivo ITENS_PROVA).
SISU_DIR:  pasta "data" do conjunto público sisu-data (github.com/maiakanegae/sisu-data), com
           2024/scraping/grades.csv, 2025/scraping/grades.csv e o relatório oficial
           "relatorios/Portal Sisu_Sisu 2025_Inscrições e notas de corte.xlsx".

Modelo de nota (o mesmo do INEP): ML3 com D = 1, θ por EAP com priori N(0,1) numa grade de
40 pontos em [-4, 4], itens anulados fora da conta, e escala fixa por área (nota = slope·θ + intercept).
"""
import csv, json, math, sys, collections, statistics
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
ITENS = Path(sys.argv[1])
SISU = Path(sys.argv[2])

# Escala oficial por área (θ → nota), estimada a partir dos microdados.
ESC = {"CN": (113.1023, 501.1434), "CH": (112.3100, 501.4890), "LC": (108.0860, 499.9780), "MT": (129.6462, 500.0194)}

# Cadernos regulares da 1ª aplicação (CO_PROVA) por ano, área e cor.
PROVAS = {
    2020: {"LC": {"azul": 577, "amarela": 578, "rosa": 579, "branca": 580}, "CH": {"azul": 567, "amarela": 568, "branca": 569, "rosa": 570},
           "CN": {"azul": 597, "amarela": 598, "cinza": 599, "rosa": 600}, "MT": {"azul": 587, "amarela": 588, "rosa": 589, "cinza": 590}},
    2021: {"LC": {"azul": 889, "amarela": 890, "rosa": 891, "branca": 892}, "CH": {"azul": 879, "amarela": 880, "branca": 881, "rosa": 882},
           "CN": {"azul": 909, "amarela": 910, "cinza": 911, "rosa": 912}, "MT": {"azul": 899, "amarela": 900, "rosa": 901, "cinza": 902}},
    2022: {"LC": {"azul": 1065, "amarela": 1066, "rosa": 1067, "branca": 1068}, "CH": {"azul": 1055, "amarela": 1056, "branca": 1057, "rosa": 1058},
           "CN": {"azul": 1085, "amarela": 1086, "cinza": 1087, "rosa": 1088}, "MT": {"azul": 1075, "amarela": 1076, "rosa": 1077, "cinza": 1078}},
    2023: {"LC": {"azul": 1201, "amarela": 1202, "rosa": 1203, "branca": 1204}, "CH": {"azul": 1191, "amarela": 1192, "branca": 1193, "rosa": 1194},
           "CN": {"azul": 1221, "amarela": 1222, "rosa": 1223, "cinza": 1224}, "MT": {"azul": 1211, "amarela": 1212, "rosa": 1213, "cinza": 1214}},
    2024: {"LC": {"azul": 1395, "amarela": 1396, "verde": 1397, "branca": 1398}, "CH": {"azul": 1383, "amarela": 1384, "branca": 1385, "verde": 1386},
           "CN": {"azul": 1419, "amarela": 1420, "verde": 1421, "cinza": 1422}, "MT": {"azul": 1407, "amarela": 1408, "verde": 1409, "cinza": 1410}},
    2025: {"LC": {"azul": 1459, "amarela": 1460, "verde": 1461, "branca": 1462}, "CH": {"azul": 1447, "amarela": 1448, "branca": 1449, "verde": 1450},
           "CN": {"azul": 1483, "amarela": 1484, "verde": 1485, "cinza": 1486}, "MT": {"azul": 1471, "amarela": 1472, "verde": 1473, "cinza": 1474}},
}

GRADE = np.linspace(-4, 4, 40)
PRIORI = np.exp(-GRADE ** 2 / 2)


def nota_eap(itens, u):
    """itens: lista de (a, b, c); u: 0/1 por item. Devolve a nota na escala da área (sem arredondar)."""
    l = PRIORI.copy()
    for (a, b, c), x in zip(itens, u):
        p = c + (1 - c) / (1 + np.exp(-a * (GRADE - b)))
        l *= p if x else 1 - p
    return float((l * GRADE).sum() / l.sum())


def ler_itens(ano):
    with open(ITENS / str(ano) / f"ITENS_PROVA_{ano}.csv", encoding="latin-1") as f:
        return list(csv.DictReader(f, delimiter=";"))


def montar_provas():
    out = {"esc": {k: list(v) for k, v in ESC.items()}, "anos": {}}
    for ano, areas in PROVAS.items():
        linhas = ler_itens(ano)
        por_prova = collections.defaultdict(list)
        for r in linhas:
            por_prova[int(r["CO_PROVA"])].append(r)
        A = out["anos"][str(ano)] = {}
        for area, cores in areas.items():
            itens = {}  # CO_ITEM -> [a, b, c] (ou 0 se anulado)
            cad = {}
            for cor, cp in cores.items():
                rs = por_prova[cp]
                assert rs, (ano, area, cor, cp)
                ordem = {"g": "", "i": [], "pos0": None}
                ling = {"0": {"g": "", "i": []}, "1": {"g": "", "i": []}}
                for r in sorted(rs, key=lambda r: (int(r["CO_POSICAO"]), r["TP_LINGUA"])):
                    ci = int(r["CO_ITEM"])
                    anul = r["IN_ITEM_ABAN"] == "1" or not r["NU_PARAM_A"]
                    itens[ci] = 0 if anul else [round(float(r["NU_PARAM_" + k]), 5) for k in "ABC"]
                    g = r["TX_GABARITO"] if r["TX_GABARITO"] in "ABCDE" else "X"
                    lg = r["TP_LINGUA"].split(".")[0]
                    if ordem["pos0"] is None:
                        ordem["pos0"] = int(r["CO_POSICAO"])
                    if area == "LC" and lg in ("0", "1"):
                        ling[lg]["g"] += g; ling[lg]["i"].append(ci)
                    else:
                        ordem["g"] += g; ordem["i"].append(ci)
                if area == "LC":
                    ordem["ing"] = ling["0"]; ordem["esp"] = ling["1"]
                    assert len(ling["0"]["i"]) == 5 and len(ling["1"]["i"]) == 5 and len(ordem["i"]) == 40, (ano, cor)
                else:
                    assert len(ordem["i"]) == 45, (ano, area, cor, len(ordem["i"]))
                ordem["cp"] = cp
                cad[cor] = ordem
            A[area] = {"itens": {str(k): v for k, v in itens.items()}, "cad": cad}
    return out


def vetor(D, ano, area, cor, ling="ing"):
    c = D["anos"][str(ano)][area]["cad"][cor]
    it = D["anos"][str(ano)][area]["itens"]
    ids, g = c["i"], c["g"]
    if area == "LC":
        ids = c[ling]["i"] + ids; g = c[ling]["g"] + g
    return [it[str(i)] for i in ids], g


def validar(D, exemplos):
    """Compara com notas oficiais de participantes reais (microdados)."""
    cods = {}
    for ano, areas in PROVAS.items():
        for area, cores in areas.items():
            for cor, cp in cores.items():
                cods[(ano, cp)] = (area, cor)
    err = []
    for e in exemplos:
        k = (int(e["ano"]), int(e["co_prova"]))
        if k not in cods or not e.get("nota_oficial"):
            continue
        area, cor = cods[k]
        ling = "esp" if str(e.get("tp_lingua")) in ("1", "1.0") else "ing"
        params, g = vetor(D, k[0], area, cor, ling)
        resp = e["respostas"]
        if area == "LC" and len(resp) == 50:  # microdados: 5 de inglês + 5 de espanhol + 40
            resp = (resp[5:10] if ling == "esp" else resp[:5]) + resp[10:]
        it, u = [], []
        for p, gab, r in zip(params, g, resp):
            if p == 0:
                continue
            it.append(p); u.append(1 if r == gab else 0)
        s, b = ESC[area]
        n = s * nota_eap(it, u) + b
        err.append(abs(n - float(e["nota_oficial"])))
    err.sort()
    return len(err), statistics.mean(err), err[int(len(err) * 0.95)], err[-1]


def tabela_acertos(D, anos=(2023, 2024, 2025), n=40000, seed=7):
    """Nota provável por número de acertos, para provas ainda sem parâmetros publicados.
    Simula candidatos com θ ~ N(0,1) nas provas azuis dos últimos anos e guarda os percentis 10, 50 e 90."""
    rng = np.random.default_rng(seed)
    out = {}
    for area in ESC:
        por_k = collections.defaultdict(list)
        s, b = ESC[area]
        for ano in anos:
            params, _ = vetor(D, ano, area, "azul")
            P = np.array([p for p in params if p != 0])
            a, bb, c = P[:, 0], P[:, 1], P[:, 2]
            th = rng.standard_normal(n)
            prob = c + (1 - c) / (1 + np.exp(-a * (th[:, None] - bb)))
            U = (rng.random(prob.shape) < prob).astype(int)
            # EAP vetorizado
            pg = c + (1 - c) / (1 + np.exp(-a * (GRADE[:, None] - bb)))  # 40 x I
            L = np.exp(U @ np.log(pg).T + (1 - U) @ np.log(1 - pg).T) * PRIORI  # n x 40
            T = (L * GRADE).sum(1) / L.sum(1)
            esc = 45 / U.shape[1]  # prova com item anulado: leva para a régua de 45
            for k, t in zip(np.rint(U.sum(1) * esc).astype(int), T):
                por_k[int(k)].append(s * t + b)
        tab = []
        for k in range(46):
            v = por_k.get(k)
            if not v or len(v) < 30:
                tab.append(None); continue
            q = np.percentile(v, [10, 50, 90])
            tab.append([round(x, 1) for x in q])
        # preenche buracos nas pontas (quase ninguém tira 0 ou 45) por vizinho
        for k in range(46):
            if tab[k] is None:
                viz = [tab[j] for j in sorted(range(46), key=lambda j: abs(j - k)) if tab[j]]
                tab[k] = viz[0]
        out[area] = tab
    return out


def titulo(t):
    t = " ".join(str(t).split()).title()
    for w in ("De", "Da", "Do", "Das", "Dos", "E", "Em", "Na", "No"):
        t = t.replace(f" {w} ", f" {w.lower()} ")
    return t.replace("'S", "'s")


def montar_sisu():
    import openpyxl
    norm = lambda s: " ".join(str(s or "").upper().split())

    def ler_grades(ano):
        with open(SISU / str(ano) / "scraping" / "grades.csv", encoding="utf-8") as f:
            return list(csv.reader(f, delimiter=";"))

    g25 = ler_grades(2025)
    g24 = ler_grades(2024)

    def chave(x):
        return (norm(x[9]), norm(x[1]), norm(x[2]), norm(x[3]), norm(x[6]), norm(x[5]))

    def corte_ac(x):
        if "Ampla concorrência" in x:
            i = x.index("Ampla concorrência")
            return float(x[i + 2]) if x[i + 2] else None
        return None

    ac24 = {}
    for x in g24:
        c = corte_ac(x)
        if c:
            ac24.setdefault(chave(x), []).append(c)
    ac24 = {k: v[0] for k, v in ac24.items() if len(v) == 1}

    # inscritos e tipo de cota pelo relatório oficial
    wb = openpyxl.load_workbook(SISU / "relatorios" / "Portal Sisu_Sisu 2025_Inscrições e notas de corte.xlsx", read_only=True)
    rows = list(wb["inscricao_2025_1"].iter_rows(values_only=True))[1:]
    insc, sigla_mod, adm = {}, {}, {}
    for r in rows:
        k = (norm(r[3]), norm(r[11]), norm(r[12]), norm(r[13]), norm(r[7]), norm(r[6]))
        sigla_mod[norm(r[16])] = r[15].strip()
        adm[norm(r[3])] = "E" if "Estadual" in r[5] else ("M" if "Municipal" in r[5] else "F")
        if r[15].strip() == "AC":
            insc.setdefault(k, []).append((r[20], r[18]))

    mods_lista, mods_idx = [["AC", "Ampla concorrência"]], {"AMPLA CONCORRÊNCIA": 0}
    cursos = []
    ies, ies_idx = [], {}
    deltas = []
    for x in g25:
        k = chave(x)
        pesos = [float(v or 0) for v in x[10:15]]  # CN, CH, LC, MT, RED
        mins = [float(v or 0) for v in x[15:21]]
        mods = []
        j = 21
        while j + 2 < len(x):
            desc, vagas, corte = x[j], x[j + 1], x[j + 2]
            j += 5
            if not corte or float(corte) <= 0:
                continue
            nd = norm(desc)
            if nd not in mods_idx:
                mods_idx[nd] = len(mods_lista)
                mods_lista.append([sigla_mod.get(nd, "V"), " ".join(desc.split())])
            mods.append([mods_idx[nd], int(vagas or 0), round(float(corte), 2)])
        if not mods:
            continue
        c25 = corte_ac(x)
        c24 = ac24.get(k)
        if c25 and c24:
            deltas.append(c25 - c24)
        ins = insc.get(k)
        sg = x[9]
        if sg not in ies_idx:
            ies_idx[sg] = len(ies)
            ies.append([sg, titulo(x[8]), adm.get(norm(sg), "F")])
        # [código, curso, grau, turno, IES, cidade, UF, campus, pesos CN CH LC MT RED, mínimas (ou 0), modalidades, inscritos AC, vagas]
        cursos.append([
            x[0], titulo(x[1]),
            x[2], x[3], ies_idx[sg], x[6], x[7], titulo(x[5]),
            [int(v) if v == int(v) else v for v in pesos],
            [round(v) for v in mins] if any(v > 1 for v in mins) else 0,
            mods, ins[0][0] if ins and len(ins) == 1 else 0, int(x[4] or 0),
        ])
    d = np.array(deltas)
    # dispersão robusta da variação de um ano para o outro (MAD · 1,4826)
    mad = float(np.median(np.abs(d - np.median(d))) * 1.4826)
    meta = {
        "edicao": "SISU 2025 (chamada regular, nota de corte final)",
        "fonte": "Relatórios públicos do SISU/MEC; pesos e notas mínimas coletados do sistema do SISU (conjunto aberto sisu-data).",
        "var_mediana": round(float(np.median(d)), 2), "var_sd": round(mad, 2), "var_n": int(len(d)),
        "mods": mods_lista,
    }
    return {"meta": meta, "ies": ies, "cursos": cursos}


if __name__ == "__main__":
    D = montar_provas()
    ex = ROOT.parent / "exemplos_microdados.json"
    if len(sys.argv) > 3:
        exemplos = json.load(open(sys.argv[3]))
        n, mae, p95, mx = validar(D, exemplos)
        print(f"Validação com {n} participantes reais (2020–2025): erro médio {mae:.3f}, p95 {p95:.3f}, máximo {mx:.3f}")
    D["acertos"] = tabela_acertos(D)
    (ROOT / "calc-tri.json").write_text(json.dumps(D, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    S = montar_sisu()
    (ROOT / "sisu-cortes.json").write_text(json.dumps(S, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print("cursos SISU:", len(S["cursos"]), "IES:", len(S["ies"]), "| variação anual do corte: mediana", S["meta"]["var_mediana"], "dp robusto", S["meta"]["var_sd"], "n", S["meta"]["var_n"])
