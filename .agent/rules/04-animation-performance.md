---
description: Quy tắc về hoạt ảnh, đa phương tiện, hiệu năng và khả năng tiếp cận. Áp dụng khi can thiệp vào chuyển động, video, hình ảnh, bản đồ hoặc biểu đồ.
---

# Hoạt ảnh, Hiệu năng và Khả năng tiếp cận (Animation, Performance & Accessibility)

## Hoạt ảnh (Animation)

- Đăng ký plugin GSAP và ScrollTrigger **một lần duy nhất** trong `src/lib/gsap.ts`. Tuyệt đối không đăng ký plugin bên trong component.
- Khởi tạo Lenis một lần ở cấp layout và đồng bộ hóa với ScrollTrigger.
- Tái sử dụng các wrapper từ `src/components/motion/` (Reveal, Counter, Countdown) thay vì tự viết tween lẻ tẻ.
- Bọc mã GSAP trong `gsap.context()` và gọi `ctx.revert()` khi unmount.
- Chỉ tạo hoạt ảnh cho thuộc tính `transform` và `opacity`. Không tạo chuyển động cho `width`, `height`, `top` hoặc `left`.
- Các section được cố định vị trí (pinned) cần có phương án dự phòng cho thiết bị di động. Luôn kiểm tra kỹ trên màn hình hẹp.

## Chế độ giảm chuyển động (Reduced motion - bắt buộc)

Tuân thủ thuộc tính `prefers-reduced-motion`: vô hiệu hóa pinning, parallax, hiệu ứng gắn liền với cuộn chuột và tính năng tự động phát video; thay vào đó hiển thị trạng thái tĩnh cuối cùng.

## Đa phương tiện (Media)

- Video Hero: Định dạng MP4 + WebM, nén dung lượng xuống vài MB, tắt tiếng (muted), lặp lại (loop), kèm ảnh đại diện (`poster`). Tuyệt đối không tự động phát khi người dùng bật chế độ reduced motion.
- Hình ảnh: Dùng `next/image`, định dạng WebP, khai báo kích thước rõ ràng để tránh hiện tượng dịch chuyển bố cục (layout shift).
- **Không bao giờ commit** file PDF thuyết trình gốc hoặc các tài nguyên thô có dung lượng quá lớn vào kho lưu trữ.
- Chứng chỉ: Nén vừa đủ để vẫn đọc rõ chữ khi phóng to; lazy-load nội dung của từng tab.
- Bản đồ và biểu đồ phải được nạp động và chỉ tải khi gần tới khung nhìn (viewport).

## Khả năng tiếp cận (Accessibility - a11y)

- Cấu trúc mốc ngữ nghĩa (semantic landmarks), duy nhất một thẻ `h1`, thứ tự phân cấp tiêu đề logic.
- Tất cả hình ảnh phải có văn bản thay thế `alt` mang ý nghĩa; hình ảnh thuần trang trí để `alt=""`.
- Tabs, dialog, accordion và bộ chuyển đổi ngôn ngữ phải hoạt động hoàn toàn bằng bàn phím.
- Trạng thái focus nhìn rõ ràng. Độ tương phản văn bản đạt chuẩn WCAG AA trở lên, kể cả văn bản nằm trên lớp phủ video.
- Đồng hồ đếm ngược và bộ đếm số phải hiển thị giá trị kết quả cuối cùng cho trình đọc màn hình (screen reader).

## Mục tiêu hiệu năng (Targets)

Điểm số Lighthouse cho Performance, Accessibility và SEO đạt từ 90 trở lên trên thiết bị di động. Khắc phục ngay các suy giảm hiệu năng trước khi bổ sung hiệu ứng mới.
