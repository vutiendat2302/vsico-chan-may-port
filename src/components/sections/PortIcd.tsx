import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { portSpecs } from "@/data/stats";
import { formatNumber, type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

type PortIcdProps = {
  locale: SupportedLocale;
};

export async function PortIcd({ locale }: PortIcdProps) {
  const t = await getTranslations({ locale, namespace: "portIcd" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const icdAreaFormatted = formatNumber(portSpecs.icdLaoBaoAreaSqm, locale);
  const distanceFormatted = formatNumber(portSpecs.laoBaoDistanceKm, locale);

  const functionsList = [
    t("functions.consolidation"),
    t("functions.customs"),
    t("functions.valueAdded"),
  ];

  const benefitsList = [
    { icon: Zap, text: t("benefits.speed") },
    { icon: ShieldCheck, text: t("benefits.risk") },
    { icon: CheckCircle2, text: t("benefits.synergy") },
  ];

  return (
    <section
      id="port-icd"
      aria-labelledby="port-icd-heading"
      className="relative overflow-hidden bg-surface-subtle py-24 text-ink sm:py-32"
    >
      <div className="relative z-10 container">
        <SectionHeading
          id="port-icd-heading"
          roman={t("roman")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          summary={t("summary", { icdArea: icdAreaFormatted })}
        />

        {/* Sơ đồ trực quan kết nối ICD Lao Bảo <-> Cảng VSICO Huế */}
        <div className="mt-14 grid grid-cols-1 items-center gap-6 lg:grid-cols-11">
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                {t("icdCardBadge")}
              </span>
              <h3 className="mt-2 font-heading text-2xl font-bold text-ink sm:text-3xl">
                {t("icdCardTitle")}
              </h3>
              <p className="mt-4 font-body text-xs text-muted">{t("icdAreaLabel")}</p>
              <p className="mt-1 font-label text-3xl font-bold text-primary sm:text-4xl">
                <Counter
                  value={portSpecs.icdLaoBaoAreaSqm}
                  locale={locale}
                  suffix={` ${tCommon("unitSqm")}`}
                />
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.2}
            className="flex flex-col items-center justify-center py-2 text-center lg:col-span-1"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-sm">
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="mt-2 font-label text-[10px] font-semibold tracking-widest text-muted uppercase">
              ~{distanceFormatted} {tCommon("unitKm")}
            </span>
          </Reveal>

          <Reveal delay={0.25} className="lg:col-span-5">
            <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/5 via-white to-primary/10 p-6 shadow-sm sm:p-8">
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                {t("portCardBadge")}
              </span>
              <h3 className="mt-2 font-heading text-2xl font-bold text-ink sm:text-3xl">
                {t("portCardTitle")}
              </h3>
              <p className="mt-4 font-body text-xs text-muted">{t("portAreaLabel")}</p>
              <p className="mt-1 font-label text-3xl font-bold text-primary sm:text-4xl">
                <Counter
                  value={portSpecs.totalAreaHectares}
                  decimals={1}
                  locale={locale}
                  suffix={` ${tCommon("unitHa")}`}
                />
              </p>
            </div>
          </Reveal>
        </div>

        {/* Hình ảnh ICD Lao Bảo & Danh sách chức năng / hiệu quả */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Reveal delay={0.3} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-sm">
              <Image
                src="/images/icd/tmp-icd-laobao-01.webp"
                alt={t("imageAlt")}
                width={1600}
                height={970}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <p className="font-label text-xs font-semibold tracking-[0.18em] text-highlight-light uppercase">
                  {t("chainLabel", { distanceKm: distanceFormatted })}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.35}
            className="flex flex-col justify-between gap-6 lg:col-span-5"
          >
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-7">
              <h4 className="font-heading text-xl font-bold text-ink">
                {t("functionsTitle")}
              </h4>
              <ul className="mt-4 space-y-3">
                {functionsList.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-sm leading-relaxed text-ink/85"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm sm:p-7">
              <h4 className="font-heading text-xl font-bold text-primary-dark">
                {t("benefitsTitle")}
              </h4>
              <ul className="mt-4 space-y-3.5">
                {benefitsList.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 font-body text-sm leading-relaxed text-ink/85"
                  >
                    <Icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
