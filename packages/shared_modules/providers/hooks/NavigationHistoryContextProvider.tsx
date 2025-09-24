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
      historyRef.current.push(pathname || "");
    }
  }, [pathname]);

  const goBack = (searchParams?: string) => {
    const refferer = document.referrer;

    console.log(refferer);
    console.log(historyRef.current);

    if (historyRef.current.length > 1 && refferer) {
      // Remove current path
      historyRef.current.pop();
      console.log(historyRef.current);
      const previous = historyRef.current.pop(); // get previous path
      console.log(previous);

      if (previous) {
        router.push(`${previous}${searchParams ? `?${searchParams}` : ""}`);
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
