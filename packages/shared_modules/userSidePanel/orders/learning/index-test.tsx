import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Loading } from "@repo/shared_modules/components";
import { CourseOrderItem, CourseOrderItemOld } from "@repo/core/types/course";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import InfiniteScroll from "react-infinite-scroller";
import { generateCourseUrlFromId } from "@repo/core/utils/UrlUtils";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { modalActions } from "@repo/core/modal/modals";
import Basket from "../../../assets/svg/basket";
import Clock from "../../../assets/svg/clock";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import Dollar from "../../../assets/svg/dollar";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { ModalTypes } from "../../../common/modal/modalsTypes";
import { OrderType } from "@repo/core/types/cart";

const SidePanelFavoritesLearning: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    CourseOrderItemOld[]
  >({
    queryFn: ({ pageParam }) =>
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
        <div style={{ height: "30px", overflow: "hidden" }}>
          <Loading size={20} />
        </div>
      }
    >
      <div>
        {data?.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.map(({ created_at, id, oder_code, price_paid }) => (
              <div
                key={id}
                className="relative mb-2 cursor-pointer rounded-2xl bg-white p-2 shadow-[0_3px_5px_rgba(0,0,0,0.05)] transition-all duration-150 hover:shadow-[0_0_5px_rgba(0,0,0,0.15)] [&>a]:absolute [&>a]:inset-0 [&>a]:z-[2] [&>a]:rounded-2xl"
                onClick={() =>
                  modalActions.addModal(ModalTypes.ORDER_DETAIL, {
                    orderCode: oder_code,
                  })
                }
              >
                <div className="flex flex-[0_0_calc(100%-100px)] flex-col ps-3">
                  <div>
                    <div className="mb-1 [&_span]:me-2 [&_span]:flex [&_span]:items-center [&_span]:text-base [&_span]:font-semibold [&_span]:text-[#f54f1a] [&_span:last-of-type]:me-0 [&_span_svg]:me-1 [&_span_svg]:h-5 [&_span_svg]:w-5 [&_span_svg]:fill-[#f54f1a]">
                      <span>
                        <Basket />
                        {oder_code}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center [&_span]:me-2 [&_span]:flex [&_span]:items-center [&_span]:text-[11px] [&_span]:text-gray [&_span:last-of-type]:me-0 [&_span:last-of-type]:ms-auto [&_span_svg]:me-1 [&_span_svg]:h-[18px] [&_span_svg]:w-[18px] [&_small]:ms-auto [&_small]:rounded [&_small]:bg-[#ccc] [&_small]:px-1 [&_small]:leading-5 [&_small]:text-white">
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
