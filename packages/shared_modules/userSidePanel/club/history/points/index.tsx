import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { api } from "../../../../api/Api";
import ClubHistoryItem from "../historyItem";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "../../../../common/components";
import DownArrow from "../../../../assets/svg/downArrow";
import style from "../SidePanelClubHistory.module.scss";

function SidePanelClubHistoryPoints() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      api
        .getClubPointTransactionsList(Number(pageParam))
        .then((res) => res.data.data),
    queryKey: ["clubTransactions_Points"],
    initialPageParam: 1,
    staleTime: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return (lastPageParam as number) + 1;
    },
  });

  if (isLoading) {
    return <Loading size={25} />;
  }

  if (data?.pages[0].length === 0) {
    return <span className="no_data">تا الان سکه‌ای نگرفتی!</span>;
  }

  return (
    <>
      <InfiniteScroll
        pageStart={1}
        loadMore={() => {
          fetchNextPage();
        }}
        useWindow={false}
        className={style.sidePanelClubHistory}
        getScrollParent={() =>
          document.getElementById("clubListContainer") as HTMLElement
        }
        hasMore={hasNextPage}
        loader={<Loading size={25} />}
      >
        {data?.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.map(({ created_at, id, mission, point }) => {
              return (
                <ClubHistoryItem
                  created_at={created_at}
                  title={mission}
                  badge={<span>{point} امتیاز</span>}
                />
              );
            })}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default SidePanelClubHistoryPoints;
