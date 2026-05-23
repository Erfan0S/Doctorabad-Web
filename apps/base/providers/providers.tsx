"use client";

import React, { useState } from "react";
import { SidebarProvider } from "@repo/shared_modules";
import { QueryClient } from "@tanstack/react-query";
import { ModalsList } from "@repo/shared_modules/modalsList";
import { Providers as SharedProviders } from "@repo/shared_modules";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
    }),
  );
  const isLoggedIn = isUserLoggedIn();

  return (
    <SharedProviders modalList={ModalsList}>
      {!isLoggedIn ? <SidebarProvider /> : null}
      {children}
    </SharedProviders>
  );
};

export default Providers;
