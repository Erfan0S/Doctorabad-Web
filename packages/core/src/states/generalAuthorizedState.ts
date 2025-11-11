import { create } from "zustand";
import { getClientSideCookie } from "../utils/cookieUtils";
import { AUTH_COOKIE_KEY } from "../constants/constants";

export const generalAuthorizeState = create<{
  // actionStorage: null | (() => void);
  isAuthorized: boolean;
}>(() => ({
  isAuthorized: !!getClientSideCookie(AUTH_COOKIE_KEY) || false,
}));
