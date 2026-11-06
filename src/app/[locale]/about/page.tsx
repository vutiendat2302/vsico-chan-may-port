import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { AboutClient } from "@/components/about/AboutClient";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const validLocale: AppLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  setRequestLocale(validLocale);
  const t = await getTranslations({ locale: validLocale, namespace: "aboutPage" });

  return (
    <div className="min-h-screen bg-surface">
      <Header locale={validLocale} />
      <main>
        <AboutClient
          locale={validLocale}
          translations={{
            backHome: t("backHome"),
            eyebrow: t("eyebrow"),
            pageTitle: t("pageTitle"),
            pageSubtitle: t("pageSubtitle"),
            tabOverview: t("tabOverview"),
            tabLeaders: t("tabLeaders"),
            tabHistory: t("tabHistory"),
            tabOrg: t("tabOrg"),
            tabGoals: t("tabGoals"),
            tabMap: t("tabMap"),
            groupHdqt: t("groupHdqt"),
            groupBld: t("groupBld"),
            groupBks: t("groupBks"),
            mapEyebrow: t("mapEyebrow"),
            mapTitle: t("mapTitle"),
            mapPortName: t("mapPortName"),
            mapAddress: t("mapAddress"),
            openInMaps: t("openInMaps"),
            mapIframeTitle: t("mapIframeTitle"),
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
