"use client";
import style from "./courseHeader.module.scss";
import ShareIcon from "@/assets/svg/share";
import BugIcon from "@/assets/svg/bug";
import ProfileIcon from "@/assets/svg/profile";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { CourseDataType, Lesson } from "@/types/courses";
import { useToggleFavoriteProduct } from "@/hooks/useToggleFavoriteProduct";
import { api } from "@/api/Api";
import { useShareProduct } from "@repo/core/hooks/useShareProduct";
import Loading from "@/components/common/Loading";
import { Apps } from "@repo/core/types/general";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FavoriteHeartIcon } from "@repo/shared_modules/components";
import { LessonVideoContext } from "@/context/LessonVideoContext";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";

interface Button {
  icon: React.ReactNode;
  onClick: () => void;
}

type Props = {
  course: CourseDataType;
  currentLessonId: number;
};

const CourseHeaderSiffix = ({ course, currentLessonId }: Props) => {
  const {
    isFavorite,
    toggleFavorite,
    isLoading: favoriteLoading,
  } = useToggleFavoriteProduct(!!course.user_favorite);
  const router = useRouter();
  const { setBookmark } = useContext(LessonVideoContext);

  const changeSearchParamsFilter = useChangeSearchParamsFilter();

  const { shareProduct, isLoading: shareLoading } = useShareProduct(
    async () => {
      const res = await api.shareCourse(course.id);

      return {
        title: res.data.data.title,
        description: res.data.data.description,
        url: res.data.data.course_url,
      };
    },
  );

  const onShareProduct = async () => {
    if (shareLoading) return;
    shareProduct();
  };

  const favoriteOnClick = () => {
    toggleFavorite(course.id);
  };

  const goToBookmark = (lessonId: number, jumpTime: number) => {
    changeSearchParamsFilter({ lesson: lessonId.toString() });
    setBookmark({ lessonId, time: jumpTime });
    modalActions.removeLastModal();
  };

  const buttons: Button[] = [
    {
      icon: (
        <FavoriteHeartIcon
          isFavorite={isFavorite}
          loading={favoriteLoading}
          app={Apps.LEARN}
        />
      ),
      onClick: favoriteOnClick,
    },
    {
      icon: shareLoading ? <Loading /> : <ShareIcon />,
      onClick: onShareProduct,
    },
    {
      icon: <BugIcon />,
      onClick: () =>
        modalActions.addModal(ModalTypes.BUG_REPORT, {
          productId: course.id,
          app: Apps.LEARN,
        }),
    },
    {
      icon: <ProfileIcon />,
      onClick: () =>
        modalActions.addModal(ModalTypes.VIDEO_NOTES_LIST, {
          courseId: course.id,
          goToBookmark,
          currentLessonId,
        }),
    },
  ];
  return (
    <>
      {buttons.map((button, i) => (
        <button className={style.headerButton} onClick={button.onClick} key={i}>
          {button.icon}
        </button>
      ))}
    </>
  );
};

export default CourseHeaderSiffix;
