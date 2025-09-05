import { ModalProps } from "@repo/core/types/modals";
import React from "react";
import style from "./modalWrapper.module.scss";
import { Button } from "..";
import { Apps } from "@repo/core/types/general";
// @ts-expect-error
import examIcon from "../../../assets/img/doctor-exam.png";
// @ts-expect-error
import learnIcon from "../../../assets/img/doctor-learn.png";
// @ts-expect-error
import marketIcon from "../../../assets/img/doctor-market.png";
// @ts-expect-error
import baseIcon from "../../../assets/img/logo-without-text.png";
import Image from "next/image";

interface Props extends Partial<ModalProps> {
  children: React.ReactNode;
  app?: Apps;
  className?: string;
  haveAppIcon?: boolean;
  customIcon?: React.ReactNode;
}

function ModalWrapper({
  children,
  className,
  app = Apps.BASE,
  haveAppIcon = true,
  closeModal,
  customIcon,
}: Props) {
  let appIcon;
  switch (app) {
    case Apps.EXAM:
      appIcon = examIcon;
      break;
    case Apps.LEARN:
      appIcon = learnIcon;
      break;
    case Apps.MARKET:
      appIcon = marketIcon;
      break;
    case Apps.BASE:
      appIcon = baseIcon;
      break;
    default:
      break;
  }

  return (
    <div
      className={`${style.modalWrapper} ${className} ${style[app]} ${appIcon && style.haveAppIcon}`}
    >
      {haveAppIcon && (appIcon || customIcon) && (
        <div className={`card ${style.appIcon}`}>
          {customIcon ? customIcon : <Image src={appIcon} alt="appIcon" />}
        </div>
      )}
      {children}
      {!!closeModal && (
        <Button
          app={app}
          className={style.closeBtn}
          onClick={() => closeModal()}
        >
          تایید
        </Button>
      )}
    </div>
  );
}

export default ModalWrapper;
