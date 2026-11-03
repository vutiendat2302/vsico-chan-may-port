import type { ContentStatus } from "./stats";

export type CertificateCategoryId =
  "iso" | "transportAndPostal" | "agencyAndContainer" | "partnerAwards";

export type CertificateItem = {
  id: string;
  categoryId: CertificateCategoryId;
  code: string;
  titleKey: string;
  subtitleKey: string;
  image: string;
  status: ContentStatus;
};

export const certificateCategories: CertificateCategoryId[] = [
  "iso",
  "transportAndPostal",
  "agencyAndContainer",
  "partnerAwards",
];

export const certificates: CertificateItem[] = [
  {
    id: "iso-9001",
    categoryId: "iso",
    code: "ISO 9001",
    titleKey: "items.iso9001.title",
    subtitleKey: "items.iso9001.subtitle",
    image: "/certificates/iso/tmp-cert-iso-9001.webp",
    status: "confirmed",
  },
  {
    id: "iso-14001",
    categoryId: "iso",
    code: "ISO 14001",
    titleKey: "items.iso14001.title",
    subtitleKey: "items.iso14001.subtitle",
    image: "/certificates/iso/tmp-cert-iso-14001.webp",
    status: "confirmed",
  },
  {
    id: "iso-45001",
    categoryId: "iso",
    code: "ISO 45001",
    titleKey: "items.iso45001.title",
    subtitleKey: "items.iso45001.subtitle",
    image: "/certificates/iso/tmp-cert-iso-45001.webp",
    status: "confirmed",
  },
  {
    id: "iso-28000",
    categoryId: "iso",
    code: "ISO 28000",
    titleKey: "items.iso28000.title",
    subtitleKey: "items.iso28000.subtitle",
    image: "/certificates/iso/tmp-cert-iso-28000.webp",
    status: "confirmed",
  },
  {
    id: "iso-31000",
    categoryId: "iso",
    code: "ISO 31000",
    titleKey: "items.iso31000.title",
    subtitleKey: "items.iso31000.subtitle",
    image: "/certificates/iso/tmp-cert-iso-31000.webp",
    status: "confirmed",
  },
  {
    id: "ecovadis",
    categoryId: "iso",
    code: "EcoVadis",
    titleKey: "items.ecovadis.title",
    subtitleKey: "items.ecovadis.subtitle",
    image: "/certificates/iso/tmp-cert-ecovadis.webp",
    status: "confirmed",
  },
  {
    id: "transport-license",
    categoryId: "transportAndPostal",
    code: "TRANSPORT",
    titleKey: "items.transportLicense.title",
    subtitleKey: "items.transportLicense.subtitle",
    image: "/certificates/licenses/tmp-cert-transport-01.webp",
    status: "confirmed",
  },
  {
    id: "postal-license",
    categoryId: "transportAndPostal",
    code: "POSTAL",
    titleKey: "items.postalLicense.title",
    subtitleKey: "items.postalLicense.subtitle",
    image: "/certificates/licenses/tmp-cert-postal-01.webp",
    status: "confirmed",
  },
  {
    id: "agency-container-cert",
    categoryId: "agencyAndContainer",
    code: "AGENCY & CONTAINER",
    titleKey: "items.agencyContainer.title",
    subtitleKey: "items.agencyContainer.subtitle",
    image: "/certificates/licenses/tmp-cert-agency-01.webp",
    status: "confirmed",
  },
  {
    id: "honda-award-2025",
    categoryId: "partnerAwards",
    code: "Honda 101KI (05/2025)",
    titleKey: "items.hondaAward.title",
    subtitleKey: "items.hondaAward.subtitle",
    image: "/certificates/partners/tmp-cert-honda-01.webp",
    status: "confirmed",
  },
];
