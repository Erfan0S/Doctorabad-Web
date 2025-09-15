import { ModalProps } from "@repo/core/types/modals";
import React from "react";
import style from "./modalWrapper.module.scss";
import { Button } from "..";
import { Apps } from "@repo/core/types/general";
// @ts-ignore
import examIcon from "../../../assets/img/doctor-exam.png";
// @ts-ignore
import learnIcon from "../../../assets/img/doctor-learn.png";
// @ts-ignore
import marketIcon from "../../../assets/img/doctor-market.png";
// @ts-ignore
import baseIcon from "../../../assets/img/logo-without-text.png";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
  let appIcon: string | StaticImport | undefined;
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
          {customIcon
            ? customIcon
            : appIcon && <Image src={appIcon} alt="appIcon" />}
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
