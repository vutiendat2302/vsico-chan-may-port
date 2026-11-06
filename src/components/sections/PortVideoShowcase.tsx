"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type PortVideoShowcaseProps = {
  videoPlayAria: string;
  videoPauseAria: string;
  videoMuteAria: string;
  videoUnmuteAria: string;
};

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function PortVideoShowcase({
  videoPlayAria,
  videoPauseAria,
  videoMuteAria,
  videoUnmuteAria,
}: PortVideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(10.02);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const prefersReducedMotion = useReducedMotion();

  // Bật / tạm dừng phát video
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // Bật / tắt âm thanh
  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // Toàn màn hình
  const toggleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  // Lắng nghe thay đổi trạng thái toàn màn hình
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Tua video theo vị trí chuột (Seek)
  const seekToPosition = useCallback(
    (clientX: number) => {
      const track = progressTrackRef.current;
      const video = videoRef.current;
      if (!track || !video || !duration) return;

      const rect = track.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      const targetTime = ratio * duration;

      video.currentTime = targetTime;
      setCurrentTime(targetTime);
    },
    [duration],
  );

  const handleTrackMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsScrubbing(true);
    seekToPosition(e.clientX);
  };

  useEffect(() => {
    if (!isScrubbing) return;

    const handleMouseMove = (e: MouseEvent) => {
      seekToPosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsScrubbing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isScrubbing, seekToPosition]);

  // Quản lý hiển thị thanh điều khiển khi rê chuột
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    if (isPlaying) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
    }
  }, [isPlaying]);

  // Cập nhật thời gian thực của video
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && !isScrubbing) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setDuration(video.duration);
    }
  };

  // Hoạt ảnh GSAP: Hiệu ứng xuất hiện + Thu lại theo chiều cuộn (KHÔNG LỘ VIỀN ĐEN)
  useEffect(() => {
    ensureGsapRegistered();

    const container = containerRef.current;
    const video = videoRef.current;
    const button = buttonRef.current;

    if (!container || !video) return;

    if (prefersReducedMotion) {
      gsap.set(container, { opacity: 1 });
      gsap.set(video, { scale: 1, yPercent: 0 });
      if (button) gsap.set(button, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Nút play xuất hiện mượt mà khi cuộn tới
      if (button) {
        gsap.fromTo(
          button,
          {
            opacity: 0,
            scale: 0.7,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // 2. Hiệu ứng hơi thu lại theo chiều cuộn:
      // Video bắt đầu ở trạng thái hơi phóng to (scale: 1.15) và mượt mà thu về kích thước chuẩn (scale: 1.0)
      // Vì scale tối thiểu vẫn là 1.0 (phủ 100% màn hình), TUYỆT ĐỐI KHÔNG BAO GIỜ BỊ VIỀN ĐEN!
      // Khi cuộn ngược lên: Video tự động mở rộng trở lại scale 1.15.
      gsap.fromTo(
        video,
        {
          scale: 1.15,
          yPercent: -5,
        },
        {
          scale: 1.0,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onClick={togglePlay}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative mt-16 sm:mt-24 w-full overflow-hidden bg-black cursor-pointer",
        "h-screen min-h-[100svh]",
      )}
    >
      {/* Thẻ Video full 100% kích thước trang, object-cover phủ tràn mọi góc */}
      <video
        ref={videoRef}
        src="/videos/thong_tin_cang.mp4"
        poster="/images/port/thong-tin-cang-poster.webp"
        playsInline
        loop
        muted={isMuted}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />

      {/* Lớp phủ điện ảnh nhẹ làm nổi bật các phím điều khiển */}
      <div
        className={cn(
          "absolute inset-0 bg-black/20 transition-opacity duration-300 pointer-events-none",
          isPlaying ? "group-hover:bg-black/30" : "bg-black/25",
        )}
      />

      {/* Nút Play trung tâm hình chữ nhật trắng sắc nét theo đúng thiết kế ảnh 1 */}
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        aria-label={isPlaying ? videoPauseAria : videoPlayAria}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
          "flex items-center justify-center",
          "w-20 h-13 sm:w-24 sm:h-16 bg-white text-ink shadow-[0_12px_36px_rgba(0,0,0,0.5)]",
          "transition-all duration-300 hover:scale-105 active:scale-95",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
          isPlaying
            ? "opacity-0 group-hover:opacity-100 pointer-events-auto"
            : "opacity-100",
        )}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6 sm:h-7 sm:w-7 fill-ink text-ink" aria-hidden="true" />
        ) : (
          <Play className="h-6 w-6 sm:h-7 sm:w-7 fill-ink text-ink ml-1" aria-hidden="true" />
        )}
      </button>

      {/* THANH THỜI GIAN & ĐIỀU KHIỂN Ở DƯỚI CÙNG (DOCK VÀO ĐÁY VIDEO) */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end",
          "bg-gradient-to-t from-black/85 via-black/45 to-transparent",
          "px-5 pb-5 pt-12 sm:px-8 sm:pb-7 lg:px-12",
          "transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* THANH TIẾN TRÌNH THỜI GIAN (PROGRESS BAR / SCRUBBER) */}
        <div
          ref={progressTrackRef}
          onMouseDown={handleTrackMouseDown}
          role="slider"
          aria-label="Thanh thời gian video"
          aria-valuemin={0}
          aria-valuemax={duration || 10}
          aria-valuenow={currentTime}
          tabIndex={0}
          className="group/track relative flex h-5 w-full cursor-pointer items-center"
        >
          {/* Đường ray nền */}
          <div className="relative h-1.5 w-full rounded-full bg-white/30 backdrop-blur-sm transition-all group-hover/track:h-2.5">
            {/* Vệt thời gian đã phát */}
            <div
              className="relative h-full rounded-full bg-white transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Đầu kéo tròn (Thumb) */}
              <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-md scale-0 transition-transform group-hover/track:scale-100" />
            </div>
          </div>
        </div>

        {/* DÒNG NÚT ĐIỀU KHIỂN & HIỂN THỊ THỜI GIAN */}
        <div className="mt-2 flex items-center justify-between font-body text-xs sm:text-sm text-white">
          {/* Nút Play/Pause nhỏ + Thời gian hiện tại / Tổng thời gian */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? videoPauseAria : videoPlayAria}
              className="flex h-8 w-8 items-center justify-center text-white/90 hover:text-white transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4 fill-current ml-0.5" aria-hidden="true" />
              )}
            </button>

            <span className="font-mono text-xs font-semibold tabular-nums text-white/90 tracking-wider select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Các nút bên phải: Bật/Tắt âm thanh + Toàn màn hình */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? videoUnmuteAria : videoMuteAria}
              className="flex h-8 w-8 items-center justify-center text-white/90 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Volume2 className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Toàn màn hình"
              className="flex h-8 w-8 items-center justify-center text-white/90 hover:text-white transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Maximize className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
