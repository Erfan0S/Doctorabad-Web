"use client";

import { baseUrls, routePath } from "@repo/core/constants/routePath";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { Apps } from "@repo/core/types/general";

type Props = {
  active?: boolean;
};

const ProTag = ({ active = false }: Props) => {
  return (
    <div
      className={`inline-flex cursor-pointer select-none items-center justify-center rounded-s-[10px] px-[4px] text-[16px] font-semibold leading-[20px] text-white ${active ? "bg-green-pro" : "animate-[pulse_1.2s_ease-in-out_infinite] bg-[#bdbdbd]"}`}
      onClick={authorizeClientAction(() => {
        window.open(`${baseUrls[Apps.BASE]}${routePath.pro}`, "_self");
      })}
    >
      <span>Pro</span>
    </div>
  );
};

export default ProTag;
