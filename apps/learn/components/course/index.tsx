"use client";

import React, { useEffect, useMemo, useState } from "react";

import Image from "next/image";
import style from "./Course.module.scss";
import { api } from "@/api/Api";
import { getDiscountInformation } from "@repo/core/utils/getDiscountInformation";
import TabsController from "../common/TabsController";
import CourseContent from "./tabs/lessons";
import { CourseTabsData } from "./tabs/tabs-data";
import { CourseDataType, CourseTab, Lesson } from "@/types/courses";
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
import PageHeader from "../Header/PageHeader";
import CourseHeaderSiffix from "../Header/courseHeaderSuffix";
import Link from "next/link";
import { modalActions } from "@repo/core/modal/modals";
import { routePath } from "@repo/core/constants/routePath";
import classNames from "classnames";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import PhoneIcon from "@/assets/svg/phone";

const CourseTabsComponents = {
  [CourseTab.LESSONS]: CourseContent,
  [CourseTab.DESCRIPTION]: CourseDescription,
  [CourseTab.RELATED_PRODUCTS]: RelatedCourses,
  [CourseTab.COMMENTS]: CourseComments,
};

type Props = {
  course: CourseDataType;
};

const Course = ({ course }: Props) => {
  const [activeTab, setActiveTab] = useState<CourseTab>(CourseTab.LESSONS);
  const params = useSearchParams();
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  const { data, initLoading } = useCart();

  const [currentLeasson, setCurrentLeasson] = useState<Lesson | null>(null);
  const [suggestedCurrentTime, setSuggestedCurrentTime] = useState<
    number | null
  >(null);

  const [orderId, serOrderId] = useState<number | undefined>();

  const { data: leassonData, isLoading } = useQuery({
    queryKey: ["course-videop", `leason-${course.id}-${currentLeasson?.id}`],
    queryFn: () => api.getVideo(Number(course.id), currentLeasson?.id!),
    enabled: !!currentLeasson?.id,
    retry: false,
    placeholderData: (data) => data,
  });

  useEffect(() => {
    if (course?.user_has_access) {
      setCurrentLeasson(course.sections[0]?.chapters[0]?.lessons[0]);
    }
    if (initLoading) {
      cartActions.getCartData();
    }

    console.log("course", course);
  }, [course]);

  useEffect(() => {
    if (params?.get("tab")) {
      setActiveTab(params?.get("tab") as CourseTab);
    }
  }, [activeTab, setActiveTab, params]);

  const flatLeasons = useMemo(() => {
    return course.sections.flatMap((section) =>
      section.chapters.flatMap((chapter) => chapter.lessons)
    );
  }, [course]);

  useEffect(() => {
    serOrderId(
      data?.find(
        (item) =>
          item.product_type === OrderType.Course &&
          item.product_id === course.id
      )?.id
    );
  }, [data]);

  const goToNextTrack = () => {
    const nextLeasson =
      flatLeasons[
        flatLeasons.findIndex((leasson) => leasson.id === currentLeasson?.id) +
          1
      ];
    if (nextLeasson) {
      setSuggestedCurrentTime(null);
      setCurrentLeasson(nextLeasson);
    }
  };

  const goToPreviousTrack = () => {
    const previousLeasson =
      flatLeasons[
        flatLeasons.findIndex((leasson) => leasson.id === currentLeasson?.id) -
          1
      ];
    if (previousLeasson) {
      setSuggestedCurrentTime(null);
      setCurrentLeasson(previousLeasson);
    }
  };

  const onLessonClick = (lesson: Lesson) => {
    if (course.user_has_access) {
      setSuggestedCurrentTime(null);
      setCurrentLeasson(lesson);
    }
  };

  const goToBookmark = (lessonId: number, jumpTime: number) => {
    setCurrentLeasson(flatLeasons.find((leasson) => leasson.id === lessonId)!);
    setSuggestedCurrentTime(jumpTime);
    modalActions.removeLastModal();
  };

  const { mainPrice, offPrice } = getDiscountInformation(
    course?.price_main,
    course?.price_off || undefined,
    course?.price_amazing || undefined
  );

  // TODO: can be moved to a separate component
  const courseButton = () => {
    return (
      <div
        className={classNames(style.purchaseBar, {
          [style.purchaseBarAccess]: course.user_has_access,
        })}
      >
        {!!orderId ? (
          <div className={style.addedPurchaseButtonWrapper}>
            <button
              className={style.purchaseButton}
              onClick={() => {
                cartActions.removeFromCart(orderId);
              }}
            >
              حذف از سبد خرید
            </button>
            <Link href={routePath.checkout} className={style.purchaseButton}>
              رفتن به سبد خرید
            </Link>
          </div>
        ) : course.user_has_access ? (
          <button
            className={`${style.purchaseButton} ${style.purchaseButtonActive}`}
            style={{ background: "rgb(0, 174, 0)" }}
          >
            دانشجو این دوره ام!
          </button>
        ) : (
          <button
            className={style.purchaseButton}
            onClick={authorizeClientAction(
              cartActionsLoadingHandler(() =>
                cartActions.addToCart(+course.id, OrderType.Course)
              )
            )}
          >
            {updateCartLoading ? (
              <Loading color="red" />
            ) : (
              <>
                {" "}
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
              </>
            )}
          </button>
        )}
        {course.only_watchable_on_app && (
          <div
            className={`${style.appOnly} ${style.purchaseButton}`}
            onClick={() => modalActions.addModal(ModalTypes.AppOnly)}
          >
            {/* <PhoneIcon /> */}
            <span>قابل استفاده فقط در اپ</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={style.wrapper} onContextMenu={(e) => e.preventDefault()}>
      <div
        className={style.preventContext}
        onContextMenu={(e) => e.preventDefault()}
      />
      <PageHeader
        title=""
        suffix={
          <CourseHeaderSiffix
            course={course}
            currentLessonId={currentLeasson?.id!}
            goToBookmark={goToBookmark}
          />
        }
        haveMargin={false}
      />
      <div>
        <div className={style.container}>
          <div className={style.courseHeader}>
            <div className={style.courseHeaderTop}>
              {(!course.user_has_access && !course.course_preview) ||
              (course.user_has_access && course.only_watchable_on_app) ? (
                <div className={style.courseImagePrevWrapper}>
                  <Image
                    src={course.course_pic}
                    alt={course.title}
                    fill
                    placeholder={placeHolderDataUrl}
                  />
                </div>
              ) : course.user_has_access && isLoading ? (
                <div className={style.loadingWrapper}>
                  <Loading color="red" />
                </div>
              ) : (
                <VideoPlayer
                  // key={currentLeasson?.id || "preview"}
                  config={
                    course?.user_has_access
                      ? leassonData?.data?.data?.urls
                      : { source: course?.course_preview! }
                  }
                  title={currentLeasson?.title || "پیش نمایش"}
                  isUserHasAccess={!!course?.user_has_access}
                  lessonId={currentLeasson?.id!}
                  courseId={course.id}
                  goToNextTrack={goToNextTrack}
                  goToPreviousTrack={goToPreviousTrack}
                  suggestedCurrentTime={suggestedCurrentTime}
                />
              )}
              <div className={style["course-title"]}>
                <Link href={`/providers/${course?.provider.id}`}>
                  <Image
                    src={course?.provider.pic_url || ""}
                    alt="company"
                    width={40}
                    height={40}
                    placeholder={placeHolderDataUrl}
                  />
                </Link>
                <h1>{course?.title}</h1>
              </div>
            </div>
            <TabsController
              tabData={CourseTabsData}
              defaultTab={CourseTab.LESSONS}
            />
          </div>
          <div className={style.tabsContent}>
            {Object.entries(CourseTabsComponents).map(([id, Component]) => {
              return id === activeTab && course ? (
                <Component
                  description={course.description}
                  CourseData={course}
                  CourseId={course.id}
                  sections={course.sections}
                  onLessonClick={onLessonClick}
                  key={id}
                />
              ) : null;
            })}
          </div>
          {courseButton()}
        </div>
      </div>
    </div>
  );
};

export default Course;
