"use client";
import { api } from "@/api/Api";
import CategoriesList from "@/components/common/CategoriesList";
import HomeHeader from "@/components/Header/HomeHeader";
import { CategoryType } from "@/types/homePage";
import { PaginatedResponse } from "@repo/core/types/general";
import { Loading } from "@repo/shared_modules/components";

import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";

const CategoriesPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<CategoryType[]>
  >({
    queryFn: ({ pageParam }) =>
      api.getCategories(pageParam as number).then((res) => res.data),
    queryKey: ["categories"],
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
        <Loading color="red" />
      ) : (
        <InfiniteScroll
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Loading color="red" />}
        >
          {data?.pages.map((page) => (
            <CategoriesList
              key={page.meta.current_page}
              categories={page.data || []}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CategoriesPage;
