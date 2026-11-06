import { getTranslations } from "next-intl/server";
import { portServiceColumns } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ServicesClient, type ServiceColumnDisplay } from "./ServicesClient";

export async function Services() {
  const t = await getTranslations("services");

  const columns: ServiceColumnDisplay[] = portServiceColumns.map((col) => ({
    id: col.id,
    num: t(`groups.${col.id}.num`),
    title: t(`groups.${col.id}.title`),
    image: col.image,
    imageAlt: t(col.imageAltKey),
    items: col.items.map((item) => ({
      text: t(item.key),
      tag: item.tagKey ? t(item.tagKey) : undefined,
    })),
  }));

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-border bg-surface py-20 lg:py-28"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            roman={t("roman")}
            eyebrow={t("eyebrow")}
            title={t("title")}
          />
        </Reveal>

        <ServicesClient columns={columns} />
      </div>
    </section>
  );
}
