"use client";

import ModalCreator from "@repo/core/modalComponents/ModalCreator";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import SidebarProvider from "./sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalsList } from "../components/common/modal/modalsList";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
    })
  );

  return (
    <>
      <QueryClientProvider client={client}>
        <ModalCreator ModalsList={ModalsList} />
        <ToastContainer theme="colored" rtl position="top-left" />
        <SidebarProvider />
        {children}
        <ReactQueryDevtools
          initialIsOpen={false}
          position="left"
          buttonPosition="bottom-left"
        />
      </QueryClientProvider>
    </>
  );
};

export default Providers;
