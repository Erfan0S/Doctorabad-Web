"use client";
import { api } from "@/api/Api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";
import { MobileProviderPageLayout } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { Product as ProductType } from "@repo/core/types/product";
import Product from "@/components/common/product";
import InfiniteScroll from "react-infinite-scroller";
import { marketPaths } from "@repo/core/constants/routePath";
import MobileProductListItem from "@/components/product-list/productList/MobileProductListItem";
import Loading1 from "@/components/common/loading";

type Props = {
  id: number;
};

const ProviderPageContent = ({
  products,
  fetchNextPage,
  hasNextPage,
}: {
  products: ProductType[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
}) => {
  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Loading1 key={0} />}
    >
      {products.map((product) => (
        <div key={product.id} className={``}>
          <MobileProductListItem product={product} />
        </div>
      ))}
    </InfiniteScroll>
  );
};

const MobileProviderPage = ({ id }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["provider_" + id],
    queryFn: ({ pageParam }) =>
      api.getSingleProvider(id, pageParam).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return (lastPageParam as number) + 1;
    },
  });

  // Flatten the courses data from all pages and map to CourseListItemType
  const products = React.useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  const provider = data?.pages[0].provider;

  return (
    <MobileProviderPageLayout
      ProviderContent={
        <ProviderPageContent
          products={products || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      }
      ProviderInfo={provider?.description || ""}
      id={id}
      image={provider?.pic_url || ""}
      summery={provider?.summary || ""}
      title="فروشنده"
      app={Apps.MARKET}
      contentTitle="محصولات"
      isLoading={isLoading}
      headertitle="فروشنده"
      defaultBackUrl={marketPaths.mobileProviders}
    />
  );
};
export default MobileProviderPage;
