import type { QuoteResult } from "@/lib/pricing/engine";
import type { Product } from "@/lib/pricing/types";

import styles from "./pricing-calculator.module.css";

interface PricingResultsProps {
  product: Product | null;
  quote: QuoteResult | null;
  isPending: boolean;
  error: string | null;
}

const moneyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  minimumFractionDigits: 2,
});

function formatMoney(value: number) {
  return moneyFormatter.format(value);
}

function getConditionLabel(conditionType: Product["conditionType"]) {
  if (conditionType === "new") {
    return "新机";
  }

  if (conditionType === "used") {
    return "二手";
  }

  return "资源机";
}

export function PricingResults({
  product,
  quote,
  isPending,
  error,
}: PricingResultsProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelEyebrow}>试算结果</span>
        <h2 className={styles.panelTitle}>按当前结算规则输出可解释结果</h2>
      </div>

      {product ? (
        <div className={styles.productSummary}>
          <div>
            <p className={styles.productSeries}>{product.series}</p>
            <p className={styles.productMeta}>
              {getConditionLabel(product.conditionType)} · {product.storageLabel} ·
              基准价 {formatMoney(product.basePrice)}
            </p>
          </div>
          <span className={styles.productBadge}>
            上市日 {product.launchDate}
          </span>
        </div>
      ) : null}

      {error ? <p className={styles.errorText}>{error}</p> : null}

      {quote ? (
        <div className={styles.resultGrid}>
          <article className={styles.resultCard}>
            <span className={styles.resultLabel}>首付合计</span>
            <strong className={styles.resultValue}>
              {formatMoney(quote.firstPay)}
            </strong>
            <span className={styles.resultNote}>
              押金 {formatMoney(quote.deposit)} + 首期 {formatMoney(quote.firstInstallment)}
            </span>
          </article>
          <article className={styles.resultCard}>
            <span className={styles.resultLabel}>月供（11期）</span>
            <strong className={styles.resultValue}>
              {formatMoney(quote.monthly)}
            </strong>
          </article>
          <article className={styles.resultCard}>
            <span className={styles.resultLabel}>6期结清</span>
            <strong className={styles.resultValue}>
              {formatMoney(quote.settle6)}
            </strong>
          </article>
          <article className={styles.resultCard}>
            <span className={styles.resultLabel}>9期结清</span>
            <strong className={styles.resultValue}>
              {formatMoney(quote.settle9)}
            </strong>
          </article>
          <article className={`${styles.resultCard} ${styles.resultCardAccent}`}>
            <span className={styles.resultLabel}>12期买断尾款</span>
            <strong className={styles.resultValue}>
              {formatMoney(quote.settle12)}
            </strong>
          </article>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>
            {isPending ? "正在计算结果..." : "选择机型后点击立即试算"}
          </p>
          <p className={styles.emptyBody}>
            我们会根据机型上市日期、成色和当前结算规则，自动计算押金、首期1元、11期月供和买断尾款。
          </p>
        </div>
      )}
    </section>
  );
}
