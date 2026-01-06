import React from "react";
import Image from "next/image";
import { RankingUserType } from "../../types/club";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import style from "./ranking.module.scss";

interface RankingListItemProps {
  user: RankingUserType;
  rank: number;
}

const RankingListItem: React.FC<RankingListItemProps> = ({ user, rank }) => {
  return (
    <div className={style.rankingListItem}>
      <div className={style.userInfo}>
        <span className={style.rankNumber}>{rank.toLocaleString("fa-IR")}</span>
        <div className={style.avatarContainer}>
          <Image
            src={user.profile_picture || placeHolderDataUrl}
            alt={user.name}
            fill
          />
        </div>
        <span className={style.userName}>{user.name}</span>
      </div>

      <div className={style.userScore}>
        {user.point_sum.toLocaleString("fa-IR")}
      </div>
    </div>
  );
};

export default RankingListItem;
