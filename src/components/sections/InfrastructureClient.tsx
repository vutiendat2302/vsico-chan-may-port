"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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

export type InfrastructureClientProps = {
  locale: SupportedLocale;
  rows: InfrastructureRowItem[];
  viewDetailsLabel: string;
  timelineTitle: string;
  daysRemaining: number;
  phase1Label: string;
  phase1Volume: string;
  phase1Moves: string;
  phase2Label: string;
  phase2Moves: string;
  berth4Title: string;
  berth4Status: string;
  berth5Title: string;
  berth5Status: string;
  countdownPrefix: string;
  countdownSuffix: string;
  countdownEstNote: string;
};

export function InfrastructureClient({
  locale,
  rows,
  viewDetailsLabel,
  timelineTitle,
  daysRemaining,
  phase1Label,
  phase1Volume,
  phase1Moves,
  phase2Label,
  phase2Moves,
  berth4Title,
  berth4Status,
  berth5Title,
  berth5Status,
  countdownPrefix,
  countdownSuffix,
  countdownEstNote,
}: InfrastructureClientProps) {
  const [activeRow, setActiveRow] = useState<number>(0);

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

      {/* PHẦN 2: LỘ TRÌNH TRÊN NỀN TRẮNG (GỘP HAI LỚP THÀNH MỘT TRỤC DUY NHẤT, THAY HỘP ĐEN) */}
      <div className="mt-16 border-t border-border pt-12 sm:mt-24 sm:pt-16">
        <span className="font-body text-xs font-bold tracking-[0.24em] text-primary uppercase">
          {timelineTitle}
        </span>

        {/* Trục dòng thời gian duy nhất */}
        <div className="mt-10 sm:mt-12">
          {/* 1. Mốc thời gian phía trên trục ray */}
          <div className="relative w-full">
            {/* Trục ray chính */}
            <div className="relative h-[2px] w-full bg-border">
              {/* Điểm 1: 08/2026 (Bến số 4 - Đã vận hành) -> Chấm đặc ● */}
              <div className="absolute top-1/2 left-0 flex -translate-y-1/2 flex-col items-start">
                <span className="absolute -top-7 left-0 whitespace-nowrap font-body text-xs font-bold text-muted">
                  08/2026
                </span>
                <span className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" />
                <div className="absolute top-5 left-0 whitespace-nowrap">
                  <p className="font-heading text-sm font-bold text-ink sm:text-base">
                    {berth4Title}
                  </p>
                  <p className="mt-0.5 font-body text-xs font-semibold text-primary">
                    {berth4Status}
                  </p>
                </div>
              </div>

              {/* Khấc mốc: 06/2027 (Khấc giữa 2 giai đoạn) -> Khấc ┿ */}
              <div className="absolute top-1/2 left-[75%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="absolute -top-7 whitespace-nowrap font-body text-xs font-bold text-muted">
                  06/2027
                </span>
                <span className="h-3 w-[2px] bg-primary" />
              </div>

              {/* Điểm 2: 09/2027 (Gộp Bến số 5 & ICD Lao Bảo thành 1 nút) -> Chấm rỗng ○ */}
              <div className="absolute top-1/2 right-0 flex -translate-y-1/2 flex-col items-end">
                <span className="absolute -top-7 right-0 whitespace-nowrap font-body text-xs font-bold text-muted">
                  09/2027
                </span>
                <span className="h-3 w-3 rounded-full border-2 border-primary bg-white shadow-sm" />
                <div className="absolute top-5 right-0 text-right whitespace-nowrap">
                  <p className="font-heading text-sm font-bold text-ink sm:text-base">
                    {berth5Title}
                  </p>
                  <p className="mt-0.5 font-body text-xs font-semibold text-muted">
                    {berth5Status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Hai giai đoạn là hai đoạn thanh mảnh nằm dưới trục, chiều dài đúng tỷ lệ (75% và 25%) */}
          <div className="mt-24 flex items-start gap-4 sm:mt-26 sm:gap-6">
            {/* Giai đoạn 1 (~75% chiều ngang: 08/2026 -> 06/2027) */}
            <div className="w-[75%]">
              <div className="flex items-center gap-2">
                <span className="h-[2px] w-2 shrink-0 bg-primary/40" />
                <span className="font-body text-xs font-bold tracking-wider text-primary uppercase whitespace-nowrap">
                  {phase1Label}
                </span>
                <span className="h-[2px] flex-1 bg-primary/40" />
                <span className="h-[2px] w-2 shrink-0 bg-primary/40" />
              </div>
              <div className="mt-2.5 space-y-0.5 font-body text-xs font-semibold text-ink/80 sm:text-sm">
                <p>{phase1Volume}</p>
                <p className="text-muted">{phase1Moves}</p>
              </div>
            </div>

            {/* Giai đoạn 2 (~25% chiều ngang: 06/2027 -> 09/2027) */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-[2px] w-2 shrink-0 bg-primary" />
                <span className="font-body text-xs font-bold tracking-wider text-primary uppercase whitespace-nowrap">
                  {phase2Label}
                </span>
                <span className="h-[2px] flex-1 bg-primary" />
                <ArrowRight className="h-3 w-3 shrink-0 text-primary" />
              </div>
              <div className="mt-2.5 font-body text-xs font-semibold text-ink/80 sm:text-sm">
                <p>{phase2Moves}</p>
              </div>
            </div>
          </div>

          {/* 3. Đếm ngược thành một dòng chữ, không ô vuông: số ngày cỡ lớn (Display), phần còn lại cỡ nhỏ */}
          <div className="mt-10 border-t border-border pt-6">
            <p className="font-body text-base text-ink sm:text-lg">
              {countdownPrefix}{" "}
              <span className="font-heading text-4xl font-black tracking-tight text-ink sm:text-5xl">
                {daysRemaining}
              </span>{" "}
              {countdownSuffix}{" "}
              <span className="font-body text-xs text-muted sm:text-sm">
                {countdownEstNote}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
