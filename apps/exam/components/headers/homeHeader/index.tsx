import React from "react";
import { MobileHomeHeader } from "@repo/shared_modules/headers";
import { MainTabsData } from "@/constants/tabs-data";
import { Apps } from "@repo/core/types/general";

function HomeHeader() {
  return <MobileHomeHeader tabData={MainTabsData} type={Apps.EXAM} />;
}

export default HomeHeader;
