"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_TOKENS } from "@/lib/motion";

export type CustomerLogoItem = {
  id: string;
  name: string;
  logo: string;
  width?: number;
  height?: number;
};

type ChanMayCustomerShowcaseProps = {
  heading: string;
  summary: string;
  items: CustomerLogoItem[];
  kicker?: string;
  ctaText?: string;
};

// Hệ số dịch chuyển theo chuột cho từng card (Mouse Parallax Multi-Plane Depth)
const MOUSE_DEPTHS = [
  { x: 36, y: 28 },   // 0: Top-Left (Shaiyo)
  { x: -26, y: -20 }, // 1: Top-Center hero (Kim Long)
  { x: 40, y: 32 },   // 2: Top-Right (America Quartz)
  { x: -34, y: -26 }, // 3: Mid-Left (Billion Max)
  { x: 30, y: 24 },   // 4: Mid-Right (Jon72)
  { x: -38, y: -28 }, // 5: Bottom-Left (Malpensa)
  { x: 34, y: 26 },   // 6: Bottom-Right (Okura)
];

// Biên độ trôi theo cuộn trang (Scroll Parallax Offset)
const SCROLL_DRIFTS = [-25, 18, -30, 22, -20, 32, -22];

// Vị trí tuyệt đối phỏng theo phong cách Spyker Heritage
const DESKTOP_POSITIONS = [
  "top-[7%] left-[6%] w-[210px] xl:w-[250px] h-[120px] xl:h-[135px]",
  "top-[1.5%] left-[30%] xl:left-[32%] w-[360px] xl:w-[440px] h-[160px] xl:h-[195px]",
  "top-[8%] right-[6%] w-[220px] xl:w-[260px] h-[130px] xl:h-[145px]",
  "top-[40%] left-[2%] w-[230px] xl:w-[270px] h-[130px] xl:h-[145px]",
  "top-[44%] right-[4%] w-[220px] xl:w-[260px] h-[125px] xl:h-[140px]",
  "bottom-[6%] left-[16%] w-[240px] xl:w-[280px] h-[130px] xl:h-[145px]",
  "bottom-[5%] right-[10%] w-[250px] xl:w-[290px] h-[135px] xl:h-[150px]",
];

// Nhịp dập dềnh liên tục (Floating Buoy on water)
const FLOAT_CLASSES = [
  "float-buoy-1",
  "float-buoy-2",
  "float-buoy-3",
  "float-buoy-4",
  "float-buoy-5",
  "float-buoy-6",
  "float-buoy-7",
];

export function ChanMayCustomerShowcase({
  heading,
  summary,
  items,
}: ChanMayCustomerShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouseCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const xTo = useRef<((val: number) => void)[]>([]);
  const yTo = useRef<((val: number) => void)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    ensureGsapRegistered();

    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      // 1. Hiệu ứng xuất hiện Cinematic cho khối trung tâm (Scroll Entrance)
      if (centerRef.current) {
        gsap.fromTo(
          centerRef.current,
          { opacity: 0, y: 35, filter: MOTION_TOKENS.blur.sm },
          {
            opacity: 1,
            y: 0,
            filter: MOTION_TOKENS.blur.none,
            duration: MOTION_TOKENS.duration.cinematic,
            ease: MOTION_TOKENS.ease.cinematic,
            clearProps: "filter",
            scrollTrigger: {
              trigger: stage,
              start: MOTION_TOKENS.scrollTrigger.start,
              toggleActions: MOTION_TOKENS.scrollTrigger.toggleActions,
              once: false,
            },
          },
        );
      }

      // 2. Hiệu ứng xuất hiện Cinematic cho 7 card logo (Staggered scale & float in theo scroll)
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          {
            opacity: 0,
            scale: 0.82,
            y: 40,
            filter: MOTION_TOKENS.blur.sm,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: MOTION_TOKENS.blur.none,
            duration: MOTION_TOKENS.duration.cinematic,
            stagger: MOTION_TOKENS.stagger.fast,
            ease: MOTION_TOKENS.ease.cinematic,
            clearProps: "filter",
            scrollTrigger: {
              trigger: stage,
              start: MOTION_TOKENS.scrollTrigger.start,
              toggleActions: MOTION_TOKENS.scrollTrigger.toggleActions,
              once: false,
            },
          },
        );
      }

      // 3. Khởi tạo GSAP quickTo độc lập cho tầng di chuyển theo chuột (mouseCardsRef)
      // Tách biệt hoàn toàn với CSS Animation dập dềnh nên không bao giờ bị ghi đè hay giật
      mouseCardsRef.current.forEach((el, idx) => {
        if (!el) return;
        xTo.current[idx] = gsap.quickTo(el, "x", {
          duration: 0.55,
          ease: "power2.out",
        });
        yTo.current[idx] = gsap.quickTo(el, "y", {
          duration: 0.55,
          ease: "power2.out",
        });
      });

      // 4. Hiệu ứng trôi nhẹ theo cuộn trang (Scroll Parallax)
      cardsRef.current.forEach((el, idx) => {
        if (!el) return;
        const drift = SCROLL_DRIFTS[idx] ?? 20;
        gsap.to(el, {
          y: drift,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, stage);

    // Lắng nghe chuột trên phạm vi toàn khu vực để tạo cảm giác di chuyển đa chiều nhạy bén
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      // Chỉ tính toán khi section đang nằm trong tầm nhìn viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const relX = (e.clientX - centerX) / (rect.width / 2); // -1.0 -> +1.0
      const relY = (e.clientY - centerY) / (rect.height / 2); // -1.0 -> +1.0

      items.forEach((_, idx) => {
        const setterX = xTo.current[idx];
        const setterY = yTo.current[idx];
        const depth = MOUSE_DEPTHS[idx] ?? { x: 30, y: 22 };
        if (setterX && setterY) {
          setterX(relX * depth.x);
          setterY(relY * depth.y);
        }
      });
    };

    const handleGlobalMouseLeave = () => {
      items.forEach((_, idx) => {
        const setterX = xTo.current[idx];
        const setterY = yTo.current[idx];
        if (setterX && setterY) {
          setterX(0);
          setterY(0);
        }
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleGlobalMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseleave", handleGlobalMouseLeave);
      ctx.revert();
    };
  }, [items, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative mt-24 overflow-hidden border-t border-border/80 bg-surface-subtle/20"
    >
      {/* Keyframes nhịp nổi tự do liên tục (Floating Buoy Animations) */}
      <style>{`
        @keyframes floatBuoy1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-11px) rotate(0.4deg); }
        }
        @keyframes floatBuoy2 {
          0%, 100% { transform: translateY(-7px) rotate(-0.3deg); }
          50% { transform: translateY(8px) rotate(0.3deg); }
        }
        @keyframes floatBuoy3 {
          0%, 100% { transform: translateY(5px) rotate(0.3deg); }
          50% { transform: translateY(-9px) rotate(-0.3deg); }
        }
        @keyframes floatBuoy4 {
          0%, 100% { transform: translateY(-8px) rotate(-0.2deg); }
          50% { transform: translateY(6px) rotate(0.3deg); }
        }
        @keyframes floatBuoy5 {
          0%, 100% { transform: translateY(4px) rotate(0.3deg); }
          50% { transform: translateY(-8px) rotate(-0.3deg); }
        }
        @keyframes floatBuoy6 {
          0%, 100% { transform: translateY(-6px) rotate(-0.3deg); }
          50% { transform: translateY(8px) rotate(0.2deg); }
        }
        @keyframes floatBuoy7 {
          0%, 100% { transform: translateY(7px) rotate(0.2deg); }
          50% { transform: translateY(-7px) rotate(-0.3deg); }
        }

        .float-buoy-1 { animation: floatBuoy1 5.4s ease-in-out infinite; }
        .float-buoy-2 { animation: floatBuoy2 6.2s ease-in-out infinite; }
        .float-buoy-3 { animation: floatBuoy3 4.9s ease-in-out infinite; }
        .float-buoy-4 { animation: floatBuoy4 5.8s ease-in-out infinite; }
        .float-buoy-5 { animation: floatBuoy5 6.5s ease-in-out infinite; }
        .float-buoy-6 { animation: floatBuoy6 5.1s ease-in-out infinite; }
        .float-buoy-7 { animation: floatBuoy7 6.8s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .float-buoy-1, .float-buoy-2, .float-buoy-3, .float-buoy-4,
          .float-buoy-5, .float-buoy-6, .float-buoy-7 {
            animation: none !important;
          }
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. GIAO DIỆN DESKTOP (lg & xl): Khung bố cục Spyker Heritage  */}
      {/* ============================================================ */}
      <div
        ref={stageRef}
        className="relative hidden min-h-[780px] w-full select-none py-12 lg:block xl:min-h-[860px]"
      >
        {/* KHỐI TRUNG TÂM (Spyker Heritage Centerpiece) */}
        <div
          ref={centerRef}
          className="absolute left-1/2 top-1/2 z-10 max-w-xl -translate-x-1/2 -translate-y-1/2 px-6 text-center"
        >
          <h3 className="font-heading text-3xl font-bold tracking-tight text-ink uppercase xl:text-4xl">
            {heading}
          </h3>
          <p className="mx-auto mt-4 max-w-lg font-body text-xs leading-relaxed text-muted sm:text-sm">
            {summary}
          </p>
        </div>

        {/* 7 ẢNH LOGO NẰM RẢI RÁC BAO QUANH (3 TẦNG ĐỘC LẬP: SCROLL -> MOUSE -> FLOAT) */}
        {items.map((item, idx) => {
          const posClass = DESKTOP_POSITIONS[idx] || "top-10 left-10 w-48 h-28";
          const floatClass = FLOAT_CLASSES[idx % FLOAT_CLASSES.length];

          return (
            // TẦNG 1: Vị trí layout + Scroll Parallax & Entrance Animation
            <div
              key={item.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className={`absolute will-change-transform ${posClass}`}
            >
              {/* TẦNG 2: Mouse Parallax dịch chuyển nhẹ theo con trỏ chuột */}
              <div
                ref={(el) => {
                  mouseCardsRef.current[idx] = el;
                }}
                className="h-full w-full will-change-transform"
              >
                {/* TẦNG 3: Hiệu ứng sóng nước bập bênh liên tục (Float Buoy) */}
                <div
                  className={`${floatClass} group flex h-full w-full items-center justify-center border border-border/80 bg-white p-5 shadow-xs transition-shadow duration-300 hover:z-30 hover:border-primary hover:shadow-[0_20px_45px_rgba(55,18,102,0.18)]`}
                >
                  <div className="relative flex h-full w-full items-center justify-center">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={item.width || 360}
                      height={item.height || 180}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 2. GIAO DIỆN MOBILE & TABLET (< lg)                          */}
      {/* ============================================================ */}
      <div className="block px-4 py-12 sm:px-8 lg:hidden">
        {/* Khối thông tin trung tâm */}
        <div className="mx-auto max-w-xl text-center">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-ink uppercase sm:text-3xl">
            {heading}
          </h3>
          <p className="mt-3 font-body text-xs leading-relaxed text-muted sm:text-sm">
            {summary}
          </p>
        </div>

        {/* Lưới các card logo */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`${FLOAT_CLASSES[idx % FLOAT_CLASSES.length]} group flex h-28 items-center justify-center border border-border/80 bg-white p-4 shadow-xs transition-all duration-300 hover:border-primary hover:shadow-md sm:h-32`}
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={240}
                  height={120}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
