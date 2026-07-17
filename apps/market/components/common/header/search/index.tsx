"use client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import useDebounceAction from "@repo/core/hooks/useDebounceAction";
import { api } from "@/api/Api";

import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import {
  SearchParamsUtils,
  generateSingleProductUrlFromId,
} from "@repo/core/utils/UrlUtils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { routePath } from "@repo/core/constants/routePath";
import Loading from "../../loading";
import useClickOutside from "@/hooks/useClickOutside";
import SearchIcon from "@/assets/svg/search";

const totalResultsCount = 10;
const shownResultsCount = 7;

// was Search.module.scss
const FORM_INPUT =
  "relative w-[280px] max-md:w-[calc(100%-92px)] max-md:flex-[0_0_calc(100%-92px)] [&>svg]:absolute [&>svg]:top-[calc(50%-10px)] [&>svg]:end-4 [&>div]:absolute [&>div]:end-2 [&>div]:top-[calc(50%-10px)] [&>div]:-translate-y-1/2";
const INPUT =
  "relative w-full py-0 ps-4 pe-9 leading-9 border-2 border-solid border-orange rounded-lg text-[13px] outline-none focus:outline-none max-md:px-2";
const RESULT =
  "absolute py-4 ps-4 pe-0 start-0 top-[calc(100%+8px)] w-[600px] bg-white rounded-lg border-2 border-solid border-orange shadow-[0_5px_25px_rgba(0,0,0,0.3)] z-[500] max-md:w-full";
// ponytail: reuses the shared .market-orange-scrollbar (23px track) instead of
// this component's near-identical local scrollbar variant.
const RESULT_PARENT = "overflow-auto max-h-[275px] market-orange-scrollbar";
const ITEM =
  "flex border-b border-solid border-gray py-1 px-0 items-center relative last-of-type:border-b-0 hover:bg-[#f9f9f9]";
const ITEM_IMAGE =
  "w-20 h-20 flex-[0_0_80px] rounded-lg [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:rounded-lg max-md:w-[60px] max-md:h-[60px] max-md:flex-[0_0_60px]";
const ITEM_CONTENT =
  "flex-[0_0_calc(100%-80px)] w-[calc(100%-80px)] flex flex-col ps-4 [&>span]:text-[13px] [&>span]:whitespace-nowrap [&>span]:text-ellipsis [&>span]:overflow-hidden [&>span]:font-semibold max-md:flex-[0_0_calc(100%-60px)] max-md:w-[calc(100%-60px)]";
const PRICE_REGULAR =
  "flex items-center text-[#aaa] leading-5 text-[13px] line-through me-3";
const PRICE_SALE =
  "text-center leading-[30px] block text-orange text-[17px] font-semibold";

interface Props {
  productCount: string;
}

const Search = ({ productCount }: Props) => {
  const { push } = useRouter();

  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);

  const closeSearchList = () => setShowResults(false);

  const searchResultRef = useClickOutside<HTMLDivElement>(closeSearchList);

  const {
    data: results,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () =>
      api.searchProducts({
        q: searchText,
        page: "0",
        limit: String(totalResultsCount),
      }),
    queryKey: ["search", searchText],
    enabled: false,
  });

  const search = useCallback(() => {
    setShowResults(true);
    refetch();
  }, [refetch]);

  const debounceSearch = useDebounceAction(search, 1000);

  useEffect(() => {
    if (searchText.length) {
      debounceSearch();
    }
  }, [searchText, debounceSearch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowResults(false);
    setSearchText(e.target.value);
  };

  const seeFullResult = () => {
    setShowResults(false);
    push(
      `${routePath.searchList}${SearchParamsUtils.paramsStringify(
        { search: searchText },
        { questionMarkPrefix: true }
      )}`
    );
  };

  return (
    <div className="relative max-md:order-3 max-md:flex-[0_0_100%] search-bar">
      <div className="flex items-center max-md:justify-between">
        <div className={FORM_INPUT}>
          <input
            type="search"
            className={INPUT}
            onFocus={() => results?.data?.data?.length && setShowResults(true)}
            onChange={onChange}
            placeholder={`درمیان ${productCount} محصول‌جستجوکن!`}
          />
          <SearchIcon stroke="#7b7b7b" />
          {searchText && (isLoading || isFetching) && <Loading />}
        </div>
        {/* <button onClick={seeFullResult} disabled={!searchText || !results?.data?.data.length}>
          فیلترکردن
        </button> */}
        <Link
          className="bg-orange border-0 text-white rounded-lg leading-10 px-4 ms-2 cursor-pointer font-semibold"
          href={routePath.archive}
        >
          فیلترکردن
        </Link>
      </div>
      {showResults && searchText && !isLoading && !isFetching && (
        <div className={RESULT} ref={searchResultRef}>
          <div className={RESULT_PARENT}>
            {results?.data.data.length ? (
              <>
                {results.data?.data
                  .slice(0, shownResultsCount)
                  .map(
                    ({
                      id,
                      title,
                      product_pic,
                      price_main,
                      price_off,
                      price_amazing,
                      quantity,
                      slug,
                    }) => {
                      const isProductHasStock = quantity !== 0;

                      return (
                        <div key={id} className={ITEM}>
                          <div className={ITEM_IMAGE}>
                            <Image
                              src={product_pic || placeHolderDataUrl}
                              width={80}
                              height={80}
                              alt={title}
                            />
                          </div>
                          <div className={ITEM_CONTENT}>
                            <span>{title}</span>
                            {isProductHasStock && (
                              <div className="flex items-center mt-2">
                                <span
                                  className={
                                    price_off ? PRICE_REGULAR : PRICE_SALE
                                  }
                                >
                                  {priceFormatter(price_main)}
                                  <small>تومن</small>
                                </span>
                                {(!!price_off || price_amazing) && (
                                  <span className={PRICE_SALE}>
                                    {priceFormatter(price_amazing || price_off)}
                                    <small>تومن</small>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <Link
                            className="absolute inset-0 z-10"
                            onClick={closeSearchList}
                            href={generateSingleProductUrlFromId(id, slug)}
                          ></Link>
                        </div>
                      );
                    }
                  )}

                {results.data?.data.length > shownResultsCount && (
                  <div
                    onClick={seeFullResult}
                    className="bg-[#ddd] text-center rounded-[10px] leading-[30px] mt-2 mb-1 cursor-pointer transition-all duration-200 hover:bg-orange hover:text-white"
                  >
                    دیدن همه نتایج
                  </div>
                )}
              </>
            ) : (
              <div className="h-[100px] relative [&>span]:text-base [&>span]:text-[#bababa] [&>span]:absolute [&>span]:top-[calc(50%-8px)] [&>span]:start-[calc(50%-54px)]">
                <span>موردی یافت نشد</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
