"use client";

import { api } from "@repo/shared_modules/api";
import Cart from "./cart";
import Pay from "./pay";
import Shipping from "./shipping";
import { cartActions, useCart } from "@repo/core/states/cart";
import { CheckoutPageTypes, ShippingMethod } from "@repo/core/types/cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

type Props = {
  type?: CheckoutPageTypes;
};

export function CheckoutPage({ type = CheckoutPageTypes.Market }: Props) {
  const { data: address, isLoading: loadingAddress } = useQuery({
    queryFn: api.getAddressesList,
    queryKey: ["addressList"],
  });

  useEffect(() => {
    if (isUserLoggedIn()) cartActions.getCartData();
  }, []);
  const { data: cartItems } = useCart();

  const addressData = address?.data.data?.find((address) => address.default);

  const shippingMutation = useMutation({
    mutationFn: (data: ShippingMethod) => {
      return api.selectShippingMethod({
        shipping_method_id: data.id,
        address_id: addressData!.id,
      });
    },
    retry: 0,
    onSuccess: (resp, data: ShippingMethod) => {
      setCurrentShippingMethod({ ...data, price: resp.data.data.price });
    },
    onError: () => {
      setSelectedShippingMethod(undefined);
    },
  });

  let customeClassName = "";

  const [currentShippingMethod, setCurrentShippingMethod] = useState<
    ShippingMethod | undefined
  >();
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<
    ShippingMethod | undefined
  >();

  const onChangeShippingMethod = (method: ShippingMethod) => {
    if (addressData && addressData.mobile && addressData.address) {
      setSelectedShippingMethod(method);
      shippingMutation.mutate(method);
    } else {
      toast("لطفا ابتدا آدرس خود را تکمیل کنید", {
        type: "error",
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    switch (type) {
      case CheckoutPageTypes.Market:
        break;
      case CheckoutPageTypes.Learn:
        break;
    }
  }, []);

  useEffect(() => {
    if (currentShippingMethod) {
      shippingMutation.mutate(currentShippingMethod);
    }
  }, [cartItems]);

  return (
    <div className="row">
      <div className="col-xl-4">
        <Cart type={type} />
      </div>
      <div className="col-xl-4">
        <Shipping
          isLoading={loadingAddress}
          address={addressData}
          onChangeShippingMethod={onChangeShippingMethod}
          currentShippingMethod={currentShippingMethod}
          selectedShipingMethod={selectedShippingMethod}
        />
      </div>
      <div className="col-xl-4">
        <Pay
          shippingMethod={currentShippingMethod}
          currentAddress={addressData}
        />
      </div>
    </div>
  );
}
