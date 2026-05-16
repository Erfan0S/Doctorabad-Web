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

export const generateInsuranceSlug = (data: {
  product_id: number;
  product_title: string;
  product_pic: string;
  price_off: number;
  price_main: number;
  draft?: {
    field_id?: number;
    speciality_id?: number;
    residency_status?: number;
    damage_history_id?: number;
    postal_code?: string;
    city_id?: number;
    province_id?: number;
    active_clinic?: boolean;
    clinic_address?: string | null;
  };
}) => {
  const params = new URLSearchParams();
  params.append("insurer_id", String(data.product_id));
  params.append("insurer_title", data.product_title);
  params.append("insurer_logo", data.product_pic);
  params.append("price", String(data.price_off));
  params.append("main_price", String(data.price_main));

  const draft = data.draft;
  if (draft?.field_id) params.append("field", String(draft.field_id));
  if (draft?.speciality_id)
    params.append("grade", String(draft.speciality_id));
  if (draft?.residency_status)
    params.append("residency", String(draft.residency_status));
  if (draft?.damage_history_id)
    params.append("damageHistory", String(draft.damage_history_id));
  if (draft?.postal_code)
    params.append("postal_code", String(draft.postal_code));
  if (draft?.city_id) params.append("city_id", String(draft.city_id));
  if (draft?.province_id)
    params.append("province_id", String(draft.province_id));
  if (typeof draft?.active_clinic === "boolean")
    params.append("active_clinic", String(draft.active_clinic));
  if (draft?.clinic_address)
    params.append("clinic_address", draft.clinic_address);

  return `?${params.toString()}`;
};

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
