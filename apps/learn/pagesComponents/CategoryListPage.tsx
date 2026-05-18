"use client";
import { api } from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import Loading from "@/components/common/Loading";
import CategoryListHeader from "@/components/Header/CategoryListHeader";
import { CourseListItemType } from "@/types/courses";
import { SortType } from "@/types/filters";
import { CategoryType } from "@/types/homePage";
import { PaginatedResponse } from "@repo/core/types/general";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  id: number;
  name?: string;
};

function CategoryListPage({ id, name }: Props) {
  const params = useSearchParams();
  const { data: categoryTitle } = useQuery({
    queryKey: ["category-title", id],
    queryFn: async () => {
      let page = 1;

      while (true) {
        const res = await api.getCategories(page);
        const data = res.data as PaginatedResponse<CategoryType[]>;
        const matchedCategory = data.data?.find((item) => item.id === id);

        if (matchedCategory?.title) {
          return matchedCategory.title;
        }

        if (!data.links?.next) {
          return "";
        }

        page += 1;
      }
    },
  });

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<CourseListItemType[]>
  >({
    queryKey: ["category", id, params?.get("sort")],
    queryFn: ({ pageParam }) =>
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
      <CategoryListHeader title={name || categoryTitle || ""} />
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
}

export default CategoryListPage;
