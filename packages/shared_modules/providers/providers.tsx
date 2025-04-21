"use client";
import ModalCreator from "@repo/core/modalComponents/ModalCreator";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { SidebarProvider } from "@repo/shared_modules";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
  modalList: any;
  haveSideBar?: boolean;
};

const Providers: React.FC<Props> = ({
  children,
  modalList,
  haveSideBar = true,
}) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
    })
  );

  return (
    <>
      <QueryClientProvider client={client}>
        <ModalCreator ModalsList={modalList} />
        <ToastContainer theme="colored" rtl position="top-left" />
        {haveSideBar && <SidebarProvider />}
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
