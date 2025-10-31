"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import style from "./Course.module.scss";
import videoPlayerStyle from "./video-player/VideoPlayer.module.scss";
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
import { useSearchParams } from "next/navigation";
import VideoPlayer from "./video-player/VideoPlayer";
import { useCart, cartActions } from "@repo/core/states/cart";
import { PageHeader } from "@repo/shared_modules/headers";
import CourseHeaderSiffix from "../Header/courseHeaderSuffix";
import Link from "next/link";
import { modalActions } from "@repo/core/modal/modals";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { Apps } from "@repo/core/types/general";
import CourseButton from "./CourseButton";
import Loading from "../common/Loading";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { toast } from "react-toastify";
import { PreventContext } from "@repo/shared_modules/components";

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

  const { data, initLoading } = useCart();

  const [currentLeasson, setCurrentLeasson] = useState<Lesson | null>(null);
  const [suggestedCurrentTime, setSuggestedCurrentTime] = useState<
    number | null
  >(null);
  const [userHasAccess, setUserHasAccess] = useState(false);

  const { data: leassonData, isLoading } = useQuery({
    queryKey: ["course-videop", `leason-${course.id}-${currentLeasson?.id}`],
    queryFn: () => api.getVideo(Number(course.id), currentLeasson?.id!),
    enabled: !!currentLeasson?.id,
    retry: false,
    placeholderData: (data) => data,
  });

  console.log(course);

  useEffect(() => {
    // if (course?.user_has_access) {
    //   setCurrentLeasson(course.sections[0]?.chapters[0]?.lessons[0]);
    // }
    if (initLoading) {
      cartActions.getCartData();
    }
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

  const goToNextTrack = () => {
    if (!userHasAccess) {
      return;
    }
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
    if (!userHasAccess) {
      return;
    }

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

  const isMobileView =
    typeof window !== "undefined" && window.innerWidth <= 768;

  const onLessonClick = (lesson: Lesson) => {
    if (course.user_has_access && !course.only_watchable_on_app) {
      setSuggestedCurrentTime(null);
      setCurrentLeasson(lesson);
      if (!isMobileView) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else if (!course.user_has_access) {
      toast.error("این دوره را هنوز نخریدی!");
    } else if (course.only_watchable_on_app) {
      modalActions.addModal(ModalTypes.AppOnly);
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

  useEffect(() => {
    setUserHasAccess(
      course?.user_has_access &&
        !!currentLeasson &&
        !course.only_watchable_on_app
    );
  }, [currentLeasson, course]);

  return (
    <div className={style.wrapper} onContextMenu={(e) => e.preventDefault()}>
      <PreventContext />
      <PageHeader
        title=""
        app={Apps.LEARN}
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
              (!currentLeasson && !course.course_preview) ? (
                <div className={style.courseImagePrevWrapper}>
                  <Image
                    src={course.course_pic || ""}
                    alt={course.title}
                    fill
                    placeholder={placeHolderDataUrl}
                  />
                </div>
              ) : course.user_has_access && isLoading ? (
                <div className={videoPlayerStyle.palceHolder}>
                  <Loading />
                </div>
              ) : (
                <VideoPlayer
                  config={{
                    dash: userHasAccess
                      ? leassonData?.data?.data?.urls?.dash
                      : undefined,
                    hls: userHasAccess
                      ? leassonData?.data?.data?.urls?.hls
                      : undefined,
                    player: userHasAccess
                      ? leassonData?.data?.data?.urls?.player
                      : undefined,
                    source: userHasAccess
                      ? leassonData?.data?.data?.urls?.source
                      : course?.course_preview!,
                    thumbnail: course?.course_pic,
                  }}
                  title={currentLeasson?.title || "پیش نمایش"}
                  isUserHasAccess={userHasAccess}
                  lessonId={currentLeasson?.id!}
                  courseId={course.id}
                  goToNextTrack={goToNextTrack}
                  goToPreviousTrack={goToPreviousTrack}
                  suggestedCurrentTime={suggestedCurrentTime}
                  setSuggestedCurrentTime={setSuggestedCurrentTime}
                />
              )}
              <div className={style["course-title"]}>
                <Link href={`/providers/${course?.provider.id}`}>
                  <Image
                    src={course?.provider.pic_url || ""}
                    alt={course?.provider.name || "ارائه دهنده"}
                    width={100}
                    height={44}
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
          <CourseButton
            course={course}
            mainPrice={mainPrice}
            offPrice={offPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default Course;
