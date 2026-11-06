"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_TOKENS } from "@/lib/motion";

export type ServiceItemDisplay = {
  text: string;
  tag?: string;
};

export type ServiceColumnDisplay = {
  id: string;
  num: string;
  title: string;
  image: string;
  imageAlt: string;
  items: ServiceItemDisplay[];
};

type ServicesClientProps = {
  columns: ServiceColumnDisplay[];
};

export function ServicesClient({ columns }: ServicesClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    ensureGsapRegistered();

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Hiệu ứng xuất hiện cho 3 cột: Trượt từ dưới lên, mờ ảo điện ảnh, lệch nhau 140ms
      const validCols = colRefs.current.filter(Boolean);
      if (validCols.length > 0) {
        gsap.fromTo(
          validCols,
          {
            opacity: 0,
            y: MOTION_TOKENS.distance.lg,
            filter: MOTION_TOKENS.blur.md,
          },
          {
            opacity: 1,
            y: 0,
            filter: MOTION_TOKENS.blur.none,
            duration: MOTION_TOKENS.duration.cinematic,
            stagger: MOTION_TOKENS.stagger.cinematic, // Lệch nhau giữa 3 cột
            ease: MOTION_TOKENS.ease.cinematic,
            clearProps: "filter",
            scrollTrigger: {
              trigger: container,
              start: MOTION_TOKENS.scrollTrigger.start,
              toggleActions: MOTION_TOKENS.scrollTrigger.toggleActions,
              once: false,
            },
          },
        );
      }

      // 2. Hiệu ứng ảnh dịu dàng ổn định vị trí (zoom nhẹ khi xuất hiện)
      const images = container.querySelectorAll(".service-col-img");
      if (images.length > 0) {
        gsap.fromTo(
          images,
          { scale: 1.08 },
          {
            scale: 1,
            duration: MOTION_TOKENS.duration.slow,
            stagger: MOTION_TOKENS.stagger.cinematic,
            ease: MOTION_TOKENS.ease.smooth,
            scrollTrigger: {
              trigger: container,
              start: MOTION_TOKENS.scrollTrigger.start,
              toggleActions: MOTION_TOKENS.scrollTrigger.toggleActions,
              once: false,
            },
          },
        );
      }

      // 3. Đường kẻ ngang vẽ dần từ trái sang phải nhịp nhàng khi xuất hiện
      const lines = container.querySelectorAll(".service-line-draw");
      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          {
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            duration: MOTION_TOKENS.duration.normal,
            stagger: MOTION_TOKENS.stagger.fast,
            ease: MOTION_TOKENS.ease.smooth,
            scrollTrigger: {
              trigger: container,
              start: MOTION_TOKENS.scrollTrigger.start,
              toggleActions: MOTION_TOKENS.scrollTrigger.toggleActions,
              once: false,
            },
          },
        );
      }
    }, container);

    // Refresh ScrollTrigger sau khi render DOM hoàn tất để tính toán tọa độ chuẩn xác
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="mt-14 border-y border-border/80 lg:mt-20"
    >
      {/* ========================================================================= */}
      {/* BỐ CỤC 3 CỘT KIỂU TẠP CHÍ ĐỒNG BỘ TUYỆT ĐỐI (CSS SUBGRID + SYNCHRONIZED ROWS) */}
      {/* Không bị lệch hàng: Mọi đường kẻ ngang chạy thẳng hàng 100% qua cả 3 cột   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 divide-y divide-border/80 md:grid-cols-3 md:divide-y-0 md:divide-x md:grid-rows-[auto_auto_repeat(3,minmax(84px,auto))]">
        {columns.map((col, colIdx) => (
          <article
            key={col.id}
            ref={(el) => {
              colRefs.current[colIdx] = el;
            }}
            className={cn(
              "group relative flex flex-col py-10 transition-colors duration-300 md:py-12",
              // Hỗ trợ Subgrid cho trình duyệt hiện đại: 5 hàng (Ảnh, Tiêu đề, Dòng 1, Dòng 2, Dòng 3)
              "md:grid md:grid-rows-subgrid md:row-span-5",
              // Canh lề 3 cột ngăn bằng vạch dọc mảnh 1px
              colIdx === 0 && "md:pr-8 lg:pr-12 md:pl-0",
              colIdx === 1 && "md:px-8 lg:px-12",
              colIdx === 2 && "md:pl-8 lg:pl-12 md:pr-0",
            )}
          >
            {/* HÀNG 1: ẢNH DỌC 4:5 (Vuông góc bo 0, phủ Duotone tím nhẹ kiểu điện ảnh) */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-slate-950 shadow-xs">
              <Image
                src={col.image}
                alt={col.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="service-col-img object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                priority={colIdx === 0}
              />
              {/* Lớp phủ Duotone tím nhẹ VSICO giúp cả 3 ảnh đồng bộ như một bộ sưu tập */}
              <div
                className="pointer-events-none absolute inset-0 bg-[#301142]/25 mix-blend-multiply transition-opacity duration-500 group-hover:bg-[#301142]/15"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"
                aria-hidden="true"
              />
            </div>

            {/* HÀNG 2: SỐ THỨ TỰ & TIÊU ĐỀ NHÓM DỊCH VỤ (Đồng bộ chiều cao để vạch kẻ ngang dưới thẳng hàng) */}
            <div className="mt-8 flex flex-col justify-end min-h-[5.5rem] lg:min-h-[6.25rem] pb-5">
              <span className="font-body text-xs font-bold tracking-[0.24em] text-primary uppercase">
                {col.num}
              </span>
              <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink sm:text-[1.65rem] leading-snug whitespace-pre-line">
                {col.title}
              </h3>
            </div>

            {/* HÀNG 3, 4, 5: TỪNG DÒNG DỊCH VỤ (Mỗi dòng có chiều cao và vị trí vạch kẻ ngang khớp 100%) */}
            {col.items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className={cn(
                  "group/item relative flex flex-col justify-center py-4 transition-colors duration-200",
                  // Chiều cao chuẩn xác để tất cả các vạch kẻ ngang nối dài thẳng tắp
                  "min-h-[84px] md:min-h-[88px]",
                  // Đường kẻ trên cho dòng đầu tiên (đường phân cách ngay dưới tiêu đề)
                  itemIdx === 0 && "border-t border-border/80",
                  // Đường kẻ dưới cho từng dòng
                  "border-b border-border/80",
                )}
              >
                {/* Đường kẻ ngang vẽ dần từ trái sang phải khi section xuất hiện */}
                <div
                  className="service-line-draw pointer-events-none absolute -bottom-[1px] left-0 h-[1px] w-full origin-left bg-border/80"
                  aria-hidden="true"
                />

                {/* Đường kẻ dưới chuyển tím đậm 2px khi rê chuột vào dòng */}
                <div
                  className="pointer-events-none absolute -bottom-[1px] left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover/item:scale-x-100 motion-reduce:transform-none"
                  aria-hidden="true"
                />

                {/* Nội dung dòng dịch vụ: Chữ chuyển tím khi hover, nền ô không đổi */}
                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                    <span className="font-body text-sm font-semibold leading-relaxed text-ink transition-colors duration-200 group-hover/item:text-primary sm:text-base">
                      {item.text}
                    </span>

                    {/* Tag MIỄN PHÍ nổi bật nếu có */}
                    {item.tag && (
                      <span className="inline-block font-body text-[11px] font-extrabold tracking-wider text-primary uppercase">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}
