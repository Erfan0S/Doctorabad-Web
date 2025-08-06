"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavigationHistoryContext } from "@repo/core/contexts/navigationHistoryContext";

export function NavigationHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const historyRef = useRef<string[]>([]);

  // Track unique pathnames
  useEffect(() => {
    const last = historyRef.current[historyRef.current.length - 1];
    if (last !== pathname) {
      historyRef.current.push(pathname);
    }
  }, [pathname]);

  const goBack = () => {
    const refferer = document.referrer;

    if (historyRef.current.length > 1 && refferer) {
      // Remove current path
      historyRef.current.pop();
      const previous = historyRef.current.pop(); // get previous path

      if (previous) {
        router.push(previous);
      }
    } else {
      // fallback: go to home
      router.push("/");
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
