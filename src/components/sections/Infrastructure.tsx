import { getLocale, getTranslations } from "next-intl/server";
import { countdownTargetIso } from "@/data/timeline";
import { type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  InfrastructureClient,
  type InfrastructureRowItem,
  type MilestoneDisplayItem,
} from "./InfrastructureClient";

export async function Infrastructure() {
  const t = await getTranslations("infrastructure");
  const locale = (await getLocale()) as SupportedLocale;
  const isVi = locale === "vi";

  // Tính số ngày và thời gian đếm ngược ban đầu cho SSR
  const targetTime = new Date(countdownTargetIso).getTime();
  const now = Date.now();
  const diff = Math.max(0, targetTime - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const initialTimeLeft = { days, hours, minutes, seconds };

  const rows: InfrastructureRowItem[] = [
    {
      id: "berths",
      num: "01",
      title: isVi ? "Cầu bến" : "Berths & Quay",
      metric: "20,4 ha · 540 m · −14 m",
      image: "/images/port/tmp-port-layout-01.webp",
      imageAlt: isVi
        ? "Sơ đồ quy hoạch 3D Cảng Chân Mây"
        : "3D Masterplan of Chan May Port",
      hash: "#berths",
    },
    {
      id: "equipment",
      num: "02",
      title: isVi ? "Thiết bị xếp dỡ" : "Cargo Handling Equipment",
      metric: isVi ? "5 cẩu bờ Weihua 45t-45m" : "5 Weihua 45t-45m STS Cranes",
      image: "/images/port/tmp-port-crane-01.webp",
      imageAlt: isVi
        ? "Cẩu bờ Weihua 45t-45m tại tiền phương cảng"
        : "Weihua 45t-45m STS Crane at berth",
      hash: "#equipment",
    },
    {
      id: "workforce",
      num: "03",
      title: isVi ? "Nhân sự" : "Workforce & Operations",
      metric: isVi ? "250 người" : "250 personnel",
      image: "/images/people/tmp-port-staff-01.webp",
      imageAlt: isVi
        ? "Đội ngũ nhân sự chuyên môn cao tại cảng"
        : "Port operations personnel",
      hash: "#workforce",
    },
  ];

  // 3 Cột mốc lộ trình theo đúng slide chính thức của VSICO
  const milestones: MilestoneDisplayItem[] = [
    {
      id: "berth-4",
      badgeNum: "01",
      dateLabel: isVi ? "THÁNG 8/2026" : "AUGUST 2026",
      title: isVi
        ? "VSICO Huế Bến 4 đi vào hoạt động"
        : "VSICO Hue Berth 4 Enters Operation",
      statusLabel: isVi ? "Đã vận hành" : "Operating",
      isCompleted: true,
      phaseLabel: isVi
        ? "GIAI ĐOẠN 1 · NĂNG LỰC KHAI THÁC BAN ĐẦU"
        : "PHASE 1 · INITIAL OPERATIONAL CAPACITY",
      primaryMetric: "120.000 TEU",
      primaryMetricDesc: isVi
        ? "Sản lượng container mục tiêu giai đoạn đầu"
        : "Initial target container throughput",
      secondaryMetric: "40–45 moves/giờ",
      secondaryMetricDesc: isVi
        ? "Năng suất xếp dỡ giải phóng tàu nhanh"
        : "Fast vessel stevedoring productivity",
    },
    {
      id: "berth-5",
      badgeNum: "02",
      dateLabel: isVi ? "THÁNG 9/2027" : "SEPTEMBER 2027",
      title: isVi
        ? "VSICO Huế Bến 5 đi vào hoạt động"
        : "VSICO Hue Berth 5 Enters Operation",
      statusLabel: isVi ? "Sắp tới (dự kiến)" : "Upcoming (Estimated)",
      isCompleted: false,
      phaseLabel: isVi
        ? "GIAI ĐOẠN 2 · NHÂN ĐÔI NĂNG SUẤT TOÀN DIỆN"
        : "PHASE 2 · FULL-BERTH DOUBLED PRODUCTIVITY",
      primaryMetric: "80–85 moves/giờ",
      primaryMetricDesc: isVi
        ? "Năng suất khai thác đồng bộ toàn bến"
        : "Integrated dual-berth stevedoring rate",
      secondaryMetric: "540 m cầu bến",
      secondaryMetricDesc: isVi
        ? "Chiều dài bến liên tục Bến số 4 & Bến số 5"
        : "Continuous quay length across Berth 4 & 5",
    },
    {
      id: "icd-lao-bao",
      badgeNum: "03",
      dateLabel: isVi ? "THÁNG 9/2027" : "SEPTEMBER 2027",
      title: isVi
        ? "ICD Lao Bảo đi vào hoạt động"
        : "ICD Lao Bao Enters Operation",
      statusLabel: isVi ? "Sắp tới (dự kiến)" : "Upcoming (Estimated)",
      isCompleted: false,
      phaseLabel: isVi
        ? "HỆ SINH THÁI KHÉP KÍN · CỬA KHẨU ĐẾN CẢNG BIỂN"
        : "CLOSED CORRIDOR · BORDER TO DEEP SEAPORT",
      primaryMetric: "86.000 m²",
      primaryMetricDesc: isVi
        ? "Quy mô trung tâm logistics cửa khẩu"
        : "Border gate logistics hub area",
      secondaryMetric: "≈150 km hành lang",
      secondaryMetricDesc: isVi
        ? "Tuyến khép kín nối thẳng cầu bến Chân Mây"
        : "Closed corridor directly to Chan May berth",
    },
  ];

  return (
    <section
      id="infrastructure"
      className="relative overflow-hidden border-t border-border bg-surface py-20 lg:py-28"
    >
      <div className="container">
        {/* Tiêu đề Section V */}
        <SectionHeading
          roman={t("roman")}
          eyebrow={isVi ? "V · HẠ TẦNG & NĂNG LỰC" : "V · INFRASTRUCTURE & CAPACITY"}
          title={isVi ? "Hạ tầng cảng nước sâu" : "Deep-Water Port Infrastructure"}
        />

        {/* Khối tương tác Hạ tầng & Lộ trình thời gian */}
        <InfrastructureClient
          locale={locale}
          rows={rows}
          viewDetailsLabel={
            isVi ? "Xem chi tiết hạ tầng" : "View infrastructure details"
          }
          timelineTitle={isVi ? "LỘ TRÌNH PHÁT TRIỂN & TIẾN ĐỘ VẬN HÀNH" : "DEVELOPMENT ROADMAP & OPERATIONAL SCHEDULE"}
          targetIso={countdownTargetIso}
          initialTimeLeft={initialTimeLeft}
          countdownBadge={
            isVi ? "CỘT MỐC THÁNG 09/2027 (DỰ KIẾN)" : "SEPTEMBER 2027 MILESTONE (ESTIMATED)"
          }
          countdownTitle={
            isVi
              ? "Đếm ngược tới thời điểm Bến số 5 & ICD Lao Bảo hoàn thành"
              : "Countdown to Berth 5 & Lao Bao ICD Commissioning"
          }
          countdownSubtitle={
            isVi
              ? "Hoàn thiện 540 m cầu bến liên tục và hành lang logistics khép kín từ Cửa khẩu quốc tế Lao Bảo đến Cảng nước sâu Chân Mây."
              : "Completing 540 m continuous deep-water quay and seamless logistics corridor from Lao Bao International Border Gate to Chan May Port."
          }
          countdownUnits={{
            days: isVi ? "Ngày" : "Days",
            hours: isVi ? "Giờ" : "Hours",
            minutes: isVi ? "Phút" : "Mins",
            seconds: isVi ? "Giây" : "Secs",
          }}
          phase1Label={isVi ? "Giai đoạn 1 (08/2026 – 06/2027)" : "Phase 1 (08/2026 – 06/2027)"}
          phase2Label={isVi ? "Giai đoạn 2 (Từ 09/2027)" : "Phase 2 (From 09/2027)"}
          berth4Date="08/2026"
          berth5Date="09/2027"
          milestones={milestones}
        />
      </div>
    </section>
  );
}
