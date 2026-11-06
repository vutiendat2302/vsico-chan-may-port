import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { NewsClient } from "@/components/news/NewsClient";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: NewsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  const validLocale: AppLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  setRequestLocale(validLocale);
  const t = await getTranslations({ locale: validLocale, namespace: "newsPage" });

  return (
    <div className="min-h-screen bg-surface">
      <Header locale={validLocale} />
      <main>
        <NewsClient
          locale={validLocale}
          translations={{
            backHome: t("backHome"),
            eyebrow: t("eyebrow"),
            pageTitle: t("pageTitle"),
            pageSubtitle: t("pageSubtitle"),
            searchPlaceholder: t("searchPlaceholder"),
            readMore: t("readMore"),
            noResults: t("noResults"),
            featuredTag: t("featuredTag"),
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
