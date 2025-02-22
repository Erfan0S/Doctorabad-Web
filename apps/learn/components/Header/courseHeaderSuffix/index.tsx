"use client";
import React from "react";
import style from "../PageHeader/PageHeader.module.scss";
import HeartIcon from "@/assets/svg/heart";
import ShareIcon from "@/assets/svg/share";
import BugIcon from "@/assets/svg/bug";
import ProfileIcon from "@/assets/svg/profile";

interface Button {
  icon: React.ReactNode;
  onClick: () => void;
}

const buttons: Button[] = [
  {
    icon: <HeartIcon />,
    onClick: () => null,
  },
  {
    icon: <ShareIcon />,
    onClick: () => null,
  },
  {
    icon: <BugIcon />,
    onClick: () => null,
  },
  {
    icon: <ProfileIcon />,
    onClick: () => null,
  },
];

const CourseHeaderSiffix = () => {
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
