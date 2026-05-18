import React from "react";
import styles from "./CourseList.module.scss";
import { CourseListItemType } from "@repo/core/types/course";
import CourseListItem from "./CourseListItem";
import { InfiniteData } from "@tanstack/react-query";
import { Loading } from "@repo/shared_modules/components";
import InfiniteScroll from "react-infinite-scroller";
import { PaginatedResponse } from "@repo/core/types/general";
import { useRouter } from "next/navigation";

interface Props {
  courses:
    | InfiniteData<PaginatedResponse<CourseListItemType[]>, unknown>
    | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  haveFavoriteToggle?: boolean;
}

const CourseList = ({
  courses,
  fetchNextPage,
  hasNextPage,
  haveFavoriteToggle,
}: Props) => {
  const router = useRouter();

  return (
    <div className={styles.relatedCoursesWrapper}>
      <InfiniteScroll
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loading />}
      >
        {courses?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.map((course, index) => (
              <CourseListItem course={course} key={index} />
            ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CourseList;
