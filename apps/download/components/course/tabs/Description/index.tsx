import React from "react";
import { CourseContentProps } from "../tabs-data";
import sanitize from "@repo/core/utils/sanitize";

const CourseDescription = ({ course }: CourseContentProps) => {
  return (
    <div style={{ width: "100%" }}>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(course.description),
        }}
      />
    </div>
  );
};

export default CourseDescription;
