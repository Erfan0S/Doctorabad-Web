"use client";
import { api } from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import FIlterNotFound from "@/components/common/FIlterNotFound";
import Loading from "@/components/common/Loading";
import { CourseListItemType } from "@/types/courses";
import { PaginatedResponse } from "@repo/core/types/general";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

const SearchPageComponent = () => {
  const params = useSearchParams();
  const query = params?.get("q") || "";

  const { data, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PaginatedResponse<CourseListItemType[]>>({
      queryKey: ["search", query],
      queryFn: ({ pageParam }) =>
        api.getSearchList(query, pageParam as number).then((res) => res.data),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.links.next) {
          return (lastPageParam as number) + 1;
        }
        return undefined;
      },
      retry: 2,
    });

  if (data?.pages[0].data.length === 0 || isError) {
    return <FIlterNotFound />;
  }

  return (
    <div className="container">
      {isLoading && !isError ? (
        <Loading />
      ) : (
        <CourseList
          courses={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage && !isError}
        />
      )}
    </div>
  );
};

export default SearchPageComponent;
