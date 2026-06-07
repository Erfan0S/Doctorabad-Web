"use client";

import React, { useState } from "react";
import { SidebarProvider } from "@repo/shared_modules";
import { QueryClient } from "@tanstack/react-query";
import { ModalsList } from "@repo/shared_modules/modalsList";
import { Providers as SharedProviders } from "@repo/shared_modules";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import { usePathname } from "next/navigation";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
    }),
  );
  const isLoggedIn = isUserLoggedIn();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <SharedProviders haveSideBar modalList={ModalsList}>
      {/* {isHome && isLoggedIn ? null : <SidebarProvider />} */}
      {children}
    </SharedProviders>
  );
};

export default Providers;
