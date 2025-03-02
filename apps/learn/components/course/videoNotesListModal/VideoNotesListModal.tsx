import React, { useEffect, useState } from "react";
import styles from "./VideoNotesListModal.module.scss";
import { convertSecondsToNormalTime } from "@/utils/convertSecondsToNormalTime";
import { Note } from "@/types/courses";
import { ModalProps } from "@repo/core/types/modals";
import { api } from "@/api/Api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loading } from "@repo/shared_modules/components";
import InfiniteScroll from "react-infinite-scroller";

type Props = ModalProps<{
  courseId: number;
  goToBookmark: (lessonId: number, jumpTime: number) => void;
  currentLessonId: number;
}>;

export const VideoNotesListModal: React.FC<Props> = ({
  data: { courseId, goToBookmark, currentLessonId },
}) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["videoBookmarks", courseId, currentLessonId],
    queryFn: ({ pageParam }) =>
      api
        .getVideowBookmarks(courseId, currentLessonId, pageParam)
        .then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.links.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
  });

  // Flatten the notes data from all pages
  const notes = React.useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>لیست یادداشت‌ها</div>
      {isLoading ? (
        <div style={{ margin: "20px auto" }}>
          <Loading size={36} />
        </div>
      ) : (
        <InfiniteScroll
          pageStart={1}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Loading size={24} key={0} />}
          useWindow={false}
          getScrollParent={() =>
            document.querySelector(`.${styles.notesList}`) as HTMLElement
          }
        >
          <ul className={styles.notesList}>
            {notes.length > 0 ? (
              notes.map((note) => (
                <li
                  key={note.id}
                  className={styles.noteItem}
                  onClick={() => goToBookmark(note.lesson_id, note.jump_time)}
                >
                  <span className={styles.timestamp}>
                    {convertSecondsToNormalTime(note.jump_time)}
                  </span>
                  <span className={styles.noteText}>{note.description}</span>
                </li>
              ))
            ) : (
              <li className={styles.emptyState}>هیچ یادداشتی یافت نشد</li>
            )}
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default VideoNotesListModal;
