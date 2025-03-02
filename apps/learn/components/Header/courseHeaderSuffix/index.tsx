"use client";
import React, { useEffect, useState } from "react";
import style from "../PageHeader/PageHeader.module.scss";
import HeartIcon from "@/assets/svg/heart";
import ShareIcon from "@/assets/svg/share";
import BugIcon from "@/assets/svg/bug";
import ProfileIcon from "@/assets/svg/profile";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import HeartFillIcon from "@/assets/svg/heartFill";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { copyText } from "@repo/core/utils/copyText";

import { CourseDataType } from "@/types/courses";
import { useToggleFavoriteProduct } from "@/hooks/useToggleFavoriteProduct";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
interface Button {
  icon: React.ReactNode;
  onClick: () => void;
}

type Props = {
  course: CourseDataType;
};

const CourseHeaderSiffix = ({ course }: Props) => {
  const { isFavorite, toggleFavorite } = useToggleFavoriteProduct(
    !!course.user_favorite
  );

  const shareProduct = async () => {
    // const res = await api.shareProduct(id);
    const url = window.location.toString();

    copyText(`${url}`, "متن اشتراک گذاری کپی شد");
  };

  const favoriteOnClick = () => {
    toggleFavorite(course.id);
    // api.removeFavorite(course.id);
  };

  const buttons: Button[] = [
    {
      icon: isFavorite ? <HeartFillIcon color="red" /> : <HeartIcon />,
      onClick: favoriteOnClick,
    },
    {
      icon: <ShareIcon />,
      onClick: shareProduct,
    },
    {
      icon: <BugIcon />,
      onClick: () =>
        modalActions.addModal(ModalTypes.BUG_REPORT, {
          productId: course.id,
          type: "course",
        }),
    },
    {
      icon: <ProfileIcon />,
      onClick: () => modalActions.addModal(ModalTypes.VIDEO_NOTES_LIST),
    },
  ];
  return (
    <>
      {buttons.map((button) => (
        <button className={style.headerButton} onClick={button.onClick}>
          {button.icon}
        </button>
      ))}
    </>
  );
};

export default CourseHeaderSiffix;
