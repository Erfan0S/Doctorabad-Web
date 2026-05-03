"use client";
import { api } from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import FIlterNotFound from "@/components/common/FIlterNotFound";
import Loading from "@/components/common/Loading";
import { CourseListItemType } from "@/types/courses";
import { FiltersNames, SortType } from "@/types/filters";
import { PaginatedResponse } from "@repo/core/types/general";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PackageListItemType } from "@/types/courses";
import React from "react";

const FilterPageList = () => {
  const params = useSearchParams();

  const filterParams = {
    subjects: params?.get(FiltersNames.SUBJECT)
      ? Number(params?.get(FiltersNames.SUBJECT))
      : undefined,
    sort: (params?.get(FiltersNames.SORT) as SortType) || null,
    fields: params?.get(FiltersNames.FIELD)
      ? Number(params?.get(FiltersNames.FIELD))
      : undefined,
    grades: params?.get(FiltersNames.GRADE)
      ? Number(params?.get(FiltersNames.GRADE))
      : undefined,
    language: params?.get(FiltersNames.LANGUAGE)
      ? params?.get(FiltersNames.LANGUAGE)?.split(",").map(Number)
      : undefined,
    categories: params?.get(FiltersNames.CATEGORY)
      ? Number(params?.get(FiltersNames.CATEGORY))
      : undefined,
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<PackageListItemType[]>
  >({
    queryFn: ({ pageParam }) =>
      api
        .getFilterList({
          ...filterParams,
          page: pageParam as number | undefined,
        })
        .then((res) => res.data),
    queryKey: ["FilterList", filterParams],
    enabled: true,
    retry: 2,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.links.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
  });

  if (data?.pages[0].data.length === 0) {
    return (
      <FIlterNotFound massage="فیلترهای کمتری اعمال کنین تا دوره‌های بیشتری نشون داده بشه!" />
    );
  }
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

export default FilterPageList;
