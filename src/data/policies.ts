import type { ContentStatus } from "./stats";

export type HueCitySupportPolicies = {
  shippingLinePerTripVnd: number;
  shippingLinePerTripApproxUsd: number;
  shippingLineMinTripsPerMonth: number;
  cargoOwner20ftVnd: number;
  cargoOwner20ftApproxUsd: number;
  cargoOwner40ftVnd: number;
  cargoOwner40ftApproxUsd: number;
  validityStatus: ContentStatus;
};

export type VsicoCommercialPolicies = {
  shippingLineBenefitKeys: string[];
  cargoOwnerBenefitKeys: string[];
};

export const hueCitySupportPolicies: HueCitySupportPolicies = {
  shippingLinePerTripVnd: 210_000_000,
  shippingLinePerTripApproxUsd: 8_000,
  shippingLineMinTripsPerMonth: 2,
  cargoOwner20ftVnd: 800_000,
  cargoOwner20ftApproxUsd: 32,
  cargoOwner40ftVnd: 1_100_000,
  cargoOwner40ftApproxUsd: 44,
  // TODO(content): Xác nhận thời hạn hiệu lực chính thức của chính sách hỗ trợ từ TP. Huế
  validityStatus: "pending",
};

export const vsicoCommercialPolicies: VsicoCommercialPolicies = {
  shippingLineBenefitKeys: [
    "commercial.shipping.liftOnOff",
    "commercial.shipping.demDet",
    "commercial.shipping.berthPriority",
    "commercial.shipping.agencyFeeSupport",
    "commercial.shipping.otherOwnerPolicies",
  ],
  cargoOwnerBenefitKeys: [
    "commercial.cargo.icdLiftOnOff",
    "commercial.cargo.demDet",
    "commercial.cargo.icdCustomsSupport",
    "commercial.cargo.portCustomsSupport",
  ],
};
