"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Compass, MapPin, Navigation } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";

const EwecMap = dynamic(() => import("@/components/map/EwecMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-3xl border border-border bg-ink/95 font-label text-xs tracking-widest text-white/70 uppercase sm:h-[480px]">
      EWEC Corridor Map...
    </div>
  ),
});

const IndustrialZoneMap = dynamic(() => import("@/components/map/IndustrialZoneMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-3xl border border-border bg-surface-subtle font-label text-xs tracking-widest text-muted uppercase sm:h-[480px]">
      Industrial Zones Map...
    </div>
  ),
});

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
};

type LocationClientProps = {
  mapTabEwecLabel: string;
  mapTabZonesLabel: string;
  ewecCorridorTitle: string;
  ewecCorridorDesc: string;
  industrialZonesTitle: string;
  selectZoneHint: string;
  advantageNote: string;
  portLabel: string;
  nodes: NodeDisplayItem[];
  zones: ZoneDisplayItem[];
};

export function LocationClient({
  mapTabEwecLabel,
  mapTabZonesLabel,
  ewecCorridorTitle,
  ewecCorridorDesc,
  industrialZonesTitle,
  selectZoneHint,
  advantageNote,
  portLabel,
  nodes,
  zones,
}: LocationClientProps) {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(
    zones[0]?.id ?? "hoa-khanh",
  );

  const nodeLabels = Object.fromEntries(
    nodes.map((n) => [n.id, { name: n.name, country: n.country }]),
  );

  const zoneLabels = Object.fromEntries(
    zones.map((z) => [
      z.id,
      { name: z.name, province: z.province, distanceText: z.distanceText },
    ]),
  );

  return (
    <div className="mt-12">
      <Tabs defaultValue="ewec" className="w-full">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <TabsList aria-label="Location Map Views">
            <TabsTrigger value="ewec" className="gap-2">
              <Compass className="h-4 w-4" aria-hidden="true" />
              <span>{mapTabEwecLabel}</span>
            </TabsTrigger>
            <TabsTrigger value="zones" className="gap-2">
              <Navigation className="h-4 w-4" aria-hidden="true" />
              <span>{mapTabZonesLabel}</span>
            </TabsTrigger>
          </TabsList>

          <p className="font-body text-xs font-medium text-muted sm:text-sm">
            {advantageNote}
          </p>
        </div>

        {/* Tab 1: Bản đồ Hành lang Kinh tế Đông - Tây (EWEC) */}
        <TabsContent value="ewec">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <EwecMap nodeLabels={nodeLabels} />
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-border bg-surface-subtle p-6 sm:p-8 lg:col-span-4">
              <div>
                <h3 className="font-heading text-2xl font-bold text-ink">
                  {ewecCorridorTitle}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                  {ewecCorridorDesc}
                </p>

                <ul className="mt-6 space-y-3">
                  {nodes.map((node) => {
                    const isPort = node.role === "gateway-port";
                    const isIcd = node.role === "border-icd";
                    return (
                      <li
                        key={node.id}
                        className={cn(
                          "flex items-center justify-between rounded-2xl border px-4 py-3",
                          isPort
                            ? "border-primary bg-primary text-white shadow-sm"
                            : isIcd
                              ? "border-primary/40 bg-white text-ink"
                              : "border-border bg-white/80 text-ink",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin
                            aria-hidden="true"
                            className={cn(
                              "h-4 w-4 shrink-0",
                              isPort ? "text-highlight-light" : "text-primary",
                            )}
                          />
                          <span className="font-body text-sm font-semibold">
                            {node.name}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "font-label text-[10px] font-semibold tracking-widest uppercase",
                            isPort ? "text-white/80" : "text-muted",
                          )}
                        >
                          {node.country}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Bản đồ cự ly 6 KCN miền Trung */}
        <TabsContent value="zones">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <IndustrialZoneMap
                selectedZoneId={selectedZoneId}
                onSelectZone={setSelectedZoneId}
                portLabel={portLabel}
                zoneLabels={zoneLabels}
              />
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-border bg-surface-subtle p-6 sm:p-8 lg:col-span-5">
              <div>
                <h3 className="font-heading text-2xl font-bold text-ink">
                  {industrialZonesTitle}
                </h3>
                <p className="mt-2 font-body text-xs text-muted">{selectZoneHint}</p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {zones.map((zone) => {
                    const isSelected = zone.id === selectedZoneId;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setSelectedZoneId(zone.id)}
                        className={cn(
                          "flex flex-col justify-between rounded-2xl border p-4 text-left transition-all",
                          isSelected
                            ? "border-primary bg-primary text-white shadow-md"
                            : "border-border bg-white text-ink hover:border-primary/50",
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={cn(
                              "font-label text-[10px] font-semibold tracking-widest uppercase",
                              isSelected ? "text-white/75" : "text-muted",
                            )}
                          >
                            {zone.province}
                          </span>
                          <Navigation
                            aria-hidden="true"
                            className={cn(
                              "h-3.5 w-3.5",
                              isSelected ? "text-highlight-light" : "text-primary",
                            )}
                          />
                        </div>
                        <p className="mt-2 font-body text-sm font-bold">{zone.name}</p>
                        <p
                          className={cn(
                            "mt-1 font-label text-2xl font-bold tabular-nums",
                            isSelected ? "text-highlight-light" : "text-primary",
                          )}
                        >
                          {zone.distanceText}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
