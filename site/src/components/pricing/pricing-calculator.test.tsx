import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, vi } from "vitest";

import { getActiveProducts } from "@/lib/pricing/catalog";
import { PricingCalculator } from "@/components/pricing/pricing-calculator";

const fetchMock = vi.fn();

describe("pricing calculator", () => {
  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("shows a user-facing title and introduction", () => {
    const products = getActiveProducts();

    render(<PricingCalculator initialProducts={products} />);

    expect(
      screen.getByRole("heading", { name: "手机租金计算" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "选择机型并输入成交价，快速查看押金加首期1元、11期月供和12期买断尾款。",
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("押金比例")).toBeInTheDocument();
    expect(screen.getByLabelText("自定义押金")).toBeInTheDocument();
    expect(screen.queryByText("产品结构：对齐 9d88")).not.toBeInTheDocument();
    expect(screen.queryByText("计算方式：规则引擎")).not.toBeInTheDocument();
  });

  it("calculates the quote locally without using an api route", async () => {
    const user = userEvent.setup();
    const products = getActiveProducts();

    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "should not fetch",
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    render(<PricingCalculator initialProducts={products} />);

    await user.selectOptions(screen.getByLabelText("产品分类"), "phone");
    await user.selectOptions(screen.getByLabelText("成色"), "used");
    await user.selectOptions(screen.getByLabelText("系列"), "iPhone 16 Pro");
    await user.selectOptions(screen.getByLabelText("容量"), "256GB");
    await user.clear(screen.getByLabelText("成交价"));
    await user.type(screen.getByLabelText("成交价"), "10000");
    await user.click(screen.getByRole("button", { name: "立即试算" }));

    expect(await screen.findByText("¥531.67")).toBeInTheDocument();
    expect(screen.getByText("¥2,699.70")).toBeInTheDocument();
    expect(screen.getByText("¥4,294.70")).toBeInTheDocument();
    await waitFor(() => {
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});
