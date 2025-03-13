import React from "react";
import styles from "./CourseList.module.scss";
import { CourseListItemType } from "@/types/courses";
import CourseListItem from "@/components/common/CourseList/CourseListItem";
import Link from "next/link";

interface Props {
  courses: CourseListItemType[];
}

const StaticCourseList = ({ courses }: Props) => {
  if (!courses || courses.length === 0) {
    return (
      <div className={styles.relatedCoursesWrapper}>
        <p style={{ textAlign: "center", padding: "20px" }}>
          هیچ دوره‌ای یافت نشد
        </p>
      </div>
    );
  }

  return (
    <div className={styles.relatedCoursesWrapper}>
      {courses.map((course) => (
        <Link href={`/course/${course.id}`} key={course.id}>
          <CourseListItem course={course} />
        </Link>
      ))}
    </div>
  );
};

export default StaticCourseList;
