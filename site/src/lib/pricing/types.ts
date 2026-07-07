export type ProductCategory = "phone" | "tablet";

export type ConditionType = "new" | "used" | "refurbished";

export type AgeBucket =
  | "lte_13_months"
  | "gt_13_lte_25_months"
  | "gt_25_lte_37_months"
  | "gt_37_months";

export interface Product {
  id: string;
  category: ProductCategory;
  conditionType: ConditionType;
  brand: "Apple";
  series: string;
  model: string;
  storageLabel: string;
  launchDate: string;
  basePrice: number;
  isActive: boolean;
  sortOrder: number;
}

export interface ProductFilterSelection {
  category?: ProductCategory;
  conditionType?: ConditionType;
  series?: string;
  storageLabel?: string;
}

export interface PricingRule {
  id: string;
  conditionType: ConditionType;
  ageBucket: AgeBucket;
  rentRate: number;
  costRate: number;
  residualMinRate: number;
  residualMaxRate: number;
  effectiveFrom: string;
  effectiveTo?: string;
}
