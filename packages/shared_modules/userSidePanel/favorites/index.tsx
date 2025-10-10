import { useEffect, useState } from "react";
import {
  SidePanelFavoriteTab,
  SidePanelPage,
  SidePanelPageProps,
} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import sidePanelStyle from "../sidePanel.module.scss";
import SidePanelFavoritesLearning from "./learning";
import SidePanelFavoritesShopping from "./shopping";
import SidePanelFavoritesContent from "./content";
import SidePanelFavoritesExam from "./exam";
import classNames from "classnames";
import { appsTabsData } from "../constants/apps-tabs-data";

const SidePanelFavorites: React.FC<SidePanelPageProps> = ({
  setPage,
  data,
}) => {
  const [currentTab, setCurrentTab] = useState(
    (data?.initialTab as SidePanelFavoriteTab) ||
      SidePanelFavoriteTab.LEARNING_CENTER
  );
  const [tabData, setTabData] = useState(appsTabsData);

  const onChangeTab = (content: SidePanelFavoriteTab) => {
    setTabData((prev) =>
      prev.map((item) => ({ ...item, active: item.content === content }))
    );
    setCurrentTab(content);
  };

  useEffect(() => {
    onChangeTab(currentTab);
  }, [currentTab]);

  const clubTabsComponents = {
    [SidePanelFavoriteTab.LEARNING_CENTER]: SidePanelFavoritesLearning,
    [SidePanelFavoriteTab.SHOPPING_CENTER]: SidePanelFavoritesShopping,
    [SidePanelFavoriteTab.CONTENT_CENTER]: SidePanelFavoritesContent,
    [SidePanelFavoriteTab.EXAM_CENTER]: SidePanelFavoritesExam,
  };

  const CurrentTabComponent = clubTabsComponents[currentTab];

  return (
    <>
      <SidePanelHeader setPage={setPage} title="علاقه‌مندی‌های‌من" />
      <div className="sidebar-tab-contents" id="favoriteListContainer">
        <div className={sidePanelStyle.sidePanelTabs}>
          <ul>
            {tabData.map(({ id, title, content, disabled }) => (
              <li
                key={id}
                className={classNames(
                  currentTab === content && sidePanelStyle.active,
                  disabled && sidePanelStyle.disabled
                )}
                onClick={!disabled ? () => onChangeTab(content) : undefined}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
        <div className={sidePanelStyle.sidePanelTabContents}>
          <CurrentTabComponent key={currentTab} />
        </div>
      </div>
    </>
  );
};

export default SidePanelFavorites;
