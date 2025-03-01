"use client";
import { api } from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import { CourseListItemType } from "@/types/courses";
import { FiltersNames, SortType } from "@/types/filters";
import { PaginatedResponse } from "@repo/core/types/general";
import { Loading } from "@repo/shared_modules/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

const FilterPageList = () => {
  const params = useSearchParams();

  const filterParams = {
    categories: params.get(FiltersNames.CATEGORY)
      ? Number(params.get(FiltersNames.CATEGORY))
      : undefined,
    sort: (params.get(FiltersNames.SORT) as SortType) || null,
    fields: params.get(FiltersNames.FIELD)
      ? Number(params.get(FiltersNames.FIELD))
      : undefined,
    grades: params.get(FiltersNames.GRADE)
      ? Number(params.get(FiltersNames.GRADE))
      : undefined,
    language: params.get(FiltersNames.LANGUAGE)
      ? Number(params.get(FiltersNames.LANGUAGE))
      : undefined,
    providers: params.get(FiltersNames.PROVIDER)
      ? Number(params.get(FiltersNames.PROVIDER))
      : undefined,
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<CourseListItemType[]>
  >({
    queryFn: ({ pageParam }) =>
      api.getFilterList(filterParams).then((res) => res.data),
    queryKey: ["FilterList", filterParams],
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
