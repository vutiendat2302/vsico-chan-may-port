"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { formatMonthYear, type SupportedLocale } from "@/lib/formatters";

type CountdownProps = {
  targetIso: string;
  locale: SupportedLocale;
  labels: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
};

function padTwo(val: number): string {
  return val < 10 ? `0${val}` : String(val);
}

export function Countdown({ targetIso, locale, labels }: CountdownProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetIso);
  const formattedTargetMonthYear = formatMonthYear(targetIso, locale);

  const items = [
    { label: labels.days, value: String(days) },
    { label: labels.hours, value: padTwo(hours) },
    { label: labels.minutes, value: padTwo(minutes) },
    { label: labels.seconds, value: padTwo(seconds) },
  ];

  return (
    <div
      role="timer"
      aria-label={`${formattedTargetMonthYear}: ${days} ${labels.days}, ${hours} ${labels.hours}, ${minutes} ${labels.minutes}, ${seconds} ${labels.seconds}`}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
    >
      {items.map((item) => (
        <div
          key={item.label}
          aria-hidden="true"
          className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-4 backdrop-blur-md"
        >
          <span className="font-label text-3xl font-bold tracking-tight text-highlight-light tabular-nums sm:text-4xl">
            {item.value}
          </span>
          <span className="mt-1.5 font-label text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
