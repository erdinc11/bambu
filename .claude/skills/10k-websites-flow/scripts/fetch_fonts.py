#!/usr/bin/env python3
"""
Download Google Fonts as LOCAL woff2 + a local @font-face css.

WHY: the delivered site must open by double-clicking index.html and must work
offline. A <link> to fonts.googleapis.com fails both. Never use a font CDN here.

USAGE (run from the project root, families are Google Fonts css2 specs):
    python3 fetch_fonts.py "Archivo:wght@300;400" "Inter Tight:wght@400;500" "JetBrains Mono:wght@500"

WRITES: assets/fonts/*.woff2 and assets/fonts/fonts.css
LINK IT: <link rel="stylesheet" href="assets/fonts/fonts.css"> BEFORE styles.css

It keeps ONLY the latin and latin-ext unicode ranges. latin-ext is mandatory for
Turkish, Polish, Czech, Romanian, Hungarian etc. Dropping it silently replaces
ş ğ İ ı with fallback glyphs that do not match the display face.
"""
import sys, re, os, hashlib, urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"}
LATIN, LATEXT = "U+0000-00FF", "U+0100-02BA"

def main(specs):
    css_all = ""
    for spec in specs:
        fam = spec.replace(" ", "+")
        url = "https://fonts.googleapis.com/css2?family=%s&display=swap" % fam
        css_all += urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read().decode()
    os.makedirs("assets/fonts", exist_ok=True)
    out, seen = [], {}
    for b in re.findall(r"@font-face\s*\{(.*?)\}", css_all, re.S):
        ur = re.search(r"unicode-range:\s*([^;]+);", b)
        if not ur or (LATIN not in ur.group(1) and LATEXT not in ur.group(1)):
            continue
        fam = re.search(r"font-family:\s*'([^']+)'", b).group(1)
        wt = re.search(r"font-weight:\s*([^;]+);", b).group(1).strip()
        u = re.search(r"url\((https://[^)]+\.woff2)\)", b).group(1)
        if u not in seen:
            name = "%s-%s-%s.woff2" % (fam.lower().replace(" ", "-"), wt.replace(" ", ""),
                                       hashlib.md5(u.encode()).hexdigest()[:6])
            open("assets/fonts/" + name, "wb").write(
                urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30).read())
            seen[u] = name
        out.append("@font-face{font-family:'%s';font-style:normal;font-weight:%s;"
                   "font-display:swap;src:url('%s') format('woff2');unicode-range:%s}"
                   % (fam, wt, seen[u], ur.group(1)))
    open("assets/fonts/fonts.css", "w").write("\n".join(out) + "\n")
    print("%d faces, %d files -> assets/fonts/fonts.css" % (len(out), len(seen)))
    print("VERIFY NOW: every family AND weight you asked for must appear below.")
    for line in sorted(set(re.findall(r"font-family:'[^']*';font-style:normal;font-weight:[0-9 ]*", "\n".join(out)))):
        print("  " + line)

main(sys.argv[1:] or ["Archivo:wght@300;400"])
