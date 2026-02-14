import React from "react";
import { Apps } from "@repo/core/types/general";
import styles from "./homeHeader.module.scss";
import MobileHeader from "../../../../../packages/shared_modules/common/components/mobileHeader";



function HomeHeader() {
  return   <div className={styles.container}>

  <MobileHeader   type={Apps.BASE} />
  </div>

}

export default HomeHeader;
