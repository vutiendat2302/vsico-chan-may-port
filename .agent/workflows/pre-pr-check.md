---
description: Cổng kiểm soát chất lượng cần thực hiện trước khi tạo pull request
---

# Quy trình: Kiểm Tra Trước PR (Pre-PR Check)

1. **Kiểm tra tĩnh.** Chạy `pnpm lint` và `pnpm typecheck`. Khắc phục toàn bộ lỗi.
2. **Build.** Chạy `pnpm build`. Sửa tất cả các lỗi phát sinh; không được bỏ qua hoặc che giấu lỗi.
3. **Đáp ứng giao diện (Responsive).** Kiểm tra giao diện đã thay đổi ở các độ phân giải 375px, 768px và 1440px. Không bị cuộn ngang, không bị đè hoặc cắt dấu tiếng Việt.
4. **Đa ngôn ngữ.** Chuyển đổi qua lại giữa `/vi` và `/en`. Không có key nào bị thiếu, không có chuỗi nào chưa được dịch.
5. **Hoạt ảnh.** Bật chế độ reduced motion trong hệ điều hành hoặc trình duyệt. Xác nhận các hiệu ứng suy biến an toàn về nội dung tĩnh và video không tự động phát.
6. **Khả năng tiếp cận (a11y).** Dùng phím Tab duyệt qua giao diện đã thay đổi. Kiểm tra thứ tự focus, trạng thái focus nhìn thấy được, văn bản `alt`, thứ tự tiêu đề và độ tương phản màu sắc.
7. **Hiệu năng.** Kiểm tra các tệp đa phương tiện mới đã được nén và dùng `next/image`; các component nặng được import động (`dynamic`). Không commit tài nguyên thô vào kho lưu trữ.
8. **Nội dung.** Chạy quy trình `content-audit` trên các file bị thay đổi.
9. **Vệ sinh mã nguồn.** Không còn lệnh `console.log`, không còn code bị chú thích, không có dependency thừa thãi.
10. **Mô tả PR.** Viết tóm tắt nội dung PR theo định dạng Conventional Commits, kèm ảnh chụp màn hình (screenshot) cho các thay đổi UI và danh sách bất kỳ mục nào đang chờ xác nhận có bị tác động.
