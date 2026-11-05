"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Truck } from "lucide-react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Counter } from "@/components/motion/Counter";
import type { SupportedLocale } from "@/lib/formatters";

type PortIcdCorridorProps = {
  locale: SupportedLocale;
  icdArea: number;
  portArea: number;
  distanceFormatted: string;
  icdTitle: string;
  portTitle: string;
  icdTagline: string;
  portTagline: string;
  corridorNote: string;
  truckLabel: string;
  unitSqm: string;
  unitHa: string;
  unitKm: string;
};

export function PortIcdCorridor({
  locale,
  icdArea,
  portArea,
  distanceFormatted,
  icdTitle,
  portTitle,
  icdTagline,
  portTagline,
  corridorNote,
  truckLabel,
  unitSqm,
  unitHa,
  unitKm,
}: PortIcdCorridorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const icdImgRef = useRef<HTMLDivElement>(null);
  const portImgRef = useRef<HTMLDivElement>(null);
  const icdInfoRef = useRef<HTMLDivElement>(null);
  const portInfoRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const dotLeftRef = useRef<HTMLSpanElement>(null);
  const dotRightRef = useRef<HTMLSpanElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const truckLabelRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const icdImg = icdImgRef.current;
    const portImg = portImgRef.current;
    const icdInfo = icdInfoRef.current;
    const portInfo = portInfoRef.current;
    const lineProg = lineProgressRef.current;
    const dotL = dotLeftRef.current;
    const dotR = dotRightRef.current;
    const truck = truckRef.current;
    const badge = badgeRef.current;
    const truckLbl = truckLabelRef.current;

    // Thiết lập trạng thái ban đầu (reset khi cuộn khỏi tầm nhìn)
    if (icdImg) gsap.set(icdImg, { opacity: 0, x: -30, filter: "blur(8px)" });
    if (portImg) gsap.set(portImg, { opacity: 0, x: 30, filter: "blur(8px)" });
    if (icdInfo) gsap.set(icdInfo, { opacity: 0, y: 20, filter: "blur(6px)" });
    if (portInfo) gsap.set(portInfo, { opacity: 0, y: 20, filter: "blur(6px)" });
    if (lineProg) gsap.set(lineProg, { scaleX: 0, transformOrigin: "left center" });
    if (dotL) gsap.set(dotL, { scale: 0, opacity: 0 });
    if (dotR) gsap.set(dotR, { scale: 0, opacity: 0 });
    if (truck) gsap.set(truck, { left: "0%", opacity: 0 });
    if (badge) gsap.set(badge, { opacity: 0, y: -12, filter: "blur(6px)" });
    if (truckLbl) gsap.set(truckLbl, { opacity: 0, y: 12, filter: "blur(6px)" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 82%",
          toggleActions: "restart none none reset",
        },
      });

      // 1. Hai bức ảnh tỷ lệ ngang xuất hiện với hiệu ứng unblur
      if (icdImg) {
        tl.to(
          icdImg,
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out",
          },
          0,
        );
      }
      if (portImg) {
        tl.to(
          portImg,
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out",
          },
          0.1,
        );
      }

      // 2. Điểm mốc trái ● xuất hiện
      if (dotL) {
        tl.to(
          dotL,
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "back.out(2)",
          },
          0.2,
        );
      }

      // 3. Đường ray kết nối giữa 2 ảnh vẽ từ trái sang phải
      if (lineProg) {
        tl.to(
          lineProg,
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power2.inOut",
          },
          0.3,
        );
      }

      // 4. Xe tải 🚚 lướt theo tuyến đường từ ICD Lao Bảo đến Cảng Chân Mây
      if (truck) {
        tl.to(
          truck,
          {
            opacity: 1,
            duration: 0.2,
          },
          0.3,
        ).to(
          truck,
          {
            left: "calc(100% - 28px)",
            duration: 1.1,
            ease: "power2.inOut",
          },
          0.3,
        );
      }

      // 5. Huy hiệu cự ly ≈150 km và nhãn lộ trình xuất hiện
      if (badge) {
        tl.to(
          badge,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
          },
          0.45,
        );
      }
      if (truckLbl) {
        tl.to(
          truckLbl,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
          },
          0.65,
        );
      }

      // 6. Điểm mốc phải ● sáng lên khi xe tải chạm cảng
      if (dotR) {
        tl.to(
          dotR,
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "back.out(2)",
          },
          1.35,
        );
      }

      // 7. Thông số chi tiết bên dưới 2 bức ảnh xuất hiện
      if (icdInfo) {
        tl.to(
          icdInfo,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
          },
          0.4,
        );
      }
      if (portInfo) {
        tl.to(
          portInfo,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
          },
          0.6,
        );
      }
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="mt-12 w-full py-2 will-change-transform sm:mt-16 sm:py-4 lg:mt-20"
    >
      {/* HÀNG 1: ẢNH ICD (DÀI RỘNG, CHIỀU CAO THẤP HƠN 16:10)  ---  [TRỤC NỐI NGẮN LẠI & XE TẢI]  ---  ẢNH CẢNG (16:10) */}
      <div className="flex items-center justify-between gap-3 sm:gap-5 lg:gap-8">
        {/* Ảnh ICD Lao Bảo: Chiều ngang dài rộng, chiều cao ngắn lại theo tỷ lệ 16:10 */}
        <div
          ref={icdImgRef}
          className="flex-1 min-w-0 max-w-[460px] lg:max-w-[500px]"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none border border-border/80 bg-muted-light/20 shadow-md">
            <Image
              src="/images/icd/tmp-icd-laobao-01.webp"
              alt={icdTitle}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 500px"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        </div>

        {/* Trục nối khoảng cách: Thu ngắn chiều dài, cô đọng tinh tế ở giữa */}
        <div className="flex w-24 shrink-0 flex-col items-center justify-center px-0.5 min-[480px]:w-32 sm:w-44 md:w-56 lg:w-64 sm:px-2">
          {/* Cự ly ở trên trục nối */}
          <div ref={badgeRef} className="mb-2 text-center sm:mb-3">
            <span className="inline-block rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 font-body text-[10px] font-bold tracking-[0.14em] text-primary sm:px-3 sm:py-1 sm:text-xs">
              ≈{distanceFormatted} {unitKm}
            </span>
          </div>

          {/* Đường thẳng chạy ngang có 2 đầu chấm tròn ●━━━━━━━━━● */}
          <div className="relative flex w-full items-center">
            {/* Chấm mốc trái ● */}
            <span
              ref={dotLeftRef}
              className="h-2 w-2 shrink-0 rounded-full bg-primary ring-2 ring-primary/20 sm:h-2.5 sm:w-2.5 sm:ring-4"
              aria-hidden="true"
            />

            {/* Ray nối ngang thu ngắn */}
            <div className="relative mx-1 h-[2px] flex-1 overflow-visible rounded-full bg-border/80 sm:mx-1.5 sm:h-[3px]">
              {/* Đường tiến trình GSAP vẽ chạy từ trái sang phải */}
              <div
                ref={lineProgressRef}
                className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-primary via-primary-light to-primary"
              />

              {/* Xe tải 🚚 chạy dọc tuyến từ ICD đến Cảng */}
              <div
                ref={truckRef}
                className="absolute top-1/2 -mt-3.5 flex -translate-y-1/2 items-center will-change-transform sm:-mt-4"
                style={{ left: "0%" }}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-white text-primary shadow-sm sm:h-7 sm:w-7">
                  <Truck className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Chấm mốc phải ● */}
            <span
              ref={dotRightRef}
              className="h-2 w-2 shrink-0 rounded-full bg-primary ring-2 ring-primary/20 sm:h-2.5 sm:w-2.5 sm:ring-4"
              aria-hidden="true"
            />
          </div>

          {/* Nhãn mô tả bên dưới trục nối */}
          <div ref={truckLabelRef} className="mt-2 text-center sm:mt-3">
            <p className="font-body text-[10px] leading-tight text-muted sm:text-xs">
              <span className="font-semibold text-primary">{truckLabel}</span>
              <span className="hidden md:inline text-muted/80"> · {corridorNote}</span>
            </p>
          </div>
        </div>

        {/* Ảnh Cảng Chân Mây: Chiều ngang dài rộng, chiều cao ngắn lại theo tỷ lệ 16:10 */}
        <div
          ref={portImgRef}
          className="flex-1 min-w-0 max-w-[460px] lg:max-w-[500px]"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none border border-border/80 bg-muted-light/20 shadow-md">
            <Image
              src="/images/port/port-aerial-01.webp"
              alt={portTitle}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 500px"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* HÀNG 2: THÔNG TIN CHI TIẾT NGAY BÊN DƯỚI ẢNH (BỎ UPPERCASE, TIÊU ĐỀ: ICD Lao Bảo & Cảng Chân Mây) */}
      <div className="mt-3.5 flex items-start justify-between gap-3 sm:mt-5 sm:gap-5 lg:gap-8">
        {/* Thông tin ICD Lao Bảo */}
        <div
          ref={icdInfoRef}
          className="flex-1 min-w-0 max-w-[460px] lg:max-w-[500px]"
        >
          <h3 className="font-heading text-base font-bold tracking-tight text-ink sm:text-2xl lg:text-3xl">
            {icdTitle}
          </h3>

          <div className="mt-1 flex items-baseline gap-1 font-body text-xl font-extrabold tracking-tight text-ink sm:mt-2 sm:text-3xl lg:text-4xl">
            <Counter
              value={icdArea}
              locale={locale}
              duration={1.0}
              toggleActions="restart none none reset"
              className="text-ink"
            />
            <span className="text-xs font-bold text-muted sm:text-base lg:text-lg">
              {unitSqm}
            </span>
          </div>

          <p className="mt-1 font-body text-[11px] leading-snug text-muted sm:mt-2 sm:text-xs sm:leading-relaxed lg:text-sm">
            {icdTagline}
          </p>
        </div>

        {/* Khoảng đệm giữa tương ứng với độ dài ngắn của trục nối */}
        <div className="w-24 shrink-0 min-[480px]:w-32 sm:w-44 md:w-56 lg:w-64" />

        {/* Thông tin Cảng Chân Mây */}
        <div
          ref={portInfoRef}
          className="flex-1 min-w-0 max-w-[460px] text-right lg:max-w-[500px]"
        >
          <h3 className="font-heading text-base font-bold tracking-tight text-ink sm:text-2xl lg:text-3xl">
            {portTitle}
          </h3>

          <div className="mt-1 flex items-baseline justify-end gap-1 font-body text-xl font-extrabold tracking-tight text-ink sm:mt-2 sm:text-3xl lg:text-4xl">
            <Counter
              value={portArea}
              decimals={1}
              locale={locale}
              duration={1.0}
              toggleActions="restart none none reset"
              className="text-ink"
            />
            <span className="text-xs font-bold text-muted sm:text-base lg:text-lg">
              {unitHa}
            </span>
          </div>

          <p className="mt-1 font-body text-[11px] leading-snug text-muted sm:mt-2 sm:text-xs sm:leading-relaxed lg:text-sm">
            {portTagline}
          </p>
        </div>
      </div>
    </div>
  );
}
