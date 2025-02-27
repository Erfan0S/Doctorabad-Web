import React from "react";
import MobileHeader from "../mobileHeader";
import TabsController from "@/components/common/TabsController";
import { TabsData } from "./tabs-data";
import SearchBar from "@/components/Search/SearchBar";
import styles from "./HomeHeader.module.scss";

function HomeHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.topHeaderContainer}>
        <div className={styles.childContainer}>
          <MobileHeader />
        </div>
        <TabsController tabData={TabsData} defaultTab={TabsData[0].id} />
      </div>
      <div className={styles.childContainer}>
        <SearchBar />
      </div>
    </div>
  );
}

export default HomeHeader;
