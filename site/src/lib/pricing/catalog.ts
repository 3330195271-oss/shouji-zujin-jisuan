import type {
  ConditionType,
  Product,
  ProductCategory,
  ProductFilterSelection,
} from "@/lib/pricing/types";

type VariantSeed = {
  storageLabel: string;
  basePrice: number;
};

type FamilySeed = {
  category: ProductCategory;
  launchDate: string;
  series: string;
  conditionTypes: ConditionType[];
  variants: VariantSeed[];
};

const PHONE_FAMILIES: FamilySeed[] = [
  {
    category: "phone",
    launchDate: "2025-09-19",
    series: "iPhone 17 Pro Max",
    conditionTypes: ["new", "used"],
    variants: [
      { storageLabel: "256GB", basePrice: 9999 },
      { storageLabel: "512GB", basePrice: 11999 },
      { storageLabel: "1TB", basePrice: 13999 },
      { storageLabel: "2TB", basePrice: 17999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2025-09-19",
    series: "iPhone 17 Pro",
    conditionTypes: ["new", "used"],
    variants: [
      { storageLabel: "256GB", basePrice: 8999 },
      { storageLabel: "512GB", basePrice: 10999 },
      { storageLabel: "1TB", basePrice: 12999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2025-09-19",
    series: "iPhone 17 Air",
    conditionTypes: ["new", "used"],
    variants: [
      { storageLabel: "256GB", basePrice: 7999 },
      { storageLabel: "512GB", basePrice: 9999 },
      { storageLabel: "1TB", basePrice: 11999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2025-09-19",
    series: "iPhone 17E",
    conditionTypes: ["new", "used"],
    variants: [
      { storageLabel: "256GB", basePrice: 4499 },
      { storageLabel: "512GB", basePrice: 6499 },
    ],
  },
  {
    category: "phone",
    launchDate: "2025-09-19",
    series: "iPhone 17",
    conditionTypes: ["new", "used"],
    variants: [
      { storageLabel: "256GB", basePrice: 5999 },
      { storageLabel: "512GB", basePrice: 7999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2024-09-20",
    series: "iPhone 16 Pro Max",
    conditionTypes: ["new", "used"],
    variants: [
      { storageLabel: "256GB", basePrice: 9999 },
      { storageLabel: "512GB", basePrice: 11999 },
      { storageLabel: "1TB", basePrice: 13999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2024-09-20",
    series: "iPhone 16 Pro",
    conditionTypes: ["new", "used"],
    variants: [
      { storageLabel: "128GB", basePrice: 7999 },
      { storageLabel: "256GB", basePrice: 8999 },
      { storageLabel: "512GB", basePrice: 10999 },
      { storageLabel: "1TB", basePrice: 12999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2024-09-20",
    series: "iPhone 16 Plus",
    conditionTypes: ["new", "used"],
    variants: [
      { storageLabel: "128GB", basePrice: 6999 },
      { storageLabel: "256GB", basePrice: 7999 },
      { storageLabel: "512GB", basePrice: 9999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2024-09-20",
    series: "iPhone 16",
    conditionTypes: ["new", "used"],
    variants: [
      { storageLabel: "128GB", basePrice: 5999 },
      { storageLabel: "256GB", basePrice: 6999 },
      { storageLabel: "512GB", basePrice: 8999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2023-09-22",
    series: "iPhone 15 Pro Max",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "256GB", basePrice: 9999 },
      { storageLabel: "512GB", basePrice: 11999 },
      { storageLabel: "1TB", basePrice: 13999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2023-09-22",
    series: "iPhone 15 Pro",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 7999 },
      { storageLabel: "256GB", basePrice: 8999 },
      { storageLabel: "512GB", basePrice: 10999 },
      { storageLabel: "1TB", basePrice: 12999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2023-09-22",
    series: "iPhone 15 Plus",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 6999 },
      { storageLabel: "256GB", basePrice: 7999 },
      { storageLabel: "512GB", basePrice: 9999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2023-09-22",
    series: "iPhone 15",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 5999 },
      { storageLabel: "256GB", basePrice: 6999 },
      { storageLabel: "512GB", basePrice: 8999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2022-09-16",
    series: "iPhone 14 Pro Max",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 8999 },
      { storageLabel: "256GB", basePrice: 9899 },
      { storageLabel: "512GB", basePrice: 11399 },
      { storageLabel: "1TB", basePrice: 12999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2022-09-16",
    series: "iPhone 14 Pro",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 7999 },
      { storageLabel: "256GB", basePrice: 8999 },
      { storageLabel: "512GB", basePrice: 10699 },
      { storageLabel: "1TB", basePrice: 12499 },
    ],
  },
  {
    category: "phone",
    launchDate: "2022-09-16",
    series: "iPhone 14 Plus",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 6999 },
      { storageLabel: "256GB", basePrice: 7899 },
      { storageLabel: "512GB", basePrice: 9699 },
    ],
  },
  {
    category: "phone",
    launchDate: "2022-09-16",
    series: "iPhone 14",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 5999 },
      { storageLabel: "256GB", basePrice: 6899 },
      { storageLabel: "512GB", basePrice: 8699 },
    ],
  },
  {
    category: "phone",
    launchDate: "2021-09-24",
    series: "iPhone 13 Pro Max",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 8999 },
      { storageLabel: "256GB", basePrice: 9799 },
      { storageLabel: "512GB", basePrice: 11399 },
      { storageLabel: "1TB", basePrice: 12999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2021-09-24",
    series: "iPhone 13 Pro",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 7999 },
      { storageLabel: "256GB", basePrice: 8799 },
      { storageLabel: "512GB", basePrice: 10399 },
      { storageLabel: "1TB", basePrice: 11999 },
    ],
  },
  {
    category: "phone",
    launchDate: "2021-09-24",
    series: "iPhone 13 mini",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 5199 },
      { storageLabel: "256GB", basePrice: 5999 },
      { storageLabel: "512GB", basePrice: 7599 },
    ],
  },
  {
    category: "phone",
    launchDate: "2021-09-24",
    series: "iPhone 13",
    conditionTypes: ["used"],
    variants: [
      { storageLabel: "128GB", basePrice: 5999 },
      { storageLabel: "256GB", basePrice: 6799 },
      { storageLabel: "512GB", basePrice: 8399 },
    ],
  },
];

const TABLET_FAMILIES: FamilySeed[] = [
  {
    category: "tablet",
    launchDate: "2025-03-12",
    series: "iPad",
    conditionTypes: ["new"],
    variants: [{ storageLabel: "标准版", basePrice: 3999 }],
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function buildCatalog() {
  let sortOrder = 0;

  return [...PHONE_FAMILIES, ...TABLET_FAMILIES].flatMap((family) =>
    family.conditionTypes.flatMap((conditionType) =>
      family.variants.map((variant) => {
        sortOrder += 1;

        return {
          id: `apple-${slugify(family.series)}-${slugify(variant.storageLabel)}-${conditionType}`,
          category: family.category,
          conditionType,
          brand: "Apple",
          series: family.series,
          model:
            family.category === "tablet"
              ? `${family.series} 平板`
              : `${family.series} ${variant.storageLabel}`,
          storageLabel: variant.storageLabel,
          launchDate: family.launchDate,
          basePrice: variant.basePrice,
          isActive: true,
          sortOrder,
        } satisfies Product;
      }),
    ),
  );
}

export const PRODUCTS = buildCatalog();

export function getActiveProducts() {
  return PRODUCTS.filter((product) => product.isActive);
}

export function filterProducts(selection: ProductFilterSelection = {}) {
  return getActiveProducts().filter((product) => {
    if (selection.category && product.category !== selection.category) {
      return false;
    }

    if (
      selection.conditionType &&
      product.conditionType !== selection.conditionType
    ) {
      return false;
    }

    if (selection.series && product.series !== selection.series) {
      return false;
    }

    if (
      selection.storageLabel &&
      product.storageLabel !== selection.storageLabel
    ) {
      return false;
    }

    return true;
  });
}

export function getProductById(id: string) {
  return getActiveProducts().find((product) => product.id === id) ?? null;
}

export function getCatalogMetadata() {
  const products = getActiveProducts();
  const categories = Array.from(new Set(products.map((product) => product.category)));
  const conditionTypes = Array.from(
    new Set(products.map((product) => product.conditionType)),
  );
  const series = Array.from(new Set(products.map((product) => product.series)));
  const storageLabels = Array.from(
    new Set(products.map((product) => product.storageLabel)),
  );

  return {
    categories,
    conditionTypes,
    series,
    storageLabels,
  };
}
