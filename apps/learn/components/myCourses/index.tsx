"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import CourseList from "../common/CourseList";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Apps, PaginatedResponse } from "@repo/core/types/general";
import { CourseListItemType } from "@/types/courses";
import { myCoursesTabs } from "../course/tabs/tabs-data";
import { api } from "@/api/Api";
import { api as coreApi } from "@repo/shared_modules/api";
import styles from "./myCourses.module.scss";
import Link from "next/link";
import { routePath } from "@repo/core/constants/routePath";
import Loading from "../common/Loading";
import { Button, UserPlanItem } from "@repo/shared_modules/components";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { SidePanelPage } from "@repo/core/types/sidePanel";
import CourseListItem from "../common/CourseList/CourseListItem";

export const MyCourses = () => {
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab");

  const {
    data: planData,
    isLoading: planLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PaginatedResponse<CourseListItemType[]>>({
    queryKey: ["myPlanCourses", tab || myCoursesTabs.COURSES],
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
  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryKey: ["myCourses", tab || myCoursesTabs.COURSES],
    queryFn: () => api.getPrviosCourseOrders(),
  });

  const { data: userPlans, isLoading: userPlansLoading } = useQuery({
    queryKey: ["userPlans"],
    queryFn: () => coreApi.getUserPlans().then((res) => res.data),
  });

  if (!planLoading && !planData && !courseLoading && !courseData) {
    return (
      <div className={styles.noData}>
        <span>هیج دوره‌ای نیست!</span>
        <Link className={styles.noDataButton} href={routePath.learnBasePath}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  const showContent = () => {
    if (tab === myCoursesTabs.PLANS) {
      if (userPlansLoading) return <Loading />;
      return !!userPlans?.data.length ? (
        <>
          {userPlans?.data.map((item) => (
            <UserPlanItem item={item} app={Apps.LEARN} />
          ))}
          <CourseList
            courses={planData}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </>
      ) : (
        <div className={styles.noPlan}>
          <span>هیچ دوره‌ای نیست!</span>
          <Button
            variant="outline"
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
      if (planLoading || courseLoading) return <Loading />;
      return (
        !!courseData?.data.data &&
        courseData?.data.data.map((course) => (
          <Link href={`/course/${course.id}`} key={course.id}>
            <CourseListItem course={course} />
          </Link>
        ))
      );
    }
  };

  return <div className="container">{showContent()}</div>;
};
