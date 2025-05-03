import { generateProductMetaData } from "@/metadata/singleCourse";
import React from "react";

export const generateMetadata = generateProductMetaData;

function CourseLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default CourseLayout;
