import { useState } from "react";
import {
  SidePanelFavoriteTab,
  SidePanelPage,
  SidePanelPageProps,
} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import { appsTabsData } from "../constants/apps-tabs-data";
import sidePanelStyle from "../sidePanel.module.scss";
import SidePanelOrdersLearning from "./learning";
import SidePanelOrdersShopping from "./shopping";
import SidePanelOrdersDownload from "./download";
import SidePanelOrdersExam from "./exam";
import classNames from "classnames";
import { api } from "../../api/Api";
import { CartIcon } from "../../assets";

const SidePanelOrders: React.FC<SidePanelPageProps> = ({ setPage }) => {
  const [currentTab, setCurrentTab] = useState(
    SidePanelFavoriteTab.LEARNING_CENTER
  );
  const [tabData, setTabData] = useState(appsTabsData);

  const onChangeTab = (content: SidePanelFavoriteTab) => {
    setTabData((prev) =>
      prev.map((item) => ({ ...item, active: item.content === content }))
    );
    setCurrentTab(content);
  };

  const clubTabsComponents = {
    [SidePanelFavoriteTab.LEARNING_CENTER]: SidePanelOrdersLearning,
    [SidePanelFavoriteTab.SHOPPING_CENTER]: SidePanelOrdersShopping,
    [SidePanelFavoriteTab.DOWNLOAD_CENTER]: SidePanelOrdersDownload,
    [SidePanelFavoriteTab.EXAM_CENTER]: SidePanelOrdersExam,
  };

  const CurrentTabComponent = clubTabsComponents[currentTab];

  return (
    <>
      <SidePanelHeader
        setPage={setPage}
        title="سفارش‌های‌من"
        suffix={
          <button
            className={sidePanelStyle.suffixButton}
            onClick={() => setPage!(SidePanelPage.PREV_CARTS)}
          >
            سبد‌های خرید من
            <CartIcon />
          </button>
        }
      />
      <div className="sidebar-tab-contents" id="orderListContainer">
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
          <CurrentTabComponent />
        </div>
      </div>
    </>
  );
};

export default SidePanelOrders;
