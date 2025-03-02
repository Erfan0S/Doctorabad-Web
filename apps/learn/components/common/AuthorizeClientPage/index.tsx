"use client";

import { AUTH_COOKIE_KEY, isServerSide } from "@repo/core/constants/constants";
import { routePath } from "@repo/core/constants/routePath";
import { getClientSideCookie } from "@repo/core/utils/cookieUtils";
import { useRouter } from "next/navigation";

export const AuthorizeClientPage = ({ children }: React.PropsWithChildren) => {
  const { replace } = useRouter();

  if (isServerSide) return null;

  if (!getClientSideCookie(AUTH_COOKIE_KEY)) {
    replace(routePath.register);
    return null;
  }

  return children;
};
