# Kích hoạt Google Sheets và Apps Script

## Điều kiện hiện tại

Tab Gmail ở trình duyệt cá nhân không chia sẻ phiên đăng nhập với Codex. Phiên này không có browser-control hoặc Google connector để tạo Sheet, cấp OAuth hay triển khai thay người dùng. Các bước dưới là bước kích hoạt bằng tài khoản sở hữu, không phải yêu cầu duyệt lại kế hoạch. Không cần gửi mật khẩu, mã OTP hoặc khóa mới vào chat.

## 1. Tạo ứng dụng từ một file

1. Mở `script.google.com` bằng tài khoản Google sẽ sở hữu hệ thống; tạo dự án mới.
2. Chép toàn bộ nội dung `output/Code.gs` vào `Code.gs` của dự án mới. File này chứa đủ giao diện và logic; không cần tạo từng file HTML riêng.
3. Nếu dùng bộ nguồn nhiều file thay vì file gộp: tạo các file trong `apps-script/`, bao gồm `Auth.gs` và `Index.html`. Không chép cả bản gộp lẫn bản nhiều file vào cùng dự án.
4. Chạy `initializeEnvironment` trong trình soạn thảo. Google sẽ yêu cầu người sở hữu cho phép các quyền cần thiết. Đọc phạm vi và cấp cho đúng dự án do mình vừa tạo; không vượt qua chính sách chặn của cơ quan.
5. Nhật ký thực thi hiển thị URL Google Sheets và thư mục Drive đã tạo. Tài nguyên mới riêng tư, chưa chia sẻ công khai. Thủ tục mẫu chưa kích hoạt; email và đăng nhập mã email đều tắt.

Nếu dùng manifest có sẵn, đặt múi giờ Asia/Ho_Chi_Minh. Bản gộp cũng định dạng mốc thời gian theo múi giờ này. Quyền thực tế gồm Sheets, Drive, gọi worker HTTPS, gửi email, cài time trigger và đọc email tài khoản hiện tại. **Không có quyền đọc nội dung Gmail.** Drive scope rộng do DriveApp cần quản lý thư mục/tài liệu; quyền nghiệp vụ trong app được kiểm tra riêng.

## 2. Triển khai bản riêng tư cho người sở hữu

Trong Deploy → New deployment → Web app:

- Execute as: tài khoản sở hữu (Me).
- Bản thử đầu tiên: chỉ mình người sở hữu được truy cập.
- Mở URL bản triển khai, kiểm tra đăng nhập và trang Quản trị. Không chia sẻ trực tiếp file dữ liệu cho cán bộ nếu cần giới hạn xem hồ sơ.

Không fallback email chủ ứng dụng khi Google không cung cấp email người truy cập. Nếu gặp lỗi danh tính, sử dụng mã email theo bước 3. Việc “execute as user” và chia sẻ toàn bộ bảng dữ liệu không thay thế kiểm soát từng hồ sơ.

## 3. Thêm cán bộ và chọn cách đăng nhập

Trong Quản trị, thêm email thật, họ tên, vai trò và trạng thái hoạt động. Không dùng tên cán bộ trong Excel để tự tạo tài khoản/email.

**Workspace cùng cơ quan:** có thể dùng Google identity nếu bản triển khai thực sự cung cấp email đúng từng người. Giới hạn quyền truy cập bản triển khai trong cơ quan khi có tùy chọn phù hợp. Kiểm tra bằng ít nhất hai tài khoản và xác nhận không ai bị nhận nhầm thành chủ ứng dụng.

**Gmail cá nhân hoặc Google identity trống:** ứng dụng có đăng nhập mã email. Quản trị viên bật “Đăng nhập bằng mã email” trong Cấu hình. Sau đó chọn phạm vi truy cập Web app phù hợp để cán bộ mở được trang đăng nhập (có thể cần Anyone theo tùy chọn tài khoản). **Trang có thể mở không có nghĩa dữ liệu công khai:** mọi API hồ sơ đều yêu cầu Google identity được cấp quyền hoặc token đã xác thực email. Không chia sẻ công khai workbook/Drive.

Nếu bản triển khai không cho chủ tài khoản vào giao diện để bật mã email, người sở hữu vào Project Settings → Script Properties, đặt `EMAIL_LOGIN_ENABLED=true`; không sửa cơ chế nhận diện để dùng email chủ dự án cho người khác.

Mã gửi chỉ tới email đang hoạt động trong danh sách cán bộ, hiệu lực tối đa 10 phút, một lần sử dụng, tối đa 5 lần thử. Giới hạn 3 yêu cầu/email/15 phút và 30 yêu cầu toàn ứng dụng/15 phút. Phiên tối đa 6 giờ, có thể hết sớm khi cache bị thu hồi. Tắt tài khoản có hiệu lực ở yêu cầu tiếp theo; đổi mật khẩu Google không tự xóa phiên OTP hiện tại, vì vậy cần tắt tài khoản nếu nghi ngờ.

Giữ người có quyền sửa Apps Script ở nhóm quản trị tin cậy: họ có thể đọc Script Properties và can thiệp ứng dụng. Hạn mức gửi email Apps Script áp dụng cho cả OTP và nhắc việc; cần kiểm tra hạn mức thực tế của tài khoản trước khi mở cho nhiều cán bộ. Chính sách Workspace có thể chặn triển khai hoặc gửi email; cần quản trị cơ quan xử lý nếu gặp chặn.

## 4. Danh mục và dữ liệu cũ

1. Duyệt tên/mã thủ tục và quy tắc; thủ tục mẫu trong mã không phải danh mục pháp lý đã xác nhận.
2. Tải hai file nguồn, `source_audit.jsonl`, file Excel chuẩn hóa và `migration.json` vào thư mục Drive riêng tư để lưu hồ sơ chuyển đổi.
3. Mở Quản trị → Nhập JSON đã chuẩn hóa → nhập Drive file ID của `migration.json` → Nhập từ Drive. Khuyến nghị cách này cho toàn bộ dữ liệu; mã ghi nhật ký theo lô và dựng bảng một lần. Chưa đo thời gian/hạn mức trên Google thật.
4. Có thể dùng cách chọn file JSON nhập nhiều lô nhỏ nếu cần; chậm hơn. Cả hai cách có thể chạy lại mà không nhân đôi ID. Khi mã DVC đã có ở ID khác, dừng để đối soát, không ghi đè.
5. Mở Đối soát; kiểm tra dữ liệu cũ, liên kết thông tin chuyên môn, hợp nhất bản trùng thiếu mã khi có căn cứ. Chỉ hợp nhất hai hồ sơ UNVERIFIED; không hợp nhất hai mã DVC khác nhau.
6. Xác minh từng hồ sơ: đang mở hay đã đóng trong quá khứ. Hồ sơ đóng cũ cần đủ ngày kết quả, ngày trả, loại kết quả và nguồn; không tạo sự kiện “trả hôm nay” cho hồ sơ đã trả từ trước.
7. Cập nhật dashboard trong Google Sheets từ Quản trị. Dashboard giao diện được cập nhật khi tải lại; tab Dashboard trong Sheet cập nhật theo nút này, không hứa cập nhật tức thời khi sửa trực tiếp bảng.

Các cột `row_json` và NHAT_KY là dữ liệu phục vụ ứng dụng. Không sửa/xóa trực tiếp, không đổi tiêu đề hoặc sắp xếp riêng một phần cột. Thao tác qua giao diện; chủ file vẫn có khả năng sửa dữ liệu nên đây không phải nhật ký chống can thiệp cấp pháp lý.

## 5. Bật email và trigger

Ban đầu email không gửi. Thêm cán bộ thật, bật nhận nhắc việc cho từng người; xem trước nội dung rồi bật nhắc việc toàn ứng dụng. Trong Cấu hình chọn cài trigger để tạo lịch email khoảng 8 giờ sáng theo múi giờ Việt Nam và kiểm tra PDF khoảng mỗi 10 phút. Trigger theo thời gian Google không bảo đảm chạy đúng từng giây/phút.

Không cần cho app đọc hộp thư. Email nhắc việc chỉ có mã và việc cần kiểm tra, không chứa tên/điện thoại. Lượt gửi không chắc chắn giữ trạng thái UNCERTAIN để kiểm tra, không tự gửi lại. Giới hạn 30 cán bộ/lần chạy; quy mô lớn hơn cần điều chỉnh theo hạn mức và kiểm thử riêng.

## 6. Worker PDF và model

Chạy worker bằng tài khoản thường trên máy chủ có nơi lưu dữ liệu bền vững:

```bash
python -m venv .venv
.venv/bin/pip install -r worker/requirements.txt
.venv/bin/python tools/prepare_ocr.py
# Nạp WORKER_TOKEN, MODEL_BASE_URL, MODEL_API_KEY, MODEL_NAME và OCR_TESSDATA_DIR
# từ secret store hoặc dịch vụ quản lý biến môi trường. Không dán khóa vào lệnh/chat.
.venv/bin/python -m uvicorn worker.app:app --host 127.0.0.1 --port 8765
```

Đặt reverse proxy HTTPS có chứng chỉ hợp lệ phía trước worker, không công khai cổng loopback. Cho phép Apps Script kết nối URL này; token worker riêng với khóa model, tối thiểu 24 ký tự. Giới hạn tải lên 10 MB ở reverse proxy và worker. Cấu hình khởi động lại dịch vụ, giám sát, sao lưu SQLite và thư mục PDF. Giữ thư mục PDF/cache trên ổ được bảo vệ; quy định thời gian lưu và xóa theo chính sách cơ quan.

Endpoint model được cung cấp trong hội thoại dùng HTTP và khóa đã được chia sẻ. Chưa gọi endpoint đó. Cần thay khóa, cung cấp HTTPS/tuyến bảo vệ hợp lệ và xác nhận tên model. `MODEL_BASE_URL` là URL HTTPS kết thúc `/v1`; worker gọi `/chat/completions`. Dùng `MODEL_JSON_MODE=false` chỉ khi API không hỗ trợ response_format; vẫn bắt buộc kiểm tra JSON và schema. Không tắt TLS để kết nối.

Trong Quản trị, lưu URL HTTPS và token worker (không phải model key). Tải PDF mẫu → quét/kiểm tra tác vụ → đối chiếu kết quả trong hàng chờ → duyệt. PDF scan dùng Tesseract vie+eng; tối đa 30 trang, 90.000 ký tự/tác vụ. Tệp có mật khẩu hoặc vượt giới hạn được báo lỗi. Thử lại sau khi đã sửa nguyên nhân từ nút Thử lại.

Phải thử phiếu/biên lai thực tế trước khi nghiệm thu. Bộ kiểm thử hiện tại chỉ xác nhận OCR trên tài liệu tổng hợp và model qua phản hồi mô phỏng, chưa xác nhận chất lượng model của người dùng.

## 7. Những xác nhận bắt buộc của người sở hữu

- Đăng nhập Google, xác minh tài khoản nếu Google yêu cầu và chấp thuận OAuth lần đầu.
- Chọn cách triển khai phù hợp với chính sách tài khoản/cơ quan.
- Nhập bí mật qua cấu hình an toàn, xác nhận danh mục/quy tắc hạn và cán bộ thật.

Đây là điều kiện kỹ thuật/quyền tài khoản; việc đã cho phép Codex thao tác không tạo ra phiên đăng nhập Google hoặc token OAuth trong môi trường này.
