import Image from "next/image";
import style from "./SidePanelOrdersLearning.module.scss";
import Link from "next/link";
import React from "react";
import {Loading} from "@repo/shared_modules/components";
import {CourseOrderItem, CourseOrderItemOld} from "@repo/core/types/course";
import {useInfiniteQuery} from "@tanstack/react-query";
import {api} from "../../../api/Api";
import InfiniteScroll from "react-infinite-scroller";
import {generateCourseUrlFromId} from "@repo/core/utils/UrlUtils";
import {placeHolderDataUrl} from "@repo/core/constants/placeHolderDataUrl";
import {modalActions} from "@repo/core/modal/modals";
import Basket from "../../../assets/svg/basket";
import Clock from "../../../assets/svg/clock";
import {toFullPersianDateString} from "@repo/core/utils/toFullPersianDateString";
import Dollar from "../../../assets/svg/dollar";
import {priceFormatter} from "@repo/core/utils/priceFormatter";
import {ModalTypes} from "../../../common/modal/modalsTypes";
import {OrderType} from "@repo/core/types/cart";

const SidePanelFavoritesLearning: React.FC = () => {
  const {data, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery<
    CourseOrderItemOld[]
  >({
    queryFn: ({pageParam}) =>
      api.getLearnOrdersListOld(Number(pageParam)).then((res) => res.data.data),
    queryKey: ["previousOrdersList"],
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
        <div style={{height: "30px", overflow: "hidden"}}>
          <Loading size={20} />
        </div>
      }
    >
      <div className={style.sidePanelFavoritesLearning}>
        {data?.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.map(({created_at, id, oder_code, price_paid}) => (
              <div
                key={id}
                className={style.sidePanelOrdersLearningItem}
                onClick={() =>
                  modalActions.addModal(ModalTypes.ORDER_DETAIL, {
                    orderCode: oder_code,
                    productType: OrderType.Course,
                  })
                }
              >
                <div className={style.sidePanelOrdersLearningItemContent}>
                  <div className={style.sidePanelFavoritesLearningItem}>
                    <div className={style.sidePanelOrdersLearningItemCart}>
                      <span>
                        <Basket />
                        {oder_code}
                      </span>
                    </div>
                    <div className={style.sidePanelOrdersLearningItemFooter}>
                      <span>
                        <Clock fill="#949494" />{" "}
                        {toFullPersianDateString(created_at)}
                      </span>
                      <span>
                        <Dollar stroke="#949494" /> {priceFormatter(price_paid)}{" "}
                        تومن
                      </span>
                    </div>{" "}
                  </div>
                </div>{" "}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default SidePanelFavoritesLearning;
