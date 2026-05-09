"use client";
import { api } from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import FIlterNotFound from "@/components/common/FIlterNotFound";
import Loading from "@/components/common/Loading";
import { FiltersNames, SortType } from "@/types/filters";
import { PaginatedResponse } from "@repo/core/types/general";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PackageListItemType } from "@/types/courses";
import React from "react";

const FilterPageList = () => {
  const params = useSearchParams();

  const parseLanguageFilter = () => {
    const rawBracket = params?.getAll(`${FiltersNames.LANGUAGE}[]`) || [];
    if (rawBracket.length > 0) {
      return rawBracket
        .flatMap((v) => v.split(","))
        .map((v) => Number(v))
        .filter((v) => Number.isFinite(v)) as number[];
    }

    const raw = params?.getAll(FiltersNames.LANGUAGE) || [];
    if (raw.length > 0) {
      return raw
        .flatMap((v) => v.split(","))
        .map((v) => Number(v))
        .filter((v) => Number.isFinite(v)) as number[];
    }

    const single = params?.get(FiltersNames.LANGUAGE);
    if (single) {
      const parsed = single
        .split(",")
        .map((v) => Number(v))
        .filter((v) => Number.isFinite(v)) as number[];
      return parsed;
    }

    return undefined;
  };

  const parseCategoryFilter = () => {
    const single = params?.get(FiltersNames.CATEGORY);
    if (!single) return undefined;

    const parsed = single
      .split(",")
      .map((v) => Number(v))
      .filter((v) => Number.isFinite(v)) as number[];

    return parsed.length ? parsed : undefined;
  };

  const filterParams = {
    subject: params?.get(FiltersNames.SUBJECT)
      ? Number(params?.get(FiltersNames.SUBJECT))
      : undefined,
    order_by: (params?.get(FiltersNames.SORT) as SortType) || undefined,
    fields: params?.get(FiltersNames.FIELD)
      ? Number(params?.get(FiltersNames.FIELD))
      : undefined,
    grades: params?.get(FiltersNames.GRADE)
      ? Number(params?.get(FiltersNames.GRADE))
      : undefined,
    language: parseLanguageFilter(),
    category: parseCategoryFilter(),
    free: params?.get(FiltersNames.FREE)
      ? (Number(params?.get(FiltersNames.FREE)) as 0 | 1)
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
