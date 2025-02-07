import React from "react";
import styles from "./CourseList.module.scss";
import { CourseListItemType } from "@/types/courses";
import CourseListItem from "@/components/common/CourseList/CourseListItem";

interface Props {
  courses: CourseListItemType[];
}

const CourseList = ({ courses }: Props) => {
  return (
    <div className={styles.relatedCoursesWrapper}>
      {courses.map((course) => (
        <CourseListItem key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
