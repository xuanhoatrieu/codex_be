# Bằng chứng kiểm thử và phần còn chờ

## Đã kiểm thử trong môi trường hiện tại

- `npm test`: quy tắc nghiệp vụ và API chạy với Google-service test doubles. Bao gồm bàn giao hai chiều, vai trò, danh tính trống, bản ghi đồng thời, request lặp, ghi gián đoạn, nhập lặp, nhập lô Drive, duyệt biên lai, đối chiếu kỳ và mã đăng nhập email.
- `npm run check`: cú pháp Apps Script, JavaScript giao diện và manifest.
- `python -m unittest discover -s tests -p 'test_*.py' -v`: chuyển đổi ngày/đoạn dịch cột, mã lặp/nhiều thửa, ID ổn định, PDF văn bản, OCR tiếng Việt trên scan tổng hợp, API worker có token/checksum/chống trùng và kiểm tra bằng chứng model.
- `node tests/browser.cjs`: Chromium chạy toàn luồng từ tiếp nhận đến trả công dân qua các tài khoản giả; kiểm tra desktop/mobile và lỗi JavaScript. UI dùng cùng mã Apps Script nhưng dịch vụ Google là giả lập.
- Công cụ chuẩn hóa đã thực thi trên cả hai file nguồn. Giữ mọi dòng nguồn không trống kể cả công thức, có file/sheet/dòng và SHA-256. Đầu ra nhạy cảm nằm trong `output/`, không đưa vào ZIP mã nguồn.

Chạy lại các lệnh để lấy số lượng và kết quả mới nhất, xem báo cáo bàn giao trong `output/`.

## Chưa được xác nhận

| Hạng mục | Điều kiện cần để kiểm tra |
|---|---|
| Tạo Google Sheet/Drive và chạy Apps Script thật | Đăng nhập tài khoản sở hữu, OAuth, triển khai dự án |
| Xác định email Google/đăng nhập mã email thật | Hai tài khoản được phân quyền, hạn mức MailApp và khả năng nhận thư |
| Email nhắc, trigger và biểu đồ trong Sheet | Kích hoạt trong tài khoản Google và kiểm tra kết quả thực |
| Nhập toàn bộ dữ liệu trên Google | Drive file ID của migration.json, đo thời gian và hạn mức |
| Worker trên HTTPS công khai | Nơi chạy bền vững, reverse proxy TLS và token riêng |
| Model người dùng | Endpoint an toàn, khóa mới, tên model và phản hồi thực |
| Chất lượng PDF dịch vụ công | Phiếu/biên lai thật có đáp án đối soát |
| Trạng thái pháp lý và danh mục thủ tục | Người nghiệp vụ duyệt dữ liệu và quy tắc |

Không coi kiểm thử mô phỏng là chứng minh tích hợp Google hoặc model đang hoạt động. Không gửi email thật trong các lần kiểm thử hiện tại. Mã có đủ các mô-đun nêu trên nhưng chưa được nghiệm thu vận hành thực tế.
