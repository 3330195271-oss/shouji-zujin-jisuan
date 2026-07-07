# 手机租金计算

这是 `Arosy` 的第一版租赁价格计算器，计算逻辑基于支付宝 `2026-06-01` 公告中的租赁行业价格规范，页面可直接部署到 GitHub Pages。

## 运行方式

```bash
npm install
npm run dev
```

本地打开 [http://localhost:3000](http://localhost:3000)。

## 主要能力

- 按 `手机 / iPad`、`新机 / 二手`、`系列`、`容量` 进行筛选
- 输入成交价、首付比例或自定义首付
- 输出 `首付 / 月供 / 6期结清 / 9期结清 / 12期买断尾款`
- 使用独立规则引擎和可维护产品表，不依赖写死月供
- 纯静态部署，报价计算在浏览器本地完成

## 计算规则

系统会先根据 `上市日期` 和当前日期判断机龄桶：

- `<=13个月`
- `13个月 < 上市时间 <= 25个月`
- `25个月 < 上市时间 <= 37个月`
- `>37个月`

然后根据 `成色类型 + 机龄桶` 取支付宝规则：

- `rentRate`：12个月总租金上限比例
- `costRate`：总成本上限比例
- `residualMinRate` / `residualMaxRate`：尾款允许区间

核心公式：

```text
firstPay = customFirstPay + 1
or
firstPay = inputPrice × downPaymentRatio / 100 + 1

rentCap = basePrice × rentRate
costCap = basePrice × costRate

defaultResidualRate = clamp(costRate - rentRate, residualMinRate, residualMaxRate)
buyoutTail = basePrice × defaultResidualRate

monthly = max((rentCap - firstPay) / 11, 0)

settle12 = buyoutTail
settle9 = buyoutTail + monthly × 3
settle6 = buyoutTail + monthly × 6
```

内部计算使用高精度十进制，展示时统一四舍五入到 2 位小数。

## 部署到 GitHub Pages

仓库根目录已经包含 `.github/workflows/deploy-pages.yml`，推送到 `main` 分支后会自动：

- 安装依赖
- 执行 `lint + test + build`
- 将 `site/out` 发布到 GitHub Pages

如果仓库名不是 `用户名.github.io`，构建时会自动带上项目子路径，不需要额外改 `basePath`。

## 目录说明

- `src/lib/pricing/catalog.ts`
  - 产品目录和筛选数据
- `src/lib/pricing/rules.ts`
  - 支付宝规则桶
- `src/lib/pricing/engine.ts`
  - 纯函数规则引擎
- `src/components/pricing/*`
  - 计算器页面组件

## 验证命令

```bash
npm test
npm run lint
npm run build
```

## 当前限制

- 当前产品表为仓库内静态配置，后续可迁移到数据库。
- 当前 `资源机` 规则类型已预留，但目录中暂未启用对应机型。
- 未来如果支付宝规则更新，需要同步更新 `src/lib/pricing/rules.ts`。
