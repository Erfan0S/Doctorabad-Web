import { SearchParamsUtils } from "../../utils/UrlUtils";
import { RequestOptions } from "../types/Request";

type InterceptorsType = "request" | "responseSuccess" | "responseFailed";
type RequestCallback = (config: RequestOptions) => Promise<RequestOptions>;
type ResponseCallback = (data: any) => any;
type InterceptorsConfig = {
  request: RequestCallback[];
  response: Record<"success" | "failed", ResponseCallback[]>;
};

export class Interceptors {
  private interceptors: InterceptorsConfig = {
    request: [],
    response: {
      success: [],
      failed: [],
    },
  };

  private sequentialAsyncLoader = async (
    loaders: ((d: any) => Promise<any>)[],
    data: any
  ) => {
    for (let loader of loaders) {
      data = await loader(data);
    }
    return data;
  };

  public async interceptorResolver(type: InterceptorsType, data: any) {
    switch (type) {
      case "request":
        return this.sequentialAsyncLoader(this.interceptors.request, data);

      case "responseFailed":
        return this.sequentialAsyncLoader(
          this.interceptors.response.failed,
          data
        );

      case "responseSuccess":
        return this.sequentialAsyncLoader(
          this.interceptors.response.success,
          data
        );
    }
  }

  public use = {
    request: (cb: RequestCallback) => this.interceptors.request.push(cb),
    response: (
      successCallback?: ResponseCallback,
      failedCallback?: ResponseCallback
    ) => {
      if (successCallback)
        this.interceptors.response.success.push(successCallback);
      if (failedCallback)
        this.interceptors.response.failed.push(failedCallback);
    },
  };
}

export class RequestUtils {
  constructor(private defaultBaseUrl: string) {}

  getRequestUrl(url: string, params: RequestOptions["params"]) {
    let finalUrl = !url.startsWith("http") ? this.defaultBaseUrl + url : url;

    if (params)
      finalUrl += SearchParamsUtils.paramsStringify(params, {
        questionMarkPrefix: true,
      });

    return finalUrl;
  }

  getRequestDefaultOptions() {
    const defaultOption: RequestOptions = {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
      },
    };

    return defaultOption;
  }

  transformConfigsBasedOnBodyType(
    rawBody: Object | FormData | URLSearchParams,
    options: RequestOptions
  ): RequestOptions {
    const isBodyFormData = rawBody instanceof FormData;
    const isInstanceOfSearchParam = rawBody instanceof URLSearchParams;

    const body =
      isBodyFormData || isInstanceOfSearchParam
        ? rawBody
        : JSON.stringify(rawBody);

    return {
      ...options,
      headers: {
        ...options.headers,
        Accept: "application/json",
        "Content-Type": isInstanceOfSearchParam
          ? "application/x-www-form-urlencoded"
          : isBodyFormData
            ? "multipart/form-data"
            : "application/json",
      },
      body,
    };
  }
}
