import React from "react";
import styles from "./CourseList.module.scss";
import { CourseListItemType } from "@/types/courses";
import CourseListItem from "@/components/common/CourseList/CourseListItem";
import Link from "next/link";
import { InfiniteData } from "@tanstack/react-query";
import { Loading } from "@repo/ui/components";
import InfiniteScroll from "react-infinite-scroller";
import { PaginatedResponse } from "@repo/core/types";

interface Props {
  courses:
    | InfiniteData<PaginatedResponse<CourseListItemType[]>, unknown>
    | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const CourseList = ({ courses, fetchNextPage, hasNextPage }: Props) => {
  return (
    <div className={styles.relatedCoursesWrapper}>
      <InfiniteScroll
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loading />}
      >
        {courses?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.map((course) => (
              <Link href={`/learn/course/${course.id}`} key={course.id}>
                <CourseListItem course={course} />
              </Link>
            ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CourseList;
