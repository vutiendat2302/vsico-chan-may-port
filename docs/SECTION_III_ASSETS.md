# Hướng Dẫn Bổ Sung Hình Ảnh Cho Phần III (Cảng & ICD)

Tài liệu này ghi chú các vị trí hình ảnh đang được sử dụng tạm thời tại Phần III của Website Cảng VSICO Huế theo phong cách biên tập điện ảnh (Editorial Spyker Style). Người phụ trách nội dung / media có thể thay thế hình ảnh thực tế theo thông số kỹ thuật bên dưới.

---

## 1. Danh Sách Hình Ảnh Sử Dụng Tại Phần III

| Vị trí | Đường dẫn hiện tại | Nội dung mô tả | Tỷ lệ & Kích thước khuyến nghị | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| **Ảnh 1: Cửa ngõ Biên giới (ICD Lao Bảo)** | `/public/images/icd/tmp-icd-laobao-01.webp` | Toàn cảnh bãi container, kho bãi ICD hoặc phương tiện vận tải tại Cửa khẩu Quốc tế Lao Bảo (Quảng Trị) | **16:9 hoặc 16:10**<br>(Tối thiểu 1600 × 1000 px, chuẩn WebP/JPG sắc nét) | `Tạm thời (Placeholder)` – Cần bổ sung ảnh thực tế góc flycam bãi ICD Lao Bảo |
| **Ảnh 2: Cửa ngõ Đại dương (Cảng Chân Mây)** | `/public/images/port/port-aerial-01.webp` | Toàn cảnh cầu bến số 4 & 5 vươn ra vịnh Chân Mây, cẩu bờ STS Weihua hoặc tàu hàng cập cảng | **16:9**<br>(Tối thiểu 1920 × 1080 px, chuẩn WebP/JPG) | `Đã có ảnh cảng Chân Mây thực tế` – Có thể thay bằng ảnh flycam mới nhất khi có tàu cập bến |

---

## 2. Hướng Dẫn Thay Thế Ảnh Không Cần Sửa Code

Để thay thế ảnh mà không làm ảnh hưởng đến mã nguồn giao diện:

1. **Chuẩn bị file ảnh:**
   - Đặt tên file đúng theo đường dẫn:
     - `tmp-icd-laobao-01.webp` cho ảnh ICD Lao Bảo.
     - `port-aerial-01.webp` cho ảnh Cảng Chân Mây.
   - Nén ảnh về định dạng `.webp` với chất lượng 85-90% để tối ưu tốc độ tải trang (PageSpeed).
2. **Copy đè file vào thư mục:**
   - Chép file ICD vào: `public/images/icd/tmp-icd-laobao-01.webp`
   - Chép file Cảng vào: `public/images/port/port-aerial-01.webp`
3. **Kiểm tra hiển thị:**
   - Tải lại trang web (F5 hoặc Hard Reload `Ctrl + Shift + R`) để thấy ảnh mới ngay lập tức.
