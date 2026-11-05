import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { companyInfo } from "@/data/company";
import { HeaderClient, type NavItem } from "./HeaderClient";

type HeaderProps = {
  locale: AppLocale;
};

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const tContact = await getTranslations({ locale, namespace: "contact" });
  const targetLocale: AppLocale = locale === "vi" ? "en" : "vi";

  const navItems: NavItem[] = [
    {
      href: "#berth-specs",
      roman: "I",
      label: t("berthSpecs").replace(/^[IVXLCDM]+\.\s*/, ""),
    },
    {
      href: "#location",
      roman: "II",
      label: t("location").replace(/^[IVXLCDM]+\.\s*/, ""),
    },
    {
      href: "#port-icd",
      roman: "III",
      label: t("portIcd").replace(/^[IVXLCDM]+\.\s*/, ""),
    },
    {
      href: "#solutions",
      roman: "IV",
      label: t("solutions").replace(/^[IVXLCDM]+\.\s*/, ""),
    },
    {
      href: "#infrastructure",
      roman: "V",
      label: t("infrastructure").replace(/^[IVXLCDM]+\.\s*/, ""),
    },
    {
      href: "#services",
      roman: "VI",
      label: t("services").replace(/^[IVXLCDM]+\.\s*/, ""),
    },
    {
      href: "#certifications",
      roman: "VII",
      label: t("certifications").replace(/^[IVXLCDM]+\.\s*/, ""),
    },
    {
      href: "#contact",
      roman: "VIII",
      label: t("contact").replace(/^[IVXLCDM]+\.\s*/, ""),
    },
  ];

  return (
    <HeaderClient
      locale={locale}
      targetLocale={targetLocale}
      brandSubtitle={t("brandSubtitle")}
      switchLocale={t("switchLocale")}
      switchLocaleAria={t("switchLocaleAria")}
      openMenu={t("openMenu")}
      closeMenu={t("closeMenu")}
      menuTitle={t("menuTitle")}
      menuContactSubtitle={t("menuContactSubtitle")}
      menuDirectInquiry={t("menuDirectInquiry")}
      navItems={navItems}
      groupLabels={{
        chanMayPort: t("groupChanMayPort"),
        incentives: t("groupIncentives"),
        aboutVsico: t("groupAboutVsico"),
        contact: t("groupContact"),
      }}
      vsicoSystem={{
        title: t("vsicoSystemTitle"),
        websiteLabel: t("systemWebsite"),
        websiteUrl:
          locale === "vi" ? "https://vsico.com.vn/vi" : "https://vsico.com.vn/en",
        portLabel: t("systemPort"),
        portSub: t("systemPortSub"),
        icdLabel: t("systemIcd"),
        icdSub: t("systemIcdSub"),
      }}
      hotlineDisplay={companyInfo.contact.hotlineDisplay}
      hotlineTel={companyInfo.contact.hotlineTel}
      portAddress={tContact("portAddressValue")}
    />
  );
}
