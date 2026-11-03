import { Anchor, Container, ShieldCheck, Truck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { companyInfo } from "@/data/company";
import { logisticsFlowSteps, solutionModes } from "@/data/services";
import { formatNumber, type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LogisticsFlow, type FlowStepDisplay } from "./LogisticsFlow";

type SolutionsProps = {
  locale: SupportedLocale;
};

export async function Solutions({ locale }: SolutionsProps) {
  const t = await getTranslations({ locale, namespace: "solutions" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const isProd = process.env.NODE_ENV === "production";
  const visibleModes = isProd
    ? solutionModes.filter((mode) => mode.status === "confirmed")
    : solutionModes;

  const formatParams = {
    trips: formatNumber(companyInfo.weeklyFrequencyTrips, locale),
    fleetTeu: formatNumber(companyInfo.fleetTotalTeu, locale),
    minTeu: formatNumber(companyInfo.vesselMinTeu, locale),
    maxTeu: formatNumber(companyInfo.vesselMaxTeu, locale),
    warehouseArea: formatNumber(companyInfo.totalWarehouseAndIcdSqm, locale),
    minTons: formatNumber(companyInfo.smallTruckMinTons, locale, {
      maximumFractionDigits: 1,
    }),
    maxTons: formatNumber(companyInfo.smallTruckMaxTons, locale),
  };

  const flowSteps: FlowStepDisplay[] = logisticsFlowSteps.map((step) => ({
    id: step.id,
    stepNumber: step.stepNumber,
    label: t(step.labelKey),
    sublabel: t(step.sublabelKey),
  }));

  const modeIcons = {
    portToPort: Anchor,
    icdToPort: Container,
    doorToDoor: Truck,
  };

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="bg-surface-subtle py-24 text-ink sm:py-32"
    >
      <div className="container">
        <SectionHeading
          id="solutions-heading"
          roman={t("roman")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          summary={t("summary")}
          variant="light"
        />

        {/* Các thẻ phương thức vận chuyển */}
        <div
          className={
            visibleModes.length === 2
              ? "mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
              : "mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3"
          }
        >
          {visibleModes.map((mode, index) => {
            const Icon = modeIcons[mode.id];
            const isPending = mode.status === "pending";
            return (
              <Reveal key={mode.id} delay={0.1 * (index + 1)}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-white p-7 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      {isPending && (
                        <span className="rounded-full border border-highlight/40 bg-highlight/10 px-3 py-1 font-label text-[10px] font-bold tracking-widest text-highlight uppercase">
                          {tCommon("pendingBadge")}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-6 font-heading text-2xl font-bold text-ink">
                      {t(mode.titleKey)}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                      {t(mode.descriptionKey, formatParams)}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-label text-xs font-semibold text-primary">
                      {t(mode.highlightsKey, formatParams)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Sơ đồ luồng vận hành theo cuộn */}
        <LogisticsFlow
          title={t("flowTitle")}
          subtitle={t("flowSubtitle")}
          steps={flowSteps}
        />

        {/* Lợi ích gộp định tính (không ghi % tiết kiệm) */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl border border-primary/25 bg-primary/[0.04] p-6 sm:flex-row sm:items-center sm:p-8">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h4 className="font-heading text-xl font-bold text-ink">
                {t("costNoteTitle")}
              </h4>
              <p className="mt-1 font-body text-sm leading-relaxed text-muted">
                {t("costNoteBody")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
