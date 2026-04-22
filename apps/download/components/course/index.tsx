import React from "react";
import { CourseTabsData } from "./tabs/tabs-data";
import { CourseDataType } from "@/types/courses";
import CourseHeaderSiffix from "../Header/courseHeaderSuffix";
import { Apps } from "@repo/core/types/general";
import { MobileProductLayout } from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import VideoPlayerComponent from "./video-player/VideoPlayerComponent";
import { CourseActiveButton, CourseAppOnlyButton } from "./CourseButton";

type Props = {
  course: CourseDataType;
  lessonParam?: string | null;
  activeTab?: string;
};

const Course = ({ course, lessonParam, activeTab }: Props) => {
  const currentLeasson = course.sections
    .flatMap((section) =>
      section.chapters.flatMap((chapter) => chapter.lessons),
    )
    .find((leasson) => leasson.id === +lessonParam!);

  const userHasAccess =
    course?.user_has_access && !course.only_watchable_on_app;

  const tabsData = CourseTabsData({
    course,
  });

  return (
    <MobileProductLayout
      tabsData={tabsData}
      tabParam={activeTab}
      app={Apps.DOWNLOAD}
      preview={
        <VideoPlayerComponent
          course={course}
          lessonParam={lessonParam || undefined}
          userHasAccess={userHasAccess}
        />
      }
      title={course.title}
      headerSuffix={
        <CourseHeaderSiffix
          course={course}
          currentLessonId={currentLeasson?.id!}
        />
      }
      provider={{
        name: course.provider.name,
        img_url: course.provider.pic_url,
        id: course.provider.id,
      }}
      productButtonProps={{
        installment_payment: course.user_has_access
          ? false
          : course.installment_payment,
        installment_text: course.installment_text || undefined,
        mainPrice: course.price_main,
        offPrice: course.price_off,
        amazingPrice: course.price_amazing,
        productId: course.id,
        orderType: OrderType.Course,
        app: Apps.DOWNLOAD,
        replaceButton: course.user_has_access && (
          <CourseActiveButton course={course} />
        ),
        children: <CourseAppOnlyButton course={course} />,
      }}
    />
  );
};

export default Course;
