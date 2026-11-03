---
description: Số liệu đã kiểm chứng, quy tắc dùng từ và xử lý nội dung chờ xác nhận. Mức ưu tiên cao nhất. Luôn áp dụng cho bất kỳ nội dung nào nêu số liệu hoặc dữ kiện.
---

# Tính toàn vẹn nội dung (Content Integrity)

Đây là website doanh nghiệp. **Thông tin sai lệch còn tệ hơn là thiếu thông tin.** Không bao giờ tự bịa ra, làm tròn, suy diễn hoặc tự ý "làm đẹp" một con số.

## Dữ liệu đã kiểm chứng (an toàn để sử dụng)

| Thông tin                        | Giá trị                                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| Số bến                           | 02                                                                                              |
| Chiều dài cầu bến                | 540 m                                                                                           |
| Độ sâu trước bến                 | -14 m                                                                                           |
| Diện tích cảng                   | 20,4 ha                                                                                         |
| Tàu container tiếp nhận          | tới 4.000 TEU                                                                                   |
| Tàu hàng rời tiếp nhận           | tới 70.000 DWT                                                                                  |
| Cẩu bờ                           | 5 cẩu (Weihua 45t-45m)                                                                          |
| Thiết bị khác                    | 5 xe nâng, 2 cẩu dự phòng, 20 xe đầu kéo                                                        |
| Nhân sự                          | 250 người, chia 4 ban: Quản lý, Điều độ, Kỹ thuật, Khai thác                                    |
| Giai đoạn 1                      | 8/2026 - 5/2027, 120.000 TEU, 40-45 moves/giờ                                                   |
| Giai đoạn 2                      | Từ 6/2027, 80-85 moves/giờ                                                                      |
| Bến số 4                         | Hoạt động từ 8/2026                                                                             |
| Bến số 5 và ICD Lao Bảo          | Hoạt động từ 9/2027                                                                             |
| Khoảng cách tới cửa khẩu Lao Bảo | khoảng 150 km                                                                                   |
| ICD Lao Bảo                      | 86.000 m²                                                                                       |
| Đội tàu của tập đoàn VSICO       | 93.058 DWT / 6.660 TEU                                                                          |
| Kho và ICD toàn hệ thống         | 612.000 m² (kho Huế 160.000 m²)                                                                 |
| Đơn vị kiểm toán                 | Deloitte, định kỳ 6 tháng/lần                                                                   |
| Chứng nhận                       | ISO 9001, 14001, 45001, 28000, 31000, EcoVadis                                                  |
| Giải thưởng từ đối tác           | Honda 101KI Supplier Award, hạng mục "Excellent Warehouse & Operation Management", tháng 5/2025 |

Khoảng cách tới các KCN, mức hỗ trợ chính sách, chuỗi sản lượng và doanh thu, danh sách khách hàng và thông tin liên hệ nằm trong `src/data/`. Coi các file đó là nguồn chuẩn.

## Quy tắc dùng từ

1. Biểu đồ sản lượng và doanh thu là của **toàn bộ tập đoàn VSICO**, không phải riêng cảng Huế. Phải ghi nhãn rõ ràng như vậy.
2. Dùng chữ **"khách hàng"** (customers) cho khu vực logo, không dùng "đối tác" (partners).
3. Mô tả việc tối ưu chi phí theo hướng **định tính**. Không bao giờ công bố con số phần trăm tiết kiệm.
4. **Không dùng** các câu khẳng định hoặc từ ngữ cấp cao nhất chưa được kiểm chứng: "độc quyền", "duy nhất", "tuyến ngắn nhất", "chi phí thấp nhất", "nhanh nhất" (exclusive, monopoly, shortest route, lowest cost, fastest).
5. Giải thưởng của Honda là về quản lý kho và vận hành (warehouse and operation management), không được viết thành giải thưởng "nhà cung cấp xuất sắc nhất" chung chung.
6. Tiền tệ: dùng đúng số tiền VND trong `src/data/policies.ts`. Số USD chỉ là ước tính tương đương và phải ghi kèm chữ "khoảng" (about).

## Chờ xác nhận (tuyệt đối KHÔNG trình bày như dữ kiện đã xác thực)

| Hạng mục                                                  | Cách xử lý                                                                        |
| --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Dịch vụ **Door to Door** và phạm vi phục vụ               | Đặt sau flag tính năng, ẩn trên môi trường production cho đến khi có xác nhận     |
| **Thời hạn hiệu lực** của các chính sách hỗ trợ           | Công cụ tính toán hiển thị ghi chú "đang chờ xác nhận" cho đến khi có ngày cụ thể |
| **Quyền hiển thị logo khách hàng**                        | Logo đặt sau flag tính năng, ẩn trên production cho đến khi được chấp thuận       |
| **Ngày cụ thể của các mốc sự kiện** (hiện chỉ biết tháng) | Chỉ hiển thị tháng và năm                                                         |

### Mẫu thiết kế code (Pattern)

Thêm trường `status` vào dữ liệu đang chờ xác nhận và lọc theo trường này:

```ts
export type ContentStatus = "confirmed" | "pending";

export type Customer = {
  name: string;
  logo: string;
  status: ContentStatus;
};
```

Bản build Production chỉ render các mục có `status === "confirmed"`. Bản build Development có thể render các mục đang chờ kèm huy hiệu "PENDING" rõ ràng.

## Khi không chắc chắn

Nếu một thông tin được yêu cầu không có trong file này hoặc trong `src/data/`, **hãy yêu cầu người dùng xác nhận nguồn gốc** thay vì tự ý viết vào. Thêm chú thích `TODO(content):` và một mục `status: "pending"`.
