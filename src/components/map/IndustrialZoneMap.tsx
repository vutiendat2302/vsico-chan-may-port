"use client";

import { useRef, useState } from "react";
import Map, { Layer, Marker, NavigationControl, Source, type MapRef } from "react-map-gl/maplibre";
import { Maximize2, Minimize2 } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import { chanMayPortCoordinates, industrialZones } from "@/data/industrial-zones";

type IndustrialZoneMapProps = {
  selectedZoneId: string;
  onSelectZone: (id: string) => void;
  portLabel: string;
  zoneLabels: Record<string, { name: string; province: string; distanceText: string }>;
};

const DEFAULT_MAP_STYLE =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ||
  "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

export default function IndustrialZoneMap({
  selectedZoneId,
  onSelectZone,
  portLabel,
  zoneLabels,
}: IndustrialZoneMapProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const mapRef = useRef<MapRef>(null);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
    setTimeout(() => {
      mapRef.current?.resize();
    }, 300);
  };

  const confirmedZones = industrialZones.filter((z) => z.status === "confirmed");
  const selectedZone =
    confirmedZones.find((z) => z.id === selectedZoneId) ?? confirmedZones[0];

  const allRoutesGeoJson = {
    type: "FeatureCollection" as const,
    features: confirmedZones.map((zone) => ({
      type: "Feature" as const,
      properties: {
        id: zone.id,
        active: zone.id === selectedZone.id,
      },
      geometry: {
        type: "LineString" as const,
        coordinates: [chanMayPortCoordinates, zone.coordinates],
      },
    })),
  };

  return (
    <div
      data-lenis-prevent
      className={
        isExpanded
          ? "fixed inset-4 z-50 overflow-hidden rounded-none border-2 border-border bg-white shadow-2xl transition-all duration-300 md:inset-8"
          : "relative h-[500px] w-full overflow-hidden rounded-none border border-border bg-surface-subtle transition-all duration-300 sm:h-[560px] lg:h-[620px]"
      }
    >
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 108.05,
          latitude: 16.05,
          zoom: 7.2,
        }}
        mapStyle={DEFAULT_MAP_STYLE}
        scrollZoom={true}
        dragPan={true}
        doubleClickZoom={true}
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" showCompass={false} />

        {/* Nút phóng to / thu nhỏ đặt trực tiếp trong góc bản đồ */}
        <div className="absolute top-3 left-3 z-10">
          <button
            type="button"
            onClick={toggleExpand}
            className="flex items-center gap-2 rounded-none border border-border bg-white/95 px-3.5 py-2 font-body text-xs font-semibold text-ink shadow-lg backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-white"
            aria-label={isExpanded ? "Thu nhỏ bản đồ" : "Mở rộng bản đồ"}
          >
            {isExpanded ? (
              <>
                <Minimize2 className="h-4 w-4 text-primary" />
                <span>Thu nhỏ bản đồ</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4 text-primary" />
                <span>Mở rộng bản đồ</span>
              </>
            )}
          </button>
        </div>

        <Source id="iz-routes" type="geojson" data={allRoutesGeoJson}>
          <Layer
            id="iz-route-inactive"
            type="line"
            filter={["==", ["get", "active"], false]}
            paint={{
              "line-color": "#94a3b8",
              "line-width": 2,
              "line-dasharray": [2, 2],
              "line-opacity": 0.6,
            }}
          />
          <Layer
            id="iz-route-active-glow"
            type="line"
            filter={["==", ["get", "active"], true]}
            paint={{
              "line-color": "#5b21b6",
              "line-width": 8,
              "line-opacity": 0.35,
            }}
          />
          <Layer
            id="iz-route-active"
            type="line"
            filter={["==", ["get", "active"], true]}
            paint={{
              "line-color": "#5b21b6",
              "line-width": 4,
            }}
          />
        </Source>

        {/* Marker Cảng VSICO Huế */}
        <Marker
          longitude={chanMayPortCoordinates[0]}
          latitude={chanMayPortCoordinates[1]}
          anchor="bottom"
        >
          <div className="flex flex-col items-center">
            <div className="rounded-full border-2 border-highlight-light bg-primary px-3.5 py-1.5 font-body text-xs font-bold tracking-wide text-white shadow-[0_4px_16px_rgba(91,33,182,0.6)]">
              {portLabel}
            </div>
            <span className="mt-1 h-4 w-4 rounded-full border-2 border-white bg-highlight-light shadow-[0_0_16px_rgba(245,158,11,1)]" />
          </div>
        </Marker>

        {/* Markers 6 KCN: Chỉ hiển thị tên, không hiển thị số km */}
        {confirmedZones.map((zone) => {
          const isSelected = zone.id === selectedZone.id;
          const info = zoneLabels[zone.id];

          return (
            <Marker
              key={zone.id}
              longitude={zone.coordinates[0]}
              latitude={zone.coordinates[1]}
              anchor="bottom"
            >
              <button
                type="button"
                onClick={() => onSelectZone(zone.id)}
                className="group flex cursor-pointer flex-col items-center focus:outline-none"
              >
                <span
                  className={
                    isSelected
                      ? "rounded-full border border-primary bg-primary px-3 py-1 font-body text-[11px] font-bold text-white shadow-md"
                      : "rounded-full border border-border bg-white/95 px-2.5 py-1 font-body text-[10px] font-semibold text-ink shadow-sm transition-colors group-hover:border-primary"
                  }
                >
                  {info?.name ?? zone.id}
                </span>
                <span
                  className={
                    isSelected
                      ? "mt-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-primary shadow"
                      : "mt-1 h-2.5 w-2.5 rounded-full border border-white bg-muted"
                  }
                />
              </button>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
