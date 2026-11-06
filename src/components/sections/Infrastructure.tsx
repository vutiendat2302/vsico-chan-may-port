import { getLocale, getTranslations } from "next-intl/server";
import {
  countdownTargetIso,
  timelineMilestones,
  timelinePhases,
  getMilestoneStatus,
  getDaysRemaining,
} from "@/data/timeline";
import { formatNumber, type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import {
  InfrastructureClient,
  type InfrastructureRowItem,
} from "./InfrastructureClient";

export async function Infrastructure() {
  const t = await getTranslations("infrastructure");
  const tTimeline = await getTranslations("timeline");
  const locale = (await getLocale()) as SupportedLocale;
  const isVi = locale === "vi";

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

  const now = Date.now();
  const m1 = timelineMilestones[0];
  const m2 = timelineMilestones[1];
  const m3 = timelineMilestones[2];

  const m1Status = getMilestoneStatus(m1, now);
  const m3Status = getMilestoneStatus(m3, now);

  const phase1 = timelinePhases[0];
  const phase2 = timelinePhases[1];

  const phase1Throughput = phase1.figures.find((f) => f.id === "target-throughput");
  const phase1Moves = phase1.figures.find((f) => f.id === "handling-productivity-1");
  const phase2Moves = phase2.figures.find((f) => f.id === "handling-productivity-2");

  const phase1VolumeNum = phase1Throughput?.numberValue ?? 120000;
  const phase1VolumeFormatted = formatNumber(phase1VolumeNum, locale);
  const phase1MovesRange = `${phase1Moves?.rangeMin ?? 40}–${phase1Moves?.rangeMax ?? 45}`;
  const phase2MovesRange = `${phase2Moves?.rangeMin ?? 80}–${phase2Moves?.rangeMax ?? 85}`;

  const daysRemaining = getDaysRemaining(countdownTargetIso, now);

  return (
    <section
      id="infrastructure"
      className="relative overflow-hidden border-t border-border bg-surface py-20 lg:py-28"
    >
      <div className="container">
        {/* Tiêu đề Section V */}
        <Reveal>
          <SectionHeading
            roman={t("roman")}
            eyebrow={isVi ? "HẠ TẦNG & NĂNG LỰC" : "INFRASTRUCTURE & CAPACITY"}
            title={isVi ? "Hạ tầng cảng nước sâu" : "Deep-Water Port Infrastructure"}
          />
        </Reveal>

        {/* Khối tương tác Hạ tầng & Lộ trình thời gian */}
        <Reveal delay={0.1}>
          <InfrastructureClient
            locale={locale}
            rows={rows}
            viewDetailsLabel={
              isVi ? "Xem chi tiết hạ tầng" : "View infrastructure details"
            }
            timelineLabel={tTimeline("sectionLabel")}
            berth4Title={tTimeline("berth4")}
            berth4Status={m1Status === "operating" ? tTimeline("statusOperating") : tTimeline("statusUpcoming")}
            berth4Date={m1.displayDate}
            transitionDate={m2.displayDate}
            berth5IcdTitle={tTimeline("berth5Icd")}
            berth5IcdStatus={m3Status === "operating" ? tTimeline("statusOperating") : tTimeline("statusUpcoming")}
            berth5IcdDate={m3.displayDate}
            phase1Label={tTimeline("phase1Label")}
            phase2Label={tTimeline("phase2Label")}
            targetThroughputLabel={tTimeline("targetThroughputLabel")}
            handlingProductivityLabel={tTimeline("handlingProductivityLabel")}
            phase1Volume={phase1VolumeNum}
            phase1VolumeFormatted={phase1VolumeFormatted}
            phase1MovesRange={phase1MovesRange}
            phase2MovesRange={phase2MovesRange}
            movesUnit={tTimeline("movesUnit")}
            teuUnit={tTimeline("teuUnit")}
            phase2Advantage={tTimeline("phase2Advantage")}
            daysRemaining={daysRemaining}
            countdownPrefix={tTimeline("countdownPrefix")}
            countdownSuffix={tTimeline("countdownSuffix")}
            countdownCompleted={tTimeline("countdownCompleted")}
          />
        </Reveal>
      </div>
    </section>
  );
}
