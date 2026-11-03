"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import type { AnnualPerformance } from "@/data/company";
import { formatNumber, type SupportedLocale } from "@/lib/formatters";

type OutputChartProps = {
  data: AnnualPerformance[];
  locale: SupportedLocale;
  title: string;
  wholeGroupBadge: string;
};

export function OutputChart({ data, locale, title, wholeGroupBadge }: OutputChartProps) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-block rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-label text-[10px] font-bold tracking-widest text-primary uppercase">
          {wholeGroupBadge}
        </span>
      </div>
      <h3 className="mt-3 font-heading text-lg font-bold text-ink sm:text-xl">{title}</h3>

      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 16, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E0EC" />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#16052B", fontSize: 13, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#5B5870", fontSize: 12 }}
              tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
            />
            <Tooltip
              cursor={{ fill: "rgba(62, 17, 108, 0.08)" }}
              formatter={(value) => [`${formatNumber(Number(value), locale)} TEU`, "TEU"]}
              contentStyle={{
                borderRadius: "12px",
                borderColor: "#E2E0EC",
                fontSize: "13px",
              }}
            />
            <Bar
              dataKey="outputTeu"
              fill="#3E116C"
              radius={[10, 10, 0, 0]}
              maxBarSize={68}
            >
              <LabelList
                dataKey="outputTeu"
                position="top"
                formatter={(value: unknown) => formatNumber(Number(value), locale)}
                style={{
                  fill: "#16052B",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
