# Website Cảng VSICO Huế (VSICO Hue Port Website)

Trang web showcase cho **Cảng VSICO Huế (Chân Mây, Huế)**, một cảng nước sâu và trung tâm logistics tích hợp trên **Hành lang Kinh tế Đông – Tây (EWEC)** tại miền Trung Việt Nam.

Trang web là một trải nghiệm một trang (one-page) đậm chất điện ảnh (cinematic), thuần front-end, hướng tới **các hãng tàu, công ty giao nhận vận tải (freight forwarders) và chủ hàng**. Trang web trả lời nhanh chóng 3 câu hỏi trọng tâm: _cảng nằm ở đâu và tại sao vị trí này quan trọng, cảng có năng lực làm được gì, và khách hàng nhận được những chính sách hỗ trợ nào._

---

## Mục lục

1. [Mục tiêu dự án](#mục-tiêu-dự-án)
2. [Định hướng thiết kế](#định-hướng-thiết-kế)
3. [Cấu trúc trang](#cấu-trúc-trang)
4. [Các tính năng chính](#các-tính-năng-chính)
5. [Công nghệ sử dụng](#công-nghệ-sử-dụng)
6. [Bắt đầu nhanh](#bắt-đầu-nhanh)
7. [Cấu trúc thư mục dự án](#cấu-trúc-thư-mục-dự-án)
8. [Quản lý nội dung và dữ liệu](#quản-lý-nội-dung-và-dữ-liệu)
9. [Đa ngôn ngữ](#đa-ngôn-ngữ)
10. [Hệ thống thiết kế](#hệ-thống-thiết-kế)
11. [Hướng dẫn về hoạt ảnh](#hướng-dẫn-về-hoạt-ảnh)
12. [Hiệu năng và khả năng tiếp cận](#hiệu-năng-và-khả-năng-tiếp-cận)
13. [Triển khai (Deployment)](#triển-khai-deployment)
14. [Quy trình Git](#quy-trình-git)
15. [Trạng thái nội dung](#trạng-thái-nội-dung)
16. [Lộ trình phát triển](#lộ-trình-phát-triển)

---

## Mục tiêu dự án

- Trình bày Cảng VSICO Huế như **cửa ngõ hướng biển của hành lang EWEC** (cách cửa khẩu quốc tế Lao Bảo khoảng 150 km).
- Làm nổi bật **mô hình tích hợp Cảng + ICD Lao Bảo** cùng hệ sinh thái **Tàu – Cảng – Kho bãi – ICD**.
- Giúp các **chính sách hỗ trợ** dành cho hãng tàu và chủ hàng trở nên trực quan, dễ tìm và dễ tính toán.
- Xây dựng niềm tin vững chắc thông qua các số liệu hạ tầng chuẩn xác, chứng chỉ quốc tế, thông tin kiểm toán độc lập và danh mục khách hàng uy tín.
- Chuyển đổi khách truy cập thành khách hàng tiềm năng thông qua biểu mẫu đăng ký nhận thông tin ưu tiên.

**Ngoài phạm vi của kho lưu trữ này:** backend, CMS, cơ sở dữ liệu và xác thực người dùng. Biểu mẫu đăng ký được mô phỏng (mock) ở phía client.

---

## Định hướng thiết kế

**Thiết kế web phong cách sang trọng đậm chất điện ảnh (Cinematic luxury web design)**, lấy cảm hứng từ phương pháp kể chuyện của các trang web xe hơi cao cấp.

| Nguyên tắc                                    | Ứng dụng thực tế                                                                          |
| --------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Tối giản cao cấp (Premium minimalism)         | Khoảng trắng rộng rãi, khẩu hiệu lớn, ít văn bản dài trên mỗi section                     |
| Đậm chất điện ảnh (Cinematic)                 | Video Hero tràn màn hình (full-bleed), độ tương phản mạnh, lớp phủ tối sang trọng         |
| Kể chuyện theo thao tác cuộn (Scrollytelling) | Câu chuyện mở ra liền mạch khi người dùng cuộn chuột (GSAP + ScrollTrigger)               |
| Di sản & biên tập (Heritage / editorial)      | Tiêu đề dùng font serif trang nhã, timeline trực quan, đánh dấu section bằng chữ số La Mã |
| Tính độc quyền (Exclusivity)                  | Đồng hồ đếm ngược tới các cột mốc sắp diễn ra, form đăng ký "nhận thông tin ưu tiên"      |

**Quy tắc cân bằng:** Hero và một số section tuyên ngôn lớn sử dụng lớp phủ tối với chữ trắng. Các section chứa nhiều dữ liệu sử dụng **nền trắng với điểm nhấn màu tím đậm** nhằm tối ưu khả năng đọc. Màu tím cũng là màu sắc nhận diện thương hiệu của VSICO.

---

## Cấu trúc trang

Mạch dẫn dắt nội dung tuân theo: _Tại sao chọn Chân Mây → Năng lực cảng → Những giá trị khách hàng nhận được → Niềm tin & Uy tín → Liên hệ._

| #    | Section                                      | Mục đích                                                                                |
| ---- | -------------------------------------------- | --------------------------------------------------------------------------------------- |
| 0    | **Hero**                                     | Video tràn màn hình, H1, dải chỉ số nổi bật (counter strip), dòng giới thiệu chính sách |
| I    | **Vị trí (Location)**                        | Hoạt ảnh bản đồ tuyến EWEC, khoảng cách tới 6 khu công nghiệp trọng điểm                |
| II   | **Cảng + ICD Lao Bảo**                       | Chuỗi logistics tích hợp khép kín, không đứt gãy                                        |
| III  | **Giải pháp toàn diện (Complete Solutions)** | Port to Port, ICD to Port, Door to Door; sơ đồ luồng vận hành điều khiển theo cuộn      |
| IV   | **Hạ tầng, Năng lực & Con người**            | Cầu bến, trang thiết bị, đội ngũ 250 nhân sự, timeline 2 tầng và đếm ngược              |
| V    | **Dịch vụ cảng (Port Services)**             | 3 nhóm thẻ dịch vụ được phân loại khoa học                                              |
| VI   | **Chính sách hỗ trợ (Support Policies)**     | 2 tab (Hãng tàu / Chủ hàng & forwarder) + công cụ tính toán ưu đãi                      |
| VII  | **Về VSICO (About VSICO)**                   | Đội tàu, mạng lưới kho bãi toàn quốc, biểu đồ sản lượng & doanh thu, đơn vị kiểm toán   |
| VIII | **Chứng nhận & Khách hàng**                  | 4 tab chứng chỉ chất lượng quốc tế, tường logo khách hàng lớn                           |
| IX   | **Liên hệ (Contact)**                        | Biểu mẫu đăng ký, địa chỉ văn phòng, hotline                                            |

### Các chỉ số tiêu đề nổi bật (Dải counter ở Hero)

`02` bến · `540 m` chiều dài bến · `-14 m` độ sâu · `20,4 ha` · `4.000 TEU / 70.000 DWT`

---

## Các tính năng chính

- **Video Hero toàn màn hình** kèm ảnh poster và phương án dự phòng khi người dùng bật chế độ giảm chuyển động (reduced-motion).
- **Bản đồ động tuyến EWEC** (MapLibre GL): Nam Lào, Đông Bắc Thái Lan, Bắc Campuchia → Lao Bảo → Chân Mây.
- **Bản đồ tương tác cự ly** từ cảng Chân Mây tới 6 khu công nghiệp lân cận.
- **Sơ đồ chuỗi luồng logistics theo cuộn**: Nhà máy/Kho hàng → Xe tải → ICD → Cảng → Tàu → Cảng đích → Kho hàng.
- **Timeline 2 tầng** với trạng thái tự động (Đang hoạt động / Sắp diễn ra) tính toán theo ngày tháng.
- **Đồng hồ đếm ngược** tới cột mốc tháng 9/2027 (Bến số 5 và ICD Lao Bảo đi vào vận hành).
- **Công cụ tính toán chính sách hỗ trợ** dành riêng cho hãng tàu và chủ hàng.
- **Biểu đồ trực quan** sản lượng (TEU) và doanh thu (tỷ đồng) giai đoạn 2023–2025.
- **Trình xem chứng chỉ** chia theo tab, hỗ trợ nhấn để phóng to chi tiết.
- **Giao diện song ngữ** hoàn chỉnh (Tiếng Việt / Tiếng Anh).
- **Biểu mẫu đăng ký** kèm lựa chọn vai trò (hãng tàu, chủ hàng, forwarder) và xác thực dữ liệu phía client.
- **Translate** dịch tiếng việt sang anh bằng ai, gửi nội dung và promt lên agent (model: gemini3.5 flash) - mặc định là tiếng việt

---

## Công nghệ sử dụng

| Lĩnh vực                          | Công cụ / Thư viện                                                   |
| --------------------------------- | -------------------------------------------------------------------- |
| Framework                         | Next.js (App Router)                                                 |
| Ngôn ngữ                          | TypeScript                                                           |
| Định kiểu (Styling)               | Tailwind CSS                                                         |
| UI primitives                     | shadcn/ui (Radix): tabs, dialog, accordion                           |
| Hoạt ảnh theo cuộn                | GSAP + ScrollTrigger                                                 |
| Cuộn mượt (Smooth scroll)         | Lenis                                                                |
| Vi tương tác (Micro-interactions) | Framer Motion (tùy chọn; có thể dùng thuần GSAP để giảm bundle size) |
| Bản đồ                            | MapLibre GL qua `react-map-gl`                                       |
| Biểu đồ                           | Recharts                                                             |
| Đa ngôn ngữ (i18n)                | next-intl                                                            |
| Biểu mẫu (Forms)                  | react-hook-form + zod                                                |
| Tiện ích                          | clsx, tailwind-merge                                                 |
| Font chữ                          | `next/font` (Playfair Display, Be Vietnam Pro, Montserrat)           |
| Quản lý gói                       | pnpm                                                                 |
| Tiêu chuẩn chất lượng             | ESLint, Prettier (với plugin Tailwind)                               |
| Lưu trữ & Triển khai              | Vercel (bản dựng preview tự động theo nhánh)                         |

---

## Bắt đầu nhanh

### Yêu cầu môi trường

- Node.js 20 LTS trở lên
- pnpm (`npm install -g pnpm`)

### Cài đặt

```bash
git clone <repository-url>
cd vsico-hue-port-website
pnpm install
```

### Biến môi trường

Sao chép file mẫu và điền các giá trị cần thiết:

```bash
cp .env.example .env.local
```

| Biến                        | Mô tả                                           | Bắt buộc                        |
| --------------------------- | ----------------------------------------------- | ------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | URL chuẩn của trang web (dùng cho metadata/SEO) | Khuyến nghị                     |
| `NEXT_PUBLIC_MAP_STYLE_URL` | URL style JSON của MapLibre                     | Bắt buộc nếu dùng bản đồ online |

### Các lệnh thực thi

```bash
pnpm dev        # khởi chạy dev server
pnpm build      # tạo bản build production
pnpm start      # chạy bản build production
pnpm lint       # chạy kiểm tra ESLint
pnpm typecheck  # chạy kiểm tra kiểu TypeScript mà không xuất file
pnpm format     # định dạng mã nguồn bằng Prettier
```

---

## Cấu trúc thư mục dự án

```text
vsico-hue-port-website/
├── public/
│   ├── videos/               # video hero (MP4 + WebM) và ảnh poster
│   ├── images/               # hình ảnh định dạng WebP đã tối ưu
│   ├── logos/                # logo khách hàng và đối tác
│   └── certificates/         # hình ảnh chứng chỉ và giấy phép
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx    # nạp font, provider, metadata
│   │       └── page.tsx      # tổng hợp và ghép nối các section
│   ├── components/
│   │   ├── sections/         # Hero, Location, PortIcd, Solutions, Infrastructure, ...
│   │   ├── ui/               # các component nguyên mẫu từ shadcn/ui
│   │   ├── motion/           # wrapper hoạt ảnh tái sử dụng (Reveal, Counter, Countdown)
│   │   ├── map/              # EwecMap, IndustrialZoneMap
│   │   └── charts/           # OutputChart, RevenueChart
│   ├── data/                 # dữ liệu nghiệp vụ có định kiểu (xem chi tiết bên dưới)
│   │   ├── stats.ts
│   │   ├── industrial-zones.ts
│   │   ├── timeline.ts
│   │   ├── services.ts
│   │   ├── policies.ts
│   │   ├── certificates.ts
│   │   ├── customers.ts
│   │   └── company.ts
│   ├── hooks/                # useCountdown, useReducedMotion, ...
│   ├── lib/                  # đăng ký gsap, bộ định dạng Intl, tiện ích
│   ├── messages/
│   │   ├── vi.json           # từ điển tiếng Việt
│   │   └── en.json           # từ điển tiếng Anh
│   ├── styles/
│   │   └── globals.css       # các tầng Tailwind và design token
│   └── i18n/                 # định tuyến và cấu hình request cho next-intl
├── .env.example
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Quản lý nội dung và dữ liệu

Tất cả nội dung số liệu thực tế được quản lý tập trung trong `src/data/*.ts` và `src/messages/*.json`. **Tuyệt đối không hard-code các con số bên trong component.** Điều này giúp việc cập nhật dễ dàng và việc kiểm duyệt nội dung luôn chính xác.

### Dữ liệu mốc thời gian (`data/timeline.ts`)

Mỗi cột mốc đều có định dạng ngày chuẩn ISO. Trạng thái và đồng hồ đếm ngược được tính toán tự động khi chạy (runtime):

```ts
export type Milestone = {
  id: string;
  date: string; // Ngày ISO, ví dụ: "2026-08-01"
  titleKey: string; // i18n key tương ứng
};

export const milestones: Milestone[] = [
  { id: "berth-4", date: "2026-08-01", titleKey: "timeline.berth4" },
  { id: "berth-5", date: "2027-09-01", titleKey: "timeline.berth5" },
  { id: "icd-lao-bao", date: "2027-09-01", titleKey: "timeline.icdLaoBao" },
];
```

> Ngày cụ thể của từng cột mốc hiện là giá trị giữ chỗ (placeholder) ngày mùng 1 của tháng. Tài liệu gốc chỉ nêu tháng và năm, cần xác nhận thêm với VSICO.

Cột mốc nào có ngày trong quá khứ sẽ hiển thị là **Đang hoạt động** (dấu chấm tím đậm). Cột mốc trong tương lai sẽ hiển thị là **Sắp diễn ra** (dấu chấm viền ngoài) và làm mốc kích hoạt đồng hồ đếm ngược.

### Công cụ tính chính sách hỗ trợ (`data/policies.ts`)

| Đối tượng thụ hưởng | Mức hỗ trợ                                    | Điều kiện / Ghi chú          |
| ------------------- | --------------------------------------------- | ---------------------------- |
| Hãng tàu            | 210.000.000 VNĐ / chuyến (khoảng 8.000 USD)   | Tối thiểu 2 chuyến / tháng   |
| Chủ hàng            | 800.000 VNĐ / container 20' (khoảng 32 USD)   | Chính sách hỗ trợ từ TP. Huế |
| Chủ hàng            | 1.100.000 VNĐ / container 40' (khoảng 44 USD) | Chính sách hỗ trợ từ TP. Huế |

Công cụ tính toán chỉ đọc các hằng số từ file này. Thời hạn hiệu lực của chính sách sẽ được bổ sung vào file sau khi được xác nhận chính thức.

### Cự ly kết nối tới các KCN (`data/industrial-zones.ts`)

| Khu công nghiệp     | Khoảng cách từ cảng Chân Mây |
| ------------------- | ---------------------------- |
| KCN Hòa Khánh       | 35 km                        |
| KCN Đà Nẵng         | 46 km                        |
| KCN Phú Bài         | 48 km                        |
| KCN Quảng Trị       | 117 km                       |
| KCN Bắc Chu Lai     | 134 km                       |
| KCN VSIP Quảng Ngãi | 167 km                       |

---

## Đa ngôn ngữ

- Ngôn ngữ hỗ trợ: `vi` (mặc định) và `en`.
- Định tuyến: `/vi/...` và `/en/...` thông qua `next-intl`.
- Toàn bộ văn bản hiển thị cho người dùng đặt trong `src/messages/{locale}.json`, gom nhóm theo từng section (`hero`, `location`, `portIcd`,...).
- Định dạng số, tiền tệ và ngày tháng sử dụng bộ định dạng chuẩn `Intl` đồng bộ theo ngôn ngữ đang chọn.
- Luôn giữ hai file ngôn ngữ đồng bộ hoàn toàn. Việc thiếu key phải làm build thất bại trong quy trình CI.

---

## Hệ thống thiết kế

### Bảng màu (Colors)

Màu tím đặc trưng của thương hiệu trên các bề mặt trung tính. Định nghĩa thành các biến CSS / Tailwind token trong `globals.css`.

| Token               | Giá trị gợi ý             | Mục đích sử dụng                                    |
| ------------------- | ------------------------- | --------------------------------------------------- |
| `--color-primary`   | `#4C1D95` đến `#6D28D9`   | Điểm nhấn, tiêu đề trên section sáng, nút bấm chính |
| `--color-ink`       | Xanh navy gần đen         | Các section tối, lớp phủ video                      |
| `--color-surface`   | Trắng                     | Các section chứa bảng biểu, số liệu                 |
| `--color-muted`     | Xám trung tính            | Nội dung phụ, chú thích                             |
| `--color-highlight` | Vàng kim ấm hoặc hổ phách | Điểm nhấn đặc biệt (bộ đếm, chỉ số chính)           |

Đảm bảo độ tương phản văn bản đạt chuẩn WCAG AA trở lên, đặc biệt là chữ màu tím trên nền trắng.

### Kiểu chữ (Typography)

| Vai trò                        | Font chữ             |
| ------------------------------ | -------------------- |
| Tiêu đề (Headings)             | **Playfair Display** |
| Thân bài (Body)                | **Be Vietnam Pro**   |
| Nhãn chữ in hoa nhỏ, khẩu hiệu | **Montserrat**       |

- Nạp font bằng `next/font/google` và **bắt buộc bao gồm tập con `vietnamese`**, nếu không các ký tự có dấu sẽ bị rơi về font hệ thống.
- Chiều cao dòng của tiêu đề (`line-height`) từ 1.2 trở lên để tránh hiện tượng dấu thanh tiếng Việt xếp chồng va chạm vào nhau.
- Giới hạn tối đa 3 font chữ và khoảng 3 độ đậm trên toàn bộ trang.

```ts
import { Playfair_Display, Be_Vietnam_Pro, Montserrat } from "next/font/google";

export const heading = Playfair_Display({ subsets: ["latin", "vietnamese"] });
export const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});
export const label = Montserrat({ subsets: ["latin", "vietnamese"] });
```

### Ký hiệu đánh dấu section

Mỗi section lớn đều được định danh bằng một **chữ số La Mã** nổi bật (I, II, III, ...) như một điểm nhấn nhận diện thị giác xuyên suốt.

---

## Hướng dẫn về hoạt ảnh

- Đăng ký các plugin GSAP một lần duy nhất tại `src/lib/gsap.ts`. Không đăng ký lại trong từng component.
- Khởi tạo **Lenis** một lần ở cấp layout và đồng bộ trực tiếp với ScrollTrigger.
- Sử dụng các wrapper từ thư mục `components/motion/` thay vì tự viết tween lẻ trong section.
- Dọn dẹp mọi ScrollTrigger khi component unmount (`gsap.context` / `ctx.revert()`).
- Chỉ tạo hoạt ảnh cho thuộc tính `transform` và `opacity`. Tránh tạo chuyển động cho các thuộc tính tác động layout (width, height, top, left).
- **Luôn tôn trọng thiết lập `prefers-reduced-motion`**: tắt pinning, tắt hiệu ứng parallax, tắt autoplay video và hiển thị trạng thái tĩnh thay thế.
- Kiểm tra sớm các hiệu ứng cuộn trên thiết bị di động (các section pinned là nguyên nhân phổ biến nhất gây lỗi trên mobile).

---

## Hiệu năng và khả năng tiếp cận

### Đa phương tiện

- **Video Hero:** Nén dung lượng xuống vài MB, cung cấp cả hai định dạng MP4 và WebM, có ảnh đại diện `poster`, tắt tiếng, lặp lại và không tự phát khi người dùng bật reduced motion.
- **Hình ảnh:** Sử dụng `next/image` với định dạng xuất WebP. File trình chiếu gốc rất nặng (~72 MB), tuyệt đối không commit tài nguyên ảnh thô trực tiếp từ đó vào repo.
- **Chứng chỉ:** Nén đủ độ sắc nét để đọc được khi zoom, áp dụng lazy-load cho ảnh trong từng tab.
- Lazy-load các component nặng (bản đồ, biểu đồ) bằng dynamic import.

### Khả năng tiếp cận (Accessibility)

- Đầy đủ các landmark ngữ nghĩa, thứ tự tiêu đề mạch lạc (chỉ có duy nhất một thẻ `h1`).
- Các tab, hộp thoại dialog và nút chuyển đổi ngôn ngữ phải điều khiển tốt hoàn toàn bằng bàn phím (Radix UI hỗ trợ sẵn phần lớn).
- Văn bản thay thế (`alt`) đầy đủ cho hình ảnh, logo và trình xem chứng chỉ.
- Độ tương phản đạt chuẩn trên các lớp phủ video.
- Trạng thái focus nhìn rõ ràng.

### Mục tiêu chuẩn

- Điểm Lighthouse Performance, Accessibility và SEO đạt từ 90 trở lên trên thiết bị di động.
- Tránh dịch chuyển giao diện (CLS) từ font và media (khai báo kích thước rõ ràng và dùng `next/font`).

---

## Triển khai (Deployment)

Dự án được tối ưu hóa cho nền tảng **Vercel**.

1. Nhập kho lưu trữ (repository) vào Vercel.
2. Cấu hình các biến môi trường theo hướng dẫn trong `.env.example`.
3. Mỗi Pull Request sẽ tự động sinh ra một **Preview URL** để kiểm thử và đánh giá.
4. Nhánh `main` sau khi merge sẽ tự động triển khai lên môi trường Production.

Dự án cũng hoàn toàn tương thích với Netlify hoặc bất kỳ máy chủ Node.js tiêu chuẩn nào.

---

## Quy trình Git

- Nhánh: `main` (môi trường ổn định), `develop` (môi trường tích hợp), `feature/<tên>`, `fix/<tên>`.
- Định dạng thông điệp commit tuân thủ [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(hero): add fullscreen video with reduced-motion fallback
fix(timeline): compute milestone status from ISO date
docs: update README content status
```

- Mở Pull Request vào nhánh `develop`, yêu cầu ít nhất một lượt review phê duyệt.
- Luôn chạy `pnpm lint` và `pnpm typecheck` trước khi thực hiện push code.

---

## Trạng thái nội dung

Các dữ liệu sử dụng trên website được trích xuất từ tài liệu thuyết trình chính thức của Cảng VSICO Chân Mây Huế. Các mục dưới đây đang chờ xác nhận bổ sung trước khi công bố ra công chúng:

| Hạng mục                                                        | Trạng thái       |
| --------------------------------------------------------------- | ---------------- |
| Bến số 4 đi vào hoạt động từ tháng 8/2026                       | Đã xác nhận      |
| Bến số 5 và ICD Lao Bảo đi vào hoạt động từ tháng 9/2027        | Đã xác nhận      |
| Quyền công bố các giấy phép và chứng chỉ quốc tế                | Đã xác nhận      |
| Dịch vụ **Door to Door** và phạm vi phục vụ                     | **Chờ xác nhận** |
| **Thời hạn hiệu lực** của chính sách hỗ trợ từ TP. Huế và VSICO | **Chờ xác nhận** |
| **Quyền hiển thị logo khách hàng** trên website                 | **Chờ xác nhận** |
| Ngày cụ thể của các mốc sự kiện (hiện chỉ biết tháng)           | Chờ xác nhận     |

**Quy tắc dùng từ ngữ:**

- Biểu đồ sản lượng và doanh thu là số liệu của **toàn bộ tập đoàn VSICO**, không phải của riêng Cảng Huế. Cần ghi nhãn rõ ràng.
- Sử dụng chữ **"khách hàng"** (không dùng "đối tác") cho khu vực tường logo, đúng theo tài liệu gốc.
- Mô tả lợi ích tối ưu hóa chi phí theo hướng định tính. Tuyệt đối không tự ý công bố số phần trăm tiết kiệm cụ thể.
- Tránh sử dụng các từ ngữ cấp cao nhất chưa kiểm chứng như: "độc quyền", "tuyến ngắn nhất", "độc nhất vô nhị".

---

## Lộ trình phát triển

- [x] Thiết lập Next.js, TypeScript, Tailwind, ESLint, Prettier
- [x] Cấu hình font chữ, design token và hệ thống đa ngôn ngữ i18n
- [x] Xây dựng Hero, dải counter chỉ số và dòng giới thiệu chính sách
- [x] Xây dựng section Vị trí (Location) kèm bản đồ EWEC và bản đồ cự ly KCN
- [x] Xây dựng section Cảng + ICD Lao Bảo và Giải pháp toàn diện (Complete Solutions)
- [x] Xây dựng section Hạ tầng, Năng lực & Con người kèm timeline và đồng hồ đếm ngược
- [x] Xây dựng Dịch vụ cảng và Chính sách hỗ trợ kèm công cụ tính toán ưu đãi
- [x] Xây dựng section Về VSICO kèm biểu đồ tăng trưởng
- [x] Xây dựng Chứng nhận quốc tế và Tường logo khách hàng
- [x] Xây dựng Biểu mẫu liên hệ và Chân trang (Footer)
- [x] Hoàn thiện nội dung dịch thuật tiếng Anh
- [x] Kiểm thử hiệu năng, khả năng tiếp cận và hiển thị trên di động
- [x] Triển khai bản xem trước (preview) và tiếp nhận phản hồi

---

## Thông tin liên hệ

**Cảng VSICO Huế**
Khu kinh tế Chân Mây – Lăng Cô, Thành phố Huế

**Trụ sở Tập đoàn VSICO**
Tầng 3, tháp 1, tòa nhà Times Tower, 35 Lê Văn Lương, Thanh Xuân, Hà Nội

Hotline: (+84) 243 77 11 089 · Website: [www.vsico.com.vn](https://www.vsico.com.vn)

---

> Kho lưu trữ này là dự án nội bộ của VSICO. Nội dung, nhãn hiệu, logo và chứng chỉ của các công ty thuộc quyền sở hữu của các chủ sở hữu tương ứng.
