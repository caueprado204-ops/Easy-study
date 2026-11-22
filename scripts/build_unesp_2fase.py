"""Gera questoes-unesp-2fase.json a partir do conjunto aberto EduBench (enunciados das questões
discursivas da 2ª fase da Unesp). Ficam de fora: as resoluções do conjunto (são de cursinhos, não da
banca) e as questões que dependem de figura (as figuras do conjunto têm marca d'água de cursinho).
A resolução de referência é gerada pela Easier dentro da plataforma.
Uso: python3 -I build_unesp_2fase.py PASTA_EXAMS DESTINO_REPO"""
import json, os, re, sys
from collections import OrderedDict
from PIL import Image

SRC, DST = sys.argv[1], sys.argv[2]

DISC = {
    "Ciências Humanas": "Ciências Humanas",
    "Língua Portuguesa e Literatura": "Linguagens",
    "Língua Inglesa": "Inglês",
    "Ciências Exatas": "Matemática",
    "Biologia": "Biologia",
    "Química": "Química",
    "Física": "Física",
}

SUP = str.maketrans("0123456789+-−=()n", "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁻⁼⁽⁾ⁿ")
SUB = str.maketrans("0123456789+-−=()", "₀₁₂₃₄₅₆₇₈₉₊₋₋₌₍₎")
SYM = {
    r"\cdot": "·", r"\times": "×", r"\div": "÷", r"\pm": "±", r"\leq": "≤", r"\geq": "≥", r"\le": "≤", r"\ge": "≥",
    r"\neq": "≠", r"\approx": "≈", r"\cong": "≅", r"\equiv": "≡", r"\infty": "∞", r"\rightarrow": "→", r"\to": "→",
    r"\leftarrow": "←", r"\Rightarrow": "⇒", r"\rightleftharpoons": "⇌", r"\leftrightarrow": "↔", r"\circ": "°",
    r"\degree": "°", r"\pi": "π", r"\alpha": "α", r"\beta": "β", r"\gamma": "γ", r"\Delta": "Δ", r"\delta": "δ",
    r"\theta": "θ", r"\lambda": "λ", r"\mu": "μ", r"\rho": "ρ", r"\sigma": "σ", r"\omega": "ω", r"\Omega": "Ω",
    r"\phi": "φ", r"\varphi": "φ", r"\epsilon": "ε", r"\varepsilon": "ε", r"\tau": "τ", r"\eta": "η", r"\in": "∈",
    r"\cap": "∩", r"\cup": "∪", r"\subset": "⊂", r"\angle": "∠", r"\%": "%", r"\,": " ", r"\;": " ", r"\:": " ",
    r"\!": "", r"\quad": " ", r"\qquad": " ", r"\ldots": "…", r"\dots": "…", r"\cdots": "…", r"\perp": "⊥",
    r"\parallel": "∥", r"\triangle": "△", r"\{": "{", r"\}": "}", r"\sum": "Σ", r"\overline": "", r"\displaystyle": "",
    r"\Leftrightarrow": "⇔", r"\Longleftrightarrow": "⇔", r"\Longrightarrow": "⇒", r"\implies": "⇒", r"\iff": "⇔",
    r"\nabla": "∇", r"\notin": "∉", r"\forall": "∀", r"\exists": "∃", r"\$": "$", r"\&": "&",
    r"\left": "", r"\right": "", r"\big": "", r"\Big": "", r"\\": "; ",
}


def grp(s, i):
    """Lê um grupo {..} (ou um caractere) a partir de s[i]; devolve (conteúdo, próximo índice)."""
    while i < len(s) and s[i] == " ":
        i += 1
    if i < len(s) and s[i] == "{":
        d, j = 0, i
        while j < len(s):
            d += s[j] == "{"
            d -= s[j] == "}"
            if d == 0:
                return s[i + 1:j], j + 1
            j += 1
        return s[i + 1:], len(s)
    if i < len(s) and s[i] == "\\":
        m = re.match(r"\\[A-Za-z]+", s[i:])
        if m:
            return m.group(0), i + len(m.group(0))
    return (s[i], i + 1) if i < len(s) else ("", i)


def latex(s):
    out, i = "", 0
    while i < len(s):
        if s.startswith(r"\frac", i) or s.startswith(r"\dfrac", i) or s.startswith(r"\tfrac", i):
            i += 5 if s.startswith(r"\frac", i) else 6
            a, i = grp(s, i)
            b, i = grp(s, i)
            a, b = latex(a), latex(b)
            wrap = lambda x: x if re.fullmatch(r"[\w.,°√²³⁰-⁹]+", x) else f"({x})"
            out += f"{wrap(a)}/{wrap(b)}"
        elif s.startswith(r"\sqrt", i):
            i += 5
            a, i = grp(s, i)
            a = latex(a)
            out += "√" + (a if len(a) == 1 else f"({a})")
        elif s.startswith(r"\mathbb", i):
            a, i = grp(s, i + 7)
            out += {"R": "ℝ", "N": "ℕ", "Z": "ℤ", "Q": "ℚ", "C": "ℂ"}.get(a.strip(), a)
        elif re.match(r"\\(text|mathrm|mathbf|mathit|operatorname|textbf|vec|hat|bar)\b", s[i:]):
            cmd = re.match(r"\\[a-z]+", s[i:]).group(0)
            i += len(cmd)
            a, i = grp(s, i)
            out += latex(a) + ("⃗" if cmd == r"\vec" else "")
        elif s[i] in "^_":
            tab = SUP if s[i] == "^" else SUB
            a, i = grp(s, i + 1)
            a = latex(a)
            if a in ("°", "\\circ"):
                out += "°"
            elif all(c in "0123456789+-−=()n" for c in a):
                out += a.translate(tab)
            else:
                out += ("^" if tab is SUP else "_") + (a if len(a) == 1 else f"({a})")
        elif s[i] == "\\":
            m = re.match(r"\\[A-Za-z]+|\\.", s[i:])
            tok = m.group(0)
            out += SYM.get(tok, tok[1:] if tok[1:].isalpha() else tok[1:])
            i += len(tok)
        elif s[i] in "{}":
            i += 1
        else:
            out += s[i]
            i += 1
    return out


def table(body):
    rows = [r.replace(r"\hline", "").strip() for r in re.split(r"\\\\", body)]
    rows = [r for r in rows if r.strip(" &")]
    return "\n" + "\n".join(" | ".join(latex(c.strip()) for c in r.split("&")) for r in rows) + "\n"


def fix_math(t):
    t = (t or "").replace("{,}", ",").replace("R$", "R\uE000").replace("US$", "US\uE000")
    t = re.sub(r"\\begin\{table\}(\[[^\]]*\])?|\\end\{table\}|\\centering", "", t)
    t = re.sub(r"\\begin\{(tabular|array)\}\{[^}]*\}(.*?)\\end\{\1\}", lambda m: table(m.group(2)), t, flags=re.S)
    t = re.sub(r"\\begin\{cases\}(.*?)\\end\{cases\}",
               lambda m: "{ " + "; ".join(latex(r.strip()) for r in re.split(r"\\\\", m.group(1)) if r.strip()) + " }", t, flags=re.S)
    t = re.sub(r"\$\$(.+?)\$\$", lambda m: "\n" + latex(m.group(1).strip()) + "\n", t, flags=re.S)
    t = re.sub(r"\\\[(.+?)\\\]", lambda m: "\n" + latex(m.group(1).strip()) + "\n", t, flags=re.S)
    t = re.sub(r"\\\((.+?)\\\)", lambda m: latex(m.group(1).strip()), t, flags=re.S)
    t = re.sub(r"(?<!\\)\$(.+?)(?<!\\)\$", lambda m: latex(m.group(1).strip()), t, flags=re.S)
    t = t.replace("$", "")
    if re.search(r"\\[A-Za-z$]+|[_^]\{", t):
        t = latex(t)
    t = t.replace("\uE000", "$")
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r" *\n *", "\n", t)
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t.strip()


def save_webp(src, dst, max_w=720):
    im = Image.open(src)
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, "white")
        bg.paste(im, mask=im.split()[-1])
        im = bg
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, "WEBP", quality=76, method=6)


data = [x for x in json.load(open(os.path.join(SRC, "all_data.json"), encoding="utf-8")) if x["exam"] == "UNESP"]
groups = OrderedDict()
for x in data:
    num = re.match(r"\d+", x["question_id"]).group(0)
    groups.setdefault((x["year_version"], int(num)), []).append(x)


def ed_key(k):
    v, n = k
    y, _, s = v.partition("_")
    return (-int(y), s or "1", n)


FIG = re.compile(r"\b(figura|gráfico|grafico|mapa|charge|imagem|tirinha|tira|fotografia|foto|esquema|ilustração|cartum|quadrinhos?|cartaz|anúncio|infográfico|desenho|pintura|obra reproduzida|reprodução|ilustra|representad[ao] (abaixo|a seguir|na))\b", re.I)
out, skip = [], 0
for (ver, num) in sorted(groups, key=ed_key):
    its = groups[(ver, num)]
    alltxt = " ".join(x["textos_apoio"] + " " + x["questao"] for x in its)
    if any(x["imagens"] for x in its) or "<image" in alltxt or FIG.search(alltxt):
        skip += 1
        continue
    year = int(ver.split("_")[0])
    meio = ver.endswith("_2")
    im, gmap = [], {}

    def place(text, imgs):
        def rep(m):
            k = int(m.group(1))
            if k >= len(imgs):
                return ""
            p = imgs[k]["image_path"]
            full = os.path.join(SRC, p)
            if not os.path.exists(full):
                return "[figura indisponível]"
            if p not in gmap:
                rel = f"img/unesp-2fase/{ver}/{num}_{len(im)}.webp"
                if not os.path.exists(os.path.join(DST, rel)):
                    save_webp(full, os.path.join(DST, rel))
                gmap[p] = len(im)
                im.append(rel)
            return f"\n[IMAGE {gmap[p]}]\n"
        return re.sub(r'<image id="(\d+)"\s*/?>', rep, text or "")

    ctx = fix_math(place(its[0]["textos_apoio"], its[0]["imagens"]))
    itens = []
    for x in its:
        q = fix_math(place(x["questao"], x["imagens"]))
        crit = ["Responde exatamente ao que o item pede.",
                "Usa os conceitos e termos corretos da matéria.",
                "Justifica com argumentos, dados do texto ou contas."]
        itens.append({"q": q, "pts": 5 if len(its) > 1 else 10, "esp": "", "crit": crit})
    if not ctx and len(itens) == 1:
        full = itens[0]["q"]
        m = None
        for m in re.finditer(r"(?:(?<=[.:?!])\s+|\n+)(?=(Determine|Calcule|Explique|Cite|Indique|Identifique|Justifique|Apresente|Escreva|Descreva|Compare|Considerando|Com base|Qual|Quais|Por que|Como|Em que|Dê|Mencione|Relacione|Interprete|Analise|Esboce|Represente|Demonstre|Obtenha|Encontre|Expresse|Classifique|Mostre|Aponte|Comente|Discuta|Exemplifique|Caracterize|Defina|Transcreva|Reescreva|Retire|Copie|Traduza|Responda|What|Why|How|According|Which|In)\b)", full):
            pass
        if m and 40 < m.start() and len(full) - m.end() < 900:
            ctx, itens[0]["q"] = full[:m.start()].strip(), full[m.end():].strip()
        else:
            ctx, itens[0]["q"] = full, "Responda ao que a questão pede."
    d = {"id": f"unesp2-{ver}-{num}", "s": DISC[its[0]["disciplina"]], "est": "Unesp", "real": 1,
         "y": year, "ed": f"{year}{' (meio de ano)' if meio else ''}", "n": num, "c": ctx, "itens": itens}
    if im:
        d["im"] = im
    out.append(d)

with open(os.path.join(DST, "questoes-unesp-2fase.json"), "w", encoding="utf-8") as fh:
    json.dump(out, fh, ensure_ascii=False, separators=(",", ":"))
print(len(out), "questões,", sum(len(d["itens"]) for d in out), "itens; fora (figura):", skip)
