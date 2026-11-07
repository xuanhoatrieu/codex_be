"""Conservative migration: preserve every source row; stage uncertain history for review."""
from __future__ import annotations
import argparse
from collections import Counter, defaultdict
from datetime import date, datetime
import hashlib
import json
from pathlib import Path
import re
import unicodedata
import uuid

from openpyxl import Workbook, load_workbook
from openpyxl.chart import BarChart, Reference
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

CODE = re.compile(r"H\d+\.\d+\.\d+-\d{6}-\d+", re.I)
OWNERS = {"bình", "chi", "mai", "phúc", "phương", "sơn"}


def clean(v):
    if v is None:
        return ""
    if isinstance(v, (date, datetime)):
        return v.isoformat()[:10]
    return re.sub(r"\s+", " ", unicodedata.normalize("NFC", str(v))).strip()


def norm(v):
    return clean(v).casefold()


def ascii_norm(v):
    return "".join(c for c in unicodedata.normalize("NFD", norm(v)) if unicodedata.category(c) != "Mn").replace("đ", "d")


def stable(*parts):
    return str(uuid.uuid5(uuid.NAMESPACE_URL, "hoso:" + "|".join(map(str, parts))))


def parse_date(value):
    if isinstance(value, (date, datetime)):
        return value.isoformat()[:10]
    value = clean(value)
    for fmt in ["%d/%m/%Y", "%Y-%m-%d", "%d-%m-%Y"]:
        try:
            parsed = datetime.strptime(value, fmt).date()
            if 1900 <= parsed.year <= 2100:
                return parsed.isoformat()
        except ValueError:
            pass
    return ""


def is_name(v):
    s = clean(v)
    low = ascii_norm(s)
    return len(s.split()) >= 2 and any(c.isalpha() for c in s) and not re.match(r"^(ngay|danh sach|nguoi|ho ten|tong|can bo|loai thu tuc|thua dat|so luong|stt|phu luc)\b", low) and not CODE.fullmatch(s)


def procedure_hint(value):
    v = ascii_norm(value)
    if v in {"cld", "cap lan dau"}:
        return "CLD"
    if v in {"cmd", "chuyen md", "chuyen muc dich", "chuyen muc dich su dung dat"}:
        return "CMD"
    if v in {"thu hoi, cl", "thu hoi,cl", "thu hoi, cap lai", "thu hoi cap lai", "thu hoi cap lai gcn"}:
        return "THCL"
    return ""


def sheet_rows(sheet, original=None):
    rows = list(sheet.values)
    original_rows = list(original.values) if original is not None else rows
    inherited = {}
    anchors = {}
    for region in sheet.merged_cells.ranges:
        value = sheet.cell(region.min_row, region.min_col).value
        for r in range(region.min_row, region.max_row + 1):
            for c in range(region.min_col, region.max_col + 1):
                if value is not None:
                    inherited[r, c] = value
                    anchors[r, c] = (region.min_row, region.min_col)
    for r, row in enumerate(rows, 1):
        raw = {get_column_letter(c): clean(v) for c, v in enumerate(original_rows[r-1], 1) if v is not None}
        expanded = [inherited.get((r, c), v) for c, v in enumerate(row, 1)]
        yield r, raw, expanded, anchors.get((r, 1), (r, 1))[0]


def extract_candidate(row, specialist, sheet):
    def v(c):
        return row[c - 1] if len(row) >= c else None
    name = clean(v(2))
    if not is_name(name):
        return None
    stt = bool(re.fullmatch(r"\d+\.?", clean(v(1))))
    # Non-STT candidates are still captured and explicitly flagged.
    if not stt and not (v(7) is not None and v(10) is not None):
        return None
    flags = [] if stt else ["Dòng giống hồ sơ nhưng thiếu STT; cần kiểm tra."]
    if sheet == "Bàn giao khác PKT":
        p = {"name": name, "serial": "", "address": clean(v(3)), "village": "", "commune": clean(v(4)), "plot": "", "map": "", "area": "", "procedureRaw": clean(v(5)), "phone": clean(v(7)), "dueRaw": clean(v(8)), "ownerRaw": "", "resultRaw": clean(v(9))}
        flags.append("Bảng bàn giao khác: cần xác nhận phạm vi quản lý và thành phần hồ sơ.")
    else:
        p = {"name": name, "serial": clean(v(3)), "address": clean(v(4)), "village": clean(v(5)), "commune": clean(v(6)), "plot": clean(v(7)), "map": clean(v(8)), "area": clean(v(9)), "procedureRaw": clean(v(10)), "phone": "" if specialist else clean(v(12)), "dueRaw": clean(v(11)), "ownerRaw": "", "resultRaw": clean(v(14)) if specialist else ""}
        if specialist and sheet in {"CLĐ", "thu hồi"} and norm(v(3)) == norm(v(2)):
            p["serial"] = clean(v(4)) if sheet == "thu hồi" else ""
            if sheet == "thu hồi":
                p["address"] = ""
            flags.append("Cột tên lặp; ánh xạ sê-ri/địa chỉ theo đoạn cần đối chiếu.")
        if specialist and sheet == "thu hồi" and ascii_norm(v(7)) == "hop thinh":
            p.update(address=clean(v(5)), village=clean(v(6)), commune=clean(v(7)), plot=clean(v(8)), map=clean(v(9)), area=clean(v(10)))
            p["procedureRaw"] = clean(v(11)) if not parse_date(v(11)) else ""
            if not parse_date(v(11)):
                p["dueRaw"] = ""
            flags.append("Đoạn dịch cột được nhận dạng bằng cột xã; thông tin đã gợi ý lại, cần xác nhận.")
        if specialist:
            candidates = [v(c) for c in ({"CLĐ": [20], "thu hồi": [18], "CMĐ": [17, 16]}[sheet])]
            owners = list(dict.fromkeys(clean(x) for x in candidates if norm(x) in OWNERS))
            p["ownerRaw"] = owners[0] if len(owners) == 1 else ""
            if not p["ownerRaw"]:
                flags.append("Chưa xác định chắc chắn cán bộ từ cột người xử lý.")
        if not specialist and sheet == "xác nhận gia hạn" and not p["procedureRaw"]:
            p["procedureRaw"] = "Xác nhận gia hạn thời hạn sử dụng đất (theo tên sheet, cần duyệt)"
    p["due"] = parse_date(p["dueRaw"])
    if not p["due"]:
        flags.append("Hạn trống/thời lượng/không đọc được ngày đầy đủ; chưa tính quá hạn.")
    p["procedure"] = procedure_hint(p["procedureRaw"])
    codes = sorted(set(CODE.fullmatch(clean(value)).group(0).upper() for value in row if CODE.fullmatch(clean(value))))
    p["code"] = codes[0] if len(codes) == 1 else ""
    if len(codes) > 1:
        flags.append("Nhiều mã hồ sơ trong một dòng; không tự chọn mã.")
    if not p["code"]:
        flags.append("Thiếu mã dịch vụ công đã nhận dạng.")
    if not p["procedure"]:
        flags.append("Tên thủ tục chưa có ánh xạ được xác nhận.")
    p["flags"] = flags
    return p


def migrate(paths: list[Path], out: Path):
    out.mkdir(parents=True, exist_ok=True)
    raw_rows, candidates, inventory = [], [], []
    for path in paths:
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        book = load_workbook(path, data_only=True)
        original = load_workbook(path, data_only=False)
        specialist = all(name in book.sheetnames for name in ["CLĐ", "thu hồi", "CMĐ"])
        for sheet in book:
            count = 0
            received = ""
            detail = not specialist or sheet.title in {"CLĐ", "thu hồi", "CMĐ"}
            for r, raw, row, anchor in sheet_rows(sheet, original[sheet.title]):
                if not raw:
                    continue
                source = f"{path.name} | {sheet.title}!{r}"
                row_id = stable(digest, sheet.title, r)
                audit = {"id": row_id, "file": path.name, "sha256": digest, "sheet": sheet.title, "row": r, "classification": "UNCLASSIFIED", "caseId": "", "raw": raw}
                raw_rows.append(audit)
                if not detail:
                    audit["classification"] = "SUMMARY"
                    continue
                heading = " ".join(clean(x) for x in row[:4] if x)
                if re.search(r"^(danh sach|nguoi (ban giao|nhan|giao)|stt|ho ten|tong cong)\b", ascii_norm(heading)):
                    audit["classification"] = "HEADER_OR_SUMMARY"
                if "danh sach ban giao" in ascii_norm(heading):
                    received = ""
                if "ngay tiep nhan" in ascii_norm(heading):
                    match = re.search(r"\b\d{1,2}/\d{1,2}/\d{4}\b", heading)
                    received = parse_date(match.group(0)) if match else ""
                    audit["classification"] = "RECEIPT_HEADING"
                    continue
                candidate = extract_candidate(row, specialist, sheet.title)
                if not candidate:
                    continue
                candidate.update(id=row_id, source=source, row=r, sheet=sheet.title, specialist=specialist, received=received if not specialist else "", anchor=anchor, digest=digest, raw=raw)
                if not candidate["received"] and not specialist:
                    candidate["flags"].append("Chưa có ngày nhận đầy đủ từ tiêu đề nhóm; không suy đoán từ mã.")
                audit["classification"] = "SPECIALIST_REVIEW" if specialist else "INTAKE_CANDIDATE"
                candidate["audit"] = audit
                candidates.append(candidate)
                count += 1
            inventory.append({"file": path.name, "sheet": sheet.title, "physicalRows": sheet.max_row, "candidateRows": count, "mergedRanges": len(sheet.merged_cells.ranges), "kind": "SPECIALIST" if specialist and detail else "SUMMARY" if specialist else "INTAKE"})

    cases, parcels, reviews = {}, {}, []
    by_code = {}
    intake = [c for c in candidates if not c["specialist"]]
    intake.sort(key=lambda c: (c["sheet"] != "Chuẩn tiếp nhận 2026", c["sheet"] != "Năm 2025 TN", c["source"]))
    for c in intake:
        key = "CODE:" + c["code"] if c["code"] else "SOURCE:" + stable(c["digest"], c["sheet"], c["anchor"])
        case_id = "HS_" + stable(key)
        existing = cases.get(case_id)
        if not existing:
            existing = {"id": case_id, "code": c["code"], "name": c["name"], "landUser": "", "phone": c["phone"], "address": c["address"], "procedure": c["procedure"], "procedureRaw": c["procedureRaw"], "received": c["received"], "originalDue": c["due"], "due": c["due"], "status": "UNVERIFIED", "owner": "", "verified": False, "version": 1, "source": "LEGACY", "note": "Cần xác minh tình trạng hiện hành; không suy ra từ ô trống hoặc cờ cũ.", "evidence": c["source"], "outcome": "", "resultDate": "", "returnDate": "", "closedDate": ""}
            cases[case_id] = existing
            if c["code"]:
                by_code[c["code"]] = case_id
        else:
            conflicts = {k: {"selected": existing[k], "source": c[k]} for k in ["name", "phone", "address", "procedure", "received", "due"] if existing[k] and c[k] and norm(existing[k]) != norm(c[k])}
            if conflicts:
                c["flags"].append("Cùng mã nhưng có trường xung đột; giữ nguyên lựa chọn ban đầu để duyệt.")
                c["conflicts"] = conflicts
            # No silent overwrite, including apparently blank fields. Original source remains visible.
        c["audit"]["caseId"] = case_id
        parcel = {k: c[k] for k in ["plot", "map", "area", "village", "commune", "serial"]}
        if any(parcel.values()):
            pid = "TD_" + stable(case_id, *[norm(parcel[k]) for k in sorted(parcel)])
            parcels.setdefault(pid, {"id": pid, "caseId": case_id, **parcel, "source": c["source"]})
        # One evidence review per source candidate preserves all dates, notes and duplicate appearances.
        reviews.append({"id": "RV_" + c["id"], "caseId": case_id, "kind": "LEGACY_SOURCE", "status": "OPEN", "source": c["source"], "message": " | ".join(c["flags"]) or "Xác minh trạng thái và lịch sử hồ sơ từ nguồn.", "details": {"raw": c["raw"], "receivedFromHeading": c["received"], "conflicts": c.get("conflicts", {})}})

    index = defaultdict(set)
    for p in parcels.values():
        c = cases[p["caseId"]]
        if all([c["name"], p["plot"], p["map"], p["village"]]):
            index[tuple(norm(v) for v in [c["name"], p["plot"], p["map"], p["village"]])].add(c["id"])
    for c in candidates:
        if not c["specialist"]:
            continue
        sig = tuple(norm(c[k]) for k in ["name", "plot", "map", "village"])
        possible = sorted(index[sig]) if all(sig) else []
        exact = by_code.get(c["code"], "") if c["code"] else ""
        c["audit"]["caseId"] = exact
        reviews.append({"id": "RV_" + c["id"], "caseId": exact, "kind": "SPECIALIST_MATCH", "status": "OPEN", "source": c["source"], "message": f"Chuyên môn: {len(possible)} ứng viên theo tên/thửa/tờ/thôn. Chưa gán cán bộ hoặc kết quả chính thức.", "details": {"proposedCaseIds": possible, "ownerRaw": c["ownerRaw"], "resultRaw": c["resultRaw"], "normalizedSuggestion": {k: c[k] for k in ["name", "serial", "address", "village", "commune", "plot", "map", "area", "procedureRaw", "dueRaw", "due"]}, "flags": c["flags"], "raw": c["raw"]}})

    for row in raw_rows:
        if row["classification"] == "UNCLASSIFIED":
            reviews.append({"id": "RAW_" + row["id"], "caseId": "", "kind": "UNCLASSIFIED_SOURCE", "status": "OPEN", "source": f"{row['file']} | {row['sheet']}!{row['row']}", "message": "Dòng nguồn chưa phân loại: xác nhận hồ sơ/ghi chú/tổng hợp trước khi chốt chuyển đổi.", "details": {"raw": row["raw"]}})

    audit_file = out / "source_audit.jsonl"
    with audit_file.open("w", encoding="utf-8") as f:
        for row in raw_rows:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")
    records = [{"table": table, "row": row} for table, rows in [("cases", cases.values()), ("parcels", parcels.values()), ("reviews", reviews)] for row in rows]
    migration = {"schema": "hoso-migration-v1", "records": records}
    (out / "migration.json").write_text(json.dumps(migration, ensure_ascii=False, indent=2), encoding="utf-8")
    report = {"sources": [str(p.name) for p in paths], "inventory": inventory, "nonemptySourceRows": len(raw_rows), "classifiedSourceRows": dict(Counter(r["classification"] for r in raw_rows)), "stagedCases": len(cases), "casesWithCode": sum(bool(c["code"]) for c in cases.values()), "stagedParcels": len(parcels), "reviews": len(reviews), "allCasesUnverified": all(c["status"] == "UNVERIFIED" for c in cases.values()), "warning": "Số hồ sơ chờ xác minh có thể còn chồng lặp, đặc biệt khi thiếu mã. Không dùng làm số hồ sơ đang xử lý hoặc số tồn chính thức."}
    (out / "migration_report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    export_xlsx(out, cases, parcels, reviews, raw_rows, report)
    return report


def safe_excel(value):
    if isinstance(value, (dict, list)):
        value = json.dumps(value, ensure_ascii=False)
    if isinstance(value, str) and value.startswith(("=", "+", "-", "@")):
        value = "'" + value
    return value


def add_table(book, name, rows, columns):
    sheet = book.create_sheet(name)
    sheet.append(columns)
    for row in rows:
        sheet.append([safe_excel(row.get(k, "")) for k in columns])
    sheet.freeze_panes = "A2"
    sheet.auto_filter.ref = sheet.dimensions
    for cell in sheet[1]:
        cell.fill = PatternFill("solid", fgColor="153F3A")
        cell.font = Font(color="FFFFFF", bold=True)
    for i, col in enumerate(columns, 1):
        sheet.column_dimensions[get_column_letter(i)].width = min(55, max(15, len(col) + 4))
    return sheet


def export_xlsx(out, cases, parcels, reviews, raw_rows, report):
    book = Workbook()
    dashboard = book.active
    dashboard.title = "DASHBOARD_CHUYEN_DOI"
    for row in [["KIỂM KÊ DỮ LIỆU CHUYỂN ĐỔI", "Số lượng"], ["Hồ sơ chờ xác minh", len(cases)], ["Có mã DVC nhận dạng được", report["casesWithCode"]], ["Thửa/nhóm thửa chờ xác minh", len(parcels)], ["Mục đối soát", len(reviews)], ["Dòng nguồn không trống đã giữ", len(raw_rows)], ["Hồ sơ chính thức được tự xác nhận", 0], ["Lưu ý", report["warning"]]]:
        dashboard.append(row)
    dashboard.column_dimensions["A"].width = 45
    dashboard.column_dimensions["B"].width = 70
    dashboard["B8"].alignment = Alignment(wrap_text=True)
    dashboard.row_dimensions[8].height = 65
    chart = BarChart()
    chart.title = "Kiểm kê chuyển đổi — chưa phải tồn nghiệp vụ"
    chart.add_data(Reference(dashboard, min_col=2, min_row=1, max_row=6), titles_from_data=True)
    chart.set_categories(Reference(dashboard, min_col=1, min_row=2, max_row=6))
    dashboard.add_chart(chart, "D2")
    add_table(book, "HO_SO", cases.values(), ["id", "code", "name", "phone", "address", "procedure", "procedureRaw", "received", "originalDue", "due", "status", "owner", "evidence", "note"])
    add_table(book, "THUA_DAT", parcels.values(), ["id", "caseId", "plot", "map", "area", "village", "commune", "serial", "source"])
    add_table(book, "CHO_DOI_SOAT", reviews, ["id", "caseId", "kind", "status", "source", "message", "details"])
    add_table(book, "KIEM_KE_NGUON", report["inventory"], ["file", "sheet", "physicalRows", "candidateRows", "mergedRanges", "kind"])
    add_table(book, "DU_LIEU_GOC", raw_rows, ["id", "file", "sha256", "sheet", "row", "classification", "caseId", "raw"])
    book.save(out / "Du_lieu_chuan_hoa_CHO_XAC_MINH.xlsx")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("files", nargs="+", type=Path)
    parser.add_argument("--out", type=Path, default=Path("output"))
    args = parser.parse_args()
    print(json.dumps(migrate(args.files, args.out), ensure_ascii=False, indent=2))
