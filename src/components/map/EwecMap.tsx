"use client";

import { useRef, useState } from "react";
import Map, { Layer, Marker, NavigationControl, Source, type MapRef } from "react-map-gl/maplibre";
import { Maximize2, Minimize2 } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  chanMayPortCoordinates,
  ewecNodes,
  laoBaoIcdCoordinates,
} from "@/data/industrial-zones";

type EwecMapProps = {
  nodeLabels: Record<string, { name: string; country: string; distanceText?: string }>;
};

const DEFAULT_MAP_STYLE =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ||
  "https://tiles.openfreemap.org/styles/liberty";

const ewecRouteGeoJson = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: { route: "main-ewec" },
      geometry: {
        type: "LineString" as const,
        coordinates: [
          [102.835, 16.441], // Northeast Thailand
          [104.756, 16.556], // Southern Laos
          laoBaoIcdCoordinates, // ICD Lao Bao
          chanMayPortCoordinates, // VSICO Hue Port
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: { route: "cambodia-branch" },
      geometry: {
        type: "LineString" as const,
        coordinates: [
          [105.968, 13.525], // Northern Cambodia
          laoBaoIcdCoordinates, // ICD Lao Bao
          chanMayPortCoordinates, // VSICO Hue Port
        ],
      },
    },
  ],
};

export default function EwecMap({ nodeLabels }: EwecMapProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const mapRef = useRef<MapRef>(null);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
    setTimeout(() => {
      mapRef.current?.resize();
    }, 300);
  };

  return (
    <div
      data-lenis-prevent
      className={
        isExpanded
          ? "fixed inset-4 z-50 overflow-hidden rounded-none border-2 border-border bg-[#0B0A14] shadow-2xl transition-all duration-300 md:inset-8"
          : "relative h-[500px] w-full overflow-hidden rounded-none border border-border bg-[#0B0A14] transition-all duration-300 sm:h-[560px] lg:h-[620px]"
      }
    >
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 105.8,
          latitude: 15.6,
          zoom: 5.7,
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
            className="flex items-center gap-2 rounded-none border border-white/20 bg-ink/90 px-3.5 py-2 font-body text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:border-highlight-light hover:bg-primary hover:text-white"
            aria-label={isExpanded ? "Thu nhỏ bản đồ" : "Mở rộng bản đồ"}
          >
            {isExpanded ? (
              <>
                <Minimize2 className="h-4 w-4 text-highlight-light" />
                <span>Thu nhỏ bản đồ</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4 text-highlight-light" />
                <span>Mở rộng bản đồ</span>
              </>
            )}
          </button>
        </div>

        <Source id="ewec-routes" type="geojson" data={ewecRouteGeoJson}>
          <Layer
            id="ewec-route-glow"
            type="line"
            paint={{
              "line-color": "#5b21b6",
              "line-width": 10,
              "line-opacity": 0.45,
            }}
          />
          <Layer
            id="ewec-route-line"
            type="line"
            paint={{
              "line-color": "#f59e0b",
              "line-width": 3.5,
              "line-dasharray": [2, 1.5],
            }}
          />
        </Source>

        {ewecNodes.map((node) => {
          const isPort = node.role === "gateway-port";
          const isIcd = node.role === "border-icd";
          const label = nodeLabels[node.id];

          return (
            <Marker
              key={node.id}
              longitude={node.coordinates[0]}
              latitude={node.coordinates[1]}
              anchor="bottom"
            >
              <div className="group flex flex-col items-center">
                <div
                  className={
                    isPort
                      ? "rounded-full border-2 border-highlight-light bg-primary px-3.5 py-1.5 font-body text-xs font-bold tracking-wide text-white shadow-[0_4px_16px_rgba(91,33,182,0.6)]"
                      : isIcd
                        ? "rounded-full border border-primary-light bg-[#240A40]/95 px-3 py-1 font-body text-[11px] font-semibold text-highlight-light shadow-md"
                        : "rounded-full border border-white/30 bg-[#16052B]/90 px-2.5 py-0.5 font-body text-[11px] font-medium text-white shadow-sm"
                  }
                >
                  {label?.name ?? node.id}
                </div>
                <span
                  className={
                    isPort
                      ? "mt-1 h-4 w-4 rounded-full border-2 border-white bg-highlight-light shadow-[0_0_18px_rgba(245,158,11,1)]"
                      : isIcd
                        ? "mt-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-primary-light shadow-[0_0_10px_rgba(109,40,217,0.8)]"
                        : "mt-1 h-2.5 w-2.5 rounded-full border border-white bg-white/90"
                  }
                />
              </div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
