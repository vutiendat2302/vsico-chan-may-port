"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_TOKENS } from "@/lib/motion";
import { Counter } from "@/components/motion/Counter";
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
  timelineLabel: string;
  berth4Title: string;
  berth4Status: string;
  berth4Date: string;
  transitionDate: string;
  berth5IcdTitle: string;
  berth5IcdStatus: string;
  berth5IcdDate: string;
  phase1Label: string;
  phase2Label: string;
  targetThroughputLabel: string;
  handlingProductivityLabel: string;
  phase1Volume: number;
  phase1VolumeFormatted: string;
  phase1MovesRange: string;
  phase2MovesRange: string;
  movesUnit: string;
  teuUnit: string;
  phase2Advantage: string;
  daysRemaining?: number;
  countdownPrefix?: string;
  countdownSuffix?: string;
  countdownCompleted?: string;
};

export function InfrastructureClient({
  locale,
  rows,
  viewDetailsLabel,
  timelineLabel,
  berth4Title,
  berth4Status,
  berth4Date,
  transitionDate,
  berth5IcdTitle,
  berth5IcdStatus,
  berth5IcdDate,
  phase1Label,
  phase2Label,
  targetThroughputLabel,
  handlingProductivityLabel,
  phase1Volume,
  phase1VolumeFormatted,
  phase1MovesRange,
  phase2MovesRange,
  movesUnit,
  teuUnit,
  phase2Advantage,
}: InfrastructureClientProps) {
  const [activeRow, setActiveRow] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const desktopRailProgressRef = useRef<HTMLDivElement>(null);
  const desktopNodesRef = useRef<HTMLDivElement>(null);
  const desktopPhasesRef = useRef<HTMLDivElement>(null);
  const mobileRailProgressRef = useRef<HTMLDivElement>(null);
  const mobileItemsRef = useRef<HTMLOListElement>(null);

  const prefersReducedMotion = useReducedMotion();

  // Hiệu ứng GSAP nhẹ: vẽ trục từ trái sang phải và hiển thị mốc tuần tự
  useEffect(() => {
    ensureGsapRegistered();
    if (prefersReducedMotion) return;

    const timelineEl = timelineSectionRef.current;
    if (!timelineEl) return;

    const desktopRail = desktopRailProgressRef.current;
    const desktopNodes = desktopNodesRef.current?.children;
    const desktopPhases = desktopPhasesRef.current?.children;
    const mobileRail = mobileRailProgressRef.current;
    const mobileItems = mobileItemsRef.current?.children;

    // Trạng thái ban đầu
    if (desktopRail) gsap.set(desktopRail, { scaleX: 0, transformOrigin: "left center" });
    if (desktopNodes) gsap.set(desktopNodes, { opacity: 0, y: 10 });
    if (desktopPhases) gsap.set(desktopPhases, { opacity: 0, y: 15 });
    if (mobileRail) gsap.set(mobileRail, { scaleY: 0, transformOrigin: "top center" });
    if (mobileItems) gsap.set(mobileItems, { opacity: 0, x: -10 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineEl,
          start: MOTION_TOKENS.scrollTrigger.start,
          toggleActions: MOTION_TOKENS.scrollTrigger.toggleActions,
          once: false,
        },
      });

      // Desktop: Vẽ trục ngang và hiện mốc
      if (desktopRail) {
        tl.to(desktopRail, {
          scaleX: 1,
          duration: 0.45,
          ease: "power2.inOut",
        });
      }
      if (desktopNodes && desktopNodes.length > 0) {
        tl.to(
          desktopNodes,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.25",
        );
      }
      if (desktopPhases && desktopPhases.length > 0) {
        tl.to(
          desktopPhases,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        );
      }

      // Mobile: Vẽ trục dọc
      if (mobileRail) {
        tl.to(
          mobileRail,
          {
            scaleY: 1,
            duration: 0.45,
            ease: "power2.inOut",
          },
          0,
        );
      }
      if (mobileItems && mobileItems.length > 0) {
        tl.to(
          mobileItems,
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.15,
        );
      }
    }, timelineEl);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="mt-12 sm:mt-16 bg-white text-ink">
      {/* PHẦN 1: HẠ TẦNG, THIẾT BỊ, NHÂN SỰ (1 ẢNH LỚN BÊN TRÁI, 3 DÒNG BÊN PHẢI) */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* CỘT TRÁI (~55-60%): ẢNH LỚN ĐỔI THEO DÒNG ĐANG CHỌN, CROSSFADE NHẸ, KHÔNG BO TRÒN */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-ink">
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
                <Link
                  key={row.id}
                  href={`/infrastructure${row.hash}` as ComponentProps<typeof Link>["href"]}
                  onMouseEnter={() => setActiveRow(idx)}
                  onFocus={() => setActiveRow(idx)}
                  className={cn(
                    "group flex items-center justify-between px-5 py-5 sm:px-6 sm:py-6 transition-colors duration-200",
                    isSelected
                      ? "bg-slate-100/70 text-ink hover:bg-slate-100"
                      : "bg-transparent text-ink/80 hover:bg-slate-100/70 hover:text-ink",
                  )}
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
                </Link>
              );
            })}
          </div>

          <div className="mt-6 px-5 sm:px-6">
            <Link
              href="/infrastructure"
              className="inline-flex items-center gap-2 font-label text-xs font-bold tracking-wider text-primary uppercase transition-colors hover:text-primary-dark"
            >
              <span>{viewDetailsLabel}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* PHẦN 2: LỘ TRÌNH (MỘT TRỤC THỜI GIAN DUY NHẤT, NỀN TRẮNG, KHÔNG CARD) */}
      <section
        ref={timelineSectionRef}
        aria-label={timelineLabel}
        className="mt-20 border-t border-border pt-14 sm:mt-28 sm:pt-18 bg-white"
      >
        {/* Nhãn section: Label */}
        <header>
          <span className="font-label text-xs font-bold tracking-[0.24em] text-primary uppercase">
            {timelineLabel}
          </span>
        </header>

        {/* ============================================================== */}
        {/* BỐ CỤC DESKTOP (MD TRỞ LÊN): TRỤC NGANG TOÀN CHIỀU RỘNG CONTAINER */}
        {/* ============================================================== */}
        <div className="hidden md:block mt-12 sm:mt-14">
          <ol className="relative w-full list-none p-0 m-0">
            {/* TRỤC CHÍNH (ĐƯỜNG KẺ MẢNH 2PX) */}
            <div className="relative h-[2px] w-full bg-border" aria-hidden="true">
              {/* Phần đã qua (0% -> 55%): Tô màu tím đậm (GSAP vẽ dần) */}
              <div
                ref={desktopRailProgressRef}
                className="absolute inset-y-0 left-0 w-[55%] bg-primary will-change-transform"
              />

              {/* MỐC 08/2026: NẰM TẠI 0% */}
              <li className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col items-start">
                <span className="absolute -top-7 left-0 whitespace-nowrap font-label text-xs font-bold tracking-wider text-primary uppercase">
                  {berth4Date}
                </span>
                <span
                  className="h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-primary/20"
                  aria-hidden="true"
                />
                <div className="absolute top-5 left-0 whitespace-nowrap">
                  <p className="font-body text-base font-bold text-ink">
                    {berth4Title}
                  </p>
                  <p className="mt-0.5 font-label text-xs font-bold tracking-wider text-primary uppercase">
                    {berth4Status}
                  </p>
                </div>
              </li>

              {/* MỐC 06/2027: NẰM TẠI 55% (VẠCH ĐỨNG CHIA ┿, KHÔNG CÓ CHẤM) */}
              <li className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="absolute -top-7 whitespace-nowrap font-label text-xs font-bold tracking-wider text-muted uppercase">
                  {transitionDate}
                </span>
                <span className="h-3.5 w-[2px] bg-primary" aria-hidden="true" />
              </li>

              {/* MỐC 09/2027: NẰM TẠI 100% (CHẤM RỖNG ○, GỘP BẾN SỐ 5 & ICD LAO BẢO) */}
              <li className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col items-end text-right">
                <span className="absolute -top-7 right-0 whitespace-nowrap font-label text-xs font-bold tracking-wider text-muted uppercase">
                  {berth5IcdDate}
                </span>
                <span
                  className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-white shadow-sm"
                  aria-hidden="true"
                />
                <div className="absolute top-5 right-0 whitespace-nowrap">
                  <p className="font-body text-base font-bold text-ink">
                    {berth5IcdTitle}
                  </p>
                  <p className="mt-0.5 font-label text-xs font-bold tracking-wider text-muted uppercase">
                    {berth5IcdStatus}
                  </p>
                </div>
              </li>
            </div>
          </ol>

          {/* HAI GIAI ĐOẠN LÀ HAI ĐOẠN NGOẶC / THANH MẢNH DƯỚI TRỤC (55% & 45%) */}
          <div
            ref={desktopPhasesRef}
            className="mt-28 flex items-start gap-6 lg:gap-10"
          >
            {/* GIAI ĐOẠN 1: CHIẾM 55% CHIỀU NGANG */}
            <div className="w-[55%] shrink-0">
              {/* Thanh ngoặc: ├──────── GIAI ĐOẠN 1 ────────────────┤ */}
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-[1.5px] bg-primary shrink-0" />
                <span className="h-[1.5px] w-6 bg-primary/40 shrink-0" />
                <span className="font-label text-xs font-bold tracking-[0.18em] text-primary uppercase whitespace-nowrap">
                  {phase1Label}
                </span>
                <span className="h-[1.5px] flex-1 bg-primary/40" />
                <span className="h-2.5 w-[1.5px] bg-primary/40 shrink-0" />
              </div>

              {/* Nội dung Giai đoạn 1 căn trái theo điểm 08/2026 */}
              <div className="mt-8 space-y-7">
                <div>
                  <span className="block font-label text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                    {targetThroughputLabel}
                  </span>
                  <div className="mt-1.5 font-body text-xl sm:text-xl lg:text-2xl font-extrabold tracking-tight text-ink tabular-nums">
                    <Counter
                      value={phase1Volume}
                      locale={locale}
                      suffix={` ${teuUnit}`}
                      duration={0.65}
                    />
                  </div>
                </div>

                <div>
                  <span className="block font-label text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                    {handlingProductivityLabel}
                  </span>
                  <div className="mt-1.5 font-body text-lg sm:text-lg lg:text-lg font-extrabold tracking-tight text-primary tabular-nums">
                    {phase1MovesRange} {movesUnit}
                  </div>
                </div>
              </div>
            </div>

            {/* GIAI ĐOẠN 2: CHIẾM 45% CHIỀU NGANG */}
            <div className="flex-1 min-w-0">
              {/* Thanh ngoặc: ├──────── GIAI ĐOẠN 2 ────────────────→ */}
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-[1.5px] bg-primary shrink-0" />
                <span className="h-[1.5px] w-6 bg-primary shrink-0" />
                <span className="font-label text-xs font-bold tracking-[0.18em] text-primary uppercase whitespace-nowrap">
                  {phase2Label}
                </span>
                <span className="h-[1.5px] flex-1 bg-primary" />
                <ArrowRight className="h-3 w-3 text-primary shrink-0" />
              </div>

              {/* Nội dung Giai đoạn 2 căn trái theo điểm 06/2027 */}
              <div className="mt-8 space-y-7">
                <div>
                  <span className="block font-label text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                    {handlingProductivityLabel}
                  </span>
                  <div className="mt-1.5 font-body text-xl sm:lg lg:text-xl font-extrabold tracking-tight text-primary tabular-nums">
                    {phase2MovesRange} {movesUnit}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BỐ CỤC MOBILE (DƯỚI MD): TRỤC DỌC BÊN TRÁI, NỘI DUNG BÊN PHẢI */}
        {/* ============================================================== */}
        <div className="block md:hidden mt-10">
          <ol
            ref={mobileItemsRef}
            className="relative list-none p-0 m-0 space-y-12 pl-8 border-l-2 border-border"
          >
            {/* Đường tiến trình dọc GSAP vẽ */}
            <div
              ref={mobileRailProgressRef}
              className="absolute left-[-2px] top-0 h-[60%] w-[2px] bg-primary"
              aria-hidden="true"
            />

            {/* MỐC 08/2026 */}
            <li className="relative">
              <span
                className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20"
                aria-hidden="true"
              />
              <span className="font-label text-xs font-bold tracking-wider text-primary uppercase">
                {berth4Date}
              </span>
              <p className="mt-1 font-body text-lg font-bold text-ink">
                {berth4Title}
              </p>
              <p className="mt-0.5 font-label text-xs font-bold tracking-wider text-primary uppercase">
                {berth4Status}
              </p>

              {/* Giai đoạn 1 */}
              <div className="mt-6 border-t border-border pt-4">
                <span className="font-label text-xs font-bold tracking-wider text-primary uppercase">
                  {phase1Label}
                </span>

                <div className="mt-4">
                  <span className="block font-label text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                    {targetThroughputLabel}
                  </span>
                  <p
                    suppressHydrationWarning
                    className="mt-1 font-body text-lg font-extrabold text-ink tabular-nums"
                  >
                    {phase1VolumeFormatted} {teuUnit}
                  </p>
                </div>

                <div className="mt-4">
                  <span className="block font-label text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                    {handlingProductivityLabel}
                  </span>
                  <p className="mt-1 font-body text-sm font-extrabold text-primary tabular-nums">
                    {phase1MovesRange} {movesUnit}
                  </p>
                </div>
              </div>
            </li>

            {/* MỐC 06/2027 */}
            <li className="relative">
              <span
                className="absolute -left-[35px] top-1.5 h-3.5 w-[2px] bg-primary"
                aria-hidden="true"
              />
              <span className="font-label text-xs font-bold tracking-wider text-muted uppercase">
                {transitionDate}
              </span>

              {/* Giai đoạn 2 */}
              <div className="mt-4 border-t border-border pt-4">
                <span className="font-label text-xs font-bold tracking-wider text-primary uppercase">
                  {phase2Label}
                </span>

                <div className="mt-4">
                  <span className="block font-label text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                    {handlingProductivityLabel}
                  </span>
                  <p className="mt-1 font-body text-2xl font-extrabold text-primary tabular-nums">
                    {phase2MovesRange} {movesUnit}
                  </p>
                  <p className="mt-1 font-body text-xs font-medium text-muted">
                    {phase2Advantage}
                  </p>
                </div>
              </div>
            </li>

            {/* MỐC 09/2027 */}
            <li className="relative">
              <span
                className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-white shadow-sm"
                aria-hidden="true"
              />
              <span className="font-label text-xs font-bold tracking-wider text-muted uppercase">
                {berth5IcdDate}
              </span>
              <p className="mt-1 font-body text-lg font-bold text-ink">
                {berth5IcdTitle}
              </p>
              <p className="mt-0.5 font-label text-xs font-bold tracking-wider text-muted uppercase">
                {berth5IcdStatus}
              </p>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
