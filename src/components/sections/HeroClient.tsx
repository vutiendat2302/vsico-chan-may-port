"use client";

import { useEffect, useRef } from "react";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isReturningNavigation } from "@/lib/navigationState";

type HeroClientProps = {
  brandTitle: string;
  locationSub: string;
  headline: string;
  tagline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  scrollHintText: string;
};

export function HeroClient({
  brandTitle,
  locationSub,
  headline,
  tagline,
  primaryCtaText,
  secondaryCtaText,
  scrollHintText,
}: HeroClientProps) {
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const brandTitleRef = useRef<HTMLHeadingElement>(null);
  const locationSubRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();

    const isAlreadyPreloaded =
      typeof window !== "undefined" &&
      (isReturningNavigation() ||
        Boolean(
          (window as unknown as { __VSICO_PRELOADER_LIFTED__?: boolean })
            .__VSICO_PRELOADER_LIFTED__,
        ));

    if (prefersReducedMotion || isAlreadyPreloaded) {
      if (brandTitleRef.current) brandTitleRef.current.style.opacity = "1";
      if (locationSubRef.current) locationSubRef.current.style.opacity = "0.6";
      if (headlineRef.current) headlineRef.current.style.opacity = "1";
      if (taglineRef.current) taglineRef.current.style.opacity = "0.7";
      if (ctaGroupRef.current) ctaGroupRef.current.style.opacity = "1";
      if (scrollHintRef.current) scrollHintRef.current.style.opacity = "1";

      if (contentWrapperRef.current) {
        gsap.to(contentWrapperRef.current, {
          y: -100,
          scale: 0.94,
          opacity: 0,
          filter: "blur(8px)",
          ease: "none",
          scrollTrigger: {
            trigger: contentWrapperRef.current,
            start: "center center",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
      return;
    }

    const titleEl = brandTitleRef.current;
    const subEl = locationSubRef.current;
    const headEl = headlineRef.current;
    const tagEl = taglineRef.current;
    const ctaEl = ctaGroupRef.current;
    const scrollEl = scrollHintRef.current;
    const wrapper = contentWrapperRef.current;

    // Thiết lập trạng thái ẩn mạnh mẽ ban đầu
    gsap.set(titleEl, { y: 110, scale: 0.86, opacity: 0, filter: "blur(24px)" });
    gsap.set(subEl, { y: 60, opacity: 0, filter: "blur(12px)" });
    gsap.set(headEl, { y: 80, opacity: 0, filter: "blur(16px)" });
    gsap.set(tagEl, { y: 60, opacity: 0, filter: "blur(12px)" });
    gsap.set(ctaEl, { y: 50, scale: 0.8, opacity: 0 });
    gsap.set(scrollEl, { y: 30, opacity: 0 });

    let hasExecuted = false;

    const runCinematicReveal = () => {
      if (hasExecuted) return;
      hasExecuted = true;

      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

      // 1. Tên thương hiệu CẢNG VSICO HUẾ vươn lên mạnh mẽ, phá tan độ nhòe
      tl.to(
        titleEl,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.45,
          ease: "power4.out",
        },
        0,
      );

      // 3. Thông điệp chính Cửa ngõ ra biển trượt lên ấn tượng
      tl.to(
        headEl,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.35,
          ease: "power3.out",
        },
        0.28,
      );

      // 4. Định vị Cảng nước sâu & Trung tâm logistics
      tl.to(
        tagEl,
        {
          y: 0,
          opacity: 0.7,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
        0.42,
      );

      // 5. Cặp nút CTA phóng to bung tỏa với độ nảy xúc giác
      tl.to(
        ctaEl,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "back.out(1.7)",
        },
        0.58,
      );

      // 6. Nút cuộn khám phá
      tl.to(
        scrollEl,
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
        },
        0.75,
      );
    };

    // Đồng bộ kích hoạt hiệu ứng chữ Hero khi Preloader trượt lên
    window.addEventListener("vsico:preloader-lift", runCinematicReveal, { once: true });

    // Fallback an toàn sau 1200ms nếu vì lý do nào đó sự kiện chưa bắt được
    const safetyTimer = window.setTimeout(runCinematicReveal, 1200);

    // Hiệu ứng "thu đóng giữa các lớp" cinematic khi cuộn xuống
    if (wrapper) {
      gsap.to(wrapper, {
        y: -100,
        scale: 0.94,
        opacity: 0,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "center center",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    return () => {
      window.removeEventListener("vsico:preloader-lift", runCinematicReveal);
      window.clearTimeout(safetyTimer);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-between">
      {/* Khối nội dung trung tâm: Căn giữa tuyệt đối với hiệu ứng parallax thu đóng */}
      <div
        ref={contentWrapperRef}
        className="container my-auto flex flex-col items-center justify-center py-12 text-center will-change-transform sm:py-16"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Dòng 1: CẢNG VSICO HUẾ - Display · trắng 100% */}
          <h1
            ref={brandTitleRef}
            id="hero-heading"
            className="font-heading text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)] will-change-transform sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {brandTitle}
          </h1>

          {/* Dòng 2: CHÂN MÂY – LĂNG CÔ, TP. HUẾ - Label · trắng 60%, giãn chữ rộng */}
          <p
            ref={locationSubRef}
            className="mt-3.5 font-label text-xs font-bold tracking-[0.28em] text-white/60 uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] will-change-transform sm:mt-4 sm:text-sm md:text-base md:tracking-[0.34em]"
          >
            {locationSub}
          </p>

          {/* Dòng 3: Cửa ngõ ra biển của Hành lang Đông – Tây - Body · trắng 100%, độ đậm 500 */}
          <p
            ref={headlineRef}
            className="mt-8 font-body text-xl font-medium tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)] will-change-transform sm:mt-10 sm:text-2xl md:text-3xl lg:text-4xl"
          >
            {headline}
          </p>

          {/* Dòng 4: Cảng biển nước sâu & Trung tâm logistics tích hợp - Body · trắng 70%, độ đậm 400 */}
          <p
            ref={taglineRef}
            className="mt-2.5 font-body text-sm font-normal text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] will-change-transform sm:mt-3 sm:text-base md:text-lg lg:text-xl"
          >
            {tagline}
          </p>

          {/* Hàng nút CTA: Nút tím đặc [ KHÁM PHÁ CẢNG ↘ ] & Nút viền mờ [ ✦ NHẬN CHÍNH SÁCH ƯU ĐÃI ] */}
          <div
            ref={ctaGroupRef}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 will-change-transform sm:mt-11 sm:gap-5"
          >
            {/* Nút tím đặc: Khám phá cảng ↘ */}
            <a
              href="#berth-specs"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 font-label text-xs font-bold tracking-[0.2em] text-white uppercase shadow-[0_12px_32px_-6px_rgba(62,17,108,0.75)] transition-all hover:scale-[1.03] hover:bg-primary-light hover:shadow-[0_16px_40px_-6px_rgba(84,25,145,0.95)] focus-visible:outline-white"
            >
              <span>{primaryCtaText}</span>
              <ArrowDownRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>

            {/* Nút viền mờ: Nhận chính sách ưu đãi ✦ (liên kết tới phần liên hệ) */}
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/35 bg-white/10 px-8 py-4 font-label text-xs font-bold tracking-[0.2em] text-amber-600 uppercase shadow-lg backdrop-blur-md transition-all hover:scale-[1.03] hover:border-highlight-light hover:bg-white/80 hover:text-highlight-light focus-visible:outline-white"
            >
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 text-highlight-light transition-transform group-hover:scale-110"
              />
              <span>{secondaryCtaText}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Chỉ báo cuộn phong cách điện ảnh (Cinematic Scroll Indicator) */}
      <div
        ref={scrollHintRef}
        className="pb-8 text-center will-change-transform select-none"
      >
        <a
          href="#berth-specs"
          className="group inline-flex flex-col items-center gap-2 transition-colors"
          aria-label={scrollHintText}
        >
          <span className="font-label text-[10px] font-bold tracking-[0.24em] text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {scrollHintText}
          </span>
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/80 bg-black/30 p-1 shadow-md backdrop-blur-sm transition-colors group-hover:border-highlight-light">
            <span className="h-1.5 w-1 animate-bounce rounded-full bg-highlight-light" />
          </span>
        </a>
      </div>
    </div>
  );
}
