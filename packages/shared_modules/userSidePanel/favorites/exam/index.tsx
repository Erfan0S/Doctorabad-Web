import React, { Fragment } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "../../../common/components";
import { api } from "@repo/apps_shared_components/exam";
import { SingleListItem } from "@repo/apps_shared_components/exam/components";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import style from "./style.module.scss";

// ! haveGeneralAccess dont exist in api, exam_id is not return and set currectly so add and remove from cart not working

const SidePanelFavoritesExam: React.FC = () => {
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: ({ pageParam }) => api.getExamFavoriteExamList(pageParam),
    queryKey: ["examList_favorites", isUserLoggedIn()],
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.links.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  return (
    <div className={style.listWrapper}>
      {isLoading ? (
        <Loading />
      ) : !!data && data?.pages[0].data.data.length <= 0 ? (
        <span>هیچ تک آزمونی پیدا نشد!</span>
      ) : (
        <InfiniteScroll
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Loading key="infinite-scroll-loader" />}
          className={style.list}
        >
          {data?.pages.map((page, i) => {
            return (
              <Fragment key={`frag-${i}`}>
                {/* @ts-ignore */}
                {page.data.data.map((item, i) => {
                  return (
                    <SingleListItem
                      item={item}
                      haveGeneralAccess={page.data.has_general_access}
                      key={`singleItem-${item.id}-${i}`}
                      isSidePanel
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default SidePanelFavoritesExam;
