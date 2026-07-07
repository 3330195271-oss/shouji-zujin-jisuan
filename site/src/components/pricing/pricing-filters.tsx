import type { ConditionType, ProductCategory } from "@/lib/pricing/types";

import styles from "./pricing-calculator.module.css";

type Option = {
  value: string;
  label: string;
};

interface PricingFiltersProps {
  categoryOptions: Array<{ value: ProductCategory; label: string }>;
  conditionOptions: Array<{ value: ConditionType; label: string }>;
  seriesOptions: Option[];
  storageOptions: Option[];
  category: ProductCategory;
  conditionType: ConditionType;
  series: string;
  storageLabel: string;
  inputPrice: string;
  downPaymentRatio: string;
  customFirstPay: string;
  onCategoryChange: (value: ProductCategory) => void;
  onConditionTypeChange: (value: ConditionType) => void;
  onSeriesChange: (value: string) => void;
  onStorageLabelChange: (value: string) => void;
  onInputPriceChange: (value: string) => void;
  onDownPaymentRatioChange: (value: string) => void;
  onCustomFirstPayChange: (value: string) => void;
}

export function PricingFilters({
  categoryOptions,
  conditionOptions,
  seriesOptions,
  storageOptions,
  category,
  conditionType,
  series,
  storageLabel,
  inputPrice,
  downPaymentRatio,
  customFirstPay,
  onCategoryChange,
  onConditionTypeChange,
  onSeriesChange,
  onStorageLabelChange,
  onInputPriceChange,
  onDownPaymentRatioChange,
  onCustomFirstPayChange,
}: PricingFiltersProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelEyebrow}>产品筛选</span>
        <h2 className={styles.panelTitle}>按机型和金额试算租赁结果</h2>
      </div>

      <div className={styles.formGrid}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>产品分类</span>
          <select
            aria-label="产品分类"
            className={styles.select}
            value={category}
            onChange={(event) =>
              onCategoryChange(event.currentTarget.value as ProductCategory)
            }
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>成色</span>
          <select
            aria-label="成色"
            className={styles.select}
            value={conditionType}
            onChange={(event) =>
              onConditionTypeChange(event.currentTarget.value as ConditionType)
            }
          >
            {conditionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>系列</span>
          <select
            aria-label="系列"
            className={styles.select}
            value={series}
            onChange={(event) => onSeriesChange(event.currentTarget.value)}
          >
            {seriesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>容量</span>
          <select
            aria-label="容量"
            className={styles.select}
            value={storageLabel}
            onChange={(event) => onStorageLabelChange(event.currentTarget.value)}
          >
            {storageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>成交价</span>
          <input
            aria-label="成交价"
            className={styles.input}
            inputMode="decimal"
            type="number"
            min="0"
            value={inputPrice}
            onChange={(event) => onInputPriceChange(event.currentTarget.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>首付比例</span>
          <input
            aria-label="首付比例"
            className={styles.input}
            inputMode="decimal"
            type="number"
            min="0"
            max="100"
            value={downPaymentRatio}
            onChange={(event) =>
              onDownPaymentRatioChange(event.currentTarget.value)
            }
          />
        </label>

        <label className={`${styles.field} ${styles.fieldWide}`}>
          <span className={styles.fieldLabel}>自定义首付</span>
          <input
            aria-label="自定义首付"
            className={styles.input}
            inputMode="decimal"
            type="number"
            min="0"
            value={customFirstPay}
            onChange={(event) =>
              onCustomFirstPayChange(event.currentTarget.value)
            }
            placeholder="留空则按首付比例计算"
          />
        </label>
      </div>
    </section>
  );
}
