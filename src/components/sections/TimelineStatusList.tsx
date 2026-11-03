"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TimelineDisplayItem = {
  id: string;
  roman: "I" | "II" | "III";
  isoDate: string;
  monthYearText: string;
  title: string;
  description: string;
};

type TimelineStatusListProps = {
  items: TimelineDisplayItem[];
  statusOperatingLabel: string;
  statusUpcomingLabel: string;
  monthOnlyNote: string;
};

export function TimelineStatusList({
  items,
  statusOperatingLabel,
  statusUpcomingLabel,
  monthOnlyNote,
}: TimelineStatusListProps) {
  const [nowMs, setNowMs] = useState<number>(() =>
    new Date("2026-11-03T00:00:00Z").getTime(),
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setNowMs(Date.now());
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div>
      <ol className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {items.map((item) => {
          const isOperating = nowMs >= new Date(item.isoDate).getTime();
          return (
            <li
              key={item.id}
              className={cn(
                "flex flex-col justify-between rounded-3xl border p-6 transition-all sm:p-7",
                isOperating
                  ? "border-primary-light bg-primary/25 text-white shadow-lg"
                  : "border-white/15 bg-white/[0.04] text-white",
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-label text-3xl font-bold text-highlight-light">
                    {item.roman}.
                  </span>

                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-label text-[10px] font-bold tracking-widest uppercase",
                      isOperating
                        ? "border-primary-light bg-primary text-white"
                        : "border-white/30 bg-transparent text-white/80",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        isOperating
                          ? "bg-highlight-light shadow-[0_0_10px_rgba(245,158,11,0.9)]"
                          : "border-2 border-white/75 bg-transparent",
                      )}
                    />
                    {isOperating ? statusOperatingLabel : statusUpcomingLabel}
                  </span>
                </div>

                <p className="mt-4 font-label text-xs font-bold tracking-[0.2em] text-highlight-light uppercase">
                  {item.monthYearText}
                </p>

                <h4 className="mt-2 font-heading text-xl font-bold text-white">
                  {item.title}
                </h4>

                <p className="mt-2 font-body text-sm leading-relaxed text-white/75">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-4 font-body text-xs text-white/55">{monthOnlyNote}</p>
    </div>
  );
}
