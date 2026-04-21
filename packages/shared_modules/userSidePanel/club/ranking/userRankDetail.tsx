import React from "react";
import Image from "next/image";
import { UserRankingDetailType } from "../../types/doctorClub";
import { User } from "@repo/core/types/user";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import style from "./ranking.module.scss";

interface UserRankDetailProps {
  detail: UserRankingDetailType;
  user?: User;
}

const UserRankDetail: React.FC<UserRankDetailProps> = ({ detail, user }) => {
  return (
    <div className={style.userRankDetailWrapper}>
      <div className={style.userRankDetailCard}>
        <div className={style.userRankAvatar}>
          <Image
            // @ts-ignore
            src={user?.avatar || placeHolderDataUrl}
            alt="Me"
            fill
          />
        </div>
        <div className={style.userRankInfo}>
          <div className={style.rankTitle}>
            رتبه{" "}
            <span className={style.rankValue}>
              {detail.user_ranking.toLocaleString("fa-IR")}
            </span>{" "}
            از {detail.users_count.toLocaleString("fa-IR")} دکترآبادی
          </div>
          <div className={style.rankSubtitle}>{detail.state_detail}</div>
        </div>
      </div>
    </div>
  );
};

export default UserRankDetail;
