"use client";
import ModalCreator from "@repo/core/modalComponents/ModalCreator";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { SidebarProvider } from "@repo/shared_modules";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NavigationHistoryProvider } from "./hooks/NavigationHistoryContextProvider";
import CheckUserCountry from "../common/components/CheckUserCountry";
import RuntimeErrorWatcher from "./RuntimeErrorWatcher";

type Props = {
  children: React.ReactNode;
  modalList: any;
  haveSideBar?: boolean;
  haveErrorWatcher?: boolean;
};

const Providers: React.FC<Props> = ({
  children,
  modalList,
  haveSideBar = false,
  haveErrorWatcher = true,
}) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      <NavigationHistoryProvider>
        {haveErrorWatcher && <RuntimeErrorWatcher />}
        <ModalCreator ModalsList={modalList} />
        <ToastContainer theme="colored" rtl position="top-left" />
        {haveSideBar && <SidebarProvider />}
        <CheckUserCountry />
        {children}
        <ReactQueryDevtools
          initialIsOpen={false}
          position="left"
          buttonPosition="bottom-left"
        />
      </NavigationHistoryProvider>
    </QueryClientProvider>
  );
};

export default Providers;
