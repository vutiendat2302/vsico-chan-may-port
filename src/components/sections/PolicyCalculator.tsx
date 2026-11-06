"use client";

import { useState } from "react";
import { Calculator, AlertCircle, ArrowRight } from "lucide-react";
import { hueCitySupportPolicies } from "@/data/policies";
import { formatVnd, formatApproxUsd, type SupportedLocale } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type PolicyCalculatorProps = {
  locale: SupportedLocale;
  labels: {
    title: string;
    subtitle: string;
    modeShipping: string;
    modeCargo: string;
    tripsInputLabel: string;
    minTripsWarning: string;
    cont20InputLabel: string;
    cont40InputLabel: string;
    estimatedTotalLabel: string;
    validityPendingNote: string;
    ctaContact?: string;
  };
};

export function PolicyCalculator({ locale, labels }: PolicyCalculatorProps) {
  const [mode, setMode] = useState<"shipping" | "cargo">("shipping");
  const [trips, setTrips] = useState<number>(4);
  const [cont20, setCont20] = useState<number>(20);
  const [cont40, setCont40] = useState<number>(30);

  const isEligibleShipping = trips >= hueCitySupportPolicies.shippingLineMinTripsPerMonth;

  const totalVnd =
    mode === "shipping"
      ? isEligibleShipping
        ? trips * hueCitySupportPolicies.shippingLinePerTripVnd
        : 0
      : cont20 * hueCitySupportPolicies.cargoOwner20ftVnd +
        cont40 * hueCitySupportPolicies.cargoOwner40ftVnd;

  const totalApproxUsd =
    mode === "shipping"
      ? isEligibleShipping
        ? trips * hueCitySupportPolicies.shippingLinePerTripApproxUsd
        : 0
      : cont20 * hueCitySupportPolicies.cargoOwner20ftApproxUsd +
        cont40 * hueCitySupportPolicies.cargoOwner40ftApproxUsd;

  return (
    <div className="rounded-3xl border border-border bg-ink p-7 text-white shadow-xl sm:p-9">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-highlight text-ink">
          <Calculator className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-heading text-2xl font-bold text-white">{labels.title}</h3>
          <p className="mt-1 font-body text-xs text-white/70">{labels.subtitle}</p>
        </div>
      </div>

      {/* Mode selector */}
      <div className="mt-6 grid grid-cols-1 gap-2 rounded-2xl border border-white/15 bg-white/[0.04] p-1.5 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setMode("shipping")}
          className={cn(
            "rounded-xl px-4 py-3 font-label text-xs font-bold tracking-wider uppercase transition-all",
            mode === "shipping"
              ? "bg-primary text-white shadow-sm"
              : "text-white/75 hover:text-white",
          )}
        >
          {labels.modeShipping}
        </button>
        <button
          type="button"
          onClick={() => setMode("cargo")}
          className={cn(
            "rounded-xl px-4 py-3 font-label text-xs font-bold tracking-wider uppercase transition-all",
            mode === "cargo"
              ? "bg-primary text-white shadow-sm"
              : "text-white/75 hover:text-white",
          )}
        >
          {labels.modeCargo}
        </button>
      </div>

      {/* Inputs */}
      <div className="mt-6">
        {mode === "shipping" ? (
          <div>
            <label
              htmlFor="calc-trips-input"
              className="block font-label text-xs font-semibold tracking-wider text-white/85 uppercase"
            >
              {labels.tripsInputLabel}
            </label>
            <div className="mt-2.5 flex items-center gap-4">
              <input
                id="calc-trips-input"
                type="number"
                min={0}
                max={200}
                value={trips}
                onChange={(e) =>
                  setTrips(Math.max(0, Number.parseInt(e.target.value, 10) || 0))
                }
                className="w-36 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 font-label text-2xl font-bold text-white tabular-nums focus:border-highlight-light focus:outline-none"
              />
              <input
                type="range"
                aria-label={labels.tripsInputLabel}
                min={0}
                max={20}
                value={Math.min(trips, 20)}
                onChange={(e) => setTrips(Number.parseInt(e.target.value, 10) || 0)}
                className="h-2 flex-1 cursor-pointer accent-highlight-light"
              />
            </div>

            {!isEligibleShipping && (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-highlight-light/40 bg-highlight/15 px-3.5 py-2.5 font-body text-xs text-highlight-light">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{labels.minTripsWarning}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="calc-cont20-input"
                className="block font-label text-xs font-semibold tracking-wider text-white/85 uppercase"
              >
                {labels.cont20InputLabel}
              </label>
              <input
                id="calc-cont20-input"
                type="number"
                min={0}
                max={10000}
                value={cont20}
                onChange={(e) =>
                  setCont20(Math.max(0, Number.parseInt(e.target.value, 10) || 0))
                }
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 font-label text-2xl font-bold text-white tabular-nums focus:border-highlight-light focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="calc-cont40-input"
                className="block font-label text-xs font-semibold tracking-wider text-white/85 uppercase"
              >
                {labels.cont40InputLabel}
              </label>
              <input
                id="calc-cont40-input"
                type="number"
                min={0}
                max={10000}
                value={cont40}
                onChange={(e) =>
                  setCont40(Math.max(0, Number.parseInt(e.target.value, 10) || 0))
                }
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 font-label text-2xl font-bold text-white tabular-nums focus:border-highlight-light focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Output */}
      <div className="mt-7 rounded-2xl border border-highlight-light/35 bg-white/[0.06] p-5">
        <p className="font-label text-[11px] font-bold tracking-[0.18em] text-white/75 uppercase">
          {labels.estimatedTotalLabel}
        </p>
        <p
          suppressHydrationWarning
          className="mt-2 font-label text-3xl font-bold text-highlight-light tabular-nums sm:text-4xl"
        >
          {formatVnd(totalVnd, locale)}
        </p>
        <p
          suppressHydrationWarning
          className="mt-1 font-body text-sm font-medium text-white/80"
        >
          ({formatApproxUsd(totalApproxUsd, locale)})
        </p>

        {/* Nút liên kết nhận chính sách hỗ trợ tới phần liên hệ */}
        <a
          href="#contact"
          className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-highlight px-5 py-3 font-label text-xs font-bold tracking-wider text-ink uppercase shadow-md transition-all hover:bg-highlight-light hover:scale-[1.01] focus-visible:outline-white"
        >
          <span>
            {labels.ctaContact ??
              (locale === "vi"
                ? "Nhận tư vấn & đăng ký chính sách ngay"
                : "Claim Support & Contact Us")}
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <p className="mt-4 font-body text-xs text-white/60">{labels.validityPendingNote}</p>
    </div>
  );
}
