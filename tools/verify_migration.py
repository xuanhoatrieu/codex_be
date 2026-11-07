"""Check generated data against source row coverage without printing personal data."""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path

from openpyxl import load_workbook

parser = argparse.ArgumentParser()
parser.add_argument("files", nargs="+", type=Path)
parser.add_argument("--out", type=Path, default=Path("output"))
args = parser.parse_args()
audit = [json.loads(line) for line in (args.out / "source_audit.jsonl").read_text().splitlines()]
actual = {(r["sha256"], r["sheet"], r["row"]) for r in audit}
expected = set()
for file in args.files:
    digest = hashlib.sha256(file.read_bytes()).hexdigest()
    book = load_workbook(file, data_only=False)
    for sheet in book:
        for i, row in enumerate(sheet.values, 1):
            if any(v is not None for v in row):
                expected.add((digest, sheet.title, i))
assert expected == actual, "Source row coverage differs"
records = json.loads((args.out / "migration.json").read_text())["records"]
cases = [r["row"] for r in records if r["table"] == "cases"]
ids = {c["id"] for c in cases}
assert len(ids) == len(cases)
codes = [c["code"] for c in cases if c.get("code")]
assert len(codes) == len(set(codes)), "Duplicate staged DVC code"
assert all(c["status"] == "UNVERIFIED" and not c["owner"] for c in cases)
assert all(not r["row"].get("caseId") or r["row"]["caseId"] in ids for r in records)
reviews = [r["row"] for r in records if r["table"] == "reviews"]
assert len([r for r in reviews if r["kind"] == "UNCLASSIFIED_SOURCE"]) == len([r for r in audit if r["classification"] == "UNCLASSIFIED"])
result = {"sourceRowsCovered": len(actual), "coverageExact": True, "uniqueStagedDvcCodes": len(codes), "stagedCases": len(cases), "allCasesRequireVerification": True, "referencesValid": True, "unclassifiedRowsQueued": True}
(args.out / "migration_validation.json").write_text(json.dumps(result, indent=2))
print(json.dumps(result))
