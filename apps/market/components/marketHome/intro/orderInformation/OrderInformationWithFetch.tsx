"use client";
import { api } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import OrderInformation from ".";

function OrderInformationWithFetch() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["OrderInformation"],
    queryFn: () => api.getLastProcessingOrder(),
  });

  if (isError || isLoading || !data?.data) {
    return null;
  }

  return <OrderInformation order={data.data} />;
}

export default OrderInformationWithFetch;
