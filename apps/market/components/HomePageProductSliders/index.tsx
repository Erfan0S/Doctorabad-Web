"use client";

import { api } from "@/api/Api";
import { LazyDataLoader } from "../common/lazyDataLoader";
import ProductsPlaceholeder from "../marketHome/productsPlaceholder";
import { routePath } from "@repo/core/constants";
import ProductSlider from "../marketHome/productSlider";
import { Product } from "@repo/core/types";
import { ResponseType } from "@repo/core/types";

type Props = {
  type: "suggested" | "bestSelling" | "newest" | "lastSeen";
};

export const HomePageProductSliders = ({ type }: Props) => {
  const configs = {
    bestSelling: {
      loader: () => api.getBesSellingProductList({ limit: "10", page: "1" }),
      title: "پرفروشترین محصولات",
      archiveLink: routePath.bestsellingProducts,
      queryKey: "bestSellingsList",
    },
    newest: {
      loader: () => api.getNewestProductList({ page: "1", limit: "10" }),
      title: "جدیدترین محصولات",
      archiveLink: routePath.newestProducts,
      queryKey: "newestList",
    },
    lastSeen: {
      loader: () =>
        api.getLastSeenProductList({ limit: "10", page: "1" }).catch(
          () =>
            ({ data: { data: [] } }) as unknown as ResponseType<{
              data: Product[];
            }>
        ),
      title: "بازدیدهای‌‌من",
      archiveLink: undefined,
      queryKey: "lastSeenList",
    },
    suggested: {
      loader: () => api.getSuggestedProductList({ page: "1", limit: "10" }),
      title: "پیشنهادکدخدای‌دکترآباد",
      archiveLink: routePath.suggestedProducts,
      queryKey: "suggestedList",
    },
  };

  return (
    <LazyDataLoader
      placeHolder={ProductsPlaceholeder}
      loader={configs[type].loader}
      queryKey={configs[type].queryKey}
      component={(d) => (
        <ProductSlider
          data={d.data.data}
          title={configs[type].title}
          archiveLink={configs[type].archiveLink}
        />
      )}
    />
  );
};
