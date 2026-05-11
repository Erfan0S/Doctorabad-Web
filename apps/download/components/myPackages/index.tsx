"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import PackageList from "../common/PackageList";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Apps, PaginatedResponse } from "@repo/core/types/general";
import { PackageListItemType } from "@/types/courses";
import { myPackagesTabs } from "../package/tabs/tabs-data";
import { api } from "@/api/Api";
import { api as coreApi } from "@repo/shared_modules/api";
import styles from "./myPackages.module.scss";
import Link from "next/link";
import { routePath } from "@repo/core/constants/routePath";
import Loading from "../common/Loading";
import { Button, UserPlanItem } from "@repo/shared_modules/components";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { SidePanelPage } from "@repo/core/types/sidePanel";
import PackageListItem from "../common/PackageList/PackageListItem";

export const MyPackages = () => {
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab");

  const {
    data: planData,
    isLoading: planLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PaginatedResponse<PackageListItemType[]>>({
    queryKey: ["myPlanPackages", tab || myPackagesTabs.PACKAGES],
    queryFn: ({ pageParam }) =>
      api
        .getPreviosPlanOrders(pageParam as number | undefined)
        .then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.links?.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
  });

  // TODO: may api change later
  const { data: packageData, isLoading: packageLoading } = useQuery({
    queryKey: ["myPackages", tab || myPackagesTabs.PACKAGES],
    queryFn: () => api.getPreviousPackageOrders(),
  });

  const { data: userPlans, isLoading: userPlansLoading } = useQuery({
    queryKey: ["userPlans"],
    queryFn: () => coreApi.getUserPlans().then((res) => res.data),
  });

  if (!planLoading && !planData && !packageLoading && !packageData) {
    return (
      <div className={styles.noData}>
        <span>هیج پکیجی نیست!</span>
        <Link className={styles.noDataButton} href={routePath.learnBasePath}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  const showContent = () => {
    if (tab === myPackagesTabs.PLANS) {
      if (userPlansLoading) return <Loading />;
      return !!userPlans?.data.length ? (
        <>
          {userPlans?.data.map((item) => (
            <UserPlanItem item={item} app={Apps.DOWNLOAD} key={item.id} />
          ))}
          <PackageList
            packages={planData}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </>
      ) : (
        <div className={styles.noPlan}>
          <span>هیچ پکیجی نیست!</span>
          <Button
            variant="outline"
            app={Apps.DOWNLOAD}
            onClick={() =>
              modalActions.addModal(ModalTypes.SIDE_PANEL, {
                initialPage: SidePanelPage.DISCOUNTS,
              })
            }
          >
            {" "}
            ورود به صفحه طرح‌های من{" "}
          </Button>
        </div>
      );
    } else {
      if (planLoading || packageLoading) return <Loading />;
      return (
        <>
          <PackageList
            packages={planData}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </>
      );
    }
  };

  return <div className={styles.container}>{showContent()}</div>;
};
