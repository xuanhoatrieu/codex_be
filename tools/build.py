"""Create a one-file Apps Script installer and a source-only archive (no personal data)."""
import json
from pathlib import Path
import zipfile
import shutil

root = Path(__file__).resolve().parents[1]
out = root / "output"
out.mkdir(exist_ok=True)
distribution = root / "distribution"
distribution.mkdir(exist_ok=True)
html = (root / "apps-script/Index.html").read_text(encoding="utf-8")
parts = ["// Hồ sơ Hợp Thịnh. Paste into Code.gs of a NEW Apps Script project.\n// Run initializeEnvironment once from the editor, then deploy as documented.\n", "var APP_HTML = " + json.dumps(html, ensure_ascii=True) + ";\n"]
for name in ["Domain.gs", "Server.gs", "Automation.gs", "Auth.gs"]:
    code = (root / "apps-script" / name).read_text(encoding="utf-8")
    code = code.replace("HtmlService.createHtmlOutputFromFile('Index')", "HtmlService.createHtmlOutput(APP_HTML)")
    parts.append(code)
(out / "Code.gs").write_text("\n".join(parts), encoding="utf-8")
shutil.copyfile(out / "Code.gs", distribution / "Code.gs")
with zipfile.ZipFile(out / "Ho_so_Hop_Thinh_ma_nguon.zip", "w", zipfile.ZIP_DEFLATED) as archive:
    archive.write(out / "Code.gs", "ho-so-hop-thinh/Code.gs")
    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(root)
        if any(part in {".git", "output", "distribution", "data", ".venv", "__pycache__", "node_modules"} for part in rel.parts) or path.name in {".env", ".clasp.json", ".clasprc.json"}:
            continue
        archive.write(path, "ho-so-hop-thinh/" + str(rel))
shutil.copyfile(out / "Ho_so_Hop_Thinh_ma_nguon.zip", distribution / "Ho_so_Hop_Thinh_ma_nguon.zip")
print("Built output/Code.gs and source archive; private migration data excluded from source archive.")
