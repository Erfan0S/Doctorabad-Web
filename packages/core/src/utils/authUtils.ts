import { modalActions } from "../modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { redirect } from "next/navigation";
import { routePath } from "../constants/routePath";
import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY, isServerSide } from "../constants/constants";
import { api } from "@repo/shared_modules/api";
import { getClientSideCookie, getServerSideCookie } from "./cookieUtils";
import { authorizedActionStorage } from "../states/athorizedActionStorage";
import { toast } from "react-toastify";

export const setAuthCookie = () => {
  const expireTimeInMinute = 60 * 24 * 365;
  Cookies.set(AUTH_COOKIE_KEY, "1", {
    expires: new Date(Date.now() + 60 * 1000 * expireTimeInMinute),
  });
};

export const authorizeClientAction =
  (action: (...params: any) => any, showError?: boolean) =>
  (...params: any) => {
    if (!getClientSideCookie(AUTH_COOKIE_KEY)) {
      if (showError) toast.error("برای انجام این عملیات ابتدا باید وارد شوید");
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

export const logOut = async (reloadPage: boolean = false) => {
  if (!isServerSide && !getClientSideCookie(AUTH_COOKIE_KEY)) return;

  Cookies.remove(AUTH_COOKIE_KEY);
  try {
    await api.logout();
  } catch (error) {}
  if (reloadPage) window.location.reload();
};
