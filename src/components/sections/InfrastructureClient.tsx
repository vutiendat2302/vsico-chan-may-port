"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Anchor, Cpu, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SupportedLocale } from "@/lib/formatters";

export type InfrastructureRowItem = {
  id: "berths" | "equipment" | "workforce";
  num: string;
  title: string;
  metric: string;
  image: string;
  imageAlt: string;
  hash: string;
};

export type MilestoneDisplayItem = {
  id: string;
  badgeNum: string;
  dateLabel: string;
  title: string;
  statusLabel: string;
  isCompleted?: boolean;
  phaseLabel: string;
  primaryMetric: string;
  primaryMetricDesc: string;
  secondaryMetric: string;
  secondaryMetricDesc: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type InfrastructureClientProps = {
  locale: SupportedLocale;
  rows: InfrastructureRowItem[];
  viewDetailsLabel: string;
  timelineTitle: string;
  targetIso: string;
  initialTimeLeft: TimeLeft;
  countdownBadge: string;
  countdownTitle: string;
  countdownSubtitle: string;
  countdownUnits: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  phase1Label: string;
  phase2Label: string;
  berth4Date: string;
  berth5Date: string;
  milestones: MilestoneDisplayItem[];
};

export function InfrastructureClient({
  locale,
  rows,
  viewDetailsLabel,
  timelineTitle,
  targetIso,
  initialTimeLeft,
  countdownBadge,
  countdownTitle,
  countdownSubtitle,
  countdownUnits,
  phase1Label,
  phase2Label,
  berth4Date,
  berth5Date,
  milestones,
}: InfrastructureClientProps) {
  const [activeRow, setActiveRow] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft);

  // Đồng hồ đếm ngược thời gian thực cập nhật mỗi giây
  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(targetIso).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetIso]);

  return (
    <div className="mt-12 sm:mt-16">
      {/* PHẦN 1: HẠ TẦNG, THIẾT BỊ, NHÂN SỰ (1 ẢNH LỚN BÊN TRÁI, 3 DÒNG BÊN PHẢI) */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* CỘT TRÁI (~55-60%): ẢNH LỚN ĐỔI THEO DÒNG ĐANG CHỌN, CROSSFADE NHẸ, KHÔNG BO TRÒN */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none border border-border/80 bg-ink shadow-sm">
            {rows.map((row, idx) => (
              <div
                key={row.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 ease-in-out",
                  idx === activeRow ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <Image
                  src={row.image}
                  alt={row.imageAlt}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI (~40-45%): 3 DÒNG TỐI GIẢN CHỈ GIỮ CON SỐ CHÍNH & LINK SANG TRANG CHI TIẾT */}
        <div className="lg:col-span-5">
          <div className="divide-y divide-border border-y border-border">
            {rows.map((row, idx) => {
              const isSelected = idx === activeRow;
              return (
                <a
                  key={row.id}
                  href={`/${locale}/infrastructure${row.hash}`}
                  onMouseEnter={() => setActiveRow(idx)}
                  onFocus={() => setActiveRow(idx)}
                  className="group flex items-center justify-between py-6 transition-colors"
                >
                  <div className="flex items-baseline gap-5 sm:gap-6">
                    <span
                      className={cn(
                        "font-body text-base font-bold transition-colors sm:text-lg",
                        isSelected
                          ? "text-primary"
                          : "text-muted/60 group-hover:text-primary",
                      )}
                    >
                      {row.num}
                    </span>
                    <div>
                      <h4
                        className={cn(
                          "font-heading text-lg font-bold transition-colors sm:text-xl",
                          isSelected ? "text-ink" : "text-ink/80 group-hover:text-ink",
                        )}
                      >
                        {row.title}
                      </h4>
                      <p className="mt-1 font-body text-sm font-semibold text-muted">
                        {row.metric}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isSelected
                        ? "translate-x-1 text-primary"
                        : "text-muted/60 group-hover:translate-x-1 group-hover:text-primary",
                    )}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>

          <div className="mt-6">
            <a
              href={`/${locale}/infrastructure`}
              className="inline-flex items-center gap-2 font-body text-xs font-bold tracking-wider text-primary uppercase transition-colors hover:text-primary-dark"
            >
              <span>{viewDetailsLabel}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* PHẦN 2: LỘ TRÌNH TRIỂN KHAI & TIẾN ĐỘ VẬN HÀNH */}
      <div className="mt-16 border-t border-border pt-12 sm:mt-24 sm:pt-16">
        <span className="font-body text-xs font-bold tracking-[0.24em] text-primary uppercase">
          {timelineTitle}
        </span>

        {/* KHUNG THỜI GIAN ĐỒNG BỘ: ĐẾM NGƯỢC Ở TRÊN & CỘT MỐC THỜI GIAN ĐƯỢC CHUYỂN XUỐNG DƯỚI NÀY */}
        <div className="mt-8 border border-border bg-surface-subtle p-6 sm:p-8 lg:p-10">
          {/* HÀNG TRÊN: TIÊU ĐỀ + 4 BOX ĐẾM NGƯỢC (NGÀY, GIỜ, PHÚT, GIÂY) */}
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="font-body text-xs font-bold tracking-[0.24em] text-primary uppercase">
                  {countdownBadge}
                </span>
              </div>
              <h3 className="mt-2 font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl lg:text-3xl">
                {countdownTitle}
              </h3>
              <p className="mt-1.5 font-body text-xs text-muted sm:text-sm">
                {countdownSubtitle}
              </p>
            </div>

            {/* 4 Box Đếm ngược: Ngày, Giờ, Phút, Giây */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4 shrink-0">
              {/* Box Ngày */}
              <div className="flex flex-col items-center justify-center border border-border bg-white px-3 py-4 shadow-sm sm:px-6 sm:py-5 min-w-[70px] sm:min-w-[95px] lg:min-w-[110px]">
                <span className="font-body text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink tabular-nums">
                  {timeLeft.days}
                </span>
                <span className="mt-1 font-body text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase">
                  {countdownUnits.days}
                </span>
              </div>

              {/* Box Giờ */}
              <div className="flex flex-col items-center justify-center border border-border bg-white px-3 py-4 shadow-sm sm:px-6 sm:py-5 min-w-[70px] sm:min-w-[95px] lg:min-w-[110px]">
                <span className="font-body text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink tabular-nums">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="mt-1 font-body text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase">
                  {countdownUnits.hours}
                </span>
              </div>

              {/* Box Phút */}
              <div className="flex flex-col items-center justify-center border border-border bg-white px-3 py-4 shadow-sm sm:px-6 sm:py-5 min-w-[70px] sm:min-w-[95px] lg:min-w-[110px]">
                <span className="font-body text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink tabular-nums">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="mt-1 font-body text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase">
                  {countdownUnits.minutes}
                </span>
              </div>

              {/* Box Giây */}
              <div className="flex flex-col items-center justify-center border border-primary/30 bg-primary/5 px-3 py-4 shadow-sm sm:px-6 sm:py-5 min-w-[70px] sm:min-w-[95px] lg:min-w-[110px]">
                <span className="font-body text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary tabular-nums">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="mt-1 font-body text-[10px] sm:text-xs font-bold tracking-widest text-primary uppercase">
                  {countdownUnits.seconds}
                </span>
              </div>
            </div>
          </div>

          {/* ĐƯỜNG PHÂN CÁCH NGĂN KHỐI ĐẾM NGƯỢC VÀ CÁC CỘT MỐC THỜI GIAN */}
          <div className="my-10 border-t border-border" />

          {/* CỘT MỐC THỜI GIAN ĐƯỢC CHUYỂN XUỐNG ĐÂY (TRỰC TIẾP TRONG KHUNG ẢNH 2) */}
          {/* 1. Trục tiến trình ray mốc thời gian */}
          <div className="relative w-full pt-6 pb-2">
            <div className="relative h-[2px] w-full bg-border">
              {/* Mốc 01: 08/2026 */}
              <div className="absolute top-1/2 left-0 flex -translate-y-1/2 flex-col items-start">
                <span className="absolute -top-6 left-0 whitespace-nowrap font-body text-xs font-bold text-emerald-800">
                  {berth4Date}
                </span>
                <span className="h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-primary/20" />
              </div>

              {/* Khấc mốc: 06/2027 */}
              <div className="absolute top-1/2 left-[50%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="absolute -top-6 whitespace-nowrap font-body text-xs font-bold text-muted">
                  06/2027
                </span>
                <span className="h-3.5 w-[2px] bg-primary" />
              </div>

              {/* Mốc 02 & 03: 09/2027 */}
              <div className="absolute top-1/2 right-0 flex -translate-y-1/2 flex-col items-end">
                <span className="absolute -top-6 right-0 whitespace-nowrap font-body text-xs font-bold text-primary">
                  {berth5Date}
                </span>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-white shadow-sm" />
              </div>
            </div>
          </div>

          {/* 2. 3 CỘT MỐC THỜI GIAN (01, 02, 03) - CỠ CHỮ TO, NỔI BẬT, DÙNG TOÀN BỘ FONT BODY CHO SỐ */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-10">
            {/* Cột mốc 01 */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center border border-emerald-300 bg-emerald-50 font-body text-xs font-extrabold text-emerald-800">
                      01
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center border border-border bg-white text-emerald-700">
                      <Anchor className="h-4 w-4" />
                    </span>
                    <span className="font-body text-sm font-extrabold text-emerald-800 uppercase tracking-wider">
                      {milestones[0].dateLabel}
                    </span>
                  </div>
                  <span className="border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-body text-[10px] font-bold text-emerald-800 uppercase">
                    {milestones[0].statusLabel}
                  </span>
                </div>

                <h4 className="mt-3.5 font-heading text-xl sm:text-2xl font-black text-ink leading-snug">
                  {milestones[0].title}
                </h4>

                <div className="mt-4 border-t border-border/70 pt-3">
                  <span className="font-body text-[11px] font-bold tracking-wider text-muted uppercase">
                    {phase1Label}
                  </span>
                  <p className="mt-1.5 font-body text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                    {milestones[0].primaryMetric}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-muted">
                    {milestones[0].primaryMetricDesc}
                  </p>
                  <p className="mt-3 font-body text-lg sm:text-xl font-extrabold text-primary">
                    {milestones[0].secondaryMetric}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-muted">
                    {milestones[0].secondaryMetricDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Cột mốc 02 */}
            <div className="flex flex-col justify-between md:border-l md:border-border/80 md:pl-8 lg:pl-10">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center border border-primary/30 bg-primary/10 font-body text-xs font-extrabold text-primary">
                      02
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center border border-border bg-white text-primary">
                      <Cpu className="h-4 w-4" />
                    </span>
                    <span className="font-body text-sm font-extrabold text-primary uppercase tracking-wider">
                      {milestones[1].dateLabel}
                    </span>
                  </div>
                  <span className="border border-primary/25 bg-primary/10 px-2 py-0.5 font-body text-[10px] font-bold text-primary uppercase">
                    {milestones[1].statusLabel}
                  </span>
                </div>

                <h4 className="mt-3.5 font-heading text-xl sm:text-2xl font-black text-ink leading-snug">
                  {milestones[1].title}
                </h4>

                <div className="mt-4 border-t border-border/70 pt-3">
                  <span className="font-body text-[11px] font-bold tracking-wider text-muted uppercase">
                    {phase2Label}
                  </span>
                  <p className="mt-1.5 font-body text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                    {milestones[1].primaryMetric}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-muted">
                    {milestones[1].primaryMetricDesc}
                  </p>
                  <p className="mt-3 font-body text-lg sm:text-xl font-extrabold text-ink">
                    {milestones[1].secondaryMetric}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-muted">
                    {milestones[1].secondaryMetricDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Cột mốc 03 */}
            <div className="flex flex-col justify-between md:border-l md:border-border/80 md:pl-8 lg:pl-10">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center border border-amber-300 bg-amber-50 font-body text-xs font-extrabold text-amber-800">
                      03
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center border border-border bg-white text-amber-700">
                      <Layers className="h-4 w-4" />
                    </span>
                    <span className="font-body text-sm font-extrabold text-amber-800 uppercase tracking-wider">
                      {milestones[2].dateLabel}
                    </span>
                  </div>
                  <span className="border border-amber-300 bg-amber-50 px-2 py-0.5 font-body text-[10px] font-bold text-amber-800 uppercase">
                    {milestones[2].statusLabel}
                  </span>
                </div>

                <h4 className="mt-3.5 font-heading text-xl sm:text-2xl font-black text-ink leading-snug">
                  {milestones[2].title}
                </h4>

                <div className="mt-4 border-t border-border/70 pt-3">
                  <span className="font-body text-[11px] font-bold tracking-wider text-muted uppercase">
                    {locale === "vi" ? "HỆ SINH THÁI KHÉP KÍN" : "CLOSED ECOSYSTEM"}
                  </span>
                  <p className="mt-1.5 font-body text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                    {milestones[2].primaryMetric}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-muted">
                    {milestones[2].primaryMetricDesc}
                  </p>
                  <p className="mt-3 font-body text-lg sm:text-xl font-extrabold text-amber-700">
                    {milestones[2].secondaryMetric}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-muted">
                    {milestones[2].secondaryMetricDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
