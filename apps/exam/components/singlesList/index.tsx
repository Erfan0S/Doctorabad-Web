"use client";
import { api } from "@/api/Api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { Fragment } from "react";
import Loading from "../common/Loading/Loading";
import InfiniteScroll from "react-infinite-scroller";
import style from "./sinlgesList.module.scss";
import { SingleListItem } from "@repo/apps_shared_components/exam/components";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { SharedFilters } from "@repo/apps_shared_components/exam/types";

function SingleList() {
  const param = useSearchParams();

  const field = param?.get(SharedFilters.FIELD);
  const grade = param?.get(SharedFilters.GRADE);
  const date = param?.get(SharedFilters.DATE);
  const place = param?.get(SharedFilters.PLACE);

  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      api.getExamList({
        field_id: Number(field) || undefined,
        grade_id: Number(grade) || undefined,
        dates: date?.split(",").map(Number),
        places: place?.split(",").map(Number),
        page: pageParam,
      }),
    queryKey: ["examList", field, grade, date, place, isUserLoggedIn()],
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
        <span className={style.noData}>هیچ تک آزمونی پیدا نشد!</span>
      ) : (
        <InfiniteScroll
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Loading key="infinite-scroll-loader" />}
        >
          {data?.pages.map((page, i) => {
            return (
              <Fragment key={`frag-${i}`}>
                {page.data.data.map((item, i) => {
                  return (
                    <SingleListItem
                      item={item}
                      haveGeneralAccess={page.data.has_general_access}
                      key={`singleItem-${item.id}-${i}`}
                      haveFavoriteButton
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
}

export default SingleList;
