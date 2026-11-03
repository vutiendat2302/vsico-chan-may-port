---
description: Kiểm toán toàn bộ codebase để phát hiện các vấn đề về dữ kiện, câu từ và bản địa hóa trước khi phát hành
---

# Quy trình: Kiểm Toán Nội Dung (Content Audit)

Chạy trước khi phát hành (release) hoặc bất cứ khi nào câu từ hoặc dữ liệu có sự thay đổi.

1. **Dữ liệu thực tế.** So sánh từng con số được render trên trang web với `03-content-integrity.md` và `src/data/`. Liệt kê mọi điểm không khớp kèm tên file và dòng cụ thể.
2. **Giá trị hard-code.** Tìm kiếm trong các component xem có con số nghiệp vụ hoặc câu văn tiếng Việt/tiếng Anh nào đi tắt mà không qua `src/data/` hoặc `next-intl` hay không.
3. **Từ ngữ bị cấm.** Tìm kiếm trên cả hai ngôn ngữ các từ: exclusive, monopoly, shortest, lowest, fastest, cùng các từ tiếng Việt tương đương (độc quyền, duy nhất, ngắn nhất, rẻ nhất/thấp nhất, nhanh nhất). Xóa bỏ hoặc giải trình cho từng trường hợp phát hiện.
4. **Ghi nhãn.** Xác nhận biểu đồ sản lượng và doanh thu được ghi nhãn là số liệu của toàn tập đoàn (whole-group), và khu vực logo ghi đúng là "khách hàng" (customers).
5. **Các mục chờ xác nhận.** Xác nhận mọi mục có `status: "pending"` đều được ẩn trên môi trường production: Door to Door, logo khách hàng, hiệu lực chính sách, ngày cụ thể của các mốc sự kiện.
6. **Tính tương đồng giữa các ngôn ngữ.** Xác nhận `vi.json` và `en.json` có cùng tập hợp các key và không có giá trị nào bị bỏ trống.
7. **Ngày tháng.** Xác nhận trạng thái timeline và đồng hồ đếm ngược được tính toán chuẩn từ `src/data/timeline.ts` và chỉ hiển thị tháng cùng năm.
8. **Báo cáo kết quả.** Lập bảng các phát hiện kèm mức độ nghiêm trọng (blocker, fix soon, nice to have) và giải pháp xử lý chính xác cho từng mục.
