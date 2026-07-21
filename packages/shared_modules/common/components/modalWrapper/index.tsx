import { ModalProps } from "@repo/core/types/modals";
import React from "react";
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
      className={`relative flex min-h-[300px] min-w-[300px] max-w-[500px] flex-col items-center justify-center rounded-[15px] bg-white p-[10px] pb-[30px] max-[300px]:min-w-[100vw] ${className} ${app} ${appIcon && "pt-[50px]"}`}
    >
      {haveAppIcon && (appIcon || customIcon) && (
        <div
          className={`card absolute right-1/2 top-0 translate-x-1/2 -translate-y-1/2 bg-white p-[5px] [&_img]:h-[60px] [&_img]:w-[60px] [&_img]:rounded-[10px]`}
        >
          {customIcon
            ? customIcon
            : appIcon && <Image src={appIcon} alt="appIcon" />}
        </div>
      )}
      {children}
      {haveCloseBtn && (
        <div className="absolute bottom-0 right-1/2 flex min-w-[100px] flex-none translate-x-1/2 translate-y-[25px] flex-col gap-[5px] [&_button]:w-full">
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
