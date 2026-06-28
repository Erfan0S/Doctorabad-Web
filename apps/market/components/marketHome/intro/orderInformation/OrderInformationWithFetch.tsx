"use client";
import { api } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import OrderInformation from ".";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { useCart } from "@repo/core/states/cart";
import { OrderType } from "@repo/core/types/cart";

function OrderInformationWithFetch() {
  const cart = useCart();
  const cartIsEmpty = cart.data.length == 0;
  const isMarketCart = cart.data.every(
    (item) => item.product_type !== OrderType.ShopProduct,
  );
  const shouldFetchOrderInfo = isUserLoggedIn() && !cartIsEmpty && !isMarketCart;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["OrderInformation"],
    queryFn: () => api.getLastProcessingOrder().catch(() => null),
    enabled: shouldFetchOrderInfo,
  });

  if (isError || isLoading || !data?.data || !shouldFetchOrderInfo) {
    return null;
  }

  return <OrderInformation order={data.data} />;
}

export default OrderInformationWithFetch;
