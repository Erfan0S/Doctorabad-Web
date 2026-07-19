"use client";
import React, { Suspense } from "react";
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
      className={`top-0 z-[200] w-full select-none [transition:0.2s] max-[768px]:top-[154px] [&>ul]:m-0 [&>ul]:flex [&>ul]:list-none [&>ul]:items-center [&>ul]:justify-center [&>ul]:p-0 [&_li]:relative [&_li]:me-[16px] [&_li]:flex-1 [&_li]:cursor-pointer [&_li]:px-[12px] [&_li]:pb-[7px] [&_li]:text-center [&_li]:text-[15px] [&_li]:font-medium [&_li]:leading-[30px] [&_li:last-of-type]:me-0 [&_li_a]:text-black [&_li]:before:absolute [&_li]:before:inset-x-0 [&_li]:before:bottom-0 [&_li]:before:h-[6px] [&_li]:before:rounded-[3px] [&_li]:before:bg-transparent [&_li]:before:content-[''] ${className} ${app}`}
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
