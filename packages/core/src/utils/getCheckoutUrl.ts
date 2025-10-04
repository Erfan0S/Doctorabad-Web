import React from "react";
import { baseUrls, routePath } from "../constants/routePath";
import getCurrentAppName from "./getCurrentAppName";

export default function getCheckoutUrl(preventUrl?: boolean) {
  return `${baseUrls.base}${routePath.checkout}?app=${getCurrentAppName()}&prev=${preventUrl ? window.location.pathname : ""}`;
}
