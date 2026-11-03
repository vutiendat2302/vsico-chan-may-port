# MATERIAL: Danh sách tài nguyên cần chuẩn bị

Dự án: **VSICO Hue Port Website**
Mục đích: liệt kê đầy đủ ảnh, video, logo, dữ liệu và nội dung cần có để dựng website, kèm nguồn lấy, thông số kỹ thuật, mức ưu tiên và trạng thái.

**Cách dùng file này:** đánh dấu `[x]` khi đã có và đã xử lý xong. Mỗi mục có mức ưu tiên:

- **P0**: chặn việc dựng giao diện, cần có sớm nhất
- **P1**: cần trước khi chạy thử (preview)
- **P2**: cần trước khi phát hành, có thể dùng ảnh tạm trong lúc chờ

---

## 1. Kết quả khảo sát vsico.com.vn

Đã đọc trang chủ https://vsico.com.vn/. Trang là website giới thiệu tập đoàn VSICO (hãng tàu, ICD, kho, gom hàng lẻ), **không có trang riêng cho cảng Chân Mây**, nên chủ yếu lấy được logo, ảnh chung và thông tin liên hệ.

### 1.1. Lấy được từ website

| Tài nguyên                              | Đường dẫn                                                                                                                                                                                            | Dùng cho                                 | Chất lượng và lưu ý                                                                                                                             |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Logo header (bản trắng/sáng)            | `https://vsico.com.vn/upload/setting/original/website-logo-img-1-1779337895.png`                                                                                                                     | Header, hero (nền tối)                   | Ảnh gốc, định dạng PNG. Cần xin bản SVG                                                                                                         |
| Logo màu                                | `https://vsico.com.vn/upload/setting/original/website-logo-color-img-1-1775043156.jpg`                                                                                                               | Header khi cuộn, footer                  | Định dạng JPG, **có nền**, không trong suốt. Nên xin bản SVG hoặc PNG nền trong                                                                 |
| Logo footer                             | `https://vsico.com.vn/upload/setting/original/website-logo-footer-img-1-1779337895.png`                                                                                                              | Footer                                   | Ảnh gốc, PNG                                                                                                                                    |
| Ảnh chia sẻ (OG) hiện tại               | `https://vsico.com.vn/upload/setting/thumb_800x0/website-seo-img-1-1774396114.png`                                                                                                                   | Tham khảo                                | Kích thước gốc 1362 × 904, chỉ để tham khảo, nên làm ảnh OG riêng cho cảng                                                                      |
| Banner trang chủ (6 ảnh)                | `https://vsico.com.vn/upload/banner/thumb_1920x0/banner-1775043671.jpg`, `banner-1778676317.png`, `banner-1778676365.jpg`, `banner-1778676631.jpg`, `banner-1775043731.jpg`, `banner-1775043780.jpg` | Ảnh nền tạm cho hero và các section      | Rộng 1920 px. Mở từng ảnh để xem nội dung có liên quan cảng không. Bản gốc có thể nằm ở đường dẫn `/upload/banner/original/...` (chưa kiểm tra) |
| Ảnh giới thiệu công ty                  | `https://vsico.com.vn/upload/staticpage/thumb_1530x0/staticpage-1-1775044074.jpg`                                                                                                                    | Mục Về VSICO                             | Rộng 1530 px                                                                                                                                    |
| Ảnh 5 nhóm dịch vụ                      | Trong thư mục `https://vsico.com.vn/upload/menu/` và `/upload/news/` (vận tải container, đa phương thức, kho, ICD và cảng, gom hàng lẻ)                                                              | Card dịch vụ, section Giải pháp trọn gói | Kích thước nhỏ (250 đến 800 px), dùng được cho card, không dùng làm ảnh lớn                                                                     |
| Thư viện ảnh (hơn 30 ảnh)               | `https://vsico.com.vn/upload/staticpage/original/staticpage-0-<mã>.jpg`                                                                                                                              | Ảnh kho, tàu, xe, hoạt động              | **Có bản gốc kích thước lớn.** Cần mở xem từng ảnh để chọn, chưa biết ảnh nào là cảng hay ICD                                                   |
| Ảnh bản đồ mạng lưới                    | `https://vsico.com.vn/upload/setting/original/map-image-img-1775046128.png`                                                                                                                          | Tham khảo cách trình bày mạng lưới       | Bản đồ phẳng, nên dựng bản đồ tương tác riêng                                                                                                   |
| Logo công ty thành viên                 | `https://vsico.com.vn/upload/unit/thumb_500x0/` (AMITRANS, VSICO EXPRESS, UMI, ALBERTA, PETROLINK)                                                                                                   | Mục Về VSICO                             | Rộng 500 px                                                                                                                                     |
| Logo chứng nhận và khách hàng (42 logo) | `https://vsico.com.vn/upload/partner/thumb_150x0/`                                                                                                                                                   | Tường logo                               | **Chỉ rộng 150 px, quá nhỏ**, mờ khi hiển thị lớn. Dùng làm danh sách tham khảo, cần xin bản lớn                                                |
| Video giới thiệu (có thể)               | Footer có liên kết YouTube `https://www.youtube.com/watch?v=w6oTFHnSHTU`                                                                                                                             | Tham khảo                                | **Chưa kiểm tra** nội dung. Nếu là video công ty thì xin file gốc, không nhúng YouTube làm hero                                                 |
| Mạng xã hội                             | Facebook: `https://www.facebook.com/Vsico.com.vn` · TikTok: `@vsicologshipwarehouse`                                                                                                                 | Footer                                   | Chỉ dùng các link này                                                                                                                           |

---

## 2. Cấu trúc thư mục và quy chuẩn xử lý

### 2.1. Cấu trúc thư mục trong repo

```text
public/
├── videos/
│   └── hero/                 # hero-port-1080.mp4, hero-port-1080.webm, hero-port-720.mp4, hero-poster.webp
├── images/
│   ├── port/                 # ảnh cảng, bến, cẩu, bãi
│   ├── icd/                  # ICD Lao Bảo
│   ├── warehouse/            # kho Huế và hệ thống kho
│   ├── fleet/                # tàu, xe đầu kéo
│   ├── people/               # nhân sự vận hành
│   └── og/                   # ảnh chia sẻ mạng xã hội
├── logos/
│   ├── vsico/                # logo VSICO (SVG)
│   ├── customers/            # logo khách hàng
│   ├── shipping-lines/       # logo hãng tàu
│   ├── members/              # công ty thành viên
│   └── certifications/       # logo ISO, EcoVadis
├── certificates/
│   ├── iso/
│   ├── licenses/
│   └── partners/
└── maps/                     # GeoJSON, ảnh bản đồ tĩnh
```

### 2.2. Quy chuẩn tên file

- Chữ thường, **không dấu**, nối bằng gạch ngang.
- Theo mẫu `<nhóm>-<mô-tả>-<số thứ tự>.<đuôi>`.
- Ví dụ: `port-aerial-01.webp`, `cert-iso-9001.webp`, `logo-vsico-color.svg`, `customer-honda.svg`.

### 2.3. Thông số kỹ thuật

| Loại                                      | Thông số yêu cầu                                                                                                                                                             |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Video hero**                            | 1920 × 1080 (thêm bản 1280 × 720 cho điện thoại), 15 đến 30 giây, 24 đến 30 fps, **không âm thanh**, MP4 (H.264) + WebM, **mỗi file dưới 6 MB**, nên lặp mượt (đầu nối đuôi) |
| **Ảnh poster video**                      | 1920 × 1080, WebP, dưới 200 KB                                                                                                                                               |
| **Ảnh toàn màn hình** (hero, nền section) | Ảnh gốc rộng tối thiểu **2400 px**; xuất WebP rộng 1920 px, dưới 300 KB                                                                                                      |
| **Ảnh trong card, nội dung**              | Rộng 1200 px, WebP, dưới 150 KB                                                                                                                                              |
| **Logo VSICO**                            | **SVG**, 2 bản: sáng (cho nền tối) và màu (cho nền trắng). Nếu không có SVG thì PNG nền trong, rộng tối thiểu 800 px                                                         |
| **Logo khách hàng, hãng tàu**             | SVG hoặc PNG nền trong, rộng tối thiểu 400 px (bản 150 px trên website **không dùng được**)                                                                                  |
| **Ảnh giấy chứng nhận, giấy phép**        | Scan 300 dpi; xuất WebP cạnh dài 1600 px, dưới 250 KB, **đọc được chữ chính khi phóng to**                                                                                   |
| **Ảnh OG (chia sẻ)**                      | 1200 × 630, JPG hoặc PNG, dưới 300 KB                                                                                                                                        |
| **Favicon**                               | SVG hoặc PNG 512 × 512 (từ logo VSICO, nền trong hoặc nền tím)                                                                                                               |
| **Dữ liệu bản đồ**                        | GeoJSON (tọa độ WGS84), tệp dưới 200 KB                                                                                                                                      |

Quy tắc chung:

- **Không** commit file gốc nặng (PDF slide 72 MB, ảnh thô). Giữ bản gốc ở ổ chung của nhóm, trong repo chỉ để bản đã nén.
- Tất cả ảnh đều cần **mô tả thay thế (alt)**. Ghi sẵn khi nhận ảnh.
- Mỗi ảnh nhớ ghi lại **nguồn và quyền sử dụng** (công ty cung cấp, ảnh thuê, ảnh tải về).

---

## 3. Danh sách material chi tiết

### 3.1. Thương hiệu

| #   | Tài nguyên                                                                                     | Ưu tiên | Nguồn                                                               | Trạng thái |
| --- | ---------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------- | ---------- |
| 1   | Logo VSICO dạng **SVG** (bản sáng và bản màu)                                                  | P0      | Xin phòng Marketing/Truyền thông. Tạm dùng PNG từ website (mục 1.1) | [ ]        |
| 2   | **Brand guideline**: mã màu chính xác (HEX), font chính thức, quy định khoảng trống quanh logo | P0      | Xin Marketing. Tạm dùng dải tím `#4C1D95` đến `#6D28D9`             | [ ]        |
| 3   | Slogan chính thức: "Link together - Succeed together" (có trong slide)                         | P1      | Xác nhận cách viết đúng                                             | [ ]        |
| 4   | Logo 5 công ty thành viên (AMITRANS, VSICO EXPRESS, UMI, ALBERTA, PETROLINK)                   | P2      | Website có bản 500 px; xin bản lớn nếu cần                          | [ ]        |

### 3.2. Video và ảnh hero

| #   | Tài nguyên                                                                           | Ưu tiên | Nguồn                                                                                                                                                                                    | Trạng thái |
| --- | ------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 5   | **Video hero cảng Chân Mây**: flycam toàn cảng, tàu cập bến, cẩu hoạt động           | P0      | Đã có file `cang_chan_may.mp4` nhưng độ phân giải thấp (`256×144`, 8p12s, có tiếng). Đã cắt bản 20s không tiếng (`tmp-hero-port.mp4` / `.webm`) dùng tạm; **cần xin file gốc 1920×1080** | [ ]        |
| 6   | Kiểm tra video YouTube ở footer website (`w6oTFHnSHTU`), có phải video công ty không | P1      | Mở xem, hỏi người đăng; nếu dùng được thì xin **file gốc**                                                                                                                               | [ ]        |
| 7   | Ảnh poster cho video hero (khung hình đẹp nhất)                                      | P0      | Đã tạo `public/videos/hero/hero-poster.webp` (1920×1080, 117 KB) từ ảnh flycam `IMG_5728.jpeg` và bản dự phòng 3D `tmp-hero-poster.webp`                                                 | [x]        |

### 3.3. Ảnh cảng và hạ tầng

| #   | Tài nguyên                                                                            | Dùng cho         | Ưu tiên | Nguồn                                                                 | Trạng thái |
| --- | ------------------------------------------------------------------------------------- | ---------------- | ------- | --------------------------------------------------------------------- | ---------- |
| 8   | **Ảnh render 3D toàn cảnh cảng** (đã có trong slide trang "Cảng VSICO Huế")           | Hero, mục III    | P0      | Xin **file gốc** từ ban dự án, không cắt từ slide                     | [ ]        |
| 9   | **Sơ đồ mặt bằng cảng** (bến container, bến hàng rời, kho CFS, băng tải, khu dịch vụ) | Mục III hạ tầng  | P0      | Xin bản vẽ hoặc sơ đồ gốc, dạng vector nếu có                         | [ ]        |
| 10  | Ảnh thực tế cầu cảng, bãi container, **cẩu Weihua 45t-45m** (slide có ảnh cẩu)        | Mục III, dịch vụ | P1      | Ban vận hành cảng                                                     | [ ]        |
| 11  | Ảnh **ICD Lao Bảo** (toàn cảnh, bãi, kho, khu thông quan)                             | Mục II           | P1      | Chi nhánh Quảng Trị                                                   | [ ]        |
| 12  | Ảnh **kho VSICO Huế** (160.000 m²) và hệ thống kho                                    | Mục VII          | P1      | Ban kho vận. Thư viện ảnh website có thể có ảnh kho                   | [ ]        |
| 13  | Ảnh tàu của đội tàu VSICO, xe đầu kéo, thiết bị xếp dỡ                                | Mục III, VII     | P2      | Thư viện ảnh website (hơn 30 ảnh); chọn lọc                           | [ ]        |
| 14  | Ảnh **đội ngũ nhân sự** vận hành cảng (250 người, 4 ban)                              | Mục IV           | P2      | Nhân sự, Marketing. Cần được **đồng ý của người xuất hiện trong ảnh** | [ ]        |
| 15  | Ảnh các dịch vụ tại cảng (xếp dỡ, sửa chữa container, tàu lai, cung ứng)              | Mục V            | P2      | Ban vận hành                                                          | [ ]        |

### 3.4. Bản đồ và dữ liệu địa lý

| #   | Tài nguyên                                                                                          | Ưu tiên | Nguồn                                                      | Trạng thái |
| --- | --------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------- | ---------- |
| 16  | **Tọa độ chính xác** của cảng Chân Mây, ICD Lao Bảo, cửa khẩu Lao Bảo                               | P1      | Công ty xác nhận; tra bản đồ công khai để đối chiếu        | [ ]        |
| 17  | Tọa độ 6 KCN (Hòa Khánh, Đà Nẵng, Phú Bài, Quảng Trị, Bắc Chu Lai, VSIP Quảng Ngãi)                 | P1      | Tra bản đồ công khai; khoảng cách km lấy theo slide        | [ ]        |
| 18  | **Đường tuyến EWEC** (Nam Lào, Đông Bắc Thái Lan, Bắc Campuchia → Lao Bảo → Chân Mây), dạng GeoJSON | P1      | Tự dựng từ dữ liệu bản đồ công khai, nhờ công ty duyệt lại | [ ]        |
| 19  | Chọn **nguồn tile bản đồ** cho MapLibre và lấy API key nếu cần                                      | P0      | Tự quyết định, ghi vào `.env`                              | [ ]        |
| 20  | Địa điểm các kho, ICD trong hệ thống (Hưng Yên, Hải Phòng, Quảng Bình, Huế, Đồng Nai, Long An...)   | P2      | Công ty cung cấp danh sách địa chỉ chính thức              | [ ]        |

### 3.5. Chứng nhận và giấy phép

Công ty **đã đồng ý cho công khai giấy phép**. Cần ảnh scan rõ:

| #   | Tài nguyên                                                                             | Ưu tiên | Nguồn                                                 | Trạng thái |
| --- | -------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------- | ---------- |
| 21  | ISO 9001, ISO 14001, ISO 45001, ISO 28000, ISO 31000 (5 giấy)                          | P1      | Phòng Chất lượng/Pháp chế. Slide có ảnh nhưng quá nhỏ | [ ]        |
| 22  | Chứng nhận **EcoVadis**                                                                | P1      | Phòng Chất lượng                                      | [ ]        |
| 23  | Giấy phép vận tải quốc tế Việt - Lào, Việt - Campuchia                                 | P1      | Pháp chế                                              | [ ]        |
| 24  | Giấy phép bưu chính và các chứng nhận nghiệp vụ khác                                   | P1      | Pháp chế                                              | [ ]        |
| 25  | Chứng chỉ đại lý tàu biển, chứng chỉ sửa chữa container                                | P1      | Pháp chế/Vận hành. Hỏi lại có phải chuẩn IICL không   | [ ]        |
| 26  | **Giải thưởng Honda 101KI** (Excellent Warehouse & Operation Management, 30/5/2025)    | P1      | Slide có ảnh; xin ảnh gốc                             | [ ]        |
| 27  | Giấy chứng nhận đào tạo hệ thống kho tự động (có trong slide trang chứng nhận đối tác) | P2      | Xác nhận có đưa lên web không                         | [ ]        |
| 28  | Với giấy có số giấy phép, mã QR: **hỏi** có cần làm mờ phần nhạy cảm không             | P1      | Pháp chế                                              | [ ]        |

### 3.6. Logo khách hàng và hãng tàu

Cần **xác nhận quyền hiển thị** trước khi đưa lên (mục còn treo từ trước).

| #   | Tài nguyên                                                                                                                                                                                    | Ưu tiên | Nguồn                                                                             | Trạng thái |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------- | ---------- |
| 29  | **Văn bản đồng ý** hiển thị logo khách hàng (hoặc xác nhận của sếp/Marketing)                                                                                                                 | P0      | Marketing/Ban lãnh đạo                                                            | [ ]        |
| 30  | Chốt **danh sách chính thức** khách hàng chủ hàng (so sánh website và slide, xem mục 1.3)                                                                                                     | P1      | Kinh doanh/Marketing                                                              | [ ]        |
| 31  | Logo **bản lớn (SVG/PNG ≥ 400 px)** của khoảng 28 thương hiệu chủ hàng trên website                                                                                                           | P1      | Marketing; hoặc tải từ trang chính thức của từng thương hiệu nếu công ty cho phép | [ ]        |
| 32  | Chốt danh sách **hãng tàu** hiển thị (COSCO, Maersk, Yang Ming, Evergreen, SITC, OOCL, ONE, HMM, Hapag-Lloyd, CMA CGM) và cách gọi (khách hàng hay đối tác)                                   | P1      | Kinh doanh. Nhóm này đúng đối tượng của web                                       | [ ]        |
| 33  | Logo bản lớn của 10 hãng tàu                                                                                                                                                                  | P1      | Như trên                                                                          | [ ]        |
| 34  | Logo 7 khách hàng container khu vực Chân Mây: Shaiyo-AA, Kim Long Motor, America Quartz Technology, Billion Max (có logo); Jon72, Malpensa Plant, Okura (slide chỉ có tên, **cần thêm logo**) | P1      | Kinh doanh khu vực Huế                                                            | [ ]        |

### 3.7. Nội dung và số liệu cần xác nhận

| #   | Mục cần xác nhận                                                                                  | Ảnh hưởng               | Ưu tiên | Người trả lời        | Trạng thái |
| --- | ------------------------------------------------------------------------------------------------- | ----------------------- | ------- | -------------------- | ---------- |
| 35  | **Door to Door**: có chính thức cung cấp không, phạm vi tuyến nào                                 | Mục III (đang ẩn)       | P1      | Kinh doanh/Điều hành | [ ]        |
| 36  | **Thời hạn hiệu lực** chính sách hỗ trợ (TP Huế và VSICO)                                         | Mục VI, máy tính hỗ trợ | P1      | Kinh doanh           | [ ]        |
| 37  | **Ngày cụ thể** của các mốc: Bến 4 (8/2026), Bến 5 và ICD Lao Bảo (9/2027)                        | Timeline, countdown     | P2      | Ban dự án            | [ ]        |
| 38  | Nguồn và năm số liệu cho câu "đứng thứ 2 toàn quốc về sản lượng qua các cảng nội địa"             | Mục VII (nếu dùng)      | P2      | Marketing            | [ ]        |
| 39  | Có thêm **số liệu cảng Huế riêng** (sản lượng, số chuyến) để thay vì chỉ dùng số toàn VSICO không | Mục VII, biểu đồ        | P2      | Ban cảng             | [ ]        |
| 40  | Có kế hoạch **đăng lịch tàu cập cảng Huế** lên web không                                          | Mục VI (tùy chọn)       | P2      | Điều hành            | [ ]        |

### 3.8. Liên hệ và biểu mẫu

| #   | Mục cần có                                                                                                    | Ưu tiên | Người trả lời                  | Trạng thái |
| --- | ------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------ | ---------- |
| 41  | **Email chính thức** của bộ phận kinh doanh cảng (website chưa ghi email nào)                                 | P0      | Kinh doanh                     | [ ]        |
| 42  | **Số điện thoại và email chi nhánh Huế** (cảng), chi nhánh Quảng Trị (ICD)                                    | P0      | Hành chính                     | [ ]        |
| 43  | **Nơi nhận dữ liệu form** đăng ký: email hay hệ thống CRM? Nếu chưa có thì form chỉ là mô phỏng               | P1      | Công nghệ thông tin/Kinh doanh | [ ]        |
| 44  | Người phụ trách xử lý form và thời gian phản hồi cam kết                                                      | P2      | Kinh doanh                     | [ ]        |
| 45  | **Chính sách quyền riêng tư** (có sẵn trên website công ty không?) vì form thu thập tên, email, số điện thoại | P1      | Pháp chế                       | [ ]        |
| 46  | Có đưa link **Book chuyến** (`shipping.vsico.com.vn`) và lịch tàu vào nút của web không                       | P2      | Điều hành                      | [ ]        |

### 3.9. Ngôn ngữ và SEO

| #   | Tài nguyên                                                                             | Ưu tiên | Nguồn                                                                                                  | Trạng thái |
| --- | -------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ | ---------- |
| 47  | **Bản dịch tiếng Anh** toàn bộ nội dung                                                | P1      | T soạn nháp; người có chuyên môn hàng hải/đối ngoại duyệt thuật ngữ. Tham khảo bản EN của vsico.com.vn | [ ]        |
| 48  | **Bảng thuật ngữ** Việt - Anh (ví dụ: cầu bến, moves/giờ, Dem/Det, ICD, CFS, hàng rời) | P1      | Cùng với số 47                                                                                         | [ ]        |
| 49  | Tiêu đề trang và mô tả trang (SEO) cho `vi` và `en`                                    | P2      | T soạn, công ty duyệt                                                                                  | [ ]        |
| 50  | Ảnh OG 1200 × 630 cho cảng                                                             | P2      | Thiết kế từ ảnh render cảng + logo                                                                     | [ ]        |
| 51  | Favicon từ logo VSICO                                                                  | P2      | Thiết kế                                                                                               | [ ]        |
| 52  | Quyết định có làm thêm tiếng Lào, Thái, Trung không (hướng mở rộng)                    | P2      | Ban lãnh đạo                                                                                           | [ ]        |

---

## 4. Ảnh và dữ liệu tạm trong lúc chờ

Để không bị chặn khi dựng giao diện, dùng tạm:

| Cần                 | Dùng tạm                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| Video hero          | Ảnh render 3D cảng từ slide, làm hiệu ứng zoom chậm, đặt trong cùng khung với `poster`            |
| Ảnh cảng, ICD, kho  | Ảnh từ thư viện ảnh website và banner (đánh dấu **tạm** trong tên file, ví dụ `tmp-port-01.webp`) |
| Logo SVG            | PNG từ website (mục 1.1)                                                                          |
| Logo khách hàng     | Bản 150 px từ website, **chỉ dùng khi dev**, không đưa lên bản chạy thử                           |
| Ảnh giấy chứng nhận | Ảnh chụp từ slide, thay bằng ảnh scan sau                                                         |
| Tọa độ bản đồ       | Tra bản đồ công khai, ghi chú "chưa xác nhận"                                                     |
| Email form          | Địa chỉ giả `placeholder@example.com`, hiển thị rõ trong bản dev                                  |

Mọi ảnh tạm phải ghi vào bảng bên dưới để **không sót khi phát hành**.

| File tạm                                                  | Nơi dùng                                          | Cần thay bằng                                                                                                              | Đã thay |
| --------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------- |
| `public/videos/hero/tmp-hero-port.webm`                   | Hero (`HeroBackground.tsx`)                       | Video flycam cảng Chân Mây gốc 1920×1080 (`hero-port-1080.webm`, < 6 MB, không âm thanh)                                   | [ ]     |
| `public/videos/hero/tmp-hero-port.mp4`                    | Hero (`HeroBackground.tsx`)                       | Video flycam cảng Chân Mây gốc 1920×1080 (`hero-port-1080.mp4`, < 6 MB, không âm thanh)                                    | [ ]     |
| `public/videos/hero/tmp-hero-poster.webp`                 | Dự phòng trong `public/videos/hero/`              | Đang dùng `hero-poster.webp` từ ảnh flycam thực tế `IMG_5728.jpeg`; thay bằng khung hình từ video 1080p chính thức nếu cần | [ ]     |
| `public/logos/vsico/tmp-logo-vsico-white.svg`             | Header (`Header.tsx`), Footer (`Footer.tsx`)      | File vector SVG logo VSICO bản sáng chính thức từ bộ Brand Guideline                                                       | [ ]     |
| `public/logos/vsico/tmp-logo-vsico-light.svg`             | Dự phòng trong `public/logos/vsico/`              | File vector SVG logo VSICO bản sáng chính thức từ bộ Brand Guideline                                                       | [ ]     |
| `public/logos/vsico/tmp-logo-vsico-color.svg`             | Dự phòng cho nền sáng / Footer                    | File vector SVG logo VSICO bản màu chính thức từ bộ Brand Guideline                                                        | [ ]     |
| `public/logos/vsico/tmp-logo-vsico-light.png`             | Trích xuất từ slide thuyết trình                  | Logo SVG chính thức                                                                                                        | [ ]     |
| `public/images/port/tmp-port-aerial-01.webp`              | Ảnh render 3D tổng thể cảng trích từ slide        | File render 3D gốc độ phân giải cao (≥ 2400 px) từ Ban dự án                                                               | [ ]     |
| `public/images/port/tmp-port-berth-01.webp`               | Ảnh render 3D cầu cảng & tàu VSICO trích từ slide | File render 3D gốc hoặc ảnh chụp thực tế cầu bến từ Ban vận hành                                                           | [ ]     |
| `public/images/port/tmp-port-layout-01.webp`              | Mục IV Hạ tầng (`Infrastructure.tsx`)             | Bản vẽ sơ đồ mặt bằng cảng 20,4 ha gốc chất lượng cao                                                                      | [ ]     |
| `public/images/port/tmp-port-crane-01.webp`               | Mục IV Hạ tầng (`Infrastructure.tsx`)             | Ảnh thực tế cẩu bờ Weihua 45t-45m độ phân giải cao                                                                         | [ ]     |
| `public/images/people/tmp-port-staff-01.webp`             | Mục IV Nhân sự (`Infrastructure.tsx`)             | Ảnh đội ngũ vận hành cảng Chân Mây đã có xác nhận quyền hình ảnh                                                           | [ ]     |
| `public/images/icd/tmp-icd-laobao-01.webp`                | Mục II Cảng + ICD Lao Bảo (`PortIcd.tsx`)         | Ảnh thực tế / quy hoạch gốc của ICD VSICO Quảng Trị (ICD Lao Bảo)                                                          | [ ]     |
| `public/images/warehouse/tmp-warehouse-system-01.webp`    | Mục VII Về VSICO (`About.tsx`)                    | Ảnh thực tế hệ thống kho VSICO Huế (160.000 m²) và mạng lưới kho                                                           | [ ]     |
| `public/certificates/iso/tmp-cert-iso-9001.webp`          | Mục VIII Chứng nhận (`CertificateViewer.tsx`)     | Bản scan 300 dpi chứng nhận ISO 9001                                                                                       | [ ]     |
| `public/certificates/iso/tmp-cert-iso-14001.webp`         | Mục VIII Chứng nhận (`CertificateViewer.tsx`)     | Bản scan 300 dpi chứng nhận ISO 14001                                                                                      | [ ]     |
| `public/certificates/iso/tmp-cert-iso-45001.webp`         | Mục VIII Chứng nhận (`CertificateViewer.tsx`)     | Bản scan 300 dpi chứng nhận ISO 45001                                                                                      | [ ]     |
| `public/certificates/iso/tmp-cert-iso-28000.webp`         | Mục VIII Chứng nhận (`CertificateViewer.tsx`)     | Bản scan 300 dpi chứng nhận ISO 28000                                                                                      | [ ]     |
| `public/certificates/iso/tmp-cert-iso-31000.webp`         | Mục VIII Chứng nhận (`CertificateViewer.tsx`)     | Bản scan 300 dpi chứng nhận ISO 31000                                                                                      | [ ]     |
| `public/certificates/iso/tmp-cert-ecovadis.webp`          | Mục VIII Chứng nhận (`CertificateViewer.tsx`)     | Bản scan 300 dpi chứng nhận EcoVadis                                                                                       | [ ]     |
| `public/certificates/licenses/tmp-cert-transport-01.webp` | Mục VIII Chứng nhận (`CertificateViewer.tsx`)     | Bản scan 300 dpi giấy phép vận tải đường bộ quốc tế Việt – Lào, Việt – Campuchia                                           | [ ]     |
| `public/certificates/licenses/tmp-cert-postal-01.webp`    | Mục VIII Chứng nhận (`CertificateViewer.tsx`)     | Bản scan 300 dpi giấy phép bưu chính và nghiệp vụ                                                                          | [ ]     |
| `public/certificates/licenses/tmp-cert-agency-01.webp`    | Mục VIII Chứng nhận (`CertificateViewer.tsx`)     | Bản scan 300 dpi chứng chỉ đại lý tàu biển & sửa chữa container                                                            | [ ]     |
| `public/certificates/partners/tmp-cert-honda-01.webp`     | Mục VIII Chứng nhận (`CertificateViewer.tsx`)     | Ảnh gốc giải thưởng Honda 101KI Supplier Award (30/05/2025)                                                                | [ ]     |

---
