import React from "react";
import { convertSecondsToNormalTime } from "@/utils/convertSecondsToNormalTime";
import { ModalProps } from "@repo/core/types/modals";
import { api } from "@/api/Api";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "@/components/common/Loading";

type Props = ModalProps<{
  courseId: number;
  goToBookmark: (lessonId: number, jumpTime: number) => void;
  currentLessonId: number;
}>;

// Stable hook class — InfiniteScroll's getScrollParent queries the list by
// class name, so it can't be an anonymous Tailwind-only element.
const NOTES_LIST_CLASS = "notes-scroll-list";

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
    <div className="w-[500px] max-w-[90vw] overflow-hidden rounded-2xl bg-white">
      <div className="bg-red p-4 text-start text-[20px] text-white">لیست یادداشت‌ها</div>
      {isLoading ? (
        <div className="mx-auto my-5">
          <Loading />
        </div>
      ) : (
        <InfiniteScroll
          pageStart={1}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Loading key={0} />}
          useWindow={false}
          getScrollParent={() =>
            document.querySelector(`.${NOTES_LIST_CLASS}`) as HTMLElement
          }
        >
          <ul
            className={`${NOTES_LIST_CLASS} m-0 max-h-[80vh] list-none overflow-auto p-0`}
          >
            {notes.length > 0 ? (
              notes.map((note) => (
                <li
                  key={note.id}
                  className="flex cursor-pointer items-center justify-between border-b border-solid border-[#eee] p-4 last:border-b-0"
                  onClick={() => goToBookmark(note.lesson_id, note.jump_time)}
                >
                  <span className="text-[14px] text-[#666] [direction:ltr]">
                    {convertSecondsToNormalTime(note.jump_time)}
                  </span>
                  <span className="ps-[10px] text-start text-[16px] text-[#333]">{note.description}</span>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-[#666]">هیچ یادداشتی یافت نشد</li>
            )}
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default VideoNotesListModal;
