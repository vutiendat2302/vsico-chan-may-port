export type ContentStatus = "confirmed" | "pending";

export type HeroStatItem = {
  id: "berths" | "quayLength" | "depth" | "area" | "vesselCapacity";
  labelKey: string;
  numericValue: number;
  secondaryNumericValue?: number;
  prefix?: string;
  suffix?: string;
  secondarySuffix?: string;
  decimals?: number;
  padZero?: boolean;
  status: ContentStatus;
};

export type PortSpecs = {
  berths: number;
  quayLengthMeters: number;
  depthMeters: number;
  totalAreaHectares: number;
  maxContainerVesselTeu: number;
  maxBulkVesselDwt: number;
  quayCranesCount: number;
  quayCraneModel: string;
  forkliftsCount: number;
  backupCranesCount: number;
  tractorUnitsCount: number;
  staffCount: number;
  laoBaoDistanceKm: number;
  icdLaoBaoAreaSqm: number;
  phase1: {
    period: string;
    volumeTeu: number;
    movesPerHourMin: number;
    movesPerHourMax: number;
  };
  phase2: {
    period: string;
    movesPerHourMin: number;
    movesPerHourMax: number;
  };
};

export const portSpecs: PortSpecs = {
  berths: 2,
  quayLengthMeters: 540,
  depthMeters: -14,
  totalAreaHectares: 20.4,
  maxContainerVesselTeu: 4000,
  maxBulkVesselDwt: 70000,
  quayCranesCount: 5,
  quayCraneModel: "Weihua 45t-45m",
  forkliftsCount: 5,
  backupCranesCount: 2,
  tractorUnitsCount: 20,
  staffCount: 250,
  laoBaoDistanceKm: 150,
  icdLaoBaoAreaSqm: 86000,
  phase1: {
    period: "08/2026 - 05/2027",
    volumeTeu: 120000,
    movesPerHourMin: 40,
    movesPerHourMax: 45,
  },
  phase2: {
    period: "06/2027",
    movesPerHourMin: 80,
    movesPerHourMax: 85,
  },
};

export const heroStats: HeroStatItem[] = [
  {
    id: "berths",
    labelKey: "stats.berths",
    numericValue: portSpecs.berths,
    padZero: true,
    status: "confirmed",
  },
  {
    id: "quayLength",
    labelKey: "stats.quayLength",
    numericValue: portSpecs.quayLengthMeters,
    suffix: " m",
    status: "confirmed",
  },
  {
    id: "depth",
    labelKey: "stats.depth",
    numericValue: portSpecs.depthMeters,
    suffix: " m",
    status: "confirmed",
  },
  {
    id: "area",
    labelKey: "stats.area",
    numericValue: portSpecs.totalAreaHectares,
    decimals: 1,
    suffix: " ha",
    status: "confirmed",
  },
  {
    id: "vesselCapacity",
    labelKey: "stats.vesselCapacity",
    numericValue: portSpecs.maxContainerVesselTeu,
    suffix: " TEU",
    secondaryNumericValue: portSpecs.maxBulkVesselDwt,
    secondarySuffix: " DWT",
    status: "confirmed",
  },
];
