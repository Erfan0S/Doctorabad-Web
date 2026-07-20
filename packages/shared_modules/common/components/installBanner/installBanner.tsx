"use client";
import React, { useState } from "react";
import Image from "next/image";
// @ts-ignore
import logo from "../../../assets/img/logo-without-text.png";
import { Close_X } from "@repo/shared_modules/icons";
import { isIOS } from "react-device-detect";
import { useRouter } from "next/navigation";
import { IS_INSTALL_BANNER_SHOW_LOCAL } from "@repo/core/constants/constants";

type Props = {
  androidDownloadLink: string;
};

const InstallBanner = ({ androidDownloadLink }: Props) => {
  const [isClose, setIsClose] = useState(false);
  const router = useRouter();

  const onInstallHandler = () => {
    if (isIOS) {
      window.location.href = window.location.origin + "/pwa";
    } else {
      window.location.href = window.location.origin + "/app";
      // window.open(androidDownloadLink, '_blank');
    }
  };

  const onDismisHandler = () => {
    setIsClose(true);

    localStorage.setItem(IS_INSTALL_BANNER_SHOW_LOCAL, "true");
  };

  return (
    <div
      className={
        "fixed bottom-[10px] left-1/2 z-[1000] mx-auto flex h-[60px] w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-row items-center justify-between rounded-[10px] bg-[rgba(0,0,0,0.5)] p-[8px] backdrop-blur-[10px] max-md:bottom-[55px] [&_svg]:w-[40px] [&_svg]:h-auto [&_svg]:cursor-pointer" +
        " " +
        (isClose ? "hidden" : "")
      }
    >
      <Image className="h-full w-auto" src={logo} alt="drabad logo" />
      <span className="ms-[20px] flex-1 text-[18px] font-bold text-white max-[500px]:text-[12px]">
        دانلود اپلیکیشن دکترآباد
      </span>
      <button
        onClick={onInstallHandler}
        className="me-[20px] h-full w-[110px] rounded-[13px] border-none bg-green text-[20px] font-bold text-white max-[500px]:h-[40px] max-[500px]:w-[70px] max-[500px]:text-[12px]"
      >
        نصب
      </button>
      <Close_X onClick={onDismisHandler} />
    </div>
  );
};

export default InstallBanner;
