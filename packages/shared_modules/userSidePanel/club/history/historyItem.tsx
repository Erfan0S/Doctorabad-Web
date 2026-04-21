import React, { ReactElement } from "react";
import style from "./SidePanelClubHistory.module.scss";
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
    <div className={`${style.sidePanelClubHistoryItem}`}>
      <div className={style.sidePanelClubHistoryItemBadgeContainer}>
        {badge}
      </div>
      <span className={style.sidePanelClubHistoryItemTitle}>{title}</span>

      <span className={style.sidePanelClubHistoryItemCreatedAt}>
        {toFullPersianDateString(created_at)}
      </span>
    </div>
  );
};

export default ClubHistoryItem;
