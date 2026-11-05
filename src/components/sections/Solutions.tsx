import { getTranslations } from "next-intl/server";
import { type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SolutionsClient, type FlowStepItem } from "./SolutionsClient";

type SolutionsProps = {
  locale: SupportedLocale;
};

export async function Solutions({ locale }: SolutionsProps) {
  const t = await getTranslations({ locale, namespace: "solutions" });

  const tabs = {
    portToPort: {
      id: "portToPort" as const,
      label: locale === "vi" ? "Port to Port" : "Port to Port",
    },
    icdToPort: {
      id: "icdToPort" as const,
      label: locale === "vi" ? "ICD – Cảng" : "ICD to Port",
    },
    doorToDoor: {
      id: "doorToDoor" as const,
      label: locale === "vi" ? "Door to Door" : "Door to Door",
    },
  };

  const steps: FlowStepItem[] = [
    {
      id: "origin-warehouse",
      stepNumber: "01",
      shortLabel: locale === "vi" ? "Kho" : "Origin",
      fullName:
        locale === "vi"
          ? "Kho / Nhà máy xuất phát"
          : "Origin Warehouse / Factory",
      description:
        locale === "vi"
          ? "Điểm đóng hàng xuất phát, kiểm đếm và niêm phong kẹp chì (seal) container tiêu chuẩn theo yêu cầu của chủ hàng."
          : "Initial cargo loading and staging into standardized containers with security seals.",
      image: "/images/warehouse/tmp-warehouse-01.webp",
      imageAlt:
        locale === "vi"
          ? "Kho hàng xuất phát đóng hàng container"
          : "Origin warehouse staging area",
    },
    {
      id: "trucking",
      stepNumber: "02",
      shortLabel: locale === "vi" ? "Xe" : "Truck",
      fullName:
        locale === "vi"
          ? "Đội xe vận tải đường bộ"
          : "Dedicated Road Fleet",
      description:
        locale === "vi"
          ? "Đội xe đầu kéo container 20'/40' và xe tải 2,5 – 14 tấn chuyên dụng vận chuyển an toàn chặng nội địa đầu tuyến."
          : "Fleet of 20'/40' container tractors and 2.5 – 14 ton trucks handling initial drayage.",
      image: "/images/warehouse/tmp-warehouse-02.webp",
      imageAlt:
        locale === "vi"
          ? "Đội xe vận tải đường bộ VSICO"
          : "VSICO trucking fleet",
    },
    {
      id: "icd-lao-bao",
      stepNumber: "03",
      shortLabel: locale === "vi" ? "ICD Lao Bảo" : "Lao Bao ICD",
      fullName:
        locale === "vi"
          ? "ICD Lao Bảo (Quảng Trị)"
          : "Lao Bao ICD (Quang Tri)",
      description:
        locale === "vi"
          ? "Gom hàng và thông quan ngay sát biên giới. Quy mô 86.000 m² đón đầu luồng hàng hóa hành lang kinh tế EWEC."
          : "Border cargo consolidation and customs clearance on 86,000 m² strategic dry port along EWEC.",
      image: "/images/icd/tmp-icd-laobao-01.webp",
      imageAlt:
        locale === "vi"
          ? "Toàn cảnh bãi container ICD Lao Bảo Quảng Trị"
          : "Lao Bao ICD dry port facility",
      isVsicoOwned: true,
    },
    {
      id: "chan-may-port",
      stepNumber: "04",
      shortLabel: locale === "vi" ? "Cảng Huế" : "Chan May Port",
      fullName:
        locale === "vi"
          ? "Cảng Chân Mây Huế"
          : "VSICO Chan May Port Hue",
      description:
        locale === "vi"
          ? "Cầu bến 540 m với mớn nước -14 m, xếp dỡ chuyên nghiệp với hệ thống cẩu bờ STS Weihua 45t-45m đón tàu 4.000 TEU & 70.000 DWT."
          : "540 m deep-water quay (-14 m draft) with high-efficiency STS Weihua 45t-45m container cranes.",
      image: "/images/port/tmp-port-berth-01.webp",
      imageAlt:
        locale === "vi"
          ? "Cầu bến Cảng Chân Mây Huế"
          : "Chan May Port berth facility",
      isVsicoOwned: true,
    },
    {
      id: "container-ship",
      stepNumber: "05",
      shortLabel: locale === "vi" ? "Tàu" : "Vessel",
      fullName:
        locale === "vi"
          ? "Đội tàu container VSICO"
          : "VSICO Container Fleet",
      description:
        locale === "vi"
          ? "Hải trình cố định kết nối Hải Phòng – Chân Mây Huế – TP.HCM và các tuyến Nội Á với tần suất 4 chuyến/tuần."
          : "Fixed-schedule feeder and domestic container routes operating at 4 trips/week.",
      image: "/images/fleet/IMG_5734.jpeg",
      imageAlt:
        locale === "vi"
          ? "Tàu container VSICO trên hải trình"
          : "VSICO container vessel at sea",
    },
    {
      id: "destination-port",
      stepNumber: "06",
      shortLabel: locale === "vi" ? "Cảng đích" : "Dest Port",
      fullName:
        locale === "vi"
          ? "Cảng biển đích đến"
          : "Destination Seaport",
      description:
        locale === "vi"
          ? "Cập các cảng biển đầu mối tại Hải Phòng, TP.HCM hoặc các trung tâm hàng hải quốc tế trong khu vực Đông Nam Á."
          : "Calling at primary gateway terminals in Hai Phong, Ho Chi Minh City, or regional transshipment hubs.",
      image: "/images/port/port-aerial-02.webp",
      imageAlt:
        locale === "vi"
          ? "Cảng biển đích đến"
          : "Destination seaport facility",
    },
    {
      id: "destination-warehouse",
      stepNumber: "07",
      shortLabel: locale === "vi" ? "Kho nhận" : "Consignee",
      fullName:
        locale === "vi"
          ? "Kho giao hàng hoàn tất"
          : "Consignee Facility",
      description:
        locale === "vi"
          ? "Dỡ hàng và phân phối chặng cuối tận kho người nhận an toàn, nhanh chóng, hoàn tất quy trình Door to Door khép kín."
          : "Final-mile distribution and container devanning directly at consignee warehouse doors.",
      image: "/images/warehouse/tmp-warehouse-02.webp",
      imageAlt:
        locale === "vi"
          ? "Kho nhận hàng hoàn tất"
          : "Consignee warehouse delivery",
    },
  ];

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="bg-surface py-24 text-ink sm:py-32"
    >
      <div className="container">
        {/* Tiêu đề phong cách Editorial thanh lịch */}
        <SectionHeading
          id="solutions-heading"
          roman={t("roman")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          summary={t("summary")}
        />

        {/* Thiết kế tương tác: 1 tuyến duy nhất, 3 cách cắt tuyến, 0 card, không bo tròn */}
        <SolutionsClient
          locale={locale}
          tabs={tabs}
          steps={steps}
          vsicoSystemBadge={
            locale === "vi" ? "Hệ thống VSICO" : "VSICO System"
          }
          stepLabel={locale === "vi" ? "BƯỚC" : "STEP"}
        />
      </div>
    </section>
  );
}
