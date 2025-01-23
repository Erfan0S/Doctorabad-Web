"use client";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";

import Product from "@/components/common/product";
import { Product as ProductType } from "@repo/core/types";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { purgeObjectFromFalsyValues } from "@repo/core/utils";
import ArchiveEmptyState from "../emptyState";
import { useGetProductListConfig } from "@/hooks/useGetProductListConfig";
import Loading from "@/components/common/loading";
import style from "./ProductList.module.scss";

interface Props {
  hasFilterSideBar?: boolean;
}

const ProductList = ({ hasFilterSideBar = false }: Props) => {
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
        <Loading size={50} />
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
          <Loading size={36} />
        </div>
      }
    >
      <div className="row">
        {data?.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.data.map((product) => (
              <div
                key={product.id}
                className={`col-lg-4 col-sm-6 ${!hasFilterSideBar ? "col-xl-3" : ""}`}
              >
                <Product gridView {...product} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductList;
