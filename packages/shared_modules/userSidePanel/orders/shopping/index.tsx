import style from "../learning/SidePanelOrdersLearning.module.scss";
import Basket from "../../../assets/svg/basket";
import Clock from "../../../assets/svg/clock";
import Dollar from "../../../assets/svg/dollar";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { PreviousOrder } from "../../types/orders";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../loading";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { OrderType } from "@repo/core/types/cart";

const SidePanelOrdersLearning: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PreviousOrder[]
  >({
    queryFn: ({ pageParam }) =>
      api.getShopOrdersList(Number(pageParam)).then((res) => res.data.data),
    queryKey: ["previousOrders"],
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
        document.getElementById("orderListContainer") as HTMLElement
      }
      loader={
        <div style={{ height: "30px", overflow: "hidden" }}>
          <Loading size={20} />
        </div>
      }
    >
      <div className={style.sidePanelOrdersLearning}>
        {data?.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.map(({ id, created_at, order_code, price_paid }) => (
              <div
                key={id}
                className={style.sidePanelOrdersLearningItem}
                onClick={() =>
                  modalActions.addModal(ModalTypes.ORDER_DETAIL, {
                    orderCode: order_code,
                    productType: OrderType.ShopProduct,
                  })
                }
              >
                <div className={style.sidePanelOrdersLearningItemContent}>
                  <div className={style.sidePanelOrdersLearningItemCart}>
                    <span>
                      <Basket />
                      {order_code}
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
                  </div>
                </div>
                {/* <Link href={href} /> */}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default SidePanelOrdersLearning;
