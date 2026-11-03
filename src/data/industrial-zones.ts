import type { ContentStatus } from "./stats";

export type GeoCoordinates = [number, number]; // [lng, lat]

export type IndustrialZone = {
  id: string;
  nameKey: string;
  provinceKey: string;
  distanceKm: number;
  coordinates: GeoCoordinates;
  status: ContentStatus;
};

export type EwecNode = {
  id: string;
  nameKey: string;
  countryKey: string;
  coordinates: GeoCoordinates;
  role: "origin" | "border-icd" | "gateway-port";
};

export const chanMayPortCoordinates: GeoCoordinates = [107.989, 16.326];
export const laoBaoIcdCoordinates: GeoCoordinates = [106.597, 16.621];

export const ewecNodes: EwecNode[] = [
  {
    id: "chan-may-port",
    nameKey: "nodes.chanMayPort",
    countryKey: "countries.vietnam",
    coordinates: chanMayPortCoordinates,
    role: "gateway-port",
  },
  {
    id: "icd-lao-bao",
    nameKey: "nodes.icdLaoBao",
    countryKey: "countries.vietnam",
    coordinates: laoBaoIcdCoordinates,
    role: "border-icd",
  },
  {
    id: "southern-laos",
    nameKey: "nodes.southernLaos",
    countryKey: "countries.laos",
    coordinates: [104.756, 16.556],
    role: "origin",
  },
  {
    id: "northeast-thailand",
    nameKey: "nodes.northeastThailand",
    countryKey: "countries.thailand",
    coordinates: [102.835, 16.441],
    role: "origin",
  },
  {
    id: "northern-cambodia",
    nameKey: "nodes.northernCambodia",
    countryKey: "countries.cambodia",
    coordinates: [105.968, 13.525],
    role: "origin",
  },
];

export const industrialZones: IndustrialZone[] = [
  {
    id: "hoa-khanh",
    nameKey: "zones.hoaKhanh",
    provinceKey: "provinces.daNang",
    distanceKm: 35,
    coordinates: [108.144, 16.082],
    status: "confirmed",
  },
  {
    id: "da-nang",
    nameKey: "zones.daNang",
    provinceKey: "provinces.daNang",
    distanceKm: 46,
    coordinates: [108.234, 16.077],
    status: "confirmed",
  },
  {
    id: "phu-bai",
    nameKey: "zones.phuBai",
    provinceKey: "provinces.hue",
    distanceKm: 48,
    coordinates: [107.702, 16.398],
    status: "confirmed",
  },
  {
    id: "quang-tri",
    nameKey: "zones.quangTri",
    provinceKey: "provinces.quangTri",
    distanceKm: 117,
    coordinates: [107.228, 16.712],
    status: "confirmed",
  },
  {
    id: "bac-chu-lai",
    nameKey: "zones.bacChuLai",
    provinceKey: "provinces.quangNam",
    distanceKm: 134,
    coordinates: [108.604, 15.468],
    status: "confirmed",
  },
  {
    id: "vsip-quang-ngai",
    nameKey: "zones.vsipQuangNgai",
    provinceKey: "provinces.quangNgai",
    distanceKm: 167,
    coordinates: [108.821, 15.197],
    status: "confirmed",
  },
];
