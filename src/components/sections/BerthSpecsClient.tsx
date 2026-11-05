"use client";

import { useEffect, useRef } from "react";
import { Anchor, Maximize2, Waves, Layers, Ship } from "lucide-react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Counter } from "@/components/motion/Counter";
import type { SupportedLocale } from "@/lib/formatters";

type BerthSpecsClientProps = {
  locale: SupportedLocale;
  stats: {
    berths: number;
    quayLengthMeters: number;
    depthMeters: number;
    totalAreaHectares: number;
    areaFormatted: string;
    maxContainerVesselTeu: number;
    maxBulkVesselDwt: number;
  };
  t: {
    roman: string;
    eyebrow: string;
    title: string;
    summary: string;
    vesselBadge: string;
    berths: string;
    berthsDesc: string;
    berthsSub: string;
    quayLength: string;
    quayLengthDesc: string;
    quayLengthSub: string;
    depth: string;
    depthDesc: string;
    depthSub: string;
    area: string;
    areaDesc: string;
    areaSub: string;
    vesselCapacity: string;
    vesselSummary: string;
    containerVesselTitle: string;
    containerVesselDesc: string;
    bulkVesselTitle: string;
    bulkVesselDesc: string;
    officialPlanningNote: string;
  };
};

/**
 * Hiển thị tiêu đề chuẩn mực, khắc phục triệt để lỗi ký hiệu & bị uốn lượn/nghiêng của font serif
 */
function renderCleanTitle(title: string) {
  if (!title.includes("&")) return title;
  const parts = title.split("&");
  return (
    <>
      {parts[0]}
      <span className="inline-block px-1 font-body font-bold text-primary">
        &amp;
      </span>
      {parts.slice(1).join("&")}
    </>
  );
}

export function BerthSpecsClient({ locale, stats, t }: BerthSpecsClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRomanRef = useRef<HTMLSpanElement>(null);
  const headingEyebrowRef = useRef<HTMLSpanElement>(null);
  const headingTitleRef = useRef<HTMLHeadingElement>(null);
  const headingSummaryRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const showcaseCardRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const romanEl = headingRomanRef.current;
    const eyebrowEl = headingEyebrowRef.current;
    const titleEl = headingTitleRef.current;
    const summaryEl = headingSummaryRef.current;
    const cardsEl = cardsContainerRef.current;
    const showcaseEl = showcaseCardRef.current;

    const cards = cardsEl
      ? Array.from(cardsEl.querySelectorAll<HTMLElement>("[data-metric-card]"))
      : [];
    const allCards = showcaseEl ? [...cards, showcaseEl] : cards;

    // Thiết lập trạng thái ban đầu đồng nhất cho tiêu đề và các card
    gsap.set(romanEl, { scale: 0.7, y: 35, opacity: 0, filter: "blur(12px)" });
    gsap.set(eyebrowEl, { letterSpacing: "0.08em", y: 20, opacity: 0 });
    gsap.set(titleEl, { y: 45, opacity: 0, filter: "blur(12px)" });
    gsap.set(summaryEl, { y: 35, opacity: 0, filter: "blur(10px)" });

    // Thiết lập trạng thái ban đầu đồng nhất cho TOÀN BỘ CÁC CARD (4 card con + 1 card cỡ tàu)
    gsap.set(allCards, {
      y: 45,
      scale: 0.98,
      opacity: 0,
      filter: "blur(12px)",
    });

    const ctx = gsap.context(() => {
      // 1 Timeline duy nhất đồng bộ toàn bộ Section I: Text + 4 Card con + Card cỡ tàu cùng xuất hiện đồng điệu
      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "restart none none reset",
        },
      });

      sectionTl
        .to(
          romanEl,
          {
            scale: 1,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "back.out(2)",
          },
          0,
        )
        .to(
          eyebrowEl,
          {
            letterSpacing: "0.22em",
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          0.05,
        )
        .to(
          titleEl,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
          },
          0.1,
        )
        .to(
          summaryEl,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
          },
          0.15,
        )
        // Đồng nhất toàn bộ 5 card (4 card con + card cỡ tàu) xuất hiện ĐỒNG THỜI cùng text với cùng hiệu ứng power3.out, unblur và trượt lên
        .to(
          allCards,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            clearProps: "filter",
          },
          0.15,
        );
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative z-10 container will-change-transform">
      {/* Tiêu đề Section I thanh lịch trên nền trắng */}
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-4xl">
          <div className="flex items-baseline gap-4">
            <span
              ref={headingRomanRef}
              aria-hidden="true"
              className="font-body text-4xl font-extrabold tracking-tight text-primary will-change-transform sm:text-5xl"
            >
              {t.roman}.
            </span>
            <span
              ref={headingEyebrowRef}
              className="font-body text-sm font-bold text-primary-dark uppercase will-change-transform"
            >
              {t.eyebrow}
            </span>
          </div>

          <h2
            ref={headingTitleRef}
            id="berth-specs-heading"
            className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink will-change-transform sm:text-4xl lg:text-[2.85rem]"
          >
            {t.title}
          </h2>

          <p
            ref={headingSummaryRef}
            className="mt-4 font-body text-base leading-relaxed text-muted will-change-transform sm:text-lg"
          >
            {t.summary}
          </p>
        </div>
      </div>

      {/* Khối 1: 4 Thẻ Chi tiết Thông số Hạ tầng Vật lý - BẢN CUỐI CÙNG HOÀN CHỈNH */}
      <div
        ref={cardsContainerRef}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {/* Card 1: Bến cảng */}
        <div
          data-metric-card
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-subtle p-7 shadow-sm transition-[border-color,background-color,box-shadow] duration-300 will-change-transform hover:border-primary/50 hover:bg-white hover:shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Anchor className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="font-body text-xs font-bold tracking-[0.16em] text-primary uppercase">
                {t.berths}
              </span>
            </div>

            <div className="mt-8 font-body text-4xl font-extrabold tracking-tight text-ink lg:text-5xl">
              <Counter
                value={stats.berths}
                locale={locale}
                padZero={true}
                duration={1.0}
                toggleActions="restart none none reset"
                className="text-ink"
              />
            </div>
          </div>

          {/* Chi tiết hiển thị mượt mà khi hover */}
          <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100">
            <div className="mt-5 border-t border-primary/15 pt-4 transition-transform duration-500 ease-out translate-y-2 group-hover:translate-y-0">
              <p className="font-body text-xs font-bold text-primary">{t.berthsDesc}</p>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted">{t.berthsSub}</p>
            </div>
          </div>
        </div>

        {/* Card 2: Cầu bến */}
        <div
          data-metric-card
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-subtle p-7 shadow-sm transition-[border-color,background-color,box-shadow] duration-300 will-change-transform hover:border-primary/50 hover:bg-white hover:shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Maximize2 className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="font-body text-xs font-bold tracking-[0.16em] text-primary uppercase">
                {t.quayLength}
              </span>
            </div>

            <div className="mt-8 font-body text-4xl font-extrabold tracking-tight text-ink lg:text-5xl">
              <Counter
                value={stats.quayLengthMeters}
                locale={locale}
                suffix=" m"
                duration={1.0}
                toggleActions="restart none none reset"
                className="text-ink"
              />
            </div>
          </div>

          {/* Chi tiết hiển thị mượt mà khi hover */}
          <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100">
            <div className="mt-5 border-t border-primary/15 pt-4 transition-transform duration-500 ease-out translate-y-2 group-hover:translate-y-0">
              <p className="font-body text-xs font-bold text-primary">{t.quayLengthDesc}</p>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted">{t.quayLengthSub}</p>
            </div>
          </div>
        </div>

        {/* Card 3: Độ sâu trước bến */}
        <div
          data-metric-card
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-subtle p-7 shadow-sm transition-[border-color,background-color,box-shadow] duration-300 will-change-transform hover:border-primary/50 hover:bg-white hover:shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Waves className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="font-body text-xs font-bold tracking-[0.16em] text-primary uppercase">
                {t.depth}
              </span>
            </div>

            <div className="mt-8 font-body text-4xl font-extrabold tracking-tight text-ink lg:text-5xl">
              <Counter
                value={stats.depthMeters}
                locale={locale}
                suffix=" m"
                duration={1.0}
                toggleActions="restart none none reset"
                className="text-ink"
              />
            </div>
          </div>

          {/* Chi tiết hiển thị mượt mà khi hover */}
          <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100">
            <div className="mt-5 border-t border-primary/15 pt-4 transition-transform duration-500 ease-out translate-y-2 group-hover:translate-y-0">
              <p className="font-body text-xs font-bold text-primary">{t.depthDesc}</p>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted">{t.depthSub}</p>
            </div>
          </div>
        </div>

        {/* Card 4: Diện tích cảng - ĐỒNG NHẤT 100% MÀU SỐ VÀ CHỮ "ha" */}
        <div
          data-metric-card
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-subtle p-7 shadow-sm transition-[border-color,background-color,box-shadow] duration-300 will-change-transform hover:border-primary/50 hover:bg-white hover:shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Layers className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="font-body text-xs font-bold tracking-[0.16em] text-primary uppercase">
                {t.area}
              </span>
            </div>

            {/* Đồng nhất hoàn toàn 1 màu text-ink đậm đà cho cả số và đơn vị ha */}
            <div className="mt-8 flex items-baseline font-body text-4xl font-extrabold tracking-tight text-ink lg:text-5xl">
              <span>{stats.areaFormatted}</span>
              <span className="ml-1.5 text-2xl font-extrabold text-ink lg:text-3xl">
                ha
              </span>
            </div>
          </div>

          {/* Chi tiết hiển thị mượt mà khi hover */}
          <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100">
            <div className="mt-5 border-t border-primary/15 pt-4 transition-transform duration-500 ease-out translate-y-2 group-hover:translate-y-0">
              <p className="font-body text-xs font-bold text-primary">{t.areaDesc}</p>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted">{t.areaSub}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Khối 2: Showcase Thẻ Cỡ Tàu Tiếp Nhận Siêu Trọng Tải - XUẤT HIỆN ĐỒNG THỜI CÙNG 4 THẺ TRÊN */}
      <div
        ref={showcaseCardRef}
        className="relative mt-8 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5EFFF] p-7 shadow-md will-change-transform sm:p-9 lg:mt-10 lg:p-12"
      >
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 pb-6">
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                <Ship className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-body text-sm font-bold tracking-[0.16em] text-primary uppercase">
                  {t.vesselCapacity}
                </h3>
                <p className="font-body text-xs text-muted">{t.vesselSummary}</p>
              </div>
            </div>
          </div>

          {/* 2 Cột Đối xứng: Tàu Container 4.000 TEU & Tàu Hàng Rời 70.000 DWT */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:divide-x md:divide-border">
            {/* Cánh trái: Tàu Container 4.000 TEU */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 font-body text-[10px] font-bold tracking-[0.16em] text-primary uppercase">
                  CONTAINER CARGO
                </span>

                <h4 className="mt-3.5 font-heading text-xl font-extrabold text-ink sm:text-2xl">
                  {renderCleanTitle(t.containerVesselTitle)}
                </h4>

                <div className="mt-4 font-body text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                  <Counter
                    value={stats.maxContainerVesselTeu}
                    locale={locale}
                    suffix=" TEU"
                    duration={1.0}
                    toggleActions="restart none none reset"
                    className="text-primary"
                  />
                </div>

                <p className="mt-3.5 font-body text-sm leading-relaxed text-muted">
                  {t.containerVesselDesc}
                </p>
              </div>

            </div>

            {/* Cánh phải: Tàu Hàng Rời 70.000 DWT */}
            <div className="flex flex-col justify-between md:pl-8 lg:pl-12">
              <div>
                <span className="inline-block rounded-full bg-highlight/15 px-3.5 py-1 font-body text-[10px] font-bold tracking-[0.16em] text-highlight uppercase">
                  BULK & GENERAL CARGO
                </span>

                <h4 className="mt-3.5 font-heading text-xl font-extrabold text-ink sm:text-2xl">
                  {renderCleanTitle(t.bulkVesselTitle)}
                </h4>

                <div className="mt-4 font-body text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                  <Counter
                    value={stats.maxBulkVesselDwt}
                    locale={locale}
                    suffix=" DWT"
                    duration={1.0}
                    toggleActions="restart none none reset"
                    className="text-primary"
                  />
                </div>

                <p className="mt-3.5 font-body text-sm leading-relaxed text-muted">
                  {t.bulkVesselDesc}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
