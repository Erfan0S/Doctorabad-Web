"use client";
import { api } from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import Loading from "@/components/common/Loading";
import CollectionListHeader from "@/components/Header/CollectionListHeader";
import { PackageListItemTypeListItemType } from "@/types/courses";
import { SortType } from "@/types/filters";
import { PaginatedResponse } from "@repo/core/types/general";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  id: number;
  name?: string;
};

function CollectionListPage({ id, name }: Props) {
  const params = useSearchParams();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<CourseListItemType[]>
  >({
    queryKey: ["collection", id, params?.get("sort")],
    queryFn: ({ pageParam }) =>
      api
        .getFilterList({
          collections: id,
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
      <CollectionListHeader title={name || ""} />
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

export default CollectionListPage;
