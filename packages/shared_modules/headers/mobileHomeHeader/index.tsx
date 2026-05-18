import { Apps } from "@repo/core/types/general";
import MobileHeaderBase from "../mobileHeaderBase";
import TabsController from "../../common/components/TabsController";
import styles from "./HomeHeader.module.scss";
import { MobileTabsConfig } from "@repo/core/types/configs";
import SearchBar from "../../common/components/SearchBar";

type Props = {
  tabData: MobileTabsConfig[];
  children?: React.ReactNode;
  type?: Apps;
  defaultTab?: string;
  haveSearch?: boolean;
  customeSearchUrl?: string;
  customeFilterUrl?: string;
  placeholder?: string;
  haveFilterButton?: boolean;
};

function MobileHomeHeader({
  tabData,
  children,
  type = Apps.BASE,
  defaultTab = tabData[0].id,
  haveSearch = false,
  ...rest
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.topHeaderContainer}>
        <div className={styles.childContainer}>
          <MobileHeaderBase type={type} />
        </div>
        
        <TabsController tabData={tabData} defaultTab={defaultTab} app={type} />
      </div>
      {haveSearch && (
        <div className={styles.childContainer}>
          <SearchBar app={type} {...rest} />
        </div>
      )}
      {children}
    </div>
  );
}

export default MobileHomeHeader;
