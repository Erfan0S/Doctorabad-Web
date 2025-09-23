"use client";
import { QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { isServerSide } from "@repo/core/constants/constants";

function AppQueryClientProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 3,
          refetchOnWindowFocus: false,
          // @ts-ignore
          cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        },
      },
    })
  );

  const localStoragePersister = createAsyncStoragePersister({
    storage: isServerSide ? undefined : window.localStorage,
  });

  return (
    <PersistQueryClientProvider
      persistOptions={{
        persister: localStoragePersister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            if (query.queryKey[0] === "auth") {
              return false;
            }
            return true;
          },
        },
      }}
      client={client}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

export default AppQueryClientProvider;
