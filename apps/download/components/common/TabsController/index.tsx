"use client";
import Item from "./Item";
import { TabData } from "@/types/packages";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  tabData: TabData[];
  className?: string;
  defaultTab?: string;
}

const TabsController: React.FC<Props> = ({
  tabData,
  className,
  defaultTab,
}) => {
  const params = useSearchParams();
  const pathname = usePathname();

  return (
    <div
      className={`top-0 z-[200] w-full select-none transition-all duration-200 max-md:top-[154px] ${className}`}
    >
      <ul className="m-0 flex list-none items-center justify-center p-0">
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
