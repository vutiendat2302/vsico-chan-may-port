export type SupportedLocale = "vi" | "en";

const LOCALE_MAP: Record<SupportedLocale, string> = {
  vi: "vi-VN",
  en: "en-US",
};

export function formatNumber(
  value: number,
  locale: SupportedLocale = "vi",
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(LOCALE_MAP[locale], options).format(value);
}

export function formatVnd(value: number, locale: SupportedLocale = "vi"): string {
  const formatted = new Intl.NumberFormat(LOCALE_MAP[locale], {
    maximumFractionDigits: 0,
  }).format(value);
  return locale === "vi" ? `${formatted} VNĐ` : `VND ${formatted}`;
}

export function formatApproxUsd(value: number, locale: SupportedLocale = "vi"): string {
  const formatted = new Intl.NumberFormat(LOCALE_MAP[locale], {
    maximumFractionDigits: 0,
  }).format(value);
  return locale === "vi" ? `khoảng ${formatted} USD` : `about USD ${formatted}`;
}

export function formatMonthYear(isoDate: string, locale: SupportedLocale = "vi"): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat(LOCALE_MAP[locale], {
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
