import { getLocale, getTranslations } from "next-intl/server";
import { countdownTargetIso } from "@/data/timeline";
import { type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  InfrastructureClient,
  type InfrastructureRowItem,
} from "./InfrastructureClient";

export async function Infrastructure() {
  const t = await getTranslations("infrastructure");
  const locale = (await getLocale()) as SupportedLocale;

  // Tính số ngày đếm ngược động tới mốc 09/2027 (2027-09-01)
  const targetTime = new Date(countdownTargetIso).getTime();
  const now = Date.now();
  const daysRemaining = Math.max(
    0,
    Math.ceil((targetTime - now) / (1000 * 60 * 60 * 24)),
  );

  const rows: InfrastructureRowItem[] = [
    {
      id: "berths",
      num: "01",
      title: locale === "vi" ? "Cầu bến" : "Berths & Quay",
      metric: "20,4 ha · 540 m · −14 m",
      image: "/images/port/tmp-port-layout-01.webp",
      imageAlt:
        locale === "vi"
          ? "Sơ đồ quy hoạch 3D Cảng Chân Mây"
          : "3D Masterplan of Chan May Port",
      hash: "#berths",
    },
    {
      id: "equipment",
      num: "02",
      title: locale === "vi" ? "Thiết bị xếp dỡ" : "Cargo Handling Equipment",
      metric:
        locale === "vi"
          ? "5 cẩu bờ Weihua 45t-45m"
          : "5 Weihua 45t-45m STS Cranes",
      image: "/images/port/tmp-port-crane-01.webp",
      imageAlt:
        locale === "vi"
          ? "Cẩu bờ Weihua 45t-45m tại tiền phương cảng"
          : "Weihua 45t-45m STS Crane at berth",
      hash: "#equipment",
    },
    {
      id: "workforce",
      num: "03",
      title: locale === "vi" ? "Nhân sự" : "Workforce & Operations",
      metric: locale === "vi" ? "250 người" : "250 personnel",
      image: "/images/people/tmp-port-staff-01.webp",
      imageAlt:
        locale === "vi"
          ? "Đội ngũ nhân sự chuyên môn cao tại cảng"
          : "Port operations personnel",
      hash: "#workforce",
    },
  ];

  return (
    <section
      id="infrastructure"
      className="relative overflow-hidden border-t border-border bg-surface py-20 lg:py-28"
    >
      <div className="container">
        {/* Tiêu đề tối giản: Bỏ mô tả dưới tiêu đề theo yêu cầu */}
        <SectionHeading
          roman={t("roman")}
          eyebrow={locale === "vi" ? "V · HẠ TẦNG & NĂNG LỰC" : "V · INFRASTRUCTURE & CAPACITY"}
          title={locale === "vi" ? "Hạ tầng cảng nước sâu" : "Deep-Water Port Infrastructure"}
        />

        {/* Khối tương tác Hạ tầng & Lộ trình thời gian duy nhất */}
        <InfrastructureClient
          locale={locale}
          rows={rows}
          viewDetailsLabel={
            locale === "vi" ? "Xem chi tiết hạ tầng" : "View infrastructure details"
          }
          timelineTitle={locale === "vi" ? "LỘ TRÌNH" : "ROADMAP"}
          daysRemaining={daysRemaining}
          phase1Label={locale === "vi" ? "Giai đoạn 1" : "Phase 1"}
          phase1Volume="120.000 TEU"
          phase1Moves="40–45 moves/giờ"
          phase2Label={locale === "vi" ? "Giai đoạn 2" : "Phase 2"}
          phase2Moves="80–85 moves/giờ"
          berth4Title={locale === "vi" ? "Bến số 4" : "Berth 4"}
          berth4Status={locale === "vi" ? "Đã vận hành" : "Operating"}
          berth5Title={
            locale === "vi"
              ? "Bến số 5 & ICD Lao Bảo"
              : "Berth 5 & Lao Bao ICD"
          }
          berth5Status={locale === "vi" ? "Sắp tới" : "Upcoming"}
          countdownPrefix={locale === "vi" ? "Còn" : "Only"}
          countdownSuffix={
            locale === "vi" ? "ngày tới 09/2027" : "days until 09/2027"
          }
          countdownEstNote={locale === "vi" ? "(dự kiến)" : "(estimated)"}
        />
      </div>
    </section>
  );
}
