"use client";
import CourseList from "@/components/common/CourseList";
import Loading from "@/components/common/Loading";
import { CourseListConfigs } from "@/constants/CourseList";
import { CourseListItemType } from "@/types/courses";
import { CourseListType } from "@/types/homePage";
import { PaginatedResponse } from "@repo/core/types/general";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  type: CourseListType;
};

const CourseListPage = ({ type }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<CourseListItemType[]>
  >({
    queryKey: ["courses", CourseListConfigs[type].title],
    queryFn: ({ pageParam }) =>
      CourseListConfigs[type].api(pageParam as number).then((res) => res.data),
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
        <div className="container">
          <CourseList
            courses={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
      )}
    </div>
  );
};

export default CourseListPage;
