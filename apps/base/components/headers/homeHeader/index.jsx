import React from "react";
import { Apps } from "@repo/core/types/general";
import MobileHeader from "../../../../../packages/shared_modules/common/components/mobileHeader";



function HomeHeader() {
  return   <div className="sticky top-0 z-[100] flex w-full flex-col items-center bg-[#f5f5f5] px-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.295)]">

  <MobileHeader   type={Apps.BASE} />
  </div>

}

export default HomeHeader;
