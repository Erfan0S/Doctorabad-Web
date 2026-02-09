"use client";
import React, { Suspense } from "react";
import style from "./ProductTabsController.module.scss";
import Item from "./Item";
import { MobileHomeHeaderDataConfig } from "@repo/core/types/configs";
import { usePathname, useSearchParams } from "next/navigation";
import { Apps } from "@repo/core/types/general";

interface Props {
  tabData: MobileHomeHeaderDataConfig[];
  type: Apps;
  className?: string;
  defaultTab?: string;
}
const TabsControllerContent: React.FC<Props> = ({
  tabData,
  className,
  defaultTab,
  type,
}) => {
  const params = useSearchParams();
  const pathname = usePathname();

  const appStyle = style[type];

  return (
    <div
      className={`${style.productTabsController} ${className} ${style[type]}`}
    >
      <ul>
        {tabData.map((data) => (
          <Item
            key={data.id}
            tabData={data}
            url={data?.url}
            isActive={
              params?.get("tab") || data?.url
                ? params?.get("tab") === data.id || pathname === data?.url
                : data.id === defaultTab
            }
          />
        ))}
      </ul>
    </div>
  );
};

const TabsController: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={null}>
      <TabsControllerContent {...props} />
    </Suspense>
  );
};

export default TabsController;
