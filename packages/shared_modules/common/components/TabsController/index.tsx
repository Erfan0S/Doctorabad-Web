"use client";
import React, { Suspense } from "react";
import style from "./ProductTabsController.module.scss";
import Item from "./Item";
import { MobileTabsConfig } from "@repo/core/types/configs";
import { usePathname, useSearchParams } from "next/navigation";
import { Apps } from "@repo/core/types/general";

interface Props {
  tabData: MobileTabsConfig[];
  app?: Apps;
  className?: string;
  defaultTab?: string;
  haveLoading?: boolean;
}
const TabsControllerContent: React.FC<Props> = ({
  tabData,
  className,
  defaultTab,
  app = Apps.BASE,
  haveLoading,
}) => {
  const params = useSearchParams();
  const pathname = usePathname();

  return (
    <div
      className={`${style.productTabsController} ${className} ${style[app]}`}
    >
      <ul>
        {tabData.map((data) => (
          <Item
            key={data.id}
            tabData={data}
            url={data?.url}
            isActive={
              !!params?.get("tab") || data?.url
                ? params?.get("tab") == data.id || pathname === data?.url
                : data.id === defaultTab
            }
            haveLoading={haveLoading}
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
