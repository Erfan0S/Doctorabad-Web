"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import CourseList from "../common/CourseList";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@repo/core/types/general";
import { CourseListItemType } from "@/types/courses";
import { myCoursesTabs } from "../course/tabs/tabs-data";
import { api } from "@/api/Api";
import { Loading } from "@repo/shared_modules/components";
import styles from "./myCourses.module.scss";
import Link from "next/link";
import { routePath } from "@repo/core/constants/routePath";
import UserPlanItem from "./UserPlanItem";

export const MyCourses = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const apiFunction = (pageParam?: number) => {
    if (tab === myCoursesTabs.COURSES || !tab) {
      return api.getPrviosCourseOrders(pageParam);
    } else {
      return api.getPreviosPlanOrders(pageParam);
    }
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<CourseListItemType[]>
  >({
    queryKey: ["myCourses", tab || myCoursesTabs.COURSES],
    queryFn: ({ pageParam }) =>
      apiFunction(pageParam as number | undefined).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.links.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
  });

  const { data: userPlans, isLoading: userPlansLoading } = useQuery({
    queryKey: ["userPlans"],
    queryFn: () => api.getUserPlans().then((res) => res.data),
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

  return (
    <div className="container">
      {isLoading ? (
        <Loading color="red" />
      ) : (
        <>
          {tab === myCoursesTabs.PLANS
            ? userPlans?.data.map((item) => <UserPlanItem item={item} />)
            : null}
          <CourseList
            courses={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </>
      )}
    </div>
  );
};
