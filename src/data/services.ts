import type { ContentStatus } from "./stats";

export type SolutionMode = {
  id: "portToPort" | "icdToPort" | "doorToDoor";
  titleKey: string;
  descriptionKey: string;
  highlightsKey: string;
  status: ContentStatus;
};

export type LogisticsFlowStep = {
  id: string;
  stepNumber: string;
  labelKey: string;
  sublabelKey: string;
};

export type PortServiceItemConfig = {
  key: string;
  tagKey?: string;
};

export type PortServiceColumn = {
  id: "cargoAndYard" | "vesselSupport" | "maritimeSupply";
  num: "01" | "02" | "03";
  image: string;
  imageAltKey: string;
  titleKey: string;
  items: PortServiceItemConfig[];
  status: ContentStatus;
};

export const solutionModes: SolutionMode[] = [
  {
    id: "portToPort",
    titleKey: "modes.portToPort.title",
    descriptionKey: "modes.portToPort.description",
    highlightsKey: "modes.portToPort.highlights",
    status: "confirmed",
  },
  {
    id: "icdToPort",
    titleKey: "modes.icdToPort.title",
    descriptionKey: "modes.icdToPort.description",
    highlightsKey: "modes.icdToPort.highlights",
    status: "confirmed",
  },
  {
    id: "doorToDoor",
    titleKey: "modes.doorToDoor.title",
    descriptionKey: "modes.doorToDoor.description",
    highlightsKey: "modes.doorToDoor.highlights",
    status: "confirmed",
  },
];

export const logisticsFlowSteps: LogisticsFlowStep[] = [
  {
    id: "origin-warehouse",
    stepNumber: "01",
    labelKey: "flow.originWarehouse.label",
    sublabelKey: "flow.originWarehouse.sub",
  },
  {
    id: "trucking",
    stepNumber: "02",
    labelKey: "flow.trucking.label",
    sublabelKey: "flow.trucking.sub",
  },
  {
    id: "icd-lao-bao",
    stepNumber: "03",
    labelKey: "flow.icdLaoBao.label",
    sublabelKey: "flow.icdLaoBao.sub",
  },
  {
    id: "chan-may-port",
    stepNumber: "04",
    labelKey: "flow.chanMayPort.label",
    sublabelKey: "flow.chanMayPort.sub",
  },
  {
    id: "container-ship",
    stepNumber: "05",
    labelKey: "flow.containerShip.label",
    sublabelKey: "flow.containerShip.sub",
  },
  {
    id: "destination-port",
    stepNumber: "06",
    labelKey: "flow.destinationPort.label",
    sublabelKey: "flow.destinationPort.sub",
  },
  {
    id: "destination-warehouse",
    stepNumber: "07",
    labelKey: "flow.destinationWarehouse.label",
    sublabelKey: "flow.destinationWarehouse.sub",
  },
];

export const portServiceColumns: PortServiceColumn[] = [
  {
    id: "cargoAndYard",
    num: "01",
    image: "/images/port/port-aerial-02.webp",
    imageAltKey: "groups.cargoAndYard.imageAlt",
    titleKey: "groups.cargoAndYard.title",
    items: [
      { key: "groups.cargoAndYard.items.stevedoring" },
      { key: "groups.cargoAndYard.items.yardStorage" },
      { key: "groups.cargoAndYard.items.containerRepair" },
    ],
    status: "confirmed",
  },
  {
    id: "vesselSupport",
    num: "02",
    image: "/images/port/tmp-port-berth-01.webp",
    imageAltKey: "groups.vesselSupport.imageAlt",
    titleKey: "groups.vesselSupport.title",
    items: [
      {
        key: "groups.vesselSupport.items.agencyFree",
        tagKey: "groups.vesselSupport.items.agencyFreeTag",
      },
      { key: "groups.vesselSupport.items.tugboat" },
      { key: "groups.vesselSupport.items.shipRepair" },
    ],
    status: "confirmed",
  },
  {
    id: "maritimeSupply",
    num: "03",
    image: "/images/port/port-aerial-01.webp",
    imageAltKey: "groups.maritimeSupply.imageAlt",
    titleKey: "groups.maritimeSupply.title",
    items: [
      { key: "groups.maritimeSupply.items.bunkeringAndWater" },
      { key: "groups.maritimeSupply.items.chandling" },
      { key: "groups.maritimeSupply.items.holdCleaning" },
    ],
    status: "confirmed",
  },
];

// Alias để tương thích ngược nếu cần
export const portServiceGroups = portServiceColumns;
