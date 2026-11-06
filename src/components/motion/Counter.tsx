"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formatNumber, type SupportedLocale } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  secondaryValue?: number;
  locale: SupportedLocale;
  prefix?: string;
  suffix?: string;
  secondarySuffix?: string;
  decimals?: number;
  padZero?: boolean;
  duration?: number;
  className?: string;
  toggleActions?: string;
};

function formatSingleValue(
  val: number,
  locale: SupportedLocale,
  decimals = 0,
  padZero = false,
): string {
  const rounded = decimals > 0 ? Number(val.toFixed(decimals)) : Math.round(val);
  if (padZero && Math.abs(rounded) < 10 && decimals === 0) {
    const sign = rounded < 0 ? "-" : "";
    return `${sign}0${Math.abs(rounded)}`;
  }
  return formatNumber(rounded, locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function Counter({
  value,
  secondaryValue,
  locale,
  prefix = "",
  suffix = "",
  secondarySuffix = "",
  decimals = 0,
  padZero = false,
  duration = 0.65,
  className,
  toggleActions = "restart none none reset",
}: CounterProps) {
  const primaryRef = useRef<HTMLSpanElement>(null);
  const secondaryRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const finalPrimaryText = `${prefix}${formatSingleValue(
    value,
    locale,
    decimals,
    padZero,
  )}${suffix}`;

  const finalSecondaryText =
    secondaryValue !== undefined
      ? `${formatSingleValue(secondaryValue, locale, 0, false)}${secondarySuffix}`
      : null;

  const fullAriaLabel = finalSecondaryText
    ? `${finalPrimaryText} / ${finalSecondaryText}`
    : finalPrimaryText;

  useEffect(() => {
    ensureGsapRegistered();
    const containerEl = containerRef.current;
    const primaryEl = primaryRef.current;

    if (!containerEl || !primaryEl || prefersReducedMotion) {
      return;
    }

    const state = { primary: 0, secondary: 0 };

    const ctx = gsap.context(() => {
      gsap.to(state, {
        primary: value,
        secondary: secondaryValue ?? 0,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerEl,
          start: "top 95%",
          toggleActions,
        },
        onUpdate: () => {
          if (primaryRef.current) {
            primaryRef.current.textContent = `${prefix}${formatSingleValue(
              state.primary,
              locale,
              decimals,
              padZero,
            )}${suffix}`;
          }
          if (secondaryRef.current && secondaryValue !== undefined) {
            secondaryRef.current.textContent = `${formatSingleValue(
              state.secondary,
              locale,
              0,
              false,
            )}${secondarySuffix}`;
          }
        },
      });
    }, containerEl);

    return () => ctx.revert();
  }, [
    decimals,
    duration,
    locale,
    padZero,
    prefersReducedMotion,
    prefix,
    secondarySuffix,
    secondaryValue,
    suffix,
    toggleActions,
    value,
  ]);

  return (
    <span
      ref={containerRef}
      aria-label={fullAriaLabel}
      className={cn("tabular-nums", className)}
      suppressHydrationWarning
    >
      <span ref={primaryRef} aria-hidden="true" suppressHydrationWarning>
        {finalPrimaryText}
      </span>
      {finalSecondaryText !== null && (
        <>
          <span aria-hidden="true" className="mx-1.5 text-white/40">
            /
          </span>
          <span ref={secondaryRef} aria-hidden="true" suppressHydrationWarning>
            {finalSecondaryText}
          </span>
        </>
      )}
    </span>
  );
}
