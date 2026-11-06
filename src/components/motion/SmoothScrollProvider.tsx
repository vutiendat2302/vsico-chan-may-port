"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();

    if (prefersReducedMotion) {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      return;
    }

    // Đảm bảo luôn quay về đầu trang khi mở hoặc tải lại trang
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.5,
      prevent: (node) => {
        // Không cuộn trang khi chuột đang ở trong khu vực bản đồ
        return (
          node instanceof HTMLElement &&
          (Boolean(node.closest("[data-lenis-prevent]")) ||
            Boolean(node.closest(".maplibregl-canvas-container")) ||
            Boolean(node.closest(".maplibregl-map")))
        );
      },
    });

    lenis.scrollTo(0, { immediate: true });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
