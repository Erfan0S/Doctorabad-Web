import React from "react";
import Image from "next/image";
import { RankingUserType } from "../../types/doctorClub";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

interface RankingListItemProps {
  user: RankingUserType;
  rank: number;
}

const RankingListItem: React.FC<RankingListItemProps> = ({ user, rank }) => {
  return (
    <div className="mb-1.5 flex items-center justify-between px-1.5 py-3 [direction:rtl]">
      <div className="flex items-center">
        <span className="ml-2 w-6 text-center text-base font-bold text-[#666]">{rank.toLocaleString("fa-IR")}</span>
        <div className="relative ml-3 h-12 w-12 overflow-hidden rounded-full bg-[#f0f0f0] [&_img]:object-cover">
          <Image
            src={user.profile_picture || placeHolderDataUrl}
            alt={user.name}
            fill
          />
        </div>
        <span className="text-sm font-medium text-[#333] [direction:ltr]">{user.name}</span>
      </div>

      <div className="text-sm font-bold text-[#8bc34a]">
        {user.point_sum.toLocaleString("fa-IR")}
      </div>
    </div>
  );
};

export default RankingListItem;
