---
description: Ngôn ngữ thị giác, màu sắc, kiểu chữ và nhịp điệu bố cục. Áp dụng cho mọi công việc giao diện (UI).
---

# Hệ thống thiết kế (Design System)

## Định hướng thiết kế

**Sang trọng đậm chất điện ảnh (Cinematic luxury).** Tối giản cao cấp (premium minimalism), đa phương tiện tràn màn hình (full-bleed media), độ tương phản mạnh, dẫn chuyện theo thao tác cuộn (scrollytelling), kiểu chữ mang tính biên tập xuất bản (editorial typography), đánh dấu section bằng chữ số La Mã.

## Cân bằng sáng / tối (Dark / light balance)

- Hero và một số section "tuyên ngôn" lớn: lớp phủ tối (dark overlay) trên video hoặc hình ảnh, chữ trắng.
- Các section chứa nhiều dữ liệu (chính sách, thông số kỹ thuật, biểu đồ, chứng chỉ): **nền trắng, điểm nhấn màu tím đậm**, chữ tối màu.
- Không bao giờ đặt nội dung văn bản trên hình ảnh nhiều chi tiết mà không có lớp phủ đảm bảo độ tương phản đạt chuẩn WCAG AA trở lên.

## Token màu sắc (Color tokens)

Định nghĩa một lần trong `src/styles/globals.css`. Các component chỉ được tham chiếu qua token.

| Token               | Hướng dẫn sử dụng                                                  |
| ------------------- | ------------------------------------------------------------------ |
| `--color-primary`   | Màu tím đậm, khoảng `#4C1D95` đến `#6D28D9`. Màu thương hiệu VSICO |
| `--color-ink`       | Xanh navy gần đen cho các section tối và lớp phủ video             |
| `--color-surface`   | Trắng cho các section dữ liệu                                      |
| `--color-muted`     | Xám trung tính cho văn bản phụ                                     |
| `--color-highlight` | Vàng kim ấm hoặc hổ phách, dùng tiết chế (bộ đếm, điểm nhấn nhỏ)   |

## Kiểu chữ (Typography)

| Vai trò                                      | Font chữ         |
| -------------------------------------------- | ---------------- |
| Tiêu đề (Headings)                           | Playfair Display |
| Nội dung chính (Body)                        | Be Vietnam Pro   |
| Nhãn, khẩu hiệu, chữ in hoa nhỏ (small caps) | Montserrat       |

- Tải font qua `next/font/google` với các tập con `["latin", "vietnamese"]`. Thiếu tập con tiếng Việt sẽ khiến dấu thanh bị rơi về font hệ thống.
- Chiều cao dòng của tiêu đề (`line-height`) từ 1.2 trở lên để tránh các dấu thanh tiếng Việt xếp chồng bị đè lên nhau.
- Giới hạn tối đa 3 font chữ và khoảng 3 độ đậm (weight) trên toàn trang web.
- Kiểm tra các tiêu đề viết hoa tiếng Việt để tránh dấu bị cắt bớt hoặc va chạm.

## Nhịp điệu bố cục (Layout rhythm)

- Mỗi section truyền tải một ý tưởng chính và tối đa khoảng 3 dòng văn bản giới thiệu. Chi tiết đưa vào thẻ (card), tab hoặc hộp thoại (dialog).
- Mỗi section chính được đánh dấu bằng một chữ số La Mã lớn (I, II, III...).
- Khoảng cách dọc rộng rãi, thoáng đãng; chiều rộng khung chứa (container) và khoảng đệm ngang (horizontal padding) đồng nhất.

## Component

- Sử dụng các thành phần nguyên mẫu của shadcn/ui (Tabs, Dialog, Accordion) và định kiểu lại theo token. Không sửa đổi hành vi gốc của chúng.
- Các phần tử tương tác bắt buộc phải có trạng thái focus nhìn rõ được và hỗ trợ điều hướng bằng bàn phím.
