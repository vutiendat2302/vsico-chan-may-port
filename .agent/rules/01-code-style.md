---
description: Quy chuẩn TypeScript, React, Tailwind và tổ chức file. Áp dụng cho tất cả thay đổi mã nguồn.
---

# Phong cách viết mã (Code Style)

## TypeScript

- Chế độ `strict`. Không dùng `any`; sử dụng `unknown` rồi thu hẹp kiểu (narrow), hoặc định nghĩa kiểu rõ ràng.
- Ưu tiên dùng `type` cho cấu trúc dữ liệu, chỉ dùng `interface` khi cần kế thừa (extend).
- Xuất (export) các type ngay cạnh dữ liệu mà chúng mô tả.
- Sử dụng alias `@/` cho các import từ thư mục `src/`.

## React và Next.js

- Chỉ sử dụng Function Component.
- **Mặc định là Server Component.** Chỉ thêm `"use client"` khi component cần state, effect, API trình duyệt, GSAP, MapLibre hoặc Recharts. Giữ ranh giới client (client boundary) càng nhỏ càng tốt.
- Các client component nặng (bản đồ, biểu đồ) phải được nạp động bằng `next/dynamic`.
- Một component trên một file. Tên file trùng với tên component (PascalCase). Custom hook đặt tên `useXxx` trong thư mục `src/hooks/`.
- Component các section nằm trong `src/components/sections/`, UI dùng chung nằm trong `src/components/ui/`, wrapper hoạt ảnh nằm trong `src/components/motion/`.

## Chuỗi văn bản và số liệu

- **Không hard-code văn bản hiển thị cho người dùng trong component.** Hãy dùng các key của `next-intl`.
- **Không hard-code số liệu nghiệp vụ trong component.** Hãy import từ `src/data/`.
- Định dạng số, tiền tệ và ngày tháng bằng `Intl` dựa theo ngôn ngữ (locale) đang hoạt động.

## Tailwind

- Không dùng `style` nội dòng (inline style) trừ trường hợp giá trị động mà Tailwind không thể biểu đạt.
- Sử dụng design token (biến CSS / theme Tailwind) thay vì mã màu hex trực tiếp.
- Gộp các class có điều kiện bằng `clsx` + `tailwind-merge`.
- Thiết kế ưu tiên di động (Mobile-first). Mở rộng lên các màn hình lớn bằng modifier `md:` / `lg:`.

## Tiêu chuẩn chất lượng

- Mã nguồn phải vượt qua `pnpm lint` và `pnpm typecheck`.
- Không để lại lệnh `console.log`.
- Không để lại các khối mã bị chú thích (commented-out code).
- Chú thích giải thích _lý do tại sao_ (why), không giải thích _đang làm gì_ (what).
