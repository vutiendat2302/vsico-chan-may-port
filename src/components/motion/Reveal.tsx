"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  blur?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 35,
  duration = 0.9,
  blur = true,
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
          filter: blur ? "blur(12px)" : "blur(0px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          delay,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, prefersReducedMotion, y, blur]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
