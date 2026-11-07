# Hướng dẫn vận hành

## Phân vai

| Vai trò | Quyền |
|---|---|
| ADMIN | Cấu hình, danh mục, cán bộ, chuyển đổi, hợp nhất, toàn bộ hồ sơ |
| MANAGER | Theo dõi tổng, giao việc, điều chỉnh hạn, mở lại, chốt kỳ |
| FRONT | Tiếp nhận, bàn giao, nhận kết quả, trả công dân, biên lai, duyệt dữ liệu/PDF |
| SPECIALIST | Hồ sơ đang phụ trách hoặc có công việc/tham gia bàn giao; xử lý công việc được giao |

Quyền xem bao gồm người đã tham gia công việc hoặc bàn giao để tra cứu lịch sử; nếu cơ quan cần thu hồi quyền xem ngay khi chuyển cán bộ thì phải điều chỉnh chính sách này và kiểm thử riêng. Quyền sửa còn kiểm tra người đang phụ trách, người được giao và bước hiện hành. Đừng chia sẻ trực tiếp file nguồn/Script với người chỉ cần dùng giao diện.

## Một hồ sơ mới

1. Một cửa chọn Tiếp nhận, nhập mã (nếu đã có), người nộp, thủ tục được duyệt, ngày nhận, hạn chính thức và căn cứ. Điện thoại/thửa/tờ lưu văn bản; có thể lưu nhóm thửa chưa tách được.
2. Tại chi tiết hồ sơ, Bàn giao chuyên môn, chọn người nhận và ghi thành phần. Hồ sơ vẫn thuộc người giao tới khi người nhận xác nhận.
3. Người nhận mở Bàn giao, Xác nhận nhận; nếu thiếu/sai thì Không nhận và ghi lý do. Hệ thống trả về bước trước, không giả định đã nhận.
4. Người phụ trách hoặc quản lý Giao công việc. Cán bộ cập nhật Chưa bắt đầu / Đang làm / Đang chờ / Hoàn thành / Hủy có lý do. Đang chờ phải có nguyên nhân; hoàn thành phải có kết quả.
5. Sau khi công việc đã hoàn thành/hủy có lý do, ghi kết quả chuyên môn và văn bản. Chọn rõ cấp kết quả, từ chối hoặc công dân rút.
6. Bàn giao kết quả cho cán bộ một cửa; một cửa xác nhận nhận; cuối cùng ghi ngày trả và chứng từ/người nhận.

Không ghi ngày sự kiện thực tế ở tương lai. Điều chỉnh hạn giữ lại hạn gốc và ghi căn cứ. Mở lại giữ lịch sử cũ trong nhật ký, nhưng xóa các mốc kết thúc trên trạng thái hiện hành; mã DVC mới thì tạo hồ sơ khác và ghi nguồn liên quan, không hợp nhất hai mã khác nhau.

## Tiến độ cán bộ và kỳ báo cáo

Hồ sơ đang chủ trì, công việc đang mở, công việc quá hạn, chờ nhận bàn giao và hồ sơ 7 ngày chưa cập nhật là chỉ số hiện tại. Hoàn thành công việc trong kỳ tính theo công việc hiện có trạng thái DONE; nếu việc được mở lại, nó không còn được tính là đã hoàn thành hiện hành. Lượt hoàn thành trong kỳ đếm nhật ký và được báo riêng.

Tồn đầu/cuối kỳ và các biến động tính theo nhật ký **ghi nhận trong hệ thống**, không dựng lịch sử trước khi triển khai. Xác minh hồ sơ lịch sử đang mở là một khoản bổ sung tồn riêng; xác minh hồ sơ đã đóng cũ không tạo lượt trả công dân hôm nay. Hồ sơ UNVERIFIED/MERGED không nằm trong tồn chính thức. Báo cáo kỳ đã chốt giữ bản dữ liệu báo cáo, không tự thay đổi theo lần chỉnh sửa sau; chủ Sheet vẫn có thể can thiệp nên không phải chứng từ bất biến.

Không dùng một điểm tổng hợp để xếp hạng cán bộ. So sánh cùng thủ tục, khối lượng, công việc và nguyên nhân chờ. Các việc thẩm tra, niêm yết, thuế… được tạo thành nhiều công việc, có thể đồng thời hoặc lặp lại; chưa ép thành một thứ tự cứng cho tất cả thủ tục.

## Dữ liệu cũ

- Excel chuẩn hóa và migration JSON cùng giữ trạng thái UNVERIFIED. Các cờ cũ và người xử lý cũ nằm trong hàng đối soát, chưa gán thành người phụ trách hiện hành.
- Liên kết mục chuyên môn vào hồ sơ đã kiểm tra bằng ID và ghi kết luận. Phần gợi ý không tự ghi đè dữ liệu chính thức.
- Hồ sơ thiếu mã có thể còn trùng nhau. Chỉ quản trị được hợp nhất hai bản UNVERIFIED có căn cứ. Hai mã khác nhau phải giữ riêng.
- Xác minh hồ sơ đang mở hoặc đã đóng trong quá khứ. Không chọn “đang mở” chỉ vì thiếu ngày trả trong file cũ.
- Các dòng chưa phân loại nằm trong DU_LIEU_GOC/source_audit; rà soát chúng trước khi chốt chuyển đổi, không bỏ qua vì không có STT.

## PDF và chứng từ

Tải PDF hoặc đặt vào inbox Drive. Bật worker/triggers hoặc dùng Quét thư mục và Kiểm tra tác vụ. Mở PDF gốc và đối chiếu JSON/bằng chứng; chọn tạo hồ sơ, ghi khoản thu, gắn tài liệu hoặc điều chỉnh hạn. Chỉ phiếu tiếp nhận được tạo hồ sơ; chỉ biên lai được ghi khoản thu; điều chỉnh hạn cần đúng loại văn bản và quyền quản trị.

Biên lai phải chọn hồ sơ đích, số biên lai, ngày, khoản thu và tiền VND. Không tự kết thúc hồ sơ từ biên lai. Không tự động duyệt PDF; nội dung tài liệu không được dùng làm lệnh chạy công cụ.

PDF được xem qua API ứng dụng có kiểm tra quyền, không cần chia sẻ công khai Drive. Việc gắn Drive file ID bên ngoài đòi tài khoản sở hữu ứng dụng có quyền đọc file đó. Xem qua ứng dụng chỉ hỗ trợ PDF tối đa 10 MB; tài liệu định dạng khác cần quyền Drive phù hợp.

## Vận hành và khôi phục

- Tạo bản sao workbook và thư mục Drive theo lịch của cơ quan; kiểm tra khôi phục trên bản sao, không trên dữ liệu đang dùng.
- Sao lưu database SQLite và PDF worker nhất quán; worker lưu hàng đợi bền vững và tiếp tục tác vụ chưa xong khi khởi động lại.
- Nếu giao diện báo hồ sơ vừa thay đổi, tải lại và đối chiếu, không cố ghi bằng phiên bản cũ.
- Nếu ghi bảng bị gián đoạn, yêu cầu tiếp theo sẽ phát lại nhật ký chưa dựng bảng xong. Nếu nhật ký/bảng bị người dùng sửa tay hoặc xóa thì cần khôi phục backup, không chạy khởi tạo lại.
- Không xóa hàng lịch sử để “sửa số liệu”. Ghi sự kiện sửa, lý do và nguồn. Không cấp quyền sửa Script/Sheet cho tất cả cán bộ.
- Khi ứng dụng tăng lưu lượng hoặc nhật ký lớn, đo thời gian đọc/ghi và hạn mức; kiến trúc hiện đọc các bảng và nhật ký khi gọi API nên cần nâng cấp lưu trữ khi vượt quy mô phù hợp. Chưa benchmark trên Google thật.
