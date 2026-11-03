import type { ContentStatus } from "./stats";

export type AnnualPerformance = {
  year: "2023" | "2024" | "2025";
  outputTeu: number;
  revenueBillionVnd: number;
};

export type WarehouseSite = {
  id: string;
  nameKey: string;
  locationKey: string;
  areaSqm: number;
  type: "warehouse" | "icd";
  isHighlight?: boolean;
};

export type CompanyInfo = {
  fleetTotalDwt: number;
  fleetTotalTeu: number;
  vesselMinTeu: number;
  vesselMaxTeu: number;
  weeklyFrequencyTrips: number;
  smallTruckMinTons: number;
  smallTruckMaxTons: number;
  totalWarehouseAndIcdSqm: number;
  auditorName: string;
  auditIntervalMonths: number;
  representativeOfficeKeys: string[];
  annualPerformance: AnnualPerformance[];
  warehouseSites: WarehouseSite[];
  contact: {
    hotlineDisplay: string;
    hotlineTel: string;
    websiteUrl: string;
    websiteDisplay: string;
    facebookUrl: string;
    tiktokHandle: string;
    placeholderEmail: string;
    emailStatus: ContentStatus;
  };
};

export const companyInfo: CompanyInfo = {
  fleetTotalDwt: 93_058,
  fleetTotalTeu: 6_660,
  vesselMinTeu: 600,
  vesselMaxTeu: 1_700,
  weeklyFrequencyTrips: 4,
  smallTruckMinTons: 2.5,
  smallTruckMaxTons: 14,
  totalWarehouseAndIcdSqm: 612_000,
  auditorName: "Deloitte",
  auditIntervalMonths: 6,
  representativeOfficeKeys: [
    "offices.singapore",
    "offices.china",
    "offices.hongKong",
    "offices.cambodia",
    "offices.laos",
  ],
  annualPerformance: [
    { year: "2023", outputTeu: 206_170, revenueBillionVnd: 1_709 },
    { year: "2024", outputTeu: 265_562, revenueBillionVnd: 1_835 },
    { year: "2025", outputTeu: 267_447, revenueBillionVnd: 2_047 },
  ],
  warehouseSites: [
    {
      id: "hue-warehouse",
      nameKey: "warehouses.hue.name",
      locationKey: "warehouses.hue.location",
      areaSqm: 160_000,
      type: "warehouse",
      isHighlight: true,
    },
    {
      id: "van-lam-icd",
      nameKey: "warehouses.vanLam.name",
      locationKey: "warehouses.vanLam.location",
      areaSqm: 150_000,
      type: "icd",
      isHighlight: true,
    },
    {
      id: "lao-bao-icd",
      nameKey: "warehouses.laoBao.name",
      locationKey: "warehouses.laoBao.location",
      areaSqm: 86_000,
      type: "icd",
      isHighlight: true,
    },
    {
      id: "quang-binh-warehouse",
      nameKey: "warehouses.quangBinh.name",
      locationKey: "warehouses.quangBinh.location",
      areaSqm: 86_000,
      type: "warehouse",
    },
    {
      id: "thien-son-warehouse",
      nameKey: "warehouses.thienSon.name",
      locationKey: "warehouses.thienSon.location",
      areaSqm: 45_000,
      type: "warehouse",
    },
    {
      id: "van-giang-warehouse",
      nameKey: "warehouses.vanGiang.name",
      locationKey: "warehouses.vanGiang.location",
      areaSqm: 41_000,
      type: "warehouse",
    },
    {
      id: "long-an-warehouse",
      nameKey: "warehouses.longAn.name",
      locationKey: "warehouses.longAn.location",
      areaSqm: 22_000,
      type: "warehouse",
    },
    {
      id: "dong-nai-warehouse",
      nameKey: "warehouses.dongNai.name",
      locationKey: "warehouses.dongNai.location",
      areaSqm: 22_000,
      type: "warehouse",
    },
  ],
  contact: {
    hotlineDisplay: "(+84) 243 77 11 089",
    hotlineTel: "+842437711089",
    websiteUrl: "https://vsico.com.vn",
    websiteDisplay: "www.vsico.com.vn",
    facebookUrl: "https://www.facebook.com/Vsico.com.vn",
    tiktokHandle: "@vsicologshipwarehouse",
    // TODO(content): Xác nhận email chính thức của bộ phận kinh doanh cảng VSICO Huế
    placeholderEmail: "placeholder@example.com",
    emailStatus: "pending",
  },
};
