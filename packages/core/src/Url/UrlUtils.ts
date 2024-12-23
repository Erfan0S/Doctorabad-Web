import { purgeObjectFromFalsyValues } from "../Utils/purgeObjectFromFalsyValues";


interface ParamsStringifyOptions {
  appendPrevSearchParams?: boolean;
  customPrevSearchParam?: string;
  questionMarkPrefix?: boolean;
}

export class SearchParamsUtils {
  static paramsToObject(search?: string,isServerSide = false) {
    const searchParams = search || (!isServerSide ? window.location.search : '');
    const startSearchParamsPosition = searchParams.indexOf('?');

    const queryParams = new URLSearchParams(
      searchParams.slice(startSearchParamsPosition === -1 ? 0 : startSearchParamsPosition + 1)
    );

    const queryObject: { [key: string]: string } = {};

    queryParams.forEach((value, key) => {
      queryObject[key] = value;
    });

    return queryObject;
  }

  static paramsStringify(
    qs: { [key: string]: any },
    { appendPrevSearchParams, customPrevSearchParam, questionMarkPrefix }: ParamsStringifyOptions = {}
  ) {
    const paramsObject = {
      ...(appendPrevSearchParams
        ? SearchParamsUtils.paramsToObject(customPrevSearchParam ? customPrevSearchParam : undefined)
        : {}),
      ...qs,
    };

    let params = new URLSearchParams(purgeObjectFromFalsyValues(paramsObject, true)).toString();
    if (questionMarkPrefix) params = `?${params}`;

    return params;
  }
}
