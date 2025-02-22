import { CourseDataType } from "@/types/courses";
import React, { useEffect } from "react";

type Props = {
  description: string;
};

const CourseDescription = ({ description }: Props) => {
  return (
    <div style={{ width: "100%" }}>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default CourseDescription;
