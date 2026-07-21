import React, { ReactElement } from "react";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import CopyCode from "../../../assets/svg/copyCode";
import { copyText } from "@repo/core/utils/copyText";

export type Props = {
  title: string;
  created_at: string;
  badge?: string | ReactElement;
};

const ClubHistoryItem: React.FC<Props> = ({ badge, created_at, title }) => {
  return (
    <div className="relative mb-2 flex flex-col gap-1 rounded bg-white px-3 py-2 shadow-[0_3px_10px_rgba(0,0,0,0.1)] last-of-type:mb-0">
      <div className="absolute end-[10px] top-[7px] text-[length:larger] text-green-base">
        {badge}
      </div>
      <span className="pe-[50px] text-[length:larger] font-medium text-black">{title}</span>

      <span className="text-gray">
        {toFullPersianDateString(created_at)}
      </span>
    </div>
  );
};

export default ClubHistoryItem;
