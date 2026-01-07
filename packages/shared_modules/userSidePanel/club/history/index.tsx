import React from "react";
import SidePanelClubHistoryCoins from "./coins";
import { TabDataType } from "../../types/general";
import UserSidePanelTabsController from "../../common/tabsController";
import style from "./SidePanelClubHistory.module.scss";
import SidePanelClubHistoryPoints from "./points";

const TabsData: TabDataType = {
  coins: {
    title: "امتیاز",
    content: <SidePanelClubHistoryPoints />,
  },
  points: {
    title: "سکه",
    content: <SidePanelClubHistoryCoins />,
  },
};

const SidePanelClubHistory: React.FC = () => {
  return (
    <>
      <UserSidePanelTabsController
        tabData={TabsData}
        className={style.sidePanelClubHistoryContainer}
      />
    </>
  );
};

export default SidePanelClubHistory;
