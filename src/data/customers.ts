import type { ContentStatus } from "./stats";

export type Customer = {
  id: string;
  name: string;
  sectorKey: "automotive" | "electronics" | "fmcg" | "chanMayRegional";
  logo: string;
  status: ContentStatus;
};

// TODO(content): Xác nhận quyền hiển thị công khai logo của từng khách hàng trước khi chuyển status sang "confirmed"
export const groupCustomers: Customer[] = [
  {
    id: "honda",
    name: "Honda",
    sectorKey: "automotive",
    logo: "/logos/customers/tmp-customer-honda.svg",
    status: "pending",
  },
  {
    id: "yamaha",
    name: "Yamaha",
    sectorKey: "automotive",
    logo: "/logos/customers/tmp-customer-yamaha.svg",
    status: "pending",
  },
  {
    id: "toyota",
    name: "Toyota",
    sectorKey: "automotive",
    logo: "/logos/customers/tmp-customer-toyota.svg",
    status: "pending",
  },
  {
    id: "hyundai",
    name: "Hyundai",
    sectorKey: "automotive",
    logo: "/logos/customers/tmp-customer-hyundai.svg",
    status: "pending",
  },
  {
    id: "vinfast",
    name: "VinFast",
    sectorKey: "automotive",
    logo: "/logos/customers/tmp-customer-vinfast.svg",
    status: "pending",
  },
  {
    id: "mazda",
    name: "Mazda",
    sectorKey: "automotive",
    logo: "/logos/customers/tmp-customer-mazda.svg",
    status: "pending",
  },
  {
    id: "kia",
    name: "KIA",
    sectorKey: "automotive",
    logo: "/logos/customers/tmp-customer-kia.svg",
    status: "pending",
  },
  {
    id: "samsung",
    name: "Samsung",
    sectorKey: "electronics",
    logo: "/logos/customers/tmp-customer-samsung.svg",
    status: "pending",
  },
  {
    id: "lg",
    name: "LG",
    sectorKey: "electronics",
    logo: "/logos/customers/tmp-customer-lg.svg",
    status: "pending",
  },
  {
    id: "foxconn",
    name: "Foxconn",
    sectorKey: "electronics",
    logo: "/logos/customers/tmp-customer-foxconn.svg",
    status: "pending",
  },
  {
    id: "panasonic",
    name: "Panasonic",
    sectorKey: "electronics",
    logo: "/logos/customers/tmp-customer-panasonic.svg",
    status: "pending",
  },
  {
    id: "canon",
    name: "Canon",
    sectorKey: "electronics",
    logo: "/logos/customers/tmp-customer-canon.svg",
    status: "pending",
  },
  {
    id: "sunhouse",
    name: "Sunhouse",
    sectorKey: "electronics",
    logo: "/logos/customers/tmp-customer-sunhouse.svg",
    status: "pending",
  },
  {
    id: "karofi",
    name: "Karofi",
    sectorKey: "electronics",
    logo: "/logos/customers/tmp-customer-karofi.svg",
    status: "pending",
  },
  {
    id: "kangaroo",
    name: "Kangaroo",
    sectorKey: "electronics",
    logo: "/logos/customers/tmp-customer-kangaroo.svg",
    status: "pending",
  },
  {
    id: "masan",
    name: "Masan Consumer",
    sectorKey: "fmcg",
    logo: "/logos/customers/tmp-customer-masan.svg",
    status: "pending",
  },
  {
    id: "vinamilk",
    name: "Vinamilk",
    sectorKey: "fmcg",
    logo: "/logos/customers/tmp-customer-vinamilk.svg",
    status: "pending",
  },
  {
    id: "coca-cola",
    name: "Coca-Cola",
    sectorKey: "fmcg",
    logo: "/logos/customers/tmp-customer-cocacola.svg",
    status: "pending",
  },
  {
    id: "pepsi",
    name: "Pepsi",
    sectorKey: "fmcg",
    logo: "/logos/customers/tmp-customer-pepsi.svg",
    status: "pending",
  },
  {
    id: "acecook",
    name: "Acecook",
    sectorKey: "fmcg",
    logo: "/logos/customers/tmp-customer-acecook.svg",
    status: "pending",
  },
  {
    id: "vifon",
    name: "Vifon",
    sectorKey: "fmcg",
    logo: "/logos/customers/tmp-customer-vifon.svg",
    status: "pending",
  },
  {
    id: "ajinomoto",
    name: "Ajinomoto",
    sectorKey: "fmcg",
    logo: "/logos/customers/tmp-customer-ajinomoto.svg",
    status: "pending",
  },
  {
    id: "pg",
    name: "P&G",
    sectorKey: "fmcg",
    logo: "/logos/customers/tmp-customer-pg.svg",
    status: "pending",
  },
  {
    id: "dutch-lady",
    name: "Dutch Lady",
    sectorKey: "fmcg",
    logo: "/logos/customers/tmp-customer-dutchlady.svg",
    status: "pending",
  },
];

export const chanMayCustomers: Customer[] = [
  {
    id: "shaiyo-aa",
    name: "SHAIYO-AA",
    sectorKey: "chanMayRegional",
    logo: "/logos/customers/tmp-customer-shaiyo.svg",
    status: "pending",
  },
  {
    id: "kim-long-motor",
    name: "KIM LONG MOTOR",
    sectorKey: "chanMayRegional",
    logo: "/logos/customers/tmp-customer-kimlong.svg",
    status: "pending",
  },
  {
    id: "america-quartz",
    name: "AMERICA QUARTZ TECHNOLOGY CO., LTD",
    sectorKey: "chanMayRegional",
    logo: "/logos/customers/tmp-customer-america-quartz.svg",
    status: "pending",
  },
  {
    id: "billion-max",
    name: "BILLION MAX",
    sectorKey: "chanMayRegional",
    logo: "/logos/customers/tmp-customer-billion-max.svg",
    status: "pending",
  },
  {
    id: "jon72",
    name: "CÔNG TY TNHH JON72 VIỆT NAM",
    sectorKey: "chanMayRegional",
    logo: "/logos/customers/tmp-customer-jon72.svg",
    status: "pending",
  },
  {
    id: "malpensa-plant",
    name: "CÔNG TY TNHH MALPENSA PLANT VIỆT NAM",
    sectorKey: "chanMayRegional",
    logo: "/logos/customers/tmp-customer-malpensa.svg",
    status: "pending",
  },
  {
    id: "okura",
    name: "CÔNG TY TNHH OKURA VIỆT NAM",
    sectorKey: "chanMayRegional",
    logo: "/logos/customers/tmp-customer-okura.svg",
    status: "pending",
  },
];
