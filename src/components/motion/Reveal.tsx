"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_TOKENS } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  blur?: boolean;
  toggleActions?: string;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = MOTION_TOKENS.distance.md,
  x = 0,
  scale = 1,
  duration = MOTION_TOKENS.duration.cinematic,
  blur = true,
  toggleActions = MOTION_TOKENS.scrollTrigger.toggleActions,
  once = MOTION_TOKENS.scrollTrigger.once,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    const el = ref.current;
    if (!el || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y,
          x,
          scale,
          filter: blur ? MOTION_TOKENS.blur.md : MOTION_TOKENS.blur.none,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: MOTION_TOKENS.blur.none,
          duration,
          delay,
          ease: MOTION_TOKENS.ease.cinematic,
          clearProps: "filter,willChange",
          scrollTrigger: {
            trigger: el,
            start: MOTION_TOKENS.scrollTrigger.start,
            toggleActions,
            once,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, prefersReducedMotion, y, x, scale, blur, toggleActions, once]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
