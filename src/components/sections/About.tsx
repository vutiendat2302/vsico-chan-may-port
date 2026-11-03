import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Ship, Container, Warehouse, ShieldCheck, Globe2, MapPin } from "lucide-react";
import { companyInfo } from "@/data/company";
import { formatNumber, type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { AboutChartsClient } from "./AboutChartsClient";

export async function About() {
  const t = await getTranslations("about");
  const locale = (await getLocale()) as SupportedLocale;

  const keyMetrics = [
    {
      icon: Ship,
      value: `${formatNumber(companyInfo.fleetTotalDwt, locale)} DWT`,
      label: t("metrics.fleetDwt"),
    },
    {
      icon: Container,
      value: `${formatNumber(companyInfo.fleetTotalTeu, locale)} TEU`,
      label: t("metrics.fleetTeu"),
    },
    {
      icon: Warehouse,
      value: `${formatNumber(companyInfo.totalWarehouseAndIcdSqm, locale)} m²`,
      label: t("metrics.warehouseArea"),
    },
    {
      icon: ShieldCheck,
      value: companyInfo.auditorName,
      label: t("metrics.auditor", {
        months: companyInfo.auditIntervalMonths,
      }),
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-border bg-surface-subtle py-20 lg:py-28"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            roman={t("roman")}
            eyebrow={t("eyebrow")}
            title={t("title")}
            summary={t("summary")}
          />
        </Reveal>

        {/* 4 thẻ chỉ số năng lực toàn Tập đoàn */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Reveal key={metric.label} delay={index * 0.06} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-surface p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="mt-5">
                    <p className="font-label text-2xl font-bold text-ink tabular-nums sm:text-3xl">
                      {metric.value}
                    </p>
                    <p className="mt-1.5 font-body text-xs font-medium text-muted">
                      {metric.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Biểu đồ Sản lượng & Doanh thu toàn Tập đoàn VSICO (2023 - 2025) */}
        <Reveal delay={0.14}>
          <AboutChartsClient
            data={companyInfo.annualPerformance}
            locale={locale}
            outputChartTitle={t("outputChartTitle")}
            revenueChartTitle={t("revenueChartTitle")}
            wholeGroupBadge={t("chartWholeGroupBadge")}
          />
          <p className="mt-4 flex items-center gap-2 font-body text-xs font-medium text-muted">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              {t("auditNote", {
                months: companyInfo.auditIntervalMonths,
                auditor: companyInfo.auditorName,
              })}
            </span>
          </p>
        </Reveal>

        {/* Mạng lưới 8 Kho & ICD toàn hệ thống + Văn phòng đại diện quốc tế */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal delay={0.18}>
              <div className="rounded-3xl border border-border bg-surface p-7 shadow-sm sm:p-8">
                <h3 className="font-heading text-2xl font-bold text-ink">
                  {t("warehousesTitle", {
                    totalArea: formatNumber(companyInfo.totalWarehouseAndIcdSqm, locale),
                  })}
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {companyInfo.warehouseSites.map((site) => (
                    <div
                      key={site.id}
                      className={
                        site.isHighlight
                          ? "rounded-2xl border border-primary/35 bg-primary/[0.04] p-4"
                          : "rounded-2xl border border-border bg-surface-subtle p-4"
                      }
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-heading text-base font-bold text-ink">
                            {t(site.nameKey)}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1.5 font-body text-xs text-muted">
                            <MapPin
                              className="h-3.5 w-3.5 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            <span>{t(site.locationKey)}</span>
                          </p>
                        </div>
                        <span className="rounded-lg bg-primary px-2.5 py-1 font-label text-xs font-bold text-white tabular-nums">
                          {formatNumber(site.areaSqm, locale)} m²
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal delay={0.22} className="h-full">
              <div className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-ink text-white shadow-xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src="/images/warehouse/tmp-warehouse-system-01.webp"
                    alt={t("warehousesTitle", {
                      totalArea: formatNumber(
                        companyInfo.totalWarehouseAndIcdSqm,
                        locale,
                      ),
                    })}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col justify-between p-7">
                  <div>
                    <div className="flex items-center gap-2.5 text-highlight-light">
                      <Globe2 className="h-5 w-5" aria-hidden="true" />
                      <h3 className="font-heading text-xl font-bold text-white">
                        {t("officesTitle")}
                      </h3>
                    </div>

                    <ul className="mt-5 flex flex-wrap gap-2.5">
                      {companyInfo.representativeOfficeKeys.map((officeKey) => (
                        <li
                          key={officeKey}
                          className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 font-label text-xs font-semibold tracking-wider text-white"
                        >
                          {t(officeKey)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
