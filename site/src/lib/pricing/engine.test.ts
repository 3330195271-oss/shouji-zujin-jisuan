import { getProductById } from "@/lib/pricing/catalog";
import {
  calculateFirstPay,
  calculateQuote,
  getAgeBucket,
  getApplicableRule,
} from "@/lib/pricing/engine";

describe("pricing engine", () => {
  it("places dates on the correct age-bucket boundaries", () => {
    expect(getAgeBucket("2025-06-01", "2026-07-01")).toBe("lte_13_months");
    expect(getAgeBucket("2025-06-01", "2026-07-02")).toBe(
      "gt_13_lte_25_months",
    );
    expect(getAgeBucket("2024-06-01", "2026-07-02")).toBe(
      "gt_25_lte_37_months",
    );
    expect(getAgeBucket("2023-06-01", "2026-07-02")).toBe("gt_37_months");
  });

  it("adds a fixed 1 yuan first installment on top of the deposit", () => {
    expect(calculateFirstPay({ inputPrice: 10000, downPaymentRatio: 35 })).toBe(
      3501,
    );
    expect(calculateFirstPay({ inputPrice: 10000, customFirstPay: 2000 })).toBe(
      2001,
    );
  });

  it("finds the matching rule for a used iPhone 16 bucket", () => {
    const product = getProductById("apple-iphone-16-pro-256gb-used");

    const rule = getApplicableRule(product!, "2026-07-07");

    expect(rule).toMatchObject({
      conditionType: "used",
      ageBucket: "gt_13_lte_25_months",
      rentRate: 0.65,
      costRate: 0.95,
      residualMinRate: 0.25,
      residualMaxRate: 0.5,
    });
  });

  it("uses the Alipay upper residual bound as the 12-month buyout tail", () => {
    const product = getProductById("apple-iphone-16-pro-256gb-used");

    const quote = calculateQuote({
      product: product!,
      inputPrice: 10000,
      downPaymentRatio: 35,
      asOfDate: "2026-07-07",
    });

    expect(quote.ageBucket).toBe("gt_13_lte_25_months");
    expect(quote.firstPay).toBe(3501);
    expect(quote.rentCap).toBe(5849.35);
    expect(quote.buyoutTail).toBe(4499.5);
    expect(quote.monthly).toBe(531.67);
    expect(quote.settle9).toBe(6094.5);
    expect(quote.settle6).toBe(7689.51);
    expect(quote.settle12).toBe(4499.5);
  });

  it("does not let the deposit change the 11-period monthly rent schedule", () => {
    const product = getProductById("apple-iphone-17-256gb-new");

    const quote = calculateQuote({
      product: product!,
      inputPrice: 20000,
      customFirstPay: 5000,
      asOfDate: "2026-07-07",
    });

    expect(quote.firstPay).toBe(5001);
    expect(quote.monthly).toBe(436.2);
    expect(quote.settle12).toBe(3599.4);
  });
});
