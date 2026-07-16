"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import CourseList, { productData } from "../common/CourseList";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Apps, PaginatedResponse } from "@repo/core/types/general";
import { CourseListItemType } from "@/types/courses";
import { myCoursesTabs } from "../course/tabs/tabs-data";
import { api } from "@/api/Api";
import { api as coreApi } from "@repo/shared_modules/api";
import Link from "next/link";
import { routePath } from "@repo/core/constants/routePath";
import Loading from "../common/Loading";
import {
  Button,
  ProductListItem,
  UserPlanItem,
} from "@repo/shared_modules/components";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { SidePanelPage } from "@repo/core/types/sidePanel";

const emptyStateClass =
  "flex h-[calc(100vh-300px)] w-full flex-col items-center justify-center";

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
    queryFn: () => api.getPreviousCourseOrders(),
  });

  const { data: userPlans, isLoading: userPlansLoading } = useQuery({
    queryKey: ["userPlans"],
    queryFn: () => coreApi.getUserPlans().then((res) => res.data),
  });

  if (!planLoading && !planData && !courseLoading && !courseData) {
    return (
      <div className={emptyStateClass}>
        <span className="text-[16px]">هیج دوره‌ای نیست!</span>
        <Link
          className="mt-5 w-[165px] rounded-[5px] border-2 border-solid border-[#ff0000] text-center font-bold leading-[30px] text-black shadow-[0_0_3px_0_#737373]"
          href={routePath.learnBasePath}
        >
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
        <div className={`${emptyStateClass} [&_button]:flex-none`}>
          <span className="mb-5">هیچ دوره‌ای نیست!</span>
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
        courseData?.data.data.map((course) => {
          return (
            <Link href={`/course/${course.id}`} key={course.id}>
              <ProductListItem {...productData(course)} />
            </Link>
          );
        })
      );
    }
  };

  return <div className="container">{showContent()}</div>;
};
