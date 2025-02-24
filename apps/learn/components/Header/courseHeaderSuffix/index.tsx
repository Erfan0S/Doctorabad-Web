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

interface Button {
  icon: React.ReactNode;
  onClick: () => void;
}

type Props = {
  id: string;
};

const CourseHeaderSiffix = ({ id }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: () => api.getCourse(Number(id)),
    enabled: !!id,
    retry: false,
  });

  useEffect(() => {
    setIsFavorite(!!data?.data.data.user_favorite);
  }, [data]);

  const favoriteOnClick = () => {
    isFavorite ? api.removeFavorite(+id) : api.addFavorite(+id);
    console.log(id);
    setIsFavorite((prev) => !prev);
  };

  const buttons: Button[] = [
    {
      icon: isFavorite ? <HeartFillIcon color="red" /> : <HeartIcon />,
      onClick: favoriteOnClick,
    },
    {
      icon: <ShareIcon />,
      onClick: () => null,
    },
    {
      icon: <BugIcon />,
      onClick: () =>
        modalActions.addModal(ModalTypes.BUG_REPORT, {
          productId: id,
          type: "course",
        }),
    },
    {
      icon: <ProfileIcon />,
      onClick: () => null,
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
