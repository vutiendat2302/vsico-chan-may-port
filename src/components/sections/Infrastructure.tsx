import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Anchor, Cpu, Users, Gauge, TrendingUp } from "lucide-react";
import { portSpecs } from "@/data/stats";
import { milestones, countdownTargetIso } from "@/data/timeline";
import { formatNumber, formatMonthYear, type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Countdown } from "@/components/motion/Countdown";
import { TimelineStatusList, type TimelineDisplayItem } from "./TimelineStatusList";

export async function Infrastructure() {
  const t = await getTranslations("infrastructure");
  const tTimeline = await getTranslations("timeline");
  const locale = (await getLocale()) as SupportedLocale;

  const berthSpecs = [
    t("specs.containerBerth", {
      teu: formatNumber(portSpecs.maxContainerVesselTeu, locale),
    }),
    t("specs.bulkBerth", {
      dwt: formatNumber(portSpecs.maxBulkVesselDwt, locale),
    }),
    t("specs.conveyor"),
    t("specs.warehouses"),
  ];

  const equipmentSpecs = [
    t("specs.quayCranes", {
      count: portSpecs.quayCranesCount,
      model: portSpecs.quayCraneModel,
    }),
    t("specs.backyardEquipment", {
      forklifts: portSpecs.forkliftsCount,
      backupCranes: portSpecs.backupCranesCount,
      tractors: portSpecs.tractorUnitsCount,
    }),
  ];

  const departments = [
    t("departments.management"),
    t("departments.dispatch"),
    t("departments.technical"),
    t("departments.operations"),
  ];

  const timelineItems: TimelineDisplayItem[] = milestones.map((item) => ({
    id: item.id,
    roman: item.roman,
    isoDate: item.date,
    monthYearText: formatMonthYear(item.date, locale),
    title: tTimeline(item.titleKey),
    description: tTimeline(item.descriptionKey),
  }));

  return (
    <section
      id="infrastructure"
      className="relative overflow-hidden border-t border-border bg-surface py-20 lg:py-28"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            roman={t("roman")}
            eyebrow={t("eyebrow")}
            title={t("title")}
            summary={t("summary")}
          />
        </Reveal>

        {/* 3 khối Hạ tầng - Thiết bị - Nhân sự */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cột 1: Thông số cầu bến & Khu chức năng */}
          <Reveal delay={0.05} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface-subtle shadow-sm">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#16052B]">
                <Image
                  src="/images/port/tmp-port-layout-01.webp"
                  alt={t("layoutImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16052B]/85 via-[#16052B]/20 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2.5 text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                    <Anchor className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-label text-xs font-bold tracking-widest uppercase">
                    {formatNumber(portSpecs.totalAreaHectares, locale, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}{" "}
                    ha · {portSpecs.quayLengthMeters} m · {portSpecs.depthMeters} m
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-heading text-xl font-bold text-ink">
                  {t("specsTitle")}
                </h3>
                <ul className="mt-4 space-y-3">
                  {berthSpecs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-2.5 font-body text-sm text-ink/85"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          {/* Cột 2: Hệ thống thiết bị xếp dỡ */}
          <Reveal delay={0.12} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface-subtle shadow-sm">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#16052B]">
                <Image
                  src="/images/port/tmp-port-crane-01.webp"
                  alt={t("craneImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16052B]/85 via-[#16052B]/20 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2.5 text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                    <Cpu className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-label text-xs font-bold tracking-widest uppercase">
                    {portSpecs.quayCranesCount} × {portSpecs.quayCraneModel}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-heading text-xl font-bold text-ink">
                  {t("equipmentTitle")}
                </h3>
                <ul className="mt-4 space-y-3">
                  {equipmentSpecs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-2.5 font-body text-sm text-ink/85"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          {/* Cột 3: Đội ngũ nhân sự 250 người */}
          <Reveal delay={0.19} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface-subtle shadow-sm">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#16052B]">
                <Image
                  src="/images/people/tmp-port-staff-01.webp"
                  alt={t("staffImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16052B]/85 via-[#16052B]/20 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2.5 text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                    <Users className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-label text-xs font-bold tracking-widest uppercase">
                    {formatNumber(portSpecs.staffCount, locale)} NHÂN SỰ
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-heading text-xl font-bold text-ink">
                  {t("peopleTitle", {
                    staffCount: formatNumber(portSpecs.staffCount, locale),
                  })}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {departments.map((dept) => (
                    <div
                      key={dept}
                      className="rounded-2xl border border-border bg-surface px-3.5 py-3 font-body text-xs font-medium text-ink"
                    >
                      {dept}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Khối Timeline 2 lớp & Đồng hồ đếm ngược phong cách Spyker */}
        <Reveal delay={0.22}>
          <div className="mt-14 rounded-3xl border border-border bg-ink p-7 text-white shadow-2xl sm:p-10 lg:p-12">
            {/* Lớp 1: Mốc hạ tầng chiến lược */}
            <div>
              <p className="font-label text-xs font-bold tracking-[0.22em] text-highlight-light uppercase">
                {t("timelineLayer1Title")}
              </p>
              <div className="mt-5">
                <TimelineStatusList
                  items={timelineItems}
                  statusOperatingLabel={tTimeline("statusOperating")}
                  statusUpcomingLabel={tTimeline("statusUpcoming")}
                  monthOnlyNote={tTimeline("monthOnlyNote")}
                />
              </div>
            </div>

            {/* Lớp 2: Năng lực & hiệu suất khai thác */}
            <div className="mt-10 border-t border-white/15 pt-10">
              <p className="font-label text-xs font-bold tracking-[0.22em] text-highlight-light uppercase">
                {t("timelineLayer2Title")}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                      <Gauge className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h4 className="font-heading text-xl font-bold text-white">
                      {t("phase1Title")}
                    </h4>
                  </div>
                  <div className="mt-4 space-y-2 font-body text-sm text-white/85">
                    <p className="font-semibold text-highlight-light">
                      {t("phase1Volume", {
                        volume: formatNumber(portSpecs.phase1.volumeTeu, locale),
                      })}
                    </p>
                    <p>
                      {t("phase1Moves", {
                        min: portSpecs.phase1.movesPerHourMin,
                        max: portSpecs.phase1.movesPerHourMax,
                      })}
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-primary-light/60 bg-primary/20 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-highlight text-ink">
                      <TrendingUp className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h4 className="font-heading text-xl font-bold text-white">
                      {t("phase2Title")}
                    </h4>
                  </div>
                  <div className="mt-4 space-y-2 font-body text-sm text-white/85">
                    <p className="font-semibold text-highlight-light">
                      {t("phase2Volume")}
                    </p>
                    <p>
                      {t("phase2Moves", {
                        min: portSpecs.phase2.movesPerHourMin,
                        max: portSpecs.phase2.movesPerHourMax,
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 font-body text-sm text-white/75">
                {t("phaseAdvantage")}
              </p>
            </div>

            {/* Đồng hồ đếm ngược tới tháng 09/2027 (Bến 5 & ICD Lao Bảo) */}
            <div className="mt-10 border-t border-white/15 pt-10">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span className="inline-block rounded-full border border-highlight-light/40 bg-highlight/15 px-3.5 py-1 font-label text-[10px] font-bold tracking-[0.2em] text-highlight-light uppercase">
                    {t("countdownBadge")}
                  </span>
                  <h4 className="mt-3 font-heading text-2xl leading-snug font-bold text-white">
                    {t("countdownTitle")}
                  </h4>
                </div>
                <div className="lg:col-span-7">
                  <Countdown
                    targetIso={countdownTargetIso}
                    locale={locale}
                    labels={{
                      days: t("countdownUnits.days"),
                      hours: t("countdownUnits.hours"),
                      minutes: t("countdownUnits.minutes"),
                      seconds: t("countdownUnits.seconds"),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
