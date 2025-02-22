import { modalActions } from "../modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { redirect } from "next/navigation";
import { routePath } from "../constants/routePath";
import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY } from "../constants/constants";
import { api } from "@repo/shared_modules/api";
import { getClientSideCookie, getServerSideCookie } from "./cookieUtils";
import { authorizedActionStorage } from "../states/athorizedActionStorage";

export const setAuthCookie = () => {
  const expireTimeInMinute = 60 * 24 * 365;
  Cookies.set(AUTH_COOKIE_KEY, "1", {
    expires: new Date(Date.now() + 60 * 1000 * expireTimeInMinute),
  });
};

export const authorizeClientAction =
  (action: (...params: any) => any) =>
  (...params: any) => {
    if (!getClientSideCookie(AUTH_COOKIE_KEY)) {
      modalActions.addModal(ModalTypes.REGISTER);
      authorizedActionStorage.setState(() => () => action(...params));
    } else {
      action(...params);
    }
  };

export const authorizeServerPage = async () => {
  if (!(await getServerSideCookie(AUTH_COOKIE_KEY)))
    redirect(routePath.register);
};

export const isUserLoggedIn = () => getClientSideCookie(AUTH_COOKIE_KEY);

export const logOut = async () => {
  await api.logout();
  Cookies.remove(AUTH_COOKIE_KEY);

  window.location.reload();
};
