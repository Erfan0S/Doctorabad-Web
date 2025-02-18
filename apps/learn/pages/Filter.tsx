import { api } from "@/api/Api";
import { FilterListItemsType, SortType } from "@/types/filters";
import { PaginatedResponse } from "@repo/core/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

const FilterPageList = () => {
  const params = useSearchParams();

  // const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
  //   PaginatedResponse<FilterListItemsType[]>
  // >({
  //   queryFn: ({ pageParam }) =>
  //     api.getFilterList(pageParam as number, params?.get('sort') as SortType, params?.get('fields') as number[]).then((res) => res.data),
  //   queryKey: ["FilterList"],
  //   enabled: true,
  //   retry: false,
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage, allPages, lastPageParam) => {
  //     if (lastPage.links.next) {
  //       return (lastPageParam as number) + 1;
  //     }
  //     return undefined;
  //   },
  // });
  return (
    <div className="container">{/* <CourseList courses={courses} /> */}</div>
  );
};

export default FilterPageList;
