import { useState } from "react";
import { SidePanelFavoriteTab, SidePanelPageProps } from "../types/sidePanel";
import SidePanelHeader from "../header";
import { favoriteTabsData } from "./tabs-data";
import sidePanelStyle from "../sidePanel.module.scss";
import SidePanelFavoritesLearning from "./learning";
import SidePanelFavoritesShopping from "./shopping";
import SidePanelFavoritesContent from "./content";
import SidePanelFavoritesExam from "./exam";
import classNames from "classnames";

const SidePanelFavorites: React.FC<SidePanelPageProps> = ({ setPage }) => {
  const [currentTab, setCurrentTab] = useState(
    SidePanelFavoriteTab.LEARNING_CENTER
  );
  const [tabData, setTabData] = useState(favoriteTabsData);

  const onChangeTab = (content: SidePanelFavoriteTab) => {
    setTabData((prev) =>
      prev.map((item) => ({ ...item, active: item.content === content }))
    );
    setCurrentTab(content);
  };

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
            {tabData.map(({ id, title, active, content, disabled }) => (
              <li
                key={id}
                className={classNames(
                  active && sidePanelStyle.active,
                  disabled && sidePanelStyle.disabled
                )}
                onClick={
                  !active && !disabled ? () => onChangeTab(content) : undefined
                }
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
        <div className={sidePanelStyle.sidePanelTabContents}>
          <SidePanelFavoritesShopping />
        </div>
      </div>
    </>
  );
};

export default SidePanelFavorites;
