"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers as SharedProviders } from "@repo/shared_modules";
import { ModalsList } from "@/components/common/modals/modalList";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
    })
  );

  return (
    <QueryClientProvider client={client}>
      <SharedProviders modalList={ModalsList}>{children}</SharedProviders>
    </QueryClientProvider>
  );
};

export default Providers;
