---
description: Ngữ cảnh dự án, đối tượng người dùng và phạm vi. Luôn áp dụng.
---

# Ngữ cảnh dự án (Project Context)

## Dự án này là gì

Website showcase cho **Cảng VSICO Huế (Chân Mây, Huế)**, một cảng nước sâu và trung tâm logistics tích hợp trên Hành lang Kinh tế Đông – Tây (EWEC), miền Trung Việt Nam.

## Đối tượng người dùng

Hãng tàu, công ty giao nhận vận tải (freight forwarders) và chủ hàng. Họ muốn biết: cảng nằm ở đâu và tại sao vị trí này quan trọng, cảng có năng lực làm được gì, và họ nhận được những chính sách hỗ trợ nào.

## Mạch dẫn dắt câu chuyện (Narrative order)

Tại sao chọn Chân Mây -> Năng lực của cảng -> Những giá trị khách hàng nhận được -> Uy tín & Chứng nhận -> Liên hệ.

## Phạm vi (Scope)

- **Trong phạm vi:** Thuần front-end. Các trang, component, hoạt ảnh (animation), bản đồ, biểu đồ, đa ngôn ngữ (i18n), xác thực biểu mẫu phía client.
- **Ngoài phạm vi:** Backend, CMS, cơ sở dữ liệu, xác thực người dùng (auth), gửi biểu mẫu thực tế. Biểu mẫu đăng ký được mô phỏng (mock) ở client; không tự tạo endpoint API.

## Công nghệ sử dụng (Stack)

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, GSAP + ScrollTrigger, Lenis, Framer Motion (tùy chọn), MapLibre GL qua react-map-gl, Recharts, next-intl, react-hook-form + zod, pnpm.

Không tự ý thêm thư viện phụ thuộc (dependency) mới mà không nêu rõ lý do và kiểm tra xem thư viện có sẵn đã đáp ứng được nhu cầu hay chưa.

## Ngôn ngữ hỗ trợ (Locales)

`vi` (mặc định) và `en`, định tuyến theo `/vi/...` và `/en/...`.

## Các section của trang

Hero, I Vị trí (Location), II Cảng + ICD Lao Bảo (Port + ICD Lao Bảo), III Giải pháp toàn diện (Complete Solutions), IV Hạ tầng/Năng lực/Con người (Infrastructure/Capacity/People - kèm timeline và đồng hồ đếm ngược), V Dịch vụ cảng (Port Services), VI Chính sách hỗ trợ (Support Policies - kèm công cụ tính ưu đãi), VII Về VSICO (About VSICO), VIII Chứng nhận và Khách hàng (Certifications and Customers), IX Liên hệ (Contact).

## Nguồn chân lý duy nhất (Source of truth)

- Dữ liệu thực tế và số liệu: `src/data/*.ts`
- Nội dung văn bản: `src/messages/{vi,en}.json`
- Không bao giờ lặp lại cùng một số liệu đồng thời trong component, file message và file data. File data lưu trữ giá trị số liệu, file message lưu trữ câu từ hiển thị.
