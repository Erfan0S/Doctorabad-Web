"use client";

import { AUTH_COOKIE_KEY } from "@repo/core/constants/constants";
import { routePath } from "@repo/core/constants/routePath";
import { getClientSideCookie } from "@repo/core/utils/cookieUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthorizeClientPage = ({ children }: React.PropsWithChildren) => {
  const { replace } = useRouter();
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
    replace(routePath.register);
  }

  return children;
};
