"use client";
import { api } from "@/api/Api";
import { TileList } from "@repo/shared_modules/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../common/loading";
import { marketPaths } from "@repo/core/constants/routePath";

function CollectionsList() {
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ["collections"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.getCollectionsList({ page: pageParam });
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.data.length > 0 ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<Loading />}
    >
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          <TileList
            categories={page.data.map((c) => ({
              id: c.id,
              pic_url: c.pic_url,
              alt: c.title,
              objectFit: "cover",
            }))}
            baseUrl={marketPaths.collections}
          />
        </React.Fragment>
      ))}
    </InfiniteScroll>
  );
}

export default CollectionsList;
