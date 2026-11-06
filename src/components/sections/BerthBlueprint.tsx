"use client";

import { useEffect, useRef, useState, useId } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { SupportedLocale } from "@/lib/formatters";

type BlueprintTranslations = {
  title: string;
  ariaLabel: string;
  totalLength: string;
  berth4: string;
  berth5: string;
  berthsUnit: string;
  waterDepth: string;
  seabedDesign: string;
  masterplan: string;
  portArea: string;
  vesselNote: string;
  notToScale: string;
  elevation: string;
  mobileAria: string;
};

type BerthBlueprintProps = {
  locale: SupportedLocale;
  stats: {
    berths: number;
    quayLengthMeters: number;
    depthMeters: number;
    totalAreaHectares: number;
    areaFormatted: string;
  };
  t: BlueprintTranslations;
};

export function BerthBlueprint({ locale, stats, t }: BerthBlueprintProps) {
  const uniqueId = useId().replace(/:/g, "");
  const idPrefix = `bp-${uniqueId}`;

  const sectionRef = useRef<HTMLDivElement>(null);
  const num540Ref = useRef<SVGTSpanElement>(null);
  const numDepthRef = useRef<SVGTSpanElement>(null);
  const numPlanRef = useRef<SVGTSpanElement>(null);

  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const isVi = locale === "vi";
  const formattedLength = stats.quayLengthMeters || 540;
  const formattedBerths = String(stats.berths || 2).padStart(2, "0");
  const formattedDepth = `−${stats.depthMeters || 14}`;
  const formattedArea = stats.areaFormatted || (isVi ? "20,4" : "20.4");

  // Bật/tắt Spotlight cho từng cụm thông số
  const handleTriggerHover = (group: string) => {
    setActiveGroup(group);
  };

  const handleTriggerLeave = () => {
    setActiveGroup(null);
  };

  const handleTriggerClick = (e: React.MouseEvent, group: string) => {
    e.stopPropagation();
    setActiveGroup((prev) => (prev === group ? null : group));
  };

  // GSAP 7-Bước Hoạt cảnh Vẽ Kỹ thuật Mặt đứng Cầu bến
  useEffect(() => {
    ensureGsapRegistered();

    const section = sectionRef.current;
    if (!section) return;

    const elNum540 = num540Ref.current;
    const elNumDepth = numDepthRef.current;
    const elNumPlan = numPlanRef.current;

    if (prefersReducedMotion) {
      if (elNum540) elNum540.textContent = "540";
      if (elNumDepth) elNumDepth.textContent = "−14";
      if (elNumPlan) elNumPlan.textContent = formattedArea;
      return;
    }

    const prepStrokeDraw = (selector: string) => {
      const el = section.querySelector<SVGGeometryElement>(selector);
      if (!el || !el.getTotalLength) return null;
      const len = el.getTotalLength();
      gsap.set(el, {
        strokeDasharray: len,
        strokeDashoffset: len,
      });
      return el;
    };

    const ctx = gsap.context(() => {
      // 1. Chuẩn bị các nét vẽ kỹ thuật
      prepStrokeDraw(`#${idPrefix}-seabed-line`);
      prepStrokeDraw(`#${idPrefix}-quay-deck-rect`);
      prepStrokeDraw(`#${idPrefix}-line-540`);
      prepStrokeDraw(`#${idPrefix}-depth-axis-line`);
      prepStrokeDraw(`#${idPrefix}-plan-outline`);

      // 2. Trạng thái khởi đầu (độ lệch nhỏ, xuất hiện nhanh đồng loạt)
      gsap.set(`#${idPrefix}-seabed-hatch-rect`, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(`#${idPrefix}-water-clip-rect`, { attr: { y: 320, height: 80 } });
      gsap.set(`#${idPrefix}-quay-piles`, { opacity: 0 });
      gsap.set(`#${idPrefix}-berth-divider`, { opacity: 0, scaleY: 0, transformOrigin: "top center" });
      gsap.set([`#${idPrefix}-tick-left-540`, `#${idPrefix}-tick-right-540`], { opacity: 0 });
      gsap.set(`#${idPrefix}-ship`, { x: -40, opacity: 0 });
      gsap.set([`#${idPrefix}-depth-arrow-top`, `#${idPrefix}-depth-arrow-bot`], { opacity: 0 });
      gsap.set(`#${idPrefix}-plan-clip-rect`, { attr: { width: 0, height: 0 } });
      gsap.set([`#${idPrefix}-berth-main-callout`, `#${idPrefix}-berth-sublabels`], { opacity: 0, y: 4 });

      if (elNum540) elNum540.textContent = "0";
      if (elNumDepth) elNumDepth.textContent = "0";
      if (elNumPlan) elNumPlan.textContent = isVi ? "0,0" : "0.0";

      const counters = { len: 0, depth: 0, area: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Xuất hiện ĐỒNG LOẠT tất cả các thành phần trong 0.5s, không để lần lượt
      const DURATION = 0.5;
      const EASE = "power2.out";

      tl.to(`#${idPrefix}-seabed-line`, { strokeDashoffset: 0, duration: DURATION, ease: EASE }, 0)
        .to(`#${idPrefix}-seabed-hatch-rect`, { clipPath: "inset(0 0% 0 0)", duration: DURATION, ease: EASE }, 0)
        .to(`#${idPrefix}-water-clip-rect`, { attr: { y: 210, height: 190 }, duration: DURATION, ease: EASE }, 0)
        .to(`#${idPrefix}-quay-deck-rect`, { strokeDashoffset: 0, duration: DURATION, ease: EASE }, 0)
        .to(`#${idPrefix}-quay-piles`, { opacity: 1, duration: DURATION, ease: EASE }, 0)
        .to(`#${idPrefix}-berth-divider`, { opacity: 1, scaleY: 1, duration: DURATION, ease: EASE }, 0)
        .to([`#${idPrefix}-tick-left-540`, `#${idPrefix}-tick-right-540`], { opacity: 1, duration: DURATION * 0.8 }, 0)
        .to(`#${idPrefix}-line-540`, { strokeDashoffset: 0, duration: DURATION, ease: EASE }, 0)
        .to(`#${idPrefix}-ship`, { x: 0, opacity: 1, duration: DURATION, ease: EASE }, 0)
        .to(`#${idPrefix}-depth-axis-line`, { strokeDashoffset: 0, duration: DURATION, ease: EASE }, 0)
        .to([`#${idPrefix}-depth-arrow-top`, `#${idPrefix}-depth-arrow-bot`], { opacity: 1, duration: DURATION * 0.8 }, 0)
        .to(`#${idPrefix}-plan-outline`, { strokeDashoffset: 0, duration: DURATION, ease: EASE }, 0)
        .to(`#${idPrefix}-plan-clip-rect`, { attr: { width: 160, height: 110 }, duration: DURATION, ease: EASE }, 0)
        .to([`#${idPrefix}-berth-main-callout`, `#${idPrefix}-berth-sublabels`], { opacity: 1, y: 0, duration: DURATION, ease: EASE }, 0)
        .to(counters, {
          len: 540,
          depth: 14,
          area: 20.4,
          duration: DURATION,
          ease: EASE,
          onUpdate: () => {
            if (elNum540) elNum540.textContent = String(Math.round(counters.len));
            const valDepth = Math.round(counters.depth);
            if (elNumDepth) elNumDepth.textContent = valDepth === 0 ? "0" : `−${valDepth}`;
            if (elNumPlan) {
              const valArea = counters.area.toFixed(1);
              elNumPlan.textContent = isVi ? valArea.replace(".", ",") : valArea;
            }
          },
          onComplete: () => {
            if (elNum540) elNum540.textContent = "540";
            if (elNumDepth) elNumDepth.textContent = "−14";
            if (elNumPlan) elNumPlan.textContent = formattedArea;
          },
        }, 0);
    }, section);

    return () => ctx.revert();
  }, [idPrefix, isVi, formattedArea, prefersReducedMotion]);

  const isPartActive = (group: string) => {
    if (!activeGroup) return false;
    return group.split(" ").includes(activeGroup);
  };

  return (
    <div
      ref={sectionRef}
      onClick={() => setActiveGroup(null)}
      className={cn(
        "berth-blueprint relative my-12 w-full overflow-hidden bg-white sm:my-16",
        activeGroup && "is-hovering",
      )}
    >
      {/* CSS Keyframes & Styles cho Sóng nước & Spotlight */}
      <style jsx>{`
        @keyframes waveDrift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-120px);
          }
        }
        .wave-drift {
          animation: waveDrift 14s linear infinite;
        }
        .wave-drift-slow {
          animation: waveDrift 22s linear infinite reverse;
        }
        .interactive-part {
          transition: opacity 0.35s ease;
        }
        .is-hovering .interactive-part {
          opacity: 0.18;
        }
        .is-hovering .interactive-part.is-active {
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-drift,
          .wave-drift-slow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Danh sách ẩn trợ năng cho trình đọc màn hình */}
      <div className="sr-only">
        <h2>{t.title}</h2>
        <ul>
          <li>{t.totalLength}: {formattedLength} m</li>
          <li>{t.berthsUnit}: {formattedBerths} ({t.berth4} &amp; {t.berth5})</li>
          <li>{t.waterDepth}: {formattedDepth} m</li>
          <li>{t.portArea}: {formattedArea} ha</li>
        </ul>
      </div>

      {/* ======================================================================
           1. BẢN VẼ KỸ THUẬT DESKTOP (VIEWBOX 1200 x 500)
           ====================================================================== */}
      <svg
        className="hidden md:block w-full h-auto select-none"
        viewBox="0 0 1200 500"
        role="img"
        aria-label={t.ariaLabel}
      >
        <defs>
          {/* Gạch chéo xám nhạt cho đáy biển */}
          <pattern
            id={`${idPrefix}-seabed-hatch`}
            width="10"
            height="10"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="10" stroke="#D1D1D6" strokeWidth="1" />
          </pattern>

          {/* Gạch chéo tím mảnh cho mặt bằng 20,4 ha */}
          <pattern
            id={`${idPrefix}-plan-hatch`}
            width="7"
            height="7"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="7" stroke="#3B1E54" strokeWidth="0.6" strokeOpacity="0.45" />
          </pattern>

          {/* Clip-path mặt nước dâng từ dưới lên */}
          <clipPath id={`${idPrefix}-water-rise-clip`}>
            <rect id={`${idPrefix}-water-clip-rect`} x="0" y="210" width="900" height="190" />
          </clipPath>

          {/* Clip-path giới hạn sóng nước trong mặt cắt */}
          <clipPath id={`${idPrefix}-water-bounds`}>
            <rect x="40" y="200" width="840" height="205" />
          </clipPath>

          {/* Clip-path tô gạch chéo dần cho mặt bằng 20,4 ha */}
          <clipPath id={`${idPrefix}-plan-fill-clip`}>
            <rect id={`${idPrefix}-plan-clip-rect`} x="955" y="105" width="160" height="110" />
          </clipPath>
        </defs>

        {/* ================= NHÓM ĐÁY BIỂN & ĐỘ SÂU (-14 m) ================= */}
        <g
          className={cn("interactive-part", isPartActive("depth") && "is-active")}
          data-group="depth"
        >
          {/* Mặt nước dâng lên */}
          <g clipPath={`url(#${idPrefix}-water-bounds)`}>
            <g clipPath={`url(#${idPrefix}-water-rise-clip)`}>
              <rect x="40" y="210" width="840" height="190" fill="rgba(59, 30, 84, 0.06)" />

              {/* 3 đường sóng mảnh trôi chậm vô hạn */}
              <g id={`${idPrefix}-water-ripple`}>
                <path
                  className="wave-drift"
                  d="M 0 210 Q 30 207, 60 210 T 120 210 T 180 210 T 240 210 T 300 210 T 360 210 T 420 210 T 480 210 T 540 210 T 600 210 T 660 210 T 720 210 T 780 210 T 840 210 T 900 210 T 960 210 T 1020 210"
                  fill="none"
                  stroke="#3B1E54"
                  strokeWidth="0.7"
                  strokeOpacity="0.45"
                />
                <path
                  className="wave-drift-slow"
                  d="M -120 218 Q -90 216, -60 218 T 0 218 T 60 218 T 120 218 T 180 218 T 240 218 T 300 218 T 360 218 T 420 218 T 480 218 T 540 218 T 600 218 T 660 218 T 720 218 T 780 218 T 840 218 T 900 218"
                  fill="none"
                  stroke="#3B1E54"
                  strokeWidth="0.5"
                  strokeOpacity="0.25"
                />
                <path
                  className="wave-drift"
                  d="M 0 227 Q 30 225, 60 227 T 120 227 T 180 227 T 240 227 T 300 227 T 360 227 T 420 227 T 480 227 T 540 227 T 600 227 T 660 227 T 720 227 T 780 227 T 840 227 T 900 227 T 960 227"
                  fill="none"
                  stroke="#3B1E54"
                  strokeWidth="0.4"
                  strokeOpacity="0.18"
                />
              </g>
            </g>
          </g>

          {/* Đáy biển (Đường chuẩn + Vùng gạch chéo) */}
          <g>
            <line
              id={`${idPrefix}-seabed-line`}
              x1="40"
              y1="400"
              x2="880"
              y2="400"
              stroke="#3B1E54"
              strokeWidth="1"
              fill="none"
            />
            <rect
              id={`${idPrefix}-seabed-hatch-rect`}
              x="40"
              y="400"
              width="840"
              height="28"
              fill={`url(#${idPrefix}-seabed-hatch)`}
            />
            <text
              x="880"
              y="444"
              textAnchor="end"
              className="font-label text-[10px] uppercase tracking-[0.14em]"
              fill="#8E8E93"
            >
              {t.seabedDesign}
            </text>
          </g>

          {/* Đường kích thước thẳng đứng -14 m */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => handleTriggerHover("depth")}
            onMouseLeave={handleTriggerLeave}
            onClick={(e) => handleTriggerClick(e, "depth")}
          >
            <rect x="95" y="205" width="220" height="200" fill="transparent" pointerEvents="all" />
            <line x1="115" y1="210" x2="145" y2="210" stroke="#8E8E93" strokeWidth="0.5" />
            <line x1="115" y1="400" x2="145" y2="400" stroke="#8E8E93" strokeWidth="0.5" />
            <line
              id={`${idPrefix}-depth-axis-line`}
              x1="130"
              y1="210"
              x2="130"
              y2="400"
              stroke="#8E8E93"
              strokeWidth="0.5"
            />
            <polygon id={`${idPrefix}-depth-arrow-top`} points="130,210 127,218 133,218" fill="#8E8E93" />
            <polygon id={`${idPrefix}-depth-arrow-bot`} points="130,400 127,392 133,392" fill="#8E8E93" />
            <polyline points="130,305 162,305" stroke="#8E8E93" strokeWidth="0.5" fill="none" />
            <text x="172" y="312" className="font-heading text-[42px] font-medium" fill="#3B1E54">
              <tspan ref={numDepthRef}>−14</tspan>
              <tspan dx="4" className="font-label text-[14px] font-medium tracking-wider" fill="#3B1E54">
                m
              </tspan>
            </text>
            <text x="172" y="332" className="font-label text-[11px] font-medium uppercase tracking-[0.16em]" fill="#3B1E54">
              {t.waterDepth}
            </text>
          </g>
        </g>

        {/* ================= NHÓM CẦU BẾN & 540 m & 02 BẾN ================= */}
        <g>
          {/* Kết cấu mặt đứng cầu bến */}
          <g
            id={`${idPrefix}-quay-structure`}
            className={cn("interactive-part", (isPartActive("length") || isPartActive("berths")) && "is-active")}
            data-group="length berths"
          >
            {/* Dầm mặt bến trên mặt nước */}
            <rect
              id={`${idPrefix}-quay-deck-rect`}
              x="120"
              y="176"
              width="680"
              height="16"
              fill="#FFFFFF"
              stroke="#3B1E54"
              strokeWidth="1"
            />
            {/* Hệ cọc cắm xuống đáy biển */}
            <g id={`${idPrefix}-quay-piles`} stroke="#3B1E54" strokeWidth="0.75" strokeOpacity="0.35">
              <line x1="145" y1="192" x2="145" y2="400" />
              <line x1="210" y1="192" x2="210" y2="400" />
              <line x1="275" y1="192" x2="275" y2="400" />
              <line x1="340" y1="192" x2="340" y2="400" />
              <line x1="405" y1="192" x2="405" y2="400" />
              <line x1="515" y1="192" x2="515" y2="400" />
              <line x1="580" y1="192" x2="580" y2="400" />
              <line x1="645" y1="192" x2="645" y2="400" />
              <line x1="710" y1="192" x2="710" y2="400" />
              <line x1="775" y1="192" x2="775" y2="400" />
            </g>
            {/* Đệm va tàu (Fenders) dọc mặt bến */}
            <g fill="#3B1E54">
              <rect x="175" y="180" width="4" height="9" />
              <rect x="260" y="180" width="4" height="9" />
              <rect x="345" y="180" width="4" height="9" />
              <rect x="430" y="180" width="4" height="9" />
              <rect x="515" y="180" width="4" height="9" />
              <rect x="600" y="180" width="4" height="9" />
              <rect x="685" y="180" width="4" height="9" />
              <rect x="745" y="180" width="4" height="9" />
            </g>
          </g>

          {/* Đường kích thước 540 m phía trên cầu bến */}
          <g
            className={cn("interactive-part cursor-pointer", isPartActive("length") && "is-active")}
            data-group="length"
            onMouseEnter={() => handleTriggerHover("length")}
            onMouseLeave={handleTriggerLeave}
            onClick={(e) => handleTriggerClick(e, "length")}
          >
            <rect x="115" y="30" width="690" height="80" fill="transparent" pointerEvents="all" />
            <line id={`${idPrefix}-tick-left-540`} x1="120" y1="68" x2="120" y2="168" stroke="#8E8E93" strokeWidth="0.5" />
            <line id={`${idPrefix}-tick-right-540`} x1="800" y1="68" x2="800" y2="168" stroke="#8E8E93" strokeWidth="0.5" />
            <line id={`${idPrefix}-line-540`} x1="120" y1="86" x2="800" y2="86" stroke="#8E8E93" strokeWidth="0.5" />
            <line x1="116" y1="90" x2="124" y2="82" stroke="#3B1E54" strokeWidth="1" />
            <line x1="796" y1="90" x2="804" y2="82" stroke="#3B1E54" strokeWidth="1" />

            <rect x="375" y="42" width="170" height="65" fill="#FFFFFF" />
            <text x="460" y="82" textAnchor="middle" className="font-heading text-[42px] font-medium" fill="#3B1E54">
              <tspan ref={num540Ref}>540</tspan>
              <tspan dx="5" className="font-label text-[14px] font-medium tracking-wider" fill="#3B1E54">
                m
              </tspan>
            </text>
            <text x="460" y="102" textAnchor="middle" className="font-label text-[11px] font-medium uppercase tracking-[0.16em]" fill="#3B1E54">
              {t.totalLength}
            </text>
          </g>

          {/* Vạch chia đôi cầu bến & Nhãn 02 BẾN (Bến 4 & Bến 5) */}
          <g
            className={cn("interactive-part cursor-pointer", isPartActive("berths") && "is-active")}
            data-group="berths"
            onMouseEnter={() => handleTriggerHover("berths")}
            onMouseLeave={handleTriggerLeave}
            onClick={(e) => handleTriggerClick(e, "berths")}
          >
            <rect x="120" y="115" width="680" height="65" fill="transparent" pointerEvents="all" />
            <line
              id={`${idPrefix}-berth-divider`}
              x1="460"
              y1="125"
              x2="460"
              y2="202"
              stroke="#3B1E54"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            <g id={`${idPrefix}-berth-sublabels`}>
              <text x="290" y="160" textAnchor="middle" className="font-label text-[11px] font-medium uppercase tracking-[0.16em]" fill="#3B1E54">
                {t.berth4}
              </text>
              <text x="630" y="160" textAnchor="middle" className="font-label text-[11px] font-medium uppercase tracking-[0.16em]" fill="#3B1E54">
                {t.berth5}
              </text>
            </g>

            <g id={`${idPrefix}-berth-main-callout`}>
              <polyline points="460,132 505,118 532,118" stroke="#8E8E93" strokeWidth="0.5" fill="none" />
              <circle cx="460" cy="132" r="2" fill="#3B1E54" />
              <text x="540" y="126" className="font-heading text-[42px] font-medium" fill="#3B1E54">
                <tspan>02</tspan>
                <tspan dx="5" className="font-label text-[14px] font-medium tracking-wider" fill="#3B1E54">
                  {t.berthsUnit}
                </tspan>
              </text>
            </g>
          </g>
        </g>

        {/* ================= CON TÀU TÍM ĐẶC (ĐIỂM NHÌN NỔI BẬT) ================= */}
        <g
          id={`${idPrefix}-ship`}
          className={cn("interactive-part", (isPartActive("length") || isPartActive("berths")) && "is-active")}
          data-group="length berths"
        >
          {/* Thân tàu */}
          <path d="M 240 184 L 665 184 L 682 192 L 668 236 L 252 236 L 236 196 Z" fill="#3B1E54" />
          <line x1="238" y1="210" x2="676" y2="210" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.65" />

          {/* Đài chỉ huy (Bridge) */}
          <path d="M 268 184 L 268 148 L 298 148 L 298 158 L 308 158 L 308 184 Z" fill="#3B1E54" />
          <rect x="273" y="153" width="20" height="4" fill="#FFFFFF" />
          <polygon points="250,184 254,162 263,162 263,184" fill="#3B1E54" />

          {/* Container / Hàng hóa trên boong */}
          <g fill="#3B1E54">
            <rect x="322" y="160" width="46" height="22" />
            <rect x="374" y="152" width="46" height="30" />
            <rect x="426" y="156" width="46" height="26" />
            <rect x="478" y="150" width="46" height="32" />
            <rect x="530" y="158" width="46" height="24" />
            <rect x="582" y="164" width="42" height="18" />
          </g>
          <g stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.5">
            <line x1="322" y1="171" x2="624" y2="171" />
            <line x1="374" y1="161" x2="576" y2="161" />
          </g>

          <polygon points="635,184 676,174 682,184" fill="#3B1E54" />

          <text
            x="460"
            y="256"
            textAnchor="middle"
            className="font-label text-[10px] uppercase tracking-[0.14em]"
            fill="#8E8E93"
          >
            {t.vesselNote}
          </text>
        </g>

        {/* ================= NHÓM MẶT BẰNG 20,4 HA (GÓC PHẢI) ================= */}
        <g
          className={cn("interactive-part cursor-pointer", isPartActive("plan") && "is-active")}
          data-group="plan"
          onMouseEnter={() => handleTriggerHover("plan")}
          onMouseLeave={handleTriggerLeave}
          onClick={(e) => handleTriggerClick(e, "plan")}
        >
          <rect x="930" y="65" width="240" height="260" fill="transparent" pointerEvents="all" />

          <text x="955" y="90" className="font-label text-[11px] font-medium uppercase tracking-[0.16em]" fill="#3B1E54">
            {t.masterplan}
          </text>

          <rect x="945" y="96" width="180" height="128" stroke="#8E8E93" strokeWidth="0.5" strokeDasharray="4 4" fill="none" />

          <polygon
            id={`${idPrefix}-plan-outline`}
            points="955,108 1095,108 1112,145 1112,212 955,212"
            fill="#FFFFFF"
            stroke="#3B1E54"
            strokeWidth="1"
          />

          <g clipPath={`url(#${idPrefix}-plan-fill-clip)`}>
            <polygon points="955,108 1095,108 1112,145 1112,212 955,212" fill={`url(#${idPrefix}-plan-hatch)`} />
            <line x1="1015" y1="108" x2="1015" y2="212" stroke="#8E8E93" strokeWidth="0.5" />
            <line x1="955" y1="165" x2="1112" y2="165" stroke="#8E8E93" strokeWidth="0.5" />
          </g>

          <polyline points="1035,212 1035,245" stroke="#8E8E93" strokeWidth="0.5" fill="none" />
          <circle cx="1035" cy="212" r="2" fill="#3B1E54" />

          <text x="955" y="284" className="font-heading text-[42px] font-medium" fill="#3B1E54">
            <tspan ref={numPlanRef}>{formattedArea}</tspan>
            <tspan dx="5" className="font-label text-[14px] font-medium tracking-wider" fill="#3B1E54">
              ha
            </tspan>
          </text>
          <text x="955" y="306" className="font-label text-[11px] font-medium uppercase tracking-[0.16em]" fill="#3B1E54">
            {t.portArea}
          </text>
        </g>

        {/* ================= KHUNG TIÊU ĐỀ KỸ SƯ (TITLE BLOCK GÓC DƯỚI PHẢI) ================= */}
        <g>
          <rect x="770" y="426" width="390" height="36" fill="#FFFFFF" stroke="#8E8E93" strokeWidth="0.5" />
          <line x1="900" y1="426" x2="900" y2="462" stroke="#8E8E93" strokeWidth="0.5" />
          <line x1="1045" y1="426" x2="1045" y2="462" stroke="#8E8E93" strokeWidth="0.5" />
          <text x="835" y="448" textAnchor="middle" className="font-label text-[10px] uppercase tracking-[0.14em]" fill="#8E8E93">
            VSICO HUẾ
          </text>
          <text x="972" y="448" textAnchor="middle" className="font-label text-[10px] uppercase tracking-[0.14em]" fill="#8E8E93">
            {t.elevation}
          </text>
          <text x="1105" y="448" textAnchor="middle" className="font-label text-[10px] uppercase tracking-[0.14em]" fill="#8E8E93">
            {t.notToScale}
          </text>
        </g>
      </svg>

      {/* ======================================================================
           2. BẢN VẼ ĐIỆN THOẠI (SVG THU GỌN + LƯỚI THÔNG SỐ 2x2)
           ====================================================================== */}
      <div className="block md:hidden">
        <svg
          className="w-full h-auto select-none"
          viewBox="0 0 420 310"
          role="img"
          aria-label={t.mobileAria}
        >
          {/* Mặt nước */}
          <rect x="10" y="130" width="400" height="125" fill="rgba(59, 30, 84, 0.06)" />
          <path
            className="wave-drift"
            d="M 0 130 Q 25 127, 50 130 T 100 130 T 150 130 T 200 130 T 250 130 T 300 130 T 350 130 T 400 130 T 450 130 T 500 130"
            fill="none"
            stroke="#3B1E54"
            strokeWidth="0.7"
            strokeOpacity="0.45"
          />

          {/* Đáy biển & Đường -14 m */}
          <g className={cn("interactive-part", isPartActive("depth") && "is-active")}>
            <line x1="10" y1="255" x2="410" y2="255" stroke="#3B1E54" strokeWidth="1" />
            <rect x="10" y="255" width="400" height="18" fill={`url(#${idPrefix}-seabed-hatch)`} />
            <line x1="35" y1="130" x2="55" y2="130" stroke="#8E8E93" strokeWidth="0.5" />
            <line x1="35" y1="255" x2="55" y2="255" stroke="#8E8E93" strokeWidth="0.5" />
            <line x1="45" y1="130" x2="45" y2="255" stroke="#8E8E93" strokeWidth="0.5" />
            <polygon points="45,130 42,137 48,137" fill="#8E8E93" />
            <polygon points="45,255 42,248 48,248" fill="#8E8E93" />
            <text x="54" y="198" className="font-label text-[11px] font-medium uppercase tracking-[0.16em]" fill="#3B1E54">
              −14 M
            </text>
          </g>

          {/* Cầu bến & Vạch chia 2 bến */}
          <g className={cn("interactive-part", (isPartActive("length") || isPartActive("berths")) && "is-active")}>
            <rect x="35" y="106" width="350" height="12" fill="#FFFFFF" stroke="#3B1E54" strokeWidth="1" />
            <g stroke="#3B1E54" strokeWidth="0.6" strokeOpacity="0.3">
              <line x1="65" y1="118" x2="65" y2="255" />
              <line x1="135" y1="118" x2="135" y2="255" />
              <line x1="285" y1="118" x2="285" y2="255" />
              <line x1="355" y1="118" x2="355" y2="255" />
            </g>
            <line x1="210" y1="62" x2="210" y2="125" stroke="#3B1E54" strokeWidth="1" strokeDasharray="4 4" />
            <text x="122" y="94" textAnchor="middle" className="font-label text-[11px] font-medium uppercase tracking-[0.16em]" fill="#3B1E54">
              {t.berth4}
            </text>
            <text x="298" y="94" textAnchor="middle" className="font-label text-[11px] font-medium uppercase tracking-[0.16em]" fill="#3B1E54">
              {t.berth5}
            </text>
          </g>

          {/* Đường 540 m */}
          <g className={cn("interactive-part", isPartActive("length") && "is-active")}>
            <line x1="35" y1="30" x2="35" y2="98" stroke="#8E8E93" strokeWidth="0.5" />
            <line x1="385" y1="30" x2="385" y2="98" stroke="#8E8E93" strokeWidth="0.5" />
            <line x1="35" y1="42" x2="385" y2="42" stroke="#8E8E93" strokeWidth="0.5" />
            <rect x="165" y="28" width="90" height="24" fill="#FFFFFF" />
            <text x="210" y="46" textAnchor="middle" className="font-label text-[11px] font-medium uppercase tracking-[0.16em]" fill="#3B1E54">
              540 M
            </text>
          </g>

          {/* Tàu tím */}
          <g className={cn("interactive-part", (isPartActive("length") || isPartActive("berths")) && "is-active")}>
            <path d="M 105 112 L 340 112 L 352 118 L 342 148 L 114 148 L 102 120 Z" fill="#3B1E54" />
            <line x1="104" y1="130" x2="348" y2="130" stroke="#FFFFFF" strokeWidth="0.7" strokeOpacity="0.65" />
            <path d="M 122 112 L 122 86 L 142 86 L 142 112 Z" fill="#3B1E54" />
            <g fill="#3B1E54">
              <rect x="155" y="94" width="32" height="16" />
              <rect x="192" y="88" width="32" height="22" />
              <rect x="229" y="92" width="32" height="18" />
              <rect x="266" y="96" width="32" height="14" />
            </g>
          </g>

          <text x="410" y="294" textAnchor="end" className="font-label text-[10px] uppercase tracking-[0.14em]" fill="#8E8E93">
            {t.notToScale}
          </text>
        </svg>

        {/* Lưới 4 thông số 2x2 cho điện thoại, không card, phân tách bằng đường kẻ mảnh */}
        <div className="mt-4 grid grid-cols-2 border-y border-border">
          {/* Ô 1: Chiều dài */}
          <div
            onClick={(e) => handleTriggerClick(e, "length")}
            className={cn(
              "cursor-pointer border-r border-b border-border p-4 transition-opacity duration-300",
              activeGroup && activeGroup !== "length" && "opacity-25",
              activeGroup === "length" && "opacity-100",
            )}
          >
            <div className="font-heading text-2xl font-medium text-primary">
              <span>{formattedLength}</span>
              <span className="ml-1 font-label text-xs font-medium">m</span>
            </div>
            <div className="mt-1 font-label text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
              {t.totalLength}
            </div>
          </div>

          {/* Ô 2: Số bến */}
          <div
            onClick={(e) => handleTriggerClick(e, "berths")}
            className={cn(
              "cursor-pointer border-b border-border p-4 transition-opacity duration-300",
              activeGroup && activeGroup !== "berths" && "opacity-25",
              activeGroup === "berths" && "opacity-100",
            )}
          >
            <div className="font-heading text-2xl font-medium text-primary">
              <span>{formattedBerths}</span>
              <span className="ml-1 font-label text-xs font-medium">{t.berthsUnit.toLowerCase()}</span>
            </div>
            <div className="mt-1 font-label text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
              {t.berth4} &amp; {t.berth5}
            </div>
          </div>

          {/* Ô 3: Độ sâu */}
          <div
            onClick={(e) => handleTriggerClick(e, "depth")}
            className={cn(
              "cursor-pointer border-r border-border p-4 transition-opacity duration-300",
              activeGroup && activeGroup !== "depth" && "opacity-25",
              activeGroup === "depth" && "opacity-100",
            )}
          >
            <div className="font-heading text-2xl font-medium text-primary">
              <span>−14</span>
              <span className="ml-1 font-label text-xs font-medium">m</span>
            </div>
            <div className="mt-1 font-label text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
              {t.waterDepth}
            </div>
          </div>

          {/* Ô 4: Diện tích */}
          <div
            onClick={(e) => handleTriggerClick(e, "plan")}
            className={cn(
              "flex items-center justify-between cursor-pointer p-4 transition-opacity duration-300",
              activeGroup && activeGroup !== "plan" && "opacity-25",
              activeGroup === "plan" && "opacity-100",
            )}
          >
            <div>
              <div className="font-heading text-2xl font-medium text-primary">
                <span>{formattedArea}</span>
                <span className="ml-1 font-label text-xs font-medium">ha</span>
              </div>
              <div className="mt-1 font-label text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                {t.portArea}
              </div>
            </div>

            <svg
              className="h-10 w-10 shrink-0"
              viewBox="0 0 50 50"
              aria-hidden="true"
            >
              <polygon
                points="4,8 40,8 46,20 46,42 4,42"
                fill={`url(#${idPrefix}-plan-hatch)`}
                stroke="#3B1E54"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
