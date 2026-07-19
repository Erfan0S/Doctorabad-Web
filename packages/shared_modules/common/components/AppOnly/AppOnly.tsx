import React from "react";
import { baseUrls, routePath } from "@repo/core/constants/routePath";
import { Close_X } from "@repo/shared_modules/icons";
import { Apps } from "@repo/core/types/general";

type Props = {
  closeModal: () => void;
  app?: Apps;
};

export default function AppOnly({ closeModal, app }: Props) {
  const getButtonClass = () => {
    switch (app) {
      case Apps.LEARN:
        return "bg-red";
      case Apps.DOWNLOAD:
        return "bg-blue-dark";
      default:
        return "bg-green-base";
    }
  };

  return (
    <div className="relative rounded-[7px] bg-white p-[30px] pt-[40px] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
      <Close_X onClick={closeModal} className="absolute start-[10px] top-[10px] h-[28px] w-[28px] cursor-pointer text-black" />
      <p className="text-center text-[1rem] font-semibold leading-[40px]">
        این دوره فقط از طریق اپلیکیشن موبایل دکترآباد قابل مشاهده است
        <br />
        از طریق لینک زیر میتوانید اپ را دانلود نمایید
        <br />
        <a 
          href={baseUrls.base + routePath.appDownload} 
          target="_blank" 
          className={`mt-[20px] inline-block rounded-[10px] px-[15px] text-white ${getButtonClass()}`}
          rel="noreferrer"
        >
          دانلود اپلیکیشن دکترآباد
        </a>
      </p>
    </div>
  );
}
