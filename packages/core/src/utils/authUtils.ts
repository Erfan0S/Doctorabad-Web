import { modalActions } from "../modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { redirect } from "next/navigation";
import { routePath } from "../constants/routePath";
import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY, isServerSide } from "../constants/constants";
import { api } from "@repo/shared_modules/api";
import { getClientSideCookie, getServerSideCookie } from "./cookieUtils";
import { generalAuthorizeState } from "../states/generalAuthorizedState";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const setAuthCookie = () => {
  const expireTimeInMinute = 60 * 24 * 365;
  Cookies.set(AUTH_COOKIE_KEY, "1", {
    expires: new Date(Date.now() + 60 * 1000 * expireTimeInMinute),
  });
};


export const authorizeClientAction =
  (
    action: (...params: any) => any,
    showError?: boolean,
    continueAction: boolean = true,
  ) =>
  (...params: any) => {
    if (!getClientSideCookie(AUTH_COOKIE_KEY)) {
      if (showError) toast.error("برای انجام این عملیات ابتدا باید وارد شوید");
      modalActions.addModal(ModalTypes.REGISTER, {
        onVerifySuccess: () => {
          generalAuthorizeState.setState({
            isAuthorized: true,
          });
          continueAction ? action(...params) : null;
        },
      });
    } else {
      action(...params);
    }
  };

export const authorizeServerPage = async () => {
  if (!(await getServerSideCookie(AUTH_COOKIE_KEY)))
    redirect(routePath.register);
};

export const isUserLoggedIn = (haveMassage?: boolean) => {
  if (isServerSide) {
    return !!getServerSideCookie(AUTH_COOKIE_KEY);
  }
  if (generalAuthorizeState.getState().isAuthorized) return true;
  if (!getClientSideCookie(AUTH_COOKIE_KEY)) {
    if (haveMassage)
      toast("ابتدا وارد شوید", { type: "error", position: "top-left" });
    return false;
  }
  return true;
};

export const isUserLoggedInAsync = async (): Promise<boolean> => {
  if (isServerSide) {
    return !!(await getServerSideCookie(AUTH_COOKIE_KEY));
  }
  return isUserLoggedIn();
};

export const logOut = async (reloadPage: boolean = false) => {
  if (!isServerSide && !getClientSideCookie(AUTH_COOKIE_KEY)) return;

  Cookies.remove(AUTH_COOKIE_KEY);
  generalAuthorizeState.setState({
    isAuthorized: false,
  });
  try {
    await api.logout();
    modalActions.clearModals();
  } catch (error) {}
  // // invalidate related queries and notify providers
  // if (!isServerSide && typeof window !== "undefined") {
  //   try {
  //     const anyWin = window as any;
  //     console.debug("[authUtils] logOut called — removing cookie and dispatching logout");
  //     if (anyWin.__REACT_QUERY_CLIENT__) {
  //       console.debug("[authUtils] found __REACT_QUERY_CLIENT__ — calling invalidateQueries(['user-plans-clinic'])");
  //       anyWin.__REACT_QUERY_CLIENT__.invalidateQueries({ queryKey: ["user-plans-clinic"] });
  //       console.debug("[authUtils] invalidateQueries completed");
  //     } else {
  //       console.debug("[authUtils] __REACT_QUERY_CLIENT__ not found on window");
  //     }
  //     // also dispatch a global event so any provider can react
  //     window.dispatchEvent(new Event("user-logout"));
  //     console.debug("[authUtils] user-logout event dispatched");
  //   } catch (e) {}
  // }
  if (reloadPage) window.location.reload();
};
