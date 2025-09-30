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
import PaymentMethods from "./payment_methods";
import { Button, Loading } from "../../common/components";
import {
  CartPayInfo,
  CreateOrderRequest,
  PaymentProviders,
} from "../types/cart";
import { useRouter } from "next/navigation";
import { routePath } from "@repo/core/constants/routePath";
import CreateOrderButton from "./createOrderButton";

type Props = {
  app?: Apps;

  mobileView?: boolean;
};

export function CheckoutPage({ app = Apps.BASE, mobileView = false }: Props) {
  const [payInfo, setPayInfo] = useState<CartPayInfo>({
    description: "",
    discountCode: "",
    payWithCredit: false,
    paymentMethod: PaymentProviders.CASH,
  });

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

  const hasPhysicalProduct = cartItems?.some(
    (item) => item.product_type === OrderType.ShopProduct
  );

  useEffect(() => {
    if (currentShippingMethod && hasPhysicalProduct) {
      shippingMutation.mutate(currentShippingMethod);
    } else {
      setCurrentShippingMethod(undefined);
      shippingMutation.reset();
    }
  }, [cartItems]);

  const isCartNotEmpty = !!cartItems.length;

  return (
    <div
      className={`${styles.checkoutWrapper} ${mobileView && styles.mobileView} ${styles[app]}`}
    >
      <div>
        <Cart app={app} />
      </div>
      {isCartNotEmpty && hasPhysicalProduct && (
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
          payInfo={payInfo}
          setPayInfo={setPayInfo}
        />
      </div>
      {isCartNotEmpty && (
        <div>
          <PaymentMethods
            payInfo={payInfo}
            setPayInfo={setPayInfo}
            shippingMethod={currentShippingMethod}
          />
        </div>
      )}
      {isCartNotEmpty && (
        <CreateOrderButton
          shippingMethod={currentShippingMethod}
          currentAddress={addressData}
          hasPhysicalProduct={hasPhysicalProduct}
          payInfo={payInfo}
        />
      )}
    </div>
  );
}
