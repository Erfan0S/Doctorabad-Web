"use client";
import Sidebar from "./sidebar";
import { useSidebar } from "./states/sidebar";
import { useEffect } from "react";

const SidebarProvider = () => {
  const { show } = useSidebar();

  useEffect(() => {
    document.body.classList[show ? "add" : "remove"]("sidebarOpen");
  }, [show]);

  return <Sidebar />;
};
export default SidebarProvider;
