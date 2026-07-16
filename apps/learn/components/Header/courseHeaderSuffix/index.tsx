"use client";
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
        app={Apps.LEARN}
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
        <button
          className="me-2 flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-xl border-0 bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] outline-none first-of-type:me-0 focus:outline-none active:outline-none [&_img]:h-[30px] [&_img]:w-[30px] [&_svg]:h-[30px] [&_svg]:w-[30px]"
          onClick={onBookMarkClick}
        >
          <ProfileIcon />
        </button>
      )}
    </>
  );
};

export default CourseHeaderSiffix;
