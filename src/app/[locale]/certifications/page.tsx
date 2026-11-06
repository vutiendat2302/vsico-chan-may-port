import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, routing, type AppLocale } from "@/i18n/routing";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { certificateCategories, certificates } from "@/data/certificates";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type CertPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: CertPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "certifications" });
  return {
    title: t("pageTitle"),
    description: t("summary"),
  };
}

export default async function CertificationsPage({ params }: CertPageProps) {
  const { locale } = await params;
  const validLocale: AppLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  setRequestLocale(validLocale);
  const t = await getTranslations({ locale: validLocale, namespace: "certifications" });

  return (
    <div className="min-h-screen bg-surface text-ink">
      <Header locale={validLocale} />

      <main className="pt-28 pb-24 lg:pt-36 lg:pb-32">
        <div className="container">
          {/* Breadcrumb / Quay lại trang chủ và cuộn ngay đến Section VII Chứng nhận */}
          <Link
            href="/#certifications"
            className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:text-primary-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t("pageBack")}</span>
          </Link>

          {/* Tiêu đề trang phong cách Spyker Editorial sang trọng */}
          <div className="mt-8 max-w-4xl border-b border-border pb-10">
            <span className="font-body text-xs font-bold tracking-[0.24em] text-primary uppercase">
              {t("pageEyebrow")}
            </span>
            <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {t("pageHeading")}
            </h1>
            <p className="mt-4 font-body text-base leading-relaxed text-muted sm:text-lg">
              {t("summary")}
            </p>
          </div>

          {/* Danh mục hiển thị theo từng nhóm chuẩn Spyker slot (Không bo tròn, full W, đường nét sắc gọn) */}
          <div className="mt-14 space-y-16">
            {certificateCategories.map((catId) => {
              const catItems = certificates.filter((c) => c.categoryId === catId);
              if (catItems.length === 0) return null;

              return (
                <section key={catId} className="space-y-6">
                  <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
                    <h2 className="font-body text-sm font-bold tracking-[0.2em] text-primary uppercase sm:text-base">
                      {t(`tabs.${catId}`)}
                    </h2>
                    <span className="font-body text-xs text-muted">
                      ({catItems.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {catItems.map((cert) => (
                      <article
                        key={cert.id}
                        className="group flex flex-col border border-border bg-white transition-all hover:border-ink hover:shadow-lg"
                      >
                        <div className="relative aspect-[16/11] w-full overflow-hidden bg-ink">
                          <Image
                            src={cert.image}
                            alt={t(cert.titleKey)}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-ink/90 px-3 py-1 font-body text-[10px] font-bold tracking-widest text-white uppercase">
                            <ShieldCheck className="h-3 w-3 text-highlight-light" />
                            {cert.code}
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-6">
                          <div>
                            <h3 className="font-heading text-lg font-bold text-ink group-hover:text-primary">
                              {t(cert.titleKey)}
                            </h3>
                            <p className="mt-2 font-body text-xs leading-relaxed text-muted">
                              {t(cert.subtitleKey)}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
