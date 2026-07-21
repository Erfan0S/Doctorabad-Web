"use client";
import classNames from "classnames";
import React, { useState } from "react";
import { TabDataType } from "../../types/general";

type Props = {
  tabData: TabDataType;
  onChangeTab?: (tab: string | number) => void;
  initialTabId?: string;
  id?: string;
  className?: string;
};

const UserSidePanelTabsController: React.FC<Props> = ({
  id,
  className,
  tabData,
  initialTabId,
  onChangeTab,
}) => {
  const [currentTab, setCurrentTab] = useState(
    initialTabId || Object.keys(tabData)[0]
  );

  const onChangeTabHandle = (tab: string) => {
    onChangeTab && onChangeTab(tab);
    setCurrentTab(tab);
  };

  return (
    <div className={`sidebar-tab-contents ${className}`} id={id}>
      <div className="sticky top-0 z-[100] bg-header-bg shadow-[0_3px_3px_rgba(0,0,0,0.1)]">
        <ul className="m-0 flex list-none p-0">
          {Object.entries(tabData).map(([id, { title, content, disabled }]) => (
            <li
              key={id}
              className={classNames(
                "relative flex-auto cursor-pointer px-[5px] text-center text-[length:small] leading-[50px] transition-all duration-150 before:absolute before:inset-x-[2px] before:-bottom-[3px] before:h-[6px] before:rounded-[3px] before:bg-transparent before:transition-all before:duration-150 before:content-['']",
                currentTab === id &&
                  "cursor-default font-semibold before:!bg-green-base",
                disabled && "cursor-default opacity-30"
              )}
              onClick={
                !disabled ? () => onChangeTabHandle(id.toString()) : undefined
              }
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-[0_1_100%] px-3 py-4">
        {tabData[currentTab]?.content}
      </div>
    </div>
  );
};

export default UserSidePanelTabsController;
