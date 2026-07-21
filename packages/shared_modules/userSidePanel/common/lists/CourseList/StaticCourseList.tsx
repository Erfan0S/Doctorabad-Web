import React from "react";
import { CourseListItemType } from "@repo/core/types/course";
import CourseListItem from "./CourseListItem";
import Link from "next/link";

interface Props {
  courses: CourseListItemType[];
}

const StaticCourseList = ({ courses }: Props) => {
  return (
    <div className="flex flex-col">
      {courses.map((course) => (
        <Link href={`/learn/course/${course.id}`} key={course.id}>
          <CourseListItem course={course} />
        </Link>
      ))}
    </div>
  );
};

export default StaticCourseList;
