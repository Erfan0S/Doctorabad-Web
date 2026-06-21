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
import style from "./ProductList.module.scss";
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
      <div className={style.productList}>
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
        <div className={style.productListLoader} key={0}>
          <Loading size={25} />
        </div>
      }
    >
      <div className={`${mobileView ? null : "row"}`}>
        {data?.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.data.map((product) => (
              <>
                {mobileView ? (
                  <div
                    key={product.id}
                    className={`${!hasFilterSideBar ? "col-xl-3" : ""}`}
                  >
                    <MobileProductListItem product={product} />
                  </div>
                ) : (
                  <div
                    key={product.id}
                    className={`col-lg-4 col-sm-6 ${!hasFilterSideBar ? "col-xl-3" : ""}`}
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
