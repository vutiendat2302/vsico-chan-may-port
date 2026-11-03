---
description: Xây dựng một section trang mới từ đầu đến cuối (dữ liệu, câu từ, component, hoạt ảnh, đánh giá)
---

# Quy trình: Thêm Section Mới (New Section)

Sử dụng khi thêm mới hoặc xây dựng lại một trong các section của trang.

1. **Xác nhận yêu cầu tóm tắt (brief).** Xác định số thứ tự của section, tiêu đề, mục đích và ý tưởng trọng tâm duy nhất. Đọc kỹ `00-project-context.md` và `03-content-integrity.md`.
2. **Định nghĩa dữ liệu trước.** Tạo hoặc cập nhật file có định kiểu (typed) trong `src/data/`. Mọi con số phải lấy từ danh sách đã kiểm chứng hoặc file dữ liệu có sẵn. Đánh dấu bất kỳ mục nào chưa kiểm chứng bằng `status: "pending"`.
3. **Soạn thảo câu từ (copy).** Thêm các key vào cả hai file `src/messages/vi.json` và `src/messages/en.json` dưới namespace của section tương ứng. Giới hạn đoạn văn giới thiệu trong khoảng 3 dòng; đưa chi tiết vào thẻ (card), tab hoặc hộp thoại (dialog).
4. **Xây dựng component** trong `src/components/sections/<SectionName>.tsx`.
   - Mặc định là Server Component; cô lập các phần client.
   - Sử dụng các token thiết kế, chữ số La Mã định danh và các thành phần nguyên mẫu của shadcn/ui.
5. **Thêm hoạt ảnh** bằng các wrapper từ `src/components/motion/`. Triển khai phương án dự phòng cho `prefers-reduced-motion` ngay trong cùng một thay đổi.
6. **Ghép nối (compose)** section vào `src/app/[locale]/page.tsx` theo đúng thứ tự.
7. **Kiểm tra hiển thị** ở các kích thước 375px, 768px và 1440px. Kiểm tra dấu tiếng Việt, cả hai ngôn ngữ, và khả năng điều hướng bằng bàn phím.
8. **Chạy** quy trình `pre-pr-check`.
9. **Tóm tắt** những gì đã thay đổi và liệt kê các mục đang chờ xác nhận có bị tác động hay không.
