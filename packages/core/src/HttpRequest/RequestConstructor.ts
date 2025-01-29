import { Interceptors, RequestUtils } from "./utilts/RequestUtils";
import {
  ResponseType,
  RequestMethod,
  RequestOptions,
  RequestConfig,
} from "./types/Request";

export class RequestConstructor {
  protected requestUtils: RequestUtils;
  private interceptorsUtils = new Interceptors();

  constructor(private config: RequestConfig) {
    this.requestUtils = new RequestUtils(config.baseUrl);
  }

  async constructRequestConfig(options: RequestOptions) {
    const config = {
      ...(await this.requestUtils.getRequestDefaultOptions()),
      credentials: "include" as RequestCredentials,
      ...options,
    };

    return this.interceptorsUtils.interceptorResolver("request", config);
  }

  async constructResponseSuccessData<T>(
    response: Response
  ): Promise<ResponseType<T>> {
    return {
      status: response.status,
      data: (await this.interceptorsUtils.interceptorResolver(
        "responseSuccess",
        response.headers.get("Content-Type") === "application/json"
          ? await response?.json()
          : response
      )) as T,
    };
  }

  async constructResponseFailedData(
    response: Response
  ): Promise<ResponseType<any>> {
    return this.interceptorsUtils.interceptorResolver("responseFailed", {
      status: response.status,
      data:
        response.headers.get("Content-Type") === "application/json"
          ? await response?.json()
          : response,
    });
  }

  protected async request<T = any>(
    url: string,
    method: RequestMethod,
    options: RequestOptions
  ) {
    const response = await fetch(
      this.requestUtils.getRequestUrl(url, options?.params),
      {
        method,
        ...(await this.constructRequestConfig(options)),
      }
    );

    if (response.ok) {
      return await this.constructResponseSuccessData<T>(response);
    }
    return Promise.reject(await this.constructResponseFailedData(response));
  }

  get interceptors() {
    return this.interceptorsUtils.use;
  }
}
