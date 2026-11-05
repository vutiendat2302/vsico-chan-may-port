"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
// Các hệ số đan xen âm / dương tạo độ sâu không gian 3D đa lớp
const MOUSE_DEPTHS = [
  { x: 34, y: 26 },   // 0: Top-Left (Shaiyo)
  { x: -22, y: -18 }, // 1: Top-Center hero (Kim Long)
  { x: 38, y: 30 },   // 2: Top-Right (America Quartz)
  { x: -32, y: -24 }, // 3: Mid-Left (Billion Max)
  { x: 26, y: 22 },   // 4: Mid-Right (Jon72)
  { x: -36, y: -28 }, // 5: Bottom-Left (Malpensa)
  { x: 30, y: 24 },   // 6: Bottom-Right (Okura)
];

// Hệ số trôi theo cuộn trang (Scroll Parallax Drift)
const SCROLL_DRIFTS = [-35, 20, -40, 30, -25, 45, -30];

// Vị trí và kích thước tuyệt đối trên màn hình lớn phỏng theo ảnh Spyker Heritage
const DESKTOP_POSITIONS = [
  // 0: Top-Left (Shaiyo)
  "top-[7%] left-[6%] w-[210px] xl:w-[250px] h-[120px] xl:h-[135px]",
  // 1: Top-Center hero (Kim Long) - khung rộng điểm nhấn như xe 60HP Spyker
  "top-[1.5%] left-[30%] xl:left-[32%] w-[360px] xl:w-[440px] h-[160px] xl:h-[195px]",
  // 2: Top-Right (America Quartz)
  "top-[8%] right-[6%] w-[220px] xl:w-[260px] h-[130px] xl:h-[145px]",
  // 3: Mid-Left (Billion Max)
  "top-[40%] left-[2%] w-[230px] xl:w-[270px] h-[130px] xl:h-[145px]",
  // 4: Mid-Right (Jon72)
  "top-[44%] right-[4%] w-[220px] xl:w-[260px] h-[125px] xl:h-[140px]",
  // 5: Bottom-Left (Malpensa Plant)
  "bottom-[6%] left-[16%] w-[240px] xl:w-[280px] h-[130px] xl:h-[145px]",
  // 6: Bottom-Right (Okura)
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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const xTo = useRef<((val: number) => void)[]>([]);
  const yTo = useRef<((val: number) => void)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    ensureGsapRegistered();

    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      // Khởi tạo GSAP quickTo cho dịch chuyển mượt mà 60/120fps theo con trỏ chuột
      cardsRef.current.forEach((el, idx) => {
        if (!el) return;
        xTo.current[idx] = gsap.quickTo(el, "x", {
          duration: 0.75,
          ease: "power2.out",
        });
        yTo.current[idx] = gsap.quickTo(el, "y", {
          duration: 0.75,
          ease: "power2.out",
        });
      });

      // Hiệu ứng cuộn trang: dịch chuyển nhẹ nhàng theo trục Y (Scroll Parallax)
      ScrollTrigger.create({
        trigger: stage,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress; // 0.0 -> 1.0
          cardsRef.current.forEach((el, idx) => {
            if (!el) return;
            const driftY = (progress - 0.5) * (SCROLL_DRIFTS[idx] ?? 20);
            el.style.setProperty("--scroll-drift-y", `${driftY.toFixed(1)}px`);
          });
        },
      });
    }, stage);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Sự kiện di chuyển chuột trên toàn bộ khung hình
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 -> +0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 -> +0.5

    items.forEach((_, idx) => {
      const setterX = xTo.current[idx];
      const setterY = yTo.current[idx];
      const depth = MOUSE_DEPTHS[idx] ?? { x: 25, y: 20 };
      if (setterX && setterY) {
        setterX(relX * depth.x);
        setterY(relY * depth.y);
      }
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    items.forEach((_, idx) => {
      const setterX = xTo.current[idx];
      const setterY = yTo.current[idx];
      if (setterX && setterY) {
        setterX(0);
        setterY(0);
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative mt-24 overflow-hidden border-t border-border/80 bg-surface-subtle/20"
    >
      {/* Keyframes nhịp nổi tự do liên tục (Floating Buoy Animations) */}
      <style>{`
        @keyframes floatBuoy1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-13px) rotate(0.4deg); }
        }
        @keyframes floatBuoy2 {
          0%, 100% { transform: translateY(-8px) rotate(-0.3deg); }
          50% { transform: translateY(9px) rotate(0.3deg); }
        }
        @keyframes floatBuoy3 {
          0%, 100% { transform: translateY(6px) rotate(0.3deg); }
          50% { transform: translateY(-11px) rotate(-0.3deg); }
        }
        @keyframes floatBuoy4 {
          0%, 100% { transform: translateY(-10px) rotate(-0.2deg); }
          50% { transform: translateY(7px) rotate(0.3deg); }
        }
        @keyframes floatBuoy5 {
          0%, 100% { transform: translateY(5px) rotate(0.3deg); }
          50% { transform: translateY(-10px) rotate(-0.3deg); }
        }
        @keyframes floatBuoy6 {
          0%, 100% { transform: translateY(-7px) rotate(-0.3deg); }
          50% { transform: translateY(10px) rotate(0.2deg); }
        }
        @keyframes floatBuoy7 {
          0%, 100% { transform: translateY(8px) rotate(0.2deg); }
          50% { transform: translateY(-8px) rotate(-0.3deg); }
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
      {/* Các logo sắp xếp ngẫu nhiên bao quanh, dịch chuyển theo chuột  */}
      {/* ============================================================ */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative hidden min-h-[780px] w-full select-none py-12 lg:block xl:min-h-[860px]"
      >
        {/* KHỐI TRUNG TÂM (Spyker Heritage Centerpiece) */}
        <div className="absolute left-1/2 top-1/2 z-10 max-w-xl -translate-x-1/2 -translate-y-1/2 px-6 text-center">
          <h3 className="font-heading text-3xl font-bold tracking-tight text-ink uppercase xl:text-4xl">
            {heading}
          </h3>
          <p className="mx-auto mt-4 max-w-lg font-body text-xs leading-relaxed text-muted sm:text-sm">
            {summary}
          </p>
        </div>

        {/* 7 ẢNH LOGO NẰM RẢI RÁC BAO QUANH (Chỉ để ảnh logo, góc vuông sắc nét) */}
        {items.map((item, idx) => {
          const posClass = DESKTOP_POSITIONS[idx] || "top-10 left-10 w-48 h-28";
          const floatClass = FLOAT_CLASSES[idx % FLOAT_CLASSES.length];

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              style={{
                transform: "translate3d(0, var(--scroll-drift-y, 0px), 0)",
              }}
              className={`absolute will-change-transform ${posClass}`}
            >
              <div
                className={`${floatClass} group flex h-full w-full items-center justify-center border border-border/80 bg-white p-5 shadow-xs transition-all duration-300 hover:z-30 hover:scale-105 hover:border-primary hover:shadow-[0_20px_45px_rgba(55,18,102,0.18)]`}
              >
                {/* Chỉ hiển thị hình ảnh logo tinh tế, thuần túy */}
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
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 2. GIAO DIỆN MOBILE & TABLET (< lg): Sắp xếp tự nhiên, mượt mà */}
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

        {/* Lưới các card logo thuần túy (Chỉ có logo, không text) */}
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
