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
});
