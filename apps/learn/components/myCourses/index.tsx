"use client";
import {useSearchParams} from "next/navigation";
import React, {useEffect} from "react";
import CourseList from "../common/CourseList";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {Apps, PaginatedResponse, SidePanelPage} from "@repo/core/types/general";
import {CourseListItemType} from "@/types/courses";
import {myCoursesTabs} from "../course/tabs/tabs-data";
import {api} from "@/api/Api";
import {api as coreApi} from "@repo/shared_modules/api";
import styles from "./myCourses.module.scss";
import Link from "next/link";
import {routePath} from "@repo/core/constants/routePath";
import UserPlanItem from "./UserPlanItem";
import Loading from "../common/Loading";
import {Button} from "@repo/shared_modules/components";
import {modalActions} from "@repo/core/modal/modals";
import {ModalTypes} from "@repo/shared_modules/modalsTypes";

export const MyCourses = () => {
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab");

  const apiFunction = (pageParam?: number) => {
    if (tab === myCoursesTabs.COURSES || !tab) {
      return api.getPrviosCourseOrders(pageParam);
    } else {
      return api.getPreviosPlanOrders(pageParam);
    }
  };

  const {data, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery<
    PaginatedResponse<CourseListItemType[]>
  >({
    queryKey: ["myCourses", tab || myCoursesTabs.COURSES],
    queryFn: ({pageParam}) =>
      apiFunction(pageParam as number | undefined).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.links.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
  });

  const {data: userPlans, isLoading: userPlansLoading} = useQuery({
    queryKey: ["userPlans"],
    queryFn: () => coreApi.getUserPlans().then((res) => res.data),
  });

  if (!isLoading && !data) {
    return (
      <div className={styles.noData}>
        <span>هیج دوره‌ای نیست!</span>
        <Link className={styles.noDataButton} href={routePath.learnBasePath}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  useEffect(() => {
    console.log(userPlans);
  }, [userPlans]);

  const showContent = () => {
    if (tab === myCoursesTabs.PLANS) {
      if (userPlansLoading) return <Loading />;
      return !!userPlans?.data.length ? (
        userPlans?.data.map((item) => <UserPlanItem item={item} />)
      ) : (
        <div className={styles.noPlan}>
          <span>هیچ دوره‌ای نیست!</span>
          <Button
            styleType="outline"
            app={Apps.LEARN}
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
      if (isLoading) return <Loading />;
      return (
        <CourseList
          courses={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      );
    }
  };

  return <div className="container">{showContent()}</div>;
};
