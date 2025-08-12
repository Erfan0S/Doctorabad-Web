"use client";
import {api} from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import Loading from "@/components/common/Loading";
import CategoryListHeader from "@/components/Header/CategoryListHeader";
import {CourseListItemType} from "@/types/courses";
import {SortType} from "@/types/filters";
import {PaginatedResponse} from "@repo/core/types/general";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import React from "react";

type Props = {
  id: number;
  name?: string;
};

function CategoryListPage({id, name}: Props) {
  const params = useSearchParams();

  const {data, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery<
    PaginatedResponse<CourseListItemType[]>
  >({
    queryKey: ["category", id, params?.get("sort")],
    queryFn: ({pageParam}) =>
      api
        .getFilterList({
          categories: id,
          sort: (params?.get("sort") as SortType) || null,
          page: pageParam as number,
        })
        .then((res) => res.data),
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
      <CategoryListHeader title={name || ""} />
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
}

export default CategoryListPage;
