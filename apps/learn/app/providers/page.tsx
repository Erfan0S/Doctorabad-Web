"use client";
import { api } from "@/api/Api";
import CategoriesList from "@/components/common/CategoriesList";
import HomeHeader from "@/components/Header/HomeHeader";
import { ProviderType } from "@/types/homePage";
import { PaginatedResponse } from "@repo/core/types/general";
import { Loading } from "@repo/shared_modules/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";

const ProvidersPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<ProviderType[]>
  >({
    queryFn: ({ pageParam }) =>
      api.getProviders(pageParam as number).then((res) => res.data),
    queryKey: ["providers"],
    enabled: true,
    retry: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.links.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
  });

  return (
    <div>
      <HomeHeader />
      {isLoading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Loading />}
        >
          {data?.pages.map((page) => (
            <CategoriesList
              key={page.meta.current_page}
              categories={page.data || []}
              isProvider={true}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProvidersPage;
