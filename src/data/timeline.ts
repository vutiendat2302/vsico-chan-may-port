export type MilestoneData = {
  id: string;
  date: string; // ISO format: "2026-08-01", "2027-06-01", "2027-09-01"
  displayDate: string; // "08/2026", "06/2027", "09/2027"
  labelKey: string;
  statusOverride?: "operating" | "upcoming";
  isTransitionTick?: boolean;
};

export type FigureData = {
  id: string;
  categoryLabelKey?: string; // e.g. "targetThroughputLabel", "handlingProductivityLabel"
  type: "number" | "range" | "text";
  numberValue?: number; // e.g. 120000
  unitKey?: string; // "teuUnit"
  rangeMin?: number; // 40, 80
  rangeMax?: number; // 45, 85
  rangeUnitKey?: string; // "movesUnit"
  textKey?: string; // "phase2Advantage"
};

export type PhaseData = {
  id: string;
  labelKey: string; // "phase1Label", "phase2Label"
  start: string; // ISO date
  end: string | null; // ISO date or null if ongoing
  widthPercent: number; // 55 for phase 1, 45 for phase 2
  hasArrowEnd?: boolean;
  figures: FigureData[];
};

// TODO(content): Xác nhận ngày chính xác từ Ban Quản lý Cảng; hiện dùng ngày 01 làm ngày giả định theo tháng/năm kế hoạch
export const countdownTargetIso = "2027-09-01T00:00:00+07:00";

export const timelineMilestones: MilestoneData[] = [
  {
    id: "berth-4",
    date: "2026-08-01",
    displayDate: "08/2026",
    labelKey: "berth4",
  },
  {
    id: "transition-2027-06",
    date: "2027-06-01",
    displayDate: "06/2027",
    labelKey: "transition",
    isTransitionTick: true,
  },
  {
    id: "berth-5-icd",
    date: "2027-09-01",
    displayDate: "09/2027",
    labelKey: "berth5Icd",
  },
];

export const timelinePhases: PhaseData[] = [
  {
    id: "phase-1",
    labelKey: "phase1Label",
    start: "2026-08-01",
    end: "2027-06-01",
    widthPercent: 55,
    figures: [
      {
        id: "target-throughput",
        categoryLabelKey: "targetThroughputLabel",
        type: "number",
        numberValue: 120000,
        unitKey: "teuUnit",
      },
      {
        id: "handling-productivity-1",
        categoryLabelKey: "handlingProductivityLabel",
        type: "range",
        rangeMin: 40,
        rangeMax: 45,
        rangeUnitKey: "movesUnit",
      },
    ],
  },
  {
    id: "phase-2",
    labelKey: "phase2Label",
    start: "2027-06-01",
    end: null,
    widthPercent: 45,
    hasArrowEnd: true,
    figures: [
      {
        id: "handling-productivity-2",
        categoryLabelKey: "handlingProductivityLabel",
        type: "range",
        rangeMin: 80,
        rangeMax: 85,
        rangeUnitKey: "movesUnit",
      },
      {
        id: "capacity-expansion",
        type: "text",
        textKey: "phase2Advantage",
      },
    ],
  },
];

export function getMilestoneStatus(
  milestone: MilestoneData,
  now: number = Date.now(),
): "operating" | "upcoming" {
  if (milestone.statusOverride) return milestone.statusOverride;
  return new Date(milestone.date).getTime() <= now ? "operating" : "upcoming";
}

export function getDaysRemaining(
  targetIso: string,
  now: number = Date.now(),
): number {
  const targetTime = new Date(targetIso).getTime();
  const diff = targetTime - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
