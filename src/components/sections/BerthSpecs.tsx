import { getTranslations } from "next-intl/server";
import { portSpecs } from "@/data/stats";
import { formatNumber, type SupportedLocale } from "@/lib/formatters";
import { BerthSpecsClient } from "./BerthSpecsClient";
import { PortVideoShowcase } from "./PortVideoShowcase";

type BerthSpecsProps = {
  locale: SupportedLocale;
};

export async function BerthSpecs({ locale }: BerthSpecsProps) {
  const t = await getTranslations({ locale, namespace: "berthSpecs" });

  const areaFormatted = formatNumber(portSpecs.totalAreaHectares, locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <section
      id="berth-specs"
      aria-labelledby="berth-specs-heading"
      className="relative scroll-mt-16 overflow-hidden bg-surface pt-24 pb-0 text-ink sm:pt-32 sm:pb-0"
    >
      <BerthSpecsClient
        locale={locale}
        stats={{
          berths: portSpecs.berths,
          quayLengthMeters: portSpecs.quayLengthMeters,
          depthMeters: portSpecs.depthMeters,
          totalAreaHectares: portSpecs.totalAreaHectares,
          areaFormatted,
          maxContainerVesselTeu: portSpecs.maxContainerVesselTeu,
          maxBulkVesselDwt: portSpecs.maxBulkVesselDwt,
        }}
        t={{
          roman: t("roman"),
          eyebrow: t("eyebrow"),
          title: t("title"),
          summary: t("summary"),
          vesselBadge: t("vesselBadge"),
          berths: t("berths"),
          berthsDesc: t("berthsDesc"),
          berthsSub: t("berthsSub"),
          quayLength: t("quayLength"),
          quayLengthDesc: t("quayLengthDesc"),
          quayLengthSub: t("quayLengthSub"),
          depth: t("depth"),
          depthDesc: t("depthDesc"),
          depthSub: t("depthSub"),
          area: t("area"),
          areaDesc: t("areaDesc"),
          areaSub: t("areaSub"),
          vesselCapacity: t("vesselCapacity"),
          vesselSummary: t("vesselSummary"),
          containerVesselTitle: t("containerVesselTitle"),
          containerVesselDesc: t("containerVesselDesc"),
          bulkVesselTitle: t("bulkVesselTitle"),
          bulkVesselDesc: t("bulkVesselDesc"),
          officialPlanningNote: t("officialPlanningNote"),
          blueprintTitle: t("blueprintTitle"),
          blueprintAriaLabel: t("blueprintAriaLabel"),
          blueprintTotalLength: t("blueprintTotalLength"),
          blueprintBerth4: t("blueprintBerth4"),
          blueprintBerth5: t("blueprintBerth5"),
          blueprintBerthsUnit: t("blueprintBerthsUnit"),
          blueprintWaterDepth: t("blueprintWaterDepth"),
          blueprintSeabedDesign: t("blueprintSeabedDesign"),
          blueprintMasterplan: t("blueprintMasterplan"),
          blueprintPortArea: t("blueprintPortArea"),
          blueprintVesselNote: t("blueprintVesselNote"),
          blueprintNotToScale: t("blueprintNotToScale"),
          blueprintElevation: t("blueprintElevation"),
          blueprintMobileAria: t("blueprintMobileAria"),
        }}
      />

      {/* Video mô phỏng cảng quy mô full màn hình ở dưới cùng phần 1 */}
      <PortVideoShowcase
        videoPlayAria={t("videoPlayAria")}
        videoPauseAria={t("videoPauseAria")}
        videoMuteAria={t("videoMuteAria")}
        videoUnmuteAria={t("videoUnmuteAria")}
      />
    </section>
  );
}
