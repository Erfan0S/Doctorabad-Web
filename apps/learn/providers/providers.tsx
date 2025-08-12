"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalsList } from "@/components/common/modals/modalList";
import { Providers as SharedProviders } from "@repo/shared_modules";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
    })
  );

  return <SharedProviders modalList={ModalsList}>{children}</SharedProviders>;
};

export default Providers;
