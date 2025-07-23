import TabsController from "@/components/common/TabsController";
import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";
import styles from "@/components/myCourses/myCourses.module.scss";
import { MyCourses } from "@/components/myCourses";
import {
  myCoursesTabs,
  myCoursesTabsData,
} from "@/components/course/tabs/tabs-data";
import { Apps } from "@repo/core/types/general";

function MyCoursePage() {
  return (
    <div>
      <PageHeader
        app={Apps.LEARN}
        title="دوره‌ها و طرح‌های من"
        className={styles.tabs}
      >
        <TabsController
          tabData={myCoursesTabsData}
          defaultTab={myCoursesTabs.COURSES}
        />
      </PageHeader>
      <MyCourses />
    </div>
  );
}

export default MyCoursePage;
