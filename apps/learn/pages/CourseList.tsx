"use client";
import { api } from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import { CourseListConfigs } from "@/constants/CourseList";
import { CourseListItemType } from "@/types/courses";
import { CourseListType } from "@/types/homePage";
import { PaginatedResponse } from "@repo/core/types/general";
import { Loading } from "@repo/shared_modules/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";

type Props = {
  type: CourseListType;
};

function CourseListPage({ type }: Props) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<CourseListItemType[]>
  >({
    queryKey: ["courses", CourseListConfigs[type].title],
    queryFn: ({ pageParam }) =>
      CourseListConfigs[type].api().then((res) => res.data),
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

export default CourseListPage;
