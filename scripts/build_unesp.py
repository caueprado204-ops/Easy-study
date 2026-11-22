"""Gera questoes-unesp.json e img/unesp/ a partir das questões extraídas dos cadernos
oficiais da 1ª fase da Unesp (Vunesp). Uso: python3 -I build_unesp.py ORIGEM DESTINO_REPO"""
import json, glob, os, re, sys
from PIL import Image

SRC, DST = sys.argv[1], sys.argv[2]

DISC = {  # disciplina da origem -> (matéria na plataforma, área)
    "Português": ("Linguagens", "linguagens"),
    "Artes": ("Linguagens", "linguagens"),
    "Inglês": ("Inglês", "linguagens"),
    "História": ("História", "ciencias-humanas"),
    "Geografia": ("Geografia", "ciencias-humanas"),
    "Filosofia": ("Filosofia e Sociologia", "ciencias-humanas"),
    "Sociologia": ("Filosofia e Sociologia", "ciencias-humanas"),
    "Biologia": ("Biologia", "ciencias-natureza"),
    "Química": ("Química", "ciencias-natureza"),
    "Física": ("Física", "ciencias-natureza"),
    "Matemática": ("Matemática", "matematica"),
}
EXATAS = {"Química", "Física", "Matemática"}
SHORT = 44          # linhas de prosa nos cadernos têm ~55-65 caracteres
END = tuple('.:;?!)”"')


def unwrap_block(block):
    """Junta as quebras de linha do PDF, preservando versos, listas e parágrafos."""
    lines = [l.rstrip() for l in block.split("\n")]
    lines = [l for l in lines if l.strip()]
    if not lines:
        return ""
    n = len(lines)
    # referências da fonte: da linha que abre "(" até a que fecha com ")" (até 4 linhas)
    cit = [0] * n  # 0 fora; 1 início; 2 meio/fim
    i = 0
    while i < n:
        if lines[i].lstrip().startswith("(") and (i == 0 or lines[i - 1].endswith(END)):
            for j in range(i, min(n, i + 4)):
                if re.search(r"\)\.?$", lines[j]):
                    cit[i] = 1
                    for k in range(i + 1, j + 1):
                        cit[k] = 2
                    i = j
                    break
        i += 1
    lens = sorted(len(l) for l, c in zip(lines, cit) if not c) or [58]
    typ = max(56, lens[int(len(lens) * 0.75)])
    short = [len(l) < 0.82 * typ and not c for l, c in zip(lines, cit)]
    keep = [False] * n  # keep[i]: manter a quebra depois da linha i
    i = 0
    while i < n:  # 3+ linhas curtas seguidas (versos, listas, tabelas) mantêm as quebras
        j = i
        while j < n and short[j]:
            j += 1
        if j - i >= 3:
            for k in range(i, j):
                keep[k] = True
            if i > 0 and lines[i - 1].endswith(END):
                keep[i - 1] = True
        i = max(j, i + 1)
    out = lines[0]
    for i in range(1, n):
        prev, cur = lines[i - 1], lines[i]
        if cit[i] == 2:
            brk = False  # continua a referência
        else:
            brk = keep[i - 1] or (prev.endswith(END) and short[i - 1]) or cit[i] == 1 or cit[i - 1] > 0
            if re.match(r"^(I{1,3}|IV|V|VI{0,3})\s*[.–-]\s", cur):
                brk = True  # itens I., II., III.
            if re.match(r"^(\d{1,2}\s+)?—", cur) and prev.endswith(END):
                brk = True  # fala de personagem
        if prev.endswith("-") and cur.startswith("-"):
            out += cur[1:]  # pronome enclítico partido: "aparecer-" + "-lhe"
        elif brk:
            out += "\n" + cur
        elif prev.endswith("-") and not prev.endswith(" -") and cur[:1].islower():
            out = out[:-1] + cur  # hifenização
        else:
            out += " " + cur
    return out


def clean(t):
    t = (t or "").replace("\r", "").replace("­", "")
    blocks = re.split(r"\n\s*\n", t.strip())
    return ordinal("\n\n".join(b for b in (unwrap_block(b) for b in blocks) if b))


def clean_alt(t):
    t = (t or "").replace("\u00ad", "").strip()
    t = re.sub(r"(?<=[a-zà-ú])-\n(?=[a-zà-ú])", "", t)
    t = re.sub(r"-\n-", "-", t)
    return ordinal(re.sub(r"\s*\n\s*", " ", t))


def ordinal(t):
    return re.sub(r"\b(\d{1,2})o (parágrafo|verso|estrofe|linha|período|capítulo)", r"\1º \2", t)


def split_stem(ctx):
    """Separa texto-base (c) e comando (q) quando não há contexto compartilhado."""
    lines = ctx.split("\n")
    cut = None
    for i, l in enumerate(lines[:-1]):
        if re.search(r"\)\.?$", l.strip()):
            for j in range(i, max(-1, i - 4), -1):
                if lines[j].lstrip().startswith("("):
                    cut = i + 1
                    break
    if cut is not None:
        return "\n".join(lines[:cut]).strip(), "\n".join(lines[cut:]).strip()
    if "\n\n" in ctx:
        a, b = ctx.rsplit("\n\n", 1)
        return a.strip(), b.strip()
    if len(ctx) <= 450:
        return "", ctx.strip()
    return ctx.strip(), ""


def looks_garbled(t):
    # fórmulas químicas que perderam os índices viram linhas só de números
    return bool(re.search(r"(?m)^(\d{1,2} ){3,}\d{1,2}$", t or ""))


def save_webp(src, dst, max_w=720):
    im = Image.open(src)
    if im.mode not in ("RGB", "L"):
        bg = Image.new("RGB", im.size, "white")
        bg.paste(im, mask=im.convert("RGBA").split()[-1])
        im = bg
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, "WEBP", quality=74, method=6)


out, stats = [], {"texto": 0, "figura": 0}
for f in sorted(glob.glob(f"{SRC}/*/questions/*/question.json"),
                key=lambda p: (int(p.split("/")[-4]), int(p.split("questao-")[-1].split("/")[0]))):
    q = json.load(open(f, encoding="utf-8"))
    qdir = os.path.dirname(f)
    y, n = int(q["year"]), int(q["index"])
    m = q["metadata"]
    assert not m.get("cancelled"), f
    s, a = DISC[q["discipline"]]
    alts = q["alternatives"]
    assert [x["letter"] for x in alts] == list("ABCDE"), f
    k = "ABCDE".index(q["correctAlternative"])
    has_fig = bool(q.get("files")) or bool(m.get("vectorFigures")) or bool(m.get("alternativeVisualFiles"))
    alt_vis = any(x.get("file") for x in alts) or any(not (x.get("text") or "").strip() for x in alts)
    ctx = q["context"] or ""
    shared = m.get("sharedContext") or ""
    if shared and ctx.startswith(shared):
        c_raw, q_raw = shared, ctx[len(shared):]
    else:
        c_raw, q_raw = split_stem(ctx)
    c_txt, q_txt = clean(c_raw), clean(q_raw)
    o_txt = [clean_alt(x.get("text")) for x in alts]
    usa_figura = has_fig or alt_vis or q["discipline"] in EXATAS or looks_garbled(ctx) or any(map(looks_garbled, o_txt))
    item = {"id": f"unesp-{y}-{n}", "v": "Unesp", "y": y, "n": n, "a": a, "s": s}
    if usa_figura:
        # a questão aparece como no caderno (figuras e fórmulas intactas); o texto fica em "tx" para a Easier
        orig = os.path.join(qdir, (q.get("originalFiles") or ["questao-original.webp"])[0])
        rel = f"img/unesp/{y}/{n}.webp"
        if not os.path.exists(os.path.join(DST, rel)):
            save_webp(orig, os.path.join(DST, rel))
        item["c"] = "[IMAGE 0]"
        item["q"] = ""
        item["o"] = [t if t and not x.get("file") else f"Alternativa {L} (veja na figura)"
                     for t, x, L in zip(o_txt, alts, "ABCDE")]
        item["k"] = k
        item["im"] = [rel]
        item["tx"] = (c_txt + "\n\n" + q_txt).strip()
        stats["figura"] += 1
    else:
        item.update({"c": c_txt, "q": q_txt, "o": o_txt, "k": k})
        stats["texto"] += 1
    out.append(item)

with open(os.path.join(DST, "questoes-unesp.json"), "w", encoding="utf-8") as fh:
    json.dump(out, fh, ensure_ascii=False, separators=(",", ":"))
print(len(out), stats)
