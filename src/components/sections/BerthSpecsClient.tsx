"use client";

import { useEffect, useRef } from "react";
import { Anchor, Maximize2, Waves, Layers, Ship, CheckCircle2 } from "lucide-react";
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
      <span className="inline-block px-1 font-body font-semibold text-primary">
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

    const cards = cardsEl ? Array.from(cardsEl.children) : [];

    // Thiết lập trạng thái ban đầu
    gsap.set(romanEl, { scale: 0.6, y: 30, opacity: 0, filter: "blur(12px)" });
    gsap.set(eyebrowEl, { letterSpacing: "0.08em", y: 20, opacity: 0 });
    gsap.set(titleEl, { y: 70, opacity: 0, filter: "blur(20px)" });
    gsap.set(summaryEl, { y: 40, opacity: 0, filter: "blur(10px)" });

    if (cards.length > 0) {
      gsap.set(cards, {
        y: 60,
        scale: 0.94,
        opacity: 0,
        filter: "blur(14px)",
      });
    }

    if (showcaseEl) {
      gsap.set(showcaseEl, {
        y: 70,
        scale: 0.95,
        opacity: 0,
        filter: "blur(18px)",
      });
    }

    const ctx = gsap.context(() => {
      // 1. Dòng tiêu đề Section I
      // toggleActions: "restart none none reset" -> Cuộn xuống thì kích hoạt lại, cuộn lên không cần, cuộn vượt qua đỉnh thì reset để cuộn xuống lại vẫn chạy
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingTitleRef.current,
          start: "top 88%",
          toggleActions: "restart none none reset",
        },
      });

      headerTl
        .to(
          romanEl,
          {
            scale: 1,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.0,
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
            duration: 0.9,
            ease: "power3.out",
          },
          0.1,
        )
        .to(
          titleEl,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
          },
          0.15,
        )
        .to(
          summaryEl,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power3.out",
          },
          0.25,
        );

      // 2. 4 Thẻ chỉ số hạ tầng vật lý: Xuất hiện ĐỒNG BỘ với nhịp điệu so le thanh lịch, tự khởi động lại khi cuộn xuống lại
      if (cards.length > 0) {
        const cardsTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsEl,
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        });

        cards.forEach((card, idx) => {
          cardsTl.to(
            card,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.0,
              ease: "power3.out",
            },
            idx * 0.1,
          );
        });
      }

      // 3. Showcase cỡ tàu tiếp nhận 4.000 TEU / 70.000 DWT: Tự khởi động lại khi cuộn xuống lại
      if (showcaseEl) {
        gsap.to(showcaseEl, {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.25,
          ease: "power4.out",
          scrollTrigger: {
            trigger: showcaseEl,
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        });
      }
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

      {/* Khối 1: 4 Thẻ Chi tiết Thông số Hạ tầng Vật lý */}
      <div
        ref={cardsContainerRef}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {/* Card 1: Bến cảng */}
        <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-subtle p-7 shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-primary/50 hover:bg-white hover:shadow-xl">
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
                toggleActions="restart none none reset"
                className="text-ink"
              />
            </div>
          </div>

          {/* Chi tiết hiển thị mượt mà khi hover */}
          <div className="pointer-events-none mt-6 max-h-0 opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:max-h-40 group-hover:opacity-100">
            <div className="border-t border-primary/15 pt-4">
              <p className="font-body text-xs font-bold text-primary">{t.berthsDesc}</p>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                {t.berthsSub}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Cầu bến */}
        <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-subtle p-7 shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-primary/50 hover:bg-white hover:shadow-xl">
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
                toggleActions="restart none none reset"
                className="text-ink"
              />
            </div>
          </div>

          {/* Chi tiết hiển thị mượt mà khi hover */}
          <div className="pointer-events-none mt-6 max-h-0 opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:max-h-40 group-hover:opacity-100">
            <div className="border-t border-primary/15 pt-4">
              <p className="font-body text-xs font-bold text-primary">
                {t.quayLengthDesc}
              </p>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                {t.quayLengthSub}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Độ sâu trước bến */}
        <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-subtle p-7 shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-primary/50 hover:bg-white hover:shadow-xl">
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
                toggleActions="restart none none reset"
                className="text-ink"
              />
            </div>
          </div>

          {/* Chi tiết hiển thị mượt mà khi hover */}
          <div className="pointer-events-none mt-6 max-h-0 opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:max-h-40 group-hover:opacity-100">
            <div className="border-t border-primary/15 pt-4">
              <p className="font-body text-xs font-bold text-primary">{t.depthDesc}</p>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                {t.depthSub}
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Diện tích cảng - ĐỒNG NHẤT MÀU SỐ VÀ CHỮ "ha" */}
        <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-subtle p-7 shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-primary/50 hover:bg-white hover:shadow-xl">
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
          <div className="pointer-events-none mt-6 max-h-0 opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:max-h-40 group-hover:opacity-100">
            <div className="border-t border-primary/15 pt-4">
              <p className="font-body text-xs font-bold text-primary">{t.areaDesc}</p>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                {t.areaSub}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Khối 2: Showcase Thẻ Cỡ Tàu Tiếp Nhận Siêu Trọng Tải trên nền sáng thanh lịch */}
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
