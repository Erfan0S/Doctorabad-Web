import { generateLearnProductMetaData } from "@/metadata/singleCourse";
import React from "react";

export const generateMetadata = generateLearnProductMetaData;

function CourseLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default CourseLayout;
