"use client";

import { api } from "@/api/Api";
import { LazyDataLoader } from "@repo/shared_modules/components";
import ProductsPlaceholeder from "../marketHome/productsPlaceholder";
import { routePath } from "@repo/core/constants/routePath";
import ProductSlider from "../marketHome/productSlider";
import { Product } from "@repo/core/types/product";
import { ResponseType } from "@repo/core/types/general";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { useEffect, useState } from "react";

type Props = {
  type: "suggested" | "bestSelling" | "newest" | "lastSeen";
  isMobileLayout?: boolean;
};

export const HomePageProductSliders = ({
  type,
  isMobileLayout = false,
}: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  type configsType = {
    loader: () => Promise<any>;
    title: string;
    archiveLink?: string;
    queryKey: string;
    needAuth?: boolean;
  };

  const configs: { [key: string]: configsType } = {
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
            }>,
        ),
      title: "بازدیدهای‌‌من",
      archiveLink: undefined,
      queryKey: "lastSeenList",
      needAuth: true,
    },
    suggested: {
      loader: () => api.getSuggestedProductList({ page: "1", limit: "10" }),
      title: "پیشنهادکدخدای‌دکترآباد",
      archiveLink: routePath.suggestedProducts,
      queryKey: "suggestedList",
    },
  };

  if (!configs[type] || (configs[type].needAuth && !isUserLoggedIn()))
    return null;

  return (
    <LazyDataLoader
      placeHolder={ProductsPlaceholeder}
      loader={configs[type].loader}
      queryKey={configs[type].queryKey}
      component={(d) => (
        <ProductSlider
          data={d.data.data.data}
          title={configs[type].title}
          archiveLink={configs[type].archiveLink}
          isMobileLayout={isMobileLayout}
        />
      )}
    />
  );
};
