"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isReturningNavigation, markAppInitialized } from "@/lib/navigationState";

type PreloaderProps = {
  brandSubtitle?: string;
};

export function Preloader({ brandSubtitle }: PreloaderProps) {
  const locale = useLocale();
  const displaySubtitle =
    brandSubtitle ?? (locale === "en" ? "CHAN MAY · HUE" : "CHÂN MÂY · HUẾ");

  const reducedMotion = useReducedMotion();
  const isReturning = isReturningNavigation();

  const [isSliding, setIsSliding] = useState(false);
  const [isDone, setIsDone] = useState(isReturning);

  const markDoneAndLift = useCallback(() => {
    if (typeof window !== "undefined") {
      markAppInitialized();
      (
        window as unknown as { __VSICO_PRELOADER_LIFTED__?: boolean }
      ).__VSICO_PRELOADER_LIFTED__ = true;
      window.dispatchEvent(new CustomEvent("vsico:preloader-lift"));
    }
  }, []);

  const finishEarly = useCallback(() => {
    setIsSliding(true);
    markDoneAndLift();
    const timer = window.setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = "";
    }, 450);
    return () => window.clearTimeout(timer);
  }, [markDoneAndLift]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Nếu là quay lại trang chủ (chuyển trang nội bộ) hoặc bật giảm chuyển động: Bỏ qua preloader
    if (isReturning || reducedMotion) {
      setIsDone(true);
      markDoneAndLift();
      document.body.style.overflow = "";
      return;
    }

    // Đảm bảo luôn cuộn về đầu trang ngay khi load trang chủ
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    (
      window as unknown as { __VSICO_PRELOADER_LIFTED__?: boolean }
    ).__VSICO_PRELOADER_LIFTED__ = false;

    // Khóa cuộn trang khi loader đang chạy
    document.body.style.overflow = "hidden";

    // Giai đoạn 1: Giữ logo hiện rõ trong 600ms rồi kéo rèm tím lên
    const slideTimer = window.setTimeout(() => {
      setIsSliding(true);
      markDoneAndLift();

      // Nếu URL có hash (#...), cuộn mượt đến mục đó khi Preloader nhấc lên
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 600);

    // Giai đoạn 2: Sau khi màn tím trượt lên hoàn tất -> mở khóa và hoàn tất (khoảng 1.1s)
    const doneTimer = window.setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = "";
      markAppInitialized();
    }, 1100);

    // Cho phép click hoặc bấm phím để bỏ qua ngay
    const handleKeyDown = () => finishEarly();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(slideTimer);
      window.clearTimeout(doneTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isReturning, reducedMotion, finishEarly, markDoneAndLift]);

  // Chỉ unmount khi animation trượt lên hoàn thành (isDone = true) hoặc khi quay lại trang
  if (isDone) {
    return null;
  }

  return (
    <aside
      id="vsico-preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading VSICO Hue Port"
      suppressHydrationWarning
      onClick={finishEarly}
      className={`fixed inset-0 z-[100] flex min-h-dvh w-screen cursor-pointer flex-col items-center justify-center bg-[#3E116C] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isSliding ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Hiệu ứng ánh sáng tím hoàng gia sâu lắng #3E116C */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(84,25,145,0.45)_0%,#3E116C_55%,#260844_100%)]"
      />

      {/* Khối căn giữa màn hình tuyệt đối */}
      <div className="relative z-10 mx-auto flex flex-col items-center justify-center px-6 text-center select-none">
        {/* Logo VSICO kích thước lớn, viewBox mở rộng 340px chống cắt cụt 2 đầu slogan */}
        <div className="relative flex animate-[fadeIn_0.5s_ease-out_forwards] justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 340 76"
            fill="none"
            overflow="visible"
            aria-label="VSICO Hue Port"
            className="h-20 w-auto max-w-[92vw] drop-shadow-[0_0_35px_rgba(255,255,255,0.3)] transition-all sm:h-28 md:h-36 lg:h-44"
          >
            {/* Cụm chữ cái VSICO được dịch chuyển để căn giữa chính xác tại trục X = 170 */}
            <g fill="#FFFFFF" transform="translate(69, 2)">
              <path d="M8 10L26 42L44 10H34.5L26 26.5L17.5 10H8Z" />
              <path d="M48 10H86V17.5H57.5V22.5H84V42H48V34.5H74.5V29.5H48V10Z" />
              <path d="M92 10H101.5V42H92V10Z" />
              <path d="M108 10H146V18H117.5V34H146V42H108V10Z" />
              <path d="M152 10H194V42H152V10ZM161.5 18V34H184.5V18H161.5Z" />
            </g>

            {/* Dòng chữ slogan căn giữa tại X = 170 với không gian rộng rãi 340px, không lo bị cắt cụt */}
            <text
              x="170"
              y="64"
              textAnchor="middle"
              fill="#E2E8F0"
              fontFamily="Montserrat, sans-serif"
              fontSize="12"
              fontWeight="600"
              letterSpacing="1.6"
            >
              LINK TOGETHER · SUCCEED TOGETHER
            </text>
          </svg>
        </div>

        {/* Phụ đề thương hiệu & Tuyên ngôn */}
        <div className="mt-7 flex items-center gap-3">
          <span className="h-px w-12 bg-highlight-light/40" />
          <span className="font-label text-base font-bold tracking-[0.3em] text-highlight-light uppercase sm:text-lg">
            {displaySubtitle}
          </span>
          <span className="h-px w-12 bg-highlight-light/40" />
        </div>

        {/* Vạch tiến trình thanh mảnh màu vàng hổ phách */}
        <div className="mt-8 h-[2.5px] w-48 overflow-hidden rounded-full bg-white/15 sm:w-64">
          <div className="h-full w-full origin-left animate-[progressBar_0.8s_ease-in-out_forwards] bg-gradient-to-r from-highlight-light via-white to-highlight-light" />
        </div>
      </div>
    </aside>
  );
}
