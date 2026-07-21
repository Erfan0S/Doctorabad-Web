import DownArrow from "../../../../assets/svg/downArrow";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../../api/Api";
import { ClubTransactionCoins } from "../../../types/doctorClub";
import { Loading } from "@repo/shared_modules/components";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import ClubHistoryItem from "../historyItem";

const SidePanelClubHistoryCoins: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    ClubTransactionCoins[]
  >({
    queryFn: ({ pageParam }) =>
      api
        .getClubCoinTransactionsList(Number(pageParam))
        .then((res) => res.data.data),
    queryKey: ["clubTransactions_Coins"],
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
        getScrollParent={() =>
          document.getElementById("clubListContainer") as HTMLElement
        }
        hasMore={hasNextPage}
        loader={<Loading size={25} />}
      >
        {data?.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.map(
              ({
                amount,
                club_plan,
                created_at,
                id,
                reason,
                transaction_type,
              }) => {
                const isMinusTransaction = transaction_type < 0;
                return (
                  <ClubHistoryItem
                    created_at={created_at}
                    title={reason}
                    badge={
                      <div
                        className={`flex flex-row items-center justify-center [&_span]:font-medium [&_span:first-of-type]:me-auto ${
                          isMinusTransaction
                            ? "text-[#ff0000]"
                            : "fill-green-base text-green-base [&_svg]:rotate-180"
                        }`}
                      >
                        <span>{amount} سکه</span>
                        {isMinusTransaction ? (
                          <DownArrow width={18} height={18} />
                        ) : (
                          <DownArrow width={18} height={18} />
                        )}
                      </div>
                    }
                  />
                );
              }
            )}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default SidePanelClubHistoryCoins;
