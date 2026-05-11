"use client";
import { api } from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import { Apps } from "@repo/core/types/general";
import { MobileProviderPageLayout } from "@repo/shared_modules/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  id: number;
  name?: string;
};

function CollectionListPage({ id }: Props) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["collection", id],
    queryFn: ({ pageParam }) =>
      api.getSingleCollection(id, pageParam as number).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return (lastPageParam as number) + 1;
    },
  });

  const collection = data?.pages[0]?.collection;

  return (
    <MobileProviderPageLayout
      ProviderContent={
        <div className="container">
          <CourseList
            courses={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
      }
      ProviderInfo={collection?.title || ""}
      id={id}
      image={collection?.picture || ""}
      title={collection?.title || ""}
      app={Apps.DOWNLOAD}
      contentTitle="محصولات"
      isLoading={isLoading}
      headertitle="مجموعه"
      variant="secondary"
    />
  );
}

export default CollectionListPage;
