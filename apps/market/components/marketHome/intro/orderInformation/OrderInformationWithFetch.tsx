"use client";
import { api } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import OrderInformation from ".";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { useCart } from "@repo/core/states/cart";

function OrderInformationWithFetch() {
  const cart = useCart();
  const cartIsEmpty = cart.data.length == 0;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["OrderInformation"],
    queryFn: () => api.getLastProcessingOrder().catch(() => null),
    enabled: isUserLoggedIn() && !cartIsEmpty,
  });

  if (isError || isLoading || !data?.data || !isUserLoggedIn() || cartIsEmpty) {
    return null;
  }

  return <OrderInformation order={data.data} />;
}

export default OrderInformationWithFetch;
