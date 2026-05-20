"use client";
import { api } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import OrderInformation from ".";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

function OrderInformationWithFetch() {
  console.log(isUserLoggedIn());

  const { data, isLoading, isError } = useQuery({
    queryKey: ["OrderInformation"],
    queryFn: () => api.getLastProcessingOrder(),
    enabled: isUserLoggedIn(),
  });

  if (isError || isLoading || !data?.data || !isUserLoggedIn()) {
    return null;
  }

  return <OrderInformation order={data.data} />;
}

export default OrderInformationWithFetch;
