import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";
import styles from "@/components/myCourses/myCourses.module.scss";
import { MyCourses } from "@/components/myCourses";
import {
  myCoursesTabs,
  myCoursesTabsData,
} from "@/components/course/tabs/tabs-data";
import { Apps } from "@repo/core/types/general";
import { TabsController } from "@repo/shared_modules/components";

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
          app={Apps.LEARN}
        />
      </PageHeader>
      <MyCourses />
    </div>
  );
}

export default MyCoursePage;
