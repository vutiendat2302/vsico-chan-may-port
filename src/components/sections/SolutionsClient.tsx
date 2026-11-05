"use client";

import { useState } from "react";
import Image from "next/image";
import { Container, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SupportedLocale } from "@/lib/formatters";

export type FlowStepItem = {
  id: string;
  stepNumber: string;
  shortLabel: string;
  fullName: string;
  description: string;
  image: string;
  imageAlt: string;
  isVsicoOwned?: boolean;
};

export type SolutionsClientProps = {
  locale: SupportedLocale;
  tabs: {
    portToPort: {
      id: "portToPort";
      label: string;
    };
    icdToPort: {
      id: "icdToPort";
      label: string;
    };
    doorToDoor: {
      id: "doorToDoor";
      label: string;
    };
  };
  steps: FlowStepItem[];
  vsicoSystemBadge: string;
  stepLabel: string;
};

type TabKey = "portToPort" | "icdToPort" | "doorToDoor";

// Phạm vi điểm sáng theo từng tab:
// - Port to Port: Điểm 4 → 6 (index 3 → 5)
// - ICD – Cảng: Điểm 3 → 4 (index 2 → 3)
// - Door to Door: Điểm 1 → 7 (index 0 → 6)
const TAB_STEP_RANGES: Record<TabKey, [number, number]> = {
  portToPort: [3, 5],
  icdToPort: [2, 3],
  doorToDoor: [0, 6],
};

export function SolutionsClient({
  tabs,
  steps,
  vsicoSystemBadge,
  stepLabel,
}: SolutionsClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("portToPort");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Khởi đầu tại Cảng Huế (index 3)

  const [minStep, maxStep] = TAB_STEP_RANGES[activeTab];

  // Khi bấm chuyển tab, cập nhật dải sáng và nhảy tới bước phù hợp của tab đó
  const handleSelectTab = (tab: TabKey) => {
    setActiveTab(tab);
    const [start, end] = TAB_STEP_RANGES[tab];
    if (activeStepIndex < start || activeStepIndex > end) {
      setActiveStepIndex(start);
    }
  };

  // Khi bấm vào một điểm trên tuyến 7 điểm
  const handleSelectStep = (index: number) => {
    setActiveStepIndex(index);
    // Tự động chuyển tab tương ứng nếu điểm được bấm không thuộc tab hiện tại
    if (index < minStep || index > maxStep) {
      if (index >= 3 && index <= 5) {
        setActiveTab("portToPort");
      } else if (index >= 2 && index <= 3) {
        setActiveTab("icdToPort");
      } else {
        setActiveTab("doorToDoor");
      }
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      handleSelectStep(activeStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (activeStepIndex < steps.length - 1) {
      handleSelectStep(activeStepIndex + 1);
    }
  };

  const currentStep = steps[activeStepIndex] || steps[0];

  return (
    <div className="mt-12 sm:mt-16">
      {/* 1. THANH TAB CHỮ VỚI GẠCH CHÂN TÍM (PORT TO PORT | ICD – CẢNG | DOOR TO DOOR) */}
      <div className="flex items-center gap-6 border-b border-border sm:gap-10">
        {(["portToPort", "icdToPort", "doorToDoor"] as const).map((tabKey) => {
          const tab = tabs[tabKey];
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tabKey}
              type="button"
              onClick={() => handleSelectTab(tabKey)}
              className={cn(
                "relative pb-4 font-body text-base font-bold transition-colors sm:text-lg",
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-ink",
              )}
            >
              <span>{tab.label}</span>
              {isActive && (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. KHỐI THỊ GIÁC: ẢNH LỚN (~60%) & CỘT CHỮ (~40%) - BỎ HOÀN TOÀN BO TRÒN & BỎ CARD */}
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* CỘT TRÁI (~60%): ẢNH LỚN 16:10, KHÔNG BO TRÒN (ROUNDED-NONE), CROSSFADE CHẬM & SỐ THỨ TỰ MỜ */}
        <div className="lg:col-span-7">
          <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-none border border-border/80 bg-ink shadow-sm">
            {/* Ảnh thay đổi theo bước với hiệu ứng crossfade */}
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  idx === activeStepIndex ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  priority={idx === 3}
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className={cn(
                    "object-cover transition-transform duration-1000 ease-out",
                    idx === activeStepIndex ? "scale-105" : "scale-100",
                  )}
                />
              </div>
            ))}

            {/* Gradient tối ở đáy ảnh */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Số thứ tự lớn mờ đặt góc đáy ảnh (ví dụ: 03, 04) */}
            <span
              className="pointer-events-none absolute right-4 bottom-2 select-none font-heading text-6xl font-black tracking-tighter text-white/15 sm:right-6 sm:bottom-3 sm:text-8xl lg:text-9xl"
              aria-hidden="true"
            >
              {currentStep.stepNumber}
            </span>

            {/* Dấu nhận diện Hệ thống VSICO trên ảnh nếu thuộc điểm 3 hoặc 4 */}
            {currentStep.isVsicoOwned && (
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-none bg-black/60 px-3.5 py-1.5 backdrop-blur-md border border-white/10">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse" />
                <span className="font-body text-xs font-bold tracking-wider text-white uppercase">
                  {vsicoSystemBadge}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CỘT PHẢI (~40%): CỘT CHỮ 3 LỚP (LABEL SỐ BƯỚC, TÊN ĐIỂM, MÔ TẢ) - KHÔNG KHUNG, KHÔNG BO TRÒN */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            {/* Lớp 1: Số bước (Label) */}
            <div className="flex items-center justify-between">
              <span className="font-body text-xs font-bold tracking-[0.2em] text-primary uppercase">
                {stepLabel} {currentStep.stepNumber} / {steps.length.toString().padStart(2, "0")}
              </span>

              {/* Nút Previous / Next góc vuông phẳng */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={activeStepIndex === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-none border border-border text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Bước trước"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={activeStepIndex === steps.length - 1}
                  className="flex h-8 w-8 items-center justify-center rounded-none border border-border text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Bước kế tiếp"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Lớp 2: Tên điểm (Body đậm) */}
            <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              {currentStep.fullName}
            </h3>

            {/* Dấu chấm cam / nhãn Hệ thống VSICO */}
            {currentStep.isVsicoOwned && (
              <div className="mt-2.5 flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-500 shadow-sm" />
                <span>{vsicoSystemBadge}</span>
              </div>
            )}

            {/* Lớp 3: Một đến hai câu mô tả (Body thường) */}
            <p className="mt-4 font-body text-sm leading-relaxed text-muted sm:text-base sm:leading-relaxed">
              {currentStep.description}
            </p>
          </div>
        </div>
      </div>

      {/* 3. TUYẾN 7 ĐIỂM: ĐỒNG TRỤC TUYỆT ĐỐI - ĐIỂM VÀ ICON CHÍNH GIỮA CĂN THẲNG HÀNG */}
      <div className="mt-14 sm:mt-18">
        {/* Chừa padding 2 bên (px-6 sm:px-10) để nhãn của điểm 1 (0%) và điểm 7 (100%) không bị tràn ra ngoài lề */}
        <div className="relative w-full px-6 sm:px-10">
          <div className="relative h-14 w-full flex items-center">
            {/* 1. Trục ray kẻ mảnh chạy ngang */}
            <div className="relative h-[2px] w-full bg-border">
              {/* Đoạn tuyến được sáng màu tím theo tab đang chọn */}
              <div
                className="absolute inset-y-0 bg-primary transition-all duration-500"
                style={{
                  left: `${(minStep / 6) * 100}%`,
                  width: `${((maxStep - minStep) / 6) * 100}%`,
                }}
              />

              {/* 2. Biểu tượng Container lướt dọc tuyến: CĂN CHÍNH XÁC TRÊN ĐIỂM ĐANG CHỌN */}
              <div
                className="absolute top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center will-change-transform transition-[left] duration-500 ease-out"
                style={{ left: `${(activeStepIndex / 6) * 100}%` }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-none border border-primary bg-white text-primary shadow-md sm:h-8 sm:w-8">
                  <Container className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                </div>
              </div>

              {/* 3. 7 điểm mốc tròn: CÙNG DÙNG CHUNG CÔNG THỨC TỌA ĐỘ left: (idx / 6) * 100% */}
              {steps.map((step, idx) => {
                const isSelected = idx === activeStepIndex;
                const isInActiveRange = idx >= minStep && idx <= maxStep;
                const leftPercent = (idx / 6) * 100;

                return (
                  <div
                    key={step.id}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${leftPercent}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectStep(idx)}
                      className={cn(
                        "group relative flex flex-col items-center focus:outline-none",
                        isInActiveRange ? "opacity-100" : "opacity-35 hover:opacity-75",
                      )}
                      aria-label={step.fullName}
                    >
                      {/* Chấm tròn mốc: Nằm ĐÚNG TÂM của trục ray (top-1/2 của đường ray) */}
                      <div className="relative flex h-5 w-5 items-center justify-center">
                        <span
                          className={cn(
                            "rounded-full transition-all duration-300",
                            isSelected
                              ? "h-3.5 w-3.5 bg-primary ring-4 ring-primary/20"
                              : isInActiveRange
                                ? "h-2.5 w-2.5 bg-primary group-hover:scale-125"
                                : "h-2 w-2 bg-muted group-hover:scale-110",
                          )}
                        />
                      </div>

                      {/* Nhãn chữ 1-2 từ: Nằm ngay bên dưới chấm, căn giữa tuyệt đối */}
                      <div className="absolute top-7 flex flex-col items-center whitespace-nowrap">
                        <span
                          className={cn(
                            "block font-body text-xs transition-colors sm:text-sm",
                            isSelected
                              ? "font-extrabold text-primary"
                              : isInActiveRange
                                ? "font-semibold text-ink"
                                : "text-muted",
                          )}
                        >
                          {step.shortLabel}
                        </span>

                        {/* Dấu chấm cam cho 2 điểm ICD và Cảng thuộc Hệ thống VSICO */}
                        {step.isVsicoOwned && (
                          <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-amber-500 shadow-sm" />
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
