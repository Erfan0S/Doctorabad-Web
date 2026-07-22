"use client";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import Product from "@/components/common/product";
import { Product as ProductType } from "@repo/core/types/product";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { purgeObjectFromFalsyValues } from "@repo/core/utils/purgeObjectFromFalsyValues";
import ArchiveEmptyState from "../emptyState";
import { useGetProductListConfig } from "@/hooks/useGetProductListConfig";
import Loading from "@/components/common/loading";
import MobileProductListItem from "./MobileProductListItem";

interface Props {
  hasFilterSideBar?: boolean;
  mobileView?: boolean;
}

const ProductList = ({
  hasFilterSideBar = false,
  mobileView = false,
}: Props) => {
  const { type } = useParams();

  const { params, queryFn } = useGetProductListConfig();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<{
    data: ProductType[];
  }>({
    queryKey: [type, params],
    initialPageParam: 1,
    staleTime: Infinity,
    queryFn: ({ pageParam }) =>
      queryFn({
        page: String(pageParam),
        limit: "9",
        ...purgeObjectFromFalsyValues(params),
      }).then((res) => {
        return res.data;
      }),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return (lastPageParam as number) + 1;
    },
  });

  if (isLoading)
    return (
      <div className="flex h-[350px] items-center justify-center">
        <Loading size={30} />
      </div>
    );

  if (!data?.pages[0].data.length) return <ArchiveEmptyState />;

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={
        <div className="flex items-center justify-center" key={0}>
          <Loading size={25} />
        </div>
      }
    >
      <div className={`${mobileView ? null : "flex flex-wrap -mx-[15px]"}`}>
        {data?.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.data.map((product) => (
              <>
                {mobileView ? (
                  <div
                    key={product.id}
                    className={`${!hasFilterSideBar ? "relative w-full px-[15px] xl:flex-[0_0_25%] xl:max-w-[25%]" : ""}`}
                  >
                    <MobileProductListItem product={product} />
                  </div>
                ) : (
                  <div
                    key={product.id}
                    className={`relative w-full px-[15px] sm:flex-[0_0_50%] sm:max-w-[50%] lg:flex-[0_0_33.333333%] lg:max-w-[33.333333%] ${!hasFilterSideBar ? "xl:flex-[0_0_25%] xl:max-w-[25%]" : ""}`}
                  >
                    <Product
                      gridView
                      isMobileLayout={mobileView}
                      {...product}
                    />
                  </div>
                )}
              </>
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductList;
