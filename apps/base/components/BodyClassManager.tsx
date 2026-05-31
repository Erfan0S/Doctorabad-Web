"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BodyClassManager({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const preserved = document.body.className
      .split(" ")
      .filter(Boolean)
      .filter((c) => c !== "mobile-container" && c !== "desktop-body")
      .join(" ");

    const isHome = pathname === "/";
    const classToSet = isHome && isLoggedIn ? "mobile-container" : "desktop-body";

    document.body.className = [preserved, classToSet].filter(Boolean).join(" ");

    return () => {
      // restore original classes when unmounting
      document.body.className = preserved;
    };
  }, [isLoggedIn, pathname]);

  return null;
}
