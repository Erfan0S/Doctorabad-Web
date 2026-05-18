import React from "react";
import SearchBar from "@/components/Search/SearchBar";
import styles from "./HomeHeader.module.scss";
import { MainTabsData } from "@/constants/tabs-data";
import { MobileHomeHeader } from "@repo/shared_modules/headers";
import { Apps } from "@repo/core/types/general";

type Props = {
  haveSearch?: boolean;
};

function HomeHeader({ haveSearch = true }: Props) {
  return (
    <MobileHomeHeader tabData={MainTabsData} type={Apps.DOWNLOAD}>
      {haveSearch && (
        <div className={styles.childContainer}>
          <SearchBar haveFilterButton={true} />
        </div>
      )}
    </MobileHomeHeader>
  );
}

export default HomeHeader;
