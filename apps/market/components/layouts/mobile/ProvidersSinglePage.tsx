"use client";
import { api } from "@/api/Api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Loading,
  MobileProviderPageLayout,
} from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { Product as ProductType } from "@repo/core/types/product";
import Product from "@/components/common/product";
import InfiniteScroll from "react-infinite-scroller";

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
      loader={<Loading key={0} app={Apps.LEARN} />}
    >
      {products.map((product) => (
        <div key={product.id} className={``}>
          <Product gridView isMobileLayout {...product} />
        </div>
      ))}
    </InfiniteScroll>
  );
};

const MobileProviderPage = ({ id }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["provider_" + id],
    queryFn: ({ pageParam }) =>
      api.getSingleProvider(id).then((res) => res.data),
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
      title="ارائه دهنده‌ها"
      app={Apps.MARKET}
      contentTitle="دوره‌ها"
      isLoading={isLoading}
    />
  );
};
export default MobileProviderPage;
