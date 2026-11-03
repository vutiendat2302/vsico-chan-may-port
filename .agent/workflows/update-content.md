---
description: Cập nhật dữ kiện, số liệu hoặc câu từ an toàn trên toàn bộ data và cả hai ngôn ngữ
---

# Quy trình: Cập Nhật Nội Dung (Update Content)

Sử dụng khi có sự thay đổi về con số, tên gọi, ngày tháng, chính sách hoặc câu từ.

1. **Xác định nguồn gốc.** Hỏi người dùng nguồn gốc của giá trị mới đến từ đâu (tài liệu công ty, thông báo xác nhận). Nếu không có nguồn, hãy dừng lại và yêu cầu cung cấp nguồn.
2. **Tìm tất cả vị trí sử dụng.** Tìm kiếm trong repo giá trị cũ cùng các biến thể được định dạng của nó (ví dụ: `210`, `210.000.000`, `210,000,000`).
3. **Chỉnh sửa nguồn chân lý duy nhất** trong `src/data/` trước tiên. Các component bắt buộc phải import, tuyệt đối không sao chép lại giá trị.
4. **Cập nhật câu từ hiển thị** trong cả hai file `vi.json` và `en.json` cùng lúc. Luôn giữ hai file này đồng bộ.
5. **Kiểm tra nội dung phái sinh.** Các bộ đếm, công cụ tính toán, biểu đồ, trạng thái timeline và đồng hồ đếm ngược phải tiếp tục tính toán chính xác.
6. **Cập nhật trạng thái.** Nếu mục đó trước đây là `pending` và hiện đã được xác nhận, hãy đặt `status: "confirmed"` và cập nhật bảng trong `README.md` (Content Status) cũng như trong `03-content-integrity.md`.
7. **Chạy** quy trình `content-audit` trên các file bị tác động.
8. **Báo cáo** giá trị cũ, giá trị mới, nguồn xác nhận và danh sách các file đã thay đổi.
