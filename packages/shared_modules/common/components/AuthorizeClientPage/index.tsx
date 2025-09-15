"use client";

import { AUTH_COOKIE_KEY } from "@repo/core/constants/constants";
import { routePath } from "@repo/core/constants/routePath";
import { getClientSideCookie } from "@repo/core/utils/cookieUtils";
import { useEffect, useState } from "react";

// TODO: need test

export const AuthorizeClientPage = ({
  children,
  baseUrl,
}: React.PropsWithChildren & { baseUrl?: string }) => {
  const [isClient, setIsClient] = useState(false);

  // if (isServerSide) return null;

  // if (!getClientSideCookie(AUTH_COOKIE_KEY)) {
  //   replace(routePath.register);
  //   return null;
  // }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (!getClientSideCookie(AUTH_COOKIE_KEY)) {
    window.location.href = baseUrl + routePath.register;
    return null;
  }

  return children;
};
