"use client";

import { useState, useTransition } from "react";

import { calculateQuote } from "@/lib/pricing/engine";
import type { QuoteResult } from "@/lib/pricing/engine";
import type { ConditionType, Product, ProductCategory } from "@/lib/pricing/types";
import { PricingFilters } from "@/components/pricing/pricing-filters";
import { PricingResults } from "@/components/pricing/pricing-results";

import styles from "./pricing-calculator.module.css";

const CATEGORY_LABELS = {
  phone: "手机",
  tablet: "iPad",
} as const;

const CONDITION_LABELS = {
  new: "新机",
  used: "二手",
  refurbished: "资源机",
} as const;

interface PricingCalculatorProps {
  initialProducts: Product[];
}

function uniqueValues(items: string[]) {
  return Array.from(new Set(items));
}

export function PricingCalculator({
  initialProducts,
}: PricingCalculatorProps) {
  function getConditionOptions(category: ProductCategory) {
    return uniqueValues(
      initialProducts
        .filter((product) => product.category === category)
        .map((product) => product.conditionType),
    ).map((value) => ({
      value: value as ConditionType,
      label: CONDITION_LABELS[value as ConditionType],
    }));
  }

  function getSeriesOptions(
    category: ProductCategory,
    conditionType: ConditionType,
  ) {
    return uniqueValues(
      initialProducts
        .filter(
          (product) =>
            product.category === category &&
            product.conditionType === conditionType,
        )
        .map((product) => product.series),
    ).map((value) => ({
      value,
      label: value,
    }));
  }

  function getStorageOptions(
    category: ProductCategory,
    conditionType: ConditionType,
    series: string,
  ) {
    return uniqueValues(
      initialProducts
        .filter(
          (product) =>
            product.category === category &&
            product.conditionType === conditionType &&
            product.series === series,
        )
        .map((product) => product.storageLabel),
    ).map((value) => ({
      value,
      label: value,
    }));
  }

  function findProduct(
    category: ProductCategory,
    conditionType: ConditionType,
    series: string,
    storageLabel: string,
  ) {
    return (
      initialProducts.find(
        (product) =>
          product.category === category &&
          product.conditionType === conditionType &&
          product.series === series &&
          product.storageLabel === storageLabel,
      ) ?? null
    );
  }

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    initialProducts[0]?.category ?? "phone",
  );
  const [selectedConditionType, setSelectedConditionType] =
    useState<ConditionType>(initialProducts[0]?.conditionType ?? "new");
  const [selectedSeries, setSelectedSeries] = useState(
    initialProducts[0]?.series ?? "",
  );
  const [selectedStorageLabel, setSelectedStorageLabel] = useState(
    initialProducts[0]?.storageLabel ?? "",
  );
  const [inputPrice, setInputPrice] = useState(
    String(initialProducts[0]?.basePrice ?? ""),
  );
  const [downPaymentRatio, setDownPaymentRatio] = useState("35");
  const [customFirstPay, setCustomFirstPay] = useState("");
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const categoryOptions = uniqueValues(
    initialProducts.map((product) => product.category),
  ).map((value) => ({
    value: value as ProductCategory,
    label: CATEGORY_LABELS[value as ProductCategory],
  }));

  const conditionOptions = getConditionOptions(selectedCategory);
  const activeConditionType =
    conditionOptions.find((option) => option.value === selectedConditionType)
      ?.value ?? conditionOptions[0]?.value ?? "new";
  const seriesOptions = getSeriesOptions(selectedCategory, activeConditionType);
  const activeSeries =
    seriesOptions.find((option) => option.value === selectedSeries)?.value ??
    seriesOptions[0]?.value ??
    "";
  const storageOptions = getStorageOptions(
    selectedCategory,
    activeConditionType,
    activeSeries,
  );
  const activeStorageLabel =
    storageOptions.find((option) => option.value === selectedStorageLabel)
      ?.value ??
    storageOptions[0]?.value ??
    "";
  const selectedProduct = findProduct(
    selectedCategory,
    activeConditionType,
    activeSeries,
    activeStorageLabel,
  );

  function commitSelection(
    category: ProductCategory,
    conditionType: ConditionType,
    series: string,
    storageLabel: string,
  ) {
    const nextProduct = findProduct(category, conditionType, series, storageLabel);

    setSelectedCategory(category);
    setSelectedConditionType(conditionType);
    setSelectedSeries(series);
    setSelectedStorageLabel(storageLabel);
    setInputPrice(String(nextProduct?.basePrice ?? ""));
    setCustomFirstPay("");
    setQuote(null);
    setError(null);
  }

  function handleCategoryChange(category: ProductCategory) {
    const nextCondition = getConditionOptions(category)[0]?.value ?? "new";
    const nextSeries = getSeriesOptions(category, nextCondition)[0]?.value ?? "";
    const nextStorage =
      getStorageOptions(category, nextCondition, nextSeries)[0]?.value ?? "";

    commitSelection(category, nextCondition, nextSeries, nextStorage);
  }

  function handleConditionTypeChange(conditionType: ConditionType) {
    const nextSeries =
      getSeriesOptions(selectedCategory, conditionType)[0]?.value ?? "";
    const nextStorage =
      getStorageOptions(selectedCategory, conditionType, nextSeries)[0]?.value ??
      "";

    commitSelection(selectedCategory, conditionType, nextSeries, nextStorage);
  }

  function handleSeriesChange(series: string) {
    const nextStorage =
      getStorageOptions(selectedCategory, activeConditionType, series)[0]
        ?.value ?? "";

    commitSelection(
      selectedCategory,
      activeConditionType,
      series,
      nextStorage,
    );
  }

  function handleStorageLabelChange(storageLabel: string) {
    commitSelection(
      selectedCategory,
      activeConditionType,
      activeSeries,
      storageLabel,
    );
  }

  async function handleQuoteRequest() {
    if (!selectedProduct) {
      return;
    }

    setError(null);

    try {
      const nextQuote = calculateQuote({
        product: selectedProduct,
        inputPrice: Number(inputPrice),
        downPaymentRatio: Number(downPaymentRatio),
        customFirstPay: customFirstPay ? Number(customFirstPay) : undefined,
        asOfDate: "2026-07-07",
      });

      startTransition(() => {
        setQuote(nextQuote);
      });
    } catch (quoteError) {
      setError(
        quoteError instanceof Error
          ? quoteError.message
          : "计算失败，请检查输入后重试。",
      );
      setQuote(null);
    }
  }

  return (
    <div className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.heroEyebrow}>手机租金计算</span>
          <h1 className={styles.heroTitle}>手机租金计算</h1>
          <p className={styles.heroBody}>
            选择机型并输入成交价，快速查看首付、月供、6期结清、9期结清和12期买断尾款。
          </p>
        </div>
        <div className={styles.heroMeta}>
          <span className={styles.heroChip}>规则基准：2026-06-01</span>
        </div>
      </section>

      <div className={styles.workspace}>
        <PricingFilters
          categoryOptions={categoryOptions}
          conditionOptions={conditionOptions}
          seriesOptions={seriesOptions}
          storageOptions={storageOptions}
          category={selectedCategory}
          conditionType={activeConditionType}
          series={activeSeries}
          storageLabel={activeStorageLabel}
          inputPrice={inputPrice}
          downPaymentRatio={downPaymentRatio}
          customFirstPay={customFirstPay}
          onCategoryChange={handleCategoryChange}
          onConditionTypeChange={handleConditionTypeChange}
          onSeriesChange={handleSeriesChange}
          onStorageLabelChange={handleStorageLabelChange}
          onInputPriceChange={setInputPrice}
          onDownPaymentRatioChange={setDownPaymentRatio}
          onCustomFirstPayChange={setCustomFirstPay}
        />

        <div className={styles.resultsColumn}>
          <div className={styles.ctaBar}>
            <div>
              <p className={styles.ctaLabel}>当前选择</p>
              <p className={styles.ctaValue}>
                {selectedProduct
                  ? `${selectedProduct.series} ${selectedProduct.storageLabel}`
                  : "请选择一个机型"}
              </p>
            </div>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => {
                void handleQuoteRequest();
              }}
            >
              {isPending ? "更新中..." : "立即试算"}
            </button>
          </div>

          <PricingResults
            product={selectedProduct}
            quote={quote}
            isPending={isPending}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
