import Image from "next/image";
import EmailOpen from "../../assets/svg/emailOpen";
import EmailClose from "../../assets/svg/emailClose";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../api/Api";
import { MessageItem } from "@repo/core/types/user";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "@repo/shared_modules/components";
import React from "react";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import classNames from "classnames";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

const MESSAGES_PANEL = "flex-[0_1_100%] overflow-auto bg-header-bg px-3 py-4";

type Props = {
  openMessage: (id: number) => void;
};

const MessageList: React.FC<Props> = ({ openMessage }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    MessageItem[]
  >({
    queryKey: ["messages"],
    initialPageParam: 1,
    staleTime: Infinity,
    queryFn: ({ pageParam }) =>
      api.getMessageList(Number(pageParam)).then((res) => res.data.data),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return (lastPageParam as number) + 1;
    },
  });

  if (data?.pages[0].length === 0) {
    return (
      <div className={MESSAGES_PANEL}>
        <span className="block w-full text-center">هیچ پیامی نیست!</span>
      </div>
    );
  }

  return (
    <>
      <div className={MESSAGES_PANEL}>
        {isLoading ? (
          <Loading size={20} />
        ) : (
          <InfiniteScroll
            pageStart={1}
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            loader={<Loading size={36} />}
          >
            <div>
              {data?.pages.map((data, i) => (
                <React.Fragment key={i}>
                  {data.map(
                    (
                      { created_at, id, pic_url, seen, summary, title },
                      index,
                    ) => (
                      <div
                        key={id}
                        className={classNames(
                          "relative mb-2 flex rounded-2xl bg-white p-2 shadow-[0_3px_5px_rgba(0,0,0,0.05)] transition-all duration-150 hover:shadow-[0_0_5px_rgba(0,0,0,0.15)]",
                          seen ? "" : "!bg-[#d3d3d3]",
                        )}
                      >
                        <div className="h-[75px] w-[75px] flex-[0_0_75px] rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.2)]">
                          <Image
                            width={75}
                            height={75}
                            src={pic_url || placeHolderDataUrl}
                            alt="OrdersImage"
                            className="max-h-full max-w-full rounded-lg"
                          />
                        </div>
                        <div className="flex flex-[0_0_calc(100%-75px)] flex-col py-1 pe-1 ps-2.5">
                          <div className="mb-1 flex items-start [&_svg]:ms-auto [&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:stroke-gray">
                            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium">
                              {title}
                            </span>
                            {seen ? <EmailOpen /> : <EmailClose />}
                          </div>
                          <div className="mt-auto flex flex-wrap items-center justify-between">
                            <span className="flex min-w-[96px] flex-1 items-center overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-normal leading-[30px] text-gray max-[400px]:text-[8px]">
                              {toFullPersianDateString(created_at)}
                            </span>
                            <button
                              className="relative ms-2 cursor-pointer rounded-lg border-none bg-green-base px-5 text-center text-[16px] font-normal leading-[30px] text-white hover:text-white focus:shadow-none focus:outline-none active:shadow-none active:outline-none max-[400px]:px-3 max-[400px]:text-[14px]"
                              onClick={() => openMessage(id)}
                            >
                              نشونم بده!
                            </button>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </React.Fragment>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default MessageList;
