"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroBackgroundProps = {
  videoAlt: string;
};

export function HeroBackground({ videoAlt }: HeroBackgroundProps) {
  const mediaWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    const wrapper = mediaWrapperRef.current;
    const video = videoRef.current;

    if (prefersReducedMotion) {
      if (video) {
        video.pause();
      }
      return;
    }

    let cleanupListeners: (() => void) | undefined;

    if (video) {
      // Đảm bảo các thuộc tính phát lặp vô hạn ở tầng DOM (tránh browser chặn loop)
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;

      const playVideo = () => {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay retry với trạng thái muted cưỡng chế
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      };

      playVideo();

      // Sự kiện ended: Phát lại ngay từ đầu (loop tuyệt đối không gián đoạn)
      const handleEnded = () => {
        video.currentTime = 0;
        playVideo();
      };

      // Sự kiện pause: Nếu video vô tình bị tạm dừng mà trang vẫn hiển thị, tiếp tục phát
      const handlePause = () => {
        if (!document.hidden && !prefersReducedMotion) {
          playVideo();
        }
      };

      const handleVisibilityChange = () => {
        if (!document.hidden && !prefersReducedMotion) {
          playVideo();
        }
      };

      video.addEventListener("ended", handleEnded);
      video.addEventListener("pause", handlePause);
      document.addEventListener("visibilitychange", handleVisibilityChange);

      cleanupListeners = () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("pause", handlePause);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    if (!wrapper) {
      return;
    }

    const ctx = gsap.context(() => {
      const runZoom = () => {
        gsap.fromTo(
          wrapper,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 2.2,
            ease: "power2.out",
          },
        );
      };

      runZoom();
      window.addEventListener("vsico:preloader-lift", runZoom);

      gsap.to(wrapper, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, wrapper);

    return () => {
      ctx.revert();
      if (cleanupListeners) {
        cleanupListeners();
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-black"
    >
      <div ref={mediaWrapperRef} className="relative h-full w-full will-change-transform">
        <Image
          src="/videos/hero/hero-poster.webp"
          alt={videoAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/hero/hero-poster.webp"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
          >
            <source src="/videos/hero/cang_chan_may_hue.webm" type="video/webm" />
            <source src="/videos/hero/cang_chan_may_hue.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Lớp phủ video chỉ 10% theo yêu cầu - Video hiển thị 90% siêu rõ nét */}
      <div className="absolute inset-0 bg-black/10" />
      {/* Vệt chuyển tiếp nhẹ ở đỉnh bảo vệ header */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
      {/* Vệt gradient mượt mà dốc sâu kết nối video Hero vào Section I nền trắng tinh khôi */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 sm:h-80"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 35%, rgba(255, 255, 255, 0.7) 70%, #ffffff 92%, #ffffff 100%)",
        }}
      />
    </div>
  );
}
