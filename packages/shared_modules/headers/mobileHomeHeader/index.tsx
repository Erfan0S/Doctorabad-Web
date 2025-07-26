import { Apps } from "@repo/core/types/general";
import MobileHeader from "../../common/components/mobileHeader";
import TabsController from "../../common/components/TabsController";
import styles from "./HomeHeader.module.scss";
import { MobileHomeHeaderDataConfig } from "@repo/core/types/configs";

type Props = {
  tabData: MobileHomeHeaderDataConfig[];
  children?: React.ReactNode;
  type?: Apps;
  defaultTab?: string;
};

function MobileHomeHeader({
  tabData,
  children,
  type = Apps.BASE,
  defaultTab = tabData[0].id,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.topHeaderContainer}>
        <div className={styles.childContainer}>
          <MobileHeader type={type} />
        </div>
        <TabsController tabData={tabData} defaultTab={defaultTab} type={type} />
      </div>
      {children}
    </div>
  );
}

export default MobileHomeHeader;
