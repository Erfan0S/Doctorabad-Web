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

interface Props extends Omit<ModalProps, "data"> {
  children: React.ReactNode;
  app?: Apps;
  className?: string;
  haveAppIcon?: boolean;
  haveCloseBtn?: boolean;
  customIcon?: React.ReactNode;
  submitText?: string;
  submitButton?: React.ReactNode;
  onSubmit?: () => void;
}

function ModalWrapper({
  children,
  className,
  app = Apps.BASE,
  haveAppIcon = true,
  closeModal,
  customIcon,
  onSubmit,
  submitText = "تایید",
  submitButton,
  haveCloseBtn = true,
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
      {haveCloseBtn && (
        <div className={style.closeBtn}>
          {submitButton ? (
            submitButton
          ) : (
            <Button
              app={app}
              onClick={() => (onSubmit ? onSubmit() : closeModal())}
            >
              {submitText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default ModalWrapper;
