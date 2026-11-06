export type NewsArticle = {
  id: string;
  slug: string;
  titleVi: string;
  titleEn: string;
  category: "featured" | "maritime" | "internal" | "shareholders";
  categoryNameVi: string;
  categoryNameEn: string;
  date: string;
  dateIso: string;
  imageUrl: string;
  summaryVi: string;
  summaryEn: string;
  contentVi?: string[];
  contentEn?: string[];
  externalUrl?: string;
};

export const chanMayNewsCategories = [
  { id: "all", labelVi: "Tất cả tin tức", labelEn: "All News" },
  { id: "featured", labelVi: "Sự kiện nổi bật", labelEn: "Featured Events" },
  { id: "maritime", labelVi: "Vận tải & Hàng hải", labelEn: "Maritime & Logistics" },
  { id: "internal", labelVi: "Tin nội bộ & Đoàn thể", labelEn: "Corporate & Community" },
  { id: "shareholders", labelVi: "Quan hệ cổ đông", labelEn: "Shareholder Relations" },
];

export const chanMayNewsList: NewsArticle[] = [
  {
    id: "news-01",
    slug: "toa-dam-20-10-2026",
    titleVi: "Tổ chức tọa đàm 20/10: Kiến tạo môi trường làm việc nhân văn và gắn kết",
    titleEn: "October 20 Symposium: Cultivating a Human-Centric & Collaborative Workplace",
    category: "internal",
    categoryNameVi: "Tin nội bộ",
    categoryNameEn: "Corporate News",
    date: "20/10/2026",
    dateIso: "2026-10-20",
    imageUrl: "/images/people/tmp-port-staff-01.webp",
    summaryVi:
      "Công đoàn và Ban Nữ công Công ty Cổ phần Cảng Chân Mây tổ chức chương trình gặp mặt, tọa đàm chúc mừng ngày Phụ nữ Việt Nam 20/10, ghi nhận những cống hiến xuất sắc của nữ cán bộ công nhân viên.",
    summaryEn:
      "The Trade Union and Women's Committee of Chan May Port JSC organized a symposium celebrating Vietnamese Women's Day, honoring female employees' outstanding contributions.",
    externalUrl: "https://chanmayport.com.vn/tin-tuc/tin-tuc-su-kien-noi-bat/toa-dam-20-10-2026.html",
  },
  {
    id: "news-02",
    slug: "nyk-line-don-tau-cho-o-to",
    titleVi: "Lần đầu tiên Cảng Chân Mây đón tàu chuyên chở ô tô xuất khẩu (NYK Line)",
    titleEn: "Chan May Port Welcomes Dedicated Ro-Ro Car Carrier Vessel for the First Time",
    category: "maritime",
    categoryNameVi: "Vận tải & Hàng hải",
    categoryNameEn: "Maritime & Logistics",
    date: "18/09/2026",
    dateIso: "2026-09-18",
    imageUrl: "/images/port/port-aerial-01.webp",
    summaryVi:
      "Đánh dấu cột mốc lịch sử khi chuyến tàu chuyên chở ô tô Ro-Ro của hãng tàu quốc tế NYK Line cập cầu bến Chân Mây thành công, mở ra tuyến vận chuyển xe thành phẩm cho các tổ hợp sản xuất ô tô tại Thừa Thiên Huế.",
    summaryEn:
      "A historic milestone as international carrier NYK Line's pure car carrier berthed at Chan May Port, opening vehicle export corridors for automotive hubs in Thua Thien Hue.",
    externalUrl: "https://chanmayport.com.vn/tin-tuc/tin-tuc-su-kien-noi-bat/nyk-line-2026.html",
  },
  {
    id: "news-03",
    slug: "du-lich-he-2026-gan-ket",
    titleVi: "Du lịch Hè 2026 – Gắn kết để phát triển bền vững",
    titleEn: "Summer Company Retreat 2026 – Uniting for Sustainable Growth",
    category: "internal",
    categoryNameVi: "Tin nội bộ",
    categoryNameEn: "Corporate News",
    date: "04/08/2026",
    dateIso: "2026-08-04",
    imageUrl: "/images/warehouse/tmp-warehouse-01.webp",
    summaryVi:
      "Chương trình sinh hoạt dã ngoại thường niên dành cho tập thể cán bộ công nhân viên cảng nhằm thắt chặt tinh thần đoàn kết, tái tạo năng lượng cho các chiến dịch bốc dỡ cao điểm cuối năm.",
    summaryEn:
      "Annual team-building and recreation retreat for port staff, fostering strong camaraderie and revitalizing energy for peak stevedoring seasons.",
    externalUrl: "https://chanmayport.com.vn/tin-tuc/tin-tuc-su-kien-noi-bat/dulich2026.html",
  },
  {
    id: "news-04",
    slug: "ky-niem-23-nam-thanh-lap-cang-chan-may",
    titleVi: "Kỷ niệm 136 năm ngày sinh Bác Hồ và 23 năm thành lập Công ty Cổ phần Cảng Chân Mây",
    titleEn: "Commemorating 23rd Anniversary of Chan May Port Foundation",
    category: "featured",
    categoryNameVi: "Sự kiện nổi bật",
    categoryNameEn: "Featured Events",
    date: "19/05/2026",
    dateIso: "2026-05-19",
    imageUrl: "/images/port/tmp-port-berth-01.webp",
    summaryVi:
      "Nhìn lại chặng đường 23 năm xây dựng và trưởng thành từ ngày khánh thành Bến số 1 (19/05/2003 – 19/05/2026), Cảng Chân Mây đã vươn mình thành cụm cảng nước sâu hiện đại hàng đầu khu vực miền Trung.",
    summaryEn:
      "Reflecting on 23 years of evolution since the opening of Berth 1 (19/05/2003 - 19/05/2026), Chan May Port has transformed into a leading modern deep-water port hub in Central Vietnam.",
    externalUrl: "https://chanmayport.com.vn/tin-tuc/tin-tuc-su-kien-noi-bat/kn23namthanhlap.html",
  },
  {
    id: "news-05",
    slug: "dai-hoi-dong-co-dong-thuong-nien-2026",
    titleVi: "Cảng Chân Mây tổ chức thành công Đại hội đồng Cổ đông thường niên năm 2026",
    titleEn: "Annual General Meeting of Shareholders 2026 Successfully Held",
    category: "shareholders",
    categoryNameVi: "Quan hệ cổ đông",
    categoryNameEn: "Shareholders",
    date: "10/04/2026",
    dateIso: "2026-04-10",
    imageUrl: "/images/port/tmp-port-layout-01.webp",
    summaryVi:
      "Đại hội đã biểu quyết thông qua báo cáo kết quả hoạt động SXKD năm 2025, kế hoạch doanh thu – sản lượng năm 2026, phương án phân phối lợi nhuận và định hướng mở rộng chuỗi dịch vụ logistics.",
    summaryEn:
      "Shareholders approved the 2025 operational results, 2026 revenue and throughput targets, dividend distribution, and logistics expansion strategy.",
    externalUrl: "https://chanmayport.com.vn/tin-tuc/tin-tuc-su-kien-noi-bat/dhdcdtn2026.html",
  },
  {
    id: "news-06",
    slug: "don-khach-du-lich-tau-bien-2026",
    titleVi: "Cảng Chân Mây đón những du khách quốc tế đầu tiên bằng tàu biển năm 2026",
    titleEn: "Welcoming the First International Cruise Tourists of 2026 via Luxury Liner",
    category: "featured",
    categoryNameVi: "Sự kiện nổi bật",
    categoryNameEn: "Featured Events",
    date: "01/01/2026",
    dateIso: "2026-01-01",
    imageUrl: "/images/port/port-aerial-02.webp",
    summaryVi:
      "Ngay trong ngày đầu năm mới 2026, Cảng Chân Mây đã đón siêu tàu du lịch Adora Mediterranea đưa hơn 2.500 du khách quốc tế cập cảng, mở màn cho một năm du lịch hàng hải sôi động.",
    summaryEn:
      "On New Year's Day 2026, mega cruise ship Adora Mediterranea carried over 2,500 global passengers to Chan May Port, kicking off a vibrant maritime tourism season.",
    externalUrl: "https://chanmayport.com.vn/tin-tuc/tin-tuc-su-kien-noi-bat/2026-adora-mediterranea.html",
  },
  {
    id: "news-07",
    slug: "logistics-xuyen-bien-gioi-mien-trung",
    titleVi: "Logistics xuyên biên giới – Sức bật tăng trưởng vùng Bắc Trung Bộ và Duyên hải miền Trung",
    titleEn: "Cross-Border Logistics: Engine of Growth for North Central & Coastal Regions",
    category: "maritime",
    categoryNameVi: "Vận tải & Hàng hải",
    categoryNameEn: "Maritime & Logistics",
    date: "26/08/2025",
    dateIso: "2025-08-26",
    imageUrl: "/images/icd/tmp-icd-laobao-01.webp",
    summaryVi:
      "Hội thảo chuyên đề kết nối hạ tầng cảng biển Chân Mây với hệ sinh thái kho bãi, ICD cửa khẩu và các khu công nghiệp trọng điểm trên toàn tuyến Hành lang Đông – Tây.",
    summaryEn:
      "Specialized symposium on connecting Chan May seaport infrastructure with ICD border nodes and major industrial zones along the East–West Corridor.",
    externalUrl: "https://chanmayport.com.vn/tin-tuc/tin-tuc-su-kien-noi-bat/logistics-2025.html",
  },
  {
    id: "news-08",
    slug: "dai-hoi-cong-doan-nhiem-ky-2025-2030",
    titleVi: "Tổ chức thành công Đại hội Công đoàn Cảng Chân Mây lần thứ VII (Nhiệm kỳ 2025–2030)",
    titleEn: "Successful 7th Trade Union Congress of Chan May Port (Term 2025–2030)",
    category: "internal",
    categoryNameVi: "Tin nội bộ",
    categoryNameEn: "Corporate News",
    date: "01/11/2025",
    dateIso: "2025-11-10",
    imageUrl: "/images/port/tmp-port-crane-01.webp",
    summaryVi:
      "Đại hội đề ra phương hướng chăm lo đời sống người lao động, đẩy mạnh phong trào phát huy sáng kiến cải tiến kỹ thuật, nâng cao năng suất bốc dỡ an toàn tại các cầu bến.",
    summaryEn:
      "Setting directions for worker welfare, engineering innovations, and enhancing safe stevedoring productivity across all port berths.",
    externalUrl: "https://chanmayport.com.vn/tin-tuc/tin-tuc-su-kien-noi-bat/hdcd-cmp-2025.html",
  },
];
