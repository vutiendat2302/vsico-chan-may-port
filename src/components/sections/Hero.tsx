import { getTranslations } from "next-intl/server";
import type { SupportedLocale } from "@/lib/formatters";
import { HeroBackground } from "./HeroBackground";
import { HeroClient } from "./HeroClient";

type HeroProps = {
  locale: SupportedLocale;
};

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-black pt-20 text-white"
    >
      <HeroBackground videoAlt={t("videoAlt")} />

      <HeroClient
        brandTitle={t("brandTitle")}
        locationSub={t("locationSub")}
        headline={t("title")}
        tagline={t("tagline")}
        primaryCtaText={t("primaryCta")}
        secondaryCtaText={t("secondaryCta")}
        scrollHintText={t("scrollHint")}
      />
    </section>
  );
}
