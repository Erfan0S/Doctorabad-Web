"use client";
import { Apps } from "@repo/core/types/general";
import {
  Loading,
  MobileProviderPageLayout,
} from "@repo/shared_modules/components";
import React from "react";
import { Product as ProductType } from "@repo/core/types/product";
import InfiniteScroll from "react-infinite-scroller";
import Product from "@/components/common/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { marketPaths } from "@repo/core/constants/routePath";

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

// TODO: make secodnary variant for MobileProviderPageLayout

function CollectionSinglePage({ id }: { id: number }) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["provider_" + id],
    queryFn: ({ pageParam }) =>
      api.getSingleCollection(id, pageParam).then((res) => res.data),
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

  const collection = data?.pages[0].collection;

  return (
    <MobileProviderPageLayout
      ProviderContent={
        <ProviderPageContent
          products={products || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      }
      ProviderInfo={collection?.description || ""}
      id={id}
      image={collection?.pic_url || ""}
      title={collection?.title || ""}
      app={Apps.MARKET}
      contentTitle="محصولات"
      isLoading={isLoading}
      headertitle="مجموعه"
      variant="secondary"
      defaultBackUrl={marketPaths.collections}
    />
  );
}

export default CollectionSinglePage;
