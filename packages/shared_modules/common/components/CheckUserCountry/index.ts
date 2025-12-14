import {
  IP_CHECKED_COOKIE,
  IP_COUNTRY_COOKIE,
} from "@repo/core/constants/constants";
import { modalActions } from "@repo/core/modal/modals";
import {
  getClientSideCookie,
  setClientCookie,
} from "@repo/core/utils/cookieUtils";
import { ModalTypes } from "../../modal/modalsTypes";

// TODO: create modal for this

function CheckUserCountry() {
  const country = getClientSideCookie(IP_COUNTRY_COOKIE);
  const checked = getClientSideCookie(IP_CHECKED_COOKIE);
  if (!country || checked) {
    return null;
  }

  if (true) {
    modalActions.addModal(ModalTypes.VPN_WARNING);
  }
  setClientCookie(IP_CHECKED_COOKIE, "1");

  return null;
}

export default CheckUserCountry;
