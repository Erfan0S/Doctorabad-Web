'use client';

import { AUTH_COOKIE_KEY, isServerSide } from '@/constants/constants';
import { routePath } from '@/constants/routePath';
import { getClientSideCookie } from '@/utils/cookieUtils';
import { useRouter } from 'next/navigation';

export const AuthorizeClientPage = ({ children }: React.PropsWithChildren) => {
  const { replace } = useRouter();

  if (isServerSide) return null;

  if (!getClientSideCookie(AUTH_COOKIE_KEY)) {
    replace(routePath.register);
    return null;
  }

  return children;
};
