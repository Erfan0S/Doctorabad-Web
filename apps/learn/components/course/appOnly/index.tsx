import React from "react";
import { baseUrls, routePath } from "@repo/core/constants/routePath";
import { Close_X } from "@repo/shared_modules/icons";

type Props = {
  closeModal: () => void;
};

export default function AppOnly({ closeModal }: Props) {
  return (
    <div className="relative rounded-[7px] bg-white p-[30px] pt-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
      <Close_X
        onClick={closeModal}
        className="absolute start-[10px] top-[10px] h-7 w-7 cursor-pointer text-black"
      />
      <p className="text-center text-[16px] font-semibold leading-10">
        این دوره فقط از طریق اپلیکیشن موبایل دکترآباد قابل مشاهده است
        <br />
        از طریق لینک زیر میتوانید اپ را دانلود نمایید
        <br />
        <a
          className="mt-5 inline-block rounded-[10px] bg-red px-[15px] text-white"
          href={baseUrls.base + routePath.appDownload}
          target="_blank"
        >
          دانلود اپلیکیشن دکترآباد
        </a>
      </p>
    </div>
  );
}
