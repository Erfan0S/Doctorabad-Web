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
      app={Apps.LEARN}
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
        app: Apps.LEARN,
        replaceButton: course.user_has_access && (
          <CourseActiveButton course={course} />
        ),
        children: <CourseAppOnlyButton course={course} />,
      }}
    />
  );

  // return (
  //   <div className={style.wrapper} onContextMenu={(e) => e.preventDefault()}>
  //     <PreventContext />
  //     <PageHeader
  //       title=""
  //       app={Apps.LEARN}
  //       suffix={
  //         <CourseHeaderSiffix
  //           course={course}
  //           currentLessonId={currentLeasson?.id!}
  //           goToBookmark={goToBookmark}
  //         />
  //       }
  //       haveMargin={false}
  //     />
  //     <div>
  //       <div className={style.container}>
  //         <div className={style.courseHeader}>
  //           <div className={style.courseHeaderTop}>
  //             {(!course.user_has_access && !course.course_preview) ||
  //             (!currentLeasson && !course.course_preview) ? (
  //               <div className={style.courseImagePrevWrapper}>
  //                 <Image
  //                   src={course.course_pic || ""}
  //                   alt={course.title}
  //                   fill
  //                   placeholder={placeHolderDataUrl}
  //                 />
  //               </div>
  //             ) : course.user_has_access && isLoading ? (
  //               <div className={videoPlayerStyle.palceHolder}>
  //                 <Loading />
  //               </div>
  //             ) : (
  //               <VideoPlayer
  //                 config={{
  //                   dash: userHasAccess
  //                     ? leassonData?.data?.data?.urls?.dash
  //                     : undefined,
  //                   hls: userHasAccess
  //                     ? leassonData?.data?.data?.urls?.hls
  //                     : undefined,
  //                   player: userHasAccess
  //                     ? leassonData?.data?.data?.urls?.player
  //                     : undefined,
  //                   source: userHasAccess
  //                     ? leassonData?.data?.data?.urls?.source
  //                     : course?.course_preview!,
  //                   thumbnail: course?.course_pic,
  //                 }}
  //                 title={currentLeasson?.title || "پیش نمایش"}
  //                 isUserHasAccess={userHasAccess}
  //                 lessonId={currentLeasson?.id!}
  //                 courseId={course.id}
  //                 goToNextTrack={goToNextTrack}
  //                 goToPreviousTrack={goToPreviousTrack}
  //                 suggestedCurrentTime={suggestedCurrentTime}
  //                 setSuggestedCurrentTime={setSuggestedCurrentTime}
  //               />
  //             )}
  //             <div className={style["course-title"]}>
  //               <Link href={`/providers/${course?.provider.id}`}>
  //                 <Image
  //                   src={course?.provider.pic_url || ""}
  //                   alt={course?.provider.name || "ارائه دهنده"}
  //                   width={100}
  //                   height={44}
  //                   placeholder={placeHolderDataUrl}
  //                 />
  //               </Link>
  //               <h1>{course?.title}</h1>
  //             </div>
  //           </div>
  //           <TabsController
  //             tabData={CourseTabsData}
  //             defaultTab={CourseTab.LESSONS}
  //           />
  //         </div>
  //         <div className={style.tabsContent}>
  //           {Object.entries(CourseTabsComponents).map(([id, Component]) => {
  //             return id === activeTab && course ? (
  //               <Component
  //                 description={course.description}
  //                 CourseData={course}
  //                 CourseId={course.id}
  //                 sections={course.sections}
  //                 onLessonClick={onLessonClick}
  //                 key={id}
  //               />
  //             ) : null;
  //           })}
  //         </div>
  //         <CourseButton
  //           course={course}
  //           mainPrice={mainPrice}
  //           offPrice={offPrice}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Course;
