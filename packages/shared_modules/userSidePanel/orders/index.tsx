import {useState} from "react";
import {
  SidePanelFavoriteTab,
  SidePanelPageProps,
} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import {favoriteTabsData} from "./tabs-data";
import sidePanelStyle from "../sidePanel.module.scss";
import SidePanelOrdersLearning from "./learning";
import SidePanelOrdersShopping from "./shopping";
import SidePanelOrdersContent from "./content";
import SidePanelOrdersExam from "./exam";
import classNames from "classnames";
import {api} from "../../api/Api";

const SidePanelOrders: React.FC<SidePanelPageProps> = ({setPage}) => {
  const [currentTab, setCurrentTab] = useState(
    SidePanelFavoriteTab.SHOPPING_CENTER
  );
  const [tabData, setTabData] = useState(favoriteTabsData);

  const onChangeTab = (content: SidePanelFavoriteTab) => {
    setTabData((prev) =>
      prev.map((item) => ({...item, active: item.content === content}))
    );
    setCurrentTab(content);
  };

  const clubTabsComponents = {
    [SidePanelFavoriteTab.LEARNING_CENTER]: SidePanelOrdersLearning,
    [SidePanelFavoriteTab.SHOPPING_CENTER]: SidePanelOrdersShopping,
    [SidePanelFavoriteTab.CONTENT_CENTER]: SidePanelOrdersContent,
    [SidePanelFavoriteTab.EXAM_CENTER]: SidePanelOrdersExam,
  };

  const CurrentTabComponent = clubTabsComponents[currentTab];

  return (
    <>
      <SidePanelHeader setPage={setPage} title="سفارش‌های‌من" />
      <div className="sidebar-tab-contents" id="orderListContainer">
        <div className={sidePanelStyle.sidePanelTabs}>
          <ul>
            {tabData.map(({id, title, active, content, disabled}) => (
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
          <CurrentTabComponent />
        </div>
      </div>
    </>
  );
};

export default SidePanelOrders;
