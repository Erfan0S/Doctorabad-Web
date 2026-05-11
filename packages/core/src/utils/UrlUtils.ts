import {
  baseUrls,
  examPaths,
  learnPaths,
  marketPaths,
  routePath,
} from "../constants/routePath";
import { purgeObjectFromFalsyValues } from "./purgeObjectFromFalsyValues";
import { isServerSide } from "../constants/constants";
import { DiscountPlanType, OrderType } from "../types/cart";

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
        startSearchParamsPosition === -1 ? 0 : startSearchParamsPosition + 1,
      ),
    );

    const queryObject: { [key: string]: string | string[] } = {};

    queryParams.forEach((value, key) => {
      const prev = queryObject[key];
      if (prev === undefined) {
        queryObject[key] = value;
      } else if (Array.isArray(prev)) {
        queryObject[key] = [...prev, value];
      } else {
        queryObject[key] = [prev, value];
      }
    });

    return queryObject;
  }

  static paramsStringify(
    qs: { [key: string]: any },
    {
      appendPrevSearchParams,
      customPrevSearchParam,
      questionMarkPrefix,
    }: ParamsStringifyOptions = {},
  ) {
    const paramsObject = {
      ...(appendPrevSearchParams
        ? SearchParamsUtils.paramsToObject(
            customPrevSearchParam ? customPrevSearchParam : undefined,
          )
        : {}),
      ...qs,
    };

    const purified = purgeObjectFromFalsyValues(paramsObject, true);
    const urlParams = new URLSearchParams();

    Object.entries(purified).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== undefined && item !== null)
            urlParams.append(`${key}[]`, String(item));
        });
        return;
      }

      if (value !== undefined && value !== null) {
        urlParams.append(key, typeof value === "object" ? JSON.stringify(value) : String(value));
      }
    });

    let params = urlParams.toString();
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
  type: OrderType = OrderType.ShopProduct,
  discount_plan_type?: DiscountPlanType | null,
) => {
  const getSlug = () => (!!slug ? slug : "");

  switch (type) {
    case OrderType.ShopProduct:
      return `${baseUrls.market}${marketPaths.single}/${id}/${getSlug()}`;
    case OrderType.Course:
      return `${baseUrls.learn}${learnPaths.single}/${id}/${getSlug()}`;
    case OrderType.Exam:
      return `${baseUrls.exam}${examPaths.single}`;
    case OrderType.Insurance:
      return `${baseUrls.insurance}/buy-insurance${slug}`;
    case OrderType.Package:
      return `${baseUrls.download}/package/${id}/${getSlug()}`;
    case OrderType.DiscountPlan: {
      if (discount_plan_type == DiscountPlanType.CLINIC) {
        return `${baseUrls.clinic}`;
      } else if (discount_plan_type == DiscountPlanType.EXAM) {
        return `${baseUrls.exam}`;
      } else if (discount_plan_type == DiscountPlanType.LERN) {
        return `${baseUrls.learn}`;
      }
    }

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
