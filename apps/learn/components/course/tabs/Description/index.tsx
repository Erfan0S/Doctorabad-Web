import React from "react";
import { CourseContentProps } from "../tabs-data";

const CourseDescription = ({ course }: CourseContentProps) => {
  return (
    <div style={{ width: "100%" }}>
      <div dangerouslySetInnerHTML={{ __html: course.description }} />
    </div>
  );
};

export default CourseDescription;
