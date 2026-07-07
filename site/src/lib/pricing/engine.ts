import Decimal from "decimal.js";

import { PRICING_RULES } from "@/lib/pricing/rules";
import type { AgeBucket, PricingRule, Product } from "@/lib/pricing/types";

type DateInput = string | Date;

export interface QuoteInput {
  product: Product;
  inputPrice: number;
  downPaymentRatio?: number;
  customFirstPay?: number;
  asOfDate?: DateInput;
}

export interface QuoteResult {
  ageBucket: AgeBucket;
  rule: PricingRule;
  firstPay: number;
  rentCap: number;
  costCap: number;
  residualMin: number;
  residualMax: number;
  defaultResidualRate: number;
  buyoutTail: number;
  monthly: number;
  settle6: number;
  settle9: number;
  settle12: number;
}

function parseDateInput(value: DateInput) {
  if (value instanceof Date) {
    return new Date(
      Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()),
    );
  }

  const [year, month, day] = value.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}

function getDaysInMonth(year: number, monthIndex: number) {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

function addMonths(value: Date, months: number) {
  const year = value.getUTCFullYear();
  const monthIndex = value.getUTCMonth();
  const day = value.getUTCDate();
  const targetMonthIndex = monthIndex + months;
  const targetYear = year + Math.floor(targetMonthIndex / 12);
  const normalizedMonth = ((targetMonthIndex % 12) + 12) % 12;
  const targetDay = Math.min(
    day,
    getDaysInMonth(targetYear, normalizedMonth),
  );

  return new Date(Date.UTC(targetYear, normalizedMonth, targetDay));
}

function roundMoney(value: Decimal.Value) {
  return new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
}

function clampDecimal(
  value: Decimal,
  min: Decimal.Value,
  max: Decimal.Value,
) {
  return Decimal.min(Decimal.max(value, min), max);
}

export function getAgeBucket(launchDate: string, asOfDate: DateInput = new Date()) {
  const launch = parseDateInput(launchDate);
  const asOf = parseDateInput(asOfDate);

  if (asOf.getTime() <= addMonths(launch, 13).getTime()) {
    return "lte_13_months" satisfies AgeBucket;
  }

  if (asOf.getTime() <= addMonths(launch, 25).getTime()) {
    return "gt_13_lte_25_months" satisfies AgeBucket;
  }

  if (asOf.getTime() <= addMonths(launch, 37).getTime()) {
    return "gt_25_lte_37_months" satisfies AgeBucket;
  }

  return "gt_37_months" satisfies AgeBucket;
}

export function getApplicableRule(
  product: Product,
  asOfDate: DateInput = new Date(),
) {
  const ageBucket = getAgeBucket(product.launchDate, asOfDate);
  const asOf = parseDateInput(asOfDate);
  const matchedRules = PRICING_RULES.filter((rule) => {
    if (rule.conditionType !== product.conditionType) {
      return false;
    }

    if (rule.ageBucket !== ageBucket) {
      return false;
    }

    if (parseDateInput(rule.effectiveFrom).getTime() > asOf.getTime()) {
      return false;
    }

    if (
      rule.effectiveTo &&
      parseDateInput(rule.effectiveTo).getTime() < asOf.getTime()
    ) {
      return false;
    }

    return true;
  }).sort((left, right) => right.effectiveFrom.localeCompare(left.effectiveFrom));

  if (matchedRules.length === 0) {
    throw new Error(
      `No pricing rule for ${product.conditionType} in bucket ${ageBucket}.`,
    );
  }

  return matchedRules[0];
}

export function calculateFirstPay(input: {
  inputPrice: number;
  downPaymentRatio?: number;
  customFirstPay?: number;
}) {
  const base =
    input.customFirstPay !== undefined
      ? new Decimal(input.customFirstPay)
      : new Decimal(input.inputPrice)
          .mul(input.downPaymentRatio ?? 35)
          .div(100);

  return roundMoney(base.plus(1));
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const rule = getApplicableRule(input.product, input.asOfDate);
  const ageBucket = getAgeBucket(input.product.launchDate, input.asOfDate);
  const basePrice = new Decimal(input.product.basePrice);
  const firstPayExact =
    input.customFirstPay !== undefined
      ? new Decimal(input.customFirstPay).plus(1)
      : new Decimal(input.inputPrice)
          .mul(input.downPaymentRatio ?? 35)
          .div(100)
          .plus(1);
  const rentCap = basePrice.mul(rule.rentRate);
  const costCap = basePrice.mul(rule.costRate);
  const residualMin = basePrice.mul(rule.residualMinRate);
  const residualMax = basePrice.mul(rule.residualMaxRate);
  const defaultResidualRate = clampDecimal(
    new Decimal(rule.costRate).minus(rule.rentRate),
    rule.residualMinRate,
    rule.residualMaxRate,
  );
  const buyoutTail = basePrice.mul(defaultResidualRate);
  const monthly = Decimal.max(rentCap.minus(firstPayExact).div(11), 0);
  const settle9 = buyoutTail.plus(monthly.mul(3));
  const settle6 = buyoutTail.plus(monthly.mul(6));

  return {
    ageBucket,
    rule,
    firstPay: roundMoney(firstPayExact),
    rentCap: roundMoney(rentCap),
    costCap: roundMoney(costCap),
    residualMin: roundMoney(residualMin),
    residualMax: roundMoney(residualMax),
    defaultResidualRate: Number(defaultResidualRate.toFixed(4)),
    buyoutTail: roundMoney(buyoutTail),
    monthly: roundMoney(monthly),
    settle6: roundMoney(settle6),
    settle9: roundMoney(settle9),
    settle12: roundMoney(buyoutTail),
  };
}
