import Image from "next/image";
import style from "./SidePanelFavoritesLearning.module.scss";
import Link from "next/link";
import React from "react";
import { Loading } from "@repo/shared_modules/components";
import { CourseFavoriteItem } from "@repo/core/types/course";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import InfiniteScroll from "react-infinite-scroller";
import { generateCourseUrlFromId } from "@repo/core/utils/UrlUtils";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { modalActions } from "@repo/core/modal/modals";

const SidePanelFavoritesLearning: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    CourseFavoriteItem[]
  >({
    queryFn: ({ pageParam }) =>
      api.getLearnFavoriteList(Number(pageParam)).then((res) => res.data.data),
    queryKey: ["favorite"],
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
              ({
                title,
                id,
                language,
                pic_url,
                provider_id,
                provider_name,
              }) => (
                <Link
                  key={id}
                  href={generateCourseUrlFromId(id)}
                  onClick={() => modalActions.removeLastModal()}
                >
                  <div className={style.sidePanelFavoritesLearningItem}>
                    <div className={style.sidePanelFavoritesLearningItemImage}>
                      <Image
                        width={100}
                        height={65}
                        src={pic_url || placeHolderDataUrl}
                        alt="favoritesImage"
                      />
                    </div>
                    <div
                      className={style.sidePanelFavoritesLearningItemContent}
                    >
                      <div
                        className={style.sidePanelFavoritesLearningItemTitle}
                      >
                        <span>{title}</span>
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

export default SidePanelFavoritesLearning;
