"use client";
import style from "./courseHeader.module.scss";
import ShareIcon from "@/assets/svg/share";
import BugIcon from "@/assets/svg/bug";
import ProfileIcon from "@/assets/svg/profile";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { CourseDataType } from "@/types/courses";
import { useToggleFavoriteProduct } from "@/hooks/useToggleFavoriteProduct";
import { api } from "@/api/Api";
import { useShareProduct } from "@repo/core/hooks/useShareProduct";
import Loading from "@/components/common/Loading";
import { Apps } from "@repo/core/types/general";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FavoriteHeartIcon } from "@repo/shared_modules/components";

interface Button {
  icon: React.ReactNode;
  onClick: () => void;
}

type Props = {
  course: CourseDataType;
  currentLessonId: number;
  goToBookmark: (lessonId: number, jumpTime: number) => void;
};

const CourseHeaderSiffix = ({
  course,
  currentLessonId,
  goToBookmark,
}: Props) => {
  const {
    isFavorite,
    toggleFavorite,
    isLoading: favoriteLoading,
  } = useToggleFavoriteProduct(!!course.user_favorite);
  const router = useRouter();

  const { shareProduct, isLoading: shareLoading } = useShareProduct(
    async () => {
      const res = await api.shareCourse(course.id);

      return {
        title: res.data.data.title,
        description: res.data.data.description,
        url: res.data.data.course_url,
      };
    }
  );

  const onShareProduct = async () => {
    if (shareLoading) return;
    shareProduct();
  };

  const favoriteOnClick = () => {
    toggleFavorite(course.id);
  };

  useEffect(() => {
    router.refresh();
  }, [isFavorite]);

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
