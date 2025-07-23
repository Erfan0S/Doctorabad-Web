"use client";

import { api } from "@repo/shared_modules/api";
import Cart from "./cart";
import Pay from "./pay";
import Shipping from "./shipping";
import { cartActions, useCart } from "@repo/core/states/cart";
import { OrderType, ShippingMethod } from "@repo/core/types/cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import styles from "./chekcout.module.scss";
import { Apps } from "@repo/core/types/general";

type Props = {
  app?: Apps;

  mobileView?: boolean;
};

export function CheckoutPage({ app = Apps.BASE, mobileView = false }: Props) {
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
    if (currentShippingMethod) {
      shippingMutation.mutate(currentShippingMethod);
    }
  }, [cartItems]);

  const hasPhysicalProduct = cartItems?.some(
    (item) => item.product_type === OrderType.ShopProduct
  );

  return (
    <div
      className={`${styles.checkoutWrapper} ${mobileView && styles.mobileView} ${styles[app]}`}
    >
      <div>
        <Cart app={app} />
      </div>
      {cartItems.length > 0 && hasPhysicalProduct && (
        <div>
          <Shipping
            isLoading={loadingAddress}
            address={addressData}
            onChangeShippingMethod={onChangeShippingMethod}
            currentShippingMethod={currentShippingMethod}
            selectedShipingMethod={selectedShippingMethod}
          />
        </div>
      )}
      <div>
        <Pay
          shippingMethod={currentShippingMethod}
          currentAddress={addressData}
          hasPhysicalProduct={hasPhysicalProduct}
        />
      </div>
    </div>
  );
}
