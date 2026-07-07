import { PricingCalculator } from "@/components/pricing/pricing-calculator";
import { getActiveProducts } from "@/lib/pricing/catalog";

export default function Home() {
  const products = getActiveProducts();

  return (
    <main className="pageShell">
      <div className="pageBackdrop" aria-hidden="true" />
      <section className="pageContent">
        <PricingCalculator initialProducts={products} />
      </section>
      <footer className="pageFooter">
        <span>手机租金计算</span>
        <a href="https://arocx.fun" target="_blank" rel="noreferrer">
          arocx.fun
        </a>
      </footer>
    </main>
  );
}
