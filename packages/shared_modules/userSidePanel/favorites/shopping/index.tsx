import style from "./SidePanelFavoritesShopping.module.scss";

import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { Product } from "@repo/core/types/product";
import { Loading } from "@repo/shared_modules/components";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import ShoppingFavoriteItem from "./ShoppingFavoriteItem";

const SidePanelFavoritesShopping: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    Product[]
  >({
    queryFn: ({ pageParam }) =>
      api.getShopFavoriteList(Number(pageParam)).then((res) => res.data.data),
    queryKey: ["favorite", "shopping"],
    initialPageParam: 1,
    staleTime: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return (lastPageParam as number) + 1;
    },
  });

  if (isLoading) return <Loading size={22} />;

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      useWindow={false}
      getScrollParent={() =>
        document.getElementById("favoriteListContainer") as HTMLElement
      }
      loader={
        <div style={{ height: "30px", overflow: "hidden" }}>
          <Loading size={20} />
        </div>
      }
    >
      <div className={style.sidePanelFavoritesLearning}>
        {data?.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.map((item) => (
              <ShoppingFavoriteItem data={item} key={item.id} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default SidePanelFavoritesShopping;
