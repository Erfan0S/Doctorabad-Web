"use client";
import Loading from "@/components/common/Loading";
import { PackageListConfigs } from "@/constants/PackageList";
import { HomePagePackageSliders } from "@/types/homePage";
import { PaginatedResponse } from "@repo/core/types/general";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import PackageList from "@/components/common/PackageList";
import { PackageListItemType, PackageOrderListItemType } from "@/types/packages";

type Props = {
  type: HomePagePackageSliders;
};

const PackageListPage = ({ type }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<(PackageListItemType | PackageOrderListItemType)[]>  
  >({
    queryKey: ["packages", PackageListConfigs[type].title],
    queryFn: ({ pageParam }) =>
      PackageListConfigs[type].api(pageParam as number).then((res) => res.data),
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
          <PackageList
            packages={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
      )}
    </div>
  );
};

export default PackageListPage;
