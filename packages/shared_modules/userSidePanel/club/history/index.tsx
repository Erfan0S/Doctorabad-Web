import React from "react";
import SidePanelClubHistoryCoins from "./coins";
import { TabDataType } from "../../types/general";
import UserSidePanelTabsController from "../../common/tabsController";
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
        className="p-0"
      />
    </>
  );
};

export default SidePanelClubHistory;
