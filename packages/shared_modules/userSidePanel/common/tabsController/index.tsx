"use client";
import classNames from "classnames";
import React, { useState } from "react";
import sidePanelStyle from "../../sidePanel.module.scss";
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
      <div className={sidePanelStyle.sidePanelTabs}>
        <ul>
          {Object.entries(tabData).map(([id, { title, content, disabled }]) => (
            <li
              key={id}
              className={classNames(
                currentTab === id && sidePanelStyle.active,
                disabled && sidePanelStyle.disabled
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
      <div className={sidePanelStyle.sidePanelTabContents}>
        {tabData[currentTab]?.content}
      </div>
    </div>
  );
};

export default UserSidePanelTabsController;
