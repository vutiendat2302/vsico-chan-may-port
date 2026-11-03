import { getLocale, getTranslations } from "next-intl/server";
import { Landmark, Sparkles, CheckCircle2 } from "lucide-react";
import { hueCitySupportPolicies, vsicoCommercialPolicies } from "@/data/policies";
import { formatVnd, formatApproxUsd, type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Reveal } from "@/components/motion/Reveal";
import { PolicyCalculator } from "./PolicyCalculator";

export async function Policies() {
  const t = await getTranslations("policies");
  const locale = (await getLocale()) as SupportedLocale;

  return (
    <section
      id="policies"
      className="relative overflow-hidden border-t border-border bg-surface py-20 lg:py-28"
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

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Cột trái: 2 Tab Chính sách Hãng tàu & Chủ hàng */}
          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <Tabs defaultValue="shippingLine">
                <TabsList aria-label={t("title")}>
                  <TabsTrigger value="shippingLine">{t("tabShippingLine")}</TabsTrigger>
                  <TabsTrigger value="cargoOwner">{t("tabCargoOwner")}</TabsTrigger>
                </TabsList>

                {/* Tab 1: Hãng tàu */}
                <TabsContent value="shippingLine">
                  <div className="space-y-6">
                    {/* Chính sách TP. Huế */}
                    <div className="rounded-3xl border border-primary/25 bg-surface-subtle p-7 shadow-sm sm:p-8">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1 font-label text-[10px] font-bold tracking-[0.18em] text-white uppercase">
                        <Landmark className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("hueGovBadge")}
                      </span>

                      <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-label text-3xl font-bold text-primary tabular-nums sm:text-4xl">
                          {formatVnd(
                            hueCitySupportPolicies.shippingLinePerTripVnd,
                            locale,
                          )}
                        </span>
                        <span className="font-body text-sm font-medium text-muted">
                          {t("shippingAmountSuffix")}
                        </span>
                      </div>

                      <p className="mt-1 font-body text-sm font-semibold text-ink">
                        (
                        {formatApproxUsd(
                          hueCitySupportPolicies.shippingLinePerTripApproxUsd,
                          locale,
                        )}
                        )
                      </p>

                      <p className="mt-4 inline-block rounded-xl border border-border bg-surface px-4 py-2 font-body text-xs font-semibold text-ink">
                        {t("shippingCondition", {
                          minTrips: hueCitySupportPolicies.shippingLineMinTripsPerMonth,
                        })}
                      </p>
                    </div>

                    {/* Chính sách thương mại VSICO */}
                    <div className="rounded-3xl border border-border bg-surface p-7 shadow-sm sm:p-8">
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-label text-[10px] font-bold tracking-[0.18em] text-primary uppercase">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("vsicoCommercialBadge")}
                      </span>

                      <ul className="mt-5 space-y-3.5">
                        {vsicoCommercialPolicies.shippingLineBenefitKeys.map((key) => (
                          <li
                            key={key}
                            className="flex items-start gap-3 font-body text-sm text-ink"
                          >
                            <CheckCircle2
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                            />
                            <span className="font-medium">{t(key)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 2: Chủ hàng & Forwarder */}
                <TabsContent value="cargoOwner">
                  <div className="space-y-6">
                    {/* Chính sách TP. Huế */}
                    <div className="rounded-3xl border border-primary/25 bg-surface-subtle p-7 shadow-sm sm:p-8">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1 font-label text-[10px] font-bold tracking-[0.18em] text-white uppercase">
                        <Landmark className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("hueGovBadge")}
                      </span>

                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-surface p-5">
                          <p className="font-label text-xs font-bold tracking-widest text-muted uppercase">
                            {t("cargo20Label")}
                          </p>
                          <p className="mt-2 font-label text-2xl font-bold text-primary tabular-nums sm:text-3xl">
                            {formatVnd(hueCitySupportPolicies.cargoOwner20ftVnd, locale)}
                          </p>
                          <p className="mt-1 font-body text-xs text-muted">
                            {t("perContainerSuffix")} (
                            {formatApproxUsd(
                              hueCitySupportPolicies.cargoOwner20ftApproxUsd,
                              locale,
                            )}
                            )
                          </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-surface p-5">
                          <p className="font-label text-xs font-bold tracking-widest text-muted uppercase">
                            {t("cargo40Label")}
                          </p>
                          <p className="mt-2 font-label text-2xl font-bold text-primary tabular-nums sm:text-3xl">
                            {formatVnd(hueCitySupportPolicies.cargoOwner40ftVnd, locale)}
                          </p>
                          <p className="mt-1 font-body text-xs text-muted">
                            {t("perContainerSuffix")} (
                            {formatApproxUsd(
                              hueCitySupportPolicies.cargoOwner40ftApproxUsd,
                              locale,
                            )}
                            )
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chính sách thương mại VSICO */}
                    <div className="rounded-3xl border border-border bg-surface p-7 shadow-sm sm:p-8">
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-label text-[10px] font-bold tracking-[0.18em] text-primary uppercase">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("vsicoCommercialBadge")}
                      </span>

                      <ul className="mt-5 space-y-3.5">
                        {vsicoCommercialPolicies.cargoOwnerBenefitKeys.map((key) => (
                          <li
                            key={key}
                            className="flex items-start gap-3 font-body text-sm text-ink"
                          >
                            <CheckCircle2
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                            />
                            <span className="font-medium">{t(key)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Reveal>
          </div>

          {/* Cột phải: Công cụ tính toán mức hỗ trợ */}
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <PolicyCalculator
                locale={locale}
                labels={{
                  title: t("calculator.title"),
                  subtitle: t("calculator.subtitle"),
                  modeShipping: t("calculator.modeShipping"),
                  modeCargo: t("calculator.modeCargo"),
                  tripsInputLabel: t("calculator.tripsInputLabel"),
                  minTripsWarning: t("calculator.minTripsWarning", {
                    minTrips: hueCitySupportPolicies.shippingLineMinTripsPerMonth,
                  }),
                  cont20InputLabel: t("calculator.cont20InputLabel"),
                  cont40InputLabel: t("calculator.cont40InputLabel"),
                  estimatedTotalLabel: t("calculator.estimatedTotalLabel"),
                  validityPendingNote: t("calculator.validityPendingNote"),
                }}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
