import React from "react";
import { CheckoutPage as Checkout } from "@repo/shared_modules/checkout";
import { CheckoutPageTypes } from "@repo/core/types/cart";
import HomeHeader from "@/components/Header/HomeHeader";

function ChecoutPage() {
  return <>
  <Checkout type={CheckoutPageTypes.Learn} />;
  </>
}

export default ChecoutPage;
