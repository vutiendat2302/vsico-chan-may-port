"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export type FlowStepDisplay = {
  id: string;
  stepNumber: string;
  label: string;
  sublabel: string;
};

type LogisticsFlowProps = {
  title: string;
  subtitle: string;
  steps: FlowStepDisplay[];
};

export function LogisticsFlow({ title, subtitle, steps }: LogisticsFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    const container = containerRef.current;
    if (!container || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = container.querySelectorAll("[data-flow-step]");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.96, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            toggleActions: "restart none none reset",
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="mt-14 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-10"
    >
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h3 className="font-heading text-2xl font-bold text-ink">{title}</h3>
          <p className="mt-1 font-body text-sm text-muted">{subtitle}</p>
        </div>
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7">
        {steps.map((step, index) => {
          const isHighlight = step.id === "icd-lao-bao" || step.id === "chan-may-port";
          return (
            <li
              key={step.id}
              data-flow-step
              className="relative flex items-center gap-3 lg:block"
            >
              <div
                className={cn(
                  "flex h-full w-full flex-col justify-between rounded-2xl border p-4 transition-colors",
                  isHighlight
                    ? "border-primary bg-primary text-white shadow-md"
                    : "border-border bg-surface-subtle text-ink",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-label text-[11px] font-bold tracking-widest uppercase",
                      isHighlight ? "text-highlight-light" : "text-primary",
                    )}
                  >
                    {step.stepNumber}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight
                      aria-hidden="true"
                      className={cn(
                        "hidden h-3.5 w-3.5 lg:inline-block",
                        isHighlight ? "text-white/75" : "text-muted",
                      )}
                    />
                  )}
                </div>

                <div className="mt-3">
                  <p className="font-body text-sm leading-snug font-bold">{step.label}</p>
                  <p
                    className={cn(
                      "mt-1 font-body text-xs",
                      isHighlight ? "text-white/80" : "text-muted",
                    )}
                  >
                    {step.sublabel}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
