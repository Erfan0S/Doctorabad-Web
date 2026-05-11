"use client";
import style from "./ProductTabsController.module.scss";
import Item from "./Item";
import { TabData } from "@/types/packages";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  tabData: TabData[];
  className?: string;
  defaultTab?: string;
}

// TODO: need refactor to use one TabsController in all apps

const TabsController: React.FC<Props> = ({
  tabData,
  className,
  defaultTab,
}) => {
  const params = useSearchParams();
  const pathname = usePathname();

  return (
    <div className={`${style.productTabsController} ${className}`}>
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

export default TabsController;
