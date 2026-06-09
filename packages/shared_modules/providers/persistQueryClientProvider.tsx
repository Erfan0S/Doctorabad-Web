"use client";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { isServerSide } from "@repo/core/constants/constants";

function PersistQueryProvider({ children }: React.PropsWithChildren) {
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
    }),
  );

  const localStoragePersister = createAsyncStoragePersister({
    storage: isServerSide ? undefined : window.localStorage,
  });
  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   // expose the client for non-react utilities and listen for logout events
  //   console.debug(
  //     "[Providers] exposing QueryClient on window.__REACT_QUERY_CLIENT__",
  //   );
  //   (window as any).__REACT_QUERY_CLIENT__ = client;

  //   const onLogout = () => {
  //     try {
  //       console.debug(
  //         "[Providers] received user-logout event — invalidating ['user-plans-clinic']",
  //       );
  //       client.invalidateQueries({ queryKey: ["user-plans-clinic"] });
  //       console.debug("[Providers] invalidateQueries called");
  //     } catch (e) {
  //       console.error("[Providers] error invalidating queries on logout", e);
  //     }
  //   };

  //   window.addEventListener("user-logout", onLogout);
  //   console.debug("[Providers] listening for user-logout events");
  //   return () => {
  //     window.removeEventListener("user-logout", onLogout);
  //     try {
  //       delete (window as any).__REACT_QUERY_CLIENT__;
  //       console.debug("[Providers] removed window.__REACT_QUERY_CLIENT__");
  //     } catch (e) {
  //       console.error("[Providers] error removing global client", e);
  //     }
  //   };
  // }, [client]);
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

export default PersistQueryProvider;
