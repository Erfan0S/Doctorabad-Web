"use client";

import ModalCreator from "@repo/core/modalComponents/ModalCreator";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { SidebarProvider } from "@repo/shared_modules";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalsList } from "@repo/shared_modules/modalsList";
import { Providers as SharedProviders } from "@repo/shared_modules";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
    })
  );

  return (
    <SharedProviders modalList={ModalsList}>
      <SidebarProvider />
      {children}
    </SharedProviders>
  );
};

export default Providers;
