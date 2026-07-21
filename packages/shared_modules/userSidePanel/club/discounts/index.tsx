import Image from "next/image";
import CopyCode from "../../../assets/svg/copyCode";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { ClubOffer } from "../../types/doctorClub";
import React from "react";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import { copyText } from "@repo/core/utils/copyText";
import { Loading } from "@repo/shared_modules/components";
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
      className="px-3 py-4"
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
              <div key={id} className="relative mb-4 flex bg-white before:absolute before:-end-[10px] before:-top-[10px] before:z-[2] before:h-5 before:w-5 before:rounded-[10px] before:bg-header-bg before:content-[''] after:absolute after:-end-[10px] after:-bottom-[10px] after:z-[2] after:h-5 after:w-5 after:rounded-[10px] after:bg-header-bg after:content-['']">
                <div className="relative flex w-[100px] flex-[0_0_100px] flex-col items-center justify-center border-0 border-e-2 border-dashed border-green before:absolute before:-start-[10px] before:-top-[10px] before:z-[2] before:h-5 before:w-5 before:rounded-[10px] before:bg-header-bg before:content-[''] after:absolute after:-start-[10px] after:-bottom-[10px] after:z-[2] after:h-5 after:w-5 after:rounded-[10px] after:bg-header-bg after:content-[''] [&_img]:mb-1 [&_img]:max-h-[55px] [&_img]:max-w-[55px] [&_span]:text-xs [&_span]:font-medium">
                  <Image
                    src={pic_url || placeHolderDataUrl}
                    alt="drLearnImage"
                    width={70}
                    height={70}
                  />
                  <span>{title}</span>
                </div>
                <div className="relative flex flex-[0_0_calc(100%-100px)] flex-col px-3 pb-3 pt-0 before:absolute before:-start-[11px] before:-top-[10px] before:z-[2] before:h-5 before:w-5 before:rounded-[10px] before:bg-header-bg before:content-[''] after:absolute after:-start-[11px] after:-bottom-[10px] after:z-[2] after:h-5 after:w-5 after:rounded-[10px] after:bg-header-bg after:content-['']">
                  <div className="-mt-2.5 mb-1 me-1 flex items-center justify-end [&_span]:me-1 [&_span]:rounded-[10px] [&_span]:bg-green [&_span]:px-2 [&_span]:text-[11px] [&_span]:font-medium [&_span]:leading-5 [&_span]:text-white [&_span:last-of-type]:me-0">
                    {customer_states.map((state) => (
                      <span
                        style={{ background: `#${state.color_code}` }}
                        key={state.id}
                      >
                        {state.title}
                      </span>
                    ))}
                  </div>
                  <div className="mb-1 [&_span]:block [&_span]:text-sm [&_span]:font-medium [&_span]:leading-[18px]">
                    <span>{description}</span>
                  </div>
                  <div className="mb-2.5 [&_span]:text-gray">
                    <span>
                      تاریخ انقضا: {toFullPersianDateString(expired_at)}
                    </span>
                  </div>

                  {discount_codes.length ? (
                    <div className="flex items-center rounded bg-[#e7e7e7] px-2 py-1 [&_span]:me-2 [&_span]:block [&_span]:max-w-[calc(100%-87px)] [&_span]:flex-[0_0_calc(100%-87px)] [&_span]:rounded [&_span]:bg-white [&_span]:px-2 [&_span]:text-center [&_span]:font-medium [&_span]:leading-[22px] [&_button]:flex [&_button]:cursor-pointer [&_button]:items-center [&_button]:border-0 [&_button]:bg-transparent [&_button]:font-light [&_button_svg]:me-2 [&_button:active]:outline-none [&_button:focus]:outline-none">
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
                    <div className="flex items-center [&_span]:font-medium [&_span]:text-green [&_button]:ms-auto [&_button]:cursor-pointer [&_button]:rounded-lg [&_button]:border-0 [&_button]:bg-green-base [&_button]:px-4 [&_button]:leading-[26px] [&_button]:text-white [&_button:active]:outline-none [&_button:focus]:outline-none">
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
