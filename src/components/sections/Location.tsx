import { getTranslations } from "next-intl/server";
import { ewecNodes, industrialZones } from "@/data/industrial-zones";
import { portSpecs } from "@/data/stats";
import { formatNumber, type SupportedLocale } from "@/lib/formatters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import {
  LocationClient,
  type NodeDisplayItem,
  type ZoneDisplayItem,
} from "./LocationClient";

type LocationProps = {
  locale: SupportedLocale;
};

export async function Location({ locale }: LocationProps) {
  const t = await getTranslations({ locale, namespace: "location" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const distanceFormatted = formatNumber(portSpecs.laoBaoDistanceKm, locale);

  const nodes: NodeDisplayItem[] = ewecNodes.map((node) => ({
    id: node.id,
    name: t(node.nameKey),
    country: t(node.countryKey),
    role: node.role,
  }));

  const zones: ZoneDisplayItem[] = industrialZones
    .filter((z) => z.status === "confirmed")
    .map((zone) => ({
      id: zone.id,
      name: t(zone.nameKey),
      province: t(zone.provinceKey),
      distanceKm: zone.distanceKm,
      distanceText: `${formatNumber(zone.distanceKm, locale)} ${tCommon("unitKm")}`,
    }));

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="relative bg-surface py-24 text-ink sm:py-32"
    >
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="location-heading"
            roman={t("roman")}
            eyebrow={t("eyebrow")}
            title={t("title")}
            summary={t("summary", { distanceKm: distanceFormatted })}
            variant="light"
          />
        </div>

        <Reveal delay={0.2}>
          <LocationClient
            mapTabEwecLabel={t("mapTabEwec")}
            mapTabZonesLabel={t("mapTabZones")}
            ewecCorridorTitle={t("ewecCorridorTitle")}
            ewecCorridorDesc={t("ewecCorridorDesc")}
            industrialZonesTitle={t("industrialZonesTitle")}
            selectZoneHint={t("selectZoneHint")}
            advantageNote={t("advantageNote")}
            portLabel={t("nodes.chanMayPort")}
            nodes={nodes}
            zones={zones}
          />
        </Reveal>
      </div>
    </section>
  );
}
