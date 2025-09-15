"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

function AppQueryClientProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
    })
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default AppQueryClientProvider;
