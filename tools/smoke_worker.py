"""Start a real worker process and verify private HTTP API without calling a model."""
import base64
import hashlib
import io
import json
import os
from pathlib import Path
import secrets
import socket
import subprocess
import sys
import tempfile
import time

import httpx
from reportlab.pdfgen import canvas

root = Path(__file__).resolve().parents[1]
with tempfile.TemporaryDirectory() as tmp:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        port = s.getsockname()[1]
    token = secrets.token_urlsafe(32)
    env = dict(os.environ, WORKER_TOKEN=token, WORKER_DB=str(Path(tmp) / "worker.sqlite"), OCR_TESSDATA_DIR=str(root / "data/tessdata"))
    # No external model call during this smoke test.
    for key in ["MODEL_BASE_URL", "MODEL_API_KEY", "MODEL_NAME"]:
        env.pop(key, None)
    process = subprocess.Popen([sys.executable, "-m", "uvicorn", "worker.app:app", "--host", "127.0.0.1", "--port", str(port)], cwd=root, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        with httpx.Client(base_url=f"http://127.0.0.1:{port}", timeout=10, trust_env=False) as client:
            headers = {"Authorization": "Bearer " + token}
            for _ in range(40):
                try:
                    health = client.get("/health", headers=headers)
                    if health.status_code == 200:
                        break
                except httpx.ConnectError:
                    pass
                time.sleep(0.1)
            else:
                raise RuntimeError("Worker did not start")
            assert client.get("/health").status_code == 401
            assert health.json()["ocr_vietnamese"] is True
            stream = io.BytesIO()
            pdf = canvas.Canvas(stream)
            pdf.drawString(40, 750, "Synthetic intake TEST-001. No personal data. Appointment 10/11/2026.")
            pdf.save()
            data = stream.getvalue()
            payload = {"name": "synthetic.pdf", "base64": base64.b64encode(data).decode(), "idempotencyKey": hashlib.sha256(data).hexdigest()}
            created = client.post("/jobs", headers=headers, json=payload)
            assert created.status_code == 202
            job_id = created.json()["id"]
            assert client.post("/jobs", headers=headers, json=payload).json()["id"] == job_id
            for _ in range(40):
                result = client.get("/jobs/" + job_id, headers=headers).json()
                if result["status"] in ["DONE", "FAILED"]:
                    break
                time.sleep(0.1)
            assert result["status"] == "FAILED" and "HTTPS" in result["error"]
            report = {"workerStarted": True, "unauthenticatedDenied": True, "vietnameseOcrAvailable": True, "pdfUploadAndDeduplication": True, "unconfiguredModelBlockedAsExpected": True, "liveModelTested": False}
            (root / "output").mkdir(exist_ok=True)
            (root / "output/worker_smoke.json").write_text(json.dumps(report, indent=2))
            print(json.dumps(report))
    finally:
        process.terminate()
        process.wait(timeout=10)
