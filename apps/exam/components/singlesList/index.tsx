"use client";
import { api } from "@/api/Api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { Fragment } from "react";
import Loading from "../common/Loading/Loading";
import InfiniteScroll from "react-infinite-scroller";
import style from "./sinlgesList.module.scss";
import SingleListItem from "./SingleListItem";
import { examsFilters } from "@/constants/filters";

function SingleList() {
  const FiltersNames = examsFilters;

  const param = useSearchParams();

  const field = param?.get(FiltersNames.FIELD);
  const grade = param?.get(FiltersNames.GRADE);
  const date = param?.get(FiltersNames.DATE);
  const place = param?.get(FiltersNames.PLACE);

  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      api.getExamList({
        field_id: Number(field) || undefined,
        grade_id: Number(grade) || undefined,
        dates: date?.split(",").map(Number),
        places: place?.split(",").map(Number),
        page: pageParam,
      }),
    queryKey: ["examList", field, grade, date, place],
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
      ) : (
        <InfiniteScroll
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Loading />}
        >
          {data?.pages.map((page, i) => {
            return (
              <Fragment key={i}>
                {page.data.data.map((item, i) => {
                  return <SingleListItem item={item} key={i} />;
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
