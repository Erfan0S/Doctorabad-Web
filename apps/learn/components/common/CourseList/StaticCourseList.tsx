import React from "react";
import styles from "./CourseList.module.scss";
import { CourseListItemType } from "@/types/courses";
import CourseListItem from "@/components/common/CourseList/CourseListItem";
import Link from "next/link";

interface Props {
  courses: CourseListItemType[];
}

const StaticCourseList = ({ courses }: Props) => {
  return (
    <div className={styles.relatedCoursesWrapper}>
      {courses.map((course) => (
        <Link href={`/learn/course/${course.id}`} key={course.id}>
          <CourseListItem course={course} />
        </Link>
      ))}
    </div>
  );
};

export default StaticCourseList;
