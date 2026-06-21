"use client";

import Loading from "@/components/common/Loading";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import { CourseDataType, Lesson } from "@/types/courses";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { api } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import style from "../Course.module.scss";
import videoPlayerStyle from "./VideoPlayer.module.scss";
import { LessonVideoContext } from "@/context/LessonVideoContext";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";

type Props = {
  course: CourseDataType;
  currentLeasson?: Lesson;
  userHasAccess: boolean;
  lessonParam?: string;
};

const VideoPlayerComponent = ({
  course,
  lessonParam,
  userHasAccess,
}: Props) => {
  const {
    setBookmark,
    bookmark,
    clearBookmark,
    currentLeasson,
    setCurrentLeasson,
  } = useContext(LessonVideoContext);

  const changeSearchParamsFilter = useChangeSearchParamsFilter();

  const { data: leassonData, isLoading } = useQuery({
    queryKey: ["course-videop", `leason-${course.id}-${currentLeasson?.id}`],
    queryFn: () => api.getVideo(Number(course.id), currentLeasson?.id!),
    enabled: !!currentLeasson?.id,
    retry: false,
    placeholderData: (data) => data,
  });

  const flatLeasons = course.sections.flatMap((section) =>
    section.chapters.flatMap((chapter) => chapter.lessons),
  );

  useEffect(() => {
    if (lessonParam && lessonParam !== currentLeasson?.id.toString()) {
      setCurrentLeasson(
        flatLeasons.find((leasson) => leasson.id === +lessonParam) || null,
      );
    }
  }, [lessonParam]);

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
      clearBookmark();
      setCurrentLeasson(nextLeasson);
      changeSearchParamsFilter({ lesson: nextLeasson.id.toString() });
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
      clearBookmark();
      setCurrentLeasson(previousLeasson);
      changeSearchParamsFilter({ lesson: previousLeasson.id.toString() });
    }
  };

  const coursePreview = course?.course_preview.trim() || null;

  return (
    <>
      {(!course.user_has_access && !coursePreview) ||
      (!currentLeasson && !coursePreview) ? (
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
            hls: userHasAccess ? leassonData?.data?.data?.urls?.hls : undefined,
            player: userHasAccess
              ? leassonData?.data?.data?.urls?.player
              : undefined,
            source: userHasAccess
              ? leassonData?.data?.data?.urls?.source
              : coursePreview!,
            thumbnail: course?.course_pic,
          }}
          title={currentLeasson?.title || "پیش نمایش"}
          isUserHasAccess={userHasAccess}
          lessonId={currentLeasson?.id!}
          courseId={course.id}
          goToNextTrack={goToNextTrack}
          goToPreviousTrack={goToPreviousTrack}
        />
      )}
    </>
  );
};

export default VideoPlayerComponent;
