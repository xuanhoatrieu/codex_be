"""Install Vietnamese OCR data in a user-owned folder, with TLS and pinned checksum."""
import hashlib
from pathlib import Path
import shutil
import urllib.request

target = Path(__file__).resolve().parents[1] / "data/tessdata"
target.mkdir(parents=True, exist_ok=True)
expected = "79df64caf7bcfb2a27df5042ecb6121e196eada34da774956995747636d5bfa1"
url = "https://raw.githubusercontent.com/tesseract-ocr/tessdata_fast/4.1.0/vie.traineddata"
file = target / "vie.traineddata"
if not file.exists() or hashlib.sha256(file.read_bytes()).hexdigest() != expected:
    with urllib.request.urlopen(url, timeout=40) as response:
        content = response.read(2_000_000)
    if hashlib.sha256(content).hexdigest() != expected:
        raise RuntimeError("Vietnamese OCR checksum mismatch; do not use this artifact.")
    file.write_bytes(content)
for language in ["eng", "osd"]:
    source = Path("/usr/share/tesseract-ocr/5/tessdata") / (language + ".traineddata")
    if not (target / source.name).exists():
        if not source.exists():
            raise RuntimeError("Install tesseract-ocr-eng and tesseract-ocr-osd from your system package manager.")
        shutil.copyfile(source, target / source.name)
print("Vietnamese OCR data verified in", target)
