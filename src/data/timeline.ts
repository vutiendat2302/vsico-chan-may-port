import type { ContentStatus } from "./stats";

export type Milestone = {
  id: string;
  roman: "I" | "II" | "III";
  date: string; // ISO date, e.g. "2026-08-01" (chỉ hiển thị tháng và năm)
  titleKey: string;
  descriptionKey: string;
  status: ContentStatus;
  exactDayStatus: ContentStatus;
};

export const countdownTargetIso = "2027-09-01T00:00:00+07:00";

export const milestones: Milestone[] = [
  {
    id: "berth-4",
    roman: "I",
    date: "2026-08-01",
    titleKey: "berth4",
    descriptionKey: "berth4Desc",
    status: "confirmed",
    exactDayStatus: "pending",
  },
  {
    id: "berth-5",
    roman: "II",
    date: "2027-09-01",
    titleKey: "berth5",
    descriptionKey: "berth5Desc",
    status: "confirmed",
    exactDayStatus: "pending",
  },
  {
    id: "icd-lao-bao",
    roman: "III",
    date: "2027-09-01",
    titleKey: "icdLaoBao",
    descriptionKey: "icdLaoBaoDesc",
    status: "confirmed",
    exactDayStatus: "pending",
  },
];
