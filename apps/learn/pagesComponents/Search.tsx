"use client";
import { api } from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import { CourseListItemType } from "@/types/courses";
import { PaginatedResponse } from "@repo/core/types/general";
import { Loading } from "@repo/shared_modules/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

const Search = () => {
  const params = useSearchParams();
  const query = params?.get("q") || "";

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<CourseListItemType[]>
  >({
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
  });

  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <CourseList
          courses={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      )}
    </div>
  );
};

export default Search;
