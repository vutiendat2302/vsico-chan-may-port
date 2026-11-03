"use client";

import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  chanMayPortCoordinates,
  ewecNodes,
  laoBaoIcdCoordinates,
} from "@/data/industrial-zones";

type EwecMapProps = {
  nodeLabels: Record<string, { name: string; country: string }>;
};

const DEFAULT_MAP_STYLE =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ||
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

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
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-border bg-ink sm:h-[480px]">
      <Map
        initialViewState={{
          longitude: 105.6,
          latitude: 15.6,
          zoom: 5.5,
        }}
        mapStyle={DEFAULT_MAP_STYLE}
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" showCompass={false} />

        <Source id="ewec-routes" type="geojson" data={ewecRouteGeoJson}>
          <Layer
            id="ewec-route-glow"
            type="line"
            paint={{
              "line-color": "#541991",
              "line-width": 8,
              "line-opacity": 0.35,
            }}
          />
          <Layer
            id="ewec-route-line"
            type="line"
            paint={{
              "line-color": "#f59e0b",
              "line-width": 3,
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
                      ? "rounded-full border border-highlight-light bg-primary px-3 py-1 font-label text-[11px] font-bold tracking-wider text-white shadow-lg"
                      : isIcd
                        ? "rounded-full border border-primary-light bg-[#240A40]/95 px-2.5 py-1 font-label text-[10px] font-semibold text-highlight-light shadow-md"
                        : "rounded-full border border-white/25 bg-[#16052B]/90 px-2.5 py-1 font-label text-[10px] font-medium text-white/90"
                  }
                >
                  {label?.name ?? node.id}
                </div>
                <span
                  className={
                    isPort
                      ? "mt-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-highlight-light shadow-[0_0_14px_rgba(245,158,11,1)]"
                      : isIcd
                        ? "mt-1 h-3 w-3 rounded-full border-2 border-white bg-primary-light"
                        : "mt-1 h-2.5 w-2.5 rounded-full border border-white bg-white/80"
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
