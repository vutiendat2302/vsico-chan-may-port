"use client";

import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl/maplibre";
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
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-border bg-surface-subtle sm:h-[480px]">
      <Map
        initialViewState={{
          longitude: 108.05,
          latitude: 16.05,
          zoom: 7.1,
        }}
        mapStyle={DEFAULT_MAP_STYLE}
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" showCompass={false} />

        <Source id="iz-routes" type="geojson" data={allRoutesGeoJson}>
          <Layer
            id="iz-route-inactive"
            type="line"
            filter={["==", ["get", "active"], false]}
            paint={{
              "line-color": "#64748b",
              "line-width": 2,
              "line-dasharray": [2, 2],
              "line-opacity": 0.55,
            }}
          />
          <Layer
            id="iz-route-active"
            type="line"
            filter={["==", ["get", "active"], true]}
            paint={{
              "line-color": "#3E116C",
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
            <div className="rounded-full border border-highlight-light bg-primary px-3 py-1 font-label text-[11px] font-bold tracking-wider text-white shadow-lg">
              {portLabel}
            </div>
            <span className="mt-1 h-4 w-4 rounded-full border-2 border-white bg-highlight-light shadow-md" />
          </div>
        </Marker>

        {/* Markers 6 KCN */}
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
                      ? "rounded-full border border-primary bg-primary px-3 py-1 font-label text-[10px] font-bold text-white shadow-md"
                      : "rounded-full border border-border bg-white/95 px-2.5 py-0.5 font-label text-[10px] font-semibold text-ink shadow-sm transition-colors group-hover:border-primary"
                  }
                >
                  {info?.name ?? zone.id} · {info?.distanceText}
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
