"use client";
import React from "react";
import SidePanelHeader from "../../header";
import { SidePanelPage, SidePanelPageProps } from "@repo/core/types/sidePanel";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "../../../common/components";
import CartOrdersItem from "./CartOrdersItem";

const PrevCarts: React.FC<SidePanelPageProps> = ({ setPage }) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["cartOrders"],
    queryFn: ({ pageParam }) =>
      api.getCartOrdersList({ page: pageParam }).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.links.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
  });

  return (
    <>
      <SidePanelHeader
        title="سبدهای خرید من"
        setPage={setPage}
        onBack={() => setPage(SidePanelPage.ORDERS)}
      />
      {isLoading && !data ? (
        <Loading pageLoader />
      ) : (
        <div className="[&>div]:flex [&>div]:max-h-[calc(100vh-61px)] [&>div]:flex-col [&>div]:items-stretch [&>div]:justify-start [&>div]:gap-4 [&>div]:overflow-y-auto [&>div]:p-4">
          <InfiniteScroll
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            loader={<Loading size={22} />}
          >
            {data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.data.map((order) => (
                  <CartOrdersItem key={order.id} order={order} />
                ))}
              </React.Fragment>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default PrevCarts;
