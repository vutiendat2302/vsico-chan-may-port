import { getTranslations } from "next-intl/server";
import { certificateCategories, certificates } from "@/data/certificates";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CertificateViewer, type CertificateDisplayItem } from "./CertificateViewer";
import {
  ChanMayCustomerShowcase,
  type CustomerLogoItem,
} from "./ChanMayCustomerShowcase";

export async function Certifications() {
  const t = await getTranslations("certifications");
  const isProd = process.env.NODE_ENV === "production";

  const categories = certificateCategories.map((id) => ({
    id,
    label: t(`tabs.${id}`),
  }));

  const certificateItems: CertificateDisplayItem[] = certificates
    .filter((item) => (isProd ? item.status === "confirmed" : true))
    .map((item) => ({
      id: item.id,
      categoryId: item.categoryId,
      code: item.code,
      title: t(item.titleKey),
      subtitle: t(item.subtitleKey),
      image: item.image,
    }));

  const showcaseItems: CustomerLogoItem[] = [
    {
      id: "shaiyo",
      name: "SHAIYO-AA",
      logo: "/logos/customers/customer-shaiyo.png",
      width: 360,
      height: 180,
    },
    {
      id: "kimlong",
      name: "KIM LONG MOTOR",
      logo: "/logos/customers/customer-kimlong.png",
      width: 440,
      height: 200,
    },
    {
      id: "americaQuartz",
      name: "AMERICA QUARTZ TECHNOLOGY",
      logo: "/logos/customers/customer-america-quartz.png",
      width: 340,
      height: 180,
    },
    {
      id: "billionMax",
      name: "BILLION MAX",
      logo: "/logos/customers/customer-billion-max.png",
      width: 340,
      height: 180,
    },
    {
      id: "jon72",
      name: "JON72 VIETNAM",
      logo: "/logos/customers/customer-jon72.svg",
      width: 340,
      height: 180,
    },
    {
      id: "malpensa",
      name: "MALPENSA PLANT",
      logo: "/logos/customers/customer-malpensa.svg",
      width: 340,
      height: 180,
    },
    {
      id: "okura",
      name: "OKURA VIETNAM",
      logo: "/logos/customers/customer-okura.svg",
      width: 340,
      height: 180,
    },
  ];

  return (
    <section
      id="certifications"
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

        {/* Bộ trình chiếu 4 nhóm chứng chỉ: Phong cách Spyker Cars Slot (Full Width, góc vuông sang trọng) */}
        <Reveal delay={0.08}>
          <div className="mt-12">
            <CertificateViewer
              categories={categories}
              items={certificateItems}
              zoomHint={t("zoomHint")}
              closeDialogLabel={t("closeDialog")}
              viewAllLabel={t("viewAll")}
              scrollHintLabel={t("scrollHint")}
            />
          </div>
        </Reveal>

        {/* Khách hàng container khu vực Chân Mây: Bố cục Spyker Heritage với 7 Logo rải rác ngẫu nhiên, chuột parallax & sóng nước */}
        <Reveal delay={0.15}>
          <ChanMayCustomerShowcase
            heading={t("chanMayCustomersHeading")}
            summary={t("chanMayCustomersSummary")}
            items={showcaseItems}
          />
        </Reveal>
      </div>
    </section>
  );
}
