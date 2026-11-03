import { getTranslations } from "next-intl/server";
import { Boxes, Ship, Wrench, CheckCircle2 } from "lucide-react";
import { portServiceGroups, type PortServiceGroup } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const GROUP_ICONS: Record<PortServiceGroup["id"], typeof Boxes> = {
  cargoAndYard: Boxes,
  vesselSupport: Ship,
  maritimeSupply: Wrench,
};

export async function Services() {
  const t = await getTranslations("services");

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-border bg-surface-subtle py-20 lg:py-28"
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

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {portServiceGroups.map((group, index) => {
            const Icon = GROUP_ICONS[group.id];
            return (
              <Reveal key={group.id} delay={index * 0.08} className="h-full">
                <article className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-surface p-7 shadow-sm transition-all hover:border-primary/40 hover:shadow-md sm:p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="font-label text-3xl font-bold text-primary/20">
                        {group.roman}
                      </span>
                    </div>

                    <h3 className="mt-6 font-heading text-2xl font-bold text-ink">
                      {t(group.titleKey)}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                      {t(group.subtitleKey)}
                    </p>

                    <ul className="mt-6 space-y-3.5 border-t border-border pt-6">
                      {group.itemKeys.map((itemKey) => (
                        <li
                          key={itemKey}
                          className="flex items-start gap-3 font-body text-sm text-ink"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          />
                          <span className="font-medium">{t(itemKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
