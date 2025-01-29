"use client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import style from "./Search.module.scss";
import Link from "next/link";
import Image from "next/image";
import { priceFormatter } from "@repo/core/utils";
import useDebounceAction from "@/hooks/useDebounceAction";
import { api } from "@/api/Api";

import { getAvatarSource } from "@/utils/avatarUtils";
import { placeHolderDataUrl } from "@repo/core/constants";
import {
  SearchParamsUtils,
  generateSingleProductUrlFromId,
} from "@repo/core/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { routePath } from "@repo/core/constants";
import Loading from "../../loading";
import useClickOutside from "@/hooks/useClickOutside";
import SearchIcon from "@/assets/svg/search";

const totalResultsCount = 10;
const shownResultsCount = 7;

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
    <div className={`${style.search} search-bar`}>
      <div className={style.searchForm}>
        <div className={style.searchFormInput}>
          <input
            type="search"
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
        <Link href={routePath.archive}>فیلترکردن</Link>
      </div>
      {showResults && searchText && !isLoading && !isFetching && (
        <div className={style.searchResult} ref={searchResultRef}>
          <div className={style.searchResultParent}>
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
                        <div key={id} className={style.searchResultParentItem}>
                          <div className={style.searchResultParentItemImage}>
                            <Image
                              src={product_pic || placeHolderDataUrl}
                              width={80}
                              height={80}
                              alt={title}
                            />
                          </div>
                          <div className={style.searchResultParentItemContent}>
                            <span>{title}</span>
                            {isProductHasStock && (
                              <div
                                className={style.searchResultParentItemPrice}
                              >
                                <span
                                  className={
                                    price_off
                                      ? style.searchResultParentItemPriceRegular
                                      : style.searchResultParentItemPriceSale
                                  }
                                >
                                  {priceFormatter(price_main)}
                                  <small>تومن</small>
                                </span>
                                {(!!price_off || price_amazing) && (
                                  <span
                                    className={
                                      style.searchResultParentItemPriceSale
                                    }
                                  >
                                    {priceFormatter(price_amazing || price_off)}
                                    <small>تومن</small>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <Link
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
                    className={style.searchResultAll}
                  >
                    دیدن همه نتایج
                  </div>
                )}
              </>
            ) : (
              <div className={style.searchEmptyState}>
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
