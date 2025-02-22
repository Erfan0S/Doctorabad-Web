import Image from "next/image";
import style from "./SidePanelClubDiscounts.module.scss";
import CopyCode from "../../../assets/svg/copyCode";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { ClubOffer } from "../../types/doctorClub";
import React from "react";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import { copyText } from "@repo/core/utils/copyText";
import Loading from "../../loading";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import InfiniteScroll from "react-infinite-scroller";

type Props = {
  setSingleOfferInfo: React.Dispatch<React.SetStateAction<ClubOffer | null>>;
};

const SidePanelClubDiscounts: React.FC<Props> = ({ setSingleOfferInfo }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    ClubOffer[]
  >({
    queryFn: ({ pageParam }) =>
      api.getOffersList(Number(pageParam)).then((res) => res.data.data),
    queryKey: ["clubOffers"],
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
    <InfiniteScroll
      pageStart={1}
      loadMore={() => {
        fetchNextPage();
      }}
      useWindow={false}
      getScrollParent={() =>
        document.getElementById("clubListContainer") as HTMLElement
      }
      hasMore={hasNextPage}
      loader={<Loading size={25} />}
    >
      {data?.pages.map((data, i) => (
        <React.Fragment key={i}>
          {data.map((offer) => {
            const {
              id,
              title,
              description,
              expired_at,
              discount_codes,
              coins,
              pic_url,
              customer_states,
            } = offer;
            return (
              <div key={id} className={style.sidePanelClubDiscountsItem}>
                <div className={style.sidePanelClubDiscountsItemImage}>
                  <Image
                    src={pic_url || placeHolderDataUrl}
                    alt="drLearnImage"
                    width={70}
                    height={70}
                  />
                  <span>{title}</span>
                </div>
                <div className={style.sidePanelClubDiscountsItemContent}>
                  <div className={style.sidePanelClubDiscountsItemHeader}>
                    {customer_states.map((state) => (
                      <span
                        style={{ background: `#${state.color_code}` }}
                        key={state.id}
                      >
                        {state.title}
                      </span>
                    ))}
                  </div>
                  <div className={style.sidePanelClubDiscountsItemTitle}>
                    <span>{description}</span>
                  </div>
                  <div className={style.sidePanelClubDiscountsItemExpireDate}>
                    <span>
                      تاریخ انقضا: {toFullPersianDateString(expired_at)}
                    </span>
                  </div>

                  {discount_codes.length ? (
                    <div className={style.sidePanelClubDiscountsItemFooterCode}>
                      <span>{discount_codes[0].code}</span>
                      <button
                        onClick={() =>
                          copyText(discount_codes[0].code, "کد تخفیف کپی شد")
                        }
                      >
                        <CopyCode width={13} height={13} /> کپی کردن
                      </button>
                    </div>
                  ) : (
                    <div className={style.sidePanelClubDiscountsItemFooter}>
                      <span>{coins} سکه</span>
                      <button onClick={() => setSingleOfferInfo(offer)}>
                        دریافت
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </InfiniteScroll>
  );
};

export default SidePanelClubDiscounts;
