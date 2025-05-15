import TabsController from "@/components/common/TabsController";
import PageHeader from "@/components/Header/PageHeader";
import React from "react";
import styles from "@/components/myCourses/myCourses.module.scss";
import { MyCourses } from "@/components/myCourses";
import {
  myCoursesTabs,
  myCoursesTabsData,
} from "@/components/course/tabs/tabs-data";

function MyCoursePage() {
  return (
    <div>
      <PageHeader title="دوره‌ها و طرح‌های من" className={styles.tabs}>
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
