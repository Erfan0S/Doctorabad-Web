import { Apps } from "@repo/core/types/general";
import MobileHeaderBase from "../mobileHeaderBase";
import TabsController from "../../common/components/TabsController";
import { MobileTabsConfig } from "@repo/core/types/configs";
import SearchBar, { SearchBarProps } from "../../common/components/SearchBar";

interface Props extends SearchBarProps {
  tabData?: MobileTabsConfig[];
  children?: React.ReactNode;
  type?: Apps;
  defaultTab?: string;
  haveSearch?: boolean;
  haveTabLoading?: boolean;
}

function MobileHomeHeader({
  tabData,
  children,
  type = Apps.BASE,
  defaultTab = tabData ? tabData[0].id : undefined,
  haveSearch = false,
  haveTabLoading,
  ...rest
}: Props) {
  return (
    <div className="sticky top-0 z-[1000] flex flex-col items-center bg-white pb-[10px]">
      <div className="flex w-full flex-col bg-[#f5f5f5] shadow-[0_0_4px_0_rgba(0,0,0,0.295)]">
        <div className="w-full px-[10px]">
          <MobileHeaderBase type={type} />
        </div>
        {tabData && (
          <TabsController
            tabData={tabData}
            defaultTab={defaultTab}
            app={type}
            haveLoading={haveTabLoading}
          />
        )}
      </div>
      {haveSearch && (
        <div className="w-full px-[10px]">
          <SearchBar app={type} {...rest} />
        </div>
      )}
      {children}
    </div>
  );
}

export default MobileHomeHeader;
