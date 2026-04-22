"use client";
import style from "./courseHeader.module.scss";
import ProfileIcon from "@/assets/svg/profile";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { CourseDataType } from "@/types/courses";
import { api } from "@/api/Api";
import { Apps } from "@repo/core/types/general";
import { useContext } from "react";
import { LessonVideoContext } from "@/context/LessonVideoContext";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { MobileHeaderBaseSiffix } from "@repo/shared_modules/headers";

interface Button {
  icon: React.ReactNode;
  onClick: () => void;
}

type Props = {
  course: CourseDataType;
  currentLessonId: number;
};

const CourseHeaderSiffix = ({ course, currentLessonId }: Props) => {
  const { setBookmark } = useContext(LessonVideoContext);

  const changeSearchParamsFilter = useChangeSearchParamsFilter();

  const goToBookmark = (lessonId: number, jumpTime: number) => {
    changeSearchParamsFilter({ lesson: lessonId.toString() });
    setBookmark({ lessonId, time: jumpTime });
    modalActions.removeLastModal();
  };

  const onBookMarkClick = () => {
    modalActions.addModal(ModalTypes.VIDEO_NOTES_LIST, {
      courseId: course.id,
      goToBookmark,
      currentLessonId,
    });
  };

  return (
    <>
      <MobileHeaderBaseSiffix
        id={course.id}
        app={Apps.DOWNLOAD}
        initialFavorite={!!course.user_favorite}
        shareAction={async () => {
          const res = await api.shareCourse(course.id);

          return {
            title: res.data.data.title,
            description: res.data.data.description,
            url: res.data.data.course_url,
          };
        }}
        favoriteAction={async (isFavorite) => {
          await api[!isFavorite ? "addFavorite" : "removeFavorite"](course.id);
        }}
      />
      {course.user_has_access && (
        <button className={style.headerButton} onClick={onBookMarkClick}>
          <ProfileIcon />
        </button>
      )}
    </>
  );
};

export default CourseHeaderSiffix;
