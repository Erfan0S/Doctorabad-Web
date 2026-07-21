import React from "react";
import Image from "next/image";
import { UserRankingDetailType } from "../../types/doctorClub";
import { User } from "@repo/core/types/user";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

interface UserRankDetailProps {
  detail: UserRankingDetailType;
  user?: User;
}

const UserRankDetail: React.FC<UserRankDetailProps> = ({ detail, user }) => {
  return (
    <div className="mb-2 mt-4 px-4">
      <div className="flex items-center justify-between rounded-xl border border-solid border-[#e0e0e0] bg-[#fafafa] p-4 [direction:rtl]">
        <div className="relative ml-2 h-14 w-14 overflow-hidden rounded-full border-2 border-solid border-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] [&_img]:object-cover">
          <Image
            // @ts-ignore
            src={user?.avatar || placeHolderDataUrl}
            alt="Me"
            fill
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 text-sm font-bold text-[#888]">
            رتبه{" "}
            <span className="text-base text-[#8bc34a]">
              {detail.user_ranking.toLocaleString("fa-IR")}
            </span>{" "}
            از {detail.users_count.toLocaleString("fa-IR")} دکترآبادی
          </div>
          <div className="text-[11px] text-[#888]">{detail.state_detail}</div>
        </div>
      </div>
    </div>
  );
};

export default UserRankDetail;
