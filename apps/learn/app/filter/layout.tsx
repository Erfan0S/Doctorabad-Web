"use client";
import { checkoutMetadata } from "@repo/core/metadata/checkout";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { isServerSide } from "@repo/core/constants/constants";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

export const viewport = checkoutMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error, query) => {
          // Drop the query entirely after error
          client.removeQueries({ queryKey: query.queryKey });
        },
      }),

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
      }}
      client={client}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
