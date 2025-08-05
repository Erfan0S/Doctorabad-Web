import Image from "next/image";
import style from "./SidePanelFavoritesShopping.module.scss";

import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { Product } from "@repo/core/types/product";
import { Loading } from "@repo/shared_modules/components";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import { modalActions } from "@repo/core/modal/modals";
import { useRouter } from "next/navigation";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import Link from "next/link";

const SidePanelFavoritesShopping: React.FC = () => {
  const { push } = useRouter();

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
            {data.map(
              ({ title, id, product_pic, price_main, price_off, slug }) => (
                <Link
                  key={id}
                  href={generateSingleProductUrlFromId(id, slug)}
                  onClick={() => modalActions.removeLastModal()}
                >
                  <div className={style.sidePanelFavoritesLearningItem}>
                    <Image
                      width={100}
                      height={65}
                      src={product_pic || placeHolderDataUrl}
                      alt="favoritesImage"
                      className={style.sidePanelFavoritesLearningItemImage}
                    />
                    <div
                      className={style.sidePanelFavoritesLearningItemContent}
                    >
                      <div
                        className={style.sidePanelFavoritesLearningItemTitle}
                      >
                        <span>{title}</span>
                      </div>
                      <div
                        className={style.sidePanelFavoritesLearningItemFooter}
                      >
                        {price_off ? (
                          <>
                            <small>{priceFormatter(price_main)} تومن</small>
                            <span>{priceFormatter(price_off)} تومن</span>
                          </>
                        ) : (
                          <span>{priceFormatter(price_main)} تومن</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default SidePanelFavoritesShopping;
