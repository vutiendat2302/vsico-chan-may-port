"use client";

import dynamic from "next/dynamic";
import type { AnnualPerformance } from "@/data/company";
import type { SupportedLocale } from "@/lib/formatters";

const OutputChart = dynamic(
  () => import("@/components/charts/OutputChart").then((m) => m.OutputChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-[340px] w-full animate-pulse rounded-3xl border border-border bg-surface p-6" />
    ),
  },
);

const RevenueChart = dynamic(
  () => import("@/components/charts/RevenueChart").then((m) => m.RevenueChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-[340px] w-full animate-pulse rounded-3xl border border-border bg-surface p-6" />
    ),
  },
);

type AboutChartsClientProps = {
  data: AnnualPerformance[];
  locale: SupportedLocale;
  outputChartTitle: string;
  revenueChartTitle: string;
  wholeGroupBadge: string;
};

export function AboutChartsClient({
  data,
  locale,
  outputChartTitle,
  revenueChartTitle,
  wholeGroupBadge,
}: AboutChartsClientProps) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <OutputChart
        data={data}
        locale={locale}
        title={outputChartTitle}
        wholeGroupBadge={wholeGroupBadge}
      />
      <RevenueChart
        data={data}
        locale={locale}
        title={revenueChartTitle}
        wholeGroupBadge={wholeGroupBadge}
      />
    </div>
  );
}
