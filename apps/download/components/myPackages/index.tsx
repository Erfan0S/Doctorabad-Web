"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import PackageList from "@/components/common/PackageList";
import Loading from "@/components/common/loading";
import { PaginatedResponse } from "@repo/core/types/general";
import { PackageOrderListItemType } from "@/types/packages";

const MyPackages = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<PackageOrderListItemType[]>
  >({
    // Must not share a key with LazyDataLoader's useQuery on the home slider ("my-packages").
    queryKey: ["my-packages", "list"],
    queryFn: ({ pageParam }) =>
      api
        .getPreviousPackageOrders(pageParam as number)
        .then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage?.links?.next) return undefined;
      return (lastPageParam as number) + 1;
    },
  });

  if (isLoading) return <Loading />;

  // ensure data has the expected paginated shape
  return (
    <div className="container">
      <PackageList
        packages={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
      />
    </div>
  );
};

export default MyPackages;
