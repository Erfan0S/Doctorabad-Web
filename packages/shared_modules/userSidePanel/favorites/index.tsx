import { useEffect, useState } from "react";
import {
  SidePanelFavoriteTab,
  SidePanelPage,
  SidePanelPageProps,
} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import SidePanelFavoritesLearning from "./learning";
import SidePanelFavoritesShopping from "./shopping";
import SidePanelFavoritesExam from "./exam";
import classNames from "classnames";
import { appsTabsData } from "../constants/apps-tabs-data";
import SidePanelFavoritesDownload from "./download";

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
    [SidePanelFavoriteTab.DOWNLOAD_CENTER]: SidePanelFavoritesDownload,
    [SidePanelFavoriteTab.EXAM_CENTER]: SidePanelFavoritesExam,
  };

  const CurrentTabComponent = clubTabsComponents[currentTab];

  return (
    <>
      <SidePanelHeader setPage={setPage} title="علاقه‌مندی‌های‌من" />
      <div className="sidebar-tab-contents" id="favoriteListContainer">
        <div className="sticky top-0 z-[100] bg-header-bg shadow-[0_3px_3px_rgba(0,0,0,0.1)]">
          <ul className="m-0 flex list-none p-0">
            {tabData.map(({ id, title, content, disabled }) => (
              <li
                key={id}
                className={classNames(
                  "relative flex-auto cursor-pointer px-[5px] text-center text-[length:small] leading-[50px] transition-all duration-150 before:absolute before:inset-x-[2px] before:-bottom-[3px] before:h-[6px] before:rounded-[3px] before:bg-transparent before:transition-all before:duration-150 before:content-['']",
                  currentTab === content && "cursor-default font-semibold before:!bg-green-base",
                  disabled && "cursor-default opacity-30"
                )}
                onClick={!disabled ? () => onChangeTab(content) : undefined}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-[0_1_100%] px-3 py-4">
          <CurrentTabComponent key={currentTab} />
        </div>
      </div>
    </>
  );
};

export default SidePanelFavorites;
