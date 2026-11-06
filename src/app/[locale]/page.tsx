import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { Preloader } from "@/components/motion/Preloader";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { BerthSpecs } from "@/components/sections/BerthSpecs";
import { Location } from "@/components/sections/Location";
import { PortIcd } from "@/components/sections/PortIcd";
import { Solutions } from "@/components/sections/Solutions";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Services } from "@/components/sections/Services";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale: AppLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  setRequestLocale(validLocale);
  const tNav = await getTranslations({ locale: validLocale, namespace: "nav" });

  return (
    <div id="top">
      {/* Intro Loader kiểu Spyker Cars: Màn tím logo VSICO trắng hiện dần rồi kéo lên */}
      <Preloader brandSubtitle={tNav("brandSubtitle")} />
      <Header locale={validLocale} />
      <main>
        <Hero locale={validLocale} />
        <BerthSpecs locale={validLocale} />
        <Location locale={validLocale} />
        <PortIcd locale={validLocale} />
        <Solutions locale={validLocale} />
        <Infrastructure />
        <Services />
        <Certifications />
        <Contact locale={validLocale} />
      </main>
      <Footer />
    </div>
  );
}
