import base64
import hashlib
import io
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient
from openpyxl import Workbook, load_workbook
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image, ImageDraw, ImageFont

from worker import app as worker
from tools.normalize import migrate, parse_date, extract_candidate


def text_pdf():
    stream = io.BytesIO()
    c = canvas.Canvas(stream)
    c.drawString(50, 750, "RECEIPT TEST-2026-001. Citizen Demo. Appointment 10/11/2026. Fee 100000 VND.")
    c.save()
    return stream.getvalue()


class MigrationTests(unittest.TestCase):
    def test_dates_do_not_infer_year_or_turn_work_duration_into_date(self):
        self.assertEqual(parse_date("04/111/2026"), "")
        self.assertEqual(parse_date("13 ngày LV"), "")
        self.assertEqual(parse_date("05/6"), "")
        self.assertEqual(parse_date("06/01/2026"), "2026-01-06")

    def test_shifted_specialist_columns_are_proposed_and_flagged(self):
        row = [1, "Người thử nghiệm A", "Người thử nghiệm A", "AA 123", "Địa chỉ", "Thôn A", "Hợp Thịnh", "07T", "11", 120.5, "Thu hồi, CL", None, None, 1, None, None, None, "Phúc"]
        # The parser excludes heading 'Người ...'; use realistic synthetic name.
        row[1] = row[2] = "Nguyễn Thử Nghiệm"
        c = extract_candidate(row, True, "thu hồi")
        self.assertEqual(c["plot"], "07T")
        self.assertEqual(c["map"], "11")
        self.assertEqual(c["area"], "120.5")
        self.assertEqual(c["due"], "")
        self.assertTrue(any("dịch cột" in x for x in c["flags"]))

    def test_duplicate_codes_multiple_parcels_raw_rows_and_repeatable_ids(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            book = Workbook()
            main = book.active
            main.title = "Chuẩn tiếp nhận 2026"
            main.append([None, "Ngày tiếp nhận: Ngày 06/01/2026"])
            main.append([1, "Nguyễn Thử Nghiệm", "AA 001", "Địa chỉ", "Thôn A", "Hợp Thịnh", "07T", "11", 100, "CLĐ", "04/02/2026", "0123456789", None, None, "H05.170.1-260106-0001"])
            main.append([2, "Nguyễn Thử Nghiệm", "AA 001", "Địa chỉ", "Thôn A", "Hợp Thịnh", "08T", "11", 200, "CLĐ", "04/02/2026", "0123456789", None, None, "H05.170.1-260106-0001"])
            copy = book.copy_worksheet(main)
            copy.title = "DS cũ 2026"
            file = root / "source.xlsx"
            book.save(file)
            report = migrate([file], root / "out")
            self.assertEqual(report["stagedCases"], 1)
            self.assertEqual(report["stagedParcels"], 2)
            self.assertEqual(report["nonemptySourceRows"], 6)
            one = (root / "out/migration.json").read_bytes()
            migrate([file], root / "out")
            self.assertEqual(one, (root / "out/migration.json").read_bytes())
            payload = json.loads(one)
            case = payload["records"][0]["row"]
            self.assertEqual(case["received"], "2026-01-06")
            self.assertEqual(case["status"], "UNVERIFIED")
            self.assertEqual(case["owner"], "")


class WorkerTests(unittest.TestCase):
    def test_evidence_missing_or_fabricated_is_removed(self):
        result = worker.validate_extraction({"document_type": "RECEIPT_APPOINTMENT", "fields": {"name": "Invented", "code": "TEST-001", "due": "2026-02-30"}, "evidence": {"name": {"page": 1, "quote": "not in PDF"}, "code": {"page": 1, "quote": "TEST-001"}, "due": {"page": 1, "quote": "30/02/2026"}}}, ["TEST-001 30/02/2026"])
        self.assertIsNone(result["fields"]["name"])
        self.assertIsNone(result["fields"]["due"])
        self.assertEqual(result["fields"]["code"], "TEST-001")
        self.assertTrue(result["review_required"])

    def test_http_model_endpoint_is_rejected_before_any_request(self):
        with patch.dict(os.environ, {"MODEL_BASE_URL": "http://example.test/v1", "MODEL_API_KEY": "synthetic", "MODEL_NAME": "synthetic"}), patch("worker.app.httpx.Client") as network:
            with self.assertRaisesRegex(ValueError, "HTTPS"):
                worker.model_extract(["Synthetic PDF"])
            network.assert_not_called()

    def test_extract_text_pdf(self):
        with tempfile.TemporaryDirectory() as tmp:
            file = Path(tmp) / "text.pdf"
            file.write_bytes(text_pdf())
            pages = worker.extract_pages(file)
            self.assertEqual(len(pages), 1)
            self.assertIn("TEST-2026-001", pages[0])

    def test_real_vietnamese_scan_ocr(self):
        tessdata = Path("data/tessdata").resolve()
        self.assertTrue((tessdata / "vie.traineddata").exists(), "Run tools/prepare_ocr.py before scan validation")
        with tempfile.TemporaryDirectory() as tmp, patch.dict(os.environ, {"OCR_TESSDATA_DIR": str(tessdata)}):
            image = Image.new("RGB", (1800, 900), "white")
            draw = ImageDraw.Draw(image)
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 54)
            draw.text((90, 100), "PHIẾU TIẾP NHẬN HỒ SƠ", fill="black", font=font)
            draw.text((90, 230), "Mã hồ sơ: TEST-2026-001", fill="black", font=font)
            draw.text((90, 360), "Ngày hẹn: 10/11/2026", fill="black", font=font)
            file = Path(tmp) / "scan.pdf"
            image.save(file, "PDF", resolution=150)
            text = " ".join(worker.extract_pages(file))
            self.assertIn("TIẾP NHẬN", text.upper())
            self.assertIn("TEST-2026-001", text)

    def test_authenticated_jobs_checksum_idempotency_processing_and_status(self):
        with tempfile.TemporaryDirectory() as tmp, patch.object(worker, "DB", Path(tmp) / "worker.sqlite"), patch.dict(os.environ, {"WORKER_TOKEN": "test-token-" + "x" * 30}), patch("worker.app.schedule") as schedule:
            with TestClient(worker.app) as client:
                self.assertEqual(client.get("/health").status_code, 401)
                headers = {"Authorization": "Bearer " + os.environ["WORKER_TOKEN"]}
                self.assertEqual(client.get("/health", headers=headers).status_code, 200)
                content = text_pdf()
                payload = {"name": "test.pdf", "base64": base64.b64encode(content).decode(), "idempotencyKey": hashlib.sha256(content).hexdigest()}
                bad = client.post("/jobs", headers=headers, json={**payload, "idempotencyKey": "0" * 64})
                self.assertEqual(bad.status_code, 400)
                a = client.post("/jobs", headers=headers, json=payload)
                b = client.post("/jobs", headers=headers, json=payload)
                self.assertEqual(a.status_code, 202)
                self.assertEqual(a.json()["id"], b.json()["id"])
                self.assertEqual(schedule.call_count, 1)
                job_id = a.json()["id"]
                with patch("worker.app.model_extract", return_value={"document_type": "RECEIPT_APPOINTMENT", "fields": {"code": "TEST-2026-001"}, "review_required": True}):
                    worker.run_job(job_id)
                result = client.get("/jobs/" + job_id, headers=headers).json()
                self.assertEqual(result["status"], "DONE")
                self.assertTrue(result["result"]["review_required"])
                self.assertEqual(client.post("/jobs/" + job_id + "/retry", headers=headers).status_code, 409)


if __name__ == "__main__":
    unittest.main()
