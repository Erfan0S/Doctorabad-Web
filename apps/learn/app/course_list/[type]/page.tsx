import { PageHeader } from "@repo/shared_modules/headers";
import { CourseListConfigs } from "@/constants/CourseList";
import CourseListPage from "@/pagesComponents/CourseList";
import { CourseListType } from "@/types/homePage";
import React from "react";
import { Apps } from "@repo/core/types/general";

type Props = {
  params: {
    type: CourseListType;
  };
};

const CoursList = ({ params }: Props) => {
  return (
    <div>
      <PageHeader
        app={Apps.LEARN}
        title={CourseListConfigs[params.type].title}
      />
      <CourseListPage type={params.type} />
    </div>
  );
};

export default CoursList;
