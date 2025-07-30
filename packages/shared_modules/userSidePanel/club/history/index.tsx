import UpArrow from "../../../assets/svg/backArrow";
import style from "./SidePanelClubHistory.module.scss";
import DownArrow from "../../../assets/svg/downArrow";
import CopyCode from "../../../assets/svg/copyCode";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { ClubTransaction } from "../../types/doctorClub";
import { Loading } from "@repo/shared_modules/components";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import { copyText } from "@repo/core/utils/copyText";

const SidePanelClubHistory: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    ClubTransaction[]
  >({
    queryFn: ({ pageParam }) =>
      api
        .getClubTransactionsList(Number(pageParam))
        .then((res) => res.data.data),
    queryKey: ["clubTransactions"],
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
                  <div key={id} className={style.sidePanelClubHistoryItem}>
                    <div className={style.sidePanelClubHistoryItemContent}>
                      <div
                        className={`${style.sidePanelClubHistoryItemTitle} ${
                          isMinusTransaction
                            ? style.sidePanelClubHistoryItemTitleRed
                            : style.sidePanelClubHistoryItemTitleGreen
                        }`}
                      >
                        <span>{club_plan?.title || reason}</span>
                        <span>{amount} سکه</span>
                        {isMinusTransaction ? (
                          <DownArrow stroke="#ff0000" width={18} height={18} />
                        ) : (
                          <UpArrow stroke="#01e21b" width={18} height={18} />
                        )}
                      </div>
                      {isMinusTransaction ? (
                        <div className={style.sidePanelClubHistoryItemDiscount}>
                          <span>{club_plan?.description}</span>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className={style.sidePanelClubHistoryItemDate}>
                        {isMinusTransaction ? (
                          <span>
                            تاریخ انقضا:{" "}
                            {toFullPersianDateString(club_plan!.expired_at)}
                          </span>
                        ) : (
                          ""
                        )}
                        <span>{toFullPersianDateString(created_at)}</span>
                      </div>

                      {isMinusTransaction ? (
                        <>
                          {club_plan?.discount_codes?.length ? (
                            <div
                              className={
                                style.sidePanelClubHistoryItemFooterCode
                              }
                            >
                              <span>{club_plan?.discount_codes[0].code}</span>
                              <button
                                onClick={(e) => {
                                  copyText(
                                    club_plan?.discount_codes[0].code,
                                    "کد تخفیف کپی شد"
                                  );
                                }}
                              >
                                <CopyCode width={13} height={13} /> کپی کردن
                              </button>
                            </div>
                          ) : (
                            <div
                              className={style.sidePanelClubHistoryItemFooter}
                            >
                              <span>{club_plan?.description}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default SidePanelClubHistory;
