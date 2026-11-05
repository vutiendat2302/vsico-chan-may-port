import Image from "next/image";
import {
  Boxes,
  FileCheck2,
  Warehouse,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { portSpecs } from "@/data/stats";
import { formatNumber, type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { PortIcdCorridor } from "./PortIcdCorridor";

type PortIcdProps = {
  locale: SupportedLocale;
};

export async function PortIcd({ locale }: PortIcdProps) {
  const t = await getTranslations({ locale, namespace: "portIcd" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const icdAreaFormatted = formatNumber(portSpecs.icdLaoBaoAreaSqm, locale);
  const distanceFormatted = formatNumber(portSpecs.laoBaoDistanceKm, locale);

  const functionsList = [
    {
      num: "01",
      icon: Boxes,
      title: locale === "vi" ? "Tập kết & Gom hàng xuyên biên giới" : "Cross-Border Cargo Consolidation",
      desc: t("functions.consolidation"),
    },
    {
      num: "02",
      icon: FileCheck2,
      title: locale === "vi" ? "Thông quan trực tiếp tại cửa khẩu" : "Direct Border Customs Clearance",
      desc: t("functions.customs"),
    },
    {
      num: "03",
      icon: Warehouse,
      title: locale === "vi" ? "Kho ngoại quan & Logistics giá trị gia tăng" : "Bonded Warehousing & Value-Added Logistics",
      desc: t("functions.valueAdded"),
    },
  ];

  const benefitsList = [
    {
      num: "01",
      icon: Zap,
      title: locale === "vi" ? "Tối ưu tốc độ luân chuyển" : "Accelerated Cargo Velocity",
      desc: t("benefits.speed"),
    },
    {
      num: "02",
      icon: ShieldCheck,
      title: locale === "vi" ? "Kiểm soát & Giảm thiểu rủi ro" : "Risk Reduction & Transit Control",
      desc: t("benefits.risk"),
    },
    {
      num: "03",
      icon: CheckCircle2,
      title: locale === "vi" ? "Cộng hưởng chuỗi cung ứng đồng bộ" : "Synchronized Infrastructure Synergy",
      desc: t("benefits.synergy"),
    },
  ];

  return (
    <section
      id="port-icd"
      aria-labelledby="port-icd-heading"
      className="relative overflow-hidden bg-surface py-24 text-ink sm:py-32"
    >
      <div className="relative z-10 container">
        {/* Tiêu đề phong cách Editorial thanh lịch */}
        <SectionHeading
          id="port-icd-heading"
          roman={t("roman")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          summary={t("summary", { icdArea: icdAreaFormatted })}
        />

        {/* 1. Trục hành lang kết nối Cửa khẩu - Cảng biển: 2 ảnh 4:5 nối bởi trục cự ly và xe tải chạy */}
        <PortIcdCorridor
          locale={locale}
          icdArea={portSpecs.icdLaoBaoAreaSqm}
          portArea={portSpecs.totalAreaHectares}
          distanceFormatted={distanceFormatted}
          icdTitle={t("icdCardTitle")}
          portTitle={t("portCardTitle")}
          icdTagline={t("icdTagline")}
          portTagline={t("portTagline")}
          corridorNote={t("chainLabel", { distanceKm: distanceFormatted })}
          truckLabel={t("truckLabel")}
          unitSqm={tCommon("unitSqm")}
          unitHa={tCommon("unitHa")}
          unitKm={tCommon("unitKm")}
        />

        {/* 2. Khối kể chuyện thị giác 1: Cửa ngõ biên giới (Ảnh ICD Lao Bảo & 3 Chức năng cốt lõi) */}
        <div className="mt-20 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Cột trái: Nhiếp ảnh điện ảnh ICD Lao Bảo */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="group relative overflow-hidden rounded-none border border-border/80 shadow-md">
              <div className="aspect-[16/10] w-full overflow-hidden bg-muted-light/20">
                <Image
                  src="/images/icd/tmp-icd-laobao-01.webp"
                  alt={t("imageAlt")}
                  width={1600}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 sm:p-8">
                <span className="font-body text-[10px] font-bold tracking-[0.2em] text-highlight-light uppercase">
                  ICD LAO BẢO · QUẢNG TRỊ
                </span>
                <p className="mt-1 font-body text-sm font-medium text-white/90 sm:text-base">
                  {locale === "vi"
                    ? "Cảng cạn hậu cần chiến lược sát Cửa khẩu Quốc tế Lao Bảo – Điểm đón đầu hàng hóa hành lang EWEC."
                    : "Strategic dry port logistics hub at Lao Bao International Border Gate – Head of the EWEC freight corridor."}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Cột phải: Danh mục chức năng dạng tạp chí biên tập (Hairline Dividers, KHÔNG đóng card hộp) */}
          <Reveal delay={0.25} className="lg:col-span-5">
            <div>
              <span className="font-body text-[10px] font-bold tracking-[0.22em] text-primary uppercase">
                {locale === "vi" ? "NĂNG LỰC HẬU CẦN BIÊN GIỚI" : "BORDER LOGISTICS CAPABILITY"}
              </span>
              <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {t("functionsTitle")}
              </h3>

              <div className="mt-8 divide-y divide-border/70 border-y border-border/70">
                {functionsList.map((item) => (
                  <div key={item.num} className="group py-5 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="font-body text-base font-extrabold text-primary/60">
                        {item.num}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-body text-base font-bold text-ink">
                          {item.title}
                        </h4>
                        <p className="mt-1 font-body text-sm leading-relaxed text-muted">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3. Khối kể chuyện thị giác 2: Cửa ngõ đại dương (3 Lợi ích & Ảnh Cảng nước sâu Chân Mây) */}
        <div className="mt-24 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Cột trái: Danh mục lợi ích dạng tạp chí biên tập (Hairline Dividers) */}
          <Reveal delay={0.2} className="order-2 lg:order-1 lg:col-span-5">
            <div>
              <span className="font-body text-[10px] font-bold tracking-[0.22em] text-primary uppercase">
                {locale === "vi" ? "GIÁ TRỊ VẬN HÀNH KHÉP KÍN" : "INTEGRATED OPERATIONAL VALUE"}
              </span>
              <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {t("benefitsTitle")}
              </h3>

              <div className="mt-8 divide-y divide-border/70 border-y border-border/70">
                {benefitsList.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.num} className="group py-5 transition-colors">
                      <div className="flex items-start gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div className="flex-1">
                          <h4 className="font-body text-base font-bold text-ink">
                            {item.title}
                          </h4>
                          <p className="mt-1 font-body text-sm leading-relaxed text-muted">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Cột phải: Nhiếp ảnh điện ảnh Cảng VSICO Chân Mây */}
          <Reveal delay={0.25} className="order-1 lg:order-2 lg:col-span-7">
            <div className="group relative overflow-hidden rounded-none border border-border/80 shadow-md">
              <div className="aspect-[16/10] w-full overflow-hidden bg-muted-light/20">
                <Image
                  src="/images/port/port-aerial-01.webp"
                  alt={locale === "vi" ? "Toàn cảnh Cảng VSICO Chân Mây" : "Aerial view of VSICO Chan May Port"}
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 sm:p-8">
                <span className="font-body text-[10px] font-bold tracking-[0.2em] text-highlight-light uppercase">
                  CẢNG VSICO CHÂN MÂY · TP. HUẾ
                </span>
                <p className="mt-1 font-body text-sm font-medium text-white/90 sm:text-base">
                  {locale === "vi"
                    ? "Cầu bến 540 m với độ sâu -14 m, tiếp nhận đồng thời tàu container 4.000 TEU và tàu hàng tổng hợp 70.000 DWT."
                    : "540 m quay with -14 m draft, accommodating 4,000 TEU container and 70,000 DWT bulk vessels simultaneously."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
