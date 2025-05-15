"use client";
import { cartActions } from "@repo/core/states/cart";
import Sidebar from "./sidebar";
import { useSidebar } from "./states/sidebar";
import { useEffect } from "react";

const SidebarProvider = () => {
  const { show } = useSidebar();

  useEffect(() => {
    cartActions.getCartData();
  }, []);

  useEffect(() => {
    document.body.classList[show ? "add" : "remove"]("sidebarOpen");
  }, [show]);

  return <Sidebar />;
};
export default SidebarProvider;
