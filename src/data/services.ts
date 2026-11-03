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

export type PortServiceGroup = {
  id: "cargoAndYard" | "vesselSupport" | "maritimeSupply";
  roman: "01" | "02" | "03";
  titleKey: string;
  subtitleKey: string;
  itemKeys: string[];
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
    // TODO(content): Xác nhận phạm vi tuyến và thời điểm cung cấp chính thức dịch vụ Door to Door
    id: "doorToDoor",
    titleKey: "modes.doorToDoor.title",
    descriptionKey: "modes.doorToDoor.description",
    highlightsKey: "modes.doorToDoor.highlights",
    status: "pending",
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

export const portServiceGroups: PortServiceGroup[] = [
  {
    id: "cargoAndYard",
    roman: "01",
    titleKey: "groups.cargoAndYard.title",
    subtitleKey: "groups.cargoAndYard.subtitle",
    itemKeys: [
      "groups.cargoAndYard.items.stevedoring",
      "groups.cargoAndYard.items.yardStorage",
      "groups.cargoAndYard.items.containerRepair",
    ],
    status: "confirmed",
  },
  {
    id: "vesselSupport",
    roman: "02",
    titleKey: "groups.vesselSupport.title",
    subtitleKey: "groups.vesselSupport.subtitle",
    itemKeys: [
      "groups.vesselSupport.items.agencyFree",
      "groups.vesselSupport.items.tugboat",
      "groups.vesselSupport.items.shipRepair",
    ],
    status: "confirmed",
  },
  {
    id: "maritimeSupply",
    roman: "03",
    titleKey: "groups.maritimeSupply.title",
    subtitleKey: "groups.maritimeSupply.subtitle",
    itemKeys: [
      "groups.maritimeSupply.items.bunkeringAndWater",
      "groups.maritimeSupply.items.chandling",
      "groups.maritimeSupply.items.holdCleaning",
    ],
    status: "confirmed",
  },
];
