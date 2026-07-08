import {
  filterProducts,
  getActiveProducts,
  getProductById,
} from "@/lib/pricing/catalog";

describe("pricing catalog", () => {
  it("returns active products across phone and tablet categories", () => {
    const products = getActiveProducts();

    expect(products.length).toBeGreaterThan(40);
    expect(products.some((product) => product.category === "phone")).toBe(true);
    expect(products.some((product) => product.category === "tablet")).toBe(true);
    expect(products[0]?.sortOrder).toBe(1);
  });

  it("filters products by category, condition, and series", () => {
    const products = filterProducts({
      category: "phone",
      conditionType: "used",
      series: "iPhone 15 Pro",
    });

    expect(products).toHaveLength(4);
    expect(products.every((product) => product.storageLabel.endsWith("GB") || product.storageLabel.endsWith("TB"))).toBe(true);
  });

  it("looks up a known product by id", () => {
    const product = getProductById("apple-iphone-16-pro-256gb-used");

    expect(product).toMatchObject({
      category: "phone",
      conditionType: "used",
      series: "iPhone 16 Pro",
      storageLabel: "256GB",
      basePrice: 8999,
      launchDate: "2024-09-20",
    });
  });

  it("includes legacy iPhone 12 and iPhone 11 used series", () => {
    const iphone12Pro = filterProducts({
      category: "phone",
      conditionType: "used",
      series: "iPhone 12 Pro",
    });
    const iphone11 = filterProducts({
      category: "phone",
      conditionType: "used",
      series: "iPhone 11",
    });
    const iphone11ProMax = getProductById("apple-iphone-11-pro-max-256gb-used");

    expect(iphone12Pro).toHaveLength(3);
    expect(iphone11).toHaveLength(3);
    expect(iphone11ProMax).toMatchObject({
      series: "iPhone 11 Pro Max",
      storageLabel: "256GB",
      basePrice: 10899,
      launchDate: "2019-09-20",
      conditionType: "used",
    });
  });
});
