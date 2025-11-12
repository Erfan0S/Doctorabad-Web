import { RequestMethods } from "./RequestMethods";
import { handleErrorPayload } from "./utilts/handleErrorPayload";
import { RequestConfig } from "./types/Request";
import { toast } from "react-toastify";
import { AUTH_COOKIE_KEY } from "../constants/constants";
import Cookies from "js-cookie";
import {
  appendNextRequestCookies,
  getClientSideCookie,
  getServerSideCookie,
} from "../utils/cookieUtils";

export class Request {
  request: RequestMethods;

  constructor(private config: RequestConfig) {
    this.request = new RequestMethods(config);
    this.setCsrf();
    this.handlingErrors();
  }

  protected setCsrf() {
    this.request.interceptors.request(async (config) => {
      const token = await Request.getCsrfToken(this.config.isServerSide());
      if (token && !config.next) {
        config.headers!["X-XSRF-TOKEN"] = decodeURIComponent(token);
      }
      if (this.config.isServerSide() && !config.next) {
        const cookies = await appendNextRequestCookies();
        config.headers!["Cookie"] = cookies;
      }
      return config;
    });
  }

  private logOutOnError(error: any) {
    if (
      (error.status === 401 || error.status === 419) &&
      !this.config.isServerSide() &&
      !error.requestOptions.preventLogoutOnAuthError
    ) {
      Cookies.remove(AUTH_COOKIE_KEY);
    }
  }

  protected handlingErrors() {
    this.request.interceptors.response(undefined, (er) => {
      this.logOutOnError(er);
      return handleErrorPayload(er, this.config.isServerSide(), toast);
    });
  }

  static async getCsrfToken(isServerSide: boolean) {
    if (isServerSide) {
      return getServerSideCookie("XSRF-TOKEN");
    } else {
      return getClientSideCookie("XSRF-TOKEN");
    }
  }
}
