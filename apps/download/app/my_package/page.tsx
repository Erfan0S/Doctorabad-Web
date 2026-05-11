import TabsController from "@/components/common/TabsController";
import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";
import styles from "@/components/myPackages/myPackages.module.scss";
import { MyPackages } from "@/components/myPackages";
import {
  myPackagesTabs,
  myPackagesTabsData,
} from "@/components/package/tabs/tabs-data";
import { Apps } from "@repo/core/types/general";

function MyPackagePage() {
  return (
    <div>
      <PageHeader
        app={Apps.DOWNLOAD}
        title="پکیج‌ها و طرح‌های من"
        className={styles.tabs}
      >
        <TabsController
          tabData={myPackagesTabsData}
          defaultTab={myPackagesTabs.PACKAGES}
        />
      </PageHeader>
      <MyPackages />
    </div>
  );
}

export default MyPackagePage;
