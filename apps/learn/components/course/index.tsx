"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import style from "./course.module.scss";
import testImage from "@/assets/img/club.png";
import { api } from "@/api/Api";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { getDiscountInformation } from "@repo/core/utils/getDiscountInformation";
import TabsController from "../common/TabsController";
import CourseContent from "./tabs/lessons";
import { CourseTabsData } from "./tabs/tabs-data";
import { CourseDataType, CourseTab } from "@/types/courses";
import CourseDescription from "./tabs/Description";
import CourseComments from "./tabs/comments";
import RelatedCourses from "./tabs/Related";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@repo/shared_modules/components";
import { useSearchParams } from "next/navigation";
import VideoPlayer from "./video-player/VideoPlayer";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { useCart, cartActions } from "@repo/core/states/cart";
import { OrderType } from "@repo/core/types/cart";
import { priceFormatter } from "@repo/core/utils/priceFormatter";

const CourseTabsComponents = {
  [CourseTab.LESSONS]: CourseContent,
  [CourseTab.DESCRIPTION]: CourseDescription,
  [CourseTab.RELATED_PRODUCTS]: RelatedCourses,
  [CourseTab.COMMENTS]: CourseComments,
};

type Props = {
  id: string;
  slug: string;
};

const Course = ({ id, slug }: Props) => {
  const [activeTab, setActiveTab] = useState<CourseTab>(CourseTab.LESSONS);
  const params = useSearchParams();
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  const { data, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: () => api.getCourse(Number(id)),
    enabled: !!id,
    retry: false,
  });
  const { data: courseData, isLoading: isVideoLoading } = useQuery({
    queryKey: ["course-videop", `test-${id} 15163`],
    queryFn: () => api.getVideo(Number(id), 15163),
    enabled: true,
    retry: false,
  });
  const { data: cartList, isLoading: isCartLoading } = useQuery({
    queryKey: ["cartList"],
    queryFn: () => api.getCardList(),
    enabled: true,
    retry: false,
  });
  const course = data?.data.data;

  useEffect(() => {
    if (params?.get("tab")) {
      setActiveTab(params?.get("tab") as CourseTab);
    }
  }, [activeTab, setActiveTab, params]);
  console.log(" isLoading, isVideoLoading", isLoading, isVideoLoading);
  console.log(" courseData", courseData?.data?.data?.urls);

  useEffect(() => {
    console.log("cartList", cartList);
  }, [cartList]);

  const { discountPercent, mainPrice, offPrice } = getDiscountInformation(
    course?.price_main,
    course?.price_off || undefined,
    course?.price_amazing || undefined
  );
  return isLoading || isVideoLoading ? (
    <Loading />
  ) : (
    <div className={style.container}>
      <div className={style.courseHeader}>
        <div style={{ padding: "0 15px" }}>
          {/* <VideoPlayer config={courseData!.data.data!.urls} /> */}
          <div className={style["course-title"]}>
            <Image
              src={course?.provider.pic_url || ""}
              alt="company"
              width={40}
              height={40}
            />
            <h1>{isLoading ? <Loading /> : course?.title}</h1>
          </div>
        </div>
        <TabsController
          tabData={CourseTabsData}
          defaultTab={CourseTab.LESSONS}
        />
      </div>
      <div style={{ padding: "0 15px", marginTop: "15px" }}>
        {Object.entries(CourseTabsComponents).map(([id, Component]) =>
          id === activeTab && course ? (
            <Component
              description={course.description}
              CourseData={course}
              CourseId={course.id}
              sections={course.sections}
            />
          ) : null
        )}
      </div>
      <div className={style.purchaseBar}>
        <button
          className={style.purchaseButton}
          onClick={authorizeClientAction(
            cartActionsLoadingHandler(() =>
              cartActions.addToCart(+id, OrderType.Course)
            )
          )}
        >
          <span> شروع یادگیری کل دوره | </span>
          <div>
            <div>
              {/* {discountPercent && <small>٪{discountPercent}</small>} */}
              {offPrice && (
                <span className={style.priceOff}>
                  {priceFormatter(mainPrice)}
                  تومن
                </span>
              )}
            </div>
            <div>
              {priceFormatter(offPrice || mainPrice)}
              تومن
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Course;
