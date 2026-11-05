import { getTranslations } from "next-intl/server";
import { ewecNodes, industrialZones } from "@/data/industrial-zones";
import { portSpecs } from "@/data/stats";
import { formatNumber, type SupportedLocale } from "@/lib/formatters";
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
    distanceKm: node.distanceKm,
    distanceText:
      node.distanceKm === 0
        ? locale === "vi"
          ? "Tại cầu bến"
          : "At port"
        : `${formatNumber(node.distanceKm, locale)} ${tCommon("unitKm")}`,
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
        <LocationClient
          roman={t("roman")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          summary={t("summary", { distanceKm: distanceFormatted })}
          portExactLocationLabel={t("portExactLocationLabel")}
          portExactLocationValue={t("portExactLocationValue")}
          laoBaoDistanceLabel={t("laoBaoDistanceLabel")}
          laoBaoDistanceValue={t("laoBaoDistanceValue", { distanceKm: distanceFormatted })}
          ewecBadge={t("ewecBadge")}
          mapTabEwecLabel={t("mapTabEwec")}
          mapTabZonesLabel={t("mapTabZones")}
          expandMapLabel={t("expandMap")}
          collapseMapLabel={t("collapseMap")}
          scrollZoomHint={t("scrollZoomHint")}
          ewecCorridorDesc={t("ewecCorridorDesc")}
          advantageNote={t("advantageNote")}
          portLabel={t("nodes.chanMayPort")}
          nodes={nodes}
          zones={zones}
        />
      </div>
    </section>
  );
}
