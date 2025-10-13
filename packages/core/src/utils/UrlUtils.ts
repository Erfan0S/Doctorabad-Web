import {
  baseUrls,
  examPaths,
  learnPaths,
  marketPaths,
  routePath,
} from "../constants/routePath";
import { purgeObjectFromFalsyValues } from "./purgeObjectFromFalsyValues";
import { isServerSide } from "../constants/constants";
import { OrderType } from "../types/cart";

interface ParamsStringifyOptions {
  appendPrevSearchParams?: boolean;
  customPrevSearchParam?: string;
  questionMarkPrefix?: boolean;
}

export class SearchParamsUtils {
  static paramsToObject(search?: string) {
    const searchParams =
      search || (!isServerSide ? window.location.search : "");
    const startSearchParamsPosition = searchParams.indexOf("?");

    const queryParams = new URLSearchParams(
      searchParams.slice(
        startSearchParamsPosition === -1 ? 0 : startSearchParamsPosition + 1
      )
    );

    const queryObject: { [key: string]: string } = {};

    queryParams.forEach((value, key) => {
      queryObject[key] = value;
    });

    return queryObject;
  }

  static paramsStringify(
    qs: { [key: string]: any },
    {
      appendPrevSearchParams,
      customPrevSearchParam,
      questionMarkPrefix,
    }: ParamsStringifyOptions = {}
  ) {
    const paramsObject = {
      ...(appendPrevSearchParams
        ? SearchParamsUtils.paramsToObject(
            customPrevSearchParam ? customPrevSearchParam : undefined
          )
        : {}),
      ...qs,
    };

    let params = new URLSearchParams(
      purgeObjectFromFalsyValues(paramsObject, true)
    ).toString();
    if (questionMarkPrefix) params = `?${params}`;

    return params;
  }
}

export const generateProductCategoryUrlFromId = (id: number) => {
  return `${routePath.archive}?category=${id}`;
};

export const generateSingleProviderUrlFromId = (id: number) => {
  return `${routePath.archive}?provider=${id}`;
};

// TODO: Fix Checkout URL

export const generateSingleProductUrlFromId = (
  id: number,
  slug: string = "",
  type: OrderType = OrderType.ShopProduct
) => {
  const getSlug = () => (!!slug ? slug : "");

  switch (type) {
    case OrderType.ShopProduct:
      return `${baseUrls.market}${marketPaths.single}/${id}/${getSlug()}`;
    case OrderType.Course:
      return `${baseUrls.learn}${learnPaths.single}/${id}/${getSlug()}`;
    case OrderType.Exam:
      return `${baseUrls.exam}${examPaths.single}`;

    default:
      return `${baseUrls.market}${marketPaths.single}/${id}/${getSlug()}`;
  }
};

export const generateCourseUrlFromId = (id: number, slug: string = "") => {
  return `/learn/course/${id}/${slug}`;
};

export const generateFestivalProductListUrl = (id: number) => {
  return `/product-list/festival?festival_id=${id}`;
};
