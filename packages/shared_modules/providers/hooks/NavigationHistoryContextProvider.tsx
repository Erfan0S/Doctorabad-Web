"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NavigationHistoryContext } from "@repo/core/contexts/navigationHistoryContext";

export function NavigationHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const historyRef = useRef<string[]>([]);

  // Track unique pathnames
  useEffect(() => {
    const last = historyRef.current[historyRef.current.length - 1];
    const current = `${pathname}?${searchParams.toString()}`;
    if (last !== current) {
      if (last && last.split("?")[0] === pathname) {
        historyRef.current.pop();
      }
      historyRef.current.push(current);
    }
  }, [pathname, searchParams]);

  const goBack = (
    p_defaultBackUrl?: string,
    p_ignorePrevSearchParams?: boolean
  ) => {
    // const refferer = document.referrer;
    if (historyRef.current.length > 1) {
      // Remove current path
      historyRef.current.pop();
      const previous = historyRef.current.pop(); // get previous path
      const prevSearchParams = previous?.split("?")[1];

      const searchParams =
        prevSearchParams && !p_ignorePrevSearchParams
          ? `${prevSearchParams}`
          : null;

      if (previous) {
        router.push(
          `${previous.split("?")[0]}${searchParams ? `?${searchParams}` : ""}`
        );
      }
    } else {
      // fallback: go to home

      if (p_defaultBackUrl) {
        router.push(p_defaultBackUrl);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <NavigationHistoryContext.Provider
      value={{ goBack, history: historyRef.current }}
    >
      {children}
    </NavigationHistoryContext.Provider>
  );
}
