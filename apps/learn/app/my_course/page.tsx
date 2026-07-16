import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";
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
        className="[&>div:last-of-type]:bg-[#f5f5f5] [&>div:last-of-type]:p-0 [&>div:last-of-type]:pt-[5px]"
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
