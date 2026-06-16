import { RequestConfig, RequestMethod, RequestOptions } from "./types/Request";
import { RequestConstructor } from "./RequestConstructor";
import { ResponseType } from "../types/general";

export class RequestMethods extends RequestConstructor {
  constructor(config: RequestConfig) {
    super(config);
  }
  public async get<T = unknown>(url: string, options: RequestOptions = {}) {
    return this.request<T>(url, RequestMethod.GET, options);
  }

  public async post<T = unknown>(
    url: string,
    body: Object | FormData,
    options: RequestOptions = {},
  ): Promise<ResponseType<T>> {
    return this.request<T>(
      url,
      RequestMethod.POST,
      this.requestUtils.transformConfigsBasedOnBodyType(body, options),
    );
  }

  public async patch<T = unknown>(
    url: string,
    body: Object | FormData,
    options: RequestOptions = {},
  ) {
    return this.request<T>(
      url,
      RequestMethod.PATCH,
      this.requestUtils.transformConfigsBasedOnBodyType(body, options),
    );
  }

  public async put<T = unknown>(
    url: string,
    body: Object | FormData,
    options: RequestOptions = {},
  ) {
    return this.request<T>(
      url,
      RequestMethod.PUT,
      this.requestUtils.transformConfigsBasedOnBodyType(body, options),
    );
  }

  public async delete<T = unknown>(url: string, options = {}) {
    return this.request<T>(url, RequestMethod.DELETE, options);
  }
}
