# Theo dõi hồ sơ Hợp Thịnh

Ứng dụng Google Sheets / Apps Script cho một cửa và cán bộ chuyên môn, kèm công cụ chuẩn hóa Excel và worker đọc PDF. Giao diện tiếng Việt, hỗ trợ máy tính và điện thoại.

## Những phần đã có

- Tiếp nhận; bàn giao theo hồ sơ hoặc đợt; xác nhận nhận hoặc không nhận có lý do.
- Giao công việc, cập nhật tiến độ, vướng mắc và kết quả. Hạn nội bộ tách khỏi hạn chính thức.
- Kết quả chuyên môn → giao một cửa → một cửa xác nhận → trả công dân; rút/từ chối là loại kết quả riêng.
- Điều chỉnh hạn có căn cứ, mở lại, thêm thửa, gắn tài liệu và biên lai. Biên lai không tự hoàn thành hồ sơ.
- Dashboard tổng, công việc, bàn giao, tiến độ cán bộ, báo cáo kỳ và chốt bản báo cáo.
- Nhật ký ghi trước, phục hồi bảng dữ liệu khi ghi gián đoạn; khóa khi ghi, kiểm tra phiên bản, request ID chống lặp.
- Quyền ADMIN / MANAGER / FRONT / SPECIALIST; Google identity hoặc đăng nhập email bằng mã dùng một lần (tùy chọn, mặc định tắt).
- Nhắc email có xem trước, bật riêng từng cán bộ, giữ lượt gửi để tránh gửi lặp khi kết quả gửi không chắc chắn.
- PDF: Drive inbox, checksum, tác vụ bất đồng bộ, trích văn bản/OCR tiếng Việt, model trả JSON có bằng chứng trang, duyệt trước khi ghi sổ.
- Chuyển đổi hai file Excel: giữ dòng gốc, nhận dạng đoạn dịch cột, gộp theo mã DVC, thửa riêng, đề xuất nối chuyên môn; mọi hồ sơ cũ đều UNVERIFIED.

## Trạng thái bàn giao

Mã nguồn, dữ liệu chuẩn hóa và kiểm thử cục bộ đã được chuẩn bị. **Chưa tạo tài nguyên Google thật, chưa gửi email thật, chưa cấp OAuth, chưa triển khai worker công khai và chưa thử model người dùng.** Phiên Codex không có công cụ điều khiển tab Gmail cá nhân hay kết nối Google Sheets.

Bản chạy cục bộ dùng dịch vụ Google giả lập và dữ liệu giả; không chứng minh Apps Script đã chạy thành công trong Google. Dữ liệu chuẩn hóa là dữ liệu chờ xác minh, chưa phải danh sách tồn chính thức.

Hướng dẫn: [Triển khai Google](docs/TRIEN_KHAI_GOOGLE.md), [Vận hành](docs/VAN_HANH.md), [Kiểm thử và giới hạn](docs/KIEM_THU.md).

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `apps-script/` | Quy tắc, lớp lưu Google Sheets, giao diện, tự động hóa và đăng nhập |
| `worker/app.py` | Dịch vụ PDF riêng tư có token, SQLite lưu tác vụ |
| `tools/normalize.py` | Chuyển đổi Excel, kiểm kê và xuất gói nhập |
| `tools/build.py` | Tạo `Code.gs` gộp một file và ZIP mã nguồn không chứa dữ liệu cá nhân |
| `tools/prepare_ocr.py` | Cài dữ liệu OCR tiếng Việt tại thư mục riêng, kiểm tra SHA-256 |
| `tests/` | Nghiệp vụ, dịch vụ Google giả lập, PDF/OCR, chuyển đổi và trình duyệt |
| `output/` | Đầu ra riêng tư, được bỏ qua bởi Git |

## Phát triển và kiểm thử

Dùng checkout hiện tại trong `/workspace/codex_be`; task cloud đã được cô lập, không cần tạo worktree khác.

```bash
cd /workspace/codex_be
python -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/python tools/prepare_ocr.py
npm test
npm run check
.venv/bin/python -m unittest discover -s tests -p 'test_*.py' -v
```

OCR cần `pdftoppm`, `tesseract`, dữ liệu eng/osd và phông DejaVu. Cài các gói hệ thống tương ứng từ nguồn tin cậy nếu máy chưa có. Kiểm thử trình duyệt cần Playwright và Chromium (môi trường Codex hiện có):

```bash
node tools/demo.cjs
# Trong terminal khác, tại cùng thư mục:
node tests/browser.cjs
```

Demo chỉ bind loopback, không đưa dữ liệu thật vào demo. Bộ mô phỏng không phải backend dùng vận hành.

Chuẩn hóa và tạo gói:

```bash
python tools/normalize.py /duong-dan/file1.xlsx /duong-dan/file2.xlsx --out output
python tools/build.py
```

Không commit XLSX, migration JSON, tệp gốc, `.env`, khóa, token hay SQLite. Không chạy `initializeEnvironment` vào dự án đã khởi tạo; hàm sẽ từ chối ghi đè.
