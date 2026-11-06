"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Compass, MapPin, Navigation } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_TOKENS } from "@/lib/motion";
import { cn } from "@/lib/utils";

const EwecMap = dynamic(() => import("@/components/map/EwecMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-full items-center justify-center rounded-none border border-border bg-ink/95 font-body text-xs tracking-widest text-white/70 uppercase sm:h-[560px] lg:h-[620px]">
      EWEC Corridor Map...
    </div>
  ),
});

const IndustrialZoneMap = dynamic(
  () => import("@/components/map/IndustrialZoneMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] w-full items-center justify-center rounded-none border border-border bg-surface-subtle font-body text-xs tracking-widest text-muted uppercase sm:h-[560px] lg:h-[620px]">
        Industrial Zones Map...
      </div>
    ),
  },
);

export type ZoneDisplayItem = {
  id: string;
  name: string;
  province: string;
  distanceKm: number;
  distanceText: string;
};

export type NodeDisplayItem = {
  id: string;
  name: string;
  country: string;
  role: "origin" | "border-icd" | "gateway-port";
  distanceKm: number;
  distanceText: string;
};

type LocationClientProps = {
  roman: string;
  eyebrow: string;
  title: string;
  summary: string;
  portExactLocationLabel?: string;
  portExactLocationValue?: string;
  laoBaoDistanceLabel?: string;
  laoBaoDistanceValue?: string;
  ewecBadge?: string;
  mapTabEwecLabel: string;
  mapTabZonesLabel: string;
  expandMapLabel?: string;
  collapseMapLabel?: string;
  scrollZoomHint?: string;
  ewecCorridorDesc: string;
  advantageNote: string;
  portLabel: string;
  nodes: NodeDisplayItem[];
  zones: ZoneDisplayItem[];
};

export function LocationClient({
  roman,
  eyebrow,
  title,
  summary,
  mapTabEwecLabel,
  mapTabZonesLabel,
  ewecCorridorDesc,
  advantageNote,
  portLabel,
  nodes,
  zones,
}: LocationClientProps) {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(
    zones[0]?.id ?? "hoa-khanh",
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const header = headerRef.current;
    const infoCards = infoCardsRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;

    // Cinematic Initial Setup
    if (header) {
      gsap.set(header, { opacity: 0, y: 50, filter: "blur(14px)" });
    }
    if (infoCards) {
      gsap.set(infoCards, { opacity: 0, scale: 0.94, y: 40, filter: "blur(12px)" });
    }
    if (leftCol) {
      gsap.set(leftCol, { opacity: 0, x: -100, filter: "blur(16px)" });
    }
    if (rightCol) {
      gsap.set(rightCol, { opacity: 0, x: 100, filter: "blur(16px)" });
    }

    const ctx = gsap.context(() => {
      // 1. Header & Quick Info Badges Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: MOTION_TOKENS.scrollTrigger.start,
          toggleActions: MOTION_TOKENS.scrollTrigger.toggleActions,
          once: false,
        },
      });

      if (header) {
        tl.to(header, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power4.out",
        });
      }

      if (infoCards) {
        tl.to(
          infoCards,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "back.out(1.5)",
          },
          "-=0.7",
        );
      }

      // 2. Hai cột chính: Info bên trái bay từ Trái sang, Bản đồ bên phải bay từ Phải sang
      if (leftCol && rightCol) {
        tl.to(
          leftCol,
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power4.out",
          },
          "-=0.5",
        ).to(
          rightCol,
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power4.out",
          },
          "-=1.1",
        );
      }
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const nodeLabels = Object.fromEntries(
    nodes.map((n) => [
      n.id,
      { name: n.name, country: n.country, distanceText: n.distanceText },
    ]),
  );

  const zoneLabels = Object.fromEntries(
    zones.map((z) => [
      z.id,
      { name: z.name, province: z.province, distanceText: z.distanceText },
    ]),
  );

  return (
    <div ref={containerRef} className="relative will-change-transform">
      {/* Hàng 1: Tiêu đề Section & 2 Thẻ vị trí chính xác của Cảng VSICO + Khoảng cách Lao Bảo */}
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div ref={headerRef} className="max-w-3xl will-change-transform">
          <div className="flex items-baseline gap-4">
            <span
              aria-hidden="true"
              className="font-body text-4xl font-extrabold tracking-tight text-primary sm:text-5xl"
            >
              {roman}.
            </span>
            <span className="font-body text-sm font-bold text-primary-dark uppercase">
              {eyebrow}
            </span>
          </div>

          <h2
            id="location-heading"
            className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]"
          >
            {title}
          </h2>

          <p className="mt-4 font-body text-base leading-relaxed text-muted sm:text-lg">
            {summary}
          </p>
        </div>

        {/* Khối Badges thông tin vị trí thực tế & khoảng cách Lao Bảo */}
        <div
          ref={infoCardsRef}
          className="flex flex-col gap-3.5 will-change-transform sm:flex-row lg:flex-col lg:items-end"
        >
        </div>
      </div>

      {/* Tabs & Map Layout */}
      <div className="mt-12">
        <Tabs defaultValue="ewec" className="w-full">
          <div className="w-full">
            {/* Thanh chuyển tab full-width (w-full) và không bo tròn (rounded-none) */}
            <TabsList
              aria-label="Location Map Views"
              className="grid w-full grid-cols-1 gap-1.5 rounded-none border border-border bg-surface-subtle p-1.5 sm:grid-cols-2"
            >
              <TabsTrigger
                value="ewec"
                className="w-full justify-center gap-2 rounded-none py-3 font-body text-xs font-bold tracking-wider sm:text-sm"
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span>{mapTabEwecLabel}</span>
              </TabsTrigger>
              <TabsTrigger
                value="zones"
                className="w-full justify-center gap-2 rounded-none py-3 font-body text-xs font-bold tracking-wider sm:text-sm"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                <span>{mapTabZonesLabel}</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: BẢN ĐỒ HÀNH LANG EWEC */}
          <TabsContent value="ewec" className="mt-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              {/* CỘT TRÁI: THÔNG TIN CHI TIẾT (Bỏ title, bỏ quốc gia, chỉ giữ mô tả + danh sách vị trí) */}
              <div
                ref={leftColRef}
                className="flex flex-col justify-between rounded-none border border-border bg-surface-subtle p-6 will-change-transform sm:p-8 lg:col-span-4"
              >
                <div>
                  <p className="font-body text-sm leading-relaxed text-ink/80">
                    {ewecCorridorDesc}
                  </p>

                  <div className="mt-6 space-y-3">
                    {nodes.map((node) => {
                      const isPort = node.role === "gateway-port";
                      const isIcd = node.role === "border-icd";
                      return (
                        <div
                          key={node.id}
                          className={cn(
                            "flex items-center justify-between gap-3.5 rounded-none border p-3.5 transition-all duration-300",
                            isPort
                              ? "border-primary bg-primary text-white shadow-md"
                              : isIcd
                                ? "border-primary/40 bg-white text-ink shadow-sm hover:border-primary"
                                : "border-border bg-white text-ink hover:border-primary/40",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-none",
                                isPort
                                  ? "bg-white/20 text-highlight-light"
                                  : isIcd
                                    ? "bg-primary/10 text-primary"
                                    : "bg-surface-subtle text-muted",
                              )}
                            >
                              <MapPin className="h-4 w-4" aria-hidden="true" />
                            </span>

                            <span className="font-body text-sm font-bold tracking-tight">
                              {node.name}
                            </span>
                          </div>

                          <div className="shrink-0 text-right">
                            <span
                              className={cn(
                                "inline-block whitespace-nowrap font-body text-sm font-extrabold tabular-nums",
                                isPort
                                  ? "text-highlight-light"
                                  : "text-primary",
                              )}
                            >
                              {node.distanceText}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CỘT PHẢI: BẢN ĐỒ TO RA (lg:col-span-8), HỖ TRỢ PHÓNG TO TOÀN MÀN HÌNH, CUỘN CHUỘT ZOOM */}
              <div ref={rightColRef} className="will-change-transform lg:col-span-8">
                <EwecMap nodeLabels={nodeLabels} />
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: BẢN ĐỒ CỰ LY 6 KHU CÔNG NGHIỆP */}
          <TabsContent value="zones" className="mt-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              {/* CỘT TRÁI: DANH SÁCH 6 KCN (Bỏ title, bỏ description, danh sách tinh gọn) */}
              <div className="flex flex-col justify-between rounded-none border border-border bg-surface-subtle p-6 sm:p-8 lg:col-span-4">
                <div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {zones.map((zone) => {
                      const isSelected = zone.id === selectedZoneId;
                      return (
                        <button
                          key={zone.id}
                          type="button"
                          onClick={() => setSelectedZoneId(zone.id)}
                          className={cn(
                            "flex items-center justify-between rounded-none border p-4 text-left transition-all duration-200",
                            isSelected
                              ? "border-primary bg-primary text-white shadow-lg"
                              : "border-border bg-white text-ink hover:border-primary/50",
                          )}
                        >
                          <div>
                            <span
                              className={cn(
                                "font-body text-[11px] font-bold uppercase",
                                isSelected ? "text-white/80" : "text-muted",
                              )}
                            >
                              {zone.province}
                            </span>
                            <p className="font-body text-sm font-bold">{zone.name}</p>
                          </div>

                          <div className="text-right">
                            <span
                              className={cn(
                                "font-body text-xl font-extrabold tabular-nums",
                                isSelected ? "text-highlight-light" : "text-primary",
                              )}
                            >
                              {zone.distanceText}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {advantageNote && (
                  <p className="mt-6 border-t border-border pt-4 font-body text-xs leading-relaxed text-muted">
                    {advantageNote}
                  </p>
                )}
              </div>

              {/* CỘT PHẢI: BẢN ĐỒ CỰ LY 6 KCN (lg:col-span-8) */}
              <div className="lg:col-span-8">
                <IndustrialZoneMap
                  selectedZoneId={selectedZoneId}
                  onSelectZone={setSelectedZoneId}
                  portLabel={portLabel}
                  zoneLabels={zoneLabels}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
