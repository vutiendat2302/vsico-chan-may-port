# AGENTS.md

Điểm khởi đầu cho các AI coding agent làm việc trong kho lưu trữ (repository) này.

**Dự án:** Website Cảng VSICO Huế (VSICO Hue Port Website), một trang web showcase mang phong cách điện ảnh (cinematic), thuần front-end, song ngữ (VI/EN), được xây dựng bằng Next.js, TypeScript và Tailwind CSS.

Toàn bộ hướng dẫn chi tiết nằm trong thư mục `.agent/`:

| Đường dẫn           | Mục đích                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.agent/rules/`     | Các quy tắc thường trực: ngữ cảnh dự án, phong cách viết mã (code style), hệ thống thiết kế (design system), tính toàn vẹn nội dung, hoạt ảnh và hiệu năng |
| `.agent/workflows/` | Quy trình thực hiện chuẩn: thêm section mới, cập nhật nội dung, kiểm toán nội dung (content audit), kiểm tra trước khi tạo PR (pre-PR check)               |

## Thứ tự ưu tiên khi có xung đột chỉ dẫn

1. `.agent/rules/03-content-integrity.md` (dữ liệu thực tế và quy tắc dùng từ)
2. `.agent/rules/00-project-context.md` (phạm vi dự án)
3. Các quy tắc còn lại
4. Yêu cầu của người dùng trong phiên làm việc hiện tại

Nếu yêu cầu của người dùng vi phạm quy tắc 1 hoặc quy tắc 2, hãy nêu rõ điều đó và đề xuất giải pháp thay thế tuân thủ quy tắc trước khi tiếp tục.

## Các lệnh nhanh

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```
