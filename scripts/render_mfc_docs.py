from html import escape
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
OUT = ROOT / "public" / "docs"

CSS = r"""
:root{color-scheme:light;--ink:#1f2d3d;--forest:#193b32;--green:#059669;--orange:#ed8936;--paper:#f5f7f4;--line:#e1e8e2;--muted:#65756a}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:#26352d;font:16px/1.72 'DM Sans',Inter,system-ui,sans-serif}a{color:#087b57}.top{height:58px;background:#193b32;color:white;display:flex;align-items:center;justify-content:space-between;padding:0 max(24px,calc((100vw - 1160px)/2));font-size:12px}.brand{font:700 13px Montserrat,system-ui,sans-serif;letter-spacing:.06em}.top a{color:#e6f1e8;text-decoration:none}.hero{background:linear-gradient(115deg,#193b32,#254f40);color:#fff;padding:62px max(24px,calc((100vw - 1080px)/2)) 52px;position:relative;overflow:hidden}.hero:after{content:'✳';position:absolute;right:9%;top:-50px;font-size:250px;color:#ffffff0c}.eyebrow{color:#b7d7bd;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}.hero h1{max-width:820px;margin:14px 0;font:700 clamp(34px,5.6vw,58px)/1.08 Montserrat,Inter,sans-serif;letter-spacing:-.04em}.hero p{max-width:730px;margin:0;color:#d4e0d7;font-size:17px}.hero-actions{display:flex;gap:10px;margin-top:25px;flex-wrap:wrap}.hero-actions a,.hero-actions button{border:1px solid #ffffff44;border-radius:7px;background:#ffffff10;color:white;padding:10px 14px;font:600 12px inherit;text-decoration:none;cursor:pointer}.meta{display:flex;gap:9px;flex-wrap:wrap;margin-top:22px}.meta span{border:1px solid #ffffff30;border-radius:30px;padding:4px 10px;color:#dfebe1;font-size:11px}.layout{width:min(1160px,calc(100% - 40px));margin:28px auto 70px;display:grid;grid-template-columns:225px minmax(0,1fr);gap:30px}.toc{position:sticky;top:18px;align-self:start;max-height:calc(100vh - 36px);overflow:auto;padding:18px;border:1px solid var(--line);border-radius:10px;background:#fff}.toc b{display:block;margin-bottom:9px;color:#7e8d81;font-size:10px;letter-spacing:.13em;text-transform:uppercase}.toc a{display:block;padding:5px 0;color:#47594d;text-decoration:none;font-size:12px;line-height:1.4}.toc a:hover{color:var(--green)}main{min-width:0}.document{padding:34px 42px;border:1px solid var(--line);border-radius:12px;background:white;box-shadow:0 12px 40px #17392808}h2{margin:36px 0 12px;padding-top:11px;border-top:1px solid #edf0ed;color:var(--forest);font:700 23px/1.3 Montserrat,Inter,sans-serif;letter-spacing:-.025em}h2:first-child{margin-top:0;padding-top:0;border:0}h3{margin:24px 0 8px;color:#31483a;font-size:17px;line-height:1.4}p{margin:9px 0 14px}ul,ol{padding-left:23px}li{margin:5px 0;padding-left:3px}strong{color:#263c2f}blockquote{margin:20px 0;padding:12px 17px;border-left:3px solid var(--orange);background:#fff8ef;color:#59685e}table{width:100%;border-collapse:collapse;margin:16px 0 22px;font-size:13px;line-height:1.5}th{text-align:left;color:#fff;background:#254b3b;font-size:11px;letter-spacing:.04em}th,td{padding:10px 11px;border:1px solid var(--line);vertical-align:top}tr:nth-child(even) td{background:#f7faf7}hr{height:1px;border:0;background:var(--line);margin:28px 0}.footer{width:min(1160px,calc(100% - 40px));margin:-46px auto 30px;color:#849087;font-size:11px}.tag{display:inline-block;margin-right:6px;padding:3px 8px;border-radius:20px;background:#eff6ef;color:#28764f;font-size:10px;font-weight:700}@media(max-width:800px){.layout{grid-template-columns:1fr;width:min(100% - 24px,720px);margin-top:14px}.toc{position:static;max-height:none;columns:2}.document{padding:24px 20px}.hero{padding-top:42px;padding-bottom:38px}.hero p{font-size:15px}}@media(max-width:520px){body{font-size:15px}.top{padding:0 14px}.layout{width:calc(100% - 16px)}.toc{columns:1}.document{padding:20px 15px}table{font-size:11px}th,td{padding:7px}.hero{padding-left:18px;padding-right:18px}}@media print{body{background:white;font-size:11pt}.top,.toc,.hero-actions{display:none!important}.hero{padding:0 0 20px;background:white;color:#193b32}.hero p,.eyebrow,.meta span{color:#53645a}.hero:after{display:none}.layout{display:block;width:100%;margin:0}.document{padding:0;border:0;box-shadow:none}.footer{display:none}h2{break-after:avoid}tr,li{break-inside:avoid}a{color:inherit;text-decoration:none}}
"""

def inline(text):
    text = escape(text.strip())
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*(.+?)\*", r"<em>\1</em>", text)
    text = re.sub(r"`(.+?)`", r"<code>\1</code>", text)
    return text

def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")

def convert(markdown):
    lines = markdown.splitlines()
    title = next((line[2:].strip() for line in lines if line.startswith("# ")), "MFC Document")
    out, toc = [], []
    i = 0
    in_list = None
    skipped_title = False
    while i < len(lines):
        line = lines[i].strip()
        if not line or line == "---":
            if in_list:
                out.append(f"</{in_list}>"); in_list = None
            i += 1; continue
        if line.startswith("|"):
            if in_list:
                out.append(f"</{in_list}>"); in_list = None
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-{3,}:?", c) for c in cells):
                    rows.append(cells)
                i += 1
            if rows:
                out.append("<div class='table-wrap'><table><thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in rows[0]) + "</tr></thead><tbody>")
                for row in rows[1:]:
                    out.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in row) + "</tr>")
                out.append("</tbody></table></div>")
            continue
        heading = re.match(r"^(#{1,3})\s+(.*)$", line)
        if heading:
            if in_list:
                out.append(f"</{in_list}>"); in_list = None
            level, text = len(heading.group(1)), heading.group(2)
            if level == 1 and not skipped_title:
                skipped_title = True
                i += 1
                continue
            ident = slug(text)
            out.append(f"<h{level} id='{ident}'>{inline(text)}</h{level}>")
            if level == 2:
                toc.append((ident, text))
            i += 1; continue
        bullet = re.match(r"^[-*]\s+(.*)$", line)
        numbered = re.match(r"^\d+\.\s+(.*)$", line)
        if bullet or numbered:
            kind = "ul" if bullet else "ol"
            if in_list != kind:
                if in_list: out.append(f"</{in_list}>")
                out.append(f"<{kind}>"); in_list = kind
            out.append(f"<li>{inline((bullet or numbered).group(1))}</li>")
            i += 1; continue
        if in_list:
            out.append(f"</{in_list}>"); in_list = None
        if line.startswith("> "):
            out.append(f"<blockquote>{inline(line[2:])}</blockquote>")
        else:
            out.append(f"<p>{inline(line)}</p>")
        i += 1
    if in_list:
        out.append(f"</{in_list}>")
    toc_html = "".join(f"<a href='#{ident}'>{escape(label)}</a>" for ident, label in toc)
    return title, toc_html, "\n".join(out)

for source, filename, kind, subtitle in [
    ("mfc-frontend-prd.md", "mfc-frontend-prd.html", "PRODUCT REQUIREMENTS", "A frontend product plan for selling My Family Companion and supporting the Family Health Promoter community."),
    ("mfc-frontend-design-guide.md", "mfc-frontend-design-guide.html", "VISUAL DESIGN SYSTEM", "A distinctive design direction for MFC book sales, promoter tools, and family-health storytelling."),
]:
    title, toc, body = convert((DOCS / source).read_text())
    html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#193b32"><title>{escape(title)} · MFC</title><style>{CSS}</style></head><body><header class="top"><div class="brand">MFC <span style="opacity:.65">/ MY FAMILY COMPANION</span></div><a href="/AffiliateExperience">← Return to promoter hub</a></header><section class="hero"><div class="eyebrow">{kind} · OCTOBER 2026</div><h1>{escape(title)}</h1><p>{subtitle}</p><div class="meta"><span>NGN launch model</span><span>Customer + promoter experience</span><span>Version 2.1</span></div><div class="hero-actions"><button onclick="window.print()">Print or save as PDF</button><a href="/{'docs/mfc-frontend-prd.md' if 'prd' in filename else 'docs/mfc-frontend-design-guide.md'}" download>Download source Markdown</a></div></section><div class="layout"><nav class="toc"><b>In this document</b>{toc}</nav><main><article class="document">{body}</article></main></div><footer class="footer">My Family Companion · MFC Frontend · Designed for clear, trustworthy family-health commerce</footer></body></html>'''
    (OUT / filename).write_text(html)
