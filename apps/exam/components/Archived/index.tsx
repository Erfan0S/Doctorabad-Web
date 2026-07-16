"use client";
import { api } from "@/api/Api";
import Loading from "@/components/common/Loading/Loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import ArchivedItem from "./ArchivedItem";

function Archived() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["archivedList"],
    queryFn: ({ pageParam }) => api.getArcgived(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.links.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
  });

  return (
    <>
      {!!isLoading && <Loading />}
      <InfiniteScroll
        className="w-full flex flex-row flex-wrap gap-[15px]"
        pageStart={1}
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loading />}
      >
        {data?.pages.map((archives, i) => (
          <React.Fragment key={i}>
            {archives.data.data.map((archive) => (
              <ArchivedItem key={archive.id} data={archive} />
            ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default Archived;
