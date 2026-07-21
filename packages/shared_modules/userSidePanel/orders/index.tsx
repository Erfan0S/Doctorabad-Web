import { useState } from "react";
import {
  SidePanelFavoriteTab,
  SidePanelPage,
  SidePanelPageProps,
} from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import { appsTabsData } from "../constants/apps-tabs-data";
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
            className="!w-auto px-[10px]"
            onClick={() => setPage!(SidePanelPage.PREV_CARTS)}
          >
            سبد‌های خرید من
            <CartIcon />
          </button>
        }
      />
      <div className="sidebar-tab-contents" id="orderListContainer">
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
          <CurrentTabComponent />
        </div>
      </div>
    </>
  );
};

export default SidePanelOrders;
