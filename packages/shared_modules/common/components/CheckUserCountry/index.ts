"use client";
import {
  IP_CHECKED_COOKIE,
  IP_COUNTRY_COOKIE,
} from "@repo/core/constants/constants";
import {
  getClientSideCookie,
  setClientCookie,
} from "@repo/core/utils/cookieUtils";
import { toast } from "react-toastify";

// TODO: create modal for this

function CheckUserCountry() {
  const country = getClientSideCookie(IP_COUNTRY_COOKIE);
  if (!country) {
    return null;
  }

  if (country !== "IR") {
    toast.error("لطفاً از کشور ایران استفاده کنید");
  } else {
    toast.success("شما از کشور ایران استفاده می کنید");
  }

  setClientCookie(IP_CHECKED_COOKIE, "1");

  return null;
}

export default CheckUserCountry;
